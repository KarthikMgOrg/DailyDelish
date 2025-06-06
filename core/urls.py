
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from custom_auth.views import CookieTokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static
import debug_toolbar

urlpatterns = [
    path('admin/', admin.site.urls),
    path("__debug__/", include(debug_toolbar.urls)),
    path('accounts/', include('allauth.urls')),
    path('api/v1/token/', CookieTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='api-schema'),
    path('api/v1/schema/docs/', SpectacularSwaggerView.as_view(url_name="api-schema")),

    path('api/v1/custom_auth/', include('custom_auth.urls')),
    path('api/v1/address/', include('delivery_address.urls')),
    path('api/v1/products/', include('products.urls')),
    path('api/v1/product_variants/', include('product_variants.urls')),
    path('api/v1/payment/', include('payment.urls')),
    path('api/v1/orders/', include('orders.urls')),
    path('api/v1/subscriptions/', include('subscriptions.urls')),
    path('api/v1/order_details/', include('order_details.urls')),
    path('api/v1/test/', include('test_app.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
