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
import orange_banner from "@/../public/orange_banner.avif";
import avacado_banner from "@/../public/avacado_banner.avif";

export default function Banner() {
  return (
    <section className="relative w-full h-[200px] mt-1 rounded-2xl flex flex-col md:flex-row items-center overflow-hidden justify-between ">
      <div className="absolute inset-0 rounded-2xl">
        <Image
          style={{ height: "200px", objectFit: "cover" }}
          src={avacado_banner}
          alt="banner-1"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
      </div>
      <div className="absolute top-4 right-4 mb-[100px] font-primary text-4xl text-white font-extrabold transform -translate-y-1/2">
        Fresh, Organic & Delivered to Your Door!
        <p className=" font-light text-xl text-white">
          Premium fruits & vegetables, handpicked for you. Taste the freshness
          in every bite!
        </p>
      </div>
      <div className="absolute transform -translate-y-1/2 left-50 top-8">
        <Button variant={"link"} size={"sm"} className="text-white">
          Shop Now
        </Button>
      </div>
    </section>
  );
}
