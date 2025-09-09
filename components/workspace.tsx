'use client'

import { useSelectedProducts } from '@/stores/useSelectedProducts'
import React, { useState, useEffect } from 'react'

// ProductTableItem is your original product type from DB
export default function Workspace({ product }: { product: ProductTableItem }) {
  const [qty, setQty] = useState(product.qty)
  const updateProduct = useSelectedProducts((s) => s.updateProduct)

  const lineTotal = product.price * qty

  // Only push qty & lineTotal into store
  useEffect(() => {
    updateProduct(product.id, {
      qty,
      lineTotal,
    })
  }, [qty, product.id, product.price, lineTotal, updateProduct])

  useEffect(() => {
    // whenever a new product arrives, reset the qty state to its value
    setQty(product.qty)
  }, [product.qty]) // or [product] if id might stay the same

  return (
    <div className="border space-y-4 p-2">
      <h2 className="text-lg font-semibold capitalize">{product.name}</h2>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Qty:</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1"
        />
        <span>{product.qty_unit}</span>
      </div>

      <div className="text-sm">
        <span className="font-medium">Unit Price:</span> ${product.price.toFixed(2)}
      </div>

      <div className="text-lg font-bold">
        Total: ${lineTotal.toFixed(2)}
      </div>
    </div>
  )
}
