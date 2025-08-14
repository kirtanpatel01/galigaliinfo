'use client'

import { DataTable } from '@/components/data-table/data-table'
import { productColumns } from '@/components/data-table/products-columns'
import ReviewDialog from '@/components/ReviewDialog'
import ShowCaseInfo from '@/components/showcase/show-case-info'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Workspace from '@/components/workspace'
import { mockProducts } from '@/constants/productTable'
import { use, useState, useMemo } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  console.log(id)

  const [selectedRow, setSelectedRow] = useState<ProductTableItem | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<ProductTableItem[]>([])
  const [isReviewOpen, setIsReviewOpen] = useState(false)

  // Calculate totals using useMemo for performance
  const { totalQty, totalAmount } = useMemo(() => {
    const qty = selectedProducts.length
    const amount = selectedProducts.reduce(
      (sum, product) => sum + product.price * product.qty,
      0
    )
    return { totalQty: qty, totalAmount: amount }
  }, [selectedProducts])

  return (
    <div className="flex flex-col">
      <div className="p-4 sm:p-6 border-b">
        <ShowCaseInfo />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 flex-1">
        <div className="col-span-2 border-b xl:border-r p-4 sm:p-6">
          <DataTable
            columns={productColumns}
            data={mockProducts}
            filterColumnName="productName"
            selection
            paginantion
            onRowClick={setSelectedRow}
            onSelectionChange={setSelectedProducts} // NEW
            canSelectRow={(row) => row.stock === "available"}
          />
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-4">
          {selectedRow ? (
            <Workspace product={selectedRow} />
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
            products={selectedProducts}
          />
        </div>
      </div>
    </div>
  )
}
