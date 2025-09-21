// hooks/use-products-with-offers.ts
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
    rating: product.avgRating ?? 0, // use aggregated rating
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
      ),
      reviews!reviews_product_id_fkey (
        rating
      )
    `)
    .order("created_at", { ascending: false })

  if (error) throw error

  // calculate average rating manually since Supabase returns array of reviews
  return data.map((product) => {
    let avgRating = 0
    if (product.reviews && product.reviews.length > 0) {
      avgRating =
        product.reviews.reduce((acc, r) => acc + (r.rating ?? 0), 0) /
        product.reviews.length
    }
    return { ...product, avgRating }
  })
}

export function useProductsWithOffers() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ["products-with-offers"],
    queryFn: fetchProductsWithOffers,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  // ✅ subscribe to realtime changes for products + reviews
  useEffect(() => {
    const supabase = createClient()

    const productsChannel = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["products-with-offers"] })
        }
      )
      .subscribe()

    const reviewsChannel = supabase
      .channel("reviews-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["products-with-offers"] })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(productsChannel)
      supabase.removeChannel(reviewsChannel)
    }
  }, [queryClient])

  return query
}
