"use client";

import OrderDetails from "@/components/OrderDetails";
import { useState, useEffect } from "react";
import { userDetails,userOrderDetails } from "@/services/authService";
import { userDataType } from "@/types/userType";
import { orderDetailsType } from "@/types/orderDetailsType";

// type orderDetailsType = {
//   order_item_id: number;
//   quantity: number;
//   price_at_order: number;
//   total_price: number;
//   created_at: string;
//   product_id: number;
//   order: number;
// }

export default function Orders() {

  const [userData, setUserData] = useState<userDataType|null>(null);
  const [OrderDetailsData, setOrderDetailsData] =
    useState<orderDetailsType[]|null>(null);

  useEffect(() => {
    console.log("use effect called!");
    async function getUserDetails() {
      try {
        const resp = await userDetails();        
        setUserData(resp.data)
      } catch (error) {
        console.log("Failed to fetch user data", error);
        
      }
    }
    getUserDetails();
  }, [])

  useEffect(() => {
    if (!userData) return;
    async function getuserOrderDetails() {
      try {
        if (userData) {
          let userId = userData.id
          const resp = await userOrderDetails(userId);
          setOrderDetailsData(resp.data.results)
          console.log(OrderDetailsData, " is the orderDetailsData");
          
        }
      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    }
    getuserOrderDetails();
  }, [userData]);

  useEffect(() => {
    console.log(OrderDetailsData, " is the orderDetailsData")
  }, [OrderDetailsData])


  return (
    <div className="profile-page">
      <main>
        <h2 className="text-center mt-3 text-xl font-semibold">My Orders</h2>
        <div className="mt-1 flex flex-col items-center">
          {OrderDetailsData && OrderDetailsData.length > 0 ? (
            OrderDetailsData.map((order) => (
              <OrderDetails key={order.order_id} payload={order} />
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </main>
    </div>
  );
}
