from django.urls import path
from .views import OrdersListCreateAPIView

urlpatterns = [
    path('', OrdersListCreateAPIView.as_view(),
         name='order-list-create')
]
