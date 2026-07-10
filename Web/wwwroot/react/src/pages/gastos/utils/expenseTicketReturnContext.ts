import {
  getSessionJsonWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
} from "../../../utils/sessionExpiry.ts";
import { safeText } from "./expenseUiUtils.ts";
import { getExpenseScopeToken } from "./expenseScope.ts";

const EXPENSE_TICKET_RETURN_CONTEXT_KEY_PREFIX = "expense_ticket_return_context_v1";
const EXPENSE_TICKET_RETURN_CONTEXT_TTL_MS = 12 * 60 * 60 * 1000;

// Marks the one flow that edits a failed link candidate without linking it on save.
export const EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT = "link-failure-repair";

export type ExpenseTicketSheetOrigin = "sheet-create" | "expense-line" | "sheet-link";

export type ExpenseTicketReturnContext = {
  fileId: string;
  sheetId: string;
  origin: ExpenseTicketSheetOrigin;
  sheetLineRecId?: string;
};

const normalizeOrigin = (value: unknown): ExpenseTicketSheetOrigin | "" => {
  const normalized = safeText(value).toLowerCase();
  if (normalized === "sheet-create" || normalized === "expense-line" || normalized === "sheet-link") {
    return normalized;
  }
  return "";
};

const getScopedKey = (): string => {
  return `${EXPENSE_TICKET_RETURN_CONTEXT_KEY_PREFIX}_${getExpenseScopeToken()}`;
};

// Normalizes a ticket return payload before it is used across ticket detail flows.
export const normalizeExpenseTicketReturnContext = (value: unknown): ExpenseTicketReturnContext | null => {
  if (!value || typeof value !== "object") return null;

  const payload = value as Partial<ExpenseTicketReturnContext>;
  const fileId = safeText(payload.fileId);
  const sheetId = safeText(payload.sheetId);
  const origin = normalizeOrigin(payload.origin);
  const sheetLineRecId = safeText(payload.sheetLineRecId);
  if (!fileId || !sheetId || !origin) return null;

  return {
    fileId,
    sheetId,
    origin,
    sheetLineRecId: sheetLineRecId || undefined,
  };
};

// Reads the current ticket return context when it matches the active ticket file.
export const readExpenseTicketReturnContext = (fileId?: unknown): ExpenseTicketReturnContext | null => {
  const stored = normalizeExpenseTicketReturnContext(
    getSessionJsonWithExpiry<ExpenseTicketReturnContext>(getScopedKey())
  );
  if (!stored) return null;

  const safeFileId = safeText(fileId);
  if (!safeFileId) return stored;
  return stored.fileId.toUpperCase() === safeFileId.toUpperCase() ? stored : null;
};

// Persists sheet-origin ticket context so ticket detail and line detail can return consistently.
export const saveExpenseTicketReturnContext = (
  value: ExpenseTicketReturnContext | null | undefined
): ExpenseTicketReturnContext | null => {
  const normalized = normalizeExpenseTicketReturnContext(value);
  if (!normalized) {
    clearExpenseTicketReturnContext();
    return null;
  }

  setSessionJsonWithExpiry(getScopedKey(), normalized, EXPENSE_TICKET_RETURN_CONTEXT_TTL_MS);
  return normalized;
};

// Clears any stored ticket return context for the current expense scope.
export const clearExpenseTicketReturnContext = (): void => {
  removeSessionValueWithExpiry(getScopedKey());
};

// Resolves the active sheet return context using explicit route data first and storage as fallback.
export const resolveExpenseTicketReturnContext = (
  fileId: unknown,
  explicitContext?: ExpenseTicketReturnContext | null
): ExpenseTicketReturnContext | null => {
  const normalizedExplicitContext = normalizeExpenseTicketReturnContext(explicitContext);
  if (normalizedExplicitContext) return normalizedExplicitContext;
  return readExpenseTicketReturnContext(fileId);
};

// Applies sheet-origin query values when navigating between ticket detail screens.
export const appendExpenseTicketReturnQuery = (
  query: URLSearchParams,
  context?: ExpenseTicketReturnContext | null
): URLSearchParams => {
  const normalized = normalizeExpenseTicketReturnContext(context);
  if (!normalized) return query;

  query.set("origin", normalized.origin);
  query.set("sheetId", normalized.sheetId);
  if (normalized.sheetLineRecId) {
    query.set("sheetLineRecId", normalized.sheetLineRecId);
  }
  return query;
};

// Builds the canonical expense sheet detail URL used by ticket return flows.
export const buildExpenseSheetDetailUrl = (sheetId: unknown): string => {
  const safeSheetId = safeText(sheetId);
  if (!safeSheetId) return "/Gastos/ExpenseSheets";
  return `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`;
};

// Builds the canonical expense sheet line detail URL used when ticket detail returns to a linked line.
export const buildExpenseSheetLineDetailUrl = (sheetId: unknown, lineRecId: unknown): string => {
  const safeSheetId = safeText(sheetId);
  const safeLineRecId = safeText(lineRecId);
  if (!safeSheetId || !safeLineRecId) {
    return buildExpenseSheetDetailUrl(safeSheetId);
  }

  const query = new URLSearchParams({
    hojaGastosId: safeSheetId,
    lineRecId: safeLineRecId,
  });
  return `/Gastos/ExpenseSheetLineDetail?${query.toString()}`;
};

// Builds the canonical ticket link form URL used when a ticket detail returns to link mode.
export const buildExpenseTicketLinkUrl = (sheetId: unknown): string => {
  const safeSheetId = safeText(sheetId);
  if (!safeSheetId) return "/Gastos/Tickets";
  return `/Gastos/Tickets?action=link&hojaGastosId=${encodeURIComponent(safeSheetId)}`;
};
