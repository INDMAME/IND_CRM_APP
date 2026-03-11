import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import type { AuthManagedUser } from "../../../context/AuthContext.tsx";
import { indT } from "../../../utils/indI18n.ts";
import HistorySummary from "../../visitas/historial/HistorySummary.tsx";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import {
  getExpenseTicketStatusFilterOptions,
  normalizeExpenseTicketStatusFilterCode,
  type ExpenseTicketStatusFilterCode,
} from "../constants/expenseTicketStatusCatalog.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import type { ExpenseTicketProcessedByIaFilter, ExpenseTicketQuickFilterId } from "../tickets/expenseTicketListTypes.ts";
import ExpenseCurrencyFilterSelect from "./ExpenseCurrencyFilterSelect.tsx";
import ExpenseDateRangeFilter from "./ExpenseDateRangeFilter.tsx";
import ExpenseFilterActions from "./ExpenseFilterActions.tsx";
import ExpenseManagedUserFilterSelect from "./ExpenseManagedUserFilterSelect.tsx";
import ExpenseProcessedByIaFilterSelect from "./ExpenseProcessedByIaFilterSelect.tsx";
import ExpenseQuickDateFilters from "./ExpenseQuickDateFilters.tsx";
import ExpenseTicketFilterKeyInput from "./ExpenseTicketFilterKeyInput.tsx";

const parseIsoDate = (raw: string): Date | null => {
  if (!raw) return null;
  const value = String(raw).trim().split("T")[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDate = (raw: string, locale: string): string => {
  const date = parseIsoDate(raw);
  if (!date) return "--";
  return date
    .toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/\./g, "")
    .toLowerCase();
};

type ExpenseTicketsFiltersPanelProps = {
  mode: "general" | "link";
  visible: boolean;
  showManualDateFilter: boolean;
  manualDateAutoOpenKey: number;
  fromDate: string;
  toDate: string;
  filterKey: string;
  currencyCode: string;
  managedUserId: string;
  managedUsers: AuthManagedUser[];
  showManagedUserFilter: boolean;
  statusFilter: ExpenseTicketStatusFilterCode;
  gastoTypeFilter: "" | ExpenseGastoTypeCode;
  processedByIaFilter: ExpenseTicketProcessedByIaFilter;
  activeQuickFilter: ExpenseTicketQuickFilterId | null;
  showManualDateError: boolean;
  statusFilterReadOnly?: boolean;
  fixedStatusFilter?: 0 | 1 | null;
  gastoTypeOptions: ExpenseSelectOption[];
  onDateRangeChange: (fromDate: string, toDate: string) => void;
  onManualRangeComplete: (fromDate: string, toDate: string) => void;
  onQuickFilterChange: (filterId: ExpenseTicketQuickFilterId) => void;
  onFilterKeyChange: (value: string) => void;
  onCurrencyCodeChange: (value: string) => void;
  onManagedUserIdChange: (value: string) => void;
  onStatusFilterChange: (value: ExpenseTicketStatusFilterCode) => void;
  onGastoTypeFilterChange: (value: "" | ExpenseGastoTypeCode) => void;
  onProcessedByIaFilterChange: (value: ExpenseTicketProcessedByIaFilter) => void;
  onClear: () => void;
  onApply: () => void;
};

// Shared tickets filter panel with global quick date filters and fixed ticket filters.
const ExpenseTicketsFiltersPanel = ({
  mode,
  visible,
  showManualDateFilter,
  manualDateAutoOpenKey,
  fromDate,
  toDate,
  filterKey,
  currencyCode,
  managedUserId,
  managedUsers,
  showManagedUserFilter,
  statusFilter,
  gastoTypeFilter,
  processedByIaFilter,
  activeQuickFilter,
  showManualDateError,
  statusFilterReadOnly = false,
  fixedStatusFilter = null,
  gastoTypeOptions,
  onDateRangeChange,
  onManualRangeComplete,
  onQuickFilterChange,
  onFilterKeyChange,
  onCurrencyCodeChange,
  onManagedUserIdChange,
  onStatusFilterChange,
  onGastoTypeFilterChange,
  onProcessedByIaFilterChange,
  onClear,
  onApply,
}: ExpenseTicketsFiltersPanelProps) => {
  const statusOptions = useMemo(() => getExpenseTicketStatusFilterOptions(), []);

  const categoryOptions = useMemo<ExpenseSelectOption[]>(() => {
    return [
      { value: "", text: indT("Tickets_Filter_All", "All") },
      ...gastoTypeOptions,
    ];
  }, [gastoTypeOptions]);

  if (!visible) return null;
  const locale = document?.documentElement?.lang || "es-ES";
  const showInlineDateSummary = !showManualDateFilter && !!fromDate && !!toDate;
  const showStatusFilter = mode === "general";
  const desktopColumnsClassName = showManagedUserFilter
    ? (showStatusFilter ? "lg:grid-cols-6" : "lg:grid-cols-5")
    : (showStatusFilter ? "lg:grid-cols-5" : "lg:grid-cols-4");

  return (
    <div className="filter-card filter-card--expanded p-2 sm:p-2.5 relative">
      <div className="history-filter-stack flex flex-col space-y-2">
        <ExpenseQuickDateFilters activeQuickFilter={activeQuickFilter} onQuickFilterChange={onQuickFilterChange} />

        {showManualDateFilter ? (
          <ExpenseDateRangeFilter
            fromDate={fromDate}
            toDate={toDate}
            onChange={onDateRangeChange}
            onRangeComplete={onManualRangeComplete}
            autoOpenRequestId={manualDateAutoOpenKey}
            showManualError={showManualDateError}
            showStartError={showManualDateError && !fromDate}
            showEndError={showManualDateError && !toDate}
          />
        ) : showInlineDateSummary ? (
          <HistorySummary
            summaryFromLabel={indT("History_From", "From")}
            summaryToLabel={indT("History_To", "To")}
            fromValue={formatDate(fromDate, locale)}
            toValue={formatDate(toDate, locale)}
            className="gap-y-1 text-[11px] px-1"
          />
        ) : null}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${desktopColumnsClassName} gap-2`}>
          <ExpenseTicketFilterKeyInput
            label={indT("Tickets_Filter_FilterKey", "Ticket")}
            placeholder={indT("Tickets_Filter_FilterKey", "Ticket")}
            value={filterKey}
            onChange={onFilterKeyChange}
            mode={mode}
            createdDateFrom={fromDate}
            createdDateTo={toDate}
            enableRemoteSuggestions
            fixedStatusFilter={mode === "general" ? fixedStatusFilter : null}
            showLabel={false}
          />

          <ExpenseCurrencyFilterSelect
            label={indT("ExpenseSheets_Filter_Currency", "Currency")}
            placeholder={indT("ExpenseSheets_Filter_Currency", "Currency")}
            value={currencyCode}
            onChange={onCurrencyCodeChange}
            showLabel={false}
            showLoadingStateText={false}
          />

          {showManagedUserFilter ? (
            <ExpenseManagedUserFilterSelect
              label={indT("Common_User", "User")}
              placeholder={indT("Common_User", "User")}
              value={managedUserId}
              users={managedUsers}
              onChange={onManagedUserIdChange}
              showLabel={false}
            />
          ) : null}

          {showStatusFilter ? (
            <SelectCombobox
              label={indT("Tickets_Filter_Status", "Status")}
              placeholder={indT("Tickets_Filter_Status", "Status")}
              options={statusOptions}
              value={statusFilter}
              onChange={(nextValue) => onStatusFilterChange(normalizeExpenseTicketStatusFilterCode(nextValue, ""))}
              allowTextInput={false}
              disabled={statusFilterReadOnly}
              idBase="expense-ticket-status-filter"
              portalClassName="visitas-typography"
              panelClassName="visitas-typography"
              showLabel={false}
            />
          ) : null}

          <SelectCombobox
            label={indT("Tickets_Filter_Category", "Category")}
            placeholder={indT("Tickets_Filter_Category", "Category")}
            options={categoryOptions}
            value={gastoTypeFilter}
            onChange={(nextValue) => {
              const parsed = Number(nextValue);
              if (nextValue === "" || !Number.isInteger(parsed)) {
                onGastoTypeFilterChange("");
                return;
              }
              onGastoTypeFilterChange(parsed as ExpenseGastoTypeCode);
            }}
            allowTextInput={false}
            idBase="expense-ticket-gastotype-filter"
            portalClassName="visitas-typography"
            panelClassName="visitas-typography"
            showLabel={false}
          />

          <ExpenseProcessedByIaFilterSelect
            label={indT("Tickets_Filter_ProcessedByIA", "Processed by IA")}
            placeholder={indT("Tickets_Filter_ProcessedByIA", "Processed by IA")}
            value={processedByIaFilter}
            onChange={onProcessedByIaFilterChange}
            showLabel={false}
          />
        </div>

        <ExpenseFilterActions
          clearLabel={indT("History_Filter_Clear", "Clear")}
          applyLabel={indT("History_Filter_Apply", "Apply")}
          onClear={onClear}
          onApply={onApply}
        />
      </div>
    </div>
  );
};

export default ExpenseTicketsFiltersPanel;
