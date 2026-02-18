import { useEffect } from "react";
import { wait } from "../../../utils/wait.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import { flashActionMark } from "../../../utils/visitasHistory.ts";

type TopbarCrudIds = {
  editIconId: string;
  saveIconId: string;
  deleteBtnId: string;
  cancelBtnId: string;
};

type TopbarCrudEvents = {
  editEvent: string;
  deleteEvent: string;
  cancelEvent: string;
};

type UseExpenseTopbarCrudActionsArgs = {
  ids: TopbarCrudIds;
  events: TopbarCrudEvents;
  busy: boolean;
  modalOpen: boolean;
  isEditing: boolean;
  isCreateMode: boolean;
  isLocked: boolean;
  allowCreateModeActionsWhenLocked?: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  setModalError: (value: string) => void;
  handleEnableEdit: () => void;
  handleCancelEdit: () => void;
  handleSave: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
  saveConfirmTitle: string;
  saveConfirmMessage: string;
  saveConfirmText: string;
  deleteConfirmTitle: string;
  deleteConfirmMessage: string;
  deleteConfirmText: string;
  onSaveSuccess: () => void;
  onDeleteSuccess: () => void;
  openConfirm: (opts: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => Promise<boolean | void> | boolean | void;
  }) => void;
  closeConfirm: () => void;
};

// Handles shared topbar save/edit/delete/cancel wiring for expense detail pages.
export const useExpenseTopbarCrudActions = ({
  ids,
  events,
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  allowCreateModeActionsWhenLocked = false,
  canCreate,
  canEdit,
  canDelete,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleSave,
  handleDelete,
  saveConfirmTitle,
  saveConfirmMessage,
  saveConfirmText,
  deleteConfirmTitle,
  deleteConfirmMessage,
  deleteConfirmText,
  onSaveSuccess,
  onDeleteSuccess,
  openConfirm,
  closeConfirm,
}: UseExpenseTopbarCrudActionsArgs) => {
  const lockActions = isLocked && !(isCreateMode && allowCreateModeActionsWhenLocked);

  useEffect(() => {
    const editIcon = document.getElementById(ids.editIconId);
    const saveIcon = document.getElementById(ids.saveIconId);
    const deleteBtn = document.getElementById(ids.deleteBtnId);
    const cancelBtn = document.getElementById(ids.cancelBtnId);
    if (!editIcon || !saveIcon) return;

    if (lockActions) {
      editIcon.classList.add("hidden");
      saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
      return;
    }

    if (isEditing) {
      editIcon.classList.add("hidden");
      saveIcon.classList.remove("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.remove("topbar-hidden");
    } else {
      editIcon.classList.remove("hidden");
      saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.remove("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
    }
  }, [ids.cancelBtnId, ids.deleteBtnId, ids.editIconId, ids.saveIconId, isEditing, lockActions]);

  useEffect(() => {
    const onEdit = () => {
      if (lockActions) return;

      const canProceed = isCreateMode ? canCreate : canEdit;
      if (!canProceed) {
        showPermissionModal();
        return;
      }

      if (isEditing) {
        if (busy || modalOpen) return;
        setModalError("");
        openConfirm({
          title: saveConfirmTitle,
          message: saveConfirmMessage,
          confirmText: saveConfirmText,
          onConfirm: async () => {
            const ok = await handleSave();
            if (ok) {
              closeConfirm();
              // Create mode redirects to a new page; skip delayed success animation to avoid intermediate UI flash.
              if (isCreateMode) {
                onSaveSuccess();
                return ok;
              }
              await wait(200);
              flashActionMark("okProcess", 1200);
              await wait(1200);
              onSaveSuccess();
            }
            return ok;
          },
        });
      } else {
        handleEnableEdit();
      }
    };

    const onDelete = () => {
      if (isCreateMode || lockActions) return;
      if (!canDelete) {
        showPermissionModal();
        return;
      }

      if (busy || modalOpen) return;
      setModalError("");
      openConfirm({
        title: deleteConfirmTitle,
        message: deleteConfirmMessage,
        confirmText: deleteConfirmText,
        onConfirm: async () => {
          const ok = await handleDelete();
          if (ok) {
            closeConfirm();
            await wait(200);
            flashActionMark("okDelProcess", 1200);
            await wait(1200);
            onDeleteSuccess();
          }
          return ok;
        },
      });
    };

    const onCancel = () => {
      if (busy || modalOpen) return;
      handleCancelEdit();
    };

    window.addEventListener(events.editEvent, onEdit);
    window.addEventListener(events.deleteEvent, onDelete);
    window.addEventListener(events.cancelEvent, onCancel);

    return () => {
      window.removeEventListener(events.editEvent, onEdit);
      window.removeEventListener(events.deleteEvent, onDelete);
      window.removeEventListener(events.cancelEvent, onCancel);
    };
  }, [
    busy,
    canCreate,
    canDelete,
    canEdit,
    closeConfirm,
    deleteConfirmMessage,
    deleteConfirmText,
    deleteConfirmTitle,
    events.cancelEvent,
    events.deleteEvent,
    events.editEvent,
    handleCancelEdit,
    handleDelete,
    handleEnableEdit,
    handleSave,
    isCreateMode,
    isEditing,
    lockActions,
    modalOpen,
    onDeleteSuccess,
    onSaveSuccess,
    openConfirm,
    saveConfirmMessage,
    saveConfirmText,
    saveConfirmTitle,
    setModalError,
  ]);
};
