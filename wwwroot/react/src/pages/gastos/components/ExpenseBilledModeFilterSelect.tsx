import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseBilledModeFilterSelectProps = {
  label: string;
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
};

// Shared billed mode filter for expense sheet list requests.
const ExpenseBilledModeFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
}: ExpenseBilledModeFilterSelectProps) => {
  const options = useMemo<ExpenseSelectOption[]>(
    () => [
      { value: "0", text: indT("ExpenseSheets_Filter_Status_Unbilled", "No Pagado") },
      { value: "1", text: indT("ExpenseSheets_Filter_Status_Billed", "Pagado") },
      { value: "2", text: indT("ExpenseSheets_Filter_Status_Both", "Ambos") },
    ],
    []
  );

  return (
    <SelectCombobox
      label={label}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={(nextValue) => {
        const parsed = Number(nextValue);
        if (parsed === 0 || parsed === 1 || parsed === 2) {
          onChange(parsed);
          return;
        }
        onChange(2);
      }}
      readOnly={readOnly}
      disabled={disabled}
      idBase="expense-billed-mode"
      portalClassName="visitas-typography"
      panelClassName="visitas-typography"
      allowTextInput={false}
      showLabel={showLabel}
    />
  );
};

export default ExpenseBilledModeFilterSelect;
