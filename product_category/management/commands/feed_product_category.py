import stat
from custom_auth.models import User
import csv
from django.core.management.base import BaseCommand
from django.db import transaction
from django.conf import settings

import os
import django

from delivery_address.models import DeliveryAddress
from product_category.models import ProductCategory

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

# User = get_user_model()


class Command(BaseCommand):
    help = "Feeds data into MyModel from a CSV file"

    def add_arguments(self, parser):
        """Add optional arguments for file path and batch size."""
        parser.add_argument("--file", type=str,
                            help="Path to the CSV file", required=True)
        parser.add_argument("--batch-size", type=int,
                            default=1000, help="Batch size for bulk insert")

    def handle(self, *args, **kwargs):
        file_path = kwargs["file"]
        batch_size = kwargs["batch_size"]
        self.stdout.write(self.style.NOTICE(
            f"Reading data from {file_path}..."))

        try:
            with open(file_path, "r") as file:
                reader = csv.DictReader(file)
                batch = []

                for row in reader:
                    name = row['name']
                    description = row['description']
                    

                    # Create user and hash the password properly
                    product_category = ProductCategory(
                        name=name,
                        description=description
                    )
                    batch.append(product_category)

                    if len(batch) >= batch_size:
                        User.objects.bulk_create(batch)  # Bulk insert
                        batch = []

                if batch:  # Insert remaining records
                    ProductCategory.objects.bulk_create(batch)

            self.stdout.write(self.style.SUCCESS(
                "Data successfully imported!"))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))
