import { useCallback, type Dispatch, type MouseEvent as ReactMouseEvent, type SetStateAction } from "react";
import type { LoadOverride } from "./useHistoryFiltersState.ts";

type ApplyOptions = {
  closePanel?: boolean;
  force?: boolean;
  page?: number;
};

type StringRef = {
  current: string;
};

type Args = {
  startDate: Date | null;
  endDate: Date | null;
  fromDateValue: string;
  toDateValue: string;
  accountNumValue: string;
  ownerAxUserIdValue: string;
  lastSignatureRef: StringRef;
  validateManualRange: () => boolean;
  normalizeRange: (from: string, to: string) => { from: string; to: string };
  loadActivities: (page: number, override?: LoadOverride) => void;
  handleClearState: (event: ReactMouseEvent) => void;
  clearFilterCache: () => void;
  resetActivities: () => void;
  resetHistoryFilters: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setShowManualError: Dispatch<SetStateAction<boolean>>;
};

// Keeps filter apply/reset behavior together and out of the page render container.
export const useHistoryFilterActions = ({
  startDate,
  endDate,
  fromDateValue,
  toDateValue,
  accountNumValue,
  ownerAxUserIdValue,
  lastSignatureRef,
  validateManualRange,
  normalizeRange,
  loadActivities,
  handleClearState,
  clearFilterCache,
  resetActivities,
  resetHistoryFilters,
  setIsOpen,
  setShowFilters,
  setShowManualError,
}: Args) => {
  const applyFilters = useCallback(
    (options?: ApplyOptions) => {
      if (!validateManualRange()) return;
      if (!startDate || !endDate) return;

      const normalized = normalizeRange(fromDateValue, toDateValue);
      const page = options?.page ?? 1;
      const signature = `${normalized.from}|${normalized.to}|${accountNumValue}|${ownerAxUserIdValue}|${page}`;

      if (options?.force || lastSignatureRef.current !== signature) {
        loadActivities(page, {
          fromDate: normalized.from,
          toDate: normalized.to,
          accountNum: accountNumValue,
          ownerAxUserId: ownerAxUserIdValue,
        });
      }

      setShowManualError(false);
      if (options?.closePanel) {
        setIsOpen(false);
        setShowFilters(false);
      }
    },
    [
      accountNumValue,
      endDate,
      fromDateValue,
      lastSignatureRef,
      loadActivities,
      ownerAxUserIdValue,
      setIsOpen,
      setShowFilters,
      setShowManualError,
      startDate,
      toDateValue,
      validateManualRange,
      normalizeRange,
    ]
  );

  const handleClear = useCallback(
    (event: ReactMouseEvent) => {
      handleClearState(event);
      clearFilterCache();
      resetActivities();
    },
    [clearFilterCache, handleClearState, resetActivities]
  );

  const handleResetFilters = useCallback(() => {
    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setIsOpen(false);
    setShowFilters(true);
  }, [clearFilterCache, resetActivities, resetHistoryFilters, setIsOpen, setShowFilters]);

  return {
    applyFilters,
    handleClear,
    handleResetFilters,
  };
};
