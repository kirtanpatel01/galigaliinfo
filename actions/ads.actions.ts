"use client";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function incrementAdView(adId: number) {
  const { error } = await supabase
    .from("ads")
    .update({ views: supabase.rpc("increment", { x: 1 }) }) // or just raw +1
    .eq("id", adId);

  if (error) console.error("Failed to increment views:", error);
}

export async function incrementAdClick(adId: number) {
  const { error } = await supabase
    .from("ads")
    .update({ clicks: supabase.rpc("increment", { x: 1 }) }) // or raw +1
    .eq("id", adId);

  if (error) console.error("Failed to increment clicks:", error);
}
