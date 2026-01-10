import { useQuery } from "@tanstack/react-query";
import type { ReviewsType } from "../types/review.type";
import { getReviews } from "../api/reviews.api";

export const useReviews = () => {
  return useQuery<ReviewsType>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await getReviews();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data || [];
    },
  });
};
