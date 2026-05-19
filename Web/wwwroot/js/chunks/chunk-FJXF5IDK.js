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
  AED: { symbol: "\u062F.\u0625.", position: "suffix", space: true },
  AFN: { symbol: "\u060B", position: "prefix", space: true },
  ALL: { symbol: "Lek\xEB", position: "suffix", space: true },
  AMD: { symbol: "\u058F", position: "suffix", space: true },
  AOA: { symbol: "Kz", position: "suffix", space: true },
  ARS: { symbol: "$", position: "prefix", space: true },
  AUD: { symbol: "$", position: "prefix", space: false },
  AWG: { symbol: "Afl.", position: "prefix", space: true },
  AZN: { symbol: "\u20BC", position: "suffix", space: true },
  BAM: { symbol: "KM", position: "suffix", space: true },
  BBD: { symbol: "$", position: "prefix", space: false },
  BDT: { symbol: "\u09F3", position: "suffix", space: false },
  BHD: { symbol: "\u062F.\u0628.", position: "suffix", space: true },
  BIF: { symbol: "FBu", position: "suffix", space: true },
  BMD: { symbol: "$", position: "prefix", space: false },
  BND: { symbol: "$", position: "prefix", space: true },
  BOB: { symbol: "Bs", position: "prefix", space: true },
  BOV: { symbol: "BOV", position: "prefix", space: true },
  BRL: { symbol: "R$", position: "prefix", space: true },
  BSD: { symbol: "$", position: "prefix", space: false },
  BTN: { symbol: "Nu.", position: "prefix", space: true },
  BWP: { symbol: "P", position: "prefix", space: true },
  BYN: { symbol: "Br", position: "suffix", space: true },
  BZD: { symbol: "$", position: "prefix", space: false },
  CAD: { symbol: "$", position: "prefix", space: false },
  CDF: { symbol: "FC", position: "suffix", space: true },
  CHE: { symbol: "CHE", position: "prefix", space: true },
  CHF: { symbol: "CHF", position: "prefix", space: true },
  CHW: { symbol: "CHW", position: "prefix", space: true },
  CLF: { symbol: "CLF", position: "prefix", space: true },
  CLP: { symbol: "$", position: "prefix", space: false },
  CNY: { symbol: "\xA5", position: "prefix", space: false },
  COP: { symbol: "$", position: "prefix", space: true },
  COU: { symbol: "COU", position: "prefix", space: true },
  CRC: { symbol: "\u20A1", position: "prefix", space: false },
  CUC: { symbol: "$", position: "prefix", space: false },
  CUP: { symbol: "$", position: "prefix", space: false },
  CVE: { symbol: "CVE", position: "suffix", space: true },
  CZK: { symbol: "K\u010D", position: "suffix", space: true },
  DJF: { symbol: "Fdj", position: "suffix", space: true },
  DKK: { symbol: "kr.", position: "suffix", space: true },
  DOP: { symbol: "$", position: "prefix", space: false },
  DZD: { symbol: "\u062F.\u062C.", position: "suffix", space: true },
  EGP: { symbol: "E\xA3", position: "suffix", space: true },
  ERN: { symbol: "Nfk", position: "prefix", space: true },
  ETB: { symbol: "\u1265\u122D", position: "prefix", space: true },
  EUR: { symbol: "\u20AC", position: "suffix", space: true },
  FJD: { symbol: "$", position: "prefix", space: false },
  FKP: { symbol: "\xA3", position: "prefix", space: false },
  GBP: { symbol: "\xA3", position: "prefix", space: false },
  GEL: { symbol: "\u20BE", position: "suffix", space: true },
  GHS: { symbol: "GH\u20B5", position: "prefix", space: false },
  GIP: { symbol: "\xA3", position: "prefix", space: false },
  GMD: { symbol: "D", position: "prefix", space: true },
  GNF: { symbol: "FG", position: "suffix", space: true },
  GTQ: { symbol: "Q", position: "prefix", space: true },
  GYD: { symbol: "$", position: "prefix", space: false },
  HKD: { symbol: "$", position: "prefix", space: false },
  HNL: { symbol: "L", position: "prefix", space: true },
  HTG: { symbol: "HTG", position: "suffix", space: true },
  HUF: { symbol: "Ft", position: "suffix", space: true },
  IDR: { symbol: "Rp", position: "prefix", space: true },
  ILS: { symbol: "\u20AA", position: "suffix", space: true },
  INR: { symbol: "\u20B9", position: "prefix", space: false },
  IQD: { symbol: "\u062F.\u0639.", position: "suffix", space: true },
  IRR: { symbol: "\u0631\u06CC\u0627\u0644", position: "prefix", space: true },
  ISK: { symbol: "kr.", position: "suffix", space: true },
  JMD: { symbol: "$", position: "prefix", space: false },
  JOD: { symbol: "\u062F.\u0623.", position: "suffix", space: true },
  JPY: { symbol: "\uFFE5", position: "prefix", space: false },
  KES: { symbol: "Ksh", position: "prefix", space: true },
  KGS: { symbol: "\u20C0", position: "suffix", space: true },
  KHR: { symbol: "\u17DB", position: "suffix", space: false },
  KMF: { symbol: "CF", position: "suffix", space: true },
  KPW: { symbol: "\u20A9", position: "prefix", space: false },
  KRW: { symbol: "\u20A9", position: "prefix", space: false },
  KWD: { symbol: "\u062F.\u0643.", position: "suffix", space: true },
  KYD: { symbol: "$", position: "prefix", space: false },
  KZT: { symbol: "\u20B8", position: "suffix", space: true },
  LAK: { symbol: "\u20AD", position: "prefix", space: false },
  LBP: { symbol: "L\xA3", position: "suffix", space: true },
  LKR: { symbol: "\u0DBB\u0DD4.", position: "prefix", space: true },
  LRD: { symbol: "$", position: "prefix", space: false },
  LSL: { symbol: "M", position: "prefix", space: true },
  LYD: { symbol: "\u062F.\u0644.", position: "suffix", space: true },
  MAD: { symbol: "\u062F.\u0645.", position: "suffix", space: true },
  MDL: { symbol: "L", position: "suffix", space: true },
  MGA: { symbol: "Ar", position: "prefix", space: true },
  MKD: { symbol: "\u0434\u0435\u043D.", position: "suffix", space: true },
  MMK: { symbol: "K", position: "suffix", space: true },
  MNT: { symbol: "\u20AE", position: "prefix", space: true },
  MOP: { symbol: "MOP$", position: "prefix", space: false },
  MRU: { symbol: "\u0623.\u0645.", position: "suffix", space: true },
  MUR: { symbol: "Rs", position: "suffix", space: true },
  MVR: { symbol: "MVR", position: "suffix", space: true },
  MWK: { symbol: "MK", position: "prefix", space: true },
  MXN: { symbol: "$", position: "prefix", space: false },
  MXV: { symbol: "MXV", position: "prefix", space: true },
  MYR: { symbol: "RM", position: "prefix", space: true },
  MZN: { symbol: "MTn", position: "suffix", space: true },
  NAD: { symbol: "$", position: "prefix", space: false },
  NGN: { symbol: "\u20A6", position: "prefix", space: false },
  NIO: { symbol: "C$", position: "prefix", space: false },
  NOK: { symbol: "kr", position: "suffix", space: true },
  NPR: { symbol: "\u0930\u0942", position: "prefix", space: true },
  NZD: { symbol: "$", position: "prefix", space: false },
  OMR: { symbol: "\u0631.\u0639.", position: "suffix", space: true },
  PAB: { symbol: "B/.", position: "prefix", space: true },
  PEN: { symbol: "S/", position: "prefix", space: true },
  PGK: { symbol: "PGK", position: "suffix", space: true },
  PHP: { symbol: "\u20B1", position: "prefix", space: false },
  PKR: { symbol: "Rs", position: "prefix", space: true },
  PLN: { symbol: "z\u0142", position: "suffix", space: true },
  PYG: { symbol: "\u20B2", position: "suffix", space: true },
  QAR: { symbol: "\u0631.\u0642.", position: "suffix", space: true },
  RON: { symbol: "lei", position: "suffix", space: true },
  RSD: { symbol: "RSD", position: "suffix", space: true },
  RUB: { symbol: "\u20BD", position: "suffix", space: true },
  RWF: { symbol: "RF", position: "prefix", space: true },
  SAR: { symbol: "\u0631.\u0633.", position: "suffix", space: true },
  SBD: { symbol: "$", position: "prefix", space: false },
  SCR: { symbol: "SR", position: "suffix", space: true },
  SDG: { symbol: "\u062C.\u0633.", position: "suffix", space: true },
  SEK: { symbol: "kr", position: "suffix", space: true },
  SGD: { symbol: "$", position: "prefix", space: false },
  SHP: { symbol: "\xA3", position: "prefix", space: false },
  SLE: { symbol: "Le", position: "prefix", space: true },
  SOS: { symbol: "S", position: "prefix", space: true },
  SRD: { symbol: "$", position: "prefix", space: true },
  SSP: { symbol: "\xA3", position: "suffix", space: true },
  STN: { symbol: "Db", position: "suffix", space: true },
  SVC: { symbol: "SVC", position: "prefix", space: true },
  SYP: { symbol: "\xA3", position: "suffix", space: true },
  SZL: { symbol: "E", position: "prefix", space: true },
  THB: { symbol: "\u0E3F", position: "prefix", space: false },
  TJS: { symbol: "\u0441\u043E\u043C.", position: "suffix", space: true },
  TMT: { symbol: "TMT", position: "suffix", space: true },
  TND: { symbol: "\u062F.\u062A.", position: "suffix", space: true },
  TOP: { symbol: "T$", position: "prefix", space: true },
  TRY: { symbol: "\u20BA", position: "prefix", space: false },
  TTD: { symbol: "$", position: "prefix", space: false },
  TWD: { symbol: "$", position: "prefix", space: false },
  TZS: { symbol: "TSh", position: "prefix", space: true },
  UAH: { symbol: "\u20B4", position: "suffix", space: true },
  UGX: { symbol: "USh", position: "prefix", space: true },
  USD: { symbol: "$", position: "prefix", space: false },
  USN: { symbol: "USN", position: "prefix", space: true },
  UYI: { symbol: "UYI", position: "prefix", space: true },
  UYU: { symbol: "$", position: "prefix", space: true },
  UYW: { symbol: "UP", position: "prefix", space: true },
  UZS: { symbol: "so\u02BBm", position: "suffix", space: true },
  VED: { symbol: "VED", position: "prefix", space: true },
  VEF: { symbol: "Bs.", position: "prefix", space: true },
  VES: { symbol: "Bs.S", position: "prefix", space: true },
  VND: { symbol: "\u20AB", position: "suffix", space: true },
  VUV: { symbol: "VUV", position: "suffix", space: true },
  WST: { symbol: "WST", position: "suffix", space: true },
  XAD: { symbol: "XAD", position: "prefix", space: true },
  XAF: { symbol: "FCFA", position: "suffix", space: true },
  XAG: { symbol: "XAG", position: "prefix", space: true },
  XAU: { symbol: "XAU", position: "prefix", space: true },
  XBA: { symbol: "XBA", position: "prefix", space: true },
  XBB: { symbol: "XBB", position: "prefix", space: true },
  XBC: { symbol: "XBC", position: "prefix", space: true },
  XBD: { symbol: "XBD", position: "prefix", space: true },
  XCD: { symbol: "$", position: "prefix", space: false },
  XCG: { symbol: "Cg.", position: "suffix", space: true },
  XDR: { symbol: "XDR", position: "prefix", space: true },
  XOF: { symbol: "F\u202FCFA", position: "prefix", space: true },
  XPD: { symbol: "XPD", position: "prefix", space: true },
  XPF: { symbol: "FCFP", position: "suffix", space: true },
  XPT: { symbol: "XPT", position: "prefix", space: true },
  XSU: { symbol: "XSU", position: "prefix", space: true },
  XTS: { symbol: "XTS", position: "prefix", space: true },
  XUA: { symbol: "XUA", position: "prefix", space: true },
  XXX: { symbol: "\xA4", position: "prefix", space: false },
  YER: { symbol: "\u0631.\u064A.", position: "suffix", space: true },
  ZAR: { symbol: "R", position: "prefix", space: true },
  ZMW: { symbol: "ZK", position: "prefix", space: true },
  ZWG: { symbol: "ZWG", position: "prefix", space: true },
  ZWL: { symbol: "ZWL", position: "prefix", space: true }
});
var CURRENCY_CODE_SET = new Set(expenseCurrencyCodes);
var CURRENCY_CODE_ALIASES = Object.freeze({
  WON: "KRW"
});
var normalizeCurrencyCode = (currencyCode) => {
  return String(currencyCode || "").trim().toUpperCase();
};
var resolveCurrencyDisplayRule = (currencyCode) => {
  const normalizedCurrencyCode = normalizeCurrencyCode(currencyCode);
  const resolvedCurrencyCode = CURRENCY_CODE_ALIASES[normalizedCurrencyCode] ?? normalizedCurrencyCode;
  if (!resolvedCurrencyCode || !CURRENCY_CODE_SET.has(resolvedCurrencyCode)) {
    return null;
  }
  return CURRENCY_DISPLAY_RULES[resolvedCurrencyCode] ?? {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvY3VycmVuY3lDb2Rlcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9jdXJyZW5jeURpc3BsYXlSdWxlcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9leHBlbnNlRm9ybWF0dGVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBGaXhlZCBJU08tbGlrZSBjdXJyZW5jeSBjb2RlIGxpc3QgZm9yIEV4cGVuc2UgU2hlZXRzIGZpbHRlcnMuXG4vLyBTb3VyY2U6IFNJWCBJU08gNDIxNyBMaXN0IE9uZSBYTUwsIG9mZmljaWFsIElTTyBtYWludGVuYW5jZSBhZ2VuY3kuXG4vLyBSZXRyaWV2ZWQgMjAyNi0wNS0xOSBmcm9tIGh0dHBzOi8vd3d3LnNpeC1ncm91cC5jb20vZGFtL2Rvd25sb2FkL2ZpbmFuY2lhbC1pbmZvcm1hdGlvbi9kYXRhLWNlbnRlci9pc28tY3VycnJlbmN5L2xpc3RzL2xpc3Qtb25lLnhtbC5cbmV4cG9ydCBjb25zdCBleHBlbnNlQ3VycmVuY3lDb2Rlczogc3RyaW5nW10gPSBbXG4gIFwiQUVEXCIsXG4gIFwiQUZOXCIsXG4gIFwiQUxMXCIsXG4gIFwiQU1EXCIsXG4gIFwiQU9BXCIsXG4gIFwiQVJTXCIsXG4gIFwiQVVEXCIsXG4gIFwiQVdHXCIsXG4gIFwiQVpOXCIsXG4gIFwiQkFNXCIsXG4gIFwiQkJEXCIsXG4gIFwiQkRUXCIsXG4gIFwiQkhEXCIsXG4gIFwiQklGXCIsXG4gIFwiQk1EXCIsXG4gIFwiQk5EXCIsXG4gIFwiQk9CXCIsXG4gIFwiQk9WXCIsXG4gIFwiQlJMXCIsXG4gIFwiQlNEXCIsXG4gIFwiQlROXCIsXG4gIFwiQldQXCIsXG4gIFwiQllOXCIsXG4gIFwiQlpEXCIsXG4gIFwiQ0FEXCIsXG4gIFwiQ0RGXCIsXG4gIFwiQ0hFXCIsXG4gIFwiQ0hGXCIsXG4gIFwiQ0hXXCIsXG4gIFwiQ0xGXCIsXG4gIFwiQ0xQXCIsXG4gIFwiQ05ZXCIsXG4gIFwiQ09QXCIsXG4gIFwiQ09VXCIsXG4gIFwiQ1JDXCIsXG4gIFwiQ1VDXCIsXG4gIFwiQ1VQXCIsXG4gIFwiQ1ZFXCIsXG4gIFwiQ1pLXCIsXG4gIFwiREpGXCIsXG4gIFwiREtLXCIsXG4gIFwiRE9QXCIsXG4gIFwiRFpEXCIsXG4gIFwiRUdQXCIsXG4gIFwiRVJOXCIsXG4gIFwiRVRCXCIsXG4gIFwiRVVSXCIsXG4gIFwiRkpEXCIsXG4gIFwiRktQXCIsXG4gIFwiR0JQXCIsXG4gIFwiR0VMXCIsXG4gIFwiR0hTXCIsXG4gIFwiR0lQXCIsXG4gIFwiR01EXCIsXG4gIFwiR05GXCIsXG4gIFwiR1RRXCIsXG4gIFwiR1lEXCIsXG4gIFwiSEtEXCIsXG4gIFwiSE5MXCIsXG4gIFwiSFRHXCIsXG4gIFwiSFVGXCIsXG4gIFwiSURSXCIsXG4gIFwiSUxTXCIsXG4gIFwiSU5SXCIsXG4gIFwiSVFEXCIsXG4gIFwiSVJSXCIsXG4gIFwiSVNLXCIsXG4gIFwiSk1EXCIsXG4gIFwiSk9EXCIsXG4gIFwiSlBZXCIsXG4gIFwiS0VTXCIsXG4gIFwiS0dTXCIsXG4gIFwiS0hSXCIsXG4gIFwiS01GXCIsXG4gIFwiS1BXXCIsXG4gIFwiS1JXXCIsXG4gIFwiS1dEXCIsXG4gIFwiS1lEXCIsXG4gIFwiS1pUXCIsXG4gIFwiTEFLXCIsXG4gIFwiTEJQXCIsXG4gIFwiTEtSXCIsXG4gIFwiTFJEXCIsXG4gIFwiTFNMXCIsXG4gIFwiTFlEXCIsXG4gIFwiTUFEXCIsXG4gIFwiTURMXCIsXG4gIFwiTUdBXCIsXG4gIFwiTUtEXCIsXG4gIFwiTU1LXCIsXG4gIFwiTU5UXCIsXG4gIFwiTU9QXCIsXG4gIFwiTVJVXCIsXG4gIFwiTVVSXCIsXG4gIFwiTVZSXCIsXG4gIFwiTVdLXCIsXG4gIFwiTVhOXCIsXG4gIFwiTVhWXCIsXG4gIFwiTVlSXCIsXG4gIFwiTVpOXCIsXG4gIFwiTkFEXCIsXG4gIFwiTkdOXCIsXG4gIFwiTklPXCIsXG4gIFwiTk9LXCIsXG4gIFwiTlBSXCIsXG4gIFwiTlpEXCIsXG4gIFwiT01SXCIsXG4gIFwiUEFCXCIsXG4gIFwiUEVOXCIsXG4gIFwiUEdLXCIsXG4gIFwiUEhQXCIsXG4gIFwiUEtSXCIsXG4gIFwiUExOXCIsXG4gIFwiUFlHXCIsXG4gIFwiUUFSXCIsXG4gIFwiUk9OXCIsXG4gIFwiUlNEXCIsXG4gIFwiUlVCXCIsXG4gIFwiUldGXCIsXG4gIFwiU0FSXCIsXG4gIFwiU0JEXCIsXG4gIFwiU0NSXCIsXG4gIFwiU0RHXCIsXG4gIFwiU0VLXCIsXG4gIFwiU0dEXCIsXG4gIFwiU0hQXCIsXG4gIFwiU0xFXCIsXG4gIFwiU09TXCIsXG4gIFwiU1JEXCIsXG4gIFwiU1NQXCIsXG4gIFwiU1ROXCIsXG4gIFwiU1ZDXCIsXG4gIFwiU1lQXCIsXG4gIFwiU1pMXCIsXG4gIFwiVEhCXCIsXG4gIFwiVEpTXCIsXG4gIFwiVE1UXCIsXG4gIFwiVE5EXCIsXG4gIFwiVE9QXCIsXG4gIFwiVFJZXCIsXG4gIFwiVFREXCIsXG4gIFwiVFdEXCIsXG4gIFwiVFpTXCIsXG4gIFwiVUFIXCIsXG4gIFwiVUdYXCIsXG4gIFwiVVNEXCIsXG4gIFwiVVNOXCIsXG4gIFwiVVlJXCIsXG4gIFwiVVlVXCIsXG4gIFwiVVlXXCIsXG4gIFwiVVpTXCIsXG4gIFwiVkVEXCIsXG4gIFwiVkVGXCIsXG4gIFwiVkVTXCIsXG4gIFwiVk5EXCIsXG4gIFwiVlVWXCIsXG4gIFwiV1NUXCIsXG4gIFwiWEFEXCIsXG4gIFwiWEFGXCIsXG4gIFwiWEFHXCIsXG4gIFwiWEFVXCIsXG4gIFwiWEJBXCIsXG4gIFwiWEJCXCIsXG4gIFwiWEJDXCIsXG4gIFwiWEJEXCIsXG4gIFwiWENEXCIsXG4gIFwiWENHXCIsXG4gIFwiWERSXCIsXG4gIFwiWE9GXCIsXG4gIFwiWFBEXCIsXG4gIFwiWFBGXCIsXG4gIFwiWFBUXCIsXG4gIFwiWFNVXCIsXG4gIFwiWFRTXCIsXG4gIFwiWFVBXCIsXG4gIFwiWFhYXCIsXG4gIFwiWUVSXCIsXG4gIFwiWkFSXCIsXG4gIFwiWk1XXCIsXG4gIFwiWldHXCIsXG4gIFwiWldMXCIsXG5dO1xuXG5leHBvcnQgY29uc3QgZXhwZW5zZUN1cnJlbmN5T3B0aW9ucyA9IGV4cGVuc2VDdXJyZW5jeUNvZGVzLm1hcCgoY29kZSkgPT4gKHsgdmFsdWU6IGNvZGUsIHRleHQ6IGNvZGUgfSkpO1xuIiwgImltcG9ydCB7IGV4cGVuc2VDdXJyZW5jeUNvZGVzIH0gZnJvbSBcIi4vY3VycmVuY3lDb2Rlcy50c1wiO1xuXG5leHBvcnQgdHlwZSBDdXJyZW5jeVN5bWJvbFBvc2l0aW9uID0gXCJwcmVmaXhcIiB8IFwic3VmZml4XCI7XG5cbmV4cG9ydCB0eXBlIEN1cnJlbmN5RGlzcGxheVJ1bGUgPSB7XG4gIHN5bWJvbDogc3RyaW5nO1xuICBwb3NpdGlvbjogQ3VycmVuY3lTeW1ib2xQb3NpdGlvbjtcbiAgc3BhY2U6IGJvb2xlYW47XG59O1xuXG4vLyBGaXhlZCBjdXJyZW5jeSBkaXNwbGF5IHJ1bGVzIGZvciBleHBlbnNlIGFtb3VudCBsYWJlbHMuXG4vLyBCYXNlbGluZSBnZW5lcmF0ZWQgZnJvbSBVbmljb2RlIENMRFIgNDggbmF0aXZlIGxvY2FsZSBjdXJyZW5jeSBwYXJ0cyB3aXRoIG5hcnJvdyBzeW1ib2xzLlxuZXhwb3J0IGNvbnN0IENVUlJFTkNZX0RJU1BMQVlfUlVMRVM6IFJlYWRvbmx5PFJlY29yZDxzdHJpbmcsIEN1cnJlbmN5RGlzcGxheVJ1bGU+PiA9IE9iamVjdC5mcmVlemUoe1xuICBBRUQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyNS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEFGTjogeyBzeW1ib2w6IFwiXFx1MDYwYlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQUxMOiB7IHN5bWJvbDogXCJMZWtcXHUwMGViXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBBTUQ6IHsgc3ltYm9sOiBcIlxcdTA1OGZcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEFPQTogeyBzeW1ib2w6IFwiS3pcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEFSUzogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQVVEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgQVdHOiB7IHN5bWJvbDogXCJBZmwuXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBBWk46IHsgc3ltYm9sOiBcIlxcdTIwYmNcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJBTTogeyBzeW1ib2w6IFwiS01cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJCRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEJEVDogeyBzeW1ib2w6IFwiXFx1MDlmM1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEJIRDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjI4LlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQklGOiB7IHN5bWJvbDogXCJGQnVcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJNRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEJORDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQk9COiB7IHN5bWJvbDogXCJCc1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQk9WOiB7IHN5bWJvbDogXCJCT1ZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJSTDogeyBzeW1ib2w6IFwiUiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJTRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEJUTjogeyBzeW1ib2w6IFwiTnUuXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCV1A6IHsgc3ltYm9sOiBcIlBcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJZTjogeyBzeW1ib2w6IFwiQnJcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJaRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIENBRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIENERjogeyBzeW1ib2w6IFwiRkNcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENIRTogeyBzeW1ib2w6IFwiQ0hFXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDSEY6IHsgc3ltYm9sOiBcIkNIRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ0hXOiB7IHN5bWJvbDogXCJDSFdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENMRjogeyBzeW1ib2w6IFwiQ0xGXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDTFA6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBDTlk6IHsgc3ltYm9sOiBcIlxcdTAwYTVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBDT1A6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENPVTogeyBzeW1ib2w6IFwiQ09VXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDUkM6IHsgc3ltYm9sOiBcIlxcdTIwYTFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBDVUM6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBDVVA6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBDVkU6IHsgc3ltYm9sOiBcIkNWRVwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ1pLOiB7IHN5bWJvbDogXCJLXFx1MDEwZFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgREpGOiB7IHN5bWJvbDogXCJGZGpcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIERLSzogeyBzeW1ib2w6IFwia3IuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBET1A6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBEWkQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyYy5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEVHUDogeyBzeW1ib2w6IFwiRVxcdTAwYTNcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEVSTjogeyBzeW1ib2w6IFwiTmZrXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBFVEI6IHsgc3ltYm9sOiBcIlxcdTEyNjVcXHUxMjJkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBFVVI6IHsgc3ltYm9sOiBcIlxcdTIwYWNcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEZKRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEZLUDogeyBzeW1ib2w6IFwiXFx1MDBhM1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEdCUDogeyBzeW1ib2w6IFwiXFx1MDBhM1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEdFTDogeyBzeW1ib2w6IFwiXFx1MjBiZVwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgR0hTOiB7IHN5bWJvbDogXCJHSFxcdTIwYjVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBHSVA6IHsgc3ltYm9sOiBcIlxcdTAwYTNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBHTUQ6IHsgc3ltYm9sOiBcIkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEdORjogeyBzeW1ib2w6IFwiRkdcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEdUUTogeyBzeW1ib2w6IFwiUVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgR1lEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgSEtEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgSE5MOiB7IHN5bWJvbDogXCJMXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBIVEc6IHsgc3ltYm9sOiBcIkhUR1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSFVGOiB7IHN5bWJvbDogXCJGdFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSURSOiB7IHN5bWJvbDogXCJScFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSUxTOiB7IHN5bWJvbDogXCJcXHUyMGFhXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBJTlI6IHsgc3ltYm9sOiBcIlxcdTIwYjlcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBJUUQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYzOS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIElSUjogeyBzeW1ib2w6IFwiXFx1MDYzMVxcdTA2Y2NcXHUwNjI3XFx1MDY0NFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSVNLOiB7IHN5bWJvbDogXCJrci5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEpNRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEpPRDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjIzLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSlBZOiB7IHN5bWJvbDogXCJcXHVmZmU1XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgS0VTOiB7IHN5bWJvbDogXCJLc2hcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEtHUzogeyBzeW1ib2w6IFwiXFx1MjBjMFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgS0hSOiB7IHN5bWJvbDogXCJcXHUxN2RiXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgS01GOiB7IHN5bWJvbDogXCJDRlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgS1BXOiB7IHN5bWJvbDogXCJcXHUyMGE5XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgS1JXOiB7IHN5bWJvbDogXCJcXHUyMGE5XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgS1dEOiB7IHN5bWJvbDogXCJcXHUwNjJmLlxcdTA2NDMuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBLWUQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBLWlQ6IHsgc3ltYm9sOiBcIlxcdTIwYjhcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIExBSzogeyBzeW1ib2w6IFwiXFx1MjBhZFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIExCUDogeyBzeW1ib2w6IFwiTFxcdTAwYTNcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIExLUjogeyBzeW1ib2w6IFwiXFx1MGRiYlxcdTBkZDQuXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBMUkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBMU0w6IHsgc3ltYm9sOiBcIk1cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIExZRDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjQ0LlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTUFEOiB7IHN5bWJvbDogXCJcXHUwNjJmLlxcdTA2NDUuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNREw6IHsgc3ltYm9sOiBcIkxcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1HQTogeyBzeW1ib2w6IFwiQXJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1LRDogeyBzeW1ib2w6IFwiXFx1MDQzNFxcdTA0MzVcXHUwNDNkLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTU1LOiB7IHN5bWJvbDogXCJLXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNTlQ6IHsgc3ltYm9sOiBcIlxcdTIwYWVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1PUDogeyBzeW1ib2w6IFwiTU9QJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIE1SVTogeyBzeW1ib2w6IFwiXFx1MDYyMy5cXHUwNjQ1LlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTVVSOiB7IHN5bWJvbDogXCJSc1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTVZSOiB7IHN5bWJvbDogXCJNVlJcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1XSzogeyBzeW1ib2w6IFwiTUtcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1YTjogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIE1YVjogeyBzeW1ib2w6IFwiTVhWXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNWVI6IHsgc3ltYm9sOiBcIlJNXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNWk46IHsgc3ltYm9sOiBcIk1UblwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTkFEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgTkdOOiB7IHN5bWJvbDogXCJcXHUyMGE2XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgTklPOiB7IHN5bWJvbDogXCJDJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIE5PSzogeyBzeW1ib2w6IFwia3JcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE5QUjogeyBzeW1ib2w6IFwiXFx1MDkzMFxcdTA5NDJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE5aRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIE9NUjogeyBzeW1ib2w6IFwiXFx1MDYzMS5cXHUwNjM5LlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUEFCOiB7IHN5bWJvbDogXCJCLy5cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFBFTjogeyBzeW1ib2w6IFwiUy9cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFBHSzogeyBzeW1ib2w6IFwiUEdLXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBQSFA6IHsgc3ltYm9sOiBcIlxcdTIwYjFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBQS1I6IHsgc3ltYm9sOiBcIlJzXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBQTE46IHsgc3ltYm9sOiBcInpcXHUwMTQyXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBQWUc6IHsgc3ltYm9sOiBcIlxcdTIwYjJcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFFBUjogeyBzeW1ib2w6IFwiXFx1MDYzMS5cXHUwNjQyLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUk9OOiB7IHN5bWJvbDogXCJsZWlcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFJTRDogeyBzeW1ib2w6IFwiUlNEXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBSVUI6IHsgc3ltYm9sOiBcIlxcdTIwYmRcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFJXRjogeyBzeW1ib2w6IFwiUkZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNBUjogeyBzeW1ib2w6IFwiXFx1MDYzMS5cXHUwNjMzLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU0JEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgU0NSOiB7IHN5bWJvbDogXCJTUlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU0RHOiB7IHN5bWJvbDogXCJcXHUwNjJjLlxcdTA2MzMuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTRUs6IHsgc3ltYm9sOiBcImtyXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTR0Q6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBTSFA6IHsgc3ltYm9sOiBcIlxcdTAwYTNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBTTEU6IHsgc3ltYm9sOiBcIkxlXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTT1M6IHsgc3ltYm9sOiBcIlNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNSRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU1NQOiB7IHN5bWJvbDogXCJcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTVE46IHsgc3ltYm9sOiBcIkRiXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTVkM6IHsgc3ltYm9sOiBcIlNWQ1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU1lQOiB7IHN5bWJvbDogXCJcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTWkw6IHsgc3ltYm9sOiBcIkVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFRIQjogeyBzeW1ib2w6IFwiXFx1MGUzZlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFRKUzogeyBzeW1ib2w6IFwiXFx1MDQ0MVxcdTA0M2VcXHUwNDNjLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVE1UOiB7IHN5bWJvbDogXCJUTVRcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFRORDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjJhLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVE9QOiB7IHN5bWJvbDogXCJUJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVFJZOiB7IHN5bWJvbDogXCJcXHUyMGJhXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgVFREOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgVFdEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgVFpTOiB7IHN5bWJvbDogXCJUU2hcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFVBSDogeyBzeW1ib2w6IFwiXFx1MjBiNFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVUdYOiB7IHN5bWJvbDogXCJVU2hcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFVTRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFVTTjogeyBzeW1ib2w6IFwiVVNOXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBVWUk6IHsgc3ltYm9sOiBcIlVZSVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVVlVOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBVWVc6IHsgc3ltYm9sOiBcIlVQXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBVWlM6IHsgc3ltYm9sOiBcInNvXFx1MDJiYm1cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFZFRDogeyBzeW1ib2w6IFwiVkVEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBWRUY6IHsgc3ltYm9sOiBcIkJzLlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVkVTOiB7IHN5bWJvbDogXCJCcy5TXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBWTkQ6IHsgc3ltYm9sOiBcIlxcdTIwYWJcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFZVVjogeyBzeW1ib2w6IFwiVlVWXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBXU1Q6IHsgc3ltYm9sOiBcIldTVFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWEFEOiB7IHN5bWJvbDogXCJYQURcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhBRjogeyBzeW1ib2w6IFwiRkNGQVwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWEFHOiB7IHN5bWJvbDogXCJYQUdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhBVTogeyBzeW1ib2w6IFwiWEFVXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYQkE6IHsgc3ltYm9sOiBcIlhCQVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWEJCOiB7IHN5bWJvbDogXCJYQkJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhCQzogeyBzeW1ib2w6IFwiWEJDXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYQkQ6IHsgc3ltYm9sOiBcIlhCRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWENEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgWENHOiB7IHN5bWJvbDogXCJDZy5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhEUjogeyBzeW1ib2w6IFwiWERSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYT0Y6IHsgc3ltYm9sOiBcIkZcXHUyMDJmQ0ZBXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYUEQ6IHsgc3ltYm9sOiBcIlhQRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFBGOiB7IHN5bWJvbDogXCJGQ0ZQXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYUFQ6IHsgc3ltYm9sOiBcIlhQVFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFNVOiB7IHN5bWJvbDogXCJYU1VcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhUUzogeyBzeW1ib2w6IFwiWFRTXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYVUE6IHsgc3ltYm9sOiBcIlhVQVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFhYOiB7IHN5bWJvbDogXCJcXHUwMGE0XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgWUVSOiB7IHN5bWJvbDogXCJcXHUwNjMxLlxcdTA2NGEuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBaQVI6IHsgc3ltYm9sOiBcIlJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFpNVzogeyBzeW1ib2w6IFwiWktcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFpXRzogeyBzeW1ib2w6IFwiWldHXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBaV0w6IHsgc3ltYm9sOiBcIlpXTFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbn0pO1xuXG5jb25zdCBDVVJSRU5DWV9DT0RFX1NFVCA9IG5ldyBTZXQoZXhwZW5zZUN1cnJlbmN5Q29kZXMpO1xuXG4vLyBNYXBzIGxlZ2FjeSBBeGFwdGEgY3VycmVuY3kgaWRlbnRpZmllcnMgdG8gdGhlIGNsb3Nlc3QgSVNPIGRpc3BsYXkgcnVsZS5cbmNvbnN0IENVUlJFTkNZX0NPREVfQUxJQVNFUzogUmVhZG9ubHk8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4gPSBPYmplY3QuZnJlZXplKHtcbiAgV09OOiBcIktSV1wiLFxufSk7XG5cbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9IChjdXJyZW5jeUNvZGU/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKGN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbi8vIFJlc29sdmVzIHRoZSBmaXhlZCBkaXNwbGF5IHJ1bGUgZm9yIGEga25vd24gZXhwZW5zZSBjdXJyZW5jeSBjb2RlLlxuZXhwb3J0IGNvbnN0IHJlc29sdmVDdXJyZW5jeURpc3BsYXlSdWxlID0gKGN1cnJlbmN5Q29kZT86IHN0cmluZyk6IEN1cnJlbmN5RGlzcGxheVJ1bGUgfCBudWxsID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCByZXNvbHZlZEN1cnJlbmN5Q29kZSA9IENVUlJFTkNZX0NPREVfQUxJQVNFU1tub3JtYWxpemVkQ3VycmVuY3lDb2RlXSA/PyBub3JtYWxpemVkQ3VycmVuY3lDb2RlO1xuICBpZiAoIXJlc29sdmVkQ3VycmVuY3lDb2RlIHx8ICFDVVJSRU5DWV9DT0RFX1NFVC5oYXMocmVzb2x2ZWRDdXJyZW5jeUNvZGUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gQ1VSUkVOQ1lfRElTUExBWV9SVUxFU1tyZXNvbHZlZEN1cnJlbmN5Q29kZV0gPz8ge1xuICAgIHN5bWJvbDogbm9ybWFsaXplZEN1cnJlbmN5Q29kZSxcbiAgICBwb3NpdGlvbjogXCJzdWZmaXhcIixcbiAgICBzcGFjZTogdHJ1ZSxcbiAgfTtcbn07XG5cbi8vIEFwcGxpZXMgYSByZXNvbHZlZCBjdXJyZW5jeSBkaXNwbGF5IHJ1bGUgd2l0aG91dCBjaGFuZ2luZyB0aGUgbnVtZXJpYyB0ZXh0LlxuZXhwb3J0IGNvbnN0IGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudCA9IChhbW91bnRUZXh0OiBzdHJpbmcsIGN1cnJlbmN5Q29kZT86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNhZmVBbW91bnRUZXh0ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBkaXNwbGF5UnVsZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlSdWxlKG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUpO1xuXG4gIGlmICghZGlzcGxheVJ1bGUpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA/IGAke3NhZmVBbW91bnRUZXh0fSAke25vcm1hbGl6ZWRDdXJyZW5jeUNvZGV9YCA6IHNhZmVBbW91bnRUZXh0O1xuICB9XG5cbiAgY29uc3Qgc2VwYXJhdG9yID0gZGlzcGxheVJ1bGUuc3BhY2UgPyBcIiBcIiA6IFwiXCI7XG4gIHJldHVybiBkaXNwbGF5UnVsZS5wb3NpdGlvbiA9PT0gXCJwcmVmaXhcIlxuICAgID8gYCR7ZGlzcGxheVJ1bGUuc3ltYm9sfSR7c2VwYXJhdG9yfSR7c2FmZUFtb3VudFRleHR9YFxuICAgIDogYCR7c2FmZUFtb3VudFRleHR9JHtzZXBhcmF0b3J9JHtkaXNwbGF5UnVsZS5zeW1ib2x9YDtcbn07XG4iLCAiY29uc3QgRVhQRU5TRV9OVU1CRVJfTE9DQUxFID0gXCJlbi1VU1wiO1xyXG5cclxudHlwZSBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9ucyA9IHtcclxuICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM/OiBudW1iZXI7XHJcbiAgbWF4aW11bUZyYWN0aW9uRGlnaXRzPzogbnVtYmVyO1xyXG4gIHVzZUdyb3VwaW5nPzogYm9vbGVhbjtcclxuICBmYWxsYmFjaz86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IHNhbml0aXplTnVtZXJpY1Rva2VuID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXlxcZC4sKy1dL2csIFwiXCIpO1xyXG59O1xyXG5cclxuY29uc3QgaXNUaG91c2FuZHNHcm91cGVkSW50ZWdlciA9ICh2YWx1ZTogc3RyaW5nLCBzZXBhcmF0b3I6IFwiLFwiIHwgXCIuXCIpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KHNlcGFyYXRvcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCA8PSAxKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKHBhcnRzLnNvbWUoKHBhcnQpID0+ICEvXlxcZCskLy50ZXN0KHBhcnQpKSkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChwYXJ0c1swXS5sZW5ndGggPCAxIHx8IHBhcnRzWzBdLmxlbmd0aCA+IDMpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gcGFydHMuc2xpY2UoMSkuZXZlcnkoKHBhcnQpID0+IHBhcnQubGVuZ3RoID09PSAzKTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBudW1lcmljIGlucHV0IHN1cHBvcnRpbmcgYm90aCBncm91cGVkIGFuZCBkZWNpbWFsIHZhbHVlcy5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCA9IChyYXc6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBpZiAocmF3ID09PSBudWxsIHx8IHJhdyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcclxuICBpZiAodHlwZW9mIHJhdyA9PT0gXCJudW1iZXJcIikgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShyYXcpID8gcmF3IDogbnVsbDtcclxuXHJcbiAgbGV0IHZhbHVlID0gc2FuaXRpemVOdW1lcmljVG9rZW4oU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGxldCBzaWduID0gXCJcIjtcclxuICBpZiAodmFsdWUuc3RhcnRzV2l0aChcIi1cIikpIHtcclxuICAgIHNpZ24gPSBcIi1cIjtcclxuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZS5zdGFydHNXaXRoKFwiK1wiKSkge1xyXG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcclxuICB9XHJcblxyXG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvWystXS9nLCBcIlwiKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgaGFzQ29tbWEgPSB2YWx1ZS5pbmNsdWRlcyhcIixcIik7XHJcbiAgY29uc3QgaGFzRG90ID0gdmFsdWUuaW5jbHVkZXMoXCIuXCIpO1xyXG5cclxuICBpZiAoaGFzQ29tbWEgJiYgIWhhc0RvdCAmJiBpc1Rob3VzYW5kc0dyb3VwZWRJbnRlZ2VyKHZhbHVlLCBcIixcIikpIHtcclxuICAgIGNvbnN0IHBhcnNlZEludGVnZXIgPSBOdW1iZXIoYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoLywvZywgXCJcIil9YCk7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZEludGVnZXIpID8gcGFyc2VkSW50ZWdlciA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBpZiAoaGFzRG90ICYmICFoYXNDb21tYSAmJiBpc1Rob3VzYW5kc0dyb3VwZWRJbnRlZ2VyKHZhbHVlLCBcIi5cIikpIHtcclxuICAgIGNvbnN0IHBhcnNlZEludGVnZXIgPSBOdW1iZXIoYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoL1xcLi9nLCBcIlwiKX1gKTtcclxuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkSW50ZWdlcikgPyBwYXJzZWRJbnRlZ2VyIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxhc3RDb21tYSA9IHZhbHVlLmxhc3RJbmRleE9mKFwiLFwiKTtcclxuICBjb25zdCBsYXN0RG90ID0gdmFsdWUubGFzdEluZGV4T2YoXCIuXCIpO1xyXG4gIGNvbnN0IGRlY2ltYWxTZXBhcmF0b3JJbmRleCA9IE1hdGgubWF4KGxhc3RDb21tYSwgbGFzdERvdCk7XHJcblxyXG4gIGxldCBub3JtYWxpemVkOiBzdHJpbmc7XHJcbiAgaWYgKGRlY2ltYWxTZXBhcmF0b3JJbmRleCA+PSAwKSB7XHJcbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbHVlLnNsaWNlKDAsIGRlY2ltYWxTZXBhcmF0b3JJbmRleCkucmVwbGFjZSgvWy4sXS9nLCBcIlwiKTtcclxuICAgIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsdWUuc2xpY2UoZGVjaW1hbFNlcGFyYXRvckluZGV4ICsgMSkucmVwbGFjZSgvWy4sXS9nLCBcIlwiKTtcclxuICAgIG5vcm1hbGl6ZWQgPSBgJHtzaWdufSR7aW50ZWdlclBhcnQgfHwgXCIwXCJ9JHtkZWNpbWFsUGFydCA/IGAuJHtkZWNpbWFsUGFydH1gIDogXCJcIn1gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBub3JtYWxpemVkID0gYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoL1suLF0vZywgXCJcIil9YDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcihub3JtYWxpemVkKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuLy8gRm9ybWF0cyBudW1lcmljIHZhbHVlcyB3aXRoIHRoZSBmaXhlZCBleHBlbnNlIHZpc3VhbCBjb250cmFjdDogIywjIzAuMDBcclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VOdW1iZXIgPSAoXHJcbiAgdmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VOdW1iZXJGb3JtYXRPcHRpb25zXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZmFsbGJhY2sgPSBvcHRpb25zPy5mYWxsYmFjayA/PyBcIi1cIjtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlKSkpIHtcclxuICAgIHJldHVybiBmYWxsYmFjaztcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoRVhQRU5TRV9OVU1CRVJfTE9DQUxFLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcclxuICAgIHVzZUdyb3VwaW5nOiBvcHRpb25zPy51c2VHcm91cGluZyA/PyB0cnVlLFxyXG4gIH0pLmZvcm1hdChOdW1iZXIodmFsdWUpKTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbmQgZm9ybWF0cyByYXcgaW5wdXQgdmFsdWVzIHRvIHRoZSBmaXhlZCBleHBlbnNlIHZpc3VhbCBjb250cmFjdC5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciA9IChcclxuICByYXc6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VOdW1iZXJGb3JtYXRPcHRpb25zXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHJhdyk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIG9wdGlvbnM/LmZhbGxiYWNrID8/IFwiXCI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcihwYXJzZWQsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogb3B0aW9ucz8ubWluaW11bUZyYWN0aW9uRGlnaXRzID8/IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IG9wdGlvbnM/LnVzZUdyb3VwaW5nID8/IHRydWUsXHJcbiAgICBmYWxsYmFjazogb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCJcIixcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudCB9IGZyb20gXCIuL2NvbnN0YW50cy9jdXJyZW5jeURpc3BsYXlSdWxlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxuLy8gRm9ybWF0cyBhIG51bWVyaWMgYW1vdW50IHdpdGggZml4ZWQgVUkgbnVtYmVyIHN0eWxlIGFuZCBvcHRpb25hbCBjdXJyZW5jeSBjb2RlLlxuZXhwb3J0IGNvbnN0IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSA9IChcbiAgYW1vdW50OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmcsXG4gIF9sb2NhbGU/OiBzdHJpbmdcbik6IHN0cmluZyA9PiB7XG4gIGlmIChhbW91bnQgPT09IG51bGwgfHwgYW1vdW50ID09PSB1bmRlZmluZWQgfHwgTnVtYmVyLmlzTmFOKE51bWJlcihhbW91bnQpKSkge1xuICAgIHJldHVybiBcIi1cIjtcbiAgfVxuXG4gIGNvbnN0IHNhZmVDdXJyZW5jeSA9IFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRlY2ltYWxUZXh0ID0gZm9ybWF0RXhwZW5zZU51bWJlcihhbW91bnQsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgfSk7XG5cbiAgcmV0dXJuIGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudChkZWNpbWFsVGV4dCwgc2FmZUN1cnJlbmN5KTtcbn07XG4iLCAidHlwZSBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7XHJcbiAgYXNrQ29uZmlybWF0aW9uPzogYm9vbGVhbjtcclxuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFJlbG9hZEV4cGVuc2VQYWdlT3B0aW9ucyA9IHtcclxuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyB0aGUgZ2xvYmFsIG5hdmlnYXRpb24gZ3VhcmQgbGlmZWN5Y2xlIGZvciBhY3RpdmUgZWRpdCBwcm9jZXNzZXMuXHJcbmV4cG9ydCBjb25zdCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkID0gKFxyXG4gIGFjdGl2ZU9yT3B0aW9ucz86IGJvb2xlYW4gfCBJbmROYXZpZ2F0aW9uR3VhcmRPcHRpb25zLFxyXG4gIG1lc3NhZ2U/OiBzdHJpbmdcclxuKTogdm9pZCA9PiB7XHJcbiAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oYWN0aXZlT3JPcHRpb25zLCBtZXNzYWdlKTtcclxufTtcclxuXHJcbi8vIENsZWFycyBnbG9iYWwgbmF2aWdhdGlvbiBndWFyZCBmbGFncyB3aGVuIGNvbXBvbmVudCB1bm1vdW50cy5cclxuZXhwb3J0IGNvbnN0IGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCA9ICgpOiB2b2lkID0+IHtcclxuICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbn07XHJcblxyXG4vLyBFeGVjdXRlcyBuYXZpZ2F0aW9uIGFjdGlvbiB0aHJvdWdoIHNpdGUgZ3VhcmQgaWYgYXZhaWxhYmxlLlxyXG5leHBvcnQgY29uc3QgcnVuR3VhcmRlZE5hdmlnYXRpb24gPSAoXHJcbiAgYWN0aW9uOiAoKSA9PiB2b2lkLFxyXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XHJcbik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHsgYXNrQ29uZmlybWF0aW9uID0gZmFsc2UsIG1lc3NhZ2UgfSA9IG9wdGlvbnM7XHJcbiAgaWYgKGFza0NvbmZpcm1hdGlvbiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oYWN0aW9uLCBtZXNzYWdlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGFjdGlvbigpO1xyXG59O1xyXG5cclxuLy8gTmF2aWdhdGVzIHRvIHRhcmdldCBVUkwgYW5kIGtlZXBzIHNpdGUtbGV2ZWwgZ3VhcmQgYmVoYXZpb3IgY29uc2lzdGVudC5cclxuZXhwb3J0IGNvbnN0IG5hdmlnYXRlVG9FeHBlbnNlVXJsID0gKFxyXG4gIHRhcmdldFVybDogc3RyaW5nLFxyXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XHJcbik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHNhZmVVcmwgPSBTdHJpbmcodGFyZ2V0VXJsIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXNhZmVVcmwpIHJldHVybjtcclxuXHJcbiAgY29uc3QgeyBieXBhc3NHdWFyZE9uY2UgPSB0cnVlIH0gPSBvcHRpb25zO1xyXG4gIHJ1bkd1YXJkZWROYXZpZ2F0aW9uKCgpID0+IHtcclxuICAgIGlmIChieXBhc3NHdWFyZE9uY2UpIHtcclxuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNhZmVVcmw7XHJcbiAgfSwgb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vLyBSZWxvYWRzIHRoZSBjdXJyZW50IHBhZ2Ugd2hpbGUgYnlwYXNzaW5nIHRoZSBnbG9iYWwgdW5zYXZlZC1jaGFuZ2UgZ3VhcmQgd2hlbiBuZWVkZWQuXHJcbmV4cG9ydCBjb25zdCByZWxvYWRFeHBlbnNlUGFnZSA9IChvcHRpb25zOiBSZWxvYWRFeHBlbnNlUGFnZU9wdGlvbnMgPSB7fSk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHsgYnlwYXNzR3VhcmRPbmNlID0gdHJ1ZSB9ID0gb3B0aW9ucztcclxuICBpZiAoYnlwYXNzR3VhcmRPbmNlKSB7XHJcbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICB9XHJcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBR08sSUFBTSx1QkFBaUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRU8sSUFBTSx5QkFBeUIscUJBQXFCLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxNQUFNLE1BQU0sS0FBSyxFQUFFOzs7QUMvSy9GLElBQU0seUJBQXdFLE9BQU8sT0FBTztBQUFBLEVBQ2pHLEtBQUssRUFBRSxRQUFRLGtCQUFrQixVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDakUsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEsV0FBYSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDNUQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDcEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsUUFBUSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdkQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsa0JBQWtCLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNqRSxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxRQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxXQUFXLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxrQkFBa0IsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ2pFLEtBQUssRUFBRSxRQUFRLFNBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLGdCQUFnQixVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDL0QsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsUUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsUUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEsWUFBWSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDNUQsS0FBSyxFQUFFLFFBQVEsUUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDcEQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDcEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDcEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsa0JBQWtCLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNqRSxLQUFLLEVBQUUsUUFBUSw0QkFBNEIsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzNFLEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLGtCQUFrQixVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDakUsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEs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QUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLHVCQUF1QixVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEUsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsa0JBQWtCLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNqRSxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxhQUFhLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUM1RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxRQUFRLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN2RCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxRQUFRLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN2RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxjQUFjLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUM3RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxRQUFRLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN2RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxRQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxrQkFBa0IsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ2pFLEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9B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
