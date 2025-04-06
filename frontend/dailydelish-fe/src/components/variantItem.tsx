"use client";
import { Variant } from "@/types/productType";
import Image from "next/image";

type variantItemProps = {
  variant: Variant;
};

export default function VariantItem({ variant }: variantItemProps) {
  return (
    <div className="variant-item bg-gray-300 rounded-2xl shadow-md flex flex-row gap-x-2">
      <p>Image</p>
      <p>Title</p>
      <p>Quantity</p>
      <p>Price</p>
    </div>
  );
}
