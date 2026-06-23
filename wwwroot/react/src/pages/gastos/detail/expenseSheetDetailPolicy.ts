export type ExpenseSheetDetailInteractionMode = "full_edit" | "comment_only_edit" | "read_only";

export type ExpenseSheetStatusActionId =
  | "approve"
  | "reject"
  | "undo_approval"
  | "undo_rejection"
  | "move_to_draft"
  | "request_approval"
  | "undo_request";

export type ExpenseSheetStatusAction = {
  id: ExpenseSheetStatusActionId;
  labelKey: string;
  fallback: string;
  nextStatus: number;
};

export type ExpenseSheetDetailPolicy = {
  interactionMode: ExpenseSheetDetailInteractionMode;
  showFab: boolean;
  canDeleteSheet: boolean;
  statusActions: ExpenseSheetStatusAction[];
};

const STATUS_DRAFT = 0;
const STATUS_APPROVAL_REQUESTED = 1;
const STATUS_APPROVED = 2;
const STATUS_REJECTED = 3;

const ACTION_APPROVE: ExpenseSheetStatusAction = {
  id: "approve",
  labelKey: "ExpenseSheets_BottomActions_Approve",
  fallback: "Aprobar",
  nextStatus: STATUS_APPROVED,
};

const ACTION_REJECT: ExpenseSheetStatusAction = {
  id: "reject",
  labelKey: "ExpenseSheets_BottomActions_Reject",
  fallback: "Rechazar",
  nextStatus: STATUS_REJECTED,
};

const ACTION_UNDO_APPROVAL: ExpenseSheetStatusAction = {
  id: "undo_approval",
  labelKey: "ExpenseSheets_BottomActions_UndoApproval",
  fallback: "Deshacer aprobacion",
  nextStatus: STATUS_APPROVAL_REQUESTED,
};

const ACTION_UNDO_SELF_APPROVAL: ExpenseSheetStatusAction = {
  id: "undo_approval",
  labelKey: "ExpenseSheets_BottomActions_UndoApproval",
  fallback: "Deshacer aprobacion",
  nextStatus: STATUS_DRAFT,
};

const ACTION_UNDO_REJECTION: ExpenseSheetStatusAction = {
  id: "undo_rejection",
  labelKey: "ExpenseSheets_BottomActions_UndoRejection",
  fallback: "Deshacer rechazo",
  nextStatus: STATUS_APPROVAL_REQUESTED,
};

const ACTION_MOVE_TO_DRAFT: ExpenseSheetStatusAction = {
  id: "move_to_draft",
  labelKey: "ExpenseSheets_BottomActions_MoveToDraft",
  fallback: "Pasar a Borrador",
  nextStatus: STATUS_DRAFT,
};

const ACTION_REQUEST_APPROVAL: ExpenseSheetStatusAction = {
  id: "request_approval",
  labelKey: "ExpenseSheets_BottomActions_RequestApproval",
  fallback: "Solicitar aprobacion",
  nextStatus: STATUS_APPROVAL_REQUESTED,
};

const ACTION_UNDO_REQUEST: ExpenseSheetStatusAction = {
  id: "undo_request",
  labelKey: "ExpenseSheets_BottomActions_UndoRequest",
  fallback: "Deshacer solicitud",
  nextStatus: STATUS_DRAFT,
};

const READ_ONLY_POLICY: ExpenseSheetDetailPolicy = {
  interactionMode: "read_only",
  showFab: false,
  canDeleteSheet: false,
  statusActions: [],
};

// Resolves the detail interaction policy from ownership, self-management and status.
export const resolveExpenseSheetDetailPolicy = ({
  statusCode,
  isManagingOtherUser,
  allowSelfManagement,
  isPaid,
}: {
  statusCode: number | null;
  isManagingOtherUser: boolean;
  allowSelfManagement: boolean;
  isPaid: boolean;
}): ExpenseSheetDetailPolicy => {
  if (isPaid) {
    return READ_ONLY_POLICY;
  }

  if (isManagingOtherUser) {
    switch (statusCode) {
      case STATUS_APPROVAL_REQUESTED:
        return {
          interactionMode: "read_only",
          showFab: false,
          canDeleteSheet: false,
          statusActions: [ACTION_APPROVE, ACTION_REJECT],
        };
      case STATUS_APPROVED:
        return {
          interactionMode: "read_only",
          showFab: false,
          canDeleteSheet: false,
          statusActions: [ACTION_UNDO_APPROVAL],
        };
      case STATUS_REJECTED:
        return {
          interactionMode: "read_only",
          showFab: false,
          canDeleteSheet: false,
          statusActions: [ACTION_UNDO_REJECTION],
        };
      default:
        return READ_ONLY_POLICY;
    }
  }

  if (allowSelfManagement) {
    switch (statusCode) {
      case STATUS_DRAFT:
        return {
          interactionMode: "full_edit",
          showFab: true,
          canDeleteSheet: true,
          statusActions: [ACTION_APPROVE],
        };
      case STATUS_APPROVED:
        return {
          interactionMode: "read_only",
          showFab: false,
          canDeleteSheet: false,
          statusActions: [ACTION_UNDO_SELF_APPROVAL],
        };
      default:
        return READ_ONLY_POLICY;
    }
  }

  switch (statusCode) {
    case STATUS_DRAFT:
      return {
        interactionMode: "full_edit",
        showFab: true,
        canDeleteSheet: true,
        statusActions: [ACTION_REQUEST_APPROVAL],
      };
    case STATUS_APPROVAL_REQUESTED:
      return {
        interactionMode: "read_only",
        showFab: false,
        canDeleteSheet: false,
        statusActions: [ACTION_UNDO_REQUEST],
      };
    case STATUS_REJECTED:
      return {
        interactionMode: "read_only",
        showFab: false,
        canDeleteSheet: false,
        statusActions: [ACTION_MOVE_TO_DRAFT],
      };
    default:
      return READ_ONLY_POLICY;
  }
};
