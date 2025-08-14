import { DataTable } from '@/components/data-table/data-table'
import { pickUpColumns } from '@/components/data-table/pick-ups-columns'
import { pickUpsMockData } from '@/constants/pick-ups-data'
import React from 'react'

function page() {
  return (
    <div className='p-6'>
      <div className='max-w-3xl'>
        <DataTable columns={pickUpColumns} data={pickUpsMockData} />
      </div>
    </div>
  )
}

export default page