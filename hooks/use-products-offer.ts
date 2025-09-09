"use client"

import { createClient } from "@/lib/supabase/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export function mapProductToCardItem(product: any): ShowcaseCardItem {
  return {
    id: product.id,
    image: product.images[0],
    title: product.name,
    shopName: product.profile?.shopName ?? "Unknown Shop",
    address: product.profile?.address ?? "",
    rating: 4.5,
    timeAgo: new Date(product.created_at).toLocaleDateString(),
    isHidden: product.isHidden,
  }
}

async function fetchProductsWithOffers() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      images,
      created_at,
      isHidden,
      offers (
        id,
        type,
        description,
        percentage,
        amount,
        qty,
        price,
        expiry
      ),
      profile:user_id (
        fullName,
        phone,
        address,
        shopName
      )
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export function useProductsWithOffers() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ["products-with-offers"],
    queryFn: fetchProductsWithOffers,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  // ✅ subscribe to realtime changes
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          // invalidate cache so UI refreshes
          queryClient.invalidateQueries({ queryKey: ["products-with-offers"] })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])

  return query
}
