import type { InferOutput } from "valibot";
import type {
  CategoriesSchema,
  CategorySchema,
} from "../schemas/category.schema";

export type CategoryType = InferOutput<typeof CategorySchema>;
export type CategoriesType = InferOutput<typeof CategoriesSchema>;
