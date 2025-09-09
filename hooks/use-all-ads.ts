"use client";

import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

async function fetchAllAds(): Promise<AdItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("ads")
    .select(`
      id,
      image,
      views,
      clicks,
      products(name)
    `);

  if (error) throw error;

  return data.map((row: any) => ({
    ...row,
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
