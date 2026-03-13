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
        if (resolvedDeleteLock) {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuaW1wb3J0IHsgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxudHlwZSBNdXRhdGlvblNldHRlcnMgPSB7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG59O1xuXG50eXBlIEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+ID0gTXV0YXRpb25TZXR0ZXJzICYge1xuICBzdGFydFN0YXR1czogc3RyaW5nO1xuICBmYWxsYmFja0Vycm9yTWVzc2FnZTogc3RyaW5nO1xuICBhY3Rpb246ICgpID0+IFByb21pc2U8VD47XG4gIGZsYXNoT25FcnJvcj86IGJvb2xlYW47XG59O1xuXG4vLyBQYXJzZXMgZGVjaW1hbCB0ZXh0IGlucHV0IHN1cHBvcnRpbmcgZ3JvdXBlZCBhbmQgZGVjaW1hbCBzZXBhcmF0b3JzLlxuZXhwb3J0IGNvbnN0IHBhcnNlRGVjaW1hbElucHV0ID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIHJldHVybiBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQocmF3KTtcbn07XG5cbi8vIFJ1bnMgYW4gZXhwZW5zZSBtdXRhdGlvbiB3aXRoIHNoYXJlZCBidXN5L2Vycm9yL3N0YXR1cyBoYW5kbGluZy5cbmV4cG9ydCBjb25zdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uID0gYXN5bmMgPFQ+KHtcbiAgc3RhcnRTdGF0dXMsXG4gIGZhbGxiYWNrRXJyb3JNZXNzYWdlLFxuICBhY3Rpb24sXG4gIGZsYXNoT25FcnJvciA9IHRydWUsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbn06IEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+KTogUHJvbWlzZTx7IG9rOiB0cnVlOyB2YWx1ZTogVCB9IHwgeyBvazogZmFsc2UgfT4gPT4ge1xuICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICBzZXRCdXN5KHRydWUpO1xuICBzZXRTdGF0dXMoc3RhcnRTdGF0dXMpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBhY3Rpb24oKTtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgdmFsdWUgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgOiBmYWxsYmFja0Vycm9yTWVzc2FnZTtcbiAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICBpZiAoZmxhc2hPbkVycm9yKSB7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgfVxuICAgIHJldHVybiB7IG9rOiBmYWxzZSB9O1xuICB9IGZpbmFsbHkge1xuICAgIHNldEJ1c3koZmFsc2UpO1xuICB9XG59O1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy93YWl0LnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdG9wYmFyQWN0aW9uVmlzaWJpbGl0eS50c1wiO1xuXG50eXBlIFRvcGJhckNydWRJZHMgPSB7XG4gIGVkaXRJY29uSWQ6IHN0cmluZztcbiAgc2F2ZUljb25JZDogc3RyaW5nO1xuICBkZWxldGVCdG5JZDogc3RyaW5nO1xuICBjYW5jZWxCdG5JZDogc3RyaW5nO1xufTtcblxudHlwZSBUb3BiYXJDcnVkRXZlbnRzID0ge1xuICBlZGl0RXZlbnQ6IHN0cmluZztcbiAgZGVsZXRlRXZlbnQ6IHN0cmluZztcbiAgY2FuY2VsRXZlbnQ6IHN0cmluZztcbn07XG5cbnR5cGUgVXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zQXJncyA9IHtcbiAgaWRzOiBUb3BiYXJDcnVkSWRzO1xuICBldmVudHM6IFRvcGJhckNydWRFdmVudHM7XG4gIGFjdGlvbkdyb3VwSWQ6IHN0cmluZztcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGlzRWRpdExvY2tlZD86IGJvb2xlYW47XG4gIGlzRGVsZXRlTG9ja2VkPzogYm9vbGVhbjtcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcbiAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ/OiBib29sZWFuO1xuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlOiBib29sZWFuO1xuICBjYW5FZGl0OiBib29sZWFuO1xuICBjYW5EZWxldGU6IGJvb2xlYW47XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVTYXZlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIHNhdmVDb25maXJtVGl0bGU6IHN0cmluZztcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XG4gIHNhdmVDb25maXJtVGV4dDogc3RyaW5nO1xuICBkZWxldGVDb25maXJtVGl0bGU6IHN0cmluZztcbiAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IHN0cmluZztcbiAgZGVsZXRlQ29uZmlybVRleHQ6IHN0cmluZztcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB2b2lkO1xuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xuICB9KSA9PiB2b2lkO1xuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBIYW5kbGVzIHNoYXJlZCB0b3BiYXIgc2F2ZS9lZGl0L2RlbGV0ZS9jYW5jZWwgd2lyaW5nIGZvciBleHBlbnNlIGRldGFpbCBwYWdlcy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgPSAoe1xuICBpZHMsXG4gIGV2ZW50cyxcbiAgYWN0aW9uR3JvdXBJZCxcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGlzRWRpdExvY2tlZCxcbiAgaXNEZWxldGVMb2NrZWQsXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcbiAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQgPSBmYWxzZSxcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXG4gIGNhbkNyZWF0ZSxcbiAgY2FuRWRpdCxcbiAgY2FuRGVsZXRlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVTYXZlLFxuICBoYW5kbGVEZWxldGUsXG4gIHNhdmVDb25maXJtVGl0bGUsXG4gIHNhdmVDb25maXJtTWVzc2FnZSxcbiAgc2F2ZUNvbmZpcm1UZXh0LFxuICBkZWxldGVDb25maXJtVGl0bGUsXG4gIGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxuICBkZWxldGVDb25maXJtVGV4dCxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb25EZWxldGVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zQXJncykgPT4ge1xuICBjb25zdCByZXNvbHZlZEVkaXRMb2NrID0gKGlzRWRpdExvY2tlZCA/PyBpc0xvY2tlZCkgJiYgIShpc0NyZWF0ZU1vZGUgJiYgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQpO1xuICBjb25zdCByZXNvbHZlZERlbGV0ZUxvY2sgPSBpc0RlbGV0ZUxvY2tlZCA/PyBpc0xvY2tlZDtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuZWRpdEljb25JZCk7XG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuc2F2ZUljb25JZCk7XG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmRlbGV0ZUJ0bklkKTtcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuY2FuY2VsQnRuSWQpO1xuICAgIGNvbnN0IGVkaXRCdG4gPSBlZGl0SWNvbj8uY2xvc2VzdChcImJ1dHRvblwiKSA/PyBudWxsO1xuXG4gICAgaWYgKGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHtcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiKSB7XG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIHtcbiAgICAgICAgaWYgKGNhbkRlbGV0ZSkge1xuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcbiAgICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikge1xuICAgICAgICBpZiAocmVzb2x2ZWRFZGl0TG9jaykge1xuICAgICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcbiAgICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikge1xuICAgICAgICBpZiAocmVzb2x2ZWREZWxldGVMb2NrKSB7XG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIH1cblxuICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XG4gIH0sIFtcbiAgICBhY3Rpb25Hcm91cElkLFxuICAgIGFjdGlvbk1vZGUsXG4gICAgY2FuRGVsZXRlLFxuICAgIGlkcy5jYW5jZWxCdG5JZCxcbiAgICBpZHMuZGVsZXRlQnRuSWQsXG4gICAgaWRzLmVkaXRJY29uSWQsXG4gICAgaWRzLnNhdmVJY29uSWQsXG4gICAgaXNFZGl0aW5nLFxuICAgIHBlcm1pc3Npb25zUmVhZHksXG4gICAgcmVzb2x2ZWREZWxldGVMb2NrLFxuICAgIHJlc29sdmVkRWRpdExvY2ssXG4gIF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XG5cbiAgICBjb25zdCBvbkVkaXQgPSAoKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiIHx8IGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHJldHVybjtcbiAgICAgIGlmIChyZXNvbHZlZEVkaXRMb2NrKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGUgOiBjYW5FZGl0O1xuICAgICAgaWYgKCFjYW5Qcm9jZWVkKSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgICAgICBvcGVuQ29uZmlybSh7XG4gICAgICAgICAgdGl0bGU6IHNhdmVDb25maXJtVGl0bGUsXG4gICAgICAgICAgbWVzc2FnZTogc2F2ZUNvbmZpcm1NZXNzYWdlLFxuICAgICAgICAgIGNvbmZpcm1UZXh0OiBzYXZlQ29uZmlybVRleHQsXG4gICAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVNhdmUoKTtcbiAgICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgICAgICAgICBjb25zdCBzdWNjZXNzRHVyYXRpb25NcyA9IGlzQ3JlYXRlTW9kZSA/IDkwMCA6IDEyMDA7XG4gICAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCBzdWNjZXNzRHVyYXRpb25Ncyk7XG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoc3VjY2Vzc0R1cmF0aW9uTXMpO1xuICAgICAgICAgICAgICBvblNhdmVTdWNjZXNzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGVFbmFibGVFZGl0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uRGVsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHJldHVybjtcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgcmVzb2x2ZWREZWxldGVMb2NrKSByZXR1cm47XG4gICAgICBpZiAoIWNhbkRlbGV0ZSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogZGVsZXRlQ29uZmlybVRpdGxlLFxuICAgICAgICBtZXNzYWdlOiBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgICAgICAgY29uZmlybVRleHQ6IGRlbGV0ZUNvbmZpcm1UZXh0LFxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva0RlbFByb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xuICAgICAgICAgICAgb25EZWxldGVTdWNjZXNzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNhbmNlbCA9ICgpID0+IHtcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuZWRpdEV2ZW50LCBvbkVkaXQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHMuZGVsZXRlRXZlbnQsIG9uRGVsZXRlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xuICAgIH07XG4gIH0sIFtcbiAgICBhY3Rpb25Nb2RlLFxuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlLFxuICAgIGNhbkRlbGV0ZSxcbiAgICBjYW5FZGl0LFxuICAgIGNsb3NlQ29uZmlybSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgICBkZWxldGVDb25maXJtVGV4dCxcbiAgICBkZWxldGVDb25maXJtVGl0bGUsXG4gICAgZXZlbnRzLmNhbmNlbEV2ZW50LFxuICAgIGV2ZW50cy5kZWxldGVFdmVudCxcbiAgICBldmVudHMuZWRpdEV2ZW50LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlU2F2ZSxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNFZGl0aW5nLFxuICAgIG1vZGFsT3BlbixcbiAgICBvbkRlbGV0ZVN1Y2Nlc3MsXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxuICAgIHJlc29sdmVkRGVsZXRlTG9jayxcbiAgICByZXNvbHZlZEVkaXRMb2NrLFxuICAgIHNhdmVDb25maXJtTWVzc2FnZSxcbiAgICBzYXZlQ29uZmlybVRleHQsXG4gICAgc2F2ZUNvbmZpcm1UaXRsZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICBdKTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIEV4cGVuc2VSZWFkT25seUZpZWxkUHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGZ1bGxXaWR0aD86IGJvb2xlYW47XG4gIGxlYWRpbmdJY29uPzogUmVhY3QuUmVhY3ROb2RlO1xuICAvLyBSZXNlcnZlZCBmb3IgZnV0dXJlIGZpZWxkLXRvLXBhZ2UgbmF2aWdhdGlvbi4gS2VwdCBkaXNhYmxlZCBpbnRlbnRpb25hbGx5IGZvciBub3cuXG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xufTtcblxuY29uc3QgRU5BQkxFX1JFQURfT05MWV9GSUVMRF9OQVZJR0FUSU9OID0gZmFsc2U7XG5cbi8vIFJldXNhYmxlIHJlYWQtb25seSBmaWVsZCBmb3IgZXhwZW5zZSBkZXRhaWwgcGFnZXMuXG5jb25zdCBFeHBlbnNlUmVhZE9ubHlGaWVsZCA9ICh7IGxhYmVsLCB2YWx1ZSwgZnVsbFdpZHRoID0gZmFsc2UsIGxlYWRpbmdJY29uLCBvbkNsaWNrOiBfb25DbGljayB9OiBFeHBlbnNlUmVhZE9ubHlGaWVsZFByb3BzKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHZhbHVlIHx8IFwiLVwiO1xuICBjb25zdCBpc0NsaWNrYWJsZSA9IEVOQUJMRV9SRUFEX09OTFlfRklFTERfTkFWSUdBVElPTiAmJiB0eXBlb2YgX29uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIiAmJiBkaXNwbGF5VmFsdWUgIT09IFwiLVwiO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2Z1bGxXaWR0aCA/IFwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiIDogXCJzcGFjZS15LTEuNVwifT5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57bGFiZWx9PC9sYWJlbD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAge2xlYWRpbmdJY29uID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0zIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTQgdy00IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntsZWFkaW5nSWNvbn08L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzQ2xpY2thYmxlID8gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZCAke2xlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwifSB0ZXh0LWxlZnQgdW5kZXJsaW5lIGRlY29yYXRpb24tc2xhdGUtNDAwIHVuZGVybGluZS1vZmZzZXQtMmAudHJpbSgpfVxuICAgICAgICAgICAgb25DbGljaz17X29uQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2Rpc3BsYXlWYWx1ZX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZCAke2xlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwifWAudHJpbSgpfSB2YWx1ZT17ZGlzcGxheVZhbHVlfSByZWFkT25seSAvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUmVhZE9ubHlGaWVsZDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBFeHBlbnNlU2VjdGlvbkRpdmlkZXJQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBsYWJlbENsYXNzTmFtZT86IHN0cmluZztcbiAgaGVhZGluZ0xldmVsPzogMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xufTtcblxuLy8gU2hhcmVkIGNlbnRlcmVkIHNlY3Rpb24gZGl2aWRlciB1c2VkIGFjcm9zcyBleHBlbnNlIGRldGFpbCBwYWdlcy5cbmNvbnN0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciA9ICh7XG4gIGxhYmVsLFxuICBjbGFzc05hbWUsXG4gIGxhYmVsQ2xhc3NOYW1lLFxuICBoZWFkaW5nTGV2ZWwgPSAyLFxufTogRXhwZW5zZVNlY3Rpb25EaXZpZGVyUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyIGV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zdGFuZGFyZFwiLCBjbGFzc05hbWUpfSByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGV2ZWw9e2hlYWRpbmdMZXZlbH0+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlcl9fbGFiZWxcIiwgbGFiZWxDbGFzc05hbWUpfT57bGFiZWx9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCTyxJQUFNLG9CQUFvQixDQUFDLFFBQStCO0FBQy9ELFNBQU8seUJBQXlCLEdBQUc7QUFDckM7QUFHTyxJQUFNLHlCQUF5QixPQUFVO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXNGO0FBQ3BGLGdCQUFjLEVBQUU7QUFDaEIsVUFBUSxJQUFJO0FBQ1osWUFBVSxXQUFXO0FBRXJCLE1BQUk7QUFDRixVQUFNLFFBQVEsTUFBTSxPQUFPO0FBQzNCLFdBQU8sRUFBRSxJQUFJLE1BQU0sTUFBTTtBQUFBLEVBQzNCLFNBQVMsT0FBTztBQUNkLFVBQU0sVUFDSixpQkFBaUIsU0FBUyxNQUFNLFVBQzVCLE1BQU0sVUFDTjtBQUNOLGtCQUFjLE9BQU87QUFDckIsY0FBVSxPQUFPO0FBQ2pCLFFBQUksY0FBYztBQUNoQixzQkFBZ0IsZ0JBQWdCLElBQUk7QUFBQSxJQUN0QztBQUNBLFdBQU8sRUFBRSxJQUFJLE1BQU07QUFBQSxFQUNyQixVQUFFO0FBQ0EsWUFBUSxLQUFLO0FBQUEsRUFDZjtBQUNGOzs7QUNyREEsbUJBQTBCO0FBMkRuQixJQUFNLDhCQUE4QixDQUFDO0FBQUEsRUFDMUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7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
