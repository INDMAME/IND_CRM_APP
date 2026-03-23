import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
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
  linkExpenseSheetTicketsBulk,
} from "../utils/expenseApi.ts";
import { clearExpenseActingUserOverride, setExpenseActingUserOverride } from "../utils/expenseActingUser.ts";
import { toExpenseIsoDate } from "../utils/expenseApiDateUtils.ts";
import { clearExpenseNavigationGuard, navigateToExpenseUrl, setExpenseNavigationGuard } from "../utils/expenseNavigation.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import {
  buildExpenseSheetDetailUrl,
  clearExpenseTicketReturnContext,
  saveExpenseTicketReturnContext,
} from "../utils/expenseTicketReturnContext.ts";
import { hasExpenseReturnReferrer, isExpenseHistoryBackForwardNavigation } from "../utils/expenseHistoryNavigation.ts";
import { formatExpenseDateParts, formatExpenseDisplayDate, safeText, startOfDay, toIsoDate } from "../utils/expenseUiUtils.ts";
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
import { setTopbarActionGroupReady as revealTopbarActionGroup } from "../../../utils/topbarActionVisibility.ts";

const PAGE_SIZE = 10;
const ALLOWED_GASTO_TYPES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);

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

const normalizeUserId = (value: unknown): string => String(value || "").trim();

const isSameUser = (left: string, right: string): boolean => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

const ensureCurrentUserInList = (users: AuthManagedUser[], currentAxUserId: string): AuthManagedUser[] => {
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  if (!normalizedCurrent) return users;
  if (users.some((entry) => isSameUser(entry.axUserId, normalizedCurrent))) return users;
  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrent,
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

const buildLinkModeInitialSnapshot = (managedUserId = ""): ExpenseTicketAppliedFilterSnapshot => {
  const today = startOfDay(new Date());
  const fromDate = new Date(today);
  // Keep automatic link-mode load bounded to avoid heavy upstream scans.
  fromDate.setDate(today.getDate() - 29);

  return {
    fromDate: toIsoDate(fromDate),
    toDate: toIsoDate(today),
    filterKey: "",
    currencyCode: "",
    managedUserId: normalizeUserId(managedUserId),
    statusFilter: 0,
    gastoTypeFilter: "",
    processedByIaFilter: "all",
  };
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

// Keeps created-ticket return filters bound to one valid list date.
const resolveCreatedTicketFilterDate = (value: unknown): string => {
  return toExpenseIsoDate(value) || toExpenseIsoDate(new Date());
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

const buildFallbackGastoTypeOptions = (): ExpenseSelectOption[] => {
  return Object.entries(GASTO_TYPE_LABEL_KEYS)
    .map(([code, cfg]) => ({
      value: String(code),
      text: indT(cfg.key, cfg.fallback),
    }))
    .sort((left, right) => Number(left.value) - Number(right.value));
};

const NewTicketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-6 w-6">
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
  const {
    currentAxUserId,
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
    const isLinkMode = action === "link" && !!hojaGastosId;
    return {
      isLinkMode,
      sheetId: hojaGastosId,
      sheetOrigin: isLinkMode ? ("sheet-link" as const) : (!!hojaGastosId ? ("sheet-create" as const) : null),
      fixedStatusFilter: isLinkMode ? (0 as const) : null,
    };
  }, []);

  const isLinkMode = linkModeContext.isLinkMode;
  const linkSheetId = linkModeContext.sheetId;
  const sheetCallerOrigin = linkModeContext.sheetOrigin;
  const hasSheetCallerContext = !!linkSheetId && !!sheetCallerOrigin;
  const fixedStatusFilter = linkModeContext.fixedStatusFilter;
  const canProcessLinkMode = !isLinkMode || canLinkSheetLines;
  const managedUsers = useMemo(
    () => ensureCurrentUserInList(Array.isArray(subordinates) ? subordinates : [], currentAxUserId),
    [currentAxUserId, subordinates]
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

      const fallback = buildLinkModeInitialSnapshot(snapshot.managedUserId);
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
  const { runAutomaticListLoad } = useExpenseTicketAutomaticLoad({
    isLinkMode,
    canProcessLinkMode,
    linkSheetCheckBusy,
    linkSheetLocked,
    clearListCache,
    resetList,
    loadList,
  });
  const buildInitialLinkModeSnapshot = useCallback(() => {
    const initialManagedUserId = syncManagedUserSelection(defaultManagedUserId);
    return buildLinkModeInitialSnapshot(initialManagedUserId);
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
    openCreatedTicket,
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

  const selectedTicketCount = resolveSelectedCount(total);
  const selectedTotalAmount = useMemo(() => {
    return selectedTickets.reduce((sum, item) => {
      const amount = Number(item.totalAmount ?? 0);
      return amount > 0 ? sum + amount : sum;
    }, 0);
  }, [selectedTickets]);
  const selectedTotalAmountText = useMemo(() => formatAmountWithCurrency(selectedTotalAmount, ""), [selectedTotalAmount]);
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
      const ticketDate = resolveCreatedTicketFilterDate(ticketDateValue);
      const createdTicketManagedUserId = normalizeUserId(currentAxUserId);
      const resolvedManagedUserId = createdTicketManagedUserId
        ? syncManagedUserSelection(createdTicketManagedUserId)
        : "";

      const querySnapshot: ExpenseTicketAppliedFilterSnapshot = {
        fromDate: ticketDate,
        toDate: ticketDate,
        filterKey: ticketFileId,
        currencyCode: "",
        managedUserId: resolvedManagedUserId,
        statusFilter: "",
        gastoTypeFilter: "",
        processedByIaFilter: "all",
      };

      logExpenseTicketsInfo("applyCreatedTicketReturn:start", {
        ticketFileId,
        ticketDateValue,
        ticketDate,
        currentAxUserId,
        createdTicketManagedUserId,
        resolvedManagedUserId,
        querySnapshot,
      });

      clearCachedState();
      restoreAppliedFilters(querySnapshot);
      pendingFocusFileIdRef.current = ticketFileId;
      clearListCache();
      resetList("created-ticket-return");
      logExpenseTicketsInfo("applyCreatedTicketReturn:loadList", {
        page: 1,
        querySnapshot,
      });
      void loadList(1, querySnapshot);

      const url = new URL(window.location.href);
      url.searchParams.delete("ticketFileId");
      url.searchParams.delete("ticketDate");
      const cleanedQuery = url.searchParams.toString();
      window.history.replaceState({}, "", cleanedQuery ? `${url.pathname}?${cleanedQuery}` : url.pathname);
    },
    [
      clearCachedState,
      clearListCache,
      currentAxUserId,
      loadList,
      resetList,
      restoreAppliedFilters,
      syncManagedUserSelection,
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
        selectionMode: cachedState.selectionMode,
        selectedTickets: cachedState.selectedTickets,
        excludedIds: cachedState.excludedIds,
        filteredSnapshot: cachedState.filteredSelectionFilters,
        filteredTotalCount: cachedState.filteredSelectionTotal,
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
      if (!isLinkMode || !canProcessLinkMode || linkSheetCheckBusy || linkSheetLocked || linkFlowBusy) return;
      if (ticket.kind !== "link") return;

      const fileId = safeText(ticket.fileId);
      if (!fileId) return;
      if (!canSelectTicketForLink(ticket)) return;

      setLinkBulkResult(null);
      toggleLinkTicketSelection(ticket);
    },
    [canProcessLinkMode, isLinkMode, linkFlowBusy, linkSheetCheckBusy, linkSheetLocked, toggleLinkTicketSelection]
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

  // Activates backend-driven filtered selection for the current filter snapshot.
  const selectAllMatchingTickets = useCallback(async () => {
    if (!isLinkMode || !canProcessLinkMode || linkSheetCheckBusy || linkSheetLocked || linkFlowBusy || selectAllBusy) {
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
    isLinkMode,
    linkFlowBusy,
    linkSheetCheckBusy,
    linkSheetLocked,
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
    if (linkSheetLocked || !canProcessLinkMode) {
      const blockedMessage =
        linkSheetBlockedMessage ||
        indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
      setLinkFlowError(blockedMessage);
      setLinkFlowStatus(blockedMessage);
      flashActionMark("errorProcess", 1500);
      return false;
    }

    const selectedCount = resolveSelectedCount(total);
    if (selectedCount < 1) {
      return false;
    }

    const activeFilters = resolveActiveFilters();
    const requestAxUserId = safeText(activeFilters.managedUserId || currentAxUserId);

    setLinkFlowBusy(true);
    setLinkFlowError("");
    setLinkBulkResult(null);
    setLinkFlowStatus(indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line..."));

    try {
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
              ticketIds: selectedTickets.map((item) => safeText(item.fileId)).filter(Boolean),
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

      await loadList(currentPage < 1 ? 1 : currentPage, activeFilters);

      if (result.failedCount > 0 && result.linkedCount < 1) {
        const failureMessage = response.Message || indT("Api_RequestFailed", "Request failed.");
        setLinkFlowStatus(failureMessage);
        flashActionMark("errorProcess", 1500);
        return true;
      }

      if (result.failedCount > 0 || result.skippedCount > 0) {
        setLinkFlowStatus(response.Message || indT("Common_OK", "OK"));
        flashActionMark("warningProcess", 1500);
        return true;
      }

      setLinkFlowStatus(response.Message || indT("Common_OK", "OK"));
      flashActionMark("okProcess", 1200);
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
    buildExpenseSheetDetailUrl,
    canProcessLinkMode,
    clearCachedState,
    clearTicketSelection,
    currentPage,
    currentAxUserId,
    excludedIds,
    filteredSnapshot,
    isLinkMode,
    isFilteredSelectionActive,
    linkFlowBusy,
    linkSheetId,
    linkSheetBlockedMessage,
    linkSheetLocked,
    loadList,
    resolveActiveFilters,
    resolveSelectedCount,
    selectedTickets,
    total,
  ]);

  const openLinkConfirmModal = useCallback(() => {
    if (!isLinkMode || selectedTicketCount < 1 || linkFlowBusy || linkSheetCheckBusy || linkSheetLocked) {
      return;
    }

    setLinkFlowError("");
    setLinkFlowStatus("");
    openConfirm({
      title: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
      message: isFilteredSelectionActive
        ? `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}`
        : `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}\n${indT("ExpenseSheets_Field_TotalAmount", "Total amount")}: ${selectedTotalAmountText}`,
      confirmText: indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)"),
      cancelText: indT("Confirm_No", "Cancel"),
      onConfirm: async () => {
        return runTicketLinkFlow();
      },
    });
  }, [
    isLinkMode,
    selectedTicketCount,
    linkFlowBusy,
    linkSheetCheckBusy,
    linkSheetLocked,
    isFilteredSelectionActive,
    openConfirm,
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
        selectionMode,
        excludedIds,
        filteredSelectionFilters: filteredSnapshot,
        filteredSelectionTotal: filteredTotalCount,
      };

      if (isLinkMode) {
        saveCachedState(currentState);
        saveExpenseTicketLinkReturnState({
          sheetId: linkSheetId,
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
        if (hasSheetCallerContext && sheetCallerOrigin) {
          saveExpenseTicketReturnContext({
            fileId,
            sheetId: linkSheetId,
            origin: sheetCallerOrigin,
          });
          query.set("origin", sheetCallerOrigin);
          query.set("sheetId", linkSheetId);
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
      isLinkMode,
      items,
      filteredTotalCount,
      filteredSnapshot,
      excludedIds,
      sheetCallerOrigin,
      saveCachedState,
      saveExpenseTicketLinkReturnState,
      selectedTickets,
      selectionMode,
      total,
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

  const summaryItems = useMemo(() => {
    const snapshot = appliedFilters;
    if (!snapshot) return [] as Array<{ key: string; label: string; value: string }>;

    const summary: Array<{ key: string; label: string; value: string }> = [];
    const locale = document?.documentElement?.lang || "es-ES";
    const fromDateText = formatExpenseDisplayDate(snapshot.fromDate, locale, "");
    const toDateText = formatExpenseDisplayDate(snapshot.toDate, locale, "");

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
  }, [appliedFilters, gastoTypeLabelMap]);

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
      if (cachedState && cachedSheetId && cachedSheetId === safeText(linkSheetId)) {
        logExpenseTicketsInfo("mountRestoreEffect:restore-link-mode-cache", {
          cachedSheetId,
          page: cachedState.page,
        });
        clearExpenseTicketLinkReturnState();
        restoreLinkModeReturnState(cachedState);
        return;
      }

      const linkReturnState = isReturningFromDetail ? readExpenseTicketLinkReturnState(linkSheetId) : null;
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
      logExpenseTicketsInfo("mountRestoreEffect:clear-cache-no-return-context");
      clearCachedState();
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
    linkSheetId,
    managementBootstrapReady,
    readCachedState,
    readExpenseTicketLinkReturnState,
    restoreDeleteReturnState,
    restoreInitialLinkModeState,
    restoreLinkModeReturnState,
    restoreStandardReturnState,
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

      const snapshot = resolveActiveFilters();
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
  }, [currentPage, hasAccess, isLinkMode, managementBootstrapReady, resolveActiveFilters, runAutomaticListLoad]);

  useEffect(() => {
    const onToggleFilters = () => {
      const willOpen = !showFilters;
      toggleFilterPanel();
      if (willOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const onRefresh = () => {
      const snapshot = resolveActiveFilters();
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
  }, [currentPage, isLinkMode, loadList, resolveActiveFilters, showFilters, toggleFilterPanel]);

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
            {hasPartialTicketFailure ? (
              <button type="button" className="ind-action-btn px-3 py-1.5 text-xs" onClick={openCreatedTicket}>
                {indT("ExpenseSheets_NewTicket_OpenCreatedTicket", "Open created ticket")}
              </button>
            ) : null}
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

          {canProcessLinkMode && !linkSheetCheckBusy && selectAllBusy ? (
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Spinner size="h-4 w-4" label={indT("Common_Loading", "Loading")} />
              <span>{indT("Common_Loading", "Loading")}</span>
            </div>
          ) : null}

          {canProcessLinkMode && !linkSheetCheckBusy && linkSheetLocked ? (
            <div className="text-sm text-rose-700">
              {linkSheetBlockedMessage ||
                indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.")}
            </div>
          ) : null}

          {canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked && selectAllError ? (
            <div className="text-sm text-rose-700">{selectAllError}</div>
          ) : null}

          {canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? (
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

      {isLinkMode ? <ExpenseTicketLinkBulkSummary result={linkBulkResult} /> : null}

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: showListLoading ? "flex" : "none" }}
      >
        <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
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
            const dateParts = formatExpenseDateParts(item.transDate, document?.documentElement?.lang || "es-ES");
            const title = safeText(item.description) || safeText(item.fileName) || fileId || "-";
            const amountText = formatAmountWithCurrency(item.totalAmount ?? null, safeText(item.currencyCode));
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
                  selectionDisabled={linkFlowBusy || linkSheetCheckBusy || linkSheetLocked}
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
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

      {isLinkMode && canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? (
        <PageBottomActions ariaLabel={indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)")}>
          <PageBottomActionButton
            label={indT("ExpenseTickets_LinkMode_LinkButton", "Vincular ticket(s)")}
            onClick={openLinkConfirmModal}
            disabled={linkFlowBusy || selectAllBusy || selectedTicketCount < 1}
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
