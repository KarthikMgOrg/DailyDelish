"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import { useProductStore } from "@/store/useProductStore";

export default function CartSheet() {
  const [open, setOpen] = useState(false);
  const cartCount = useProductStore((state) =>
    Object.values(state.cart).reduce((sum, item) => sum + item.quantity, 0)
  );
  const cartAmount = useProductStore((state) => state.getCartAmount());

  return (
    <>
      {/* Cart Button */}

      {/* Sheet Component */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            style={{ width: "150px" }}
            className={`
              relative h-[40px] text-md ml-2 w-auto p-2 rounded-2xl bg-primary-color text-white font-bold
              ${
                cartCount === 0
                  ? "bg-gray-400 hover:disabled:"
                  : "bg-primary-color"
              }
              `}
          >
            {cartCount === 0 ? (
              "My Cart"
            ) : (
              <div className="flex flex-col">
                <p>{cartCount} items</p>
                <p>₹{cartAmount}</p>
              </div>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
          <div className="mt-4">
            {/* TODO: Replace with dynamic cart items */}
            <p>No items in cart yet!</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
