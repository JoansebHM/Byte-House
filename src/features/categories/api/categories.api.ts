import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../../supabase/supabase";
import type { CategoriesType } from "../types/category.type";

export const getCategories = async () => {
  const { data, error } = (await supabase.from("categories").select("*")) as {
    data: CategoriesType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};
