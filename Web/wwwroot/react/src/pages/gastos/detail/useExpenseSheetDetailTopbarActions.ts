import { indT } from "../../../utils/indI18n.ts";
import { useExpenseTopbarCrudActions } from "../hooks/useExpenseTopbarCrudActions.ts";
import { navigateToExpenseUrl } from "../utils/expenseNavigation.ts";

type UseExpenseSheetDetailTopbarActionsArgs = {
  busy: boolean;
  modalOpen: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  actionMode?: "default" | "delete_only" | "view_only";
  isLocked: boolean;
  isEditLocked?: boolean;
  isDeleteLocked?: boolean;
  permissionsReady?: boolean;
  canEditExpense: boolean;
  canCreateExpense: boolean;
  canDeleteExpense: boolean;
  setModalError: (value: string) => void;
  handleEnableEdit: () => void;
  handleCancelEdit: () => void;
  handleUpdate: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
  onSaveSuccess: () => void;
  onDeleteSuccess?: () => void;
  saveConfirmTitle?: string;
  saveConfirmMessage?: string;
  openConfirm: (opts: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => Promise<boolean | void> | boolean | void;
    onCancel?: () => void;
  }) => void;
  closeConfirm: () => void;
};

// Coordinates topbar icon state and dispatch actions for expense sheet detail.
export const useExpenseSheetDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  actionMode = "default",
  isLocked,
  isEditLocked,
  isDeleteLocked,
  permissionsReady = true,
  canEditExpense,
  canCreateExpense,
  canDeleteExpense,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
  onDeleteSuccess,
  saveConfirmTitle,
  saveConfirmMessage,
  openConfirm,
  closeConfirm,
}: UseExpenseSheetDetailTopbarActionsArgs) => {
  useExpenseTopbarCrudActions({
    actionGroupId: "expense-sheet-detail-actions",
    ids: {
      editIconId: "expenseEditIcon",
      saveIconId: "expenseSaveIcon",
      deleteBtnId: "expenseDeleteBtn",
      cancelBtnId: "expenseCancelBtn",
    },
    events: {
      editEvent: "expense-detail-edit",
      deleteEvent: "expense-detail-delete",
      cancelEvent: "expense-detail-cancel-edit",
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode,
    isLocked,
    actionMode,
    isEditLocked,
    isDeleteLocked,
    allowCreateModeActionsWhenLocked: true,
    permissionsReady,
    canCreate: canCreateExpense,
    canEdit: canEditExpense,
    canDelete: canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleSave: handleUpdate,
    handleDelete,
    saveConfirmTitle: saveConfirmTitle || indT("ExpenseSheets_Detail_SaveChanges_Title", "Save changes"),
    saveConfirmMessage: saveConfirmMessage || indT("ExpenseSheets_Detail_SaveChanges_Body", "Do you want to save changes?"),
    saveConfirmText: indT("Common_Save", "Save"),
    deleteConfirmTitle: indT("ExpenseSheets_Detail_DeleteSheet_Title", "Delete expense sheet"),
    deleteConfirmMessage: indT("ExpenseSheets_Detail_DeleteSheet_Body", "Do you want to delete this expense sheet?"),
    deleteConfirmText: indT("Common_Delete", "Delete"),
    onSaveSuccess,
    onDeleteSuccess: onDeleteSuccess || (() => navigateToExpenseUrl("/Gastos/ExpenseSheets")),
    openConfirm,
    closeConfirm,
  });
};
