"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export const productColumns: ColumnDef<ProductTableItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="cursor-pointer"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="cursor-pointer"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: "Product Name"
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => (
      <div className={`font-medium capitalize text-center
        ${row.getValue("stock") === "available" ? "text-green-400" : "text-red-500"}
      `}>{row.getValue("stock")}</div>
    )
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("price")}</div>
    )
  },
  {
    id: "quantityWithUnit", // no accessorKey, we derive value
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => {
      const qty = row.original.qty; // from the full object
      const unit = row.original.unit;
      return (
        <div className="text-center">
          {qty} {unit}
        </div>
      );
    },
  },
]
