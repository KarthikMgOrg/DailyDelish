import csv
import os
import requests
from io import BytesIO
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.db import transaction
from django.core.files import File
from django.conf import settings

from product_category.models import ProductCategory
from products.models import Product

# python3 manage.py feed_products --file=./products/management/data.csv


class Command(BaseCommand):
    help = "Feeds data into Product from a CSV file and uploads images to S3"

    def add_arguments(self, parser):
        parser.add_argument("--file", type=str, required=True,
                            help="Path to the CSV file")
        parser.add_argument("--batch-size", type=int,
                            default=100, help="Batch size for bulk insert")

    def handle(self, *args, **kwargs):
        file_path = kwargs["file"]
        batch_size = kwargs["batch_size"]
        self.stdout.write(self.style.NOTICE(
            f"Reading data from {file_path}..."))

        try:
            with open(file_path, "r", encoding="utf-8") as file:
                reader = csv.DictReader(file)
                batch = []

                for row in reader:
                    name = row['name']
                    description = row['description']
                    category_id = row['category_id']
                    is_available = row['is_available']
                    image_url = row['image']
                    thumbnail_url = row['thumbnail']

                    # Get the category
                    category = ProductCategory.objects.get(
                        category_id=category_id)

                    product = Product(
                        name=name,
                        description=description,
                        category=category,
                        is_available=is_available
                    )

                    # Upload images if provided
                    try:
                        if image_url:
                            product.image = self.upload_image(
                                image_url, f"{name}.jpg")

                        if thumbnail_url:
                            product.thumbnail = self.upload_image(
                                thumbnail_url, f"{name}.jpg")
                    except Exception as e:
                        print(e)
                        pass

                    batch.append(product)

                    # Bulk insert in batches
                    if len(batch) >= batch_size:
                        Product.objects.bulk_create(batch)
                        batch = []

                if batch:
                    Product.objects.bulk_create(batch)

            self.stdout.write(self.style.SUCCESS(
                "Data successfully imported!"))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))

    def upload_image(self, image_path_or_url, s3_path):
        """
        Uploads an image to S3.
        Supports both image URLs and local file paths.
        Fixes 'read of closed file' error.
        """
        try:
            # If image is a URL, download it
            if image_path_or_url.startswith("http"):
                response = requests.get(image_path_or_url, stream=True)
                if response.status_code == 200:
                    image_content = BytesIO(response.content)
                    return ContentFile(image_content.getvalue(), name=s3_path)

            # If image is a local file, read it
            elif os.path.exists(image_path_or_url):
                with open(image_path_or_url, "rb") as img_file:
                    return ContentFile(img_file.read(), name=s3_path)

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Failed to upload image: {e}"))

        return None  # Return None if upload fails
