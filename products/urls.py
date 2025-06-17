from django.urls import include, path
from .views import ListProductsView, DetailProductsView, ProductSearchView, auth_status

urlpatterns = [
    path('', ListProductsView.as_view(), name='list-products'),
    path('<int:product_id>/', DetailProductsView.as_view(), name='detail-products'),
    path('protected/', auth_status, name='protected-view'),
    path('search/<str:name>/', ProductSearchView.as_view(), name='product-search'),
]
