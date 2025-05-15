from ast import Or
from math import log
from rest_framework.serializers import ModelSerializer

from delivery_address.models import DeliveryAddress
from subscription_items.models import SubscriptionItems
from .models import Order
from order_details.serializers import OrderDetailsSerializer
from django.db import transaction
from order_details.models import OrderDetails
from subscriptions.models import Subscriptions
from datetime import datetime
from rest_framework import serializers
from products.serializers import ProductSerializer

class OrderSerializer(ModelSerializer):
    items = OrderDetailsSerializer(many=True, write_only=True)
    subscription_id = serializers.PrimaryKeyRelatedField(
        queryset=Subscriptions.objects.all(), required=False, write_only=True)
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        print('inside create function')
        items_data = validated_data.pop('items', None)
        user = self.context['request'].user
        with transaction.atomic():
            # get user address id
            address_id = DeliveryAddress.objects.filter(
                user=user.id).first()
            
            #lets create a subscription
            subscription = Subscriptions.objects.create(
                user_id=user,
                address_id=address_id,
                start_date=datetime.now().strftime("%Y-%m-%d"),
                end_date=datetime.now().strftime("%Y-%m-%d"),
                next_delivery_date=datetime.now().strftime("%Y-%m-%d")
            )
            #second let create an order for the above subscription
            # print(validated_data)

            # Optionally, modify validated_data here if needed
            # validated_data['user'] = user
            validated_data['subscription_id'] = subscription  # if this FK exists

            order = Order.objects.create(**validated_data)
            # order = Order.objects.create(
            #     order_date=validated_data['order_date'],
            #     total_amount=validated_data['total_amount'],
            #     items = items_data,
            #     subscription_id = subscription
            #     )
            for item in items_data:
                # add order to orderDetails
                item['order'] = order
                OrderDetails.objects.create(**item)

                #add items to subscription items
                SubscriptionItems.objects.create(
                    quantity=item['quantity'], product=item['product_id'], subscription_id=subscription)

            
            return order

        # return super().create(validated_data)


class OrderDetailsSerializer(ModelSerializer):
    items = OrderDetailsSerializer(many=True)
    subscription_id = serializers.PrimaryKeyRelatedField(
        queryset=Subscriptions.objects.all(), required=False)
    class Meta:
        model = Order
        managed = True
        fields = '__all__'