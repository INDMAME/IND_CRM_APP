import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { indT } from "../../../utils/indI18n.ts";
import HistoryManualDatePicker, {
  HistoryManualDayCell,
} from "../../visitas/historial/HistoryManualDatePicker.tsx";
import {
  buildCalendarMonth,
  buildDateRangeDayCells,
  focusDateRangeSection,
  formatDateRangeDisplay,
  isBeforeDay,
  parseIsoDateRangeValue,
  resolveUiLocale,
  toIsoDateRangeValue,
  toSentenceCase,
} from "../utils/expenseDateRangeUtils.ts";

type ExpenseDateRangeFilterProps = {
  fromDate: string;
  toDate: string;
  onChange: (fromDate: string, toDate: string) => void;
  autoOpenRequestId?: number;
  showManualError?: boolean;
  showStartError?: boolean;
  showEndError?: boolean;
};

// Shared date range picker for expense filters based on the history date component.
const ExpenseDateRangeFilter = ({
  fromDate,
  toDate,
  onChange,
  autoOpenRequestId = 0,
  showManualError = false,
  showStartError = false,
  showEndError = false,
}: ExpenseDateRangeFilterProps) => {
  const locale = useMemo(() => resolveUiLocale(), []);
  const activatorRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(() => parseIsoDateRangeValue(fromDate));
  const [endDate, setEndDate] = useState<Date | null>(() => parseIsoDateRangeValue(toDate));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingStep, setSelectingStep] = useState<"start" | "end" | "done">("start");
  const [isOpen, setIsOpen] = useState(false);

  const now = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState((parseIsoDateRangeValue(fromDate) || now).getMonth());
  const [currentYear, setCurrentYear] = useState((parseIsoDateRangeValue(fromDate) || now).getFullYear());

  useEffect(() => {
    setStartDate(parseIsoDateRangeValue(fromDate));
  }, [fromDate]);

  useEffect(() => {
    setEndDate(parseIsoDateRangeValue(toDate));
  }, [toDate]);

  useEffect(() => {
    onChange(startDate ? toIsoDateRangeValue(startDate) : "", endDate ? toIsoDateRangeValue(endDate) : "");
  }, [startDate, endDate, onChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (activatorRef.current?.contains(target)) return;
      setIsOpen(false);
      setHoverDate(null);
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const openPopover = useCallback(
    (section: "start" | "end") => {
      setSelectingStep(section);
      setIsOpen(true);
      setHoverDate(null);

      const base = section === "start" ? startDate || endDate || now : endDate || startDate || now;
      setCurrentMonth(base.getMonth());
      setCurrentYear(base.getFullYear());
    },
    [endDate, now, startDate]
  );

  useEffect(() => {
    if (autoOpenRequestId <= 0) return;
    setSelectingStep("start");
    setIsOpen(true);
    setHoverDate(null);
    const base = startDate || endDate || now;
    setCurrentMonth(base.getMonth());
    setCurrentYear(base.getFullYear());
  }, [autoOpenRequestId]);

  const onActivatorKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );

  const onSectionKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, section: "start" | "end") => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover(section);
    },
    [openPopover]
  );

  const onClear = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
    setSelectingStep("start");
  }, []);

  const onPrevMonth = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentMonth((previous) => {
      const next = previous - 1;
      if (next < 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return next;
    });
  }, []);

  const onNextMonth = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentMonth((previous) => {
      const next = previous + 1;
      if (next > 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return next;
    });
  }, []);

  const onDayClick = useCallback(
    (day: HistoryManualDayCell) => {
      if (!day.date || day.disabled) return;

      const nextDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());

      if (!startDate || selectingStep === "start") {
        setStartDate(nextDate);
        if (endDate && isBeforeDay(endDate, nextDate)) {
          setEndDate(null);
        }
        setSelectingStep("end");
        setCurrentMonth(nextDate.getMonth());
        setCurrentYear(nextDate.getFullYear());
        focusDateRangeSection(activatorRef.current, "end");
        return;
      }

      if (selectingStep === "end") {
        if (isBeforeDay(nextDate, startDate)) {
          setEndDate(startDate);
          setStartDate(nextDate);
        } else {
          setEndDate(nextDate);
        }
        setSelectingStep("done");
        setIsOpen(false);
        setHoverDate(null);
      }
    },
    [endDate, selectingStep, startDate]
  );

  const onDayHover = useCallback(
    (day: HistoryManualDayCell) => {
      if (!day.date || selectingStep !== "end" || !startDate) return;
      setHoverDate(new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()));
    },
    [selectingStep, startDate]
  );

  const onGridMouseLeave = useCallback(() => {
    setHoverDate(null);
  }, []);

  const calendar = useMemo(() => {
    return buildCalendarMonth(currentYear, currentMonth, locale);
  }, [currentMonth, currentYear, locale]);

  const dayCells = useMemo(
    () => buildDateRangeDayCells(calendar.cells, startDate, endDate, hoverDate, selectingStep),
    [calendar.cells, endDate, hoverDate, selectingStep, startDate]
  );

  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);

  return (
    <HistoryManualDatePicker
      activatorRef={activatorRef}
      popoverRef={popoverRef}
      showManualError={showManualError}
      showStartError={showStartError}
      showEndError={showEndError}
      filterTitle={indT("History_Filter_Date", "Date")}
      isOpen={isOpen}
      selectingStep={selectingStep}
      labelFrom={labelFrom}
      labelTo={labelTo}
      startDateText={startDate ? formatDateRangeDisplay(startDate, locale) : indT("History_AddDate", "Add date")}
      endDateText={endDate ? formatDateRangeDisplay(endDate, locale) : indT("History_AddDate", "Add date")}
      clearRangeLabel={indT("History_ClearRange", "Clear range")}
      hasSelectedRange={!!startDate || !!endDate}
      monthLabel={calendar.monthLabel}
      weekDayLabels={[
        indT("History_Day_Mon", "Mon"),
        indT("History_Day_Tue", "Tue"),
        indT("History_Day_Wed", "Wed"),
        indT("History_Day_Thu", "Thu"),
        indT("History_Day_Fri", "Fri"),
        indT("History_Day_Sat", "Sat"),
        indT("History_Day_Sun", "Sun"),
      ]}
      statusText={
        selectingStep === "start"
          ? indT("History_Status_SelectStart", "Select start date")
          : indT("History_Status_SelectEnd", "Select end date")
      }
      dayCells={dayCells}
      prevMonthLabel={indT("History_PrevMonth", "Previous month")}
      nextMonthLabel={indT("History_NextMonth", "Next month")}
      onOpenPopover={openPopover}
      onActivatorKeyDown={onActivatorKeyDown}
      onSectionKeyDown={onSectionKeyDown}
      onClear={onClear}
      onPrevMonth={onPrevMonth}
      onNextMonth={onNextMonth}
      onGridMouseLeave={onGridMouseLeave}
      onDayClick={onDayClick}
      onDayHover={onDayHover}
    />
  );
};

export default ExpenseDateRangeFilter;
