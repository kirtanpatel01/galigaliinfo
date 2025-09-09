'use client'

import { OrderProductItem } from "@/hooks/use-order-items";
import { ColumnDef } from "@tanstack/react-table";

export const orderProductsColumns: ColumnDef<OrderProductItem>[] = [
  {
    accessorKey: "name",
    header: "Product Name"
  },
  {
    id: "quantityWithUnit", // no accessorKey, we derive value
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => {
      const qty = row.original.qty; // from the full object
      const unit = row.original.qty_unit;
      return (
        <div className="text-center">
          {qty} {unit}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price"
  }
]