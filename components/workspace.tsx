'use client'

import { useSelectedProducts } from '@/stores/useSelectedProducts'
import React, { useState, useEffect } from 'react'

interface WorkspaceProductProps {
  product: {
    id: string
    productName: string
    price: number
    qty: number
    unit: string
  }
}

export default function Workspace({ product }: WorkspaceProductProps) {
  const [qty, setQty] = useState(product.qty)
  const [totalPrice, setTotalPrice] = useState(product.price)
  const updateProduct = useSelectedProducts((s) => s.updateProduct)

  useEffect(() => {
    setTotalPrice(product.price * qty)
    updateProduct(product.id, { qty, price: product.price });
  }, [qty, product.price, product.id, updateProduct])

  return (
    <div className="border space-y-4">
      <h2 className="text-lg font-semibold">{product.productName}</h2>
      
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Qty:</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1"
        />
        <span>{product.unit}</span>
      </div>

      <div className="text-sm">
        <span className="font-medium">Unit Price:</span> ${product.price.toFixed(2)}
      </div>

      <div className="text-lg font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  )
}
