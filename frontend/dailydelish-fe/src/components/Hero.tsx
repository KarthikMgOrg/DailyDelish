import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-primary/10 py-16 px-6 md:py-24 lg:py-32">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-10 text-center md:flex-row md:text-left">
        {/* Left Side - Text */}
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Welcome to <span className="text-primary">DailyDelish</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover the best healthy & delicious meals, made just for you.
          </p>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Button className="px-6 py-3 text-lg">Get Started</Button>
            <Button variant="outline" className="px-6 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full max-w-md md:max-w-lg">
          <Image
            src="/hero-image.png"
            alt="Hero Illustration"
            width={500}
            height={500}
            className="mx-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
