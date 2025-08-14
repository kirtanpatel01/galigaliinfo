import React from 'react'
import ProductForm from './product-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Button } from './ui/button'

function ProductDialog({ editable }: { editable?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {editable ? (
          <Button className='w-full text-start px-2 py-1 rounded hover:bg-accent'>
              Edit
          </Button>
          ) : (
            <Button>Add new product</Button>
          )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editable ? "Edit" : "Add"} Product
          </DialogTitle>
          <DialogDescription>
            {editable
              ? "Edit the information of the listed product"
              : "Add new product to your listings"}
          </DialogDescription>
        </DialogHeader>
        <ProductForm editable={editable} />
      </DialogContent>
    </Dialog>
  )
}

export default ProductDialog