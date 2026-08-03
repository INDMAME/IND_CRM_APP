import type { ExpenseSheetTicketUpdateRequest } from "../expenseTypes.ts";
import { toExpenseApiDdMmYyyy } from "./expenseApiDateUtils.ts";
import { parseExpenseDate, safeText, toIsoDate } from "./expenseUiUtils.ts";

const TICKET_TIME_PATTERN = /^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/;

// Converts an API ticket date into the ISO value expected by the date picker.
export const toExpenseTicketDateInput = (value: unknown): string => {
  const parsed = parseExpenseDate(safeText(value));
  return parsed ? toIsoDate(parsed) : "";
};

// Normalizes stored AX seconds or API time text to HH:mm:ss.
export const normalizeExpenseTicketStoredTime = (value: unknown): string => {
  const raw = safeText(value);
  if (!raw) return "";

  if (/^\d+$/.test(raw)) {
    const secondsValue = Number(raw);
    if (!Number.isInteger(secondsValue) || secondsValue < 0 || secondsValue > 86399) {
      return "";
    }

    const hours = Math.floor(secondsValue / 3600);
    const minutes = Math.floor((secondsValue % 3600) / 60);
    const seconds = secondsValue % 60;
    return [hours, minutes, seconds].map((entry) => String(entry).padStart(2, "0")).join(":");
  }

  const match = raw.match(TICKET_TIME_PATTERN);
  if (!match) return "";

  const hours = Number.parseInt(match[1] || "", 10);
  if (!Number.isInteger(hours) || hours < 0 || hours > 23) return "";

  return `${String(hours).padStart(2, "0")}:${match[2]}:${match[3] || "00"}`;
};

// Normalizes text entered by a user, including compact HHmm and HHmmss forms.
export const normalizeExpenseTicketDraftTime = (value: unknown): string => {
  const raw = safeText(value).replace(/\./g, ":");
  if (!raw) return "";

  if (!raw.includes(":")) {
    if (!/^\d{4}(?:\d{2})?$/.test(raw)) return "";

    const hours = Number(raw.slice(0, 2));
    const minutes = Number(raw.slice(2, 4));
    const seconds = raw.length === 6 ? Number(raw.slice(4, 6)) : 0;
    if (hours > 23 || minutes > 59 || seconds > 59) return "";

    return [hours, minutes, seconds].map((entry) => String(entry).padStart(2, "0")).join(":");
  }

  const parts = raw.split(":");
  if (parts.length < 2 || parts.length > 3 || parts.some((part) => !/^\d{1,2}$/.test(part))) {
    return "";
  }

  const [hourText, minuteText, secondText = "00"] = parts;
  const hours = Number(hourText);
  const minutes = Number(minuteText);
  const seconds = Number(secondText);
  if (hours > 23 || minutes > 59 || seconds > 59) return "";

  return [hours, minutes, seconds].map((entry) => String(entry).padStart(2, "0")).join(":");
};

// Allows time correction only when the original ticket time is missing or zero.
export const canEditExpenseTicketTime = (value: unknown): boolean => {
  const raw = safeText(value);
  if (!raw) return true;

  return normalizeExpenseTicketStoredTime(raw) === "00:00:00";
};

// Formats persisted ticket time while keeping missing zero values visually empty.
export const formatExpenseTicketTimeDisplay = (value: unknown): string => {
  const raw = safeText(value);
  if (!raw || canEditExpenseTicketTime(raw)) return "";
  return normalizeExpenseTicketStoredTime(raw) || raw;
};

type BuildExpenseTicketDateTimeUpdateArgs = {
  draftDate: unknown;
  draftTime: unknown;
  originalDate?: unknown;
  originalTime: unknown;
  includeUnchangedDate?: boolean;
};

export type ExpenseTicketDateTimeUpdate = {
  payload: Pick<ExpenseSheetTicketUpdateRequest, "transDate" | "ticketDate" | "ticketTime">;
  dateChanged: boolean;
  invalidDate: boolean;
  invalidTime: boolean;
};

// Builds the date/time fragment shared by ticket and ticket-line save flows.
export const buildExpenseTicketDateTimeUpdate = ({
  draftDate,
  draftTime,
  originalDate,
  originalTime,
  includeUnchangedDate = false,
}: BuildExpenseTicketDateTimeUpdateArgs): ExpenseTicketDateTimeUpdate => {
  const rawDate = safeText(draftDate);
  const normalizedDate = rawDate ? toExpenseApiDdMmYyyy(rawDate) : "";
  const normalizedOriginalDate = toExpenseApiDdMmYyyy(originalDate);
  const dateChanged = !!normalizedDate && normalizedDate !== normalizedOriginalDate;
  const payload: ExpenseTicketDateTimeUpdate["payload"] = {};

  if (normalizedDate && (includeUnchangedDate || dateChanged)) {
    payload.transDate = normalizedDate;
    payload.ticketDate = normalizedDate;
  }

  const rawDraftTime = safeText(draftTime);
  const timeCanBeEdited = canEditExpenseTicketTime(originalTime);
  const normalizedDraftTime = timeCanBeEdited && rawDraftTime
    ? normalizeExpenseTicketDraftTime(rawDraftTime)
    : "";
  const normalizedOriginalTime = normalizeExpenseTicketStoredTime(originalTime);

  if (normalizedDraftTime && normalizedDraftTime !== normalizedOriginalTime) {
    payload.ticketTime = normalizedDraftTime;
  }

  return {
    payload,
    dateChanged,
    invalidDate: !!rawDate && !normalizedDate,
    invalidTime: timeCanBeEdited && !!rawDraftTime && !normalizedDraftTime,
  };
};
