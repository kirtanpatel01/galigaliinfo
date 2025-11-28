// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type OfferType =
  | "buy-get"
  | "percentage-discount"
  | "flat-amount-discount"
  | "quantity-discount"
  | "limited-time-offer";

type OfferLike = {
  type: OfferType;
  description?: string | null;
  percentage?: number | null;
  amount?: number | null;
  qty?: number | null;
  price?: number | null;
  expiry?: string | Date | null;
};

/** format date in a compact, locale-aware way */
function formatDate(input?: string | Date | null) {
  if (!input) return "";
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString();
}

/** format rupee/INR value safely */
function formatCurrency(value?: number | null) {
  if (value === null || value === undefined) return "";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `₹${value}`;
  }
}

/** make safe numeric test */
function hasNumber(v?: unknown): v is number {
  return typeof v === "number" && !Number.isNaN(v);
}

/**
 * Generate a short, user-friendly description for a given offer.
 * Uses the most accurate fields available and never returns empty/NULL.
 */
export function generateDescFromOffer(offer: OfferLike): string {
  // prefer the explicit description if it's valid and informative
  const desc = offer.description?.toString().trim();
  if (desc) return desc;

  switch (offer.type) {
    case "buy-get":
      return "Special Offer: Buy one item and get another one free.";

    case "percentage-discount": {
      if (hasNumber(offer.percentage)) {
        return `Limited Offer: Get a flat ${offer.percentage}% discount on this product.`;
      }
      // fallback
      return "Percentage discount available on this product.";
    }

    case "flat-amount-discount": {
      if (hasNumber(offer.amount)) {
        return `Save more: Enjoy an instant discount of ${formatCurrency(
          offer.amount
        )} on your purchase.`;
      }
      return "Flat amount discount available on this product.";
    }

    case "quantity-discount": {
      if (hasNumber(offer.qty) && hasNumber(offer.price)) {
        return `Bundle Deal: Buy ${offer.qty} items together for just ${formatCurrency(
          offer.price
        )}.`;
      }
      // try partial info
      if (hasNumber(offer.qty)) {
        return `Quantity discount available when buying ${offer.qty} items.`;
      }
      if (hasNumber(offer.price)) {
        return `Special bundle price: ${formatCurrency(offer.price)} for multiple items.`;
      }
      return "Quantity discount available on this product.";
    }

    case "limited-time-offer": {
      // Prefer percentage -> amount -> generic with expiry
      if (hasNumber(offer.percentage)) {
        const expiry = formatDate(offer.expiry);
        return expiry
          ? `Hurry! Avail ${offer.percentage}% off — valid until ${expiry}.`
          : `Hurry! Avail ${offer.percentage}% off for a limited time.`;
      }
      if (hasNumber(offer.amount)) {
        const expiry = formatDate(offer.expiry);
        return expiry
          ? `Limited-time: ${formatCurrency(offer.amount)} off — valid until ${expiry}.`
          : `Limited-time: ${formatCurrency(offer.amount)} off.`;
      }
      const expiry = formatDate(offer.expiry);
      return expiry
        ? `Hurry! Special offer valid until ${expiry}.`
        : "Limited-time offer available now.";
    }

    default:
      return "Exclusive offer available on this product.";
  }
}
