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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2N1cnJlbmN5Q29kZXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvY3VycmVuY3lEaXNwbGF5UnVsZXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9leHBlbnNlRm9ybWF0dGVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBFWFBFTlNFX05VTUJFUl9MT0NBTEUgPSBcImVuLVVTXCI7XHJcblxyXG50eXBlIEV4cGVuc2VOdW1iZXJGb3JtYXRPcHRpb25zID0ge1xyXG4gIG1pbmltdW1GcmFjdGlvbkRpZ2l0cz86IG51bWJlcjtcclxuICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM/OiBudW1iZXI7XHJcbiAgdXNlR3JvdXBpbmc/OiBib29sZWFuO1xyXG4gIGZhbGxiYWNrPzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3Qgc2FuaXRpemVOdW1lcmljVG9rZW4gPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1teXFxkLiwrLV0vZywgXCJcIik7XHJcbn07XHJcblxyXG5jb25zdCBpc1Rob3VzYW5kc0dyb3VwZWRJbnRlZ2VyID0gKHZhbHVlOiBzdHJpbmcsIHNlcGFyYXRvcjogXCIsXCIgfCBcIi5cIik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoc2VwYXJhdG9yKTtcclxuICBpZiAocGFydHMubGVuZ3RoIDw9IDEpIHJldHVybiBmYWxzZTtcclxuICBpZiAocGFydHMuc29tZSgocGFydCkgPT4gIS9eXFxkKyQvLnRlc3QocGFydCkpKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKHBhcnRzWzBdLmxlbmd0aCA8IDEgfHwgcGFydHNbMF0ubGVuZ3RoID4gMykgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBwYXJ0cy5zbGljZSgxKS5ldmVyeSgocGFydCkgPT4gcGFydC5sZW5ndGggPT09IDMpO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIG51bWVyaWMgaW5wdXQgc3VwcG9ydGluZyBib3RoIGdyb3VwZWQgYW5kIGRlY2ltYWwgdmFsdWVzLlxyXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0ID0gKHJhdzogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGlmIChyYXcgPT09IG51bGwgfHwgcmF3ID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG4gIGlmICh0eXBlb2YgcmF3ID09PSBcIm51bWJlclwiKSByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHJhdykgPyByYXcgOiBudWxsO1xyXG5cclxuICBsZXQgdmFsdWUgPSBzYW5pdGl6ZU51bWVyaWNUb2tlbihTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgbGV0IHNpZ24gPSBcIlwiO1xyXG4gIGlmICh2YWx1ZS5zdGFydHNXaXRoKFwiLVwiKSkge1xyXG4gICAgc2lnbiA9IFwiLVwiO1xyXG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcclxuICB9IGVsc2UgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoXCIrXCIpKSB7XHJcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xyXG4gIH1cclxuXHJcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bKy1dL2csIFwiXCIpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBoYXNDb21tYSA9IHZhbHVlLmluY2x1ZGVzKFwiLFwiKTtcclxuICBjb25zdCBoYXNEb3QgPSB2YWx1ZS5pbmNsdWRlcyhcIi5cIik7XHJcblxyXG4gIGlmIChoYXNDb21tYSAmJiAhaGFzRG90ICYmIGlzVGhvdXNhbmRzR3JvdXBlZEludGVnZXIodmFsdWUsIFwiLFwiKSkge1xyXG4gICAgY29uc3QgcGFyc2VkSW50ZWdlciA9IE51bWJlcihgJHtzaWdufSR7dmFsdWUucmVwbGFjZSgvLC9nLCBcIlwiKX1gKTtcclxuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkSW50ZWdlcikgPyBwYXJzZWRJbnRlZ2VyIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGlmIChoYXNEb3QgJiYgIWhhc0NvbW1hICYmIGlzVGhvdXNhbmRzR3JvdXBlZEludGVnZXIodmFsdWUsIFwiLlwiKSkge1xyXG4gICAgY29uc3QgcGFyc2VkSW50ZWdlciA9IE51bWJlcihgJHtzaWdufSR7dmFsdWUucmVwbGFjZSgvXFwuL2csIFwiXCIpfWApO1xyXG4gICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWRJbnRlZ2VyKSA/IHBhcnNlZEludGVnZXIgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGFzdENvbW1hID0gdmFsdWUubGFzdEluZGV4T2YoXCIsXCIpO1xyXG4gIGNvbnN0IGxhc3REb3QgPSB2YWx1ZS5sYXN0SW5kZXhPZihcIi5cIik7XHJcbiAgY29uc3QgZGVjaW1hbFNlcGFyYXRvckluZGV4ID0gTWF0aC5tYXgobGFzdENvbW1hLCBsYXN0RG90KTtcclxuXHJcbiAgbGV0IG5vcm1hbGl6ZWQ6IHN0cmluZztcclxuICBpZiAoZGVjaW1hbFNlcGFyYXRvckluZGV4ID49IDApIHtcclxuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gdmFsdWUuc2xpY2UoMCwgZGVjaW1hbFNlcGFyYXRvckluZGV4KS5yZXBsYWNlKC9bLixdL2csIFwiXCIpO1xyXG4gICAgY29uc3QgZGVjaW1hbFBhcnQgPSB2YWx1ZS5zbGljZShkZWNpbWFsU2VwYXJhdG9ySW5kZXggKyAxKS5yZXBsYWNlKC9bLixdL2csIFwiXCIpO1xyXG4gICAgbm9ybWFsaXplZCA9IGAke3NpZ259JHtpbnRlZ2VyUGFydCB8fCBcIjBcIn0ke2RlY2ltYWxQYXJ0ID8gYC4ke2RlY2ltYWxQYXJ0fWAgOiBcIlwifWA7XHJcbiAgfSBlbHNlIHtcclxuICAgIG5vcm1hbGl6ZWQgPSBgJHtzaWdufSR7dmFsdWUucmVwbGFjZSgvWy4sXS9nLCBcIlwiKX1gO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5vcm1hbGl6ZWQpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG4vLyBGb3JtYXRzIG51bWVyaWMgdmFsdWVzIHdpdGggdGhlIGZpeGVkIGV4cGVuc2UgdmlzdWFsIGNvbnRyYWN0OiAjLCMjMC4wMFxyXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZU51bWJlciA9IChcclxuICB2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICBvcHRpb25zPzogRXhwZW5zZU51bWJlckZvcm1hdE9wdGlvbnNcclxuKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBmYWxsYmFjayA9IG9wdGlvbnM/LmZhbGxiYWNrID8/IFwiLVwiO1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSkge1xyXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChFWFBFTlNFX05VTUJFUl9MT0NBTEUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogb3B0aW9ucz8ubWluaW11bUZyYWN0aW9uRGlnaXRzID8/IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxyXG4gICAgdXNlR3JvdXBpbmc6IG9wdGlvbnM/LnVzZUdyb3VwaW5nID8/IHRydWUsXHJcbiAgfSkuZm9ybWF0KE51bWJlcih2YWx1ZSkpO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuZCBmb3JtYXRzIHJhdyBpbnB1dCB2YWx1ZXMgdG8gdGhlIGZpeGVkIGV4cGVuc2UgdmlzdWFsIGNvbnRyYWN0LlxyXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyID0gKFxyXG4gIHJhdzogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICBvcHRpb25zPzogRXhwZW5zZU51bWJlckZvcm1hdE9wdGlvbnNcclxuKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQocmF3KTtcclxuICBpZiAocGFyc2VkID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCJcIjtcclxuICB9XHJcblxyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlTnVtYmVyKHBhcnNlZCwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogb3B0aW9ucz8ubWF4aW11bUZyYWN0aW9uRGlnaXRzID8/IDIsXHJcbiAgICB1c2VHcm91cGluZzogb3B0aW9ucz8udXNlR3JvdXBpbmcgPz8gdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBvcHRpb25zPy5mYWxsYmFjayA/PyBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiLy8gRml4ZWQgSVNPLWxpa2UgY3VycmVuY3kgY29kZSBsaXN0IGZvciBFeHBlbnNlIFNoZWV0cyBmaWx0ZXJzLlxuLy8gU291cmNlOiBTSVggSVNPIDQyMTcgTGlzdCBPbmUgWE1MLCBvZmZpY2lhbCBJU08gbWFpbnRlbmFuY2UgYWdlbmN5LlxuLy8gUmV0cmlldmVkIDIwMjYtMDUtMTkgZnJvbSBodHRwczovL3d3dy5zaXgtZ3JvdXAuY29tL2RhbS9kb3dubG9hZC9maW5hbmNpYWwtaW5mb3JtYXRpb24vZGF0YS1jZW50ZXIvaXNvLWN1cnJyZW5jeS9saXN0cy9saXN0LW9uZS54bWwuXG5leHBvcnQgY29uc3QgZXhwZW5zZUN1cnJlbmN5Q29kZXM6IHN0cmluZ1tdID0gW1xuICBcIkFFRFwiLFxuICBcIkFGTlwiLFxuICBcIkFMTFwiLFxuICBcIkFNRFwiLFxuICBcIkFPQVwiLFxuICBcIkFSU1wiLFxuICBcIkFVRFwiLFxuICBcIkFXR1wiLFxuICBcIkFaTlwiLFxuICBcIkJBTVwiLFxuICBcIkJCRFwiLFxuICBcIkJEVFwiLFxuICBcIkJIRFwiLFxuICBcIkJJRlwiLFxuICBcIkJNRFwiLFxuICBcIkJORFwiLFxuICBcIkJPQlwiLFxuICBcIkJPVlwiLFxuICBcIkJSTFwiLFxuICBcIkJTRFwiLFxuICBcIkJUTlwiLFxuICBcIkJXUFwiLFxuICBcIkJZTlwiLFxuICBcIkJaRFwiLFxuICBcIkNBRFwiLFxuICBcIkNERlwiLFxuICBcIkNIRVwiLFxuICBcIkNIRlwiLFxuICBcIkNIV1wiLFxuICBcIkNMRlwiLFxuICBcIkNMUFwiLFxuICBcIkNOWVwiLFxuICBcIkNPUFwiLFxuICBcIkNPVVwiLFxuICBcIkNSQ1wiLFxuICBcIkNVQ1wiLFxuICBcIkNVUFwiLFxuICBcIkNWRVwiLFxuICBcIkNaS1wiLFxuICBcIkRKRlwiLFxuICBcIkRLS1wiLFxuICBcIkRPUFwiLFxuICBcIkRaRFwiLFxuICBcIkVHUFwiLFxuICBcIkVSTlwiLFxuICBcIkVUQlwiLFxuICBcIkVVUlwiLFxuICBcIkZKRFwiLFxuICBcIkZLUFwiLFxuICBcIkdCUFwiLFxuICBcIkdFTFwiLFxuICBcIkdIU1wiLFxuICBcIkdJUFwiLFxuICBcIkdNRFwiLFxuICBcIkdORlwiLFxuICBcIkdUUVwiLFxuICBcIkdZRFwiLFxuICBcIkhLRFwiLFxuICBcIkhOTFwiLFxuICBcIkhUR1wiLFxuICBcIkhVRlwiLFxuICBcIklEUlwiLFxuICBcIklMU1wiLFxuICBcIklOUlwiLFxuICBcIklRRFwiLFxuICBcIklSUlwiLFxuICBcIklTS1wiLFxuICBcIkpNRFwiLFxuICBcIkpPRFwiLFxuICBcIkpQWVwiLFxuICBcIktFU1wiLFxuICBcIktHU1wiLFxuICBcIktIUlwiLFxuICBcIktNRlwiLFxuICBcIktQV1wiLFxuICBcIktSV1wiLFxuICBcIktXRFwiLFxuICBcIktZRFwiLFxuICBcIktaVFwiLFxuICBcIkxBS1wiLFxuICBcIkxCUFwiLFxuICBcIkxLUlwiLFxuICBcIkxSRFwiLFxuICBcIkxTTFwiLFxuICBcIkxZRFwiLFxuICBcIk1BRFwiLFxuICBcIk1ETFwiLFxuICBcIk1HQVwiLFxuICBcIk1LRFwiLFxuICBcIk1NS1wiLFxuICBcIk1OVFwiLFxuICBcIk1PUFwiLFxuICBcIk1SVVwiLFxuICBcIk1VUlwiLFxuICBcIk1WUlwiLFxuICBcIk1XS1wiLFxuICBcIk1YTlwiLFxuICBcIk1YVlwiLFxuICBcIk1ZUlwiLFxuICBcIk1aTlwiLFxuICBcIk5BRFwiLFxuICBcIk5HTlwiLFxuICBcIk5JT1wiLFxuICBcIk5PS1wiLFxuICBcIk5QUlwiLFxuICBcIk5aRFwiLFxuICBcIk9NUlwiLFxuICBcIlBBQlwiLFxuICBcIlBFTlwiLFxuICBcIlBHS1wiLFxuICBcIlBIUFwiLFxuICBcIlBLUlwiLFxuICBcIlBMTlwiLFxuICBcIlBZR1wiLFxuICBcIlFBUlwiLFxuICBcIlJPTlwiLFxuICBcIlJTRFwiLFxuICBcIlJVQlwiLFxuICBcIlJXRlwiLFxuICBcIlNBUlwiLFxuICBcIlNCRFwiLFxuICBcIlNDUlwiLFxuICBcIlNER1wiLFxuICBcIlNFS1wiLFxuICBcIlNHRFwiLFxuICBcIlNIUFwiLFxuICBcIlNMRVwiLFxuICBcIlNPU1wiLFxuICBcIlNSRFwiLFxuICBcIlNTUFwiLFxuICBcIlNUTlwiLFxuICBcIlNWQ1wiLFxuICBcIlNZUFwiLFxuICBcIlNaTFwiLFxuICBcIlRIQlwiLFxuICBcIlRKU1wiLFxuICBcIlRNVFwiLFxuICBcIlRORFwiLFxuICBcIlRPUFwiLFxuICBcIlRSWVwiLFxuICBcIlRURFwiLFxuICBcIlRXRFwiLFxuICBcIlRaU1wiLFxuICBcIlVBSFwiLFxuICBcIlVHWFwiLFxuICBcIlVTRFwiLFxuICBcIlVTTlwiLFxuICBcIlVZSVwiLFxuICBcIlVZVVwiLFxuICBcIlVZV1wiLFxuICBcIlVaU1wiLFxuICBcIlZFRFwiLFxuICBcIlZFRlwiLFxuICBcIlZFU1wiLFxuICBcIlZORFwiLFxuICBcIlZVVlwiLFxuICBcIldTVFwiLFxuICBcIlhBRFwiLFxuICBcIlhBRlwiLFxuICBcIlhBR1wiLFxuICBcIlhBVVwiLFxuICBcIlhCQVwiLFxuICBcIlhCQlwiLFxuICBcIlhCQ1wiLFxuICBcIlhCRFwiLFxuICBcIlhDRFwiLFxuICBcIlhDR1wiLFxuICBcIlhEUlwiLFxuICBcIlhPRlwiLFxuICBcIlhQRFwiLFxuICBcIlhQRlwiLFxuICBcIlhQVFwiLFxuICBcIlhTVVwiLFxuICBcIlhUU1wiLFxuICBcIlhVQVwiLFxuICBcIlhYWFwiLFxuICBcIllFUlwiLFxuICBcIlpBUlwiLFxuICBcIlpNV1wiLFxuICBcIlpXR1wiLFxuICBcIlpXTFwiLFxuXTtcblxuZXhwb3J0IGNvbnN0IGV4cGVuc2VDdXJyZW5jeU9wdGlvbnMgPSBleHBlbnNlQ3VycmVuY3lDb2Rlcy5tYXAoKGNvZGUpID0+ICh7IHZhbHVlOiBjb2RlLCB0ZXh0OiBjb2RlIH0pKTtcbiIsICJpbXBvcnQgeyBleHBlbnNlQ3VycmVuY3lDb2RlcyB9IGZyb20gXCIuL2N1cnJlbmN5Q29kZXMudHNcIjtcblxuZXhwb3J0IHR5cGUgQ3VycmVuY3lTeW1ib2xQb3NpdGlvbiA9IFwicHJlZml4XCIgfCBcInN1ZmZpeFwiO1xuXG5leHBvcnQgdHlwZSBDdXJyZW5jeURpc3BsYXlSdWxlID0ge1xuICBzeW1ib2w6IHN0cmluZztcbiAgcG9zaXRpb246IEN1cnJlbmN5U3ltYm9sUG9zaXRpb247XG4gIHNwYWNlOiBib29sZWFuO1xufTtcblxuLy8gRml4ZWQgY3VycmVuY3kgZGlzcGxheSBydWxlcyBmb3IgZXhwZW5zZSBhbW91bnQgbGFiZWxzLlxuLy8gQmFzZWxpbmUgZ2VuZXJhdGVkIGZyb20gVW5pY29kZSBDTERSIDQ4IG5hdGl2ZSBsb2NhbGUgY3VycmVuY3kgcGFydHMgd2l0aCBuYXJyb3cgc3ltYm9scy5cbmV4cG9ydCBjb25zdCBDVVJSRU5DWV9ESVNQTEFZX1JVTEVTOiBSZWFkb25seTxSZWNvcmQ8c3RyaW5nLCBDdXJyZW5jeURpc3BsYXlSdWxlPj4gPSBPYmplY3QuZnJlZXplKHtcbiAgQUVEOiB7IHN5bWJvbDogXCJcXHUwNjJmLlxcdTA2MjUuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBBRk46IHsgc3ltYm9sOiBcIlxcdTA2MGJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEFMTDogeyBzeW1ib2w6IFwiTGVrXFx1MDBlYlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQU1EOiB7IHN5bWJvbDogXCJcXHUwNThmXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBBT0E6IHsgc3ltYm9sOiBcIkt6XCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBBUlM6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEFVRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEFXRzogeyBzeW1ib2w6IFwiQWZsLlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQVpOOiB7IHN5bWJvbDogXCJcXHUyMGJjXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCQU06IHsgc3ltYm9sOiBcIktNXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCQkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBCRFQ6IHsgc3ltYm9sOiBcIlxcdTA5ZjNcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBCSEQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyOC5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJJRjogeyBzeW1ib2w6IFwiRkJ1XCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCTUQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBCTkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJPQjogeyBzeW1ib2w6IFwiQnNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEJPVjogeyBzeW1ib2w6IFwiQk9WXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCUkw6IHsgc3ltYm9sOiBcIlIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCU0Q6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBCVE46IHsgc3ltYm9sOiBcIk51LlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQldQOiB7IHN5bWJvbDogXCJQXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCWU46IHsgc3ltYm9sOiBcIkJyXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBCWkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBDQUQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBDREY6IHsgc3ltYm9sOiBcIkZDXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDSEU6IHsgc3ltYm9sOiBcIkNIRVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ0hGOiB7IHN5bWJvbDogXCJDSEZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENIVzogeyBzeW1ib2w6IFwiQ0hXXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDTEY6IHsgc3ltYm9sOiBcIkNMRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ0xQOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgQ05ZOiB7IHN5bWJvbDogXCJcXHUwMGE1XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgQ09QOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBDT1U6IHsgc3ltYm9sOiBcIkNPVVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgQ1JDOiB7IHN5bWJvbDogXCJcXHUyMGExXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgQ1VDOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgQ1VQOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgQ1ZFOiB7IHN5bWJvbDogXCJDVkVcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIENaSzogeyBzeW1ib2w6IFwiS1xcdTAxMGRcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIERKRjogeyBzeW1ib2w6IFwiRmRqXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBES0s6IHsgc3ltYm9sOiBcImtyLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgRE9QOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgRFpEOiB7IHN5bWJvbDogXCJcXHUwNjJmLlxcdTA2MmMuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBFR1A6IHsgc3ltYm9sOiBcIkVcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBFUk46IHsgc3ltYm9sOiBcIk5ma1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgRVRCOiB7IHN5bWJvbDogXCJcXHUxMjY1XFx1MTIyZFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgRVVSOiB7IHN5bWJvbDogXCJcXHUyMGFjXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBGSkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBGS1A6IHsgc3ltYm9sOiBcIlxcdTAwYTNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBHQlA6IHsgc3ltYm9sOiBcIlxcdTAwYTNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBHRUw6IHsgc3ltYm9sOiBcIlxcdTIwYmVcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEdIUzogeyBzeW1ib2w6IFwiR0hcXHUyMGI1XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgR0lQOiB7IHN5bWJvbDogXCJcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgR01EOiB7IHN5bWJvbDogXCJEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBHTkY6IHsgc3ltYm9sOiBcIkZHXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBHVFE6IHsgc3ltYm9sOiBcIlFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEdZRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEhLRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEhOTDogeyBzeW1ib2w6IFwiTFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSFRHOiB7IHN5bWJvbDogXCJIVEdcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEhVRjogeyBzeW1ib2w6IFwiRnRcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIElEUjogeyBzeW1ib2w6IFwiUnBcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIElMUzogeyBzeW1ib2w6IFwiXFx1MjBhYVwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgSU5SOiB7IHN5bWJvbDogXCJcXHUyMGI5XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgSVFEOiB7IHN5bWJvbDogXCJcXHUwNjJmLlxcdTA2MzkuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBJUlI6IHsgc3ltYm9sOiBcIlxcdTA2MzFcXHUwNmNjXFx1MDYyN1xcdTA2NDRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIElTSzogeyBzeW1ib2w6IFwia3IuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBKTUQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBKT0Q6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyMy5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEpQWTogeyBzeW1ib2w6IFwiXFx1ZmZlNVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEtFUzogeyBzeW1ib2w6IFwiS3NoXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBLR1M6IHsgc3ltYm9sOiBcIlxcdTIwYzBcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEtIUjogeyBzeW1ib2w6IFwiXFx1MTdkYlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEtNRjogeyBzeW1ib2w6IFwiQ0ZcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIEtQVzogeyBzeW1ib2w6IFwiXFx1MjBhOVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEtSVzogeyBzeW1ib2w6IFwiXFx1MjBhOVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIEtXRDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjQzLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgS1lEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgS1pUOiB7IHN5bWJvbDogXCJcXHUyMGI4XCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBMQUs6IHsgc3ltYm9sOiBcIlxcdTIwYWRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBMQlA6IHsgc3ltYm9sOiBcIkxcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBMS1I6IHsgc3ltYm9sOiBcIlxcdTBkYmJcXHUwZGQ0LlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTFJEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgTFNMOiB7IHN5bWJvbDogXCJNXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBMWUQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDY0NC5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1BRDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjQ1LlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTURMOiB7IHN5bWJvbDogXCJMXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNR0E6IHsgc3ltYm9sOiBcIkFyXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNS0Q6IHsgc3ltYm9sOiBcIlxcdTA0MzRcXHUwNDM1XFx1MDQzZC5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1NSzogeyBzeW1ib2w6IFwiS1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTU5UOiB7IHN5bWJvbDogXCJcXHUyMGFlXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNT1A6IHsgc3ltYm9sOiBcIk1PUCRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBNUlU6IHsgc3ltYm9sOiBcIlxcdTA2MjMuXFx1MDY0NS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1VUjogeyBzeW1ib2w6IFwiUnNcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE1WUjogeyBzeW1ib2w6IFwiTVZSXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNV0s6IHsgc3ltYm9sOiBcIk1LXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBNWE46IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBNWFY6IHsgc3ltYm9sOiBcIk1YVlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTVlSOiB7IHN5bWJvbDogXCJSTVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgTVpOOiB7IHN5bWJvbDogXCJNVG5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIE5BRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIE5HTjogeyBzeW1ib2w6IFwiXFx1MjBhNlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIE5JTzogeyBzeW1ib2w6IFwiQyRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBOT0s6IHsgc3ltYm9sOiBcImtyXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBOUFI6IHsgc3ltYm9sOiBcIlxcdTA5MzBcXHUwOTQyXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBOWkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBPTVI6IHsgc3ltYm9sOiBcIlxcdTA2MzEuXFx1MDYzOS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFBBQjogeyBzeW1ib2w6IFwiQi8uXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBQRU46IHsgc3ltYm9sOiBcIlMvXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBQR0s6IHsgc3ltYm9sOiBcIlBHS1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUEhQOiB7IHN5bWJvbDogXCJcXHUyMGIxXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgUEtSOiB7IHN5bWJvbDogXCJSc1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUExOOiB7IHN5bWJvbDogXCJ6XFx1MDE0MlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUFlHOiB7IHN5bWJvbDogXCJcXHUyMGIyXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBRQVI6IHsgc3ltYm9sOiBcIlxcdTA2MzEuXFx1MDY0Mi5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFJPTjogeyBzeW1ib2w6IFwibGVpXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBSU0Q6IHsgc3ltYm9sOiBcIlJTRFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgUlVCOiB7IHN5bWJvbDogXCJcXHUyMGJkXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBSV0Y6IHsgc3ltYm9sOiBcIlJGXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTQVI6IHsgc3ltYm9sOiBcIlxcdTA2MzEuXFx1MDYzMy5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNCRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFNDUjogeyBzeW1ib2w6IFwiU1JcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNERzogeyBzeW1ib2w6IFwiXFx1MDYyYy5cXHUwNjMzLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU0VLOiB7IHN5bWJvbDogXCJrclwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU0dEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgU0hQOiB7IHN5bWJvbDogXCJcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcbiAgU0xFOiB7IHN5bWJvbDogXCJMZVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU09TOiB7IHN5bWJvbDogXCJTXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBTUkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNTUDogeyBzeW1ib2w6IFwiXFx1MDBhM1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU1ROOiB7IHN5bWJvbDogXCJEYlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU1ZDOiB7IHN5bWJvbDogXCJTVkNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFNZUDogeyBzeW1ib2w6IFwiXFx1MDBhM1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgU1pMOiB7IHN5bWJvbDogXCJFXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBUSEI6IHsgc3ltYm9sOiBcIlxcdTBlM2ZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBUSlM6IHsgc3ltYm9sOiBcIlxcdTA0NDFcXHUwNDNlXFx1MDQzYy5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFRNVDogeyBzeW1ib2w6IFwiVE1UXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBUTkQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyYS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFRPUDogeyBzeW1ib2w6IFwiVCRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFRSWTogeyBzeW1ib2w6IFwiXFx1MjBiYVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFRURDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFRXRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFRaUzogeyBzeW1ib2w6IFwiVFNoXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBVQUg6IHsgc3ltYm9sOiBcIlxcdTIwYjRcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFVHWDogeyBzeW1ib2w6IFwiVVNoXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBVU0Q6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxuICBVU046IHsgc3ltYm9sOiBcIlVTTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVVlJOiB7IHN5bWJvbDogXCJVWUlcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFVZVTogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVVlXOiB7IHN5bWJvbDogXCJVUFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVVpTOiB7IHN5bWJvbDogXCJzb1xcdTAyYmJtXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBWRUQ6IHsgc3ltYm9sOiBcIlZFRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVkVGOiB7IHN5bWJvbDogXCJCcy5cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFZFUzogeyBzeW1ib2w6IFwiQnMuU1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgVk5EOiB7IHN5bWJvbDogXCJcXHUyMGFiXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBWVVY6IHsgc3ltYm9sOiBcIlZVVlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgV1NUOiB7IHN5bWJvbDogXCJXU1RcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhBRDogeyBzeW1ib2w6IFwiWEFEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYQUY6IHsgc3ltYm9sOiBcIkZDRkFcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhBRzogeyBzeW1ib2w6IFwiWEFHXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYQVU6IHsgc3ltYm9sOiBcIlhBVVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWEJBOiB7IHN5bWJvbDogXCJYQkFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhCQjogeyBzeW1ib2w6IFwiWEJCXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYQkM6IHsgc3ltYm9sOiBcIlhCQ1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWEJEOiB7IHN5bWJvbDogXCJYQkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhDRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFhDRzogeyBzeW1ib2w6IFwiQ2cuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYRFI6IHsgc3ltYm9sOiBcIlhEUlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWE9GOiB7IHN5bWJvbDogXCJGXFx1MjAyZkNGQVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFBEOiB7IHN5bWJvbDogXCJYUERcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhQRjogeyBzeW1ib2w6IFwiRkNGUFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFBUOiB7IHN5bWJvbDogXCJYUFRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhTVTogeyBzeW1ib2w6IFwiWFNVXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBYVFM6IHsgc3ltYm9sOiBcIlhUU1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWFVBOiB7IHN5bWJvbDogXCJYVUFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG4gIFhYWDogeyBzeW1ib2w6IFwiXFx1MDBhNFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXG4gIFlFUjogeyBzeW1ib2w6IFwiXFx1MDYzMS5cXHUwNjRhLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWkFSOiB7IHN5bWJvbDogXCJSXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBaTVc6IHsgc3ltYm9sOiBcIlpLXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxuICBaV0c6IHsgc3ltYm9sOiBcIlpXR1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcbiAgWldMOiB7IHN5bWJvbDogXCJaV0xcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXG59KTtcblxuY29uc3QgQ1VSUkVOQ1lfQ09ERV9TRVQgPSBuZXcgU2V0KGV4cGVuc2VDdXJyZW5jeUNvZGVzKTtcblxuLy8gTWFwcyBsZWdhY3kgQXhhcHRhIGN1cnJlbmN5IGlkZW50aWZpZXJzIHRvIHRoZSBjbG9zZXN0IElTTyBkaXNwbGF5IHJ1bGUuXG5jb25zdCBDVVJSRU5DWV9DT0RFX0FMSUFTRVM6IFJlYWRvbmx5PFJlY29yZDxzdHJpbmcsIHN0cmluZz4+ID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFdPTjogXCJLUldcIixcbn0pO1xuXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAoY3VycmVuY3lDb2RlPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG59O1xuXG4vLyBSZXNvbHZlcyB0aGUgZml4ZWQgZGlzcGxheSBydWxlIGZvciBhIGtub3duIGV4cGVuc2UgY3VycmVuY3kgY29kZS5cbmV4cG9ydCBjb25zdCByZXNvbHZlQ3VycmVuY3lEaXNwbGF5UnVsZSA9IChjdXJyZW5jeUNvZGU/OiBzdHJpbmcpOiBDdXJyZW5jeURpc3BsYXlSdWxlIHwgbnVsbCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoY3VycmVuY3lDb2RlKTtcbiAgY29uc3QgcmVzb2x2ZWRDdXJyZW5jeUNvZGUgPSBDVVJSRU5DWV9DT0RFX0FMSUFTRVNbbm9ybWFsaXplZEN1cnJlbmN5Q29kZV0gPz8gbm9ybWFsaXplZEN1cnJlbmN5Q29kZTtcbiAgaWYgKCFyZXNvbHZlZEN1cnJlbmN5Q29kZSB8fCAhQ1VSUkVOQ1lfQ09ERV9TRVQuaGFzKHJlc29sdmVkQ3VycmVuY3lDb2RlKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIENVUlJFTkNZX0RJU1BMQVlfUlVMRVNbcmVzb2x2ZWRDdXJyZW5jeUNvZGVdID8/IHtcbiAgICBzeW1ib2w6IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXG4gICAgcG9zaXRpb246IFwic3VmZml4XCIsXG4gICAgc3BhY2U6IHRydWUsXG4gIH07XG59O1xuXG4vLyBBcHBsaWVzIGEgcmVzb2x2ZWQgY3VycmVuY3kgZGlzcGxheSBydWxlIHdpdGhvdXQgY2hhbmdpbmcgdGhlIG51bWVyaWMgdGV4dC5cbmV4cG9ydCBjb25zdCBmb3JtYXRDdXJyZW5jeURpc3BsYXlBbW91bnQgPSAoYW1vdW50VGV4dDogc3RyaW5nLCBjdXJyZW5jeUNvZGU/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzYWZlQW1vdW50VGV4dCA9IGFtb3VudFRleHQgfHwgXCItXCI7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoY3VycmVuY3lDb2RlKTtcbiAgY29uc3QgZGlzcGxheVJ1bGUgPSByZXNvbHZlQ3VycmVuY3lEaXNwbGF5UnVsZShub3JtYWxpemVkQ3VycmVuY3lDb2RlKTtcblxuICBpZiAoIWRpc3BsYXlSdWxlKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUgPyBgJHtzYWZlQW1vdW50VGV4dH0gJHtub3JtYWxpemVkQ3VycmVuY3lDb2RlfWAgOiBzYWZlQW1vdW50VGV4dDtcbiAgfVxuXG4gIGNvbnN0IHNlcGFyYXRvciA9IGRpc3BsYXlSdWxlLnNwYWNlID8gXCIgXCIgOiBcIlwiO1xuICByZXR1cm4gZGlzcGxheVJ1bGUucG9zaXRpb24gPT09IFwicHJlZml4XCJcbiAgICA/IGAke2Rpc3BsYXlSdWxlLnN5bWJvbH0ke3NlcGFyYXRvcn0ke3NhZmVBbW91bnRUZXh0fWBcbiAgICA6IGAke3NhZmVBbW91bnRUZXh0fSR7c2VwYXJhdG9yfSR7ZGlzcGxheVJ1bGUuc3ltYm9sfWA7XG59O1xuIiwgImltcG9ydCB7IGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudCB9IGZyb20gXCIuL2NvbnN0YW50cy9jdXJyZW5jeURpc3BsYXlSdWxlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxuLy8gRm9ybWF0cyBhIG51bWVyaWMgYW1vdW50IHdpdGggZml4ZWQgVUkgbnVtYmVyIHN0eWxlIGFuZCBvcHRpb25hbCBjdXJyZW5jeSBjb2RlLlxuZXhwb3J0IGNvbnN0IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSA9IChcbiAgYW1vdW50OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmcsXG4gIF9sb2NhbGU/OiBzdHJpbmdcbik6IHN0cmluZyA9PiB7XG4gIGlmIChhbW91bnQgPT09IG51bGwgfHwgYW1vdW50ID09PSB1bmRlZmluZWQgfHwgTnVtYmVyLmlzTmFOKE51bWJlcihhbW91bnQpKSkge1xuICAgIHJldHVybiBcIi1cIjtcbiAgfVxuXG4gIGNvbnN0IHNhZmVDdXJyZW5jeSA9IFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRlY2ltYWxUZXh0ID0gZm9ybWF0RXhwZW5zZU51bWJlcihhbW91bnQsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgfSk7XG5cbiAgcmV0dXJuIGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudChkZWNpbWFsVGV4dCwgc2FmZUN1cnJlbmN5KTtcbn07XG4iLCAidHlwZSBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7XHJcbiAgYXNrQ29uZmlybWF0aW9uPzogYm9vbGVhbjtcclxuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFJlbG9hZEV4cGVuc2VQYWdlT3B0aW9ucyA9IHtcclxuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyB0aGUgZ2xvYmFsIG5hdmlnYXRpb24gZ3VhcmQgbGlmZWN5Y2xlIGZvciBhY3RpdmUgZWRpdCBwcm9jZXNzZXMuXHJcbmV4cG9ydCBjb25zdCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkID0gKFxyXG4gIGFjdGl2ZU9yT3B0aW9ucz86IGJvb2xlYW4gfCBJbmROYXZpZ2F0aW9uR3VhcmRPcHRpb25zLFxyXG4gIG1lc3NhZ2U/OiBzdHJpbmdcclxuKTogdm9pZCA9PiB7XHJcbiAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oYWN0aXZlT3JPcHRpb25zLCBtZXNzYWdlKTtcclxufTtcclxuXHJcbi8vIENsZWFycyBnbG9iYWwgbmF2aWdhdGlvbiBndWFyZCBmbGFncyB3aGVuIGNvbXBvbmVudCB1bm1vdW50cy5cclxuZXhwb3J0IGNvbnN0IGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCA9ICgpOiB2b2lkID0+IHtcclxuICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbn07XHJcblxyXG4vLyBFeGVjdXRlcyBuYXZpZ2F0aW9uIGFjdGlvbiB0aHJvdWdoIHNpdGUgZ3VhcmQgaWYgYXZhaWxhYmxlLlxyXG5leHBvcnQgY29uc3QgcnVuR3VhcmRlZE5hdmlnYXRpb24gPSAoXHJcbiAgYWN0aW9uOiAoKSA9PiB2b2lkLFxyXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XHJcbik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHsgYXNrQ29uZmlybWF0aW9uID0gZmFsc2UsIG1lc3NhZ2UgfSA9IG9wdGlvbnM7XHJcbiAgaWYgKGFza0NvbmZpcm1hdGlvbiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oYWN0aW9uLCBtZXNzYWdlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGFjdGlvbigpO1xyXG59O1xyXG5cclxuLy8gTmF2aWdhdGVzIHRvIHRhcmdldCBVUkwgYW5kIGtlZXBzIHNpdGUtbGV2ZWwgZ3VhcmQgYmVoYXZpb3IgY29uc2lzdGVudC5cclxuZXhwb3J0IGNvbnN0IG5hdmlnYXRlVG9FeHBlbnNlVXJsID0gKFxyXG4gIHRhcmdldFVybDogc3RyaW5nLFxyXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XHJcbik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHNhZmVVcmwgPSBTdHJpbmcodGFyZ2V0VXJsIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXNhZmVVcmwpIHJldHVybjtcclxuXHJcbiAgY29uc3QgeyBieXBhc3NHdWFyZE9uY2UgPSB0cnVlIH0gPSBvcHRpb25zO1xyXG4gIHJ1bkd1YXJkZWROYXZpZ2F0aW9uKCgpID0+IHtcclxuICAgIGlmIChieXBhc3NHdWFyZE9uY2UpIHtcclxuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNhZmVVcmw7XHJcbiAgfSwgb3B0aW9ucyk7XHJcbn07XHJcblxyXG4vLyBSZWxvYWRzIHRoZSBjdXJyZW50IHBhZ2Ugd2hpbGUgYnlwYXNzaW5nIHRoZSBnbG9iYWwgdW5zYXZlZC1jaGFuZ2UgZ3VhcmQgd2hlbiBuZWVkZWQuXHJcbmV4cG9ydCBjb25zdCByZWxvYWRFeHBlbnNlUGFnZSA9IChvcHRpb25zOiBSZWxvYWRFeHBlbnNlUGFnZU9wdGlvbnMgPSB7fSk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHsgYnlwYXNzR3VhcmRPbmNlID0gdHJ1ZSB9ID0gb3B0aW9ucztcclxuICBpZiAoYnlwYXNzR3VhcmRPbmNlKSB7XHJcbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICB9XHJcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsSUFBTSx3QkFBd0I7QUFTOUIsSUFBTSx1QkFBdUIsQ0FBQyxVQUEwQjtBQUN0RCxTQUFPLE1BQU0sUUFBUSxjQUFjLEVBQUU7QUFDdkM7QUFFQSxJQUFNLDRCQUE0QixDQUFDLE9BQWUsY0FBa0M7QUFDbEYsUUFBTSxRQUFRLE1BQU0sTUFBTSxTQUFTO0FBQ25DLE1BQUksTUFBTSxVQUFVLEVBQUcsUUFBTztBQUM5QixNQUFJLE1BQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUcsUUFBTztB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QSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFTyxJQUFNLHlCQUF5QixxQkFBcUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLE1BQU0sTUFBTSxLQUFLLEVBQUU7OztBQy9LL0YsSUFBTSx5QkFBd0UsT0FBTyxPQUFPO0FBQUEsRUFDakcsS0FBSyxFQUFFLFFBQVEsa0JBQWtCLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNqRSxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxXQUFhLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUM1RCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxRQUFRLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN2RCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxrQkFBa0IsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ2pFLEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLGtCQUFrQixVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDakUsS0FBSyxFQUFFLFFBQVEsU0FBVyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsZ0JBQWdCLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUMvRCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxRQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxRQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxZQUFZLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUM1RCxLQUFLLEVBQUUsUUFBUSxRQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxF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cEQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsdUJBQXVCLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RSxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxrQkFBa0IsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ2pFLEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLGFBQWEsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzVELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFFBQVEsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFFBQVEsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLGNBQWMsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzdELEtBQUssRUFB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
