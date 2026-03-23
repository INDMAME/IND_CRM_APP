import React from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseTicketDetailHeader } from "../tickets/detail/expenseTicketDetailTypes.ts";
import { hasExpenseTicketImagePreviewSource } from "../tickets/detail/expenseTicketPreviewUtils.ts";
import { formatExpenseDisplayDate, safeText } from "../utils/expenseUiUtils.ts";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseCurrencyFilterSelect from "./ExpenseCurrencyFilterSelect.tsx";

const hasRealExpenseSheetValue = (value: string): boolean => {
  const normalized = safeText(value).toLowerCase();
  if (!normalized) return false;
  if (normalized === "-" || normalized === "0") return false;
  if (normalized === "n/a" || normalized === "na") return false;
  return true;
};

type ExpenseTicketDetailHeaderFormProps = {
  header: ExpenseTicketDetailHeader;
  statusLabel: string;
  gastoTypeLabel: string;
  totalAmountText: string;
  transDateText: string;
  isEditing: boolean;
  gastoTypeOptions: Array<{ value: string; text: string }>;
  draftDescription: string;
  draftGastoType: string;
  draftCurrencyCode: string;
  draftTransDate: string;
  draftUrlFile: string;
  draftFileName: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftGastoTypeChange: (value: string) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftTransDateChange: (value: string) => void;
  onOpenFile: () => void;
  onOpenExpenseSheet?: () => void;
  hideOpenFileAction?: boolean;
};

// Read-only and editable header form for ticket detail.
const ExpenseTicketDetailHeaderForm = ({
  header,
  statusLabel,
  gastoTypeLabel,
  totalAmountText,
  transDateText,
  isEditing,
  gastoTypeOptions,
  draftDescription,
  draftGastoType,
  draftCurrencyCode,
  draftTransDate,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftGastoTypeChange,
  onDraftCurrencyCodeChange,
  onDraftTransDateChange,
  onOpenFile,
  onOpenExpenseSheet,
  hideOpenFileAction = false,
}: ExpenseTicketDetailHeaderFormProps) => {
  const previewUrl = safeText(isEditing ? draftUrlFile : header.urlFile);
  const canOpenFile = hasExpenseTicketImagePreviewSource(previewUrl);
  const showExpenseSheetField = hasRealExpenseSheetValue(header.hojaGastosIdDisplay);

  return (
    <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpenseReadOnlyField
          label={indT("Tickets_Field_FileId", "Ticket")}
          value={header.fileId || "-"}
        />

        <ExpenseReadOnlyField
          label={indT("Tickets_Field_Status", "Status")}
          value={statusLabel || "-"}
        />

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
            value={header.description || "-"}
            fullWidth
          />
        )}

        {isEditing ? (
          <SelectCombobox
            label={indT("Tickets_Filter_Category", "Category")}
            options={gastoTypeOptions}
            value={draftGastoType}
            onChange={onDraftGastoTypeChange}
            placeholder={indT("Tickets_Filter_Category", "Category")}
            usePortal={false}
            allowTextInput={false}
            showSearchButton={false}
          />
        ) : (
          <ExpenseReadOnlyField
            label={indT("Tickets_Filter_Category", "Category")}
            value={gastoTypeLabel || "-"}
          />
        )}

        {showExpenseSheetField ? (
          <ExpenseReadOnlyField
            label={indT("Tickets_Field_ExpenseSheetDisplay", "Expense sheet")}
            value={header.hojaGastosIdDisplay || "-"}
            onClick={onOpenExpenseSheet}
          />
        ) : null}

        {isEditing ? (
          <ExpenseCurrencyFilterSelect
            label={indT("ExpenseSheets_Field_Currency", "Currency")}
            placeholder={indT("ExpenseSheets_Field_Currency", "Currency")}
            value={draftCurrencyCode}
            onChange={onDraftCurrencyCodeChange}
            idBase="expense-ticket-detail-currency"
          />
        ) : (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_Currency", "Currency")}
            value={header.currencyCode || "-"}
          />
        )}

        <ExpenseReadOnlyField
          label={indT("ExpenseSheets_Field_TotalAmount", "Total amount")}
          value={totalAmountText || "-"}
        />

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
              value={transDateText || formatExpenseDisplayDate(header.transDate, document?.documentElement?.lang || "es-ES") || "-"}
            />
          )}
      </div>

      {canOpenFile && !hideOpenFileAction ? (
        <div className="flex justify-end">
          <button
            type="button"
            className="ind-action-btn px-3 py-1.5 text-xs"
            onClick={onOpenFile}
          >
            {indT("Tickets_Detail_ViewAttachment", "Ver adjunto")}
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default ExpenseTicketDetailHeaderForm;
