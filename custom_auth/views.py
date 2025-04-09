from weakref import ref
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

# Create your views here.
from .serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if request.query_params.get("dev") == "true":
            return Response({
                "access": response.data['access'],
                "refresh": response.data['refresh']
            })
        if response.status_code == 200:
            access = response.data['access']
            refresh = response.data['refresh']

            response.data = {'message': "login succesful"}
            response.set_cookie(
                key="refresh",
                value=refresh,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=7*24*3600
            )
            response.set_cookie(
                key="access",
                value=access,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=7*24*3600

            )
        return response
