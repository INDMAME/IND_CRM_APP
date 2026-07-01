import React from "react";
import type { ExpenseDateParts } from "../utils/expenseUiUtils.ts";
import { normalizeCardTitleText, safeText } from "../utils/expenseUiUtils.ts";

type ExpenseTimelineCardInteractionProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "aria-label"
  | "aria-pressed"
  | "onClick"
  | "onContextMenu"
  | "onKeyDown"
  | "onPointerCancel"
  | "onPointerDown"
  | "onPointerMove"
  | "onPointerUp"
  | "role"
  | "tabIndex"
>;

type ExpenseTimelineCardProps = {
  dateParts: ExpenseDateParts;
  title: string;
  amountText: string;
  onOpen: () => void;
  titleClassName?: string;
  amountClassName?: string;
  statusClassName?: string;
  statusLabel?: string;
  subtitle?: string;
  subtitleContent?: React.ReactNode;
  subtitleClassName?: string;
  statusIcon?: React.ReactNode;
  statusIconClassName?: string;
  datePanelContent?: React.ReactNode;
  interactionProps?: ExpenseTimelineCardInteractionProps;
};

// Reusable clickable timeline card for expense sheets and expense lines.
const ExpenseTimelineCard = ({
  dateParts,
  title,
  amountText,
  onOpen,
  titleClassName = "timeline-name",
  amountClassName = "expense-sheet-card__amount text-right tabular-nums",
  statusClassName,
  statusLabel,
  subtitle = "",
  subtitleContent,
  subtitleClassName = "expense-sheet-card__subtitle",
  statusIcon,
  statusIconClassName = "expense-sheet-card__status-icon",
  datePanelContent,
  interactionProps,
}: ExpenseTimelineCardProps) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";
  const safeSubtitle = safeText(subtitle);
  const {
    onClick: customOnClick,
    onKeyDown: customOnKeyDown,
    role: customRole,
    tabIndex: customTabIndex,
    ...restInteractionProps
  } = interactionProps || {};

  return (
    <button
      type="button"
      className="timeline-card timeline-card--clickable expense-timeline-card text-left"
      role={customRole}
      tabIndex={typeof customTabIndex === "number" ? customTabIndex : 0}
      onClick={customOnClick ?? onOpen}
      onKeyDown={customOnKeyDown}
      {...restInteractionProps}
    >
      <div className="timeline-date-panel expense-timeline-card__date-panel flex flex-col items-center justify-center gap-1 border-r border-[#e2e8f0] bg-[#f8fafc] text-[#00296be0]">
        {datePanelContent ? (
          datePanelContent
        ) : (
          <>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#00296bb8]">{dateParts.year}</div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00296bb8]">{dateParts.month}</div>
            <div className="text-2xl font-semibold text-primary">{dateParts.day}</div>
          </>
        )}
      </div>
      <div className="timeline-card__content expense-timeline-card__content flex-1">
        {statusClassName ? <span className={statusClassName} title={statusLabel} aria-label={statusLabel} /> : null}
        {statusIcon ? (
          <span className={statusIconClassName} role="group" aria-label={statusLabel || undefined}>
            {statusIcon}
          </span>
        ) : null}
        <p className={titleClassName} data-fulltext={safeTitle}>
          {safeTitle}
        </p>
        {subtitleContent || safeSubtitle ? (
          <p className={subtitleClassName} data-fulltext={safeSubtitle}>
            {subtitleContent || safeSubtitle}
          </p>
        ) : null}
        <span className={amountClassName} data-fulltext={safeAmount}>
          {safeAmount}
        </span>
      </div>
    </button>
  );
};

export default ExpenseTimelineCard;
