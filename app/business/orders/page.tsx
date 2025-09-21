"use client";

import { DataTable } from "@/components/data-table/data-table";
import { pickUpColumns } from "@/components/data-table/pick-ups-columns";
import LoadingSpinner from "@/components/loading-spinner";
import { usePickUps } from "@/hooks/use-pick-ups";

export default function ShopOwnerPickUpPage() {
  const { data: pickUps = [], isLoading, error } = usePickUps();

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="p-6">Failed to load orders</div>;

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <DataTable columns={pickUpColumns} data={pickUps} />
      </div>
    </div>
  );
}
