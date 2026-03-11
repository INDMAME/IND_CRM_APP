import { useCallback, useMemo, useState } from "react";
import type {
  ExpenseTicketAppliedFilterSnapshot,
  ExpenseTicketLinkCard,
  ExpenseTicketLinkSelectionMode,
} from "./expenseTicketListTypes.ts";

export type ExpenseTicketLinkSelectionState = {
  selectionMode: ExpenseTicketLinkSelectionMode;
  selectedTickets: ExpenseTicketLinkCard[];
  excludedIds: string[];
  filteredSnapshot: ExpenseTicketAppliedFilterSnapshot | null;
  filteredTotalCount: number;
};

const normalizeFileId = (value: unknown): string => String(value || "").trim();

const normalizeSelectionMode = (value: unknown): ExpenseTicketLinkSelectionMode => {
  return value === "filtered" ? "filtered" : "selected";
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

const toSelectedMap = (items: ExpenseTicketLinkCard[]): Record<string, ExpenseTicketLinkCard> => {
  const next: Record<string, ExpenseTicketLinkCard> = {};
  for (const item of items) {
    const fileId = normalizeFileId(item.fileId);
    if (!fileId) continue;
    next[fileId] = item;
  }
  return next;
};

// Keeps link-mode ticket selection stable across paging, filtered select-all, and detail returns.
export const useExpenseTicketLinkSelection = () => {
  const [selectionMode, setSelectionMode] = useState<ExpenseTicketLinkSelectionMode>("selected");
  const [selectedTicketsById, setSelectedTicketsById] = useState<Record<string, ExpenseTicketLinkCard>>({});
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [filteredSnapshot, setFilteredSnapshot] = useState<ExpenseTicketAppliedFilterSnapshot | null>(null);
  const [filteredTotalCount, setFilteredTotalCount] = useState(0);

  const selectedTickets = useMemo(() => Object.values(selectedTicketsById), [selectedTicketsById]);
  const excludedIdSet = useMemo(() => new Set(excludedIds), [excludedIds]);
  const isFilteredSelectionActive = selectionMode === "filtered" && !!filteredSnapshot;

  const clearSelection = useCallback(() => {
    setSelectionMode("selected");
    setSelectedTicketsById({});
    setExcludedIds([]);
    setFilteredSnapshot(null);
    setFilteredTotalCount(0);
  }, []);

  const restoreSelection = useCallback((state: ExpenseTicketLinkSelectionState | null | undefined) => {
    if (!state) {
      clearSelection();
      return;
    }

    const normalizedMode = normalizeSelectionMode(state.selectionMode);
    const normalizedSelectedTickets = Array.isArray(state.selectedTickets) ? state.selectedTickets : [];
    const normalizedSnapshot = state.filteredSnapshot || null;
    const normalizedExcludedIds = normalizeExcludedIds(state.excludedIds);
    const normalizedFilteredTotal = Number.isFinite(Number(state.filteredTotalCount))
      ? Math.max(0, Math.floor(Number(state.filteredTotalCount)))
      : 0;

    setSelectionMode(normalizedMode === "filtered" && normalizedSnapshot ? "filtered" : "selected");
    setSelectedTicketsById(toSelectedMap(normalizedSelectedTickets));
    setExcludedIds(normalizedMode === "filtered" ? normalizedExcludedIds : []);
    setFilteredSnapshot(normalizedMode === "filtered" ? normalizedSnapshot : null);
    setFilteredTotalCount(normalizedMode === "filtered" ? normalizedFilteredTotal : 0);
  }, [clearSelection]);

  const selectAllByFilters = useCallback((snapshot: ExpenseTicketAppliedFilterSnapshot, totalCount: number) => {
    setSelectionMode("filtered");
    setSelectedTicketsById({});
    setExcludedIds([]);
    setFilteredSnapshot(snapshot);
    setFilteredTotalCount(Number.isFinite(totalCount) ? Math.max(0, Math.floor(totalCount)) : 0);
  }, []);

  const isSelected = useCallback(
    (fileId: string) => {
      const safeFileId = normalizeFileId(fileId);
      if (!safeFileId) return false;

      if (isFilteredSelectionActive) {
        return !excludedIdSet.has(safeFileId);
      }

      return !!selectedTicketsById[safeFileId];
    },
    [excludedIdSet, isFilteredSelectionActive, selectedTicketsById]
  );

  const toggleTicket = useCallback(
    (ticket: ExpenseTicketLinkCard) => {
      const fileId = normalizeFileId(ticket.fileId);
      if (!fileId) return;

      if (isFilteredSelectionActive) {
        setExcludedIds((previous) => {
          const next = new Set(previous);
          if (next.has(fileId)) {
            next.delete(fileId);
          } else {
            next.add(fileId);
          }
          return Array.from(next);
        });
        return;
      }

      setSelectedTicketsById((previous) => {
        const next = { ...previous };
        if (next[fileId]) {
          delete next[fileId];
          return next;
        }
        next[fileId] = ticket;
        return next;
      });
    },
    [isFilteredSelectionActive]
  );

  const hydrateVisibleTickets = useCallback((items: ExpenseTicketLinkCard[]) => {
    if (selectionMode !== "selected" || items.length < 1) return;

    setSelectedTicketsById((previous) => {
      let changed = false;
      const next = { ...previous };
      for (const item of items) {
        const fileId = normalizeFileId(item.fileId);
        if (!fileId || !next[fileId]) continue;
        next[fileId] = item;
        changed = true;
      }
      return changed ? next : previous;
    });
  }, [selectionMode]);

  const resolveSelectedCount = useCallback(
    (fallbackTotalCount = 0): number => {
      if (!isFilteredSelectionActive) {
        return selectedTickets.length;
      }

      const baseCount = filteredTotalCount > 0 ? filteredTotalCount : Math.max(0, Math.floor(fallbackTotalCount));
      return Math.max(0, baseCount - excludedIds.length);
    },
    [excludedIds.length, filteredTotalCount, isFilteredSelectionActive, selectedTickets.length]
  );

  return {
    selectionMode,
    selectedTickets,
    excludedIds,
    filteredSnapshot,
    filteredTotalCount,
    isFilteredSelectionActive,
    isSelected,
    toggleTicket,
    clearSelection,
    restoreSelection,
    selectAllByFilters,
    hydrateVisibleTickets,
    resolveSelectedCount,
  };
};
