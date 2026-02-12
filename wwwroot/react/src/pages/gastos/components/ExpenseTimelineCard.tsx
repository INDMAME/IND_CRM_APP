import React from "react";
import type { ExpenseDateParts } from "../utils/expenseUiUtils.ts";
import { normalizeCardTitleText } from "../utils/expenseUiUtils.ts";

type ExpenseTimelineCardProps = {
  dateParts: ExpenseDateParts;
  title: string;
  amountText: string;
  onOpen: () => void;
  titleClassName?: string;
  amountClassName?: string;
  statusClassName?: string;
  statusLabel?: string;
};

// Reusable clickable timeline card for expense sheets and expense lines.
const ExpenseTimelineCard = ({
  dateParts,
  title,
  amountText,
  onOpen,
  titleClassName = "timeline-name",
  amountClassName = "expense-sheet-card__amount",
  statusClassName,
  statusLabel,
}: ExpenseTimelineCardProps) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";

  return (
    <div
      className="timeline-card timeline-card--clickable"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600">
        <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">{dateParts.year}</div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{dateParts.month}</div>
        <div className="text-2xl font-semibold text-primary">{dateParts.day}</div>
      </div>
      <div className="timeline-card__content flex-1 py-3 px-4">
        {statusClassName ? <span className={statusClassName} title={statusLabel} aria-label={statusLabel} /> : null}
        <p className={titleClassName} data-fulltext={safeTitle}>
          {safeTitle}
        </p>
        <span className={amountClassName} data-fulltext={safeAmount}>
          {safeAmount}
        </span>
      </div>
    </div>
  );
};

export default ExpenseTimelineCard;
