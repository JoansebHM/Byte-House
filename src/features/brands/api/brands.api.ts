import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../../supabase/supabase";
import type { BrandsType } from "../types/brand.type";

export const getBrands = async () => {
  const { data, error } = (await supabase.from("brands").select("*")) as {
    data: BrandsType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};
