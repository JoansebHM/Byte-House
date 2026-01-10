import { useQuery } from "@tanstack/react-query";
import type { CategoriesType } from "../types/category.type";
import { getCategories } from "../api/categories.api";

export const useCategories = () => {
  return useQuery<CategoriesType>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data || [];
    },
  });
};
