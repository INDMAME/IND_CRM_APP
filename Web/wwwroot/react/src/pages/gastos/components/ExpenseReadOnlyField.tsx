import React from "react";
import { classNames } from "../../../utils/classNames.ts";

type ExpenseReadOnlyFieldProps = {
  label: string;
  value: string;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  valueAlign?: "left" | "right";
  leadingIcon?: React.ReactNode;
  // Reserved for future field-to-page navigation. Kept disabled intentionally for now.
  onClick?: () => void;
};

const ENABLE_READ_ONLY_FIELD_NAVIGATION = false;

// Reusable read-only field for expense detail pages.
const ExpenseReadOnlyField = ({
  label,
  value,
  fullWidth = false,
  containerClassName = "space-y-1.5",
  labelClassName = "form-label font-semibold",
  valueAlign = "left",
  leadingIcon,
  onClick: _onClick,
}: ExpenseReadOnlyFieldProps) => {
  const displayValue = value || "-";
  const isClickable = ENABLE_READ_ONLY_FIELD_NAVIGATION && typeof _onClick === "function" && displayValue !== "-";
  const valueAlignClassName = valueAlign === "right" ? "text-right tabular-nums" : "text-left";
  const valueClassName = classNames("form-control ind-readonly-field", leadingIcon ? "pl-9" : "", valueAlignClassName);

  return (
    <div className={classNames(fullWidth ? "sm:col-span-2" : "", containerClassName)}>
      <label className={labelClassName}>{label}</label>
      <div className="relative">
        {leadingIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <span className="inline-flex h-4 w-4 items-center justify-center">{leadingIcon}</span>
          </span>
        ) : null}
        {isClickable ? (
          <button
            type="button"
            className={classNames(valueClassName, "underline decoration-slate-400 underline-offset-2")}
            onClick={_onClick}
            aria-label={label}
          >
            {displayValue}
          </button>
        ) : (
          <input className={valueClassName} value={displayValue} readOnly aria-label={label} />
        )}
      </div>
    </div>
  );
};

export default ExpenseReadOnlyField;
