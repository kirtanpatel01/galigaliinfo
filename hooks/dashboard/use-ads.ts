"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type AdPerformance = {
  id: number;
  product_name: string;
  views: number | null;
  clicks: number | null;
};

export async function fetchAds(shopId: string) {
  const { data, error } = await supabase
    .from("ads")
    .select(`
      id,
      views,
      clicks,
      product_id,
      products(name)
    `)
    .eq("user_id", shopId)
    .order("views", { ascending: false });

  if (error) throw error;

  return (
    data?.map((ad: any) => ({
      id: ad.id,
      product_name: ad.products?.name ?? "Unknown",
      views: ad.views ?? 0,
      clicks: ad.clicks ?? 0,
    })) ?? []
  );
}

export function useAds(shopId: string) {
  return useQuery({
    queryKey: ["ads", shopId],
    queryFn: () => fetchAds(shopId),
    enabled: !!shopId,
  });
}
