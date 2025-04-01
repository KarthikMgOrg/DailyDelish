"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";

export default function CartSheet() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Cart Button */}

      {/* Sheet Component */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="relative h-[40px] text-md ml-2 w-auto p-2 rounded-2xl bg-primary-color text-white font-bold"
          >
            My Cart
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
