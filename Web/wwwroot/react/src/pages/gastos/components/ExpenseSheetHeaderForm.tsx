import React from "react";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetHeader } from "../expenseTypes.ts";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseCurrencyFilterSelect from "./ExpenseCurrencyFilterSelect.tsx";
import { getExpenseStatusLabel } from "../constants/expenseStatusCatalog.ts";
import { safeText } from "../utils/expenseUiUtils.ts";

type ExpenseSheetHeaderFormProps = {
  isCreateMode: boolean;
  isEditing: boolean;
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
  isExchangeRateLoading: boolean;
  exchangeRateMessage: string;
  exchangeRateMessageIsError: boolean;
  onDraftDescriptionChange: (value: string) => void;
  onDraftProjectIdChange: (value: string) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
};

// Pure presentational header form for expense sheet detail/create screens.
const ExpenseSheetHeaderForm = ({
  isCreateMode,
  isEditing,
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
  isExchangeRateLoading,
  exchangeRateMessage,
  exchangeRateMessageIsError,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange,
}: ExpenseSheetHeaderFormProps) => {
  const isForeignCurrency =
    isEditing && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const statusValue =
    header.expenseSheetStatus === null || header.expenseSheetStatus === undefined
      ? "-"
      : getExpenseStatusLabel(header.expenseSheetStatus);

  return (
    <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isCreateMode ? (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_SheetId", "Sheet id")} value={safeText(header.hojaGastosId) || "-"} />
        ) : null}
        {!isCreateMode ? (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Status", "Status")} value={statusValue} />
        ) : null}
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
            value={safeText(header.description) || "-"}
            fullWidth
          />
        )}
        {isEditing ? (
          <ExpenseProjectFilterInput
            label={indT("ExpenseSheets_Field_Project", "Project")}
            placeholder={indT("ExpenseSheets_Filter_Project_Placeholder", "Project id")}
            value={draftProjectId}
            onChange={onDraftProjectIdChange}
            disabled={!isEditing}
            readOnly={!isEditing}
          />
        ) : projectValue ? (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Project", "Project")} value={projectValue} />
        ) : null}
        {!isEditing && isSheetPaid ? (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Voucher", "Voucher")} value={voucherValue || "-"} />
        ) : null}
        {isEditing ? (
          <div className="sm:col-span-2 space-y-3">
            <div className={`grid gap-4 ${isForeignCurrency ? "grid-cols-2" : "grid-cols-1"}`.trim()}>
              <ExpenseCurrencyFilterSelect
                label={indT("ExpenseSheets_Field_Currency", "Currency")}
                placeholder={indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code")}
                value={draftCurrencyCode}
                onChange={onDraftCurrencyCodeChange}
                disabled={!isEditing || isCurrencyLockedByLines}
                readOnly={!isEditing || isCurrencyLockedByLines}
                idBase="expense-header-currency"
                preferDefaultCurrencyFromContext={isCreateMode}
              />

              {isForeignCurrency ? (
                <div className="space-y-1.5">
                  <label className="form-label font-semibold">{indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")}</label>
                  <input
                    className={`form-control ${exchangeRateValidationMessage ? "border-danger ring-1 ring-danger" : ""} ${isExchangeRateLockedByLines ? "ind-readonly-field" : ""}`}
                    type="number"
                    step="any"
                    inputMode="decimal"
                    value={draftExchangeRate}
                    onChange={(event) => onDraftExchangeRateChange(event.target.value || "")}
                    aria-label={indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")}
                    placeholder={indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")}
                    readOnly={isExchangeRateLockedByLines}
                    disabled={isExchangeRateLockedByLines}
                  />
                </div>
              ) : null}
            </div>

            {isForeignCurrency ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Currency", "Currency")}</label>
                  <input
                    className="form-control ind-readonly-field"
                    value={exchangeRateBaseCurrency}
                    aria-label={indT("ExpenseSheets_Field_Currency", "Currency")}
                    readOnly
                    disabled
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Amount", "Amount")}</label>
                  <input
                    className="form-control ind-readonly-field"
                    value={String(exchangeRateReferenceAmount)}
                    aria-label={indT("ExpenseSheets_Field_Amount", "Amount")}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            ) : null}

            {isForeignCurrency && isExchangeRateLoading ? (
              <p className="text-slate-500 text-xs">{indT("ExpenseSheets_ExchangeRate_Loading", "Consultando tipo de cambio...")}</p>
            ) : null}
            {isForeignCurrency && exchangeRateValidationMessage ? <p className="text-danger text-sm">{exchangeRateValidationMessage}</p> : null}
            {isForeignCurrency && !isExchangeRateLoading && exchangeRateMessage ? (
              <p className={exchangeRateMessageIsError ? "text-danger text-sm" : "text-slate-500 text-xs"}>{exchangeRateMessage}</p>
            ) : null}
          </div>
        ) : (
          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Currency", "Currency")} value={safeText(header.currencyCode) || "-"} />
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
