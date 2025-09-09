// lib/fetchers/order-items.ts
'use client'

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type OrderProductItem = {
  id: number;
  name: string;
  qty: number;
  qty_unit: string;
  price: number;
  line_total: number;
};

export async function fetchOrderItems(orderId: number): Promise<OrderProductItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("order_items")
    .select("id, name, qty, qty_unit, price, line_total")
    .eq("order_id", orderId)
    .order("id", { ascending: true });

  if (error) throw error;

  // Map numeric fields to number type
  return (data ?? []).map(item => ({
    id: item.id,
    name: item.name,
    qty: Number(item.qty),
    qty_unit: item.qty_unit,
    price: Number(item.price),
    line_total: Number(item.line_total),
  }));
}

export function useOrderItems(orderId: number) {
  return useQuery<OrderProductItem[]>({
    queryKey: ["order-items", orderId],
    queryFn: () => fetchOrderItems(orderId),
    enabled: !!orderId, // only fetch if orderId exists
  });
}
