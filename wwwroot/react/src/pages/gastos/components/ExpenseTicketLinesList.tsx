import React from "react";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseDateParts } from "../utils/expenseUiUtils.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import { formatExpenseNumber } from "../utils/expenseNumberFormat.ts";
import type { ExpenseTicketDetailLine } from "../tickets/detail/expenseTicketDetailTypes.ts";
import ExpenseSectionDivider from "./ExpenseSectionDivider.tsx";
import ExpenseTimelineCard from "./ExpenseTimelineCard.tsx";

type PaginationLabels = {
  first: string;
  prev: string;
  next: string;
  last: string;
};

type ExpenseTicketLinesListProps = {
  visibleLines: ExpenseTicketDetailLine[];
  totalLinePages: number;
  linePage: number;
  currencyCode: string;
  paginationLabels: PaginationLabels;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onLinePageChange: (page: number) => void;
  onOpenLine: (lineRecId: string) => void;
};

const formatQtyValue = (value: number | null): string => {
  return formatExpenseNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-",
  });
};

const EMPTY_DATE_PARTS: ExpenseDateParts = {
  year: "--",
  month: "--",
  day: "--",
};

const TICKET_LINE_DATE_PANEL_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-10 text-[#00296be0]"
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
    <path d="M9 7l1 0" />
    <path d="M9 13l6 0" />
    <path d="M13 17l2 0" />
  </svg>
);

// Ticket lines section rendered with timeline cards and paging controls.
const ExpenseTicketLinesList = ({
  visibleLines,
  totalLinePages,
  linePage,
  currencyCode,
  paginationLabels,
  containerRef,
  onLinePageChange,
  onOpenLine,
}: ExpenseTicketLinesListProps) => {
  return (
    <section className="space-y-0">
      <ExpenseSectionDivider label={indT("Tickets_Detail_Lines", "Lines")} className="expense-section-divider--spaced" />

      {visibleLines.length === 0 ? (
        <div className="timeline-box timeline-empty" data-empty-text={indT("Tickets_Detail_NoLines", "No lines for this ticket.")} />
      ) : (
        <div ref={containerRef} className="timeline-box">
          {visibleLines.map((line) => {
            const amountText = formatAmountWithCurrency(line.totalAmount, currencyCode);
            const qtyText = formatQtyValue(line.qty);
            const priceText = formatAmountWithCurrency(line.price, currencyCode);
            const title = line.description || line.recId || "-";
            const primarySubtitleParts = [
              line.adjustmentAmount ? indT("Enum_GastoType_AdjustmentAmount", "Adjustment amount") : "",
              `${indT("ExpenseSheets_Field_Qty", "Quantity")}: ${qtyText}`,
              `${indT("ExpenseSheets_Field_Price", "Price")}: ${priceText}`,
            ].filter(Boolean);
            const primarySubtitle = primarySubtitleParts.join("   ");
            const subtitle = primarySubtitle;
            const lineKey =
              String(line.recId || "").trim() ||
              [line.description, line.totalAmount, line.price, line.qty]
                .map((value) => String(value || "").trim())
                .join("|");

            return (
              <div key={lineKey} className="timeline-item">
                <ExpenseTimelineCard
                  dateParts={EMPTY_DATE_PARTS}
                  datePanelContent={TICKET_LINE_DATE_PANEL_ICON}
                  title={title}
                  subtitle={subtitle}
                  subtitleClassName="expense-sheet-card__subtitle expense-line-card__meta text-left"
                  amountText={amountText}
                  onOpen={() => onOpenLine(line.recId)}
                  titleClassName="timeline-name expense-line-card__title text-left"
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

export default ExpenseTicketLinesList;
