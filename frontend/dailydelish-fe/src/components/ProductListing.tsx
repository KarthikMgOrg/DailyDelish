"use client";

import { AxiosResponse } from "axios";
// import { getProducts, getProductVariants } from "@/services/productService";
import ProductCard from "./ProductCard";
import { Product } from "@/types/productType";
import { useState, useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";

// async function fetchProducts() {

//   try {
//     const response: AxiosResponse = await getProducts();
//     return response.data;
//   } catch (error: any) {
//     return error.message;
//   }
// }

export default function ProductListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, fetchProducts, next, previous } = useProductStore();
  // const response = await fetchProducts();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <div className="container mx-auto mt-5">
      <div className="product-grid grid grid-cols-3 gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            productId={product.product_id}
          />
        ))}
      </div>
      <div>
        <Pagination className="mt-6 flex justify-center">
          <PaginationContent>
            {/* Previous Button */}
            {previous && (
              <PaginationItem>
                <PaginationPrevious
                  style={{ height: "40px", width: "40px" }}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              </PaginationItem>
            )}

            {/* Current Page */}
            <PaginationItem>
              <PaginationLink
                style={{ height: "40px", width: "40px", borderRadius: "100px" }}
                isActive
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            {/* Next Button */}
            {next && (
              <PaginationItem>
                <PaginationNext
                  style={{ height: "40px", width: "40px" }}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
