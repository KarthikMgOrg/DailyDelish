"use client";
import { Dropdown, MenuProps, Typography } from "antd";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useUIStore } from "@/store/useUIStore";
import Image from "next/image";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useAuthStore } from "@/store/useAuthStore";
// import SubscriptionIncDecButton from "./SubscriptionIncDecButton";
import SubIncDecButton from "./SubIncDecButton";
import React, { useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { makeOrderPayment } from "@/services/paymentService";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import createOrder from "@/services/orderService";


export default function SubscriptionModal() {
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal } = useUIStore();
  const cartAmount = useProductStore((state) => state.getCartAmount());
  
  const {
    isSubscriptionModalOpen,
    openSubscriptionModal,
    closeSubscriptionModal,
  } = useUIStore();

  const { cart } = useProductStore();
  const { subscriptions, setSchedule } = useSubscriptionStore();

  const payAndSubscribe = async() => {
    console.log('performing payment and creating subscription')
    if (!isAuthenticated) {
      openLoginModal();
    }

    try {
      const totalAmount = cartAmount;
      console.log(totalAmount, " is the amount");

      const res = await makeOrderPayment({ amount: cartAmount });
      console.log(res);

      const options = {
        key: res.data.key_id,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "DailyDelish",
        description: "Order Payment",
        order_id: res.data.order_id,
        handler: async function (response: any) {
          const orderId = res.data.order_id;
          toast.success("Payment successful! 🎉");
          const items = Object.values(cart).map((item) => ({
            quantity: item.quantity,
            price_at_order: Number(item.product.mrp),
            product: item.product.product_id,
          }));

          console.log(items, " is the items");

          try {
            const verifyRes = await apiClient.post("/payment/verify_payment/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            console.log("Verification response", verifyRes.data);
            if (verifyRes.data.success) {
              // create an order
              const today = new Date();
              const formattedDate = today.toISOString().split("T")[0];
              const orderPayload = {
                order_date: formattedDate,
                total_amount: res.data.amount,
                items_data: items,
              };
              console.log(orderPayload, " is the orderPayload");

              const orderResp = await createOrder(orderPayload);
              console.log(orderResp, " is the orderResp");
            }
          } catch (err) {
            toast.error("Payment verification failed");
            console.error("Verification Error", err);
          }
        },
        prefill: {
          email: "user@example.com", // Replace with real user email
        },
        theme: {
          color: "#F97316",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();

      // add record to orders table
    } catch (error) {
      toast.error("Payment failed. Try again later.");
      console.error("Payment Error:", error);
    }


  }

  return (
    <Dialog
      open={isSubscriptionModalOpen}
      onOpenChange={(open) =>
        open ? openSubscriptionModal() : closeSubscriptionModal()
      }
    >
      <DialogContent className="max-h-screen w-screen rounded-2xl p-2 overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ font: "font-primary" }}>
            Pick a schedule for your items
          </DialogTitle>
        </DialogHeader>
        <div className="schedule-items overflow-x-hidden">
          {Object.entries(cart).map(([key, { product, quantity }]) => {
            const currentSchedule = subscriptions[product.product_id];
            const scheduleOptions: MenuProps["items"] = [
              { key: "Once", label: "Once" },
              { key: "Daily", label: "Daily" },
              { key: "Weekly", label: "Weekly" },
            ];
            return (
              <div
                key={key}
                className="flex justify-between items-center m-1 px-3 py-2 bg-gray-100 rounded-2xl shadow-sm text-xs h-[60px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-gray-600">₹{product.mrp}</p>
                    </div>
                  </div>
                  <SubIncDecButton schedule={currentSchedule || 'weekly'} productId={product.product_id} />
                  {/* <Dropdown
                    menu={{
                      items: scheduleOptions,
                      onClick: ({ key }) => {
                        console.log('onClick triggered');
                        
                        setSchedule(product.product_id, key);
                        setRefresh((prev) => prev + 1);
                      },
                    }}
                    trigger={["click"]}
                  >
                    <Typography.Link>
                      {currentSchedule || "Select Schedule"}
                    </Typography.Link>
                  </Dropdown> */}
                </div>
              </div>
            );
          })}
          <button
            onClick={payAndSubscribe}
            className="flex justify-between items-center m-1 px-3 py-2 bg-gray-100 rounded-2xl shadow-sm text-xs h-[60px] text-white font-bold"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            Pay and Subscribe
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
