import React, { useCallback } from "react";
import RemoteSearchCombobox, { type RemoteSearchOption } from "../../../components/commons/RemoteSearchCombobox.tsx";
import { fetchJson } from "../../../services/apiService.ts";

type ExpenseProjectFilterInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
};

type ProjectDropdownResponse = {
  items?: Array<{ value?: string; text?: string }>;
};

const SEARCH_PAGE_SIZE = 20;

// Project filter input backed by remote dropdown suggestions.
const ExpenseProjectFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
}: ExpenseProjectFilterInputProps) => {
  const loadOptions = useCallback(async (term: string, signal: AbortSignal): Promise<RemoteSearchOption[]> => {
    const url = `/Gastos/GetProjectsForDropdown?term=${encodeURIComponent(term)}&page=1&pageSize=${SEARCH_PAGE_SIZE}`;
    const response = await fetchJson<ProjectDropdownResponse>(url, {
      signal,
      suppressPermissionModal: true,
    });

    return (Array.isArray(response?.items) ? response.items : [])
      .map((item) => {
        const valueText = String(item?.value || "").trim();
        if (!valueText) return null;
        const subtitle = String(item?.text || "").trim();
        return {
          value: valueText,
          title: valueText,
          subtitle: subtitle || "-",
        } as RemoteSearchOption;
      })
      .filter(Boolean) as RemoteSearchOption[];
  }, []);

  return (
    <RemoteSearchCombobox
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSearch={loadOptions}
      idBase="expense-project-filter"
      minSearchLength={2}
      disabled={disabled}
      readOnly={readOnly}
      showLabel={showLabel}
      panelClassName="visitas-typography"
    />
  );
};

export default ExpenseProjectFilterInput;
