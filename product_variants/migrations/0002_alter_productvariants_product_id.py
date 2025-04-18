# Generated by Django 4.2.19 on 2025-04-04 21:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_alter_product_image_alter_product_thumbnail'),
        ('product_variants', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productvariants',
            name='product_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='variants', to='products.product'),
        ),
    ]
