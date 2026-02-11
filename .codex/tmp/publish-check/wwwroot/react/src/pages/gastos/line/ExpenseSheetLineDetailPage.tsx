import React, { useEffect, useMemo, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import { ApiFetchError, fetchJson } from "../../../services/apiService.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import type { ExpenseSheetHeader, ExpenseSheetLine, ExpenseSheetLineDetailResponse } from "../expenseTypes.ts";

const safeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const toBoolLabel = (value: boolean | null | undefined): string => {
  if (value === true) return "true";
  if (value === false) return "false";
  return "-";
};

const ExpenseSheetLineDetailContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const lineId = safeText(window.__EXPENSE_LINE_ID__);

  const [header, setHeader] = useState<ExpenseSheetHeader | null>(null);
  const [line, setLine] = useState<ExpenseSheetLine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        showPermissionModal();
        return;
      }

      if (!sheetId || !lineId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetchJson<ExpenseSheetLineDetailResponse>(
          `/Gastos/GetExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(sheetId)}&lineRecId=${encodeURIComponent(lineId)}`,
          {
            method: "GET",
            suppressPermissionModal: true,
          }
        );

        if (response?.success === false || !response?.data) {
          setErrorMessage(response?.message || indT("ExpenseSheets_LoadError", "Could not load line detail."));
          setHeader(null);
          setLine(null);
          return;
        }

        setHeader(response.data.header || null);
        setLine(response.data.line || null);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          showPermissionModal();
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load line detail."));
        setHeader(null);
        setLine(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDetail();
  }, [hasAccess, lineId, sheetId]);

  const detailRows = useMemo(
    () => [
      { label: indT("ExpenseSheets_Field_SheetId", "Sheet id"), value: safeText(header?.hojaGastosId) || "-" },
      { label: indT("ExpenseSheets_Field_LineId", "Line id"), value: safeText(line?.lineRecId) || "-" },
      { label: indT("ExpenseSheets_Field_Project", "Project"), value: safeText(line?.projId || header?.projId) || "-" },
      { label: indT("ExpenseSheets_Field_Currency", "Currency"), value: safeText(header?.currencyCode) || "-" },
      { label: indT("ExpenseSheets_Field_Description", "Description"), value: safeText(line?.description || header?.description) || "-" },
      { label: indT("ExpenseSheets_Field_CreatedDate", "Date"), value: safeText(line?.transDate || header?.transDate) || "-" },
      { label: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"), value: safeText(header?.exchRate) || "-" },
      { label: indT("ExpenseSheets_Field_Type", "Type"), value: safeText(line?.typeValue) || "-" },
      { label: indT("ExpenseSheets_Field_Amount", "Amount"), value: line?.amount != null ? String(line.amount) : "-" },
      { label: indT("ExpenseSheets_Field_Qty", "Quantity"), value: line?.qty != null ? String(line.qty) : "-" },
      { label: indT("ExpenseSheets_Field_International", "International"), value: toBoolLabel(line?.internacional) },
      { label: indT("ExpenseSheets_Field_Ticket", "Ticket"), value: toBoolLabel(line?.ticket) },
      { label: indT("ExpenseSheets_Field_Attachments", "Attachments"), value: safeText(line?.indAttachFiles) || "-" },
    ],
    [header, line]
  );

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

      {!isLoading && !errorMessage && line ? (
        <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold text-primary mb-3">{indT("ExpenseSheets_Header", "Header")}</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {detailRows.map((row) => (
              <div key={row.label} className="rounded-md border border-slate-100 px-3 py-2">
                <dt className="text-xs text-slate-500">{row.label}</dt>
                <dd className="text-sm text-slate-800">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </div>
  );
};

// Main page entry for expense sheet line detail.
const ExpenseSheetLineDetailPage = () => {
  return (
    <VisitasPageProviders>
      <ExpenseSheetLineDetailContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  const rootEl = document.getElementById("expense-line-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseSheetLineDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseSheetLineDetailPage;
