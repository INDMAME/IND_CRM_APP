import React from "react";
import { indT } from "../../../utils/indI18n.ts";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseSectionDivider from "./ExpenseSectionDivider.tsx";

type ExpenseTicketLinkedSheetLineSectionProps = {
  projectId: string;
  isEditing: boolean;
  isLoading: boolean;
  disabled?: boolean;
  errorMessage?: string;
  onProjectIdChange: (value: string) => void;
};

// Renders expense-sheet line fields that are edited from the linked ticket detail flow.
const ExpenseTicketLinkedSheetLineSection = ({
  projectId,
  isEditing,
  isLoading,
  disabled = false,
  errorMessage = "",
  onProjectIdChange,
}: ExpenseTicketLinkedSheetLineSectionProps) => {
  return (
    <section className="space-y-0">
      <ExpenseSectionDivider label={indT("ExpenseSheets_Line_Expense", "Expense line")} className="expense-section-divider--spaced" />

      <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-zinc-200 rounded-[var(--radius-xl)]">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <svg className="ind-spinner size-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
              <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
            </svg>
            {indT("Common_Loading", "Loading")}
          </div>
        ) : errorMessage ? (
          <div className="text-danger text-sm">{errorMessage}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
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
            )}
          </div>
        )}
      </section>
    </section>
  );
};

export default ExpenseTicketLinkedSheetLineSection;
