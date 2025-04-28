from django.urls import path
from .views import CreateRazorpayOrder, VerifyPayment

urlpatterns = [
    path('make_order_payment/', CreateRazorpayOrder.as_view(),
         name='make-order-payment'),
    path('verify_payment/', VerifyPayment.as_view(), name='verify-payment')
]
