import { array, number, object, string } from "valibot";

export const BrandSchema = object({
  id: number(),
  name: string(),
  slug: string(),
});

export const BrandsSchema = array(BrandSchema);
