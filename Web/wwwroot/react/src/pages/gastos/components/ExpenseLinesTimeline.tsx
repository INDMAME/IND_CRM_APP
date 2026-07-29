import React from "react";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import { indT } from "../../../utils/indI18n.ts";
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
  companyCurrencyCode: string;
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
  companyCurrencyCode,
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
          {visibleLines.map((line) => {
            const lineId = safeText(line.lineRecId);
            const description = safeText(line.description);
            const grossAmountText = formatAmountWithCurrency(line.amountMST ?? null, companyCurrencyCode);
            const reimbursableAmountText = formatAmountWithCurrency(
              line.reimbursableAmount ?? null,
              companyCurrencyCode
            );
            const originalAmountText = formatAmountWithCurrency(line.amount ?? null, safeText(line.currencyCode));
            const linkedTicketFileId = safeText(line.fileId);
            const projectId = safeText(line.projId);
            const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");
            const ticketStatusIcon = linkedTicketFileId ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
            ) : null;

            return (
              <div key={lineId || `${safeText(line.transDate)}-${description}-${originalAmountText}-${projectId}`} className="timeline-item">
                <ExpenseTimelineCard
                  dateParts={dateParts}
                  title={description || lineId || "-"}
                  amountText={reimbursableAmountText}
                  amountClassName="mt-1 block w-full text-[11px] font-semibold leading-tight text-[#00296be0] tabular-nums"
                  amountContent={(
                    <span className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-left text-[10px] font-medium text-slate-500">
                        {indT("ExpenseSheets_Field_GrossJustifiedAmount", "Justified expense")}
                      </span>
                      <span className="whitespace-nowrap text-right">{grossAmountText}</span>
                      <span className="text-left text-[10px] font-medium text-slate-500">
                        {indT("ExpenseSheets_Field_EmployeeReimbursement", "Reimbursement to employee")}
                      </span>
                      <span className="whitespace-nowrap text-right">{reimbursableAmountText}</span>
                    </span>
                  )}
                  subtitleContent={(
                    <span>
                      {indT("ExpenseSheets_Field_OriginalAmount", "Original amount")}: {originalAmountText}
                    </span>
                  )}
                  onOpen={() => onOpenLine(lineId)}
                  titleClassName="timeline-name expense-line-card__title"
                  subtitleClassName="expense-sheet-card__subtitle expense-line-card__meta"
                  statusIcon={ticketStatusIcon}
                  statusIconClassName="expense-line-card__ticket-icon"
                  statusLabel={linkedTicketFileId || undefined}
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
