import ProductForm from '@/components/product-form/product-form'
import React from 'react'

function page() {
  return (
    <div className='p-6 min-h-screen flex flex-col justify-center items-center'>
      {/* <span>{params.id}</span> */}
      <h1 className='text-lg font-semibold mb-4'>Add a new product</h1>
      <ProductForm />
    </div>
  )
}

export default page