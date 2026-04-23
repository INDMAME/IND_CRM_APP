import { indT } from "../../../../utils/indI18n.ts";
import { useExpenseTopbarCrudActions } from "../../hooks/useExpenseTopbarCrudActions.ts";
import { navigateToExpenseUrl } from "../../utils/expenseNavigation.ts";

type UseExpenseTicketDetailTopbarActionsArgs = {
  busy: boolean;
  modalOpen: boolean;
  isEditing: boolean;
  isLocked: boolean;
  actionMode?: "default" | "delete_only" | "save_only" | "view_only";
  permissionsReady?: boolean;
  canEditTicket: boolean;
  canDeleteTicket: boolean;
  fileId: string;
  setModalError: (value: string) => void;
  handleEnableEdit: () => void;
  handleCancelEdit: () => void;
  canOpenSaveConfirm?: () => boolean;
  handleUpdate: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
  onSaveSuccess: () => void;
  onDeleteSuccess?: () => void;
  openConfirm: (opts: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => Promise<boolean | void> | boolean | void;
  }) => void;
  closeConfirm: () => void;
};

// Coordinates topbar icon state and dispatch actions for ticket detail.
export const useExpenseTicketDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isLocked,
  actionMode = "default",
  permissionsReady = true,
  canEditTicket,
  canDeleteTicket,
  fileId,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  canOpenSaveConfirm,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
  onDeleteSuccess,
  openConfirm,
  closeConfirm,
}: UseExpenseTicketDetailTopbarActionsArgs) => {
  useExpenseTopbarCrudActions({
    actionGroupId: "expense-ticket-detail-actions",
    ids: {
      editIconId: "expenseTicketEditIcon",
      saveIconId: "expenseTicketSaveIcon",
      deleteBtnId: "expenseTicketDeleteBtn",
      cancelBtnId: "expenseTicketCancelBtn",
    },
    events: {
      editEvent: "expense-ticket-detail-edit",
      deleteEvent: "expense-ticket-detail-delete",
      cancelEvent: "expense-ticket-detail-cancel-edit",
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode: false,
    isLocked,
    actionMode,
    permissionsReady,
    canCreate: false,
    canEdit: canEditTicket,
    canDelete: canDeleteTicket,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    canOpenSaveConfirm,
    handleSave: handleUpdate,
    handleDelete,
    saveConfirmTitle: indT("ExpenseSheets_Detail_SaveChanges_Title", "Save changes"),
    saveConfirmMessage: indT("ExpenseSheets_Detail_SaveChanges_Body", "Do you want to save changes?"),
    saveConfirmText: indT("Common_Save", "Save"),
    deleteConfirmTitle: indT("Confirm_Delete_Title", "Delete"),
    deleteConfirmMessage: indT("Confirm_Delete_Body", "Do you want to delete this item?"),
    deleteConfirmText: indT("Common_Delete", "Delete"),
    onSaveSuccess,
    onDeleteSuccess: onDeleteSuccess || (() => navigateToExpenseUrl("/Gastos/Tickets")),
    openConfirm,
    closeConfirm,
  });
};
