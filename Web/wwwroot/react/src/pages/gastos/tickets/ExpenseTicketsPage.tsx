import React, { useCallback, useEffect, useMemo, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import FloatingActionButton, { type FloatingActionButtonMenuItem } from "../../../components/commons/FloatingActionButton.tsx";
import Spinner from "../../../components/commons/Spinner.tsx";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { flashActionMark } from "../../../utils/visitasHistory.ts";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import ExpenseTimelineCard from "../components/ExpenseTimelineCard.tsx";
import ExpenseTicketsFiltersPanel from "../components/ExpenseTicketsFiltersPanel.tsx";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import { getExpenseTicketStatusLabel } from "../constants/expenseTicketStatusCatalog.ts";
import { createExpenseSheet, configureExpenseApiAuth, fetchExpenseSheetDetail, fetchExpenseSheetTicketsList } from "../utils/expenseApi.ts";
import { toExpenseApiDdMmYyyy } from "../utils/expenseApiDateUtils.ts";
import { navigateToExpenseUrl } from "../utils/expenseNavigation.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import { formatExpenseDateParts, formatExpenseDisplayDate, safeText } from "../utils/expenseUiUtils.ts";
import { useExpenseSheetQuickTicketFlow } from "../detail/useExpenseSheetQuickTicketFlow.ts";
import { useExpenseTicketsFiltersState } from "./useExpenseTicketsFiltersState.ts";
import { useExpenseTicketsListData } from "./useExpenseTicketsListData.ts";
import { useExpenseTicketsFilterCache } from "./useExpenseTicketsFilterCache.ts";
import type { ExpenseSheetCreateLineRequest } from "../expenseTypes.ts";
import type { ExpenseTicketAppliedFilterSnapshot, ExpenseTicketCard } from "./expenseTicketListTypes.ts";

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

const EXPENSE_STATUS_APPROVED = 2;
const EXPENSE_STATUS_PAID = 4;

const buildLinkModeInitialSnapshot = (): ExpenseTicketAppliedFilterSnapshot => {
  return {
    fromDate: "",
    toDate: "",
    filterKey: "",
    currencyCode: "",
    statusFilter: 0,
    gastoTypeFilter: "",
    processedByIaFilter: "all",
  };
};

// Validates whether one ticket card can be linked to an expense sheet line.
const canSelectTicketForLink = (item: ExpenseTicketCard): boolean => {
  const fileId = safeText(item.fileId);
  if (!fileId) return false;
  if (item.status !== 0) return false;

  const totalAmount = Number(item.totalAmount ?? 0);
  if (!(totalAmount > 0)) return false;

  const gastoType = Number(item.gastoType);
  return Number.isInteger(gastoType) && gastoType > 0;
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
  const timelineContainerRef = React.useRef<HTMLDivElement | null>(null);
  const cameraInputRef = React.useRef<HTMLInputElement | null>(null);
  const galleryInputRef = React.useRef<HTMLInputElement | null>(null);
  const didRestoreOnMountRef = React.useRef(false);
  const didApplyQueryFilterRef = React.useRef(false);
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
      fixedStatusFilter: isLinkMode ? (0 as const) : null,
    };
  }, []);

  const isLinkMode = linkModeContext.isLinkMode;
  const linkSheetId = linkModeContext.sheetId;
  const fixedStatusFilter = linkModeContext.fixedStatusFilter;
  const canProcessLinkMode = !isLinkMode || canLinkSheetLines;

  const [linkSheetLocked, setLinkSheetLocked] = useState(false);
  const [linkSheetCheckBusy, setLinkSheetCheckBusy] = useState(false);
  const [linkFlowBusy, setLinkFlowBusy] = useState(false);
  const [linkFlowStatus, setLinkFlowStatus] = useState("");
  const [linkFlowError, setLinkFlowError] = useState("");
  const [selectedTicketsById, setSelectedTicketsById] = useState<Record<string, ExpenseTicketCard>>({});

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
  } = useExpenseTicketsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    onForbidden: showPermissionModal,
  });
  const { readCachedState, consumeReturnFlag, saveCachedState, clearCachedState } = useExpenseTicketsFilterCache();

  const {
    fromDate,
    toDate,
    filterKey,
    currencyCode,
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
    fixedStatusFilter,
    allowEmptyDatesOnApply: isLinkMode,
    onApplyFilters: (snapshot) => {
      void loadList(1, snapshot);
    },
    onClearFilters: () => {
      clearCachedState();
      resetList();
    },
  });

  const {
    sourcePickerOpen,
    busy: quickTicketBusy,
    progressMessage: quickTicketProgressMessage,
    errorMessage: quickTicketErrorMessage,
    hasPendingUploadRetry,
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
    currencyCode: currencyCode || "EUR",
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) return;
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(createdFileId)}&mode=edit`, {
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

  const selectedTicketList = useMemo(() => Object.values(selectedTicketsById), [selectedTicketsById]);
  const selectedTicketCount = selectedTicketList.length;
  const selectedTotalAmount = useMemo(() => {
    return selectedTicketList.reduce((sum, item) => {
      const amount = Number(item.totalAmount ?? 0);
      return amount > 0 ? sum + amount : sum;
    }, 0);
  }, [selectedTicketList]);
  const selectedTotalAmountText = useMemo(() => formatAmountWithCurrency(selectedTotalAmount, ""), [selectedTotalAmount]);
  const selectableVisibleTickets = useMemo(() => {
    return items.filter((item) => canSelectTicketForLink(item));
  }, [items]);
  const visibleSelectableCount = selectableVisibleTickets.length;

  const setFilteredSelectedTickets = useCallback((predicate: (entry: ExpenseTicketCard) => boolean) => {
    setSelectedTicketsById((previous) => {
      const next: Record<string, ExpenseTicketCard> = {};
      for (const [fileId, item] of Object.entries(previous)) {
        if (predicate(item)) {
          next[fileId] = item;
        }
      }
      return next;
    });
  }, []);

  const isTicketSelected = useCallback(
    (fileId: string) => {
      const safeFileId = safeText(fileId);
      return !!safeFileId && !!selectedTicketsById[safeFileId];
    },
    [selectedTicketsById]
  );

  const toggleTicketSelection = useCallback(
    (ticket: ExpenseTicketCard) => {
      if (!isLinkMode || !canProcessLinkMode || linkSheetCheckBusy || linkSheetLocked || linkFlowBusy) return;

      const fileId = safeText(ticket.fileId);
      if (!fileId) return;
      if (!canSelectTicketForLink(ticket)) return;

      setSelectedTicketsById((previous) => {
        const next = { ...previous };
        if (next[fileId]) {
          delete next[fileId];
          return next;
        }
        next[fileId] = ticket;
        return next;
      });
    },
    [canProcessLinkMode, isLinkMode, linkFlowBusy, linkSheetCheckBusy, linkSheetLocked]
  );

  const clearTicketSelection = useCallback(() => {
    setSelectedTicketsById({});
  }, []);

  const selectVisibleTickets = useCallback(() => {
    if (visibleSelectableCount < 1) return;
    setSelectedTicketsById((previous) => {
      const next = { ...previous };
      for (const ticket of selectableVisibleTickets) {
        const fileId = safeText(ticket.fileId);
        if (!fileId) continue;
        next[fileId] = ticket;
      }
      return next;
    });
  }, [selectableVisibleTickets, visibleSelectableCount]);

  // Keeps selected card metadata fresh with the latest list payload.
  useEffect(() => {
    if (!isLinkMode || items.length < 1) return;
    setSelectedTicketsById((previous) => {
      let changed = false;
      const next = { ...previous };
      for (const item of items) {
        const fileId = safeText(item.fileId);
        if (!fileId || !next[fileId]) continue;
        next[fileId] = item;
        changed = true;
      }
      return changed ? next : previous;
    });
  }, [isLinkMode, items]);

  const resolveActiveFilters = useCallback((): ExpenseTicketAppliedFilterSnapshot => {
    const baseSnapshot = appliedFilters || currentFilters;
    if (!isLinkMode) return baseSnapshot;
    return {
      ...baseSnapshot,
      statusFilter: 0,
    };
  }, [appliedFilters, currentFilters, isLinkMode]);

  const buildExpenseLineFromTicket = useCallback(
    (ticket: ExpenseTicketCard): ExpenseSheetCreateLineRequest | null => {
      if (!canSelectTicketForLink(ticket)) return null;

      const fileId = safeText(ticket.fileId);
      const typeValue = Number(ticket.gastoType);
      const price = Number(ticket.totalAmount ?? 0);
      const transDate = toExpenseApiDdMmYyyy(ticket.transDate) || toExpenseApiDdMmYyyy(new Date());
      if (!fileId || !Number.isInteger(typeValue) || typeValue <= 0 || !(price > 0) || !transDate) {
        return null;
      }

      return {
        transDate,
        typeValue,
        description: safeText(ticket.description) || safeText(ticket.fileName) || indT("Tickets_Filter_FilterKey", "Ticket"),
        internacional: false,
        fileId,
        ticket: true,
        qty: 1,
        price,
      };
    },
    []
  );

  const revalidateLinkSelection = useCallback(async (candidateSelection: Record<string, ExpenseTicketCard>) => {
    const entries = Object.entries(candidateSelection);
    if (entries.length < 1) return {} as Record<string, ExpenseTicketCard>;

    const next: Record<string, ExpenseTicketCard> = {};
    for (const [fileId, ticket] of entries) {
      const safeFileId = safeText(fileId);
      if (!safeFileId || !canSelectTicketForLink(ticket)) {
        continue;
      }

      try {
        const response = await fetchExpenseSheetTicketsList(
          {
            page: 1,
            pageSize: 10,
            searchKey: safeFileId,
            filter: safeFileId,
            status: 0,
          },
          {
            suppressPermissionModal: true,
          }
        );
        const itemsRaw = Array.isArray(response?.Items) ? response.Items : [];
        const existsAsPending = itemsRaw.some((entry) => safeText((entry as { FileId?: unknown }).FileId).toUpperCase() === safeFileId.toUpperCase());
        if (existsAsPending) {
          next[safeFileId] = ticket;
        }
      } catch {
        // Keep candidate selection when validation endpoint is temporarily unavailable.
        next[safeFileId] = ticket;
      }
    }

    return next;
  }, []);

  const runTicketLinkFlow = useCallback(async () => {
    if (!isLinkMode || !linkSheetId || linkFlowBusy) {
      return false;
    }
    if (linkSheetLocked || !canProcessLinkMode) {
      setLinkFlowError(indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura."));
      setLinkFlowStatus(indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura."));
      flashActionMark("errorProcess", 1500);
      return false;
    }

    const selectedEntries = Object.entries(selectedTicketsById);
    if (selectedEntries.length < 1) {
      return false;
    }

    setLinkFlowBusy(true);
    setLinkFlowError("");
    setLinkFlowStatus(indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line..."));
    let successCount = 0;
    const failedSelection: Record<string, ExpenseTicketCard> = {};

    try {
      for (let index = 0; index < selectedEntries.length; index += 1) {
        const [fileId, ticket] = selectedEntries[index];
        const safeFileId = safeText(fileId);
        setLinkFlowStatus(
          `${indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line...")} ${index + 1}/${selectedEntries.length}`
        );

        const linePayload = buildExpenseLineFromTicket(ticket);
        if (!safeFileId || !linePayload) {
          failedSelection[safeFileId || fileId] = ticket;
          continue;
        }

        try {
          const response = await createExpenseSheet(
            {
              mode: 2,
              existingHojaGastosId: linkSheetId,
              lines: [linePayload],
            },
            {
              suppressPermissionModal: true,
            }
          );

          if (response.Success !== true) {
            failedSelection[safeFileId] = ticket;
            continue;
          }

          successCount += 1;
          setSelectedTicketsById((previous) => {
            if (!previous[safeFileId]) return previous;
            const next = { ...previous };
            delete next[safeFileId];
            return next;
          });
        } catch {
          failedSelection[safeFileId] = ticket;
        }
      }

      const snapshot = resolveActiveFilters();
      await loadList(currentPage < 1 ? 1 : currentPage, snapshot);
      const validatedFailures = await revalidateLinkSelection(failedSelection);
      setFilteredSelectedTickets((entry) => {
        const safeFileId = safeText(entry.fileId);
        return !!safeFileId && !!validatedFailures[safeFileId];
      });

      if (successCount === selectedEntries.length) {
        setLinkFlowStatus(indT("Common_OK", "OK"));
        flashActionMark("okProcess", 1200);
        return true;
      }

      if (successCount > 0) {
        const failedCount = selectedEntries.length - successCount;
        const partialMessage = `${indT("Api_RequestFailed", "Request failed.")} (${failedCount}/${selectedEntries.length})`;
        setLinkFlowError(partialMessage);
        setLinkFlowStatus(partialMessage);
        flashActionMark("warningProcess", 1500);
        return false;
      }

      const failureMessage = indT("Api_RequestFailed", "Request failed.");
      setLinkFlowError(failureMessage);
      setLinkFlowStatus(failureMessage);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setLinkFlowBusy(false);
    }
  }, [
    buildExpenseLineFromTicket,
    canProcessLinkMode,
    currentPage,
    isLinkMode,
    linkFlowBusy,
    linkSheetId,
    linkSheetLocked,
    loadList,
    revalidateLinkSelection,
    resolveActiveFilters,
    selectedTicketsById,
    setFilteredSelectedTickets,
  ]);

  const openLinkConfirmModal = useCallback(() => {
    if (!isLinkMode || selectedTicketCount < 1 || linkFlowBusy || linkSheetCheckBusy || linkSheetLocked) {
      return;
    }

    setLinkFlowError("");
    setLinkFlowStatus("");
    openConfirm({
      title: indT("ExpenseSheets_Fab_LinkTicket", "Vincular ticket"),
      message: `${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount}\n${indT("ExpenseSheets_Field_TotalAmount", "Total amount")}: ${selectedTotalAmountText}`,
      confirmText: indT("ExpenseSheets_Fab_LinkTicket", "Vincular ticket"),
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

      if (isLinkMode) {
        const selectedTicket = items.find((entry) => safeText(entry.fileId).toUpperCase() === fileId.toUpperCase());
        if (!selectedTicket) return;
        toggleTicketSelection(selectedTicket);
        return;
      }

      const snapshot = appliedFilters || currentFilters;
      saveCachedState({
        filters: snapshot,
        page: currentPage < 1 ? 1 : currentPage,
        scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0,
        focusFileId: fileId,
        items,
        total,
      });

      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}`, {
        askConfirmation: true,
        bypassGuardOnce: false,
      });
    },
    [appliedFilters, currentPage, currentFilters, isLinkMode, items, saveCachedState, toggleTicketSelection, total]
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

  const showSummary = !showFilters && summaryItems.length > 0;

  // Validates target sheet lock state before enabling link mode actions.
  useEffect(() => {
    if (!isLinkMode || !linkSheetId) {
      setLinkSheetLocked(false);
      setLinkSheetCheckBusy(false);
      return;
    }
    if (!canProcessLinkMode) {
      setLinkSheetLocked(true);
      setLinkSheetCheckBusy(false);
      return;
    }

    let cancelled = false;
    setLinkSheetCheckBusy(true);
    void (async () => {
      try {
        const response = await fetchExpenseSheetDetail(linkSheetId, {
          suppressPermissionModal: true,
        });
        if (cancelled) return;

        const headers = Array.isArray(response?.Items) ? response.Items : [];
        const header = (headers[0] || null) as { ExpenseSheetStatus?: unknown; Voucher?: unknown } | null;
        const statusCode = Number(header?.ExpenseSheetStatus ?? -1);
        const voucher = safeText(header?.Voucher);
        const isLocked = statusCode === EXPENSE_STATUS_APPROVED || statusCode === EXPENSE_STATUS_PAID || !!voucher;
        setLinkSheetLocked(isLocked);
      } catch {
        if (cancelled) return;
        setLinkSheetLocked(true);
      } finally {
        if (!cancelled) {
          setLinkSheetCheckBusy(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [canProcessLinkMode, isLinkMode, linkSheetId]);

  useEffect(() => {
    if (didApplyQueryFilterRef.current) return;
    didApplyQueryFilterRef.current = true;
    if (isLinkMode) return;

    const url = new URL(window.location.href);
    const ticketFileId = safeText(url.searchParams.get("ticketFileId"));
    if (!ticketFileId) return;

    const querySnapshot: ExpenseTicketAppliedFilterSnapshot = {
      fromDate: "",
      toDate: "",
      filterKey: ticketFileId,
      currencyCode: "",
      statusFilter: "",
      gastoTypeFilter: "",
      processedByIaFilter: "all",
    };

    clearCachedState();
    restoreAppliedFilters(querySnapshot);
    pendingFocusFileIdRef.current = ticketFileId;
    void loadList(1, querySnapshot);

    url.searchParams.delete("ticketFileId");
    const cleanedQuery = url.searchParams.toString();
    window.history.replaceState({}, "", cleanedQuery ? `${url.pathname}?${cleanedQuery}` : url.pathname);
  }, [clearCachedState, isLinkMode, loadList, restoreAppliedFilters]);

  useEffect(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;

    if (isLinkMode) {
      const linkSnapshot = buildLinkModeInitialSnapshot();
      clearCachedState();
      restoreAppliedFilters(linkSnapshot);
      void loadList(1, linkSnapshot);
      return;
    }

    if (!consumeReturnFlag()) {
      clearCachedState();
      return;
    }

    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      return;
    }

    restoreAppliedFilters(cachedState.filters);
    pendingScrollRestoreRef.current = cachedState.scrollY;
    pendingFocusFileIdRef.current = cachedState.focusFileId;
    if (cachedState.items.length > 0 || cachedState.total > 0) {
      restoreListSnapshot({
        items: cachedState.items,
        total: cachedState.total,
        page: cachedState.page,
      });
      return;
    }
    void loadList(cachedState.page, cachedState.filters);
  }, [clearCachedState, consumeReturnFlag, isLinkMode, loadList, readCachedState, restoreAppliedFilters, restoreListSnapshot]);

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
    const onToggleFilters = () => {
      const willOpen = !showFilters;
      toggleFilterPanel();
      if (willOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const onRefresh = () => {
      const snapshot = appliedFilters || resolveActiveFilters();
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
  }, [appliedFilters, currentPage, isLinkMode, loadList, resolveActiveFilters, showFilters, toggleFilterPanel]);

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
        accept="image/jpeg,image/jpg,image/png,image/webp"
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
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "gallery");
        }}
      />

      {!isLinkMode && sourcePickerOpen ? (
        <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
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
                {indT("ExpenseSheets_NewTicket_Source_Camera", "Usar camara")}
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

      {!isLinkMode && quickTicketBusy ? (
        <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4">
          <div className="glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700">
            <Spinner size="h-5 w-5" label={indT("Common_Loading", "Loading")} />
            <span>{quickTicketProgressMessage || indT("Common_Loading", "Loading")}</span>
          </div>
        </div>
      ) : null}

      {!isLinkMode && quickTicketErrorMessage ? (
        <div className="glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          <p>{quickTicketErrorMessage}</p>
          {quickTicketTraceList.length > 0 ? (
            <div className="rounded-lg border border-rose-200 bg-white p-2 text-xs text-rose-700">
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
            {summaryItems.map((item, index) => (
              <div
                key={`${item.key}-${item.value}-${index}`}
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
        visible={showFilters}
        showManualDateFilter={showManualDateFilter}
        manualDateAutoOpenKey={manualDateAutoOpenKey}
        fromDate={fromDate}
        toDate={toDate}
        filterKey={filterKey}
        currencyCode={currencyCode}
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
        onStatusFilterChange={setStatusFilter}
        onGastoTypeFilterChange={setGastoTypeFilter}
        onProcessedByIaFilterChange={setProcessedByIaFilter}
        onClear={onClear}
        onApply={onApply}
      />

      {isLinkMode ? (
        <div className="glass-panel shadow-card space-y-3 rounded-2xl border border-slate-200 bg-white/95 p-3">
          {!canProcessLinkMode ? (
            <div className="text-sm text-rose-700">{indT("Auth_PermissionDenied_Body", "No permission.")}</div>
          ) : null}

          {canProcessLinkMode && linkSheetCheckBusy ? (
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Spinner size="h-4 w-4" label={indT("Common_Loading", "Loading")} />
              <span>{indT("Common_Loading", "Loading")}</span>
            </div>
          ) : null}

          {canProcessLinkMode && !linkSheetCheckBusy && linkSheetLocked ? (
            <div className="text-sm text-rose-700">
              {indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.")}
            </div>
          ) : null}

          {canProcessLinkMode && !linkSheetCheckBusy && !linkSheetLocked ? (
            <>
              <div className="text-xs text-slate-600">
                {`${indT("Nav_ExpenseTickets", "Tickets")}: ${selectedTicketCount} | ${indT("ExpenseSheets_Field_TotalAmount", "Total amount")}: ${selectedTotalAmountText}`}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="ind-action-btn px-3 py-1.5 text-xs"
                  onClick={selectVisibleTickets}
                  disabled={linkFlowBusy || visibleSelectableCount < 1}
                >
                  {`${indT("Tickets_Filter_All", "All")} (${visibleSelectableCount})`}
                </button>
                <button
                  type="button"
                  className="ind-action-btn px-3 py-1.5 text-xs"
                  onClick={clearTicketSelection}
                  disabled={linkFlowBusy || selectedTicketCount < 1}
                >
                  {indT("History_Filter_Clear", "Clear")}
                </button>
                <button
                  type="button"
                  className="ind-action-btn px-3 py-1.5 text-xs"
                  onClick={openLinkConfirmModal}
                  disabled={linkFlowBusy || selectedTicketCount < 1}
                >
                  {`${indT("ExpenseSheets_Fab_LinkTicket", "Vincular ticket")} (${selectedTicketCount})`}
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: isLoading ? "flex" : "none" }}
      >
        <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>

      {errorMessage ? <div className="text-danger">{errorMessage}</div> : null}

      {!isLoading && !errorMessage && items.length === 0 ? (
        <div className="timeline-box timeline-empty" data-empty-text={indT("Common_NoData", "No data")} />
      ) : null}

      {!errorMessage && items.length > 0 ? (
        <div ref={timelineContainerRef} className="timeline-box">
          {items.map((item, index) => {
            const fileId = safeText(item.fileId);
            const dateParts = formatExpenseDateParts(item.transDate, document?.documentElement?.lang || "es-ES");
            const title = safeText(item.description) || safeText(item.fileName) || fileId || "-";
            const amountText = formatAmountWithCurrency(item.totalAmount ?? null, safeText(item.currencyCode));
            const statusCode = item.status;
            const statusLabel = getExpenseTicketStatusLabel(statusCode);
            const isAssignedToExpenseSheet = statusCode === 1;
            const showProcessedByAiIcon = item.processedByAI === true;
            const isSelectableInLinkMode = isLinkMode && canSelectTicketForLink(item);
            const isSelectedInLinkMode = isLinkMode && isTicketSelected(fileId);
            const processedByAiLabel = indT("Tickets_Filter_ProcessedByIA", "Processed by IA");
            const gastoTypeCode = item.gastoType === null ? "" : String(item.gastoType);
            const gastoTypeLabel = gastoTypeCode
              ? gastoTypeLabelMap.get(gastoTypeCode) || gastoTypeCode
              : indT("Common_NotAvailable", "N/A");
            const cardSubtitle = gastoTypeLabel;
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
            const selectionControl = isLinkMode ? (
              <label className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={isSelectedInLinkMode}
                  disabled={!isSelectableInLinkMode || linkFlowBusy || linkSheetCheckBusy || linkSheetLocked}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  onChange={() => toggleTicketSelection(item)}
                  aria-label={indT("ExpenseSheets_Fab_LinkTicket", "Vincular ticket")}
                />
                {indT("Common_Link", "Link")}
              </label>
            ) : null;
            const statusIcons = isLinkMode ? (
              <>
                {selectionControl}
                {baseStatusIcons}
              </>
            ) : baseStatusIcons;

            return (
              <div
                key={`${fileId}-${index}`}
                className={isSelectedInLinkMode ? "timeline-item rounded-2xl ring-2 ring-primary/30" : "timeline-item"}
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
                  statusIcon={statusIcons}
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
          const snapshot = appliedFilters || resolveActiveFilters();
          if (!isLinkMode && (!snapshot?.fromDate || !snapshot?.toDate)) {
            return;
          }

          void loadList(page, snapshot);
        }}
        labels={paginationLabels}
      />

      {canCreateTicket && !isLinkMode ? (
        <FloatingActionButton
          ariaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rapidas")}
          size={76}
          right={16}
          bottom={24}
          menuAriaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rapidas")}
          menuItems={fabMenuItems}
        />
      ) : null}
    </div>
  );
};

// Main page entry for expense tickets list.
const ExpenseTicketsPage = () => {
  return (
    <VisitasPageProviders>
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
