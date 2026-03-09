import { useCallback } from "react";
import { normalizeExpenseTicketFilterSnapshot } from "./expenseTicketFilterSnapshot.ts";
import type { ExpenseTicketAppliedFilterSnapshot, ExpenseTicketCard } from "./expenseTicketListTypes.ts";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry,
} from "../../../utils/sessionExpiry.ts";
import { getExpenseScopeToken } from "../utils/expenseScope.ts";

const EXPENSE_TICKETS_FILTER_KEY_PREFIX = "expense_tickets_filter_v1";
const EXPENSE_TICKETS_RETURN_FLAG_KEY_PREFIX = "expense_tickets_return_v1";
const EXPENSE_TICKETS_CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const ALLOWED_TICKET_GASTO_TYPES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);

export type ExpenseTicketsCachedState = {
  filters: ExpenseTicketAppliedFilterSnapshot;
  page: number;
  scrollY: number;
  focusFileId: string;
  items: ExpenseTicketCard[];
  selectedTickets: ExpenseTicketCard[];
  total: number;
  linkModeSheetId: string;
};

const getScopeToken = (): string => {
  return getExpenseScopeToken();
};

const getScopedKeys = () => {
  const scope = getScopeToken();
  return {
    filterKey: `${EXPENSE_TICKETS_FILTER_KEY_PREFIX}_${scope}`,
    returnFlagKey: `${EXPENSE_TICKETS_RETURN_FLAG_KEY_PREFIX}_${scope}`,
  };
};

const toNullableNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeStatus = (value: unknown): 0 | 1 | null => {
  const parsed = Number(value);
  if (parsed === 0 || parsed === 1) return parsed;
  return null;
};

const normalizeProcessedByAi = (value: unknown): boolean | null => {
  if (value === true || value === false) return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return null;
};

const normalizeTicketGastoType = (value: unknown): ExpenseTicketCard["gastoType"] => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || !ALLOWED_TICKET_GASTO_TYPES.has(parsed)) {
    return null;
  }
  return parsed as ExpenseTicketCard["gastoType"];
};

const normalizeItems = (raw: unknown): ExpenseTicketCard[] => {
  if (!Array.isArray(raw)) return [];

  return raw.map((entry) => {
    const item = (entry || {}) as Partial<ExpenseTicketCard>;
    return {
      fileId: String(item.fileId || "").trim(),
      description: String(item.description || "").trim(),
      status: normalizeStatus(item.status),
      hojaGastosIdDisplay: String(item.hojaGastosIdDisplay || "").trim(),
      processedByAI: normalizeProcessedByAi(item.processedByAI),
      currencyCode: String(item.currencyCode || "").trim(),
      totalAmount: toNullableNumber(item.totalAmount),
      createdByUserId: String(item.createdByUserId || "").trim(),
      transDate: String(item.transDate || "").trim(),
      urlFile: String(item.urlFile || "").trim(),
      fileName: String(item.fileName || "").trim(),
      gastoType: normalizeTicketGastoType(item.gastoType),
    };
  });
};

const normalizeState = (raw: ExpenseTicketsCachedState | null): ExpenseTicketsCachedState | null => {
  if (!raw || typeof raw !== "object") return null;

  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  const scrollRaw = Number(raw.scrollY);
  const scrollY = Number.isFinite(scrollRaw) && scrollRaw >= 0 ? Math.floor(scrollRaw) : 0;
  const items = normalizeItems((raw as { items?: unknown }).items);
  const selectedTickets = normalizeItems((raw as { selectedTickets?: unknown }).selectedTickets);
  const totalRaw = Number((raw as { total?: unknown }).total);
  const total = Number.isFinite(totalRaw) && totalRaw >= 0 ? totalRaw : items.length;

  return {
    filters: normalizeExpenseTicketFilterSnapshot(raw.filters),
    page,
    scrollY,
    focusFileId: String(raw.focusFileId || "").trim(),
    items,
    selectedTickets,
    total,
    linkModeSheetId: String((raw as { linkModeSheetId?: unknown }).linkModeSheetId || "").trim(),
  };
};

const normalizeEntityId = (value: unknown): string => {
  return String(value || "").trim().toUpperCase();
};

// Centralizes cache persistence for returning from ticket detail to list.
export const useExpenseTicketsFilterCache = () => {
  const writeCachedState = useCallback((state: ExpenseTicketsCachedState): void => {
    const normalized = normalizeState(state);
    if (!normalized) return;

    const keys = getScopedKeys();
    setSessionJsonWithExpiry(keys.filterKey, normalized, EXPENSE_TICKETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(keys.returnFlagKey, "1", EXPENSE_TICKETS_CACHE_TTL_MS);
  }, []);

  const readCachedState = useCallback((): ExpenseTicketsCachedState | null => {
    const keys = getScopedKeys();
    const raw = getSessionJsonWithExpiry<ExpenseTicketsCachedState>(keys.filterKey);
    return normalizeState(raw);
  }, []);

  const consumeReturnFlag = useCallback((): boolean => {
    const keys = getScopedKeys();
    const raw = getSessionValueWithExpiry(keys.returnFlagKey);
    if (raw === "1") {
      removeSessionValueWithExpiry(keys.returnFlagKey);
      return true;
    }
    return false;
  }, []);

  const saveCachedState = useCallback((state: ExpenseTicketsCachedState): void => {
    writeCachedState(state);
  }, [writeCachedState]);

  const removeCachedTicket = useCallback(
    (fileId: string): void => {
      const normalizedFileId = normalizeEntityId(fileId);
      if (!normalizedFileId) return;

      const currentState = readCachedState();
      if (!currentState) return;

      const nextItems = currentState.items.filter((item) => normalizeEntityId(item.fileId) !== normalizedFileId);
      const removedCount = currentState.items.length - nextItems.length;
      const nextSelectedTickets = currentState.selectedTickets.filter(
        (item) => normalizeEntityId(item.fileId) !== normalizedFileId
      );
      if (removedCount < 1 || nextItems.length < 1) {
        writeCachedState({
          ...currentState,
          focusFileId: "",
          items: [],
          selectedTickets: nextSelectedTickets,
          total: 0,
        });
        return;
      }

      writeCachedState({
        ...currentState,
        focusFileId: normalizeEntityId(currentState.focusFileId) === normalizedFileId ? "" : currentState.focusFileId,
        items: nextItems,
        selectedTickets: nextSelectedTickets,
        total: Math.max(nextItems.length, currentState.total - removedCount),
      });
    },
    [readCachedState, writeCachedState]
  );

  const clearCachedState = useCallback(() => {
    const keys = getScopedKeys();
    removeSessionValueWithExpiry(keys.filterKey);
    removeSessionValueWithExpiry(keys.returnFlagKey);
  }, []);

  return {
    readCachedState,
    consumeReturnFlag,
    saveCachedState,
    removeCachedTicket,
    clearCachedState,
  };
};
