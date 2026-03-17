import {
  wait
} from "./chunk-KJ3UA2J6.js";
import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  parseExpenseNumericInput
} from "./chunk-JWQJTNB4.js";
import {
  setTopbarActionGroupReady
} from "./chunk-6G7EOWHU.js";
import {
  classNames,
  showPermissionModal
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuaW1wb3J0IHsgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxudHlwZSBNdXRhdGlvblNldHRlcnMgPSB7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG59O1xuXG50eXBlIEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+ID0gTXV0YXRpb25TZXR0ZXJzICYge1xuICBzdGFydFN0YXR1czogc3RyaW5nO1xuICBmYWxsYmFja0Vycm9yTWVzc2FnZTogc3RyaW5nO1xuICBhY3Rpb246ICgpID0+IFByb21pc2U8VD47XG4gIGZsYXNoT25FcnJvcj86IGJvb2xlYW47XG59O1xuXG4vLyBQYXJzZXMgZGVjaW1hbCB0ZXh0IGlucHV0IHN1cHBvcnRpbmcgZ3JvdXBlZCBhbmQgZGVjaW1hbCBzZXBhcmF0b3JzLlxuZXhwb3J0IGNvbnN0IHBhcnNlRGVjaW1hbElucHV0ID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIHJldHVybiBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQocmF3KTtcbn07XG5cbi8vIFJ1bnMgYW4gZXhwZW5zZSBtdXRhdGlvbiB3aXRoIHNoYXJlZCBidXN5L2Vycm9yL3N0YXR1cyBoYW5kbGluZy5cbmV4cG9ydCBjb25zdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uID0gYXN5bmMgPFQ+KHtcbiAgc3RhcnRTdGF0dXMsXG4gIGZhbGxiYWNrRXJyb3JNZXNzYWdlLFxuICBhY3Rpb24sXG4gIGZsYXNoT25FcnJvciA9IHRydWUsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbn06IEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+KTogUHJvbWlzZTx7IG9rOiB0cnVlOyB2YWx1ZTogVCB9IHwgeyBvazogZmFsc2UgfT4gPT4ge1xuICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICBzZXRCdXN5KHRydWUpO1xuICBzZXRTdGF0dXMoc3RhcnRTdGF0dXMpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBhY3Rpb24oKTtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgdmFsdWUgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgOiBmYWxsYmFja0Vycm9yTWVzc2FnZTtcbiAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICBpZiAoZmxhc2hPbkVycm9yKSB7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgfVxuICAgIHJldHVybiB7IG9rOiBmYWxzZSB9O1xuICB9IGZpbmFsbHkge1xuICAgIHNldEJ1c3koZmFsc2UpO1xuICB9XG59O1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy93YWl0LnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xuXG50eXBlIFRvcGJhckNydWRJZHMgPSB7XG4gIGVkaXRJY29uSWQ6IHN0cmluZztcbiAgc2F2ZUljb25JZDogc3RyaW5nO1xuICBkZWxldGVCdG5JZDogc3RyaW5nO1xuICBjYW5jZWxCdG5JZDogc3RyaW5nO1xufTtcblxudHlwZSBUb3BiYXJDcnVkRXZlbnRzID0ge1xuICBlZGl0RXZlbnQ6IHN0cmluZztcbiAgZGVsZXRlRXZlbnQ6IHN0cmluZztcbiAgY2FuY2VsRXZlbnQ6IHN0cmluZztcbn07XG5cbnR5cGUgVXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zQXJncyA9IHtcbiAgaWRzOiBUb3BiYXJDcnVkSWRzO1xuICBldmVudHM6IFRvcGJhckNydWRFdmVudHM7XG4gIGFjdGlvbkdyb3VwSWQ6IHN0cmluZztcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGlzRWRpdExvY2tlZD86IGJvb2xlYW47XG4gIGlzRGVsZXRlTG9ja2VkPzogYm9vbGVhbjtcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcbiAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ/OiBib29sZWFuO1xuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlOiBib29sZWFuO1xuICBjYW5FZGl0OiBib29sZWFuO1xuICBjYW5EZWxldGU6IGJvb2xlYW47XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVTYXZlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIHNhdmVDb25maXJtVGl0bGU6IHN0cmluZztcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XG4gIHNhdmVDb25maXJtVGV4dDogc3RyaW5nO1xuICBkZWxldGVDb25maXJtVGl0bGU6IHN0cmluZztcbiAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IHN0cmluZztcbiAgZGVsZXRlQ29uZmlybVRleHQ6IHN0cmluZztcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB2b2lkO1xuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xuICB9KSA9PiB2b2lkO1xuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBIYW5kbGVzIHNoYXJlZCB0b3BiYXIgc2F2ZS9lZGl0L2RlbGV0ZS9jYW5jZWwgd2lyaW5nIGZvciBleHBlbnNlIGRldGFpbCBwYWdlcy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgPSAoe1xuICBpZHMsXG4gIGV2ZW50cyxcbiAgYWN0aW9uR3JvdXBJZCxcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGlzRWRpdExvY2tlZCxcbiAgaXNEZWxldGVMb2NrZWQsXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcbiAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQgPSBmYWxzZSxcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXG4gIGNhbkNyZWF0ZSxcbiAgY2FuRWRpdCxcbiAgY2FuRGVsZXRlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVTYXZlLFxuICBoYW5kbGVEZWxldGUsXG4gIHNhdmVDb25maXJtVGl0bGUsXG4gIHNhdmVDb25maXJtTWVzc2FnZSxcbiAgc2F2ZUNvbmZpcm1UZXh0LFxuICBkZWxldGVDb25maXJtVGl0bGUsXG4gIGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxuICBkZWxldGVDb25maXJtVGV4dCxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb25EZWxldGVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zQXJncykgPT4ge1xuICBjb25zdCByZXNvbHZlZEVkaXRMb2NrID0gKGlzRWRpdExvY2tlZCA/PyBpc0xvY2tlZCkgJiYgIShpc0NyZWF0ZU1vZGUgJiYgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQpO1xuICBjb25zdCByZXNvbHZlZERlbGV0ZUxvY2sgPSBpc0RlbGV0ZUxvY2tlZCA/PyBpc0xvY2tlZDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuZWRpdEljb25JZCk7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuc2F2ZUljb25JZCk7XG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmRlbGV0ZUJ0bklkKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuY2FuY2VsQnRuSWQpO1xuICAgIGNvbnN0IGVkaXRCdG4gPSBlZGl0SWNvbj8uY2xvc2VzdChcImJ1dHRvblwiKSA/PyBudWxsO1xuXG4gICAgaWYgKGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHtcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiKSB7XG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIHtcbiAgICAgICAgaWYgKGNhbkRlbGV0ZSkge1xuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcbiAgICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikge1xuICAgICAgICBpZiAocmVzb2x2ZWRFZGl0TG9jaykge1xuICAgICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcbiAgICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikge1xuICAgICAgICBpZiAocmVzb2x2ZWREZWxldGVMb2NrIHx8ICFjYW5EZWxldGUpIHtcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfVxuXG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcbiAgfSwgW1xuICAgIGFjdGlvbkdyb3VwSWQsXG4gICAgYWN0aW9uTW9kZSxcbiAgICBjYW5EZWxldGUsXG4gICAgaWRzLmNhbmNlbEJ0bklkLFxuICAgIGlkcy5kZWxldGVCdG5JZCxcbiAgICBpZHMuZWRpdEljb25JZCxcbiAgICBpZHMuc2F2ZUljb25JZCxcbiAgICBpc0VkaXRpbmcsXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcbiAgICByZXNvbHZlZERlbGV0ZUxvY2ssXG4gICAgcmVzb2x2ZWRFZGl0TG9jayxcbiAgXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcblxuICAgIGNvbnN0IG9uRWRpdCA9ICgpID0+IHtcbiAgICAgIGlmIChhY3Rpb25Nb2RlID09PSBcImRlbGV0ZV9vbmx5XCIgfHwgYWN0aW9uTW9kZSA9PT0gXCJ2aWV3X29ubHlcIikgcmV0dXJuO1xuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHJldHVybjtcblxuICAgICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZSA6IGNhbkVkaXQ7XG4gICAgICBpZiAoIWNhblByb2NlZWQpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgICAgIG9wZW5Db25maXJtKHtcbiAgICAgICAgICB0aXRsZTogc2F2ZUNvbmZpcm1UaXRsZSxcbiAgICAgICAgICBtZXNzYWdlOiBzYXZlQ29uZmlybU1lc3NhZ2UsXG4gICAgICAgICAgY29uZmlybVRleHQ6IHNhdmVDb25maXJtVGV4dCxcbiAgICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlU2F2ZSgpO1xuICAgICAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3NEdXJhdGlvbk1zID0gaXNDcmVhdGVNb2RlID8gOTAwIDogMTIwMDtcbiAgICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIHN1Y2Nlc3NEdXJhdGlvbk1zKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdChzdWNjZXNzRHVyYXRpb25Ncyk7XG4gICAgICAgICAgICAgIG9uU2F2ZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJ2aWV3X29ubHlcIikgcmV0dXJuO1xuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCByZXNvbHZlZERlbGV0ZUxvY2spIHJldHVybjtcbiAgICAgIGlmICghY2FuRGVsZXRlKSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgICBvcGVuQ29uZmlybSh7XG4gICAgICAgIHRpdGxlOiBkZWxldGVDb25maXJtVGl0bGUsXG4gICAgICAgIG1lc3NhZ2U6IGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxuICAgICAgICBjb25maXJtVGV4dDogZGVsZXRlQ29uZmlybVRleHQsXG4gICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XG4gICAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rRGVsUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICAgICAgICBvbkRlbGV0ZVN1Y2Nlc3MoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9rO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2FuY2VsID0gKCkgPT4ge1xuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmRlbGV0ZUV2ZW50LCBvbkRlbGV0ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmNhbmNlbEV2ZW50LCBvbkNhbmNlbCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmVkaXRFdmVudCwgb25FZGl0KTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmNhbmNlbEV2ZW50LCBvbkNhbmNlbCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGFjdGlvbk1vZGUsXG4gICAgYnVzeSxcbiAgICBjYW5DcmVhdGUsXG4gICAgY2FuRGVsZXRlLFxuICAgIGNhbkVkaXQsXG4gICAgY2xvc2VDb25maXJtLFxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0LFxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZSxcbiAgICBldmVudHMuY2FuY2VsRXZlbnQsXG4gICAgZXZlbnRzLmRlbGV0ZUV2ZW50LFxuICAgIGV2ZW50cy5lZGl0RXZlbnQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVTYXZlLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxPcGVuLFxuICAgIG9uRGVsZXRlU3VjY2VzcyxcbiAgICBvblNhdmVTdWNjZXNzLFxuICAgIG9wZW5Db25maXJtLFxuICAgIHBlcm1pc3Npb25zUmVhZHksXG4gICAgcmVzb2x2ZWREZWxldGVMb2NrLFxuICAgIHJlc29sdmVkRWRpdExvY2ssXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlLFxuICAgIHNhdmVDb25maXJtVGV4dCxcbiAgICBzYXZlQ29uZmlybVRpdGxlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gIF0pO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgRXhwZW5zZVJlYWRPbmx5RmllbGRQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgZnVsbFdpZHRoPzogYm9vbGVhbjtcbiAgbGVhZGluZ0ljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIC8vIFJlc2VydmVkIGZvciBmdXR1cmUgZmllbGQtdG8tcGFnZSBuYXZpZ2F0aW9uLiBLZXB0IGRpc2FibGVkIGludGVudGlvbmFsbHkgZm9yIG5vdy5cbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBFTkFCTEVfUkVBRF9PTkxZX0ZJRUxEX05BVklHQVRJT04gPSBmYWxzZTtcblxuLy8gUmV1c2FibGUgcmVhZC1vbmx5IGZpZWxkIGZvciBleHBlbnNlIGRldGFpbCBwYWdlcy5cbmNvbnN0IEV4cGVuc2VSZWFkT25seUZpZWxkID0gKHsgbGFiZWwsIHZhbHVlLCBmdWxsV2lkdGggPSBmYWxzZSwgbGVhZGluZ0ljb24sIG9uQ2xpY2s6IF9vbkNsaWNrIH06IEV4cGVuc2VSZWFkT25seUZpZWxkUHJvcHMpID0+IHtcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gdmFsdWUgfHwgXCItXCI7XG4gIGNvbnN0IGlzQ2xpY2thYmxlID0gRU5BQkxFX1JFQURfT05MWV9GSUVMRF9OQVZJR0FUSU9OICYmIHR5cGVvZiBfb25DbGljayA9PT0gXCJmdW5jdGlvblwiICYmIGRpc3BsYXlWYWx1ZSAhPT0gXCItXCI7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17ZnVsbFdpZHRoID8gXCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCIgOiBcInNwYWNlLXktMS41XCJ9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICB7bGVhZGluZ0ljb24gPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNCB3LTQgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+e2xlYWRpbmdJY29ufTwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7aXNDbGlja2FibGUgPyAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkICR7bGVhZGluZ0ljb24gPyBcInBsLTlcIiA6IFwiXCJ9IHRleHQtbGVmdCB1bmRlcmxpbmUgZGVjb3JhdGlvbi1zbGF0ZS00MDAgdW5kZXJsaW5lLW9mZnNldC0yYC50cmltKCl9XG4gICAgICAgICAgICBvbkNsaWNrPXtfb25DbGlja31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7ZGlzcGxheVZhbHVlfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkICR7bGVhZGluZ0ljb24gPyBcInBsLTlcIiA6IFwiXCJ9YC50cmltKCl9IHZhbHVlPXtkaXNwbGF5VmFsdWV9IHJlYWRPbmx5IC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VSZWFkT25seUZpZWxkO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuXG50eXBlIEV4cGVuc2VTZWN0aW9uRGl2aWRlclByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBoZWFkaW5nTGV2ZWw/OiAxIHwgMiB8IDMgfCA0IHwgNSB8IDY7XG59O1xuXG4vLyBTaGFyZWQgY2VudGVyZWQgc2VjdGlvbiBkaXZpZGVyIHVzZWQgYWNyb3NzIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxuY29uc3QgRXhwZW5zZVNlY3Rpb25EaXZpZGVyID0gKHtcbiAgbGFiZWwsXG4gIGNsYXNzTmFtZSxcbiAgbGFiZWxDbGFzc05hbWUsXG4gIGhlYWRpbmdMZXZlbCA9IDIsXG59OiBFeHBlbnNlU2VjdGlvbkRpdmlkZXJQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXIgZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXN0YW5kYXJkXCIsIGNsYXNzTmFtZSl9IHJvbGU9XCJoZWFkaW5nXCIgYXJpYS1sZXZlbD17aGVhZGluZ0xldmVsfT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyX19sYWJlbFwiLCBsYWJlbENsYXNzTmFtZSl9PntsYWJlbH08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2VjdGlvbkRpdmlkZXI7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JPLElBQU0sb0JBQW9CLENBQUMsUUFBK0I7QUFDL0QsU0FBTyx5QkFBeUIsR0FBRztBQUNyQztBQUdPLElBQU0seUJBQXlCLE9BQVU7QUFBQSxFQUM5QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxlQUFlO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBc0Y7QUFDcEYsZ0JBQWMsRUFBRTtBQUNoQixVQUFRLElBQUk7QUFDWixZQUFVLFdBQVc7QUFFckIsTUFBSTtBQUNGLFVBQU0sUUFBUSxNQUFNLE9BQU87QUFDM0IsV0FBTyxFQUFFLElBQUksTUFBTSxNQUFNO0FBQUEsRUFDM0IsU0FBUyxPQUFPO0FBQ2QsVUFBTSxVQUNKLGlCQUFpQixTQUFTLE1BQU0sVUFDNUIsTUFBTSxVQUNOO0FBQ04sa0JBQWMsT0FBTztBQUNyQixjQUFVLE9BQU87QUFDakIsUUFBSSxjQUFjO0FBQ2hCLHNCQUFnQixnQkFBZ0IsSUFBSTtBQUFBLElBQ3RDO0FBQ0EsV0FBTyxFQUFFLElBQUksTUFBTTtBQUFBLEVBQ3JCLFVBQUU7QUFDQSxZQUFRLEtBQUs7QUFBQSxFQUNmO0FBQ0Y7OztBQ3JEQSxtQkFBMEI7QUEyRG5CLElBQU0sOEJBQThCLENBQUM7QUFBQSxFQUMxQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxF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
