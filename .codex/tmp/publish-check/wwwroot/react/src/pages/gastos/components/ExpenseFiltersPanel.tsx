import React from "react";
import FilterButton from "../../../components/commons/FilterButton.tsx";
import { indT } from "../../../utils/indI18n.ts";
import ExpenseBilledModeFilterSelect from "./ExpenseBilledModeFilterSelect.tsx";
import ExpenseCurrencyFilterSelect from "./ExpenseCurrencyFilterSelect.tsx";
import ExpenseDateRangeFilter from "./ExpenseDateRangeFilter.tsx";
import ExpenseFilterActions from "./ExpenseFilterActions.tsx";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseSheetFilterInput from "./ExpenseSheetFilterInput.tsx";

export type ExpenseQuickFilterId = "custom" | "days-7" | "days-30" | "days-90";

type ExpenseFiltersPanelProps = {
  visible: boolean;
  showManualDateFilter: boolean;
  manualDateAutoOpenKey: number;
  fromDate: string;
  toDate: string;
  projectId: string;
  hojaGastosId: string;
  currencyCode: string;
  billedMode: number;
  activeQuickFilter: ExpenseQuickFilterId | null;
  onDateRangeChange: (fromDate: string, toDate: string) => void;
  onQuickFilterChange: (filterId: ExpenseQuickFilterId) => void;
  onProjectIdChange: (value: string) => void;
  onHojaGastosIdChange: (value: string) => void;
  onCurrencyCodeChange: (value: string) => void;
  onBilledModeChange: (value: number) => void;
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
  billedMode,
  activeQuickFilter,
  onDateRangeChange,
  onQuickFilterChange,
  onProjectIdChange,
  onHojaGastosIdChange,
  onCurrencyCodeChange,
  onBilledModeChange,
  onClear,
  onApply,
}: ExpenseFiltersPanelProps) => {
  if (!visible) return null;

  const quickLabel =
    activeQuickFilter === "days-7"
      ? indT("History_Quick_7Days", "7 days")
      : activeQuickFilter === "days-30"
        ? indT("History_Quick_30Days", "30 days")
        : activeQuickFilter === "days-90"
          ? indT("History_Quick_90Days", "90 days")
          : "";

  return (
    <div className="filter-card filter-card--expanded p-2 sm:p-2.5 relative">
      <div className="history-filter-stack flex flex-col space-y-2">
        <div className="grid grid-cols-2 gap-2 history-quick-filters" aria-label={indT("History_Filter_Date", "Date")}>
          <FilterButton
            label={indT("History_Quick_Custom", "Date")}
            active={activeQuickFilter === "custom"}
            className="w-full"
            onClick={() => onQuickFilterChange("custom")}
          />
          <FilterButton
            label={indT("History_Quick_7Days", "7 days")}
            active={activeQuickFilter === "days-7"}
            className="w-full"
            onClick={() => onQuickFilterChange("days-7")}
          />
          <FilterButton
            label={indT("History_Quick_30Days", "30 days")}
            active={activeQuickFilter === "days-30"}
            className="w-full"
            onClick={() => onQuickFilterChange("days-30")}
          />
          <FilterButton
            label={indT("History_Quick_90Days", "90 days")}
            active={activeQuickFilter === "days-90"}
            className="w-full"
            onClick={() => onQuickFilterChange("days-90")}
          />
        </div>

        {showManualDateFilter ? (
          <ExpenseDateRangeFilter
            fromDate={fromDate}
            toDate={toDate}
            onChange={onDateRangeChange}
            autoOpenRequestId={manualDateAutoOpenKey}
          />
        ) : quickLabel ? (
          <div className="history-filter-summary px-1 text-[11px]">
            {indT("History_Filter_Date", "Date")}: {quickLabel}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <ExpenseProjectFilterInput
            label={indT("ExpenseSheets_Filter_Project", "Project")}
            placeholder={indT("ExpenseSheets_Filter_Project_Placeholder", "Project id")}
            value={projectId}
            onChange={onProjectIdChange}
          />

          <ExpenseSheetFilterInput
            label={indT("ExpenseSheets_Filter_Sheet", "Expense sheet")}
            placeholder={indT("ExpenseSheets_Filter_Sheet_Placeholder", "Sheet id")}
            value={hojaGastosId}
            onChange={onHojaGastosIdChange}
            enableRemoteSuggestions={false}
          />

          <ExpenseCurrencyFilterSelect
            label={indT("ExpenseSheets_Filter_Currency", "Currency")}
            placeholder={indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code")}
            value={currencyCode}
            onChange={onCurrencyCodeChange}
          />

          <ExpenseBilledModeFilterSelect
            label={indT("ExpenseSheets_Filter_Status", "Estado")}
            placeholder={indT("ExpenseSheets_Filter_Status_Placeholder", "Estado")}
            value={billedMode}
            onChange={onBilledModeChange}
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
