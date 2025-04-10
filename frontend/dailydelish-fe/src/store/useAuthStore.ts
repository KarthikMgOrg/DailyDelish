import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { checkAuth, logoutUser } from "@/services/authService";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set, get) => ({
    isAuthenticated: false,
    loading: true,
    checkAuthStatus: async () => {
      try {
        const result = await checkAuth();
        set({ isAuthenticated: result.logged_in, loading: false });
      } catch (error) {
        set({ isAuthenticated: false, loading: false });
      }
    },
    logout: async () => {
      await logoutUser();
      set({ isAuthenticated: false });
    },
  }))
);
