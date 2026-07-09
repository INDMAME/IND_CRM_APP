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
var areExpenseNumericInputsEquivalent = (left, right) => {
  const leftParsed = parseExpenseNumericInput(left);
  const rightParsed = parseExpenseNumericInput(right);
  if (leftParsed !== null || rightParsed !== null) {
    return leftParsed === rightParsed;
  }
  return String(left ?? "").trim() === String(right ?? "").trim();
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

// Web/wwwroot/react/src/pages/gastos/utils/expenseManagedUserScope.ts
var normalizeUserId = (value) => String(value || "").trim();
var isSameExpenseUser = (left, right) => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var resolveExpenseListAxUserIdOverride = ({
  selectedManagedUserId,
  includeSubordinates
}) => {
  if (includeSubordinates === true) return "";
  return normalizeUserId(selectedManagedUserId);
};
var matchesCurrentExpenseIdentity = ({
  currentAxUserId,
  currentCrmUserId,
  recordOwnerUserId
}) => {
  const normalizedOwnerUserId = normalizeUserId(recordOwnerUserId);
  if (!normalizedOwnerUserId) return false;
  return isSameExpenseUser(normalizedOwnerUserId, currentAxUserId) || isSameExpenseUser(normalizedOwnerUserId, currentCrmUserId);
};
var isManagingOtherExpenseUser = ({
  canManageOtherUsers,
  currentAxUserId,
  selectedManagedUserId,
  isCreateMode = false
}) => {
  if (isCreateMode || !canManageOtherUsers) return false;
  const normalizedCurrentUserId = normalizeUserId(currentAxUserId);
  const normalizedSelectedManagedUserId = normalizeUserId(selectedManagedUserId);
  if (!normalizedCurrentUserId || !normalizedSelectedManagedUserId) return false;
  return !isSameExpenseUser(normalizedCurrentUserId, normalizedSelectedManagedUserId);
};
var isManagingOtherExpenseRecord = ({
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  recordOwnerUserId,
  isCreateMode = false
}) => {
  if (isCreateMode) return false;
  const normalizedCurrentAxUserId = normalizeUserId(currentAxUserId);
  const normalizedCurrentCrmUserId = normalizeUserId(currentCrmUserId);
  const normalizedRecordOwnerUserId = normalizeUserId(recordOwnerUserId);
  if (normalizedRecordOwnerUserId && (normalizedCurrentAxUserId || normalizedCurrentCrmUserId)) {
    return !matchesCurrentExpenseIdentity({
      currentAxUserId: normalizedCurrentAxUserId,
      currentCrmUserId: normalizedCurrentCrmUserId,
      recordOwnerUserId: normalizedRecordOwnerUserId
    });
  }
  return isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId: normalizedCurrentAxUserId,
    selectedManagedUserId,
    isCreateMode
  });
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
  areExpenseNumericInputsEquivalent,
  formatExpenseNumber,
  formatExpenseInputNumber,
  formatAmountWithCurrency,
  resolveExpenseListAxUserIdOverride,
  isManagingOtherExpenseUser,
  isManagingOtherExpenseRecord,
  setExpenseNavigationGuard,
  clearExpenseNavigationGuard,
  navigateToExpenseUrl,
  reloadExpensePage
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2N1cnJlbmN5Q29kZXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvY3VycmVuY3lEaXNwbGF5UnVsZXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9leHBlbnNlRm9ybWF0dGVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IEVYUEVOU0VfTlVNQkVSX0xPQ0FMRSA9IFwiZW4tVVNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZU51bWJlckZvcm1hdE9wdGlvbnMgPSB7XHJcbiAgbWluaW11bUZyYWN0aW9uRGlnaXRzPzogbnVtYmVyO1xyXG4gIG1heGltdW1GcmFjdGlvbkRpZ2l0cz86IG51bWJlcjtcclxuICB1c2VHcm91cGluZz86IGJvb2xlYW47XHJcbiAgZmFsbGJhY2s/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBzYW5pdGl6ZU51bWVyaWNUb2tlbiA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW15cXGQuLCstXS9nLCBcIlwiKTtcclxufTtcclxuXHJcbmNvbnN0IGlzVGhvdXNhbmRzR3JvdXBlZEludGVnZXIgPSAodmFsdWU6IHN0cmluZywgc2VwYXJhdG9yOiBcIixcIiB8IFwiLlwiKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdChzZXBhcmF0b3IpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggPD0gMSkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChwYXJ0cy5zb21lKChwYXJ0KSA9PiAhL15cXGQrJC8udGVzdChwYXJ0KSkpIHJldHVybiBmYWxzZTtcclxuICBpZiAocGFydHNbMF0ubGVuZ3RoIDwgMSB8fCBwYXJ0c1swXS5sZW5ndGggPiAzKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHBhcnRzLnNsaWNlKDEpLmV2ZXJ5KChwYXJ0KSA9PiBwYXJ0Lmxlbmd0aCA9PT0gMyk7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgbnVtZXJpYyBpbnB1dCBzdXBwb3J0aW5nIGJvdGggZ3JvdXBlZCBhbmQgZGVjaW1hbCB2YWx1ZXMuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgPSAocmF3OiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHJhdyA9PT0gbnVsbCB8fCByYXcgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XHJcbiAgaWYgKHR5cGVvZiByYXcgPT09IFwibnVtYmVyXCIpIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocmF3KSA/IHJhdyA6IG51bGw7XHJcblxyXG4gIGxldCB2YWx1ZSA9IHNhbml0aXplTnVtZXJpY1Rva2VuKFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpLnJlcGxhY2UoL1xccysvZywgXCJcIikpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICBsZXQgc2lnbiA9IFwiXCI7XHJcbiAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoXCItXCIpKSB7XHJcbiAgICBzaWduID0gXCItXCI7XHJcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUuc3RhcnRzV2l0aChcIitcIikpIHtcclxuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XHJcbiAgfVxyXG5cclxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1srLV0vZywgXCJcIik7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGhhc0NvbW1hID0gdmFsdWUuaW5jbHVkZXMoXCIsXCIpO1xyXG4gIGNvbnN0IGhhc0RvdCA9IHZhbHVlLmluY2x1ZGVzKFwiLlwiKTtcclxuXHJcbiAgaWYgKGhhc0NvbW1hICYmICFoYXNEb3QgJiYgaXNUaG91c2FuZHNHcm91cGVkSW50ZWdlcih2YWx1ZSwgXCIsXCIpKSB7XHJcbiAgICBjb25zdCBwYXJzZWRJbnRlZ2VyID0gTnVtYmVyKGAke3NpZ259JHt2YWx1ZS5yZXBsYWNlKC8sL2csIFwiXCIpfWApO1xyXG4gICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWRJbnRlZ2VyKSA/IHBhcnNlZEludGVnZXIgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgaWYgKGhhc0RvdCAmJiAhaGFzQ29tbWEgJiYgaXNUaG91c2FuZHNHcm91cGVkSW50ZWdlcih2YWx1ZSwgXCIuXCIpKSB7XHJcbiAgICBjb25zdCBwYXJzZWRJbnRlZ2VyID0gTnVtYmVyKGAke3NpZ259JHt2YWx1ZS5yZXBsYWNlKC9cXC4vZywgXCJcIil9YCk7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZEludGVnZXIpID8gcGFyc2VkSW50ZWdlciA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBsYXN0Q29tbWEgPSB2YWx1ZS5sYXN0SW5kZXhPZihcIixcIik7XHJcbiAgY29uc3QgbGFzdERvdCA9IHZhbHVlLmxhc3RJbmRleE9mKFwiLlwiKTtcclxuICBjb25zdCBkZWNpbWFsU2VwYXJhdG9ySW5kZXggPSBNYXRoLm1heChsYXN0Q29tbWEsIGxhc3REb3QpO1xyXG5cclxuICBsZXQgbm9ybWFsaXplZDogc3RyaW5nO1xyXG4gIGlmIChkZWNpbWFsU2VwYXJhdG9ySW5kZXggPj0gMCkge1xyXG4gICAgY29uc3QgaW50ZWdlclBhcnQgPSB2YWx1ZS5zbGljZSgwLCBkZWNpbWFsU2VwYXJhdG9ySW5kZXgpLnJlcGxhY2UoL1suLF0vZywgXCJcIik7XHJcbiAgICBjb25zdCBkZWNpbWFsUGFydCA9IHZhbHVlLnNsaWNlKGRlY2ltYWxTZXBhcmF0b3JJbmRleCArIDEpLnJlcGxhY2UoL1suLF0vZywgXCJcIik7XHJcbiAgICBub3JtYWxpemVkID0gYCR7c2lnbn0ke2ludGVnZXJQYXJ0IHx8IFwiMFwifSR7ZGVjaW1hbFBhcnQgPyBgLiR7ZGVjaW1hbFBhcnR9YCA6IFwiXCJ9YDtcclxuICB9IGVsc2Uge1xyXG4gICAgbm9ybWFsaXplZCA9IGAke3NpZ259JHt2YWx1ZS5yZXBsYWNlKC9bLixdL2csIFwiXCIpfWA7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobm9ybWFsaXplZCk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbi8vIENvbXBhcmVzIGVkaXRhYmxlIG51bWVyaWMgc3RyaW5ncyBieSB2YWx1ZSBzbyBibHVyIGZvcm1hdHRpbmcgaXMgbm90IHRyZWF0ZWQgYXMgYSBkYXRhIGVkaXQuXHJcbmV4cG9ydCBjb25zdCBhcmVFeHBlbnNlTnVtZXJpY0lucHV0c0VxdWl2YWxlbnQgPSAoXHJcbiAgbGVmdDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICByaWdodDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZFxyXG4pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBsZWZ0UGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KGxlZnQpO1xyXG4gIGNvbnN0IHJpZ2h0UGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHJpZ2h0KTtcclxuICBpZiAobGVmdFBhcnNlZCAhPT0gbnVsbCB8fCByaWdodFBhcnNlZCAhPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIGxlZnRQYXJzZWQgPT09IHJpZ2h0UGFyc2VkO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFN0cmluZyhsZWZ0ID8/IFwiXCIpLnRyaW0oKSA9PT0gU3RyaW5nKHJpZ2h0ID8/IFwiXCIpLnRyaW0oKTtcclxufTtcclxuXHJcbi8vIEZvcm1hdHMgbnVtZXJpYyB2YWx1ZXMgd2l0aCB0aGUgZml4ZWQgZXhwZW5zZSB2aXN1YWwgY29udHJhY3Q6ICMsIyMwLjAwXHJcbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlTnVtYmVyID0gKFxyXG4gIHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9uc1xyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGZhbGxiYWNrID0gb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCItXCI7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XHJcbiAgICByZXR1cm4gZmFsbGJhY2s7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KEVYUEVOU0VfTlVNQkVSX0xPQ0FMRSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogb3B0aW9ucz8ubWF4aW11bUZyYWN0aW9uRGlnaXRzID8/IDIsXHJcbiAgICB1c2VHcm91cGluZzogb3B0aW9ucz8udXNlR3JvdXBpbmcgPz8gdHJ1ZSxcclxuICB9KS5mb3JtYXQoTnVtYmVyKHZhbHVlKSk7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgYW5kIGZvcm1hdHMgcmF3IGlucHV0IHZhbHVlcyB0byB0aGUgZml4ZWQgZXhwZW5zZSB2aXN1YWwgY29udHJhY3QuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIgPSAoXHJcbiAgcmF3OiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9uc1xyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChyYXcpO1xyXG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBvcHRpb25zPy5mYWxsYmFjayA/PyBcIlwiO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIocGFyc2VkLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcclxuICAgIHVzZUdyb3VwaW5nOiBvcHRpb25zPy51c2VHcm91cGluZyA/PyB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IG9wdGlvbnM/LmZhbGxiYWNrID8/IFwiXCIsXHJcbiAgfSk7XHJcbn07XHJcbiIsICIvLyBGaXhlZCBJU08tbGlrZSBjdXJyZW5jeSBjb2RlIGxpc3QgZm9yIEV4cGVuc2UgU2hlZXRzIGZpbHRlcnMuXHJcbi8vIFNvdXJjZTogU0lYIElTTyA0MjE3IExpc3QgT25lIFhNTCwgb2ZmaWNpYWwgSVNPIG1haW50ZW5hbmNlIGFnZW5jeS5cclxuLy8gUmV0cmlldmVkIDIwMjYtMDUtMTkgZnJvbSBodHRwczovL3d3dy5zaXgtZ3JvdXAuY29tL2RhbS9kb3dubG9hZC9maW5hbmNpYWwtaW5mb3JtYXRpb24vZGF0YS1jZW50ZXIvaXNvLWN1cnJyZW5jeS9saXN0cy9saXN0LW9uZS54bWwuXHJcbmV4cG9ydCBjb25zdCBleHBlbnNlQ3VycmVuY3lDb2Rlczogc3RyaW5nW10gPSBbXHJcbiAgXCJBRURcIixcclxuICBcIkFGTlwiLFxyXG4gIFwiQUxMXCIsXHJcbiAgXCJBTURcIixcclxuICBcIkFPQVwiLFxyXG4gIFwiQVJTXCIsXHJcbiAgXCJBVURcIixcclxuICBcIkFXR1wiLFxyXG4gIFwiQVpOXCIsXHJcbiAgXCJCQU1cIixcclxuICBcIkJCRFwiLFxyXG4gIFwiQkRUXCIsXHJcbiAgXCJCSERcIixcclxuICBcIkJJRlwiLFxyXG4gIFwiQk1EXCIsXHJcbiAgXCJCTkRcIixcclxuICBcIkJPQlwiLFxyXG4gIFwiQk9WXCIsXHJcbiAgXCJCUkxcIixcclxuICBcIkJTRFwiLFxyXG4gIFwiQlROXCIsXHJcbiAgXCJCV1BcIixcclxuICBcIkJZTlwiLFxyXG4gIFwiQlpEXCIsXHJcbiAgXCJDQURcIixcclxuICBcIkNERlwiLFxyXG4gIFwiQ0hFXCIsXHJcbiAgXCJDSEZcIixcclxuICBcIkNIV1wiLFxyXG4gIFwiQ0xGXCIsXHJcbiAgXCJDTFBcIixcclxuICBcIkNOWVwiLFxyXG4gIFwiQ09QXCIsXHJcbiAgXCJDT1VcIixcclxuICBcIkNSQ1wiLFxyXG4gIFwiQ1VDXCIsXHJcbiAgXCJDVVBcIixcclxuICBcIkNWRVwiLFxyXG4gIFwiQ1pLXCIsXHJcbiAgXCJESkZcIixcclxuICBcIkRLS1wiLFxyXG4gIFwiRE9QXCIsXHJcbiAgXCJEWkRcIixcclxuICBcIkVHUFwiLFxyXG4gIFwiRVJOXCIsXHJcbiAgXCJFVEJcIixcclxuICBcIkVVUlwiLFxyXG4gIFwiRkpEXCIsXHJcbiAgXCJGS1BcIixcclxuICBcIkdCUFwiLFxyXG4gIFwiR0VMXCIsXHJcbiAgXCJHSFNcIixcclxuICBcIkdJUFwiLFxyXG4gIFwiR01EXCIsXHJcbiAgXCJHTkZcIixcclxuICBcIkdUUVwiLFxyXG4gIFwiR1lEXCIsXHJcbiAgXCJIS0RcIixcclxuICBcIkhOTFwiLFxyXG4gIFwiSFRHXCIsXHJcbiAgXCJIVUZcIixcclxuICBcIklEUlwiLFxyXG4gIFwiSUxTXCIsXHJcbiAgXCJJTlJcIixcclxuICBcIklRRFwiLFxyXG4gIFwiSVJSXCIsXHJcbiAgXCJJU0tcIixcclxuICBcIkpNRFwiLFxyXG4gIFwiSk9EXCIsXHJcbiAgXCJKUFlcIixcclxuICBcIktFU1wiLFxyXG4gIFwiS0dTXCIsXHJcbiAgXCJLSFJcIixcclxuICBcIktNRlwiLFxyXG4gIFwiS1BXXCIsXHJcbiAgXCJLUldcIixcclxuICBcIktXRFwiLFxyXG4gIFwiS1lEXCIsXHJcbiAgXCJLWlRcIixcclxuICBcIkxBS1wiLFxyXG4gIFwiTEJQXCIsXHJcbiAgXCJMS1JcIixcclxuICBcIkxSRFwiLFxyXG4gIFwiTFNMXCIsXHJcbiAgXCJMWURcIixcclxuICBcIk1BRFwiLFxyXG4gIFwiTURMXCIsXHJcbiAgXCJNR0FcIixcclxuICBcIk1LRFwiLFxyXG4gIFwiTU1LXCIsXHJcbiAgXCJNTlRcIixcclxuICBcIk1PUFwiLFxyXG4gIFwiTVJVXCIsXHJcbiAgXCJNVVJcIixcclxuICBcIk1WUlwiLFxyXG4gIFwiTVdLXCIsXHJcbiAgXCJNWE5cIixcclxuICBcIk1YVlwiLFxyXG4gIFwiTVlSXCIsXHJcbiAgXCJNWk5cIixcclxuICBcIk5BRFwiLFxyXG4gIFwiTkdOXCIsXHJcbiAgXCJOSU9cIixcclxuICBcIk5PS1wiLFxyXG4gIFwiTlBSXCIsXHJcbiAgXCJOWkRcIixcclxuICBcIk9NUlwiLFxyXG4gIFwiUEFCXCIsXHJcbiAgXCJQRU5cIixcclxuICBcIlBHS1wiLFxyXG4gIFwiUEhQXCIsXHJcbiAgXCJQS1JcIixcclxuICBcIlBMTlwiLFxyXG4gIFwiUFlHXCIsXHJcbiAgXCJRQVJcIixcclxuICBcIlJPTlwiLFxyXG4gIFwiUlNEXCIsXHJcbiAgXCJSVUJcIixcclxuICBcIlJXRlwiLFxyXG4gIFwiU0FSXCIsXHJcbiAgXCJTQkRcIixcclxuICBcIlNDUlwiLFxyXG4gIFwiU0RHXCIsXHJcbiAgXCJTRUtcIixcclxuICBcIlNHRFwiLFxyXG4gIFwiU0hQXCIsXHJcbiAgXCJTTEVcIixcclxuICBcIlNPU1wiLFxyXG4gIFwiU1JEXCIsXHJcbiAgXCJTU1BcIixcclxuICBcIlNUTlwiLFxyXG4gIFwiU1ZDXCIsXHJcbiAgXCJTWVBcIixcclxuICBcIlNaTFwiLFxyXG4gIFwiVEhCXCIsXHJcbiAgXCJUSlNcIixcclxuICBcIlRNVFwiLFxyXG4gIFwiVE5EXCIsXHJcbiAgXCJUT1BcIixcclxuICBcIlRSWVwiLFxyXG4gIFwiVFREXCIsXHJcbiAgXCJUV0RcIixcclxuICBcIlRaU1wiLFxyXG4gIFwiVUFIXCIsXHJcbiAgXCJVR1hcIixcclxuICBcIlVTRFwiLFxyXG4gIFwiVVNOXCIsXHJcbiAgXCJVWUlcIixcclxuICBcIlVZVVwiLFxyXG4gIFwiVVlXXCIsXHJcbiAgXCJVWlNcIixcclxuICBcIlZFRFwiLFxyXG4gIFwiVkVGXCIsXHJcbiAgXCJWRVNcIixcclxuICBcIlZORFwiLFxyXG4gIFwiVlVWXCIsXHJcbiAgXCJXU1RcIixcclxuICBcIlhBRFwiLFxyXG4gIFwiWEFGXCIsXHJcbiAgXCJYQUdcIixcclxuICBcIlhBVVwiLFxyXG4gIFwiWEJBXCIsXHJcbiAgXCJYQkJcIixcclxuICBcIlhCQ1wiLFxyXG4gIFwiWEJEXCIsXHJcbiAgXCJYQ0RcIixcclxuICBcIlhDR1wiLFxyXG4gIFwiWERSXCIsXHJcbiAgXCJYT0ZcIixcclxuICBcIlhQRFwiLFxyXG4gIFwiWFBGXCIsXHJcbiAgXCJYUFRcIixcclxuICBcIlhTVVwiLFxyXG4gIFwiWFRTXCIsXHJcbiAgXCJYVUFcIixcclxuICBcIlhYWFwiLFxyXG4gIFwiWUVSXCIsXHJcbiAgXCJaQVJcIixcclxuICBcIlpNV1wiLFxyXG4gIFwiWldHXCIsXHJcbiAgXCJaV0xcIixcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBleHBlbnNlQ3VycmVuY3lPcHRpb25zID0gZXhwZW5zZUN1cnJlbmN5Q29kZXMubWFwKChjb2RlKSA9PiAoeyB2YWx1ZTogY29kZSwgdGV4dDogY29kZSB9KSk7XHJcbiIsICJpbXBvcnQgeyBleHBlbnNlQ3VycmVuY3lDb2RlcyB9IGZyb20gXCIuL2N1cnJlbmN5Q29kZXMudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEN1cnJlbmN5U3ltYm9sUG9zaXRpb24gPSBcInByZWZpeFwiIHwgXCJzdWZmaXhcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEN1cnJlbmN5RGlzcGxheVJ1bGUgPSB7XHJcbiAgc3ltYm9sOiBzdHJpbmc7XHJcbiAgcG9zaXRpb246IEN1cnJlbmN5U3ltYm9sUG9zaXRpb247XHJcbiAgc3BhY2U6IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBGaXhlZCBjdXJyZW5jeSBkaXNwbGF5IHJ1bGVzIGZvciBleHBlbnNlIGFtb3VudCBsYWJlbHMuXHJcbi8vIEJhc2VsaW5lIGdlbmVyYXRlZCBmcm9tIFVuaWNvZGUgQ0xEUiA0OCBuYXRpdmUgbG9jYWxlIGN1cnJlbmN5IHBhcnRzIHdpdGggbmFycm93IHN5bWJvbHMuXHJcbmV4cG9ydCBjb25zdCBDVVJSRU5DWV9ESVNQTEFZX1JVTEVTOiBSZWFkb25seTxSZWNvcmQ8c3RyaW5nLCBDdXJyZW5jeURpc3BsYXlSdWxlPj4gPSBPYmplY3QuZnJlZXplKHtcclxuICBBRUQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyNS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgQUZOOiB7IHN5bWJvbDogXCJcXHUwNjBiXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIEFMTDogeyBzeW1ib2w6IFwiTGVrXFx1MDBlYlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBBTUQ6IHsgc3ltYm9sOiBcIlxcdTA1OGZcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgQU9BOiB7IHN5bWJvbDogXCJLelwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBBUlM6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgQVVEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBBV0c6IHsgc3ltYm9sOiBcIkFmbC5cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgQVpOOiB7IHN5bWJvbDogXCJcXHUyMGJjXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIEJBTTogeyBzeW1ib2w6IFwiS01cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgQkJEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBCRFQ6IHsgc3ltYm9sOiBcIlxcdTA5ZjNcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIEJIRDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjI4LlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBCSUY6IHsgc3ltYm9sOiBcIkZCdVwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBCTUQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIEJORDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBCT0I6IHsgc3ltYm9sOiBcIkJzXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIEJPVjogeyBzeW1ib2w6IFwiQk9WXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIEJSTDogeyBzeW1ib2w6IFwiUiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgQlNEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBCVE46IHsgc3ltYm9sOiBcIk51LlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBCV1A6IHsgc3ltYm9sOiBcIlBcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgQllOOiB7IHN5bWJvbDogXCJCclwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBCWkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIENBRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgQ0RGOiB7IHN5bWJvbDogXCJGQ1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBDSEU6IHsgc3ltYm9sOiBcIkNIRVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBDSEY6IHsgc3ltYm9sOiBcIkNIRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBDSFc6IHsgc3ltYm9sOiBcIkNIV1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBDTEY6IHsgc3ltYm9sOiBcIkNMRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBDTFA6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIENOWTogeyBzeW1ib2w6IFwiXFx1MDBhNVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgQ09QOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIENPVTogeyBzeW1ib2w6IFwiQ09VXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIENSQzogeyBzeW1ib2w6IFwiXFx1MjBhMVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgQ1VDOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBDVVA6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIENWRTogeyBzeW1ib2w6IFwiQ1ZFXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIENaSzogeyBzeW1ib2w6IFwiS1xcdTAxMGRcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgREpGOiB7IHN5bWJvbDogXCJGZGpcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgREtLOiB7IHN5bWJvbDogXCJrci5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgRE9QOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBEWkQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyYy5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgRUdQOiB7IHN5bWJvbDogXCJFXFx1MDBhM1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBFUk46IHsgc3ltYm9sOiBcIk5ma1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBFVEI6IHsgc3ltYm9sOiBcIlxcdTEyNjVcXHUxMjJkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIEVVUjogeyBzeW1ib2w6IFwiXFx1MjBhY1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBGSkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIEZLUDogeyBzeW1ib2w6IFwiXFx1MDBhM1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgR0JQOiB7IHN5bWJvbDogXCJcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBHRUw6IHsgc3ltYm9sOiBcIlxcdTIwYmVcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgR0hTOiB7IHN5bWJvbDogXCJHSFxcdTIwYjVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIEdJUDogeyBzeW1ib2w6IFwiXFx1MDBhM1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgR01EOiB7IHN5bWJvbDogXCJEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIEdORjogeyBzeW1ib2w6IFwiRkdcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgR1RROiB7IHN5bWJvbDogXCJRXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIEdZRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgSEtEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBITkw6IHsgc3ltYm9sOiBcIkxcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgSFRHOiB7IHN5bWJvbDogXCJIVEdcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgSFVGOiB7IHN5bWJvbDogXCJGdFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBJRFI6IHsgc3ltYm9sOiBcIlJwXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIElMUzogeyBzeW1ib2w6IFwiXFx1MjBhYVwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBJTlI6IHsgc3ltYm9sOiBcIlxcdTIwYjlcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIElRRDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjM5LlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBJUlI6IHsgc3ltYm9sOiBcIlxcdTA2MzFcXHUwNmNjXFx1MDYyN1xcdTA2NDRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgSVNLOiB7IHN5bWJvbDogXCJrci5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgSk1EOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBKT0Q6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyMy5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgSlBZOiB7IHN5bWJvbDogXCJcXHVmZmU1XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBLRVM6IHsgc3ltYm9sOiBcIktzaFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBLR1M6IHsgc3ltYm9sOiBcIlxcdTIwYzBcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgS0hSOiB7IHN5bWJvbDogXCJcXHUxN2RiXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBLTUY6IHsgc3ltYm9sOiBcIkNGXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIEtQVzogeyBzeW1ib2w6IFwiXFx1MjBhOVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgS1JXOiB7IHN5bWJvbDogXCJcXHUyMGE5XCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBLV0Q6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDY0My5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgS1lEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBLWlQ6IHsgc3ltYm9sOiBcIlxcdTIwYjhcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgTEFLOiB7IHN5bWJvbDogXCJcXHUyMGFkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBMQlA6IHsgc3ltYm9sOiBcIkxcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIExLUjogeyBzeW1ib2w6IFwiXFx1MGRiYlxcdTBkZDQuXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIExSRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgTFNMOiB7IHN5bWJvbDogXCJNXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIExZRDogeyBzeW1ib2w6IFwiXFx1MDYyZi5cXHUwNjQ0LlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBNQUQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDY0NS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgTURMOiB7IHN5bWJvbDogXCJMXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIE1HQTogeyBzeW1ib2w6IFwiQXJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgTUtEOiB7IHN5bWJvbDogXCJcXHUwNDM0XFx1MDQzNVxcdTA0M2QuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIE1NSzogeyBzeW1ib2w6IFwiS1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBNTlQ6IHsgc3ltYm9sOiBcIlxcdTIwYWVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgTU9QOiB7IHN5bWJvbDogXCJNT1AkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBNUlU6IHsgc3ltYm9sOiBcIlxcdTA2MjMuXFx1MDY0NS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgTVVSOiB7IHN5bWJvbDogXCJSc1wiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBNVlI6IHsgc3ltYm9sOiBcIk1WUlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBNV0s6IHsgc3ltYm9sOiBcIk1LXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIE1YTjogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgTVhWOiB7IHN5bWJvbDogXCJNWFZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgTVlSOiB7IHN5bWJvbDogXCJSTVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBNWk46IHsgc3ltYm9sOiBcIk1UblwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBOQUQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIE5HTjogeyBzeW1ib2w6IFwiXFx1MjBhNlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgTklPOiB7IHN5bWJvbDogXCJDJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgTk9LOiB7IHN5bWJvbDogXCJrclwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBOUFI6IHsgc3ltYm9sOiBcIlxcdTA5MzBcXHUwOTQyXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIE5aRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgT01SOiB7IHN5bWJvbDogXCJcXHUwNjMxLlxcdTA2MzkuXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFBBQjogeyBzeW1ib2w6IFwiQi8uXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFBFTjogeyBzeW1ib2w6IFwiUy9cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgUEdLOiB7IHN5bWJvbDogXCJQR0tcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgUEhQOiB7IHN5bWJvbDogXCJcXHUyMGIxXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBQS1I6IHsgc3ltYm9sOiBcIlJzXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFBMTjogeyBzeW1ib2w6IFwielxcdTAxNDJcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgUFlHOiB7IHN5bWJvbDogXCJcXHUyMGIyXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFFBUjogeyBzeW1ib2w6IFwiXFx1MDYzMS5cXHUwNjQyLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBST046IHsgc3ltYm9sOiBcImxlaVwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBSU0Q6IHsgc3ltYm9sOiBcIlJTRFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBSVUI6IHsgc3ltYm9sOiBcIlxcdTIwYmRcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgUldGOiB7IHN5bWJvbDogXCJSRlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBTQVI6IHsgc3ltYm9sOiBcIlxcdTA2MzEuXFx1MDYzMy5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgU0JEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBTQ1I6IHsgc3ltYm9sOiBcIlNSXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFNERzogeyBzeW1ib2w6IFwiXFx1MDYyYy5cXHUwNjMzLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBTRUs6IHsgc3ltYm9sOiBcImtyXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFNHRDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgU0hQOiB7IHN5bWJvbDogXCJcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBTTEU6IHsgc3ltYm9sOiBcIkxlXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFNPUzogeyBzeW1ib2w6IFwiU1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBTUkQ6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgU1NQOiB7IHN5bWJvbDogXCJcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFNUTjogeyBzeW1ib2w6IFwiRGJcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgU1ZDOiB7IHN5bWJvbDogXCJTVkNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgU1lQOiB7IHN5bWJvbDogXCJcXHUwMGEzXCIsIHBvc2l0aW9uOiBcInN1ZmZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFNaTDogeyBzeW1ib2w6IFwiRVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBUSEI6IHsgc3ltYm9sOiBcIlxcdTBlM2ZcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIFRKUzogeyBzeW1ib2w6IFwiXFx1MDQ0MVxcdTA0M2VcXHUwNDNjLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBUTVQ6IHsgc3ltYm9sOiBcIlRNVFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBUTkQ6IHsgc3ltYm9sOiBcIlxcdTA2MmYuXFx1MDYyYS5cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgVE9QOiB7IHN5bWJvbDogXCJUJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBUUlk6IHsgc3ltYm9sOiBcIlxcdTIwYmFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIFRURDogeyBzeW1ib2w6IFwiJFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IGZhbHNlIH0sXHJcbiAgVFdEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBUWlM6IHsgc3ltYm9sOiBcIlRTaFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBVQUg6IHsgc3ltYm9sOiBcIlxcdTIwYjRcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgVUdYOiB7IHN5bWJvbDogXCJVU2hcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgVVNEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBVU046IHsgc3ltYm9sOiBcIlVTTlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBVWUk6IHsgc3ltYm9sOiBcIlVZSVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBVWVU6IHsgc3ltYm9sOiBcIiRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgVVlXOiB7IHN5bWJvbDogXCJVUFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBVWlM6IHsgc3ltYm9sOiBcInNvXFx1MDJiYm1cIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgVkVEOiB7IHN5bWJvbDogXCJWRURcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgVkVGOiB7IHN5bWJvbDogXCJCcy5cIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgVkVTOiB7IHN5bWJvbDogXCJCcy5TXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFZORDogeyBzeW1ib2w6IFwiXFx1MjBhYlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBWVVY6IHsgc3ltYm9sOiBcIlZVVlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBXU1Q6IHsgc3ltYm9sOiBcIldTVFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYQUQ6IHsgc3ltYm9sOiBcIlhBRFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYQUY6IHsgc3ltYm9sOiBcIkZDRkFcIiwgcG9zaXRpb246IFwic3VmZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgWEFHOiB7IHN5bWJvbDogXCJYQUdcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgWEFVOiB7IHN5bWJvbDogXCJYQVVcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgWEJBOiB7IHN5bWJvbDogXCJYQkFcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgWEJCOiB7IHN5bWJvbDogXCJYQkJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgWEJDOiB7IHN5bWJvbDogXCJYQkNcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgWEJEOiB7IHN5bWJvbDogXCJYQkRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgWENEOiB7IHN5bWJvbDogXCIkXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogZmFsc2UgfSxcclxuICBYQ0c6IHsgc3ltYm9sOiBcIkNnLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYRFI6IHsgc3ltYm9sOiBcIlhEUlwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYT0Y6IHsgc3ltYm9sOiBcIkZcXHUyMDJmQ0ZBXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFhQRDogeyBzeW1ib2w6IFwiWFBEXCIsIHBvc2l0aW9uOiBcInByZWZpeFwiLCBzcGFjZTogdHJ1ZSB9LFxyXG4gIFhQRjogeyBzeW1ib2w6IFwiRkNGUFwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYUFQ6IHsgc3ltYm9sOiBcIlhQVFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYU1U6IHsgc3ltYm9sOiBcIlhTVVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYVFM6IHsgc3ltYm9sOiBcIlhUU1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYVUE6IHsgc3ltYm9sOiBcIlhVQVwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBYWFg6IHsgc3ltYm9sOiBcIlxcdTAwYTRcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiBmYWxzZSB9LFxyXG4gIFlFUjogeyBzeW1ib2w6IFwiXFx1MDYzMS5cXHUwNjRhLlwiLCBwb3NpdGlvbjogXCJzdWZmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBaQVI6IHsgc3ltYm9sOiBcIlJcIiwgcG9zaXRpb246IFwicHJlZml4XCIsIHNwYWNlOiB0cnVlIH0sXHJcbiAgWk1XOiB7IHN5bWJvbDogXCJaS1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBaV0c6IHsgc3ltYm9sOiBcIlpXR1wiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxuICBaV0w6IHsgc3ltYm9sOiBcIlpXTFwiLCBwb3NpdGlvbjogXCJwcmVmaXhcIiwgc3BhY2U6IHRydWUgfSxcclxufSk7XHJcblxyXG5jb25zdCBDVVJSRU5DWV9DT0RFX1NFVCA9IG5ldyBTZXQoZXhwZW5zZUN1cnJlbmN5Q29kZXMpO1xyXG5cclxuLy8gTWFwcyBsZWdhY3kgQXhhcHRhIGN1cnJlbmN5IGlkZW50aWZpZXJzIHRvIHRoZSBjbG9zZXN0IElTTyBkaXNwbGF5IHJ1bGUuXHJcbmNvbnN0IENVUlJFTkNZX0NPREVfQUxJQVNFUzogUmVhZG9ubHk8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4gPSBPYmplY3QuZnJlZXplKHtcclxuICBXT046IFwiS1JXXCIsXHJcbn0pO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKGN1cnJlbmN5Q29kZT86IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyB0aGUgZml4ZWQgZGlzcGxheSBydWxlIGZvciBhIGtub3duIGV4cGVuc2UgY3VycmVuY3kgY29kZS5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVDdXJyZW5jeURpc3BsYXlSdWxlID0gKGN1cnJlbmN5Q29kZT86IHN0cmluZyk6IEN1cnJlbmN5RGlzcGxheVJ1bGUgfCBudWxsID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3lDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRDdXJyZW5jeUNvZGUgPSBDVVJSRU5DWV9DT0RFX0FMSUFTRVNbbm9ybWFsaXplZEN1cnJlbmN5Q29kZV0gPz8gbm9ybWFsaXplZEN1cnJlbmN5Q29kZTtcclxuICBpZiAoIXJlc29sdmVkQ3VycmVuY3lDb2RlIHx8ICFDVVJSRU5DWV9DT0RFX1NFVC5oYXMocmVzb2x2ZWRDdXJyZW5jeUNvZGUpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBDVVJSRU5DWV9ESVNQTEFZX1JVTEVTW3Jlc29sdmVkQ3VycmVuY3lDb2RlXSA/PyB7XHJcbiAgICBzeW1ib2w6IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUsXHJcbiAgICBwb3NpdGlvbjogXCJzdWZmaXhcIixcclxuICAgIHNwYWNlOiB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBBcHBsaWVzIGEgcmVzb2x2ZWQgY3VycmVuY3kgZGlzcGxheSBydWxlIHdpdGhvdXQgY2hhbmdpbmcgdGhlIG51bWVyaWMgdGV4dC5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudCA9IChhbW91bnRUZXh0OiBzdHJpbmcsIGN1cnJlbmN5Q29kZT86IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc2FmZUFtb3VudFRleHQgPSBhbW91bnRUZXh0IHx8IFwiLVwiO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoY3VycmVuY3lDb2RlKTtcclxuICBjb25zdCBkaXNwbGF5UnVsZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlSdWxlKG5vcm1hbGl6ZWRDdXJyZW5jeUNvZGUpO1xyXG5cclxuICBpZiAoIWRpc3BsYXlSdWxlKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZEN1cnJlbmN5Q29kZSA/IGAke3NhZmVBbW91bnRUZXh0fSAke25vcm1hbGl6ZWRDdXJyZW5jeUNvZGV9YCA6IHNhZmVBbW91bnRUZXh0O1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2VwYXJhdG9yID0gZGlzcGxheVJ1bGUuc3BhY2UgPyBcIiBcIiA6IFwiXCI7XHJcbiAgcmV0dXJuIGRpc3BsYXlSdWxlLnBvc2l0aW9uID09PSBcInByZWZpeFwiXHJcbiAgICA/IGAke2Rpc3BsYXlSdWxlLnN5bWJvbH0ke3NlcGFyYXRvcn0ke3NhZmVBbW91bnRUZXh0fWBcclxuICAgIDogYCR7c2FmZUFtb3VudFRleHR9JHtzZXBhcmF0b3J9JHtkaXNwbGF5UnVsZS5zeW1ib2x9YDtcclxufTtcclxuIiwgImltcG9ydCB7IGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudCB9IGZyb20gXCIuL2NvbnN0YW50cy9jdXJyZW5jeURpc3BsYXlSdWxlcy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5cclxuLy8gRm9ybWF0cyBhIG51bWVyaWMgYW1vdW50IHdpdGggZml4ZWQgVUkgbnVtYmVyIHN0eWxlIGFuZCBvcHRpb25hbCBjdXJyZW5jeSBjb2RlLlxyXG5leHBvcnQgY29uc3QgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5ID0gKFxyXG4gIGFtb3VudDogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmcsXHJcbiAgX2xvY2FsZT86IHN0cmluZ1xyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChhbW91bnQgPT09IG51bGwgfHwgYW1vdW50ID09PSB1bmRlZmluZWQgfHwgTnVtYmVyLmlzTmFOKE51bWJlcihhbW91bnQpKSkge1xyXG4gICAgcmV0dXJuIFwiLVwiO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2FmZUN1cnJlbmN5ID0gU3RyaW5nKGN1cnJlbmN5Q29kZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBkZWNpbWFsVGV4dCA9IGZvcm1hdEV4cGVuc2VOdW1iZXIoYW1vdW50LCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIi1cIixcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZvcm1hdEN1cnJlbmN5RGlzcGxheUFtb3VudChkZWNpbWFsVGV4dCwgc2FmZUN1cnJlbmN5KTtcclxufTtcclxuIiwgImNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG5cclxuLy8gQ29tcGFyZXMgQXhVc2VyIGlkZW50aWZpZXJzIHdpdGggc3RhYmxlIHRyaW1taW5nIGFuZCBjYXNpbmcuXHJcbmV4cG9ydCBjb25zdCBpc1NhbWVFeHBlbnNlVXNlciA9IChsZWZ0OiB1bmtub3duLCByaWdodDogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZVVzZXJJZChsZWZ0KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkUmlnaHQgPSBub3JtYWxpemVVc2VySWQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XG59O1xuXG4vLyBSZXNvbHZlcyB0aGUgb3B0aW9uYWwgQXhVc2VyIGhlYWRlciBvdmVycmlkZSBmb3IgZXhwZW5zZSBzaGVldCBsaXN0IGNhbGxzLlxuLy8gQWxsLXVzZXJzIG1vZGUgcmVsaWVzIG9uIHRoZSBjdXJyZW50IGNvbnRleHQgaGVhZGVyIHNvIEFYIHJldHVybnMgb3duIHBsdXMgZGlyZWN0LXN1Ym9yZGluYXRlIHNoZWV0cy5cbmV4cG9ydCBjb25zdCByZXNvbHZlRXhwZW5zZUxpc3RBeFVzZXJJZE92ZXJyaWRlID0gKHtcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICBpbmNsdWRlU3Vib3JkaW5hdGVzLFxufToge1xuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHVua25vd247XG4gIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IHVua25vd247XG59KTogc3RyaW5nID0+IHtcbiAgaWYgKGluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUpIHJldHVybiBcIlwiO1xuICByZXR1cm4gbm9ybWFsaXplVXNlcklkKHNlbGVjdGVkTWFuYWdlZFVzZXJJZCk7XG59O1xuXG4vLyBNYXRjaGVzIG9uZSBleHBlbnNlIG93bmVyIGlkIGFnYWluc3QgdGhlIGN1cnJlbnQgdXNlciBpZHMgZXhwb3NlZCBieSBhdXRoIGNvbnRleHQuXG5jb25zdCBtYXRjaGVzQ3VycmVudEV4cGVuc2VJZGVudGl0eSA9ICh7XG4gIGN1cnJlbnRBeFVzZXJJZCxcbiAgY3VycmVudENybVVzZXJJZCxcbiAgcmVjb3JkT3duZXJVc2VySWQsXG59OiB7XHJcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ/OiB1bmtub3duO1xyXG4gIHJlY29yZE93bmVyVXNlcklkOiB1bmtub3duO1xyXG59KTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE93bmVyVXNlcklkID0gbm9ybWFsaXplVXNlcklkKHJlY29yZE93bmVyVXNlcklkKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRPd25lclVzZXJJZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgaXNTYW1lRXhwZW5zZVVzZXIobm9ybWFsaXplZE93bmVyVXNlcklkLCBjdXJyZW50QXhVc2VySWQpIHx8XHJcbiAgICBpc1NhbWVFeHBlbnNlVXNlcihub3JtYWxpemVkT3duZXJVc2VySWQsIGN1cnJlbnRDcm1Vc2VySWQpXHJcbiAgKTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHdoZXRoZXIgdGhlIGN1cnJlbnQgZXhwZW5zZSBjb250ZXh0IGlzIGFjdGluZyBvbiBhbm90aGVyIHVzZXIncyBkYXRhLlxyXG5leHBvcnQgY29uc3QgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIgPSAoe1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICBpc0NyZWF0ZU1vZGUgPSBmYWxzZSxcclxufToge1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XHJcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogdW5rbm93bjtcclxuICBpc0NyZWF0ZU1vZGU/OiBib29sZWFuO1xyXG59KTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGlzQ3JlYXRlTW9kZSB8fCAhY2FuTWFuYWdlT3RoZXJVc2VycykgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkQ3VycmVudFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRTZWxlY3RlZE1hbmFnZWRVc2VySWQgPSBub3JtYWxpemVVc2VySWQoc2VsZWN0ZWRNYW5hZ2VkVXNlcklkKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW50VXNlcklkIHx8ICFub3JtYWxpemVkU2VsZWN0ZWRNYW5hZ2VkVXNlcklkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHJldHVybiAhaXNTYW1lRXhwZW5zZVVzZXIobm9ybWFsaXplZEN1cnJlbnRVc2VySWQsIG5vcm1hbGl6ZWRTZWxlY3RlZE1hbmFnZWRVc2VySWQpO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgdGhlIGVmZmVjdGl2ZSBvd25lciBjb250ZXh0IGZvciBvbmUgZXhwZW5zZSByZWNvcmQgb25jZSBkZXRhaWwgZGF0YSBpcyBhdmFpbGFibGUuXHJcbmV4cG9ydCBjb25zdCBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkID0gKHtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gIGN1cnJlbnRBeFVzZXJJZCxcclxuICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICByZWNvcmRPd25lclVzZXJJZCxcclxuICBpc0NyZWF0ZU1vZGUgPSBmYWxzZSxcclxufToge1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XHJcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ/OiB1bmtub3duO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogdW5rbm93bjtcclxuICByZWNvcmRPd25lclVzZXJJZDogdW5rbm93bjtcclxuICBpc0NyZWF0ZU1vZGU/OiBib29sZWFuO1xyXG59KTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGlzQ3JlYXRlTW9kZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkQ3VycmVudEF4VXNlcklkID0gbm9ybWFsaXplVXNlcklkKGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnRDcm1Vc2VySWQgPSBub3JtYWxpemVVc2VySWQoY3VycmVudENybVVzZXJJZCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFJlY29yZE93bmVyVXNlcklkID0gbm9ybWFsaXplVXNlcklkKHJlY29yZE93bmVyVXNlcklkKTtcclxuICBpZiAobm9ybWFsaXplZFJlY29yZE93bmVyVXNlcklkICYmIChub3JtYWxpemVkQ3VycmVudEF4VXNlcklkIHx8IG5vcm1hbGl6ZWRDdXJyZW50Q3JtVXNlcklkKSkge1xyXG4gICAgcmV0dXJuICFtYXRjaGVzQ3VycmVudEV4cGVuc2VJZGVudGl0eSh7XHJcbiAgICAgIGN1cnJlbnRBeFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnRBeFVzZXJJZCxcclxuICAgICAgY3VycmVudENybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICAgIHJlY29yZE93bmVyVXNlcklkOiBub3JtYWxpemVkUmVjb3JkT3duZXJVc2VySWQsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlcih7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAidHlwZSBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7XHJcbiAgYXNrQ29uZmlybWF0aW9uPzogYm9vbGVhbjtcclxuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFJlbG9hZEV4cGVuc2VQYWdlT3B0aW9ucyA9IHtcclxuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyB0aGUgZ2xvYmFsIG5hdmlnYXRpb24gZ3VhcmQgbGlmZWN5Y2xlIGZvciBhY3RpdmUgZWRpdCBwcm9jZXNzZXMuXG5leHBvcnQgY29uc3Qgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCA9IChcbiAgYWN0aXZlT3JPcHRpb25zPzogYm9vbGVhbiB8IEluZE5hdmlnYXRpb25HdWFyZE9wdGlvbnMsXG4gIG1lc3NhZ2U/OiBzdHJpbmdcbik6IHZvaWQgPT4ge1xuICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihhY3RpdmVPck9wdGlvbnMsIG1lc3NhZ2UpO1xyXG59O1xyXG5cclxuLy8gQ2xlYXJzIGdsb2JhbCBuYXZpZ2F0aW9uIGd1YXJkIGZsYWdzIHdoZW4gY29tcG9uZW50IHVubW91bnRzLlxyXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkID0gKCk6IHZvaWQgPT4ge1xyXG4gIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcclxufTtcclxuXHJcbi8vIEV4ZWN1dGVzIG5hdmlnYXRpb24gYWN0aW9uIHRocm91Z2ggc2l0ZSBndWFyZCBpZiBhdmFpbGFibGUuXHJcbmV4cG9ydCBjb25zdCBydW5HdWFyZGVkTmF2aWdhdGlvbiA9IChcclxuICBhY3Rpb246ICgpID0+IHZvaWQsXHJcbiAgb3B0aW9uczogTmF2aWdhdGVXaXRoR3VhcmRPcHRpb25zID0ge31cclxuKTogdm9pZCA9PiB7XHJcbiAgY29uc3QgeyBhc2tDb25maXJtYXRpb24gPSBmYWxzZSwgbWVzc2FnZSB9ID0gb3B0aW9ucztcclxuICBpZiAoYXNrQ29uZmlybWF0aW9uICYmIHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihhY3Rpb24sIG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgYWN0aW9uKCk7XHJcbn07XHJcblxyXG4vLyBOYXZpZ2F0ZXMgdG8gdGFyZ2V0IFVSTCBhbmQga2VlcHMgc2l0ZS1sZXZlbCBndWFyZCBiZWhhdmlvciBjb25zaXN0ZW50LlxyXG5leHBvcnQgY29uc3QgbmF2aWdhdGVUb0V4cGVuc2VVcmwgPSAoXHJcbiAgdGFyZ2V0VXJsOiBzdHJpbmcsXHJcbiAgb3B0aW9uczogTmF2aWdhdGVXaXRoR3VhcmRPcHRpb25zID0ge31cclxuKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgc2FmZVVybCA9IFN0cmluZyh0YXJnZXRVcmwgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghc2FmZVVybCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCB7IGJ5cGFzc0d1YXJkT25jZSA9IHRydWUgfSA9IG9wdGlvbnM7XHJcbiAgcnVuR3VhcmRlZE5hdmlnYXRpb24oKCkgPT4ge1xyXG4gICAgaWYgKGJ5cGFzc0d1YXJkT25jZSkge1xyXG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc2FmZVVybDtcclxuICB9LCBvcHRpb25zKTtcclxufTtcclxuXHJcbi8vIFJlbG9hZHMgdGhlIGN1cnJlbnQgcGFnZSB3aGlsZSBieXBhc3NpbmcgdGhlIGdsb2JhbCB1bnNhdmVkLWNoYW5nZSBndWFyZCB3aGVuIG5lZWRlZC5cclxuZXhwb3J0IGNvbnN0IHJlbG9hZEV4cGVuc2VQYWdlID0gKG9wdGlvbnM6IFJlbG9hZEV4cGVuc2VQYWdlT3B0aW9ucyA9IHt9KTogdm9pZCA9PiB7XHJcbiAgY29uc3QgeyBieXBhc3NHdWFyZE9uY2UgPSB0cnVlIH0gPSBvcHRpb25zO1xyXG4gIGlmIChieXBhc3NHdWFyZE9uY2UpIHtcclxuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gIH1cclxuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxJQUFNLHdCQUF3QjtBQVM5QixJQUFNLHVCQUF1QixDQUFDLFVBQTBCO0FBQ3RELFNBQU8sTUFBTSxRQUFRLGNBQWMsRUFBRTtBQUN2QztBQUVBLElBQU0sNEJBQTRCLENBQUMsT0FBZSxjQUFrQztBQUNsRixRQUFNLFFBQVEsTUFBTSxNQUFNLFNBQVM7QUFDbkMsTUFBSSxNQUFNLFVBQVUsRUFBRyxRQUFPO0FBQzlCLE1BQUksTUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsRUFBRyxRQUFPO0FBQ3RELE1BQUksTUFBTSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRyxRQUFPO0FBQ3ZELFNBQU8sTUFBTSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsU0FBUyxLQUFLLFdBQVcsQ0FBQztBQUN6RDtBQUdPLElBQU0sMkJBQTJCLENBQUMsUUFBMkQ7QUFDbEcsTUFBSSxRQUFRLFFBQVEsUUFBUSxPQUFXLFFBQU87QUFDOUMsTUFBSSxPQUFPLFFBQVEsU0FBVSxRQUFPLE9B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QSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVPLElBQU0seUJBQXlCLHFCQUFxQixJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sTUFBTSxNQUFNLEtBQUssRUFBRTs7O0FDL0svRixJQUFNLHlCQUF3RSxPQUFPLE9BQU87QUFBQSxFQUNqRyxLQUFLLEVBQUUsUUFBUSxrQkFBa0IsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ2pFLEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLFdBQWEsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQzVELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLFFBQVEsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3ZELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLGtCQUFrQixVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDakUsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDcEQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDcEQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsUUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDcEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsV0FBVyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsa0JBQWtCLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNqRSxLQUFLLEVBQUUsUUFBUSxTQUFXLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxnQkFBZ0IsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQy9ELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLFlBQVksVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzVELEtBQUssRUFBRSxRQUFRLFFBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3BELEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTTtBQUFBLEVBQzFELEtBQUss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LE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3pELEtBQUssRUFBRSxRQUFRLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3JELEtBQUssRUFBRSxRQUFRLGtCQUFrQixVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDakUsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsa0JBQWtCLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNqRSxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxRQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxRQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxNQUFNLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNyRCxLQUFLLEVBQUUsUUFBUSxPQUFPLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN0RCxLQUFLLEVBQUUsUUFBUSxRQUFVLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUN6RCxLQUFLLEVBQUUsUUFBUSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxFQUNwRCxLQUFLLEVBQUUsUUFBUSxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU07QUFBQSxFQUMxRCxLQUFLLEVBQUUsUUFBUSx1QkFBdUIsVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RFLEtBQUssRUFBRSxRQUFRLE9BQU8sVUFBVSxVQUFVLE9BQU8sS0FBSztBQUFBLEVBQ3RELEtBQUssRUFBRSxRQUFRLGtCQUFrQixVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDakUsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDMUQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDcEQsS0FBSyxFQUFFLFFBQVEsTUFBTSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsYUFBYSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDNUQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsUUFBUSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdkQsS0FBSyxFQUFFLFFBQVEsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDekQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsUUFBUSxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdkQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsS0FBSyxVQUFVLFVBQVUsT0FBTyxNQUFNO0FBQUEsRUFDckQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsT0FBTyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDdEQsS0FBSyxFQUFFLFFBQVEsY0FBYyxVQUFVLFVBQVUsT0FBTyxLQUFLO0FBQUEsRUFDN0QsS0FBSyxFQUFFLFFBQVEsT0FB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
