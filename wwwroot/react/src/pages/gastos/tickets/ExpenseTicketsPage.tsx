import React, { useCallback, useEffect, useMemo } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import FloatingActionButton, { type FloatingActionButtonMenuItem } from "../../../components/commons/FloatingActionButton.tsx";
import Spinner from "../../../components/commons/Spinner.tsx";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import ExpenseTimelineCard from "../components/ExpenseTimelineCard.tsx";
import ExpenseTicketsFiltersPanel from "../components/ExpenseTicketsFiltersPanel.tsx";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import { getExpenseTicketStatusLabel } from "../constants/expenseTicketStatusCatalog.ts";
import { configureExpenseApiAuth } from "../utils/expenseApi.ts";
import { navigateToExpenseUrl } from "../utils/expenseNavigation.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import { formatExpenseDateParts, formatExpenseDisplayDate, safeText } from "../utils/expenseUiUtils.ts";
import { useExpenseSheetQuickTicketFlow } from "../detail/useExpenseSheetQuickTicketFlow.ts";
import { useExpenseTicketsFiltersState } from "./useExpenseTicketsFiltersState.ts";
import { useExpenseTicketsListData } from "./useExpenseTicketsListData.ts";
import { useExpenseTicketsFilterCache } from "./useExpenseTicketsFilterCache.ts";
import type { ExpenseTicketAppliedFilterSnapshot } from "./expenseTicketListTypes.ts";

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
  const timelineContainerRef = React.useRef<HTMLDivElement | null>(null);
  const cameraInputRef = React.useRef<HTMLInputElement | null>(null);
  const galleryInputRef = React.useRef<HTMLInputElement | null>(null);
  const didRestoreOnMountRef = React.useRef(false);
  const didApplyQueryFilterRef = React.useRef(false);
  const pendingScrollRestoreRef = React.useRef<number | null>(null);
  const pendingFocusFileIdRef = React.useRef("");

  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

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
  } = useExpenseTicketsFiltersState({
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
    canCreateExpense: canCreateTicket,
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
    () => [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: <NewTicketIcon />,
        onClick: openSourcePicker,
      },
    ],
    [openSourcePicker]
  );

  const openTicketDetail = useCallback(
    (rawFileId: string) => {
      const fileId = safeText(rawFileId);
      if (!fileId) return;

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
    [appliedFilters, currentPage, currentFilters, items, saveCachedState, total]
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

  useEffect(() => {
    if (didApplyQueryFilterRef.current) return;
    didApplyQueryFilterRef.current = true;

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
  }, [clearCachedState, loadList, restoreAppliedFilters]);

  useEffect(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;

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
  }, [clearCachedState, consumeReturnFlag, loadList, readCachedState, restoreAppliedFilters, restoreListSnapshot]);

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
      if (!appliedFilters?.fromDate || !appliedFilters?.toDate) {
        return;
      }

      void loadList(currentPage < 1 ? 1 : currentPage, appliedFilters);
    };

    window.addEventListener("expense-tickets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-tickets-refresh", onRefresh);

    return () => {
      window.removeEventListener("expense-tickets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-tickets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, showFilters, toggleFilterPanel]);

  return (
    <div className="space-y-2">
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

      {sourcePickerOpen ? (
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

      {quickTicketBusy ? (
        <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4">
          <div className="glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700">
            <Spinner size="h-5 w-5" label={indT("Common_Loading", "Loading")} />
            <span>{quickTicketProgressMessage || indT("Common_Loading", "Loading")}</span>
          </div>
        </div>
      ) : null}

      {quickTicketErrorMessage ? (
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
            const processedByAiLabel = indT("Tickets_Filter_ProcessedByIA", "Processed by IA");
            const gastoTypeCode = item.gastoType === null ? "" : String(item.gastoType);
            const gastoTypeLabel = gastoTypeCode
              ? gastoTypeLabelMap.get(gastoTypeCode) || gastoTypeCode
              : indT("Common_NotAvailable", "N/A");
            const cardSubtitle = gastoTypeLabel;
            const statusIcons = isAssignedToExpenseSheet || showProcessedByAiIcon ? (
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
                    <span className="expense-ticket-card__ai-label" aria-hidden="true">AI</span>
                  </span>
                ) : null}
              </>
            ) : null;

            return (
              <div key={`${fileId}-${index}`} className="timeline-item" data-ticket-file-id={fileId || undefined}>
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
          if (!appliedFilters?.fromDate || !appliedFilters?.toDate) {
            return;
          }

          void loadList(page, appliedFilters);
        }}
        labels={paginationLabels}
      />

      {canCreateTicket ? (
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
