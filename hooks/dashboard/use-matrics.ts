"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type Metrics = {
  totalOrders: number;
  revenue: number;
  activeProducts: number;
  avgRating: number;
  activeOffers: number;
};

export async function fetchMetrics(shopId: string): Promise<Metrics> {
  // Total Orders & Revenue
  const { data: orders } = await supabase
    .from("orders")
    .select("id,total_amount")
    .eq("shop_id", shopId);

  const totalOrders = orders?.length || 0;
  const revenue = orders?.reduce((acc, o) => acc + Number(o.total_amount), 0) || 0;

  // Active Products
  const { data: products } = await supabase
    .from("products")
    .select("id")
    .eq("user_id", shopId)
    .eq("isHidden", false);
  const activeProducts = products?.length || 0;

  // Average Rating
  const { data: reviews } = await supabase
    .from("reviews")
    .select("rating")
    .eq("shop_id", shopId);
  const avgRating =
    reviews && reviews.length
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  // Active Offers
  const { data: offers } = await supabase
    .from("offers")
    .select("id")
    .eq("user_id", shopId)
    .gte("expiry", new Date().toISOString());
  const activeOffers = offers?.length || 0;

  return { totalOrders, revenue, activeProducts, avgRating, activeOffers };
}

export function useMetrics(shopId: string) {
  return useQuery({ 
    queryKey: ["metrics", shopId], 
    queryFn: () => fetchMetrics(shopId), 
    enabled: !!shopId 
  });
}
