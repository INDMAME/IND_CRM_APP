import React from "react";
import type { ExpenseDateParts } from "../utils/expenseUiUtils.ts";

type ExpenseCardMetadataProps = {
  dateParts?: ExpenseDateParts;
  subtitle: string;
  subtitleContent?: React.ReactNode;
  subtitleClassName: string;
};

type ExpenseCardIndicatorsProps = {
  statusClassName?: string;
  statusLabel?: string;
  statusIcon?: React.ReactNode;
  statusIconClassName: string;
};

// Keeps metadata outside title nodes managed by the shared text effects.
export const ExpenseCardMetadata = ({ dateParts, subtitle, subtitleContent, subtitleClassName }: ExpenseCardMetadataProps) => (
  <div className="expense-card__metadata">
    {dateParts ? (
      <span className="expense-card__date">{dateParts.day} {dateParts.month} {dateParts.year}</span>
    ) : null}
    {subtitleContent || subtitle ? (
      <p className={subtitleClassName} data-fulltext={subtitle}>{subtitleContent || subtitle}</p>
    ) : null}
  </div>
);

// Renders only indicators explicitly supplied by the owning list.
export const ExpenseCardIndicators = ({ statusClassName, statusLabel, statusIcon, statusIconClassName }: ExpenseCardIndicatorsProps) => {
  if (!statusClassName && !statusIcon) return null;

  return (
    <span className="expense-card__indicators">
      {statusClassName && statusLabel ? (
        <span className={statusClassName} title={statusLabel}>{statusLabel}</span>
      ) : null}
      {statusIcon ? (
        <span className={statusIconClassName} role="group" aria-label={statusLabel || undefined}>
          {statusIcon}
        </span>
      ) : null}
    </span>
  );
};

type ExpenseCardBodyProps = {
  title: React.ReactNode;
  metadata: React.ReactNode;
  amount: React.ReactNode;
  indicators: React.ReactNode;
  icon?: React.ReactNode;
};

// Arranges header content without interpreting business values or interactions.
export const ExpenseHeaderCardBody = ({ title, metadata, amount, indicators }: ExpenseCardBodyProps) => (
  <div className="timeline-card__content expense-timeline-card__content expense-card-header">
    {title}
    {metadata}
    <div className="expense-card-header__footer">
      {amount}
      {indicators}
    </div>
  </div>
);

// Keeps each compact line independently clickable inside its visual list panel.
export const ExpenseLineCardBody = ({ title, metadata, amount, indicators, icon }: ExpenseCardBodyProps) => (
  <div className="timeline-card__content expense-timeline-card__content expense-card-line">
    <span className="expense-card-line__icon" aria-hidden="true">{icon}</span>
    <div className="expense-card-line__details">
      {title}
      {metadata}
    </div>
    <div className="expense-card-line__trailing">
      {indicators}
      {amount}
    </div>
  </div>
);
