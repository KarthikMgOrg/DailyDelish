from django.shortcuts import get_object_or_404, render
from numpy import add
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
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


class UserAddressListView(RetrieveUpdateDestroyAPIView):
    serializer_class = DeliveryAddressSerializer

    def get_object(self):
        print(self.kwargs['pk'])
        return get_object_or_404(DeliveryAddress, user_id=self.kwargs['pk'])
