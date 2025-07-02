// export type orderDetailsType = {
//   order_date: string;
//   order_id: number;
//   status: string;
//   subscription_id: number;
//   total_amount: string;
//   created_at: string;
//   items: {
//     order_item_id: number;
//     order: number;
//     price_at_order: string;
//     product_id: {
//       product_id: number,
//       min_price: string,
//       sku: string,
//       name: string,
//       description: string,
//       is_available: boolean,
//       image: string,
//       thumbnail:string,
//       size: string,
//       created_at: string,
//       updated_at: string,
//       category: number
//     };
//     quantity: number;
//     total_price: string;
//     created_at: string;
//   }[];
// };

export type orderDetailsType = {
  order_date: string;
  order_id: number;
  status: string;
  subscription_id: number;
  total_amount: string;
  created_at: string;
  items: {
    order_item_id: number;
    order: number;
    price_at_order: string;
    product: {
      product_id: number;
      min_price: string;
      sku: string;
      name: string;
      description: string;
      is_available: boolean;
      image: string;
      thumbnail: string;
      size: string;
      created_at: string;
      updated_at: string;
      category: number;
    };
    quantity: number;
    total_price: string;
    created_at: string;
  }[];
};