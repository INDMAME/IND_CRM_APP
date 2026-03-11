import React from "react";
import { indT } from "../../../utils/indI18n.ts";
import InfoPopoverIconButton from "../../../components/commons/InfoPopoverIconButton.tsx";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import ExpenseCurrencyFilterSelect from "./ExpenseCurrencyFilterSelect.tsx";
import ExpenseCurrencyFlagIcon from "./ExpenseCurrencyFlagIcon.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import { formatExpenseInputNumber, formatExpenseNumber } from "../utils/expenseNumberFormat.ts";

type ExpenseSheetHeaderCurrencySectionProps = {
  isEditing: boolean;
  canEditHeaderFields: boolean;
  isForeignCurrency: boolean;
  expenseCurrencyLabel: string;
  headerCurrencyCode: string;
  baseCurrencyCode: string;
  draftCurrencyCode: string;
  draftExchangeRate: string;
  exchangeRateValue: string;
  exchangeRateValidationMessage: string;
  exchangeRateReferenceAmount: number;
  showExchangeRate: boolean;
  isCurrencyLockedByLines: boolean;
  isExchangeRateLockedByLines: boolean;
  exchangeRateInfoMessage: string;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
};

// Owns the currency and exchange-rate UI so the header form stays compact.
const ExpenseSheetHeaderCurrencySection = ({
  isEditing,
  canEditHeaderFields,
  isForeignCurrency,
  expenseCurrencyLabel,
  headerCurrencyCode,
  baseCurrencyCode,
  draftCurrencyCode,
  draftExchangeRate,
  exchangeRateValue,
  exchangeRateValidationMessage,
  exchangeRateReferenceAmount,
  showExchangeRate,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  exchangeRateInfoMessage,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange,
}: ExpenseSheetHeaderCurrencySectionProps) => {
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

  if (isEditing && canEditHeaderFields) {
    return (
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
                  preferDefaultCurrencyFromContext
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
              preferDefaultCurrencyFromContext
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
    );
  }

  return (
    <>
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
      {!isEditing && showExchangeRate ? (
        <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")} value={exchangeRateValue} />
      ) : null}
    </>
  );
};

export default ExpenseSheetHeaderCurrencySection;
