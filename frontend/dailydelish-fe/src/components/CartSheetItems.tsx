import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/productType";
import ItemIncDecButton from "./ItemIncDecButton";
import Image from "next/image";
import BillDetails from "./BillDetails";

export default function CartSheetItems() {
  const { cart, getItemCount } = useProductStore();
  const cartAmount = useProductStore((state) => state.getCartAmount());
  return (
    <>
      <div className="flex flex-col gap-y-1">
        {Object.entries(cart).map(([productId, item]) => {
          const itemCount = getItemCount(item.product.sku);
          return (
            <div
              key={productId}
              className="grid grid-cols-2 justify-items-end gap-x-1 px-3 py-2 w-full bg-gray-100 rounded-2xl shadow-sm text-xs"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              <div className="flex flex-row gap-x-1">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={50}
                  height={50}
                ></Image>
                <p>{item.product.name}</p>
                <p>
                  <strong>₹{item.product.mrp}</strong>
                </p>
              </div>
              <div className="w-[20px] h-[20px]">
                <button
                  className={`rounded-2xl border font-primary font-bold text-sm
              ${
                itemCount > 0
                  ? "bg-[#328617] border-[#5cc97b] text-white" // Active state
                  : "bg-[#deeed8] border-[#9ac38c] text-[#35851f]" // Default state
              }`}
                >
                  <ItemIncDecButton
                    itemCount={itemCount}
                    sku={item.product.sku}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <BillDetails cartAmount={cartAmount} />
    </>
  );
}
