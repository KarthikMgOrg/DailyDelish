from ast import List
from django.http import JsonResponse
from django.shortcuts import render
from razorpay import Subscription
from requests import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.decorators import APIView
from rest_framework import status
from yaml import serialize
from .models import Order
from .serializers import OrderSerializer, OrderDetailsSerializer
# Create your views here.


class OrdersListCreateAPIView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'order_id'


# class UserOrdersDetailView(APIView):
#     def get(self, request, user_id, *args, **kwargs):
#         print(user_id, " is the user_id")
#         return JsonResponse({"data": f"Fetching orders for user_id {user_id}"})


# class UserOrdersDetailView(ListAPIView):
#     serializer_class = OrderDetailsSerializer

#     def get_queryset(self):
#         user_id = self.kwargs.get('user_id','')
#         return Order.objects.filter(subscription_id__user_id=user_id).select_related('subscription_id').prefetch_related('items')

class UserOrdersDetailView(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id', '')
        return Order.objects.filter(subscription_id__user_id=user_id).select_related('subscription_id').prefetch_related('items__product')



    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset, many=True)  

    # def get(self, request, user_id, *args, **kwargs):
    #     print(user_id, " is the user_id")
    #     return JsonResponse({"data": f"Fetching orders for user_id {user_id}"})
