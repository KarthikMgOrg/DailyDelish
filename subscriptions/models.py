from django.db import models
from django.contrib.auth import get_user_model
from delivery_address.models import DeliveryAddress
from datetime import datetime
User = get_user_model()
# Create your models here.


class SubscriptionFrequency(models.TextChoices):
    ONETIME = 'onetime'
    WEEKLY = 'weekly'
    BIWEEKLY = 'biweekly'
    MONTHLY = 'monthly'


class StatusChoices(models.TextChoices):
    ACTIVE = 'active'
    INACTIVE = 'inactive'


class Subscriptions(models.Model):
    subscription_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=False, null=False, db_column="user_id")
    address_id = models.ForeignKey(
        DeliveryAddress, on_delete=models.RESTRICT, blank=False, db_column='address_id')
    frequency = models.CharField(
        max_length=20, choices=SubscriptionFrequency.choices, default=SubscriptionFrequency.ONETIME, null=False)
    status = models.CharField(
        max_length=10, choices=StatusChoices.choices, default=StatusChoices.ACTIVE)
    start_date = models.DateField(
        null=False, default=datetime.now().strftime("%Y-%m-%d"))
    end_date = models.DateField()
    next_delivery_date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'subscriptions'
        managed = True

    def __str__(self):
        return f"{self.subscription_id}"
