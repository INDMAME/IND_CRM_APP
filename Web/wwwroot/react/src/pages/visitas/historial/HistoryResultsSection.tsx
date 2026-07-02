import React from "react";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import HistoryTable, { type TimelineItem } from "./HistoryTable.tsx";

type PaginationLabels = {
  first: string;
  prev: string;
  next: string;
  last: string;
};

type Props = {
  showResults: boolean;
  isLoading: boolean;
  loadingLabel: string;
  timelineItems: TimelineItem[];
  noDataText: string;
  errorMessage: string;
  totalPages: number;
  currentPage: number;
  pageWindow: number;
  paginationLabels: PaginationLabels;
  onNavigate: (linkId: string) => void;
  onPageChange: (page: number) => void;
};

// Renders history loading, table and pagination as a focused result section.
const HistoryResultsSection = ({
  showResults,
  isLoading,
  loadingLabel,
  timelineItems,
  noDataText,
  errorMessage,
  totalPages,
  currentPage,
  pageWindow,
  paginationLabels,
  onNavigate,
  onPageChange,
}: Props) => {
  return (
    <>
      <div
        id="resultsLoader"
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-neutral-700"
        style={{ display: isLoading ? "flex" : "none" }}
      >
        <svg className="ind-spinner size-5" viewBox="0 0 20 20" role="status" aria-label={loadingLabel}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {loadingLabel}
      </div>

      {showResults && (
        <>
          <HistoryTable
            items={timelineItems}
            noDataText={noDataText}
            errorMessage={errorMessage}
            onNavigate={onNavigate}
          />

          <CompactPagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageWindow={pageWindow}
            loading={isLoading}
            onPageChange={onPageChange}
            labels={paginationLabels}
          />
        </>
      )}
    </>
  );
};

export default HistoryResultsSection;
