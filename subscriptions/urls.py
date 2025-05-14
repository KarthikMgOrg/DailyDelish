from django.urls import path
from .views import SubscriptionListCreateAPIView, SubscriptionOrderListAPIView
urlpatterns = [
    path('', SubscriptionListCreateAPIView.as_view(),
         name='subscription-list-create'),
    path('orders/<int:user_id>/', SubscriptionOrderListAPIView.as_view(), name='order-subscriptions'),
]
