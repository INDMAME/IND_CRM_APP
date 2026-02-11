import React from "react";

type ExpenseReadOnlyFieldProps = {
  label: string;
  value: string;
  fullWidth?: boolean;
};

// Reusable read-only field for expense detail pages.
const ExpenseReadOnlyField = ({ label, value, fullWidth = false }: ExpenseReadOnlyFieldProps) => {
  return (
    <div className={fullWidth ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
      <label className="form-label font-semibold">{label}</label>
      <input className="form-control ind-readonly-field" value={value || "-"} readOnly />
    </div>
  );
};

export default ExpenseReadOnlyField;
