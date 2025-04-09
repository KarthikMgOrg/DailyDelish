from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view

from product_variants.models import ProductVariants
from .serializers import ProductSerializer
from products.models import Product
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.


@permission_classes([AllowAny])
class ListProductsView(ListAPIView):
    queryset = Product.objects.prefetch_related('variants').all()
    serializer_class = ProductSerializer


@permission_classes([AllowAny])
class DetailProductsView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'product_id'


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def auth_status(request):
    return Response({"logged_in": True, "user": request.user.email})
