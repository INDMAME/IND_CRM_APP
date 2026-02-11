import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { classNames } from "../../../utils/classNames.ts";
import { indT } from "../../../utils/indI18n.ts";
import HistoryManualDatePicker, {
  HistoryManualDayCell,
} from "../../visitas/historial/HistoryManualDatePicker.tsx";

type ExpenseDateRangeFilterProps = {
  fromDate: string;
  toDate: string;
  onChange: (fromDate: string, toDate: string) => void;
  autoOpenRequestId?: number;
};

type CalendarCell = {
  date: Date | null;
  iso: string;
  isEmpty: boolean;
};

const pad = (n: number) => n.toString().padStart(2, "0");

const toIso = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const parseIso = (value: string): Date | null => {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;

  const datePart = trimmed.split("T")[0].split(" ")[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return null;

  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const sameDay = (a: Date | null, b: Date | null) => !!(a && b && a.getTime() === b.getTime());
const isBefore = (a: Date | null, b: Date | null) => !!(a && b && a.getTime() < b.getTime());

const toTitleCase = (value: string, locale: string): string => {
  if (!value) return "";
  const lower = value.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};

const toSentenceCase = (value: string, locale: string): string => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};

const formatDisplay = (date: Date, locale: string): string => {
  return date
    .toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/\./g, "")
    .toLowerCase();
};

const formatMonthLabel = (date: Date, locale: string): string => {
  const monthName = date.toLocaleDateString(locale, { month: "long" });
  return `${toTitleCase(monthName, locale)} ${date.getFullYear()}`;
};

const getUiLocale = (): string => {
  const fromHtml = typeof document !== "undefined" ? document.documentElement.lang : "";
  return fromHtml && String(fromHtml).trim() ? fromHtml : "es-ES";
};

const buildDayCells = (
  cells: CalendarCell[],
  startDate: Date | null,
  endDate: Date | null,
  hoverDate: Date | null,
  selectingStep: "start" | "end" | "done"
): HistoryManualDayCell[] => {
  const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);

  return cells.map((cell, index) => {
    if (cell.isEmpty || !cell.date) {
      return { key: `empty-${index}`, isEmpty: true };
    }

    const dateObj = cell.date;
    const isStart = sameDay(dateObj, startDate);
    const isEnd = sameDay(dateObj, endDate);
    const inRange = startDate && previewEnd && isBefore(startDate, dateObj) && isBefore(dateObj, previewEnd);
    const hoverRange = startDate && !endDate && hoverDate && isBefore(startDate, dateObj) && isBefore(dateObj, hoverDate);
    const disabled = selectingStep === "end" && !!startDate && isBefore(dateObj, startDate);
    const isToday = sameDay(dateObj, new Date());

    return {
      key: cell.iso,
      isEmpty: false,
      date: dateObj,
      iso: cell.iso,
      dayLabel: dateObj.getDate(),
      dayClass: classNames(
        "drp-day",
        isStart ? "start range-start" : "",
        isEnd ? "end range-end" : "",
        inRange ? "in-range" : "",
        hoverRange ? "hover-range" : "",
        disabled ? "disabled" : "",
        isToday ? "today" : ""
      ),
      disabled,
    };
  });
};

// Shared date range picker for expense filters based on the history date component.
const ExpenseDateRangeFilter = ({ fromDate, toDate, onChange, autoOpenRequestId = 0 }: ExpenseDateRangeFilterProps) => {
  const locale = useMemo(() => getUiLocale(), []);
  const activatorRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(() => parseIso(fromDate));
  const [endDate, setEndDate] = useState<Date | null>(() => parseIso(toDate));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingStep, setSelectingStep] = useState<"start" | "end" | "done">("start");
  const [isOpen, setIsOpen] = useState(false);

  const now = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState((parseIso(fromDate) || now).getMonth());
  const [currentYear, setCurrentYear] = useState((parseIso(fromDate) || now).getFullYear());

  useEffect(() => {
    setStartDate(parseIso(fromDate));
  }, [fromDate]);

  useEffect(() => {
    setEndDate(parseIso(toDate));
  }, [toDate]);

  useEffect(() => {
    onChange(startDate ? toIso(startDate) : "", endDate ? toIso(endDate) : "");
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
    openPopover("start");
  }, [autoOpenRequestId, openPopover]);

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
        if (endDate && isBefore(endDate, nextDate)) {
          setEndDate(null);
        }
        setSelectingStep("end");
        return;
      }

      if (selectingStep === "end") {
        if (isBefore(nextDate, startDate)) {
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
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = (firstDay.getDay() + 6) % 7;
    const cells: CalendarCell[] = [];

    for (let index = 0; index < offset; index += 1) {
      cells.push({ date: null, iso: "", isEmpty: true });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateObj = new Date(currentYear, currentMonth, day);
      cells.push({ date: dateObj, iso: toIso(dateObj), isEmpty: false });
    }

    return {
      monthLabel: formatMonthLabel(firstDay, locale),
      cells,
    };
  }, [currentMonth, currentYear, locale]);

  const dayCells = useMemo(
    () => buildDayCells(calendar.cells, startDate, endDate, hoverDate, selectingStep),
    [calendar.cells, endDate, hoverDate, selectingStep, startDate]
  );

  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);

  return (
    <HistoryManualDatePicker
      activatorRef={activatorRef}
      popoverRef={popoverRef}
      showManualError={false}
      showStartError={false}
      showEndError={false}
      filterTitle={indT("History_Filter_Date", "Date")}
      isOpen={isOpen}
      selectingStep={selectingStep}
      labelFrom={labelFrom}
      labelTo={labelTo}
      startDateText={startDate ? formatDisplay(startDate, locale) : indT("History_AddDate", "Add date")}
      endDateText={endDate ? formatDisplay(endDate, locale) : indT("History_AddDate", "Add date")}
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
