import { parseExpenseApiDate } from "./expenseApiDateUtils.ts";

export type ExpenseDateParts = {
  year: string;
  month: string;
  day: string;
};

type ParseExpenseDateOptions = {
  preferMonthFirstOnSlash?: boolean;
};

const BASQUE_MONTHS_SHORT = [
  "urt",
  "ots",
  "mar",
  "api",
  "mai",
  "eka",
  "uzt",
  "abu",
  "ira",
  "urr",
  "aza",
  "abe",
];

const normalizeUiLocale = (locale: string): string => {
  const value = String(locale || "").trim();
  if (!value) return "es-ES";
  if (/^zh-hans/i.test(value)) return "zh-CN";
  return value;
};

const isBasqueLocale = (locale: string): boolean => /^eu\b/i.test(String(locale || ""));

// Normalize unknown values to a trimmed string.
export const safeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

// Normalizes card title text only when it comes in full upper or full lower case.
export const normalizeCardTitleText = (value: unknown, fallback = "-"): string => {
  const source = safeText(value);
  if (!source) return fallback;

  const hasLetters = /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(source);
  if (!hasLetters) return source;

  const isAllUpper = source === source.toUpperCase() && source !== source.toLowerCase();
  const isAllLower = source === source.toLowerCase() && source !== source.toUpperCase();
  if (!isAllUpper && !isAllLower) {
    return source;
  }

  const lower = source.toLowerCase();
  return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
};

// Returns true only when voucher has a meaningful assigned value.
export const hasAssignedVoucher = (value: unknown): boolean => {
  const voucher = safeText(value).toUpperCase();
  if (!voucher) return false;
  return voucher !== "-" && voucher !== "." && voucher !== "0";
};

// Return date at local day start.
export const startOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// Format local date to yyyy-MM-dd.
export const toIsoDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const buildExpenseDate = (year: number, month: number, day: number): Date | null => {
  const candidate = new Date(year, month - 1, day);
  if (
    Number.isNaN(candidate.getTime()) ||
    candidate.getFullYear() !== year ||
    candidate.getMonth() !== month - 1 ||
    candidate.getDate() !== day
  ) {
    return null;
  }

  return candidate;
};

// Parse supported API date formats.
export const parseExpenseDate = (raw?: string, options?: ParseExpenseDateOptions): Date | null => {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;

  const dateOnly = value.split("T")[0].split(" ")[0];

  // Keep optional month-first compatibility for legacy slash dates in cards.
  if (options?.preferMonthFirstOnSlash && /^\d{2}\/\d{2}\/\d{4}$/.test(dateOnly)) {
    const [firstPart, secondPart, yearPart] = dateOnly.split(/[./-]/);
    const first = Number(firstPart);
    const second = Number(secondPart);
    const year = Number(yearPart);
    const monthFirstDate = buildExpenseDate(year, first, second);
    if (monthFirstDate) {
      return monthFirstDate;
    }
  }

  return parseExpenseApiDate(value);
};

// Format a date for read-only fields using the same output style as visits.
export const formatExpenseDisplayDate = (raw?: string, locale = "es-ES", fallback = "-"): string => {
  const date = parseExpenseDate(raw);
  if (!date) return fallback;

  const safeLocale = normalizeUiLocale(locale);
  if (isBasqueLocale(safeLocale)) {
    return `${date.getDate()} ${BASQUE_MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`.toLowerCase();
  }

  return date
    .toLocaleDateString(safeLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/\./g, "")
    .toLowerCase();
};

// Build timeline date fragments for card left panel.
export const formatExpenseDateParts = (raw?: string, locale = "es-ES", options?: ParseExpenseDateOptions): ExpenseDateParts => {
  const date = parseExpenseDate(raw, options);
  if (!date) {
    return { year: "", month: "", day: "--" };
  }

  return {
    year: String(date.getFullYear()),
    month: date.toLocaleDateString(locale, { month: "short" }).replace(/\./g, "").toUpperCase(),
    day: String(date.getDate()).padStart(2, "0"),
  };
};
