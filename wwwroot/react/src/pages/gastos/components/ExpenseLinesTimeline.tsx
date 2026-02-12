import React from "react";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import type { ExpenseSheetLine } from "../expenseTypes.ts";
import { formatExpenseDateParts, safeText } from "../utils/expenseUiUtils.ts";
import ExpenseSectionDivider from "./ExpenseSectionDivider.tsx";
import ExpenseTimelineCard from "./ExpenseTimelineCard.tsx";

type PaginationLabels = {
  first: string;
  prev: string;
  next: string;
  last: string;
};

type ExpenseLinesTimelineProps = {
  visibleLines: ExpenseSheetLine[];
  currencyCode: string;
  totalLinePages: number;
  linePage: number;
  linesLabel: string;
  emptyText: string;
  paginationLabels: PaginationLabels;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onLinePageChange: (page: number) => void;
  onOpenLine: (lineRecId: string) => void;
};

// Dumb timeline for expense sheet lines with standard card and pagination layout.
const ExpenseLinesTimeline = ({
  visibleLines,
  currencyCode,
  totalLinePages,
  linePage,
  linesLabel,
  emptyText,
  paginationLabels,
  containerRef,
  onLinePageChange,
  onOpenLine,
}: ExpenseLinesTimelineProps) => {
  return (
    <section className="space-y-0">
      <ExpenseSectionDivider label={linesLabel} className="expense-section-divider--spaced" />

      {visibleLines.length === 0 ? (
        <div className="timeline-box timeline-empty" data-empty-text={emptyText} />
      ) : (
        <div ref={containerRef} className="timeline-box">
          {visibleLines.map((line, index) => {
            const lineId = safeText(line.lineRecId);
            const description = safeText(line.description);
            const amountText = formatAmountWithCurrency(line.amount ?? null, currencyCode);
            const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");

            return (
              <div key={`${lineId}-${index}`} className="timeline-item">
                <ExpenseTimelineCard
                  dateParts={dateParts}
                  title={description || lineId || "-"}
                  amountText={amountText}
                  onOpen={() => onOpenLine(lineId)}
                  titleClassName="timeline-name expense-line-card__title"
                />
              </div>
            );
          })}
        </div>
      )}

      <CompactPagination
        totalPages={totalLinePages}
        currentPage={linePage}
        onPageChange={onLinePageChange}
        labels={paginationLabels}
      />
    </section>
  );
};

export default ExpenseLinesTimeline;
