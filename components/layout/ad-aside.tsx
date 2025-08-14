import { ads } from '@/constants/adsData'
import Image from 'next/image'
import React from 'react'
import { Sidebar } from '../ui/sidebar'

function AdAside() {
  return (
    <Sidebar side='right'>
      <div className='p-4 space-y-4'>
        {ads.map((link, i) => (
          <Image
            key={link}
            src={link}
            alt={`ad-${i}`}
            className={`size-36 rounded-md object-cover`}
            height={176}
            width={176}
          />
        ))}
      </div>
    </Sidebar>
  )
}

export default AdAside
