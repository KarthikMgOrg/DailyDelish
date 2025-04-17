import apiClient from "@/lib/apiClient";

interface createOrderProps {
  amount: number;
}

export const createOrder = async ({ amount }: createOrderProps) => {
  try {
    const response = await apiClient.post("/payment/create_order/", { amount });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.detail || "Failed to create Razorpay order"
    );
  }
};
