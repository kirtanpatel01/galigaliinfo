// lib/get-user-role.ts
import { createClient } from "@/lib/supabase/server";

export async function getUserRole(): Promise<"admin" | "business" | "normal" | "public"> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return "public";

  const role = user?.user_metadata.data.role;

  if (role === "admin" || role === "business" || role === "normal") {
    return role;
  }

  return "public";
}

