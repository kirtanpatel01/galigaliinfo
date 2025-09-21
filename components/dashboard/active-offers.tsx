// components/dashboard/active-offers.tsx
"use client";

import { useActiveOffers } from "@/hooks/dashboard/use-active-offers";
import LoadingSpinner from "../loading-spinner";

interface Props {
  shopId: string;
}

export default function ActiveOffers({ shopId }: Props) {
  const { data: offers, isLoading, error } = useActiveOffers(shopId);

  if (isLoading)
    return (
      <div className="p-4 bg-card text-card-foreground rounded-lg shadow border border-border animate-fade-in">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-card text-accent-foreground rounded-lg shadow border border-border animate-fade-in">
        Failed to load offers
      </div>
    );

  if (!offers?.length)
    return (
      <div className="p-4 bg-card text-muted-foreground rounded-lg shadow border border-border animate-fade-in">
        No active offers
      </div>
    );

  return (
    <div className="p-4 bg-card text-card-foreground rounded-lg shadow border border-border animate-fade-in">
      <h2 className="text-lg font-semibold mb-3">Active Offers</h2>
      <ul className="divide-y divide-border">
        {offers.map((o) => (
          <li key={o.id} className="py-2">
            <div className="flex justify-between">
              <span className="font-medium">{o.product_name}</span>
              <span className="text-muted-foreground">
                {o.type === "percentage-discount" && o.percentage
                  ? `${o.percentage}% off`
                  : o.type === "flat-amount-discount" && o.amount
                  ? `₹${o.amount} off`
                  : o.type}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{o.description}</p>
            {o.expiry && (
              <p className="text-xs text-muted-foreground">
                Valid until {new Date(o.expiry).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
