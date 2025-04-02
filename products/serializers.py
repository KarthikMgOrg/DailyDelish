from rest_framework.serializers import ModelSerializer

from product_variants.models import ProductVariants
from .models import Product


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductVariantSerializer(ModelSerializer):
    class Meta:
        model = ProductVariants
        fields = '__all__'
