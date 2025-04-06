"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
// import { getProducts, getProductVariants } from "@/services/productService";
import { useProductStore } from "@/store/useProductStore";
import { useState } from "react";
import { Product, Variant } from "@/types/productType";
import { Skeleton } from "./ui/skeleton";
import ItemIncDecButton from "./ItemIncDecButton";
import VariantModal from "./variantModal";

type ProductProps = {
  product: Product;
  productId: number;
};

// async function fetchProductVariants(productId: number): Promise<void> {
//   try {
//     const response = await getProductVariants(productId);
//     console.log(response.results, " is the variants ");

//     return response.results;
//   } catch (error: any) {
//     return error.message;
//   }
// }

export default function ProductCard({ product, productId }: ProductProps) {
  const { variants, cart, products, getItemCount, fetchVariants, addToCart } =
    useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemCount = getItemCount(product.product_id);

  const handleAddClick = async (e: any, product: Product) => {
    console.log(e, " is the event");
    e.target.style = "backgroundColor:red";

    if (!variants[product.product_id]) {
      await fetchVariants(product.product_id);
    }
    const updatedVariants: Record<number, Variant[]> =
      useProductStore.getState().variants;
    console.log(updatedVariants, " is the updatedVariants");
    if (updatedVariants[product.product_id]?.length > 0) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      addToCart(product, productId);
    }

    // update Button Item Count
  };

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
        <div className="button-with-price flex flex-row items-center">
          <div className="font-extrabold">From ₹</div>
          <span className="font-extrabold">{product.min_price}</span>
          <button
            onClick={(e) => handleAddClick(e, product)}
            className={`ml-[150px] h-[30px] w-[60px] rounded-2xl border font-primary font-bold text-sm
            ${
              itemCount > 0
                ? "bg-[#328617] border-[#5cc97b] text-white" // Active state
                : "bg-[#deeed8] border-[#9ac38c] text-[#35851f]" // Default state
            }`}
          >
            {itemCount > 0 ? (
              <ItemIncDecButton
                itemCount={itemCount}
                productId={product.product_id}
              />
            ) : (
              "Add"
            )}
          </button>
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <VariantModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}
