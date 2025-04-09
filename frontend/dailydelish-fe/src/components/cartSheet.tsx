"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { X, Timer } from "lucide-react";
import CartSheetItems from "./CartSheetItems";
import BillDetails from "./BillDetails";

export default function CartSheet() {
  const [open, setOpen] = useState(false);
  const cartCount = useProductStore((state) =>
    Object.values(state.cart).reduce((sum, item) => sum + item.quantity, 0)
  );
  const cartAmount = useProductStore((state) => state.getCartAmount());
  const { cart } = useProductStore();

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
                  ? "bg-gray-400 pointer-events-none"
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
        <SheetContent className="p-0.5 [&>button.absolute]:hidden overflow-y-auto bg-gray-200">
          <div
            className="flex flex-row justify-between gap-x-2 w-full"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <SheetTitle className="text-sm m-2">My Cart</SheetTitle>
            {/* <h2 className="text-lg font-bold">Your Cart</h2> */}
            <Button
              className="h-[40px] w-[40px]"
              size="icon"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              <X
                className="shadow-none hover:shadow-none"
                style={{
                  height: "40px",
                  width: "40px",
                  pointerEvents: "none",
                }}
              />
            </Button>
          </div>
          <CartSheetItems />
          {/* <p>No items in cart yet!</p> */}
        </SheetContent>
      </Sheet>
    </>
  );
}
