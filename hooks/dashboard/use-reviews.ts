"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { RawReview, Review } from "@/types/product";

const supabase = createClient();

// export type Review = {
//   id: number;
//   product: string;
//   user: string;
//   rating: number;
//   content: string;
// };

export async function fetchReviews(shopId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      rating,
      content,
      user: profile(fullName),
      product: products(name)
    `)
    .eq("products.user_id", shopId)
    .order("id", { ascending: false })
    .limit(5);

  if (error) throw error;

  return (data as RawReview[]).map(r => ({
    id: r.id,
    rating: r.rating,
    content: r.content,
    user: r.user?.fullName ?? "Unknown",
    product: r.product?.name ?? "Unknown",
  }))
}


export function useReviews(shopId: string) {
  return useQuery({
    queryKey: ["reviews", shopId], 
    queryFn: () => fetchReviews(shopId), 
    enabled: !!shopId,
    staleTime: 1000 * 60 * 60,
  });
}
