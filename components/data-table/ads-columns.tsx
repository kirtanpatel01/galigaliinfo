"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import AdForm from "../ad-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useAdsMutations } from "@/hooks/use-ad-mutations";
import { toast } from "sonner";
import Image from "next/image";

type Props = {
  ad: AdItem;
};

function AdActionsCell({ ad }: Props) {
  const { user } = useCurrentUser();
  const { deleteAd } = useAdsMutations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full flex justify-center">
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <AdForm editable={true} ad={ad} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            deleteAd.mutate(
              { id: ad.id, user_id: user?.id || "" },
              { onSuccess: () => toast.success("Ad deleted successfully!") }
            )
          }
        >
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const adsColumns: ColumnDef<AdItem>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => {
      const ad = row.original;
      return (
        <div className="flex items-center gap-2">
          {ad.image && (
            <Image
              src={ad.image}
              alt={ad.product_name || "product-image"}
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
          )}
          <span>{ad.product_name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => <AdActionsCell ad={row.original} />, // ✅ safe hook usage
  },
];
