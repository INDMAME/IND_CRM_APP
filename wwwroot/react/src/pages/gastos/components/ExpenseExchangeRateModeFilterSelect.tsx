import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import {
  getExpenseExchangeRateModeOptions,
  normalizeExpenseExchangeRateMode,
} from "../constants/exchangeRateEntryModeCatalog.ts";
import type { ExpenseExchangeRateModeCode } from "../expenseTypes.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseExchangeRateModeFilterSelectProps = {
  label: string;
  placeholder: string;
  value: ExpenseExchangeRateModeCode | null;
  onChange: (value: ExpenseExchangeRateModeCode | null) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
};

// Shared fixed exchange rate mode filter (0 official, 1 manual).
const ExpenseExchangeRateModeFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
}: ExpenseExchangeRateModeFilterSelectProps) => {
  const options = useMemo<ExpenseSelectOption[]>(() => getExpenseExchangeRateModeOptions(), []);
  const selectedValue = value === null ? "" : String(value);

  return (
    <SelectCombobox
      label={label}
      placeholder={placeholder}
      options={options}
      value={selectedValue}
      onChange={(nextValue) => onChange(normalizeExpenseExchangeRateMode(nextValue))}
      readOnly={readOnly}
      disabled={disabled}
      idBase="expense-exchange-rate-mode-filter"
      portalClassName="visitas-typography"
      panelClassName="visitas-typography"
      allowTextInput={false}
      showLabel={showLabel}
    />
  );
};

export default ExpenseExchangeRateModeFilterSelect;
