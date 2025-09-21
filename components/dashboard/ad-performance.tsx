"use client";

import { useAds } from "@/hooks/dashboard/use-ads";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import LoadingSpinner from "../loading-spinner";

interface Props {
  shopId: string;
}

export default function AdsPerformance({ shopId }: Props) {
  const { data: ads, isLoading, error } = useAds(shopId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-card text-card-foreground rounded-lg shadow border border-border flex flex-col"
    >
      <h2 className="text-lg font-semibold mb-3">Ad Performance</h2>

      {isLoading && <LoadingSpinner />}
      {error && <div className="text-destructive">Error loading ads</div>}
      {!ads?.length && <div className="text-muted-foreground">No ads found</div>}

      {ads && ads?.length > 0 && (
        <>
          {/* Chart */}
          <div className="w-full h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ads} margin={{ top: 5, right: 10, bottom: 5, left: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="2 2" stroke="#cbd5e1" />
                <XAxis dataKey="product_name" tick={{ fill: "currentColor", fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f59e0b", borderRadius: 6 }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend />
                <Bar dataKey="views" fill="#4f46e5" barSize={14} radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" fill="#f59e0b" barSize={14} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Views</th>
                  <th className="text-left p-2">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr
                    key={ad.id}
                    className="border-b border-border hover:bg-muted/10 transition-colors rounded"
                  >
                    <td className="p-2">{ad.product_name}</td>
                    <td className="p-2">{ad.views}</td>
                    <td className="p-2">{ad.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </motion.div>
  );
}
