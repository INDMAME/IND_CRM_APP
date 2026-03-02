import React from "react";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetHeader } from "../expenseTypes.ts";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseCurrencyFilterSelect from "./ExpenseCurrencyFilterSelect.tsx";
import ExpenseCurrencyFlagIcon from "./ExpenseCurrencyFlagIcon.tsx";
import InfoPopoverIconButton from "../../../components/commons/InfoPopoverIconButton.tsx";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { getExpenseSheetStatusOptions, getExpenseStatusLabel } from "../constants/expenseStatusCatalog.ts";
import { getExpenseExchangeRateModeLabel } from "../constants/exchangeRateEntryModeCatalog.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { formatExpenseInputNumber, formatExpenseNumber, parseExpenseNumericInput } from "../utils/expenseNumberFormat.ts";

type ExpenseSheetHeaderFormProps = {
  isCreateMode: boolean;
  isEditing: boolean;
  canEditHeaderFields: boolean;
  canEditStatus: boolean;
  header: ExpenseSheetHeader;
  projectValue: string;
  voucherValue: string;
  isSheetPaid: boolean;
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
  draftExpenseSheetStatus: number;
  draftEstadoComentarios: string;
  officialExchangeRateRawValue: string;
  officialExchangeRateDate: string;
  officialExchangeRateSource: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftProjectIdChange: (value: string) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
  onDraftExpenseSheetStatusChange: (value: number) => void;
  onDraftEstadoComentariosChange: (value: string) => void;
};

const EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;

// Pure presentational header form for expense sheet detail/create screens.
const ExpenseSheetHeaderForm = ({
  isCreateMode,
  isEditing,
  canEditHeaderFields,
  canEditStatus,
  header,
  projectValue,
  voucherValue,
  isSheetPaid,
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
  draftExpenseSheetStatus,
  draftEstadoComentarios,
  officialExchangeRateRawValue,
  officialExchangeRateDate,
  officialExchangeRateSource,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange,
  onDraftExpenseSheetStatusChange,
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
  const statusOptions = React.useMemo(() => getExpenseSheetStatusOptions(), []);
  const statusDraftValue = String(Number.isInteger(draftExpenseSheetStatus) ? draftExpenseSheetStatus : 0);
  const statusCommentValue = safeText(header.estadoComentarios);
  const showStatusCommentField = !isCreateMode && ((isEditing && canEditStatus) || !!statusCommentValue);
  const localCurrencyOptions = React.useMemo<ExpenseSelectOption[]>(
    () => [
      {
        value: baseCurrencyCode,
        text: baseCurrencyCode,
        icon: <ExpenseCurrencyFlagIcon currencyCode={baseCurrencyCode} sizeClassName="h-6 w-6" />,
      },
    ],
    [baseCurrencyCode]
  );
  const headerCurrencyOptions = React.useMemo<ExpenseSelectOption[]>(
    () => [
      {
        value: headerCurrencyCode || "-",
        text: headerCurrencyCode || "-",
        icon: <ExpenseCurrencyFlagIcon currencyCode={headerCurrencyCode || "-"} sizeClassName="h-6 w-6" />,
      },
    ],
    [headerCurrencyCode]
  );
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
        {!isCreateMode ? (
          isEditing && canEditStatus ? (
            <SelectCombobox
              label={indT("ExpenseSheets_Field_Status", "Status")}
              options={statusOptions}
              value={statusDraftValue}
              onChange={(nextValue) => {
                const parsed = Number(nextValue);
                if (Number.isInteger(parsed) && parsed >= 0) {
                  onDraftExpenseSheetStatusChange(parsed);
                }
              }}
              placeholder={indT("ExpenseSheets_Field_Status", "Status")}
              emitOnValueChange
              allowTextInput={false}
              idBase="expense-header-status"
              portalClassName="visitas-typography"
            />
          ) : (
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Status", "Status")} value={statusValue} />
          )
        ) : null}
        {showStatusCommentField ? (
          isEditing && canEditStatus ? (
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
        {!isEditing && isSheetPaid ? (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Voucher", "Voucher")} value={voucherValue || "-"} />
        ) : null}
        {isEditing && canEditHeaderFields ? (
          <div className="sm:col-span-2 space-y-3">
            <div className={`grid gap-4 ${isForeignCurrency ? "grid-cols-2" : "grid-cols-1"}`.trim()}>
              {isForeignCurrency ? (
                <>
                  <div className="space-y-1.5">
                    <label className="form-label font-semibold">{expenseCurrencyLabel}</label>
                    <ExpenseCurrencyFilterSelect
                      label={expenseCurrencyLabel}
                      placeholder={indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code")}
                      value={draftCurrencyCode}
                      onChange={onDraftCurrencyCodeChange}
                      disabled={!isEditing || isCurrencyLockedByLines}
                      readOnly={!isEditing || isCurrencyLockedByLines}
                      showLabel={false}
                      idBase="expense-header-currency"
                      preferDefaultCurrencyFromContext={isCreateMode}
                    />
                  </div>
                  <div className="relative space-y-1.5">
                    <label className="form-label pr-8 font-semibold">{indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")}</label>
                    <InfoPopoverIconButton
                      ariaLabel={indT("ExpenseSheets_ExchangeRate_InfoPopover_Aria", "Show exchange rate information")}
                      content={exchangeRateInfoMessage}
                      className="absolute right-0 -top-1 z-20"
                    />
                    <div>
                      <input
                        className={`form-control ${exchangeRateValidationMessage ? "border-danger ring-1 ring-danger" : ""} ${isExchangeRateLockedByLines ? "ind-readonly-field" : ""}`}
                        type="text"
                        inputMode="decimal"
                        value={draftExchangeRate}
                        onChange={(event) => onDraftExchangeRateChange(event.target.value || "")}
                        onBlur={(event) =>
                          onDraftExchangeRateChange(
                            formatExpenseInputNumber(event.target.value, {
                              minimumFractionDigits: 7,
                              maximumFractionDigits: 7,
                              useGrouping: true,
                              fallback: "",
                            })
                          )
                        }
                        aria-label={indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")}
                        placeholder={indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")}
                        readOnly={isExchangeRateLockedByLines}
                        disabled={isExchangeRateLockedByLines}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <ExpenseCurrencyFilterSelect
                  label={expenseCurrencyLabel}
                  placeholder={indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code")}
                  value={draftCurrencyCode}
                  onChange={onDraftCurrencyCodeChange}
                  disabled={!isEditing || isCurrencyLockedByLines}
                  readOnly={!isEditing || isCurrencyLockedByLines}
                  idBase="expense-header-currency"
                  preferDefaultCurrencyFromContext={isCreateMode}
                />
              )}
            </div>

            {isForeignCurrency ? (
              <div className="grid grid-cols-2 gap-4">
                <SelectCombobox
                  label={indT("ExpenseSheets_Field_LocalCurrency", "Local currency")}
                  options={localCurrencyOptions}
                  value={baseCurrencyCode}
                  onChange={() => undefined}
                  placeholder={indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code")}
                  readOnly
                  disabled
                  allowTextInput={false}
                  showSearchButton={false}
                  showLabel
                  usePortal={false}
                  selectedTextMode="value"
                  dropdownMaxHeightClass="max-h-96"
                  selectedIconClassName="h-6 w-6"
                  optionIconClassName="h-6 w-6"
                  selectedInputPaddingClassName="pl-12"
                  idBase="expense-header-local-currency"
                  portalClassName="visitas-typography"
                  panelClassName="visitas-typography"
                />
                <div className="space-y-1.5">
                  <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Amount", "Amount")}</label>
                  <input
                    className="form-control ind-readonly-field"
                    value={formatExpenseNumber(exchangeRateReferenceAmount, {
                      minimumFractionDigits: 7,
                      maximumFractionDigits: 7,
                      useGrouping: true,
                      fallback: "-",
                    })}
                    aria-label={indT("ExpenseSheets_Field_Amount", "Amount")}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            ) : null}

            {isForeignCurrency && exchangeRateValidationMessage ? <p className="text-danger text-sm">{exchangeRateValidationMessage}</p> : null}
          </div>
        ) : (
          <SelectCombobox
            label={indT("ExpenseSheets_Field_Currency", "Currency")}
            options={headerCurrencyOptions}
            value={headerCurrencyCode || "-"}
            onChange={() => undefined}
            placeholder={indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code")}
            readOnly
            disabled
            allowTextInput={false}
            showSearchButton={false}
            showLabel
            usePortal={false}
            selectedTextMode="value"
            dropdownMaxHeightClass="max-h-96"
            selectedIconClassName="h-6 w-6"
            optionIconClassName="h-6 w-6"
            selectedInputPaddingClassName="pl-12"
            idBase="expense-header-currency-readonly"
            portalClassName="visitas-typography"
            panelClassName="visitas-typography"
          />
        )}
        {!isEditing && showExchangeRate ? (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")} value={exchangeRateValue} />
        ) : null}
        {!isCreateMode ? <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_TotalAmount", "Total amount")} value={totalAmountText} /> : null}
      </div>
    </section>
  );
};

export default ExpenseSheetHeaderForm;
