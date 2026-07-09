import {
  wait
} from "./chunk-4BE3ZFCK.js";
import {
  flashActionMark
} from "./chunk-CBDB7NMA.js";
import {
  parseExpenseNumericInput
} from "./chunk-DDCTTA2H.js";
import {
  mapWindowEnumOptions
} from "./chunk-UYN2TXUI.js";
import {
  setTopbarActionGroupReady
} from "./chunk-ZBKHPZJX.js";
import {
  classNames,
  showPermissionModal
} from "./chunk-UNQYUM6B.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-PNIKV5DC.js";
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

// Web/wwwroot/react/src/pages/gastos/constants/expenseReimbursableExpenseCatalog.ts
var DEFAULT_REIMBURSABLE_EXPENSE = 0;
var DEFAULT_LINE_REIMBURSABLE_EXPENSE = 0;
var REIMBURSABLE_EXPENSE_BOTH_VALUE = 2;
var FALLBACK_REIMBURSABLE_OPTIONS = [
  { value: "0", text: indT("Common_Yes", "Yes") },
  { value: "1", text: indT("Common_No", "No") },
  { value: String(REIMBURSABLE_EXPENSE_BOTH_VALUE), text: indT("ExpenseSheets_Reimbursable_Both", "Both") }
];
var FALLBACK_LINE_REIMBURSABLE_OPTIONS = [
  { value: "0", text: indT("Common_Yes", "Yes") },
  { value: "1", text: indT("Common_No", "No") }
];
var getCatalogOptions = (source = []) => {
  return mapWindowEnumOptions(source).filter((option) => {
    const parsed = Number(option.value);
    return Number.isInteger(parsed) && parsed >= 0;
  });
};
var getHeaderCatalogOptions = () => {
  const source = typeof window !== "undefined" && Array.isArray(window.__EXPENSE_REIMBURSABLE_EXPENSES__) ? window.__EXPENSE_REIMBURSABLE_EXPENSES__ : [];
  return getCatalogOptions(source);
};
var getLineCatalogOptions = () => {
  const source = typeof window !== "undefined" && Array.isArray(window.__EXPENSE_REIMBURSABLE_EXPENSE_LINES__) ? window.__EXPENSE_REIMBURSABLE_EXPENSE_LINES__ : [];
  return getCatalogOptions(source);
};
var getExpenseReimbursableExpenseOptions = () => {
  const catalogOptions = getHeaderCatalogOptions();
  if (catalogOptions.length > 0) return catalogOptions;
  return FALLBACK_REIMBURSABLE_OPTIONS;
};
var getEditableExpenseReimbursableExpenseOptions = () => {
  return getExpenseReimbursableExpenseOptions().filter(
    (option) => Number(option.value) !== REIMBURSABLE_EXPENSE_BOTH_VALUE
  );
};
var getExpenseLineReimbursableExpenseOptions = () => {
  const catalogOptions = getLineCatalogOptions();
  if (catalogOptions.length > 0) return catalogOptions;
  return FALLBACK_LINE_REIMBURSABLE_OPTIONS;
};
var normalizeExpenseReimbursableExpense = (value, fallback = DEFAULT_REIMBURSABLE_EXPENSE) => {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
};
var normalizeExpenseLineReimbursableExpense = (value, fallback = DEFAULT_LINE_REIMBURSABLE_EXPENSE) => {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
};
var getExpenseReimbursableExpenseLabel = (value) => {
  const normalized = normalizeExpenseReimbursableExpense(value);
  const match = getExpenseReimbursableExpenseOptions().find((option) => Number(option.value) === normalized);
  return match?.text || String(normalized);
};
var getExpenseLineReimbursableExpenseLabel = (value) => {
  const normalized = normalizeExpenseLineReimbursableExpense(value);
  const match = getExpenseLineReimbursableExpenseOptions().find((option) => Number(option.value) === normalized);
  return match?.text || String(normalized);
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
  saveConfirmOnCancel,
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
    if (actionMode === "save_only" || actionMode === "save_delete") {
      if (editBtn) editBtn.classList.remove("topbar-hidden");
      if (editBtn instanceof HTMLButtonElement) {
        editBtn.disabled = false;
        editBtn.setAttribute("aria-disabled", "false");
      }
      if (editIcon) editIcon.classList.add("hidden");
      if (deleteBtn) {
        if (actionMode === "save_delete" && canDelete && !resolvedDeleteLock) {
          deleteBtn.classList.remove("topbar-hidden");
        } else {
          deleteBtn.classList.add("topbar-hidden");
        }
      }
      if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.disabled = false;
        deleteBtn.setAttribute("aria-disabled", "false");
      }
      if (cancelBtn) {
        if (actionMode === "save_delete") {
          cancelBtn.classList.add("topbar-hidden");
        } else {
          cancelBtn.classList.remove("topbar-hidden");
        }
      }
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
          onCancel: saveConfirmOnCancel,
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
      if (actionMode === "save_only" || actionMode === "save_delete") return;
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
    saveConfirmOnCancel,
    saveConfirmText,
    saveConfirmTitle,
    setModalError
  ]);
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseReadOnlyField.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ENABLE_READ_ONLY_FIELD_NAVIGATION = false;
var ExpenseReadOnlyField = ({
  label,
  value,
  fullWidth = false,
  containerClassName = "space-y-1.5",
  labelClassName = "form-label font-semibold",
  valueAlign = "left",
  leadingIcon,
  onClick: _onClick
}) => {
  const displayValue = value || "-";
  const isClickable = ENABLE_READ_ONLY_FIELD_NAVIGATION && typeof _onClick === "function" && displayValue !== "-";
  const valueAlignClassName = valueAlign === "right" ? "text-right tabular-nums" : "text-left";
  const valueClassName = classNames("form-control ind-readonly-field", leadingIcon ? "pl-9" : "", valueAlignClassName);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: classNames(fullWidth ? "sm:col-span-2" : "", containerClassName), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: labelClassName, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      leadingIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-4 w-4 items-center justify-center", children: leadingIcon }) }) : null,
      isClickable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          className: classNames(valueClassName, "underline decoration-slate-400 underline-offset-2"),
          onClick: _onClick,
          "aria-label": label,
          children: displayValue
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { className: valueClassName, value: displayValue, readOnly: true, "aria-label": label })
    ] })
  ] });
};
var ExpenseReadOnlyField_default = ExpenseReadOnlyField;

export {
  parseDecimalInput,
  executeExpenseMutation,
  DEFAULT_REIMBURSABLE_EXPENSE,
  DEFAULT_LINE_REIMBURSABLE_EXPENSE,
  getEditableExpenseReimbursableExpenseOptions,
  getExpenseLineReimbursableExpenseOptions,
  normalizeExpenseReimbursableExpense,
  normalizeExpenseLineReimbursableExpense,
  getExpenseReimbursableExpenseLabel,
  getExpenseLineReimbursableExpenseLabel,
  useExpenseTopbarCrudActions,
  ExpenseReadOnlyField_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9leHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZUNhdGFsb2cudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5cclxudHlwZSBNdXRhdGlvblNldHRlcnMgPSB7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbn07XHJcblxyXG50eXBlIEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+ID0gTXV0YXRpb25TZXR0ZXJzICYge1xyXG4gIHN0YXJ0U3RhdHVzOiBzdHJpbmc7XHJcbiAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBhY3Rpb246ICgpID0+IFByb21pc2U8VD47XHJcbiAgZmxhc2hPbkVycm9yPzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBkZWNpbWFsIHRleHQgaW5wdXQgc3VwcG9ydGluZyBncm91cGVkIGFuZCBkZWNpbWFsIHNlcGFyYXRvcnMuXHJcbmV4cG9ydCBjb25zdCBwYXJzZURlY2ltYWxJbnB1dCA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIHJldHVybiBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQocmF3KTtcclxufTtcclxuXHJcbi8vIFJ1bnMgYW4gZXhwZW5zZSBtdXRhdGlvbiB3aXRoIHNoYXJlZCBidXN5L2Vycm9yL3N0YXR1cyBoYW5kbGluZy5cclxuZXhwb3J0IGNvbnN0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24gPSBhc3luYyA8VD4oe1xyXG4gIHN0YXJ0U3RhdHVzLFxyXG4gIGZhbGxiYWNrRXJyb3JNZXNzYWdlLFxyXG4gIGFjdGlvbixcclxuICBmbGFzaE9uRXJyb3IgPSB0cnVlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbn06IEV4ZWN1dGVFeHBlbnNlTXV0YXRpb25BcmdzPFQ+KTogUHJvbWlzZTx7IG9rOiB0cnVlOyB2YWx1ZTogVCB9IHwgeyBvazogZmFsc2UgfT4gPT4ge1xyXG4gIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgc2V0QnVzeSh0cnVlKTtcclxuICBzZXRTdGF0dXMoc3RhcnRTdGF0dXMpO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBhY3Rpb24oKTtcclxuICAgIHJldHVybiB7IG9rOiB0cnVlLCB2YWx1ZSB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlID1cclxuICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgOiBmYWxsYmFja0Vycm9yTWVzc2FnZTtcclxuICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICBpZiAoZmxhc2hPbkVycm9yKSB7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IG9rOiBmYWxzZSB9O1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBzZXRCdXN5KGZhbHNlKTtcclxuICB9XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVJTUJVUlNBQkxFX0VYUEVOU0UgPSAwO1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFID0gMDtcclxuZXhwb3J0IGNvbnN0IFJFSU1CVVJTQUJMRV9FWFBFTlNFX0JPVEhfVkFMVUUgPSAyO1xyXG5cclxuY29uc3QgRkFMTEJBQ0tfUkVJTUJVUlNBQkxFX09QVElPTlM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9IFtcclxuICB7IHZhbHVlOiBcIjBcIiwgdGV4dDogaW5kVChcIkNvbW1vbl9ZZXNcIiwgXCJZZXNcIikgfSxcclxuICB7IHZhbHVlOiBcIjFcIiwgdGV4dDogaW5kVChcIkNvbW1vbl9Ob1wiLCBcIk5vXCIpIH0sXHJcbiAgeyB2YWx1ZTogU3RyaW5nKFJFSU1CVVJTQUJMRV9FWFBFTlNFX0JPVEhfVkFMVUUpLCB0ZXh0OiBpbmRUKFwiRXhwZW5zZVNoZWV0c19SZWltYnVyc2FibGVfQm90aFwiLCBcIkJvdGhcIikgfSxcclxuXTtcclxuXHJcbmNvbnN0IEZBTExCQUNLX0xJTkVfUkVJTUJVUlNBQkxFX09QVElPTlM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9IFtcclxuICB7IHZhbHVlOiBcIjBcIiwgdGV4dDogaW5kVChcIkNvbW1vbl9ZZXNcIiwgXCJZZXNcIikgfSxcclxuICB7IHZhbHVlOiBcIjFcIiwgdGV4dDogaW5kVChcIkNvbW1vbl9Ob1wiLCBcIk5vXCIpIH0sXHJcbl07XHJcblxyXG5jb25zdCBnZXRDYXRhbG9nT3B0aW9ucyA9IChzb3VyY2U6IEFycmF5PHsgdmFsdWU/OiBzdHJpbmc7IFZhbHVlPzogc3RyaW5nOyB0ZXh0Pzogc3RyaW5nOyBUZXh0Pzogc3RyaW5nIH0+ID0gW10pOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xyXG4gIHJldHVybiBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIob3B0aW9uLnZhbHVlKTtcclxuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDA7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRIZWFkZXJDYXRhbG9nT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9XHJcbiAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9SRUlNQlVSU0FCTEVfRVhQRU5TRVNfXylcclxuICAgICAgPyB3aW5kb3cuX19FWFBFTlNFX1JFSU1CVVJTQUJMRV9FWFBFTlNFU19fXHJcbiAgICAgIDogW107XHJcblxyXG4gIHJldHVybiBnZXRDYXRhbG9nT3B0aW9ucyhzb3VyY2UpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0TGluZUNhdGFsb2dPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgY29uc3Qgc291cmNlID1cclxuICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX1JFSU1CVVJTQUJMRV9FWFBFTlNFX0xJTkVTX18pXHJcbiAgICAgID8gd2luZG93Ll9fRVhQRU5TRV9SRUlNQlVSU0FCTEVfRVhQRU5TRV9MSU5FU19fXHJcbiAgICAgIDogW107XHJcblxyXG4gIHJldHVybiBnZXRDYXRhbG9nT3B0aW9ucyhzb3VyY2UpO1xyXG59O1xyXG5cclxuLy8gQnVpbGRzIHRoZSBoZWFkZXIgcmVpbWJ1cnNhYmxlIG9wdGlvbnMsIHByZWZlcnJpbmcgYWN0aXZlIEFYIGNvbmZpZ3VyYXRpb24uXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICBjb25zdCBjYXRhbG9nT3B0aW9ucyA9IGdldEhlYWRlckNhdGFsb2dPcHRpb25zKCk7XHJcbiAgaWYgKGNhdGFsb2dPcHRpb25zLmxlbmd0aCA+IDApIHJldHVybiBjYXRhbG9nT3B0aW9ucztcclxuICByZXR1cm4gRkFMTEJBQ0tfUkVJTUJVUlNBQkxFX09QVElPTlM7XHJcbn07XHJcblxyXG4vLyBIZWFkZXIgZWRpdCBrZWVwcyB0aGUgYXV0b21hdGljIG1peGVkIHZhbHVlIHZpc2libGUsIGJ1dCBub3Qgc2VsZWN0YWJsZS5cclxuZXhwb3J0IGNvbnN0IGdldEVkaXRhYmxlRXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIGdldEV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucygpLmZpbHRlcihcclxuICAgIChvcHRpb24pID0+IE51bWJlcihvcHRpb24udmFsdWUpICE9PSBSRUlNQlVSU0FCTEVfRVhQRU5TRV9CT1RIX1ZBTFVFXHJcbiAgKTtcclxufTtcclxuXHJcbi8vIEJ1aWxkcyB0aGUgbGluZSByZWltYnVyc2FibGUgb3B0aW9ucyBmcm9tIHRoZSBsaW5lLXNwZWNpZmljIEFYIGVudW0gY2F0YWxvZy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICBjb25zdCBjYXRhbG9nT3B0aW9ucyA9IGdldExpbmVDYXRhbG9nT3B0aW9ucygpO1xyXG4gIGlmIChjYXRhbG9nT3B0aW9ucy5sZW5ndGggPiAwKSByZXR1cm4gY2F0YWxvZ09wdGlvbnM7XHJcbiAgcmV0dXJuIEZBTExCQUNLX0xJTkVfUkVJTUJVUlNBQkxFX09QVElPTlM7XHJcbn07XHJcblxyXG4vLyBLZWVwcyByZWltYnVyc2FibGUgaGVhZGVyIHZhbHVlcyBjb25zdHJhaW5lZCB0byBudW1lcmljIEFYIGVudW0gY29kZXMuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlUmVpbWJ1cnNhYmxlRXhwZW5zZSA9IChcclxuICB2YWx1ZTogdW5rbm93bixcclxuICBmYWxsYmFjazogbnVtYmVyID0gREVGQVVMVF9SRUlNQlVSU0FCTEVfRVhQRU5TRVxyXG4pOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCkge1xyXG4gICAgcmV0dXJuIHBhcnNlZDtcclxuICB9XHJcbiAgcmV0dXJuIGZhbGxiYWNrO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgcmVpbWJ1cnNhYmxlIGxpbmUgdmFsdWVzIGNvbnN0cmFpbmVkIHRvIG51bWVyaWMgQVggZW51bSBjb2Rlcy5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZSA9IChcclxuICB2YWx1ZTogdW5rbm93bixcclxuICBmYWxsYmFjazogbnVtYmVyID0gREVGQVVMVF9MSU5FX1JFSU1CVVJTQUJMRV9FWFBFTlNFXHJcbik6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwKSB7XHJcbiAgICByZXR1cm4gcGFyc2VkO1xyXG4gIH1cclxuICByZXR1cm4gZmFsbGJhY2s7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBhIGRpc3BsYXkgbGFiZWwgZm9yIHJlYWQtb25seSBoZWFkZXIgcmVuZGVyaW5nLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVJlaW1idXJzYWJsZUV4cGVuc2VMYWJlbCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlKHZhbHVlKTtcclxuICBjb25zdCBtYXRjaCA9IGdldEV4cGVuc2VSZWltYnVyc2FibGVFeHBlbnNlT3B0aW9ucygpLmZpbmQoKG9wdGlvbikgPT4gTnVtYmVyKG9wdGlvbi52YWx1ZSkgPT09IG5vcm1hbGl6ZWQpO1xyXG4gIHJldHVybiBtYXRjaD8udGV4dCB8fCBTdHJpbmcobm9ybWFsaXplZCk7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBhIGRpc3BsYXkgbGFiZWwgZm9yIHJlYWQtb25seSBsaW5lIHJlbmRlcmluZy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZUxpbmVSZWltYnVyc2FibGVFeHBlbnNlKHZhbHVlKTtcclxuICBjb25zdCBtYXRjaCA9IGdldEV4cGVuc2VMaW5lUmVpbWJ1cnNhYmxlRXhwZW5zZU9wdGlvbnMoKS5maW5kKChvcHRpb24pID0+IE51bWJlcihvcHRpb24udmFsdWUpID09PSBub3JtYWxpemVkKTtcclxuICByZXR1cm4gbWF0Y2g/LnRleHQgfHwgU3RyaW5nKG5vcm1hbGl6ZWQpO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvd2FpdC50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcclxuXHJcbnR5cGUgVG9wYmFyQ3J1ZElkcyA9IHtcclxuICBlZGl0SWNvbklkOiBzdHJpbmc7XHJcbiAgc2F2ZUljb25JZDogc3RyaW5nO1xyXG4gIGRlbGV0ZUJ0bklkOiBzdHJpbmc7XHJcbiAgY2FuY2VsQnRuSWQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVG9wYmFyQ3J1ZEV2ZW50cyA9IHtcclxuICBlZGl0RXZlbnQ6IHN0cmluZztcclxuICBkZWxldGVFdmVudDogc3RyaW5nO1xyXG4gIGNhbmNlbEV2ZW50OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9uc0FyZ3MgPSB7XHJcbiAgaWRzOiBUb3BiYXJDcnVkSWRzO1xyXG4gIGV2ZW50czogVG9wYmFyQ3J1ZEV2ZW50cztcclxuICBhY3Rpb25Hcm91cElkOiBzdHJpbmc7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBpc0xvY2tlZDogYm9vbGVhbjtcclxuICBpc0VkaXRMb2NrZWQ/OiBib29sZWFuO1xyXG4gIGlzRGVsZXRlTG9ja2VkPzogYm9vbGVhbjtcclxuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInNhdmVfb25seVwiIHwgXCJzYXZlX2RlbGV0ZVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZD86IGJvb2xlYW47XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlOiBib29sZWFuO1xyXG4gIGNhbkVkaXQ6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlOiBib29sZWFuO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBjYW5PcGVuU2F2ZUNvbmZpcm0/OiAoKSA9PiBib29sZWFuO1xyXG4gIGhhbmRsZVNhdmU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIHNhdmVDb25maXJtVGl0bGU6IHN0cmluZztcclxuICBzYXZlQ29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBzYXZlQ29uZmlybVRleHQ6IHN0cmluZztcclxuICBzYXZlQ29uZmlybU9uQ2FuY2VsPzogKCkgPT4gdm9pZDtcclxuICBkZWxldGVDb25maXJtVGl0bGU6IHN0cmluZztcclxuICBkZWxldGVDb25maXJtTWVzc2FnZTogc3RyaW5nO1xyXG4gIGRlbGV0ZUNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcclxuICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gICAgb25DYW5jZWw/OiAoKSA9PiB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gSGFuZGxlcyBzaGFyZWQgdG9wYmFyIHNhdmUvZWRpdC9kZWxldGUvY2FuY2VsIHdpcmluZyBmb3IgZXhwZW5zZSBkZXRhaWwgcGFnZXMuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgPSAoe1xyXG4gIGlkcyxcclxuICBldmVudHMsXHJcbiAgYWN0aW9uR3JvdXBJZCxcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGlzRWRpdExvY2tlZCxcclxuICBpc0RlbGV0ZUxvY2tlZCxcclxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXHJcbiAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQgPSBmYWxzZSxcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5DcmVhdGUsXHJcbiAgY2FuRWRpdCxcclxuICBjYW5EZWxldGUsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgY2FuT3BlblNhdmVDb25maXJtLFxyXG4gIGhhbmRsZVNhdmUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIHNhdmVDb25maXJtVGl0bGUsXHJcbiAgc2F2ZUNvbmZpcm1NZXNzYWdlLFxyXG4gIHNhdmVDb25maXJtVGV4dCxcclxuICBzYXZlQ29uZmlybU9uQ2FuY2VsLFxyXG4gIGRlbGV0ZUNvbmZpcm1UaXRsZSxcclxuICBkZWxldGVDb25maXJtTWVzc2FnZSxcclxuICBkZWxldGVDb25maXJtVGV4dCxcclxuICBvblNhdmVTdWNjZXNzLFxyXG4gIG9uRGVsZXRlU3VjY2VzcyxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCByZXNvbHZlZEVkaXRMb2NrID0gKGlzRWRpdExvY2tlZCA/PyBpc0xvY2tlZCkgJiYgIShpc0NyZWF0ZU1vZGUgJiYgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQpO1xyXG4gIGNvbnN0IHJlc29sdmVkRGVsZXRlTG9jayA9IGlzRGVsZXRlTG9ja2VkID8/IGlzTG9ja2VkO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuZWRpdEljb25JZCk7XHJcbiAgICBjb25zdCBzYXZlSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5zYXZlSWNvbklkKTtcclxuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5kZWxldGVCdG5JZCk7XHJcbiAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuY2FuY2VsQnRuSWQpO1xyXG4gICAgY29uc3QgZWRpdEJ0biA9IGVkaXRJY29uPy5jbG9zZXN0KFwiYnV0dG9uXCIpID8/IG51bGw7XHJcblxyXG4gICAgaWYgKGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHtcclxuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChlZGl0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBlZGl0QnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgZGVsZXRlQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZGVsZXRlQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChjYW5jZWxCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGNhbmNlbEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIH1cclxuICAgICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhY3Rpb25Nb2RlID09PSBcImRlbGV0ZV9vbmx5XCIpIHtcclxuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChlZGl0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBlZGl0QnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIHtcclxuICAgICAgICBpZiAoY2FuRGVsZXRlKSB7XHJcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlbGV0ZUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgZGVsZXRlQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZGVsZXRlQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChjYW5jZWxCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGNhbmNlbEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIH1cclxuICAgICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhY3Rpb25Nb2RlID09PSBcInNhdmVfb25seVwiIHx8IGFjdGlvbk1vZGUgPT09IFwic2F2ZV9kZWxldGVcIikge1xyXG4gICAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgaWYgKGVkaXRCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGVkaXRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBlZGl0QnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChkZWxldGVCdG4pIHtcclxuICAgICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJzYXZlX2RlbGV0ZVwiICYmIGNhbkRlbGV0ZSAmJiAhcmVzb2x2ZWREZWxldGVMb2NrKSB7XHJcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlbGV0ZUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgZGVsZXRlQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZGVsZXRlQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FuY2VsQnRuKSB7XHJcbiAgICAgICAgaWYgKGFjdGlvbk1vZGUgPT09IFwic2F2ZV9kZWxldGVcIikge1xyXG4gICAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYW5jZWxCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGNhbmNlbEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzYXZlSWNvbikge1xyXG4gICAgICAgIGlmIChpc0VkaXRpbmcgJiYgIXJlc29sdmVkRWRpdExvY2spIHtcclxuICAgICAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNhdmVJY29uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHNldFRvcGJhckFjdGlvbkdyb3VwUmVhZHkoYWN0aW9uR3JvdXBJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZWRpdEJ0bikgZWRpdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIGlmIChlZGl0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgZWRpdEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICBlZGl0QnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgIH1cclxuICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGVkaXRJY29uKSBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAocmVzb2x2ZWRFZGl0TG9jaykge1xyXG4gICAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc2F2ZUljb24pIHNhdmVJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuKSB7XHJcbiAgICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHtcclxuICAgICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FuY2VsQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBjYW5jZWxCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAocmVzb2x2ZWRFZGl0TG9jaykge1xyXG4gICAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZGVsZXRlQnRuKSB7XHJcbiAgICAgICAgaWYgKHJlc29sdmVkRGVsZXRlTG9jayB8fCAhY2FuRGVsZXRlKSB7XHJcbiAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlbGV0ZUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgZGVsZXRlQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZGVsZXRlQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChjYW5jZWxCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGNhbmNlbEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5KGFjdGlvbkdyb3VwSWQpO1xyXG4gIH0sIFtcclxuICAgIGFjdGlvbkdyb3VwSWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgY2FuRGVsZXRlLFxyXG4gICAgaWRzLmNhbmNlbEJ0bklkLFxyXG4gICAgaWRzLmRlbGV0ZUJ0bklkLFxyXG4gICAgaWRzLmVkaXRJY29uSWQsXHJcbiAgICBpZHMuc2F2ZUljb25JZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICByZXNvbHZlZERlbGV0ZUxvY2ssXHJcbiAgICByZXNvbHZlZEVkaXRMb2NrLFxyXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwZXJtaXNzaW9uc1JlYWR5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb25FZGl0ID0gKCkgPT4ge1xyXG4gICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJkZWxldGVfb25seVwiIHx8IGFjdGlvbk1vZGUgPT09IFwidmlld19vbmx5XCIpIHJldHVybjtcclxuICAgICAgaWYgKHJlc29sdmVkRWRpdExvY2spIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGUgOiBjYW5FZGl0O1xyXG4gICAgICBpZiAoIWNhblByb2NlZWQpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYW5PcGVuU2F2ZUNvbmZpcm0gPT09IFwiZnVuY3Rpb25cIiAmJiAhY2FuT3BlblNhdmVDb25maXJtKCkpIHJldHVybjtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICAgIHRpdGxlOiBzYXZlQ29uZmlybVRpdGxlLFxyXG4gICAgICAgICAgbWVzc2FnZTogc2F2ZUNvbmZpcm1NZXNzYWdlLFxyXG4gICAgICAgICAgY29uZmlybVRleHQ6IHNhdmVDb25maXJtVGV4dCxcclxuICAgICAgICAgIG9uQ2FuY2VsOiBzYXZlQ29uZmlybU9uQ2FuY2VsLFxyXG4gICAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlU2F2ZSgpO1xyXG4gICAgICAgICAgICBpZiAob2spIHtcclxuICAgICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc0R1cmF0aW9uTXMgPSBpc0NyZWF0ZU1vZGUgPyA5MDAgOiAxMjAwO1xyXG4gICAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCBzdWNjZXNzRHVyYXRpb25Ncyk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdChzdWNjZXNzRHVyYXRpb25Ncyk7XHJcbiAgICAgICAgICAgICAgb25TYXZlU3VjY2VzcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvaztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGFuZGxlRW5hYmxlRWRpdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uRGVsZXRlID0gKCkgPT4ge1xyXG4gICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJ2aWV3X29ubHlcIikgcmV0dXJuO1xyXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IHJlc29sdmVkRGVsZXRlTG9jaykgcmV0dXJuO1xyXG4gICAgICBpZiAoIWNhbkRlbGV0ZSkge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChidXN5IHx8IG1vZGFsT3BlbikgcmV0dXJuO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IGRlbGV0ZUNvbmZpcm1UaXRsZSxcclxuICAgICAgICBtZXNzYWdlOiBkZWxldGVDb25maXJtTWVzc2FnZSxcclxuICAgICAgICBjb25maXJtVGV4dDogZGVsZXRlQ29uZmlybVRleHQsXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZURlbGV0ZSgpO1xyXG4gICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICBhd2FpdCB3YWl0KDIwMCk7XHJcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rRGVsUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgICAgICAgYXdhaXQgd2FpdCgxMjAwKTtcclxuICAgICAgICAgICAgb25EZWxldGVTdWNjZXNzKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uQ2FuY2VsID0gKCkgPT4ge1xyXG4gICAgICBpZiAoYWN0aW9uTW9kZSA9PT0gXCJzYXZlX29ubHlcIiB8fCBhY3Rpb25Nb2RlID09PSBcInNhdmVfZGVsZXRlXCIpIHJldHVybjtcclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIGhhbmRsZUNhbmNlbEVkaXQoKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmVkaXRFdmVudCwgb25FZGl0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50cy5kZWxldGVFdmVudCwgb25EZWxldGUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzLmNhbmNlbEV2ZW50LCBvbkNhbmNlbCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmVkaXRFdmVudCwgb25FZGl0KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzLmRlbGV0ZUV2ZW50LCBvbkRlbGV0ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50cy5jYW5jZWxFdmVudCwgb25DYW5jZWwpO1xyXG4gICAgfTtcclxuICB9LCBbXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgYnVzeSxcclxuICAgIGNhbkNyZWF0ZSxcclxuICAgIGNhbkRlbGV0ZSxcclxuICAgIGNhbkVkaXQsXHJcbiAgICBjYW5PcGVuU2F2ZUNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0LFxyXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlLFxyXG4gICAgZXZlbnRzLmNhbmNlbEV2ZW50LFxyXG4gICAgZXZlbnRzLmRlbGV0ZUV2ZW50LFxyXG4gICAgZXZlbnRzLmVkaXRFdmVudCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlU2F2ZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIG9uRGVsZXRlU3VjY2VzcyxcclxuICAgIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICByZXNvbHZlZERlbGV0ZUxvY2ssXHJcbiAgICByZXNvbHZlZEVkaXRMb2NrLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlLFxyXG4gICAgc2F2ZUNvbmZpcm1PbkNhbmNlbCxcclxuICAgIHNhdmVDb25maXJtVGV4dCxcclxuICAgIHNhdmVDb25maXJtVGl0bGUsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gIF0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVJlYWRPbmx5RmllbGRQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgZnVsbFdpZHRoPzogYm9vbGVhbjtcclxuICBjb250YWluZXJDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgbGFiZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgdmFsdWVBbGlnbj86IFwibGVmdFwiIHwgXCJyaWdodFwiO1xyXG4gIGxlYWRpbmdJY29uPzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIC8vIFJlc2VydmVkIGZvciBmdXR1cmUgZmllbGQtdG8tcGFnZSBuYXZpZ2F0aW9uLiBLZXB0IGRpc2FibGVkIGludGVudGlvbmFsbHkgZm9yIG5vdy5cclxuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEVOQUJMRV9SRUFEX09OTFlfRklFTERfTkFWSUdBVElPTiA9IGZhbHNlO1xyXG5cclxuLy8gUmV1c2FibGUgcmVhZC1vbmx5IGZpZWxkIGZvciBleHBlbnNlIGRldGFpbCBwYWdlcy5cclxuY29uc3QgRXhwZW5zZVJlYWRPbmx5RmllbGQgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHZhbHVlLFxyXG4gIGZ1bGxXaWR0aCA9IGZhbHNlLFxyXG4gIGNvbnRhaW5lckNsYXNzTmFtZSA9IFwic3BhY2UteS0xLjVcIixcclxuICBsYWJlbENsYXNzTmFtZSA9IFwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIsXHJcbiAgdmFsdWVBbGlnbiA9IFwibGVmdFwiLFxyXG4gIGxlYWRpbmdJY29uLFxyXG4gIG9uQ2xpY2s6IF9vbkNsaWNrLFxyXG59OiBFeHBlbnNlUmVhZE9ubHlGaWVsZFByb3BzKSA9PiB7XHJcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gdmFsdWUgfHwgXCItXCI7XHJcbiAgY29uc3QgaXNDbGlja2FibGUgPSBFTkFCTEVfUkVBRF9PTkxZX0ZJRUxEX05BVklHQVRJT04gJiYgdHlwZW9mIF9vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIgJiYgZGlzcGxheVZhbHVlICE9PSBcIi1cIjtcclxuICBjb25zdCB2YWx1ZUFsaWduQ2xhc3NOYW1lID0gdmFsdWVBbGlnbiA9PT0gXCJyaWdodFwiID8gXCJ0ZXh0LXJpZ2h0IHRhYnVsYXItbnVtc1wiIDogXCJ0ZXh0LWxlZnRcIjtcclxuICBjb25zdCB2YWx1ZUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCIsIGxlYWRpbmdJY29uID8gXCJwbC05XCIgOiBcIlwiLCB2YWx1ZUFsaWduQ2xhc3NOYW1lKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKGZ1bGxXaWR0aCA/IFwic206Y29sLXNwYW4tMlwiIDogXCJcIiwgY29udGFpbmVyQ2xhc3NOYW1lKX0+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9e2xhYmVsQ2xhc3NOYW1lfT57bGFiZWx9PC9sYWJlbD5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIHtsZWFkaW5nSWNvbiA/IChcclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0zIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNCB3LTQgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+e2xlYWRpbmdJY29ufTwvc3Bhbj5cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7aXNDbGlja2FibGUgPyAoXHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXModmFsdWVDbGFzc05hbWUsIFwidW5kZXJsaW5lIGRlY29yYXRpb24tc2xhdGUtNDAwIHVuZGVybGluZS1vZmZzZXQtMlwiKX1cclxuICAgICAgICAgICAgb25DbGljaz17X29uQ2xpY2t9XHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7ZGlzcGxheVZhbHVlfVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e3ZhbHVlQ2xhc3NOYW1lfSB2YWx1ZT17ZGlzcGxheVZhbHVlfSByZWFkT25seSBhcmlhLWxhYmVsPXtsYWJlbH0gLz5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUmVhZE9ubHlGaWVsZDtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCTyxJQUFNLG9CQUFvQixDQUFDLFFBQStCO0FBQy9ELFNBQU8seUJBQXlCLEdBQUc7QUFDckM7QUFHTyxJQUFNLHlCQUF5QixPQUFVO0FBQUEsRUFDOUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXNGO0FBQ3BGLGdCQUFjLEVBQUU7QUFDaEIsVUFBUSxJQUFJO0FBQ1osWUFBVSxXQUFXO0FBRXJCLE1BQUk7QUFDRixVQUFNLFFBQVEsTUFBTSxPQUFPO0FBQzNCLFdBQU8sRUFB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
