import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiFetchError } from "../../../../services/apiService.ts";
import { indT } from "../../../../utils/indI18n.ts";
import type { ExpenseSheetTicketUpdateRequest } from "../../expenseTypes.ts";
import {
  clearExpenseNavigationGuard,
  navigateToExpenseUrl,
  setExpenseNavigationGuard,
} from "../../utils/expenseNavigation.ts";
import { fetchExpenseSheetTicket } from "../../utils/expenseApi.ts";
import {
  normalizeExpenseTicketStoredTime,
  toExpenseTicketDateInput,
} from "../../utils/expenseTicketDateTime.ts";
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
  const [draftTransDate, setDraftTransDate] = useState("");
  const [draftTicketTime, setDraftTicketTime] = useState("");

  // Hydrates the ticket header fields shown while editing one ticket line.
  const hydrateDraftFromHeader = useCallback((nextHeader: ExpenseTicketDetailHeader | null) => {
    setDraftTransDate(toExpenseTicketDateInput(nextHeader?.ticketDate || nextHeader?.transDate));
    setDraftTicketTime(normalizeExpenseTicketStoredTime(nextHeader?.ticketTime));
  }, []);

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

  // Keeps the loaded header aligned when its partial update succeeds before the line mutation.
  const applyHeaderUpdate = useCallback((payload: ExpenseSheetTicketUpdateRequest) => {
    setHeader((currentHeader) => {
      if (!currentHeader) return currentHeader;

      return {
        ...currentHeader,
        transDate: safeText(payload.transDate) || currentHeader.transDate,
        ticketDate: safeText(payload.ticketDate) || currentHeader.ticketDate,
        ticketTime: safeText(payload.ticketTime) || currentHeader.ticketTime,
        exchRate: payload.exchRate ?? currentHeader.exchRate,
        amountMST: payload.amountMST ?? currentHeader.amountMST,
      };
    });
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

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
          signal: controller.signal,
        });
        if (isCancelled) return;

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
        hydrateDraftFromHeader(mappedHeader);
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
        if (isCancelled) return;
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
        setHeader(null);
        setLine(null);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadDetail();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [fileId, hasAccess, hydrateDraftFromHeader, isCreateMode, lineRecId, onForbidden]);

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
    hydrateDraftFromHeader(header);
    hydrateDraftFromLine(line);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditTicket, header, hydrateDraftFromHeader, hydrateDraftFromLine, isCreateMode, isLoading, line, onForbidden]);

  const handleCancelEdit = useCallback(() => {
    if (!isEditing) return;

    setIsEditing(false);
    setModalError("");
    hydrateDraftFromHeader(header);
    hydrateDraftFromLine(line);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [header, hydrateDraftFromHeader, hydrateDraftFromLine, isEditing, line]);

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
    draftTransDate,
    draftTicketTime,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftQty,
    setDraftPrice,
    setDraftTransDate,
    setDraftTicketTime,
    applyHeaderUpdate,
    handleEnableEdit,
    handleCancelEdit,
    navigateToTicketDetail,
  };
};
