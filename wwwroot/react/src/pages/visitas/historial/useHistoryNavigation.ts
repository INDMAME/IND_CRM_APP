import { useCallback } from "react";
import type { ClientOption } from "../../../components/visitas/ClientSearchCombobox.tsx";
import type { HistoryCachedFilter } from "../../../hooks/useHistoryFilterCache.ts";

type Args = {
  canViewHistory: boolean;
  currentPage: number;
  fromDateValue: string;
  toDateValue: string;
  selectedClient: ClientOption | null;
  ownerAxUserId: string;
  ownerText: string;
  navDelayMs: number;
  saveCachedFilter: (filter: HistoryCachedFilter) => void;
  onForbidden: () => void;
};

// Creates the detail navigation handler and persists the current history filter.
export const useHistoryNavigation = ({
  canViewHistory,
  currentPage,
  fromDateValue,
  toDateValue,
  selectedClient,
  ownerAxUserId,
  ownerText,
  navDelayMs,
  saveCachedFilter,
  onForbidden,
}: Args) => {
  return useCallback(
    (linkId: string) => {
      if (!canViewHistory) {
        onForbidden();
        return;
      }
      setTimeout(() => {
        saveCachedFilter({
          fromDate: fromDateValue || "",
          toDate: toDateValue || "",
          page: currentPage,
          clientAccount: selectedClient?.value || "",
          clientText: selectedClient?.text || "",
          ownerAxUserId,
          ownerText,
        });
        const target = encodeURIComponent(linkId);
        window.location.href = `/Visitas/Detalle/${target}`;
      }, navDelayMs);
    },
    [
      canViewHistory,
      currentPage,
      fromDateValue,
      navDelayMs,
      onForbidden,
      ownerAxUserId,
      ownerText,
      saveCachedFilter,
      selectedClient,
      toDateValue,
    ]
  );
};
