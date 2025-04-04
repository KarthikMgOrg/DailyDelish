import { useProductStore } from "@/store/useProductStore";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type ItemIncDecButtonProps = {
  itemCount: number;
  productId: number;
};

export default function ItemIncDecButton({
  itemCount,
  productId,
}: ItemIncDecButtonProps) {
  const { cart, addToCart, removeFromCart } = useProductStore();
  const existingItem = cart[productId].product;

  const handleIncrement = (e: any) => {
    e.stopPropagation();
    addToCart(existingItem, productId);
  };

  const handleDecrement = (e: any) => {
    e.stopPropagation();
    removeFromCart(productId);
  };

  return (
    <div className="flex flex-row">
      <Minus onClick={handleDecrement}></Minus>
      <p>{itemCount}</p>
      <Plus onClick={handleIncrement}></Plus>
    </div>
  );
}
