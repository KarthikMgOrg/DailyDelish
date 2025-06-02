import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface useUIStoreState {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isVariantModalOpen: boolean;
  openVariantModal: () => void;
  closeVariantModal: () => void;
  isSubscriptionModalOpen: boolean;
  openSubscriptionModal: () => void;
  closeSubscriptionModal: () => void;
}

export const useUIStore = create<useUIStoreState>()(
  devtools(
    (set) => ({
      isLoginModalOpen: false,
      openLoginModal: () => set({ isLoginModalOpen: true }),
      closeLoginModal: () => set({ isLoginModalOpen: false }),

      isVariantModalOpen: false,
      openVariantModal: () => set({ isVariantModalOpen: true }),
      closeVariantModal: () => set({ isVariantModalOpen: false }),

      isSubscriptionModalOpen: false,
      openSubscriptionModal: () => set({ isSubscriptionModalOpen: true }),
      closeSubscriptionModal: () => set({ isSubscriptionModalOpen: false }),
    }),
    {
      name: "UI store",
    }
  )
);
