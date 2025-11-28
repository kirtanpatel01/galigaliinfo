"use client";

import { generateDescFromOffer } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Offer = {
  id: number;
  type: string;
  description?: string | null;
  percentage?: number | null;
  amount?: number | null;
  qty?: number | null;
  price?: number | null;
  expiry?: string | null;
  product_name?: string | null;
};

interface ProductOffersProps {
  offers?: Offer[] | null;
}

function formatBadgeValue(o: Offer) {
  switch (o.type) {
    case "percentage-discount":
      return o.percentage != null ? `${o.percentage}% off` : "Discount";
    case "flat-amount-discount":
      return o.amount != null ? `₹${Math.round(o.amount) } off` : "Discount";
    case "quantity-discount":
      if (o.qty != null && o.price != null) return `${o.qty} for ₹${o.price}`;
      if (o.qty != null) return `${o.qty} items`;
      if (o.price != null) return `₹${o.price}`;
      return "Bundle";
    case "buy-get":
      return "Buy 1 Get 1";
    case "limited-time-offer":
      return o.expiry ? `Valid until ${new Date(o.expiry).toLocaleDateString()}` : "Limited";
    default:
      return "";
  }
}

export default function ProductOffers({ offers }: ProductOffersProps) {
  if (!offers || offers.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No offers available
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-4 w-full flex flex-col gap-4 shadow-sm bg-card">
      <h2 className="font-semibold text-lg text-foreground">Offers</h2>

      <div className="flex flex-col gap-3">
        {offers.map((offer) => {
          const desc = generateDescFromOffer({
            type: offer.type as any,
            description: offer.description,
            percentage: offer.percentage ?? null,
            amount: offer.amount ?? null,
            qty: offer.qty ?? null,
            price: offer.price ?? null,
            expiry: offer.expiry ?? null,
          });

          const badgeValue = formatBadgeValue(offer);

          return (
            <div
              key={offer.id}
              className="flex justify-between items-start gap-4 border p-3 rounded-lg bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700 shadow-sm"
              role="listitem"
              aria-labelledby={`offer-${offer.id}-title`}
            >
              <div className="min-w-0">
                <div id={`offer-${offer.id}-title`} className="font-medium text-foreground truncate">
                  {offer.product_name ?? "Product"}
                </div>

                <p className="text-sm text-muted-foreground mt-1 break-words">
                  {desc}
                </p>

                {offer.type === "limited-time-offer" && offer.expiry && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Expires: {new Date(offer.expiry).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge className="bg-amber-100 text-amber-900 dark:bg-amber-800 dark:text-amber-100">
                  {offer.type.replace(/-/g, " ")}
                </Badge>

                {badgeValue ? (
                  <div className="text-sm font-semibold text-foreground">
                    {badgeValue}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
