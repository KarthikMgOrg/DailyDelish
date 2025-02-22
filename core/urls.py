
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from auth.views import CustomTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/v1/token/', CustomTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='api-schema'),
    path('api/v1/schema/docs/', SpectacularSwaggerView.as_view(url_name="api-schema")),
]