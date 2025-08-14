import { DataTable } from '@/components/data-table/data-table'
import { orderProductsColumns } from '@/components/data-table/order-products-columns'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { mockOrderProducts } from '@/constants/orderPrducts'
import React from 'react'

function page({ params }: { params: { id: string } }) {
  console.log(params.id)
  return (
    <div>
      <header>
        <div className='m-4'>
          <span className='font-semibold text-lg'>Order from - Kirtan Patel</span>
        </div>
        <Separator />
        <div className='max-w-xl m-4 flex justify-between items-center gap-4'>
          <div className='flex flex-col gap-4'>
            <span>Total Products: 23</span>
            <span>Total Amount: 23</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>Add Note</Button>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
              <DialogTitle>Add note</DialogTitle>
              <DialogDescription>Write any notes that you want to give to the customer e.g. if some products aren&apos;t available</DialogDescription>
            </DialogHeader>
            <Textarea placeholder='Write notes here...' />
            <DialogFooter>
              <Button>Submit</Button>
            </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>Confirm</Button>
        </div>
        <Separator />
      </header>

      <div className='max-w-md p-6'>
        <DataTable 
          columns={orderProductsColumns} 
          data={mockOrderProducts} 
        />
      </div>
    </div>
  )
}

export default page