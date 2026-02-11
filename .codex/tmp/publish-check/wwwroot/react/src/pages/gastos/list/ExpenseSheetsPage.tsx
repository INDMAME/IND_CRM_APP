import React, { useCallback, useEffect, useMemo, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import { fetchJson, ApiFetchError } from "../../../services/apiService.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import type { ExpenseSheetCard, ExpenseSheetListRequest, ExpenseSheetListResponse } from "../expenseTypes.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import ExpenseFiltersPanel, { type ExpenseQuickFilterId } from "../components/ExpenseFiltersPanel.tsx";

const PAGE_SIZE = 6;

type DateParts = {
  year: string;
  month: string;
  day: string;
};

type AppliedFilterSnapshot = {
  fromDate: string;
  toDate: string;
  projectId: string;
  hojaGastosId: string;
  currencyCode: string;
  billedMode: number;
};

const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const toIsoDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const parseDate = (raw?: string): Date | null => {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;

  const onlyDate = value.split("T")[0].split(" ")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(onlyDate)) {
    const [year, month, day] = onlyDate.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  if (/^\d{8}$/.test(onlyDate)) {
    const year = Number(onlyDate.slice(0, 4));
    const month = Number(onlyDate.slice(4, 6));
    const day = Number(onlyDate.slice(6, 8));
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDateParts = (raw?: string): DateParts => {
  const date = parseDate(raw);
  if (!date) {
    return { year: "", month: "", day: "--" };
  }

  const locale = document?.documentElement?.lang || "es-ES";
  const month = date
    .toLocaleDateString(locale, { month: "short" })
    .replace(/\./g, "")
    .toUpperCase();

  return {
    year: String(date.getFullYear()),
    month,
    day: String(date.getDate()).padStart(2, "0"),
  };
};

const safeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const ExpenseSheetsPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [hojaGastosId, setHojaGastosId] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [billedMode, setBilledMode] = useState(0);
  const [activeQuickFilter, setActiveQuickFilter] = useState<ExpenseQuickFilterId | null>(null);
  const [showManualDateFilter, setShowManualDateFilter] = useState(true);
  const [manualDateAutoOpenKey, setManualDateAutoOpenKey] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterSnapshot | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const [items, setItems] = useState<ExpenseSheetCard[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

  const loadList = useCallback(
    async (page: number, appliedSnapshot?: AppliedFilterSnapshot | null) => {
      if (!hasAccess) {
        showPermissionModal();
        return;
      }

      setIsLoading(true);
      setErrorMessage("");
      const filterSource = appliedSnapshot || {
        fromDate,
        toDate,
        projectId,
        hojaGastosId,
        currencyCode,
        billedMode,
      };

      const payload: ExpenseSheetListRequest = {
        filter: filterSource.hojaGastosId,
        billedMode: filterSource.billedMode,
        fromDate: filterSource.fromDate,
        toDate: filterSource.toDate,
        projectId: filterSource.projectId,
        hojaGastosId: filterSource.hojaGastosId,
        currencyCode: filterSource.currencyCode,
        page,
        pageSize: PAGE_SIZE,
      };

      try {
        const response = await fetchJson<ExpenseSheetListResponse>("/Gastos/ListExpenseSheets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          suppressPermissionModal: true,
        });

        if (response?.success === false) {
          setErrorMessage(response.message || indT("ExpenseSheets_LoadError", "Could not load expense sheets."));
          setItems([]);
          setTotal(0);
          setCurrentPage(page);
          return;
        }

        const nextItems = Array.isArray(response?.items) ? response.items : [];
        const nextTotal = Number(response?.total || nextItems.length || 0);

        setItems(nextItems);
        setTotal(nextTotal);
        setCurrentPage(page);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          showPermissionModal();
          return;
        }

        const message = error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheets.");
        setErrorMessage(message);
        setItems([]);
        setTotal(0);
        setCurrentPage(page);
      } finally {
        setIsLoading(false);
      }
    },
    [billedMode, currencyCode, fromDate, hasAccess, hojaGastosId, projectId, toDate]
  );

  const onApply = useCallback(() => {
    const snapshot: AppliedFilterSnapshot = {
      fromDate,
      toDate,
      projectId,
      hojaGastosId,
      currencyCode,
      billedMode,
    };

    setAppliedFilters(snapshot);
    setShowFilters(false);
    void loadList(1, snapshot);
  }, [billedMode, currencyCode, fromDate, hojaGastosId, loadList, projectId, toDate]);

  const onClear = useCallback(() => {
    setFromDate("");
    setToDate("");
    setProjectId("");
    setHojaGastosId("");
    setCurrencyCode("");
    setBilledMode(0);
    setActiveQuickFilter(null);
    setShowManualDateFilter(true);
    setAppliedFilters(null);
    setItems([]);
    setTotal(0);
    setCurrentPage(1);
    setErrorMessage("");
    setShowFilters(true);
  }, []);

  const onDateRangeChange = useCallback((nextFromDate: string, nextToDate: string) => {
    setFromDate(nextFromDate);
    setToDate(nextToDate);
    setShowManualDateFilter(true);
    setActiveQuickFilter(nextFromDate || nextToDate ? "custom" : null);
  }, []);

  const onQuickFilterChange = useCallback((filterId: ExpenseQuickFilterId) => {
    setActiveQuickFilter(filterId);
    if (filterId === "custom") {
      setShowManualDateFilter(true);
      setManualDateAutoOpenKey((previous) => previous + 1);
      return;
    }

    setShowManualDateFilter(false);

    const today = startOfDay(new Date());
    const nextFrom = new Date(today);

    if (filterId === "days-7") {
      nextFrom.setDate(today.getDate() - 6);
    } else if (filterId === "days-30") {
      nextFrom.setDate(today.getDate() - 29);
    } else {
      nextFrom.setDate(today.getDate() - 89);
    }

    setFromDate(toIsoDate(nextFrom));
    setToDate(toIsoDate(today));
  }, []);

  const goToDetail = useCallback((sheetId: string) => {
    if (!sheetId) return;
    const id = encodeURIComponent(sheetId);
    window.location.href = `/Gastos/ExpenseSheetDetail?hojaGastosId=${id}`;
  }, []);

  const totalPages = Math.ceil((total || 0) / PAGE_SIZE);
  const summaryItems = useMemo(() => {
    if (!appliedFilters) return [] as string[];

    const locale = document?.documentElement?.lang || "es-ES";
    const dateChunks: string[] = [];
    const fromDateText = parseDate(appliedFilters.fromDate)
      ?.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })
      .replace(/\./g, "")
      .toLowerCase();
    const toDateText = parseDate(appliedFilters.toDate)
      ?.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })
      .replace(/\./g, "")
      .toLowerCase();

    if (fromDateText) {
      dateChunks.push(`${indT("History_From", "From")}: ${fromDateText}`);
    }
    if (toDateText) {
      dateChunks.push(`${indT("History_To", "To")}: ${toDateText}`);
    }

    const summary: string[] = [];
    if (dateChunks.length > 0) {
      summary.push(`${indT("History_Filter_Date", "Date")}: ${dateChunks.join(" | ")}`);
    }
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
          ? indT("ExpenseSheets_Filter_Status_Billed", "Facturado")
          : appliedFilters.billedMode === 2
            ? indT("ExpenseSheets_Filter_Status_Both", "Ambos")
            : indT("ExpenseSheets_Filter_Status_Unbilled", "No Facturado")
      }`
    );

    return summary;
  }, [appliedFilters]);
  const showSummary = !showFilters && summaryItems.length > 0;

  useEffect(() => {
    const onToggleFilters = () => {
      if (!showFilters) {
        setShowFilters(true);
        setShowManualDateFilter(true);
        setActiveQuickFilter("custom");
        setManualDateAutoOpenKey((current) => current + 1);
        return;
      }

      if (!showManualDateFilter) {
        setShowManualDateFilter(true);
        setActiveQuickFilter("custom");
        setManualDateAutoOpenKey((current) => current + 1);
        return;
      }

      setShowManualDateFilter(false);
      setShowFilters(false);
    };

    const onRefresh = () => {
      if (!appliedFilters) return;
      void loadList(currentPage < 1 ? 1 : currentPage, appliedFilters);
    };

    window.addEventListener("expense-sheets-toggle-filter", onToggleFilters);
    window.addEventListener("expense-sheets-refresh", onRefresh);

    return () => {
      window.removeEventListener("expense-sheets-toggle-filter", onToggleFilters);
      window.removeEventListener("expense-sheets-refresh", onRefresh);
    };
  }, [appliedFilters, currentPage, loadList, showFilters, showManualDateFilter]);

  return (
    <div className="space-y-2">
      {showSummary ? (
        <div className="filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3">
          <div className="history-filter-summary flex flex-col items-start gap-y-1 text-xs">
            {summaryItems.map((item) => (
              <span key={item} className="leading-5">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <ExpenseFiltersPanel
        visible={showFilters}
        showManualDateFilter={showManualDateFilter}
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
        <div className="timeline-box">
          {items.map((item, index) => {
            const id = safeText(item.hojaGastosId);
            const dateParts = formatDateParts(item.createdDate || item.transDate);
            const currency = safeText(item.currencyCode);
            const description = safeText(item.description);
            const voucher = safeText(item.voucher);
            const totalAmountText = formatAmountWithCurrency(item.totalAmountMST ?? null, currency);
            const isBilled = voucher !== "";
            const statusLabel = isBilled
              ? indT("ExpenseSheets_Filter_Status_Billed", "Facturado")
              : indT("ExpenseSheets_Filter_Status_Unbilled", "No Facturado");
            const statusClass = isBilled
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700";

            return (
              <div key={`${id}-${index}`} className="timeline-item">
                <div
                  className="timeline-card timeline-card--clickable"
                  role="button"
                  tabIndex={0}
                  onClick={() => goToDetail(id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      goToDetail(id);
                    }
                  }}
                >
                  <div className="timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600">
                    <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">{dateParts.year}</div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{dateParts.month}</div>
                    <div className="text-2xl font-semibold text-primary">{dateParts.day}</div>
                  </div>
                  <div className="timeline-card__content flex-1 py-3 px-4">
                    <div className={`absolute right-2 top-2 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusClass}`}>
                      {statusLabel}
                    </div>
                    <p className="timeline-name pr-24" data-fulltext={description || "-"}>
                      {description || "-"}
                    </p>
                    <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2">
                      <span className="text-xs text-slate-500" data-fulltext={voucher || "-"}>
                        {indT("ExpenseSheets_Field_Voucher", "Voucher")}: {voucher || "-"}
                      </span>
                      <span className="text-sm font-semibold text-primary" data-fulltext={totalAmountText}>
                        {totalAmountText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <CompactPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          void loadList(page, appliedFilters);
        }}
        labels={paginationLabels}
      />
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

