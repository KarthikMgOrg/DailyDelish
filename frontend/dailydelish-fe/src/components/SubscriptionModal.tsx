"use client";
import { useProductStore } from "@/store/useProductStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useUIStore } from "@/store/useUIStore";

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
        {Object.entries(cart).map(([key, { product, quantity }]) => {
          return (
            <div key={key}>
              <p>
                {product.name} - ₹{product.mrp}
              </p>
              <p>Qty: {quantity}</p>
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
