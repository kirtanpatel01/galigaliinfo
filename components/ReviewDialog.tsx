'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useState } from 'react'
import { placeOrder } from '@/actions/order.actions'

interface ReviewDialogProps {
  isOpen: boolean
  onClose: () => void;
  clear: () => void
  shopId: string
  products: {
    id: number
    name: string
    price: number
    qty: number
    qty_unit?: string
    lineTotal: number
  }[]
}

export default function ReviewDialog({
  isOpen,
  onClose,
  shopId,
  products,
  clear
}: ReviewDialogProps) {
  const totalProducts = products.length
  const totalAmount = products.reduce((sum, p) => sum + p.lineTotal, 0)
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    try {
      setLoading(true)
      const orderId = await placeOrder({ shopId, products })
      toast.success(`Order #${orderId} placed successfully`)
      onClose()
      clear()
    } catch (err: unknown) {
      console.error(err)
      const message =
        err instanceof Error
          ? err.message
          : "Can't place the ad."

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="flex justify-between border-b pb-2">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">
                  {p.qty} {p.qty_unit} × ₹{p.price.toFixed(2)}
                </div>
              </div>
              <div className="font-semibold">₹{p.lineTotal.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 border-t pt-3">
          <div className="flex justify-between font-medium">
            <span>Total Products</span>
            <span>{totalProducts}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter>
          <Button disabled={loading} onClick={handleConfirm}>
            {loading ? 'Placing…' : 'Confirm Order'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
