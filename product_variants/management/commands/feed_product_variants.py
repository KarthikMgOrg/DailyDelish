import csv
import os
import requests
from io import BytesIO
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.db import transaction
from django.core.files import File
from django.conf import settings

from product_variants.models import ProductVariants
from products.models import Product

# python3 manage.py feed_product_variants --file=./product_variants/management/data.csv


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
            with open(file_path, "r", encoding="utf-8-sig") as file:
                reader = csv.DictReader(file)
                batch = []
                try:
                    for row in reader:
                        product_id = row['product_id']
                        name = row['name']
                        mrp = row['mrp']
                        available_price = row['available_price']
                        stock = row['stock']
                        sku = row['sku']

                        # Get the category
                        product = Product.objects.get(
                            product_id=int(product_id))

                        product_variant = ProductVariants(
                            product_id=product,
                            name=name,
                            mrp=mrp,
                            available_price=available_price,
                            stock=stock,
                            sku=sku
                        )

                        # Upload images if provided

                        batch.append(product_variant)

                        # Bulk insert in batches
                        if len(batch) >= batch_size:
                            ProductVariants.objects.bulk_create(batch)
                            batch = []

                    if batch:
                        ProductVariants.objects.bulk_create(batch)
                except Exception:
                    import traceback
                    traceback.print_exc()

            self.stdout.write(self.style.SUCCESS(
                "Data successfully imported!"))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))
