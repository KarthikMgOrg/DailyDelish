import Image from "next/image";
import fruitsSubCat from "@/../public/fruits_subcat.avif";
import dairySubCat from "@/../public/dairy_subcat.avif";
import attaSubCat from "@/../public/atta_subcat.avif";
import meatSubCat from "@/../public/meat_subcat.avif";
import masalaSubCat from "@/../public/masala_subcat.avif";
import teaCoffeeSubCat from "@/../public/tea_coffee_subcat.avif";

const subCats = [
  fruitsSubCat,
  dairySubCat,
  meatSubCat,
  masalaSubCat,
  attaSubCat,
  teaCoffeeSubCat,
];

export default function Subcategory() {
  return (
    <div className="subcats grid grid-cols-6 mt-2 gap-x-4">
      {subCats.map((subCat, idx) => (
        <div
          className="relative subcatItem overflow-hidden h-[200px] w-[150px]"
          key={idx}
        >
          <Image
            className="absolute inset-0 w-full h-full object-fit"
            src={subCat}
            alt="some-subcat"
          ></Image>
        </div>
      ))}
    </div>
  );
}
