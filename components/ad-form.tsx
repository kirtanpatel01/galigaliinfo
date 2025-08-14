'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import Image from 'next/image'
import { Button } from './ui/button'
import { X } from 'lucide-react'

const MAX_IMAGES = 4

const initialImages = [
  "/khaman.webp",
  "/khaman.webp",
  "/khaman.webp",
  "/khaman.webp",
]

function AdForm({ editable }: { editable: boolean }) {
  const [images, setImages] = useState(initialImages)

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {editable 
          ? (
            <span className='flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-accent'>
              Edit
            </span>
          ) 
          : (
            <Button>Place Ad</Button>
          )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place ad</DialogTitle>
          <DialogDescription>
            {editable ? "Update your ad images" : "Add new ad for your product"}
          </DialogDescription>
        </DialogHeader>

        {editable ? (
          // Editable mode with remove buttons + add slots
          <ul className='grid grid-cols-2 place-content-center place-items-center gap-8'>
            {images.map((img, i) => (
              <li key={`img-${i}`} className="relative">
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md"
                >
                  <X className="w-3 h-3" />
                </button>

                <Image 
                  src={img} 
                  alt='ad-image' 
                  height={200} 
                  width={200} 
                  className='size-52 object-cover rounded-md' 
                />
              </li>
            ))}

            {/* Empty slots for adding images */}
            {Array.from({ length: MAX_IMAGES - images.length }).map((_, i) => (
              <li key={`add-${i}`} className="flex items-center justify-center">
                <Button 
                  variant="outline" 
                  className="h-52 w-52 rounded-md"
                  onClick={() => console.log("Open file picker here")}
                >
                  Add Image
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          // Non-editable mode → show add image buttons
          <div className='grid grid-cols-2 gap-8 place-content-center place-items-center'>
            {Array.from({ length: MAX_IMAGES }).map((_, i) => (
              <Button 
                key={i} 
                variant="outline" 
                className="h-52 w-52 rounded-md"
              >
                Add Image
              </Button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AdForm
