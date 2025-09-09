"use client";

import { DataTable } from "@/components/data-table/data-table";
import { orderProductsColumns } from "@/components/data-table/order-products-columns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useOrderItems } from "@/hooks/use-order-items";
import { updateOrderStatus } from "@/actions/order.actions";
import { useOrderInfo } from "@/hooks/use-order-info";

export default function Page({ params }: { params: { id: string } }) {
  const orderId = Number(params.id);

  const { data: products = [], isLoading: loadingItems, refetch } = useOrderItems(orderId);
  const { data: orderInfo, isLoading: loadingInfo } = useOrderInfo(orderId);

  console.log(orderInfo)
  async function handleConfirm() {
    try {
      await updateOrderStatus({
        orderId,
        status: "confirmed",
      });
      await refetch();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <header>
        <div className="m-4">
          <span className="font-semibold text-lg">Order #{orderId}</span>
        </div>
        <Separator />
        <div className="max-w-xl m-4 flex justify-between items-center gap-4">
          <div className="flex flex-col gap-2">
            <span>Customer: {orderInfo?.customer_name ?? "—"}</span>
            <span>Total Products: {orderInfo?.no_of_products ?? products.length}</span>
            <span>Total Amount: {orderInfo?.total_amount ?? 0}</span>
            <span>Status: {orderInfo?.status ?? "—"}</span>
          </div>

          <Button
            onClick={handleConfirm}
            disabled={
              orderInfo?.status === "confirmed" ||
              orderInfo?.status === "rejected" ||
              loadingItems ||
              loadingInfo
            }
          >
            Confirm
          </Button>
        </div>
        <Separator />
      </header>

      <div className="max-w-md p-6">
        {loadingItems ? (
          <div>Loading products…</div>
        ) : (
          <DataTable columns={orderProductsColumns} data={products} />
        )}
      </div>
    </div>
  );
}
