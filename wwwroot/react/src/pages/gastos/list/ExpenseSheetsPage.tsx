import React, { useCallback, useEffect, useMemo, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import FloatingActionButton from "../../../components/commons/FloatingActionButton.tsx";
import { useAuthContext, type AuthManagedUser } from "../../../context/AuthContext.tsx";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusBadgeClassName,
  getExpenseStatusLabel,
  normalizeExpenseStatusFilterCode,
} from "../constants/expenseStatusCatalog.ts";
import ExpenseFiltersPanel from "../components/ExpenseFiltersPanel.tsx";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import { formatExpenseDateParts, formatExpenseDisplayDate, hasAssignedVoucher, safeText } from "../utils/expenseUiUtils.ts";
import { useExpenseSheetsListData } from "./useExpenseSheetsListData.ts";
import { useExpenseSheetsFiltersState } from "./useExpenseSheetsFiltersState.ts";
import { useExpenseSheetsFilterCache } from "./useExpenseSheetsFilterCache.ts";
import ExpenseTimelineCard from "../components/ExpenseTimelineCard.tsx";
import { navigateToExpenseUrl } from "../utils/expenseNavigation.ts";
import { configureExpenseApiAuth } from "../utils/expenseApi.ts";
import { clearExpenseActingUserOverride, setExpenseActingUserOverride } from "../utils/expenseActingUser.ts";

const PAGE_SIZE = 6;
const FAB_BASE_BOTTOM = 24;
const FAB_CLEARANCE = 24;
const FAB_GAP = 12;

const normalizeUserId = (value: unknown): string => String(value || "").trim();

const isSameUser = (left: string, right: string): boolean => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

const resolveManagedUserSelection = (requestedUserId: string, users: AuthManagedUser[]): string => {
  const normalizedRequested = normalizeUserId(requestedUserId);
  if (!normalizedRequested) return "";
  const found = users.find((entry) => isSameUser(entry.axUserId, normalizedRequested));
  return found?.axUserId || "";
};

const normalizeManagedUserFilterValue = (value: unknown, users: AuthManagedUser[]): string => {
  const normalized = normalizeUserId(value);
  if (!normalized) return "";

  const directMatch = users.find((entry) => isSameUser(entry.axUserId, normalized));
  if (directMatch) return directMatch.axUserId;

  const valueToken = normalized.split("-")[0]?.trim() || normalized;
  const tokenMatch = users.find((entry) => isSameUser(entry.axUserId, valueToken));
  if (tokenMatch) return tokenMatch.axUserId;

  return valueToken;
};

// Initializes auth seed for expense API calls before island effects run.
const bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__),
  });
};

const ExpenseSheetsPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const timelineContainerRef = React.useRef<HTMLDivElement | null>(null);
  const paginationRef = React.useRef<HTMLDivElement | null>(null);
  const [fabBottom, setFabBottom] = useState(FAB_BASE_BOTTOM);
  const { manageableSubordinates } = useAuthContext();
  const managedUsers = useMemo(
    () => (Array.isArray(manageableSubordinates) ? manageableSubordinates : []),
    [manageableSubordinates]
  );
  const showManagedUserFilter = managedUsers.length > 0;
  const managedUserLabelById = useMemo(() => {
    const map = new Map<string, string>();
    managedUsers.forEach((entry) => {
      const id = normalizeUserId(entry.axUserId);
      if (!id) return;
      const name = normalizeUserId(entry.name);
      map.set(id.toUpperCase(), name || id);
    });
    return map;
  }, [managedUsers]);

  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

  const {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadList,
    restoreListSnapshot,
    resetList,
  } = useExpenseSheetsListData({
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
    managedUserId,
    statusFilter,
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
    setManagedUserId,
    setStatusFilter,
    onApply,
    onClear,
    restoreAppliedFilters,
    onDateRangeChange,
    onManualRangeComplete,
    onQuickFilterChange,
    toggleFilterPanel,
  } = useExpenseSheetsFiltersState({
    onApplyFilters: (snapshot) => {
      const resolvedManagedUserId = normalizeManagedUserFilterValue(snapshot.managedUserId, managedUsers);
      if (resolvedManagedUserId) {
        setExpenseActingUserOverride(resolvedManagedUserId);
      } else {
        clearExpenseActingUserOverride();
      }
      void loadList(1, {
        ...snapshot,
        managedUserId: resolvedManagedUserId,
      });
    },
    onClearFilters: () => {
      setManagedUserId("");
      clearCachedState();
      clearExpenseActingUserOverride();
      resetList();
    },
    defaultManagedUserId: "",
  });

  const handleManagedUserIdChange = useCallback(
    (value: string) => {
      const normalizedValue = normalizeManagedUserFilterValue(value, managedUsers);
      const wasManagedUserSelected = !!normalizeUserId(managedUserId);
      const shouldAutoApplyClear = wasManagedUserSelected && !normalizedValue;
      setManagedUserId(normalizedValue);
      clearCachedState();

      if (!shouldAutoApplyClear) {
        return;
      }

      const nextSnapshot = {
        ...(appliedFilters || currentFilters),
        managedUserId: "",
      };
      clearExpenseActingUserOverride();
      restoreAppliedFilters(nextSnapshot);
      void loadList(1, nextSnapshot);
    },
    [
      appliedFilters,
      clearCachedState,
      currentFilters,
      loadList,
      managedUserId,
      managedUsers,
      restoreAppliedFilters,
      setManagedUserId,
    ]
  );

  const goToDetail = useCallback(
    (sheetId: string) => {
      if (!sheetId) return;

      const snapshot = appliedFilters || currentFilters;
      const resolvedManagedUserId = normalizeManagedUserFilterValue(snapshot.managedUserId, managedUsers);
      const normalizedSnapshot = {
        ...snapshot,
        managedUserId: resolvedManagedUserId,
      };
      if (resolvedManagedUserId) {
        setExpenseActingUserOverride(resolvedManagedUserId);
      } else {
        clearExpenseActingUserOverride();
      }
      saveCachedState({
        filters: normalizedSnapshot,
        page: currentPage < 1 ? 1 : currentPage,
        scrollY: typeof window !== "undefined" ? window.scrollY || 0 : 0,
        items,
        total,
      });

      const id = encodeURIComponent(sheetId);
      navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${id}`, {
        bypassGuardOnce: false,
      });
    },
    [appliedFilters, currentFilters, currentPage, items, managedUsers, saveCachedState, total]
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

  // Keep the floating action button clear of pagination controls on small screens.
  const updateFabBottom = useCallback(() => {
    if (!paginationRef.current || totalPages <= 1) {
      setFabBottom(FAB_BASE_BOTTOM);
      return;
    }

    const height = paginationRef.current.offsetHeight || 0;
    const nextBottom = Math.max(FAB_BASE_BOTTOM, height + FAB_CLEARANCE + FAB_GAP);
    setFabBottom((previous) => (Math.abs(previous - nextBottom) < 1 ? previous : nextBottom));
  }, [totalPages]);

  useEffect(() => {
    updateFabBottom();

    let observer: ResizeObserver | null = null;
    const paginationEl = paginationRef.current;
    if (paginationEl && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateFabBottom());
      observer.observe(paginationEl);
    }

    window.addEventListener("resize", updateFabBottom);
    return () => {
      window.removeEventListener("resize", updateFabBottom);
      if (observer) observer.disconnect();
    };
  }, [updateFabBottom]);

  const summaryItems = useMemo(() => {
    if (!appliedFilters) {
      return [] as Array<{ key: string; label: string; value: string }>;
    }

    const summary: Array<{ key: string; label: string; value: string }> = [];
    const locale = document?.documentElement?.lang || "es-ES";
    const fromDateText = formatExpenseDisplayDate(appliedFilters.fromDate, locale, "");
    const toDateText = formatExpenseDisplayDate(appliedFilters.toDate, locale, "");

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

    if (appliedFilters.projectId.trim()) {
      summary.push({
        key: "project",
        label: indT("ExpenseSheets_Filter_Project", "Project"),
        value: appliedFilters.projectId.trim(),
      });
    }
    if (appliedFilters.hojaGastosId.trim()) {
      summary.push({
        key: "sheet",
        label: indT("ExpenseSheets_Filter_Sheet", "Expense sheet"),
        value: appliedFilters.hojaGastosId.trim(),
      });
    }
    if (appliedFilters.currencyCode.trim()) {
      summary.push({
        key: "currency",
        label: indT("ExpenseSheets_Filter_Currency", "Currency"),
        value: appliedFilters.currencyCode.trim(),
      });
    }
    const appliedManagedUserId = normalizeUserId(appliedFilters.managedUserId);
    if (appliedManagedUserId) {
      const managedUserLabel = managedUserLabelById.get(appliedManagedUserId.toUpperCase()) || appliedManagedUserId;
      summary.push({
        key: "managed-user",
        label: indT("ExpenseSheets_Filter_User", "User"),
        value: managedUserLabel,
      });
    }
    if (appliedFilters.statusFilter !== DEFAULT_EXPENSE_STATUS_FILTER) {
      summary.push({
        key: "status",
        label: indT("ExpenseSheets_Filter_Status", "Estado"),
        value: getExpenseStatusLabel(appliedFilters.statusFilter),
      });
    }

    return summary;
  }, [appliedFilters, managedUserLabelById]);

  const showSummary = !showFilters && summaryItems.length > 0;

  useEffect(() => {
    if (didRestoreOnMountRef.current) return;
    didRestoreOnMountRef.current = true;

    if (!consumeReturnFlag()) {
      clearCachedState();
      setManagedUserId("");
      clearExpenseActingUserOverride();
      return;
    }

    const cachedState = readCachedState();
    if (!cachedState) {
      clearCachedState();
      setManagedUserId("");
      clearExpenseActingUserOverride();
      return;
    }

    const restoredManagedUserId = resolveManagedUserSelection(cachedState.filters.managedUserId, managedUsers);
    const restoredFilters = {
      ...cachedState.filters,
      managedUserId: restoredManagedUserId,
    };
    if (restoredManagedUserId) {
      setExpenseActingUserOverride(restoredManagedUserId);
    } else {
      clearExpenseActingUserOverride();
    }

    restoreAppliedFilters(restoredFilters);
    pendingScrollRestoreRef.current = cachedState.scrollY;
    if (cachedState.items.length > 0 || cachedState.total > 0) {
      restoreListSnapshot({
        items: cachedState.items,
        total: cachedState.total,
        page: cachedState.page,
      });
      return;
    }
    void loadList(cachedState.page, restoredFilters);
  }, [
    clearCachedState,
    consumeReturnFlag,
    loadList,
    managedUsers,
    readCachedState,
    restoreAppliedFilters,
    restoreListSnapshot,
    setManagedUserId,
  ]);

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
      const willOpen = !showFilters;
      toggleFilterPanel();
      if (willOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const onRefresh = () => {
      if (!appliedFilters) {
        return;
      }

      const resolvedManagedUserId = normalizeManagedUserFilterValue(appliedFilters.managedUserId, managedUsers);
      void loadList(currentPage < 1 ? 1 : currentPage, {
        ...appliedFilters,
        managedUserId: resolvedManagedUserId,
      });
    };

    window.addEventListener("expense-sheets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-sheets-refresh", onRefresh);

    return () => {
      window.removeEventListener("expense-sheets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-sheets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, managedUsers, showFilters, toggleFilterPanel]);

  return (
    <div className="space-y-2">
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
        managedUserId={managedUserId}
        managedUsers={managedUsers}
        showManagedUserFilter={showManagedUserFilter}
        statusFilter={statusFilter}
        activeQuickFilter={activeQuickFilter}
        onDateRangeChange={onDateRangeChange}
        onManualRangeComplete={onManualRangeComplete}
        onQuickFilterChange={onQuickFilterChange}
        onProjectIdChange={setProjectId}
        onHojaGastosIdChange={setHojaGastosId}
        onCurrencyCodeChange={setCurrencyCode}
        onManagedUserIdChange={handleManagedUserIdChange}
        onStatusFilterChange={setStatusFilter}
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
            const dateParts = formatExpenseDateParts(
              item.createdDate,
              document?.documentElement?.lang || "es-ES",
              { preferMonthFirstOnSlash: true }
            );
            const currency = safeText(item.currencyCode);
            const description = safeText(item.description);
            const voucher = safeText(item.voucher);
            const totalAmountText = formatAmountWithCurrency(item.totalAmount ?? null, currency);
            const fallbackStatusCode = hasAssignedVoucher(voucher) ? 4 : 0;
            const statusCode = normalizeExpenseStatusFilterCode(item.expenseSheetStatus, fallbackStatusCode);
            const statusLabel = getExpenseStatusLabel(statusCode);
            const statusClass = getExpenseStatusBadgeClassName(statusCode);

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
        ref={paginationRef}
        totalPages={totalPages}
        currentPage={currentPage}
        loading={isLoading}
        onPageChange={(page) => {
          const snapshot = appliedFilters || currentFilters;
          const resolvedManagedUserId = normalizeManagedUserFilterValue(snapshot.managedUserId, managedUsers);
          void loadList(page, {
            ...snapshot,
            managedUserId: resolvedManagedUserId,
          });
        }}
        labels={paginationLabels}
      />

      {canCreateExpense ? (
        <FloatingActionButton
          route=""
          ariaLabel={indT("Common_Create", "Create")}
          size={76}
          right={16}
          bottom={fabBottom}
          onClick={handleOpenCreateSheetMode}
        />
      ) : null}
    </div>
  );
};

// Main page entry for expense sheets list.
const ExpenseSheetsPage = () => {
  return (
    <VisitasPageProviders enableExpenseManagement>
      <ExpenseSheetsPageContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-sheets-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseSheetsPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseSheetsPage;
