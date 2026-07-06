const EXPENSE_NUMBER_LOCALE = "en-US";

type ExpenseNumberFormatOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  fallback?: string;
};

const sanitizeNumericToken = (value: string): string => {
  return value.replace(/[^\d.,+-]/g, "");
};

const isThousandsGroupedInteger = (value: string, separator: "," | "."): boolean => {
  const parts = value.split(separator);
  if (parts.length <= 1) return false;
  if (parts.some((part) => !/^\d+$/.test(part))) return false;
  if (parts[0].length < 1 || parts[0].length > 3) return false;
  return parts.slice(1).every((part) => part.length === 3);
};

// Parses numeric input supporting both grouped and decimal values.
export const parseExpenseNumericInput = (raw: string | number | null | undefined): number | null => {
  if (raw === null || raw === undefined) return null;
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

  let normalized: string;
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

// Compares editable numeric strings by value so blur formatting is not treated as a data edit.
export const areExpenseNumericInputsEquivalent = (
  left: string | number | null | undefined,
  right: string | number | null | undefined
): boolean => {
  const leftParsed = parseExpenseNumericInput(left);
  const rightParsed = parseExpenseNumericInput(right);
  if (leftParsed !== null || rightParsed !== null) {
    return leftParsed === rightParsed;
  }

  return String(left ?? "").trim() === String(right ?? "").trim();
};

// Formats numeric values with the fixed expense visual contract: #,##0.00
export const formatExpenseNumber = (
  value: number | null | undefined,
  options?: ExpenseNumberFormatOptions
): string => {
  const fallback = options?.fallback ?? "-";
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return fallback;
  }

  return new Intl.NumberFormat(EXPENSE_NUMBER_LOCALE, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    useGrouping: options?.useGrouping ?? true,
  }).format(Number(value));
};

// Parses and formats raw input values to the fixed expense visual contract.
export const formatExpenseInputNumber = (
  raw: string | number | null | undefined,
  options?: ExpenseNumberFormatOptions
): string => {
  const parsed = parseExpenseNumericInput(raw);
  if (parsed === null) {
    return options?.fallback ?? "";
  }

  return formatExpenseNumber(parsed, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    useGrouping: options?.useGrouping ?? true,
    fallback: options?.fallback ?? "",
  });
};
