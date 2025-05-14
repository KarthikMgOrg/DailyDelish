from django.urls import include, path
from .views import ListAddressView, DetailAddressView, UserAddressListView

urlpatterns = [
    path('', ListAddressView.as_view(), name='list-address'),
    path('<int:pk>/', DetailAddressView.as_view(), name='detail-address'),
    path('user/<int:pk>/', UserAddressListView.as_view(), name='user-address'),
]
