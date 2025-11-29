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

type RawAd = {
  id: number;
  views: number | null;
  clicks: number | null;
  product_id: number;
  products: { name: string }[] | null;
};

export async function fetchAds(shopId: string) {
  const { data, error } = await supabase
    .from("ads")
    .select(
      `
      id,
      views,
      clicks,
      product_id,
      products(name)
    `
    )
    .eq("user_id", shopId)
    .order("views", { ascending: false });

  if (error) throw error;

  return (
    data?.map((ad: RawAd) => {
      const products = ad.products;
      const productName = Array.isArray(products)
        ? products[0]?.name
        : (products as unknown as { name?: string } | undefined)?.name;
      return {
        id: ad.id,
        product_name: productName ?? "Unknown",
        views: ad.views ?? 0,
        clicks: ad.clicks ?? 0,
      };
    }) ?? []
  );
}

export function useAds(shopId: string) {
  return useQuery({
    queryKey: ["ads", shopId],
    queryFn: () => fetchAds(shopId),
    enabled: !!shopId,
  });
}
