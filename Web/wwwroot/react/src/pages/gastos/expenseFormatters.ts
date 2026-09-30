import { formatCurrencyDisplayAmount } from "./constants/currencyDisplayRules.ts";
import { indFormat, indT } from "../../utils/indI18n.ts";
import { formatExpenseNumber } from "./utils/expenseNumberFormat.ts";

// Builds the shared currency-aware amount label used across expense details.
export const formatExpenseAmountLabel = (currencyCode?: string): string => {
  const safeCurrency = String(currencyCode || "").trim().toUpperCase() || "-";
  return `${indT("ExpenseSheets_Field_Amount", "Amount")} (${safeCurrency})`;
};

// Labels the expense amount in its original currency before conversion.
export const formatExpenseOriginalAmountLabel = (currencyCode?: string): string => {
  const safeCurrency = String(currencyCode || "").trim().toUpperCase() || "-";
  return `${indT("ExpenseSheets_Field_OriginalAmount", "Original amount")} (${safeCurrency})`;
};

// Labels the actual reimbursable amount in the company currency.
export const formatExpenseReimbursableAmountLabel = (currencyCode?: string): string => {
  const safeCurrency = String(currencyCode || "").trim().toUpperCase() || "-";
  return indFormat("ExpenseSheets_Field_ReimbursementAmount_WithCurrency", "Amount to reimburse ({0})", safeCurrency);
};

// Formats a numeric amount with fixed UI number style and optional currency code.
export const formatAmountWithCurrency = (
  amount: number | null | undefined,
  currencyCode?: string,
  _locale?: string
): string => {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return "-";
  }

  const safeCurrency = String(currencyCode || "").trim().toUpperCase();
  const decimalText = formatExpenseNumber(amount, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-",
  });

  return formatCurrencyDisplayAmount(decimalText, safeCurrency);
};
