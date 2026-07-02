import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import type { ExpenseTicketStatusCode, ExpenseTicketStatusFilterCode } from "../constants/expenseTicketStatusCatalog.ts";
import type { ExpenseQuickDateFilterId } from "../constants/expenseQuickDateFilterCatalog.ts";

export type ExpenseTicketQuickFilterId = ExpenseQuickDateFilterId;
export type ExpenseTicketProcessedByIaFilter = "all" | "yes" | "no";

export type ExpenseTicketAppliedFilterSnapshot = {
  fromDate: string;
  toDate: string;
  filterKey: string;
  currencyCode: string;
  managedUserId: string;
  statusFilter: ExpenseTicketStatusFilterCode;
  gastoTypeFilter: "" | ExpenseGastoTypeCode;
  processedByIaFilter: ExpenseTicketProcessedByIaFilter;
};

export type ExpenseTicketListCardBase = {
  fileId: string;
  description: string;
  processedByAI: boolean | null;
  currencyCode: string;
  totalAmount: number | null;
  transDate: string;
  fileName: string;
  gastoType: ExpenseGastoTypeCode | null;
};

export type ExpenseTicketCard = ExpenseTicketListCardBase & {
  kind: "general";
  status: ExpenseTicketStatusCode | null;
};

export type ExpenseTicketLinkCard = ExpenseTicketListCardBase & {
  kind: "link";
};

export type ExpenseTicketListPageItem = ExpenseTicketCard | ExpenseTicketLinkCard;

export type ExpenseTicketLinkSelectionMode = "selected" | "filtered";
