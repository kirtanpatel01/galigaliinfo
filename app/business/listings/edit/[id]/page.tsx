'use client'

import React, { use } from 'react'
import { useProductById } from '@/hooks/use-product-by-id'
import ProductForm from '@/components/product-form/product-form'
import LoadingSpinner from '@/components/loading-spinner'
import { Offer } from '@/types/product'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: product, isLoading, isError } = useProductById(id)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError || !product) {
    return <div className="p-6">Failed to load product.</div>
  }

  const defaultValues = {
    name: product.name,
    description: product.description,
    images: product.images ?? [],
    price: product.price,        // ensure number
    qty: product.qty,            // ensure number
    qty_unit: product.qty_unit,
    qty_available: product.qty_available, // ensure number
    offers: product.offers?.map((o: Offer) => ({
      id: o.id.toString(),
      type: o.type,
      description: o.description,
      percentage: o.percentage ?? null,
      amount: o.amount ?? null,
      qty: o.qty ?? null,
      price: o.price ?? null,
      expiry: o.expiry ?? null,
    })) ?? [],
  }

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">Edit the product</h1>
      <ProductForm
        editable
        productId={id}
        defaultValues={defaultValues} />
    </div>
  )
}
