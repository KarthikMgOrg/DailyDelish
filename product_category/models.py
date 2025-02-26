from django.db import models

# Create your models here.

class ProductCategory(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'product_category'

    def __str__(self):
        return self.name