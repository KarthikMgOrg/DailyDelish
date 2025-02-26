from django.db import models
from product_category.models import ProductCategory
# Create your models here.

class Product(models.Model):
    UNIT_TYPE_CHOICES = [
        ('UNIT', 'Unit'),
        ('KILOGRAM', 'Kilogram'),
    ]

    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField()
    mrp = models.DecimalField(decimal_places=2, max_digits=10)
    available_price = models.DecimalField(decimal_places=2, max_digits=10)
    unit = models.CharField(
        max_length=20,
        choices=UNIT_TYPE_CHOICES,
        null=False
    )
    category = models.ForeignKey(to=ProductCategory, on_delete=models.SET_NULL, null=True)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(
        upload_to='products/images/', null=True, blank=True)
    thumbnail = models.ImageField(
        upload_to='products/thumbnails/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products'

    def __str__(self):
        return self.name