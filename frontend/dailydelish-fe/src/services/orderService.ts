import apiClient from "@/lib/apiClient";

interface orderPayload {
  order_date: string;
  total_amount: number;
}

// export default async function create

export default async function createOrder(payload: orderPayload) {
  try {
    const response = await apiClient.post("/orders/", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.detail || "Failed to create an order"
    );
  }
}
