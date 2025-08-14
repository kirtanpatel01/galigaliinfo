import { createClient } from '@/lib/supabase/server';

async function page() {
  const supabase = await createClient();
  
    const { data, error } = await supabase.auth.getClaims();
    console.log(data?.claims.user_metadata)
    console.log(error)
  return (
    <div>
      Profile Page
    </div>
  )
}

export default page