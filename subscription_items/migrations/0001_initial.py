# Generated by Django 4.2.19 on 2025-06-17 12:11

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
        ('subscriptions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubscriptionItems',
            fields=[
                ('subscription_item_id', models.AutoField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('product', models.ForeignKey(db_column='product_id', on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('subscription_id', models.ForeignKey(db_column='subscription_id', on_delete=django.db.models.deletion.CASCADE, related_name='items', to='subscriptions.subscriptions')),
            ],
            options={
                'db_table': 'subscription_items',
                'managed': True,
                'unique_together': {('subscription_id', 'product_id')},
            },
        ),
    ]
