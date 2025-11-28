'use server'

import { createClient } from '@/lib/supabase/server'

export async function placeOrder({
  shopId,
  products,
}: {
  shopId: string
  products: {
    id: number
    name: string
    price: number
    qty: number
    qty_unit?: string
    lineTotal: number
  }[]
}) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const customerId = user.id

  const { data, error } = await supabase.rpc('place_order', {
    p_customer_id: customerId,
    p_shop_id: shopId,
    p_products: products,
  })

  if (error) {
    console.error(error)
    throw error
  }

  return data
}

export async function updateOrderStatus({
  orderId,
  status,
}: {
  orderId: number
  status: 'pending' | 'accepted' | 'confirmed' | 'rejected'
}) {
  const supabase = await createClient()

  // optional: check auth here
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError) throw authError
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) {
    console.error(error)
    throw error
  }

  return { success: true }
}

export async function cancelOrder(id: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
  
  if(error) {
    console.error(error);
     throw error
  }

  return { success: true }
}