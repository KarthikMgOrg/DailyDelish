import ImageCarousel from "@/components/Carousel";
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Subcategory from "@/components/Subcategory";
import ProductListing from "@/components/ProductListing";

interface productType {
  product_id: number;
  name: string;
  description: string;
  mrp: string;
  available_price: string;
  unit: string;
  category: number;
  is_available: boolean;
  image: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export default async function Home() {
  return (
    <main className="mt-0 w-full ">
      <ImageCarousel />
      <div className="frame m-0.5">
        <Banner />
        <Categories />
        <Subcategory />
        <ProductListing />
      </div>
    </main>
  );
}
