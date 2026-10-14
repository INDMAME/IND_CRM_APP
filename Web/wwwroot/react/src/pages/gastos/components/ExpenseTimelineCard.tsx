import React from "react";
import type { ExpenseDateParts } from "../utils/expenseUiUtils.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { ExpenseCardIndicators, ExpenseCardMetadata, ExpenseHeaderCardBody, ExpenseLineCardBody } from "./ExpenseCardBodies.tsx";

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
  layout?: "header" | "line";
  dateParts?: ExpenseDateParts;
  title: string;
  amountText: string;
  amountContent?: React.ReactNode;
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
  leadingIcon?: React.ReactNode;
  interactionProps?: ExpenseTimelineCardInteractionProps;
};

// Reusable clickable timeline card for expense sheets and expense lines.
const ExpenseTimelineCard = ({
  layout = "header",
  dateParts,
  title,
  amountText,
  amountContent,
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
  leadingIcon,
  interactionProps,
}: ExpenseTimelineCardProps) => {
  const safeTitle = safeText(title) || "-";
  const safeAmount = amountText || "-";
  const safeSubtitle = safeText(subtitle);
  const {
    onClick: customOnClick,
    onKeyDown: customOnKeyDown,
    role: customRole,
    tabIndex: customTabIndex,
    ...restInteractionProps
  } = interactionProps || {};

  const bodyProps = {
    title: <p className={titleClassName} data-fulltext={safeTitle}>{safeTitle}</p>,
    metadata: (
      <ExpenseCardMetadata
        dateParts={dateParts}
        subtitle={safeSubtitle}
        subtitleContent={subtitleContent}
        subtitleClassName={subtitleClassName}
      />
    ),
    amount: (
      <span className={amountClassName} data-fulltext={safeAmount}>{amountContent ?? safeAmount}</span>
    ),
    indicators: (
      <ExpenseCardIndicators
        statusClassName={statusClassName}
        statusLabel={statusLabel}
        statusIcon={statusIcon}
        statusIconClassName={statusIconClassName}
      />
    ),
  };

  return (
    <button
      type="button"
      className={`timeline-card timeline-card--clickable expense-timeline-card expense-timeline-card--${layout} text-left`}
      role={customRole}
      tabIndex={typeof customTabIndex === "number" ? customTabIndex : 0}
      onClick={customOnClick ?? onOpen}
      onKeyDown={customOnKeyDown}
      {...restInteractionProps}
    >
      {layout === "line" ? (
        <ExpenseLineCardBody {...bodyProps} icon={leadingIcon} />
      ) : (
        <ExpenseHeaderCardBody {...bodyProps} />
      )}
    </button>
  );
};

export default ExpenseTimelineCard;
