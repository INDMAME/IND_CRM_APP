import React, { forwardRef, useMemo } from "react";
import { classNames } from "../../utils/classNames.ts";

type PaginationLabels = {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
};

type CompactPaginationProps = {
  totalPages: number;
  currentPage: number;
  pageWindow?: number;
  onPageChange: (page: number) => void;
  labels?: PaginationLabels;
  className?: string;
};

const DEFAULT_WINDOW = 6;

// Compact pagination with 6-page window and edge controls.
const CompactPagination = forwardRef<HTMLDivElement, CompactPaginationProps>(
  ({ totalPages, currentPage, pageWindow = DEFAULT_WINDOW, onPageChange, labels, className }, ref) => {
    const safeTotal = Math.max(0, totalPages || 0);
    const safeCurrent = Math.min(Math.max(1, currentPage || 1), safeTotal || 1);
    const windowSize = Math.max(1, pageWindow || DEFAULT_WINDOW);

    const showPagination = safeTotal > 1;
    const showEdgeNav = safeTotal > windowSize;
    const canJumpToStart = safeCurrent > windowSize;
    const canGoPrev = safeCurrent > 1;
    const canGoNext = safeCurrent < safeTotal;

    const pageNumbers = useMemo(() => {
      if (!safeTotal) return [];
      const windowStart = Math.max(1, Math.floor((safeCurrent - 1) / windowSize) * windowSize + 1);
      const windowEnd = Math.min(safeTotal, windowStart + windowSize - 1);
      return Array.from({ length: windowEnd - windowStart + 1 }, (_val, idx) => windowStart + idx);
    }, [safeCurrent, safeTotal, windowSize]);

    if (!showPagination) return null;

    return (
      <div
        id="pagination"
        ref={ref}
        className={classNames(
          "pagination grid grid-cols-[1fr_auto_1fr] items-center gap-1",
          className || ""
        )}
      >
        <div className="flex items-center gap-1 justify-start">
          {showEdgeNav && canJumpToStart && (
            <button
              type="button"
              className="w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition"
              aria-label={labels?.first}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(1);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
              </svg>
            </button>
          )}
          {showEdgeNav && canGoPrev && (
            <button
              type="button"
              className="w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition"
              aria-label={labels?.prev}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(safeCurrent - 1);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-1 min-w-0 flex-nowrap">
          {pageNumbers.map((page) => {
            const isActive = page === safeCurrent;
            return (
              <button
                key={`page-${page}`}
                type="button"
                className={classNames(
                  "min-w-[26px] px-2 py-0.5 rounded-md border text-[10px] font-semibold transition",
                  isActive
                    ? "bg-primary border-primary text-white shadow-sm"
                    : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 justify-end">
          {showEdgeNav && canGoNext && (
            <button
              type="button"
              className="w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition"
              aria-label={labels?.next}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(safeCurrent + 1);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
          {showEdgeNav && canGoNext && (
            <button
              type="button"
              className="w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition"
              aria-label={labels?.last}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(safeTotal);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

CompactPagination.displayName = "CompactPagination";

export default CompactPagination;
