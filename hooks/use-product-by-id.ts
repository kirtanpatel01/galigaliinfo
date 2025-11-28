"use client";

import { createClient } from "@/lib/supabase/client";
import { Product, RawProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

async function fetchProductById(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      user_id,
      name,
      description,
      images,
      price,
      qty,
      qty_unit,
      qty_available,
      created_at,
      isHidden,
      offers (
        id,
        type,
        description,
        percentage,
        amount,
        qty,
        price,
        expiry
      ),
      profile:user_id (
        fullName,
        phone,
        address,
        city,
        state,
        country,
        pincode,
        shopName
      )
    `
    )
    .eq("id", id)
    .single<RawProduct>();

  if (error) throw error;

  return {
    ...data,
    profile: data.profile ?? null,
  };
}

export function useProductById(id: string) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}
