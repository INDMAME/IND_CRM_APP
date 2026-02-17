import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { DEFAULT_EXPENSE_STATUS_FILTER, getExpenseStatusFilterOptions, normalizeExpenseStatusFilterCode } from "../constants/expenseStatusCatalog.ts";
import type { ExpenseStatusFilterCode } from "../expenseTypes.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseStatusFilterSelectProps = {
  label: string;
  placeholder: string;
  value: ExpenseStatusFilterCode;
  onChange: (value: ExpenseStatusFilterCode) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
};

// Shared fixed status filter select using the canonical status catalog.
const ExpenseStatusFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
}: ExpenseStatusFilterSelectProps) => {
  const options = useMemo<ExpenseSelectOption[]>(() => getExpenseStatusFilterOptions(), []);

  return (
    <SelectCombobox
      label={label}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={(nextValue) => onChange(normalizeExpenseStatusFilterCode(nextValue, DEFAULT_EXPENSE_STATUS_FILTER))}
      readOnly={readOnly}
      disabled={disabled}
      idBase="expense-status-filter"
      portalClassName="visitas-typography"
      panelClassName="visitas-typography"
      allowTextInput={false}
      showLabel={showLabel}
    />
  );
};

export default ExpenseStatusFilterSelect;
