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

  return data as RecentOrderRow[];
}

export function useRecentOrders(shopId: string) {
  return useQuery({
    queryKey: ["recent-orders", shopId],
    queryFn: () => fetchRecentOrders(shopId),
    enabled: !!shopId,
  });
}
