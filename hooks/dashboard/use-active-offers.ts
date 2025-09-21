// hooks/dashboard/use-active-offers.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type Offer = {
  id: number;
  product_name: string;
  type: string;
  description: string;
  percentage: number | null;
  amount: number | null;
  qty: number | null;
  price: number | null;
  expiry: string | null;
};

export async function fetchActiveOffers(shopId: string) {
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

  // map product name to top level for easier usage
  return (data ?? []).map((offer: any) => ({
    ...offer,
    product_name: offer.products?.name ?? "Unknown Product",
  }));
}

export function useActiveOffers(shopId: string) {
  return useQuery({
    queryKey: ["active-offers", shopId],
    queryFn: () => fetchActiveOffers(shopId),
    enabled: !!shopId,
  });
}
