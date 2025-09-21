'use client'

import { adsColumns } from "@/components/data-table/ads-columns";
import { DataTable } from "@/components/data-table/data-table";
import { Separator } from "@/components/ui/separator";
import AdForm from "@/components/ad-form";
import { useAdsByUser } from "@/hooks/use-ads-by-user";
import LoadingSpinner from "@/components/loading-spinner";

function Page() {
  const { data: ads = [], isLoading } = useAdsByUser();

  return (
    <div>
      <header className="p-4 flex justify-between items-center">
        <span className="font-semibold text-lg">
          No. of ads running: {ads.length}
        </span>
        <AdForm editable={false} />
      </header>
      <Separator />
      <div className="p-6 max-w-2xl">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DataTable columns={adsColumns} data={ads} />
        )}
      </div>
    </div>
  );
}

export default Page;
