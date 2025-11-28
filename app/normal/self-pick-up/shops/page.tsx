'use client'

import LoadingSpinner from '@/components/loading-spinner'
import ShowcasePage from '@/components/showcase/ShowcasePage'
import { useAllProfile } from '@/hooks/use-all-profiles'

function Page() {
    const { data: profiles, isLoading, isError, error } = useAllProfile("business")
  
    if (isLoading) return <LoadingSpinner />
    if (isError) return <div>Error loading profiles: {error?.message}</div>
  
    const showcaseItems = (profiles || []).map(profile => ({
      type: 'self-pick-up' as const,
      id: profile.id,
      image: profile.avatar || profile.shopPhoto || '', // fallback image
      title: profile.shopName || profile.fullName || 'Unknown',
      shopName: profile.shopName || '',
      fullName: profile.fullName,
      address: profile.address || '',
      shopPhoto: profile.shopPhoto,
      rating: undefined,
      timeAgo: undefined,
    }))
    console.log(showcaseItems)
  return (
    <ShowcasePage type='self-pick-up' showcaseItems={showcaseItems} />
  )
}

export default Page