import ShowcaseItem from '@/components/showcase/ShowcaseItem'
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className='p-4 sm:p-6'>
      <ShowcaseItem id={id} />
    </div>
  )
}