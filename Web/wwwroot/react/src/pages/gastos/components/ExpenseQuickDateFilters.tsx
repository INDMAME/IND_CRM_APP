import React from "react";
import FilterButton from "../../../components/commons/FilterButton.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseQuickDateFilterId } from "../constants/expenseQuickDateFilterCatalog.ts";

type ExpenseQuickDateFiltersProps = {
  activeQuickFilter: ExpenseQuickDateFilterId | null;
  onQuickFilterChange: (filterId: ExpenseQuickDateFilterId) => void;
};

// Shared quick date filters used by expense sheets and tickets panels.
const ExpenseQuickDateFilters = ({ activeQuickFilter, onQuickFilterChange }: ExpenseQuickDateFiltersProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 history-quick-filters" aria-label={indT("History_Filter_Date", "Date")}>
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
  );
};

export default ExpenseQuickDateFilters;
