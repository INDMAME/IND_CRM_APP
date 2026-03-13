const DDMMYYYY_COMPACT_REGEX = /^\d{8}$/;
const DDMMYY_COMPACT_REGEX = /^\d{6}$/;
const DDMMYYYY_DOTTED_REGEX = /^\d{2}\.\d{2}\.\d{4}$/;
const DATE_ONLY_DMY_REGEX = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
const DATE_ONLY_DMY_SHORT_YEAR_REGEX = /^\d{2}[./-]\d{2}[./-]\d{2}$/;
const DATE_ONLY_YMD_REGEX = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
const MIN_SUPPORTED_EXPENSE_YEAR = 1900;
const MAX_SUPPORTED_EXPENSE_YEAR = 2100;
const TWO_DIGIT_YEAR_PIVOT = 50;

export const EXPENSE_API_DATE_FORMAT_MESSAGE = "Formato requerido: DDMMYYYY o DD.MM.YYYY";

const safeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const isSupportedExpenseYear = (year: number): boolean => {
  return Number.isInteger(year) && year >= MIN_SUPPORTED_EXPENSE_YEAR && year <= MAX_SUPPORTED_EXPENSE_YEAR;
};

const expandTwoDigitExpenseYear = (year: number): number => {
  const normalized = Math.abs(Number(year)) % 100;
  return normalized >= TWO_DIGIT_YEAR_PIVOT ? 1900 + normalized : 2000 + normalized;
};

const buildDate = (year: number, month: number, day: number): Date | null => {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }
  if (!isSupportedExpenseYear(year)) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const candidate = new Date(year, month - 1, day);
  if (
    candidate.getFullYear() !== year ||
    candidate.getMonth() !== month - 1 ||
    candidate.getDate() !== day
  ) {
    return null;
  }

  return candidate;
};

// Keeps OCR dates like 09.07.1220 usable by falling back to the implied two-digit year (2020).
const buildSafeDayFirstDate = (year: number, month: number, day: number): Date | null => {
  const explicitYear = buildDate(year, month, day);
  if (explicitYear) {
    return explicitYear;
  }

  return buildDate(expandTwoDigitExpenseYear(year), month, day);
};

const toDdMmYyyyCompact = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}${month}${year}`;
};

const toDdMmYyyyDotted = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};

// Parses date inputs used by frontend/UI and backend contracts.
export const parseExpenseApiDate = (raw: unknown): Date | null => {
  if (raw instanceof Date) {
    return Number.isNaN(raw.getTime()) || !isSupportedExpenseYear(raw.getFullYear()) ? null : raw;
  }

  const value = safeText(raw);
  if (!value) return null;

  const dateOnly = value.split("T")[0].split(" ")[0];

  if (DDMMYYYY_COMPACT_REGEX.test(dateOnly)) {
    const dd = Number(dateOnly.slice(0, 2));
    const mm = Number(dateOnly.slice(2, 4));
    const yyyy = Number(dateOnly.slice(4, 8));
    const ddmmyyyy = buildSafeDayFirstDate(yyyy, mm, dd);
    if (ddmmyyyy) {
      return ddmmyyyy;
    }

    // Keep legacy compatibility for cached/stale yyyyMMdd values.
    const legacyYear = Number(dateOnly.slice(0, 4));
    const legacyMonth = Number(dateOnly.slice(4, 6));
    const legacyDay = Number(dateOnly.slice(6, 8));
    return buildDate(legacyYear, legacyMonth, legacyDay);
  }

  if (DDMMYY_COMPACT_REGEX.test(dateOnly)) {
    const dd = Number(dateOnly.slice(0, 2));
    const mm = Number(dateOnly.slice(2, 4));
    const yy = Number(dateOnly.slice(4, 6));
    return buildDate(expandTwoDigitExpenseYear(yy), mm, dd);
  }

  if (DATE_ONLY_DMY_REGEX.test(dateOnly)) {
    const [dayText, monthText, yearText] = dateOnly.split(/[./-]/);
    return buildSafeDayFirstDate(Number(yearText), Number(monthText), Number(dayText));
  }

  if (DATE_ONLY_DMY_SHORT_YEAR_REGEX.test(dateOnly)) {
    const [dayText, monthText, yearText] = dateOnly.split(/[./-]/);
    return buildDate(expandTwoDigitExpenseYear(Number(yearText)), Number(monthText), Number(dayText));
  }

  if (DATE_ONLY_YMD_REGEX.test(dateOnly)) {
    const [yearText, monthText, dayText] = dateOnly.split(/[./-]/);
    const parsedYear = Number(yearText);
    return buildDate(parsedYear, Number(monthText), Number(dayText)) ??
      buildDate(expandTwoDigitExpenseYear(parsedYear), Number(monthText), Number(dayText));
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) || !isSupportedExpenseYear(parsed.getFullYear()) ? null : parsed;
};

// Converts unknown date input into strict DD.MM.YYYY used by backend contracts.
export const toExpenseApiDate = (raw: unknown): string => {
  const parsed = parseExpenseApiDate(raw);
  if (!parsed) return "";
  return toDdMmYyyyDotted(parsed);
};

// Backward-compatible alias kept to avoid broad renames in existing modules.
export const toExpenseApiDdMmYyyy = (raw: unknown): string => {
  return toExpenseApiDate(raw);
};

export const isExpenseApiDdMmYyyy = (raw: unknown): boolean => {
  const value = safeText(raw);
  const isCompact = DDMMYYYY_COMPACT_REGEX.test(value);
  const isDotted = DDMMYYYY_DOTTED_REGEX.test(value);
  if (!isCompact && !isDotted) return false;

  const parsed = parseExpenseApiDate(value);
  if (!parsed) return false;

  if (isCompact) return toDdMmYyyyCompact(parsed) === value;
  return toDdMmYyyyDotted(parsed) === value;
};

export const toExpenseIsoDate = (raw: unknown): string => {
  const parsed = parseExpenseApiDate(raw);
  if (!parsed) return "";

  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
