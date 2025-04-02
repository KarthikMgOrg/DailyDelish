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
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import { getProducts, getProductVariants } from "@/services/productService";
import ProductCard from "./ProductCard";

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
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
