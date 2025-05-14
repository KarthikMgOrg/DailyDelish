"use client";
import { orderDetailsType } from "@/types/orderDetailsType";

export default function OrderDetails({
  payload,
}: {
  payload: orderDetailsType;
}) {
  if (!payload) return <div>No Orders Found</div>;
  return (
    <div className="">
      <div className="">
        <h3 className="text-lg font-medium mt-3">Order #{payload.order_id}</h3>
        <p>Date: {payload.order_date}</p>
        <p>Status: {payload.status}</p>
        <p>Total Amount: ₹{payload.total_amount}</p>
        <h3 className="mt-2 font-semibold">Items:</h3>
        {payload.items.map((item) => (
          <div key={item.order_item_id}>
            <p>Product ID: {item.product_id}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price_at_order}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
