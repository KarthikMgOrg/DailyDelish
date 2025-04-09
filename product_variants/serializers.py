from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from product_variants.models import ProductVariants


class ProductVariantSerializer(ModelSerializer):
    image = serializers.SerializerMethodField()
    is_available = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariants
        fields = '__all__'

    def get_image(self, obj):
        return obj.product_id.image.url

    def get_is_available(self, obj):
        return obj.product_id.is_available
