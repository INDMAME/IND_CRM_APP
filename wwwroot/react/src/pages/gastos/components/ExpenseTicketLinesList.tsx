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
          {visibleLines.map((line, index) => {
            const amountText = formatAmountWithCurrency(line.totalAmount, currencyCode);
            const qtyText = formatQtyValue(line.qty);
            const priceText = formatAmountWithCurrency(line.price, currencyCode);
            const title = line.description || line.recId || "-";
            const subtitle = [
              `${indT("ExpenseSheets_Field_LineId", "Line")}: ${line.recId || "-"}`,
              `${indT("ExpenseSheets_Field_Qty", "Quantity")}: ${qtyText}`,
              `${indT("ExpenseSheets_Field_Price", "Price")}: ${priceText}`,
              `${indT("ExpenseSheets_Field_SheetId", "Sheet")}: ${line.refRecIdTable || "-"}`,
              `${indT("ExpenseSheets_Field_UserId", "User")}: ${line.createdByUserId || "-"}`,
            ].join("   ");

            return (
              <div key={`${line.recId}-${index}`} className="timeline-item">
                <ExpenseTimelineCard
                  dateParts={EMPTY_DATE_PARTS}
                  title={title}
                  subtitle={subtitle}
                  amountText={amountText}
                  onOpen={() => onOpenLine(line.recId)}
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

export default ExpenseTicketLinesList;
