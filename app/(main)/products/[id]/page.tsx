// page.tsx
'use client'

import ShowcaseItem from '@/components/showcase/ShowcaseItem'
import { useProductById } from '@/hooks/use-product-by-id'
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: product, isLoading, isError } = useProductById(id)

  if (isLoading) return <div className="p-4">Loading...</div>
  if (isError || !product) return <div className="p-4">Error loading product</div>

  console.log(product)

  return (
    <div className='p-4 sm:p-6'>
      <ShowcaseItem product={product} />
    </div>
  )
}
