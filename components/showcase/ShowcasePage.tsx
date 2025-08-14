'use client'

import { useMemo, useState } from 'react'
import ShowcaseCard from '@/components/showcase/ShowcaseCard'
import React from 'react'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'

type ShowcasePageProps = {
  type: 'shop' | 'product' | 'self-pick-up' | 'business'
  showcaseItems: ShowcaseCardItem[]
}

const linkMap = {
  "product": (id: string) => `/products/${id}`,
  "shop": (id: string) => `/shops/${id}`,
  'self-pick-up': (id: string) => `/normal/self-pick-up/shops/${id}`,
}

function ShowcasePage({ type, showcaseItems }: ShowcasePageProps) {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!query) return showcaseItems
    return showcaseItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.address.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, showcaseItems])

  console.log(type)

  return (
    <div className='flex flex-col'>
      <div className='w-full border-b fixed h-[var(--header-height)] flex gap-6 items-center bg-background px-6'>
        <Input
          className='w-96 rounded-full'
          placeholder={`Search for ${type}...`}
          onChange={(e) => setQuery(e.target.value)}
        />

        {type === "business" && (
          <Link href="/business/listings/new">
            <Button>
              Add a new product
            </Button>
          </Link>
        )}
      </div>

      <ul className="w-full p-6 flex flex-wrap gap-6 mt-(--header-height)">
        {filteredItems.map((item) => (
          <li key={item.id} className="!p-0 !bg-transparent hover:!bg-transparent">
            {type !== "business"
              ? (
                <Link href={linkMap[type](item.id)}>
                  <ShowcaseCard type={type} {...item} />
                </Link>
              ) : (
                <ShowcaseCard type={type} {...item} />
              )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShowcasePage
