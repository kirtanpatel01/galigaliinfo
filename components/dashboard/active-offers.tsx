"use client";

import { useActiveOffers } from "@/hooks/dashboard/use-active-offers";
import LoadingSpinner from "../loading-spinner";
import { Badge } from "@/components/ui/badge";
import { OfferType } from "@/lib/utils";
import { Offer } from "@/types/product";

interface Props {
  shopId: string;
}

export default function ActiveOffers({ shopId }: Props) {
  const { data: offers, isLoading, error } = useActiveOffers(shopId);

  if (isLoading)
    return (
      <div className="p-4 bg-card rounded-lg shadow border border-border">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-card rounded-lg shadow border border-border text-destructive">
        Failed to load offers
      </div>
    );

  if (!offers || offers.length === 0)
    return (
      <div className="p-4 bg-card rounded-lg shadow border border-border text-muted-foreground">
        No active offers
      </div>
    );

  const renderOfferValue = (offer: Offer) => {
    switch (offer.type) {
      case "percentage-discount":
        return `${offer.percentage}% off`;
      case "flat-amount-discount":
        return `₹${offer.amount} off`;
      case "quantity-discount":
        return `${offer.qty} for ₹${offer.price}`;
      case "buy-get":
        return "Buy 1 Get 1";
      case "limited-time-offer":
        return offer.expiry
          ? `Until ${new Date(offer.expiry).toLocaleDateString()}`
          : "Limited Time";
      default:
        return "";
    }
  };

  const typeLabel: Record<OfferType, string>  = {
    "percentage-discount": "Percentage Discount",
    "flat-amount-discount": "Flat Discount",
    "quantity-discount": "Bundle Deal",
    "buy-get": "Buy Get",
    "limited-time-offer": "Limited Offer",
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow border border-border animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">Active Offers</h2>

      <ul className="divide-y divide-border">
        {offers.map((o) => (
          <li key={o.id} className="py-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{o.product_name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {o.description}
                </p>
                {o.expiry && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Valid until {new Date(o.expiry).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <Badge variant="secondary" className="capitalize">
                  {typeLabel[o.type]}
                </Badge>
                <span className="font-medium text-primary text-sm">
                  {renderOfferValue(o)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
