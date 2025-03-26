import ImageCarousel from "@/components/Carousel";
import Banner from "@/components/Banner";

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

async function getProducts() {
  const result = await fetch("http://localhost:8000/api/v1/products/", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyOTI1ODY1LCJpYXQiOjE3NDI4Mzk0NjUsImp0aSI6IjY1ZDY5MTQ5ZWU2ZTQyNzhiMjBjYzE5ODkwNTdhNmRlIiwidXNlcl9pZCI6M30.c7zakIHInbSNAkSADWIpAgJQHL1KCkk8Xej9zblmUfU",
    },
  });
  return result.json();
}

export default async function Home() {
  // const response = await getProducts();
  return (
    <main className="mt-5 w-full">
      <ImageCarousel />
      <Banner />
    </main>
  );
}
