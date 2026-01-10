import { array, boolean, number, object, optional, string } from "valibot";

export const ProductSchema = object({
  id: number(),
  name: string(),
  slug: string(),
  description: optional(string()),
  price: number(),
  stock: number(),
  is_active: boolean(),
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
    })
  ),
});

export const ProductsSchema = array(ProductSchema);
