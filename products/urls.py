from django.urls import include, path
from .views import ListProductsView

urlpatterns = [
    path('', ListProductsView.as_view(), name='list-products'),
]
