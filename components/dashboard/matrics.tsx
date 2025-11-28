import { useMetrics } from '@/hooks/dashboard/use-matrics';
import React from 'react'
import LoadingSpinner from '../loading-spinner';

function Matrics({ shopId }: { shopId: string }) {
  const { data: metrics, isLoading: metricsLoading } = useMetrics(shopId);
  console.log(metrics)
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {metricsLoading ? (
        <div className="p-4 bg-card text-card-foreground rounded shadow"><LoadingSpinner /></div>
      ) : (
        <>
          <div className="p-4 bg-card text-card-foreground rounded shadow">
            Total Orders: {metrics?.totalOrders}
          </div>
          <div className="p-4 bg-card text-card-foreground rounded shadow">
            Revenue: ₹{metrics?.revenue}
          </div>
          <div className="p-4 bg-card text-card-foreground rounded shadow">
            Active Products: {metrics?.activeProducts}
          </div>
          <div className="p-4 bg-card text-card-foreground rounded shadow">
            Avg. Rating: ⭐ {metrics?.avgRating.toFixed(1)}
          </div>
          <div className="p-4 bg-card text-card-foreground rounded shadow">
            Active Offers: {metrics?.activeOffers}
          </div>
        </>
      )}
    </div>
  )
}

export default Matrics