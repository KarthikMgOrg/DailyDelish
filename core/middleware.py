from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response as DRFResponse


class JWTTokenFromCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.COOKIES.get("access_token")
        if token:
            request.META["HTTP_AUTHORIZATION"] = f"Bearer {token}"
        return self.get_response(request)


class CustomResponseMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if request.path.startswith("/api/v1/schema/"):
            return response
        if request.path.startswith("/api/v1/products/protected/"):
            return response

        if hasattr(response, 'data'):

            data = {
                "success": response.status_code < 400,
                "status_code": response.status_code,
                "data": response.data if response.status_code < 400 else None,
                "error": response.data if response.status_code >= 400 else None,
            }
            new_response = JsonResponse(data, status=response.status_code)

            # Copy cookies from the original response
            for cookie in response.cookies.values():
                new_response.set_cookie(
                    key=cookie.key,
                    value=cookie.value,
                    max_age=cookie.get('max-age'),
                    expires=cookie.get('expires'),
                    path=cookie.get('path', '/'),
                    domain=cookie.get('domain'),
                    secure=cookie.get('secure', False),
                    httponly=cookie.get('httponly', False),
                    samesite=cookie.get('samesite'),
                )

            return new_response
        else:
            return response
