import { getProducts, getProductVariants } from "@/services/productService";
import { create } from "zustand";
import { Variant, Product } from "@/types/productType";
import { devtools } from "zustand/middleware";
import { AxiosResponse } from "axios";
import { getProductByID, getVariantBySku } from "@/services/productService";

interface ProductStore {
  variants: Record<number, Variant[]>;
  cart: Record<string, { product: Product; quantity: number }>;
  products: Product[];
  next: string;
  previous: string;
  fetchProducts: (url?: number) => Promise<void>;
  fetchVariants: (productId: number) => Promise<void>;
  addToCart: (sku: string) => void;
  removeFromCart: (sku: string) => void;
  getItemCount: (sku: string) => 0;
  getVariantCount: (uniqueVariantId: string) => 0;
  getCartAmount: () => number;
  getTotalItemCountByProductId: (productId: number) => number;
}

export const useProductStore = create<ProductStore>()(
  devtools(
    (set, get) => ({
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
      addToCart: async (sku: string) => {
        console.log("skuId passed");
        let product = await getVariantBySku(sku);
        product = product.data;
        set((state) => {
          const existingItem = state.cart[sku];
          return {
            cart: {
              ...state.cart,
              [sku]: {
                product,
                quantity: existingItem ? existingItem.quantity + 1 : 1,
              },
            },
          };
        });
      },
      removeFromCart: (sku: string) => {
        // debugger;
        set((state) => {
          const existingItem = state.cart[sku];
          if (!existingItem) return state;
          const newQuantity = existingItem.quantity - 1;
          const updatedCart = { ...state.cart };
          if (newQuantity <= 0) {
            delete updatedCart[sku];
          } else {
            updatedCart[sku] = {
              ...existingItem,
              quantity: newQuantity,
            };
          }
          return { cart: updatedCart };
        });
      },
      getItemCount: (sku: string) => {
        return get().cart[sku]?.quantity;
      },
      getVariantCount(uniqueVariantId: string) {},
      getCartAmount() {
        const cart = get().cart;
        const amount = Object.values(cart).reduce((total, item) => {
          console.log(item, " is the current product in cart");

          const price = item.product.mrp || 0;
          return total + price * item.quantity;
        }, 0);
        return amount.toFixed(2);
      },
      getTotalItemCountByProductId: (productId: number) => {
        const { cart, variants } = get();
        const variantList = variants[productId] || [];
        let total = 0;

        // Include base product SKU if present
        for (const sku in cart) {
          const item = cart[sku];
          if (item.product.product_id === productId) {
            total += item.quantity;
          }
        }

        return total;
      },
    }),
    {
      name: "prod store",
    }
  )
);
