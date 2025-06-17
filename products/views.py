import rest_framework.status as status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.db.models import Q
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


@permission_classes([AllowAny])
class ProductSearchView(APIView):


    def get(self, request, *args, **kwargs):
        search_term = kwargs.get('name','')
        if search_term:
            queryset = Product.objects.filter(Q(name__istartswith=search_term))
        else:
            queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def auth_status(request):
    return Response({"logged_in": True, "user": request.user.email})


