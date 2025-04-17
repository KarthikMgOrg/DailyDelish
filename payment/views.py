from pydoc import cli
import razorpay
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from django.conf import settings
# Create your views here.


class CreateRazorpayOrder(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        amount = float(request.data.get('amount', ''))

        # Ensure the amount is rounded to two decimal places
        amount = round(amount, 2)

        # Convert to integer by multiplying by 100 (to handle paise in INR)
        amount_in_paise = int(amount * 100)

        if not amount:
            return Response({"error": "Amount is required"}, status=400)

        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

        payment = client.order.create({
            "amount": amount_in_paise,
            "currency": "INR",
            "payment_capture": 1,
        })
        return Response({
            "order_id": payment["id"],
            "amount": payment["amount"],
            "currency": payment["currency"],
            "key_id": settings.RAZORPAY_KEY_ID,
        })
