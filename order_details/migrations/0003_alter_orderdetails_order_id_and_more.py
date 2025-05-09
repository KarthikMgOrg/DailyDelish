# Generated by Django 4.2.19 on 2025-04-29 07:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0006_alter_order_subscription_id'),
        ('products', '0005_alter_product_image_alter_product_thumbnail'),
        ('order_details', '0002_alter_orderdetails_options_alter_orderdetails_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderdetails',
            name='order_id',
            field=models.ForeignKey(db_column='order_id', null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.order'),
        ),
        migrations.AlterField(
            model_name='orderdetails',
            name='product_id',
            field=models.ForeignKey(db_column='product_id', null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.product'),
        ),
    ]
