// components/workspace.tsx
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useSelectedProducts } from '@/stores/useSelectedProducts'
import { ProductTableItem } from '@/types/product'

export default function Workspace({ product }: { product: ProductTableItem }) {
  const [qty, setQty] = useState<number>(product.qty)
  const addProduct = useSelectedProducts((s) => s.addProduct)
  const updateProduct = useSelectedProducts((s) => s.updateProduct)
  const removeProduct = useSelectedProducts((s) => s.removeProduct)
  const storeProduct = useSelectedProducts((s) =>
    s.products.find((p) => p.id === product.id)
  )

  const lineTotal = useMemo(() => product.price * qty, [product.price, qty])
  const inCart = Boolean(storeProduct)

  useEffect(() => {
    setQty(product.qty)
  }, [product.qty, product.id])

  useEffect(() => {
    if (!inCart) return
    if (storeProduct && storeProduct.qty === qty && storeProduct.lineTotal === lineTotal) {
      return
    }
    updateProduct(product.id, { qty, lineTotal })
  }, [storeProduct, qty, lineTotal, inCart, product.id, updateProduct])

  function handleAdd() {
    if (inCart) {
      updateProduct(product.id, { qty, lineTotal })
    } else {
      addProduct({
        id: product.id,
        qty,
        lineTotal,
      })
    }
  }

  function handleRemove() {
    removeProduct(product.id)
    setQty(product.qty)
  }

  return (
    <div className="border space-y-4 p-2">
      <h2 className="text-lg font-semibold capitalize">{product.name}</h2>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Qty:</label>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => {
            const val = Number(e.target.value)
            setQty(Number.isNaN(val) || val < 1 ? 1 : Math.floor(val))
          }}
          className="w-20 border rounded px-2 py-1"
        />
        <span>{product.qty_unit}</span>
      </div>

      <div className="text-sm">
        <span className="font-medium">Unit Price:</span> ₹{product.price.toFixed(2)}
      </div>

      <div className="text-lg font-bold">
        Total: ₹{lineTotal.toFixed(2)}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {inCart ? 'Update' : 'Add'}
        </button>
        {inCart && (
          <button
            onClick={handleRemove}
            className="px-3 py-1 border rounded text-sm"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}
