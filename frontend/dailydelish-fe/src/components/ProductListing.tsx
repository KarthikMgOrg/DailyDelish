import { getProducts } from "@/services/productService";
import { AxiosResponse } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Product {
  product_id: number;
  name: string;
  description: string;
  mrp: string;
  available_price: string;
  unit: string;
  is_available: boolean;
  image: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  category: number;
}

async function fetchProducts() {
  try {
    const response: AxiosResponse = await getProducts();
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}

export default async function ProductListing() {
  const response = await fetchProducts();
  const products: Product[] = response.results;
  return (
    <div className="container mx-auto mt-5">
      <div className="product-grid grid grid-cols-3 gap-3">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="border border-gray-200 rounded-xl shadow-md"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded-2xl object-cover"
              ></Image>
            </div>
            <div
              className="product-text flex flex-col mb-2 ml-2"
              style={{ alignItems: "start" }}
            >
              <p className="mt-3 text-lg font-extrabold">{product.name}</p>
              <p className="mt-1">1 {product.unit}</p>
              <button className="mt-3 ml-[250px] h-[30px] w-[60px] rounded-2xl bg-[#deeed8] border border-[#9ac38c] text-[#35851f] font-primary font-bold text-sm">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
