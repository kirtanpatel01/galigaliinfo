"use client"

import LoadingSpinner from "@/components/loading-spinner"
import ShowcasePage from "@/components/showcase/ShowcasePage"
import { useCurrentUser } from "@/hooks/use-current-user";
import { mapProductToCardItem, useProductsWithOffers } from "@/hooks/use-products-offer"

export default function Page() {
  const { user } = useCurrentUser();
  console.log(user?.id)
  const { data: products, isLoading, isError, error } = useProductsWithOffers()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    console.error(error)
    return <div className="p-4 text-red-500">Failed to load products</div>
  }

  const ownerProducts = products?.filter((p) => p.user_id === user?.id)

  return (
    <div>
      <ShowcasePage type="business" showcaseItems={(ownerProducts ?? []).map(mapProductToCardItem)} />
    </div>
  )
}
