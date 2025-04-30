import apiClient from "@/lib/apiClient";

interface orderPayload {
  order_date: string;
  total_amount: number;
  items: {
    product_id: number;
    quantity: number;
  }[];
}

// export default async function create

export default async function createOrder(payload: orderPayload) {
  console.log("Received payload:", payload);

  try {
    const response = await apiClient.post("/orders/", payload);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Detailed error from server
      console.error("Server responded with error:", error.response.data);

      const detail =
        error.response.data?.detail ||
        JSON.stringify(error.response.data, null, 2);

      throw new Error(detail);
    } else if (error.request) {
      // Request was made but no response
      console.error("No response received:", error.request);
      throw new Error("No response received from server.");
    } else {
      // Something else happened
      console.error("Error setting up the request:", error.message);
      throw new Error("Unexpected error occurred.");
    }
  }
}
