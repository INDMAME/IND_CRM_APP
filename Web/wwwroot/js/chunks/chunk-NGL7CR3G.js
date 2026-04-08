import {
  Spinner_default
} from "./chunk-ZHH4AWW7.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-5TAE4PEJ.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xuXHJcbnR5cGUgQ29uZmlybU1vZGFsUHJvcHMgPSB7XHJcbiAgb3BlbjogYm9vbGVhbjtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBjb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIGNhbmNlbFRleHQ6IHN0cmluZztcclxuICBsb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIHNob3dDYW5jZWw/OiBib29sZWFuO1xyXG4gIHNob3dDb25maXJtPzogYm9vbGVhbjtcclxuICBidXN5PzogYm9vbGVhbjtcbiAgZXJyb3I/OiBzdHJpbmc7XG4gIHN0YXR1cz86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIG9uQ29uZmlybTogKCkgPT4gdm9pZDtcbiAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XG59O1xuXHJcbi8vIER1bWIgY29uZmlybSBtb2RhbCB3aXRoIG9wdGlvbmFsIHNwaW5uZXIgYW5kIHN0YXR1cyB0ZXh0LlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb25maXJtTW9kYWwoe1xyXG4gIG9wZW4sXHJcbiAgdGl0bGUsXHJcbiAgbWVzc2FnZSxcclxuICBjb25maXJtVGV4dCxcclxuICBjYW5jZWxUZXh0LFxyXG4gIGxvYWRpbmdUZXh0LFxyXG4gIHNob3dDYW5jZWwgPSB0cnVlLFxyXG4gIHNob3dDb25maXJtID0gdHJ1ZSxcclxuICBidXN5ID0gZmFsc2UsXG4gIGVycm9yID0gXCJcIixcbiAgc3RhdHVzID0gXCJcIixcbiAgY2hpbGRyZW4sXG4gIG9uQ29uZmlybSxcbiAgb25DYW5jZWwsXG59OiBDb25maXJtTW9kYWxQcm9wcykge1xuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBzaG93SW5mbyA9IGJ1c3kgfHwgISFlcnJvcjtcclxuICBjb25zdCBpbmZvVGV4dCA9IGJ1c3kgPyAoc3RhdHVzIHx8IGxvYWRpbmdUZXh0KSA6IGVycm9yO1xyXG5cclxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzQwIHB4LTRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctd2hpdGUgc2hhZG93LXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtNSBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj57dGl0bGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTcwMCB3aGl0ZXNwYWNlLXByZS1saW5lXCI+e21lc3NhZ2V9PC9kaXY+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAge3Nob3dJbmZvICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgIHtidXN5ICYmIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz59XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Vycm9yICYmICFidXN5ID8gXCJ0ZXh0LXJvc2UtNzAwXCIgOiBcIlwifT57aW5mb1RleHR9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgZ2FwLTIgcHQtMlwiPlxyXG4gICAgICAgICAge3Nob3dDYW5jZWwgJiYgKFxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17b25DYW5jZWx9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2J1c3l9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7Y2FuY2VsVGV4dH1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAge3Nob3dDb25maXJtICYmIChcclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy1wcmltYXJ5IHRleHQtd2hpdGUgaG92ZXI6YmctcHJpbWFyeS85MCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtidXN5fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2J1c3kgPyBsb2FkaW5nVGV4dCA6IGNvbmZpcm1UZXh0fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+LFxyXG4gICAgZG9jdW1lbnQuYm9keVxyXG4gICk7XHJcbn1cclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBDb25maXJtTW9kYWxTdGF0ZSA9IHtcclxuICBvcGVuOiBib29sZWFuO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIGNvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgY2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gIHNob3dDYW5jZWw6IGJvb2xlYW47XHJcbiAgc2hvd0NvbmZpcm06IGJvb2xlYW47XHJcbiAgb25Db25maXJtOiAoKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZCkgfCBudWxsO1xyXG59O1xyXG5cclxudHlwZSBDb25maXJtT3Blbk9wdGlvbnMgPSBQYXJ0aWFsPE9taXQ8Q29uZmlybU1vZGFsU3RhdGUsIFwib3BlblwiIHwgXCJvbkNvbmZpcm1cIj4+ICYge1xyXG4gIG9uQ29uZmlybT86ICgoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkKSB8IG51bGw7XHJcbn07XHJcblxyXG50eXBlIFVzZUNvbmZpcm1EaWFsb2dBcmdzID0ge1xyXG4gIGRlZmF1bHRDb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIGRlZmF1bHRDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEhhbmRsZUNvbmZpcm1BcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgb25FcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZDtcclxuICBkZWZhdWx0RXJyb3JNZXNzYWdlPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gU2hhcmVkIGNvbmZpcm0gZGlhbG9nIHN0YXRlIGFuZCBjb25maXJtIGhhbmRsZXIuXHJcbmV4cG9ydCBjb25zdCB1c2VDb25maXJtRGlhbG9nID0gKHsgZGVmYXVsdENvbmZpcm1UZXh0LCBkZWZhdWx0Q2FuY2VsVGV4dCB9OiBVc2VDb25maXJtRGlhbG9nQXJncykgPT4ge1xyXG4gIGNvbnN0IFttb2RhbCwgc2V0TW9kYWxdID0gdXNlU3RhdGU8Q29uZmlybU1vZGFsU3RhdGU+KHtcclxuICAgIG9wZW46IGZhbHNlLFxyXG4gICAgdGl0bGU6IFwiXCIsXHJcbiAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgY29uZmlybVRleHQ6IGRlZmF1bHRDb25maXJtVGV4dCxcclxuICAgIGNhbmNlbFRleHQ6IGRlZmF1bHRDYW5jZWxUZXh0LFxyXG4gICAgc2hvd0NhbmNlbDogdHJ1ZSxcclxuICAgIHNob3dDb25maXJtOiB0cnVlLFxyXG4gICAgb25Db25maXJtOiBudWxsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjb25maXJtSW5GbGlnaHRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICBjb25zdCBvcGVuQ29uZmlybSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKG9wdHM6IENvbmZpcm1PcGVuT3B0aW9ucykgPT4ge1xyXG4gICAgICBzZXRNb2RhbCh7XHJcbiAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICB0aXRsZTogb3B0cz8udGl0bGUgfHwgXCJcIixcclxuICAgICAgICBtZXNzYWdlOiBvcHRzPy5tZXNzYWdlIHx8IFwiXCIsXHJcbiAgICAgICAgY29uZmlybVRleHQ6IG9wdHM/LmNvbmZpcm1UZXh0IHx8IGRlZmF1bHRDb25maXJtVGV4dCxcclxuICAgICAgICBjYW5jZWxUZXh0OiBvcHRzPy5jYW5jZWxUZXh0IHx8IGRlZmF1bHRDYW5jZWxUZXh0LFxyXG4gICAgICAgIHNob3dDYW5jZWw6IG9wdHM/LnNob3dDYW5jZWwgIT09IGZhbHNlLFxyXG4gICAgICAgIHNob3dDb25maXJtOiBvcHRzPy5zaG93Q29uZmlybSAhPT0gZmFsc2UsXHJcbiAgICAgICAgb25Db25maXJtOiBvcHRzPy5vbkNvbmZpcm0gfHwgbnVsbCxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2RlZmF1bHRDYW5jZWxUZXh0LCBkZWZhdWx0Q29uZmlybVRleHRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgY2xvc2VDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0TW9kYWwoKHByZXYpID0+ICh7IC4uLnByZXYsIG9wZW46IGZhbHNlIH0pKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm0gPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jICh7IGJ1c3ksIG9uRXJyb3IsIGRlZmF1bHRFcnJvck1lc3NhZ2UgfTogSGFuZGxlQ29uZmlybUFyZ3MpID0+IHtcclxuICAgICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgICAgY29uc3QgY2IgPSBtb2RhbC5vbkNvbmZpcm07XHJcbiAgICAgIGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlybUluRmxpZ2h0UmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgY29uZmlybUluRmxpZ2h0UmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNiKCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBtc2cgPVxyXG4gICAgICAgICAgZXJyPy5tZXNzYWdlIHx8XHJcbiAgICAgICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlIHx8XHJcbiAgICAgICAgICBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJBcGlfUmVxdWVzdEZhaWxlZFwiKTtcclxuICAgICAgICBvbkVycm9yKG1zZyk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgY29uZmlybUluRmxpZ2h0UmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtjbG9zZUNvbmZpcm0sIG1vZGFsLm9uQ29uZmlybV1cclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbW9kYWwsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICAgIGhhbmRsZUNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVCQUE2QjtBQTZDckI7QUF4Qk8sU0FBUixhQUE4QjtBQUFBLEVBQ25DO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGFBQWE7QUFBQSxFQUNiLGNBQWM7QUFBQSxFQUNkLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNUO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixHQUFzQjtBQUNwQixNQUFJLENBQUMsS0FBTSxRQUFPO0FBRWxCLFFBQU0sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUMzQixRQUFNLFdBQVcsT0FBUSxVQUFVLGNBQWU7QUFFbEQsYUFBTztBQUFBLElBQ0wsNENBQUMsU0FBSSxXQUFVLDRFQUNiLHVEQUFDLFNBQUksV0FBVSx1R0FDYjtBQUFBLGtEQUFDLFNBQUksV0FBVSx3Q0FBd0MsaUJBQU07QUFBQSxNQUM3RCw0Q0FBQyxTQUFJLFdBQVUsOENBQThDLG1CQUFRO0FBQUEsTUFDcEU7QUFBQSxNQUNBLFlBQ0MsNkNBQUMsU0FBSSxXQUFVLGtEQUNaO0FBQUEsZ0JBQVEsNENBQUMsbUJBQVEsTUFBSyxX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
