"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Input } from "./ui/input";
import dailyDelishLogo from "@/../public/daily_delish.jpg";
import { Search } from "lucide-react";
import LoginModal from "./LoginModal";
import CartModal from "./CartModal";
import CartSheet from "./cartSheet";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-background shadow-sm z-10 ">
      <div className="navbar-items flex flex-row m-0.5 h-[100px]">
        {/* <Image
          className="h-auto w-[100px] object-contain rounded-2xl"
          src={dailyDelishLogo}
          alt="dailydelish-logo"
        ></Image> */}
        <div className="title text-2xl font-extrabold ml-1">
          <span style={{ color: "var(--primary-color)" }}>Daily</span>
          <span style={{ color: "var(--secondary-color)" }}>Delish</span>
        </div>
        <div className="ml-2 vertical-line text-extralight bg-gray-300"></div>
        <div className="ml-2 text-sm delivery-info">
          <p className="font-bold text-lg overflow-clip">
            Delivery in 8 minutes
          </p>
          <p>Chennai, Tamilnadu, 600088</p>
        </div>
        <div className="relative ml-2 flex flex-row w-1/2 ">
          <Search className="absolute left-2 text-black " size={20} />
          <Input
            className="h-[50px] text-center ml-1 rounded-2xl bg-gray-100"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="relative login-btn text-md ml-4 p-1">
          {/* <Link href={"/login"}>
            <span className="absolute inset-0"></span>
            Login
          </Link> */}
          <LoginModal />
        </div>

        {/* <div
          className="relative product-cart text-md ml-2 p-1 w-auto rounded-xl"
          style={{
            backgroundColor: "var(--primary-color)",
            borderRadius: "5px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <Link href={"/cart"}>
            <span className="absolute inset-0"></span>
            My Cart
          </Link>
        </div> */}
        {/* <CartModal /> */}
        <CartSheet />
      </div>
    </nav>
  );
}
