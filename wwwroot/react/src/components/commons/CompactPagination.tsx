import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { classNames } from "../../utils/classNames.ts";
import Spinner from "./Spinner.tsx";

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
  loading?: boolean;
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
};

const DEFAULT_WINDOW = 6;

type PaginationLockWindow = Window & {
  __indPaginationLockCount?: number;
  __indPaginationPrevOverflow?: string;
  __indPaginationPrevTouchAction?: string;
};

// Starts pagination at the supplied section or at the top of the document.
const scrollToPaginationStart = (target?: HTMLElement | null) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const applyScroll = () => {
    if (target) {
      if (!target.isConnected) return;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: "auto" });
      return;
    }

    const scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      scrollingElement.scrollTop = 0;
      scrollingElement.scrollLeft = 0;
    }

    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  applyScroll();
  window.requestAnimationFrame(applyScroll);
};

// Compact pagination with a 6-page window and four persistent edge controls.
const CompactPagination = forwardRef<HTMLDivElement, CompactPaginationProps>(
  ({ totalPages, currentPage, pageWindow = DEFAULT_WINDOW, onPageChange, labels, className, loading, scrollTargetRef }, ref) => {
    const safeTotal = Math.max(0, totalPages || 0);
    const safeCurrent = Math.min(Math.max(1, currentPage || 1), safeTotal || 1);
    const windowSize = Math.max(1, pageWindow || DEFAULT_WINDOW);
    const hasLoadingSignal = typeof loading === "boolean";
    const isLoading = loading === true;
    const [isPageTransitionPending, setIsPageTransitionPending] = useState(false);
    const showPageSpinner = hasLoadingSignal && isPageTransitionPending;

    const showPagination = safeTotal > 1;
    const canGoPrev = safeCurrent > 1;
    const canGoNext = safeCurrent < safeTotal;

    const pageNumbers = useMemo(() => {
      if (!safeTotal) return [];
      const windowStart = Math.max(1, Math.floor((safeCurrent - 1) / windowSize) * windowSize + 1);
      const windowEnd = Math.min(safeTotal, windowStart + windowSize - 1);
      return Array.from({ length: windowEnd - windowStart + 1 }, (_val, idx) => windowStart + idx);
    }, [safeCurrent, safeTotal, windowSize]);

    useEffect(() => {
      if (!hasLoadingSignal || !isPageTransitionPending) return;
      if (isLoading) return;
      setIsPageTransitionPending(false);
      scrollToPaginationStart(scrollTargetRef?.current);
    }, [hasLoadingSignal, isLoading, isPageTransitionPending, scrollTargetRef]);

    useEffect(() => {
      if (!showPageSpinner) return;
      if (typeof window === "undefined" || typeof document === "undefined") return;

      const lockWindow = window as PaginationLockWindow;
      const lockCount = Number(lockWindow.__indPaginationLockCount || 0);
      if (lockCount < 1) {
        lockWindow.__indPaginationPrevOverflow = document.body.style.overflow;
        lockWindow.__indPaginationPrevTouchAction = document.body.style.touchAction;
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
      }
      lockWindow.__indPaginationLockCount = lockCount + 1;

      return () => {
        const currentCount = Number(lockWindow.__indPaginationLockCount || 0);
        const nextCount = Math.max(0, currentCount - 1);
        lockWindow.__indPaginationLockCount = nextCount;
        if (nextCount < 1) {
          document.body.style.overflow = lockWindow.__indPaginationPrevOverflow || "";
          document.body.style.touchAction = lockWindow.__indPaginationPrevTouchAction || "";
          delete lockWindow.__indPaginationPrevOverflow;
          delete lockWindow.__indPaginationPrevTouchAction;
        }
      };
    }, [showPageSpinner]);

    const requestPageChange = (page: number) => {
      if (page < 1 || page > safeTotal) return;
      if (page === safeCurrent) return;
      if (hasLoadingSignal) {
        setIsPageTransitionPending(true);
      }
      scrollToPaginationStart(scrollTargetRef?.current);
      onPageChange(page);
    };

    if (!showPagination) return null;

    return (
      <>
        {showPageSpinner ? (
          <div
            className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-100"
            onWheel={(event) => {
              event.preventDefault();
            }}
            onTouchMove={(event) => {
              event.preventDefault();
            }}
          >
            <Spinner size="h-10 w-10" />
          </div>
        ) : null}
        <div
          id="pagination"
          ref={ref}
          className={classNames(
            "pagination grid grid-cols-[1fr_auto_1fr] items-center gap-1",
            className || ""
          )}
        >
          <div className="flex items-center gap-1 justify-start [@media(max-width:360px)]:col-start-1 [@media(max-width:360px)]:row-start-2">
            <button
              type="button"
              className="w-7 h-7 p-0 border-0 bg-transparent text-slate-500 enabled:hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label={labels?.first}
              disabled={isLoading || !canGoPrev}
              onClick={(e) => {
                e.preventDefault();
                requestPageChange(1);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
              </svg>
            </button>
            <button
              type="button"
              className="w-7 h-7 p-0 border-0 bg-transparent text-slate-500 enabled:hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label={labels?.prev}
              disabled={isLoading || !canGoPrev}
              onClick={(e) => {
                e.preventDefault();
                requestPageChange(safeCurrent - 1);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 min-w-0 [@media(max-width:360px)]:col-span-3 [@media(max-width:360px)]:row-start-1">
            {pageNumbers.map((page) => {
              const isActive = page === safeCurrent;
              return (
                <button
                  key={`page-${page}`}
                  type="button"
                  disabled={isLoading}
                  className={classNames(
                    "min-w-[26px] px-2 py-0.5 rounded-[var(--radius-xl)] border text-[10px] font-semibold transition",
                    isActive
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary",
                    isLoading ? "opacity-60 cursor-not-allowed" : ""
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    requestPageChange(page);
                  }}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 justify-end [@media(max-width:360px)]:col-start-3 [@media(max-width:360px)]:row-start-2">
            <button
              type="button"
              className="w-7 h-7 p-0 border-0 bg-transparent text-slate-500 enabled:hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label={labels?.next}
              disabled={isLoading || !canGoNext}
              onClick={(e) => {
                e.preventDefault();
                requestPageChange(safeCurrent + 1);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button
              type="button"
              className="w-7 h-7 p-0 border-0 bg-transparent text-slate-500 enabled:hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label={labels?.last}
              disabled={isLoading || !canGoNext}
              onClick={(e) => {
                e.preventDefault();
                requestPageChange(safeTotal);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }
);

CompactPagination.displayName = "CompactPagination";

export default CompactPagination;
