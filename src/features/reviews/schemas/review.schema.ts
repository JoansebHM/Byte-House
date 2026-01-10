import { array, boolean, number, object, string } from "valibot";

export const ReviewSchema = object({
  id: number(),
  created_at: string(),
  stars: number(),
  description: string(),
  user_name: string(),
  approved: boolean(),
});

export const ReviewsSchema = array(ReviewSchema);
