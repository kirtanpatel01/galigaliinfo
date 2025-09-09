// hooks/use-order-items.ts
'use client'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

export type OrderProductItem = {
  id: number
  order_id: number
  name: string
  qty: number
  qty_unit: string
  price: number
  line_total: number
}

// what the hook will return now:
export type OrderItemsResponse = {
  items: OrderProductItem[]
  status: 'pending' | 'accepted' | 'rejected' | 'confirmed'
}

// fetcher
export async function fetchOrderItems(orderId: number): Promise<OrderItemsResponse> {
  const supabase = createClient()

  // get order status
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('status')
    .eq('id', orderId)
    .single()
  if (orderError) throw orderError

  // get order items
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('id, order_id, name, qty, qty_unit, price, line_total')
    .eq('order_id', orderId)
  if (itemsError) throw itemsError

  return {
    items: (items ?? []) as OrderProductItem[],
    status: order.status as OrderItemsResponse['status'],
  }
}

// hook
export function useOrderItems(orderId: number) {
  return useQuery<OrderItemsResponse>({
    queryKey: ['order-items', orderId],
    queryFn: () => fetchOrderItems(orderId),
    enabled: !!orderId,
  })
}
