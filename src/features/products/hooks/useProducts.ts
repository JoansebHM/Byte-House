import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.api";
import type { ProductsType } from "../types/product.type";

export const useProducts = () => {
  return useQuery<ProductsType>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProducts();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data || [];
    },
  });
};


