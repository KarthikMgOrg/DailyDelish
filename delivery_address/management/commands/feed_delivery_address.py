import stat
from custom_auth.models import User
import csv
from django.core.management.base import BaseCommand
from django.db import transaction
from django.conf import settings
from django.contrib.auth import get_user_model

import os
import django

from delivery_address.models import DeliveryAddress

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
        print('starting handle()')
        file_path = kwargs["file"]
        batch_size = kwargs["batch_size"]
        self.stdout.write(self.style.NOTICE(
            f"Reading data from {file_path}..."))

        try:
            with open(file_path, "r") as file:
                reader = csv.DictReader(file)
                batch = []

                for row in reader:
                    user_id = row['user_id']
                    street_address = row['street_address']
                    city = row['city']
                    state = row['state']
                    postal_code = row['postal_code']
                    country = row['country']
                    is_default = row['is_default']

                    user_instance = User.objects.get(id=user_id)

                    # Create user and hash the password properly
                    delivery_address = DeliveryAddress(
                        user_id=user_instance,
                        street_address=street_address, 
                        city=city, 
                        state=state, 
                        postal_code=postal_code,
                        country=country,
                        is_default=is_default
                    )
                    batch.append(delivery_address)

                    if len(batch) >= batch_size:
                        User.objects.bulk_create(batch)  # Bulk insert
                        batch = []

                if batch:  # Insert remaining records
                    DeliveryAddress.objects.bulk_create(batch)

            self.stdout.write(self.style.SUCCESS(
                "Data successfully imported!"))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Error: {e}"))
