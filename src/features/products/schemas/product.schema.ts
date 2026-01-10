import { array, boolean, number, object, optional, string } from "valibot";

export const ProductSchema = object({
  id: number(),
  name: string(),
  slug: string(),
  description: optional(string()),
  price: number(),
  stock: number(),
  is_active: boolean(),
  created_at: string(),
  brands: object({
    id: number(),
    name: string(),
  }),
  categories: object({
    id: number(),
    name: string(),
  }),
  product_images: array(
    object({
      id: number(),
      image_url: string(),
      is_main: boolean(),
    })
  ),
});

export const ProductsSchema = array(ProductSchema);
