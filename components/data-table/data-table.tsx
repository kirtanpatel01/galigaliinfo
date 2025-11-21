"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumnName?: string;
  selection?: boolean;
  paginantion?: boolean;
  onRowClick?: (row: TData) => void;
  onSelectionChange?: (rows: TData[]) => void;
  canSelectRow?: (row: TData) => boolean;
  activeRowId?: string | number | null;
}

type MaybeWithId = {
  id?: string | number;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumnName,
  paginantion = false,
  onRowClick,
  canSelectRow,
  onSelectionChange,
  activeRowId = null,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: (row) =>
      canSelectRow ? canSelectRow(row.original) : true,
    state: {
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, table, onSelectionChange]);

  return (
    <div>
      {/* Searchbar */}
      {filterColumnName && (
        <div className="flex items-center mb-3">
          <Input
            placeholder="Search products..."
            value={
              (table.getColumn(filterColumnName)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(filterColumnName)
                ?.setFilterValue(event.target.value)
            }
            className={`max-w-sm rounded-full`}
          />
        </div>
      )}

      {/* Actual Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const isSelectable = canSelectRow
                  ? canSelectRow(row.original)
                  : true;

                const original = row.original as TData & MaybeWithId;

                const hasId =
                  original.id !== undefined &&
                  activeRowId !== null &&
                  activeRowId !== undefined;

                const matchesActive = hasId
                  ? original.id === activeRowId
                  : String(row.id) === String(activeRowId);

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    data-active={matchesActive ? "true" : undefined}
                    onClick={() => {
                      if (!isSelectable) return;
                      if (matchesActive) {
                        return;
                      }
                      onRowClick?.(row.original);
                    }}
                    className={`${
                      isSelectable
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-65"
                    } ${matchesActive ? "bg-blue-50 dark:bg-slate-950" : ""}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Result.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {paginantion && <DataTablePagination table={table} />}
    </div>
  );
}
