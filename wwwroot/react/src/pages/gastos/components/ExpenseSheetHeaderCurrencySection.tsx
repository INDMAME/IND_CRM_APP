import React from "react";
import { indT } from "../../../utils/indI18n.ts";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import ExpenseCurrencyFlagIcon from "./ExpenseCurrencyFlagIcon.tsx";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseSheetHeaderCurrencyInteraction = {
  isEditing: boolean;
  canEditHeaderFields: boolean;
};

type ExpenseSheetHeaderCurrencyState = {
  isForeignCurrency: boolean;
  showExchangeRate: boolean;
  isCurrencyLockedByLines: boolean;
  isExchangeRateLockedByLines: boolean;
};

type ExpenseSheetHeaderCurrencySectionProps = {
  interaction: ExpenseSheetHeaderCurrencyInteraction;
  currencyState: ExpenseSheetHeaderCurrencyState;
  expenseCurrencyLabel: string;
  headerCurrencyCode: string;
  baseCurrencyCode: string;
  draftCurrencyCode: string;
  draftExchangeRate: string;
  exchangeRateValue: string;
  exchangeRateValidationMessage: string;
  exchangeRateReferenceAmount: number;
  exchangeRateInfoMessage: string;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
};

// Owns the currency and exchange-rate UI so the header form stays compact.
const ExpenseSheetHeaderCurrencySection = ({
  headerCurrencyCode,
  baseCurrencyCode,
}: ExpenseSheetHeaderCurrencySectionProps) => {
  const reimbursementCurrencyCode = baseCurrencyCode || headerCurrencyCode || "-";
  const reimbursementCurrencyOptions = React.useMemo<ExpenseSelectOption[]>(
    () => [
      {
        value: reimbursementCurrencyCode,
        text: reimbursementCurrencyCode,
        icon: <ExpenseCurrencyFlagIcon currencyCode={reimbursementCurrencyCode} sizeClassName="h-6 w-6" />,
      },
    ],
    [reimbursementCurrencyCode]
  );

  return (
    <SelectCombobox
      label={indT("ExpenseSheets_Field_ReimbursementCurrency", "Reimbursement currency")}
      options={reimbursementCurrencyOptions}
      value={reimbursementCurrencyCode}
      onChange={() => undefined}
      placeholder={indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code")}
      readOnly
      disabled
      allowTextInput={false}
      showSearchButton={false}
      showLabel
      selectedTextMode="value"
      dropdownMaxHeightClass="max-h-96"
      selectedIconClassName="h-6 w-6"
      optionIconClassName="h-6 w-6"
      selectedInputPaddingClassName="pl-12"
      containerClassName="space-y-1.5"
      labelClassName="form-label font-semibold inline-flex h-6 items-center leading-none"
      idBase="expense-header-local-currency-readonly"
      portalClassName="visitas-typography"
      panelClassName="visitas-typography"
    />
  );
};

export default ExpenseSheetHeaderCurrencySection;
