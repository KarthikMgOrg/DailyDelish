from django.urls import include, path
from .views import ProductVariantRetrieveAPIView

urlpatterns = [
    path('<int:product_id>/',
         ProductVariantRetrieveAPIView.as_view(), name='get-variants')
]
