'use client'

import { useProfileByUserId } from '@/hooks/use-profile'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import ProfileDetails from '@/components/profile-details'

function Page() {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoadingUser(false)
    }
    loadUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const { data: profile, isLoading, isError, error } = useProfileByUserId(user?.id || "")

  if (isLoading || loadingUser) return <div className="p-6">Fetching profile data...</div>
  if (isError) return <div className="p-6 text-red-500">Error: {error?.message}</div>
  if (!profile) return <div className="p-6">No profile found</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <ProfileDetails profile={profile} />
    </div>
  )
}

export default Page
