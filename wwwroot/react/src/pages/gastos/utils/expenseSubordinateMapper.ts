import type { ExpenseSheetSubordinateDto } from "../expenseTypes.ts";
import { safeText } from "./expenseApiTransforms.ts";

type RawExpenseSubordinate = {
  crmUserId?: unknown;
  CrmUserId?: unknown;
  axUserId?: unknown;
  AxUserId?: unknown;
  userId?: unknown;
  UserId?: unknown;
  name?: unknown;
  Name?: unknown;
};

const resolveSubordinateObject = (item: RawExpenseSubordinate): ExpenseSheetSubordinateDto | null => {
  const legacyUserId = safeText(item.userId ?? item.UserId);
  const crmUserId = safeText(item.crmUserId ?? item.CrmUserId ?? legacyUserId);
  const axUserId = safeText(item.axUserId ?? item.AxUserId ?? legacyUserId);
  const resolvedCrmUserId = crmUserId || axUserId;
  const resolvedAxUserId = axUserId || crmUserId;

  if (!resolvedCrmUserId || !resolvedAxUserId) {
    return null;
  }

  const name = safeText(item.name ?? item.Name) || resolvedAxUserId;
  return {
    crmUserId: resolvedCrmUserId,
    axUserId: resolvedAxUserId,
    name,
  };
};

const resolveSubordinateArray = (item: unknown[]): ExpenseSheetSubordinateDto | null => {
  // Legacy AX payload shape: [userId, name]
  if (item.length < 3) {
    const legacyUserId = safeText(item[0]);
    if (!legacyUserId) return null;
    const legacyName = safeText(item[1]) || legacyUserId;
    return {
      crmUserId: legacyUserId,
      axUserId: legacyUserId,
      name: legacyName,
    };
  }

  // Current AX payload shape: [crmUserId, axUserId, name]
  const crmUserId = safeText(item[0]);
  const axUserId = safeText(item[1]);
  const fallbackId = safeText(item[0] ?? item[1]);
  const resolvedCrmUserId = crmUserId || fallbackId;
  const resolvedAxUserId = axUserId || fallbackId;

  if (!resolvedCrmUserId || !resolvedAxUserId) {
    return null;
  }

  const name = safeText(item[2]) || resolvedAxUserId;
  return {
    crmUserId: resolvedCrmUserId,
    axUserId: resolvedAxUserId,
    name,
  };
};

// Maps one raw subordinate item from legacy or new API shape.
export const mapExpenseSheetSubordinate = (item: unknown): ExpenseSheetSubordinateDto | null => {
  if (!item) return null;
  if (Array.isArray(item)) {
    return resolveSubordinateArray(item);
  }
  if (typeof item !== "object") return null;
  return resolveSubordinateObject(item as RawExpenseSubordinate);
};

// Normalizes raw subordinate arrays and drops malformed entries.
export const normalizeExpenseSheetSubordinates = (source: unknown): ExpenseSheetSubordinateDto[] => {
  if (!Array.isArray(source)) return [];

  return source
    .map((entry) => mapExpenseSheetSubordinate(entry))
    .filter((entry): entry is ExpenseSheetSubordinateDto => !!entry);
};
