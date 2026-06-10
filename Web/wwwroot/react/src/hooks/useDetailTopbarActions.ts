import { useEffect } from "react";
import { wait } from "../utils/wait.ts";
import { indT } from "../utils/indI18n.ts";
import { showPermissionModal } from "../utils/permissions.ts";
import { setHistoryFilterForDate, flashActionMark } from "../utils/visitasHistory.ts";
import { setTopbarActionGroupReady } from "../utils/topbarActionVisibility.ts";

type UseDetailTopbarActionsArgs = {
  busy: boolean;
  modalOpen: boolean;
  isEditing: boolean;
  canEditHistory: boolean;
  canDeleteHistory: boolean;
  transDate: string;
  setModalError: (value: string) => void;
  handleEnableEdit: () => void;
  handleCancelEdit: () => void;
  handleUpdate: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
  actionGroupId?: string;
  permissionsReady?: boolean;
  openConfirm: (opts: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => Promise<boolean | void> | boolean | void;
  }) => void;
  closeConfirm: () => void;
};

// Coordinates topbar icon visibility and action events for detail page.
export const useDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  canEditHistory,
  canDeleteHistory,
  transDate,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  actionGroupId = "visit-detail-actions",
  permissionsReady = true,
  openConfirm,
  closeConfirm,
}: UseDetailTopbarActionsArgs) => {
  useEffect(() => {
    if (!permissionsReady) return;

    const editIcon = document.getElementById("visitEditIcon");
    const saveIcon = document.getElementById("visitSaveIcon");
    const deleteBtn = document.getElementById("visitDeleteBtn");
    const cancelBtn = document.getElementById("visitCancelBtn");
    const editBtn = editIcon?.closest("button") ?? null;
    if (isEditing) {
      if (editBtn) editBtn.classList.toggle("topbar-hidden", !canEditHistory);
      if (editIcon) editIcon.classList.add("hidden");
      if (saveIcon) saveIcon.classList.remove("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.remove("topbar-hidden");
    } else {
      if (editBtn) editBtn.classList.toggle("topbar-hidden", !canEditHistory);
      if (editIcon) editIcon.classList.remove("hidden");
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.toggle("topbar-hidden", !canDeleteHistory);
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
    }

    setTopbarActionGroupReady(actionGroupId);
  }, [actionGroupId, canDeleteHistory, canEditHistory, isEditing, permissionsReady]);

  useEffect(() => {
    if (!permissionsReady) return;

    const onEdit = () => {
      if (!canEditHistory) {
        showPermissionModal();
        return;
      }
      if (isEditing) {
        if (busy || modalOpen) return;
        setModalError("");
        openConfirm({
          title: indT("Visits_Detail_SaveChanges_Title", "Visits_Detail_SaveChanges_Title"),
          message: indT("Visits_Detail_SaveChanges_Body", "Visits_Detail_SaveChanges_Body"),
          confirmText: indT("Common_Save", "Common_Save"),
          onConfirm: async () => {
            const ok = await handleUpdate();
            if (ok) {
              closeConfirm();
              setHistoryFilterForDate(transDate);
              await wait(200);
              flashActionMark("okProcess", 1200);
              await wait(1200);
              window.__indBypassNavigationGuardOnce?.();
              window.location.href = "/Historial/History";
            }
            return ok;
          },
        });
      } else {
        handleEnableEdit();
      }
    };

    const onDelete = () => {
      if (!canDeleteHistory) {
        showPermissionModal();
        return;
      }
      if (busy || modalOpen) return;
      setModalError("");
      openConfirm({
        title: indT("Visits_Detail_DeleteActivity_Title", "Visits_Detail_DeleteActivity_Title"),
        message: indT("Visits_Detail_DeleteActivity_Body", "Visits_Detail_DeleteActivity_Body"),
        confirmText: indT("Common_Delete", "Common_Delete"),
        onConfirm: async () => {
          const ok = await handleDelete();
          if (ok) {
            closeConfirm();
            setHistoryFilterForDate(transDate);
            await wait(200);
            flashActionMark("okDelProcess", 1200);
            await wait(1200);
            window.__indBypassNavigationGuardOnce?.();
            window.location.href = "/Historial/History";
          }
          return ok;
        },
      });
    };

    const onCancelEdit = () => {
      if (busy || modalOpen) return;
      handleCancelEdit();
    };

    window.addEventListener("visit-edit", onEdit);
    window.addEventListener("visit-delete", onDelete);
    window.addEventListener("visit-cancel-edit", onCancelEdit);
    return () => {
      window.removeEventListener("visit-edit", onEdit);
      window.removeEventListener("visit-delete", onDelete);
      window.removeEventListener("visit-cancel-edit", onCancelEdit);
    };
  }, [
    busy,
    canDeleteHistory,
    canEditHistory,
    closeConfirm,
    handleCancelEdit,
    handleDelete,
    handleEnableEdit,
    handleUpdate,
    isEditing,
    modalOpen,
    openConfirm,
    permissionsReady,
    setModalError,
    transDate,
  ]);
};
