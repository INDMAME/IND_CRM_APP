import React from "react";
import ActionButton from "../../../components/commons/ActionButton.tsx";

type ExpenseFilterActionsProps = {
  clearLabel: string;
  applyLabel: string;
  onClear: () => void;
  onApply: () => void;
};

// Shared apply/clear action row for expense sheet filters.
const ExpenseFilterActions = ({
  clearLabel,
  applyLabel,
  onClear,
  onApply,
}: ExpenseFilterActionsProps) => {
  return (
    <div className="mt-1 grid grid-cols-2 gap-2 history-filter-actions lg:mx-auto lg:w-full lg:max-w-lg">
      <ActionButton label={clearLabel} className="w-full" onClick={onClear} />
      <ActionButton label={applyLabel} className="w-full" onClick={onApply} />
    </div>
  );
};

export default ExpenseFilterActions;
