import stat
from weakref import ref
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from .models import User
from .serializers import UserDetailsSerializer
from delivery_address.models import DeliveryAddress
from django.db import transaction

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


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"detail": "Logged out"}, status=200)
        response.delete_cookie("access")  # or whatever cookie you're using
        response.delete_cookie("refresh")  # or whatever cookie you're using
        # response.set_cookie("logged_in", False)
        return response


class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.prefetch_related(
            'user_details').get(id=request.user.id)
        serializer = UserDetailsSerializer(user)
        return Response(serializer.data)

    # queryset = User.objects.prefetch_related('user_details').all()
    # serializer_class = UserDetailsSerializer
    # lookup_field = 'id'


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        if User.objects.filter(email=data['email']).exists():
            return Response({"data": "Username/Email already exists"}, status=status.HTTP_401_UNAUTHORIZED)

        print(data, " is the data")
        with transaction.atomic():
            user = User.objects.create_user(
                email=data['email'],
                name=data['email'].split("@")[0],
                password=data['password']
            )

            DeliveryAddress.objects.create(
                user=user,
                street_address=data['address']['street'],
                city=data['address']['city'],
                state=data['address']['state'],
                postal_code=data['address']['postalCode'],
                country=data['address']['country'],
                is_default=True
            )

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
