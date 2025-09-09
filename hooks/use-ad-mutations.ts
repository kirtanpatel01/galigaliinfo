// lib/hooks/use-ads-mutations.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function useAdsMutations() {
  const queryClient = useQueryClient();

  // create ad
  const createAd = useMutation({
    mutationFn: async (ad: { user_id: string; product_id: string; image: string }) => {
      const { error } = await supabase.from("ads").insert(ad);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  // update ad
  const updateAd = useMutation({
    mutationFn: async (ad: { id: number; user_id: string; product_id: string; image: string }) => {
      const { error } = await supabase
        .from("ads")
        .update({
          product_id: ad.product_id,
          image: ad.image,
        })
        .eq("id", ad.id)
        .eq("user_id", ad.user_id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  // delete ad
  const deleteAd = useMutation({
    mutationFn: async (ad: { id: number; user_id: string }) => {
      const { error } = await supabase
        .from("ads")
        .delete()
        .eq("id", ad.id)
        .eq("user_id", ad.user_id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  return { createAd, updateAd, deleteAd };
}
