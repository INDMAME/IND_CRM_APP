import {
  Spinner_default
} from "./chunk-EGSPAV7B.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-63VW7TTG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/ConfirmModal.tsx
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function ConfirmModal({
  open,
  title,
  message,
  confirmText,
  cancelText,
  loadingText,
  showCancel = true,
  showConfirm = true,
  busy = false,
  error = "",
  status = "",
  children,
  onConfirm,
  onCancel
}) {
  if (!open) return null;
  const showInfo = busy || !!error;
  const infoText = busy ? status || loadingText : error;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-black/40 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full max-w-sm rounded-[var(--radius-xl)] bg-white shadow-xl border border-slate-200 p-5 space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-lg font-semibold text-slate-900", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm text-slate-700 whitespace-pre-line", children: message }),
      children,
      showInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-600", children: [
        busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: error && !busy ? "text-rose-700" : "", children: infoText })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-end gap-2 pt-2", children: [
        showCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-[var(--radius-xl)] border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition",
            onClick: onCancel,
            disabled: busy,
            children: cancelText
          }
        ),
        showConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-[var(--radius-xl)] bg-primary text-white hover:bg-primary/90 transition",
            onClick: onConfirm,
            disabled: busy,
            children: busy ? loadingText : confirmText
          }
        )
      ] })
    ] }) }),
    document.body
  );
}

// Web/wwwroot/react/src/hooks/useConfirmDialog.ts
var import_react = __toESM(require_react());
var useConfirmDialog = ({ defaultConfirmText, defaultCancelText }) => {
  const [modal, setModal] = (0, import_react.useState)({
    open: false,
    title: "",
    message: "",
    confirmText: defaultConfirmText,
    cancelText: defaultCancelText,
    showCancel: true,
    showConfirm: true,
    onConfirm: null
  });
  const confirmInFlightRef = (0, import_react.useRef)(false);
  const openConfirm = (0, import_react.useCallback)(
    (opts) => {
      setModal({
        open: true,
        title: opts?.title || "",
        message: opts?.message || "",
        confirmText: opts?.confirmText || defaultConfirmText,
        cancelText: opts?.cancelText || defaultCancelText,
        showCancel: opts?.showCancel !== false,
        showConfirm: opts?.showConfirm !== false,
        onConfirm: opts?.onConfirm || null
      });
    },
    [defaultCancelText, defaultConfirmText]
  );
  const closeConfirm = (0, import_react.useCallback)(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);
  const handleConfirm = (0, import_react.useCallback)(
    async ({ busy, onError, defaultErrorMessage }) => {
      if (busy) return;
      const cb = modal.onConfirm;
      if (typeof cb !== "function") {
        closeConfirm();
        return;
      }
      if (confirmInFlightRef.current) return;
      confirmInFlightRef.current = true;
      try {
        const result = await cb();
        if (result !== false) {
          closeConfirm();
        }
      } catch (err) {
        const msg = err?.message || defaultErrorMessage || indT("Api_RequestFailed", "Api_RequestFailed");
        onError(msg);
      } finally {
        confirmInFlightRef.current = false;
      }
    },
    [closeConfirm, modal.onConfirm]
  );
  return {
    modal,
    openConfirm,
    closeConfirm,
    handleConfirm
  };
};

export {
  ConfirmModal,
  useConfirmDialog
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4vU3Bpbm5lci50c3hcIjtcclxuXHJcbnR5cGUgQ29uZmlybU1vZGFsUHJvcHMgPSB7XHJcbiAgb3BlbjogYm9vbGVhbjtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBjb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIGNhbmNlbFRleHQ6IHN0cmluZztcclxuICBsb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIHNob3dDYW5jZWw/OiBib29sZWFuO1xyXG4gIHNob3dDb25maXJtPzogYm9vbGVhbjtcclxuICBidXN5PzogYm9vbGVhbjtcclxuICBlcnJvcj86IHN0cmluZztcclxuICBzdGF0dXM/OiBzdHJpbmc7XHJcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gRHVtYiBjb25maXJtIG1vZGFsIHdpdGggb3B0aW9uYWwgc3Bpbm5lciBhbmQgc3RhdHVzIHRleHQuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbmZpcm1Nb2RhbCh7XHJcbiAgb3BlbixcclxuICB0aXRsZSxcclxuICBtZXNzYWdlLFxyXG4gIGNvbmZpcm1UZXh0LFxyXG4gIGNhbmNlbFRleHQsXHJcbiAgbG9hZGluZ1RleHQsXHJcbiAgc2hvd0NhbmNlbCA9IHRydWUsXHJcbiAgc2hvd0NvbmZpcm0gPSB0cnVlLFxyXG4gIGJ1c3kgPSBmYWxzZSxcclxuICBlcnJvciA9IFwiXCIsXHJcbiAgc3RhdHVzID0gXCJcIixcclxuICBjaGlsZHJlbixcclxuICBvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWwsXHJcbn06IENvbmZpcm1Nb2RhbFByb3BzKSB7XHJcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc2hvd0luZm8gPSBidXN5IHx8ICEhZXJyb3I7XHJcbiAgY29uc3QgaW5mb1RleHQgPSBidXN5ID8gKHN0YXR1cyB8fCBsb2FkaW5nVGV4dCkgOiBlcnJvcjtcclxuXHJcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay80MCBweC00XCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXdoaXRlIHNoYWRvdy14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBwLTUgc3BhY2UteS00XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj57dGl0bGV9PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNzAwIHdoaXRlc3BhY2UtcHJlLWxpbmVcIj57bWVzc2FnZX08L2Rpdj5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAge3Nob3dJbmZvICYmIChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICB7YnVzeSAmJiA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+fVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Vycm9yICYmICFidXN5ID8gXCJ0ZXh0LXJvc2UtNzAwXCIgOiBcIlwifT57aW5mb1RleHR9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgZ2FwLTIgcHQtMlwiPlxyXG4gICAgICAgICAge3Nob3dDYW5jZWwgJiYgKFxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNhbmNlbH1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17YnVzeX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtjYW5jZWxUZXh0fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICB7c2hvd0NvbmZpcm0gJiYgKFxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBob3ZlcjpiZy1wcmltYXJ5LzkwIHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17YnVzeX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtidXN5ID8gbG9hZGluZ1RleHQgOiBjb25maXJtVGV4dH1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PixcclxuICAgIGRvY3VtZW50LmJvZHlcclxuICApO1xyXG59XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgQ29uZmlybU1vZGFsU3RhdGUgPSB7XHJcbiAgb3BlbjogYm9vbGVhbjtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBjb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIGNhbmNlbFRleHQ6IHN0cmluZztcclxuICBzaG93Q2FuY2VsOiBib29sZWFuO1xyXG4gIHNob3dDb25maXJtOiBib29sZWFuO1xyXG4gIG9uQ29uZmlybTogKCgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQpIHwgbnVsbDtcclxufTtcclxuXHJcbnR5cGUgQ29uZmlybU9wZW5PcHRpb25zID0gUGFydGlhbDxPbWl0PENvbmZpcm1Nb2RhbFN0YXRlLCBcIm9wZW5cIiB8IFwib25Db25maXJtXCI+PiAmIHtcclxuICBvbkNvbmZpcm0/OiAoKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZCkgfCBudWxsO1xyXG59O1xyXG5cclxudHlwZSBVc2VDb25maXJtRGlhbG9nQXJncyA9IHtcclxuICBkZWZhdWx0Q29uZmlybVRleHQ6IHN0cmluZztcclxuICBkZWZhdWx0Q2FuY2VsVGV4dDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBIYW5kbGVDb25maXJtQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG9uRXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgZGVmYXVsdEVycm9yTWVzc2FnZT86IHN0cmluZztcclxufTtcclxuXHJcbi8vIFNoYXJlZCBjb25maXJtIGRpYWxvZyBzdGF0ZSBhbmQgY29uZmlybSBoYW5kbGVyLlxyXG5leHBvcnQgY29uc3QgdXNlQ29uZmlybURpYWxvZyA9ICh7IGRlZmF1bHRDb25maXJtVGV4dCwgZGVmYXVsdENhbmNlbFRleHQgfTogVXNlQ29uZmlybURpYWxvZ0FyZ3MpID0+IHtcclxuICBjb25zdCBbbW9kYWwsIHNldE1vZGFsXSA9IHVzZVN0YXRlPENvbmZpcm1Nb2RhbFN0YXRlPih7XHJcbiAgICBvcGVuOiBmYWxzZSxcclxuICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgbWVzc2FnZTogXCJcIixcclxuICAgIGNvbmZpcm1UZXh0OiBkZWZhdWx0Q29uZmlybVRleHQsXHJcbiAgICBjYW5jZWxUZXh0OiBkZWZhdWx0Q2FuY2VsVGV4dCxcclxuICAgIHNob3dDYW5jZWw6IHRydWUsXHJcbiAgICBzaG93Q29uZmlybTogdHJ1ZSxcclxuICAgIG9uQ29uZmlybTogbnVsbCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgY29uZmlybUluRmxpZ2h0UmVmID0gdXNlUmVmKGZhbHNlKTtcclxuXHJcbiAgY29uc3Qgb3BlbkNvbmZpcm0gPSB1c2VDYWxsYmFjayhcclxuICAgIChvcHRzOiBDb25maXJtT3Blbk9wdGlvbnMpID0+IHtcclxuICAgICAgc2V0TW9kYWwoe1xyXG4gICAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgICAgdGl0bGU6IG9wdHM/LnRpdGxlIHx8IFwiXCIsXHJcbiAgICAgICAgbWVzc2FnZTogb3B0cz8ubWVzc2FnZSB8fCBcIlwiLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBvcHRzPy5jb25maXJtVGV4dCB8fCBkZWZhdWx0Q29uZmlybVRleHQsXHJcbiAgICAgICAgY2FuY2VsVGV4dDogb3B0cz8uY2FuY2VsVGV4dCB8fCBkZWZhdWx0Q2FuY2VsVGV4dCxcclxuICAgICAgICBzaG93Q2FuY2VsOiBvcHRzPy5zaG93Q2FuY2VsICE9PSBmYWxzZSxcclxuICAgICAgICBzaG93Q29uZmlybTogb3B0cz8uc2hvd0NvbmZpcm0gIT09IGZhbHNlLFxyXG4gICAgICAgIG9uQ29uZmlybTogb3B0cz8ub25Db25maXJtIHx8IG51bGwsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtkZWZhdWx0Q2FuY2VsVGV4dCwgZGVmYXVsdENvbmZpcm1UZXh0XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGNsb3NlQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldE1vZGFsKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBvcGVuOiBmYWxzZSB9KSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25maXJtID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAoeyBidXN5LCBvbkVycm9yLCBkZWZhdWx0RXJyb3JNZXNzYWdlIH06IEhhbmRsZUNvbmZpcm1BcmdzKSA9PiB7XHJcbiAgICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IGNiID0gbW9kYWwub25Db25maXJtO1xyXG4gICAgICBpZiAodHlwZW9mIGNiICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpcm1JbkZsaWdodFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgIGNvbmZpcm1JbkZsaWdodFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjYigpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgICAgY29uc3QgbXNnID1cclxuICAgICAgICAgIGVycj8ubWVzc2FnZSB8fFxyXG4gICAgICAgICAgZGVmYXVsdEVycm9yTWVzc2FnZSB8fFxyXG4gICAgICAgICAgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiQXBpX1JlcXVlc3RGYWlsZWRcIik7XHJcbiAgICAgICAgb25FcnJvcihtc2cpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGNvbmZpcm1JbkZsaWdodFJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbY2xvc2VDb25maXJtLCBtb2RhbC5vbkNvbmZpcm1dXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1vZGFsLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVDb25maXJtLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1QkFBNkI7QUE2Q3JCO0FBeEJPLFNBQVIsYUFBOEI7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxhQUFhO0FBQUEsRUFDYixjQUFjO0FBQUEsRUFDZCxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsR0FBc0I7QUFDcEIsTUFBSSxDQUFDLEtBQU0sUUFBTztBQUVsQixRQUFNLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFDM0IsUUFBTSxXQUFXLE9BQVEsVUFBVSxjQUFlO0FBRWxELGFBQU87QUFBQSxJQUNMLDRDQUFDLFNBQUksV0FBVSw0RUFDYix1REFBQyxTQUFJLFdBQVUsdUdBQ2I7QUFBQSxrREFBQyxTQUFJLFdBQVUsd0NBQXdDLGlCQUFNO0FBQUEsTUFDN0QsNENBQUMsU0FBSSxXQUFVLDhDQUE4QyxtQkFBUTtBQUFBLE1BQ3BFO0FBQUEsTUFDQSxZQUND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
