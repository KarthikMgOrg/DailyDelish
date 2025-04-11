from django.db import models
from subscriptions.models import Subscriptions
from products.models import Product
from django.core.validators import MinValueValidator
# Create your models here.


class SubscriptionItems(models.Model):
    subscription_item_id = models.AutoField(primary_key=True)
    subscription_id = models.ForeignKey(
        to=Subscriptions, null=False, on_delete=models.CASCADE, db_column='subscription_id')
    product_id = models.ForeignKey(
        to=Product, on_delete=models.CASCADE, null=False, db_column='product_id')
    quantity = models.IntegerField(default=1, null=False, blank=False, validators=[
                                   MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'subscription_items'
        managed = True
        unique_together = ('subscription_id', 'product_id')

    def __str__(self):
        return f"{self.subscription_id} - {self.product_id}"
