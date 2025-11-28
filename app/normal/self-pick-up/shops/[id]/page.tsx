"use client";

import { DataTable } from "@/components/data-table/data-table";
import { getProductColumns } from "@/components/data-table/products-columns";
import LoadingSpinner from "@/components/loading-spinner";
import ReviewDialog from "@/components/ReviewDialog";
import ShowCaseInfo from "@/components/showcase/show-case-info";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Workspace from "@/components/workspace";
import { useProductsByUser } from "@/hooks/use-products-by-user";
import { useProfileById } from "@/hooks/use-profile";
import { useSelectedProducts } from "@/stores/useSelectedProducts";
import { useState, useMemo, useCallback, use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: profile } = useProfileById(id);
  const {
    data: products,
    isLoading,
    isError,
  } = useProductsByUser(profile?.user_id);

  const [selectedRow, setSelectedRow] = useState<ProductTableItem | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const storeProducts = useSelectedProducts((s) => s.products);
  const clear = useSelectedProducts((s) => s.clear);
  const selectedProducts = storeProducts;

  const { totalProducts, totalAmount } = useMemo(() => {
    const count = selectedProducts.length;
    const amount = selectedProducts.reduce((sum, p) => sum + p.lineTotal, 0);
    return { totalProducts: count, totalAmount: amount };
  }, [selectedProducts]);

  const handleRowClick = useCallback(
    (row: ProductTableItem) => {
      if (selectedRow?.id === row.id) {
        return;
      }
      setSelectedRow(row);
    },
    [selectedRow]
  );

  const reviewProducts = selectedProducts.map((sp) => {
    const original = products?.find((p) => p.id === sp.id);
    return {
      id: sp.id,
      name: original?.name ?? "",
      price: original?.price ?? 0,
      qty: sp.qty,
      qty_unit: original?.qty_unit,
      lineTotal: sp.lineTotal,
    };
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !products)
    return <div className="p-4">Error loading product</div>;

  const workspaceProduct = selectedRow
    ? (() => {
        const original = products.find((p) => p.id === selectedRow.id);
        const store = storeProducts.find((p) => p.id === selectedRow.id);
        if (!original) return null;
        return {
          ...original,
          qty: store?.qty ?? original.qty,
        };
      })()
    : null;

  const addedIds = storeProducts.map((p) => p.id);
  const productColumns = getProductColumns(addedIds);

  return (
    <div className="flex flex-col">
      <div className="p-4 sm:p-6 border-b">
        <ShowCaseInfo profile={profile} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 flex-1">
        <div className="col-span-2 border-b xl:border-r p-4 sm:p-6">
          <DataTable
            columns={productColumns}
            data={products}
            filterColumnName="name"
            paginantion
            onRowClick={(row) => handleRowClick(row)}
            activeRowId={selectedRow?.id ?? null}
          />
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-4">
          {workspaceProduct ? (
            <Workspace product={workspaceProduct} />
          ) : (
            <div>Click a product to view details</div>
          )}

          <div className="border rounded-md">
            <p className="font-medium m-3">Products Selected: {totalProducts}</p>
            <Separator />
            <p className="font-medium m-3">
              Total Amount: ₹{totalAmount.toFixed(2)}
            </p>
          </div>

          <Button
            onClick={() => setIsReviewOpen(true)}
            disabled={selectedProducts.length === 0}
          >
            Review Selected Products
          </Button>

          <ReviewDialog
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
            products={reviewProducts}
            shopId={profile.user_id}
            clear={clear}
          />
        </div>
      </div>
    </div>
  );
}
