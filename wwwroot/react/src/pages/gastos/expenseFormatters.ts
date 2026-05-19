import { formatCurrencyDisplayAmount } from "./constants/currencyDisplayRules.ts";
import { formatExpenseNumber } from "./utils/expenseNumberFormat.ts";

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
