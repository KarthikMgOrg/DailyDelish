import { getProducts, getProductVariants } from "@/services/productService";
import { create } from "zustand";
import { Variant, Product } from "@/types/productType";
import { devtools } from "zustand/middleware";
import { AxiosResponse } from "axios";

interface ProductStore {
  variants: Record<number, Variant[]>;
  cart: Record<number, { product: Product; quantity: number }>;
  products: Product[];
  next: string;
  previous: string;
  fetchProducts: (url?: number) => Promise<void>;
  fetchVariants: (productId: number) => Promise<void>;
  addToCart: (product: Product, productId: number) => void;
  removeFromCart: (productId: number) => void;
  getItemCount: (productId: number) => 0;
  getCartAmount: () => number;
}

export const useProductStore = create<ProductStore>()(
  devtools((set, get) => ({
    variants: {},
    cart: [],
    products: [],
    count: 0,
    next: null,
    previous: null,
    fetchProducts: async (currentPage = 1) => {
      const response: AxiosResponse = await getProducts(currentPage);
      const data = response.data;

      set((state) => ({
        ...state,
        products: data.results,
        count: data.count,
        next: data.next,
        previous: data.previous,
      }));
    },
    fetchVariants: async (productId) => {
      const response = await getProductVariants(productId);
      console.log(response, " useProductStore");

      const data = response.data;
      console.log(data, " is before setting state");

      if (data.results.length > 1) {
        set((state) => ({
          ...state,
          variants: { ...state.variants, [productId]: data.results },
        }));
      }
    },
    addToCart: (product, productId) => {
      // debugger;
      // set((state) => ({ cart: [...state.cart, product] }), false, "addToCart");
      set((state) => {
        const existingItem = state.cart[product.product_id];
        return {
          cart: {
            ...state.cart,
            [product.product_id]: {
              product,
              quantity: existingItem ? existingItem.quantity + 1 : 1,
            },
          },
        };
      });
    },
    removeFromCart: (productId) => {
      // debugger;
      set((state) => {
        const existingItem = state.cart[productId];
        if (!existingItem) return state;
        const newQuantity = existingItem.quantity - 1;
        const updatedCart = { ...state.cart };
        if (newQuantity <= 0) {
          delete updatedCart[productId];
        } else {
          updatedCart[productId] = {
            ...existingItem,
            quantity: newQuantity,
          };
        }
        return { cart: updatedCart };
      });
    },
    getItemCount: (productId: number) => {
      return get().cart[productId]?.quantity;
    },
    getCartAmount() {
      const cart = get().cart;
      const amount = Object.values(cart).reduce((total, item) => {
        const price = item.product.min_price || 0;
        return total + price * item.quantity;
      }, 0);
      return amount.toFixed(2);
    },
  }))
);
