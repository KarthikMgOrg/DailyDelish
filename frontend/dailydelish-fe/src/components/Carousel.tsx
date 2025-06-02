"use client";

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import carousel_1 from "@/../public/carousel_4.png";
import carousel_2 from "@/../public/carousel_5.png";
import carousel_3 from "@/../public/carousel_6.png";

const images = [carousel_1, carousel_2, carousel_3];

export default function ImageCarousel() {
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      if (nextButtonRef.current) {
        nextButtonRef.current.click(); // Simulates a click on the next button
      }
    }, 6000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="relative w-full"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={1600}
              height={400}
              className="rounded-xl shadow-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext style={{ display: "hidden" }} ref={nextButtonRef} />
    </Carousel>
  );
}
