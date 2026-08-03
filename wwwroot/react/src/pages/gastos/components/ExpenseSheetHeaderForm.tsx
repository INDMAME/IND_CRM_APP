import React from "react";
import InfoPopoverIconButton from "../../../components/commons/InfoPopoverIconButton.tsx";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetHeader } from "../expenseTypes.ts";
import ExpenseSheetHeaderCurrencySection from "./ExpenseSheetHeaderCurrencySection.tsx";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import { formatExpenseAmountLabel } from "../expenseFormatters.ts";
import { getExpenseStatusLabel } from "../constants/expenseStatusCatalog.ts";
import {
  getEditableExpenseReimbursableExpenseOptions,
  getExpenseReimbursableExpenseLabel,
  normalizeExpenseReimbursableExpense,
} from "../constants/expenseReimbursableExpenseCatalog.ts";
import {
  getExpenseExchangeRateModeLabel,
  normalizeExpenseExchangeRateMode,
} from "../constants/exchangeRateEntryModeCatalog.ts";
import { normalizeDescriptionText, safeText } from "../utils/expenseUiUtils.ts";
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
  grossAmountText: string;
  reimbursableAmountText: string;
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
  onDraftProjectIdCommit?: (value: string) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
  onDraftReimbursableExpenseChange: (value: number) => void;
};

const EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;
const ALIGNED_FIELD_CONTAINER_CLASS_NAME = "space-y-1.5";
const ALIGNED_FIELD_LABEL_CLASS_NAME = "form-label font-semibold inline-flex h-6 items-center leading-none";

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
  grossAmountText,
  reimbursableAmountText,
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
  onDraftProjectIdCommit,
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
  const companyAmountLabel = formatExpenseAmountLabel(exchangeRateBaseCurrency);
  const headerCurrencyCode = safeText(header.currencyCode).toUpperCase();
  const baseCurrencyCode = safeText(exchangeRateBaseCurrency).toUpperCase();
  const reimbursableExpenseOptions = React.useMemo(() => getEditableExpenseReimbursableExpenseOptions(), []);
  const reimbursableExpenseTitle = indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable");
  const reimbursableExpenseInfoText = indT(
    "ExpenseSheets_Reimbursable_InfoPopover_Text",
    'This value can be set as the header default. If it is changed later, you can update all lines with the new value. If a line changes the inherited value, the header switches to "Both".'
  );
  const reimbursableExpenseInfoAriaLabel = indT(
    "ExpenseSheets_Reimbursable_InfoPopover_Aria",
    "Show reimbursable information"
  );
  const reimbursableExpenseValue = normalizeExpenseReimbursableExpense(
    isEditing ? draftReimbursableExpense : header.reimbursableExpense
  );
  const hasEditableReimbursableExpenseValue = reimbursableExpenseOptions.some(
    (option) => Number(option.value) === reimbursableExpenseValue
  );
  const reimbursableExpenseLabel = getExpenseReimbursableExpenseLabel(
    isEditing ? reimbursableExpenseValue : header.reimbursableExpense
  );
  const selectedReimbursableExpenseOption = React.useMemo(
    () =>
      hasEditableReimbursableExpenseValue
        ? undefined
        : { value: String(reimbursableExpenseValue), text: reimbursableExpenseLabel },
    [hasEditableReimbursableExpenseValue, reimbursableExpenseLabel, reimbursableExpenseValue]
  );
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
  const reimbursableExpenseLabelContent = (
    <div className="flex h-6 items-center gap-1.5">
      <label className={ALIGNED_FIELD_LABEL_CLASS_NAME}>{reimbursableExpenseTitle}</label>
      <InfoPopoverIconButton
        content={reimbursableExpenseInfoText}
        ariaLabel={reimbursableExpenseInfoAriaLabel}
        className="shrink-0"
        panelClassName="max-w-[min(320px,calc(100vw-1rem))]"
      />
    </div>
  );
  const reimbursableExpenseField =
    isEditing && canEditHeaderFields ? (
      <div className={ALIGNED_FIELD_CONTAINER_CLASS_NAME}>
        {reimbursableExpenseLabelContent}
        <SelectCombobox
          label={reimbursableExpenseTitle}
          placeholder={reimbursableExpenseTitle}
          options={reimbursableExpenseOptions}
          selectedOption={selectedReimbursableExpenseOption}
          value={String(reimbursableExpenseValue)}
          onChange={(value) => onDraftReimbursableExpenseChange(normalizeExpenseReimbursableExpense(value))}
          readOnly={!isEditing || !canEditHeaderFields}
          disabled={!isEditing || !canEditHeaderFields}
          idBase="expense-sheet-reimbursable-expense"
          portalClassName="visitas-typography"
          panelClassName="visitas-typography"
          containerClassName="space-y-0"
          showLabel={false}
          allowTextInput={false}
        />
      </div>
    ) : (
      <div className={ALIGNED_FIELD_CONTAINER_CLASS_NAME}>
        {reimbursableExpenseLabelContent}
        <div className="relative">
          <input
            className="form-control ind-readonly-field"
            value={reimbursableExpenseLabel || "-"}
            readOnly
            aria-label={reimbursableExpenseTitle}
          />
        </div>
      </div>
    );
  const currencyField = (
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
  );
  const projectField =
    !isCreateMode && isEditing && canEditHeaderFields ? (
      <ExpenseProjectFilterInput
        label={indT("ExpenseSheets_Field_Project", "Project")}
        placeholder={indT("ExpenseSheets_Filter_Project_Placeholder", "Project id")}
        value={draftProjectId}
        onChange={onDraftProjectIdChange}
        onCommit={onDraftProjectIdCommit}
        disabled={!isEditing || !canEditHeaderFields}
        readOnly={!isEditing || !canEditHeaderFields}
        containerClassName={ALIGNED_FIELD_CONTAINER_CLASS_NAME}
        labelClassName={ALIGNED_FIELD_LABEL_CLASS_NAME}
      />
    ) : !isCreateMode ? (
      <ExpenseReadOnlyField
        label={indT("ExpenseSheets_Field_Project", "Project")}
        value={projectValue}
        containerClassName={ALIGNED_FIELD_CONTAINER_CLASS_NAME}
        labelClassName={ALIGNED_FIELD_LABEL_CLASS_NAME}
      />
    ) : null;

  return (
    <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isEditing && canEditHeaderFields ? (
          <div className="sm:col-span-2 space-y-1.5">
            <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Description", "Description")}</label>
            <input
              className="form-control"
              value={draftDescription}
              onChange={(event) => onDraftDescriptionChange(event.target.value || "")}
              onBlur={(event) => onDraftDescriptionChange(normalizeDescriptionText(event.target.value, ""))}
              aria-label={indT("ExpenseSheets_Field_Description", "Description")}
            />
          </div>
        ) : (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_Description", "Description")}
            value={normalizeDescriptionText(header.description)}
            fullWidth
          />
        )}
        {isCreateMode && isEditing && canEditHeaderFields ? (
          <ExpenseProjectFilterInput
            label={indT("ExpenseSheets_Field_Project", "Project")}
            placeholder={indT("ExpenseSheets_Filter_Project_Placeholder", "Project id")}
            value={draftProjectId}
            onChange={onDraftProjectIdChange}
            onCommit={onDraftProjectIdCommit}
            disabled={!isEditing || !canEditHeaderFields}
            readOnly={!isEditing || !canEditHeaderFields}
          />
        ) : isCreateMode ? (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Project", "Project")} value={projectValue} />
        ) : null}
        {!isCreateMode ? (
          <div className="grid grid-cols-2 items-start gap-3 md:col-span-2 md:gap-4">
            <ExpenseReadOnlyField
              label={companyAmountLabel}
              value={grossAmountText}
              valueAlign="right"
              containerClassName={ALIGNED_FIELD_CONTAINER_CLASS_NAME}
              labelClassName={ALIGNED_FIELD_LABEL_CLASS_NAME}
            />
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_ReimbursementAmount", "Reimbursement amount")}
              value={reimbursableAmountText}
              valueAlign="right"
              containerClassName={ALIGNED_FIELD_CONTAINER_CLASS_NAME}
              labelClassName={ALIGNED_FIELD_LABEL_CLASS_NAME}
            />
          </div>
        ) : null}
        {isCreateMode ? (
          <div className="grid grid-cols-2 items-start gap-3 md:col-span-2 md:gap-4">
            {reimbursableExpenseField}
            {currencyField}
          </div>
        ) : null}
        {!isCreateMode ? (
          <div className="grid grid-cols-2 items-start gap-3 md:col-span-2 md:gap-4">
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_Status", "Status")}
              value={statusValue}
              containerClassName={ALIGNED_FIELD_CONTAINER_CLASS_NAME}
              labelClassName={ALIGNED_FIELD_LABEL_CLASS_NAME}
            />
            {reimbursableExpenseField}
          </div>
        ) : null}
        {!isCreateMode ? (
          <div className="grid grid-cols-2 items-start gap-3 md:col-span-2 md:gap-4">
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Detail_Field_Identifier", "Identifier")}
              value={safeText(header.hojaGastosId) || "-"}
              containerClassName={ALIGNED_FIELD_CONTAINER_CLASS_NAME}
              labelClassName={ALIGNED_FIELD_LABEL_CLASS_NAME}
            />
            {projectField}
          </div>
        ) : null}
        {ownerDisplay ? (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_OwnerUser", "Owner user")}
            value={ownerDisplay}
            fullWidth
          />
        ) : null}
        {showStatusCommentField ? (
          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_StatusComment", "Status comment")}
            value={statusCommentValue || "-"}
            fullWidth
          />
        ) : null}
      </div>
    </section>
  );
};

export default ExpenseSheetHeaderForm;
