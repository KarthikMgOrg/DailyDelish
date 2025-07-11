import apiClient from "@/lib/apiClient";
import publicApiClient from "@/lib/publicApiClient";

export async function getProducts(currentPage: number) {
  try {
    const response = await publicApiClient.get(
      `/products/?page=${currentPage}`
    );
    console.log(response.data, " is the getProducts");
    
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
}

export async function getProductByID(productId: number) {
  try {
    const response = await publicApiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
}

export async function getProductVariants(productId: number) {
  try {
    const response = await publicApiClient.get(
      `/product_variants/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product variants: ", error);
    throw error;
  }
}

export async function getVariantBySku(sku: string) {
  try {
    const response = await publicApiClient.get(`/product_variants/sku/${sku}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
}

export async function searchProductByName(name: string) {
  try {
    const response = await publicApiClient.get(`/products/search/${name}`);
    return response.data
  } catch (error) {
    console.error("Error search products: ", error);
    throw error;
  }
}