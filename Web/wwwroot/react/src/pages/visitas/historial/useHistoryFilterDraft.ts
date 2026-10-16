import { useState } from "react";
import type { useHistoryFiltersState } from "./useHistoryFiltersState.ts";

type FilterState = ReturnType<typeof useHistoryFiltersState>;
type Snapshot = Pick<FilterState,
  "startDate" | "endDate" | "manualStartDate" | "manualEndDate" | "selectedClient" |
  "selectedOwnerAxUserId" | "activeQuickFilter" | "currentMonth" | "currentYear" | "selectingStep"
>;

// Captures both request criteria and the remembered custom range for cancellation.
const captureSnapshot = (filters: FilterState): Snapshot => ({
  startDate: filters.startDate,
  endDate: filters.endDate,
  manualStartDate: filters.manualStartDate,
  manualEndDate: filters.manualEndDate,
  selectedClient: filters.selectedClient,
  selectedOwnerAxUserId: filters.selectedOwnerAxUserId,
  activeQuickFilter: filters.activeQuickFilter,
  currentMonth: filters.currentMonth,
  currentYear: filters.currentYear,
  selectingStep: filters.selectingStep,
});

// Compares effective query criteria so presentation-only edits do not reload AX.
const queryKey = (snapshot: Snapshot, resolveOwner: (value: string) => string) => JSON.stringify([
  snapshot.startDate?.getTime() ?? null,
  snapshot.endDate?.getTime() ?? null,
  snapshot.selectedClient?.value || "",
  resolveOwner(snapshot.selectedOwnerAxUserId),
]);

// Makes filter editing reversible without clearing results, cache, or pagination.
export const useHistoryFilterDraft = (filters: FilterState, resolveOwner: (value: string) => string) => {
  const [original, setOriginal] = useState<Snapshot | null>(null);

  // Starts one editing session; repeated open events cannot replace its baseline.
  const openFilters = () => {
    if (filters.showFilters) return;
    setOriginal(captureSnapshot(filters));
    filters.setShowManualError(false);
    filters.setShowFilters(true);
  };

  // Ends editing without invoking data-loading or cache-reset callbacks.
  const finishFilters = () => {
    filters.setIsOpen(false);
    filters.setHoverDate(null);
    filters.setShowManualPickerPanel(false);
    filters.setShowManualError(false);
    filters.setShowFilters(false);
    setOriginal(null);
  };

  // Restores the complete pre-edit selection, including the client input display.
  const cancelFilters = () => {
    if (original) {
      filters.setStartDate(original.startDate);
      filters.setEndDate(original.endDate);
      filters.setManualStartDate(original.manualStartDate);
      filters.setManualEndDate(original.manualEndDate);
      filters.setSelectedClient(original.selectedClient);
      filters.setSelectedOwnerAxUserId(original.selectedOwnerAxUserId);
      filters.setActiveQuickFilter(original.activeQuickFilter);
      filters.setCurrentMonth(original.currentMonth);
      filters.setCurrentYear(original.currentYear);
      filters.setSelectingStep(original.selectingStep);
      filters.setClientResetKey((value) => value + 1);
    } else {
      filters.resetHistoryFilters();
    }
    finishFilters();
  };

  // Clears only the draft and keeps the dialog available for a new valid range.
  const clearFilters = () => {
    filters.resetHistoryFilters();
    filters.setIsOpen(false);
    filters.setShowFilters(true);
  };

  return {
    openFilters,
    cancelFilters,
    clearFilters,
    finishFilters,
    hasChanges: !original || queryKey(original, resolveOwner) !== queryKey(captureSnapshot(filters), resolveOwner),
  };
};
