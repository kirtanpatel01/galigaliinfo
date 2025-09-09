'use server'

import { createClient } from "@/lib/supabase/server";

export async function saveProfileData(payload: Omit<UserProfile, "user_id">) {
  const supabase = await createClient();

  // Get the authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  // Extract role from user metadata
  const role = user.user_metadata.data.role;

  // Prepare payload for insert
  const { user_id, ...safePayload } = payload as any;
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
 