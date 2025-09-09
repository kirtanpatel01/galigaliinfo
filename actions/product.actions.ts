"use server"

import { createClient } from "@/lib/supabase/server"

export async function createProductWithOffersAction(data: {
  name: string
  description: string
  images: string[]
  price: number
  qty: number
  qty_unit: string
  qty_available: number
  offers: {
    type: string
    description: string
    percentage?: number
    amount?: number
    qty?: number
    price?: number
    expiry?: string | null
  }[]
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) throw new Error("User not authenticated")

  const { data: result, error } = await supabase.rpc(
    "create_product_with_offers",
    {
      p_name: data.name,
      p_description: data.description,
      p_images: data.images,
      p_user_id: user.id,
      p_price: data.price,
      p_qty: data.qty,
      p_qty_unit: data.qty_unit,
      p_qty_available: data.qty_available,
      p_offers: data.offers.map((offer) => ({
        type: offer.type,
        description: offer.description,
        percentage: offer.percentage ?? null,
        amount: offer.amount ?? null,
        qty: offer.qty ?? null,
        price: offer.price ?? null,
        expiry: offer.expiry ?? null,
      })),
    }
  )

  if (error) {
    console.error("Supabase RPC Error:", error)
    throw new Error(error.message)
  }

  return result
}

export async function updateProductWithOffersAction(
  id: string | number,
  data: {
    name: string
    description: string
    images: string[]
    price: number
    qty: number
    qty_unit: string
    qty_available: number
    offers: {
      type: string
      description: string
      percentage?: number
      amount?: number
      qty?: number
      price?: number
      expiry?: string | null
    }[]
  }
) {
  const supabase = await createClient()

  const { data: updated, error } = await supabase
    .from("products")
    .update({
      name: data.name,
      description: data.description,
      images: data.images,
      price: data.price,
      qty: data.qty,
      qty_unit: data.qty_unit,
      qty_available: data.qty_available,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error

  // Replace offers
  await supabase.from("offers").delete().eq("product_id", id)

  if (data.offers.length > 0) {
    const { error: insertError } = await supabase.from("offers").insert(
      data.offers.map((offer) => ({
        product_id: id,
        type: offer.type,
        description: offer.description,
        percentage: offer.percentage ?? null,
        amount: offer.amount ?? null,
        qty: offer.qty ?? null,
        price: offer.price ?? null,
        expiry: offer.expiry ?? null,
      }))
    )

    if (insertError) throw insertError
  }

  return updated
}

export async function toggleProductHiddenAction(id: number | string, hidden: boolean) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) throw new Error("User not authenticated")

  const { data, error } = await supabase
    .from("products")
    .update({ isHidden: hidden })
    .eq("id", id)
    .eq("user_id", user.id) // ✅ only owner can hide their product
    .select()
    .single()

  if (error) {
    console.error("Supabase update error:", error)
    throw new Error(error.message)
  }

  return data
}

export async function deleteProductAction(productId: number) {
  const supabase = await createClient()

  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}