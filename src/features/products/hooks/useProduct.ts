import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../api/products.api";
import type { ProductType } from "../types/product.type";

export const useProduct = (slug: string) => {
  return useQuery<ProductType>({
    queryKey: ["products", slug],
    queryFn: async () => {
      const response = await getProductBySlug(slug);
      if (response.error) {
        throw new Error(response.error.message);
      }
      if (!response.data) {
        throw new Error("Product not found");
      }
      return response.data;
    },
  });
};
