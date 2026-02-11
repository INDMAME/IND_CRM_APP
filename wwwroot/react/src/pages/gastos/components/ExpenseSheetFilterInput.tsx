import React, { useCallback } from "react";
import RemoteSearchCombobox, { type RemoteSearchOption } from "../../../components/commons/RemoteSearchCombobox.tsx";
import { ApiFetchError, fetchJson } from "../../../services/apiService.ts";
import type { ExpenseSheetListResponse } from "../expenseTypes.ts";
import { buildExpenseSheetSuggestPayload } from "../utils/expensePayloadBuilders.ts";

type ExpenseSheetFilterInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  enableRemoteSuggestions?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showLabel?: boolean;
};

const SEARCH_PAGE_SIZE = 50;

// Expense sheet filter input with remote list suggestions.
const ExpenseSheetFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  enableRemoteSuggestions = true,
  disabled = false,
  readOnly = false,
  showLabel = true,
}: ExpenseSheetFilterInputProps) => {
  const readOnlyMode = readOnly || disabled;

  const loadOptions = useCallback(async (term: string, signal: AbortSignal): Promise<RemoteSearchOption[]> => {
    const payload = buildExpenseSheetSuggestPayload(term, SEARCH_PAGE_SIZE);
    const response = await fetchJson<ExpenseSheetListResponse>("/Gastos/ListExpenseSheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      suppressPermissionModal: true,
      signal,
    });

    return (Array.isArray(response?.items) ? response.items : [])
      .map((item) => {
        const id = String(item?.hojaGastosId || "").trim();
        if (!id) return null;
        return {
          value: id,
          title: id,
          subtitle: String(item?.description || "").trim() || "-",
        } as RemoteSearchOption;
      })
      .filter(Boolean) as RemoteSearchOption[];
  }, []);

  if (!enableRemoteSuggestions || readOnlyMode) {
    return (
      <div className="space-y-2">
        {showLabel ? (
          <label className="form-label font-semibold" style={{ color: "#00296be0" }}>
            {label}
          </label>
        ) : null}
        <input
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm sm:text-base leading-5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={label}
          readOnly={readOnly}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <RemoteSearchCombobox
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSearch={async (term, signal) => {
        try {
          return await loadOptions(term, signal);
        } catch (error) {
          if (error instanceof ApiFetchError && error.status === 403) {
            return [];
          }
          throw error;
        }
      }}
      idBase="expense-sheet-filter"
      minSearchLength={2}
      disabled={disabled}
      readOnly={readOnly}
      showLabel={showLabel}
      panelClassName="visitas-typography"
    />
  );
};

export default ExpenseSheetFilterInput;
