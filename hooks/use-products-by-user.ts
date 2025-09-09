"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useEffect } from "react"

async function fetchProductsByUser(userId: string): Promise<ProductTableItem[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, qty, qty_unit, qty_available")
    .eq("user_id", userId)

  if (error) throw new Error(error.message)

  return (data || []).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price ?? 0,
    qty: p.qty ?? 0,
    qty_unit: p.qty_unit ?? "",
    stock: p.qty_available && p.qty_available > 0 ? "available" : "unavailable",
    lineTotal: (p.price ?? 0) * (p.qty ?? 0), 
  }))
}

export function useProductsByUser(userId: string) {
  const queryClient = useQueryClient()
  const supabase = createClient()

  const query = useQuery<ProductTableItem[]>({
    queryKey: ["products", userId],
    queryFn: () => fetchProductsByUser(userId),
    enabled: !!userId,
  })

  useEffect(() => {
    if (!userId) return

    const channel = supabase
      .channel(`products-changes-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Realtime change:", payload)

          queryClient.invalidateQueries({ queryKey: ["products", userId] })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase, queryClient])

  return query
}
