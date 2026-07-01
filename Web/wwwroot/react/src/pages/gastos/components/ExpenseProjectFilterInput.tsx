import React, { useCallback } from "react";
import RemoteSearchCombobox, { type RemoteSearchOption } from "../../../components/commons/RemoteSearchCombobox.tsx";
import { fetchExpenseProjects } from "../utils/expenseApi.ts";

type ExpenseProjectFilterInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onCommit?: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  containerClassName?: string;
  labelClassName?: string;
};

type ProjectOptionLike = {
  value?: string;
  Value?: string;
  text?: string;
  Text?: string;
  projId?: string;
  ProjId?: string;
  name?: string;
  Name?: string;
  description?: string;
  Description?: string;
};

const SEARCH_PAGE_SIZE = 50;

const mapProjectOptions = (items: ProjectOptionLike[] | undefined): RemoteSearchOption[] => {
  return (Array.isArray(items) ? items : [])
    .flatMap((item) => {
      const valueText = String(item?.value || item?.Value || item?.projId || item?.ProjId || "").trim();
      if (!valueText) return [];
      const subtitle = String(
        item?.text || item?.Text || item?.name || item?.Name || item?.description || item?.Description || ""
      ).trim();
      return [{
        value: valueText,
        title: valueText,
        subtitle: subtitle || "-",
      }];
    });
};

// Project filter input backed by remote dropdown suggestions.
const ExpenseProjectFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  onCommit,
  readOnly = false,
  disabled = false,
  showLabel = true,
  containerClassName,
  labelClassName,
}: ExpenseProjectFilterInputProps) => {
  const loadOptions = useCallback(async (term: string, signal: AbortSignal): Promise<RemoteSearchOption[]> => {
    const response = await fetchExpenseProjects(term, 1, SEARCH_PAGE_SIZE, {
      signal,
      suppressPermissionModal: true,
    });

    return mapProjectOptions(response?.items || response?.Items);
  }, []);

  const loadOptionsPage = useCallback(async (term: string, page: number, pageSize: number, signal: AbortSignal) => {
    const response = await fetchExpenseProjects(term, page, pageSize, {
      signal,
      suppressPermissionModal: true,
    });

    return {
      items: mapProjectOptions(response?.items || response?.Items),
      total: Number(response?.total || response?.Total || 0),
    };
  }, []);

  return (
    <RemoteSearchCombobox
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onCommit={onCommit}
      onSearch={loadOptions}
      onSearchPage={loadOptionsPage}
      idBase="expense-project-filter"
      minSearchLength={0}
      pageSize={SEARCH_PAGE_SIZE}
      allowEmptySearch
      loadOnOpen
      openSearchMode="empty-query"
      infiniteScroll
      disabled={disabled}
      readOnly={readOnly}
      showLabel={showLabel}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
      panelClassName="visitas-typography"
    />
  );
};

export default ExpenseProjectFilterInput;
