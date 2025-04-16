from django.urls import path
from .views import CookieTokenObtainPairView, LogoutView, UserDetailsView, RegisterView

urlpatterns = [
    path('login/', CookieTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register-view'),
    path('logout/', LogoutView.as_view(), name='logout-view'),
    path('user_details/', UserDetailsView.as_view(), name='user-details')
]
