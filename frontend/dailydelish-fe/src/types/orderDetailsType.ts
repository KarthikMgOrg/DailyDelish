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
        product_id: number;
        quantity: number;
        total_price: string;
        created_at: string;
    }[]
}