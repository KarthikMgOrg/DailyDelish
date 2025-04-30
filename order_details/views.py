from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, ListAPIView
from .models import OrderDetails
from .serializers import OrderDetailsSerializer
# Create your views here.


class OrderDetailDetailView(ListAPIView):
    queryset = OrderDetails.objects.all()
    serializer_class = OrderDetailsSerializer
    lookup_field = 'order_item_id'
