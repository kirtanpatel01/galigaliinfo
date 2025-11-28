"use client";

import { useState } from "react";
import { useReviews } from "@/hooks/dashboard/use-reviews";
import LoadingSpinner from "../loading-spinner";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

function Reviews({ shopId }: { shopId: string }) {
  const { data: reviews, isLoading } = useReviews(shopId);

  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);

  if (isLoading) return <LoadingSpinner />;

  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-4 bg-card text-card-foreground rounded shadow border border-border">
        <h2 className="text-lg font-semibold mb-3">Recent Reviews</h2>
        <div className="text-muted-foreground text-sm">No reviews yet</div>
      </div>
    );
  }

  const totalPages = Math.ceil(reviews.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const current = reviews.slice(start, start + PAGE_SIZE);

  // Build number list [1, 2, 3, ...]
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>

      {/* ---------------- Reviews List ---------------- */}
      <CardContent>
        <ul className="space-y-3">
          {current.map((r) => (
            <li key={r.id} className="border-b pb-2">
              <p className="font-medium flex items-center gap-2">
                {r.user}
                <span className="text-yellow-500 text-xs">⭐ {r.rating}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {r.product}: {r.content}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
      {/* ---------------- Pagination ---------------- */}
      <CardFooter>
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
                isActive={page === 1}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {pageNumbers.map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  href="#"
                  isActive={page === num}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(num);
                  }}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Ellipsis (only if many pages) */}
            {totalPages > 6 && page < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
                isActive={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

export default Reviews;
