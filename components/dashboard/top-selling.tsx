"use client";

import { PieChart, Pie, Cell } from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useTopSellingProducts } from "@/hooks/dashboard/use-top-selling";
import LoadingSpinner from "../loading-spinner";

export default function TopProducts({ shopId }: { shopId: string }) {
  const { data: products, isLoading, error } = useTopSellingProducts(shopId);

  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    );

  if (error)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription className="text-destructive">
            Error loading products
          </CardDescription>
        </CardHeader>
      </Card>
    );

  if (!products || products.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>No sales yet</CardDescription>
        </CardHeader>
      </Card>
    );

  // -------------------------
  // Data Prep
  // -------------------------
  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
  ];

  const sorted = [...products].sort((a, b) => b.total_qty - a.total_qty);

  const chartData = sorted.map((p, i) => ({
    name: p.name,
    value: p.total_qty,
    fill: COLORS[i % COLORS.length],
  }));

  const chartConfig = chartData.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>
          Sales distribution across all products
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              label
              labelLine
              outerRadius="80%"
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
          {/* </ResponsiveContainer> */}
        </ChartContainer>
      </CardContent>

      {/* Legend under chart */}
      <CardContent className="pt-2">
        <ul className="text-sm grid gap-2">
          {chartData.map((item, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.fill }}
                />
                <span>{item.name}</span>
              </div>

              <span className="text-muted-foreground">{item.value} sold</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
