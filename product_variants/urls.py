from django.urls import include, path
from .views import ProductVariantRetrieveAPIView, ProductSkuRetrieveAPIView

urlpatterns = [
    path('<int:product_id>/', ProductVariantRetrieveAPIView.as_view(),
         name='get-variants'),
    path('sku/<str:sku>/', ProductSkuRetrieveAPIView.as_view(),
         name='get-variants-by-sku')
]
