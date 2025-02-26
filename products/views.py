from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import ProductSerializer
from products.models import Product

# Create your views here.

class ListProductsView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
