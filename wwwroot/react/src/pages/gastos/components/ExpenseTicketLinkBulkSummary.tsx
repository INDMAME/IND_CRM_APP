import React from "react";
import type { ExpenseSheetTicketLinkBulkResultDto } from "../expenseTypes.ts";
import { indT } from "../../../utils/indI18n.ts";

type ExpenseTicketLinkBulkSummaryProps = {
  result: ExpenseSheetTicketLinkBulkResultDto | null;
};

export type ExpenseTicketLinkBulkOutcome = "complete" | "partial" | "no-success";

type ExpenseTicketLinkIssueListProps = {
  items: Array<{ ticketId: string; reason: string }>;
  title: string;
  toneClassName: string;
};

//MMS - Keeps bulk-link outcome and unresolved ticket rules deterministic - 2026.08.24
export const resolveExpenseTicketLinkBulkOutcome = (
  result: ExpenseSheetTicketLinkBulkResultDto
): ExpenseTicketLinkBulkOutcome => {
  const hasLinkedTickets = Number(result.linkedCount) > 0;
  const hasIssues = Number(result.failedCount) > 0 || Number(result.skippedCount) > 0;
  if (!hasLinkedTickets) return "no-success";
  return hasIssues ? "partial" : "complete";
};

// Returns unique failed and skipped ticket ids in a stable retry order.
export const getExpenseTicketLinkBulkUnresolvedIds = (
  result: ExpenseSheetTicketLinkBulkResultDto
): string[] => {
  const unresolvedIds = new Set<string>();
  const issues = [
    ...(Array.isArray(result.failed) ? result.failed : []),
    ...(Array.isArray(result.skipped) ? result.skipped : []),
  ];

  for (const issue of issues) {
    const ticketId = String(issue?.ticketId || "").trim().toUpperCase();
    if (ticketId) unresolvedIds.add(ticketId);
  }

  return Array.from(unresolvedIds);
};

// Renders one skipped or failed ticket list with stable keys.
const ExpenseTicketLinkIssueList = ({ items, title, toneClassName }: ExpenseTicketLinkIssueListProps) => {
  if (items.length < 1) return null;

  return (
    <div className={`rounded-[var(--radius-xl)] border p-3 ${toneClassName}`}>
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <div
            key={`${item.ticketId || "unknown"}-${item.reason || "no-reason"}`}
            className="rounded-[var(--radius-xl)] border border-current/15 bg-white/80 p-2 text-xs"
          >
            <p>
              <span className="font-semibold">{indT("Tickets_Filter_FilterKey", "Ticket")}:</span>{" "}
              <span>{item.ticketId || "-"}</span>
            </p>
            <p className="mt-1">
              <span className="font-semibold">{indT("ExpenseTickets_LinkMode_ResultReason", "Motivo")}:</span>{" "}
              <span>{item.reason || "-"}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Shows the backend bulk-link result summary, including partial skipped and failed reasons.
const ExpenseTicketLinkBulkSummary = React.forwardRef<HTMLDivElement, ExpenseTicketLinkBulkSummaryProps>(
  ({ result }, ref) => {
    if (!result) return null;

    const summaryRows = [
      {
        key: "requested",
        label: indT("ExpenseTickets_LinkMode_ResultRequested", "Solicitados"),
        value: result.requestedCount,
      },
      {
        key: "linked",
        label: indT("ExpenseTickets_LinkMode_ResultLinked", "Vinculados"),
        value: result.linkedCount,
      },
      {
        key: "skipped",
        label: indT("ExpenseTickets_LinkMode_ResultSkipped", "Omitidos"),
        value: result.skippedCount,
      },
      {
        key: "failed",
        label: indT("ExpenseTickets_LinkMode_ResultFailed", "Fallidos"),
        value: result.failedCount,
      },
    ];

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        className="glass-panel shadow-card space-y-3 rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 p-3 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2"
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {indT("ExpenseTickets_LinkMode_ResultTitle", "Resultado de vinculación")}
          </p>
          {result.expenseSheetId ? (
            <p className="mt-1 text-xs text-slate-600">
              {indT("ExpenseSheets_Filter_Sheet", "Expense sheet")}: {result.expenseSheetId}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {summaryRows.map((item) => (
            <div
              key={item.key}
              className="rounded-[var(--radius-xl)] border border-slate-200 bg-slate-50 px-3 py-2 text-center"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
              <p className="mt-1 text-xl font-semibold text-primary">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <ExpenseTicketLinkIssueList
            title={indT("ExpenseTickets_LinkMode_ResultSkipped", "Omitidos")}
            items={Array.isArray(result.skipped) ? result.skipped : []}
            toneClassName="border-amber-200 bg-amber-50 text-amber-900"
          />
          <ExpenseTicketLinkIssueList
            title={indT("ExpenseTickets_LinkMode_ResultFailed", "Fallidos")}
            items={Array.isArray(result.failed) ? result.failed : []}
            toneClassName="border-rose-200 bg-rose-50 text-rose-900"
          />
        </div>
      </div>
    );
  }
);

ExpenseTicketLinkBulkSummary.displayName = "ExpenseTicketLinkBulkSummary";

export default ExpenseTicketLinkBulkSummary;
