import { type ActionError } from "../../../../utils/actionError.ts";
import { indT } from "../../../../utils/indI18n.ts";
import { useExpenseTopbarCrudActions } from "../../hooks/useExpenseTopbarCrudActions.ts";
import { navigateToExpenseUrl } from "../../utils/expenseNavigation.ts";

type UseExpenseTicketLineDetailTopbarActionsArgs = {
  busy: boolean;
  modalOpen: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  isLocked: boolean;
  permissionsReady?: boolean;
  canCreateTicket: boolean;
  canEditTicket: boolean;
  canDeleteTicket: boolean;
  fileId: string;
  setModalError: (value: ActionError) => void;
  handleEnableEdit: () => void;
  handleCancelEdit: () => void;
  handleUpdate: () => Promise<boolean>;
  isSaveComplete?: () => boolean;
  getSaveWarning?: () => ActionError;
  handleDelete: () => Promise<boolean>;
  onSaveSuccess: () => void;
  onDeleteSuccess?: () => void;
  openConfirm: (opts: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => Promise<boolean | void> | boolean | void;
    onCancel?: () => void;
  }) => void;
  closeConfirm: () => void;
};

// Coordinates topbar icon state and dispatch actions for ticket line detail.
export const useExpenseTicketLineDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  permissionsReady = true,
  canCreateTicket,
  canEditTicket,
  canDeleteTicket,
  fileId,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  isSaveComplete,
  getSaveWarning,
  handleDelete,
  onSaveSuccess,
  onDeleteSuccess,
  openConfirm,
  closeConfirm,
}: UseExpenseTicketLineDetailTopbarActionsArgs) => {
  useExpenseTopbarCrudActions({
    actionGroupId: "expense-ticket-line-detail-actions",
    ids: {
      editIconId: "expenseTicketLineEditIcon",
      saveIconId: "expenseTicketLineSaveIcon",
      deleteBtnId: "expenseTicketLineDeleteBtn",
      cancelBtnId: "expenseTicketLineCancelBtn",
    },
    events: {
      editEvent: "expense-ticket-line-detail-edit",
      deleteEvent: "expense-ticket-line-detail-delete",
      cancelEvent: "expense-ticket-line-detail-cancel-edit",
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode,
    isLocked,
    permissionsReady,
    canCreate: canCreateTicket,
    canEdit: canEditTicket,
    canDelete: canDeleteTicket,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleSave: handleUpdate,
    isSaveComplete,
    getSaveWarning,
    handleDelete,
    getDeleteWarning: getSaveWarning,
    saveConfirmTitle: indT("ExpenseSheets_Detail_SaveChanges_Title", "Save changes"),
    saveConfirmMessage: indT("ExpenseSheets_Detail_SaveChanges_Body", "Do you want to save changes?"),
    saveConfirmText: indT("Common_Save", "Save"),
    deleteConfirmTitle: indT("Confirm_Delete_Title", "Delete"),
    deleteConfirmMessage: indT("Confirm_Delete_Body", "Do you want to delete this item?"),
    deleteConfirmText: indT("Common_Delete", "Delete"),
    onSaveSuccess,
    onDeleteSuccess: onDeleteSuccess || (() => {
      navigateToExpenseUrl(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}`);
    }),
    openConfirm,
    closeConfirm,
  });
};
