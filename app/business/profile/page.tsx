'use client'

import { useProfileByUserId } from '@/hooks/use-profile'
import ProfileDetails from '@/components/profile-details'
import LoadingSpinner from '@/components/loading-spinner'
import { useCurrentUser } from '@/hooks/use-current-user'

function Page() {
  const { user, loading: loadingUser } = useCurrentUser();
  const { data: profile, isLoading, isError, error } = useProfileByUserId(user?.id || "")

  if (isLoading || loadingUser) return <LoadingSpinner />
  if (isError) return <div className="p-6 text-red-500">Error: {error?.message}</div>
  if (!profile) return <div className="p-6">No profile found</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <ProfileDetails profile={profile} role={user?.user_metadata.role} />
    </div>
  )
}

export default Page
