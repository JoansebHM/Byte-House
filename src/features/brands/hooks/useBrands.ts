import { useQuery } from "@tanstack/react-query";
import type { BrandsType } from "../types/brand.type";
import { getBrands } from "../api/brands.api";

export const useBrands = () => {
  return useQuery<BrandsType>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await getBrands();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data || [];
    },
  });
};
