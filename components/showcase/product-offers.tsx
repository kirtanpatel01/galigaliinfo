"use client";

import { Badge } from "../ui/badge";
import { generateDesc } from "@/lib/utils";

interface ProductOffersProps {
  offers: Offer[] | undefined;
}

export default function ProductOffers({ offers }: ProductOffersProps) {
  if (!offers || offers.length === 0) {
    return (
      <span className="text-muted-foreground dark:text-muted-foreground/70">
        No offers available
      </span>
    );
  }

  return (
    <div className="border rounded-xl p-4 w-full flex flex-col gap-4 shadow-sm">
      <h2 className="font-semibold text-xl text-foreground">Offers</h2>
      <div className="flex flex-col gap-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex justify-between items-center border p-3 rounded-lg bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700 shadow-sm"
          >
            <span className="font-medium text-foreground">
              {generateDesc(offer.type, {
                ...offer,
                expiry: offer.expiry ?? undefined,
              })}
            </span>

            {offer.expiry && (
              <Badge className="bg-amber-200 text-amber-900 dark:bg-amber-700 dark:text-amber-100">
                Expires: {new Date(offer.expiry).toLocaleDateString()}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
