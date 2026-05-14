import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiFetchError } from "../../../../services/apiService.ts";
import { indT } from "../../../../utils/indI18n.ts";
import {
  clearExpenseNavigationGuard,
  navigateToExpenseUrl,
  setExpenseNavigationGuard,
} from "../../utils/expenseNavigation.ts";
import { fetchExpenseSheetTicket } from "../../utils/expenseApi.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine,
  type ExpenseTicketDetailHeader,
  type ExpenseTicketDetailLine,
} from "../detail/expenseTicketDetailTypes.ts";
import { formatExpenseInputNumber } from "../../utils/expenseNumberFormat.ts";

type UseExpenseTicketLineDetailStateArgs = {
  hasAccess: boolean;
  isCreateMode: boolean;
  canEditTicket: boolean;
  fileId: string;
  lineRecId: string;
  onForbidden: () => void;
};

// Owns state and behavior for ticket line detail page (read and edit).
export const useExpenseTicketLineDetailState = ({
  hasAccess,
  isCreateMode,
  canEditTicket,
  fileId,
  lineRecId,
  onForbidden,
}: UseExpenseTicketLineDetailStateArgs) => {
  const [header, setHeader] = useState<ExpenseTicketDetailHeader | null>(null);
  const [line, setLine] = useState<ExpenseTicketDetailLine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(() => isCreateMode);
  const [modalError, setModalError] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftQty, setDraftQty] = useState("");
  const [draftPrice, setDraftPrice] = useState("");

  const hydrateDraftFromLine = useCallback((nextLine: ExpenseTicketDetailLine | null) => {
    setDraftDescription(safeText(nextLine?.description));
    setDraftQty(
      formatExpenseInputNumber(nextLine?.qty, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: "",
      })
    );
    setDraftPrice(
      formatExpenseInputNumber(nextLine?.price, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: "",
      })
    );
  }, []);

  useEffect(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }

      if (!fileId || (!isCreateMode && !lineRecId)) {
        setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
        setHeader(null);
        setLine(null);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetchExpenseSheetTicket(fileId, {
          suppressPermissionModal: true,
        });

        if (response?.Success === false) {
          setErrorMessage(response?.Message || indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
          setHeader(null);
          setLine(null);
          return;
        }

        const items = Array.isArray(response?.Items) ? response.Items : [];
        const selectedTicket =
          items.find((entry) => safeText(entry?.FileId).toUpperCase() === fileId.toUpperCase()) || items[0] || null;

        if (!selectedTicket) {
          setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
          setHeader(null);
          setLine(null);
          return;
        }

        const mappedHeader = mapExpenseTicketDetailHeader(selectedTicket);
        const mappedLines = (Array.isArray(selectedTicket.Lines) ? selectedTicket.Lines : []).map((entry) =>
          mapExpenseTicketDetailLine(entry)
        );
        if (isCreateMode) {
          setHeader(mappedHeader);
          setLine(null);
          return;
        }

        const selectedLine =
          mappedLines.find((entry) => safeText(entry.recId).toUpperCase() === lineRecId.toUpperCase()) || null;

        if (!selectedLine) {
          setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
          setHeader(mappedHeader);
          setLine(null);
          return;
        }

        setHeader(mappedHeader);
        setLine(selectedLine);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
        setHeader(null);
        setLine(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDetail();
  }, [fileId, hasAccess, isCreateMode, lineRecId, onForbidden]);

  useEffect(() => {
    if (!line || isEditing) return;
    hydrateDraftFromLine(line);
  }, [hydrateDraftFromLine, isEditing, line]);

  useEffect(() => {
    if (!isCreateMode || isLoading || !header) return;
    setDraftDescription("");
    setDraftQty("");
    setDraftPrice("");
  }, [header, isCreateMode, isLoading]);

  const hasActiveProcess = useMemo(() => busy || isEditing, [busy, isEditing]);
  useEffect(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);

  const handleEnableEdit = useCallback(() => {
    if (isCreateMode || isLoading || !header || !line) {
      return;
    }

    if (!canEditTicket) {
      onForbidden();
      return;
    }

    setModalError("");
    setIsEditing(true);
    hydrateDraftFromLine(line);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditTicket, header, hydrateDraftFromLine, isCreateMode, isLoading, line, onForbidden]);

  const handleCancelEdit = useCallback(() => {
    if (!isEditing) return;

    setIsEditing(false);
    setModalError("");
    hydrateDraftFromLine(line);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [hydrateDraftFromLine, isEditing, line]);

  const navigateToTicketDetail = useCallback(() => {
    const safeFileId = safeText(fileId);
    if (!safeFileId) return;

    navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(safeFileId)}`);
  }, [fileId]);

  return {
    header,
    line,
    isLoading,
    errorMessage,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftQty,
    draftPrice,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftQty,
    setDraftPrice,
    handleEnableEdit,
    handleCancelEdit,
    navigateToTicketDetail,
  };
};
