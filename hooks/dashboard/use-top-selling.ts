// hooks/use-top-selling-products.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient()

export async function fetchTopSellingProducts(shopId: string) {
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      product_id,
      qty,
      products ( id, name ),
      orders!inner ( shop_id, status )
    `)
    .eq("orders.shop_id", shopId)
    .eq("orders.status", "confirmed"); // only count confirmed orders

  if (error) throw error;

  // aggregate sales
  const productMap: Record<string, { name: string; total_qty: number }> = {};

  data?.forEach((row) => {
    const productArr = row.products; // products is an array
    const product = Array.isArray(productArr) ? productArr[0] : productArr;
    if (!product) return;

    const { product_id, qty } = row;

    if (!productMap[product_id]) {
      productMap[product_id] = { name: product.name, total_qty: Number(qty) };
    } else {
      productMap[product_id].total_qty += Number(qty);
    }
  });

  return Object.entries(productMap)
    .map(([product_id, p]) => ({
      product_id,
      name: p.name,
      total_qty: p.total_qty,
    }))
    .sort((a, b) => b.total_qty - a.total_qty)
    .slice(0, 5);
}

export function useTopSellingProducts(shopId: string) {
  return useQuery({
    queryKey: ["top-selling-products", shopId],
    queryFn: () => fetchTopSellingProducts(shopId),
    enabled: !!shopId,
  });
}
