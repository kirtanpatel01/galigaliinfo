// lib/hooks/use-ads.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "./use-current-user";
import { AdItem, RawAdWithProduct } from "@/types/ads";

async function fetchAdsByUser(userId: string): Promise<AdItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("ads")
    .select(`
      id,
      created_at,
      user_id,
      product_id,
      image,
      views,
      clicks,
      products(name)
    `)
    .eq("user_id", userId)
    .returns<RawAdWithProduct[]>(); // ★ typed

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    created_at: row.created_at,
    user_id: row.user_id,
    product_id: row.product_id,
    image: row.image,
    views: row.views,
    clicks: row.clicks,
    product_name: row.products?.name ?? "",
  }));
}


export function useAdsByUser() {
  const { user } = useCurrentUser();

  return useQuery({
    queryKey: ["ads", user?.id],
    queryFn: () => fetchAdsByUser(user!.id),
    enabled: !!user, // only run if logged in
  });
}
