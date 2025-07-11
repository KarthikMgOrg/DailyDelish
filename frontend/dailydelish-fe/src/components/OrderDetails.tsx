"use client";
import { orderDetailsType } from "@/types/orderDetailsType";

export default function OrderDetails({ order }: { order: orderDetailsType }) {

  if (!order) return <div>No Orders Found</div>;

  console.log(order,  " is the input order ");
  

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
          <span className="font-bold">Order No:</span> {order.order_id}
        </p>
        <p>
          <span className="font-bold">Date:</span> {order.order_date}
        </p>
        <p>
          <span className="font-bold">Status:</span> {order.status}
        </p>
        <p>
          <span className="font-bold">Total Amount:</span> ₹
          {order.total_amount}
        </p>
      </div>
      <div className="order-items">
        <h3>Order Items</h3>
        <div className="flex gap-2 mt-2">
          {order.items && order.items.map((item) => (
            <img
              key={item.order_item_id}
              className="h-[50px] w-[50px] rounded-2xl object-cover"
              src={item.product.image}
              alt={`Product ${item.product.name}`}
            />
          ))}
        </div>
      </div>
      {/* <h3 className="mt-2 font-semibold">Items:</h3> */}
    </div>
  );
}
