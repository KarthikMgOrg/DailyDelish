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
