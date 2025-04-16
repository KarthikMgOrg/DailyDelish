"use client";
import { Variant } from "@/types/productType";
import Image from "next/image";
import ItemIncDecButton from "./ItemIncDecButton";
import { useProductStore } from "@/store/useProductStore";
import { MouseEvent } from "react";

type variantItemProps = {
  variant: Variant;
};

type addToCartVariantProps = {
  e: any;
  variant: variantItemProps;
};

export default function VariantItem({ variant }: variantItemProps) {
  const { getItemCount, addToCart } = useProductStore();
  const itemCount = getItemCount(variant.sku);
  console.log(itemCount, " is the itemCount");

  const handleClickVariant = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    variant: Variant
  ) => {
    addToCart(variant.sku);
  };

  return (
    <div className="variant-item rounded-2xl shadow-md flex flex-row gap-x-1 p-2 w-full">
      <Image
        src={variant.image}
        alt="product-image"
        width={50}
        height={100}
        quality={100}
        priority={true}
      />
      <h3>{variant.name}</h3>
      <h3>
        {variant.sku.split("_")[1].toLowerCase() === "kilogram"
          ? "1 kg"
          : "1 unit"}
      </h3>
      <h3 className="line-through">₹{variant.mrp}</h3>
      <h3 className="text-bold">₹{variant.available_price}</h3>
      <button
        onClick={(e) => handleClickVariant(e, variant)}
        className={`h-[30px] w-[60px] rounded-2xl border font-primary font-bold text-sm
        ${
          itemCount > 0
            ? "bg-[#328617] border-[#5cc97b] text-white" // Active state
            : "bg-[#deeed8] border-[#9ac38c] text-[#35851f]" // Default state
        }`}
      >
        {itemCount > 0 ? (
          <ItemIncDecButton itemCount={itemCount} sku={variant.sku} />
        ) : (
          "Add"
        )}
      </button>
    </div>
  );
}
