import { array, boolean, number, object, string } from "valibot";

export const ReviewSchema = object({
  id: number(),
  created_at: string(),
  stars: number(),
  description: string(),
  user_name: string(),
  approved: boolean(),
  reviews_images: array(
    object({
      id: number(),
      image_url: string(),
    })
  ),
});

export const ReviewsSchema = array(ReviewSchema);
