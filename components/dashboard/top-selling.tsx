"use client";

import { useTopSellingProducts } from "@/hooks/dashboard/use-top-selling";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import LoadingSpinner from "../loading-spinner";

interface Props {
  shopId: string;
}

export default function TopProducts({ shopId }: Props) {
  const { data: products, isLoading, error } = useTopSellingProducts(shopId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-card text-card-foreground rounded-lg shadow border border-border flex flex-col"
    >
      <h2 className="text-lg font-semibold mb-3">Top Selling Products</h2>

      {isLoading && <LoadingSpinner />}
      {error && <div className="text-destructive">Error loading products</div>}
      {!products?.length && <div className="text-muted-foreground">No sales yet</div>}

      {products && products?.length > 0 && (
        <>
          {/* Chart */}
          <div className="w-full h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={products}
                layout="vertical"
                margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                barCategoryGap="25%"
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#cbd5e1" />
                <XAxis type="number" tick={{ fill: "currentColor", fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  width={120}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#f59e0b", borderRadius: 6 }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="total_qty" fill="#4f46e5" barSize={16} radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* List */}
          <ul className="divide-y divide-border">
            {products.map((p) => (
              <li
                key={p.product_id}
                className="flex justify-between py-2 text-sm hover:bg-muted/10 transition-colors rounded px-2"
              >
                <span>{p.name}</span>
                <span className="font-medium text-muted-foreground">{p.total_qty} sold</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </motion.div>
  );
}
