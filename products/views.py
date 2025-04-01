from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import ProductSerializer
from products.models import Product
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

# Create your views here.


@permission_classes([AllowAny])
class ListProductsView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
