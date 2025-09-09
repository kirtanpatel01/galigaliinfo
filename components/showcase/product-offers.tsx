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
    <div className="border rounded-md p-4 w-full flex flex-col gap-3 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
        Offers
      </h2>
      <div className="flex flex-col gap-2">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex justify-between items-center border p-2 rounded-md bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-700"
          >
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {generateDesc(offer.type, offer)}
            </span>

            {offer.expiry && (
              <Badge className="bg-yellow-200 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100">
                Expires: {new Date(offer.expiry).toLocaleDateString()}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
