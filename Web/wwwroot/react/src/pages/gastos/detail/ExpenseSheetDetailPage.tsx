import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import { ApiFetchError, fetchJson } from "../../../services/apiService.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import type { ExpenseSheetDetailResponse, ExpenseSheetHeader, ExpenseSheetLine } from "../expenseTypes.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import ExpenseReadOnlyField from "../components/ExpenseReadOnlyField.tsx";
import { formatExpenseDateParts, safeText } from "../utils/expenseUiUtils.ts";

const LINES_PAGE_SIZE = 6;

const pagedSlice = <T,>(items: T[], page: number, pageSize: number): T[] => {
  if (!items.length) return [];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

const ExpenseSheetDetailPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const lineContainerRef = useRef<HTMLDivElement | null>(null);

  const [header, setHeader] = useState<ExpenseSheetHeader | null>(null);
  const [lines, setLines] = useState<ExpenseSheetLine[]>([]);
  const [linePage, setLinePage] = useState(1);
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

  useEffect(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        showPermissionModal();
        return;
      }

      if (!sheetId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetchJson<ExpenseSheetDetailResponse>(`/Gastos/GetExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`, {
          method: "GET",
          suppressPermissionModal: true,
        });

        if (response?.success === false || !response?.data) {
          setErrorMessage(response?.message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
          setHeader(null);
          setLines([]);
          return;
        }

        setHeader(response.data.header || null);
        setLines(Array.isArray(response.data.lines) ? response.data.lines : []);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          showPermissionModal();
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
        setHeader(null);
        setLines([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDetail();
  }, [hasAccess, sheetId]);

  const visibleLines = useMemo(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const totalAmountText = useMemo(
    () => formatAmountWithCurrency(header?.totalAmountMST ?? null, safeText(header?.currencyCode)),
    [header]
  );

  const resolveClickableCard = useCallback((target: EventTarget | null) => {
    const node = target as HTMLElement | null;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest<HTMLElement>(".timeline-card--clickable");
    if (!card) return null;
    if (!lineContainerRef.current?.contains(card)) return null;
    return card;
  }, []);

  useTimelineCardEffects({
    containerRef: lineContainerRef,
    errorMessage,
    items: visibleLines,
    resolveClickableCard,
  });

  const goToLine = (lineRecId: string) => {
    const safeLineId = safeText(lineRecId);
    if (!safeLineId) return;
    window.location.href = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(sheetId)}&lineRecId=${encodeURIComponent(safeLineId)}`;
  };

  return (
    <div className="space-y-3">
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

      {!isLoading && !errorMessage && header ? (
        <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_SheetId", "Sheet id")} value={safeText(header.hojaGastosId) || "-"} />
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_UserId", "User id")} value={safeText(header.userId) || "-"} />
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Description", "Description")} value={safeText(header.description) || "-"} fullWidth />
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Project", "Project")} value={safeText(header.projId) || "-"} />
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Voucher", "Voucher")} value={safeText(header.voucher) || "-"} />
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Currency", "Currency")} value={safeText(header.currencyCode) || "-"} />
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")} value={safeText(header.exchRate) || "-"} />
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_TotalAmount", "Total amount")} value={totalAmountText} />
          </div>
        </section>
      ) : null}

      {!isLoading && !errorMessage ? (
        <section className="space-y-2">
          <div className="expense-section-divider" role="heading" aria-level={2}>
            <span className="expense-section-divider__label">{indT("ExpenseSheets_Lines", "Lines")}</span>
          </div>

          {visibleLines.length === 0 ? (
            <div className="timeline-box timeline-empty" data-empty-text={indT("ExpenseSheets_NoLines", "No lines for this expense sheet.")} />
          ) : (
            <div ref={lineContainerRef} className="timeline-box">
              {visibleLines.map((line, index) => {
                const lineId = safeText(line.lineRecId);
                const description = safeText(line.description);
                const amountText = formatAmountWithCurrency(line.amount ?? null, safeText(header?.currencyCode));
                const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");

                return (
                  <div key={`${lineId}-${index}`} className="timeline-item">
                    <div
                      className="timeline-card timeline-card--clickable"
                      role="button"
                      tabIndex={0}
                      onClick={() => goToLine(lineId)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          goToLine(lineId);
                        }
                      }}
                    >
                      <div className="timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600">
                        <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">{dateParts.year}</div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{dateParts.month}</div>
                        <div className="text-2xl font-semibold text-primary">{dateParts.day}</div>
                      </div>
                      <div className="timeline-card__content flex-1 py-3 px-4">
                        <p className="timeline-name expense-line-card__title" data-fulltext={description || lineId || "-"}>
                          {description || "-"}
                        </p>
                        <span className="expense-sheet-card__amount" data-fulltext={amountText}>
                          {amountText}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <CompactPagination
            totalPages={totalLinePages}
            currentPage={linePage}
            onPageChange={(page) => setLinePage(page)}
            labels={paginationLabels}
          />
        </section>
      ) : null}
    </div>
  );
};

// Main page entry for expense sheet detail.
const ExpenseSheetDetailPage = () => {
  return (
    <VisitasPageProviders>
      <ExpenseSheetDetailPageContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseSheetDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseSheetDetailPage;
