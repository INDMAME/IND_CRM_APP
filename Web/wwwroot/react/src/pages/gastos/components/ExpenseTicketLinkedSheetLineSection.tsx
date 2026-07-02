import React from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { indT } from "../../../utils/indI18n.ts";
import {
  getExpenseLineReimbursableExpenseLabel,
  getExpenseLineReimbursableExpenseOptions,
  normalizeExpenseLineReimbursableExpense,
} from "../constants/expenseReimbursableExpenseCatalog.ts";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";

type ExpenseTicketLinkedSheetLineSectionProps = {
  projectId: string;
  reimbursableExpense: number;
  isEditing: boolean;
  isLoading: boolean;
  disabled?: boolean;
  errorMessage?: string;
  onProjectIdChange: (value: string) => void;
  onReimbursableExpenseChange: (value: number) => void;
};

// Renders linked expense-sheet line fields inline inside the ticket detail form.
const ExpenseTicketLinkedSheetLineSection = ({
  projectId,
  reimbursableExpense,
  isEditing,
  isLoading,
  disabled = false,
  errorMessage = "",
  onProjectIdChange,
  onReimbursableExpenseChange,
}: ExpenseTicketLinkedSheetLineSectionProps) => {
  const reimbursableExpenseOptions = React.useMemo(() => getExpenseLineReimbursableExpenseOptions(), []);
  const normalizedReimbursableExpense = normalizeExpenseLineReimbursableExpense(reimbursableExpense);
  const reimbursableExpenseLabel = getExpenseLineReimbursableExpenseLabel(normalizedReimbursableExpense);
  const projectField = isEditing ? (
    <ExpenseProjectFilterInput
      label={indT("ExpenseSheets_Field_Project", "Project")}
      placeholder={indT("ExpenseSheets_Filter_Project_Placeholder", "Project id")}
      value={projectId}
      onChange={onProjectIdChange}
      disabled={disabled}
      readOnly={disabled}
    />
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_Project", "Project")}
      value={projectId || "-"}
    />
  );
  const reimbursableExpenseField = isEditing ? (
    <SelectCombobox
      label={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
      options={reimbursableExpenseOptions}
      value={String(normalizedReimbursableExpense)}
      onChange={(value) => onReimbursableExpenseChange(normalizeExpenseLineReimbursableExpense(value))}
      placeholder={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
      disabled={disabled}
      readOnly={disabled}
      usePortal={false}
      dropdownPlacement="top"
      allowTextInput={false}
      showSearchButton={false}
    />
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
      value={reimbursableExpenseLabel}
    />
  );

  if (isLoading) {
    return (
      <div className="md:col-span-2 flex items-center gap-2 text-sm text-zinc-700">
        <svg className="ind-spinner size-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>
    );
  }

  if (errorMessage) {
    return <div className="md:col-span-2 text-danger text-sm">{errorMessage}</div>;
  }

  return (
    <div className="md:col-span-2 grid grid-cols-2 gap-3 md:gap-4">
      {projectField}
      {reimbursableExpenseField}
    </div>
  );
};

export default ExpenseTicketLinkedSheetLineSection;
