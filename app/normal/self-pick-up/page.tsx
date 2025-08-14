import { DataTable } from '@/components/data-table/data-table'
import { selfPickUpsColumns } from '@/components/data-table/self-pick-ups-columns'
import { Button } from '@/components/ui/button'
import { selfPickUpsMockData } from '@/constants/self-pick-ups-data'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <header className='w-full p-4 border-b flex justify-between items-center'>
        <h2 className='font-semibold space-x-2'>
          <span>Requests you have sent:</span>
          <span className='px-3 py-1 rounded-md border border-sky-500/50 bg-sky-600/20'>5</span>
        </h2>
        <Button>
          <Link href={'/normal/self-pick-up/shops'}>Book New Order</Link>
        </Button>
      </header>

      <div className='p-6'>
        <div className='max-w-2xl'>
          <DataTable columns={selfPickUpsColumns} data={selfPickUpsMockData} />
        </div>
      </div>
    </div>
  )
}

export default page