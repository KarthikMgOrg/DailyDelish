# Generated by Django 4.2.19 on 2025-04-11 08:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('delivery_address', '0004_rename_user_id_deliveryaddress_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deliveryaddress',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]
