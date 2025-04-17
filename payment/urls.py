from django.urls import path
from .views import CreateRazorpayOrder

urlpatterns = [
    path('create_order/', CreateRazorpayOrder.as_view(), name='create-order')
]
