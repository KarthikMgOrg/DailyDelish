from django.db import models
from products.models import Product

# Create your models here.


class ProductVariants(models.Model):
    UNIT_TYPE_CHOICES = [
        ('UNIT', 'Unit'),
        ('KILOGRAM', 'Kilogram'),
    ]
    product_id = models.ForeignKey(
        Product, models.SET_NULL, null=True, blank=True)
    name = models.CharField(
        max_length=20, choices=UNIT_TYPE_CHOICES, null=False, default='Kilogram')
    mrp = models.DecimalField(decimal_places=2, max_digits=10)
    available_price = models.DecimalField(decimal_places=2, max_digits=10)
    stock = models.IntegerField()
    sku = models.CharField(max_length=50)

    class Meta:
        db_table = 'product_variants'

    def __str__(self):
        return self.name
