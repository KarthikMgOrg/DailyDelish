from django.urls import path
from .views import OrdersListCreateAPIView, UserOrdersDetailView

urlpatterns = [
    path('', OrdersListCreateAPIView.as_view(),
         name='order-list-create'),
    path('<int:user_id>/', UserOrdersDetailView.as_view())
]
