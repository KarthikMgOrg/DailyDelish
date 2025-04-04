"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

import { useState } from "react";

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="relative h-[40px] text-md ml-2 w-auto p-2 rounded-2xl bg-primary-color text-white font-bold">
          My Cart
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-3xl cursor-pointer">
        <DialogHeader>
          <DialogTitle className="cursor-pointer">My Cart</DialogTitle>
          <div className="flex flex-col gap-2">
            <p>Item 1</p>
            <p>Item 2</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
