import React, { useCallback } from "react";
import RemoteSearchCombobox, { type RemoteSearchOption } from "../../../components/commons/RemoteSearchCombobox.tsx";
import { ApiFetchError } from "../../../services/apiService.ts";
import type { ExpenseSheetListItemDto } from "../expenseTypes.ts";
import { buildExpenseSheetSuggestPayload } from "../utils/expensePayloadBuilders.ts";
import { fetchExpenseSheetList } from "../utils/expenseApi.ts";

type ExpenseSheetFilterInputProps = {
  label: string;
  placeholder: string;
  value: string;
  managedUserId?: string;
  includeSubordinates?: boolean;
  onChange: (value: string) => void;
  enableRemoteSuggestions?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showLabel?: boolean;
};

const SEARCH_PAGE_SIZE = 20;

const formatSheetOptionTitle = (sheetId: string, ownerUserId: string): string => {
  if (!ownerUserId) return sheetId;
  return `${sheetId} (${ownerUserId})`;
};

const mapSheetOptions = (items: ExpenseSheetListItemDto[] | undefined): RemoteSearchOption[] => {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const id = String(item?.HojaGastosId || "").trim();
      const ownerUserId = String(item?.UserId || "").trim();
      if (!id) return null;
      return {
        value: id,
        title: formatSheetOptionTitle(id, ownerUserId),
        subtitle: String(item?.Description || "").trim() || "-",
      } as RemoteSearchOption;
    })
    .filter(Boolean) as RemoteSearchOption[];
};

// Expense sheet filter input with remote list suggestions.
const ExpenseSheetFilterInput = ({
  label,
  placeholder,
  value,
  managedUserId = "",
  includeSubordinates = false,
  onChange,
  enableRemoteSuggestions = true,
  disabled = false,
  readOnly = false,
  showLabel = true,
}: ExpenseSheetFilterInputProps) => {
  const readOnlyMode = readOnly || disabled;
  const normalizedManagedUserId = String(managedUserId || "").trim();

  const loadOptions = useCallback(async (term: string, signal: AbortSignal): Promise<RemoteSearchOption[]> => {
    const payload = buildExpenseSheetSuggestPayload(term, SEARCH_PAGE_SIZE, 1, includeSubordinates);
    const response = await fetchExpenseSheetList(payload, {
      suppressPermissionModal: true,
      axUserIdOverride: normalizedManagedUserId || undefined,
      signal,
    });

    if (response?.Success === false) {
      return [];
    }

    return mapSheetOptions(response?.Items);
  }, [includeSubordinates, normalizedManagedUserId]);

  const loadOptionsPage = useCallback(async (term: string, page: number, pageSize: number, signal: AbortSignal) => {
    const payload = buildExpenseSheetSuggestPayload(term, pageSize, page, includeSubordinates);
    const response = await fetchExpenseSheetList(payload, {
      suppressPermissionModal: true,
      axUserIdOverride: normalizedManagedUserId || undefined,
      signal,
    });

    if (response?.Success === false) {
      return {
        items: [],
        total: 0,
      };
    }

    return {
      items: mapSheetOptions(response?.Items),
      total: Number(response?.Total || 0),
    };
  }, [includeSubordinates, normalizedManagedUserId]);

  if (!enableRemoteSuggestions || readOnlyMode) {
    return (
      <div className="space-y-2">
        {showLabel ? (
          <label className="form-label font-semibold" style={{ color: "#00296be0" }}>
            {label}
          </label>
        ) : null}
        <input
          className="w-full rounded-[var(--radius-xl)] border border-slate-200 px-3 py-2 text-sm sm:text-base leading-5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary"
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
      onSearchPage={async (term, page, pageSize, signal) => {
        try {
          return await loadOptionsPage(term, page, pageSize, signal);
        } catch (error) {
          if (error instanceof ApiFetchError && error.status === 403) {
            return { items: [], total: 0 };
          }
          throw error;
        }
      }}
      idBase="expense-sheet-filter"
      minSearchLength={0}
      pageSize={SEARCH_PAGE_SIZE}
      allowEmptySearch
      loadOnOpen
      infiniteScroll
      disabled={disabled}
      readOnly={readOnly}
      showLabel={showLabel}
      panelClassName="visitas-typography"
    />
  );
};

export default ExpenseSheetFilterInput;
