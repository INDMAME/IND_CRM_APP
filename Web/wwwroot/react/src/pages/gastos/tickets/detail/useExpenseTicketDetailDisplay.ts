import { useMemo } from "react";
import { formatAmountWithCurrency } from "../../expenseFormatters.ts";
import { getExpenseTicketStatusLabel } from "../../constants/expenseTicketStatusCatalog.ts";
import { formatExpenseDisplayDate, safeText } from "../../utils/expenseUiUtils.ts";
import { indT } from "../../../../utils/indI18n.ts";
import type { ExpenseTicketDetailHeader } from "./expenseTicketDetailTypes.ts";

type UseExpenseTicketDetailDisplayArgs = {
  header: ExpenseTicketDetailHeader | null;
  draftGastoType: string;
  draftCurrencyCode: string;
  draftTransDate: string;
  draftTicketTime: string;
  draftFileName: string;
  isEditing: boolean;
  gastoTypeLabelMap: Map<string, string>;
};

const formatExpenseDisplayTime = (raw?: string): string => {
  const value = safeText(raw);
  if (!value || value === "0") return "";

  const secondsValue = Number(value);
  if (Number.isInteger(secondsValue) && secondsValue >= 0 && secondsValue <= 86399) {
    const hours = Math.floor(secondsValue / 3600);
    const minutes = Math.floor((secondsValue % 3600) / 60);
    const seconds = secondsValue % 60;
    return [hours, minutes, seconds].map((entry) => String(entry).padStart(2, "0")).join(":");
  }

  const match = value.match(/^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/);
  if (!match) return value;

  const hours = Number.parseInt(match[1] || "", 10);
  if (!Number.isInteger(hours) || hours < 0 || hours > 23) return value;

  return `${String(hours).padStart(2, "0")}:${match[2]}:${match[3] || "00"}`;
};

// Centralizes display-only values so the page container stays focused on flow wiring.
export const useExpenseTicketDetailDisplay = ({
  header,
  draftGastoType,
  draftCurrencyCode,
  draftTransDate,
  draftTicketTime,
  draftFileName,
  isEditing,
  gastoTypeLabelMap,
}: UseExpenseTicketDetailDisplayArgs) => {
  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

  const previewAltText = useMemo(
    () => safeText(isEditing ? draftFileName : header?.fileName) || indT("Tickets_Field_FileId", "Ticket"),
    [draftFileName, header?.fileName, isEditing]
  );

  const statusLabel = useMemo(() => getExpenseTicketStatusLabel(header?.status), [header?.status]);

  const gastoTypeLabel = useMemo(() => {
    const currentGastoType = isEditing ? draftGastoType : header?.gastoType === null ? "" : String(header?.gastoType ?? "");
    if (!currentGastoType) {
      return indT("Common_NotAvailable", "N/A");
    }
    return gastoTypeLabelMap.get(String(currentGastoType)) || String(currentGastoType);
  }, [draftGastoType, gastoTypeLabelMap, header?.gastoType, isEditing]);

  const totalAmountText = useMemo(
    () => formatAmountWithCurrency(header?.totalAmount ?? null, (isEditing ? draftCurrencyCode : header?.currencyCode) || header?.currencyCode),
    [draftCurrencyCode, header?.currencyCode, header?.totalAmount, isEditing]
  );

  const transDateText = useMemo(
    () => formatExpenseDisplayDate(isEditing ? draftTransDate : header?.ticketDate || header?.transDate, document?.documentElement?.lang || "es-ES"),
    [draftTransDate, header?.ticketDate, header?.transDate, isEditing]
  );

  const ticketTimeText = useMemo(
    () => formatExpenseDisplayTime(isEditing ? draftTicketTime : header?.ticketTime),
    [draftTicketTime, header?.ticketTime, isEditing]
  );

  return {
    paginationLabels,
    previewAltText,
    statusLabel,
    gastoTypeLabel,
    totalAmountText,
    transDateText,
    ticketTimeText,
  };
};
