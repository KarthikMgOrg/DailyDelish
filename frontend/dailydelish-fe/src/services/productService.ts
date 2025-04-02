import apiClient from "@/lib/apiClient";
import publicApiClient from "@/lib/publicApiClient";

export async function getProducts() {
  try {
    const response = await publicApiClient.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
}

export async function getProductVariants(productId: number) {
  try {
    const response = await apiClient.get(`/products/variants/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product variants: ", error);
    throw error;
  }
}
