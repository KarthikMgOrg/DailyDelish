"use client";
import { useProductStore } from "@/store/useProductStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useUIStore } from "@/store/useUIStore";
import Image from "next/image";

export default function SubscriptionModal() {
  const {
    isSubscriptionModalOpen,
    openSubscriptionModal,
    closeSubscriptionModal,
  } = useUIStore();

  const { cart } = useProductStore();

  return (
    <Dialog
      open={isSubscriptionModalOpen}
      onOpenChange={(open) =>
        open ? openSubscriptionModal() : closeSubscriptionModal()
      }
    >
      <DialogContent className="h-screen w-screen rounded-2xl">
        <DialogHeader>
          <DialogTitle style={{ font: "font-primary" }}>
            Pick a schedule for your items
          </DialogTitle>
        </DialogHeader>
        <div className="schedule-items overflow-y-auto">
          {Object.entries(cart).map(([key, { product, quantity }]) => {
            return (
              <div
                key={key}
                className="grid grid-cols-2 justify-items-end gap-x-1 px-3 py-2 w-full bg-gray-100 rounded-2xl shadow-sm text-xs"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                <div className="flex flex-row gap-x-1">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                  />
                  <p>{product.name}</p>
                  <p>
                    <strong>₹{product.mrp}</strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
