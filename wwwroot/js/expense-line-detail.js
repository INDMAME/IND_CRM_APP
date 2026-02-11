import {
  ExpenseReadOnlyField_default
} from "./chunks/chunk-X2LFSGYG.js";
import {
  formatAmountWithCurrency,
  safeText
} from "./chunks/chunk-MXXP6OB3.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-HGSHEZXJ.js";
import {
  ApiFetchError,
  canAccess,
  fetchJson,
  indT,
  showPermissionModal
} from "./chunks/chunk-V2CDSLX2.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var toBoolLabel = (value) => {
  if (value === true) return "true";
  if (value === false) return "false";
  return "-";
};
var ExpenseSheetLineDetailContent = () => {
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const lineId = safeText(window.__EXPENSE_LINE_ID__);
  const [header, setHeader] = (0, import_react.useState)(null);
  const [line, setLine] = (0, import_react.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
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
        const response = await fetchJson(
          `/Gastos/GetExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(sheetId)}&lineRecId=${encodeURIComponent(lineId)}`,
          {
            method: "GET",
            suppressPermissionModal: true
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
  const amountText = (0, import_react.useMemo)(
    () => formatAmountWithCurrency(line?.amount ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.amount]
  );
  const detailRows = (0, import_react.useMemo)(
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
      { label: indT("ExpenseSheets_Field_Attachments", "Attachments"), value: safeText(line?.indAttachFiles) || "-" }
    ],
    [amountText, header, line]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !errorMessage && line ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: detailRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseReadOnlyField_default, { label: row.label, value: row.value, fullWidth: row.fullWidth }, row.label)) }) }) : null
  ] });
};
var ExpenseSheetLineDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseSheetLineDetailContent, {}) });
};
var mount = () => {
  const rootEl = document.getElementById("expense-line-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseSheetLineDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetLineDetailPage_default = ExpenseSheetLineDetailPage;
export {
  ExpenseSheetLineDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9saW5lL0V4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIsIEV4cGVuc2VTaGVldExpbmUsIEV4cGVuc2VTaGVldExpbmVEZXRhaWxSZXNwb25zZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxuY29uc3QgdG9Cb29sTGFiZWwgPSAodmFsdWU6IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSB0cnVlKSByZXR1cm4gXCJ0cnVlXCI7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHJldHVybiBcImZhbHNlXCI7XG4gIHJldHVybiBcIi1cIjtcbn07XG5cbmNvbnN0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xuICBjb25zdCBsaW5lSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0xJTkVfSURfXyk7XG5cbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGluZSwgc2V0TGluZV0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzaGVldElkIHx8ICFsaW5lSWQpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCBsaW5lIHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEV4cGVuc2VTaGVldExpbmVEZXRhaWxSZXNwb25zZT4oXG4gICAgICAgICAgYC9HYXN0b3MvR2V0RXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9JmxpbmVSZWNJZD0ke2VuY29kZVVSSUNvbXBvbmVudChsaW5lSWQpfWAsXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uc3VjY2VzcyA9PT0gZmFsc2UgfHwgIXJlc3BvbnNlPy5kYXRhKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5tZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGxpbmUgZGV0YWlsLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmUobnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0SGVhZGVyKHJlc3BvbnNlLmRhdGEuaGVhZGVyIHx8IG51bGwpO1xuICAgICAgICBzZXRMaW5lKHJlc3BvbnNlLmRhdGEubGluZSB8fCBudWxsKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgbGluZSBkZXRhaWwuXCIpKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lKG51bGwpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XG4gIH0sIFtoYXNBY2Nlc3MsIGxpbmVJZCwgc2hlZXRJZF0pO1xuXG4gIGNvbnN0IGFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lPy5hbW91bnQgPz8gbnVsbCwgc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpKSxcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGxpbmU/LmFtb3VudF1cbiAgKTtcblxuICBjb25zdCBkZXRhaWxSb3dzID0gdXNlTWVtbyhcbiAgICAoKSA9PiBbXG4gICAgICB7IGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TaGVldElkXCIsIFwiU2hlZXQgaWRcIiksIHZhbHVlOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCkgfHwgXCItXCIgfSxcbiAgICAgIHsgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0xpbmVJZFwiLCBcIkxpbmUgaWRcIiksIHZhbHVlOiBzYWZlVGV4dChsaW5lPy5saW5lUmVjSWQpIHx8IFwiLVwiIH0sXG4gICAgICB7IGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKSwgdmFsdWU6IHNhZmVUZXh0KGxpbmU/LnByb2pJZCB8fCBoZWFkZXI/LnByb2pJZCkgfHwgXCItXCIgfSxcbiAgICAgIHsgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIiksIHZhbHVlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSkgfHwgXCItXCIgfSxcbiAgICAgIHsgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIiksIHZhbHVlOiBzYWZlVGV4dChsaW5lPy5kZXNjcmlwdGlvbiB8fCBoZWFkZXI/LmRlc2NyaXB0aW9uKSB8fCBcIi1cIiwgZnVsbFdpZHRoOiB0cnVlIH0sXG4gICAgICB7IGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIiksIHZhbHVlOiBzYWZlVGV4dChsaW5lPy50cmFuc0RhdGUgfHwgaGVhZGVyPy50cmFuc0RhdGUpIHx8IFwiLVwiIH0sXG4gICAgICB7IGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpLCB2YWx1ZTogc2FmZVRleHQoaGVhZGVyPy5leGNoUmF0ZSkgfHwgXCItXCIgfSxcbiAgICAgIHsgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1R5cGVcIiwgXCJUeXBlXCIpLCB2YWx1ZTogc2FmZVRleHQobGluZT8udHlwZVZhbHVlKSB8fCBcIi1cIiB9LFxuICAgICAgeyBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpLCB2YWx1ZTogYW1vdW50VGV4dCB8fCBcIi1cIiB9LFxuICAgICAgeyBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUXR5XCIsIFwiUXVhbnRpdHlcIiksIHZhbHVlOiBsaW5lPy5xdHkgIT0gbnVsbCA/IFN0cmluZyhsaW5lLnF0eSkgOiBcIi1cIiB9LFxuICAgICAgeyBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfSW50ZXJuYXRpb25hbFwiLCBcIkludGVybmF0aW9uYWxcIiksIHZhbHVlOiB0b0Jvb2xMYWJlbChsaW5lPy5pbnRlcm5hY2lvbmFsKSB9LFxuICAgICAgeyBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVGlja2V0XCIsIFwiVGlja2V0XCIpLCB2YWx1ZTogdG9Cb29sTGFiZWwobGluZT8udGlja2V0KSB9LFxuICAgICAgeyBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQXR0YWNobWVudHNcIiwgXCJBdHRhY2htZW50c1wiKSwgdmFsdWU6IHNhZmVUZXh0KGxpbmU/LmluZEF0dGFjaEZpbGVzKSB8fCBcIi1cIiB9LFxuICAgIF0sXG4gICAgW2Ftb3VudFRleHQsIGhlYWRlciwgbGluZV1cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGxpbmUgPyAoXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICB7ZGV0YWlsUm93cy5tYXAoKHJvdykgPT4gKFxuICAgICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQga2V5PXtyb3cubGFiZWx9IGxhYmVsPXtyb3cubGFiZWx9IHZhbHVlPXtyb3cudmFsdWV9IGZ1bGxXaWR0aD17cm93LmZ1bGxXaWR0aH0gLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lIGRldGFpbC5cbmNvbnN0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxFeHBlbnNlU2hlZXRMaW5lRGV0YWlsQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLWxpbmUtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0TGluZURldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldExpbmVEZXRhaWxQYWdlO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUFvRDtBQXVHOUM7QUE1Rk4sSUFBTSxjQUFjLENBQUMsVUFBOEM7QUFDakUsTUFBSSxVQUFVLEtBQU0sUUFBTztBQUMzQixNQUFJLFVBQVUsTUFBTyxRQUFPO0FBQzVCLFNBQU87QUFDVDtBQUVBLElBQU0sZ0NBQWdDLE1BQU07QUFDMUMsUUFBTSxZQUFZLFVBQVUscUJBQXFCLE1BQU07QUFDdkQsUUFBTSxVQUFVLFNBQVMsT0FBTyxvQkFBb0I7QUFDcEQsUUFBTSxTQUFTLFNBQVMsT0FBTyxtQkFBbUI7QUFFbEQsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHVCQUFvQyxJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx1QkFBa0MsSUFBSTtBQUM5RCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksdUJBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksdUJBQVMsRUFBRTtBQUVuRCw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxhQUFhLFlBQVk7QUFDN0IsVUFBSSxDQUFDLFdBQVc7QUFDZCw0QkFBb0I7QUFDcEI7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO0FBQ3ZCLHdCQUFnQixLQUFLLDBCQUEwQixtQ0FBbUMsQ0FBQztBQUNuRjtBQUFBLE1BQ0Y7QUFFQSxtQkFBYSxJQUFJO0FBQ2pCLHNC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
