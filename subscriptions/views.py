from .serializers import SubscriptionSerializer
from .models import Subscriptions
from rest_framework.generics import ListCreateAPIView

# Create your views here.


class SubscriptionListCreateAPIView(ListCreateAPIView):
    queryset = Subscriptions.objects.all()
    serializer_class = SubscriptionSerializer
    lookup_field = 'subscription_id'
