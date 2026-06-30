import React from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetHeader } from "../expenseTypes.ts";
import ExpenseSheetHeaderCurrencySection from "./ExpenseSheetHeaderCurrencySection.tsx";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import { getExpenseStatusLabel } from "../constants/expenseStatusCatalog.ts";
import {
  getExpenseReimbursableExpenseLabel,
  getExpenseReimbursableExpenseOptions,
  normalizeExpenseReimbursableExpense,
} from "../constants/expenseReimbursableExpenseCatalog.ts";
import {
  getExpenseExchangeRateModeLabel,
  normalizeExpenseExchangeRateMode,
} from "../constants/exchangeRateEntryModeCatalog.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { formatExpenseNumber, parseExpenseNumericInput } from "../utils/expenseNumberFormat.ts";

type ExpenseSheetHeaderFormMode = {
  isCreateMode: boolean;
  isEditing: boolean;
  canEditHeaderFields: boolean;
  statusCommentMode: "hidden" | "read";
};

type ExpenseSheetHeaderCurrencyLocks = {
  isCurrencyLockedByLines: boolean;
  isExchangeRateLockedByLines: boolean;
  showExchangeRate: boolean;
};

type ExpenseSheetHeaderFormProps = {
  mode: ExpenseSheetHeaderFormMode;
  currencyLocks: ExpenseSheetHeaderCurrencyLocks;
  header: ExpenseSheetHeader;
  ownerDisplay?: string;
  projectValue: string;
  normalizedDraftCurrency: string;
  exchangeRateBaseCurrency: string;
  exchangeRateReferenceAmount: number;
  exchangeRateValue: string;
  exchangeRateValidationMessage: string;
  totalAmountText: string;
  draftDescription: string;
  draftProjectId: string;
  draftCurrencyCode: string;
  draftExchangeRate: string;
  draftReimbursableExpense: number | null;
  officialExchangeRateRawValue: string;
  officialExchangeRateDate: string;
  officialExchangeRateSource: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftProjectIdChange: (value: string) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
  onDraftReimbursableExpenseChange: (value: number) => void;
};

const EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;

// Pure presentational header form for expense sheet detail/create screens.
const ExpenseSheetHeaderForm = ({
  mode,
  currencyLocks,
  header,
  ownerDisplay = "",
  projectValue,
  normalizedDraftCurrency,
  exchangeRateBaseCurrency,
  exchangeRateReferenceAmount,
  exchangeRateValue,
  exchangeRateValidationMessage,
  totalAmountText,
  draftDescription,
  draftProjectId,
  draftCurrencyCode,
  draftExchangeRate,
  draftReimbursableExpense,
  officialExchangeRateRawValue,
  officialExchangeRateDate,
  officialExchangeRateSource,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange,
  onDraftReimbursableExpenseChange,
}: ExpenseSheetHeaderFormProps) => {
  const { isCreateMode, isEditing, canEditHeaderFields, statusCommentMode } = mode;
  const { isCurrencyLockedByLines, isExchangeRateLockedByLines, showExchangeRate } = currencyLocks;
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
  const reimbursableExpenseOptions = React.useMemo(() => getExpenseReimbursableExpenseOptions(), []);
  const reimbursableExpenseValue = normalizeExpenseReimbursableExpense(
    isEditing ? draftReimbursableExpense : header.reimbursableExpense
  );
  const reimbursableExpenseLabel = getExpenseReimbursableExpenseLabel(reimbursableExpenseValue);
  // Status comment is now edited only in the status transition popup.
  const statusCommentValue = safeText(header.estadoComentarios);
  const showStatusCommentField = !isCreateMode && statusCommentMode !== "hidden";
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
  const exchangeRateModeValue = normalizeExpenseExchangeRateMode(header.exchangeRateMode) ?? 0;
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
    <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ownerDisplay ? (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_OwnerUser", "Owner user")}
            value={ownerDisplay}
            fullWidth
          />
        ) : null}
        {!isCreateMode ? (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_SheetId", "Expense sheet code")}
            value={safeText(header.hojaGastosId) || "-"}
          />
        ) : null}
        {!isCreateMode ? <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Status", "Status")} value={statusValue} /> : null}
        {showStatusCommentField ? (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_StatusComment", "Status comment")}
            value={statusCommentValue || "-"}
            fullWidth
          />
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
        {isEditing && canEditHeaderFields ? (
          <SelectCombobox
            label={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
            placeholder={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
            options={reimbursableExpenseOptions}
            value={String(reimbursableExpenseValue)}
            onChange={(value) => onDraftReimbursableExpenseChange(normalizeExpenseReimbursableExpense(value))}
            readOnly={!isEditing || !canEditHeaderFields}
            disabled={!isEditing || !canEditHeaderFields}
            idBase="expense-sheet-reimbursable-expense"
            portalClassName="visitas-typography"
            panelClassName="visitas-typography"
            allowTextInput={false}
          />
        ) : (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
            value={reimbursableExpenseLabel}
          />
        )}
        <ExpenseSheetHeaderCurrencySection
          interaction={{ isEditing, canEditHeaderFields }}
          currencyState={{ isForeignCurrency, isCurrencyLockedByLines, isExchangeRateLockedByLines, showExchangeRate }}
          expenseCurrencyLabel={expenseCurrencyLabel}
          headerCurrencyCode={headerCurrencyCode}
          baseCurrencyCode={baseCurrencyCode}
          draftCurrencyCode={draftCurrencyCode}
          draftExchangeRate={draftExchangeRate}
          exchangeRateValue={exchangeRateValue}
          exchangeRateValidationMessage={exchangeRateValidationMessage}
          exchangeRateReferenceAmount={exchangeRateReferenceAmount}
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
