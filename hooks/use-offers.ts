"use client"

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

async function fetchOffers(productId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("product_id", productId);
  if (error) throw error;
  return data;
}

export function useOffers(productId: number) {
  return useQuery({
    queryKey: ["offers", productId],
    queryFn: () => fetchOffers(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
