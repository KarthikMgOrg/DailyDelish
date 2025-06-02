import Image from "next/image";
import fruitsSubCat from "@/../public/fruits_subcat.png";
import dairySubCat from "@/../public/dairy_subcat.png";
import attaSubCat from "@/../public/atta_subcat.png";
import meatSubCat from "@/../public/meat_subcat.png";
import masalaSubCat from "@/../public/masala_subcat.png";
import teaCoffeeSubCat from "@/../public/tea_coffee_subcat.png";

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
