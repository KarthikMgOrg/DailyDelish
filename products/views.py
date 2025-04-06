from django.shortcuts import get_object_or_404, render
from rest_framework.generics import ListAPIView, RetrieveAPIView

from product_variants.models import ProductVariants
from .serializers import ProductSerializer
from products.models import Product
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

# Create your views here.


@permission_classes([AllowAny])
class ListProductsView(ListAPIView):
    queryset = Product.objects.prefetch_related('variants').all()
    serializer_class = ProductSerializer
