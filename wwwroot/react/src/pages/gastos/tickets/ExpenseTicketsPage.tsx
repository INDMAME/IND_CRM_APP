import React, { useCallback, useEffect, useEffectEvent, useLayoutEffect, useMemo, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import FloatingActionButton, { type FloatingActionButtonMenuItem } from "../../../components/commons/FloatingActionButton.tsx";
import PageBottomActions, { PageBottomActionButton } from "../../../components/commons/PageBottomActions.tsx";
import Spinner from "../../../components/commons/Spinner.tsx";
import { useAuthContext, type AuthManagedUser } from "../../../context/AuthContext.tsx";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { flashActionMark } from "../../../utils/visitasHistory.ts";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import ExpenseTimelineCard from "../components/ExpenseTimelineCard.tsx";
import ExpenseTicketLinkTimelineItem from "../components/ExpenseTicketLinkTimelineItem.tsx";
import ExpenseTicketLinkBulkSummary from "../components/ExpenseTicketLinkBulkSummary.tsx";
import ExpenseTicketsFiltersPanel from "../components/ExpenseTicketsFiltersPanel.tsx";
import ExpenseQuickTicketProgressOverlay from "../components/ExpenseQuickTicketProgressOverlay.tsx";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import { getExpenseTicketStatusLabel } from "../constants/expenseTicketStatusCatalog.ts";
import {
  configureExpenseApiAuth,
  getExpenseSheetDefaultCurrencyCode,
  attachExpenseSheetLineTicket,
  linkExpenseSheetTicketsBulk,
} from "../utils/expenseApi.ts";
import { clearExpenseActingUserOverride, setExpenseActingUserOverride } from "../utils/expenseActingUser.ts";
import { clearExpenseNavigationGuard, navigateToExpenseUrl, setExpenseNavigationGuard } from "../utils/expenseNavigation.ts";
import { getExpenseGastoTypeOptions } from "../constants/expenseGastoTypeCatalog.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import {
  buildExpenseSheetDetailUrl,
  buildExpenseSheetLineDetailUrl,
  clearExpenseTicketReturnContext,
  EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT,
  saveExpenseTicketReturnContext,
} from "../utils/expenseTicketReturnContext.ts";
import { hasExpenseReturnReferrer, isExpenseHistoryBackForwardNavigation } from "../utils/expenseHistoryNavigation.ts";
import {
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  normalizeCardTitleText,
  safeText,
  startOfDay,
  toIsoDate,
} from "../utils/expenseUiUtils.ts";
import { useExpenseSheetQuickTicketFlow } from "../detail/useExpenseSheetQuickTicketFlow.ts";
import { TICKET_IMAGE_ACCEPT_ATTRIBUTE } from "../detail/useExpenseSheetQuickTicketFlowCore.ts";
import { useExpenseTicketsFiltersState } from "./useExpenseTicketsFiltersState.ts";
import { useExpenseTicketsListData } from "./useExpenseTicketsListData.ts";
import { useExpenseTicketsFilterCache, type ExpenseTicketsCachedState } from "./useExpenseTicketsFilterCache.ts";
import {
  clearExpenseTicketLinkReturnState,
  readExpenseTicketLinkReturnState,
  saveExpenseTicketLinkReturnState,
} from "./expenseTicketLinkReturnState.ts";
import { buildExpenseTicketLinkBulkFilters } from "../utils/expensePayloadBuilders.ts";
import type { ExpenseSheetTicketLinkBulkResultDto } from "../expenseTypes.ts";
import type {
  ExpenseTicketAppliedFilterSnapshot,
  ExpenseTicketLinkCard,
  ExpenseTicketListPageItem,
} from "./expenseTicketListTypes.ts";
import { useExpenseTicketLinkSelection } from "./useExpenseTicketLinkSelection.ts";
import { useExpenseTicketAutomaticLoad } from "./useExpenseTicketAutomaticLoad.ts";
import { useExpenseTicketLinkSheetGate } from "./useExpenseTicketLinkSheetGate.ts";
import { buildExpenseTicketLinkInitialSnapshot } from "./expenseTicketLinkFilterSnapshot.ts";
import { setTopbarActionGroupReady as revealTopbarActionGroup } from "../../../utils/topbarActionVisibility.ts";

const PAGE_SIZE = 10;

const normalizeUserId = (value: unknown): string => String(value || "").trim();

const isSameUser = (left: string, right: string): boolean => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

const ensureCurrentUserInList = (
  users: AuthManagedUser[],
  currentAxUserId: string,
  currentUserName = ""
): AuthManagedUser[] => {
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  const normalizedCurrentName = normalizeUserId(currentUserName);
  if (!normalizedCurrent) return users;
  if (users.some((entry) => isSameUser(entry.axUserId, normalizedCurrent))) {
    return users.map((entry) => {
      if (!isSameUser(entry.axUserId, normalizedCurrent)) return entry;
      return {
        ...entry,
        name: normalizedCurrentName || normalizeUserId(entry.name) || normalizedCurrent,
        userName: normalizedCurrentName || entry.userName,
      };
    });
  }
  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrentName || normalizedCurrent,
      userName: normalizedCurrentName || undefined,
    },
    ...users,
  ];
};

const resolveManagedUserSelection = (requestedUserId: string, currentAxUserId: string, users: AuthManagedUser[]): string => {
  const normalizedRequested = normalizeUserId(requestedUserId);
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  if (normalizedRequested) {
    const found = users.find((entry) => isSameUser(entry.axUserId, normalizedRequested));
    if (found) return found.axUserId;
  }
  if (normalizedCurrent) {
    const self = users.find((entry) => isSameUser(entry.axUserId, normalizedCurrent));
    return self?.axUserId || normalizedCurrent;
  }
  return "";
};

const resolveLinkModeBlockedMessage = (isPaid: boolean): string => {
  if (isPaid) {
    return indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.");
  }

  return indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
};

const EXPENSE_TICKETS_LOG_PREFIX = "[expense-tickets]";

const logExpenseTicketsInfo = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(EXPENSE_TICKETS_LOG_PREFIX, ...args);
  }
};

const logExpenseTicketsWarn = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(EXPENSE_TICKETS_LOG_PREFIX, ...args);
  }
};

// Validates whether one ticket card can participate in bulk link mode.
const canSelectTicketForLink = (item: ExpenseTicketListPageItem): boolean => {
  const fileId = safeText(item.fileId);
  return !!fileId;
};

// Initializes auth seed for expense API calls before island effects run.
const bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__),
  });
};

const NewTicketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.362 11.15a3 3 0 1 0 -4.144 4.263" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 21v-4a2 2 0 1 1 4 0v4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 19h4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v6" />
  </svg>
);

const ExpenseTicketsPageContent = () => {
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canCreateTicket = canAccess("GASTOS_TICKETS", "Add");
  const canLinkSheetLines = canAccess("GASTOS_HOJA_GASTO", "Add");
  const [reimbursementCurrencyCode, setReimbursementCurrencyCode] = useState("");
  const {
    currentAxUserId,
    currentUserName,
    currentCrmUserId,
    subordinates,
    canManageOtherUsers,
    setSelectedManagedUserId,
    managementBootstrapReady,
    selectedManagedUserId,
    allowSelfManagement,
  } = useAuthContext();
  const timelineContainerRef = React.useRef<HTMLDivElement | null>(null);
  const cameraInputRef = React.useRef<HTMLInputElement | null>(null);
  const galleryInputRef = React.useRef<HTMLInputElement | null>(null);
  const didRestoreOnMountRef = React.useRef(false);
  const pendingScrollRestoreRef = React.useRef<number | null>(null);
  const pendingFocusFileIdRef = React.useRef("");
  const linkModeContext = useMemo(() => {
    const url = new URL(window.location.href);
    const action = safeText(url.searchParams.get("action")).toLowerCase();
    const hojaGastosId = safeText(url.searchParams.get("hojaGastosId"));
    const targetLineRecId = safeText(
      url.searchParams.get("sheetLineRecId") || url.searchParams.get("lineRecId")
    );
    const isLineLinkMode = action === "link-line" && !!hojaGastosId && !!targetLineRecId;
    const isLinkMode = (action === "link" && !!hojaGastosId) || isLineLinkMode;
    return {
      isLinkMode,
      isLineLinkMode,
      sheetId: hojaGastosId,
      targetLineRecId: isLineLinkMode ? targetLineRecId : "",
      sheetOrigin: isLineLinkMode
        ? ("expense-line" as const)
        : (isLinkMode ? ("sheet-link" as const) : (!!hojaGastosId ? ("sheet-create" as const) : null)),
      fixedStatusFilter: isLinkMode ? (0 as const) : null,
    };
  }, []);

  const isLinkMode = linkModeContext.isLinkMode;
  const isLineLinkMode = linkModeContext.isLineLinkMode;
  const linkSheetId = linkModeContext.sheetId;
  const targetLineRecId = linkModeContext.targetLineRecId;
  const sheetCallerOrigin = linkModeContext.sheetOrigin;
  const hasSheetCallerContext = !!linkSheetId && !!sheetCallerOrigin;
  const fixedStatusFilter = linkModeContext.fixedStatusFilter;
  const canProcessLinkMode = !isLinkMode || canLinkSheetLines;
  const managedUsers = useMemo(
    () => ensureCurrentUserInList(Array.isArray(subordinates) ? subordinates : [], currentAxUserId, currentUserName),
    [currentAxUserId, currentUserName, subordinates]
  );
  const defaultManagedUserId = useMemo(
    () => resolveManagedUserSelection(currentAxUserId, currentAxUserId, managedUsers),
    [currentAxUserId, managedUsers]
  );
  const showManagedUserFilter = isLinkMode && canManageOtherUsers;

  // Keeps link-mode list queries bounded even when UI filters are cleared.
  const normalizeLinkModeSnapshotForLoad = useCallback(
    (snapshot: ExpenseTicketAppliedFilterSnapshot): ExpenseTicketAppliedFilterSnapshot => {
      if (!isLinkMode) return snapshot;

      const fallback = buildExpenseTicketLinkInitialSnapshot(snapshot.managedUserId);
      const normalizedFromDate = safeText(snapshot.fromDate) || fallback.fromDate;
      const normalizedToDate = safeText(snapshot.toDate) || fallback.toDate;
      const normalizedManagedUserId = normalizeUserId(snapshot.managedUserId) || fallback.managedUserId;

      return {
        ...snapshot,
        fromDate: normalizedFromDate,
        toDate: normalizedToDate,
        managedUserId: normalizedManagedUserId,
        statusFilter: 0,
      };
    },
    [isLinkMode]
  );

  const [linkFlowBusy, setLinkFlowBusy] = useState(false);
  const [linkFlowStatus, setLinkFlowStatus] = useState("");
  const [linkFlowError, setLinkFlowError] = useState("");
  const [selectAllBusy, setSelectAllBusy] = useState(false);
  const [selectAllError, setSelectAllError] = useState("");
  const [linkBulkResult, setLinkBulkResult] = useState<ExpenseSheetTicketLinkBulkResultDto | null>(null);
  const failedLinkTicketIds = useMemo(() => {
    const failedItems = Array.isArray(linkBulkResult?.failed) ? linkBulkResult.failed : [];
    return new Set(
      failedItems.flatMap((item) => {
        const ticketId = safeText(item?.ticketId).toUpperCase();
        return ticketId ? [ticketId] : [];
      })
    );
  }, [linkBulkResult]);

  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel"),
  });

  const gastoTypeOptions = useMemo<ExpenseSelectOption[]>(() => getExpenseGastoTypeOptions(), []);

  const gastoTypeLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of gastoTypeOptions) {
      map.set(String(option.value), option.text);
    }
    return map;
  }, [gastoTypeOptions]);

  const {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    restoreListSnapshot,
    resetList,
    clearListCache,
  } = useExpenseTicketsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    mode: isLinkMode ? "link" : "general",
    onForbidden: showPermissionModal,
  });
  const { readCachedState, consumeReturnFlag, consumeReturnMode, saveCachedState, clearCachedState } = useExpenseTicketsFilterCache();
  const {
    selectionMode,
    selectedTickets,
    excludedIds,
    filteredSnapshot,
    filteredTotalCount,
    isFilteredSelectionActive,
    isSelected: isLinkTicketSelected,
    toggleTicket: toggleLinkTicketSelection,
    clearSelection: clearLinkTicketSelection,
    restoreSelection: restoreLinkTicketSelection,
    selectAllByFilters,
    hydrateVisibleTickets,
    resolveSelectedCount,
  } = useExpenseTicketLinkSelection();
  const syncManagedUserSelection = useCallback(
    (requestedUserId: string): string => {
      const resolvedUserId = resolveManagedUserSelection(requestedUserId, currentAxUserId, managedUsers);
      setSelectedManagedUserId(resolvedUserId);
      if (!resolvedUserId || (currentAxUserId && isSameUser(resolvedUserId, currentAxUserId))) {
        clearExpenseActingUserOverride();
      } else {
        setExpenseActingUserOverride(resolvedUserId);
      }
      return resolvedUserId;
    },
    [currentAxUserId, managedUsers, setSelectedManagedUserId]
  );
  const {
    linkSheetLocked,
    linkSheetBlockedMessage,
    linkSheetCheckBusy,
    linkSheetCheckComplete,
    linkSheetLines,
  } = useExpenseTicketLinkSheetGate({
    isLinkMode,
    linkSheetId,
    canProcessLinkMode,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    resolveBlockedMessage: resolveLinkModeBlockedMessage,
  });
  const targetLine = useMemo(() => {
    if (!isLineLinkMode || !targetLineRecId) return null;
    const normalizedTargetLineRecId = targetLineRecId.toUpperCase();
    return (
      linkSheetLines.find((item) => safeText(item.lineRecId).toUpperCase() === normalizedTargetLineRecId) || null
    );
  }, [isLineLinkMode, linkSheetLines, targetLineRecId]);
  const targetLineBlockedMessage = useMemo(() => {
    if (!isLineLinkMode || !linkSheetCheckComplete || linkSheetCheckBusy) return "";
    if (!canProcessLinkMode || linkSheetLocked) return "";
    if (!targetLine) {
      return indT("ExpenseTickets_LinkLine_TargetMissing", "The target expense line was not found.");
    }
    if (safeText(targetLine.fileId) || targetLine.ticket === true) {
      return indT("ExpenseTickets_LinkLine_TargetAlreadyLinked", "The target expense line already has a ticket.");
    }
    return "";
  }, [canProcessLinkMode, isLineLinkMode, linkSheetCheckBusy, linkSheetCheckComplete, linkSheetLocked, targetLine]);
  const linkFlowLocked = linkSheetLocked || !!targetLineBlockedMessage;
  const linkFlowBlockedMessage = targetLineBlockedMessage || linkSheetBlockedMessage;
  const { runAutomaticListLoad } = useExpenseTicketAutomaticLoad({
    isLinkMode,
    canProcessLinkMode,
    linkSheetCheckBusy,
    linkSheetLocked: linkFlowLocked,
    clearListCache,
    resetList,
    loadList,
  });
  const buildInitialLinkModeSnapshot = useCallback(() => {
    const initialManagedUserId = syncManagedUserSelection(defaultManagedUserId);
    return buildExpenseTicketLinkInitialSnapshot(initialManagedUserId);
  }, [defaultManagedUserId, syncManagedUserSelection]);

  const buildInitialStandardSnapshot = useCallback((): ExpenseTicketAppliedFilterSnapshot => {
    const today = startOfDay(new Date());
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 89);
    const initialManagedUserId = syncManagedUserSelection(defaultManagedUserId);

    return {
      fromDate: toIsoDate(fromDate),
      toDate: toIsoDate(today),
      filterKey: "",
      currencyCode: "",
      managedUserId: initialManagedUserId,
      statusFilter: "",
      gastoTypeFilter: "",
      processedByIaFilter: "all",
    };
  }, [defaultManagedUserId, syncManagedUserSelection]);

  const {
    fromDate,
    toDate,
    filterKey,
    currencyCode,
    managedUserId,
    statusFilter,
    gastoTypeFilter,
    processedByIaFilter,
    activeQuickFilter,
    showManualDateFilter,
    showManualDateError,
    manualDateAutoOpenKey,
    appliedFilters,
    showFilters,
    currentFilters,
    setFilterKey,
    setCurrencyCode,
    setManagedUserId,
    setStatusFilter,
    setGastoTypeFilter,
    setProcessedByIaFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel,
    statusFilterLocked,
  } = useExpenseTicketsFiltersState({
    defaultManagedUserId,
    fixedStatusFilter,
    allowEmptyDatesOnApply: isLinkMode,
    onApplyFilters: (snapshot) => {
      setLinkBulkResult(null);
      clearLinkTicketSelection();
      const resolvedManagedUserId = syncManagedUserSelection(snapshot.managedUserId);
      void loadList(
        1,
        normalizeLinkModeSnapshotForLoad({
          ...snapshot,
          managedUserId: resolvedManagedUserId,
        })
      );
    },
    onClearFilters: () => {
      setLinkBulkResult(null);
      clearLinkTicketSelection();
      clearCachedState();
      if (isLinkMode) {
        const linkSnapshot = buildInitialLinkModeSnapshot();
        restoreAppliedFilters(linkSnapshot);
        runAutomaticListLoad(1, normalizeLinkModeSnapshotForLoad(linkSnapshot), {
          clearCache: true,
          resetBeforeLoad: true,
          waitForLinkModeSheetReady: true,
        });
        return;
      }

      const resetManagedUserId = syncManagedUserSelection(currentAxUserId);
      setManagedUserId(resetManagedUserId);
      resetList("clear-filters");
    },
  });

  useEffect(() => {
    const normalizedDefaultManagedUserId = normalizeUserId(defaultManagedUserId);
    if (!normalizedDefaultManagedUserId) return;
    setManagedUserId(normalizedDefaultManagedUserId);
    syncManagedUserSelection(normalizedDefaultManagedUserId);
  }, [defaultManagedUserId, setManagedUserId, syncManagedUserSelection]);

  useEffect(() => {
    if (canManageOtherUsers) return;
    const fallbackManagedUserId = resolveManagedUserSelection(currentAxUserId, currentAxUserId, managedUsers);
    const normalizedCurrentManagedUserId = normalizeUserId(managedUserId);
    if (isSameUser(normalizedCurrentManagedUserId, fallbackManagedUserId)) return;
    if (!normalizedCurrentManagedUserId && !fallbackManagedUserId) return;

    setManagedUserId(fallbackManagedUserId);
    syncManagedUserSelection(fallbackManagedUserId);
  }, [canManageOtherUsers, currentAxUserId, managedUserId, managedUsers, setManagedUserId, syncManagedUserSelection]);

  const {
    sourcePickerOpen,
    busy: quickTicketBusy,
    progressMessage: quickTicketProgressMessage,
    progressStages: quickTicketProgressStages,
    progressElapsedMs: quickTicketElapsedMs,
    errorMessage: quickTicketErrorMessage,
    attemptId: quickTicketAttemptId,
    hasPendingUploadRetry,
    hasPartialTicketFailure,
    traceList: quickTicketTraceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    clearError: clearQuickTicketError,
  } = useExpenseSheetQuickTicketFlow({
    canCreateExpense: !isLinkMode && canCreateTicket,
    isCreateMode: false,
    isSheetLocked: false,
    linkToSheet: false,
    axUserIdOverride: safeText(currentAxUserId),
    currencyCode: currencyCode || "EUR",
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) return;

      if (hasSheetCallerContext && sheetCallerOrigin) {
        saveExpenseTicketReturnContext({
          fileId: createdFileId,
          sheetId: linkSheetId,
          origin: sheetCallerOrigin,
        });
        const query = new URLSearchParams({
          fileId: createdFileId,
          mode: "edit",
          origin: sheetCallerOrigin,
          sheetId: linkSheetId,
        });
        navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
          askConfirmation: false,
        });
        return;
      }

      clearExpenseTicketReturnContext();
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(createdFileId)}&mode=edit&origin=ticket-create`, {
        askConfirmation: false,
      });
    },
  });

  const fabMenuItems = useMemo<FloatingActionButtonMenuItem[]>(
    () =>
      isLinkMode
        ? []
        : [
            {
              id: "new-ticket",
              label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
              icon: <NewTicketIcon />,
              onClick: openSourcePicker,
            },
          ],
    [isLinkMode, openSourcePicker]
  );

  const selectedTicketCount = isLineLinkMode ? selectedTickets.length : resolveSelectedCount(total);
  const selectedTargetTicket = isLineLinkMode ? selectedTickets[0] || null : null;
  const selectedTotalAmountText = useMemo(() => {
    let totalAmount = 0;

    selectedTickets.forEach((item) => {
      const amount = Number(item.totalAmount ?? 0);
      if (!Number.isFinite(amount)) return;
      totalAmount += amount;
    });

    return formatAmountWithCurrency(totalAmount, reimbursementCurrencyCode);
  }, [reimbursementCurrencyCode, selectedTickets]);
  useEffect(() => {
    let cancelled = false;

    getExpenseSheetDefaultCurrencyCode()
      .then((currency) => {
        if (cancelled) return;
        const normalizedCurrency = safeText(currency).toUpperCase();
        if (normalizedCurrency) {
          setReimbursementCurrencyCode(normalizedCurrency);
        }
      })
      .catch(() => {
        // Leave MST amounts unlabelled when the company currency context is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, []);
  useLayoutEffect(() => {
    revealTopbarActionGroup("expense-tickets-list-actions");
  }, []);

  const linkModeCancelMessage = useMemo(
    () =>
      indT(
        "ExpenseTickets_LinkMode_CancelConfirm",
        "Se cancelará el proceso de vinculación y volverás a la hoja de gastos. ¿Quieres continuar?"
      ),
    []
  );

  const applyCreatedTicketReturn = useCallback(
    (ticketFileId: string, ticketDateValue: unknown) => {
      const initialSnapshot = buildInitialStandardSnapshot();

      logExpenseTicketsInfo("applyCreatedTicketReturn:start", {
        ticketFileId,
        ticketDateValue,
        currentAxUserId,
        initialSnapshot,
      });

      clearCachedState();
      pendingScrollRestoreRef.current = null;
      pendingFocusFileIdRef.current = "";
      restoreAppliedFilters(initialSnapshot);
      clearListCache();
      resetList("created-ticket-return");
      logExpenseTicketsInfo("applyCreatedTicketReturn:loadList", {
        page: 1,
        initialSnapshot,
      });
      void loadList(1, initialSnapshot);

      const url = new URL(window.location.href);
      url.searchParams.delete("ticketFileId");
      url.searchParams.delete("ticketDate");
      const cleanedQuery = url.searchParams.toString();
      window.history.replaceState({}, "", cleanedQuery ? `${url.pathname}?${cleanedQuery}` : url.pathname);
    },
    [
      buildInitialStandardSnapshot,
      clearCachedState,
      clearListCache,
      currentAxUserId,
      loadList,
      resetList,
      restoreAppliedFilters,
    ]
  );

  const restoreLinkModeReturnState = useCallback(
    (cachedState: ExpenseTicketsCachedState) => {
      const restoredManagedUserId = syncManagedUserSelection(cachedState.filters.managedUserId);
      const restoredFilters = {
        ...cachedState.filters,
        managedUserId: restoredManagedUserId,
      };

      restoreAppliedFilters(restoredFilters);
      pendingScrollRestoreRef.current = cachedState.scrollY;
      pendingFocusFileIdRef.current = cachedState.focusFileId;
      restoreLinkTicketSelection({
        selectionMode: isLineLinkMode ? "selected" : cachedState.selectionMode,
        selectedTickets: isLineLinkMode ? cachedState.selectedTickets.slice(0, 1) : cachedState.selectedTickets,
        excludedIds: isLineLinkMode ? [] : cachedState.excludedIds,
        filteredSnapshot: isLineLinkMode ? null : cachedState.filteredSelectionFilters,
        filteredTotalCount: isLineLinkMode ? 0 : cachedState.filteredSelectionTotal,
      });

      if (cachedState.items.length > 0 || cachedState.total > 0) {
        restoreListSnapshot({
          items: cachedState.items,
          total: cachedState.total,
          page: cachedState.page,
        });
      }

      runAutomaticListLoad(cachedState.page, normalizeLinkModeSnapshotForLoad(restoredFilters), {
        clearCache: true,
        waitForLinkModeSheetReady: true,
      });
    },
    [
      normalizeLinkModeSnapshotForLoad,
      isLineLinkMode,
      restoreAppliedFilters,
      restoreLinkTicketSelection,
      restoreListSnapshot,
      runAutomaticListLoad,
      syncManagedUserSelection,
    ]
  );

  const restoreInitialLinkModeState = useCallback(() => {
    const linkSnapshot = buildInitialLinkModeSnapshot();
    clearCachedState();
    clearExpenseTicketLinkReturnState();
    clearLinkTicketSelection();
    setLinkBulkResult(null);
    restoreAppliedFilters(linkSnapshot);
    runAutomaticListLoad(1, normalizeLinkModeSnapshotForLoad(linkSnapshot), {
      clearCache: true,
      resetBeforeLoad: true,
      waitForLinkModeSheetReady: true,
    });
  }, [
    buildInitialLinkModeSnapshot,
    clearCachedState,
    clearExpenseTicketLinkReturnState,
    clearLinkTicketSelection,
    normalizeLinkModeSnapshotForLoad,
    restoreAppliedFilters,
    runAutomaticListLoad,
  ]);

  // Applies default first-entry filters for the standard tickets list only.
  const restoreInitialStandardState = useCallback(() => {
    const initialSnapshot = buildInitialStandardSnapshot();
    clearCachedState();
    clearExpenseTicketLinkReturnState();
    pendingScrollRestoreRef.current = null;
    pendingFocusFileIdRef.current = "";
    restoreAppliedFilters(initialSnapshot);
    runAutomaticListLoad(1, initialSnapshot, {
      clearCache: true,
      resetBeforeLoad: true,
    });
  }, [
    buildInitialStandardSnapshot,
    clearCachedState,
    clearExpenseTicketLinkReturnState,
    restoreAppliedFilters,
    runAutomaticListLoad,
  ]);

  const restoreStandardReturnState = useCallback(
    (cachedState: ExpenseTicketsCachedState) => {
      const restoredManagedUserId = syncManagedUserSelection(cachedState.filters.managedUserId);
      const restoredFilters = {
        ...cachedState.filters,
        managedUserId: restoredManagedUserId,
      };

      restoreAppliedFilters(restoredFilters);
      pendingScrollRestoreRef.current = cachedState.scrollY;
      pendingFocusFileIdRef.current = cachedState.focusFileId;

      if (cachedState.items.length > 0 || cachedState.total > 0) {
        restoreListSnapshot({
          items: cachedState.items,
          total: cachedState.total,
          page: cachedState.page,
        });
      }

      runAutomaticListLoad(cachedState.page, restoredFilters, {
        clearCache: true,
      });
    },
    [restoreAppliedFilters, restoreListSnapshot, runAutomaticListLoad, syncManagedUserSelection]
  );

  // Keeps delete return explicit: blank filters, open panel, and no automatic reload.
  const restoreDeleteReturnState = useCallback(() => {
    clearCachedState();
    clearExpenseTicketLinkReturnState();
    pendingScrollRestoreRef.current = null;
    pendingFocusFileIdRef.current = "";
    clearLinkTicketSelection();
    setLinkBulkResult(null);
    onClear();
  }, [clearCachedState, clearExpenseTicketLinkReturnState, clearLinkTicketSelection, onClear]);

  const toggleTicketSelection = useCallback(
    (ticket: ExpenseTicketListPageItem) => {
      if (!isLinkMode || !canProcessLinkMode || linkSheetCheckBusy || linkFlowLocked || linkFlowBusy) return;
      if (ticket.kind !== "link") return;

      const fileId = safeText(ticket.fileId);
      if (!fileId) return;
      if (!canSelectTicketForLink(ticket)) return;

      setLinkBulkResult(null);
      if (isLineLinkMode) {
        const wasSelected = isLinkTicketSelected(fileId);
        clearLinkTicketSelection();
        if (!wasSelected) {
          toggleLinkTicketSelection(ticket);
        }
        return;
      }
      toggleLinkTicketSelection(ticket);
    },
    [
      canProcessLinkMode,
      clearLinkTicketSelection,
      isLineLinkMode,
      isLinkMode,
      isLinkTicketSelected,
      linkFlowBusy,
      linkFlowLocked,
      linkSheetCheckBusy,
      toggleLinkTicketSelection,
    ]
  );

  const clearTicketSelection = useCallback(() => {
    setSelectAllError("");
    setLinkBulkResult(null);
    clearLinkTicketSelection();
  }, [clearLinkTicketSelection]);

  const resolveActiveFilters = useCallback((): ExpenseTicketAppliedFilterSnapshot => {
    const baseSnapshot = appliedFilters || currentFilters;
    const resolvedManagedUserId = syncManagedUserSelection(baseSnapshot.managedUserId);
    return normalizeLinkModeSnapshotForLoad({
      ...baseSnapshot,
      managedUserId: resolvedManagedUserId,
    });
  }, [appliedFilters, currentFilters, normalizeLinkModeSnapshotForLoad, syncManagedUserSelection]);
  const resolveActiveFiltersEvent = useEffectEvent(resolveActiveFilters);

  // Activates backend-driven filtered selection for the current filter snapshot.
  const selectAllMatchingTickets = useCallback(async () => {
    if (
      !isLinkMode ||
      isLineLinkMode ||
      !canProcessLinkMode ||
      linkSheetCheckBusy ||
      linkFlowLocked ||
      linkFlowBusy ||
      selectAllBusy
    ) {
      return;
    }

    setSelectAllBusy(true);
    setSelectAllError("");
    setLinkBulkResult(null);

    try {
      const activeFilters = resolveActiveFilters();
      selectAllByFilters(activeFilters, total);
    } catch (error) {
      const message = error instanceof Error ? error.message : indT("Tickets_LoadError", "Could not load tickets.");
      setSelectAllError(message);
    } finally {
      setSelectAllBusy(false);
    }
  }, [
    canProcessLinkMode,
    currentAxUserId,
    isLineLinkMode,
    isLinkMode,
    linkFlowBusy,
    linkSheetCheckBusy,
    linkFlowLocked,
    resolveActiveFilters,
    selectAllByFilters,
    selectAllBusy,
    total,
  ]);

  // Keeps selected card metadata fresh with the latest list payload.
  useEffect(() => {
    if (!isLinkMode || items.length < 1) return;
    hydrateVisibleTickets(items.filter((item): item is ExpenseTicketLinkCard => item.kind === "link"));
  }, [hydrateVisibleTickets, isLinkMode, items]);

  const runTicketLinkFlow = useCallback(async () => {
    if (!isLinkMode || !linkSheetId || linkFlowBusy) {
      return false;
    }
    if (linkFlowLocked || !canProcessLinkMode) {
      const blockedMessage =
        linkFlowBlockedMessage ||
        indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
      setLinkFlowError(blockedMessage);
      setLinkFlowStatus(blockedMessage);
      flashActionMark("errorProcess", 1500);
      return false;
    }

    const selectedCount = isLineLinkMode ? selectedTickets.length : resolveSelectedCount(total);
    if (selectedCount < 1 || (isLineLinkMode && selectedCount !== 1)) {
      return false;
    }

    const activeFilters = resolveActiveFilters();
    const requestAxUserId = safeText(activeFilters.managedUserId || currentAxUserId);

    setLinkFlowBusy(true);
    setLinkFlowError("");
    setLinkBulkResult(null);
    setLinkFlowStatus(
      isLineLinkMode
        ? indT("ExpenseTickets_LinkLine_Attaching", "Attaching ticket to the expense line...")
        : indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line...")
    );

    try {
      if (isLineLinkMode) {
        const selectedTicket = selectedTickets[0] || null;
        const selectedFileId = safeText(selectedTicket?.fileId);
        if (!targetLineRecId || !selectedFileId) {
          return false;
        }

        const response = await attachExpenseSheetLineTicket(
          linkSheetId,
          targetLineRecId,
          { fileId: selectedFileId },
          {
            suppressPermissionModal: true,
            axUserIdOverride: requestAxUserId || undefined,
          }
        );
        if (!response.Success) {
          const failureMessage =
            response.Message || indT("ExpenseTickets_LinkLine_AttachFailed", "Could not attach the ticket.");
          setLinkFlowError(failureMessage);
          setLinkFlowStatus(failureMessage);
          flashActionMark("errorProcess", 1500);
          return false;
        }

        clearTicketSelection();
        clearCachedState();
        clearExpenseTicketLinkReturnState();
        clearExpenseTicketReturnContext();
        setLinkFlowStatus(indT("ExpenseTickets_LinkLine_Attached", "Ticket attached."));
        flashActionMark("okProcess", 1200);
        navigateToExpenseUrl(buildExpenseSheetLineDetailUrl(linkSheetId, targetLineRecId), {
          askConfirmation: false,
          bypassGuardOnce: true,
        });
        return true;
      }

      const response = await linkExpenseSheetTicketsBulk(
        isFilteredSelectionActive
          ? {
              expenseSheetId: linkSheetId,
              selectionMode: "filtered",
              filters: buildExpenseTicketLinkBulkFilters(filteredSnapshot || activeFilters),
              excludedIds,
            }
          : {
              expenseSheetId: linkSheetId,
              selectionMode: "selected",
              ticketIds: selectedTickets.flatMap((item) => {
                const fileId = safeText(item.fileId);
                return fileId ? [fileId] : [];
              }),
            },
        {
          suppressPermissionModal: true,
          axUserIdOverride: requestAxUserId || undefined,
        }
      );
      const result = response.Data || null;
      if (!result) {
        const failureMessage = response.Message || indT("Api_RequestFailed", "Request failed.");
        setLinkFlowError(failureMessage);
        setLinkFlowStatus(failureMessage);
        flashActionMark("errorProcess", 1500);
        return false;
      }

      setLinkBulkResult(result);

      if (result.linkedCount > 0) {
        clearTicketSelection();
        clearCachedState();
        clearExpenseTicketLinkReturnState();
        clearExpenseTicketReturnContext();
        const successMark = result.failedCount > 0 || result.skippedCount > 0 ? "warningProcess" : "okProcess";
        flashActionMark(successMark, successMark === "okProcess" ? 1200 : 1500);
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(linkSheetId), {
          askConfirmation: false,
          bypassGuardOnce: true,
        });
        return true;
      }

      if (result.failedCount > 0 && result.linkedCount < 1) {
        const failureMessage = response.Message || indT("Api_RequestFailed", "Request failed.");
        setLinkFlowStatus(failureMessage);
        flashActionMark("errorProcess", 1500);
        await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);
        return true;
      }

      if (result.failedCount > 0 || result.skippedCount > 0) {
        setLinkFlowStatus(response.Message || indT("Common_OK", "OK"));
        flashActionMark("warningProcess", 1500);
        await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);
        return true;
      }

      setLinkFlowStatus(response.Message || indT("Common_OK", "OK"));
      flashActionMark("okProcess", 1200);
      await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);
      return true;
    } catch (error) {
      const failureMessage = error instanceof Error ? error.message : indT("Api_RequestFailed", "Request failed.");
      setLinkFlowError(failureMessage);
      setLinkFlowStatus(failureMessage);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setLinkFlowBusy(false);
    }
  }, [
    canProcessLinkMode,
    clearCachedState,
    clearTicketSelection,
    currentPage,
    currentAxUserId,
    excludedIds,
    filteredSnapshot,
    isLineLinkMode,
    isLinkMode,
    isFilteredSelectionActive,
    linkFlowBusy,
    linkSheetId,
    linkFlowBlockedMessage,
    linkFlowLocked,
    loadList,
    resolveActiveFilters,
    resolveSelectedCount,
    selectedTickets,
    targetLineRecId,
    total,
  ]);

  const openLinkConfirmModal = useCallback(() => {
    if (
      !isLinkMode ||
      selectedTicketCount < 1 ||
      (isLineLinkMode && selectedTicketCount !== 1) ||
      linkFlowBusy ||
      linkSheetCheckBusy ||
      linkFlowLocked
    ) {
      return;
    }

    setLinkFlowError("");
    setLinkFlowStatus("");
    const targetModeTitle = indT("ExpenseTickets_LinkLine_AttachButton", "Attach existing ticket");
    const selectedTicketLabel =
      safeText(selectedTargetTicket?.description) || safeText(selectedTargetTicket?.fileName) || safeText(selectedTargetTicket?.fileId);
    openConfirm({
      title: isLineLinkMode ? targetModeTitle : indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
      message: isLineLinkMode
        ? `${indT(
            "ExpenseTickets_LinkLine_ConfirmBody",
            "The selected ticket will be attached without replacing the manual expense line values."
          )}\n${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketLabel}`
        : isFilteredSelectionActive
          ? `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}`
          : `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}\n${indT("ExpenseSheets_Field_TotalAmount", "Reimbursement amount")}: ${selectedTotalAmountText}`,
      confirmText: isLineLinkMode
        ? targetModeTitle
        : indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
      cancelText: indT("Confirm_No", "Cancel"),
      onConfirm: async () => {
        return runTicketLinkFlow();
      },
    });
  }, [
    isLinkMode,
    isLineLinkMode,
    selectedTicketCount,
    linkFlowBusy,
    linkSheetCheckBusy,
    linkFlowLocked,
    isFilteredSelectionActive,
    openConfirm,
    selectedTargetTicket,
    selectedTotalAmountText,
    runTicketLinkFlow,
  ]);

  const handleModalConfirm = useCallback(async () => {
    setLinkFlowError("");
    await handleConfirm({
      busy: linkFlowBusy,
      onError: (message) => {
        setLinkFlowError(message);
        setLinkFlowStatus(message);
      },
      defaultErrorMessage: indT("Api_RequestFailed", "Request failed."),
    });
  }, [handleConfirm, linkFlowBusy]);

  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = linkFlowBusy
    ? modalLoadingText
    : !linkFlowBusy && linkFlowError
      ? indT("Common_OK", "OK")
      : modal.confirmText || indT("Confirm_Yes", "OK");

  const handleModalButtonConfirm = useCallback(() => {
    if (!linkFlowBusy && linkFlowError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [closeConfirm, handleModalConfirm, linkFlowBusy, linkFlowError]);

  const openTicketDetail = useCallback(
    (rawFileId: string) => {
      const fileId = safeText(rawFileId);
      if (!fileId) return;

      const snapshot = appliedFilters || currentFilters;
      const currentState = {
        filters: snapshot,
        page: currentPage < 1 ? 1 : currentPage,
        scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0,
        focusFileId: fileId,
        items,
        total,
        selectedTickets,
        linkModeSheetId: isLinkMode ? linkSheetId : "",
        linkModeLineId: isLineLinkMode ? targetLineRecId : "",
        selectionMode,
        excludedIds,
        filteredSelectionFilters: filteredSnapshot,
        filteredSelectionTotal: filteredTotalCount,
      };

      if (isLinkMode) {
        const shouldOpenFailedTicketInEditMode = failedLinkTicketIds.has(fileId.toUpperCase());
        saveCachedState(currentState);
        saveExpenseTicketLinkReturnState({
          sheetId: linkSheetId,
          targetLineRecId: isLineLinkMode ? targetLineRecId : "",
          page: currentState.page,
          scrollY: currentState.scrollY,
          focusFileId: fileId,
          filters: snapshot,
          selectionMode,
          selectedTickets,
          excludedIds,
          filteredSelectionFilters: filteredSnapshot,
          filteredSelectionTotal: filteredTotalCount,
        });
        const query = new URLSearchParams({
          fileId,
        });
        if (shouldOpenFailedTicketInEditMode) {
          query.set("mode", "edit");
          query.set("intent", EXPENSE_TICKET_LINK_FAILURE_REPAIR_INTENT);
        }
        if (hasSheetCallerContext && sheetCallerOrigin) {
          const detailReturnOrigin = isLineLinkMode ? ("sheet-link" as const) : sheetCallerOrigin;
          saveExpenseTicketReturnContext({
            fileId,
            sheetId: linkSheetId,
            origin: detailReturnOrigin,
            sheetLineRecId: isLineLinkMode ? targetLineRecId : undefined,
          });
          query.set("origin", detailReturnOrigin);
          query.set("sheetId", linkSheetId);
          if (isLineLinkMode && targetLineRecId) {
            query.set("sheetLineRecId", targetLineRecId);
            query.set("lineRecId", targetLineRecId);
          }
        }
        navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
          askConfirmation: false,
          bypassGuardOnce: true,
        });
        return;
      }

      saveCachedState(currentState);
      if (hasSheetCallerContext && sheetCallerOrigin) {
        saveExpenseTicketReturnContext({
          fileId,
          sheetId: linkSheetId,
          origin: sheetCallerOrigin,
        });
        const query = new URLSearchParams({
          fileId,
          origin: sheetCallerOrigin,
          sheetId: linkSheetId,
        });
        navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
          askConfirmation: true,
          bypassGuardOnce: false,
        });
        return;
      }

      clearExpenseTicketReturnContext();
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}`, {
        askConfirmation: true,
        bypassGuardOnce: false,
      });
    },
    [
      appliedFilters,
      currentPage,
      currentFilters,
      hasSheetCallerContext,
      linkSheetId,
      isLineLinkMode,
      isLinkMode,
      items,
      filteredTotalCount,
      filteredSnapshot,
      excludedIds,
      failedLinkTicketIds,
      sheetCallerOrigin,
      saveCachedState,
      saveExpenseTicketLinkReturnState,
      selectedTickets,
      selectionMode,
      total,
      targetLineRecId,
    ]
  );

  const resolveClickableCard = useCallback((target: EventTarget | null) => {
    const node = target as HTMLElement | null;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest<HTMLElement>(".timeline-card--clickable");
    if (!card) return null;
    if (!timelineContainerRef.current?.contains(card)) return null;
    return card;
  }, []);

  useTimelineCardEffects({
    containerRef: timelineContainerRef,
    errorMessage,
    items,
    resolveClickableCard,
  });

  const totalPages = Math.ceil((total || 0) / PAGE_SIZE);
  const showListLoading = isLoading;
  const linkModeSelectionButtonsDisabled = linkFlowBusy || selectAllBusy || isLoading;
  const pageLocale = typeof document === "undefined" ? "es-ES" : document.documentElement?.lang || "es-ES";

  const summaryItems = useMemo(() => {
    const snapshot = appliedFilters;
    if (!snapshot) return [] as Array<{ key: string; label: string; value: string }>;

    const summary: Array<{ key: string; label: string; value: string }> = [];
    const fromDateText = formatExpenseDisplayDate(snapshot.fromDate, pageLocale, "");
    const toDateText = formatExpenseDisplayDate(snapshot.toDate, pageLocale, "");

    if (fromDateText || toDateText) {
      summary.push({
        key: "fromDate",
        label: indT("History_From", "From"),
        value: fromDateText || "--",
      });
      summary.push({
        key: "toDate",
        label: indT("History_To", "To"),
        value: toDateText || "--",
      });
    }

    if (snapshot.filterKey.trim()) {
      summary.push({
        key: "filterKey",
        label: indT("Tickets_Filter_FilterKey", "Ticket"),
        value: snapshot.filterKey.trim(),
      });
    }

    if (snapshot.currencyCode.trim()) {
      summary.push({
        key: "currency",
        label: indT("ExpenseSheets_Filter_Currency", "Currency"),
        value: snapshot.currencyCode.trim(),
      });
    }

    if (snapshot.statusFilter !== "") {
      summary.push({
        key: "status",
        label: indT("Tickets_Filter_Status", "Status"),
        value: getExpenseTicketStatusLabel(snapshot.statusFilter),
      });
    }

    if (snapshot.gastoTypeFilter !== "") {
      const categoryLabel = gastoTypeLabelMap.get(String(snapshot.gastoTypeFilter)) || String(snapshot.gastoTypeFilter);
      summary.push({
        key: "category",
        label: indT("Tickets_Filter_Category", "Category"),
        value: categoryLabel,
      });
    }

    if (snapshot.processedByIaFilter !== "all") {
      summary.push({
        key: "processed",
        label: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
        value:
          snapshot.processedByIaFilter === "yes"
            ? indT("Tickets_Filter_ProcessedByIA_Yes", "Yes")
            : indT("Tickets_Filter_ProcessedByIA_No", "No"),
      });
    }

    return summary;
  }, [appliedFilters, gastoTypeLabelMap, pageLocale]);

  const showSummary = !isLinkMode && !showFilters && summaryItems.length > 0;

  useEffect(() => {
    if (!isLinkMode) return;
    setExpenseNavigationGuard({
      active: true,
      message: linkModeCancelMessage,
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [isLinkMode, linkModeCancelMessage]);

  useEffect(() => {
    logExpenseTicketsInfo("mountRestoreEffect:enter", {
      url: typeof window !== "undefined" ? window.location.href : "",
      didRestoreOnMount: didRestoreOnMountRef.current,
      hasAccess,
      isLinkMode,
      managementBootstrapReady,
    });
    if (didRestoreOnMountRef.current) {
      logExpenseTicketsWarn("mountRestoreEffect:skip-already-restored");
      return;
    }
    if (!hasAccess) {
      logExpenseTicketsWarn("mountRestoreEffect:skip-no-access");
      return;
    }

    if (!isLinkMode) {
      const url = new URL(window.location.href);
      const ticketFileId = safeText(url.searchParams.get("ticketFileId"));
      if (ticketFileId) {
        logExpenseTicketsInfo("mountRestoreEffect:ticket-create-return-detected", {
          ticketFileId,
          ticketDate: url.searchParams.get("ticketDate"),
        });
        didRestoreOnMountRef.current = true;
        applyCreatedTicketReturn(ticketFileId, url.searchParams.get("ticketDate"));
        return;
      }
    }

    if (!managementBootstrapReady) {
      logExpenseTicketsWarn("mountRestoreEffect:waiting-management-bootstrap");
      return;
    }
    if (isLineLinkMode && !linkSheetCheckComplete) {
      logExpenseTicketsInfo("mountRestoreEffect:waiting-target-line");
      return;
    }
    didRestoreOnMountRef.current = true;
    const isHistoryBackForward = isExpenseHistoryBackForwardNavigation();
    const isReturnFromTicketDetail = hasExpenseReturnReferrer([
      "/Gastos/TicketDetail",
      "/Gastos/TicketLineDetail",
    ]);
    const returnMode = consumeReturnMode();
    const hasReturnFlag = consumeReturnFlag();

    logExpenseTicketsInfo("mountRestoreEffect:resolved-return-state", {
      isHistoryBackForward,
      isReturnFromTicketDetail,
      returnMode,
      hasReturnFlag,
      isLinkMode,
    });

    if (returnMode === "reset_filters" && hasReturnFlag) {
      logExpenseTicketsInfo("mountRestoreEffect:restore-delete-return");
      restoreDeleteReturnState();
      return;
    }

    if (isLinkMode) {
      const isReturningFromDetail = hasReturnFlag || isHistoryBackForward || isReturnFromTicketDetail;
      const cachedState = isReturningFromDetail ? readCachedState() : null;
      const cachedSheetId = safeText(cachedState?.linkModeSheetId);
      const cachedLineId = safeText(cachedState?.linkModeLineId);
      const expectedLineId = isLineLinkMode ? targetLineRecId : "";
      const cacheMatchesContext =
        cachedSheetId.toUpperCase() === safeText(linkSheetId).toUpperCase() &&
        cachedLineId.toUpperCase() === expectedLineId.toUpperCase();
      if (cachedState && cachedSheetId && cacheMatchesContext) {
        logExpenseTicketsInfo("mountRestoreEffect:restore-link-mode-cache", {
          cachedSheetId,
          page: cachedState.page,
        });
        clearExpenseTicketLinkReturnState();
        restoreLinkModeReturnState(cachedState);
        return;
      }

      const linkReturnState = isReturningFromDetail
        ? readExpenseTicketLinkReturnState(linkSheetId, isLineLinkMode ? targetLineRecId : "")
        : null;
      if (linkReturnState) {
        logExpenseTicketsInfo("mountRestoreEffect:restore-link-mode-return-state", {
          sheetId: linkReturnState.sheetId,
          page: linkReturnState.page,
        });
        clearExpenseTicketLinkReturnState();
        restoreLinkModeReturnState({
          filters: linkReturnState.filters,
          page: linkReturnState.page,
          scrollY: linkReturnState.scrollY,
          focusFileId: linkReturnState.focusFileId,
          items: [],
          selectedTickets: linkReturnState.selectedTickets,
          total: 0,
          linkModeSheetId: linkReturnState.sheetId,
          linkModeLineId: linkReturnState.targetLineRecId,
          selectionMode: linkReturnState.selectionMode,
          excludedIds: linkReturnState.excludedIds,
          filteredSelectionFilters: linkReturnState.filteredSelectionFilters,
          filteredSelectionTotal: linkReturnState.filteredSelectionTotal,
        });
        return;
      }

      logExpenseTicketsInfo("mountRestoreEffect:restore-initial-link-mode");
      restoreInitialLinkModeState();
      return;
    }

    if (!hasReturnFlag && !isHistoryBackForward && !isReturnFromTicketDetail) {
      logExpenseTicketsInfo("mountRestoreEffect:restore-initial-standard-state");
      restoreInitialStandardState();
      return;
    }

    const cachedState = readCachedState();
    if (!cachedState) {
      logExpenseTicketsWarn("mountRestoreEffect:no-cached-state");
      clearCachedState();
      return;
    }

    logExpenseTicketsInfo("mountRestoreEffect:restore-standard-cache", {
      page: cachedState.page,
      focusFileId: cachedState.focusFileId,
    });
    restoreStandardReturnState(cachedState);
  }, [
    applyCreatedTicketReturn,
    clearCachedState,
    clearExpenseTicketLinkReturnState,
    consumeReturnFlag,
    consumeReturnMode,
    hasAccess,
    isLinkMode,
    isLineLinkMode,
    linkSheetCheckComplete,
    linkSheetId,
    managementBootstrapReady,
    readCachedState,
    readExpenseTicketLinkReturnState,
    restoreDeleteReturnState,
    restoreInitialLinkModeState,
    restoreInitialStandardState,
    restoreLinkModeReturnState,
    restoreStandardReturnState,
    targetLineRecId,
  ]);

  useEffect(() => {
    if (isLoading) return;
    if (pendingScrollRestoreRef.current == null && !pendingFocusFileIdRef.current) return;

    const pendingScrollY = pendingScrollRestoreRef.current;
    const pendingFocusFileId = pendingFocusFileIdRef.current;
    pendingScrollRestoreRef.current = null;
    pendingFocusFileIdRef.current = "";

    window.requestAnimationFrame(() => {
      if (pendingScrollY != null) {
        window.scrollTo({
          top: Math.max(0, pendingScrollY),
          behavior: "auto",
        });
      }

      if (!pendingFocusFileId || !timelineContainerRef.current) return;

      const normalizedFocusId = pendingFocusFileId.toUpperCase();
      const timelineItems = Array.from(
        timelineContainerRef.current.querySelectorAll<HTMLElement>(".timeline-item[data-ticket-file-id]")
      );
      const matchingItem = timelineItems.find((item) => {
        return safeText(item.dataset.ticketFileId).toUpperCase() === normalizedFocusId;
      });
      const targetCard = matchingItem?.querySelector<HTMLElement>(".timeline-card--clickable");
      if (!targetCard) return;

      targetCard.focus({ preventScroll: true });
    });
  }, [isLoading, items.length]);

  useEffect(() => {
    if (!managementBootstrapReady || !hasAccess) return;

    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted && !isExpenseHistoryBackForwardNavigation()) return;

      const snapshot = resolveActiveFiltersEvent();
      if (!isLinkMode && (!snapshot.fromDate || !snapshot.toDate)) {
        return;
      }

      runAutomaticListLoad(currentPage < 1 ? 1 : currentPage, snapshot, {
        clearCache: true,
      });
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [currentPage, hasAccess, isLinkMode, managementBootstrapReady, runAutomaticListLoad]);

  useEffect(() => {
    const onToggleFilters = () => {
      const willOpen = !showFilters;
      toggleFilterPanel();
      if (willOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const onRefresh = () => {
      const snapshot = resolveActiveFiltersEvent();
      if (!isLinkMode && (!snapshot?.fromDate || !snapshot?.toDate)) {
        return;
      }
      void loadList(currentPage < 1 ? 1 : currentPage, snapshot);
    };

    window.addEventListener("expense-tickets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-tickets-refresh", onRefresh);

    return () => {
      window.removeEventListener("expense-tickets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-tickets-refresh", onRefresh);
    };
  }, [currentPage, isLinkMode, loadList, showFilters, toggleFilterPanel]);

  return (
    <div className="space-y-2">
      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        confirmText={modalConfirmText}
        cancelText={modalCancelText}
        loadingText={modalLoadingText}
        showCancel={modal.showCancel}
        showConfirm={modal.showConfirm}
        busy={linkFlowBusy}
        error={linkFlowError}
        status={linkFlowStatus}
        onConfirm={handleModalButtonConfirm}
        onCancel={closeConfirm}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept={TICKET_IMAGE_ACCEPT_ATTRIBUTE}
        capture="environment"
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "camera");
        }}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept={TICKET_IMAGE_ACCEPT_ATTRIBUTE}
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "gallery");
        }}
      />

      {!isLinkMode && sourcePickerOpen ? (
        <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6">
          <div className="w-full max-w-sm rounded-[var(--radius-xl)] border border-slate-200 bg-white p-4 shadow-xl">
            <h3 className="text-[16px] font-semibold text-slate-800">
              {indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket")}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {indT(
                "ExpenseSheets_NewTicket_Source_Body",
                "Selecciona una fuente para capturar o elegir la imagen del ticket."
              )}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <button
                type="button"
                className="ind-action-btn w-full px-3 py-2 text-sm"
                onClick={() => {
                  void selectFromCamera(cameraInputRef.current);
                }}
              >
                {indT("ExpenseSheets_NewTicket_Source_Camera", "Usar cámara")}
              </button>
              <button
                type="button"
                className="ind-action-btn w-full px-3 py-2 text-sm"
                onClick={() => selectFromGallery(galleryInputRef.current)}
              >
                {indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen")}
              </button>
              <button
                type="button"
                className="ind-action-btn w-full px-3 py-2 text-sm"
                onClick={closeSourcePicker}
              >
                {indT("Common_Cancel", "Cancel")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {!isLinkMode ? (
        <ExpenseQuickTicketProgressOverlay
          open={quickTicketBusy}
          title={indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket")}
          summary={quickTicketProgressMessage || indT("Common_Loading", "Loading")}
          elapsedMs={quickTicketElapsedMs}
          stages={quickTicketProgressStages}
        />
      ) : null}

      {!isLinkMode && quickTicketErrorMessage ? (
        <div
          data-ind-action-feedback="page"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          tabIndex={-1}
          className={
            hasPartialTicketFailure
              ? "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
              : "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"
          }
        >
          <p>{quickTicketErrorMessage}</p>
          {quickTicketAttemptId ? (
            <p
              className={
                hasPartialTicketFailure
                  ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white px-2 py-1 font-mono text-[11px] text-amber-900 break-all"
                  : "rounded-[var(--radius-xl)] border border-rose-200 bg-white px-2 py-1 font-mono text-[11px] text-rose-800 break-all"
              }
            >
              {`attemptId: ${quickTicketAttemptId}`}
            </p>
          ) : null}
          {quickTicketTraceList.length > 0 ? (
            <div
              className={
                hasPartialTicketFailure
                  ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white p-2 text-xs text-amber-800"
                  : "rounded-[var(--radius-xl)] border border-rose-200 bg-white p-2 text-xs text-rose-700"
              }
            >
              {quickTicketTraceList.map((entry) => (
                <p key={`${entry.step}-${entry.at}`}>{`${entry.step}: ${entry.traceId}`}</p>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {hasPendingUploadRetry ? (
              <button
                type="button"
                className="ind-action-btn px-3 py-1.5 text-xs"
                onClick={() => {
                  void retryPendingUpload();
                }}
              >
                {indT("ExpenseSheets_NewTicket_RetryUpload", "Reintentar upload")}
              </button>
            ) : null}
            <button type="button" className="ind-action-btn px-3 py-1.5 text-xs" onClick={clearQuickTicketError}>
              {indT("Common_Close", "Close")}
            </button>
          </div>
        </div>
      ) : null}

      {showSummary ? (
        <div className="filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3">
          <div className="expense-summary-grid grid grid-cols-1 min-[360px]:grid-cols-2 items-start gap-x-4 gap-y-1 text-xs">
            {summaryItems.map((item) => (
              <div
                key={item.key}
                className="history-filter-summary history-filter-summary--grid-item leading-5 min-w-0"
              >
                <span className="history-filter-summary__label font-semibold">{item.label}:</span>
                <span className="history-filter-summary__value break-words">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <ExpenseTicketsFiltersPanel
        mode={isLinkMode ? "link" : "general"}
        visible={showFilters}
        showManualDateFilter={showManualDateFilter}
        manualDateAutoOpenKey={manualDateAutoOpenKey}
        fromDate={fromDate}
        toDate={toDate}
        filterKey={filterKey}
        currencyCode={currencyCode}
        managedUserId={managedUserId}
        managedUsers={managedUsers}
        currentAxUserId={currentAxUserId}
        currentUserName={currentUserName}
        showManagedUserFilter={showManagedUserFilter}
        statusFilter={statusFilter}
        gastoTypeFilter={gastoTypeFilter}
        processedByIaFilter={processedByIaFilter}
        activeQuickFilter={activeQuickFilter}
        showManualDateError={showManualDateError}
        statusFilterReadOnly={statusFilterLocked}
        fixedStatusFilter={fixedStatusFilter}
        gastoTypeOptions={gastoTypeOptions}
        onDateRangeChange={onDateRangeChange}
        onManualRangeComplete={onManualRangeComplete}
        onQuickFilterChange={onQuickFilterChange}
        onFilterKeyChange={setFilterKey}
        onCurrencyCodeChange={setCurrencyCode}
        onManagedUserIdChange={setManagedUserId}
        onStatusFilterChange={setStatusFilter}
        onGastoTypeFilterChange={setGastoTypeFilter}
        onProcessedByIaFilterChange={setProcessedByIaFilter}
        onClear={onClear}
        onApply={onApply}
      />

      {isLinkMode ? (
        <div className="space-y-2 px-0.5">
          {!canProcessLinkMode ? (
            <div className="text-sm text-rose-700">{indT("Auth_PermissionDenied_Body", "No permission.")}</div>
          ) : null}

          {canProcessLinkMode && linkSheetCheckBusy ? (
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Spinner size="h-4 w-4" label={indT("Common_Loading", "Loading")} />
              <span>{indT("Common_Loading", "Loading")}</span>
            </div>
          ) : null}

          {canProcessLinkMode && !isLineLinkMode && !linkSheetCheckBusy && selectAllBusy ? (
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Spinner size="h-4 w-4" label={indT("Common_Loading", "Loading")} />
              <span>{indT("Common_Loading", "Loading")}</span>
            </div>
          ) : null}

          {canProcessLinkMode && !linkSheetCheckBusy && linkFlowLocked ? (
            <div className="text-sm text-rose-700">
              {linkFlowBlockedMessage ||
                indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.")}
            </div>
          ) : null}

          {canProcessLinkMode && !isLineLinkMode && !linkSheetCheckBusy && !linkFlowLocked && selectAllError ? (
            <div className="text-sm text-rose-700">{selectAllError}</div>
          ) : null}

          {canProcessLinkMode && !isLineLinkMode && !linkSheetCheckBusy && !linkFlowLocked ? (
            <>
              <div className="mb-5 grid grid-cols-2 gap-1.5 pt-0.5 sm:mb-6">
                <button
                  type="button"
                  className="ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs"
                  onClick={() => {
                    void selectAllMatchingTickets();
                  }}
                  disabled={linkModeSelectionButtonsDisabled || total < 1}
                >
                  {indT("ExpenseTickets_LinkMode_SelectAll", "Seleccionar todo")}
                </button>
                <button
                  type="button"
                  className="ind-action-btn w-full min-w-0 px-1.5 py-1 text-[10px] leading-tight sm:text-xs"
                  onClick={clearTicketSelection}
                  disabled={linkModeSelectionButtonsDisabled || selectedTicketCount < 1}
                >
                  {indT("ExpenseTickets_LinkMode_ClearAll", "Borrar selección")}
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {isLinkMode && !isLineLinkMode ? <ExpenseTicketLinkBulkSummary result={linkBulkResult} /> : null}

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: showListLoading ? "flex" : "none" }}
      >
        <svg className="ind-spinner size-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>

      {errorMessage ? <div className="text-danger">{errorMessage}</div> : null}

      {!showListLoading && !errorMessage && items.length === 0 ? (
        <div className="timeline-box timeline-empty" data-empty-text={indT("Common_NoData", "No data")} />
      ) : null}

      {!errorMessage && items.length > 0 ? (
        <div ref={timelineContainerRef} className="timeline-box">
          {items.map((item) => {
            const fileId = safeText(item.fileId);
            const dateParts = formatExpenseDateParts(item.transDate, pageLocale);
            const description = normalizeCardTitleText(item.description, "");
            const title = description || safeText(item.fileName) || fileId || "-";
            const amountText = formatAmountWithCurrency(item.totalAmount ?? null, reimbursementCurrencyCode);
            const statusCode = item.kind === "general" ? item.status : null;
            const statusLabel = statusCode === null ? undefined : getExpenseTicketStatusLabel(statusCode);
            const isAssignedToExpenseSheet = statusCode === 1;
            const showProcessedByAiIcon = item.processedByAI === true;
            const isSelectableInLinkMode = isLinkMode && canSelectTicketForLink(item);
            const isSelectedInLinkMode = isLinkMode && isLinkTicketSelected(fileId);
            const processedByAiLabel = indT("Tickets_Filter_ProcessedByIA", "Processed by IA");
            const selectTicketLabel = indT("ExpenseTickets_LinkMode_SelectTicket", "Seleccionar ticket");
            const gastoTypeCode = item.gastoType === null ? "" : String(item.gastoType);
            const gastoTypeLabel = gastoTypeCode
              ? gastoTypeLabelMap.get(gastoTypeCode) || gastoTypeCode
              : indT("Common_NotAvailable", "N/A");
            const cardSubtitle = gastoTypeLabel;
            const ticketCardKey =
              fileId ||
              `${safeText(item.fileName)}-${safeText(item.transDate)}-${safeText(item.description)}-${String(item.totalAmount ?? "")}`;

            if (isLinkMode && item.kind === "link") {
              return (
                <ExpenseTicketLinkTimelineItem
                  key={ticketCardKey}
                  fileId={fileId}
                  dateParts={dateParts}
                  title={title}
                  subtitle={cardSubtitle}
                  amountText={amountText}
                  isSelected={isSelectedInLinkMode}
                  isSelectable={isSelectableInLinkMode}
                  selectionDisabled={linkFlowBusy || linkSheetCheckBusy || linkFlowLocked}
                  selectLabel={selectTicketLabel}
                  onOpenDetail={() => openTicketDetail(fileId)}
                  onToggleSelect={() => toggleTicketSelection(item)}
                />
              );
            }

            const baseStatusIcons = isAssignedToExpenseSheet || showProcessedByAiIcon ? (
              <>
                {isAssignedToExpenseSheet ? (
                  <span className="expense-ticket-card__status-icon" role="img" aria-label={statusLabel}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                      />
                    </svg>
                  </span>
                ) : null}
                {showProcessedByAiIcon ? (
                  <span
                    className="expense-ticket-card__status-icon expense-ticket-card__status-icon--ai"
                    role="img"
                    aria-label={processedByAiLabel}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 18l4-12l4 12" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 13h4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 6h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 6v12" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 18h6" />
                    </svg>
                  </span>
                ) : null}
              </>
            ) : null;

            return (
              <div
                key={ticketCardKey}
                className="timeline-item"
                data-ticket-file-id={fileId || undefined}
              >
                <ExpenseTimelineCard
                  dateParts={dateParts}
                  title={title}
                  subtitle={cardSubtitle}
                  amountText={amountText}
                  onOpen={() => openTicketDetail(fileId)}
                  titleClassName="expense-ticket-card__title timeline-name"
                  statusLabel={statusLabel}
                  statusIcon={baseStatusIcons}
                  statusIconClassName="expense-ticket-card__status-icons"
                />
              </div>
            );
          })}
        </div>
      ) : null}

      <CompactPagination
        totalPages={totalPages}
        currentPage={currentPage}
        loading={isLoading}
        onPageChange={(page) => {
          const snapshot = resolveActiveFilters();
          if (!isLinkMode && (!snapshot?.fromDate || !snapshot?.toDate)) {
            return;
          }

          void loadList(page, snapshot);
        }}
        labels={paginationLabels}
      />

      {isLinkMode && canProcessLinkMode && !linkSheetCheckBusy && !linkFlowLocked ? (
        <PageBottomActions
          ariaLabel={
            isLineLinkMode
              ? indT("ExpenseTickets_LinkLine_AttachButton", "Attach existing ticket")
              : indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)")
          }
        >
          <PageBottomActionButton
            label={
              isLineLinkMode
                ? indT("ExpenseTickets_LinkLine_AttachButton", "Attach existing ticket")
                : indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)")
            }
            onClick={openLinkConfirmModal}
            disabled={
              linkFlowBusy ||
              selectAllBusy ||
              (isLineLinkMode ? selectedTicketCount !== 1 : selectedTicketCount < 1)
            }
          />
        </PageBottomActions>
      ) : null}

      {canCreateTicket && !isLinkMode ? (
        <FloatingActionButton
          ariaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rápidas")}
          size={76}
          right={16}
          bottom={24}
          menuAriaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rápidas")}
          menuItems={fabMenuItems}
        />
      ) : null}
    </div>
  );
};

// Main page entry for expense tickets list.
const ExpenseTicketsPage = () => {
  return (
    <VisitasPageProviders enableExpenseManagement>
      <ExpenseTicketsPageContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-tickets-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseTicketsPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseTicketsPage;
