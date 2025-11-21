'use client'

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

async function fetchAllProfile(role: "normal" | "business") {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("role", role);

  if (error) throw error;

  return data;
}

export function useAllProfile(role: "normal" | "business") {
  return useQuery({
    queryKey: ["profile", role],
    queryFn: () => fetchAllProfile(role),
    enabled: !!role, // only runs when userId is defined
    staleTime: 1000 * 60 * 5, // cache for 5 mins
    refetchOnWindowFocus: false,
  });
}
