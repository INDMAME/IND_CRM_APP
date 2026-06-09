import React from "react";
import ActionButton from "../../../components/commons/ActionButton.tsx";
import FilterButton from "../../../components/commons/FilterButton.tsx";
import ClientSearchCombobox, { type ClientOption } from "../../../components/visitas/ClientSearchCombobox.tsx";
import HistoryManualDatePicker, { type HistoryManualDayCell } from "./HistoryManualDatePicker.tsx";
import HistorySummary from "./HistorySummary.tsx";
import VisibleVisitOwnerSelect from "./VisibleVisitOwnerSelect.tsx";
import type { QuickFilterId } from "./useHistoryFiltersState.ts";
import type { DataVisibilityVisibleUser } from "../../../utils/visibleVisitUsers.ts";

type QuickFilterOption = {
  id: QuickFilterId;
  label: string;
};

type Props = {
  activatorRef: React.RefObject<HTMLDivElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  quickFilters: QuickFilterOption[];
  activeQuickFilter: QuickFilterId | null;
  showInlineSummary: boolean;
  showManualPicker: boolean;
  summaryFromLabel: string;
  summaryToLabel: string;
  fromValue: string;
  toValue: string;
  ownerLabel: string;
  ownerValue: string;
  filterTitle: string;
  showManualError: boolean;
  showStartError: boolean;
  showEndError: boolean;
  isOpen: boolean;
  selectingStep: "start" | "end" | "done";
  labelFrom: string;
  labelTo: string;
  startDateText: string;
  endDateText: string;
  clearRangeLabel: string;
  hasSelectedRange: boolean;
  monthLabel: string;
  weekDayLabels: string[];
  statusText: string;
  dayCells: HistoryManualDayCell[];
  prevMonthLabel: string;
  nextMonthLabel: string;
  clientResetKey: number;
  selectedClient: ClientOption | null;
  clientLabel: string;
  visibleVisitUsers: DataVisibilityVisibleUser[];
  currentOwnerAxUserId: string;
  selectedOwnerAxUserId: string;
  visibleUsersLoading: boolean;
  visibleUsersError: string;
  ownerAllLabel: string;
  ownerNoUsersLabel: string;
  ownerLoadingLabel: string;
  showFilterActions: boolean;
  clearLabel: string;
  applyLabel: string;
  onQuickFilter: (filterId: QuickFilterId) => void;
  onOpenPopover: (section: "start" | "end") => void;
  onActivatorKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onSectionKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, section: "start" | "end") => void;
  onClearDate: (event: React.MouseEvent) => void;
  onPrevMonth: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onNextMonth: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onGridMouseLeave: () => void;
  onDayClick: (day: HistoryManualDayCell) => void;
  onDayHover: (day: HistoryManualDayCell) => void;
  onClientSelected: (client: ClientOption | null) => void;
  onOwnerChange: (ownerAxUserId: string) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
};

// Renders history filter controls while the page container owns state and data loading.
const HistoryFilterPanel = ({
  activatorRef,
  popoverRef,
  quickFilters,
  activeQuickFilter,
  showInlineSummary,
  showManualPicker,
  summaryFromLabel,
  summaryToLabel,
  fromValue,
  toValue,
  ownerLabel,
  ownerValue,
  filterTitle,
  showManualError,
  showStartError,
  showEndError,
  isOpen,
  selectingStep,
  labelFrom,
  labelTo,
  startDateText,
  endDateText,
  clearRangeLabel,
  hasSelectedRange,
  monthLabel,
  weekDayLabels,
  statusText,
  dayCells,
  prevMonthLabel,
  nextMonthLabel,
  clientResetKey,
  selectedClient,
  clientLabel,
  visibleVisitUsers,
  currentOwnerAxUserId,
  selectedOwnerAxUserId,
  visibleUsersLoading,
  visibleUsersError,
  ownerAllLabel,
  ownerNoUsersLabel,
  ownerLoadingLabel,
  showFilterActions,
  clearLabel,
  applyLabel,
  onQuickFilter,
  onOpenPopover,
  onActivatorKeyDown,
  onSectionKeyDown,
  onClearDate,
  onPrevMonth,
  onNextMonth,
  onGridMouseLeave,
  onDayClick,
  onDayHover,
  onClientSelected,
  onOwnerChange,
  onResetFilters,
  onApplyFilters,
}: Props) => {
  return (
    <div className="filter-card filter-card--expanded p-2 sm:p-2.5 relative">
      <div className="gap-y-1.5 history-filter-stack flex flex-col">
        <div className="grid grid-cols-2 gap-2 history-quick-filters" aria-label={filterTitle}>
          {quickFilters.map((item) => {
            const isActive = activeQuickFilter === item.id;
            return (
              <FilterButton
                key={item.id}
                label={item.label}
                active={isActive}
                className="w-full"
                onClick={() => onQuickFilter(item.id)}
              />
            );
          })}
        </div>

        {showInlineSummary && (
          <HistorySummary
            summaryFromLabel={summaryFromLabel}
            summaryToLabel={summaryToLabel}
            fromValue={fromValue}
            toValue={toValue}
            ownerLabel={ownerLabel}
            ownerValue={ownerValue}
            showOwner={!!ownerValue}
            className="gap-y-1 text-[11px] px-1"
          />
        )}

        {showManualPicker && (
          <HistoryManualDatePicker
            activatorRef={activatorRef}
            popoverRef={popoverRef}
            showManualError={showManualError}
            showStartError={showStartError}
            showEndError={showEndError}
            filterTitle={filterTitle}
            isOpen={isOpen}
            selectingStep={selectingStep}
            labelFrom={labelFrom}
            labelTo={labelTo}
            startDateText={startDateText}
            endDateText={endDateText}
            clearRangeLabel={clearRangeLabel}
            hasSelectedRange={hasSelectedRange}
            monthLabel={monthLabel}
            weekDayLabels={weekDayLabels}
            statusText={statusText}
            dayCells={dayCells}
            prevMonthLabel={prevMonthLabel}
            nextMonthLabel={nextMonthLabel}
            onOpenPopover={onOpenPopover}
            onActivatorKeyDown={onActivatorKeyDown}
            onSectionKeyDown={onSectionKeyDown}
            onClear={onClearDate}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
            onGridMouseLeave={onGridMouseLeave}
            onDayClick={onDayClick}
            onDayHover={onDayHover}
          />
        )}

        <VisibleVisitOwnerSelect
          users={visibleVisitUsers}
          currentOwnerAxUserId={currentOwnerAxUserId}
          selectedOwnerAxUserId={selectedOwnerAxUserId}
          loading={visibleUsersLoading}
          errorMessage={visibleUsersError}
          label={ownerLabel}
          allLabel={ownerAllLabel}
          noUsersLabel={ownerNoUsersLabel}
          loadingLabel={ownerLoadingLabel}
          onChange={onOwnerChange}
        />

        <ClientSearchCombobox
          key={clientResetKey}
          value={selectedClient}
          onSelected={onClientSelected}
          label={clientLabel}
          placeholder={clientLabel}
          variant="compact"
          showLabel={false}
          idBase="history-client"
          portalClassName="visitas-typography"
        />

        {showFilterActions && (
          <div className="mt-1 grid grid-cols-2 gap-2 history-filter-actions">
            <ActionButton label={clearLabel} className="w-full" onClick={onResetFilters} />
            <ActionButton label={applyLabel} className="w-full" onClick={onApplyFilters} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryFilterPanel;
