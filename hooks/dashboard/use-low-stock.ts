// hooks/use-low-stock.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type LowStockProduct = {
  id: number;
  name: string;
  qty_available: number | null;
};

export async function fetchLowStockProducts(shopId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, qty_available")
    .eq("user_id", shopId)
    .lt("qty_available", 5) // threshold for low stock
    .order("qty_available", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export function useLowStockProducts(shopId: string) {
  return useQuery({
    queryKey: ["low-stock-products", shopId],
    queryFn: () => fetchLowStockProducts(shopId),
    enabled: !!shopId,
  });
}
