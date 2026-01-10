import type { InferOutput } from "valibot";
import type { ProductSchema, ProductsSchema } from "../schemas/product.schema";

export type ProductType = InferOutput<typeof ProductSchema>;
export type ProductsType = InferOutput<typeof ProductsSchema>;
