import React, { useEffect, useMemo, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import CompactPagination from "../../../components/commons/CompactPagination.tsx";
import { ApiFetchError, fetchJson } from "../../../services/apiService.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import type { ExpenseSheetDetailResponse, ExpenseSheetHeader, ExpenseSheetLine } from "../expenseTypes.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";

const LINES_PAGE_SIZE = 6;

const safeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const toBoolLabel = (value: boolean | null | undefined): string => {
  if (value === true) return "true";
  if (value === false) return "false";
  return "-";
};

const pagedSlice = <T,>(items: T[], page: number, pageSize: number): T[] => {
  if (!items.length) return [];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

const ExpenseSheetDetailPageContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);

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

  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const visibleLines = useMemo(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalAmountText = useMemo(
    () => formatAmountWithCurrency(header?.totalAmountMST ?? null, safeText(header?.currencyCode)),
    [header]
  );

  const goToLine = (lineRecId: string) => {
    const safeLineId = safeText(lineRecId);
    if (!safeLineId) return;
    window.location.href = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(sheetId)}&lineRecId=${encodeURIComponent(safeLineId)}`;
  };

  return (
    <div className="space-y-2">
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
        <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-primary mb-3">{indT("ExpenseSheets_Header", "Header")}</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="rounded-md border border-slate-100 px-3 py-2">
              <dt className="text-xs text-slate-500">{indT("ExpenseSheets_Field_SheetId", "Sheet id")}</dt>
              <dd className="text-sm text-slate-800">{safeText(header.hojaGastosId) || "-"}</dd>
            </div>
            <div className="rounded-md border border-slate-100 px-3 py-2 sm:col-span-2">
              <dt className="text-xs text-slate-500">{indT("ExpenseSheets_Field_Description", "Description")}</dt>
              <dd className="text-sm text-slate-800">{safeText(header.description) || "-"}</dd>
            </div>
            <div className="rounded-md border border-slate-100 px-3 py-2">
              <dt className="text-xs text-slate-500">{indT("ExpenseSheets_Field_UserId", "User id")}</dt>
              <dd className="text-sm text-slate-800">{safeText(header.userId) || "-"}</dd>
            </div>
            <div className="rounded-md border border-slate-100 px-3 py-2">
              <dt className="text-xs text-slate-500">{indT("ExpenseSheets_Field_Currency", "Currency")}</dt>
              <dd className="text-sm text-slate-800">{safeText(header.currencyCode) || "-"}</dd>
            </div>
            <div className="rounded-md border border-slate-100 px-3 py-2">
              <dt className="text-xs text-slate-500">{indT("ExpenseSheets_Field_TotalAmount", "Total amount")}</dt>
              <dd className="text-sm text-slate-800">{totalAmountText}</dd>
            </div>
            <div className="rounded-md border border-slate-100 px-3 py-2">
              <dt className="text-xs text-slate-500">{indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate")}</dt>
              <dd className="text-sm text-slate-800">{safeText(header.exchRate) || "-"}</dd>
            </div>
            <div className="rounded-md border border-slate-100 px-3 py-2">
              <dt className="text-xs text-slate-500">{indT("ExpenseSheets_Field_Project", "Project")}</dt>
              <dd className="text-sm text-slate-800">{safeText(header.projId) || "-"}</dd>
            </div>
            <div className="rounded-md border border-slate-100 px-3 py-2">
              <dt className="text-xs text-slate-500">{indT("ExpenseSheets_Field_Voucher", "Voucher")}</dt>
              <dd className="text-sm text-slate-800">{safeText(header.voucher) || "-"}</dd>
            </div>
          </dl>
        </section>
      ) : null}

      {!isLoading && !errorMessage ? (
        <section>
          <h2 className="text-base font-semibold text-primary mb-3">{indT("ExpenseSheets_Lines", "Lines")}</h2>

          {visibleLines.length === 0 ? (
            <div className="timeline-box timeline-empty" data-empty-text={indT("ExpenseSheets_NoLines", "No lines for this expense sheet.")} />
          ) : (
            <div className="timeline-box">
              {visibleLines.map((line, index) => {
                const lineId = safeText(line.lineRecId);
                const description = safeText(line.description);
                const amount = line.amount ?? null;
                const qty = line.qty ?? null;
                const transDate = safeText(line.transDate);

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
                        <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">{lineId || "-"}</div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{safeText(line.typeValue) || "-"}</div>
                        <div className="text-2xl font-semibold text-primary">{qty ?? "-"}</div>
                      </div>
                      <div className="timeline-card__content flex-1 py-3 px-4">
                        <div className="timeline-name" data-fulltext={description || lineId}>{description || "-"}</div>
                        <p className="timeline-desc-text" data-fulltext={transDate || "-"}>
                          {indT("ExpenseSheets_Field_TransDate", "Date")}: {transDate || "-"}
                        </p>
                        <p className="timeline-desc-text" data-fulltext={String(amount ?? "-")}>
                          {indT("ExpenseSheets_Field_Amount", "Amount")}: {amount ?? "-"}
                        </p>
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
