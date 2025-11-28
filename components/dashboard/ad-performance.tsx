"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAds } from "@/hooks/dashboard/use-ads";
import LoadingSpinner from "../loading-spinner";
import { toast } from "sonner";

export default function AdsPerformance({ shopId }: { shopId: string }) {
  const { data: ads, isLoading, error } = useAds(shopId);

  if (error) {
    console.log(error);
    toast.error(error.message);
  }

  if (isLoading) return <LoadingSpinner />;

  if (!ads || ads.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ad Performance</CardTitle>
          <CardDescription>No ads found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const chartData = ads.map((a) => ({
    product: a.product_name,
    views: a.views,
    clicks: a.clicks,
  }));

  const viewsConfig = {
    views: { label: "Views", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  const clicksConfig = {
    clicks: { label: "Clicks", color: "var(--chart-2)" },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ad Performance</CardTitle>
        <CardDescription>Separate charts for Views & Clicks</CardDescription>
      </CardHeader>

      <CardContent className="space-y-10">
        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* -------------------------------- */}
          {/* VIEWS CHART */}
          {/* -------------------------------- */}
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2">Views</h3>

            <ChartContainer config={viewsConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />

                <YAxis
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <XAxis
                  dataKey="product"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    value.length > 10 ? value.slice(0, 10) + "…" : value
                  }
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <Line
                  dataKey="views"
                  type="monotone"
                  stroke="var(--color-views)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
          {/* -------------------------------- */}
          {/* CLICKS CHART */}
          {/* -------------------------------- */}
          <div className="flex-1">
            <h3 className="text-md font-semibold mb-2">Clicks</h3>

            <ChartContainer config={clicksConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />

                <YAxis
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <XAxis
                  dataKey="product"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    value.length > 10 ? value.slice(0, 10) + "…" : value
                  }
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <Line
                  dataKey="clicks"
                  type="monotone"
                  stroke="var(--color-clicks)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
              {/* <ChartLegend content={<ChartLegendContent />} /> */}
            </ChartContainer>
          </div>
        </div>

        {/* -------------------------------- */}
        {/* TABLE */}
        {/* -------------------------------- */}
        <Table>
          <TableCaption>Performance breakdown for each ad</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Product</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ads.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell className="font-medium">{ad.product_name}</TableCell>
                <TableCell className="text-right">{ad.views}</TableCell>
                <TableCell className="text-right">{ad.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell className="text-right">
                {ads.reduce((s, a) => s + a.views, 0)}
              </TableCell>
              <TableCell className="text-right">
                {ads.reduce((s, a) => s + a.clicks, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
