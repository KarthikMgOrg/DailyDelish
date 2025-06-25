from django.urls import path
from .views import OrderDetailDetailView

urlpatterns = [
    path('<int:order_item_id>/', OrderDetailDetailView.as_view(),
         name='order-detail-view'),
]
