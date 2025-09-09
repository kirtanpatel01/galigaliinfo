// lib/hooks/use-ads.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "./use-current-user";

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
    .eq("user_id", userId);

  if (error) throw error;

  // flatten product name if you want
  return data.map((row: any) => ({
    ...row,
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
