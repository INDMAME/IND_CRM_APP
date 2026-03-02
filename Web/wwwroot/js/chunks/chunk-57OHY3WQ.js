import {
  wait
} from "./chunk-BHDPGFB4.js";
import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  parseExpenseNumericInput
} from "./chunk-HC5PWE75.js";
import {
  classNames,
  showPermissionModal
} from "./chunk-CEAHDJRV.js";
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
var ExpenseReadOnlyField = ({ label, value, fullWidth = false, leadingIcon }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: fullWidth ? "sm:col-span-2 space-y-1.5" : "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      leadingIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: leadingIcon }) }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: `form-control ind-readonly-field ${leadingIcon ? "pl-9" : ""}`.trim(), value: value || "-", readOnly: true })
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuaW1wb3J0IHsgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxudHlwZSBNdXRhdGlvblNldHRlcnMgPSB7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG59O1xuXG50eXBlIEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+ID0gTXV0YXRpb25TZXR0ZXJzICYge1xuICBzdGFydFN0YXR1czogc3RyaW5nO1xuICBmYWxsYmFja0Vycm9yTWVzc2FnZTogc3RyaW5nO1xuICBhY3Rpb246ICgpID0+IFByb21pc2U8VD47XG4gIGZsYXNoT25FcnJvcj86IGJvb2xlYW47XG59O1xuXG4vLyBQYXJzZXMgZGVjaW1hbCB0ZXh0IGlucHV0IHN1cHBvcnRpbmcgZ3JvdXBlZCBhbmQgZGVjaW1hbCBzZXBhcmF0b3JzLlxuZXhwb3J0IGNvbnN0IHBhcnNlRGVjaW1hbElucHV0ID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIHJldHVybiBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQocmF3KTtcbn07XG5cbi8vIFJ1bnMgYW4gZXhwZW5zZSBtdXRhdGlvbiB3aXRoIHNoYXJlZCBidXN5L2Vycm9yL3N0YXR1cyBoYW5kbGluZy5cbmV4cG9ydCBjb25zdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uID0gYXN5bmMgPFQ+KHtcbiAgc3RhcnRTdGF0dXMsXG4gIGZhbGxiYWNrRXJyb3JNZXNzYWdlLFxuICBhY3Rpb24sXG4gIGZsYXNoT25FcnJvciA9IHRydWUsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbn06IEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+KTogUHJvbWlzZTx7IG9rOiB0cnVlOyB2YWx1ZTogVCB9IHwgeyBvazogZmFsc2UgfT4gPT4ge1xuICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICBzZXRCdXN5KHRydWUpO1xuICBzZXRTdGF0dXMoc3RhcnRTdGF0dXMpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBhY3Rpb24oKTtcbiAgICByZXR1cm4geyBvazogdHJ1ZSwgdmFsdWUgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxuICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgOiBmYWxsYmFja0Vycm9yTWVzc2FnZTtcbiAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICBpZiAoZmxhc2hPbkVycm9yKSB7XG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgfVxuICAgIHJldHVybiB7IG9rOiBmYWxzZSB9O1xuICB9IGZpbmFsbHkge1xuICAgIHNldEJ1c3koZmFsc2UpO1xuICB9XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBFeHBlbnNlUmVhZE9ubHlGaWVsZFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBmdWxsV2lkdGg/OiBib29sZWFuO1xuICBsZWFkaW5nSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbi8vIFJldXNhYmxlIHJlYWQtb25seSBmaWVsZCBmb3IgZXhwZW5zZSBkZXRhaWwgcGFnZXMuXG5jb25zdCBFeHBlbnNlUmVhZE9ubHlGaWVsZCA9ICh7IGxhYmVsLCB2YWx1ZSwgZnVsbFdpZHRoID0gZmFsc2UsIGxlYWRpbmdJY29uIH06IEV4cGVuc2VSZWFkT25seUZpZWxkUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17ZnVsbFdpZHRoID8gXCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCIgOiBcInNwYWNlLXktMS41XCJ9PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntsYWJlbH08L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICB7bGVhZGluZ0ljb24gPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNCB3LTQgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+e2xlYWRpbmdJY29ufTwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZCAke2xlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwifWAudHJpbSgpfSB2YWx1ZT17dmFsdWUgfHwgXCItXCJ9IHJlYWRPbmx5IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VSZWFkT25seUZpZWxkO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuXG50eXBlIEV4cGVuc2VTZWN0aW9uRGl2aWRlclByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBoZWFkaW5nTGV2ZWw/OiAxIHwgMiB8IDMgfCA0IHwgNSB8IDY7XG59O1xuXG4vLyBTaGFyZWQgY2VudGVyZWQgc2VjdGlvbiBkaXZpZGVyIHVzZWQgYWNyb3NzIGV4cGVuc2UgZGV0YWlsIHBhZ2VzLlxuY29uc3QgRXhwZW5zZVNlY3Rpb25EaXZpZGVyID0gKHtcbiAgbGFiZWwsXG4gIGNsYXNzTmFtZSxcbiAgbGFiZWxDbGFzc05hbWUsXG4gIGhlYWRpbmdMZXZlbCA9IDIsXG59OiBFeHBlbnNlU2VjdGlvbkRpdmlkZXJQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXIgZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXN0YW5kYXJkXCIsIGNsYXNzTmFtZSl9IHJvbGU9XCJoZWFkaW5nXCIgYXJpYS1sZXZlbD17aGVhZGluZ0xldmVsfT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyX19sYWJlbFwiLCBsYWJlbENsYXNzTmFtZSl9PntsYWJlbH08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2VjdGlvbkRpdmlkZXI7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3dhaXQudHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuXG50eXBlIFRvcGJhckNydWRJZHMgPSB7XG4gIGVkaXRJY29uSWQ6IHN0cmluZztcbiAgc2F2ZUljb25JZDogc3RyaW5nO1xuICBkZWxldGVCdG5JZDogc3RyaW5nO1xuICBjYW5jZWxCdG5JZDogc3RyaW5nO1xufTtcblxudHlwZSBUb3BiYXJDcnVkRXZlbnRzID0ge1xuICBlZGl0RXZlbnQ6IHN0cmluZztcbiAgZGVsZXRlRXZlbnQ6IHN0cmluZztcbiAgY2FuY2VsRXZlbnQ6IHN0cmluZztcbn07XG5cbnR5cGUgVXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zQXJncyA9IHtcbiAgaWRzOiBUb3BiYXJDcnVkSWRzO1xuICBldmVudHM6IFRvcGJhckNydWRFdmVudHM7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzTG9ja2VkOiBib29sZWFuO1xuICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZD86IGJvb2xlYW47XG4gIGNhbkNyZWF0ZTogYm9vbGVhbjtcbiAgY2FuRWRpdDogYm9vbGVhbjtcbiAgY2FuRGVsZXRlOiBib29sZWFuO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlU2F2ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBzYXZlQ29uZmlybVRpdGxlOiBzdHJpbmc7XG4gIHNhdmVDb25maXJtTWVzc2FnZTogc3RyaW5nO1xuICBzYXZlQ29uZmlybVRleHQ6IHN0cmluZztcbiAgZGVsZXRlQ29uZmlybVRpdGxlOiBzdHJpbmc7XG4gIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XG4gIGRlbGV0ZUNvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9uRGVsZXRlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gSGFuZGxlcyBzaGFyZWQgdG9wYmFyIHNhdmUvZWRpdC9kZWxldGUvY2FuY2VsIHdpcmluZyBmb3IgZXhwZW5zZSBkZXRhaWwgcGFnZXMuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zID0gKHtcbiAgaWRzLFxuICBldmVudHMsXG4gIGJ1c3ksXG4gIG1vZGFsT3BlbixcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzTG9ja2VkLFxuICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZCA9IGZhbHNlLFxuICBjYW5DcmVhdGUsXG4gIGNhbkVkaXQsXG4gIGNhbkRlbGV0ZSxcbiAgc2V0TW9kYWxFcnJvcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgaGFuZGxlU2F2ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBzYXZlQ29uZmlybVRpdGxlLFxuICBzYXZlQ29uZmlybU1lc3NhZ2UsXG4gIHNhdmVDb25maXJtVGV4dCxcbiAgZGVsZXRlQ29uZmlybVRpdGxlLFxuICBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgZGVsZXRlQ29uZmlybVRleHQsXG4gIG9uU2F2ZVN1Y2Nlc3MsXG4gIG9uRGVsZXRlU3VjY2VzcyxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9uc0FyZ3MpID0+IHtcbiAgY29uc3QgbG9ja0FjdGlvbnMgPSBpc0xvY2tlZCAmJiAhKGlzQ3JlYXRlTW9kZSAmJiBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5lZGl0SWNvbklkKTtcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5zYXZlSWNvbklkKTtcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuZGVsZXRlQnRuSWQpO1xuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5jYW5jZWxCdG5JZCk7XG4gICAgaWYgKCFlZGl0SWNvbiB8fCAhc2F2ZUljb24pIHJldHVybjtcblxuICAgIGlmIChsb2NrQWN0aW9ucykge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgICAgaWYgKGNhbmNlbEJ0bikgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xuICAgIH1cbiAgfSwgW2lkcy5jYW5jZWxCdG5JZCwgaWRzLmRlbGV0ZUJ0bklkLCBpZHMuZWRpdEljb25JZCwgaWRzLnNhdmVJY29uSWQsIGlzRWRpdGluZywgbG9ja0FjdGlvbnNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uRWRpdCA9ICgpID0+IHtcbiAgICAgIGlmIChsb2NrQWN0aW9ucykgcmV0dXJuO1xuXG4gICAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlIDogY2FuRWRpdDtcbiAgICAgIGlmICghY2FuUHJvY2VlZCkge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRWRpdGluZykge1xuICAgICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICAgICAgb3BlbkNvbmZpcm0oe1xuICAgICAgICAgIHRpdGxlOiBzYXZlQ29uZmlybVRpdGxlLFxuICAgICAgICAgIG1lc3NhZ2U6IHNhdmVDb25maXJtTWVzc2FnZSxcbiAgICAgICAgICBjb25maXJtVGV4dDogc2F2ZUNvbmZpcm1UZXh0LFxuICAgICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVTYXZlKCk7XG4gICAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICAgIC8vIENyZWF0ZSBtb2RlIHJlZGlyZWN0cyB0byBhIG5ldyBwYWdlOyBza2lwIGRlbGF5ZWQgc3VjY2VzcyBhbmltYXRpb24gdG8gYXZvaWQgaW50ZXJtZWRpYXRlIFVJIGZsYXNoLlxuICAgICAgICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgb25TYXZlU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcbiAgICAgICAgICAgICAgb25TYXZlU3VjY2VzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9rO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgbG9ja0FjdGlvbnMpIHJldHVybjtcbiAgICAgIGlmICghY2FuRGVsZXRlKSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcbiAgICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgICBvcGVuQ29uZmlybSh7XG4gICAgICAgIHRpdGxlOiBkZWxldGVDb25maXJtVGl0bGUsXG4gICAgICAgIG1lc3NhZ2U6IGRlbGV0ZUNvbmZpcm1NZXNzYWdlLFxuICAgICAgICBjb25maXJtVGV4dDogZGVsZXRlQ29uZmlybVRleHQsXG4gICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlRGVsZXRlKCk7XG4gICAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMjAwKTtcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rRGVsUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICAgICAgICBvbkRlbGV0ZVN1Y2Nlc3MoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9rO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2FuY2VsID0gKCkgPT4ge1xuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XG4gICAgICBoYW5kbGVDYW5jZWxFZGl0KCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5lZGl0RXZlbnQsIG9uRWRpdCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmRlbGV0ZUV2ZW50LCBvbkRlbGV0ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmNhbmNlbEV2ZW50LCBvbkNhbmNlbCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmVkaXRFdmVudCwgb25FZGl0KTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmNhbmNlbEV2ZW50LCBvbkNhbmNlbCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlLFxuICAgIGNhbkRlbGV0ZSxcbiAgICBjYW5FZGl0LFxuICAgIGNsb3NlQ29uZmlybSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZSxcbiAgICBkZWxldGVDb25maXJtVGV4dCxcbiAgICBkZWxldGVDb25maXJtVGl0bGUsXG4gICAgZXZlbnRzLmNhbmNlbEV2ZW50LFxuICAgIGV2ZW50cy5kZWxldGVFdmVudCxcbiAgICBldmVudHMuZWRpdEV2ZW50LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlU2F2ZSxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNFZGl0aW5nLFxuICAgIGxvY2tBY3Rpb25zLFxuICAgIG1vZGFsT3BlbixcbiAgICBvbkRlbGV0ZVN1Y2Nlc3MsXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2UsXG4gICAgc2F2ZUNvbmZpcm1UZXh0LFxuICAgIHNhdmVDb25m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LDRCQUFjO0FBQUEsWUFDaEI7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNILE9BQU87QUFDTCx5QkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFdBQVcsTUFBTTtBQUNyQixVQUFJLGdCQUFnQixZQUFhO0FBQ2pDLFVBQUksQ0FBQyxXQUFXO0FBQ2QsNEJBQW9CO0FBQ3BCO0FBQUEsTUFDRjtBQUVBLFVBQUksUUFBUSxVQUFXO0FBQ3ZCLG9CQUFjLEVBQUU7QUFDaEIsa0JBQVk7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLFdBQVcsWUFBWTtBQUNyQixnQkFBTSxLQUFLLE1BQU0sYUFBYTtBQUM5QixjQUFJLElBQUk7QUFDTix5QkFBYTtBQUNiLGtCQUFNLEtBQUssR0FBRztBQUNkLDRCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxrQkFBTSxLQUFLLElBQUk7QUFDZiw0QkFBZ0I7QUFBQSxVQUNsQjtBQUNBLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFFQSxVQUFNLFdBQVcsTUFBTTtBQUNyQixVQUFJLFFBQVEsVUFBVztBQUN2Qix1QkFBaUI7QUFBQSxJQUNuQjtBQUVBLFdBQU8saUJBQWlCLE9BQU8sV0FBVyxNQUFNO0FBQ2hELFdBQU8saUJBQWlCLE9BQU8sYUFBYSxRQUFRO0FBQ3BELFdBQU8saUJBQWlCLE9BQU8sYUFBYSxRQUFRO0FBRXBELFdBQU8sTUFBTTtBQUNYLGFBQU8sb0JBQW9CLE9BQU8sV0FBVyxNQUFNO0FBQ25ELGFBQU8sb0JBQW9CLE9BQU8sYUFBYSxRQUFRO0FBQ3ZELGFBQU8sb0JBQW9CLE9BQU8sYUFBYSxRQUFRO0FBQUEsSUFDekQ7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1A7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
