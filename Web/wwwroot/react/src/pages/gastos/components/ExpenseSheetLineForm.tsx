import React from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetLine } from "../expenseTypes.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import { formatExpenseDisplayDate, safeText } from "../utils/expenseUiUtils.ts";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseSectionDivider from "./ExpenseSectionDivider.tsx";

type ExpenseSheetLineFormProps = {
  line: ExpenseSheetLine;
  fallbackDate: string;
  sheetDescription: string;
  projectValue: string;
  amountText: string;
  internacionalLabel: string;
  status: string;
  isEditing: boolean;
  gastoTypeOptions: ExpenseSelectOption[];
  internationalOptions: ExpenseSelectOption[];
  draftDescription: string;
  draftTransDate: string;
  draftTypeValueCode: string;
  draftAmount: string;
  draftQty: string;
  draftProjectId: string;
  draftInternational: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftTransDateChange: (value: string) => void;
  onDraftTypeValueCodeChange: (value: string) => void;
  onDraftAmountChange: (value: string) => void;
  onDraftQtyChange: (value: string) => void;
  onDraftProjectIdChange: (value: string) => void;
  onDraftInternationalChange: (value: string) => void;
};

// Pure form renderer for expense line detail in read and edit modes.
const ExpenseSheetLineForm = ({
  line,
  fallbackDate,
  sheetDescription,
  projectValue,
  amountText,
  internacionalLabel,
  status,
  isEditing,
  gastoTypeOptions,
  internationalOptions,
  draftDescription,
  draftTransDate,
  draftTypeValueCode,
  draftAmount,
  draftQty,
  draftProjectId,
  draftInternational,
  onDraftDescriptionChange,
  onDraftTransDateChange,
  onDraftTypeValueCodeChange,
  onDraftAmountChange,
  onDraftQtyChange,
  onDraftProjectIdChange,
  onDraftInternationalChange,
}: ExpenseSheetLineFormProps) => {
  return (
    <section className="space-y-0">
      <ExpenseSectionDivider
        label={sheetDescription}
        className="expense-section-divider--spaced"
        labelClassName="expense-section-divider__label--title"
      />

      <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isEditing ? (
            <div className="sm:col-span-2 space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Description", "Description")}</label>
              <input
                className="form-control"
                value={draftDescription}
                onChange={(event) => onDraftDescriptionChange(event.target.value || "")}
                aria-label={indT("ExpenseSheets_Field_Description", "Description")}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_Description", "Description")}
              value={safeText(line.description) || "-"}
              fullWidth
            />
          )}

          {isEditing ? (
            <div className="visita-field-text">
              <SingleDatePicker
                label={indT("ExpenseSheets_Field_CreatedDate", "Date")}
                value={draftTransDate}
                onChange={onDraftTransDateChange}
                readOnly={!isEditing}
                disabled={!isEditing}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_CreatedDate", "Date")}
              value={formatExpenseDisplayDate(
                safeText(line.transDate || fallbackDate),
                document?.documentElement?.lang || "es-ES"
              )}
            />
          )}

          {isEditing ? (
            <SelectCombobox
              label={indT("ExpenseSheets_Field_Type", "Type")}
              options={gastoTypeOptions}
              value={draftTypeValueCode || ""}
              onChange={onDraftTypeValueCodeChange}
              placeholder={indT("ExpenseSheets_Field_Type", "Type")}
              usePortal={false}
              allowTextInput={false}
              showSearchButton={false}
            />
          ) : (
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Type", "Type")} value={safeText(line.typeValue) || "-"} />
          )}

          {isEditing ? (
            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Amount", "Amount")}</label>
              <input
                className="form-control"
                type="number"
                step="any"
                inputMode="decimal"
                value={draftAmount}
                onChange={(event) => onDraftAmountChange(event.target.value || "")}
                aria-label={indT("ExpenseSheets_Field_Amount", "Amount")}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Amount", "Amount")} value={amountText || "-"} />
          )}

          {isEditing ? (
            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Qty", "Quantity")}</label>
              <input
                className="form-control"
                type="number"
                step="any"
                inputMode="decimal"
                value={draftQty}
                onChange={(event) => onDraftQtyChange(event.target.value || "")}
                aria-label={indT("ExpenseSheets_Field_Qty", "Quantity")}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_Qty", "Quantity")}
              value={line.qty != null ? String(line.qty) : "-"}
            />
          )}

          {isEditing ? (
            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Project", "Project")}</label>
              <input
                className="form-control"
                value={draftProjectId}
                onChange={(event) => onDraftProjectIdChange(event.target.value || "")}
                aria-label={indT("ExpenseSheets_Field_Project", "Project")}
              />
            </div>
          ) : projectValue ? (
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Project", "Project")} value={projectValue} />
          ) : null}

          {isEditing ? (
            <SelectCombobox
              label={indT("ExpenseSheets_Field_International", "International")}
              options={internationalOptions}
              value={draftInternational || ""}
              onChange={onDraftInternationalChange}
              placeholder={indT("ExpenseSheets_Field_International", "International")}
              usePortal={false}
              allowTextInput={false}
              showSearchButton={false}
            />
          ) : (
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_International", "International")}
              value={internacionalLabel}
            />
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span>{status}</span>
        </div>
      </section>
    </section>
  );
};

export default ExpenseSheetLineForm;
