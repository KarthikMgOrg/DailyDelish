"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import LoginModal from "./LoginRegisterModal";
import CartSheet from "./cartSheet";
import {searchProductByName} from "@/services/productService"


export default function Navbar() {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (name: string) => {
    console.log("handleSearch");
    
    try {
      const resp = await searchProductByName(name);
      setSearchResults(resp.data);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <nav className="fixed top-0 left-0 h-7 w-full bg-background shadow-sm z-10 ">
      <div className="navbar-items flex flex-row m-0.5">
        <div className="title text-2xl font-extrabold ml-1">
          <Link href={"/"}>
            <span style={{ color: "var(--primary-color)" }}>Daily</span>
            <span style={{ color: "var(--secondary-color)" }}>Delish</span>
          </Link>
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
            placeholder="Search 🍓"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              if (value === "") {
                setShowResults(false);
                setSearchResults([]);
              }
            }}
            onKeyDown={handleKeyDown}
          />
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-[60px] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-64 overflow-y-auto z-20">
              {searchResults.map((product: any) => (
                <div
                  key={product.id}
                  className="p-1 hover:bg-gray-100 cursor-pointer border-1 border-gray-200 rounded-xl"
                >
                  <div className="flex justify-between">
                    <div className="flex flex-row">
                      <img
                        src={product.image}
                        className="h-[30px] w-[30px] rounded-xl mr-1"
                        alt={product.name}
                      />
                      <p>{product.name}</p>
                    </div>
                    <p style={{ marginLeft: "8px", color: product.is_available ? "green" : "red" }}>
                      {product.is_available ? "Available" : "Out Of Stock"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative login-btn hover:bg-white text-md ml-4 p-1">
          {/* <Link href={"/login"}>
            <span className="absolute inset-0"></span>
            Login
          </Link> */}
          {<LoginModal />}
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
