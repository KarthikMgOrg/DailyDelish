from django.urls import path
from .views import CookieTokenObtainPairView, LogoutView, UserDetailsView

urlpatterns = [
    path('login/', CookieTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout-view'),
    path('user_details/', UserDetailsView.as_view(), name='user-details')
]
