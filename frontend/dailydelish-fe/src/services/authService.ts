import apiClient from "@/lib/apiClient";
import publicApiClient from "@/lib/publicApiClient";

interface loginCreds {
  email: string;
  password: string;
}

export async function loginUser(credentials: loginCreds) {
  try {
    const response = await apiClient.post("/token/", credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Login failed");
  }
}

export async function checkAuth() {
  try {
    const response = await apiClient.get("/products/protected/");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Unauthorized");
  }
}
