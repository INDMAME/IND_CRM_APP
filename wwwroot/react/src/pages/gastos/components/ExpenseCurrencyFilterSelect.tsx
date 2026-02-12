import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { expenseCurrencyOptions } from "../constants/currencyCodes.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseCurrencyFilterSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  idBase?: string;
};

// Shared fixed currency combobox with local instant search for expense filters.
const ExpenseCurrencyFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
  idBase = "expense-currency",
}: ExpenseCurrencyFilterSelectProps) => {
  const options = useMemo<ExpenseSelectOption[]>(() => expenseCurrencyOptions, []);

  return (
    <SelectCombobox
      label={label}
      placeholder={placeholder}
      options={options}
      value={String(value || "").trim().toUpperCase()}
      onChange={(nextValue) => onChange(String(nextValue || "").trim().toUpperCase())}
      readOnly={readOnly}
      disabled={disabled}
      allowTextInput
      showSearchButton={false}
      showLabel={showLabel}
      usePortal={false}
      idBase={idBase}
      portalClassName="visitas-typography"
      panelClassName="visitas-typography"
    />
  );
};

export default ExpenseCurrencyFilterSelect;

