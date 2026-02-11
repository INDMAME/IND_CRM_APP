import React, { useEffect, useMemo, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import { ApiFetchError, fetchJson } from "../../../services/apiService.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import type { ExpenseSheetHeader, ExpenseSheetLine, ExpenseSheetLineDetailResponse } from "../expenseTypes.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import ExpenseReadOnlyField from "../components/ExpenseReadOnlyField.tsx";
import { safeText } from "../utils/expenseUiUtils.ts";

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

  const amountText = useMemo(
    () => formatAmountWithCurrency(line?.amount ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.amount]
  );

  const detailRows = useMemo(
    () => [
      { label: indT("ExpenseSheets_Field_SheetId", "Sheet id"), value: safeText(header?.hojaGastosId) || "-" },
      { label: indT("ExpenseSheets_Field_LineId", "Line id"), value: safeText(line?.lineRecId) || "-" },
      { label: indT("ExpenseSheets_Field_Project", "Project"), value: safeText(line?.projId || header?.projId) || "-" },
      { label: indT("ExpenseSheets_Field_Currency", "Currency"), value: safeText(header?.currencyCode) || "-" },
      { label: indT("ExpenseSheets_Field_Description", "Description"), value: safeText(line?.description || header?.description) || "-", fullWidth: true },
      { label: indT("ExpenseSheets_Field_CreatedDate", "Date"), value: safeText(line?.transDate || header?.transDate) || "-" },
      { label: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"), value: safeText(header?.exchRate) || "-" },
      { label: indT("ExpenseSheets_Field_Type", "Type"), value: safeText(line?.typeValue) || "-" },
      { label: indT("ExpenseSheets_Field_Amount", "Amount"), value: amountText || "-" },
      { label: indT("ExpenseSheets_Field_Qty", "Quantity"), value: line?.qty != null ? String(line.qty) : "-" },
      { label: indT("ExpenseSheets_Field_International", "International"), value: toBoolLabel(line?.internacional) },
      { label: indT("ExpenseSheets_Field_Ticket", "Ticket"), value: toBoolLabel(line?.ticket) },
      { label: indT("ExpenseSheets_Field_Attachments", "Attachments"), value: safeText(line?.indAttachFiles) || "-" },
    ],
    [amountText, header, line]
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
        <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detailRows.map((row) => (
              <ExpenseReadOnlyField key={row.label} label={row.label} value={row.value} fullWidth={row.fullWidth} />
            ))}
          </div>
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
