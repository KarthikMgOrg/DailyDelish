from django.db import models
from custom_auth.models import User
# Create your models here.


class DeliveryAddress(models.Model):
    address_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, null=False, blank=False)
    street_address = models.TextField(null=False)
    city = models.CharField(max_length=100, null=False)
    state = models.CharField(max_length=100, null=False)
    postal_code = models.CharField(max_length=20, null=False)
    country = models.CharField(max_length=100, null=False)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'delivery_address'

    def __str__(self):
        return self.address_id