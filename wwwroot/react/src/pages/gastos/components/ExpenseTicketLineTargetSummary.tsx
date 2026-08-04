import React, { useMemo } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import type { ExpenseSheetLine } from "../expenseTypes.ts";
import type { ExpenseTicketLinkCard } from "../tickets/expenseTicketListTypes.ts";
import { toExpenseIsoDate } from "../utils/expenseApiDateUtils.ts";
import { formatExpenseDisplayDate, safeText } from "../utils/expenseUiUtils.ts";

type ExpenseTicketLineTargetSummaryProps = {
  targetLine: ExpenseSheetLine | null;
  selectedTicket: ExpenseTicketLinkCard | null;
  fallbackCurrencyCode: string;
  gastoTypeLabelMap: ReadonlyMap<string, string>;
};

type ComparisonItem = {
  key: string;
  label: string;
  lineValue: string;
  ticketValue: string;
  matches: boolean;
};

const toFiniteNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const resolveLineAmount = (line: ExpenseSheetLine | null): number | null => {
  if (!line) return null;
  const explicitAmount = toFiniteNumber(line.amount ?? line.totalAmountCurrency);
  if (explicitAmount != null) return explicitAmount;

  const price = toFiniteNumber(line.price);
  const qty = toFiniteNumber(line.qty);
  return price != null && qty != null ? price * qty : null;
};

const normalizeCode = (value: unknown): string => safeText(value).toUpperCase();

// MMS - Compare the target line with the ticket without hiding accounting differences. - 2026.08.04
const ExpenseTicketLineTargetSummary = ({
  targetLine,
  selectedTicket,
  fallbackCurrencyCode,
  gastoTypeLabelMap,
}: ExpenseTicketLineTargetSummaryProps) => {
  const comparisons = useMemo<ComparisonItem[]>(() => {
    if (!targetLine) return [];

    const locale = typeof document === "undefined" ? "es-ES" : document.documentElement?.lang || "es-ES";
    const lineCurrency = normalizeCode(targetLine.currencyCode || fallbackCurrencyCode);
    const ticketCurrency = normalizeCode(selectedTicket?.currencyCode || fallbackCurrencyCode);
    const lineAmount = resolveLineAmount(targetLine);
    const ticketAmount = selectedTicket?.totalAmount ?? null;
    const lineDate = toExpenseIsoDate(targetLine.transDate);
    const ticketDate = toExpenseIsoDate(selectedTicket?.transDate);
    const lineTypeCode = safeText(targetLine.typeValueCode || targetLine.typeValue);
    const ticketTypeCode = selectedTicket?.gastoType == null ? "" : String(selectedTicket.gastoType);
    const unavailable = indT("Common_NotAvailable", "N/A");

    return [
      {
        key: "amount",
        label: indT("ExpenseTickets_LinkLine_Amount", "Amount"),
        lineValue: lineAmount == null ? unavailable : formatAmountWithCurrency(lineAmount, lineCurrency),
        ticketValue:
          ticketAmount == null ? unavailable : formatAmountWithCurrency(ticketAmount, ticketCurrency),
        matches:
          lineAmount != null && ticketAmount != null && Math.abs(Number(lineAmount) - Number(ticketAmount)) < 0.005,
      },
      {
        key: "date",
        label: indT("ExpenseTickets_LinkLine_Date", "Date"),
        lineValue: formatExpenseDisplayDate(lineDate, locale, unavailable),
        ticketValue: formatExpenseDisplayDate(ticketDate, locale, unavailable),
        matches: !!lineDate && !!ticketDate && lineDate === ticketDate,
      },
      {
        key: "currency",
        label: indT("ExpenseTickets_LinkLine_Currency", "Currency"),
        lineValue: lineCurrency || unavailable,
        ticketValue: ticketCurrency || unavailable,
        matches: !!lineCurrency && !!ticketCurrency && lineCurrency === ticketCurrency,
      },
      {
        key: "type",
        label: indT("ExpenseTickets_LinkLine_Type", "Type"),
        lineValue: gastoTypeLabelMap.get(lineTypeCode) || safeText(targetLine.typeValue) || lineTypeCode || unavailable,
        ticketValue: gastoTypeLabelMap.get(ticketTypeCode) || ticketTypeCode || unavailable,
        matches: !!lineTypeCode && !!ticketTypeCode && lineTypeCode === ticketTypeCode,
      },
    ];
  }, [fallbackCurrencyCode, gastoTypeLabelMap, selectedTicket, targetLine]);

  if (!targetLine) return null;

  return (
    <section
      className="glass-panel shadow-card mb-3 rounded-[var(--radius-xl)] border border-slate-200 bg-white p-3 sm:p-4"
      aria-live="polite"
    >
      <div className="mb-3">
        <h2 className="text-sm font-bold text-slate-900 sm:text-base">
          {indT("ExpenseTickets_LinkLine_TargetTitle", "Target expense line")}
        </h2>
        <p className="mt-1 break-words text-xs text-slate-600 sm:text-sm">
          {safeText(targetLine.description) || indT("Common_NotAvailable", "N/A")}
        </p>
      </div>

      {!selectedTicket ? (
        <p className="mb-3 rounded-[var(--radius-lg)] bg-blue-50 px-3 py-2 text-xs text-blue-900 sm:text-sm">
          {indT("ExpenseTickets_LinkLine_SelectHint", "Select one ticket to compare it with this line.")}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {comparisons.map((item) => (
          <article key={item.key} className="rounded-[var(--radius-lg)] border border-slate-200 p-2.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">{item.label}</h3>
              {selectedTicket ? (
                <span
                  className={
                    item.matches
                      ? "rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800"
                      : "rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900"
                  }
                >
                  {item.matches
                    ? indT("ExpenseTickets_LinkLine_Match", "Match")
                    : indT("ExpenseTickets_LinkLine_Difference", "Different")}
                </span>
              ) : null}
            </div>
            <dl className="mt-2 grid grid-cols-1 gap-1 text-xs min-[420px]:grid-cols-2">
              <div className="min-w-0">
                <dt className="font-semibold text-slate-500">{indT("ExpenseTickets_LinkLine_LineValue", "Line")}</dt>
                <dd className="break-words text-slate-900">{item.lineValue}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-semibold text-slate-500">{indT("ExpenseTickets_LinkLine_TicketValue", "Ticket")}</dt>
                <dd className="break-words text-slate-900">{selectedTicket ? item.ticketValue : "-"}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExpenseTicketLineTargetSummary;
