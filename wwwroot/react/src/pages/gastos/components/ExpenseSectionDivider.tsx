import React from "react";
import { classNames } from "../../../utils/classNames.ts";

type ExpenseSectionDividerProps = {
  label: string;
  className?: string;
  labelClassName?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

// Shared centered section divider used across expense detail pages.
const ExpenseSectionDivider = ({
  label,
  className,
  labelClassName,
  headingLevel = 2,
}: ExpenseSectionDividerProps) => {
  return (
    <div className={classNames("expense-section-divider expense-section-divider--standard", className)} role="heading" aria-level={headingLevel}>
      <span className={classNames("expense-section-divider__label", labelClassName)}>{label}</span>
    </div>
  );
};

export default ExpenseSectionDivider;
