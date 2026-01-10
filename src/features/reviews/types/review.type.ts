import type { InferOutput } from "valibot";
import type { ReviewsSchema, ReviewSchema } from "../schemas/review.schema";

export type ReviewType = InferOutput<typeof ReviewSchema>;
export type ReviewsType = InferOutput<typeof ReviewsSchema>;
