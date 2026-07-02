import React, { useMemo } from "react";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetCreateLineDraft } from "../expenseTypes.ts";
import { getExpenseGastoTypeOptions } from "../constants/expenseGastoTypeCatalog.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import { formatExpenseInputNumber } from "../utils/expenseNumberFormat.ts";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";

type ExpenseSheetCreateLinesEditorProps = {
  lines: ExpenseSheetCreateLineDraft[];
  validationMessage?: string;
  onAddLine: () => void;
  onRemoveLine: (localId: string) => void;
  onLineChange: (localId: string, patch: Partial<ExpenseSheetCreateLineDraft>) => void;
};

const getInternationalOptions = (): ExpenseSelectOption[] => {
  return [
    { value: "false", text: indT("Common_No", "No") },
    { value: "true", text: indT("Common_Yes", "Yes") },
  ];
};

// Renders create-mode expense lines editor used by mode 0 and mode 2 payloads.
const ExpenseSheetCreateLinesEditor = ({
  lines,
  validationMessage = "",
  onAddLine,
  onRemoveLine,
  onLineChange,
}: ExpenseSheetCreateLinesEditorProps) => {
  const gastoTypeOptions = useMemo<ExpenseSelectOption[]>(() => {
    return getExpenseGastoTypeOptions();
  }, []);

  const internationalOptions = useMemo<ExpenseSelectOption[]>(() => getInternationalOptions(), []);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-primary">{indT("ExpenseSheets_Create_Lines", "Lines")}</h3>
        <button type="button" className="ind-action-btn px-3 py-1.5 text-xs" onClick={onAddLine}>
          {indT("Common_Add", "Add")}
        </button>
      </div>

      {validationMessage ? <p className="text-danger text-sm">{validationMessage}</p> : null}

      {lines.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] border border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-sm text-slate-600">
          {indT("ExpenseSheets_Create_NoLines", "Add at least one line.")}
        </div>
      ) : null}

      {lines.map((line, index) => (
        <div key={line.localId} className="rounded-[var(--radius-xl)] border border-slate-200 bg-white p-3 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {indT("ExpenseSheets_Line", "Line")} {index + 1}
            </span>
            <button
              type="button"
              className="text-xs font-semibold text-danger hover:underline"
              onClick={() => onRemoveLine(line.localId)}
            >
              {indT("Common_Delete", "Delete")}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_CreatedDate", "Date")}</label>
              <input
                className="form-control"
                type="date"
                value={line.transDate}
                onChange={(event) => onLineChange(line.localId, { transDate: event.target.value || "" })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Type", "Category")}</label>
              <select
                className="form-control"
                value={line.typeValueCode}
                onChange={(event) => onLineChange(line.localId, { typeValueCode: event.target.value || "" })}
              >
                <option value="">{indT("ExpenseSheets_Field_Type", "Category")}</option>
                {gastoTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Description", "Description")}</label>
              <input
                className="form-control"
                value={line.description}
                onChange={(event) => onLineChange(line.localId, { description: event.target.value || "" })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Price", "Price")}</label>
              <input
                className="form-control text-right tabular-nums"
                type="text"
                inputMode="decimal"
                value={line.price}
                onChange={(event) => onLineChange(line.localId, { price: event.target.value || "" })}
                onBlur={(event) =>
                  onLineChange(line.localId, {
                    price: formatExpenseInputNumber(event.target.value, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: true,
                      fallback: "",
                    }),
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Qty", "Quantity")}</label>
              <input
                className="form-control text-right tabular-nums"
                type="text"
                inputMode="decimal"
                value={line.qty}
                onChange={(event) => onLineChange(line.localId, { qty: event.target.value || "" })}
                onBlur={(event) =>
                  onLineChange(line.localId, {
                    qty: formatExpenseInputNumber(event.target.value, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: true,
                      fallback: "",
                    }),
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <ExpenseProjectFilterInput
                label={indT("ExpenseSheets_Field_Project", "Project")}
                placeholder={indT("ExpenseSheets_Filter_Project_Placeholder", "Project id")}
                value={line.projId}
                onChange={(value) => onLineChange(line.localId, { projId: value || "" })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_International", "International")}</label>
              <select
                className="form-control"
                value={line.internacional ? "true" : "false"}
                onChange={(event) => onLineChange(line.localId, { internacional: event.target.value === "true" })}
              >
                {internationalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={line.ticket}
                  onChange={(event) => onLineChange(line.localId, { ticket: event.target.checked })}
                />
                {indT("ExpenseSheets_Field_Ticket", "Ticket")}
              </label>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ExpenseSheetCreateLinesEditor;
