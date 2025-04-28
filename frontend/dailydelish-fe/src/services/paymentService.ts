import apiClient from "@/lib/apiClient";

interface makeOrderPaymentProps {
  amount: number;
}

export const makeOrderPayment = async ({ amount }: makeOrderPaymentProps) => {
  try {
    const response = await apiClient.post("/payment/make_order_payment/", {
      amount,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.detail || "Failed to create Razorpay order"
    );
  }
};
