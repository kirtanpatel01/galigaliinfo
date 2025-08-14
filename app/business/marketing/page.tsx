import AdForm from '@/components/ad-form'
import { adsColumns } from '@/components/data-table/ads-columns'
import { DataTable } from '@/components/data-table/data-table'
import { Separator } from '@/components/ui/separator'
import { mockAds } from '@/constants/adItems'
import React from 'react'

function page() {
  return (
    <div>
      <header className='p-4 flex justify-between items-center'>
        <span className='font-semibold text-lg'>No. of ads re running: 5</span>
        <AdForm editable={false} />
      </header>
      <Separator />
      <div className='p-6 max-w-2xl'>
        <DataTable columns={adsColumns} data={mockAds} />
      </div>
    </div>
  )
}

export default page