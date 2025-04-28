from pydoc import cli
import razorpay
import razorpay.errors
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
import razorpay
from django.conf import settings
from rest_framework import status
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


class VerifyPayment(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        try:
            client.utility.verify_payment_signature(
                {"razorpay_order_id": data["razorpay_order_id"],
                 "razorpay_payment_id": data["razorpay_payment_id"],
                 "razorpay_signature": data["razorpay_signature"], }
            )
            return Response({"status": "Payment verified"}, status=status.HTTP_200_OK)
        except razorpay.errors.SignatureVerificationError:
            return Response({"status": "Verification failed"}, status=status.HTTP_400_BAD_REQUEST)
