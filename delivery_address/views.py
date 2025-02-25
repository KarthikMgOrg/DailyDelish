from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import DeliveryAddress
from .serializers import DeliveryAddressSerializer
from rest_framework.response import Response
from rest_framework import status


class ListAddressView(ListCreateAPIView):
    queryset = DeliveryAddress.objects.all()
    serializer_class = DeliveryAddressSerializer


class DetailAddressView(RetrieveUpdateDestroyAPIView):
    queryset = DeliveryAddress.objects.all()
    serializer_class = DeliveryAddressSerializer
