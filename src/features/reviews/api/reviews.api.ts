import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../../supabase/supabase";
import type { ReviewsType } from "../types/review.type";

export const getReviews = async () => {
  const { data, error } = (await supabase.from("reviews").select("*")) as {
    data: ReviewsType | null;
    error: PostgrestError | null;
  };
  return { data, error };
};
