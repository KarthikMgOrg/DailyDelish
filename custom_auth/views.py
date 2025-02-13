from django.shortcuts import render
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class LoginView(APIView):

    def get(self, request, *args, **kwargs):
        return Response({"data": "hello world"}, status.HTTP_200_OK)
    