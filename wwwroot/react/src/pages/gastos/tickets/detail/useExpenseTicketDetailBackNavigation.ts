import { useCallback, useEffect, useMemo } from "react";
import type { ExpenseTicketsCachedState } from "../useExpenseTicketsFilterCache.ts";
import {
  buildExpenseSheetDetailUrl,
  buildExpenseSheetLineDetailUrl,
  buildExpenseTicketLinkUrl,
  type ExpenseTicketReturnContext,
} from "../../utils/expenseTicketReturnContext.ts";
import { toExpenseIsoDate } from "../../utils/expenseApiDateUtils.ts";

type UseExpenseTicketDetailBackNavigationArgs = {
  fileId: string;
  detailOrigin: string;
  headerTransDate: unknown;
  contextLineRecId?: string;
  ticketReturnContext?: ExpenseTicketReturnContext | null;
  readCachedState: () => ExpenseTicketsCachedState | null;
  saveCachedState: (state: ExpenseTicketsCachedState) => void;
};

// Keeps native back navigation aligned with the ticket entry point and preserves cached link-mode state.
export const useExpenseTicketDetailBackNavigation = ({
  fileId,
  detailOrigin,
  headerTransDate,
  contextLineRecId,
  ticketReturnContext,
  readCachedState,
  saveCachedState,
}: UseExpenseTicketDetailBackNavigationArgs) => {
  const shouldReturnToTicketList = ticketReturnContext?.origin === "sheet-link" || !ticketReturnContext?.sheetId;

  const nativeBackUrl = useMemo(() => {
    if (ticketReturnContext?.origin === "sheet-link" && ticketReturnContext.sheetId) {
      return buildExpenseTicketLinkUrl(ticketReturnContext.sheetId);
    }

    if (ticketReturnContext?.origin === "expense-line" && ticketReturnContext.sheetId) {
      return buildExpenseSheetLineDetailUrl(ticketReturnContext.sheetId, ticketReturnContext.sheetLineRecId || contextLineRecId);
    }

    if (ticketReturnContext?.sheetId) {
      return buildExpenseSheetDetailUrl(ticketReturnContext.sheetId);
    }

    if (detailOrigin === "ticket-create") {
      const ticketDate = toExpenseIsoDate(headerTransDate) || toExpenseIsoDate(new Date());
      const query = new URLSearchParams({
        ticketFileId: fileId,
        ticketDate,
      });

      return `/Gastos/Tickets?${query.toString()}`;
    }

    return "/Gastos/Tickets";
  }, [contextLineRecId, detailOrigin, fileId, headerTransDate, ticketReturnContext]);

  const rearmExpenseTicketsReturnState = useCallback(() => {
    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [readCachedState, saveCachedState]);

  useEffect(() => {
    if (!fileId) return;

    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;

    backButton.setAttribute("data-back-url", nativeBackUrl);
    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, [fileId, nativeBackUrl]);

  useEffect(() => {
    if (!fileId) return;

    const handleNativeBack = (event: PopStateEvent) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }

      const executeBackNavigation = () => {
        if (shouldReturnToTicketList) {
          rearmExpenseTicketsReturnState();
        }
        window.__indBypassNavigationGuardOnce?.();
        window.location.replace(nativeBackUrl);
      };

      if (typeof window.__indRequestNavigation === "function") {
        window.__indRequestNavigation(executeBackNavigation);
        return;
      }

      executeBackNavigation();
    };

    window.addEventListener("popstate", handleNativeBack);
    return () => {
      window.removeEventListener("popstate", handleNativeBack);
    };
  }, [fileId, nativeBackUrl, rearmExpenseTicketsReturnState, shouldReturnToTicketList]);
};
