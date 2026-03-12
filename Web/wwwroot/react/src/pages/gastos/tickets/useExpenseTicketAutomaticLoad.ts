import { useCallback, useEffect, useReducer } from "react";
import type { ExpenseTicketAppliedFilterSnapshot } from "./expenseTicketListTypes.ts";

type ExpenseTicketAutomaticLoadRequest = {
  page: number;
  snapshot: ExpenseTicketAppliedFilterSnapshot;
  clearCache: boolean;
  resetBeforeLoad: boolean;
  waitForLinkModeSheetReady: boolean;
};

type AutomaticLoadAction =
  | {
      type: "schedule";
      request: ExpenseTicketAutomaticLoadRequest;
    }
  | {
      type: "clear";
    }
  | {
      type: "disable_link_wait";
    };

const automaticLoadReducer = (
  state: ExpenseTicketAutomaticLoadRequest | null,
  action: AutomaticLoadAction
): ExpenseTicketAutomaticLoadRequest | null => {
  switch (action.type) {
    case "schedule":
      return action.request;
    case "clear":
      return null;
    case "disable_link_wait":
      return state ? { ...state, waitForLinkModeSheetReady: false } : null;
    default:
      return state;
  }
};

type UseExpenseTicketAutomaticLoadArgs = {
  isLinkMode: boolean;
  canProcessLinkMode: boolean;
  linkSheetCheckBusy: boolean;
  linkSheetLocked: boolean;
  clearListCache: () => void;
  resetList: () => void;
  loadList: (page: number, snapshot: ExpenseTicketAppliedFilterSnapshot) => Promise<void>;
};

// Queues one ticket list reload and releases it only when link-mode preconditions are ready.
export const useExpenseTicketAutomaticLoad = ({
  isLinkMode,
  canProcessLinkMode,
  linkSheetCheckBusy,
  linkSheetLocked,
  clearListCache,
  resetList,
  loadList,
}: UseExpenseTicketAutomaticLoadArgs) => {
  const [pendingAutomaticLoad, dispatch] = useReducer(automaticLoadReducer, null);

  const runAutomaticListLoad = useCallback(
    (
      page: number,
      snapshot: ExpenseTicketAppliedFilterSnapshot,
      options: {
        clearCache?: boolean;
        resetBeforeLoad?: boolean;
        waitForLinkModeSheetReady?: boolean;
      } = {}
    ) => {
      dispatch({
        type: "schedule",
        request: {
          page,
          snapshot,
          clearCache: options.clearCache === true,
          resetBeforeLoad: options.resetBeforeLoad === true,
          waitForLinkModeSheetReady: options.waitForLinkModeSheetReady === true,
        },
      });
    },
    []
  );

  useEffect(() => {
    if (!pendingAutomaticLoad) return;

    if (pendingAutomaticLoad.waitForLinkModeSheetReady) {
      if (!isLinkMode) {
        dispatch({ type: "disable_link_wait" });
        return;
      }

      if (!canProcessLinkMode || linkSheetCheckBusy) {
        return;
      }

      if (linkSheetLocked) {
        dispatch({ type: "clear" });
        return;
      }
    }

    const { page, snapshot, clearCache, resetBeforeLoad } = pendingAutomaticLoad;
    dispatch({ type: "clear" });

    if (clearCache) {
      clearListCache();
    }

    if (resetBeforeLoad) {
      resetList();
    }

    void loadList(page, snapshot);
  }, [
    canProcessLinkMode,
    clearListCache,
    isLinkMode,
    linkSheetCheckBusy,
    linkSheetLocked,
    loadList,
    pendingAutomaticLoad,
    resetList,
  ]);

  return {
    runAutomaticListLoad,
  };
};
