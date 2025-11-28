'use server'

import { createClient } from "@/lib/supabase/server";
import { ProfileInsert } from "@/types/user";

export async function saveProfileData(payload: ProfileInsert) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const role = user.user_metadata?.role || user.user_metadata?.data?.role;

  // Build final payload cleanly
  const insertPayload = {
    ...payload,
    user_id: user.id,
    role: role ?? payload.role ?? "normal",
  };

  const { data, error } = await supabase
    .from("profile")
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw error;

  return data;
}
