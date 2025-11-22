'use server'

import { createClient } from "@/lib/supabase/server";

export async function saveProfileData(payload: Omit<UserProfile, "user_id">) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const role = user?.user_metadata?.role || user?.user_metadata?.data?.role;

  const safePayload = { ...(payload as any) };
  delete safePayload.user_id;
  const insertPayload = {
    ...safePayload,
    user_id: user.id,
    role,
  };

  return await supabase
    .from("profile")
    .insert([insertPayload])
    .select();
}
 