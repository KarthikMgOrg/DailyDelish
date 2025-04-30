"use client";

import OrderDetails from "@/components/OrderDetails";

export default function Orders() {
  return (
    <div className="profile-page">
      <main>
        <h2 className="text-center mt-3 text-xl font-semibold">My Orders</h2>
        <div className="mt-1 flex flex-cols-2 justify-center">
          {<OrderDetails />}
        </div>
      </main>
    </div>
  );
}
