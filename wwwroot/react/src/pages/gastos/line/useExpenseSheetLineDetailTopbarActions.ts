import { indT } from "../../../utils/indI18n.ts";
import { useExpenseTopbarCrudActions } from "../hooks/useExpenseTopbarCrudActions.ts";
import { navigateToExpenseUrl } from "../utils/expenseNavigation.ts";

type UseExpenseSheetLineDetailTopbarActionsArgs = {
  busy: boolean;
  modalOpen: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  isLocked: boolean;
  actionMode?: "default" | "delete_only" | "view_only";
  canCreateExpense: boolean;
  canEditExpense: boolean;
  canDeleteExpense: boolean;
  sheetId: string;
  setModalError: (value: string) => void;
  handleEnableEdit: () => void;
  handleCancelEdit: () => void;
  handleUpdate: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
  onSaveSuccess: () => void;
  openConfirm: (opts: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => Promise<boolean | void> | boolean | void;
  }) => void;
  closeConfirm: () => void;
};

// Coordinates topbar icon state and dispatch actions for expense sheet line detail.
export const useExpenseSheetLineDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  actionMode = "default",
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  sheetId,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
  openConfirm,
  closeConfirm,
}: UseExpenseSheetLineDetailTopbarActionsArgs) => {
  useExpenseTopbarCrudActions({
    ids: {
      editIconId: "expenseLineEditIcon",
      saveIconId: "expenseLineSaveIcon",
      deleteBtnId: "expenseLineDeleteBtn",
      cancelBtnId: "expenseLineCancelBtn",
    },
    events: {
      editEvent: "expense-line-detail-edit",
      deleteEvent: "expense-line-detail-delete",
      cancelEvent: "expense-line-detail-cancel-edit",
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode,
    isLocked,
    actionMode,
    canCreate: canCreateExpense,
    canEdit: canEditExpense,
    canDelete: canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleSave: handleUpdate,
    handleDelete,
    saveConfirmTitle: indT("ExpenseSheets_Detail_SaveChanges_Title", "Save changes"),
    saveConfirmMessage: indT("ExpenseSheets_Detail_SaveChanges_Body", "Do you want to save changes?"),
    saveConfirmText: indT("Common_Save", "Save"),
    deleteConfirmTitle: indT("Confirm_Delete_Title", "Delete"),
    deleteConfirmMessage: indT("Confirm_Delete_Body", "Do you want to delete this item?"),
    deleteConfirmText: indT("Common_Delete", "Delete"),
    onSaveSuccess,
    onDeleteSuccess: () => {
      navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`);
    },
    openConfirm,
    closeConfirm,
  });
};
