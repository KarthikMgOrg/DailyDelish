export interface Product {
  mrp: number;
  product_id: number;
  name: string;
  description: string;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
  category_id: number;
  image: string;
  thumbnail: string;
  size: string;
  min_price: number;
  sku: string;
}

export interface Variant {
  product_image: string;
  id: number;
  name: string;
  mrp: number;
  available_price: number;
  stock: number;
  sku: string;
  product_id: string;
}
