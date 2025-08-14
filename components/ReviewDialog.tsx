'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface ReviewDialogProps {
  isOpen: boolean
  onClose: () => void
  products: {
    productName: string
    price: number
    qty: number
    unit: string
  }[]
}

export default function ReviewDialog({ isOpen, onClose, products }: ReviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {products.map((p, i) => (
            <div key={i} className="flex justify-between border-b pb-2">
              <div>
                <div className="font-medium">{p.productName}</div>
                <div className="text-sm text-gray-500">
                  {p.qty} {p.unit} × ${p.price.toFixed(2)}
                </div>
              </div>
              <div className="font-semibold">
                ${(p.qty * p.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Confirm Order
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
