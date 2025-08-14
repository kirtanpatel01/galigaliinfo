"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DataTable } from './data-table'
import { orderItemsColumns } from './order-items-columns'
import DialogCloseBtn from "../dialog-close-btn";
import { mockOrderProducts } from "@/constants/orderPrducts";

export const selfPickUpsColumns: ColumnDef<SelfPickUpsTableItem>[] = [
  {
    accessorKey: "shopName",
    header: "Shop Name"
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
      }).format(amount)

      return <div className="font-medium text-center">{formatted}</div>
    }
  },
  {
    accessorKey: "noProducts",
    header: () => <div className="text-center">No. Of Products</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("noProducts")}</div>
    )
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="w-full flex justify-center">
        <span className={`rounded px-2 py-1 font-medium capitalize
        ${row.getValue("status") === "pending" && "bg-neutral-300 dark:bg-neutral-700"}
        ${row.getValue("status") === "accepted" && "bg-yellow-200 dark:bg-yellow-300 text-black"}
        ${row.getValue("status") === "confirm" && "bg-green-400 dark:bg-green-600 text-black"}
        ${row.getValue("status") === "rejected" && "bg-red-400 dark:bg-red-800"}
        `}>{row.getValue("status")}</span>
      </div>
    )
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: () => {
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex justify-center">
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <span>View</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order</DialogTitle>
              <DialogDescription>List of all products in the order</DialogDescription>
            </DialogHeader>
            <DataTable columns={orderItemsColumns} data={mockOrderProducts} />
            <DialogFooter>
              <DialogCloseBtn />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }
  }
]
