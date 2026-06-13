import { supabase } from "@/integrations/supabase/client";
import { Product, PRODUCTS as FALLBACK } from "@/lib/cart";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  if (error || !data || data.length === 0) return FALLBACK;
  return data.map((r) => ({
    id: r.slug,
    name: r.name,
    nameHi: r.name_hi,
    price: r.price,
    category: r.category,
    emoji: r.emoji,
    description: r.description,
    descriptionHi: r.description_hi,
  }));
};
