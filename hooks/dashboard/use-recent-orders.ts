"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function fetchRecentOrders(shopId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      created_at,
      status,
      no_of_products,
      total_amount,
      profile:customer_id ( fullName )
    `)
    .eq("shop_id", shopId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    id: row.id,
    created_at: row.created_at,
    status: row.status,
    no_of_products: row.no_of_products,
    total_amount: row.total_amount,
    customer: row.profile.fullName
  }))
}

export function useRecentOrders(shopId: string) {
  return useQuery({
    queryKey: ["recent-orders", shopId],
    queryFn: () => fetchRecentOrders(shopId),
    enabled: !!shopId,
  });
}
