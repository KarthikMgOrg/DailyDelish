"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import { getProducts, getProductVariants } from "@/services/productService";
import { useProductStore } from "@/store/useProductStore";
import { useState } from "react";

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
  size: string;
}

type ProductProps = {
  product: Product;
};

async function fetchProductVariants(productId: number): Promise<void> {
  try {
    const response = await getProductVariants(productId);
    console.log(response);
  } catch (error: any) {
    return error.message;
  }
}

export default function ProductCard({ product }: ProductProps) {
  const { variants, cart, fetchVariants, addToCart } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      key={product.product_id}
      style={{ borderRadius: "10px" }}
      className="border border-gray-200 shadow-sm"
    >
      <div className="relative w-full h-12">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="sm"
          className="rounded-2xl object-contain"
        ></Image>
      </div>
      <div
        className="product-text flex flex-col mb-2 ml-2"
        style={{ alignItems: "start" }}
      >
        <Badge
          className="mt-1 p-0 bg-gray-100 rounded-3xl flex flex-row"
          variant={"outline"}
        >
          <Timer
            style={{
              height: "15px",
              width: "15px",
              margin: 0,
              padding: 0,
            }}
          />
          <p className="font-bold">30 MINS</p>
        </Badge>
        <p className="mt-1 text-lg font-extrabold">{product.name}</p>
        <p className=" text-gray-500">{product.size}</p>
        <div className="button-with-price flex flex-row justify-between">
          <div className="price text-sm text-black font-extrabold">
            {product.mrp}
          </div>
          <button
            onClick={() => fetchProductVariants(product.product_id)}
            className="mt-1 ml-[250px] h-[30px] w-[60px] rounded-2xl bg-[#deeed8] border border-[#9ac38c] text-[#35851f] font-primary font-bold text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
