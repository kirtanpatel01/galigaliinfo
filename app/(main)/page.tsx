import ShowcasePage from '@/components/showcase/ShowcasePage'
import { products } from '@/constants/productData'
import React from 'react'

function page() {
  return (
    <div>
      <ShowcasePage type='product' showcaseItems={products} />
    </div>
  )
}

export default page