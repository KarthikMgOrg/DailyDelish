from rest_framework import serializers
from .models import OrderDetails
from products.serializers import ProductSerializer

class OrderDetailsSerializer(serializers.ModelSerializer):
    # product_id = ProductSerializer(read_only=True)
    class Meta:
        model = OrderDetails
        fields = '__all__'
        read_only_fields = ['order']
