import { ApiFetchError } from "../../../services/apiService.ts";
import type { ExpenseGastoTypeCode, ExpenseSheetTicketListRequest } from "../expenseTypes.ts";

const ALLOWED_GASTO_TYPE_CODES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);

// Converts unknown values to trimmed text.
export const safeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

// Converts unknown values to nullable finite numbers.
export const toNullableNumber = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const isNonNegativeNumber = (value: unknown): boolean => {
  const parsed = toNullableNumber(value);
  return parsed !== null && parsed >= 0;
};

export const isPositiveNumber = (value: unknown): boolean => {
  const parsed = toNullableNumber(value);
  return parsed !== null && parsed > 0;
};

const isValidListExpenseSheetStatus = (value: unknown): boolean => {
  const parsed = toNullableNumber(value);
  return parsed !== null && Number.isInteger(parsed) && parsed >= 0 && parsed <= 4;
};

export const toNullableTicketStatusCode = (value: unknown): 0 | 1 | null => {
  const parsed = toNullableNumber(value);
  if (parsed === 0 || parsed === 1) {
    return parsed;
  }

  return null;
};

export const toNullableGastoTypeCode = (value: unknown): ExpenseGastoTypeCode | null => {
  const parsed = toNullableNumber(value);
  if (parsed === null || !Number.isInteger(parsed) || !ALLOWED_GASTO_TYPE_CODES.has(parsed)) {
    return null;
  }

  return parsed as ExpenseGastoTypeCode;
};

export const normalizeOptionalTicketGastoType = (value: unknown): ExpenseGastoTypeCode | undefined => {
  if (value === null || value === undefined || safeText(value) === "") {
    return undefined;
  }

  const parsed = toNullableGastoTypeCode(value);
  if (parsed === null) {
    throw new ApiFetchError("gastoType must be one of: 0,1,2,3,4,5,6,7,8,14.");
  }

  return parsed;
};

export const normalizeTicketListGastoType = (value: unknown): ExpenseSheetTicketListRequest["gastoType"] => {
  if (value === null || value === undefined || safeText(value) === "") {
    return null;
  }

  return toNullableGastoTypeCode(value);
};

export const normalizeOptionalTicketStatus = (value: unknown): 0 | 1 | null => {
  if (value === null || value === undefined || safeText(value) === "") {
    return null;
  }

  return toNullableTicketStatusCode(value);
};

export const normalizeTicketListDate = (value: unknown): string => {
  const raw = safeText(value);
  if (!raw) return "";

  const dateOnly = raw.split("T")[0].split(" ")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    return dateOnly;
  }

  if (/^\d{8}$/.test(dateOnly)) {
    const year = dateOnly.slice(0, 4);
    const month = dateOnly.slice(4, 6);
    const day = dateOnly.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const toNullableBool = (value: unknown): boolean | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }
  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
  }
  return null;
};

export const normalizeOptionalTicketProcessedByAI = (value: unknown): boolean | null => {
  if (value === null || value === undefined || safeText(value) === "") {
    return null;
  }

  return toNullableBool(value);
};

export const normalizeExpenseSheetListStatusFilter = (value: unknown): number | null => {
  return isValidListExpenseSheetStatus(value) ? Number(value) : null;
};

export const toFlagBool = (value: unknown): boolean | null => {
  const normalizedBool = toNullableBool(value);
  if (normalizedBool !== null) return normalizedBool;

  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  if (normalized === "on" || normalized === "yes" || normalized === "y") return true;
  if (normalized === "off" || normalized === "no" || normalized === "n") return false;
  return null;
};
