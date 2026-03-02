import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import type { ExpenseTicketStatusFilterCode } from "../constants/expenseTicketStatusCatalog.ts";

export type ExpenseTicketQuickFilterId = "custom" | "days-7" | "days-30" | "days-90";
export type ExpenseTicketProcessedByIaFilter = "all" | "yes" | "no";

export type ExpenseTicketAppliedFilterSnapshot = {
  fromDate: string;
  toDate: string;
  filterKey: string;
  currencyCode: string;
  statusFilter: ExpenseTicketStatusFilterCode;
  gastoTypeFilter: "" | ExpenseGastoTypeCode;
  processedByIaFilter: ExpenseTicketProcessedByIaFilter;
};

export type ExpenseTicketCard = {
  fileId: string;
  description: string;
  status: number | null;
  hojaGastosIdDisplay: string;
  processedByAI: boolean | null;
  currencyCode: string;
  totalAmount: number | null;
  createdByUserId: string;
  transDate: string;
  urlFile: string;
  fileName: string;
  gastoType: ExpenseGastoTypeCode | null;
};
