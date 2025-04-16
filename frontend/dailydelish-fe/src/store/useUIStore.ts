import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface useUIStoreState {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isVariantModalOpen: boolean;
  openVariantModal: () => void;
  closeVariantModal: () => void;
}

export const useUIStore = create<useUIStoreState>()(
  devtools(
    (set, get) => ({
      isLoginModalOpen: false,
      openLoginModal: () => set({ isLoginModalOpen: true }),
      closeLoginModal: () => set({ isLoginModalOpen: false }),

      isVariantModalOpen: false,
      openVariantModal: () => set({ isVariantModalOpen: true }),
      closeVariantModal: () => set({ isVariantModalOpen: false }),
    }),
    {
      name: "UI store",
    }
  )
);
