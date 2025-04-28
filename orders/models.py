from django.db import models
from django.utils import timezone
from subscriptions.models import Subscriptions
from decimal import Decimal
from django.core.validators import MinValueValidator


class OrderStatus(models.TextChoices):
    PENDING = 'pending'
    DELIVERED = 'delivered'
    FAILED = 'failed'


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    subscription_id = models.ForeignKey(
        Subscriptions, on_delete=models.SET_NULL, db_column='subscription_id', null=True, blank=True)
    order_date = models.DateField(default=timezone.now)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[
                                       MinValueValidator(Decimal('0.01'))])
    status = models.CharField(choices=OrderStatus.choices,
                              default=OrderStatus.PENDING)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        db_table = 'orders'
        managed = True
