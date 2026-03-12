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
  resetList: (source?: string) => void;
  loadList: (page: number, snapshot: ExpenseTicketAppliedFilterSnapshot) => Promise<void>;
};

const EXPENSE_TICKETS_AUTO_LOAD_LOG_PREFIX = "[expense-tickets:auto-load]";

const logExpenseTicketsAutoLoadInfo = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(EXPENSE_TICKETS_AUTO_LOAD_LOG_PREFIX, ...args);
  }
};

const logExpenseTicketsAutoLoadWarn = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(EXPENSE_TICKETS_AUTO_LOAD_LOG_PREFIX, ...args);
  }
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
      logExpenseTicketsAutoLoadInfo("runAutomaticListLoad:schedule", {
        page,
        snapshot,
        options,
      });
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
        logExpenseTicketsAutoLoadWarn("pendingAutomaticLoad:disable-link-wait", {
          page: pendingAutomaticLoad.page,
        });
        dispatch({ type: "disable_link_wait" });
        return;
      }

      if (!canProcessLinkMode || linkSheetCheckBusy) {
        logExpenseTicketsAutoLoadInfo("pendingAutomaticLoad:waiting-link-mode-ready", {
          page: pendingAutomaticLoad.page,
          canProcessLinkMode,
          linkSheetCheckBusy,
        });
        return;
      }

      if (linkSheetLocked) {
        logExpenseTicketsAutoLoadWarn("pendingAutomaticLoad:clear-link-locked", {
          page: pendingAutomaticLoad.page,
        });
        dispatch({ type: "clear" });
        return;
      }
    }

    const { page, snapshot, clearCache, resetBeforeLoad } = pendingAutomaticLoad;
    dispatch({ type: "clear" });
    logExpenseTicketsAutoLoadInfo("pendingAutomaticLoad:execute", {
      page,
      snapshot,
      clearCache,
      resetBeforeLoad,
    });

    if (clearCache) {
      clearListCache();
    }

    if (resetBeforeLoad) {
      resetList("automatic-load:reset-before-load");
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
