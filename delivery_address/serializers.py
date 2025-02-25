from .models import DeliveryAddress
from rest_framework.serializers import ModelSerializer


class DeliveryAddressSerializer(ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = '__all__'