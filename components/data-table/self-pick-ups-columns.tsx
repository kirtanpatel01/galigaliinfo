"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import DialogCloseBtn from "../dialog-close-btn";
import OrderItemsTable from "./order-items-table";
import { Button } from "../ui/button";

export const selfPickUpsColumns: ColumnDef<SelfPickUpsTableItem>[] = [
  {
    accessorKey: "shopName",
    header: "Shop Name",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-medium text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "noProducts",
    header: () => <div className="text-center">No. Of Products</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("noProducts")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="w-full flex justify-center">
        <span
          className={`rounded px-2 py-1 font-medium capitalize
        ${
          row.getValue("status") === "pending" &&
          "bg-neutral-300 dark:bg-neutral-700"
        }
        ${
          row.getValue("status") === "accepted" &&
          "bg-yellow-200 dark:bg-yellow-300 text-black"
        }
        ${
          row.getValue("status") === "confirm" &&
          "bg-green-400 dark:bg-green-600 text-black"
        }
        ${row.getValue("status") === "rejected" && "bg-red-400 dark:bg-red-800"}
        `}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
  // inside selfPickUpsColumns
  {
    id: "view",
    header: () => <div className="text-center">View</div>,
    cell: ({ row }) => {
      const orderId = row.original.id;
      return (
        <Dialog>
          <DialogTrigger asChild className="w-full flex justify-center">
            <Button variant={"outline"}>View</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order #{orderId}</DialogTitle>
              <DialogDescription>
                List of all products in the order
              </DialogDescription>
            </DialogHeader>
            <OrderItemsTable orderId={orderId} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "delete",
    header: () => <div className="text-center">Delete</div>,
    cell: ({ row }) => {
      const orderId = row.original.id;
      const status = row.original.status;
      return <div className="w-full flex justify-center"><DialogCloseBtn id={orderId} status={status} /></div>;
    },
  },
];
