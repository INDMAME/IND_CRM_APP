import React from "react";
import { indT } from "../../../utils/indI18n.ts";
import ExpenseCurrencyFilterSelect from "./ExpenseCurrencyFilterSelect.tsx";
import ExpenseDateRangeFilter from "./ExpenseDateRangeFilter.tsx";
import ExpenseFilterActions from "./ExpenseFilterActions.tsx";
import ExpenseManagedUserFilterSelect from "./ExpenseManagedUserFilterSelect.tsx";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseQuickDateFilters from "./ExpenseQuickDateFilters.tsx";
import ExpenseSheetFilterInput from "./ExpenseSheetFilterInput.tsx";
import ExpenseStatusFilterSelect from "./ExpenseStatusFilterSelect.tsx";
import HistorySummary from "../../visitas/historial/HistorySummary.tsx";
import type { AuthManagedUser } from "../../../context/AuthContext.tsx";
import type { ExpenseQuickFilterId } from "../list/expenseListTypes.ts";
import type { ExpenseStatusFilterCode } from "../expenseTypes.ts";

export type { ExpenseQuickFilterId };

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

type ExpenseFiltersPanelProps = {
  visible: boolean;
  showManualDateFilter: boolean;
  manualDateAutoOpenKey: number;
  fromDate: string;
  toDate: string;
  projectId: string;
  hojaGastosId: string;
  currencyCode: string;
  managedUserId: string;
  managedUsers: AuthManagedUser[];
  showManagedUserFilter: boolean;
  statusFilter: ExpenseStatusFilterCode;
  activeQuickFilter: ExpenseQuickFilterId | null;
  showManualDateError: boolean;
  onDateRangeChange: (fromDate: string, toDate: string) => void;
  onManualRangeComplete: (fromDate: string, toDate: string) => void;
  onQuickFilterChange: (filterId: ExpenseQuickFilterId) => void;
  onProjectIdChange: (value: string) => void;
  onHojaGastosIdChange: (value: string) => void;
  onCurrencyCodeChange: (value: string) => void;
  onManagedUserIdChange: (value: string) => void;
  onStatusFilterChange: (value: ExpenseStatusFilterCode) => void;
  onClear: () => void;
  onApply: () => void;
};

// Shared expense sheet filter panel composed from reusable module components.
const ExpenseFiltersPanel = ({
  visible,
  showManualDateFilter,
  manualDateAutoOpenKey,
  fromDate,
  toDate,
  projectId,
  hojaGastosId,
  currencyCode,
  managedUserId,
  managedUsers,
  showManagedUserFilter,
  statusFilter,
  activeQuickFilter,
  showManualDateError,
  onDateRangeChange,
  onManualRangeComplete,
  onQuickFilterChange,
  onProjectIdChange,
  onHojaGastosIdChange,
  onCurrencyCodeChange,
  onManagedUserIdChange,
  onStatusFilterChange,
  onClear,
  onApply,
}: ExpenseFiltersPanelProps) => {
  if (!visible) return null;
  const locale = document?.documentElement?.lang || "es-ES";
  const showInlineDateSummary = !showManualDateFilter && !!fromDate && !!toDate;

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

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${showManagedUserFilter ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-2`}>
          <ExpenseProjectFilterInput
            label={indT("ExpenseSheets_Filter_Project", "Project")}
            placeholder={indT("ExpenseSheets_Filter_Project", "Project")}
            value={projectId}
            onChange={onProjectIdChange}
            showLabel={false}
          />

          <ExpenseSheetFilterInput
            label={indT("ExpenseSheets_Filter_Sheet", "Expense sheet")}
            placeholder={indT("ExpenseSheets_Filter_Sheet", "Expense sheet")}
            value={hojaGastosId}
            managedUserId={managedUserId}
            onChange={onHojaGastosIdChange}
            enableRemoteSuggestions
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
              label={indT("ExpenseSheets_Filter_User", "User")}
              placeholder={indT("ExpenseSheets_Filter_User", "User")}
              value={managedUserId}
              users={managedUsers}
              onChange={onManagedUserIdChange}
              showLabel={false}
              clearOnEmptyInput
            />
          ) : null}

          <ExpenseStatusFilterSelect
            label={indT("ExpenseSheets_Filter_Status", "Estado")}
            placeholder={indT("ExpenseSheets_Filter_Status_Placeholder", "Estado")}
            value={statusFilter}
            onChange={onStatusFilterChange}
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

export default ExpenseFiltersPanel;
