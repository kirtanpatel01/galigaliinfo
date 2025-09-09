"use client";

import React from "react";
import { DataTable } from "./data-table";
import { orderProductsColumns } from "./order-products-columns";
import { useOrderItems } from "@/hooks/use-order-items";

interface Props {
  orderId: number;
}

export default function OrderItemsTable({ orderId }: Props) {
  const { data: items = [], isLoading } = useOrderItems(orderId);

  if (isLoading) return <div>Loading products…</div>;

  return <DataTable columns={orderProductsColumns} data={items} />;
}
