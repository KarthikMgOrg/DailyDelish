import apiClient from "@/lib/apiClient";

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
