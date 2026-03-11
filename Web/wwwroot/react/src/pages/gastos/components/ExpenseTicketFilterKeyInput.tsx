import React, { useCallback } from "react";
import RemoteSearchCombobox, { type RemoteSearchOption } from "../../../components/commons/RemoteSearchCombobox.tsx";
import { ApiFetchError } from "../../../services/apiService.ts";
import type {
  ExpenseSheetTicketLinkListItemDto,
  ExpenseSheetTicketLinkListRequest,
  ExpenseSheetTicketListItemDto,
  ExpenseSheetTicketListRequest,
} from "../expenseTypes.ts";
import { fetchExpenseSheetTicketLinkList, fetchExpenseSheetTicketsList } from "../utils/expenseApi.ts";

type ExpenseTicketFilterKeyInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  mode?: "general" | "link";
  createdDateFrom?: string;
  createdDateTo?: string;
  enableRemoteSuggestions?: boolean;
  fixedStatusFilter?: 0 | 1 | null;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
};

const SEARCH_PAGE_SIZE = 30;

// Builds minimal payload for ticket key suggestions without date filters.
const buildTicketSuggestPayload = (
  term: string,
  page: number,
  pageSize: number,
  fixedStatusFilter: 0 | 1 | null,
  createdDateFrom: string | undefined,
  createdDateTo: string | undefined
): ExpenseSheetTicketListRequest | ExpenseSheetTicketLinkListRequest => {
  const safeTerm = String(term || "").trim();
  const basePayload = {
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : SEARCH_PAGE_SIZE,
    createdDateFrom: createdDateFrom || undefined,
    createdDateTo: createdDateTo || undefined,
    searchKey: safeTerm || undefined,
    filter: safeTerm || undefined,
  };

  if (fixedStatusFilter === 0 || fixedStatusFilter === 1) {
    return {
      ...basePayload,
      status: fixedStatusFilter,
    };
  }

  return basePayload;
};

const mapTicketOptions = (
  items: Array<ExpenseSheetTicketListItemDto | ExpenseSheetTicketLinkListItemDto> | undefined
): RemoteSearchOption[] => {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const fileId = String(item?.FileId || "").trim();
      if (!fileId) return null;

      const description = String(item?.Description || "").trim();
      const subtitle = description || "-";
      return {
        value: fileId,
        title: fileId,
        subtitle,
      } as RemoteSearchOption;
    })
    .filter(Boolean) as RemoteSearchOption[];
};

// Ticket key filter input with remote list suggestions.
const ExpenseTicketFilterKeyInput = ({
  label,
  placeholder,
  value,
  onChange,
  mode = "general",
  createdDateFrom = "",
  createdDateTo = "",
  enableRemoteSuggestions = true,
  fixedStatusFilter = null,
  readOnly = false,
  disabled = false,
  showLabel = true,
}: ExpenseTicketFilterKeyInputProps) => {
  const readOnlyMode = readOnly || disabled;

  const loadOptions = useCallback(async (term: string, signal: AbortSignal): Promise<RemoteSearchOption[]> => {
    const payload = buildTicketSuggestPayload(term, 1, SEARCH_PAGE_SIZE, fixedStatusFilter, createdDateFrom, createdDateTo);
    const response =
      mode === "link"
        ? await fetchExpenseSheetTicketLinkList(payload as ExpenseSheetTicketLinkListRequest, {
            suppressPermissionModal: true,
            signal,
          })
        : await fetchExpenseSheetTicketsList(payload as ExpenseSheetTicketListRequest, {
            suppressPermissionModal: true,
            signal,
          });

    if (response?.Success === false) {
      return [];
    }

    return mapTicketOptions(response?.Items);
  }, [createdDateFrom, createdDateTo, fixedStatusFilter, mode]);

  const loadOptionsPage = useCallback(async (term: string, page: number, _pageSize: number, signal: AbortSignal) => {
    const payload = buildTicketSuggestPayload(
      term,
      page,
      SEARCH_PAGE_SIZE,
      fixedStatusFilter,
      createdDateFrom,
      createdDateTo
    );
    const response =
      mode === "link"
        ? await fetchExpenseSheetTicketLinkList(payload as ExpenseSheetTicketLinkListRequest, {
            suppressPermissionModal: true,
            signal,
          })
        : await fetchExpenseSheetTicketsList(payload as ExpenseSheetTicketListRequest, {
            suppressPermissionModal: true,
            signal,
          });

    if (response?.Success === false) {
      return {
        items: [],
        total: 0,
      };
    }

    return {
      items: mapTicketOptions(response?.Items),
      total: Number(response?.Total || 0),
    };
  }, [createdDateFrom, createdDateTo, fixedStatusFilter, mode]);

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
      idBase="expense-ticket-filter-key"
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

export default ExpenseTicketFilterKeyInput;
