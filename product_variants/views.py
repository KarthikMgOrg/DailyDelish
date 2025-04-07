from django.shortcuts import render
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import ProductVariantSerializer
from .models import ProductVariants
# Create your views here.


@permission_classes([AllowAny])
class ProductVariantRetrieveAPIView(ListAPIView):
    serializer_class = ProductVariantSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return ProductVariants.objects.select_related('product_id').filter(product_id=product_id)


@permission_classes([AllowAny])
class ProductSkuRetrieveAPIView(RetrieveAPIView):
    queryset = ProductVariants.objects.all()
    serializer_class = ProductVariantSerializer
    lookup_field = 'sku'
