import React from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import type { ExpenseTicketDetailHeader } from "../tickets/detail/expenseTicketDetailTypes.ts";
import { formatExpenseDisplayDate, safeText } from "../utils/expenseUiUtils.ts";
import { formatExpenseInputNumber } from "../utils/expenseNumberFormat.ts";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseSectionDivider from "./ExpenseSectionDivider.tsx";

type ExpenseTicketDetailHeaderFormProps = {
  header: ExpenseTicketDetailHeader;
  statusLabel: string;
  gastoTypeLabel: string;
  processedByAiLabel: string;
  totalAmountText: string;
  transDateText: string;
  isEditing: boolean;
  statusOptions: ExpenseSelectOption[];
  gastoTypeOptions: ExpenseSelectOption[];
  processedByAiOptions: ExpenseSelectOption[];
  draftDescription: string;
  draftStatus: string;
  draftGastoType: string;
  draftProcessedByAI: string;
  draftCurrencyCode: string;
  draftTotalAmount: string;
  draftTransDate: string;
  draftComentario: string;
  draftUrlFile: string;
  draftFileName: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftStatusChange: (value: string) => void;
  onDraftGastoTypeChange: (value: string) => void;
  onDraftProcessedByAIChange: (value: string) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftTotalAmountChange: (value: string) => void;
  onDraftTransDateChange: (value: string) => void;
  onDraftComentarioChange: (value: string) => void;
  onDraftUrlFileChange: (value: string) => void;
  onDraftFileNameChange: (value: string) => void;
  onOpenFile: () => void;
};

// Read-only and editable header form for ticket detail.
const ExpenseTicketDetailHeaderForm = ({
  header,
  statusLabel,
  gastoTypeLabel,
  processedByAiLabel,
  totalAmountText,
  transDateText,
  isEditing,
  statusOptions,
  gastoTypeOptions,
  processedByAiOptions,
  draftDescription,
  draftStatus,
  draftGastoType,
  draftProcessedByAI,
  draftCurrencyCode,
  draftTotalAmount,
  draftTransDate,
  draftComentario,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftStatusChange,
  onDraftGastoTypeChange,
  onDraftProcessedByAIChange,
  onDraftCurrencyCodeChange,
  onDraftTotalAmountChange,
  onDraftTransDateChange,
  onDraftComentarioChange,
  onDraftUrlFileChange,
  onDraftFileNameChange,
  onOpenFile,
}: ExpenseTicketDetailHeaderFormProps) => {
  const canOpenFile = !!safeText(isEditing ? draftUrlFile : header.urlFile);

  return (
    <section className="space-y-0">
      <ExpenseSectionDivider label={indT("Tickets_Detail_Header", "Header")} className="expense-section-divider--spaced" />

      <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpenseReadOnlyField
            label={indT("Tickets_Field_FileId", "Ticket")}
            value={header.fileId || "-"}
          />

          {isEditing ? (
            <SelectCombobox
              label={indT("Tickets_Field_Status", "Status")}
              options={statusOptions}
              value={draftStatus}
              onChange={onDraftStatusChange}
              placeholder={indT("Tickets_Field_Status", "Status")}
              usePortal={false}
              allowTextInput={false}
              showSearchButton={false}
            />
          ) : (
            <ExpenseReadOnlyField
              label={indT("Tickets_Field_Status", "Status")}
              value={statusLabel || "-"}
            />
          )}

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

          {isEditing ? (
            <SelectCombobox
              label={indT("Tickets_Filter_ProcessedByIA", "Processed by IA")}
              options={processedByAiOptions}
              value={draftProcessedByAI}
              onChange={onDraftProcessedByAIChange}
              placeholder={indT("Tickets_Filter_ProcessedByIA", "Processed by IA")}
              usePortal={false}
              allowTextInput={false}
              showSearchButton={false}
            />
          ) : (
            <ExpenseReadOnlyField
              label={indT("Tickets_Filter_ProcessedByIA", "Processed by IA")}
              value={processedByAiLabel || "-"}
            />
          )}

          <ExpenseReadOnlyField
            label={indT("Tickets_Field_ExpenseSheetDisplay", "Expense sheet")}
            value={header.hojaGastosIdDisplay || "-"}
          />

          {isEditing ? (
            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Currency", "Currency")}</label>
              <input
                className="form-control"
                value={draftCurrencyCode}
                onChange={(event) => onDraftCurrencyCodeChange((event.target.value || "").toUpperCase())}
                maxLength={8}
                aria-label={indT("ExpenseSheets_Field_Currency", "Currency")}
              />
            </div>
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
                className="form-control"
                type="text"
                inputMode="decimal"
                value={draftTotalAmount}
                onChange={(event) => onDraftTotalAmountChange(event.target.value || "")}
                onBlur={(event) =>
                  onDraftTotalAmountChange(
                    formatExpenseInputNumber(event.target.value, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: true,
                      fallback: "",
                    })
                  )
                }
                aria-label={indT("ExpenseSheets_Field_TotalAmount", "Total amount")}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_TotalAmount", "Total amount")}
              value={totalAmountText || "-"}
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
              value={transDateText || formatExpenseDisplayDate(header.transDate, document?.documentElement?.lang || "es-ES") || "-"}
            />
          )}

          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_UserId", "User")}
            value={header.createdByUserId || "-"}
          />

          {isEditing ? (
            <div className="sm:col-span-2 space-y-1.5">
              <label className="form-label font-semibold">{indT("Visits_Field_Comments", "Comments")}</label>
              <textarea
                className="form-control min-h-[84px]"
                value={draftComentario}
                onChange={(event) => onDraftComentarioChange(event.target.value || "")}
                aria-label={indT("Visits_Field_Comments", "Comments")}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField
              label={indT("Visits_Field_Comments", "Comments")}
              value={header.comentario || "-"}
              fullWidth
            />
          )}

          {isEditing ? (
            <div className="sm:col-span-2 space-y-1.5">
              <label className="form-label font-semibold">{indT("Common_Link", "Link")}</label>
              <input
                className="form-control"
                value={draftUrlFile}
                onChange={(event) => onDraftUrlFileChange(event.target.value || "")}
                aria-label={indT("Common_Link", "Link")}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField
              label={indT("Common_Link", "Link")}
              value={safeText(header.urlFile) || "-"}
              fullWidth
            />
          )}

          {isEditing ? (
            <div className="sm:col-span-2 space-y-1.5">
              <label className="form-label font-semibold">{indT("AudioRecorder_Download_FileName", "File name")}</label>
              <input
                className="form-control"
                value={draftFileName}
                onChange={(event) => onDraftFileNameChange(event.target.value || "")}
                aria-label={indT("AudioRecorder_Download_FileName", "File name")}
              />
            </div>
          ) : null}
        </div>

        {canOpenFile ? (
          <div className="flex justify-end">
            <button
              type="button"
              className="ind-action-btn px-3 py-1.5 text-xs"
              onClick={onOpenFile}
            >
              {safeText(isEditing ? draftFileName : header.fileName) || header.fileId || indT("Tickets_Field_FileId", "Ticket")}
            </button>
          </div>
        ) : null}
      </section>
    </section>
  );
};

export default ExpenseTicketDetailHeaderForm;
