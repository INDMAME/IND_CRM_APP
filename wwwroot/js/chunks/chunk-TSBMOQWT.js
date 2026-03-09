import {
  wait
} from "./chunk-KJ3UA2J6.js";
import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  parseExpenseNumericInput
} from "./chunk-FUOK7RBM.js";
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

// Web/wwwroot/react/src/pages/gastos/utils/expenseManagedUserScope.ts
var normalizeUserId = (value) => String(value || "").trim();
var isSameExpenseUser = (left, right) => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var isManagingOtherExpenseUser = ({
  canManageOtherUsers,
  currentAxUserId,
  selectedManagedUserId,
  isCreateMode = false
}) => {
  if (isCreateMode || !canManageOtherUsers) return false;
  const normalizedCurrentUserId = normalizeUserId(currentAxUserId);
  const normalizedSelectedManagedUserId = normalizeUserId(selectedManagedUserId);
  if (!normalizedCurrentUserId || !normalizedSelectedManagedUserId) return false;
  return !isSameExpenseUser(normalizedCurrentUserId, normalizedSelectedManagedUserId);
};

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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseReadOnlyField.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseReadOnlyField = ({ label, value, fullWidth = false, leadingIcon, onClick }) => {
  const displayValue = value || "-";
  const isClickable = typeof onClick === "function" && displayValue !== "-";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: fullWidth ? "sm:col-span-2 space-y-1.5" : "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      leadingIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: leadingIcon }) }) : null,
      isClickable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          className: `form-control ind-readonly-field ${leadingIcon ? "pl-9" : ""} text-left underline decoration-slate-400 underline-offset-2`.trim(),
          onClick,
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

export {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  isManagingOtherExpenseUser,
  parseDecimalInput,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuXG4vLyBDb21wYXJlcyBBeFVzZXIgaWRlbnRpZmllcnMgd2l0aCBzdGFibGUgdHJpbW1pbmcgYW5kIGNhc2luZy5cbmV4cG9ydCBjb25zdCBpc1NhbWVFeHBlbnNlVXNlciA9IChsZWZ0OiB1bmtub3duLCByaWdodDogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZVVzZXJJZChsZWZ0KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkUmlnaHQgPSBub3JtYWxpemVVc2VySWQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XG59O1xuXG4vLyBSZXNvbHZlcyB3aGV0aGVyIHRoZSBjdXJyZW50IGV4cGVuc2UgY29udGV4dCBpcyBhY3Rpbmcgb24gYW5vdGhlciB1c2VyJ3MgZGF0YS5cbmV4cG9ydCBjb25zdCBpc01hbmFnaW5nT3RoZXJFeHBlbnNlVXNlciA9ICh7XG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gIGN1cnJlbnRBeFVzZXJJZCxcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICBpc0NyZWF0ZU1vZGUgPSBmYWxzZSxcbn06IHtcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcbiAgY3VycmVudEF4VXNlcklkOiB1bmtub3duO1xuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHVua25vd247XG4gIGlzQ3JlYXRlTW9kZT86IGJvb2xlYW47XG59KTogYm9vbGVhbiA9PiB7XG4gIGlmIChpc0NyZWF0ZU1vZGUgfHwgIWNhbk1hbmFnZU90aGVyVXNlcnMpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBub3JtYWxpemVkQ3VycmVudFVzZXJJZCA9IG5vcm1hbGl6ZVVzZXJJZChjdXJyZW50QXhVc2VySWQpO1xuICBjb25zdCBub3JtYWxpemVkU2VsZWN0ZWRNYW5hZ2VkVXNlcklkID0gbm9ybWFsaXplVXNlcklkKHNlbGVjdGVkTWFuYWdlZFVzZXJJZCk7XG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnRVc2VySWQgfHwgIW5vcm1hbGl6ZWRTZWxlY3RlZE1hbmFnZWRVc2VySWQpIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gIWlzU2FtZUV4cGVuc2VVc2VyKG5vcm1hbGl6ZWRDdXJyZW50VXNlcklkLCBub3JtYWxpemVkU2VsZWN0ZWRNYW5hZ2VkVXNlcklkKTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5cbnR5cGUgTXV0YXRpb25TZXR0ZXJzID0ge1xuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xufTtcblxudHlwZSBFeGVjdXRlRXhwZW5zZU11dGF0aW9uQXJnczxUPiA9IE11dGF0aW9uU2V0dGVycyAmIHtcbiAgc3RhcnRTdGF0dXM6IHN0cmluZztcbiAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgYWN0aW9uOiAoKSA9PiBQcm9taXNlPFQ+O1xuICBmbGFzaE9uRXJyb3I/OiBib29sZWFuO1xufTtcblxuLy8gUGFyc2VzIGRlY2ltYWwgdGV4dCBpbnB1dCBzdXBwb3J0aW5nIGdyb3VwZWQgYW5kIGRlY2ltYWwgc2VwYXJhdG9ycy5cbmV4cG9ydCBjb25zdCBwYXJzZURlY2ltYWxJbnB1dCA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4ge1xuICByZXR1cm4gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHJhdyk7XG59O1xuXG4vLyBSdW5zIGFuIGV4cGVuc2UgbXV0YXRpb24gd2l0aCBzaGFyZWQgYnVzeS9lcnJvci9zdGF0dXMgaGFuZGxpbmcuXG5leHBvcnQgY29uc3QgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiA9IGFzeW5jIDxUPih7XG4gIHN0YXJ0U3RhdHVzLFxuICBmYWxsYmFja0Vycm9yTWVzc2FnZSxcbiAgYWN0aW9uLFxuICBmbGFzaE9uRXJyb3IgPSB0cnVlLFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG59OiBFeGVjdXRlRXhwZW5zZU11dGF0aW9uQXJnczxUPik6IFByb21pc2U8eyBvazogdHJ1ZTsgdmFsdWU6IFQgfSB8IHsgb2s6IGZhbHNlIH0+ID0+IHtcbiAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgc2V0QnVzeSh0cnVlKTtcbiAgc2V0U3RhdHVzKHN0YXJ0U3RhdHVzKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgYWN0aW9uKCk7XG4gICAgcmV0dXJuIHsgb2s6IHRydWUsIHZhbHVlIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgIDogZmFsbGJhY2tFcnJvck1lc3NhZ2U7XG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgaWYgKGZsYXNoT25FcnJvcikge1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgIH1cbiAgICByZXR1cm4geyBvazogZmFsc2UgfTtcbiAgfSBmaW5hbGx5IHtcbiAgICBzZXRCdXN5KGZhbHNlKTtcbiAgfVxufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgRXhwZW5zZVJlYWRPbmx5RmllbGRQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgZnVsbFdpZHRoPzogYm9vbGVhbjtcbiAgbGVhZGluZ0ljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gUmV1c2FibGUgcmVhZC1vbmx5IGZpZWxkIGZvciBleHBlbnNlIGRldGFpbCBwYWdlcy5cbmNvbnN0IEV4cGVuc2VSZWFkT25seUZpZWxkID0gKHsgbGFiZWwsIHZhbHVlLCBmdWxsV2lkdGggPSBmYWxzZSwgbGVhZGluZ0ljb24sIG9uQ2xpY2sgfTogRXhwZW5zZVJlYWRPbmx5RmllbGRQcm9wcykgPT4ge1xuICBjb25zdCBkaXNwbGF5VmFsdWUgPSB2YWx1ZSB8fCBcIi1cIjtcbiAgY29uc3QgaXNDbGlja2FibGUgPSB0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiICYmIGRpc3BsYXlWYWx1ZSAhPT0gXCItXCI7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17ZnVsbFdpZHRoID8gXCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCIgOiBcInNwYWNlLXktMS41XCJ9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICB7bGVhZGluZ0ljb24gPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNCB3LTQgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+e2xlYWRpbmdJY29ufTwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7aXNDbGlja2FibGUgPyAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkICR7bGVhZGluZ0ljb24gPyBcInBsLTlcIiA6IFwiXCJ9IHRleHQtbGVmdCB1bmRlcmxpbmUgZGVjb3JhdGlvbi1zbGF0ZS00MDAgdW5kZXJsaW5lLW9mZnNldC0yYC50cmltKCl9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtkaXNwbGF5VmFsdWV9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCBpbmQtcmVhZG9ubHktZmllbGQgJHtsZWFkaW5nSWNvbiA/IFwicGwtOVwiIDogXCJcIn1gLnRyaW0oKX0gdmFsdWU9e2Rpc3BsYXlWYWx1ZX0gcmVhZE9ubHkgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVJlYWRPbmx5RmllbGQ7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVNlY3Rpb25EaXZpZGVyUHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIGhlYWRpbmdMZXZlbD86IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcbn07XG5cbi8vIFNoYXJlZCBjZW50ZXJlZCBzZWN0aW9uIGRpdmlkZXIgdXNlZCBhY3Jvc3MgZXhwZW5zZSBkZXRhaWwgcGFnZXMuXG5jb25zdCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgPSAoe1xuICBsYWJlbCxcbiAgY2xhc3NOYW1lLFxuICBsYWJlbENsYXNzTmFtZSxcbiAgaGVhZGluZ0xldmVsID0gMixcbn06IEV4cGVuc2VTZWN0aW9uRGl2aWRlclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlciBleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3RhbmRhcmRcIiwgY2xhc3NOYW1lKX0gcm9sZT1cImhlYWRpbmdcIiBhcmlhLWxldmVsPXtoZWFkaW5nTGV2ZWx9PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXJfX2xhYmVsXCIsIGxhYmVsQ2xhc3NOYW1lKX0+e2xhYmVsfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTZWN0aW9uRGl2aWRlcjtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvd2FpdC50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcblxudHlwZSBUb3BiYXJDcnVkSWRzID0ge1xuICBlZGl0SWNvbklkOiBzdHJpbmc7XG4gIHNhdmVJY29uSWQ6IHN0cmluZztcbiAgZGVsZXRlQnRuSWQ6IHN0cmluZztcbiAgY2FuY2VsQnRuSWQ6IHN0cmluZztcbn07XG5cbnR5cGUgVG9wYmFyQ3J1ZEV2ZW50cyA9IHtcbiAgZWRpdEV2ZW50OiBzdHJpbmc7XG4gIGRlbGV0ZUV2ZW50OiBzdHJpbmc7XG4gIGNhbmNlbEV2ZW50OiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9uc0FyZ3MgPSB7XG4gIGlkczogVG9wYmFyQ3J1ZElkcztcbiAgZXZlbnRzOiBUb3BiYXJDcnVkRXZlbnRzO1xuICBhY3Rpb25Hcm91cElkOiBzdHJpbmc7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzTG9ja2VkOiBib29sZWFuO1xuICBpc0VkaXRMb2NrZWQ/OiBib29sZWFuO1xuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XG4gIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkPzogYm9vbGVhbjtcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XG4gIGNhbkNyZWF0ZTogYm9vbGVhbjtcbiAgY2FuRWRpdDogYm9vbGVhbjtcbiAgY2FuRGVsZXRlOiBib29sZWFuO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlU2F2ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBzYXZlQ29uZmlybVRpdGxlOiBzdHJpbmc7XG4gIHNhdmVDb25maXJtTWVzc2FnZTogc3RyaW5nO1xuICBzYXZlQ29uZmlybVRleHQ6IHN0cmluZztcbiAgZGVsZXRlQ29uZmlybVRpdGxlOiBzdHJpbmc7XG4gIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XG4gIGRlbGV0ZUNvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9uRGVsZXRlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gSGFuZGxlcyBzaGFyZWQgdG9wYmFyIHNhdmUvZWRpdC9kZWxldGUvY2FuY2VsIHdpcmluZyBmb3IgZXhwZW5zZSBkZXRhaWwgcGFnZXMuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zID0gKHtcbiAgaWRzLFxuICBldmVudHMsXG4gIGFjdGlvbkdyb3VwSWQsXG4gIGJ1c3ksXG4gIG1vZGFsT3BlbixcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzTG9ja2VkLFxuICBpc0VkaXRMb2NrZWQsXG4gIGlzRGVsZXRlTG9ja2VkLFxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXG4gIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkID0gZmFsc2UsXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxuICBjYW5DcmVhdGUsXG4gIGNhbkVkaXQsXG4gIGNhbkRlbGV0ZSxcbiAgc2V0TW9kYWxFcnJvcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgaGFuZGxlU2F2ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBzYXZlQ29uZmlybVRpdGxlLFxuICBzYXZlQ29uZmlybU1lc3NhZ2UsXG4gIHNhdmVDb25maXJtVGV4dCxcbiAgZGVsZXRlQ29uZmlybVRpdGxlLFxuICBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgZGVsZXRlQ29uZmlybVRleHQsXG4gIG9uU2F2ZVN1Y2Nlc3MsXG4gIG9uRGVsZXRlU3VjY2VzcyxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3QgcmVzb2x2ZWRFZGl0TG9jayA9IChpc0VkaXRMb2NrZWQgPz8gaXNMb2NrZWQpICYmICEoaXNDcmVhdGVNb2RlICYmIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkKTtcbiAgY29uc3QgcmVzb2x2ZWREZWxldGVMb2NrID0gaXNEZWxldGVMb2NrZWQgPz8gaXNMb2NrZWQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcblxuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmVkaXRJY29uSWQpO1xuICAgIGNvbnN0IHNhdmVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLnNhdmVJY29uSWQpO1xuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5kZWxldGVCdG5JZCk7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmNhbmNlbEJ0bklkKTtcbiAgICBjb25zdCBlZGl0QnRuID0gZWRpdEljb24/LmNsb3Nlc3QoXCJidXR0b25cIikgPz8gbnVsbDtcblxuICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSB7XG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGFjdGlvbk1vZGUgPT09IFwiZGVsZXRlX29ubHlcIikge1xuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSB7XG4gICAgICAgIGlmIChjYW5EZWxldGUpIHtcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChyZXNvbHZlZEVkaXRMb2NrKSB7XG4gICAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIHtcbiAgICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcbiAgICAgICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXNvbHZlZEVkaXRMb2NrKSB7XG4gICAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIHtcbiAgICAgICAgaWYgKHJlc29sdmVkRGVsZXRlTG9jaykge1xuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICB9XG5cbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xuICB9LCBbXG4gICAgYWN0aW9uR3JvdXBJZCxcbiAgICBhY3Rpb25Nb2RlLFxuICAgIGNhbkRlbGV0ZSxcbiAgICBpZHMuY2FuY2VsQnRuSWQsXG4gICAgaWRzLmRlbGV0ZUJ0bklkLFxuICAgIGlkcy5lZGl0SWNvbklkLFxuICAgIGlkcy5zYXZlSWNvbklkLFxuICAgIGlzRWRpdGluZyxcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxuICAgIHJlc29sdmVkRGVsZXRlTG9jayxcbiAgICByZXNvbHZlZEVkaXRMb2NrLFxuICBdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcGVybWlzc2lvbnNSZWFkeSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKGFjdGlvbk1vZGUgPT09IFwiZGVsZXRlX29ubHlcIiB8fCBhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSByZXR1cm47XG4gICAgICBpZiAocmVzb2x2ZWRFZGl0TG9jaykgcmV0dXJuO1xuXG4gICAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlIDogY2FuRWRpdDtcbiAgICAgIGlmICghY2FuUHJvY2VlZCkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICAgIHRpdGxlOiBzYXZlQ29uZmlybVRpdGxlLFxuICAgICAgICAgIG1lc3NhZ2U6IHNhdmVDb25maXJtTWVzc2FnZSxcbiAgICAgICAgICBjb25maXJtVGV4dDogc2F2ZUNvbmZpcm1UZXh0LFxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVTYXZlKCk7XG4gICAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc0R1cmF0aW9uTXMgPSBpc0NyZWF0ZU1vZGUgPyA5MDAgOiAxMjAwO1xuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgc3VjY2Vzc0R1cmF0aW9uTXMpO1xuICAgICAgICAgICAgICBhd2FpdCB3YWl0KHN1Y2Nlc3NEdXJhdGlvbk1zKTtcbiAgICAgICAgICAgICAgb25TYXZlU3VjY2VzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9rO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSByZXR1cm47XG4gICAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IHJlc29sdmVkRGVsZXRlTG9jaykgcmV0dXJuO1xuICAgICAgaWYgKCFjYW5EZWxldGUpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICAgIG9wZW5Db25maXJtKHtcbiAgICAgICAgdGl0bGU6IGRlbGV0ZUNvbmZpcm1UaXRsZSxcbiAgICAgICAgbWVzc2FnZTogZGVsZXRlQ29uZmlybU1lc3NhZ2UsXG4gICAgICAgIGNvbmZpcm1UZXh0OiBkZWxldGVDb25maXJtVGV4dCxcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVEZWxldGUoKTtcbiAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tEZWxQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcbiAgICAgICAgICAgIG9uRGVsZXRlU3VjY2VzcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25DYW5jZWwgPSAoKSA9PiB7XG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgIGhhbmRsZUNhbmNlbEVkaXQoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmVkaXRFdmVudCwgb25FZGl0KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuZGVsZXRlRXZlbnQsIG9uRGVsZXRlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuY2FuY2VsRXZlbnQsIG9uQ2FuY2VsKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHMuZWRpdEV2ZW50LCBvbkVkaXQpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmRlbGV0ZUV2ZW50LCBvbkRlbGV0ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHMuY2FuY2VsRXZlbnQsIG9uQ2FuY2VsKTtcbiAgICB9O1xuICB9LCBbXG4gICAgYWN0aW9uTW9kZSxcbiAgICBidXN5LFxuICAgIGNhbkNyZWF0ZSxcbiAgICBjYW5EZWxldGUsXG4gICAgY2FuRWRpdCxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2UsXG4gICAgZGVsZXRlQ29uZmlybVRleHQsXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlLFxuICAgIGV2ZW50cy5jYW5jZWxFdmVudCxcbiAgICBldmVudHMuZGVsZXRlRXZlbnQsXG4gICAgZXZlbnRzLmVkaXRFdmVudCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZVNhdmUsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbE9wZW4sXG4gICAgb25EZWxldGVTdWNjZXNzLFxuICAgIG9uU2F2ZVN1Y2Nlc3MsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcbiAgICByZXNvbHZlZERlbGV0ZUxvY2ssXG4gICAgcmVzb2x2ZWRFZGl0TG9jayxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2UsXG4gICAgc2F2ZUNvbmZpcm1UZXh0LFxuICAgIHNhdmVDb25maXJtVGl0bGUsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgXSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sa0JBQWtCLENBQUMsVUFBMkIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBR3RFLElBQU0sb0JBQW9CLENBQUMsTUFBZSxVQUE0QjtBQUMzRSxRQUFNLGlCQUFpQixnQkFBZ0IsSUFBSSxFQUFFLFlBQVk7QUFDekQsUUFBTSxrQkFBa0IsZ0JBQWdCLEtBQUssRUFBRSxZQUFZO0FBQzNELFNBQU8sQ0FBQyxDQUFDLGtCQUFrQixtQkFBbUI7QUFDaEQ7QUFHTyxJQUFNLDZCQUE2QixDQUFDO0FBQUEsRUFDekM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZUFBZTtBQUNqQixNQUtlO0FBQ2IsTUFBSSxnQkFBZ0IsQ0FBQyxvQkFBcUIsUUFBTztBQUVqRCxRQUFNLDBCQUEwQixnQkFBZ0IsZUFBZTtBQUMvRCxRQUFNLGtDQUFrQyxnQkFBZ0IscUJBQXFCO0FBQzdFLE1BQUksQ0FBQywyQkFBMkIsQ0FBQyxnQ0FBaUMsUUFBTztBQUV6RSxTQUFPLENBQUMsa0JBQWtCLHlCQUF5QiwrQkFBK0I7QUFDcEY7OztBQ1ZPLElB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
