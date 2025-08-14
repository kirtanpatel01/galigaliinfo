"use client"

import { ColumnDef } from "@tanstack/react-table";

export const orderItemsColumns: ColumnDef<OrderProductItem>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name"
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("quantity")}</div>
    )
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-center">Total Price</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("totalPrice")}</div>
    )
  },
]
