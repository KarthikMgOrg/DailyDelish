from django.urls import include, path
from .views import ListProductsView, DetailProductsView

urlpatterns = [
    path('', ListProductsView.as_view(), name='list-products'),
    path('<int:product_id>/', DetailProductsView.as_view(), name='detail-products'),
]
