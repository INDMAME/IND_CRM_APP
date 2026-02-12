import { classNames } from "../../../utils/classNames.ts";
import type { HistoryManualDayCell } from "../../visitas/historial/HistoryManualDatePicker.tsx";

export type CalendarCell = {
  date: Date | null;
  iso: string;
  isEmpty: boolean;
};

const pad = (value: number): string => value.toString().padStart(2, "0");

export const toIsoDateRangeValue = (date: Date): string => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const parseIsoDateRangeValue = (value: string): Date | null => {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;

  const datePart = trimmed.split("T")[0].split(" ")[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return null;

  const [year, month, day] = datePart.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const isSameDay = (a: Date | null, b: Date | null): boolean => {
  return !!(a && b && a.getTime() === b.getTime());
};

export const isBeforeDay = (a: Date | null, b: Date | null): boolean => {
  return !!(a && b && a.getTime() < b.getTime());
};

export const focusDateRangeSection = (container: HTMLDivElement | null, section: "start" | "end"): void => {
  if (!container) return;
  const target = container.querySelector<HTMLElement>(`[data-section="${section}"]`);
  if (!target) return;
  window.requestAnimationFrame(() => target.focus());
};

const toTitleCase = (value: string, locale: string): string => {
  if (!value) return "";
  const lower = value.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};

export const toSentenceCase = (value: string, locale: string): string => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};

export const formatDateRangeDisplay = (date: Date, locale: string): string => {
  return date
    .toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/\./g, "")
    .toLowerCase();
};

export const formatMonthLabel = (date: Date, locale: string): string => {
  const monthName = date.toLocaleDateString(locale, { month: "long" });
  return `${toTitleCase(monthName, locale)} ${date.getFullYear()}`;
};

export const resolveUiLocale = (): string => {
  const fromHtml = typeof document !== "undefined" ? document.documentElement.lang : "";
  return fromHtml && String(fromHtml).trim() ? fromHtml : "es-ES";
};

export const buildCalendarMonth = (year: number, month: number, locale: string): { monthLabel: string; cells: CalendarCell[] } => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;
  const cells: CalendarCell[] = [];

  for (let index = 0; index < offset; index += 1) {
    cells.push({ date: null, iso: "", isEmpty: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateObj = new Date(year, month, day);
    cells.push({ date: dateObj, iso: toIsoDateRangeValue(dateObj), isEmpty: false });
  }

  return {
    monthLabel: formatMonthLabel(firstDay, locale),
    cells,
  };
};

export const buildDateRangeDayCells = (
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
    const isStart = isSameDay(dateObj, startDate);
    const isEnd = isSameDay(dateObj, endDate);
    const inRange = startDate && previewEnd && isBeforeDay(startDate, dateObj) && isBeforeDay(dateObj, previewEnd);
    const hoverRange = startDate && !endDate && hoverDate && isBeforeDay(startDate, dateObj) && isBeforeDay(dateObj, hoverDate);
    const disabled = selectingStep === "end" && !!startDate && isBeforeDay(dateObj, startDate);
    const isToday = isSameDay(dateObj, new Date());

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
