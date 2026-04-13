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
} from "./chunk-ZHH4AWW7.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcblxyXG50eXBlIE11dGF0aW9uU2V0dGVycyA9IHtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbnR5cGUgRXhlY3V0ZUV4cGVuc2VNdXRhdGlvbkFyZ3M8VD4gPSBNdXRhdGlvblNldHRlcnMgJiB7XHJcbiAgc3RhcnRTdGF0dXM6IHN0cmluZztcclxuICBmYWxsYmFja0Vycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGFjdGlvbjogKCkgPT4gUHJvbWlzZTxUPjtcclxuICBmbGFzaE9uRXJyb3I/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGRlY2ltYWwgdGV4dCBpbnB1dCBzdXBwb3J0aW5nIGdyb3VwZWQgYW5kIGRlY2ltYWwgc2VwYXJhdG9ycy5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRGVjaW1hbElucHV0ID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgcmV0dXJuIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChyYXcpO1xyXG59O1xyXG5cclxuLy8gUnVucyBhbiBleHBlbnNlIG11dGF0aW9uIHdpdGggc2hhcmVkIGJ1c3kvZXJyb3Ivc3RhdHVzIGhhbmRsaW5nLlxyXG5leHBvcnQgY29uc3QgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiA9IGFzeW5jIDxUPih7XHJcbiAgc3RhcnRTdGF0dXMsXHJcbiAgZmFsbGJhY2tFcnJvck1lc3NhZ2UsXHJcbiAgYWN0aW9uLFxyXG4gIGZsYXNoT25FcnJvciA9IHRydWUsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxufTogRXhlY3V0ZUV4cGVuc2VNdXRhdGlvbkFyZ3M8VD4pOiBQcm9taXNlPHsgb2s6IHRydWU7IHZhbHVlOiBUIH0gfCB7IG9rOiBmYWxzZSB9PiA9PiB7XHJcbiAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICBzZXRCdXN5KHRydWUpO1xyXG4gIHNldFN0YXR1cyhzdGFydFN0YXR1cyk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IGFjdGlvbigpO1xyXG4gICAgcmV0dXJuIHsgb2s6IHRydWUsIHZhbHVlIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPVxyXG4gICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcclxuICAgICAgICA6IGZhbGxiYWNrRXJyb3JNZXNzYWdlO1xyXG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcclxuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgIGlmIChmbGFzaE9uRXJyb3IpIHtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlIH07XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gIH1cclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3dhaXQudHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHsgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy90b3BiYXJBY3Rpb25WaXNpYmlsaXR5LnRzXCI7XHJcblxyXG50eXBlIFRvcGJhckNydWRJZHMgPSB7XHJcbiAgZWRpdEljb25JZDogc3RyaW5nO1xyXG4gIHNhdmVJY29uSWQ6IHN0cmluZztcclxuICBkZWxldGVCdG5JZDogc3RyaW5nO1xyXG4gIGNhbmNlbEJ0bklkOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFRvcGJhckNydWRFdmVudHMgPSB7XHJcbiAgZWRpdEV2ZW50OiBzdHJpbmc7XHJcbiAgZGVsZXRlRXZlbnQ6IHN0cmluZztcclxuICBjYW5jZWxFdmVudDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnNBcmdzID0ge1xyXG4gIGlkczogVG9wYmFyQ3J1ZElkcztcclxuICBldmVudHM6IFRvcGJhckNydWRFdmVudHM7XHJcbiAgYWN0aW9uR3JvdXBJZDogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZD86IGJvb2xlYW47XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlOiBib29sZWFuO1xyXG4gIGNhbkVkaXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlOiBib29sZWFuO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0/OiAoKSA9PiBib29sZWFuO1xyXG4gIGhhbmRsZVNhdmU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIHNhdmVDb25maXJtVGl0bGU6IHN0cmluZztcclxuICBzYXZlQ29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBzYXZlQ29uZmlybVRleHQ6IHN0cmluZztcclxuICBkZWxldGVDb25maXJtVGl0bGU6IHN0cmluZztcclxuICBkZWxldGVDb25maXJtTWVzc2FnZTogc3RyaW5nO1xyXG4gIGRlbGV0ZUNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcclxuICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gSGFuZGxlcyBzaGFyZWQgdG9wYmFyIHNhdmUvZWRpdC9kZWxldGUvY2FuY2VsIHdpcmluZyBmb3IgZXhwZW5zZSBkZXRhaWwgcGFnZXMuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgPSAoe1xyXG4gIGlkcyxcclxuICBldmVudHMsXHJcbiAgYWN0aW9uR3JvdXBJZCxcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGlzRWRpdExvY2tlZCxcclxuICBpc0RlbGV0ZUxvY2tlZCxcclxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXHJcbiAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQgPSBmYWxzZSxcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5DcmVhdGUsXHJcbiAgY2FuRWRpdCxcclxuICBjYW5EZWxldGUsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVNhdmUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIHNhdmVDb25maXJtVGl0bGUsXHJcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlLFxyXG4gIHNhdmVDb25maXJtVGV4dCxcclxuICBkZWxldGVDb25maXJtVGl0bGUsXHJcbiAgZGVsZXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgZGVsZXRlQ29uZmlybVRleHQsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgcmVzb2x2ZWRFZGl0TG9jayA9IChpc0VkaXRMb2NrZWQgPz8gaXNMb2NrZWQpICYmICEoaXNDcmVhdGVNb2RlICYmIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkKTtcclxuICBjb25zdCByZXNvbHZlZERlbGV0ZUxvY2sgPSBpc0RlbGV0ZUxvY2tlZCA/PyBpc0xvY2tlZDtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmVkaXRJY29uSWQpO1xyXG4gICAgY29uc3Qgc2F2ZUljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuc2F2ZUljb25JZCk7XHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuZGVsZXRlQnRuSWQpO1xyXG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmNhbmNlbEJ0bklkKTtcclxuICAgIGNvbnN0IGVkaXRCdG4gPSBlZGl0SWNvbj8uY2xvc2VzdChcImJ1dHRvblwiKSA/PyBudWxsO1xyXG5cclxuICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSB7XHJcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiKSB7XHJcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikge1xyXG4gICAgICAgIGlmIChjYW5EZWxldGUpIHtcclxuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAocmVzb2x2ZWRFZGl0TG9jaykge1xyXG4gICAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuKSB7XHJcbiAgICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcclxuICAgICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcclxuICAgICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikge1xyXG4gICAgICAgIGlmIChyZXNvbHZlZERlbGV0ZUxvY2sgfHwgIWNhbkRlbGV0ZSkge1xyXG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gIH0sIFtcclxuICAgIGFjdGlvbkdyb3VwSWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgY2FuRGVsZXRlLFxyXG4gICAgaWRzLmNhbmNlbEJ0bklkLFxyXG4gICAgaWRzLmRlbGV0ZUJ0bklkLFxyXG4gICAgaWRzLmVkaXRJY29uSWQsXHJcbiAgICBpZHMuc2F2ZUljb25JZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICByZXNvbHZlZERlbGV0ZUxvY2ssXHJcbiAgICByZXNvbHZlZEVkaXRMb2NrLFxyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiIHx8IGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHJldHVybjtcclxuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGUgOiBjYW5FZGl0O1xyXG4gICAgICBpZiAoIWNhblByb2NlZWQpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYW5PcGVuU2F2ZUNvbmZpcm0gPT09IFwiZnVuY3Rpb25cIiAmJiAhY2FuT3BlblNhdmVDb25maXJtKCkpIHJldHVybjtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICAgIHRpdGxlOiBzYXZlQ29uZmlybVRpdGxlLFxyXG4gICAgICAgICAgbWVzc2FnZTogc2F2ZUNvbmZpcm1NZXNzYWdlLFxyXG4gICAgICAgICAgY29uZmlybVRleHQ6IHNhdmVDb25maXJtVGV4dCxcclxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVNhdmUoKTtcclxuICAgICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3NEdXJhdGlvbk1zID0gaXNDcmVhdGVNb2RlID8gOTAwIDogMTIwMDtcclxuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgc3VjY2Vzc0R1cmF0aW9uTXMpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoc3VjY2Vzc0R1cmF0aW9uTXMpO1xyXG4gICAgICAgICAgICAgIG9uU2F2ZVN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcclxuICAgICAgaWYgKGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHJldHVybjtcclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCByZXNvbHZlZERlbGV0ZUxvY2spIHJldHVybjtcclxuICAgICAgaWYgKCFjYW5EZWxldGUpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBkZWxldGVDb25maXJtVGl0bGUsXHJcbiAgICAgICAgbWVzc2FnZTogZGVsZXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgICAgICAgY29uZmlybVRleHQ6IGRlbGV0ZUNvbmZpcm1UZXh0LFxyXG4gICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVEZWxldGUoKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva0RlbFByb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XHJcbiAgICAgICAgICAgIG9uRGVsZXRlU3VjY2VzcygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkNhbmNlbCA9ICgpID0+IHtcclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIGhhbmRsZUNhbmNlbEVkaXQoKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmVkaXRFdmVudCwgb25FZGl0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmNhbmNlbEV2ZW50LCBvbkNhbmNlbCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmVkaXRFdmVudCwgb25FZGl0KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmRlbGV0ZUV2ZW50LCBvbkRlbGV0ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xyXG4gICAgfTtcclxuICB9LCBbXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgYnVzeSxcclxuICAgIGNhbkNyZWF0ZSxcclxuICAgIGNhbkRlbGV0ZSxcclxuICAgIGNhbkVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0LFxyXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlLFxyXG4gICAgZXZlbnRzLmNhbmNlbEV2ZW50LFxyXG4gICAgZXZlbnRzLmRlbGV0ZUV2ZW50LFxyXG4gICAgZXZlbnRzLmVkaXRFdmVudCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlU2F2ZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIG9uRGVsZXRlU3VjY2VzcyxcclxuICAgIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICByZXNvbHZlZERlbGV0ZUxvY2ssXHJcbiAgICByZXNvbHZlZEVkaXRMb2NrLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlLFxyXG4gICAgc2F2ZUNvbmZpcm1UZXh0LFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG50eXBlIEV4cGVuc2VSZWFkT25seUZpZWxkUHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIGZ1bGxXaWR0aD86IGJvb2xlYW47XHJcbiAgbGVhZGluZ0ljb24/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgLy8gUmVzZXJ2ZWQgZm9yIGZ1dHVyZSBmaWVsZC10by1wYWdlIG5hdmlnYXRpb24uIEtlcHQgZGlzYWJsZWQgaW50ZW50aW9uYWxseSBmb3Igbm93LlxyXG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgRU5BQkxFX1JFQURfT05MWV9GSUVMRF9OQVZJR0FUSU9OID0gZmFsc2U7XHJcblxyXG4vLyBSZXVzYWJsZSByZWFkLW9ubHkgZmllbGQgZm9yIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxyXG5jb25zdCBFeHBlbnNlUmVhZE9ubHlGaWVsZCA9ICh7IGxhYmVsLCB2YWx1ZSwgZnVsbFdpZHRoID0gZmFsc2UsIGxlYWRpbmdJY29uLCBvbkNsaWNrOiBfb25DbGljayB9OiBFeHBlbnNlUmVhZE9ubHlGaWVsZFByb3BzKSA9PiB7XHJcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gdmFsdWUgfHwgXCItXCI7XHJcbiAgY29uc3QgaXNDbGlja2FibGUgPSBFTkFCTEVfUkVBRF9PTkxZX0ZJRUxEX05BVklHQVRJT04gJiYgdHlwZW9mIF9vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIgJiYgZGlzcGxheVZhbHVlICE9PSBcIi1cIjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtmdWxsV2lkdGggPyBcInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIiA6IFwic3BhY2UteS0xLjVcIn0+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57bGFiZWx9PC9sYWJlbD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIHtsZWFkaW5nSWNvbiA/IChcclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0zIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNCB3LTQgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+e2xlYWRpbmdJY29ufTwvc3Bhbj5cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7aXNDbGlja2FibGUgPyAoXHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkICR7bGVhZGluZ0ljb24gPyBcInBsLTlcIiA6IFwiXCJ9IHRleHQtbGVmdCB1bmRlcmxpbmUgZGVjb3JhdGlvbi1zbGF0ZS00MDAgdW5kZXJsaW5lLW9mZnNldC0yYC50cmltKCl9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e19vbkNsaWNrfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7ZGlzcGxheVZhbHVlfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkICR7bGVhZGluZ0ljb24gPyBcInBsLTlcIiA6IFwiXCJ9YC50cmltKCl9IHZhbHVlPXtkaXNwbGF5VmFsdWV9IHJlYWRPbmx5IC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVJlYWRPbmx5RmllbGQ7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2VjdGlvbkRpdmlkZXJQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBsYWJlbENsYXNzTmFtZT86IHN0cmluZztcclxuICBoZWFkaW5nTGV2ZWw/OiAxIHwgMiB8IDMgfCA0IHwgNSB8IDY7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgY2VudGVyZWQgc2VjdGlvbiBkaXZpZGVyIHVzZWQgYWNyb3NzIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxyXG5jb25zdCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIGNsYXNzTmFtZSxcclxuICBsYWJlbENsYXNzTmFtZSxcclxuICBoZWFkaW5nTGV2ZWwgPSAyLFxyXG59OiBFeHBlbnNlU2VjdGlvbkRpdmlkZXJQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyIGV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zdGFuZGFyZFwiLCBjbGFzc05hbWUpfSByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGV2ZWw9e2hlYWRpbmdMZXZlbH0+XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyX19sYWJlbFwiLCBsYWJlbENsYXNzTmFtZSl9PntsYWJlbH08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JPLElBQU0sb0JBQW9CLENBQUMsUUFBK0I7QUFDL0QsU0FBTyx5QkFBeUIsR0FBRztBQUNyQztBQUdPLElBQU0seUJBQXlCLE9BQVU7QUFBQSxFQUM5QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxlQUFlO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBc0Y7QUFDcEYsZ0JBQWMsRUFBRTtBQUNoQixVQUFRLElBQUk7QUFDWixZQUFVLFdBQVc7QUFFckIsTUFBSTtBQUNGLFVBQU0sUUFBUSxNQUFNLE9BQU87QUFDM0IsV0FBTyxFQUFFLElBQUksTUFBTSxNQUFNO0FBQUEsRUFDM0IsU0FBUyxPQUFPO0FBQ2QsVUFBTSxVQUNKLGlCQUFpQixTQUFTLE1BQU0sVUFDNUIsTUFBTSxVQUNOO0FBQ04sa0JBQWMsT0FBTztBQUNyQixjQUFVLE9BQU87QUFDakIsUUFBSSxjQUFjO0FBQ2hCLHNCQUFnQixnQkFBZ0IsSUFBSTtBQUFBLElBQ3RDO0FBQ0EsV0FBTyxFQUFFLElBQUksTUFBTTtBQUFBLEVBQ3JCLFVBQUU7QUFDQSxZQUFRLEtBQUs7QUFBQSxFQUNmO0FBQ0Y7OztBQ3JEQSxtQkFBMEI7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
