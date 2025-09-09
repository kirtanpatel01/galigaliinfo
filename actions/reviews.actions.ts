"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addReview(formData: FormData) {
  const supabase = await createClient()

  const productId = formData.get("product_id")
  const rating = formData.get("rating")
  const content = formData.get("content")

  // Get current user (from server auth context)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  const { error } = await supabase
    .from("reviews")
    .insert({
      user_id: user.id,
      product_id: Number(productId),
      rating: Number(rating),
      content: content
    })

  if (error) {
    throw new Error(error.message)
  }

  // Refresh cache so new review shows instantly
  revalidatePath(`/products/${productId}`)
}
