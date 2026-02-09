import React from "react";
import { classNames } from "../../../utils/classNames.ts";

export type HistoryManualDayCell = {
  key: string;
  isEmpty: boolean;
  date?: Date;
  iso?: string;
  dayLabel?: number;
  dayClass?: string;
  disabled?: boolean;
};

type HistoryManualDatePickerProps = {
  activatorRef: React.RefObject<HTMLDivElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  showManualError: boolean;
  showStartError: boolean;
  showEndError: boolean;
  filterTitle: string;
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
  onOpenPopover: (section: "start" | "end") => void;
  onActivatorKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onSectionKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, section: "start" | "end") => void;
  onClear: (event: React.MouseEvent) => void;
  onPrevMonth: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onNextMonth: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onGridMouseLeave: () => void;
  onDayClick: (day: HistoryManualDayCell) => void;
  onDayHover: (day: HistoryManualDayCell) => void;
};

// Presentational date range picker used by the history quick filter.
const HistoryManualDatePicker = ({
  activatorRef,
  popoverRef,
  showManualError,
  showStartError,
  showEndError,
  filterTitle,
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
  onOpenPopover,
  onActivatorKeyDown,
  onSectionKeyDown,
  onClear,
  onPrevMonth,
  onNextMonth,
  onGridMouseLeave,
  onDayClick,
  onDayHover,
}: HistoryManualDatePickerProps) => {
  return (
    <div className="relative">
      <div
        id="drpActivator"
        ref={activatorRef}
        className={classNames("drp w-full", showManualError ? "drp-error" : "")}
        onClick={() => onOpenPopover("start")}
        role="button"
        tabIndex={0}
        aria-label={filterTitle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onKeyDown={onActivatorKeyDown}
      >
        <div
          className={classNames(
            "drp-section",
            selectingStep === "start" && isOpen ? "active" : "",
            showStartError ? "is-error" : ""
          )}
          data-section="start"
          onClick={(event) => {
            event.stopPropagation();
            onOpenPopover("start");
          }}
          role="button"
          tabIndex={0}
          aria-label={labelFrom}
          onKeyDown={(event) => onSectionKeyDown(event, "start")}
        >
          <div className="drp-label">{labelFrom}</div>
          <div className="drp-value">
            <i className="bi bi-calendar3 drp-icon" />
            <span id="drpStartValue">{startDateText}</span>
          </div>
        </div>

        <div className="drp-separator hidden sm:flex">
          <i className="bi bi-arrow-right" />
        </div>
        <div className="drp-separator-mobile flex sm:hidden" />

        <div
          className={classNames(
            "drp-section",
            selectingStep === "end" && isOpen ? "active" : "",
            showEndError ? "is-error" : ""
          )}
          data-section="end"
          onClick={(event) => {
            event.stopPropagation();
            onOpenPopover("end");
          }}
          role="button"
          tabIndex={0}
          aria-label={labelTo}
          onKeyDown={(event) => onSectionKeyDown(event, "end")}
        >
          <div className="drp-label">{labelTo}</div>
          <div className="drp-value">
            <i className="bi bi-calendar3 drp-icon" />
            <span id="drpEndValue">{endDateText}</span>
          </div>
        </div>

        <button
          type="button"
          id="drpClear"
          className="drp-clear"
          aria-label={clearRangeLabel}
          style={{ display: hasSelectedRange ? "inline-flex" : "none" }}
          onClick={onClear}
        >
          <i className="bi bi-x-lg" />
        </button>
      </div>

      <div id="drpPopover" ref={popoverRef} className="drp-popover" hidden={!isOpen}>
        <div className="drp-head">
          <button
            type="button"
            className="drp-nav"
            data-dir="prev"
            aria-label={prevMonthLabel}
            onClick={onPrevMonth}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 30 30" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div id="drpMonthLabel" className="drp-month">{monthLabel}</div>
          <button
            type="button"
            className="drp-nav"
            data-dir="next"
            aria-label={nextMonthLabel}
            onClick={onNextMonth}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 30 30" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="drp-weekdays">
          {weekDayLabels.map((label, index) => (
            <span key={`${label}-${index}`}>{label}</span>
          ))}
        </div>

        <div id="drpGrid" className="drp-grid" onMouseLeave={onGridMouseLeave}>
          {dayCells.map((cell) => {
            if (cell.isEmpty) {
              return <button key={cell.key} className="drp-day empty" disabled />;
            }

            return (
              <button
                key={cell.key}
                type="button"
                className={cell.dayClass}
                data-date={cell.iso}
                disabled={cell.disabled}
                onClick={() => onDayClick(cell)}
                onMouseEnter={() => onDayHover(cell)}
              >
                {cell.dayLabel}
              </button>
            );
          })}
        </div>

        <div id="drpStatus" className="drp-status">
          {statusText}
        </div>
      </div>
    </div>
  );
};

export default HistoryManualDatePicker;
