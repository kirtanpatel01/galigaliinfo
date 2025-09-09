'use client'

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

// fetch by user_id (uuid foreign key)
async function fetchProfileByUserId(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId) // uuid
    .maybeSingle();

  if (error) throw error;
  return data;
}

// fetch by id (primary key, could be int or uuid depending on schema)
async function fetchProfileById(id: string | number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id) // id
    .maybeSingle();

  if (error) throw error;
  return data;
}

export function useProfileByUserId(userId: string) {
  return useQuery({
    queryKey: ["profile", "user", userId],
    queryFn: () => fetchProfileByUserId(userId),
    enabled: !!userId,
  });
}

export function useProfileById(id: string | number) {
  return useQuery({
    queryKey: ["profile", "id", id],
    queryFn: () => fetchProfileById(id),
    enabled: !!id,
  });
}
