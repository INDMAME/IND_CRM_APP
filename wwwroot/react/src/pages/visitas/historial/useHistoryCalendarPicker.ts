import { useCallback, useMemo, type Dispatch, type MouseEvent as ReactMouseEvent, type SetStateAction } from "react";
import { classNames } from "../../../utils/classNames.ts";
import type { HistoryManualDayCell } from "./HistoryManualDatePicker.tsx";

type CalendarCell = {
  date: Date | null;
  iso: string;
  isEmpty: boolean;
};

type Args = {
  currentMonth: number;
  currentYear: number;
  locale: string;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  selectingStep: "start" | "end" | "done";
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  setCurrentYear: Dispatch<SetStateAction<number>>;
  setHoverDate: Dispatch<SetStateAction<Date | null>>;
  handleSelect: (dateObj: Date) => void;
  logHistory: (message: string, data?: Record<string, unknown>) => void;
  toISO: (value: Date) => string;
  isBefore: (a: Date | null, b: Date | null) => boolean;
  formatMonthLabel: (value: Date, locale: string) => string;
};

const sameDay = (a: Date | null, b: Date | null) => !!(a && b && a.getTime() === b.getTime());

// Owns calendar month navigation and day-cell derivation for the history picker.
export const useHistoryCalendarPicker = ({
  currentMonth,
  currentYear,
  locale,
  startDate,
  endDate,
  hoverDate,
  selectingStep,
  setCurrentMonth,
  setCurrentYear,
  setHoverDate,
  handleSelect,
  logHistory,
  toISO,
  isBefore,
  formatMonthLabel,
}: Args) => {
  const calendar = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = (firstDay.getDay() + 6) % 7;
    const cells: CalendarCell[] = [];
    for (let i = 0; i < offset; i++) {
      cells.push({ date: null, iso: "", isEmpty: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      cells.push({ date: dateObj, iso: toISO(dateObj), isEmpty: false });
    }
    return {
      cells,
      label: formatMonthLabel(firstDay, locale),
    };
  }, [currentMonth, currentYear, formatMonthLabel, locale, toISO]);

  const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);

  const handlePrevMonth = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setCurrentMonth((prev) => {
        const next = prev - 1;
        if (next < 0) {
          setCurrentYear((year) => year - 1);
          return 11;
        }
        return next;
      });
    },
    [setCurrentMonth, setCurrentYear]
  );

  const handleNextMonth = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setCurrentMonth((prev) => {
        const next = prev + 1;
        if (next > 11) {
          setCurrentYear((year) => year + 1);
          return 0;
        }
        return next;
      });
    },
    [setCurrentMonth, setCurrentYear]
  );

  const handleGridMouseLeave = useCallback(() => {
    setHoverDate(null);
  }, [setHoverDate]);

  const handleManualDayClick = useCallback(
    (cell: HistoryManualDayCell) => {
      if (!cell.date) return;
      logHistory("dayClick", { date: cell.iso || "", disabled: !!cell.disabled });
      handleSelect(cell.date);
    },
    [handleSelect, logHistory]
  );

  const handleManualDayHover = useCallback(
    (cell: HistoryManualDayCell) => {
      if (!cell.date) return;
      if (selectingStep === "end" && startDate) {
        setHoverDate(new Date(cell.date));
      }
    },
    [selectingStep, setHoverDate, startDate]
  );

  const manualDayCells = useMemo<HistoryManualDayCell[]>(() => {
    return calendar.cells.map((cell, idx) => {
      if (cell.isEmpty) {
        return { key: `empty-${idx}`, isEmpty: true };
      }

      const dateObj = cell.date as Date;
      const isStart = sameDay(dateObj, startDate);
      const isEnd = sameDay(dateObj, endDate);
      const inRange = startDate && previewEnd && isBefore(startDate, dateObj) && isBefore(dateObj, previewEnd);
      const hoverRange = startDate && !endDate && hoverDate && isBefore(startDate, dateObj) && isBefore(dateObj, hoverDate);
      const disabled = selectingStep === "end" && !!startDate && isBefore(dateObj, startDate);
      const isToday = sameDay(dateObj, new Date());

      const dayClass = classNames(
        "drp-day",
        isStart ? "start range-start" : "",
        isEnd ? "end range-end" : "",
        inRange ? "in-range" : "",
        hoverRange ? "hover-range" : "",
        disabled ? "disabled" : "",
        isToday ? "today" : ""
      );

      return {
        key: cell.iso,
        isEmpty: false,
        date: dateObj,
        iso: cell.iso,
        dayLabel: dateObj.getDate(),
        dayClass,
        disabled,
      };
    });
  }, [calendar.cells, endDate, hoverDate, isBefore, previewEnd, selectingStep, startDate]);

  return {
    calendarLabel: calendar.label,
    manualDayCells,
    handlePrevMonth,
    handleNextMonth,
    handleGridMouseLeave,
    handleManualDayClick,
    handleManualDayHover,
  };
};
