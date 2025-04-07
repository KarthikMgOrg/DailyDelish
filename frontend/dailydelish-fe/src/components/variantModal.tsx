import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/productType";
import VariantItem from "./variantItem";
type VariantModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedProduct: Product;
};

export default function VariantModal({
  isModalOpen,
  setIsModalOpen,
  selectedProduct,
}: VariantModalProps) {
  const { variants } = useProductStore();
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent
        className="rounded-3xl"
        style={{ width: "500px", padding: "20px", margin: "5px" }}
      >
        <DialogHeader>
          <DialogTitle style={{ font: "font-primary" }}>
            Select an option
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {variants[selectedProduct.product_id]?.map((variant) => (
            <VariantItem key={variant.id} variant={variant} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
