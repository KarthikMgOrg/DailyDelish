"use client";

import { userDetails } from "@/services/authService";
import { useEffect, useState } from "react";
import SubIncDecButton from "@/components/SubIncDecButton";


import {userDataType} from "@/types/userType"

export default function Profile() {
  const [userData, setUserData] = useState<userDataType | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await userDetails();
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    }
    fetchUserData();
  }, []);
  if (!userData) {
    return <div className="text-center mt-3">Loading...</div>; // Or show a spinner
  }
  return (
    <div className="profile-page">
      <main>
        <div className="user-details h-fit w-fit p-4 mt-4 mb-2 rounded-2xl shadow-md flex flex-col mx-auto bg-gray-100">
          <div className="mt-2">
            <span className="font-bold">Email:</span>
            <span className="ml-3">{userData?.email}</span>
          </div>

          <div className="mt-2">
            <span className="font-bold">Delivery Address:</span>
            <span className="ml-3">{userData?.delivery_address}</span>
          </div>
        </div>
        {<SubIncDecButton schedule="weekly" productId={1044}/>}
      </main>
    </div>
  );
}
