import {
  wait
} from "./chunk-4BE3ZFCK.js";
import {
  flashActionMark
} from "./chunk-THYI4DWA.js";
import {
  parseExpenseNumericInput
} from "./chunk-S4F4JMPK.js";
import {
  setTopbarActionGroupReady
} from "./chunk-ZBKHPZJX.js";
import {
  classNames,
  showPermissionModal
} from "./chunk-BZRAWDAK.js";
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
      if (editIcon) editIcon.classList.add("hidden");
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
      setTopbarActionGroupReady(actionGroupId);
      return;
    }
    if (actionMode === "delete_only") {
      if (editBtn) editBtn.classList.add("topbar-hidden");
      if (editIcon) editIcon.classList.add("hidden");
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) {
        if (canDelete) {
          deleteBtn.classList.remove("topbar-hidden");
        } else {
          deleteBtn.classList.add("topbar-hidden");
        }
      }
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
      setTopbarActionGroupReady(actionGroupId);
      return;
    }
    if (editBtn) editBtn.classList.remove("topbar-hidden");
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
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcblxyXG50eXBlIE11dGF0aW9uU2V0dGVycyA9IHtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbnR5cGUgRXhlY3V0ZUV4cGVuc2VNdXRhdGlvbkFyZ3M8VD4gPSBNdXRhdGlvblNldHRlcnMgJiB7XHJcbiAgc3RhcnRTdGF0dXM6IHN0cmluZztcclxuICBmYWxsYmFja0Vycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGFjdGlvbjogKCkgPT4gUHJvbWlzZTxUPjtcclxuICBmbGFzaE9uRXJyb3I/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGRlY2ltYWwgdGV4dCBpbnB1dCBzdXBwb3J0aW5nIGdyb3VwZWQgYW5kIGRlY2ltYWwgc2VwYXJhdG9ycy5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRGVjaW1hbElucHV0ID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgcmV0dXJuIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChyYXcpO1xyXG59O1xyXG5cclxuLy8gUnVucyBhbiBleHBlbnNlIG11dGF0aW9uIHdpdGggc2hhcmVkIGJ1c3kvZXJyb3Ivc3RhdHVzIGhhbmRsaW5nLlxyXG5leHBvcnQgY29uc3QgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiA9IGFzeW5jIDxUPih7XHJcbiAgc3RhcnRTdGF0dXMsXHJcbiAgZmFsbGJhY2tFcnJvck1lc3NhZ2UsXHJcbiAgYWN0aW9uLFxyXG4gIGZsYXNoT25FcnJvciA9IHRydWUsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxufTogRXhlY3V0ZUV4cGVuc2VNdXRhdGlvbkFyZ3M8VD4pOiBQcm9taXNlPHsgb2s6IHRydWU7IHZhbHVlOiBUIH0gfCB7IG9rOiBmYWxzZSB9PiA9PiB7XHJcbiAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICBzZXRCdXN5KHRydWUpO1xyXG4gIHNldFN0YXR1cyhzdGFydFN0YXR1cyk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IGFjdGlvbigpO1xyXG4gICAgcmV0dXJuIHsgb2s6IHRydWUsIHZhbHVlIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGZhbGxiYWNrRXJyb3JNZXNzYWdlO1xyXG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgIGlmIChmbGFzaE9uRXJyb3IpIHtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlIH07XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3dhaXQudHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XHJcblxyXG50eXBlIFRvcGJhckNydWRJZHMgPSB7XHJcbiAgZWRpdEljb25JZDogc3RyaW5nO1xyXG4gIHNhdmVJY29uSWQ6IHN0cmluZztcclxuICBkZWxldGVCdG5JZDogc3RyaW5nO1xyXG4gIGNhbmNlbEJ0bklkOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFRvcGJhckNydWRFdmVudHMgPSB7XHJcbiAgZWRpdEV2ZW50OiBzdHJpbmc7XHJcbiAgZGVsZXRlRXZlbnQ6IHN0cmluZztcclxuICBjYW5jZWxFdmVudDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnNBcmdzID0ge1xyXG4gIGlkczogVG9wYmFyQ3J1ZElkcztcclxuICBldmVudHM6IFRvcGJhckNydWRFdmVudHM7XHJcbiAgYWN0aW9uR3JvdXBJZDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZD86IGJvb2xlYW47XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlOiBib29sZWFuO1xyXG4gIGNhbkVkaXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlOiBib29sZWFuO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVTYXZlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBzYXZlQ29uZmlybVRpdGxlOiBzdHJpbmc7XHJcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgc2F2ZUNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgZGVsZXRlQ29uZmlybVRpdGxlOiBzdHJpbmc7XHJcbiAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBkZWxldGVDb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIEhhbmRsZXMgc2hhcmVkIHRvcGJhciBzYXZlL2VkaXQvZGVsZXRlL2NhbmNlbCB3aXJpbmcgZm9yIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zID0gKHtcclxuICBpZHMsXHJcbiAgZXZlbnRzLFxyXG4gIGFjdGlvbkdyb3VwSWQsXHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc0xvY2tlZCxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkID0gZmFsc2UsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgY2FuQ3JlYXRlLFxyXG4gIGNhbkVkaXQsXHJcbiAgY2FuRGVsZXRlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVNhdmUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIHNhdmVDb25maXJtVGl0bGUsXHJcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlLFxyXG4gIHNhdmVDb25maXJtVGV4dCxcclxuICBkZWxldGVDb25maXJtVGl0bGUsXHJcbiAgZGVsZXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgZGVsZXRlQ29uZmlybVRleHQsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgcmVzb2x2ZWRFZGl0TG9jayA9IChpc0VkaXRMb2NrZWQgPz8gaXNMb2NrZWQpICYmICEoaXNDcmVhdGVNb2RlICYmIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkKTtcclxuICBjb25zdCByZXNvbHZlZERlbGV0ZUxvY2sgPSBpc0RlbGV0ZUxvY2tlZCA/PyBpc0xvY2tlZDtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmVkaXRJY29uSWQpO1xyXG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuc2F2ZUljb25JZCk7XHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuZGVsZXRlQnRuSWQpO1xyXG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmNhbmNlbEJ0bklkKTtcclxuICAgIGNvbnN0IGVkaXRCdG4gPSBlZGl0SWNvbj8uY2xvc2VzdChcImJ1dHRvblwiKSA/PyBudWxsO1xyXG5cclxuICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSB7XHJcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiKSB7XHJcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikge1xyXG4gICAgICAgIGlmIChjYW5EZWxldGUpIHtcclxuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAocmVzb2x2ZWRFZGl0TG9jaykge1xyXG4gICAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuKSB7XHJcbiAgICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcclxuICAgICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcclxuICAgICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikge1xyXG4gICAgICAgIGlmIChyZXNvbHZlZERlbGV0ZUxvY2sgfHwgIWNhbkRlbGV0ZSkge1xyXG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gIH0sIFtcclxuICAgIGFjdGlvbkdyb3VwSWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgY2FuRGVsZXRlLFxyXG4gICAgaWRzLmNhbmNlbEJ0bklkLFxyXG4gICAgaWRzLmRlbGV0ZUJ0bklkLFxyXG4gICAgaWRzLmVkaXRJY29uSWQsXHJcbiAgICBpZHMuc2F2ZUljb25JZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICByZXNvbHZlZERlbGV0ZUxvY2ssXHJcbiAgICByZXNvbHZlZEVkaXRMb2NrLFxyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiIHx8IGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHJldHVybjtcclxuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGUgOiBjYW5FZGl0O1xyXG4gICAgICBpZiAoIWNhblByb2NlZWQpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgICB0aXRsZTogc2F2ZUNvbmZpcm1UaXRsZSxcclxuICAgICAgICAgIG1lc3NhZ2U6IHNhdmVDb25maXJtTWVzc2FnZSxcclxuICAgICAgICAgIGNvbmZpcm1UZXh0OiBzYXZlQ29uZmlybVRleHQsXHJcbiAgICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVTYXZlKCk7XHJcbiAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgICBjb25zdCBzdWNjZXNzRHVyYXRpb25NcyA9IGlzQ3JlYXRlTW9kZSA/IDkwMCA6IDEyMDA7XHJcbiAgICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIHN1Y2Nlc3NEdXJhdGlvbk1zKTtcclxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KHN1Y2Nlc3NEdXJhdGlvbk1zKTtcclxuICAgICAgICAgICAgICBvblNhdmVTdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoYW5kbGVFbmFibGVFZGl0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSByZXR1cm47XHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgcmVzb2x2ZWREZWxldGVMb2NrKSByZXR1cm47XHJcbiAgICAgIGlmICghY2FuRGVsZXRlKSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICB0aXRsZTogZGVsZXRlQ29uZmlybVRpdGxlLFxyXG4gICAgICAgIG1lc3NhZ2U6IGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBkZWxldGVDb25maXJtVGV4dCxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XHJcbiAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcclxuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICAgICAgICBvbkRlbGV0ZVN1Y2Nlc3MoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25DYW5jZWwgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuZGVsZXRlRXZlbnQsIG9uRGVsZXRlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHMuY2FuY2VsRXZlbnQsIG9uQ2FuY2VsKTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5DcmVhdGUsXHJcbiAgICBjYW5EZWxldGUsXHJcbiAgICBjYW5FZGl0LFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgICBkZWxldGVDb25maXJtVGV4dCxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZSxcclxuICAgIGV2ZW50cy5jYW5jZWxFdmVudCxcclxuICAgIGV2ZW50cy5kZWxldGVFdmVudCxcclxuICAgIGV2ZW50cy5lZGl0RXZlbnQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZVNhdmUsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgcmVzb2x2ZWREZWxldGVMb2NrLFxyXG4gICAgcmVzb2x2ZWRFZGl0TG9jayxcclxuICAgIHNhdmVDb25maXJtTWVzc2FnZSxcclxuICAgIHNhdmVDb25maXJtVGV4dCxcclxuICAgIHNhdmVDb25maXJtVGl0bGUsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gIF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxudHlwZSBFeHBlbnNlUmVhZE9ubHlGaWVsZFByb3BzID0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBmdWxsV2lkdGg/OiBib29sZWFuO1xyXG4gIGxlYWRpbmdJY29uPzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIC8vIFJlc2VydmVkIGZvciBmdXR1cmUgZmllbGQtdG8tcGFnZSBuYXZpZ2F0aW9uLiBLZXB0IGRpc2FibGVkIGludGVudGlvbmFsbHkgZm9yIG5vdy5cclxuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEVOQUJMRV9SRUFEX09OTFlfRklFTERfTkFWSUdBVElPTiA9IGZhbHNlO1xyXG5cclxuLy8gUmV1c2FibGUgcmVhZC1vbmx5IGZpZWxkIGZvciBleHBlbnNlIGRldGFpbCBwYWdlcy5cclxuY29uc3QgRXhwZW5zZVJlYWRPbmx5RmllbGQgPSAoeyBsYWJlbCwgdmFsdWUsIGZ1bGxXaWR0aCA9IGZhbHNlLCBsZWFkaW5nSWNvbiwgb25DbGljazogX29uQ2xpY2sgfTogRXhwZW5zZVJlYWRPbmx5RmllbGRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHZhbHVlIHx8IFwiLVwiO1xyXG4gIGNvbnN0IGlzQ2xpY2thYmxlID0gRU5BQkxFX1JFQURfT05MWV9GSUVMRF9OQVZJR0FUSU9OICYmIHR5cGVvZiBfb25DbGljayA9PT0gXCJmdW5jdGlvblwiICYmIGRpc3BsYXlWYWx1ZSAhPT0gXCItXCI7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17ZnVsbFdpZHRoID8gXCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCIgOiBcInNwYWNlLXktMS41XCJ9PlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2xhYmVsfTwvbGFiZWw+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICB7bGVhZGluZ0ljb24gPyAoXHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMyB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTQgdy00IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntsZWFkaW5nSWNvbn08L3NwYW4+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge2lzQ2xpY2thYmxlID8gKFxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZCAke2xlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwifSB0ZXh0LWxlZnQgdW5kZXJsaW5lIGRlY29yYXRpb24tc2xhdGUtNDAwIHVuZGVybGluZS1vZmZzZXQtMmAudHJpbSgpfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtfb25DbGlja31cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2Rpc3BsYXlWYWx1ZX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZCAke2xlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwifWAudHJpbSgpfSB2YWx1ZT17ZGlzcGxheVZhbHVlfSByZWFkT25seSAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VSZWFkT25seUZpZWxkO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNlY3Rpb25EaXZpZGVyUHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgbGFiZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgaGVhZGluZ0xldmVsPzogMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xyXG59O1xyXG5cclxuLy8gU2hhcmVkIGNlbnRlcmVkIHNlY3Rpb24gZGl2aWRlciB1c2VkIGFjcm9zcyBleHBlbnNlIGRldGFpbCBwYWdlcy5cclxuY29uc3QgRXhwZW5zZVNlY3Rpb25EaXZpZGVyID0gKHtcclxuICBsYWJlbCxcclxuICBjbGFzc05hbWUsXHJcbiAgbGFiZWxDbGFzc05hbWUsXHJcbiAgaGVhZGluZ0xldmVsID0gMixcclxufTogRXhwZW5zZVNlY3Rpb25EaXZpZGVyUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlciBleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3RhbmRhcmRcIiwgY2xhc3NOYW1lKX0gcm9sZT1cImhlYWRpbmdcIiBhcmlhLWxldmVsPXtoZWFkaW5nTGV2ZWx9PlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlcl9fbGFiZWxcIiwgbGFiZWxDbGFzc05hbWUpfT57bGFiZWx9PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTZWN0aW9uRGl2aWRlcjtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCTyxJQUFNLG9CQUFvQixDQUFDLFFBQStCO0FBQy9ELFNBQU8seUJBQXlCLEdBQUc7QUFDckM7QUFHTyxJQUFNLHlCQUF5QixPQUFVO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXNGO0FBQ3BGLGdCQUFjLEVBQUU7QUFDaEIsVUFBUSxJQUFJO0FBQ1osWUFBVSxXQUFXO0FBRXJCLE1BQUk7QUFDRixVQUFNLFFBQVEsTUFBTSxPQUFPO0FBQzNCLFdBQU8sRUFBRSxJQUFJLE1BQU0sTUFBTTtBQUFBLEVBQzNCLFNBQVMsT0FBTztBQUNkLFVBQU0sVUFDSixpQkFBaUIsU0FBUyxNQUFNLFVBQzVCLE1BQU0sVUFDTjtBQUNOLGtCQUFjLE9BQU87QUFDckIsY0FBVSxPQUFPO0FBQ2pCLFFBQUksY0FBYztBQUNoQixzQkFBZ0IsZ0JBQWdCLElBQUk7QUFBQSxJQUN0QztBQUNBLFdBQU8sRUFBRSxJQUFJLE1BQU07QUFBQSxFQUNyQixVQUFFO0FBQ0EsWUFBUSxLQUFLO0FBQUEsRUFDZjtBQUNGOzs7QUNyREEsbUJBQTBCO0FBMkRuQixJQUFNLDhCQUE4QixDQUFDO0FBQUEsRUFDMUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGFBQWE7QUFBQSxFQUNiLG1DQUFtQztBQUFBLEVBQ25DLG1CQUFtQjtBQUFBLEVBQ25C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
