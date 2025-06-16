"use client";
import { Dropdown, MenuProps, Typography } from "antd";
import { useProductStore } from "@/store/useProductStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useUIStore } from "@/store/useUIStore";
import Image from "next/image";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
// import SubscriptionIncDecButton from "./SubscriptionIncDecButton";
import SubIncDecButton from "./SubIncDecButton";
import React, { useState } from "react";

export default function SubscriptionModal() {
  const {
    isSubscriptionModalOpen,
    openSubscriptionModal,
    closeSubscriptionModal,
  } = useUIStore();

  const { cart } = useProductStore();
  const { subscriptions, setSchedule } = useSubscriptionStore();

  const [localSchedules, setLocalSchedules] = useState<Record<string, string>>({});
  const [refresh, setRefresh] = useState(0);
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
            className="flex justify-between items-center m-1 px-3 py-2 bg-gray-100 rounded-2xl shadow-sm text-xs h-[60px] text-white font-bold"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            Set Schedule
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
