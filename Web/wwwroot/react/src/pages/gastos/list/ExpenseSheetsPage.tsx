import React, { useCallback, useEffect, useMemo } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import FloatingActionButton from "../../../components/commons/FloatingActionButton.tsx";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import ExpenseFiltersPanel from "../components/ExpenseFiltersPanel.tsx";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import HistorySummary from "../../visitas/historial/HistorySummary.tsx";
import { formatExpenseDateParts, formatExpenseDisplayDate, hasAssignedVoucher, safeText } from "../utils/expenseUiUtils.ts";
import { useExpenseSheetsListData } from "./useExpenseSheetsListData.ts";
import { useExpenseSheetsFiltersState } from "./useExpenseSheetsFiltersState.ts";
import { useExpenseSheetsFilterCache } from "./useExpenseSheetsFilterCache.ts";
import ExpenseTimelineCard from "../components/ExpenseTimelineCard.tsx";
import { navigateToExpenseUrl } from "../utils/expenseNavigation.ts";

const PAGE_SIZE = 6;

const ExpenseSheetsPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const timelineContainerRef = React.useRef<HTMLDivElement | null>(null);

  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

  const { items, total, currentPage, isLoading, errorMessage, loadList, resetList } = useExpenseSheetsListData({
    hasAccess,
    pageSize: PAGE_SIZE,
    onForbidden: showPermissionModal,
  });

  const { readCachedState, consumeReturnFlag, saveCachedState, clearCachedState } = useExpenseSheetsFilterCache();
  const didRestoreOnMountRef = React.useRef(false);
  const pendingScrollRestoreRef = React.useRef<number | null>(null);

  const {
    fromDate,
    toDate,
    projectId,
    hojaGastosId,
    currencyCode,
    billedMode,
    activeQuickFilter,
    showManualDateFilter,
    showManualDateError,
    manualDateAutoOpenKey,
    appliedFilters,
    showFilters,
    currentFilters,
    setProjectId,
    setHojaGastosId,
    setCurrencyCode,
    setBilledMode,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onQuickFilterChange,
    toggleFilterPanel,
  } = useExpenseSheetsFiltersState({
    onApplyFilters: (snapshot) => {
      void loadList(1, snapshot);
    },
    onClearFilters: () => {
      clearCachedState();
      resetList();
    },
  });

  const goToDetail = useCallback(
    (sheetId: string) => {
      if (!sheetId) return;

      const snapshot = appliedFilters || currentFilters;
      saveCachedState({
        filters: snapshot,
        page: currentPage < 1 ? 1 : currentPage,
        scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0,
      });

      const id = encodeURIComponent(sheetId);
      navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${id}`, {
        bypassGuardOnce: false,
      });
    },
    [appliedFilters, currentFilters, currentPage, saveCachedState]
  );

  const handleOpenCreateSheetMode = useCallback(() => {
    if (!canCreateExpense) {
      showPermissionModal();
      return;
    }

    navigateToExpenseUrl("/Gastos/ExpenseSheetDetail?mode=create", {
      bypassGuardOnce: false,
    });
  }, [canCreateExpense]);

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

  const summaryDate = useMemo(() => {
    if (!appliedFilters) return null as { fromValue: string; toValue: string } | null;

    const locale = document?.documentElement?.lang || "es-ES";
    const fromDateText = formatExpenseDisplayDate(appliedFilters.fromDate, locale, "");
    const toDateText = formatExpenseDisplayDate(appliedFilters.toDate, locale, "");

    if (!fromDateText && !toDateText) return null;
    return {
      fromValue: fromDateText || "--",
      toValue: toDateText || "--",
    };
  }, [appliedFilters]);

  const summaryItems = useMemo(() => {
    if (!appliedFilters) return [] as string[];

    const summary: string[] = [];
    if (appliedFilters.projectId.trim()) {
      summary.push(`${indT("ExpenseSheets_Filter_Project", "Project")}: ${appliedFilters.projectId.trim()}`);
    }
    if (appliedFilters.hojaGastosId.trim()) {
      summary.push(`${indT("ExpenseSheets_Filter_Sheet", "Expense sheet")}: ${appliedFilters.hojaGastosId.trim()}`);
    }
    if (appliedFilters.currencyCode.trim()) {
      summary.push(`${indT("ExpenseSheets_Filter_Currency", "Currency")}: ${appliedFilters.currencyCode.trim()}`);
    }
    summary.push(
      `${indT("ExpenseSheets_Filter_Status", "Estado")}: ${
        appliedFilters.billedMode === 1
          ? indT("ExpenseSheets_Filter_Status_Billed", "Pagado")
          : appliedFilters.billedMode === 2
            ? indT("ExpenseSheets_Filter_Status_Both", "Ambos")
            : indT("ExpenseSheets_Filter_Status_Unbilled", "No Pagado")
      }`
    );

    return summary;
  }, [appliedFilters]);

  const showSummary = !showFilters && (!!summaryDate || summaryItems.length > 0);

  useEffect(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;

    if (!consumeReturnFlag()) return;

    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      return;
    }

    restoreAppliedFilters(cachedState.filters);
    pendingScrollRestoreRef.current = cachedState.scrollY;
    void loadList(cachedState.page, cachedState.filters);
  }, [clearCachedState, consumeReturnFlag, loadList, readCachedState, restoreAppliedFilters]);

  useEffect(() => {
    if (isLoading) return;
    const pendingScrollY = pendingScrollRestoreRef.current;
    if (pendingScrollY == null) return;

    pendingScrollRestoreRef.current = null;
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(0, pendingScrollY),
        behavior: "auto",
      });
    });
  }, [currentPage, isLoading, items.length]);

  useEffect(() => {
    const onToggleFilters = () => {
      toggleFilterPanel();
    };

    const onRefresh = () => {
      if (!appliedFilters) {
        return;
      }

      void loadList(currentPage < 1 ? 1 : currentPage, appliedFilters);
    };

    window.addEventListener("expense-sheets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-sheets-refresh", onRefresh);

    return () => {
      window.removeEventListener("expense-sheets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-sheets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, toggleFilterPanel]);

  return (
    <div className="space-y-2">
      {showSummary ? (
        <div className="filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3">
          {summaryDate ? (
            <HistorySummary
              summaryFromLabel={indT("History_From", "From")}
              summaryToLabel={indT("History_To", "To")}
              fromValue={summaryDate.fromValue}
              toValue={summaryDate.toValue}
              className="gap-y-1 text-[11px]"
            />
          ) : null}
          <div className={`flex flex-col items-start gap-y-1 text-xs ${summaryDate ? "mt-1" : ""}`.trim()}>
            {summaryItems.map((item) => (
              <div key={item} className="history-filter-summary leading-5">
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <ExpenseFiltersPanel
        visible={showFilters}
        showManualDateFilter={showManualDateFilter}
        showManualDateError={showManualDateError}
        manualDateAutoOpenKey={manualDateAutoOpenKey}
        fromDate={fromDate}
        toDate={toDate}
        projectId={projectId}
        hojaGastosId={hojaGastosId}
        currencyCode={currencyCode}
        billedMode={billedMode}
        activeQuickFilter={activeQuickFilter}
        onDateRangeChange={onDateRangeChange}
        onQuickFilterChange={onQuickFilterChange}
        onProjectIdChange={setProjectId}
        onHojaGastosIdChange={setHojaGastosId}
        onCurrencyCodeChange={setCurrencyCode}
        onBilledModeChange={setBilledMode}
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
            const id = safeText(item.hojaGastosId);
            const dateParts = formatExpenseDateParts(item.createdDate || item.transDate, document?.documentElement?.lang || "es-ES");
            const currency = safeText(item.currencyCode);
            const description = safeText(item.description);
            const voucher = safeText(item.voucher);
            const totalAmountText = formatAmountWithCurrency(item.totalAmountMST ?? null, currency);
            const isBilled = hasAssignedVoucher(voucher);
            const statusLabel = isBilled
              ? indT("ExpenseSheets_Filter_Status_Billed", "Pagado")
              : indT("ExpenseSheets_Filter_Status_Unbilled", "No Pagado");
            const statusClass = isBilled
              ? "expense-sheet-card__status expense-sheet-card__status--billed"
              : "expense-sheet-card__status expense-sheet-card__status--unbilled";

            return (
              <div key={`${id}-${index}`} className="timeline-item">
                <ExpenseTimelineCard
                  dateParts={dateParts}
                  title={description || "-"}
                  amountText={totalAmountText}
                  onOpen={() => goToDetail(id)}
                  titleClassName="expense-sheet-card__title timeline-name"
                  statusClassName={statusClass}
                  statusLabel={statusLabel}
                />
              </div>
            );
          })}
        </div>
      ) : null}

      <CompactPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          const snapshot = appliedFilters || currentFilters;
          void loadList(page, snapshot);
        }}
        labels={paginationLabels}
      />

      {canCreateExpense ? (
        <FloatingActionButton
          route=""
          ariaLabel={indT("Common_Create", "Create")}
          size={76}
          right={16}
          bottom={24}
          onClick={handleOpenCreateSheetMode}
        />
      ) : null}
    </div>
  );
};

// Main page entry for expense sheets list.
const ExpenseSheetsPage = () => {
  return (
    <VisitasPageProviders>
      <ExpenseSheetsPageContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  const rootEl = document.getElementById("expense-sheets-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseSheetsPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseSheetsPage;
