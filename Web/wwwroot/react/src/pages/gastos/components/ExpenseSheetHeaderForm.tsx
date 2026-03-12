import React from "react";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetHeader } from "../expenseTypes.ts";
import ExpenseSheetHeaderCurrencySection from "./ExpenseSheetHeaderCurrencySection.tsx";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import { getExpenseStatusLabel } from "../constants/expenseStatusCatalog.ts";
import { getExpenseExchangeRateModeLabel } from "../constants/exchangeRateEntryModeCatalog.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { formatExpenseNumber, parseExpenseNumericInput } from "../utils/expenseNumberFormat.ts";

type ExpenseSheetHeaderFormProps = {
  isCreateMode: boolean;
  isEditing: boolean;
  canEditHeaderFields: boolean;
  statusCommentMode: "hidden" | "read" | "edit";
  header: ExpenseSheetHeader;
  projectValue: string;
  isCurrencyLockedByLines: boolean;
  isExchangeRateLockedByLines: boolean;
  normalizedDraftCurrency: string;
  exchangeRateBaseCurrency: string;
  exchangeRateReferenceAmount: number;
  showExchangeRate: boolean;
  exchangeRateValue: string;
  exchangeRateValidationMessage: string;
  totalAmountText: string;
  draftDescription: string;
  draftProjectId: string;
  draftCurrencyCode: string;
  draftExchangeRate: string;
  draftEstadoComentarios: string;
  officialExchangeRateRawValue: string;
  officialExchangeRateDate: string;
  officialExchangeRateSource: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftProjectIdChange: (value: string) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
  onDraftEstadoComentariosChange: (value: string) => void;
};

const EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;

// Pure presentational header form for expense sheet detail/create screens.
const ExpenseSheetHeaderForm = ({
  isCreateMode,
  isEditing,
  canEditHeaderFields,
  statusCommentMode,
  header,
  projectValue,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  normalizedDraftCurrency,
  exchangeRateBaseCurrency,
  exchangeRateReferenceAmount,
  showExchangeRate,
  exchangeRateValue,
  exchangeRateValidationMessage,
  totalAmountText,
  draftDescription,
  draftProjectId,
  draftCurrencyCode,
  draftExchangeRate,
  draftEstadoComentarios,
  officialExchangeRateRawValue,
  officialExchangeRateDate,
  officialExchangeRateSource,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange,
  onDraftEstadoComentariosChange,
}: ExpenseSheetHeaderFormProps) => {
  const isForeignCurrency =
    isEditing && canEditHeaderFields && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const expenseCurrencyLabel = isForeignCurrency
    ? indT("ExpenseSheets_Field_ExpenseCurrency", "Expense currency")
    : indT("ExpenseSheets_Field_Currency", "Currency");
  const statusValue =
    header.expenseSheetStatus === null || header.expenseSheetStatus === undefined
      ? "-"
      : getExpenseStatusLabel(header.expenseSheetStatus);
  const headerCurrencyCode = safeText(header.currencyCode).toUpperCase();
  const baseCurrencyCode = safeText(exchangeRateBaseCurrency).toUpperCase();
  const statusCommentValue = safeText(header.estadoComentarios);
  const hasVisibleStatusComment = statusCommentValue.trim().length > 0;
  const showStatusCommentField = !isCreateMode && (statusCommentMode !== "hidden" || hasVisibleStatusComment);
  const canEditStatusComment = isEditing && statusCommentMode === "edit";
  const parsedDraftExchangeRate = parseExpenseNumericInput(draftExchangeRate);
  const parsedOfficialRawRate = parseExpenseNumericInput(officialExchangeRateRawValue);
  const baseExchangeRateValue =
    parsedDraftExchangeRate != null
      ? parsedDraftExchangeRate
      : parsedOfficialRawRate != null
        ? parsedOfficialRawRate * exchangeRateReferenceAmount
        : null;
  const exchangeRateInfoValue = formatExpenseNumber(
    baseExchangeRateValue != null ? baseExchangeRateValue / exchangeRateReferenceAmount : null,
    {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
      useGrouping: false,
      fallback: "0.0000000",
    }
  );
  const exchangeRateModeValue = Number(header.exchangeRateMode) === 1 ? 1 : 0;
  const exchangeRateModeKey =
    exchangeRateModeValue === 1
      ? "ExpenseSheets_Filter_ExchangeRateMode_Manual"
      : "ExpenseSheets_Filter_ExchangeRateMode_Official";
  const exchangeRateModeFallback = exchangeRateModeValue === 1 ? "T.C. Manual" : "T.C. Oficial";
  const exchangeRateModeLabel =
    (getExpenseExchangeRateModeLabel(exchangeRateModeValue) || indT(exchangeRateModeKey, exchangeRateModeFallback))
      .replace(EXCHANGE_RATE_MODE_PREFIX_PATTERN, "")
      .trim()
      .toLowerCase() || (exchangeRateModeValue === 1 ? "manual" : "oficial");
  const hasEndpointExchangeRateData =
    !!safeText(officialExchangeRateRawValue) || !!safeText(officialExchangeRateDate) || !!safeText(officialExchangeRateSource);
  const endpointExchangeRateInfoDate = safeText(officialExchangeRateDate) || indT("Common_NotAvailable", "N/A");
  const endpointExchangeRateInfoSource = safeText(officialExchangeRateSource)
    .replace(/\s*\([^()]*\)\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim() || indT("Common_NotAvailable", "N/A");
  const endpointExchangeRateInfoMessage = indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Detail",
    "Tipo de cambio obtenido {0}\nFecha: {1}\nOrigen: {2}",
    safeText(officialExchangeRateRawValue) || "0.0000000",
    endpointExchangeRateInfoDate,
    endpointExchangeRateInfoSource
  );
  const storedExchangeRateInfoMessage = indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Stored",
    "Tipo de cambio {0} {1}",
    exchangeRateModeLabel,
    exchangeRateInfoValue
  );
  const exchangeRateInfoMessage = hasEndpointExchangeRateData ? endpointExchangeRateInfoMessage : storedExchangeRateInfoMessage;

  return (
    <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isCreateMode ? (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_SheetId", "Expense sheet code")}
            value={safeText(header.hojaGastosId) || "-"}
          />
        ) : null}
        {!isCreateMode ? <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Status", "Status")} value={statusValue} /> : null}
        {showStatusCommentField ? (
          canEditStatusComment ? (
            <div className="md:col-span-2 space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_StatusComment", "Status comment")}</label>
              <textarea
                className="form-control resize-none"
                rows={3}
                value={draftEstadoComentarios}
                onChange={(event) => onDraftEstadoComentariosChange(event.target.value || "")}
                aria-label={indT("ExpenseSheets_Field_StatusComment", "Status comment")}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_StatusComment", "Status comment")}
              value={statusCommentValue || "-"}
              fullWidth
            />
          )
        ) : null}
        {isEditing && canEditHeaderFields ? (
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
            value={safeText(header.description) || "-"}
            fullWidth
          />
        )}
        {isEditing && canEditHeaderFields ? (
          <ExpenseProjectFilterInput
            label={indT("ExpenseSheets_Field_Project", "Project")}
            placeholder={indT("ExpenseSheets_Filter_Project_Placeholder", "Project id")}
            value={draftProjectId}
            onChange={onDraftProjectIdChange}
            disabled={!isEditing || !canEditHeaderFields}
            readOnly={!isEditing || !canEditHeaderFields}
          />
        ) : projectValue ? (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Project", "Project")} value={projectValue} />
        ) : null}
        <ExpenseSheetHeaderCurrencySection
          isEditing={isEditing}
          canEditHeaderFields={canEditHeaderFields}
          isForeignCurrency={isForeignCurrency}
          expenseCurrencyLabel={expenseCurrencyLabel}
          headerCurrencyCode={headerCurrencyCode}
          baseCurrencyCode={baseCurrencyCode}
          draftCurrencyCode={draftCurrencyCode}
          draftExchangeRate={draftExchangeRate}
          exchangeRateValue={exchangeRateValue}
          exchangeRateValidationMessage={exchangeRateValidationMessage}
          exchangeRateReferenceAmount={exchangeRateReferenceAmount}
          showExchangeRate={showExchangeRate}
          isCurrencyLockedByLines={isCurrencyLockedByLines}
          isExchangeRateLockedByLines={isExchangeRateLockedByLines}
          exchangeRateInfoMessage={exchangeRateInfoMessage}
          onDraftCurrencyCodeChange={onDraftCurrencyCodeChange}
          onDraftExchangeRateChange={onDraftExchangeRateChange}
        />
        {!isCreateMode ? <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_TotalAmount", "Total amount")} value={totalAmountText} /> : null}
      </div>
    </section>
  );
};

export default ExpenseSheetHeaderForm;
