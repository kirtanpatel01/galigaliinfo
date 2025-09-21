"use client";

import { useRecentOrders } from "@/hooks/dashboard/use-recent-orders";
import LoadingSpinner from "../loading-spinner";

interface Props {
  shopId: string;
}

export default function RecentOrders({ shopId }: Props) {
  const { data: orders, isLoading, error } = useRecentOrders(shopId);

  return (
    <div className="p-4 bg-card text-card-foreground rounded-lg shadow border border-border animate-fade-in">
      <h2 className="text-lg font-semibold mb-3">Recent Orders</h2>

      {isLoading && <LoadingSpinner />}
      {error && <div className="text-destructive">Error loading orders</div>}
      {!orders?.length && <div className="text-muted-foreground">No recent orders</div>}

      {orders && orders?.length > 0 && (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="p-2">{o.id}</td>
                <td className="p-2">{o.customer?.fullName || "Unknown"}</td>
                <td className="p-2 capitalize">{o.status}</td>
                <td className="p-2">₹{o.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
