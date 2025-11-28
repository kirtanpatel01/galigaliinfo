// components/data-table/products-columns.tsx
'use client'

import { ProductTableItem } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";

export function getProductColumns(addedIds: number[]): ColumnDef<ProductTableItem>[] {
  return [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => {
        const id = row.original.id
        const inCart = addedIds.includes(id)

        return (
          <div className="flex items-center gap-2">
            <span className="truncate">{row.getValue("name")}</span>
            {inCart && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                Added
              </span>
            )}
          </div>
        )
      }
    },
    {
      accessorKey: "stock",
      header: () => <div className="text-center">Stock</div>,
      cell: ({ row }) => (
        <div className={`font-medium capitalize text-center
          ${row.getValue("stock") === "available" ? "text-green-400" : "text-red-500"}
        `}>
          {row.getValue("stock")}
        </div>
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
      id: "quantityWithUnit",
      header: () => <div className="text-center">Quantity</div>,
      cell: ({ row }) => {
        const qty = row.original.qty
        const unit = row.original.qty_unit
        return (
          <div className="text-center">
            {qty} {unit}
          </div>
        )
      },
    },
  ]
}
