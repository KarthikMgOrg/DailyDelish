import apiClient from "@/lib/apiClient";
import publicApiClient from "@/lib/publicApiClient";

interface loginCreds {
  email: string;
  password: string;
}

export async function loginUser(credentials: loginCreds) {
  try {
    const response = await apiClient.post("/custom_auth/login/", credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Login failed");
  }
}

export async function registerUser(credentials: loginCreds) {
  try {
    const response = await publicApiClient.post(
      "/custom_auth/register/",
      credentials
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Registration Failed");
  }
}

export async function checkAuth() {
  try {
    const response = await apiClient.get("/products/protected/");
    console.log(response.data, " is the auth check response");

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Unauthorized");
  }
}

export async function logoutUser() {
  try {
    const response = await apiClient.post("/custom_auth/logout/");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail || "Unable to perform the operation"
    );
  }
}

export async function userDetails() {
  try {
    const response = await apiClient.get(`/custom_auth/user_details/`);
    return response.data;
  } catch (error: any) {
    error.response?.data?.detail || "Unable to perform the operation";
  }
}
