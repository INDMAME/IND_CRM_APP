import {
  getSessionJsonWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
} from "../../../utils/sessionExpiry.ts";
import { safeText } from "./expenseUiUtils.ts";
import { getExpenseScopeToken } from "./expenseScope.ts";

const EXPENSE_TICKET_SHEET_SYNC_STATE_KEY_PREFIX = "expense_ticket_sheet_sync_state_v1";
const EXPENSE_TICKET_SHEET_SYNC_STATE_TTL_MS = 12 * 60 * 60 * 1000;

export type ExpenseTicketSheetSyncState = {
  fileId: string;
  sheetId: string;
  message: string;
};

const getScopedKey = (): string => {
  return `${EXPENSE_TICKET_SHEET_SYNC_STATE_KEY_PREFIX}_${getExpenseScopeToken()}`;
};

// Normalizes one transient sheet-sync state before it is stored or consumed.
export const normalizeExpenseTicketSheetSyncState = (value: unknown): ExpenseTicketSheetSyncState | null => {
  if (!value || typeof value !== "object") return null;

  const payload = value as Partial<ExpenseTicketSheetSyncState>;
  const fileId = safeText(payload.fileId);
  const sheetId = safeText(payload.sheetId);
  const message = safeText(payload.message);
  if (!fileId || !sheetId) return null;

  return {
    fileId,
    sheetId,
    message,
  };
};

// Reads the transient sync-failure state when it still matches the active ticket file.
export const readExpenseTicketSheetSyncState = (fileId?: unknown): ExpenseTicketSheetSyncState | null => {
  const stored = normalizeExpenseTicketSheetSyncState(
    getSessionJsonWithExpiry<ExpenseTicketSheetSyncState>(getScopedKey())
  );
  if (!stored) return null;

  const safeFileId = safeText(fileId);
  if (!safeFileId) return stored;
  return stored.fileId.toUpperCase() === safeFileId.toUpperCase() ? stored : null;
};

// Persists the transient sync-failure state so the ticket workflow can recover on the next page.
export const saveExpenseTicketSheetSyncState = (
  value: ExpenseTicketSheetSyncState | null | undefined
): ExpenseTicketSheetSyncState | null => {
  const normalized = normalizeExpenseTicketSheetSyncState(value);
  if (!normalized) {
    clearExpenseTicketSheetSyncState();
    return null;
  }

  setSessionJsonWithExpiry(getScopedKey(), normalized, EXPENSE_TICKET_SHEET_SYNC_STATE_TTL_MS);
  return normalized;
};

// Clears the transient sheet-sync failure state for the current expense scope.
export const clearExpenseTicketSheetSyncState = (): void => {
  removeSessionValueWithExpiry(getScopedKey());
};
