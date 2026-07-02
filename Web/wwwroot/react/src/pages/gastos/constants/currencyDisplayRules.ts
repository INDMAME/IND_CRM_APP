import { expenseCurrencyCodes } from "./currencyCodes.ts";

export type CurrencySymbolPosition = "prefix" | "suffix";

export type CurrencyDisplayRule = {
  symbol: string;
  position: CurrencySymbolPosition;
  space: boolean;
};

// Fixed currency display rules for expense amount labels.
// Baseline generated from Unicode CLDR 48 native locale currency parts with narrow symbols.
export const CURRENCY_DISPLAY_RULES: Readonly<Record<string, CurrencyDisplayRule>> = Object.freeze({
  AED: { symbol: "\u062f.\u0625.", position: "suffix", space: true },
  AFN: { symbol: "\u060b", position: "prefix", space: true },
  ALL: { symbol: "Lek\u00eb", position: "suffix", space: true },
  AMD: { symbol: "\u058f", position: "suffix", space: true },
  AOA: { symbol: "Kz", position: "suffix", space: true },
  ARS: { symbol: "$", position: "prefix", space: true },
  AUD: { symbol: "$", position: "prefix", space: false },
  AWG: { symbol: "Afl.", position: "prefix", space: true },
  AZN: { symbol: "\u20bc", position: "suffix", space: true },
  BAM: { symbol: "KM", position: "suffix", space: true },
  BBD: { symbol: "$", position: "prefix", space: false },
  BDT: { symbol: "\u09f3", position: "suffix", space: false },
  BHD: { symbol: "\u062f.\u0628.", position: "suffix", space: true },
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
  CNY: { symbol: "\u00a5", position: "prefix", space: false },
  COP: { symbol: "$", position: "prefix", space: true },
  COU: { symbol: "COU", position: "prefix", space: true },
  CRC: { symbol: "\u20a1", position: "prefix", space: false },
  CUC: { symbol: "$", position: "prefix", space: false },
  CUP: { symbol: "$", position: "prefix", space: false },
  CVE: { symbol: "CVE", position: "suffix", space: true },
  CZK: { symbol: "K\u010d", position: "suffix", space: true },
  DJF: { symbol: "Fdj", position: "suffix", space: true },
  DKK: { symbol: "kr.", position: "suffix", space: true },
  DOP: { symbol: "$", position: "prefix", space: false },
  DZD: { symbol: "\u062f.\u062c.", position: "suffix", space: true },
  EGP: { symbol: "E\u00a3", position: "suffix", space: true },
  ERN: { symbol: "Nfk", position: "prefix", space: true },
  ETB: { symbol: "\u1265\u122d", position: "prefix", space: true },
  EUR: { symbol: "\u20ac", position: "suffix", space: true },
  FJD: { symbol: "$", position: "prefix", space: false },
  FKP: { symbol: "\u00a3", position: "prefix", space: false },
  GBP: { symbol: "\u00a3", position: "prefix", space: false },
  GEL: { symbol: "\u20be", position: "suffix", space: true },
  GHS: { symbol: "GH\u20b5", position: "prefix", space: false },
  GIP: { symbol: "\u00a3", position: "prefix", space: false },
  GMD: { symbol: "D", position: "prefix", space: true },
  GNF: { symbol: "FG", position: "suffix", space: true },
  GTQ: { symbol: "Q", position: "prefix", space: true },
  GYD: { symbol: "$", position: "prefix", space: false },
  HKD: { symbol: "$", position: "prefix", space: false },
  HNL: { symbol: "L", position: "prefix", space: true },
  HTG: { symbol: "HTG", position: "suffix", space: true },
  HUF: { symbol: "Ft", position: "suffix", space: true },
  IDR: { symbol: "Rp", position: "prefix", space: true },
  ILS: { symbol: "\u20aa", position: "suffix", space: true },
  INR: { symbol: "\u20b9", position: "prefix", space: false },
  IQD: { symbol: "\u062f.\u0639.", position: "suffix", space: true },
  IRR: { symbol: "\u0631\u06cc\u0627\u0644", position: "prefix", space: true },
  ISK: { symbol: "kr.", position: "suffix", space: true },
  JMD: { symbol: "$", position: "prefix", space: false },
  JOD: { symbol: "\u062f.\u0623.", position: "suffix", space: true },
  JPY: { symbol: "\uffe5", position: "prefix", space: false },
  KES: { symbol: "Ksh", position: "prefix", space: true },
  KGS: { symbol: "\u20c0", position: "suffix", space: true },
  KHR: { symbol: "\u17db", position: "suffix", space: false },
  KMF: { symbol: "CF", position: "suffix", space: true },
  KPW: { symbol: "\u20a9", position: "prefix", space: false },
  KRW: { symbol: "\u20a9", position: "prefix", space: false },
  KWD: { symbol: "\u062f.\u0643.", position: "suffix", space: true },
  KYD: { symbol: "$", position: "prefix", space: false },
  KZT: { symbol: "\u20b8", position: "suffix", space: true },
  LAK: { symbol: "\u20ad", position: "prefix", space: false },
  LBP: { symbol: "L\u00a3", position: "suffix", space: true },
  LKR: { symbol: "\u0dbb\u0dd4.", position: "prefix", space: true },
  LRD: { symbol: "$", position: "prefix", space: false },
  LSL: { symbol: "M", position: "prefix", space: true },
  LYD: { symbol: "\u062f.\u0644.", position: "suffix", space: true },
  MAD: { symbol: "\u062f.\u0645.", position: "suffix", space: true },
  MDL: { symbol: "L", position: "suffix", space: true },
  MGA: { symbol: "Ar", position: "prefix", space: true },
  MKD: { symbol: "\u0434\u0435\u043d.", position: "suffix", space: true },
  MMK: { symbol: "K", position: "suffix", space: true },
  MNT: { symbol: "\u20ae", position: "prefix", space: true },
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
  NGN: { symbol: "\u20a6", position: "prefix", space: false },
  NIO: { symbol: "C$", position: "prefix", space: false },
  NOK: { symbol: "kr", position: "suffix", space: true },
  NPR: { symbol: "\u0930\u0942", position: "prefix", space: true },
  NZD: { symbol: "$", position: "prefix", space: false },
  OMR: { symbol: "\u0631.\u0639.", position: "suffix", space: true },
  PAB: { symbol: "B/.", position: "prefix", space: true },
  PEN: { symbol: "S/", position: "prefix", space: true },
  PGK: { symbol: "PGK", position: "suffix", space: true },
  PHP: { symbol: "\u20b1", position: "prefix", space: false },
  PKR: { symbol: "Rs", position: "prefix", space: true },
  PLN: { symbol: "z\u0142", position: "suffix", space: true },
  PYG: { symbol: "\u20b2", position: "suffix", space: true },
  QAR: { symbol: "\u0631.\u0642.", position: "suffix", space: true },
  RON: { symbol: "lei", position: "suffix", space: true },
  RSD: { symbol: "RSD", position: "suffix", space: true },
  RUB: { symbol: "\u20bd", position: "suffix", space: true },
  RWF: { symbol: "RF", position: "prefix", space: true },
  SAR: { symbol: "\u0631.\u0633.", position: "suffix", space: true },
  SBD: { symbol: "$", position: "prefix", space: false },
  SCR: { symbol: "SR", position: "suffix", space: true },
  SDG: { symbol: "\u062c.\u0633.", position: "suffix", space: true },
  SEK: { symbol: "kr", position: "suffix", space: true },
  SGD: { symbol: "$", position: "prefix", space: false },
  SHP: { symbol: "\u00a3", position: "prefix", space: false },
  SLE: { symbol: "Le", position: "prefix", space: true },
  SOS: { symbol: "S", position: "prefix", space: true },
  SRD: { symbol: "$", position: "prefix", space: true },
  SSP: { symbol: "\u00a3", position: "suffix", space: true },
  STN: { symbol: "Db", position: "suffix", space: true },
  SVC: { symbol: "SVC", position: "prefix", space: true },
  SYP: { symbol: "\u00a3", position: "suffix", space: true },
  SZL: { symbol: "E", position: "prefix", space: true },
  THB: { symbol: "\u0e3f", position: "prefix", space: false },
  TJS: { symbol: "\u0441\u043e\u043c.", position: "suffix", space: true },
  TMT: { symbol: "TMT", position: "suffix", space: true },
  TND: { symbol: "\u062f.\u062a.", position: "suffix", space: true },
  TOP: { symbol: "T$", position: "prefix", space: true },
  TRY: { symbol: "\u20ba", position: "prefix", space: false },
  TTD: { symbol: "$", position: "prefix", space: false },
  TWD: { symbol: "$", position: "prefix", space: false },
  TZS: { symbol: "TSh", position: "prefix", space: true },
  UAH: { symbol: "\u20b4", position: "suffix", space: true },
  UGX: { symbol: "USh", position: "prefix", space: true },
  USD: { symbol: "$", position: "prefix", space: false },
  USN: { symbol: "USN", position: "prefix", space: true },
  UYI: { symbol: "UYI", position: "prefix", space: true },
  UYU: { symbol: "$", position: "prefix", space: true },
  UYW: { symbol: "UP", position: "prefix", space: true },
  UZS: { symbol: "so\u02bbm", position: "suffix", space: true },
  VED: { symbol: "VED", position: "prefix", space: true },
  VEF: { symbol: "Bs.", position: "prefix", space: true },
  VES: { symbol: "Bs.S", position: "prefix", space: true },
  VND: { symbol: "\u20ab", position: "suffix", space: true },
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
  XOF: { symbol: "F\u202fCFA", position: "prefix", space: true },
  XPD: { symbol: "XPD", position: "prefix", space: true },
  XPF: { symbol: "FCFP", position: "suffix", space: true },
  XPT: { symbol: "XPT", position: "prefix", space: true },
  XSU: { symbol: "XSU", position: "prefix", space: true },
  XTS: { symbol: "XTS", position: "prefix", space: true },
  XUA: { symbol: "XUA", position: "prefix", space: true },
  XXX: { symbol: "\u00a4", position: "prefix", space: false },
  YER: { symbol: "\u0631.\u064a.", position: "suffix", space: true },
  ZAR: { symbol: "R", position: "prefix", space: true },
  ZMW: { symbol: "ZK", position: "prefix", space: true },
  ZWG: { symbol: "ZWG", position: "prefix", space: true },
  ZWL: { symbol: "ZWL", position: "prefix", space: true },
});

const CURRENCY_CODE_SET = new Set(expenseCurrencyCodes);

// Maps legacy Axapta currency identifiers to the closest ISO display rule.
const CURRENCY_CODE_ALIASES: Readonly<Record<string, string>> = Object.freeze({
  WON: "KRW",
});

const normalizeCurrencyCode = (currencyCode?: string): string => {
  return String(currencyCode || "").trim().toUpperCase();
};

// Resolves the fixed display rule for a known expense currency code.
export const resolveCurrencyDisplayRule = (currencyCode?: string): CurrencyDisplayRule | null => {
  const normalizedCurrencyCode = normalizeCurrencyCode(currencyCode);
  const resolvedCurrencyCode = CURRENCY_CODE_ALIASES[normalizedCurrencyCode] ?? normalizedCurrencyCode;
  if (!resolvedCurrencyCode || !CURRENCY_CODE_SET.has(resolvedCurrencyCode)) {
    return null;
  }

  return CURRENCY_DISPLAY_RULES[resolvedCurrencyCode] ?? {
    symbol: normalizedCurrencyCode,
    position: "suffix",
    space: true,
  };
};

// Applies a resolved currency display rule without changing the numeric text.
export const formatCurrencyDisplayAmount = (amountText: string, currencyCode?: string): string => {
  const safeAmountText = amountText || "-";
  const normalizedCurrencyCode = normalizeCurrencyCode(currencyCode);
  const displayRule = resolveCurrencyDisplayRule(normalizedCurrencyCode);

  if (!displayRule) {
    return normalizedCurrencyCode ? `${safeAmountText} ${normalizedCurrencyCode}` : safeAmountText;
  }

  const separator = displayRule.space ? " " : "";
  return displayRule.position === "prefix"
    ? `${displayRule.symbol}${separator}${safeAmountText}`
    : `${safeAmountText}${separator}${displayRule.symbol}`;
};
