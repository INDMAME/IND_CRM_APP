import type { ExpenseTicketAppliedFilterSnapshot } from "./expenseTicketListTypes.ts";
import { startOfDay, toIsoDate } from "../utils/expenseUiUtils.ts";

const LINK_TICKET_LOOKBACK_DAYS = 90;

// Builds the common 90-day preset used by every ticket-link entry point.
export const buildExpenseTicketLinkInitialSnapshot = (
  managedUserId = "",
  referenceDate: Date = new Date()
): ExpenseTicketAppliedFilterSnapshot => {
  const toDate = startOfDay(referenceDate);
  const fromDate = new Date(toDate);
  fromDate.setDate(toDate.getDate() - (LINK_TICKET_LOOKBACK_DAYS - 1));

  return {
    fromDate: toIsoDate(fromDate),
    toDate: toIsoDate(toDate),
    filterKey: "",
    currencyCode: "",
    managedUserId: String(managedUserId || "").trim(),
    statusFilter: 0,
    gastoTypeFilter: "",
    processedByIaFilter: "all",
  };
};
