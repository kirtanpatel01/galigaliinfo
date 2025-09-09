// lib/fetchers/order.ts
"use client";

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type OrderInfo = {
  id: number;
  status: string;
  total_amount: number;
  no_of_products: number;
  customer_name: string | null;
};

export async function fetchOrderInfo(orderId: number): Promise<OrderInfo> {
  const supabase = createClient();

  type OrderRow = {
    id: number;
    status: string;
    total_amount: number;
    no_of_products: number;
    profile: { fullName: string | null } | null;
  };

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      total_amount,
      no_of_products,
      profile:profile!orders_customer_profile_fkey (
        fullName
      )
      `
    )
    .eq("id", orderId)
    .single();

  if (error || !data) throw error ?? new Error("Order not found");

  return {
    id: data.id,
    status: data.status,
    total_amount: Number(data.total_amount),
    no_of_products: Number(data.no_of_products),
    customer_name: data.profile?.fullName ?? null,
  };
}

export function useOrderInfo(orderId: number) {
  return useQuery<OrderInfo>({
    queryKey: ["order-info", orderId],
    queryFn: () => fetchOrderInfo(orderId),
    enabled: !!orderId,
  });
}
