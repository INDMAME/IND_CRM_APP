// Formats a numeric amount using the provided currency code when possible.
export const formatAmountWithCurrency = (
  amount: number | null | undefined,
  currencyCode?: string,
  locale?: string
): string => {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return "-";
  }

  const safeLocale =
    locale ||
    (typeof document !== "undefined" && document.documentElement.lang
      ? document.documentElement.lang
      : "es-ES");
  const safeCurrency = String(currencyCode || "").trim().toUpperCase();

  if (safeCurrency) {
    try {
      return new Intl.NumberFormat(safeLocale, {
        style: "currency",
        currency: safeCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      // Fall through to decimal fallback when currency code is invalid.
    }
  }

  const decimalText = new Intl.NumberFormat(safeLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return safeCurrency ? `${decimalText} ${safeCurrency}` : decimalText;
};
