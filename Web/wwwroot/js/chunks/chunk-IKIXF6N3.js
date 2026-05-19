import {
  wait
} from "./chunk-4BE3ZFCK.js";
import {
  flashActionMark
} from "./chunk-CBDB7NMA.js";
import {
  parseExpenseNumericInput
} from "./chunk-S4F4JMPK.js";
import {
  setTopbarActionGroupReady
} from "./chunk-ZBKHPZJX.js";
import {
  classNames,
  showPermissionModal
} from "./chunk-EGSPAV7B.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/hooks/expenseMutationUtils.ts
var parseDecimalInput = (raw) => {
  return parseExpenseNumericInput(raw);
};
var executeExpenseMutation = async ({
  startStatus,
  fallbackErrorMessage,
  action,
  flashOnError = true,
  setModalError,
  setBusy,
  setStatus
}) => {
  setModalError("");
  setBusy(true);
  setStatus(startStatus);
  try {
    const value = await action();
    return { ok: true, value };
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : fallbackErrorMessage;
    setModalError(message);
    setStatus(message);
    if (flashOnError) {
      flashActionMark("errorProcess", 1500);
    }
    return { ok: false };
  } finally {
    setBusy(false);
  }
};

// Web/wwwroot/react/src/pages/gastos/hooks/useExpenseTopbarCrudActions.ts
var import_react = __toESM(require_react());
var useExpenseTopbarCrudActions = ({
  ids,
  events,
  actionGroupId,
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  isEditLocked,
  isDeleteLocked,
  actionMode = "default",
  allowCreateModeActionsWhenLocked = false,
  permissionsReady = true,
  canCreate,
  canEdit,
  canDelete,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  canOpenSaveConfirm,
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
  closeConfirm
}) => {
  const resolvedEditLock = (isEditLocked ?? isLocked) && !(isCreateMode && allowCreateModeActionsWhenLocked);
  const resolvedDeleteLock = isDeleteLocked ?? isLocked;
  (0, import_react.useEffect)(() => {
    if (!permissionsReady) return;
    const editIcon = document.getElementById(ids.editIconId);
    const saveIcon = document.getElementById(ids.saveIconId);
    const deleteBtn = document.getElementById(ids.deleteBtnId);
    const cancelBtn = document.getElementById(ids.cancelBtnId);
    const editBtn = editIcon?.closest("button") ?? null;
    if (actionMode === "view_only") {
      if (editBtn) editBtn.classList.add("topbar-hidden");
      if (editBtn instanceof HTMLButtonElement) {
        editBtn.disabled = false;
        editBtn.setAttribute("aria-disabled", "false");
      }
      if (editIcon) editIcon.classList.add("hidden");
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.disabled = false;
        deleteBtn.setAttribute("aria-disabled", "false");
      }
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
      if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.disabled = false;
        cancelBtn.setAttribute("aria-disabled", "false");
      }
      setTopbarActionGroupReady(actionGroupId);
      return;
    }
    if (actionMode === "delete_only") {
      if (editBtn) editBtn.classList.add("topbar-hidden");
      if (editBtn instanceof HTMLButtonElement) {
        editBtn.disabled = false;
        editBtn.setAttribute("aria-disabled", "false");
      }
      if (editIcon) editIcon.classList.add("hidden");
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) {
        if (canDelete) {
          deleteBtn.classList.remove("topbar-hidden");
        } else {
          deleteBtn.classList.add("topbar-hidden");
        }
      }
      if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.disabled = false;
        deleteBtn.setAttribute("aria-disabled", "false");
      }
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
      if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.disabled = false;
        cancelBtn.setAttribute("aria-disabled", "false");
      }
      setTopbarActionGroupReady(actionGroupId);
      return;
    }
    if (actionMode === "save_only") {
      if (editBtn) editBtn.classList.remove("topbar-hidden");
      if (editBtn instanceof HTMLButtonElement) {
        editBtn.disabled = false;
        editBtn.setAttribute("aria-disabled", "false");
      }
      if (editIcon) editIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.disabled = false;
        deleteBtn.setAttribute("aria-disabled", "false");
      }
      if (cancelBtn) cancelBtn.classList.remove("topbar-hidden");
      if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.disabled = true;
        cancelBtn.setAttribute("aria-disabled", "true");
      }
      if (saveIcon) {
        if (isEditing && !resolvedEditLock) {
          saveIcon.classList.remove("hidden");
        } else {
          saveIcon.classList.add("hidden");
        }
      }
      setTopbarActionGroupReady(actionGroupId);
      return;
    }
    if (editBtn) editBtn.classList.remove("topbar-hidden");
    if (editBtn instanceof HTMLButtonElement) {
      editBtn.disabled = false;
      editBtn.setAttribute("aria-disabled", "false");
    }
    if (isEditing) {
      if (editIcon) editIcon.classList.add("hidden");
      if (resolvedEditLock) {
        if (saveIcon) saveIcon.classList.add("hidden");
      } else {
        if (saveIcon) saveIcon.classList.remove("hidden");
      }
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) {
        if (resolvedEditLock) {
          cancelBtn.classList.add("topbar-hidden");
        } else {
          cancelBtn.classList.remove("topbar-hidden");
        }
      }
      if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.disabled = false;
        cancelBtn.setAttribute("aria-disabled", "false");
      }
    } else {
      if (resolvedEditLock) {
        if (editIcon) editIcon.classList.add("hidden");
      } else {
        if (editIcon) editIcon.classList.remove("hidden");
      }
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) {
        if (resolvedDeleteLock || !canDelete) {
          deleteBtn.classList.add("topbar-hidden");
        } else {
          deleteBtn.classList.remove("topbar-hidden");
        }
      }
      if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.disabled = false;
        deleteBtn.setAttribute("aria-disabled", "false");
      }
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
      if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.disabled = false;
        cancelBtn.setAttribute("aria-disabled", "false");
      }
    }
    setTopbarActionGroupReady(actionGroupId);
  }, [
    actionGroupId,
    actionMode,
    canDelete,
    ids.cancelBtnId,
    ids.deleteBtnId,
    ids.editIconId,
    ids.saveIconId,
    isEditing,
    permissionsReady,
    resolvedDeleteLock,
    resolvedEditLock
  ]);
  (0, import_react.useEffect)(() => {
    if (!permissionsReady) return;
    const onEdit = () => {
      if (actionMode === "delete_only" || actionMode === "view_only") return;
      if (resolvedEditLock) return;
      const canProceed = isCreateMode ? canCreate : canEdit;
      if (!canProceed) {
        showPermissionModal();
        return;
      }
      if (isEditing) {
        if (busy || modalOpen) return;
        if (typeof canOpenSaveConfirm === "function" && !canOpenSaveConfirm()) return;
        setModalError("");
        openConfirm({
          title: saveConfirmTitle,
          message: saveConfirmMessage,
          confirmText: saveConfirmText,
          onConfirm: async () => {
            const ok = await handleSave();
            if (ok) {
              closeConfirm();
              await wait(200);
              const successDurationMs = isCreateMode ? 900 : 1200;
              flashActionMark("okProcess", successDurationMs);
              await wait(successDurationMs);
              onSaveSuccess();
            }
            return ok;
          }
        });
      } else {
        handleEnableEdit();
      }
    };
    const onDelete = () => {
      if (actionMode === "view_only") return;
      if (isCreateMode || resolvedDeleteLock) return;
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
        }
      });
    };
    const onCancel = () => {
      if (actionMode === "save_only") return;
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
    actionMode,
    busy,
    canCreate,
    canDelete,
    canEdit,
    canOpenSaveConfirm,
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
    modalOpen,
    onDeleteSuccess,
    onSaveSuccess,
    openConfirm,
    permissionsReady,
    resolvedDeleteLock,
    resolvedEditLock,
    saveConfirmMessage,
    saveConfirmText,
    saveConfirmTitle,
    setModalError
  ]);
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseReadOnlyField.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ENABLE_READ_ONLY_FIELD_NAVIGATION = false;
var ExpenseReadOnlyField = ({ label, value, fullWidth = false, leadingIcon, onClick: _onClick }) => {
  const displayValue = value || "-";
  const isClickable = ENABLE_READ_ONLY_FIELD_NAVIGATION && typeof _onClick === "function" && displayValue !== "-";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: fullWidth ? "sm:col-span-2 space-y-1.5" : "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      leadingIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: leadingIcon }) }) : null,
      isClickable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          className: `form-control ind-readonly-field ${leadingIcon ? "pl-9" : ""} text-left underline decoration-slate-400 underline-offset-2`.trim(),
          onClick: _onClick,
          children: displayValue
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: `form-control ind-readonly-field ${leadingIcon ? "pl-9" : ""}`.trim(), value: displayValue, readOnly: true })
    ] })
  ] });
};
var ExpenseReadOnlyField_default = ExpenseReadOnlyField;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSectionDivider.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseSectionDivider = ({
  label,
  className,
  labelClassName,
  headingLevel = 2
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: classNames("expense-section-divider expense-section-divider--standard", className), role: "heading", "aria-level": headingLevel, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: classNames("expense-section-divider__label", labelClassName), children: label }) });
};
var ExpenseSectionDivider_default = ExpenseSectionDivider;

export {
  parseDecimalInput,
  executeExpenseMutation,
  useExpenseTopbarCrudActions,
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcblxyXG50eXBlIE11dGF0aW9uU2V0dGVycyA9IHtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbnR5cGUgRXhlY3V0ZUV4cGVuc2VNdXRhdGlvbkFyZ3M8VD4gPSBNdXRhdGlvblNldHRlcnMgJiB7XHJcbiAgc3RhcnRTdGF0dXM6IHN0cmluZztcclxuICBmYWxsYmFja0Vycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGFjdGlvbjogKCkgPT4gUHJvbWlzZTxUPjtcclxuICBmbGFzaE9uRXJyb3I/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGRlY2ltYWwgdGV4dCBpbnB1dCBzdXBwb3J0aW5nIGdyb3VwZWQgYW5kIGRlY2ltYWwgc2VwYXJhdG9ycy5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRGVjaW1hbElucHV0ID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgcmV0dXJuIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChyYXcpO1xyXG59O1xyXG5cclxuLy8gUnVucyBhbiBleHBlbnNlIG11dGF0aW9uIHdpdGggc2hhcmVkIGJ1c3kvZXJyb3Ivc3RhdHVzIGhhbmRsaW5nLlxyXG5leHBvcnQgY29uc3QgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiA9IGFzeW5jIDxUPih7XHJcbiAgc3RhcnRTdGF0dXMsXHJcbiAgZmFsbGJhY2tFcnJvck1lc3NhZ2UsXHJcbiAgYWN0aW9uLFxyXG4gIGZsYXNoT25FcnJvciA9IHRydWUsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxufTogRXhlY3V0ZUV4cGVuc2VNdXRhdGlvbkFyZ3M8VD4pOiBQcm9taXNlPHsgb2s6IHRydWU7IHZhbHVlOiBUIH0gfCB7IG9rOiBmYWxzZSB9PiA9PiB7XHJcbiAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICBzZXRCdXN5KHRydWUpO1xyXG4gIHNldFN0YXR1cyhzdGFydFN0YXR1cyk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IGFjdGlvbigpO1xyXG4gICAgcmV0dXJuIHsgb2s6IHRydWUsIHZhbHVlIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGZhbGxiYWNrRXJyb3JNZXNzYWdlO1xyXG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgIGlmIChmbGFzaE9uRXJyb3IpIHtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlIH07XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3dhaXQudHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XHJcblxyXG50eXBlIFRvcGJhckNydWRJZHMgPSB7XHJcbiAgZWRpdEljb25JZDogc3RyaW5nO1xyXG4gIHNhdmVJY29uSWQ6IHN0cmluZztcclxuICBkZWxldGVCdG5JZDogc3RyaW5nO1xyXG4gIGNhbmNlbEJ0bklkOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFRvcGJhckNydWRFdmVudHMgPSB7XHJcbiAgZWRpdEV2ZW50OiBzdHJpbmc7XHJcbiAgZGVsZXRlRXZlbnQ6IHN0cmluZztcclxuICBjYW5jZWxFdmVudDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnNBcmdzID0ge1xyXG4gIGlkczogVG9wYmFyQ3J1ZElkcztcclxuICBldmVudHM6IFRvcGJhckNydWRFdmVudHM7XHJcbiAgYWN0aW9uR3JvdXBJZDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJzYXZlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ/OiBib29sZWFuO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZTogYm9vbGVhbjtcclxuICBjYW5FZGl0OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZTogYm9vbGVhbjtcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgY2FuT3BlblNhdmVDb25maXJtPzogKCkgPT4gYm9vbGVhbjtcclxuICBoYW5kbGVTYXZlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBzYXZlQ29uZmlybVRpdGxlOiBzdHJpbmc7XHJcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgc2F2ZUNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgZGVsZXRlQ29uZmlybVRpdGxlOiBzdHJpbmc7XHJcbiAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBkZWxldGVDb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEhhbmRsZXMgc2hhcmVkIHRvcGJhciBzYXZlL2VkaXQvZGVsZXRlL2NhbmNlbCB3aXJpbmcgZm9yIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zID0gKHtcclxuICBpZHMsXHJcbiAgZXZlbnRzLFxyXG4gIGFjdGlvbkdyb3VwSWQsXHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc0xvY2tlZCxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkID0gZmFsc2UsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgY2FuQ3JlYXRlLFxyXG4gIGNhbkVkaXQsXHJcbiAgY2FuRGVsZXRlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGNhbk9wZW5TYXZlQ29uZmlybSxcclxuICBoYW5kbGVTYXZlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBzYXZlQ29uZmlybVRpdGxlLFxyXG4gIHNhdmVDb25maXJtTWVzc2FnZSxcclxuICBzYXZlQ29uZmlybVRleHQsXHJcbiAgZGVsZXRlQ29uZmlybVRpdGxlLFxyXG4gIGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxyXG4gIGRlbGV0ZUNvbmZpcm1UZXh0LFxyXG4gIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgb25EZWxldGVTdWNjZXNzLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IHJlc29sdmVkRWRpdExvY2sgPSAoaXNFZGl0TG9ja2VkID8/IGlzTG9ja2VkKSAmJiAhKGlzQ3JlYXRlTW9kZSAmJiBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZCk7XHJcbiAgY29uc3QgcmVzb2x2ZWREZWxldGVMb2NrID0gaXNEZWxldGVMb2NrZWQgPz8gaXNMb2NrZWQ7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5lZGl0SWNvbklkKTtcclxuICAgIGNvbnN0IHNhdmVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLnNhdmVJY29uSWQpO1xyXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmRlbGV0ZUJ0bklkKTtcclxuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5jYW5jZWxCdG5JZCk7XHJcbiAgICBjb25zdCBlZGl0QnRuID0gZWRpdEljb24/LmNsb3Nlc3QoXCJidXR0b25cIikgPz8gbnVsbDtcclxuXHJcbiAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJ2aWV3X29ubHlcIikge1xyXG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGVkaXRCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGVkaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlZGl0QnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZGVsZXRlQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBkZWxldGVCdG4uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGNhbmNlbEJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgY2FuY2VsQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFjdGlvbk1vZGUgPT09IFwiZGVsZXRlX29ubHlcIikge1xyXG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGVkaXRCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGVkaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlZGl0QnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikge1xyXG4gICAgICAgIGlmIChjYW5EZWxldGUpIHtcclxuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoZGVsZXRlQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBkZWxldGVCdG4uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGNhbmNlbEJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgY2FuY2VsQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFjdGlvbk1vZGUgPT09IFwic2F2ZV9vbmx5XCIpIHtcclxuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChlZGl0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBlZGl0QnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBjYW5jZWxCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc2F2ZUljb24pIHtcclxuICAgICAgICBpZiAoaXNFZGl0aW5nICYmICFyZXNvbHZlZEVkaXRMb2NrKSB7XHJcbiAgICAgICAgICBzYXZlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICBpZiAoZWRpdEJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgIGVkaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcclxuICAgICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGNhbmNlbEJ0bikge1xyXG4gICAgICAgIGlmIChyZXNvbHZlZEVkaXRMb2NrKSB7XHJcbiAgICAgICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNhbmNlbEJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgY2FuY2VsQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcclxuICAgICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikge1xyXG4gICAgICAgIGlmIChyZXNvbHZlZERlbGV0ZUxvY2sgfHwgIWNhbkRlbGV0ZSkge1xyXG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChkZWxldGVCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBjYW5jZWxCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcclxuICB9LCBbXHJcbiAgICBhY3Rpb25Hcm91cElkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIGNhbkRlbGV0ZSxcclxuICAgIGlkcy5jYW5jZWxCdG5JZCxcclxuICAgIGlkcy5kZWxldGVCdG5JZCxcclxuICAgIGlkcy5lZGl0SWNvbklkLFxyXG4gICAgaWRzLnNhdmVJY29uSWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgcmVzb2x2ZWREZWxldGVMb2NrLFxyXG4gICAgcmVzb2x2ZWRFZGl0TG9jayxcclxuICBdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9uRWRpdCA9ICgpID0+IHtcclxuICAgICAgaWYgKGFjdGlvbk1vZGUgPT09IFwiZGVsZXRlX29ubHlcIiB8fCBhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSByZXR1cm47XHJcbiAgICAgIGlmIChyZXNvbHZlZEVkaXRMb2NrKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlIDogY2FuRWRpdDtcclxuICAgICAgaWYgKCFjYW5Qcm9jZWVkKSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FuT3BlblNhdmVDb25maXJtID09PSBcImZ1bmN0aW9uXCIgJiYgIWNhbk9wZW5TYXZlQ29uZmlybSgpKSByZXR1cm47XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgICB0aXRsZTogc2F2ZUNvbmZpcm1UaXRsZSxcclxuICAgICAgICAgIG1lc3NhZ2U6IHNhdmVDb25maXJtTWVzc2FnZSxcclxuICAgICAgICAgIGNvbmZpcm1UZXh0OiBzYXZlQ29uZmlybVRleHQsXHJcbiAgICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVTYXZlKCk7XHJcbiAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgICBjb25zdCBzdWNjZXNzRHVyYXRpb25NcyA9IGlzQ3JlYXRlTW9kZSA/IDkwMCA6IDEyMDA7XHJcbiAgICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIHN1Y2Nlc3NEdXJhdGlvbk1zKTtcclxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KHN1Y2Nlc3NEdXJhdGlvbk1zKTtcclxuICAgICAgICAgICAgICBvblNhdmVTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSByZXR1cm47XHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgcmVzb2x2ZWREZWxldGVMb2NrKSByZXR1cm47XHJcbiAgICAgIGlmICghY2FuRGVsZXRlKSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICB0aXRsZTogZGVsZXRlQ29uZmlybVRpdGxlLFxyXG4gICAgICAgIG1lc3NhZ2U6IGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBkZWxldGVDb25maXJtVGV4dCxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XHJcbiAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICAgICAgICBvbkRlbGV0ZVN1Y2Nlc3MoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25DYW5jZWwgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInNhdmVfb25seVwiKSByZXR1cm47XHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuZGVsZXRlRXZlbnQsIG9uRGVsZXRlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHMuY2FuY2VsRXZlbnQsIG9uQ2FuY2VsKTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGUsXHJcbiAgICBjYW5EZWxldGUsXHJcbiAgICBjYW5FZGl0LFxyXG4gICAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgICBkZWxldGVDb25maXJtVGV4dCxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZSxcclxuICAgIGV2ZW50cy5jYW5jZWxFdmVudCxcclxuICAgIGV2ZW50cy5kZWxldGVFdmVudCxcclxuICAgIGV2ZW50cy5lZGl0RXZlbnQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZVNhdmUsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgcmVzb2x2ZWREZWxldGVMb2NrLFxyXG4gICAgcmVzb2x2ZWRFZGl0TG9jayxcclxuICAgIHNhdmVDb25maXJtTWVzc2FnZSxcclxuICAgIHNhdmVDb25maXJtVGV4dCxcclxuICAgIHNhdmVDb25maXJtVGl0bGUsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gIF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxudHlwZSBFeHBlbnNlUmVhZE9ubHlGaWVsZFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBmdWxsV2lkdGg/OiBib29sZWFuO1xyXG4gIGxlYWRpbmdJY29uPzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIC8vIFJlc2VydmVkIGZvciBmdXR1cmUgZmllbGQtdG8tcGFnZSBuYXZpZ2F0aW9uLiBLZXB0IGRpc2FibGVkIGludGVudGlvbmFsbHkgZm9yIG5vdy5cclxuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEVOQUJMRV9SRUFEX09OTFlfRklFTERfTkFWSUdBVElPTiA9IGZhbHNlO1xyXG5cclxuLy8gUmV1c2FibGUgcmVhZC1vbmx5IGZpZWxkIGZvciBleHBlbnNlIGRldGFpbCBwYWdlcy5cclxuY29uc3QgRXhwZW5zZVJlYWRPbmx5RmllbGQgPSAoeyBsYWJlbCwgdmFsdWUsIGZ1bGxXaWR0aCA9IGZhbHNlLCBsZWFkaW5nSWNvbiwgb25DbGljazogX29uQ2xpY2sgfTogRXhwZW5zZVJlYWRPbmx5RmllbGRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHZhbHVlIHx8IFwiLVwiO1xyXG4gIGNvbnN0IGlzQ2xpY2thYmxlID0gRU5BQkxFX1JFQURfT05MWV9GSUVMRF9OQVZJR0FUSU9OICYmIHR5cGVvZiBfb25DbGljayA9PT0gXCJmdW5jdGlvblwiICYmIGRpc3BsYXlWYWx1ZSAhPT0gXCItXCI7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17ZnVsbFdpZHRoID8gXCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCIgOiBcInNwYWNlLXktMS41XCJ9PlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2xhYmVsfTwvbGFiZWw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICB7bGVhZGluZ0ljb24gPyAoXHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMyB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTQgdy00IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntsZWFkaW5nSWNvbn08L3NwYW4+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge2lzQ2xpY2thYmxlID8gKFxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZCAke2xlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwifSB0ZXh0LWxlZnQgdW5kZXJsaW5lIGRlY29yYXRpb24tc2xhdGUtNDAwIHVuZGVybGluZS1vZmZzZXQtMmAudHJpbSgpfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtfb25DbGlja31cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2Rpc3BsYXlWYWx1ZX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZCAke2xlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwifWAudHJpbSgpfSB2YWx1ZT17ZGlzcGxheVZhbHVlfSByZWFkT25seSAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VSZWFkT25seUZpZWxkO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNlY3Rpb25EaXZpZGVyUHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgbGFiZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgaGVhZGluZ0xldmVsPzogMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xyXG59O1xyXG5cclxuLy8gU2hhcmVkIGNlbnRlcmVkIHNlY3Rpb24gZGl2aWRlciB1c2VkIGFjcm9zcyBleHBlbnNlIGRldGFpbCBwYWdlcy5cclxuY29uc3QgRXhwZW5zZVNlY3Rpb25EaXZpZGVyID0gKHtcclxuICBsYWJlbCxcclxuICBjbGFzc05hbWUsXHJcbiAgbGFiZWxDbGFzc05hbWUsXHJcbiAgaGVhZGluZ0xldmVsID0gMixcclxufTogRXhwZW5zZVNlY3Rpb25EaXZpZGVyUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlciBleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3RhbmRhcmRcIiwgY2xhc3NOYW1lKX0gcm9sZT1cImhlYWRpbmdcIiBhcmlhLWxldmVsPXtoZWFkaW5nTGV2ZWx9PlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlcl9fbGFiZWxcIiwgbGFiZWxDbGFzc05hbWUpfT57bGFiZWx9PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTZWN0aW9uRGl2aWRlcjtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCTyxJQUFNLG9CQUFvQixDQUFDLFFBQStCO0FBQy9ELFNBQU8seUJBQXlCLEdBQUc7QUFDckM7QUFHTyxJQUFNLHlCQUF5QixPQUFVO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXNGO0FBQ3BGLGdCQUFjLEVBQUU7QUFDaEIsVUFBUSxJQUFJO0FBQ1osWUFBVSxXQUFXO0FBRXJCLE1BQUk7QUFDRixVQUFNLFFBQVEsTUFBTSxPQUFPO0FBQzNCLFdBQU8sRUFBRSxJQUFJLE1BQU0sTUFBTTtBQUFBLEVBQzNCLFNBQVMsT0FBTztBQUNkLFVBQU0sVUFDSixpQkFBaUIsU0FBUyxNQUFNLFVBQzVCLE1BQU0sVUFDTjtBQUNOLGtCQUFjLE9BQU87QUFD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
