import { array, nullable, number, object, string } from "valibot";

export const CategorySchema = object({
  id: number(),
  name: string(),
  slug: string(),
  description: nullable(string()),
});

export const CategoriesSchema = array(CategorySchema);
