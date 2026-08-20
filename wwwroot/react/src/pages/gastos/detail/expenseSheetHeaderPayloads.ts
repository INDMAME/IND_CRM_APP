import type { ExpenseSheetHeaderUpdateRequest } from "../expenseTypes.ts";
import { resolveExpenseReimbursableExpenseForWrite } from "../constants/expenseReimbursableExpenseCatalog.ts";

const DESCRIPTION_REQUIRED_ERROR_KEY = "ExpenseSheets_Validation_DescriptionRequired" as const;

type ExpenseSheetFullUpdatePayloadInput = {
  draftDescription: string;
  draftProjectId: string;
  draftEstadoComentarios: string;
  draftReimbursableExpense: number | null;
  currentExpenseSheetStatus?: number | null;
  isCreateMode: boolean;
};

type ExpenseSheetStatusTransitionPayloadInput = Omit<
  ExpenseSheetFullUpdatePayloadInput,
  "currentExpenseSheetStatus" | "isCreateMode"
> & {
  nextStatus: number;
  statusCommentOverride?: string | null;
};

type SharedExpenseSheetPayloadInput = {
  draftDescription: string;
  draftProjectId: string;
  draftEstadoComentarios: string;
  draftReimbursableExpense: number | null;
  expenseSheetStatus?: number;
  isCreateMode: boolean;
  statusCommentOverride?: string | null;
};

// Normalizes the header fields shared by full updates and status transitions.
const buildSharedExpenseSheetPayload = ({
  draftDescription,
  draftProjectId,
  draftEstadoComentarios,
  draftReimbursableExpense,
  expenseSheetStatus,
  isCreateMode,
  statusCommentOverride,
}: SharedExpenseSheetPayloadInput): ExpenseSheetHeaderUpdateRequest => {
  const hasExplicitStatusCommentOverride = statusCommentOverride !== undefined;
  const normalizedEstadoComentarios = String(
    statusCommentOverride ?? draftEstadoComentarios ?? ""
  ).trim();

  return {
    description: String(draftDescription || "").trim(),
    projId: String(draftProjectId || "").trim() || undefined,
    expenseSheetStatus,
    reimbursableExpense: resolveExpenseReimbursableExpenseForWrite(
      draftReimbursableExpense,
      isCreateMode
    ),
    // Preserve explicit empty status comments so the backend can clear the stored value.
    estadoComentarios: hasExplicitStatusCommentOverride
      ? normalizedEstadoComentarios
      : (normalizedEstadoComentarios || undefined),
  };
};

// Builds a full create or edit payload while keeping description validation required.
export const buildExpenseSheetFullUpdatePayload = (
  input: ExpenseSheetFullUpdatePayloadInput
):
  | { payload: ExpenseSheetHeaderUpdateRequest }
  | { errorKey: typeof DESCRIPTION_REQUIRED_ERROR_KEY } => {
  const payload = buildSharedExpenseSheetPayload({
    ...input,
    expenseSheetStatus:
      input.currentExpenseSheetStatus != null
        ? Number(input.currentExpenseSheetStatus)
        : undefined,
  });

  if (!payload.description) {
    return { errorKey: DESCRIPTION_REQUIRED_ERROR_KEY };
  }

  return { payload };
};

// Status actions can run in FullEdit, so keep draft fields while skipping description validation.
export const buildExpenseSheetStatusTransitionPayload = (
  input: ExpenseSheetStatusTransitionPayloadInput
): ExpenseSheetHeaderUpdateRequest => {
  return buildSharedExpenseSheetPayload({
    ...input,
    expenseSheetStatus: input.nextStatus,
    isCreateMode: false,
  });
};
