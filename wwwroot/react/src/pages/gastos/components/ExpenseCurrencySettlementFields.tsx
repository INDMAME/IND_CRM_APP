import React from "react";
import InfoPopoverIconButton from "../../../components/commons/InfoPopoverIconButton.tsx";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { formatExpenseInputNumber } from "../utils/expenseNumberFormat.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import ExpenseCurrencyFilterSelect from "./ExpenseCurrencyFilterSelect.tsx";

type ExpenseCurrencySettlementFieldsProps = {
  isEditing: boolean;
  expenseCurrencyCode: string;
  expenseCurrencyInvalid?: boolean;
  expenseCurrencyInputRef?: React.Ref<HTMLInputElement>;
  localCurrencyCode: string;
  exchangeRate: string;
  exchangeRateInvalid?: boolean;
  exchangeRateInputRef?: React.Ref<HTMLInputElement>;
  exchangeRateInfoMessage?: string;
  amountCurrency: string;
  amountCurrencyMode: "editable" | "readonly";
  amountCurrencyInvalid?: boolean;
  amountCurrencyInputRef?: React.Ref<HTMLInputElement>;
  reimbursementAmount: string;
  reimbursementAmountInvalid?: boolean;
  reimbursementAmountInputRef?: React.Ref<HTMLInputElement>;
  onExpenseCurrencyChange: (value: string) => void;
  onExchangeRateChange: (value: string) => void;
  onAmountCurrencyChange?: (value: string) => void;
  onReimbursementAmountChange: (value: string) => void;
};

const MONEY_INPUT_FORMAT = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
  fallback: "",
};

const EXCHANGE_RATE_INPUT_FORMAT = {
  minimumFractionDigits: 7,
  maximumFractionDigits: 7,
  useGrouping: true,
  fallback: "",
};

const buildInputClassName = (invalid: boolean, readOnly = false): string => {
  return [
    "form-control",
    readOnly ? "ind-readonly-field" : "",
    invalid ? "border-rose-400 bg-rose-50 focus:border-rose-400 focus:ring-rose-200" : "",
  ]
    .filter(Boolean)
    .join(" ");
};

const formatMoneyInput = (value: string): string => formatExpenseInputNumber(value, MONEY_INPUT_FORMAT);

const formatExchangeRateInput = (value: string): string => formatExpenseInputNumber(value, EXCHANGE_RATE_INPUT_FORMAT);

const fieldContainerClassName = "space-y-1.5";
const fieldLabelClassName = "form-label font-semibold leading-tight min-h-6 flex items-center";

// Shared four-field currency settlement block used by expense lines and ticket headers.
const ExpenseCurrencySettlementFields = ({
  isEditing,
  expenseCurrencyCode,
  expenseCurrencyInvalid = false,
  expenseCurrencyInputRef,
  localCurrencyCode,
  exchangeRate,
  exchangeRateInvalid = false,
  exchangeRateInputRef,
  exchangeRateInfoMessage,
  amountCurrency,
  amountCurrencyMode,
  amountCurrencyInvalid = false,
  amountCurrencyInputRef,
  reimbursementAmount,
  reimbursementAmountInvalid = false,
  reimbursementAmountInputRef,
  onExpenseCurrencyChange,
  onExchangeRateChange,
  onAmountCurrencyChange,
  onReimbursementAmountChange,
}: ExpenseCurrencySettlementFieldsProps) => {
  const normalizedExpenseCurrencyCode = safeText(expenseCurrencyCode).toUpperCase();
  const normalizedLocalCurrencyCode = safeText(localCurrencyCode).toUpperCase();
  const sameCurrencySettlement =
    !!normalizedExpenseCurrencyCode &&
    !!normalizedLocalCurrencyCode &&
    normalizedExpenseCurrencyCode === normalizedLocalCurrencyCode;
  const exchangeRateReadOnly = !isEditing || sameCurrencySettlement;
  const effectiveExchangeRate = sameCurrencySettlement ? formatExchangeRateInput("100") : exchangeRate;
  const effectiveExchangeRateInvalid = exchangeRateInvalid && !sameCurrencySettlement;
  const reimbursementCurrencyLabel = normalizedLocalCurrencyCode || indT("Common_NotAvailable", "N/A");
  const reimbursementLabel = indFormat(
    "ExpenseSheets_Field_ReimbursementAmount_WithCurrency",
    "Imp. reemb. ({0})",
    reimbursementCurrencyLabel
  );
  const fallbackExchangeRateInfoMessage = indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Stored",
    "Tipo de cambio {0} {1}",
    "manual",
    safeText(effectiveExchangeRate) || "-"
  );
  const amountCurrencyReadOnly = !isEditing || amountCurrencyMode === "readonly";

  return (
    <div className="md:col-span-2 grid grid-cols-2 gap-x-4 gap-y-3 items-start">
      <ExpenseCurrencyFilterSelect
        label={indT("ExpenseSheets_Field_ExpenseCurrency", "Divisa gasto")}
        placeholder={indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code")}
        value={normalizedExpenseCurrencyCode}
        onChange={onExpenseCurrencyChange}
        invalid={expenseCurrencyInvalid}
        inputRef={expenseCurrencyInputRef}
        readOnly={!isEditing}
        containerClassName={fieldContainerClassName}
        labelClassName={fieldLabelClassName}
        idBase="expense-currency-settlement-expense-currency"
        dropdownMinWidthPx={260}
      />

      <div className={fieldContainerClassName}>
        <div className="flex min-h-6 items-center justify-between gap-2">
          <label className={fieldLabelClassName}>{indT("ExpenseSheets_Field_ExchangeRate", "Tipo cambio")}</label>
          <InfoPopoverIconButton
            content={safeText(exchangeRateInfoMessage) || fallbackExchangeRateInfoMessage}
            ariaLabel={indT("ExpenseSheets_ExchangeRate_InfoPopover_Aria", "Exchange rate information")}
            className="shrink-0"
          />
        </div>
        <input
          ref={exchangeRateInputRef}
          className={buildInputClassName(effectiveExchangeRateInvalid, exchangeRateReadOnly)}
          type="text"
          inputMode="decimal"
          value={effectiveExchangeRate}
          onChange={!exchangeRateReadOnly ? (event) => onExchangeRateChange(event.target.value || "") : undefined}
          onBlur={!exchangeRateReadOnly ? (event) => onExchangeRateChange(formatExchangeRateInput(event.target.value)) : undefined}
          readOnly={exchangeRateReadOnly}
          aria-readonly={exchangeRateReadOnly ? "true" : "false"}
          aria-invalid={effectiveExchangeRateInvalid ? "true" : "false"}
          aria-label={indT("ExpenseSheets_Field_ExchangeRate", "Tipo cambio")}
        />
      </div>

      <div className={fieldContainerClassName}>
        <label className={fieldLabelClassName}>{indT("ExpenseSheets_Field_AmountCurrency", "Imp. divisa")}</label>
        <input
          ref={amountCurrencyInputRef}
          className={buildInputClassName(amountCurrencyInvalid, amountCurrencyReadOnly)}
          type="text"
          inputMode="decimal"
          value={amountCurrency || ""}
          onChange={
            !amountCurrencyReadOnly && onAmountCurrencyChange
              ? (event) => onAmountCurrencyChange(event.target.value || "")
              : undefined
          }
          onBlur={
            !amountCurrencyReadOnly && onAmountCurrencyChange
              ? (event) => onAmountCurrencyChange(formatMoneyInput(event.target.value))
              : undefined
          }
          readOnly={amountCurrencyReadOnly}
          aria-invalid={amountCurrencyInvalid ? "true" : "false"}
          aria-label={indT("ExpenseSheets_Field_AmountCurrency", "Imp. divisa")}
        />
      </div>

      <div className={fieldContainerClassName}>
        <label className={fieldLabelClassName}>{reimbursementLabel}</label>
        <input
          ref={reimbursementAmountInputRef}
          className={buildInputClassName(reimbursementAmountInvalid, !isEditing)}
          type="text"
          inputMode="decimal"
          value={reimbursementAmount || ""}
          onChange={isEditing ? (event) => onReimbursementAmountChange(event.target.value || "") : undefined}
          onBlur={isEditing ? (event) => onReimbursementAmountChange(formatMoneyInput(event.target.value)) : undefined}
          readOnly={!isEditing}
          aria-invalid={reimbursementAmountInvalid ? "true" : "false"}
          aria-label={reimbursementLabel}
        />
      </div>
    </div>
  );
};

export default ExpenseCurrencySettlementFields;
