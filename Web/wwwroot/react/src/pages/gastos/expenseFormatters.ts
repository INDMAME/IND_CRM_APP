import { formatCurrencyDisplayAmount } from "./constants/currencyDisplayRules.ts";
import { indT } from "../../utils/indI18n.ts";
import { formatExpenseNumber } from "./utils/expenseNumberFormat.ts";

// Builds the shared currency-aware amount label used across expense details.
export const formatExpenseAmountLabel = (currencyCode?: string): string => {
  const safeCurrency = String(currencyCode || "").trim().toUpperCase() || "-";
  return `${indT("ExpenseSheets_Field_Amount", "Amount")} (${safeCurrency})`;
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
