// lib/fetchers/orders.ts
'use client'

import { createClient } from "@/lib/supabase/client"
import { useQuery } from "@tanstack/react-query";

export async function fetchSelfPickUpOrders(customerId: string): Promise<SelfPickUpsTableItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('self_pickup_orders')
    .select('id, status, no_of_products, total_amount, shop_name')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Map to SelfPickUpsTableItem
  return (data ?? []).map(item => ({
    id: item.id,
    shopName: item.shop_name,
    amount: Number(item.total_amount),
    noProducts: Number(item.no_of_products),
    status: item.status as "pending" | "rejected" | "accepted" | "confirm",
  }));
}

export function useSelfPickUpOrders(customerId: string) {
  return useQuery<SelfPickUpsTableItem[]>({
    queryKey: ['self-pickup-orders', customerId],
    queryFn: () => fetchSelfPickUpOrders(customerId),
    enabled: !!customerId,
  });
}
