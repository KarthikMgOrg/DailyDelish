from rest_framework.serializers import ModelSerializer
from subscription_items.serializers import SubscriptionItemsSerializer
from .models import Subscriptions
from subscription_items.models import SubscriptionItems


class SubscriptionSerializer(ModelSerializer):
    class Meta:
        model = Subscriptions
        fields = '__all__'


class SubscriptionOrdersSerializer(ModelSerializer):
    items = SubscriptionItemsSerializer(many=True)
    class Meta:
        model = Subscriptions
        fields = '__all__'


