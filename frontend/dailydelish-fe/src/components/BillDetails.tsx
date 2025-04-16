"use client";

import { NotebookText } from "lucide-react";
import { Bike } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { deliveryCharge, handlingCharge } from "@/constants/charges";

type BillDetailsProps = {
  cartAmount: number;
};

export default function BillDetails({ cartAmount }: BillDetailsProps) {
  if (cartAmount <= 0) return "Your cart is a little lonely 🥲";

  const handleBuy = () => {
    console.log("clicked buy now");
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
        className="buy-btn w-full mt-1 text-white relative p-1.5"
        style={{
          backgroundColor: "var(--primary-color)",
          borderRadius: "6px",
        }}
      >
        <div className="absolute left-1 font-extrabold top-0.75 translate -transform-x-0 transform-y-0 text-white">
          ₹{cartAmount}
        </div>
        <div className="absolute right-1 cursor-pointer font-extrabold top-0.75 translate -transform-x-0 transform-y-0 text-white">
          Buy Now
        </div>
      </div>
    </div>
  );
}
