"use client";
import { orderDetailsType } from "@/types/orderDetailsType";

export default function OrderDetails({
  payload,
}: {
  payload: orderDetailsType;
}) {
  if (!payload) return <div>No Orders Found</div>;
  return (
    <div className="items-center bg-white rounded-2xl p-2 m-2 grid grid-cols-2">
      <div className="order-details">
        <div className="delivery-info flex">
          <img
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/assets/ui/delivered_order_new.png"
            alt="delivery-tick"
            className="h-[40px] object-cover"
          />
          <p className="ml-2 text-xl font-bold">Arrived in 8 minutes</p>
        </div>
        <p className="text-md mt-3">
          <span className="font-bold">Order No:</span> {payload.order_id}
        </p>
        <p>
          <span className="font-bold">Date:</span> {payload.order_date}
        </p>
        <p>
          <span className="font-bold">Status:</span> {payload.status}
        </p>
        <p>
          <span className="font-bold">Total Amount:</span> ₹
          {payload.total_amount}
        </p>
      </div>
      <div className="order-items">
        <h3>Order Items</h3>
          <div className="flex gap-2 mt-2">
            {payload.items.map((item) => (
              <img
                key={item.order_item_id}
                className="h-[50px] w-[50px] rounded-2xl object-cover"
                src={item.product_id.image}
                alt={`Product ${item.product_id.name}`}
              />
            ))}
          </div>
      </div>
      {/* <h3 className="mt-2 font-semibold">Items:</h3> */}
    </div>
  );
}
