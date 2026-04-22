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
  busy: boolean;
  fileId: string;
  contextSheetId: string;
  isFromSheetLink: boolean;
  headerExpenseSheetId: string;
  isEditing: boolean;
  canOpenSaveConfirm: () => boolean;
  handlePersistHeaderDraft: () => Promise<boolean>;
  bypassWorkflowGuard: boolean;
  lineContainerRef: RefObject<HTMLDivElement | null>;
  openPreview: () => Promise<void>;
  ticketReturnContext?: ExpenseTicketReturnContext | null;
};

// Groups ticket detail navigation and line-card interactions behind stable callbacks.
export const useExpenseTicketDetailInteractions = ({
  busy,
  fileId,
  contextSheetId,
  isFromSheetLink,
  headerExpenseSheetId,
  isEditing,
  canOpenSaveConfirm,
  handlePersistHeaderDraft,
  bypassWorkflowGuard,
  lineContainerRef,
  openPreview,
  ticketReturnContext,
}: UseExpenseTicketDetailInteractionsArgs) => {
  const openLineDetail = useCallback(
    async (rawLineRecId: string) => {
      if (isFromSheetLink) return;
      if (busy) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId || !fileId) return;

      const shouldOpenInEditMode = isEditing;
      if (shouldOpenInEditMode) {
        if (!canOpenSaveConfirm()) {
          return;
        }

        const updateOk = await handlePersistHeaderDraft();
        if (!updateOk) {
          return;
        }
      }

      const query = new URLSearchParams({
        fileId,
        lineRecId,
      });
      if (shouldOpenInEditMode) {
        query.set("mode", "edit");
      }
      appendExpenseTicketReturnQuery(query, ticketReturnContext);

      navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
        askConfirmation: false,
        bypassGuardOnce: shouldOpenInEditMode || bypassWorkflowGuard,
      });
    },
    [
      busy,
      bypassWorkflowGuard,
      canOpenSaveConfirm,
      fileId,
      handlePersistHeaderDraft,
      isEditing,
      isFromSheetLink,
      ticketReturnContext,
    ]
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
