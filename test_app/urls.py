from django.urls import path
from .views import SimpleResponse

urlpatterns = [
    path('', SimpleResponse.as_view())
]
