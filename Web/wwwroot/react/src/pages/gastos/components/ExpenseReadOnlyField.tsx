import React from "react";

type ExpenseReadOnlyFieldProps = {
  label: string;
  value: string;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
};

// Reusable read-only field for expense detail pages.
const ExpenseReadOnlyField = ({ label, value, fullWidth = false, leadingIcon }: ExpenseReadOnlyFieldProps) => {
  return (
    <div className={fullWidth ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
      <label className="form-label font-semibold">{label}</label>
      <div className="relative">
        {leadingIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            <span className="inline-flex h-4 w-4 items-center justify-center">{leadingIcon}</span>
          </span>
        ) : null}
        <input className={`form-control ind-readonly-field ${leadingIcon ? "pl-9" : ""}`.trim()} value={value || "-"} readOnly />
      </div>
    </div>
  );
};

export default ExpenseReadOnlyField;
