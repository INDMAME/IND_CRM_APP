import React from "react";

type ExpenseReadOnlyFieldProps = {
  label: string;
  value: string;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  onClick?: () => void;
};

// Reusable read-only field for expense detail pages.
const ExpenseReadOnlyField = ({ label, value, fullWidth = false, leadingIcon, onClick }: ExpenseReadOnlyFieldProps) => {
  const displayValue = value || "-";
  const isClickable = typeof onClick === "function" && displayValue !== "-";

  return (
    <div className={fullWidth ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
      <label className="form-label font-semibold">{label}</label>
      <div className="relative">
        {leadingIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <span className="inline-flex h-4 w-4 items-center justify-center">{leadingIcon}</span>
          </span>
        ) : null}
        {isClickable ? (
          <button
            type="button"
            className={`form-control ind-readonly-field ${leadingIcon ? "pl-9" : ""} text-left underline decoration-slate-400 underline-offset-2`.trim()}
            onClick={onClick}
          >
            {displayValue}
          </button>
        ) : (
          <input className={`form-control ind-readonly-field ${leadingIcon ? "pl-9" : ""}`.trim()} value={displayValue} readOnly />
        )}
      </div>
    </div>
  );
};

export default ExpenseReadOnlyField;
