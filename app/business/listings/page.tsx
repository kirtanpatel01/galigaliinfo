"use client"

import LoadingSpinner from "@/components/loading-spinner"
import ShowcasePage from "@/components/showcase/ShowcasePage"
import { mapProductToCardItem, useProductsWithOffers } from "@/hooks/use-products-offer"

export default function Page() {
  const { data: products, isLoading, isError, error } = useProductsWithOffers()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    console.error(error)
    return <div className="p-4 text-red-500">Failed to load products</div>
  }

  return (
    <div>
      <ShowcasePage type="business" showcaseItems={(products ?? []).map(mapProductToCardItem)} />
    </div>
  )
}
