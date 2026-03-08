import {
  wait
} from "./chunk-KJ3UA2J6.js";
import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  parseExpenseNumericInput
} from "./chunk-TWBQPWHO.js";
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
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  actionMode = "default",
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
  closeConfirm
}) => {
  const lockActions = isLocked && !(isCreateMode && allowCreateModeActionsWhenLocked);
  (0, import_react.useEffect)(() => {
    const editIcon = document.getElementById(ids.editIconId);
    const saveIcon = document.getElementById(ids.saveIconId);
    const deleteBtn = document.getElementById(ids.deleteBtnId);
    const cancelBtn = document.getElementById(ids.cancelBtnId);
    if (!editIcon || !saveIcon) return;
    const editBtn = editIcon.closest("button");
    if (actionMode === "view_only") {
      if (editBtn) editBtn.classList.add("topbar-hidden");
      editIcon.classList.add("hidden");
      saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
      return;
    }
    if (actionMode === "delete_only") {
      if (editBtn) editBtn.classList.add("topbar-hidden");
      editIcon.classList.add("hidden");
      saveIcon.classList.add("hidden");
      if (deleteBtn) {
        if (canDelete) {
          deleteBtn.classList.remove("topbar-hidden");
        } else {
          deleteBtn.classList.add("topbar-hidden");
        }
      }
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
      return;
    }
    if (editBtn) editBtn.classList.remove("topbar-hidden");
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
  }, [actionMode, canDelete, ids.cancelBtnId, ids.deleteBtnId, ids.editIconId, ids.saveIconId, isEditing, lockActions]);
  (0, import_react.useEffect)(() => {
    const onEdit = () => {
      if (actionMode === "delete_only" || actionMode === "view_only") return;
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
    lockActions,
    modalOpen,
    onDeleteSuccess,
    onSaveSuccess,
    openConfirm,
    saveConfirmMessage,
    saveConfirmText,
    saveConfirmTitle,
    setModalError
  ]);
};

export {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  parseDecimalInput,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuaW1wb3J0IHsgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxudHlwZSBNdXRhdGlvblNldHRlcnMgPSB7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG59O1xuXG50eXBlIEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+ID0gTXV0YXRpb25TZXR0ZXJzICYge1xuICBzdGFydFN0YXR1czogc3RyaW5nO1xuICBmYWxsYmFja0Vycm9yTWVzc2FnZTogc3RyaW5nO1xuICBhY3Rpb246ICgpID0+IFByb21pc2U8VD47XG4gIGZsYXNoT25FcnJvcj86IGJvb2xlYW47XG59O1xuXG4vLyBQYXJzZXMgZGVjaW1hbCB0ZXh0IGlucHV0IHN1cHBvcnRpbmcgZ3JvdXBlZCBhbmQgZGVjaW1hbCBzZXBhcmF0b3JzLlxuZXhwb3J0IGNvbnN0IHBhcnNlRGVjaW1hbElucHV0ID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIHJldHVybiBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQocmF3KTtcbn07XG5cbi8vIFJ1bnMgYW4gZXhwZW5zZSBtdXRhdGlvbiB3aXRoIHNoYXJlZCBidXN5L2Vycm9yL3N0YXR1cyBoYW5kbGluZy5cbmV4cG9ydCBjb25zdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uID0gYXN5bmMgPFQ+KHtcbiAgc3RhcnRTdGF0dXMsXG4gIGZhbGxiYWNrRXJyb3JNZXNzYWdlLFxuICBhY3Rpb24sXG4gIGZsYXNoT25FcnJvciA9IHRydWUsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbn06IEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+KTogUHJvbWlzZTx7IG9rOiB0cnVlOyB2YWx1ZTogVCB9IHwgeyBvazogZmFsc2UgfT4gPT4ge1xuICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICBzZXRCdXN5KHRydWUpO1xuICBzZXRTdGF0dXMoc3RhcnRTdGF0dXMpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBhY3Rpb24oKTtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgdmFsdWUgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgOiBmYWxsYmFja0Vycm9yTWVzc2FnZTtcbiAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICBpZiAoZmxhc2hPbkVycm9yKSB7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgfVxuICAgIHJldHVybiB7IG9rOiBmYWxzZSB9O1xuICB9IGZpbmFsbHkge1xuICAgIHNldEJ1c3koZmFsc2UpO1xuICB9XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBFeHBlbnNlUmVhZE9ubHlGaWVsZFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBmdWxsV2lkdGg/OiBib29sZWFuO1xuICBsZWFkaW5nSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBSZXVzYWJsZSByZWFkLW9ubHkgZmllbGQgZm9yIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxuY29uc3QgRXhwZW5zZVJlYWRPbmx5RmllbGQgPSAoeyBsYWJlbCwgdmFsdWUsIGZ1bGxXaWR0aCA9IGZhbHNlLCBsZWFkaW5nSWNvbiwgb25DbGljayB9OiBFeHBlbnNlUmVhZE9ubHlGaWVsZFByb3BzKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHZhbHVlIHx8IFwiLVwiO1xuICBjb25zdCBpc0NsaWNrYWJsZSA9IHR5cGVvZiBvbkNsaWNrID09PSBcImZ1bmN0aW9uXCIgJiYgZGlzcGxheVZhbHVlICE9PSBcIi1cIjtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtmdWxsV2lkdGggPyBcInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIiA6IFwic3BhY2UteS0xLjVcIn0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIHtsZWFkaW5nSWNvbiA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMyB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaC00IHctNCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj57bGVhZGluZ0ljb259PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtpc0NsaWNrYWJsZSA/IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCBpbmQtcmVhZG9ubHktZmllbGQgJHtsZWFkaW5nSWNvbiA/IFwicGwtOVwiIDogXCJcIn0gdGV4dC1sZWZ0IHVuZGVybGluZSBkZWNvcmF0aW9uLXNsYXRlLTQwMCB1bmRlcmxpbmUtb2Zmc2V0LTJgLnRyaW0oKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2Rpc3BsYXlWYWx1ZX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZCAke2xlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwifWAudHJpbSgpfSB2YWx1ZT17ZGlzcGxheVZhbHVlfSByZWFkT25seSAvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUmVhZE9ubHlGaWVsZDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBFeHBlbnNlU2VjdGlvbkRpdmlkZXJQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBsYWJlbENsYXNzTmFtZT86IHN0cmluZztcbiAgaGVhZGluZ0xldmVsPzogMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xufTtcblxuLy8gU2hhcmVkIGNlbnRlcmVkIHNlY3Rpb24gZGl2aWRlciB1c2VkIGFjcm9zcyBleHBlbnNlIGRldGFpbCBwYWdlcy5cbmNvbnN0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciA9ICh7XG4gIGxhYmVsLFxuICBjbGFzc05hbWUsXG4gIGxhYmVsQ2xhc3NOYW1lLFxuICBoZWFkaW5nTGV2ZWwgPSAyLFxufTogRXhwZW5zZVNlY3Rpb25EaXZpZGVyUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyIGV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zdGFuZGFyZFwiLCBjbGFzc05hbWUpfSByb2xlPVwiaGVhZGluZ1wiIGFyaWEtbGV2ZWw9e2hlYWRpbmdMZXZlbH0+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlcl9fbGFiZWxcIiwgbGFiZWxDbGFzc05hbWUpfT57bGFiZWx9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyO1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy93YWl0LnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcblxudHlwZSBUb3BiYXJDcnVkSWRzID0ge1xuICBlZGl0SWNvbklkOiBzdHJpbmc7XG4gIHNhdmVJY29uSWQ6IHN0cmluZztcbiAgZGVsZXRlQnRuSWQ6IHN0cmluZztcbiAgY2FuY2VsQnRuSWQ6IHN0cmluZztcbn07XG5cbnR5cGUgVG9wYmFyQ3J1ZEV2ZW50cyA9IHtcbiAgZWRpdEV2ZW50OiBzdHJpbmc7XG4gIGRlbGV0ZUV2ZW50OiBzdHJpbmc7XG4gIGNhbmNlbEV2ZW50OiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9uc0FyZ3MgPSB7XG4gIGlkczogVG9wYmFyQ3J1ZElkcztcbiAgZXZlbnRzOiBUb3BiYXJDcnVkRXZlbnRzO1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcbiAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ/OiBib29sZWFuO1xuICBjYW5DcmVhdGU6IGJvb2xlYW47XG4gIGNhbkVkaXQ6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZTogYm9vbGVhbjtcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XG4gIGhhbmRsZVNhdmU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgc2F2ZUNvbmZpcm1UaXRsZTogc3RyaW5nO1xuICBzYXZlQ29uZmlybU1lc3NhZ2U6IHN0cmluZztcbiAgc2F2ZUNvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIGRlbGV0ZUNvbmZpcm1UaXRsZTogc3RyaW5nO1xuICBkZWxldGVDb25maXJtTWVzc2FnZTogc3RyaW5nO1xuICBkZWxldGVDb25maXJtVGV4dDogc3RyaW5nO1xuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xuICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIEhhbmRsZXMgc2hhcmVkIHRvcGJhciBzYXZlL2VkaXQvZGVsZXRlL2NhbmNlbCB3aXJpbmcgZm9yIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyA9ICh7XG4gIGlkcyxcbiAgZXZlbnRzLFxuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0xvY2tlZCxcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxuICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZCA9IGZhbHNlLFxuICBjYW5DcmVhdGUsXG4gIGNhbkVkaXQsXG4gIGNhbkRlbGV0ZSxcbiAgc2V0TW9kYWxFcnJvcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgaGFuZGxlU2F2ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBzYXZlQ29uZmlybVRpdGxlLFxuICBzYXZlQ29uZmlybU1lc3NhZ2UsXG4gIHNhdmVDb25maXJtVGV4dCxcbiAgZGVsZXRlQ29uZmlybVRpdGxlLFxuICBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgZGVsZXRlQ29uZmlybVRleHQsXG4gIG9uU2F2ZVN1Y2Nlc3MsXG4gIG9uRGVsZXRlU3VjY2VzcyxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3QgbG9ja0FjdGlvbnMgPSBpc0xvY2tlZCAmJiAhKGlzQ3JlYXRlTW9kZSAmJiBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5lZGl0SWNvbklkKTtcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5zYXZlSWNvbklkKTtcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuZGVsZXRlQnRuSWQpO1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5jYW5jZWxCdG5JZCk7XG4gICAgaWYgKCFlZGl0SWNvbiB8fCAhc2F2ZUljb24pIHJldHVybjtcbiAgICBjb25zdCBlZGl0QnRuID0gZWRpdEljb24uY2xvc2VzdChcImJ1dHRvblwiKTtcblxuICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSB7XG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChhY3Rpb25Nb2RlID09PSBcImRlbGV0ZV9vbmx5XCIpIHtcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSB7XG4gICAgICAgIGlmIChjYW5EZWxldGUpIHtcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgaWYgKGxvY2tBY3Rpb25zKSB7XG4gICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgc2F2ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfVxuICB9LCBbYWN0aW9uTW9kZSwgY2FuRGVsZXRlLCBpZHMuY2FuY2VsQnRuSWQsIGlkcy5kZWxldGVCdG5JZCwgaWRzLmVkaXRJY29uSWQsIGlkcy5zYXZlSWNvbklkLCBpc0VkaXRpbmcsIGxvY2tBY3Rpb25zXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvbkVkaXQgPSAoKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiIHx8IGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHJldHVybjtcbiAgICAgIGlmIChsb2NrQWN0aW9ucykgcmV0dXJuO1xuXG4gICAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlIDogY2FuRWRpdDtcbiAgICAgIGlmICghY2FuUHJvY2VlZCkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICAgIHRpdGxlOiBzYXZlQ29uZmlybVRpdGxlLFxuICAgICAgICAgIG1lc3NhZ2U6IHNhdmVDb25maXJtTWVzc2FnZSxcbiAgICAgICAgICBjb25maXJtVGV4dDogc2F2ZUNvbmZpcm1UZXh0LFxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVTYXZlKCk7XG4gICAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc0R1cmF0aW9uTXMgPSBpc0NyZWF0ZU1vZGUgPyA5MDAgOiAxMjAwO1xuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgc3VjY2Vzc0R1cmF0aW9uTXMpO1xuICAgICAgICAgICAgICBhd2FpdCB3YWl0KHN1Y2Nlc3NEdXJhdGlvbk1zKTtcbiAgICAgICAgICAgICAgb25TYXZlU3VjY2VzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9rO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInZpZXdfb25seVwiKSByZXR1cm47XG4gICAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGxvY2tBY3Rpb25zKSByZXR1cm47XG4gICAgICBpZiAoIWNhbkRlbGV0ZSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogZGVsZXRlQ29uZmlybVRpdGxlLFxuICAgICAgICBtZXNzYWdlOiBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgICAgICAgY29uZmlybVRleHQ6IGRlbGV0ZUNvbmZpcm1UZXh0LFxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva0RlbFByb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xuICAgICAgICAgICAgb25EZWxldGVTdWNjZXNzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNhbmNlbCA9ICgpID0+IHtcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuZWRpdEV2ZW50LCBvbkVkaXQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHMuZGVsZXRlRXZlbnQsIG9uRGVsZXRlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xuICAgIH07XG4gIH0sIFtcbiAgICBhY3Rpb25Nb2RlLFxuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlLFxuICAgIGNhbkRlbGV0ZSxcbiAgICBjYW5FZGl0LFxuICAgIGNsb3NlQ29uZmlybSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgICBkZWxldGVDb25maXJtVGV4dCxcbiAgICBkZWxldGVDb25maXJtVGl0bGUsXG4gICAgZXZlbnRzLmNhbmNlbEV2ZW50LFxuICAgIGV2ZW50cy5kZWxldGVFdmVudCxcbiAgICBldmVudHMuZWRpdEV2ZW50LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlU2F2ZSxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNFZGl0aW5nLFxuICAgIGxvY2tBY3Rpb25zLFxuICAgIG1vZGFsT3BlbixcbiAgICBvbkRlbGV0ZVN1Y2Nlc3MsXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2UsXG4gICAgc2F2ZUNvbmZpcm1UZXh0LFxuICAgIHNhdmVDb25maXJtVGl0bGUsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgXSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCTyxJQUFNLG9CQUFvQixDQUFDLFFBQStCO0FBQy9ELFNBQU8seUJBQXlCLEdBQUc7QUFDckM7QUFHTyxJQUFNLHlCQUF5QixPQUFVO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Y7QUFB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
