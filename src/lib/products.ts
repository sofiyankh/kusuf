import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  stock: number;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: "essentials" | "drops";
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  descriptionAr: string;
  ingredients: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
  stock?: number;
  variants: ProductVariant[];
}

export function mapProduct(r: Tables<"products">): Product {
  return {
    id: r.id,
    name: r.name,
    nameAr: r.name_ar || r.name,
    category: (r.category as string) === "drops" ? "drops" : "essentials",
    price: Number(r.price ?? 0),
    originalPrice: r.original_price != null ? Number(r.original_price) : undefined,
    image: r.image || "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
    description: r.description || "",
    descriptionAr: r.description_ar || r.description || "",
    ingredients: Array.isArray(r.ingredients) ? (r.ingredients as string[]) : [],
    rating: Number(r.rating ?? 0),
    reviews: Number(r.reviews ?? 0),
    inStock: r.in_stock !== false,
    isNew: !!r.is_new,
    discount: r.discount ?? undefined,
    stock: r.stock ?? undefined,
    variants: Array.isArray(r.variants) ? (r.variants as unknown as ProductVariant[]) : [],
  };
}

export async function fetchProducts(limit?: number): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select(
      "id, name, name_ar, category, price, original_price, image, rating, reviews, in_stock, is_new, discount, stock, variants",
    )
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return ((data as Tables<"products">[]) || []).map(mapProduct);
}

export async function fetchProductsByCategory(
  category: "essentials" | "drops",
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return ((data as Tables<"products">[]) || []).map(mapProduct);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as Tables<"products">) : null;
}
