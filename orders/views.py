from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Order
from .serializers import OrderSerializer
# Create your views here.


class OrdersListCreateAPIView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'order_id'
