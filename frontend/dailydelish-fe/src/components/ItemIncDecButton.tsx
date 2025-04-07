import { useProductStore } from "@/store/useProductStore";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type ItemIncDecButtonProps = {
  itemCount: number;
  sku: string;
};

export default function ItemIncDecButton({
  itemCount,
  sku,
}: ItemIncDecButtonProps) {
  const { cart, addToCart, removeFromCart } = useProductStore();
  const existingItem = cart[sku].product;

  const handleIncrement = (e: any) => {
    e.stopPropagation();
    addToCart(sku);
  };

  const handleDecrement = (e: any) => {
    e.stopPropagation();
    removeFromCart(sku);
  };

  return (
    <div className="flex flex-row">
      <Minus onClick={handleDecrement}></Minus>
      <p>{itemCount}</p>
      <Plus onClick={handleIncrement}></Plus>
    </div>
  );
}
