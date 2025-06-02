import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardAction,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";

import Image from "next/image";
import appleCategory from "@/../public/apple_category.png";
import carrotCategory from "@/../public/carrots_category.png";
import spinachCategory from "@/../public/spinach_category.png";

const categoryImages = [appleCategory, carrotCategory, spinachCategory];
const categoryTags = [
  "Crisp, juicy, and naturally sweet – a bite of freshness!",
  "Farm-fresh carrots, perfect for snacking or cooking.",
  "Pure green goodness for your healthy lifestyle.",
];

async function fetchCategories() {}

export default function Categories() {
  return (
    <div className="categories-tile grid grid-cols-3 gap-3 mt-3">
      {categoryImages.map((categoryImage, idx) => (
        <div
          key={idx}
          className="relative group overflow-hidden rounded-2xl shadow-xl"
        >
          <div className="item">
            <Image
              src={categoryImage}
              className="w-full h-20 object-cover blur-[4px] "
              alt="category"
            ></Image>
            <div className="font-primary absolute inset-0 text-white text-2xl p-2 font-extrabold top-5 bg-gradient-to-t from-black/40 to-transparent">
              {categoryTags[idx]}
            </div>
            <Button
              variant={"link"}
              size={"sm"}
              className="absolute top-8 right-18 text-white font-primary font-extrabold"
            >
              Shop Now
            </Button>
          </div>
          <span className="absolute inset-0"></span>
        </div>
      ))}
    </div>
  );
}
