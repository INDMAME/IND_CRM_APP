import { useCallback } from "react";
import type { RefObject } from "react";
import { navigateToExpenseUrl } from "../../utils/expenseNavigation.ts";
import {
  appendExpenseTicketReturnQuery,
  buildExpenseSheetDetailUrl,
  type ExpenseTicketReturnContext,
} from "../../utils/expenseTicketReturnContext.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";

type UseExpenseTicketDetailInteractionsArgs = {
  fileId: string;
  contextSheetId: string;
  isFromExpenseLine: boolean;
  isFromExpenseSheetCreate: boolean;
  isFromSheetLink: boolean;
  headerExpenseSheetId: string;
  isEditing: boolean;
  lineContainerRef: RefObject<HTMLDivElement | null>;
  openPreview: () => Promise<void>;
  ticketReturnContext?: ExpenseTicketReturnContext | null;
};

// Groups ticket detail navigation and line-card interactions behind stable callbacks.
export const useExpenseTicketDetailInteractions = ({
  fileId,
  contextSheetId,
  isFromExpenseLine,
  isFromExpenseSheetCreate,
  isFromSheetLink,
  headerExpenseSheetId,
  isEditing,
  lineContainerRef,
  openPreview,
  ticketReturnContext,
}: UseExpenseTicketDetailInteractionsArgs) => {
  const openLineDetail = useCallback(
    (rawLineRecId: string) => {
      if (isFromExpenseLine || isFromSheetLink) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId || !fileId) return;

      const query = new URLSearchParams({
        fileId,
        lineRecId,
      });
      if (isFromExpenseSheetCreate) {
        query.set("mode", "edit");
      }
      appendExpenseTicketReturnQuery(query, ticketReturnContext);

      navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
        askConfirmation: true,
        bypassGuardOnce: false,
      });
    },
    [fileId, isFromExpenseLine, isFromExpenseSheetCreate, isFromSheetLink, ticketReturnContext]
  );

  const resolveClickableCard = useCallback(
    (target: EventTarget | null) => {
      const node = target as HTMLElement | null;
      if (!node || typeof node.closest !== "function") return null;
      const card = node.closest<HTMLElement>(".timeline-card--clickable");
      if (!card) return null;
      if (!lineContainerRef.current?.contains(card)) return null;
      return card;
    },
    [lineContainerRef]
  );

  const openFile = useCallback(() => {
    void openPreview();
  }, [openPreview]);

  const handleOpenExpenseSheet = useCallback(() => {
    if (isFromSheetLink) return;
    const safeSheetId = safeText(ticketReturnContext?.sheetId || headerExpenseSheetId || contextSheetId);
    if (!safeSheetId) return;

    navigateToExpenseUrl(buildExpenseSheetDetailUrl(safeSheetId), {
      askConfirmation: isEditing,
    });
  }, [contextSheetId, headerExpenseSheetId, isEditing, isFromSheetLink, ticketReturnContext]);

  return {
    openLineDetail,
    resolveClickableCard,
    openFile,
    handleOpenExpenseSheet,
  };
};
