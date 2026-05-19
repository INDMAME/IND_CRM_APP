// Web/wwwroot/react/src/pages/gastos/constants/currencyCodes.ts
var expenseCurrencyCodes = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BOV",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHE",
  "CHF",
  "CHW",
  "CLF",
  "CLP",
  "CNY",
  "COP",
  "COU",
  "CRC",
  "CUC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MXV",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "USN",
  "UYI",
  "UYU",
  "UYW",
  "UZS",
  "VED",
  "VEF",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAD",
  "XAF",
  "XAG",
  "XAU",
  "XBA",
  "XBB",
  "XBC",
  "XBD",
  "XCD",
  "XCG",
  "XDR",
  "XOF",
  "XPD",
  "XPF",
  "XPT",
  "XSU",
  "XTS",
  "XUA",
  "XXX",
  "YER",
  "ZAR",
  "ZMW",
  "ZWG",
  "ZWL"
];
var expenseCurrencyOptions = expenseCurrencyCodes.map((code) => ({ value: code, text: code }));

// Web/wwwroot/react/src/pages/gastos/constants/currencyDisplayRules.ts
var CURRENCY_DISPLAY_RULES = Object.freeze({
  AED: { symbol: "AED", position: "prefix", space: true },
  AFN: { symbol: "AFN", position: "prefix", space: true },
  ALL: { symbol: "ALL", position: "prefix", space: true },
  AMD: { symbol: "AMD", position: "prefix", space: true },
  AOA: { symbol: "AOA", position: "prefix", space: true },
  ARS: { symbol: "ARS", position: "prefix", space: true },
  AUD: { symbol: "A$", position: "prefix", space: false },
  AWG: { symbol: "AWG", position: "prefix", space: true },
  AZN: { symbol: "AZN", position: "prefix", space: true },
  BAM: { symbol: "BAM", position: "prefix", space: true },
  BBD: { symbol: "BBD", position: "prefix", space: true },
  BDT: { symbol: "BDT", position: "prefix", space: true },
  BHD: { symbol: "BHD", position: "prefix", space: true },
  BIF: { symbol: "BIF", position: "prefix", space: true },
  BMD: { symbol: "BMD", position: "prefix", space: true },
  BND: { symbol: "BND", position: "prefix", space: true },
  BOB: { symbol: "BOB", position: "prefix", space: true },
  BOV: { symbol: "BOV", position: "prefix", space: true },
  BRL: { symbol: "R$", position: "prefix", space: false },
  BSD: { symbol: "BSD", position: "prefix", space: true },
  BTN: { symbol: "BTN", position: "prefix", space: true },
  BWP: { symbol: "BWP", position: "prefix", space: true },
  BYN: { symbol: "BYN", position: "prefix", space: true },
  BZD: { symbol: "BZD", position: "prefix", space: true },
  CAD: { symbol: "CA$", position: "prefix", space: false },
  CDF: { symbol: "CDF", position: "prefix", space: true },
  CHE: { symbol: "CHE", position: "prefix", space: true },
  CHF: { symbol: "CHF", position: "prefix", space: true },
  CHW: { symbol: "CHW", position: "prefix", space: true },
  CLF: { symbol: "CLF", position: "prefix", space: true },
  CLP: { symbol: "CLP", position: "prefix", space: true },
  CNY: { symbol: "CN\xA5", position: "prefix", space: false },
  COP: { symbol: "COP", position: "prefix", space: true },
  COU: { symbol: "COU", position: "prefix", space: true },
  CRC: { symbol: "CRC", position: "prefix", space: true },
  CUC: { symbol: "CUC", position: "prefix", space: true },
  CUP: { symbol: "CUP", position: "prefix", space: true },
  CVE: { symbol: "CVE", position: "prefix", space: true },
  CZK: { symbol: "CZK", position: "prefix", space: true },
  DJF: { symbol: "DJF", position: "prefix", space: true },
  DKK: { symbol: "DKK", position: "prefix", space: true },
  DOP: { symbol: "DOP", position: "prefix", space: true },
  DZD: { symbol: "DZD", position: "prefix", space: true },
  EGP: { symbol: "EGP", position: "prefix", space: true },
  ERN: { symbol: "ERN", position: "prefix", space: true },
  ETB: { symbol: "ETB", position: "prefix", space: true },
  EUR: { symbol: "\u20AC", position: "suffix", space: true },
  FJD: { symbol: "FJD", position: "prefix", space: true },
  FKP: { symbol: "FKP", position: "prefix", space: true },
  GBP: { symbol: "\xA3", position: "prefix", space: false },
  GEL: { symbol: "GEL", position: "prefix", space: true },
  GHS: { symbol: "GHS", position: "prefix", space: true },
  GIP: { symbol: "GIP", position: "prefix", space: true },
  GMD: { symbol: "GMD", position: "prefix", space: true },
  GNF: { symbol: "GNF", position: "prefix", space: true },
  GTQ: { symbol: "GTQ", position: "prefix", space: true },
  GYD: { symbol: "GYD", position: "prefix", space: true },
  HKD: { symbol: "HK$", position: "prefix", space: false },
  HNL: { symbol: "HNL", position: "prefix", space: true },
  HTG: { symbol: "HTG", position: "prefix", space: true },
  HUF: { symbol: "HUF", position: "prefix", space: true },
  IDR: { symbol: "IDR", position: "prefix", space: true },
  ILS: { symbol: "\u20AA", position: "prefix", space: false },
  INR: { symbol: "\u20B9", position: "prefix", space: false },
  IQD: { symbol: "IQD", position: "prefix", space: true },
  IRR: { symbol: "IRR", position: "prefix", space: true },
  ISK: { symbol: "ISK", position: "prefix", space: true },
  JMD: { symbol: "JMD", position: "prefix", space: true },
  JOD: { symbol: "JOD", position: "prefix", space: true },
  JPY: { symbol: "\xA5", position: "prefix", space: false },
  KES: { symbol: "KES", position: "prefix", space: true },
  KGS: { symbol: "KGS", position: "prefix", space: true },
  KHR: { symbol: "KHR", position: "prefix", space: true },
  KMF: { symbol: "KMF", position: "prefix", space: true },
  KPW: { symbol: "KPW", position: "prefix", space: true },
  KRW: { symbol: "\u20A9", position: "prefix", space: false },
  KWD: { symbol: "KWD", position: "prefix", space: true },
  KYD: { symbol: "KYD", position: "prefix", space: true },
  KZT: { symbol: "KZT", position: "prefix", space: true },
  LAK: { symbol: "LAK", position: "prefix", space: true },
  LBP: { symbol: "LBP", position: "prefix", space: true },
  LKR: { symbol: "LKR", position: "prefix", space: true },
  LRD: { symbol: "LRD", position: "prefix", space: true },
  LSL: { symbol: "LSL", position: "prefix", space: true },
  LYD: { symbol: "LYD", position: "prefix", space: true },
  MAD: { symbol: "MAD", position: "prefix", space: true },
  MDL: { symbol: "MDL", position: "prefix", space: true },
  MGA: { symbol: "MGA", position: "prefix", space: true },
  MKD: { symbol: "MKD", position: "prefix", space: true },
  MMK: { symbol: "MMK", position: "prefix", space: true },
  MNT: { symbol: "MNT", position: "prefix", space: true },
  MOP: { symbol: "MOP", position: "prefix", space: true },
  MRU: { symbol: "MRU", position: "prefix", space: true },
  MUR: { symbol: "MUR", position: "prefix", space: true },
  MVR: { symbol: "MVR", position: "prefix", space: true },
  MWK: { symbol: "MWK", position: "prefix", space: true },
  MXN: { symbol: "MX$", position: "prefix", space: false },
  MXV: { symbol: "MXV", position: "prefix", space: true },
  MYR: { symbol: "MYR", position: "prefix", space: true },
  MZN: { symbol: "MZN", position: "prefix", space: true },
  NAD: { symbol: "NAD", position: "prefix", space: true },
  NGN: { symbol: "NGN", position: "prefix", space: true },
  NIO: { symbol: "NIO", position: "prefix", space: true },
  NOK: { symbol: "NOK", position: "prefix", space: true },
  NPR: { symbol: "NPR", position: "prefix", space: true },
  NZD: { symbol: "NZ$", position: "prefix", space: false },
  OMR: { symbol: "OMR", position: "prefix", space: true },
  PAB: { symbol: "PAB", position: "prefix", space: true },
  PEN: { symbol: "PEN", position: "prefix", space: true },
  PGK: { symbol: "PGK", position: "prefix", space: true },
  PHP: { symbol: "\u20B1", position: "prefix", space: false },
  PKR: { symbol: "PKR", position: "prefix", space: true },
  PLN: { symbol: "PLN", position: "prefix", space: true },
  PYG: { symbol: "PYG", position: "prefix", space: true },
  QAR: { symbol: "QAR", position: "prefix", space: true },
  RON: { symbol: "RON", position: "prefix", space: true },
  RSD: { symbol: "RSD", position: "prefix", space: true },
  RUB: { symbol: "RUB", position: "prefix", space: true },
  RWF: { symbol: "RWF", position: "prefix", space: true },
  SAR: { symbol: "SAR", position: "prefix", space: true },
  SBD: { symbol: "SBD", position: "prefix", space: true },
  SCR: { symbol: "SCR", position: "prefix", space: true },
  SDG: { symbol: "SDG", position: "prefix", space: true },
  SEK: { symbol: "SEK", position: "prefix", space: true },
  SGD: { symbol: "SGD", position: "prefix", space: true },
  SHP: { symbol: "SHP", position: "prefix", space: true },
  SLE: { symbol: "SLE", position: "prefix", space: true },
  SOS: { symbol: "SOS", position: "prefix", space: true },
  SRD: { symbol: "SRD", position: "prefix", space: true },
  SSP: { symbol: "SSP", position: "prefix", space: true },
  STN: { symbol: "STN", position: "prefix", space: true },
  SVC: { symbol: "SVC", position: "prefix", space: true },
  SYP: { symbol: "SYP", position: "prefix", space: true },
  SZL: { symbol: "SZL", position: "prefix", space: true },
  THB: { symbol: "THB", position: "prefix", space: true },
  TJS: { symbol: "TJS", position: "prefix", space: true },
  TMT: { symbol: "TMT", position: "prefix", space: true },
  TND: { symbol: "TND", position: "prefix", space: true },
  TOP: { symbol: "TOP", position: "prefix", space: true },
  TRY: { symbol: "TRY", position: "prefix", space: true },
  TTD: { symbol: "TTD", position: "prefix", space: true },
  TWD: { symbol: "NT$", position: "prefix", space: false },
  TZS: { symbol: "TZS", position: "prefix", space: true },
  UAH: { symbol: "UAH", position: "prefix", space: true },
  UGX: { symbol: "UGX", position: "prefix", space: true },
  USD: { symbol: "$", position: "prefix", space: false },
  USN: { symbol: "USN", position: "prefix", space: true },
  UYI: { symbol: "UYI", position: "prefix", space: true },
  UYU: { symbol: "UYU", position: "prefix", space: true },
  UYW: { symbol: "UYW", position: "prefix", space: true },
  UZS: { symbol: "UZS", position: "prefix", space: true },
  VED: { symbol: "VED", position: "prefix", space: true },
  VEF: { symbol: "VEF", position: "prefix", space: true },
  VES: { symbol: "VES", position: "prefix", space: true },
  VND: { symbol: "\u20AB", position: "prefix", space: false },
  VUV: { symbol: "VUV", position: "prefix", space: true },
  WST: { symbol: "WST", position: "prefix", space: true },
  XAD: { symbol: "XAD", position: "prefix", space: true },
  XAF: { symbol: "FCFA", position: "prefix", space: true },
  XAG: { symbol: "XAG", position: "prefix", space: true },
  XAU: { symbol: "XAU", position: "prefix", space: true },
  XBA: { symbol: "XBA", position: "prefix", space: true },
  XBB: { symbol: "XBB", position: "prefix", space: true },
  XBC: { symbol: "XBC", position: "prefix", space: true },
  XBD: { symbol: "XBD", position: "prefix", space: true },
  XCD: { symbol: "EC$", position: "prefix", space: false },
  XCG: { symbol: "Cg.", position: "prefix", space: true },
  XDR: { symbol: "XDR", position: "prefix", space: true },
  XOF: { symbol: "F\u202FCFA", position: "prefix", space: true },
  XPD: { symbol: "XPD", position: "prefix", space: true },
  XPF: { symbol: "CFPF", position: "prefix", space: true },
  XPT: { symbol: "XPT", position: "prefix", space: true },
  XSU: { symbol: "XSU", position: "prefix", space: true },
  XTS: { symbol: "XTS", position: "prefix", space: true },
  XUA: { symbol: "XUA", position: "prefix", space: true },
  XXX: { symbol: "\xA4", position: "prefix", space: false },
  YER: { symbol: "YER", position: "prefix", space: true },
  ZAR: { symbol: "ZAR", position: "prefix", space: true },
  ZMW: { symbol: "ZMW", position: "prefix", space: true },
  ZWG: { symbol: "ZWG", position: "prefix", space: true },
  ZWL: { symbol: "ZWL", position: "prefix", space: true }
});
var CURRENCY_CODE_SET = new Set(expenseCurrencyCodes);
var normalizeCurrencyCode = (currencyCode) => {
  return String(currencyCode || "").trim().toUpperCase();
};
var resolveCurrencyDisplayRule = (currencyCode) => {
  const normalizedCurrencyCode = normalizeCurrencyCode(currencyCode);
  if (!normalizedCurrencyCode || !CURRENCY_CODE_SET.has(normalizedCurrencyCode)) {
    return null;
  }
  return CURRENCY_DISPLAY_RULES[normalizedCurrencyCode] ?? {
    symbol: normalizedCurrencyCode,
    position: "suffix",
    space: true
  };
};
var formatCurrencyDisplayAmount = (amountText, currencyCode) => {
  const safeAmountText = amountText || "-";
  const normalizedCurrencyCode = normalizeCurrencyCode(currencyCode);
  const displayRule = resolveCurrencyDisplayRule(normalizedCurrencyCode);
  if (!displayRule) {
    return normalizedCurrencyCode ? `${safeAmountText} ${normalizedCurrencyCode}` : safeAmountText;
  }
  const separator = displayRule.space ? " " : "";
  return displayRule.position === "prefix" ? `${displayRule.symbol}${separator}${safeAmountText}` : `${safeAmountText}${separator}${displayRule.symbol}`;
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseNumberFormat.ts
var EXPENSE_NUMBER_LOCALE = "en-US";
var sanitizeNumericToken = (value) => {
  return value.replace(/[^\d.,+-]/g, "");
};
var isThousandsGroupedInteger = (value, separator) => {
  const parts = value.split(separator);
  if (parts.length <= 1) return false;
  if (parts.some((part) => !/^\d+$/.test(part))) return false;
  if (parts[0].length < 1 || parts[0].length > 3) return false;
  return parts.slice(1).every((part) => part.length === 3);
};
var parseExpenseNumericInput = (raw) => {
  if (raw === null || raw === void 0) return null;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  let value = sanitizeNumericToken(String(raw || "").trim().replace(/\s+/g, ""));
  if (!value) return null;
  let sign = "";
  if (value.startsWith("-")) {
    sign = "-";
    value = value.slice(1);
  } else if (value.startsWith("+")) {
    value = value.slice(1);
  }
  value = value.replace(/[+-]/g, "");
  if (!value) return null;
  const hasComma = value.includes(",");
  const hasDot = value.includes(".");
  if (hasComma && !hasDot && isThousandsGroupedInteger(value, ",")) {
    const parsedInteger = Number(`${sign}${value.replace(/,/g, "")}`);
    return Number.isFinite(parsedInteger) ? parsedInteger : null;
  }
  if (hasDot && !hasComma && isThousandsGroupedInteger(value, ".")) {
    const parsedInteger = Number(`${sign}${value.replace(/\./g, "")}`);
    return Number.isFinite(parsedInteger) ? parsedInteger : null;
  }
  const lastComma = value.lastIndexOf(",");
  const lastDot = value.lastIndexOf(".");
  const decimalSeparatorIndex = Math.max(lastComma, lastDot);
  let normalized;
  if (decimalSeparatorIndex >= 0) {
    const integerPart = value.slice(0, decimalSeparatorIndex).replace(/[.,]/g, "");
    const decimalPart = value.slice(decimalSeparatorIndex + 1).replace(/[.,]/g, "");
    normalized = `${sign}${integerPart || "0"}${decimalPart ? `.${decimalPart}` : ""}`;
  } else {
    normalized = `${sign}${value.replace(/[.,]/g, "")}`;
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};
var formatExpenseNumber = (value, options) => {
  const fallback = options?.fallback ?? "-";
  if (value === null || value === void 0 || Number.isNaN(Number(value))) {
    return fallback;
  }
  return new Intl.NumberFormat(EXPENSE_NUMBER_LOCALE, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    useGrouping: options?.useGrouping ?? true
  }).format(Number(value));
};
var formatExpenseInputNumber = (raw, options) => {
  const parsed = parseExpenseNumericInput(raw);
  if (parsed === null) {
    return options?.fallback ?? "";
  }
  return formatExpenseNumber(parsed, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    useGrouping: options?.useGrouping ?? true,
    fallback: options?.fallback ?? ""
  });
};

// Web/wwwroot/react/src/pages/gastos/expenseFormatters.ts
var formatAmountWithCurrency = (amount, currencyCode, _locale) => {
  if (amount === null || amount === void 0 || Number.isNaN(Number(amount))) {
    return "-";
  }
  const safeCurrency = String(currencyCode || "").trim().toUpperCase();
  const decimalText = formatExpenseNumber(amount, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-"
  });
  return formatCurrencyDisplayAmount(decimalText, safeCurrency);
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseNavigation.ts
var setExpenseNavigationGuard = (activeOrOptions, message) => {
  window.__indSetNavigationGuard?.(activeOrOptions, message);
};
var clearExpenseNavigationGuard = () => {
  window.__indClearNavigationGuard?.();
};
var runGuardedNavigation = (action, options = {}) => {
  const { askConfirmation = false, message } = options;
  if (askConfirmation && typeof window.__indRequestNavigation === "function") {
    window.__indRequestNavigation(action, message);
    return;
  }
  action();
};
var navigateToExpenseUrl = (targetUrl, options = {}) => {
  const safeUrl = String(targetUrl || "").trim();
  if (!safeUrl) return;
  const { bypassGuardOnce = true } = options;
  runGuardedNavigation(() => {
    if (bypassGuardOnce) {
      window.__indBypassNavigationGuardOnce?.();
    }
    window.location.href = safeUrl;
  }, options);
};
var reloadExpensePage = (options = {}) => {
  const { bypassGuardOnce = true } = options;
  if (bypassGuardOnce) {
    window.__indBypassNavigationGuardOnce?.();
  }
  window.location.reload();
};

export {
  parseExpenseNumericInput,
  formatExpenseNumber,
  formatExpenseInputNumber,
  formatAmountWithCurrency,
  setExpenseNavigationGuard,
  clearExpenseNavigationGuard,
  navigateToExpenseUrl,
  reloadExpensePage
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvY3VycmVuY3lDb2Rlcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9jdXJyZW5jeURpc3BsYXlSdWxlcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9leHBlbnNlRm9ybWF0dGVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBGaXhlZCBJU08tbGlrZSBjdXJyZW5jeSBjb2RlIGxpc3QgZm9yIEV4cGVuc2UgU2hlZXRzIGZpbHRlcnMuXG4vLyBTb3VyY2U6IFNJWCBJU08gNDIxNyBMaXN0IE9uZSBYTUwsIG9mZmljaWFsIElTTyBtYWludGVuYW5jZSBhZ2VuY3kuXG4vLyBSZXRyaWV2ZWQgMjAyNi0wNS0xOSBmcm9tIGh0dHBzOi8vd3d3LnNpeC1ncm91cC5jb20vZGFtL2Rvd25sb2FkL2ZpbmFuY2lhbC1pbmZvcm1hdGlvbi9kYXRhLWNlbnRlci9pc28tY3VycnJlbmN5L2xpc3RzL2xpc3Qtb25lLnhtbC5cbmV4cG9ydCBjb25zdCBleHBlbnNlQ3VycmVuY3lDb2Rlczogc3RyaW5nW10gPSBbXG4gIFwiQUVEXCIsXG4gIFwiQUZOXCIsXG4gIFwiQUxMXCIsXG4gIFwiQU1EXCIsXG4gIFwiQU9BXCIsXG4gIFwiQVJTXCIsXG4gIFwiQVVEXCIsXG4gIFwiQVdHXCIsXG4gIFwiQVpOXCIsXG4gIFwiQkFNXCIsXG4gIFwiQkJEXCIsXG4gIFwiQkRUXCIsXG4gIFwiQkhEXCIsXG4gIFwiQklGXCIsXG4gIFwiQk1EXCIsXG4gIFwiQk5EXCIsXG4gIFwiQk9CXCIsXG4gIFwiQk9WXCIsXG4gIFwiQlJMXCIsXG4gIFwiQlNEXCIsXG4gIFwiQlROXCIsXG4gIFwiQldQXCIsXG4gIFwiQllOXCIsXG4gIFwiQlpEXCIsXG4gIFwiQ0FEXCIsXG4gIFwiQ0RGXCIsXG4gIFwiQ0hFXCIsXG4gIFwiQ0hGXCIsXG4gIFwiQ0hXXCIsXG4gIFwiQ0xGXCIsXG4gIFwiQ0xQXCIsXG4gIFwiQ05ZXCIsXG4gIFwiQ09QXCIsXG4gIFwiQ09VXCIsXG4gIFwiQ1JDXCIsXG4gIFwiQ1VDXCIsXG4gIFwiQ1VQXCIsXG4gIFwiQ1ZFXCIsXG4gIFwiQ1pLXCIsXG4gIFwiREpGXCIsXG4gIFwiREtLXCIsXG4gIFwiRE9QXCIsXG4gIFwiRFpEXCIsXG4gIFwiRUdQXCIsXG4gIFwiRVJOXCIsXG4gIFwiRVRCXCIsXG4gIFwiRVVSXCIsXG4gIFwiRkpEXCIsXG4gIFwiRktQXCIsXG4gIFwiR0JQXCIsXG4gIFwiR0VMXCIsXG4gIFwiR0hTXCIsXG4gIFwiR0lQXCIsXG4gIFwiR01EXCIsXG4gIFwiR05GXCIsXG4gIFwiR1RRXCIsXG4gIFwiR1lEXCIsXG4gIFwiSEtEXCIsXG4gIFwiSE5MXCIsXG4gIFwiSFRHXCIsXG4gIFwiSFVGXCIsXG4gIFwiSURSXCIsXG4gIFwiSUxTXCIsXG4gIFwiSU5SXCIsXG4gIFwiSVFEXCIsXG4gIFwiSVJSXCIsXG4gIFwiSVNLXCIsXG4gIFwiSk1EXCIsXG4gIFwiSk9EXCIsXG4gIFwiSlBZXCIsXG4gIFwiS0VTXCIsXG4gIFwiS0dTXCIsXG4gIFwiS0hSXCIsXG4gIFwiS01GXCIsXG4gIFwiS1BXXCIsXG4gIFwiS1JXXCIsXG4gIFwiS1dEXCIsXG4gIFwiS1lEXCIsXG4gIFwiS1pUXCIsXG4gIFwiTEFLXCIsXG4gIFwiTEJQXCIsXG4gIFwiTEtSXCIsXG4gIFwiTFJEXCIsXG4gIFwiTFNMXCIsXG4gIFwiTFlEXCIsXG4gIFwiTUFEXCIsXG4gIFwiTURMXCIsXG4gIFwiTUdBXCIsXG4gIFwiTUtEXCIsXG4gIFwiTU1LXCIsXG4gIFwiTU5UXCIsXG4gIFwiTU9QXCIsXG4gIFwiTVJVXCIsXG4gIFwiTVVSXCIsXG4gIFwiTVZSXCIsXG4gIFwiTVdLXCIsXG4gIFwiTVhOXCIsXG4gIFwiTVhWXCIsXG4gIFwiTVlSXCIsXG4gIFwiTVpOXCIsXG4gIFwiTkFEXCIsXG4gIFwiTkdOXCIsXG4gIFwiTklPXCIsXG4gIFwiTk9LXCIsXG4gIFwiTlBSXCIsXG4gIFwiTlpEXCIsXG4gIFwiT01SXCIsXG4gIFwiUEFCXCIsXG4gIFwiUEVOXCIsXG4gIFwiUEdLXCIsXG4gIFwiUEhQXCIsXG4gIFwiUEtSXCIsXG4gIFwiUExOXCIsXG4gIFwiUFlHXCIsXG4gIFwiUUFSXCIsXG4gIFwiUk9OXCIsXG4gIFwiUlNEXCIsXG4gIFwiUlVCXCIsXG4gIFwiUldGXCIsXG4gIFwiU0FSXCIsXG4gIFwiU0JEXCIsXG4gIFwiU0NSXCIsXG4gIFwiU0RHXCIsXG4gIFwiU0VLXCIsXG4gIFwiU0dEXCIsXG4gIFwiU0hQXCIsXG4gIFwiU0xFXCIsXG4gIFwiU09TXCIsXG4gIFwiU1JEXCIsXG4gIFwiU1NQXCIsXG4gIFwiU1ROXCIsXG4gIFwiU1ZDXCIsXG4gIFwiU1lQXCIsXG4gIFwiU1pMXCIsXG4gIFwiVEhCXCIsXG4gIFwiVEpTXCIsXG4gIFwiVE1UXCIsXG4gIFwiVE5EXCIsXG4gIFwiVE9QXCIsXG4gIFwiVFJZXCIsXG4gIFwiVFREXCIsXG4gIFwiVFdEXCIsXG4gIFwiVFpTXCIsXG4gIFwiVUFIXCIsXG4gIFwiVUdYXCIsXG4gIFwiVVNEXCIsXG4gIFwiVVNOXCIsXG4gIFwiVVlJXCIsXG4gIFwiVVlVXCIsXG4gIFwiVVlXXCIsXG4gIFwiVVpTXCIsXG4gIFwiVkVEXCIsXG4gIFwiVkVGXCIsXG4gIFwiVkVTXCIsXG4gIFwiVk5EXCIsXG4gIFwiVlVWXCIsXG4gIFwiV1NUXCIsXG4gIFwiWEFEXCIsXG4gIFwiWEFGXCIsXG4gIFwiWEFHXCIsXG4gIFwiWEFVXCIsXG4gIFwiWEJBXCIsXG4gIFwiWEJCXCIsXG4gIFwiWEJDXCIsXG4gIFwiWEJEXCIsXG4gIFwiWENEXCIsXG4gIFwiWENHXCIsXG4gIFwiWERSXCIsXG4gIFwiWE9GXCIsXG4gIFwiWFBEXCIsXG4gIFwiWFBGXCIsXG4gIFwiWFBUXCIsXG4gIFwiWFNVXCIsXG4gIFwiWFRTXCIsXG4gIFwiWFVBXCIsXG4gIFwiWFhYXCIsXG4gIFwiWUVSXCIsXG4gIFwiWkFSXCIsXG4gIFwiWk1XXCIsXG4gIFwiWldHXCIsXG4gIFwiWldMXCIsXG5dO1xuXG5leHBvcnQgY29uc3QgZXhwZW5zZUN1cnJlbmN5T3B0aW9ucyA9IGV4cGVuc2VDdXJyZW5jeUNvZGVzLm1hcCgoY29kZSkgPT4gKHsgdmFsdWU6IGNvZGUsIHRleHQ6IGNvZGUgfSkpO1xuIiwgImltcG9ydCB7IGV4cGVuc2VDdXJyZW5jeUNvZGVzIH0gZnJvbSBcIi4vY3VycmVuY3lDb2Rlcy50c1wiO1xuXG5leHBvcnQgdHlwZSBDdXJyZW5jeVN5bWJvbFBvc2l0aW9uID0gXCJwcmVmaXhcIiB8IFwic3VmZml4XCI7XG5cbmV4cG9ydCB0eXBlIEN1cnJlbmN5RGlzcGxheVJ1bGUgPSB7XG4gIHN5bWJvbDogc3RyaW5nO1xuICBwb3NpdGlvbjogQ3VycmVuY3lTeW1ib2xQb3NpdGlvbjtcbiAgc3BhY2U6IGJvb2xlYW47XG59O1xuXG4vLyBGaXhlZCBjdXJyZW5jeSBkaXNwbGF5IHJ1bGVzIGZvciBleHBlbnNlIGFtb3VudCBsYWJlbHMuXG4vLyBCYXNlbGluZSBnZW5lcmF0ZWQgZnJvbSBDTERSLWJhY2tlZCBJbnRsIGN1cnJlbmN5IHBhcnRzIHdpdGggdGhlIGFwcCdzIEVVUiBzdWZmaXggb3ZlcnJpZGUuXG5leHBvcnQgY29uc3QgQ1VSUkVOQ1lfRElTUExBWV9SVUxFUzogUmVhZG9ubHk8UmVjb3JkPHN0cmluZywgQ3VycmVuY3lEaXNwbGF5UnVsZT4+ID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEFFRDogeyBzeW1ib2w6IFwiQUVEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBBRk46IHsgc3ltYm9sOiBcIkFGTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQUxMOiB7IHN5bWJvbDogXCJBTExcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEFNRDogeyBzeW1ib2w6IFwiQU1EXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBBT0E6IHsgc3ltYm9sOiBcIkFPQVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQVJTOiB7IHN5bWJvbDogXCJBUlNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEFVRDogeyBzeW1ib2w6IFwiQSRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBBV0c6IHsgc3ltYm9sOiBcIkFXR1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQVpOOiB7IHN5bWJvbDogXCJBWk5cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJBTTogeyBzeW1ib2w6IFwiQkFNXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCQkQ6IHsgc3ltYm9sOiBcIkJCRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQkRUOiB7IHN5bWJvbDogXCJCRFRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJIRDogeyBzeW1ib2w6IFwiQkhEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCSUY6IHsgc3ltYm9sOiBcIkJJRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQk1EOiB7IHN5bWJvbDogXCJCTURcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJORDogeyBzeW1ib2w6IFwiQk5EXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCT0I6IHsgc3ltYm9sOiBcIkJPQlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQk9WOiB7IHN5bWJvbDogXCJCT1ZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJSTDogeyBzeW1ib2w6IFwiUiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBCU0Q6IHsgc3ltYm9sOiBcIkJTRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQlROOiB7IHN5bWJvbDogXCJCVE5cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJXUDogeyBzeW1ib2w6IFwiQldQXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCWU46IHsgc3ltYm9sOiBcIkJZTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQlpEOiB7IHN5bWJvbDogXCJCWkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENBRDogeyBzeW1ib2w6IFwiQ0EkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgQ0RGOiB7IHN5bWJvbDogXCJDREZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENIRTogeyBzeW1ib2w6IFwiQ0hFXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDSEY6IHsgc3ltYm9sOiBcIkNIRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ0hXOiB7IHN5bWJvbDogXCJDSFdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENMRjogeyBzeW1ib2w6IFwiQ0xGXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDTFA6IHsgc3ltYm9sOiBcIkNMUFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ05ZOiB7IHN5bWJvbDogXCJDTlxcdTAwYTVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBDT1A6IHsgc3ltYm9sOiBcIkNPUFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ09VOiB7IHN5bWJvbDogXCJDT1VcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENSQzogeyBzeW1ib2w6IFwiQ1JDXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDVUM6IHsgc3ltYm9sOiBcIkNVQ1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ1VQOiB7IHN5bWJvbDogXCJDVVBcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENWRTogeyBzeW1ib2w6IFwiQ1ZFXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDWks6IHsgc3ltYm9sOiBcIkNaS1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgREpGOiB7IHN5bWJvbDogXCJESkZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIERLSzogeyBzeW1ib2w6IFwiREtLXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBET1A6IHsgc3ltYm9sOiBcIkRPUFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgRFpEOiB7IHN5bWJvbDogXCJEWkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEVHUDogeyBzeW1ib2w6IFwiRUdQXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBFUk46IHsgc3ltYm9sOiBcIkVSTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgRVRCOiB7IHN5bWJvbDogXCJFVEJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEVVUjogeyBzeW1ib2w6IFwiXFx1MjBhY1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgRkpEOiB7IHN5bWJvbDogXCJGSkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEZLUDogeyBzeW1ib2w6IFwiRktQXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBHQlA6IHsgc3ltYm9sOiBcIlxcdTAwYTNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBHRUw6IHsgc3ltYm9sOiBcIkdFTFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgR0hTOiB7IHN5bWJvbDogXCJHSFNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEdJUDogeyBzeW1ib2w6IFwiR0lQXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBHTUQ6IHsgc3ltYm9sOiBcIkdNRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgR05GOiB7IHN5bWJvbDogXCJHTkZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEdUUTogeyBzeW1ib2w6IFwiR1RRXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBHWUQ6IHsgc3ltYm9sOiBcIkdZRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSEtEOiB7IHN5bWJvbDogXCJISyRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBITkw6IHsgc3ltYm9sOiBcIkhOTFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSFRHOiB7IHN5bWJvbDogXCJIVEdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEhVRjogeyBzeW1ib2w6IFwiSFVGXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBJRFI6IHsgc3ltYm9sOiBcIklEUlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSUxTOiB7IHN5bWJvbDogXCJcXHUyMGFhXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgSU5SOiB7IHN5bWJvbDogXCJcXHUyMGI5XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgSVFEOiB7IHN5bWJvbDogXCJJUURcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIElSUjogeyBzeW1ib2w6IFwiSVJSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBJU0s6IHsgc3ltYm9sOiBcIklTS1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSk1EOiB7IHN5bWJvbDogXCJKTURcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEpPRDogeyBzeW1ib2w6IFwiSk9EXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBKUFk6IHsgc3ltYm9sOiBcIlxcdTAwYTVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBLRVM6IHsgc3ltYm9sOiBcIktFU1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgS0dTOiB7IHN5bWJvbDogXCJLR1NcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEtIUjogeyBzeW1ib2w6IFwiS0hSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBLTUY6IHsgc3ltYm9sOiBcIktNRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgS1BXOiB7IHN5bWJvbDogXCJLUFdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEtSVzogeyBzeW1ib2w6IFwiXFx1MjBhOVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEtXRDogeyBzeW1ib2w6IFwiS1dEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBLWUQ6IHsgc3ltYm9sOiBcIktZRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgS1pUOiB7IHN5bWJvbDogXCJLWlRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIExBSzogeyBzeW1ib2w6IFwiTEFLXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBMQlA6IHsgc3ltYm9sOiBcIkxCUFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTEtSOiB7IHN5bWJvbDogXCJMS1JcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIExSRDogeyBzeW1ib2w6IFwiTFJEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBMU0w6IHsgc3ltYm9sOiBcIkxTTFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTFlEOiB7IHN5bWJvbDogXCJMWURcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1BRDogeyBzeW1ib2w6IFwiTUFEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNREw6IHsgc3ltYm9sOiBcIk1ETFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTUdBOiB7IHN5bWJvbDogXCJNR0FcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1LRDogeyBzeW1ib2w6IFwiTUtEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNTUs6IHsgc3ltYm9sOiBcIk1NS1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTU5UOiB7IHN5bWJvbDogXCJNTlRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1PUDogeyBzeW1ib2w6IFwiTU9QXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNUlU6IHsgc3ltYm9sOiBcIk1SVVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTVVSOiB7IHN5bWJvbDogXCJNVVJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1WUjogeyBzeW1ib2w6IFwiTVZSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNV0s6IHsgc3ltYm9sOiBcIk1XS1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTVhOOiB7IHN5bWJvbDogXCJNWCRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBNWFY6IHsgc3ltYm9sOiBcIk1YVlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTVlSOiB7IHN5bWJvbDogXCJNWVJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1aTjogeyBzeW1ib2w6IFwiTVpOXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBOQUQ6IHsgc3ltYm9sOiBcIk5BRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTkdOOiB7IHN5bWJvbDogXCJOR05cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE5JTzogeyBzeW1ib2w6IFwiTklPXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBOT0s6IHsgc3ltYm9sOiBcIk5PS1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTlBSOiB7IHN5bWJvbDogXCJOUFJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE5aRDogeyBzeW1ib2w6IFwiTlokXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgT01SOiB7IHN5bWJvbDogXCJPTVJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFBBQjogeyBzeW1ib2w6IFwiUEFCXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBQRU46IHsgc3ltYm9sOiBcIlBFTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUEdLOiB7IHN5bWJvbDogXCJQR0tcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFBIUDogeyBzeW1ib2w6IFwiXFx1MjBiMVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFBLUjogeyBzeW1ib2w6IFwiUEtSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBQTE46IHsgc3ltYm9sOiBcIlBMTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUFlHOiB7IHN5bWJvbDogXCJQWUdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFFBUjogeyBzeW1ib2w6IFwiUUFSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBST046IHsgc3ltYm9sOiBcIlJPTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUlNEOiB7IHN5bWJvbDogXCJSU0RcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFJVQjogeyBzeW1ib2w6IFwiUlVCXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBSV0Y6IHsgc3ltYm9sOiBcIlJXRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU0FSOiB7IHN5bWJvbDogXCJTQVJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNCRDogeyBzeW1ib2w6IFwiU0JEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTQ1I6IHsgc3ltYm9sOiBcIlNDUlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU0RHOiB7IHN5bWJvbDogXCJTREdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNFSzogeyBzeW1ib2w6IFwiU0VLXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTR0Q6IHsgc3ltYm9sOiBcIlNHRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU0hQOiB7IHN5bWJvbDogXCJTSFBcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNMRTogeyBzeW1ib2w6IFwiU0xFXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTT1M6IHsgc3ltYm9sOiBcIlNPU1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU1JEOiB7IHN5bWJvbDogXCJTUkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNTUDogeyBzeW1ib2w6IFwiU1NQXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTVE46IHsgc3ltYm9sOiBcIlNUTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU1ZDOiB7IHN5bWJvbDogXCJTVkNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNZUDogeyBzeW1ib2w6IFwiU1lQXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTWkw6IHsgc3ltYm9sOiBcIlNaTFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVEhCOiB7IHN5bWJvbDogXCJUSEJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFRKUzogeyBzeW1ib2w6IFwiVEpTXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBUTVQ6IHsgc3ltYm9sOiBcIlRNVFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVE5EOiB7IHN5bWJvbDogXCJUTkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFRPUDogeyBzeW1ib2w6IFwiVE9QXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBUUlk6IHsgc3ltYm9sOiBcIlRSWVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVFREOiB7IHN5bWJvbDogXCJUVERcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFRXRDogeyBzeW1ib2w6IFwiTlQkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgVFpTOiB7IHN5bWJvbDogXCJUWlNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFVBSDogeyBzeW1ib2w6IFwiVUFIXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBVR1g6IHsgc3ltYm9sOiBcIlVHWFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVVNEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgVVNOOiB7IHN5bWJvbDogXCJVU05cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFVZSTogeyBzeW1ib2w6IFwiVVlJXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBVWVU6IHsgc3ltYm9sOiBcIlVZVVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVVlXOiB7IHN5bWJvbDogXCJVWVdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFVaUzogeyBzeW1ib2w6IFwiVVpTXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBWRUQ6IHsgc3ltYm9sOiBcIlZFRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVkVGOiB7IHN5bWJvbDogXCJWRUZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFZFUzogeyBzeW1ib2w6IFwiVkVTXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBWTkQ6IHsgc3ltYm9sOiBcIlxcdTIwYWJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBWVVY6IHsgc3ltYm9sOiBcIlZVVlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgV1NUOiB7IHN5bWJvbDogXCJXU1RcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhBRDogeyBzeW1ib2w6IFwiWEFEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYQUY6IHsgc3ltYm9sOiBcIkZDRkFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhBRzogeyBzeW1ib2w6IFwiWEFHXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYQVU6IHsgc3ltYm9sOiBcIlhBVVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWEJBOiB7IHN5bWJvbDogXCJYQkFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhCQjogeyBzeW1ib2w6IFwiWEJCXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYQkM6IHsgc3ltYm9sOiBcIlhCQ1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWEJEOiB7IHN5bWJvbDogXCJYQkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhDRDogeyBzeW1ib2w6IFwiRUMkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgWENHOiB7IHN5bWJvbDogXCJDZy5cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhEUjogeyBzeW1ib2w6IFwiWERSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYT0Y6IHsgc3ltYm9sOiBcIkZcXHUyMDJmQ0ZBXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYUEQ6IHsgc3ltYm9sOiBcIlhQRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFBGOiB7IHN5bWJvbDogXCJDRlBGXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYUFQ6IHsgc3ltYm9sOiBcIlhQVFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFNVOiB7IHN5bWJvbDogXCJYU1VcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhUUzogeyBzeW1ib2w6IFwiWFRTXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYVUE6IHsgc3ltYm9sOiBcIlhVQVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFhYOiB7IHN5bWJvbDogXCJcXHUwMGE0XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgWUVSOiB7IHN5bWJvbDogXCJZRVJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFpBUjogeyBzeW1ib2w6IFwiWkFSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBaTVc6IHsgc3ltYm9sOiBcIlpNV1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWldHOiB7IHN5bWJvbDogXCJaV0dcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFpXTDogeyBzeW1ib2w6IFwiWldMXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxufSk7XG5cbmNvbnN0IENVUlJFTkNZX0NPREVfU0VUID0gbmV3IFNldChleHBlbnNlQ3VycmVuY3lDb2Rlcyk7XG5cbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9IChjdXJyZW5jeUNvZGU/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKGN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbi8vIFJlc29sdmVzIHRoZSBmaXhlZCBkaXNwbGF5IHJ1bGUgZm9yIGEga25vd24gZXhwZW5zZSBjdXJyZW5jeSBjb2RlLlxuZXhwb3J0IGNvbnN0IHJlc29sdmVDdXJyZW5jeURpc3BsYXlSdWxlID0gKGN1cnJlbmN5Q29kZT86IHN0cmluZyk6IEN1cnJlbmN5RGlzcGxheVJ1bGUgfCBudWxsID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUgfHwgIUNVUlJFTkNZX0NPREVfU0VULmhhcyhub3JtYWxpemVkQ3VycmVuY3lDb2RlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIENVUlJFTkNZX0RJU1BMQVlfUlVMRVNbbm9ybWFsaXplZEN1cnJlbmN5Q29kZV0gPz8ge1xuICAgIHN5bWJvbDogbm9ybWFsaXplZEN1cnJlbmN5Q29kZSxcbiAgICBwb3NpdGlvbjogXCJzdWZmaXhcIixcbiAgICBzcGFjZTogdHJ1ZSxcbiAgfTtcbn07XG5cbi8vIEFwcGxpZXMgYSByZXNvbHZlZCBjdXJyZW5jeSBkaXNwbGF5IHJ1bGUgd2l0aG91dCBjaGFuZ2luZyB0aGUgbnVtZXJpYyB0ZXh0LlxuZXhwb3J0IGNvbnN0IGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudCA9IChhbW91bnRUZXh0OiBzdHJpbmcsIGN1cnJlbmN5Q29kZT86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNhZmVBbW91bnRUZXh0ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBkaXNwbGF5UnVsZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlSdWxlKG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUpO1xuXG4gIGlmICghZGlzcGxheVJ1bGUpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA/IGAke3NhZmVBbW91bnRUZXh0fSAke25vcm1hbGl6ZWRDdXJyZW5jeUNvZGV9YCA6IHNhZmVBbW91bnRUZXh0O1xuICB9XG5cbiAgY29uc3Qgc2VwYXJhdG9yID0gZGlzcGxheVJ1bGUuc3BhY2UgPyBcIiBcIiA6IFwiXCI7XG4gIHJldHVybiBkaXNwbGF5UnVsZS5wb3NpdGlvbiA9PT0gXCJwcmVmaXhcIlxuICAgID8gYCR7ZGlzcGxheVJ1bGUuc3ltYm9sfSR7c2VwYXJhdG9yfSR7c2FmZUFtb3VudFRleHR9YFxuICAgIDogYCR7c2FmZUFtb3VudFRleHR9JHtzZXBhcmF0b3J9JHtkaXNwbGF5UnVsZS5zeW1ib2x9YDtcbn07XG4iLCAiY29uc3QgRVhQRU5TRV9OVU1CRVJfTE9DQUxFID0gXCJlbi1VU1wiO1xyXG5cclxudHlwZSBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9ucyA9IHtcclxuICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM/OiBudW1iZXI7XHJcbiAgbWF4aW11bUZyYWN0aW9uRGlnaXRzPzogbnVtYmVyO1xyXG4gIHVzZUdyb3VwaW5nPzogYm9vbGVhbjtcclxuICBmYWxsYmFjaz86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IHNhbml0aXplTnVtZXJpY1Rva2VuID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXlxcZC4sKy1dL2csIFwiXCIpO1xyXG59O1xyXG5cclxuY29uc3QgaXNUaG91c2FuZHNHcm91cGVkSW50ZWdlciA9ICh2YWx1ZTogc3RyaW5nLCBzZXBhcmF0b3I6IFwiLFwiIHwgXCIuXCIpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KHNlcGFyYXRvcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCA8PSAxKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKHBhcnRzLnNvbWUoKHBhcnQpID0+ICEvXlxcZCskLy50ZXN0KHBhcnQpKSkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChwYXJ0c1swXS5sZW5ndGggPCAxIHx8IHBhcnRzWzBdLmxlbmd0aCA+IDMpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gcGFydHMuc2xpY2UoMSkuZXZlcnkoKHBhcnQpID0+IHBhcnQubGVuZ3RoID09PSAzKTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBudW1lcmljIGlucHV0IHN1cHBvcnRpbmcgYm90aCBncm91cGVkIGFuZCBkZWNpbWFsIHZhbHVlcy5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCA9IChyYXc6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBpZiAocmF3ID09PSBudWxsIHx8IHJhdyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcclxuICBpZiAodHlwZW9mIHJhdyA9PT0gXCJudW1iZXJcIikgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShyYXcpID8gcmF3IDogbnVsbDtcclxuXHJcbiAgbGV0IHZhbHVlID0gc2FuaXRpemVOdW1lcmljVG9rZW4oU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGxldCBzaWduID0gXCJcIjtcclxuICBpZiAodmFsdWUuc3RhcnRzV2l0aChcIi1cIikpIHtcclxuICAgIHNpZ24gPSBcIi1cIjtcclxuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZS5zdGFydHNXaXRoKFwiK1wiKSkge1xyXG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcclxuICB9XHJcblxyXG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvWystXS9nLCBcIlwiKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgaGFzQ29tbWEgPSB2YWx1ZS5pbmNsdWRlcyhcIixcIik7XHJcbiAgY29uc3QgaGFzRG90ID0gdmFsdWUuaW5jbHVkZXMoXCIuXCIpO1xyXG5cclxuICBpZiAoaGFzQ29tbWEgJiYgIWhhc0RvdCAmJiBpc1Rob3VzYW5kc0dyb3VwZWRJbnRlZ2VyKHZhbHVlLCBcIixcIikpIHtcclxuICAgIGNvbnN0IHBhcnNlZEludGVnZXIgPSBOdW1iZXIoYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoLywvZywgXCJcIil9YCk7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZEludGVnZXIpID8gcGFyc2VkSW50ZWdlciA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiAoaGFzRG90ICYmICFoYXNDb21tYSAmJiBpc1Rob3VzYW5kc0dyb3VwZWRJbnRlZ2VyKHZhbHVlLCBcIi5cIikpIHtcclxuICAgIGNvbnN0IHBhcnNlZEludGVnZXIgPSBOdW1iZXIoYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoL1xcLi9nLCBcIlwiKX1gKTtcclxuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkSW50ZWdlcikgPyBwYXJzZWRJbnRlZ2VyIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxhc3RDb21tYSA9IHZhbHVlLmxhc3RJbmRleE9mKFwiLFwiKTtcclxuICBjb25zdCBsYXN0RG90ID0gdmFsdWUubGFzdEluZGV4T2YoXCIuXCIpO1xyXG4gIGNvbnN0IGRlY2ltYWxTZXBhcmF0b3JJbmRleCA9IE1hdGgubWF4KGxhc3RDb21tYSwgbGFzdERvdCk7XHJcblxyXG4gIGxldCBub3JtYWxpemVkOiBzdHJpbmc7XHJcbiAgaWYgKGRlY2ltYWxTZXBhcmF0b3JJbmRleCA+PSAwKSB7XHJcbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbHVlLnNsaWNlKDAsIGRlY2ltYWxTZXBhcmF0b3JJbmRleCkucmVwbGFjZSgvWy4sXS9nLCBcIlwiKTtcclxuICAgIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsdWUuc2xpY2UoZGVjaW1hbFNlcGFyYXRvckluZGV4ICsgMSkucmVwbGFjZSgvWy4sXS9nLCBcIlwiKTtcclxuICAgIG5vcm1hbGl6ZWQgPSBgJHtzaWdufSR7aW50ZWdlclBhcnQgfHwgXCIwXCJ9JHtkZWNpbWFsUGFydCA/IGAuJHtkZWNpbWFsUGFydH1gIDogXCJcIn1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBub3JtYWxpemVkID0gYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoL1suLF0vZywgXCJcIil9YDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcihub3JtYWxpemVkKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuLy8gRm9ybWF0cyBudW1lcmljIHZhbHVlcyB3aXRoIHRoZSBmaXhlZCBleHBlbnNlIHZpc3VhbCBjb250cmFjdDogIywjIzAuMDBcclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VOdW1iZXIgPSAoXHJcbiAgdmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VOdW1iZXJGb3JtYXRPcHRpb25zXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZmFsbGJhY2sgPSBvcHRpb25zPy5mYWxsYmFjayA/PyBcIi1cIjtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlKSkpIHtcclxuICAgIHJldHVybiBmYWxsYmFjaztcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoRVhQRU5TRV9OVU1CRVJfTE9DQUxFLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcclxuICAgIHVzZUdyb3VwaW5nOiBvcHRpb25zPy51c2VHcm91cGluZyA/PyB0cnVlLFxyXG4gIH0pLmZvcm1hdChOdW1iZXIodmFsdWUpKTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbmQgZm9ybWF0cyByYXcgaW5wdXQgdmFsdWVzIHRvIHRoZSBmaXhlZCBleHBlbnNlIHZpc3VhbCBjb250cmFjdC5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciA9IChcclxuICByYXc6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VOdW1iZXJGb3JtYXRPcHRpb25zXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHJhdyk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIG9wdGlvbnM/LmZhbGxiYWNrID8/IFwiXCI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcihwYXJzZWQsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogb3B0aW9ucz8ubWluaW11bUZyYWN0aW9uRGlnaXRzID8/IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IG9wdGlvbnM/LnVzZUdyb3VwaW5nID8/IHRydWUsXHJcbiAgICBmYWxsYmFjazogb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCJcIixcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudCB9IGZyb20gXCIuL2NvbnN0YW50cy9jdXJyZW5jeURpc3BsYXlSdWxlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxuLy8gRm9ybWF0cyBhIG51bWVyaWMgYW1vdW50IHdpdGggZml4ZWQgVUkgbnVtYmVyIHN0eWxlIGFuZCBvcHRpb25hbCBjdXJyZW5jeSBjb2RlLlxuZXhwb3J0IGNvbnN0IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSA9IChcbiAgYW1vdW50OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmcsXG4gIF9sb2NhbGU/OiBzdHJpbmdcbik6IHN0cmluZyA9PiB7XG4gIGlmIChhbW91bnQgPT09IG51bGwgfHwgYW1vdW50ID09PSB1bmRlZmluZWQgfHwgTnVtYmVyLmlzTmFOKE51bWJlcihhbW91bnQpKSkge1xuICAgIHJldHVybiBcIi1cIjtcbiAgfVxuXG4gIGNvbnN0IHNhZmVDdXJyZW5jeSA9IFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRlY2ltYWxUZXh0ID0gZm9ybWF0RXhwZW5zZU51bWJlcihhbW91bnQsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgfSk7XG5cbiAgcmV0dXJuIGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudChkZWNpbWFsVGV4dCwgc2FmZUN1cnJlbmN5KTtcbn07XG4iLCAidHlwZSBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7XHJcbiAgYXNrQ29uZmlybWF0aW9uPzogYm9vbGVhbjtcclxuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFJlbG9hZEV4cGVuc2VQYWdlT3B0aW9ucyA9IHtcclxuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyB0aGUgZ2xvYmFsIG5hdmlnYXRpb24gZ3VhcmQgbGlmZWN5Y2xlIGZvciBhY3RpdmUgZWRpdCBwcm9jZXNzZXMuXHJcbmV4cG9ydCBjb25zdCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkID0gKFxyXG4gIGFjdGl2ZU9yT3B0aW9ucz86IGJvb2xlYW4gfCBJbmROYXZpZ2F0aW9uR3VhcmRPcHRpb25zLFxyXG4gIG1lc3NhZ2U/OiBzdHJpbmdcclxuKTogdm9pZCA9PiB7XHJcbiAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oYWN0aXZlT3JPcHRpb25zLCBtZXNzYWdlKTtcclxufTtcclxuXHJcbi8vIENsZWFycyBnbG9iYWwgbmF2aWdhdGlvbiBndWFyZCBmbGFncyB3aGVuIGNvbXBvbmVudCB1bm1vdW50cy5cclxuZXhwb3J0IGNvbnN0IGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCA9ICgpOiB2b2lkID0+IHtcclxuICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbn07XHJcblxyXG4vLyBFeGVjdXRlcyBuYXZpZ2F0aW9uIGFjdGlvbiB0aHJvdWdoIHNpdGUgZ3VhcmQgaWYgYXZhaWxhYmxlLlxyXG5leHBvcnQgY29uc3QgcnVuR3VhcmRlZE5hdmlnYXRpb24gPSAoXHJcbiAgYWN0aW9uOiAoKSA9PiB2b2lkLFxyXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XHJcbik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHsgYXNrQ29uZmlybWF0aW9uID0gZmFsc2UsIG1lc3NhZ2UgfSA9IG9wdGlvbnM7XHJcbiAgaWYgKGFza0NvbmZpcm1hdGlvbiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oYWN0aW9uLCBtZXNzYWdlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGFjdGlvbigpO1xyXG59O1xyXG5cclxuLy8gTmF2aWdhdGVzIHRvIHRhcmdldCBVUkwgYW5kIGtlZXBzIHNpdGUtbGV2ZWwgZ3VhcmQgYmVoYXZpb3IgY29uc2lzdGVudC5cclxuZXhwb3J0IGNvbnN0IG5hdmlnYXRlVG9FeHBlbnNlVXJsID0gKFxyXG4gIHRhcmdldFVybDogc3RyaW5nLFxyXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XHJcbik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHNhZmVVcmwgPSBTdHJpbmcodGFyZ2V0VXJsIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXNhZmVVcmwpIHJldHVybjtcclxuXHJcbiAgY29uc3QgeyBieXBhc3NHdWFyZE9uY2UgPSB0cnVlIH0gPSBvcHRpb25zO1xyXG4gIHJ1bkd1YXJkZWROYXZpZ2F0aW9uKCgpID0+IHtcclxuICAgIGlmIChieXBhc3NHdWFyZE9uY2UpIHtcclxuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNhZmVVcmw7XHJcbiAgfSwgb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vLyBSZWxvYWRzIHRoZSBjdXJyZW50IHBhZ2Ugd2hpbGUgYnlwYXNzaW5nIHRoZSBnbG9iYWwgdW5zYXZlZC1jaGFuZ2UgZ3VhcmQgd2hlbiBuZWVkZWQuXHJcbmV4cG9ydCBjb25zdCByZWxvYWRFeHBlbnNlUGFnZSA9IChvcHRpb25zOiBSZWxvYWRFeHBlbnNlUGFnZU9wdGlvbnMgPSB7fSk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHsgYnlwYXNzR3VhcmRPbmNlID0gdHJ1ZSB9ID0gb3B0aW9ucztcclxuICBpZiAoYnlwYXNzR3VhcmRPbmNlKSB7XHJcbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICB9XHJcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBR08sSUFBTSx1QkFBaUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRU8sSUFBTSx5QkFBeUIscUJBQXFCLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxNQUFNLE1BQU0sS0FBSyxFQUFFOzs7QUMvSy9GLElBQU0seUJBQXdFLE9BQU8sT0FBTztBQUFBLEVBQ2pHLEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVksVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzVELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFFBQVEsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLGNBQWMsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzdELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFFBQVEsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUN4RCxDQUFDO0FBRUQsSUFBTSxvQkFBb0IsSUFBSSxJQUFJLG9CQUFvQjtBQUV0RCxJQUFNLHdCQUF3QixDQUFDLGlCQUFrQztBQUMvRCxTQUFPLE9BQU8sZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUN2RDtBQUdPLElBQU0sNkJBQTZCLENBQUMsaUJBQXNEO0FBQy9GLFFBQU0seUJBQXlCLHNCQUFzQixZQUFZO0FBQ2pFLE1BQUksQ0FBQywwQkFBMEIsQ0FBQyxrQkFBa0IsSUFBSSxzQkFBc0IsR0FBRztBQUM3RSxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sdUJBQXVCLHNCQUFzQixLQUFLO0FBQUEsSUFDdkQsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1YsT0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUdPLElBQU0sOEJBQThCLENBQUMsWUFBb0IsaUJBQWtDO0FBQ2hHLFFBQU0saUJBQWlCLGNBQWM7QUFDckMsUUFBTSx5QkFBeUIsc0JBQXNCLFlBQVk7QUFDakUsUUFBTSxjQUFjLDJCQUEyQixzQkFBc0I7QUFFckUsTUFBSSxDQUFDLGFBQWE7QUFDaEIsV0FBTyx5QkFBeUIsR0FBRyxjQUFjLElBQUksc0JBQXNCLEtBQUs7QUFBQSxFQUNsRjtBQUVBLFFBQU0sWUFBWSxZQUFZLFFBQVEsTUFBTTtBQUM1QyxTQUFPLFlBQVksYUFBYSxXQUM1QixHQUFHLFlBQVksTUFBTSxHQUFHLFNBQVMsR0FBRyxjQUFjLEtBQ2xELEdBQUcsY0FBYyxHQUFHLFNBQVMsR0FBRyxZQUFZLE1BQU07QUFDeEQ7OztBQ3RPQSxJQUFNLHdCQUF3QjtBQVM5QixJQUFNLHVCQUF1QixDQUFDLFVBQTBCO0FBQ3RELFNBQU8sTUFBTSxRQUFRLGNBQWMsRUFBRTtBQUN2QztBQUVBLElBQU0sNEJBQTRCLENBQUMsT0FBZSxjQUFrQztBQUNsRixRQUFNLFFBQVEsTUFBTSxNQUFNLFNBQVM7QUFDbkMsTUFBSSxNQUFNLFVBQVUsRUFBRyxRQUFPO0FBQzlCLE1BQUksTUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsRUFBRyxRQUFPO0FBQ3RELE1BQUksTUFBTSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRyxRQUFPO0FBQ3ZELFNBQU8sTUFBTSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsU0FBUyxLQUFLLFdBQVcsQ0FBQztBQUN6RDtBQUdPLElBQU0sMkJBQTJCLENBQUMsUUFBMkQ7QUFDbEcsTUFBSSxRQUFRLFFBQVEsUUFBUSxPQUFXLFFBQU87QUFDOUMsTUFBSSxPQUFPLFFBQVEsU0FBVSxRQUFPLE9BQU8sU0FBUyxHQUFHLElBQUksTUFBTTtBQUVqRSxNQUFJLFFBQVEscUJBQXFCLE9BQU8sT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsUUFBUSxFQUFFLENBQUM7QUFDN0UsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUVuQixNQUFJLE9BQU87QUFDWCxNQUFJLE1BQU0sV0FBVyxHQUFHLEdBQUc7QUFDekIsV0FBTztBQUNQLFlBQVEsTUFBTSxNQUFNLENBQUM7QUFBQSxFQUN2QixXQUFXLE1BQU0sV0FBVyxHQUFHLEdBQUc7QUFDaEMsWUFBUSxNQUFNLE1BQU0sQ0FBQztBQUFBLEVBQ3ZCO0FBRUEsVUFBUSxNQUFNLFFBQVEsU0FBUyxFQUFFO0FBQ2pDLE1BQUksQ0FBQyxNQUFPLFFBQU87QUFFbkIsUUFBTSxXQUFXLE1BQU0sU0FBUyxHQUFHO0FBQ25DLFFBQU0sU0FBUyxNQUFNLFNBQVMsR0FBRztBQUVqQyxNQUFJLFlBQVksQ0FBQyxVQUFVLDBCQUEwQixPQUFPLEdBQUcsR0FBRztBQUNoRSxVQUFNLGdCQUFnQixPQUFPLEdBQUcsSUFBSSxHQUFHLE1BQU0sUUFBUSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2hFLFdBQU8sT0FBTyxTQUFTLGFBQWEsSUFBSSxnQkFBZ0I7QUFBQSxFQUMxRDtBQUVBLE1BQUksVUFBVSxDQUFDLFlBQVksMEJBQTBCLE9BQU8sR0FBRyxHQUFHO0FBQ2hFLFVBQU0sZ0JBQWdCLE9BQU8sR0FBRyxJQUFJLEdBQUcsTUFBTSxRQUFRLE9BQU8sRUFBRSxDQUFDLEVBQUU7QUFDakUsV0FBTyxPQUFPLFNBQVMsYUFBYSxJQUFJLGdCQUFnQjtBQUFBLEVBQzFEO0FBRUEsUUFBTSxZQUFZLE1BQU0sWUFBWSxHQUFHO0FBQ3ZDLFFBQU0sVUFBVSxNQUFNLFlBQVksR0FBRztBQUNyQyxRQUFNLHdCQUF3QixLQUFLLElBQUksV0FBVyxPQUFPO0FBRXpELE1BQUk7QUFDSixNQUFJLHlCQUF5QixHQUFHO0FBQzlCLFVBQU0sY0FBYyxNQUFNLE1BQU0sR0FBRyxxQkFBcUIsRUFBRSxRQUFRLFNBQVMsRUFBRTtBQUM3RSxVQUFNLGNBQWMsTUFBTSxNQUFNLHdCQUF3QixDQUFDLEVBQUUsUUFBUSxTQUFTLEVBQUU7QUFDOUUsaUJBQWEsR0FBRyxJQUFJLEdBQUcsZUFBZSxHQUFHLEdBQUcsY0FBYyxJQUFJLFdBQVcsS0FBSyxFQUFFO0FBQUEsRUFDbEYsT0FBTztBQUNMLGlCQUFhLEdBQUcsSUFBSSxHQUFHLE1BQU0sUUFBUSxTQUFTLEVBQUUsQ0FBQztBQUFBLEVBQ25EO0FBRUEsUUFBTSxTQUFTLE9BQU8sVUFBVTtBQUNoQyxTQUFPLE9BQU8sU0FBUyxNQUFNLElBQUksU0FBUztBQUM1QztBQUdPLElBQU0sc0JBQXNCLENBQ2pDLE9BQ0EsWUFDVztBQUNYLFFBQU0sV0FBVyxTQUFTLFlBQVk7QUFDdEMsTUFBSSxVQUFVLFFBQVEsVUFBVSxVQUFhLE9BQU8sTUFBTSxPQUFPLEtBQUssQ0FBQyxHQUFHO0FBQ3hFLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTyxJQUFJLEtBQUssYUFBYSx1QkFBdUI7QUFBQSxJQUNsRCx1QkFBdUIsU0FBUyx5QkFBeUI7QUFBQSxJQUN6RCx1QkFBdUIsU0FBUyx5QkFBeUI7QUFBQSxJQUN6RCxhQUFhLFNBQVMsZUFBZTtBQUFBLEVBQ3ZDLENBQUMsRUFBRSxPQUFPLE9BQU8sS0FBSyxDQUFDO0FBQ3pCO0FBR08sSUFBTSwyQkFBMkIsQ0FDdEMsS0FDQSxZQUNXO0FBQ1gsUUFBTSxTQUFTLHlCQUF5QixHQUFHO0FBQzNDLE1BQUksV0FBVyxNQUFNO0FBQ25CLFdBQU8sU0FBUyxZQUFZO0FBQUEsRUFDOUI7QUFFQSxTQUFPLG9CQUFvQixRQUFRO0FBQUEsSUFDakMsdUJBQXVCLFNBQVMseUJBQXlCO0FBQUEsSUFDekQsdUJBQXVCLFNBQVMseUJBQXlCO0FBQUEsSUFDekQsYUFBYSxTQUFTLGVBQWU7QUFBQSxJQUNyQyxVQUFVLFNBQVMsWUFBWTtBQUFBLEVBQ2pDLENBQUM7QUFDSDs7O0FDbkdPLElBQU0sMkJBQTJCLENBQ3RDLFFBQ0EsY0FDQSxZQUNXO0FBQ1gsTUFBSSxXQUFXLFFBQVEsV0FBVyxVQUFhLE9BQU8sTUFBTSxPQUFPLE1BQU0sQ0FBQyxHQUFHO0FBQzNFLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxlQUFlLE9BQU8sZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUNuRSxRQUFNLGNBQWMsb0JBQW9CLFFBQVE7QUFBQSxJQUM5Qyx1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsRUFDWixDQUFDO0FBRUQsU0FBTyw0QkFBNEIsYUFBYSxZQUFZO0FBQzlEOzs7QUNYTyxJQUFNLDRCQUE0QixDQUN2QyxpQkFDQSxZQUNTO0FBQ1QsU0FBTywwQkFBMEIsaUJBQWlCLE9BQU87QUFDM0Q7QUFHTyxJQUFNLDhCQUE4QixNQUFZO0FBQ3JELFNBQU8sNEJBQTRCO0FBQ3JDO0FBR08sSUFBTSx1QkFBdUIsQ0FDbEMsUUFDQSxVQUFvQyxDQUFDLE1BQzVCO0FBQ1QsUUFBTSxFQUFFLGtCQUFrQixPQUFPLFFBQVEsSUFBSTtBQUM3QyxNQUFJLG1CQUFtQixPQUFPLE9BQU8sMkJBQTJCLFlBQVk7QUFDMUUsV0FBTyx1QkFBdUIsUUFBUSxPQUFPO0FBQzdDO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQUdPLElBQU0sdUJBQXVCLENBQ2xDLFdBQ0EsVUFBb0MsQ0FBQyxNQUM1QjtBQUNULFFBQU0sVUFBVSxPQUFPLGFBQWEsRUFBRSxFQUFFLEtBQUs7QUFDN0MsTUFBSSxDQUFDLFFBQVM7QUFFZCxRQUFNLEVBQUUsa0JBQWtCLEtBQUssSUFBSTtBQUNuQyx1QkFBcUIsTUFBTTtBQUN6QixRQUFJLGlCQUFpQjtBQUNuQixhQUFPLGlDQUFpQztBQUFBLElBQzFDO0FBQ0EsV0FBTyxTQUFTLE9BQU87QUFBQSxFQUN6QixHQUFHLE9BQU87QUFDWjtBQUdPLElBQU0sb0JBQW9CLENBQUMsVUFBb0MsQ0FBQyxNQUFZO0FBQ2pGLFFBQU0sRUFBRSxrQkFBa0IsS0FBSyxJQUFJO0FBQ25DLE1BQUksaUJBQWlCO0FBQ25CLFdBQU8saUNBQWlDO0FBQUEsRUFDMUM7QUFDQSxTQUFPLFNBQVMsT0FBTztBQUN6QjsiLAogICJuYW1lcyI6IFtdCn0K
