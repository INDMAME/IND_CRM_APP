import { expenseCurrencyCodes } from "./currencyCodes.ts";

export type CurrencySymbolPosition = "prefix" | "suffix";

export type CurrencyDisplayRule = {
  symbol: string;
  position: CurrencySymbolPosition;
  space: boolean;
};

// Fixed currency display rules for expense amount labels.
// Baseline generated from CLDR-backed Intl currency parts with the app's EUR suffix override.
export const CURRENCY_DISPLAY_RULES: Readonly<Record<string, CurrencyDisplayRule>> = Object.freeze({
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
  CNY: { symbol: "CN\u00a5", position: "prefix", space: false },
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
  EUR: { symbol: "\u20ac", position: "suffix", space: true },
  FJD: { symbol: "FJD", position: "prefix", space: true },
  FKP: { symbol: "FKP", position: "prefix", space: true },
  GBP: { symbol: "\u00a3", position: "prefix", space: false },
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
  ILS: { symbol: "\u20aa", position: "prefix", space: false },
  INR: { symbol: "\u20b9", position: "prefix", space: false },
  IQD: { symbol: "IQD", position: "prefix", space: true },
  IRR: { symbol: "IRR", position: "prefix", space: true },
  ISK: { symbol: "ISK", position: "prefix", space: true },
  JMD: { symbol: "JMD", position: "prefix", space: true },
  JOD: { symbol: "JOD", position: "prefix", space: true },
  JPY: { symbol: "\u00a5", position: "prefix", space: false },
  KES: { symbol: "KES", position: "prefix", space: true },
  KGS: { symbol: "KGS", position: "prefix", space: true },
  KHR: { symbol: "KHR", position: "prefix", space: true },
  KMF: { symbol: "KMF", position: "prefix", space: true },
  KPW: { symbol: "KPW", position: "prefix", space: true },
  KRW: { symbol: "\u20a9", position: "prefix", space: false },
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
  PHP: { symbol: "\u20b1", position: "prefix", space: false },
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
  VND: { symbol: "\u20ab", position: "prefix", space: false },
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
  XOF: { symbol: "F\u202fCFA", position: "prefix", space: true },
  XPD: { symbol: "XPD", position: "prefix", space: true },
  XPF: { symbol: "CFPF", position: "prefix", space: true },
  XPT: { symbol: "XPT", position: "prefix", space: true },
  XSU: { symbol: "XSU", position: "prefix", space: true },
  XTS: { symbol: "XTS", position: "prefix", space: true },
  XUA: { symbol: "XUA", position: "prefix", space: true },
  XXX: { symbol: "\u00a4", position: "prefix", space: false },
  YER: { symbol: "YER", position: "prefix", space: true },
  ZAR: { symbol: "ZAR", position: "prefix", space: true },
  ZMW: { symbol: "ZMW", position: "prefix", space: true },
  ZWG: { symbol: "ZWG", position: "prefix", space: true },
  ZWL: { symbol: "ZWL", position: "prefix", space: true },
});

const CURRENCY_CODE_SET = new Set(expenseCurrencyCodes);

const normalizeCurrencyCode = (currencyCode?: string): string => {
  return String(currencyCode || "").trim().toUpperCase();
};

// Resolves the fixed display rule for a known expense currency code.
export const resolveCurrencyDisplayRule = (currencyCode?: string): CurrencyDisplayRule | null => {
  const normalizedCurrencyCode = normalizeCurrencyCode(currencyCode);
  if (!normalizedCurrencyCode || !CURRENCY_CODE_SET.has(normalizedCurrencyCode)) {
    return null;
  }

  return CURRENCY_DISPLAY_RULES[normalizedCurrencyCode] ?? {
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
