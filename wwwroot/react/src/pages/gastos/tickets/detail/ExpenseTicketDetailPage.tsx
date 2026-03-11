import React, { useCallback, useEffect, useMemo, useRef } from "react";
import VisitasPageProviders from "../../../../components/commons/VisitasPageProviders.tsx";
import { useAuthContext } from "../../../../context/AuthContext.tsx";
import { useTimelineCardEffects } from "../../../../hooks/useTimelineCardEffects.ts";
import { canAccess, showPermissionModal } from "../../../../utils/permissions.ts";
import { indT } from "../../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../../utils/reactIsland.tsx";
import { configureExpenseApiAuth } from "../../utils/expenseApi.ts";
import { toExpenseIsoDate } from "../../utils/expenseApiDateUtils.ts";
import { navigateToExpenseUrl } from "../../utils/expenseNavigation.ts";
import { isManagingOtherExpenseUser } from "../../utils/expenseManagedUserScope.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../../utils/expenseSelectOptions.ts";
import { buildExpenseSheetDetailUrl } from "../../utils/expenseTicketReturnContext.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
import { useExpenseTicketDetailState } from "./useExpenseTicketDetailState.ts";
import { useExpenseTicketDetailMutations } from "./useExpenseTicketDetailMutations.ts";
import { useExpenseTicketDetailTopbarActions } from "./useExpenseTicketDetailTopbarActions.ts";
import { useExpenseTicketImagePreview } from "./useExpenseTicketImagePreview.ts";
import { useExpenseTicketDetailEditor } from "./useExpenseTicketDetailEditor.ts";
import { useExpenseTicketDetailRouteContext } from "./useExpenseTicketDetailRouteContext.ts";
import { useExpenseTicketDetailDisplay } from "./useExpenseTicketDetailDisplay.ts";
import { useExpenseTicketDetailConfirmState } from "./useExpenseTicketDetailConfirmState.ts";
import { useExpenseTicketDetailInteractions } from "./useExpenseTicketDetailInteractions.ts";
import ExpenseTicketDetailView from "./ExpenseTicketDetailView.tsx";
import { useExpenseTicketsFilterCache } from "../useExpenseTicketsFilterCache.ts";

const ALLOWED_GASTO_TYPES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
const LINES_PAGE_SIZE = 6;
const GASTO_TYPE_LABEL_KEYS: Record<number, { key: string; fallback: string }> = {
  0: { key: "Enum_None", fallback: "None" },
  1: { key: "Enum_GastoType_Peaje", fallback: "Peaje" },
  2: { key: "Enum_GastoType_Parking", fallback: "Parking" },
  3: { key: "Enum_GastoType_Km", fallback: "Km" },
  4: { key: "Enum_GastoType_Desayuno", fallback: "Desayuno" },
  5: { key: "Enum_GastoType_Comida", fallback: "Comida" },
  6: { key: "Enum_GastoType_Cena", fallback: "Cena" },
  7: { key: "Enum_GastoType_Hotel", fallback: "Hotel" },
  8: { key: "Enum_GastoType_Varios", fallback: "Varios" },
  14: { key: "Enum_GastoType_Taxi", fallback: "Taxi" },
};

const pagedSlice = <T,>(items: T[], page: number, pageSize: number): T[] => {
  if (!items.length) return [];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

// Initializes auth seed for expense API calls before island effects run.
const bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__),
  });
};

const buildFallbackGastoTypeOptions = (): ExpenseSelectOption[] => {
  return Object.entries(GASTO_TYPE_LABEL_KEYS)
    .map(([code, cfg]) => ({
      value: String(code),
      text: indT(cfg.key, cfg.fallback),
    }))
    .sort((left, right) => Number(left.value) - Number(right.value));
};

const ExpenseTicketDetailPageContent = () => {
  const { canManageOtherUsers, currentAxUserId, selectedManagedUserId, managementBootstrapReady } = useAuthContext();
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicketByModule = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicketByModule = canAccess("GASTOS_TICKETS", "FullAccess");
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    autoEditMode,
    detailOrigin,
    contextSheetId,
    contextLineRecId,
    isFromExpenseSheetCreate,
    isFromExpenseLine,
    isFromSheetLink,
    ticketReturnContext,
  } = useExpenseTicketDetailRouteContext();
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId,
  });
  const canEditTicket = canEditTicketByModule && !isManagingOtherUser;
  const canDeleteTicket = canDeleteTicketByModule && !isManagingOtherUser;
  const allowAssignedDraftEdit = isFromExpenseSheetCreate;
  const autoEditAttemptedRef = useRef(false);

  const gastoTypeOptions = useMemo<ExpenseSelectOption[]>(() => {
    const source = Array.isArray(window.__EXPENSE_GASTO_TYPES__) ? window.__EXPENSE_GASTO_TYPES__ : [];
    const mapped = mapWindowEnumOptions(source).filter((entry) => {
      const parsed = Number(entry.value);
      return Number.isInteger(parsed) && ALLOWED_GASTO_TYPES.has(parsed);
    });

    if (mapped.length > 0) {
      return mapped.sort((left, right) => Number(left.value) - Number(right.value));
    }

    return buildFallbackGastoTypeOptions();
  }, []);

  const gastoTypeLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of gastoTypeOptions) {
      map.set(String(option.value), option.text);
    }
    return map;
  }, [gastoTypeOptions]);

  const { header, lines, isLoading, errorMessage, reloadDetail } = useExpenseTicketDetailState({
    hasAccess,
    fileId,
    onForbidden: showPermissionModal,
  });
  const { readCachedState, saveCachedState, invalidateCachedListForRefetch } = useExpenseTicketsFilterCache();
  const nativeBackUrl = useMemo(() => {
    if (ticketReturnContext?.sheetId) {
      return buildExpenseSheetDetailUrl(ticketReturnContext.sheetId);
    }

    if (detailOrigin === "ticket-create") {
      const ticketDate = toExpenseIsoDate(header?.transDate) || toExpenseIsoDate(new Date());
      const query = new URLSearchParams({
        ticketFileId: fileId,
        ticketDate,
      });

      return `/Gastos/Tickets?${query.toString()}`;
    }

    return "/Gastos/Tickets";
  }, [detailOrigin, fileId, header?.transDate, ticketReturnContext]);

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

    const handleNativeBack = (event) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }

      const executeBackNavigation = () => {
        if (!ticketReturnContext?.sheetId) {
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
  }, [fileId, nativeBackUrl, rearmExpenseTicketsReturnState, ticketReturnContext?.sheetId]);

  const {
    busy,
    status,
    isEditing,
    modalError,
    linePage,
    draftDescription,
    draftGastoType,
    draftCurrencyCode,
    draftTransDate,
    draftComentario,
    draftUrlFile,
    draftFileName,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setLinePage,
    setDraftDescription,
    setDraftGastoType,
    setDraftCurrencyCode,
    setDraftTransDate,
    handleEnableEdit,
    handleCancelEdit,
  } = useExpenseTicketDetailEditor({
    header,
    lineCount: lines.length,
    pageSize: LINES_PAGE_SIZE,
    canEditTicket,
    isLoading,
    allowAssignedDraftEdit,
    isFromSheetLink,
    onForbidden: showPermissionModal,
  });

  const previewSourceUrl = useMemo(() => safeText(isEditing ? draftUrlFile : header?.urlFile), [draftUrlFile, header?.urlFile, isEditing]);
  const { paginationLabels, previewAltText, statusLabel, gastoTypeLabel, totalAmountText, transDateText } =
    useExpenseTicketDetailDisplay({
      header,
      draftGastoType,
      draftCurrencyCode,
      draftTransDate,
      draftFileName,
      isEditing,
      gastoTypeLabelMap,
    });
  const {
    previewOpen,
    previewBusy,
    previewError,
    previewImageUrl,
    previewScale,
    previewTranslate,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd,
    handlePreviewWheel,
  } = useExpenseTicketImagePreview({
    fileId,
    sourceUrl: previewSourceUrl,
  });

  const visibleLines = useMemo(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);

  useEffect(() => {
    if (!autoEditMode || isFromExpenseLine || isFromSheetLink || autoEditAttemptedRef.current) return;
    if (isLoading || !header) return;
    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, handleEnableEdit, header, isFromExpenseLine, isFromSheetLink, isLoading]);

  const { handleUpdate, handleDelete } = useExpenseTicketDetailMutations({
    busy,
    isEditing,
    canEditTicket,
    canDeleteTicket,
    fileId,
    draftDescription,
    draftGastoType,
    draftCurrencyCode,
    draftTransDate,
    draftComentario,
    draftUrlFile,
    draftFileName,
    deleteLinkedExpenseLineContext: isFromExpenseLine
      ? {
          sheetId: contextSheetId,
          lineRecId: contextLineRecId,
        }
      : null,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
  });

  const { modal, openConfirm, closeConfirm, modalLoadingText, modalCancelText, modalConfirmText, handleModalButtonConfirm } =
    useExpenseTicketDetailConfirmState({
      busy,
      modalError,
      setModalError,
      setStatus,
    });

  const isAssignedTicket = header?.status === 1;
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit;
  const canEditTicketInContext = canEditTicket && !isFromExpenseLine && !isFromSheetLink;
  const canDeleteTicketInContext = canDeleteTicket && !isFromExpenseLine && !isFromSheetLink;
  const ticketTopbarActionMode: "default" | "view_only" =
    isManagingOtherUser || isFromExpenseLine || isFromSheetLink ? "view_only" : "default";

  useExpenseTicketDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isLocked: isContextLocked,
    actionMode: ticketTopbarActionMode,
    permissionsReady: managementBootstrapReady,
    canEditTicket: canEditTicketInContext,
    canDeleteTicket: canDeleteTicketInContext,
    fileId,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      void reloadDetail();
    },
    onDeleteSuccess: () => {
      invalidateCachedListForRefetch();
      if (ticketReturnContext?.sheetId) {
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(ticketReturnContext.sheetId));
        return;
      }
      navigateToExpenseUrl("/Gastos/Tickets");
    },
    openConfirm,
    closeConfirm,
  });

  const { openLineDetail, resolveClickableCard, openFile, handleOpenExpenseSheet } = useExpenseTicketDetailInteractions({
    fileId,
    contextSheetId,
    isFromExpenseLine,
    isFromExpenseSheetCreate,
    isFromSheetLink,
    headerExpenseSheetId: safeText(header?.hojaGastosIdDisplay),
    isEditing,
    lineContainerRef,
    openPreview,
    ticketReturnContext,
  });

  useTimelineCardEffects({
    containerRef: lineContainerRef,
    errorMessage,
    items: visibleLines,
    resolveClickableCard,
  });

  return (
    <ExpenseTicketDetailView
      modal={{
        open: modal.open,
        title: modal.title,
        message: modal.message,
        confirmText: modalConfirmText,
        cancelText: modalCancelText,
        loadingText: modalLoadingText,
        showCancel: modal.showCancel,
        showConfirm: modal.showConfirm,
        busy,
        error: modalError,
        status,
        onConfirm: handleModalButtonConfirm,
        onCancel: closeConfirm,
      }}
      preview={{
        open: previewOpen,
        busy: previewBusy,
        error: previewError,
        imageUrl: previewImageUrl,
        imageAlt: previewAltText,
        scale: previewScale,
        translate: previewTranslate,
        onClose: closePreview,
        onPointerDown: handlePreviewPointerDown,
        onPointerMove: handlePreviewPointerMove,
        onPointerEnd: handlePreviewPointerEnd,
        onWheel: handlePreviewWheel,
      }}
      content={{
        isLoading,
        errorMessage,
        header,
        statusLabel,
        gastoTypeLabel,
        totalAmountText,
        transDateText,
        isEditing,
        gastoTypeOptions,
        draftDescription,
        draftGastoType,
        draftCurrencyCode,
        draftTransDate,
        draftUrlFile,
        draftFileName,
        onDraftDescriptionChange: setDraftDescription,
        onDraftGastoTypeChange: setDraftGastoType,
        onDraftCurrencyCodeChange: setDraftCurrencyCode,
        onDraftTransDateChange: setDraftTransDate,
        onOpenFile: openFile,
        onOpenExpenseSheet: isFromSheetLink ? undefined : handleOpenExpenseSheet,
        visibleLines,
        totalLinePages,
        linePage,
        currencyCode: isEditing ? draftCurrencyCode : safeText(header?.currencyCode),
        paginationLabels,
        containerRef: lineContainerRef,
        onLinePageChange: setLinePage,
        onOpenLine: openLineDetail,
        status,
      }}
    />
  );
};

// Main page entry for expense ticket detail.
const ExpenseTicketDetailPage = () => {
  return (
    <VisitasPageProviders enableExpenseManagement>
      <ExpenseTicketDetailPageContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-ticket-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseTicketDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseTicketDetailPage;
