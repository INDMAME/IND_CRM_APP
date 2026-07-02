import { ApiFetchError } from "../../../services/apiService.ts";
import type { ExpenseGastoTypeCode, ExpenseSheetTicketListRequest } from "../expenseTypes.ts";
import {
  formatExpenseGastoTypeAllowedMessage,
  toExpenseGastoTypeCode,
} from "../constants/expenseGastoTypeCatalog.ts";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  isExpenseApiDdMmYyyy,
  toExpenseApiDdMmYyyy,
} from "./expenseApiDateUtils.ts";

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
  return parsed !== null && Number.isInteger(parsed) && parsed >= 0;
};

export const toNullableTicketStatusCode = (value: unknown): number | null => {
  const parsed = toNullableNumber(value);
  if (parsed !== null && Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }

  return null;
};

export const toNullableGastoTypeCode = (value: unknown): ExpenseGastoTypeCode | null => {
  return toExpenseGastoTypeCode(value);
};

export const normalizeOptionalTicketGastoType = (value: unknown): ExpenseGastoTypeCode | undefined => {
  if (value === null || value === undefined || safeText(value) === "") {
    return undefined;
  }

  const parsed = toNullableGastoTypeCode(value);
  if (parsed === null) {
    throw new ApiFetchError(formatExpenseGastoTypeAllowedMessage());
  }

  return parsed;
};

export const normalizeTicketListGastoType = (value: unknown): ExpenseSheetTicketListRequest["gastoType"] => {
  if (value === null || value === undefined || safeText(value) === "") {
    return null;
  }

  return toNullableGastoTypeCode(value);
};

export const normalizeOptionalTicketStatus = (value: unknown): number | null => {
  if (value === null || value === undefined || safeText(value) === "") {
    return null;
  }

  return toNullableTicketStatusCode(value);
};

export const normalizeTicketListDate = (value: unknown): string => {
  const raw = safeText(value);
  if (!raw) return "";

  return toExpenseApiDdMmYyyy(raw);
};

export const normalizeOptionalApiDate = (value: unknown): string | undefined => {
  const raw = safeText(value);
  if (!raw) return undefined;

  const normalized = toExpenseApiDdMmYyyy(raw);
  return normalized || undefined;
};

export const normalizeRequiredApiDate = (value: unknown): string => {
  const normalized = normalizeOptionalApiDate(value);
  if (!normalized) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  return normalized;
};

export const validateApiDdMmYyyyOrThrow = (value: unknown): void => {
  if (!isExpenseApiDdMmYyyy(value)) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
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
