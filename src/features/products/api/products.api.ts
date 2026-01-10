import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../../supabase/supabase";
import type { ProductsType, ProductType } from "../types/product.type";

export const getProducts = async () => {
  const { data, error } = (await supabase
    .from("products")
    .select(
      `
    *,
    brands (
        id,
        name
    ),
    categories (
        id,
        name
    ),
    product_images (
        id,
        image_url
    )
    `
    )
    .eq("is_active", true)) as {
    data: ProductsType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = (await supabase
    .from("products")
    .select(
      `
    *,
    brands (
        id,
        name
    ),
    categories (
        id,
        name
    ),
    product_images (
        id,
        image_url
    )
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single()) as {
    data: ProductType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};
