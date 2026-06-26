import React from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseTicketDetailHeader } from "../tickets/detail/expenseTicketDetailTypes.ts";
import { hasExpenseTicketImagePreviewSource } from "../tickets/detail/expenseTicketPreviewUtils.ts";
import { formatExpenseInputNumber } from "../utils/expenseNumberFormat.ts";
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
  ticketTimeText: string;
  isEditing: boolean;
  gastoTypeOptions: Array<{ value: string; text: string }>;
  draftDescription: string;
  descriptionInvalid: boolean;
  descriptionInputRef: React.Ref<HTMLInputElement>;
  draftGastoType: string;
  gastoTypeInvalid: boolean;
  gastoTypeInputRef: React.Ref<HTMLInputElement>;
  draftCurrencyCode: string;
  currencyCodeInvalid: boolean;
  currencyInputRef: React.Ref<HTMLInputElement>;
  draftTotalAmount: string;
  totalAmountInvalid: boolean;
  totalAmountInputRef: React.Ref<HTMLInputElement>;
  draftTransDate: string;
  draftTicketTime: string;
  draftUrlFile: string;
  draftFileName: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftGastoTypeChange: (value: string) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftTotalAmountChange: (value: string) => void;
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
  ticketTimeText,
  isEditing,
  gastoTypeOptions,
  draftDescription,
  descriptionInvalid,
  descriptionInputRef,
  draftGastoType,
  gastoTypeInvalid,
  gastoTypeInputRef,
  draftCurrencyCode,
  currencyCodeInvalid,
  currencyInputRef,
  draftTotalAmount,
  totalAmountInvalid,
  totalAmountInputRef,
  draftTransDate,
  draftTicketTime,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftGastoTypeChange,
  onDraftCurrencyCodeChange,
  onDraftTotalAmountChange,
  onOpenFile,
  onOpenExpenseSheet,
  hideOpenFileAction = false,
}: ExpenseTicketDetailHeaderFormProps) => {
  const previewUrl = safeText(isEditing ? draftUrlFile : header.urlFile);
  const canOpenFile = hasExpenseTicketImagePreviewSource(previewUrl);
  const showExpenseSheetField = hasRealExpenseSheetValue(header.hojaGastosIdDisplay);
  const locale = document?.documentElement?.lang || "es-ES";
  const displayDateText =
    transDateText ||
    formatExpenseDisplayDate(header.ticketDate || header.transDate, locale) ||
    "-";
  const lockedDraftDateText = formatExpenseDisplayDate(draftTransDate, locale) || displayDateText;
  const handleTotalAmountBlur = () => {
    onDraftTotalAmountChange(
      formatExpenseInputNumber(draftTotalAmount, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: "",
      })
    );
  };

  return (
    <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-zinc-200 rounded-[var(--radius-xl)]">
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
              ref={descriptionInputRef}
              className={`form-control${descriptionInvalid ? " border-rose-400 bg-rose-50 focus:border-rose-400 focus:ring-rose-200" : ""}`}
              value={draftDescription}
              onChange={(event) => onDraftDescriptionChange(event.target.value || "")}
              aria-invalid={descriptionInvalid ? "true" : "false"}
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
            inputRef={gastoTypeInputRef}
            invalid={gastoTypeInvalid}
            usePortal
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
            invalid={currencyCodeInvalid}
            inputRef={currencyInputRef}
            idBase="expense-ticket-detail-currency"
          />
        ) : (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_Currency", "Currency")}
            value={header.currencyCode || "-"}
          />
        )}

        {isEditing ? (
          <div className="space-y-1.5">
            <label className="form-label font-semibold">{indT("ExpenseSheets_Field_TotalAmount", "Total amount")}</label>
            <input
              ref={totalAmountInputRef}
              className={`form-control${totalAmountInvalid ? " border-rose-400 bg-rose-50 focus:border-rose-400 focus:ring-rose-200" : ""}`}
              value={draftTotalAmount}
              onChange={(event) => onDraftTotalAmountChange(event.target.value || "")}
              onBlur={handleTotalAmountBlur}
              inputMode="decimal"
              aria-invalid={totalAmountInvalid ? "true" : "false"}
              aria-label={indT("ExpenseSheets_Field_TotalAmount", "Total amount")}
            />
          </div>
        ) : (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_TotalAmount", "Total amount")}
            value={totalAmountText || "-"}
          />
        )}

        <ExpenseReadOnlyField
          label={indT("Tickets_Field_TicketDate", "Ticket date")}
          value={isEditing ? lockedDraftDateText : displayDateText}
        />

        <ExpenseReadOnlyField
          label={indT("Tickets_Field_TicketTime", "Ticket time")}
          value={isEditing ? draftTicketTime || ticketTimeText || "-" : ticketTimeText || "-"}
        />
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
