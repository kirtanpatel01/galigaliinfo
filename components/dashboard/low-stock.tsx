"use client";

import { useLowStockProducts } from "@/hooks/dashboard/use-low-stock";
import LoadingSpinner from "../loading-spinner";

interface Props {
  shopId: string;
}

export default function LowStock({ shopId }: Props) {
  const { data: products, isLoading, error } = useLowStockProducts(shopId);

  return (
    <div className="p-4 bg-card text-card-foreground rounded-lg shadow border border-border animate-fade-in">
      <h2 className="text-lg font-semibold mb-3">Low Stock Products</h2>

      {isLoading && <LoadingSpinner />}
      {error && <div className="text-destructive">Failed to load products</div>}
      {!products?.length && <div className="text-muted-foreground">No low stock products</div>}

      {products && products?.length > 0 && (
        <ul className="divide-y divide-border">
          {products.map((p) => (
            <li key={p.id} className="flex justify-between py-2 text-sm">
              <span>{p.name}</span>
              <span className="font-medium text-muted-foreground">{p.qty_available} left</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
