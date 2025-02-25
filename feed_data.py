import csv
from django.core.management.base import BaseCommand
from django.db import transaction
from django.conf import settings
from django.contrib.auth import get_user_model

import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

# User = get_user_model()
from custom_auth.models import User


# class Command(BaseCommand):
#     help = "Feeds data into MyModel from a CSV file"

#     def add_arguments(self, parser):
#         """Add optional arguments for file path and batch size."""
#         parser.add_argument("--file", type=str,
#                             help="Path to the CSV file", required=True)
#         parser.add_argument("--batch-size", type=int,
#                             default=1000, help="Batch size for bulk insert")

#     def handle(self, *args, **kwargs):
#         print('starting handle()')
#         file_path = kwargs["file"]
#         batch_size = kwargs["batch_size"]
#         self.stdout.write(self.style.NOTICE(
#             f"Reading data from {file_path}..."))

#         try:
#             with open(file_path, "r") as file:
#                 reader = csv.DictReader(file)
#                 batch = []

#                 for row in reader:
#                     batch.append(
#                         User(field1=row["email"], field2=row["password"]))

#                     if len(batch) >= batch_size:
#                         User.objects.bulk_create(batch)  # Bulk insert
#                         batch = []

#                 if batch:  # Insert remaining records
#                     User.objects.bulk_create(batch)

#             self.stdout.write(self.style.SUCCESS(
#                 "Data successfully imported!"))

#         except Exception as e:
#             self.stderr.write(self.style.ERROR(f"Error: {e}"))

import pandas as pd
def load_data(file_path):
    df = pd.read_csv(file_path)
    count = 0
    for email, password in zip(df['email'], df['password']):
        User.objects.create_user(email=email, password=password)
        count += 1
        print(f"Added: {email}")  # Debugging output
    print(f"\n✅ Successfully inserted {count} users.")


load_data("custom_auth/management/data.csv")
