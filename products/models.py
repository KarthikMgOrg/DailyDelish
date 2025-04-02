from django.db import models
from product_category.models import ProductCategory
# Create your models here.
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile


class Product(models.Model):

    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField()
    category = models.ForeignKey(
        to=ProductCategory, on_delete=models.SET_NULL, null=True)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(
        upload_to='products/images/', null=True, blank=True)
    thumbnail = models.ImageField(
        upload_to='products/thumbnails/', null=True, blank=True)
    size = models.CharField(max_length=10, default="1 Unit")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products'

    def __str__(self):
        return self.name
