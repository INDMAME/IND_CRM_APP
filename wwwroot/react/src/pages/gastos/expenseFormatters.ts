import { formatExpenseNumber } from "./utils/expenseNumberFormat.ts";

const CURRENCY_SYMBOL_MAP: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  MXN: "MX$",
  BOB: "Bs",
  PEN: "S/",
  BRL: "R$",
  COP: "$",
  CLP: "$",
  ARS: "$",
};

const hasAlphabeticCurrencyCode = (value: string): boolean => {
  return /[A-Za-z]{3}/.test(value);
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

  if (safeCurrency) {
    const mappedSymbol = CURRENCY_SYMBOL_MAP[safeCurrency];
    if (mappedSymbol) {
      return `${mappedSymbol}${decimalText}`;
    }

    try {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: safeCurrency,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);

      if (!hasAlphabeticCurrencyCode(formatted)) {
        return formatted;
      }
    } catch {
      // Fall back to decimal + code when currency code is invalid.
    }
  }

  return safeCurrency ? `${decimalText} ${safeCurrency}` : decimalText;
};
