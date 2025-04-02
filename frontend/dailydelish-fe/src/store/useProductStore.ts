import { getProductVariants } from "@/services/productService";
import { create } from "zustand";

interface Variant {
  id: number;
  name: string;
  mrp: number;
  available_price: number;
  stock: number;
  sku: string;
  product_id_id: string;
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
  category_id: number;
  image: string;
  thumbnail: string;
  size: string;
}

interface ProductStore {
  variants: Record<number, Variant[]>;
  cart: Product[];
  fetchVariants: (productId: number) => Promise<void>;
  addToCart: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  variants: {},
  cart: [],
  fetchVariants: async (productId) => {
    const response = await getProductVariants(productId);
    const data = response.ok ? await response.json() : [];
    set((state) => ({
      variants: { ...state.variants, [productId]: data },
    }));
  },
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
}));
