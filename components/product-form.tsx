import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import OfferDialog from './offer-dialog'

const images = [
  "/khaman.webp",
  "/khaman.webp",
  "/khaman.webp",
  "/khaman.webp",
  "/khaman.webp",
  "/khaman.webp",
]

function ProductForm({ editable }: { editable?: boolean }) 
{
  console.log(editable)
  return (
    <div className='space-y-6 max-w-5xl'>
      <div className='flex items-center gap-4 p-4 max-w-full overflow-x-auto border rounded-lg'>
        <Button variant={"secondary"} className='shrink-0 size-12 rounded-full cursor-pointer'>
          <Plus />
        </Button>
        {images.map((src, index) => (
          <Image
            key={index} // always give a unique key in loops
            src={src}
            alt={`product-${index}`}
            height={100}
            width={100}
            className="rounded size-24 object-cover"
          />
        ))}
      </div>
      <Input placeholder='Enter the product name' />
      <Textarea placeholder='Enter the product details...' />
      <OfferDialog />
    </div>
  )
}

export default ProductForm