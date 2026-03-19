import type {
  AssistantChatMessage,
  AssistantChatQuickAction,
} from "../../../components/commons/chat/assistantChatTypes.ts";
import type {
  ExpenseSheetListApiRequest,
  ExpenseSheetListResponseEnvelope,
} from "../expenseTypes.ts";

export type ExpenseSheetsAssistantContextSource = "api" | "legacy" | null;

export type ExpenseSheetsAssistantContextSnapshot = {
  lastExpenseSheetsListRequest: ExpenseSheetListApiRequest | null;
  lastExpenseSheetsListResponse: ExpenseSheetListResponseEnvelope | null;
  lastExpenseSheetsListAxUserIdOverride: string | null;
  lastExpenseSheetsListResponseAt: number | null;
  lastExpenseSheetsListResponseSource: ExpenseSheetsAssistantContextSource;
  contextVersion: number;
};

export type ExpenseSheetsAssistantQuickActionId = "summary" | "analytics" | "anomalies";

export type ExpenseSheetsAssistantQuickAction = AssistantChatQuickAction<ExpenseSheetsAssistantQuickActionId>;

export type ExpenseSheetsAssistantMessage = AssistantChatMessage;
