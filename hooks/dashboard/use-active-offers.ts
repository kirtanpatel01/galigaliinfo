// hooks/dashboard/use-active-offers.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Offer } from "@/types/product";

const supabase = createClient();

export async function fetchActiveOffers(shopId: string): Promise<Offer[]> {
  const { data, error } = await supabase
    .from("offers")
    .select(`
      id,
      type,
      description,
      percentage,
      amount,
      qty,
      price,
      expiry,
      products(name)
    `)
    .eq("user_id", shopId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  console.log(data)
  // map product name to top level for easier usage
  return (data ?? []).map((offer: Offer) => ({
    ...offer,
    product_name: offer.products?.name  ?? "Unknown Product",
  })) as Offer[]
}

export function useActiveOffers(shopId: string) {
  return useQuery<Offer[]>({
    queryKey: ["active-offers", shopId],
    queryFn: () => fetchActiveOffers(shopId),
    enabled: !!shopId,
  });
}
