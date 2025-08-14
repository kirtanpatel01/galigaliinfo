"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const pickUpColumns: ColumnDef<PickUpsTableItem>[] = [
  {
    accessorKey: "customerName",
    header: "Customer Name"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
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
    header: "Status",
    cell: ({ row }) => (
      <div className="w-full">
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
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const actionsByStatus: Record<string, string[]> = {
        pending: ["Accept", "Reject"],
        accepted: ["Confirm"],
        confirm: [],
        rejected: []
      }

      const actions = actionsByStatus[status] || []

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex justify-center">
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/business/orders/${row.original.id}`}>
              <DropdownMenuItem>View</DropdownMenuItem>
            </Link>
            {actions.length > 0 ? (
              actions.map((action) => (
                <DropdownMenuItem key={action}>{action}</DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No actions</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
