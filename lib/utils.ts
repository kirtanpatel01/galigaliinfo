import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

// lib/utils.ts
import type { OfferType } from "@/components/product-form/product.schema";

type DescValues = {
  value?: string | number;
  qty?: string | number;
  price?: string | number;
  expiry?: string | Date | undefined;
};

export function generateDesc(type: OfferType, values: DescValues): string {
  switch (type) {
    case "buy-get":
      return "Special Offer: Buy one item and get another one completely free!";

    case "percentage-discount": {
      const v = values.value;
      return v !== undefined && v !== null && String(v).trim() !== ""
        ? `Limited Offer: Get a flat ${v}% discount on this product.`
        : "Percentage discount available on this product.";
    }

    case "flat-amount-discount": {
      const v = values.value;
      return v !== undefined && v !== null && String(v).trim() !== ""
        ? `Save more: Enjoy an instant discount of ₹${v} on your purchase.`
        : "Flat discount available on this product.";
    }

    case "quantity-discount": {
      const qty = values.qty;
      const price = values.price;
      return qty !== undefined && price !== undefined && qty !== null && price !== null
        ? `Bundle Deal: Buy ${qty} items together for just ₹${price}.`
        : "Quantity discount available on this product.";
    }

    case "limited-time-offer": {
      const v = values.value;
      const expiry = values.expiry;
      const expiryStr = expiry instanceof Date ? expiry.toLocaleDateString() : expiry ?? "";
      return v !== undefined && v !== null && String(v).trim() !== "" && expiryStr
        ? `Hurry! Avail ${v} off — valid until ${expiryStr}.`
        : "Limited-time offer available now.";
    }

    default:
      return "Exclusive Offer available on this product.";
  }
}
