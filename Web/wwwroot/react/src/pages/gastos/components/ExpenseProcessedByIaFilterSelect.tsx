import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import type { ExpenseTicketProcessedByIaFilter } from "../tickets/expenseTicketListTypes.ts";

type ExpenseProcessedByIaFilterSelectProps = {
  label: string;
  placeholder: string;
  value: ExpenseTicketProcessedByIaFilter;
  onChange: (value: ExpenseTicketProcessedByIaFilter) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
};

// Fixed enum select for IA processing filter with All/Yes/No options.
const ExpenseProcessedByIaFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
}: ExpenseProcessedByIaFilterSelectProps) => {
  const uiValue = value === "all" ? "" : value;
  const options = useMemo<ExpenseSelectOption[]>(
    () => [
      { value: "all", text: indT("ExpenseSheets_Filter_Status_Both", "All") },
      { value: "yes", text: indT("Tickets_Filter_ProcessedByIA_Yes", "Yes") },
      { value: "no", text: indT("Tickets_Filter_ProcessedByIA_No", "No") },
    ],
    []
  );

  return (
    <SelectCombobox
      label={label}
      placeholder={placeholder}
      options={options}
      value={uiValue}
      onChange={(nextValue) => {
        if (nextValue === "yes" || nextValue === "no" || nextValue === "all") {
          onChange(nextValue);
          return;
        }
        onChange("all");
      }}
      readOnly={readOnly}
      disabled={disabled}
      idBase="expense-processed-by-ia-filter"
      portalClassName="visitas-typography"
      panelClassName="visitas-typography"
      allowTextInput={false}
      showLabel={showLabel}
    />
  );
};

export default ExpenseProcessedByIaFilterSelect;
