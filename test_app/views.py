from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status
from rest_framework import authentication, permissions
# Create your views here.


class SimpleResponse(APIView):
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        print(self.permission_classes, " is the permissions class")
        return super().get_permissions()
    
    def get_renderers(self):
        print(self.renderer_classes, "rendere_Classes")
        return super().get_renderers()
    
    def get_throttles(self):
        print(self.throttle_classes, " throttle classes")
        return super().get_throttles()

    def get(self, request, *args, **kwargs):
        print(type(request), " is the type of request")
        print(request.data," request data")
        print(request.query_params, " query params")
        print(request.user, " User")
        print(request.auth, " auth")
        print(request.method, " Method")
        return Response({"data": "Hello"}, status=status.HTTP_200_OK)

    def initial(self, request, *args, **kwargs):
        print('calling initial')
        return super().initial(request, *args, **kwargs)