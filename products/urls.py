from django.urls import include, path
from .views import ListProductsView, ProductVariantRetrieveAPIView

urlpatterns = [
    path('', ListProductsView.as_view(), name='list-products'),
    path('variants/<int:product_id>/',
         ProductVariantRetrieveAPIView.as_view(), name='get-variants')
]
