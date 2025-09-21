'use client'

import { DataTable } from '@/components/data-table/data-table'
import { productColumns } from '@/components/data-table/products-columns'
import LoadingSpinner from '@/components/loading-spinner'
import ReviewDialog from '@/components/ReviewDialog'
import ShowCaseInfo from '@/components/showcase/show-case-info'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Workspace from '@/components/workspace'
import { useProductsByUser } from '@/hooks/use-products-by-user'
import { useProfileById } from '@/hooks/use-profile'
import { useSelectedProducts } from '@/stores/useSelectedProducts'
import { useState, useMemo, useCallback, use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: profile } = useProfileById(id)
  const { data: products, isLoading, isError } = useProductsByUser(profile?.user_id)

  const [selectedRow, setSelectedRow] = useState<ProductTableItem | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isReviewOpen, setIsReviewOpen] = useState(false)

  const addProduct = useSelectedProducts((s) => s.addProduct)
  const storeProducts = useSelectedProducts((s) => s.products)

  // compute selected products from store
  const selectedProducts = storeProducts.filter((p) => selectedIds.includes(p.id))

  const { totalQty, totalAmount } = useMemo(() => {
    const qty = selectedProducts.reduce((sum, p) => sum + p.qty, 0)
    const amount = selectedProducts.reduce((sum, p) => sum + p.lineTotal, 0)
    return { totalQty: qty, totalAmount: amount }
  }, [selectedProducts])

  const handleSelectionChange = useCallback((rows: ProductTableItem[]) => {
    setSelectedIds(rows.map((r) => r.id))
  }, [])

  const reviewProducts = selectedProducts.map((sp) => {
    const original = products?.find((p) => p.id === sp.id)
    return {
      id: sp.id,
      name: original?.name ?? '',
      price: original?.price ?? 0,
      qty: sp.qty,
      qty_unit: original?.qty_unit,
      lineTotal: sp.lineTotal,
    }
  })

  if (isLoading) return <LoadingSpinner />
  if (isError || !products) return <div className="p-4">Error loading product</div>

  // build the prop for Workspace from original products + store state
  const workspaceProduct = selectedRow
    ? (() => {
      const original = products.find((p) => p.id === selectedRow.id)
      const store = storeProducts.find((p) => p.id === selectedRow.id)
      if (!original) return null
      return {
        ...original,
        qty: store?.qty ?? original.qty,
      }
    })()
    : null

    console.log(profile.user_id)
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
            selection
            paginantion
            onRowClick={(row) => {
              setSelectedRow(row)
              addProduct({
                id: row.id,
                qty: row.qty,
                lineTotal: row.price * row.qty,
              })
            }}
            onSelectionChange={handleSelectionChange}
            canSelectRow={(row) => row.stock === 'available'}
          />
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-4">
          {workspaceProduct ? (
            <Workspace product={workspaceProduct} />
          ) : (
            <div>Click a product to view details</div>
          )}

          {/* Totals display */}
          <div className="border rounded-md">
            <p className="font-medium m-3">Products Selected: {totalQty}</p>
            <Separator />
            <p className="font-medium m-3">
              Total Amount: ${totalAmount.toFixed(2)}
            </p>
          </div>

          {/* Review button */}
          <Button
            onClick={() => setIsReviewOpen(true)}
            disabled={selectedProducts.length === 0}
          >
            Review Selected Products
          </Button>

          {/* Review dialog */}
          <ReviewDialog
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
            products={reviewProducts}
            shopId={profile.user_id}
          />
        </div>
      </div>
    </div>
  )
}
