from django.shortcuts import get_object_or_404, render
from rest_framework.generics import ListAPIView, RetrieveAPIView

from product_variants.models import ProductVariants
from .serializers import ProductSerializer, ProductVariantSerializer
from products.models import Product
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

# Create your views here.


@permission_classes([AllowAny])
class ListProductsView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@permission_classes([AllowAny])
class ProductVariantRetrieveAPIView(ListAPIView):
    serializer_class = ProductVariantSerializer
    lookup_field = 'product_id'

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductVariants.objects.filter(product_id=product_id)
