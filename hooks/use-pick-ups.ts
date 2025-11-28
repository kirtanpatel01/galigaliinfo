// hooks/use-pick-ups.ts
'use client'
import { createClient } from "@/lib/supabase/client";
import { PickUpsTableItem } from "@/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

async function fetchPickUps(): Promise<PickUpsTableItem[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("self_pickup_orders")
    .select("id, status, no_of_products, total_amount, customer_name")
    .eq("shop_id", user.id)
    .order("id", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(row => ({
    id: row.id,
    customerName: row.customer_name,
    amount: Number(row.total_amount),
    noProducts: Number(row.no_of_products),
    status: row.status,
  }));
}

export function usePickUps() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const query = useQuery<PickUpsTableItem[]>({
    queryKey: ["pick-ups"],
    queryFn: fetchPickUps,
  });

  // subscribe to realtime changes
  useEffect(() => {
    // listen to the orders table; could also listen to self_pickup_orders if you set up replication
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // 'INSERT' | 'UPDATE' | 'DELETE'
          schema: 'public',
          table: 'orders', // or your view name if it's a materialized view
        },
        () => {
          // whenever something changes, invalidate cache so React Query refetches
          queryClient.invalidateQueries({ queryKey: ['pick-ups'] })
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, queryClient]);

  return query;
}
