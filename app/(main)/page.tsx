'use client'

import ShowcasePage from '@/components/showcase/ShowcasePage'
import { mapProductToCardItem, useProductsWithOffers } from '@/hooks/use-products-offer'
import React from 'react'

function Page() {
  const { data: products, isLoading, isError, error } = useProductsWithOffers()

  if (isLoading) {
    return <div className="p-4">Loading products...</div>
  }

  if (isError) {
    console.error(error)
    return <div className="p-4 text-red-500">Failed to load products</div>
  }

  return (
    <div>
      <ShowcasePage type='product' showcaseItems={(products ?? []).map(mapProductToCardItem)} />
    </div>
  )
}

export default Page