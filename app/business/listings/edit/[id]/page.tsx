import ProductForm from '@/components/product-form'
import React from 'react'

export default function page({ params }: { params: { id: string } } ) {
  console.log(params)
  return (
    <div className='p-6'>
      {/* <span>{params.id}</span> */}
      <h1 className='text-lg font-semibold mb-4'>Edit the product</h1>
      <ProductForm editable />
    </div>
  )
}
