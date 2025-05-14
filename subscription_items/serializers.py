from rest_framework.serializers import ModelSerializer
from products.serializers import ProductSerializer
from .models import SubscriptionItems

class SubscriptionItemsSerializer(ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = SubscriptionItems
        managed = True
        