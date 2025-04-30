from ast import Or
from rest_framework.serializers import ModelSerializer
from .models import Order
from order_details.serializers import OrderDetailsSerializer
from django.db import transaction
from order_details.models import OrderDetails


class OrderSerializer(ModelSerializer):
    items = OrderDetailsSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data, " before")
        items_data = validated_data.pop('items', None)
        # del validated_data['items']
        print(validated_data, " after")
        # user = self.context['request'].user
        with transaction.atomic():
            order = Order.objects.create(**validated_data)
            for item in items_data:
                print(item, " is the item")
                item['order'] = order
                OrderDetails.objects.create(**item)
        return super().create(validated_data)
