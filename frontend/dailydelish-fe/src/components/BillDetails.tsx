"use client";

import { NotebookText } from "lucide-react";
import { Bike } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { deliveryCharge, handlingCharge } from "@/constants/charges";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";
import { useProductStore } from "@/store/useProductStore";
import { makeOrderPayment } from "@/services/paymentService";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import createOrder from "@/services/orderService";

type BillDetailsProps = {
  cartAmount: number;
};

export default function BillDetails({ cartAmount }: BillDetailsProps) {
  const { isAuthenticated } = useAuthStore();
  const { openLoginModal, openSubscriptionModal } = useUIStore();
  if (cartAmount <= 0) return "Your cart is a little lonely 🥲";

  const handleBuy = async () => {
    // debugger;
    console.log("clicked buy now");
    const { cart } = useProductStore.getState();

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
            product_id: item.product.product_id,
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
                items: items,
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
  };

  const handleSubscribe = async () => {
    console.log("subscribe clicked");
    if (!isAuthenticated) {
      openLoginModal();
    } else {
      openSubscriptionModal();
    }
  };

  return (
    <div className="bill-box" style={{ textAlign: "left" }}>
      <p
        className="text-md font-bold text-left mt-1"
        style={{ textAlign: "left" }}
      >
        {cartAmount > 0 ? "Bill Details" : ""}
      </p>
      <div className="bill-details p-2 bg-white grid grid-cols-2 justify-items-end text-sm rounded-2xl mt-1">
        <div className="bill-text-details">
          <div className="flex gap-x-0.5">
            <NotebookText
              strokeWidth={3}
              style={{ height: "20px", width: "20px" }}
            ></NotebookText>
            <span>Items Total</span>
          </div>
          <div className="flex gap-x-0.5 mt-0.5">
            <Bike
              strokeWidth={3}
              style={{ height: "20px", width: "20px" }}
            ></Bike>
            <span>Delivery Charge</span>
          </div>
          <div className="flex gap-x-0.5 mt-0.5">
            <ShoppingBag
              strokeWidth={3}
              style={{ height: "20px", width: "20px" }}
            ></ShoppingBag>
            <span>Handling Charge</span>
          </div>
          <p className="font-extrabold mt-1">Grand Total</p>
        </div>
        <div className="bill-totals">
          <div>₹{cartAmount}</div>
          <div className="mt-0.5">₹{deliveryCharge}</div>
          <div className="mt-0.5">₹{handlingCharge}</div>
          <div className="mt-1 font-extrabold">
            ₹{Number(cartAmount + deliveryCharge + handlingCharge).toFixed(2)}
          </div>
        </div>
      </div>
      <div
        className="buy-btn w-full mt-1 text-white relative p-1.5 rounded-[6px] overflow-hidden"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        {/* Invisible Clickable Layer */}
        <button
          onClick={handleBuy}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Buy Now"
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 font-extrabold z-20 text-white pointer-events-none">
          ₹{cartAmount}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 font-extrabold z-20 text-white pointer-events-none">
          Buy Now
        </div>
      </div>

      <div
        className="buy-btn w-full mt-1 text-white relative p-1.5 rounded-[6px] overflow-hidden"
        style={{ backgroundColor: "var(--secondary-color)" }}
      >
        {/* Invisible Clickable Layer */}
        <button
          onClick={handleSubscribe}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Subscribe"
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 font-extrabold z-20 text-white pointer-events-none">
          Set Delivery Interval
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 font-extrabold z-20 text-white pointer-events-none">
          Subscribe
        </div>
      </div>
    </div>
  );
}
