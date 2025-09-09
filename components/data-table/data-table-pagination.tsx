'use client'

import React, { useCallback, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

interface DataTablePaginationProps<TData> {
  table: import("@tanstack/react-table").Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  // memoized derived values (avoid calling these repeatedly inline)
  const selectedCount = useMemo(() => table.getFilteredSelectedRowModel().rows.length, [table])
  const filteredCount = useMemo(() => table.getFilteredRowModel().rows.length, [table])
  const pageSize = table.getState().pagination.pageSize ?? 8
  const pageIndex = table.getState().pagination.pageIndex ?? 0
  const pageCount = table.getPageCount()

  // stable handlers that guard against redundant updates
  const onChangePageSize = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value)
    if (Number.isFinite(newSize) && newSize > 0 && newSize !== table.getState().pagination.pageSize) {
      table.setPageSize(newSize)
    }
  }, [table])

  const goFirst = useCallback(() => {
    if (table.getCanPreviousPage()) table.setPageIndex(0)
  }, [table])

  const goPrev = useCallback(() => {
    if (table.getCanPreviousPage()) table.previousPage()
  }, [table])

  const goNext = useCallback(() => {
    if (table.getCanNextPage()) table.nextPage()
  }, [table])

  const goLast = useCallback(() => {
    if (table.getCanNextPage()) table.setPageIndex(Math.max(0, table.getPageCount() - 1))
  }, [table])

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-2 space-y-4">
      <div className="text-muted-foreground flex-1 text-sm self-start">
        {selectedCount} of {filteredCount} row(s) selected.
      </div>

      <div className="flex flex-col min-[425px]:flex-row items-center space-x-6 lg:space-x-8 space-y-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>

          {/* Native select (stable, simpler than custom Select) */}
          <select
            className="h-8 w-[70px] rounded border px-2"
            value={String(pageSize)}
            onChange={onChangePageSize}
          >
            {[8, 15, 20, 25, 30, 40, 50].map((ps) => (
              <option key={ps} value={String(ps)}>{ps}</option>
            ))}
          </select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={goFirst} disabled={!table.getCanPreviousPage()} aria-label="Go to first page">
            <ChevronsLeft />
          </button>

          <button onClick={goPrev} disabled={!table.getCanPreviousPage()} aria-label="Go to previous page">
            <ChevronLeft />
          </button>

          <button onClick={goNext} disabled={!table.getCanNextPage()} aria-label="Go to next page">
            <ChevronRight />
          </button>

          <button onClick={goLast} disabled={!table.getCanNextPage()} aria-label="Go to last page">
            <ChevronsRight />
          </button>
        </div>
      </div>
    </div>
  )
}
