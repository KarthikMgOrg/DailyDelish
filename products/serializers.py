from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from product_variants.models import ProductVariants
from .models import Product


class ProductSerializer(ModelSerializer):
    min_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_min_price(self, obj):
        variant = obj.variants.order_by("mrp").first()
        return variant.mrp if variant else None
