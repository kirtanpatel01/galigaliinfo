import ShowcasePage from '@/components/showcase/ShowcasePage'
import { products } from '@/constants/productData'
import React from 'react'

export default function page() {
  return <ShowcasePage type='business' showcaseItems={products} />
}
