"use client";

import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { AdItem, RawAdWithProductFull } from "@/types/ads";

async function fetchAllAds(): Promise<AdItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("ads")
    .select(`
      id,
      image,
      views,
      clicks,
      products(name, id)
    `)
    .returns<RawAdWithProductFull[]>(); // ★ typed

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    created_at: "", // not fetched here, so empty
    user_id: "",    // not fetched here
    product_id: row.products?.id ?? 0,
    image: row.image,
    views: row.views,
    clicks: row.clicks,
    product_name: row.products?.name ?? "",
  }));
}


export function useAllAds() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["all-ads"],
    queryFn: fetchAllAds,
  });

  useEffect(() => {
    // Subscribe to realtime changes
    const channel = supabase
      .channel("ads-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ads" },
        () => {
          // Refetch ads when insert/update/delete happens
          queryClient.invalidateQueries({ queryKey: ["all-ads"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient]);

  return query;
}
