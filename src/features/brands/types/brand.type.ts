import type { InferOutput } from "valibot";
import type { BrandsSchema, BrandSchema } from "../schemas/brand.schema";

export type BrandType = InferOutput<typeof BrandSchema>;
export type BrandsType = InferOutput<typeof BrandsSchema>;
