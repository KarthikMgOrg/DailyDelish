from .serializers import SubscriptionSerializer, SubscriptionOrdersSerializer
from .models import Subscriptions
from rest_framework.generics import ListCreateAPIView, ListAPIView

# Create your views here.


class SubscriptionListCreateAPIView(ListCreateAPIView):
    queryset = Subscriptions.objects.all()
    serializer_class = SubscriptionSerializer
    lookup_field = 'subscription_id'


class SubscriptionOrderListAPIView(ListAPIView):
    # queryset = Subscriptions.objects.all()
    serializer_class = SubscriptionOrdersSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id','')
        return Subscriptions.objects.filter(user_id=user_id).prefetch_related('items__product')

    # def list(self, request, *args, **kwargs):
    #     user_id = kwargs.get('user_id','')
    #     return Subscriptions.objects.filter(user_id=user_id)
