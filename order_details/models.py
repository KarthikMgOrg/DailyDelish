from django.db import models
from orders.models import Order
from products.models import Product
from django.core.validators import MinValueValidator

# Create your models here.


class OrderDetails(models.Model):
    order_item_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(
        to=Order, on_delete=models.CASCADE, null=False, db_column='order', related_name='items')
    product = models.ForeignKey(
        to=Product, on_delete=models.CASCADE, null=False, db_column='product_id')
    quantity = models.IntegerField(null=False)
    price_at_order = models.DecimalField(max_digits=10, decimal_places=2,
                                         null=False, validators=[MinValueValidator(0)], blank=False)
    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False)
    created_at = models.DateTimeField(auto_now=True, editable=False)

    def save(self, *args, **kwargs):
        self.total_price = self.price_at_order * self.quantity
        return super().save(*args, **kwargs)

    class Meta:
        db_table = 'order_details'
        managed = True
