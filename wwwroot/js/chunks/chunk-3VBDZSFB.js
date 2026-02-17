import {
  wait
} from "./chunk-SKJH2HTO.js";
import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  classNames,
  showPermissionModal
} from "./chunk-OO4T3BDP.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/components/ExpenseReadOnlyField.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseReadOnlyField = ({ label, value, fullWidth = false }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: fullWidth ? "sm:col-span-2 space-y-1.5" : "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: "form-control ind-readonly-field", value: value || "-", readOnly: true })
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

// Web/wwwroot/react/src/pages/gastos/hooks/expenseMutationUtils.ts
var parseDecimalInput = (raw) => {
  const value = String(raw || "").trim().replace(",", ".");
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
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
  closeConfirm
}) => {
  const lockActions = isLocked && !(isCreateMode && allowCreateModeActionsWhenLocked);
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
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
              await wait(200);
              flashActionMark("okProcess", 1200);
              await wait(1200);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgRXhwZW5zZVJlYWRPbmx5RmllbGRQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgZnVsbFdpZHRoPzogYm9vbGVhbjtcbn07XG5cbi8vIFJldXNhYmxlIHJlYWQtb25seSBmaWVsZCBmb3IgZXhwZW5zZSBkZXRhaWwgcGFnZXMuXG5jb25zdCBFeHBlbnNlUmVhZE9ubHlGaWVsZCA9ICh7IGxhYmVsLCB2YWx1ZSwgZnVsbFdpZHRoID0gZmFsc2UgfTogRXhwZW5zZVJlYWRPbmx5RmllbGRQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtmdWxsV2lkdGggPyBcInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIiA6IFwic3BhY2UteS0xLjVcIn0+XG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiIHZhbHVlPXt2YWx1ZSB8fCBcIi1cIn0gcmVhZE9ubHkgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VSZWFkT25seUZpZWxkO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuXG50eXBlIEV4cGVuc2VTZWN0aW9uRGl2aWRlclByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBoZWFkaW5nTGV2ZWw/OiAxIHwgMiB8IDMgfCA0IHwgNSB8IDY7XG59O1xuXG4vLyBTaGFyZWQgY2VudGVyZWQgc2VjdGlvbiBkaXZpZGVyIHVzZWQgYWNyb3NzIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxuY29uc3QgRXhwZW5zZVNlY3Rpb25EaXZpZGVyID0gKHtcbiAgbGFiZWwsXG4gIGNsYXNzTmFtZSxcbiAgbGFiZWxDbGFzc05hbWUsXG4gIGhlYWRpbmdMZXZlbCA9IDIsXG59OiBFeHBlbnNlU2VjdGlvbkRpdmlkZXJQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXIgZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXN0YW5kYXJkXCIsIGNsYXNzTmFtZSl9IHJvbGU9XCJoZWFkaW5nXCIgYXJpYS1sZXZlbD17aGVhZGluZ0xldmVsfT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyX19sYWJlbFwiLCBsYWJlbENsYXNzTmFtZSl9PntsYWJlbH08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2VjdGlvbkRpdmlkZXI7XG4iLCAiaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcblxudHlwZSBNdXRhdGlvblNldHRlcnMgPSB7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG59O1xuXG50eXBlIEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+ID0gTXV0YXRpb25TZXR0ZXJzICYge1xuICBzdGFydFN0YXR1czogc3RyaW5nO1xuICBmYWxsYmFja0Vycm9yTWVzc2FnZTogc3RyaW5nO1xuICBhY3Rpb246ICgpID0+IFByb21pc2U8VD47XG4gIGZsYXNoT25FcnJvcj86IGJvb2xlYW47XG59O1xuXG4vLyBQYXJzZXMgZGVjaW1hbCB0ZXh0IGlucHV0IHRoYXQgbWF5IGNvbnRhaW4gY29tbWEgb3IgZG90IHNlcGFyYXRvcnMuXG5leHBvcnQgY29uc3QgcGFyc2VEZWNpbWFsSW5wdXQgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKS5yZXBsYWNlKFwiLFwiLCBcIi5cIik7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBSdW5zIGFuIGV4cGVuc2UgbXV0YXRpb24gd2l0aCBzaGFyZWQgYnVzeS9lcnJvci9zdGF0dXMgaGFuZGxpbmcuXG5leHBvcnQgY29uc3QgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiA9IGFzeW5jIDxUPih7XG4gIHN0YXJ0U3RhdHVzLFxuICBmYWxsYmFja0Vycm9yTWVzc2FnZSxcbiAgYWN0aW9uLFxuICBmbGFzaE9uRXJyb3IgPSB0cnVlLFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG59OiBFeGVjdXRlRXhwZW5zZU11dGF0aW9uQXJnczxUPik6IFByb21pc2U8eyBvazogdHJ1ZTsgdmFsdWU6IFQgfSB8IHsgb2s6IGZhbHNlIH0+ID0+IHtcbiAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgc2V0QnVzeSh0cnVlKTtcbiAgc2V0U3RhdHVzKHN0YXJ0U3RhdHVzKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgYWN0aW9uKCk7XG4gICAgcmV0dXJuIHsgb2s6IHRydWUsIHZhbHVlIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm1lc3NhZ2VcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgIDogZmFsbGJhY2tFcnJvck1lc3NhZ2U7XG4gICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgaWYgKGZsYXNoT25FcnJvcikge1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgIH1cbiAgICByZXR1cm4geyBvazogZmFsc2UgfTtcbiAgfSBmaW5hbGx5IHtcbiAgICBzZXRCdXN5KGZhbHNlKTtcbiAgfVxufTtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvd2FpdC50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5cbnR5cGUgVG9wYmFyQ3J1ZElkcyA9IHtcbiAgZWRpdEljb25JZDogc3RyaW5nO1xuICBzYXZlSWNvbklkOiBzdHJpbmc7XG4gIGRlbGV0ZUJ0bklkOiBzdHJpbmc7XG4gIGNhbmNlbEJ0bklkOiBzdHJpbmc7XG59O1xuXG50eXBlIFRvcGJhckNydWRFdmVudHMgPSB7XG4gIGVkaXRFdmVudDogc3RyaW5nO1xuICBkZWxldGVFdmVudDogc3RyaW5nO1xuICBjYW5jZWxFdmVudDogc3RyaW5nO1xufTtcblxudHlwZSBVc2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnNBcmdzID0ge1xuICBpZHM6IFRvcGJhckNydWRJZHM7XG4gIGV2ZW50czogVG9wYmFyQ3J1ZEV2ZW50cztcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkPzogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlOiBib29sZWFuO1xuICBjYW5FZGl0OiBib29sZWFuO1xuICBjYW5EZWxldGU6IGJvb2xlYW47XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVTYXZlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIHNhdmVDb25maXJtVGl0bGU6IHN0cmluZztcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XG4gIHNhdmVDb25maXJtVGV4dDogc3RyaW5nO1xuICBkZWxldGVDb25maXJtVGl0bGU6IHN0cmluZztcbiAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IHN0cmluZztcbiAgZGVsZXRlQ29uZmlybVRleHQ6IHN0cmluZztcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB2b2lkO1xuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xuICB9KSA9PiB2b2lkO1xuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBIYW5kbGVzIHNoYXJlZCB0b3BiYXIgc2F2ZS9lZGl0L2RlbGV0ZS9jYW5jZWwgd2lyaW5nIGZvciBleHBlbnNlIGRldGFpbCBwYWdlcy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgPSAoe1xuICBpZHMsXG4gIGV2ZW50cyxcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkID0gZmFsc2UsXG4gIGNhbkNyZWF0ZSxcbiAgY2FuRWRpdCxcbiAgY2FuRGVsZXRlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVTYXZlLFxuICBoYW5kbGVEZWxldGUsXG4gIHNhdmVDb25maXJtVGl0bGUsXG4gIHNhdmVDb25maXJtTWVzc2FnZSxcbiAgc2F2ZUNvbmZpcm1UZXh0LFxuICBkZWxldGVDb25maXJtVGl0bGUsXG4gIGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxuICBkZWxldGVDb25maXJtVGV4dCxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb25EZWxldGVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zQXJncykgPT4ge1xuICBjb25zdCBsb2NrQWN0aW9ucyA9IGlzTG9ja2VkICYmICEoaXNDcmVhdGVNb2RlICYmIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmVkaXRJY29uSWQpO1xuICAgIGNvbnN0IHNhdmVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLnNhdmVJY29uSWQpO1xuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5kZWxldGVCdG5JZCk7XG4gICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRzLmNhbmNlbEJ0bklkKTtcbiAgICBpZiAoIWVkaXRJY29uIHx8ICFzYXZlSWNvbikgcmV0dXJuO1xuXG4gICAgaWYgKGxvY2tBY3Rpb25zKSB7XG4gICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgc2F2ZUljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfVxuICB9LCBbaWRzLmNhbmNlbEJ0bklkLCBpZHMuZGVsZXRlQnRuSWQsIGlkcy5lZGl0SWNvbklkLCBpZHMuc2F2ZUljb25JZCwgaXNFZGl0aW5nLCBsb2NrQWN0aW9uc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xuICAgICAgaWYgKGxvY2tBY3Rpb25zKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGUgOiBjYW5FZGl0O1xuICAgICAgaWYgKCFjYW5Qcm9jZWVkKSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgICAgICBvcGVuQ29uZmlybSh7XG4gICAgICAgICAgdGl0bGU6IHNhdmVDb25maXJtVGl0bGUsXG4gICAgICAgICAgbWVzc2FnZTogc2F2ZUNvbmZpcm1NZXNzYWdlLFxuICAgICAgICAgIGNvbmZpcm1UZXh0OiBzYXZlQ29uZmlybVRleHQsXG4gICAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVNhdmUoKTtcbiAgICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xuICAgICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICAgICAgICAgIG9uU2F2ZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25EZWxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGxvY2tBY3Rpb25zKSByZXR1cm47XG4gICAgICBpZiAoIWNhbkRlbGV0ZSkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICB0aXRsZTogZGVsZXRlQ29uZmlybVRpdGxlLFxuICAgICAgICBtZXNzYWdlOiBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgICAgICAgY29uZmlybVRleHQ6IGRlbGV0ZUNvbmZpcm1UZXh0LFxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xuICAgICAgICAgIGlmIChvaykge1xuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva0RlbFByb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xuICAgICAgICAgICAgb25EZWxldGVTdWNjZXNzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNhbmNlbCA9ICgpID0+IHtcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xuICAgICAgaGFuZGxlQ2FuY2VsRWRpdCgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudHMuZWRpdEV2ZW50LCBvbkVkaXQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHMuZGVsZXRlRXZlbnQsIG9uRGVsZXRlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xuICAgIH07XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkNyZWF0ZSxcbiAgICBjYW5EZWxldGUsXG4gICAgY2FuRWRpdCxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2UsXG4gICAgZGVsZXRlQ29uZmlybVRleHQsXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlLFxuICAgIGV2ZW50cy5jYW5jZWxFdmVudCxcbiAgICBldmVudHMuZGVsZXRlRXZlbnQsXG4gICAgZXZlbnRzLmVkaXRFdmVudCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZVNhdmUsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzRWRpdGluZyxcbiAgICBsb2NrQWN0aW9ucyxcbiAgICBtb2RhbE9wZW4sXG4gICAgb25EZWxldGVTdWNjZXNzLFxuICAgIG9uU2F2ZVN1Y2Nlc3MsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlLFxuICAgIHNhdmVDb25maXJtVGV4dCxcbiAgICBzYXZlQ29uZmlybVRpdGxlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gIF0pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXSTtBQUZKLElBQU0sdUJBQXVCLENBQUMsRUFBRSxPQUFPLE9BQU8sWUFBWSxNQUFNLE1BQWlDO0FBQy9GLFNBQ0UsNkNBQUMsU0FBSSxXQUFXLFlBQVksOEJBQThCLGVBQ3hEO0FBQUEsZ0RBQUMsV0FBTSxXQUFVLDRCQUE0QixpQkFBTTtBQUFBLElBQ25ELDRDQUFDLFdBQU0sV0FBVSxtQ0FBa0MsT0FBTyxTQUFTLEtBQUssVUFBUSxNQUFDO0FBQUEsS0FDbkY7QUFFSjtBQUVBLElBQU8sK0JBQVE7OztBQ0NULElBQUFBLHNCQUFBO0FBUk4sSUFBTSx3QkFBd0IsQ0FBQztBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGVBQWU7QUFDakIsTUFBa0M7QUFDaEMsU0FDRSw2Q0FBQyxTQUFJLFdBQVcsV0FBVyw2REFBNkQsU0FBUyxHQUFHLE1BQUssV0FBVSxjQUFZLGNBQzdILHVEQUFDLFVBQUssV0FBVyxXQUFXLGtDQUFrQyxjQUFjLEdBQUksaUJBQU0sR0FDeEY7QUFFSjtBQUVBLElBQU8sZ0NBQVE7OztBQ1BSLElBQU0sb0JBQW9C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
