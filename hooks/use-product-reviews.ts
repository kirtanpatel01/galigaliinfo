'use client'

import { createClient } from "@/lib/supabase/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useProductReviews(productId: number) {
  const queryClient = useQueryClient();
  const supabase = createClient()

  const { data: reviews = [], isLoading, isError } = useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          created_at,
          rating,
          content,
          user_id,
          profile:user_id (
            fullName,
            username,
            avatar
          )
        `)
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log(data)

      return (data ?? []).map(r => ({
        ...r,
        profile: r.profile as unknown as ReviewProfile
      }));
    }
  });

  const addReviewMutation = useMutation({
    mutationFn: async (payload: { rating: number; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        product_id: productId,
        rating: payload.rating,
        content: payload.content,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      toast.success("Review added successfully.");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to submit review");
    }
  });

  return { reviews, isLoading, isError, addReviewMutation };
}
