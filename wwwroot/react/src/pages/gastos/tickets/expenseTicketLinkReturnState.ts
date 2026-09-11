import { normalizeExpenseTicketFilterSnapshot } from "./expenseTicketFilterSnapshot.ts";
import { toExpenseGastoTypeCode } from "../constants/expenseGastoTypeCatalog.ts";
import type {
  ExpenseTicketAppliedFilterSnapshot,
  ExpenseTicketLinkCard,
  ExpenseTicketLinkSelectionMode,
} from "./expenseTicketListTypes.ts";
import { getSessionJsonWithExpiry, removeSessionValueWithExpiry, setSessionJsonWithExpiry } from "../../../utils/sessionExpiry.ts";
import { getExpenseScopeToken } from "../utils/expenseScope.ts";

const EXPENSE_TICKET_LINK_RETURN_STATE_KEY_PREFIX = "expense_ticket_link_return_state_v1";
const EXPENSE_TICKET_LINK_RETURN_STATE_TTL_MS = 12 * 60 * 60 * 1000;

export type ExpenseTicketLinkReturnState = {
  sheetId: string;
  targetLineRecId: string;
  page: number;
  scrollY: number;
  focusFileId: string;
  filters: ExpenseTicketAppliedFilterSnapshot;
  selectionMode: ExpenseTicketLinkSelectionMode;
  selectedTickets: ExpenseTicketLinkCard[];
  excludedIds: string[];
  filteredSelectionFilters: ExpenseTicketAppliedFilterSnapshot | null;
  filteredSelectionTotal: number;
};

const getScopedKey = (): string => {
  return `${EXPENSE_TICKET_LINK_RETURN_STATE_KEY_PREFIX}_${getExpenseScopeToken()}`;
};

const normalizeFileId = (value: unknown): string => {
  return String(value || "").trim();
};

const normalizeProcessedByAi = (value: unknown): boolean | null => {
  if (value === true || value === false) return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return null;
};

const normalizeNullableNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeTicketGastoType = (value: unknown): ExpenseTicketLinkCard["gastoType"] => {
  return toExpenseGastoTypeCode(value) as ExpenseTicketLinkCard["gastoType"];
};

const normalizeSelectionMode = (value: unknown): ExpenseTicketLinkSelectionMode => {
  return value === "filtered" ? "filtered" : "selected";
};

const normalizeSelectedTickets = (value: unknown): ExpenseTicketLinkCard[] => {
  if (!Array.isArray(value)) return [];

  const items = new Map<string, ExpenseTicketLinkCard>();
  for (const entry of value) {
    const item = (entry || {}) as Partial<ExpenseTicketLinkCard>;
    const fileId = normalizeFileId(item.fileId);
    if (!fileId) continue;

    items.set(fileId, {
      kind: "link",
      fileId,
      description: String(item.description || "").trim(),
      processedByAI: normalizeProcessedByAi(item.processedByAI),
      currencyCode: String(item.currencyCode || "").trim(),
      totalAmount: normalizeNullableNumber(item.totalAmount),
      transDate: String(item.transDate || "").trim(),
      fileName: String(item.fileName || "").trim(),
      gastoType: normalizeTicketGastoType(item.gastoType),
    });
  }

  return Array.from(items.values());
};

const normalizeExcludedIds = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  const ids = new Set<string>();
  for (const entry of value) {
    const fileId = normalizeFileId(entry);
    if (!fileId) continue;
    ids.add(fileId);
  }

  return Array.from(ids);
};

const normalizeNonNegativeInteger = (value: unknown, fallback = 0): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
};

// Normalizes the link-mode ticket return state so back navigation can restore filters and selection safely.
export const normalizeExpenseTicketLinkReturnState = (value: unknown): ExpenseTicketLinkReturnState | null => {
  if (!value || typeof value !== "object") return null;

  const payload = value as Partial<ExpenseTicketLinkReturnState>;
  const sheetId = String(payload.sheetId || "").trim();
  if (!sheetId) return null;

  return {
    sheetId,
    targetLineRecId: normalizeFileId(payload.targetLineRecId),
    page: Math.max(1, normalizeNonNegativeInteger(payload.page, 1)),
    scrollY: normalizeNonNegativeInteger(payload.scrollY),
    focusFileId: normalizeFileId(payload.focusFileId),
    filters: normalizeExpenseTicketFilterSnapshot(payload.filters),
    selectionMode: normalizeSelectionMode(payload.selectionMode),
    selectedTickets: normalizeSelectedTickets(payload.selectedTickets),
    excludedIds: normalizeExcludedIds(payload.excludedIds),
    filteredSelectionFilters: payload.filteredSelectionFilters
      ? normalizeExpenseTicketFilterSnapshot(payload.filteredSelectionFilters)
      : null,
    filteredSelectionTotal: normalizeNonNegativeInteger(payload.filteredSelectionTotal),
  };
};

// Reads a stored link-mode return state when it matches the active sheet and optional target line.
export const readExpenseTicketLinkReturnState = (
  sheetId?: unknown,
  targetLineRecId?: unknown
): ExpenseTicketLinkReturnState | null => {
  const stored = normalizeExpenseTicketLinkReturnState(
    getSessionJsonWithExpiry<ExpenseTicketLinkReturnState>(getScopedKey())
  );
  if (!stored) return null;

  const safeSheetId = String(sheetId || "").trim();
  const safeTargetLineRecId = normalizeFileId(targetLineRecId);
  if (safeSheetId && stored.sheetId.toUpperCase() !== safeSheetId.toUpperCase()) return null;
  if (safeTargetLineRecId) {
    return stored.targetLineRecId.toUpperCase() === safeTargetLineRecId.toUpperCase() ? stored : null;
  }
  return stored.targetLineRecId ? null : stored;
};

// Persists the minimum link-mode state required to return from ticket detail without losing selection.
export const saveExpenseTicketLinkReturnState = (
  value: ExpenseTicketLinkReturnState | null | undefined
): ExpenseTicketLinkReturnState | null => {
  const normalized = normalizeExpenseTicketLinkReturnState(value);
  if (!normalized) {
    clearExpenseTicketLinkReturnState();
    return null;
  }

  setSessionJsonWithExpiry(getScopedKey(), normalized, EXPENSE_TICKET_LINK_RETURN_STATE_TTL_MS);
  return normalized;
};

// Clears any stored link-mode return state for the current expense scope.
export const clearExpenseTicketLinkReturnState = (): void => {
  removeSessionValueWithExpiry(getScopedKey());
};
