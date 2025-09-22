"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

const supabase = createClient();

type RecentOrderRow = {
  id: number;
  created_at: string;
  status: string;
  no_of_products: number;
  total_amount: number;
  customer: {
    fullName: string | null;
  } | null;
};

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
    .limit(5); // latest 5 orders

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    id: row.id,
    created_at: row.created_at,
    status: row.status,
    no_of_products: row.no_of_products,
    total_amount: row.total_amount,
    customer: row.profile && Array.isArray(row.profile) && row.profile.length > 0
      ? { fullName: row.profile[0].fullName ?? null }
      : null,
  })) as RecentOrderRow[];
}

export function useRecentOrders(shopId: string) {
  return useQuery({
    queryKey: ["recent-orders", shopId],
    queryFn: () => fetchRecentOrders(shopId),
    enabled: !!shopId,
  });
}
