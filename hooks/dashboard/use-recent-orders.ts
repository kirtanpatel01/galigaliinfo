"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type RecentOrderRow = {
  id: string;
  created_at: string;
  status: string;
  no_of_products: number;
  total_amount: number;
  profile: { fullName: string | null }[] | undefined;
};

export async function fetchRecentOrders(shopId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      status,
      no_of_products,
      total_amount,
      profile:customer_id ( fullName )
    `
    )
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return (data ?? []).map((row: RecentOrderRow) => {
    const profile = row.profile;

    const customerName = Array.isArray(profile)
      ? profile[0]?.fullName
      : (profile as { fullName?: string } | undefined)?.fullName;

    return {
      id: row.id,
      created_at: row.created_at,
      status: row.status,
      no_of_products: row.no_of_products,
      total_amount: row.total_amount,
      customer: customerName ?? "Unknown",
    };
  });
}

export function useRecentOrders(shopId: string) {
  return useQuery({
    queryKey: ["recent-orders", shopId],
    queryFn: () => fetchRecentOrders(shopId),
    enabled: !!shopId,
  });
}
