import { useCallback } from "react";
import type { RefObject } from "react";
import { navigateToExpenseUrl } from "../../utils/expenseNavigation.ts";
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
        query.set("origin", "sheet-create");
        query.set("mode", "edit");
        if (contextSheetId) {
          query.set("sheetId", contextSheetId);
        }
      }

      navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
        askConfirmation: true,
        bypassGuardOnce: false,
      });
    },
    [contextSheetId, fileId, isFromExpenseLine, isFromExpenseSheetCreate, isFromSheetLink]
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
    const safeSheetId = safeText(headerExpenseSheetId);
    if (!safeSheetId) return;

    navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`, {
      askConfirmation: isEditing,
    });
  }, [headerExpenseSheetId, isEditing, isFromSheetLink]);

  return {
    openLineDetail,
    resolveClickableCard,
    openFile,
    handleOpenExpenseSheet,
  };
};
