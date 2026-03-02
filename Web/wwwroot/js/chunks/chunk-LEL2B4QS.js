import {
  Spinner_default,
  indT
} from "./chunk-TAYDLPRE.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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
  onConfirm,
  onCancel
}) {
  if (!open) return null;
  const showInfo = busy || !!error;
  const infoText = busy ? status || loadingText : error;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-black/40 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full max-w-sm rounded-2xl bg-white shadow-xl border border-slate-200 p-5 space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-lg font-semibold text-slate-900", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm text-slate-700 whitespace-pre-line", children: message }),
      showInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-600", children: [
        busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-4 w-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: error && !busy ? "text-rose-700" : "", children: infoText })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-end gap-2 pt-2", children: [
        showCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition",
            onClick: onCancel,
            disabled: busy,
            children: cancelText
          }
        ),
        showConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: "px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition",
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

// Web/wwwroot/react/src/utils/wait.ts
var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export {
  ConfirmModal,
  useConfirmDialog,
  wait
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy93YWl0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xuXG50eXBlIENvbmZpcm1Nb2RhbFByb3BzID0ge1xuICBvcGVuOiBib29sZWFuO1xuICB0aXRsZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGNvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgbG9hZGluZ1RleHQ6IHN0cmluZztcbiAgc2hvd0NhbmNlbD86IGJvb2xlYW47XG4gIHNob3dDb25maXJtPzogYm9vbGVhbjtcbiAgYnVzeT86IGJvb2xlYW47XG4gIGVycm9yPzogc3RyaW5nO1xuICBzdGF0dXM/OiBzdHJpbmc7XG4gIG9uQ29uZmlybTogKCkgPT4gdm9pZDtcbiAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBEdW1iIGNvbmZpcm0gbW9kYWwgd2l0aCBvcHRpb25hbCBzcGlubmVyIGFuZCBzdGF0dXMgdGV4dC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbmZpcm1Nb2RhbCh7XG4gIG9wZW4sXG4gIHRpdGxlLFxuICBtZXNzYWdlLFxuICBjb25maXJtVGV4dCxcbiAgY2FuY2VsVGV4dCxcbiAgbG9hZGluZ1RleHQsXG4gIHNob3dDYW5jZWwgPSB0cnVlLFxuICBzaG93Q29uZmlybSA9IHRydWUsXG4gIGJ1c3kgPSBmYWxzZSxcbiAgZXJyb3IgPSBcIlwiLFxuICBzdGF0dXMgPSBcIlwiLFxuICBvbkNvbmZpcm0sXG4gIG9uQ2FuY2VsLFxufTogQ29uZmlybU1vZGFsUHJvcHMpIHtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzaG93SW5mbyA9IGJ1c3kgfHwgISFlcnJvcjtcbiAgY29uc3QgaW5mb1RleHQgPSBidXN5ID8gKHN0YXR1cyB8fCBsb2FkaW5nVGV4dCkgOiBlcnJvcjtcblxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay80MCBweC00XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1zbSByb3VuZGVkLTJ4bCBiZy13aGl0ZSBzaGFkb3cteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcC01IHNwYWNlLXktNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPnt0aXRsZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNzAwIHdoaXRlc3BhY2UtcHJlLWxpbmVcIj57bWVzc2FnZX08L2Rpdj5cbiAgICAgICAge3Nob3dJbmZvICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgIHtidXN5ICYmIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz59XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Vycm9yICYmICFidXN5ID8gXCJ0ZXh0LXJvc2UtNzAwXCIgOiBcIlwifT57aW5mb1RleHR9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgZ2FwLTIgcHQtMlwiPlxuICAgICAgICAgIHtzaG93Q2FuY2VsICYmIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17b25DYW5jZWx9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtidXN5fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2FuY2VsVGV4dH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3Nob3dDb25maXJtICYmIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLXByaW1hcnkgdGV4dC13aGl0ZSBob3ZlcjpiZy1wcmltYXJ5LzkwIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbmZpcm19XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtidXN5fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7YnVzeSA/IGxvYWRpbmdUZXh0IDogY29uZmlybVRleHR9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5ib2R5XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIENvbmZpcm1Nb2RhbFN0YXRlID0ge1xuICBvcGVuOiBib29sZWFuO1xuICB0aXRsZTogc3RyaW5nO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGNvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgc2hvd0NhbmNlbDogYm9vbGVhbjtcbiAgc2hvd0NvbmZpcm06IGJvb2xlYW47XG4gIG9uQ29uZmlybTogKCgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQpIHwgbnVsbDtcbn07XG5cbnR5cGUgQ29uZmlybU9wZW5PcHRpb25zID0gUGFydGlhbDxPbWl0PENvbmZpcm1Nb2RhbFN0YXRlLCBcIm9wZW5cIiB8IFwib25Db25maXJtXCI+PiAmIHtcbiAgb25Db25maXJtPzogKCgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQpIHwgbnVsbDtcbn07XG5cbnR5cGUgVXNlQ29uZmlybURpYWxvZ0FyZ3MgPSB7XG4gIGRlZmF1bHRDb25maXJtVGV4dDogc3RyaW5nO1xuICBkZWZhdWx0Q2FuY2VsVGV4dDogc3RyaW5nO1xufTtcblxudHlwZSBIYW5kbGVDb25maXJtQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgb25FcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZDtcbiAgZGVmYXVsdEVycm9yTWVzc2FnZT86IHN0cmluZztcbn07XG5cbi8vIFNoYXJlZCBjb25maXJtIGRpYWxvZyBzdGF0ZSBhbmQgY29uZmlybSBoYW5kbGVyLlxuZXhwb3J0IGNvbnN0IHVzZUNvbmZpcm1EaWFsb2cgPSAoeyBkZWZhdWx0Q29uZmlybVRleHQsIGRlZmF1bHRDYW5jZWxUZXh0IH06IFVzZUNvbmZpcm1EaWFsb2dBcmdzKSA9PiB7XG4gIGNvbnN0IFttb2RhbCwgc2V0TW9kYWxdID0gdXNlU3RhdGU8Q29uZmlybU1vZGFsU3RhdGU+KHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgICB0aXRsZTogXCJcIixcbiAgICBtZXNzYWdlOiBcIlwiLFxuICAgIGNvbmZpcm1UZXh0OiBkZWZhdWx0Q29uZmlybVRleHQsXG4gICAgY2FuY2VsVGV4dDogZGVmYXVsdENhbmNlbFRleHQsXG4gICAgc2hvd0NhbmNlbDogdHJ1ZSxcbiAgICBzaG93Q29uZmlybTogdHJ1ZSxcbiAgICBvbkNvbmZpcm06IG51bGwsXG4gIH0pO1xuXG4gIGNvbnN0IGNvbmZpcm1JbkZsaWdodFJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgY29uc3Qgb3BlbkNvbmZpcm0gPSB1c2VDYWxsYmFjayhcbiAgICAob3B0czogQ29uZmlybU9wZW5PcHRpb25zKSA9PiB7XG4gICAgICBzZXRNb2RhbCh7XG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgIHRpdGxlOiBvcHRzPy50aXRsZSB8fCBcIlwiLFxuICAgICAgICBtZXNzYWdlOiBvcHRzPy5tZXNzYWdlIHx8IFwiXCIsXG4gICAgICAgIGNvbmZpcm1UZXh0OiBvcHRzPy5jb25maXJtVGV4dCB8fCBkZWZhdWx0Q29uZmlybVRleHQsXG4gICAgICAgIGNhbmNlbFRleHQ6IG9wdHM/LmNhbmNlbFRleHQgfHwgZGVmYXVsdENhbmNlbFRleHQsXG4gICAgICAgIHNob3dDYW5jZWw6IG9wdHM/LnNob3dDYW5jZWwgIT09IGZhbHNlLFxuICAgICAgICBzaG93Q29uZmlybTogb3B0cz8uc2hvd0NvbmZpcm0gIT09IGZhbHNlLFxuICAgICAgICBvbkNvbmZpcm06IG9wdHM/Lm9uQ29uZmlybSB8fCBudWxsLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbZGVmYXVsdENhbmNlbFRleHQsIGRlZmF1bHRDb25maXJtVGV4dF1cbiAgKTtcblxuICBjb25zdCBjbG9zZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0TW9kYWwoKHByZXYpID0+ICh7IC4uLnByZXYsIG9wZW46IGZhbHNlIH0pKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm0gPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoeyBidXN5LCBvbkVycm9yLCBkZWZhdWx0RXJyb3JNZXNzYWdlIH06IEhhbmRsZUNvbmZpcm1BcmdzKSA9PiB7XG4gICAgICBpZiAoYnVzeSkgcmV0dXJuO1xuICAgICAgY29uc3QgY2IgPSBtb2RhbC5vbkNvbmZpcm07XG4gICAgICBpZiAodHlwZW9mIGNiICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maXJtSW5GbGlnaHRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgY29uZmlybUluRmxpZ2h0UmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2IoKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbXNnID1cbiAgICAgICAgICBlcnI/Lm1lc3NhZ2UgfHxcbiAgICAgICAgICBkZWZhdWx0RXJyb3JNZXNzYWdlIHx8XG4gICAgICAgICAgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiQXBpX1JlcXVlc3RGYWlsZWRcIik7XG4gICAgICAgIG9uRXJyb3IobXNnKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNvbmZpcm1JbkZsaWdodFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBbY2xvc2VDb25maXJtLCBtb2RhbC5vbkNvbmZpcm1dXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBtb2RhbCxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gICAgaGFuZGxlQ29uZmlybSxcbiAgfTtcbn07XHJcbiIsICJleHBvcnQgY29uc3Qgd2FpdCA9IChtczogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1QkFBNkI7QUEyQ3JCO0FBdkJPLFNBQVIsYUFBOEI7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxhQUFhO0FBQUEsRUFDYixjQUFjO0FBQUEsRUFDZCxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVDtBQUFBLEVBQ0E7QUFDRixHQUFzQjtBQUNwQixNQUFJLENBQUMsS0FBTSxRQUFPO0FBRWxCLFFBQU0sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUMzQixRQUFNLFdBQVcsT0FBUSxVQUFVLGNBQWU7QUFFbEQsYUFBTztBQUFBLElBQ0wsNENBQUMsU0FBSSxXQUFVLDRFQUNiLHVEQUFDLFNBQUksV0FBVSx3RkFDYjtBQUFBLGtEQUFDLFNBQUksV0FBVSx3Q0FBd0MsaUJBQU07QUFBQSxNQUM3RCw0Q0FBQyxTQUFJLFdBQVUsOENBQThDLG1CQUFRO0FBQUEsTUFDcEUsWUFDQyw2Q0FBQyxTQUFJLFdBQVUsa0RBQ1o7QUFBQSxnQkFBUSw0Q0FBQyxtQkFBUSxNQUFLLFdBQVU7QUFBQSxRQUNqQyw0Q0FBQyxVQUFLLFdBQVcsU0FBUyxDQUFDLE9BQU8sa0JBQWtCLElBQUssb0JBQVM7QUFBQSxTQUNwRTtBQUFBLE1BRUYsNkNBQUMsU0FBSSxXQUFVLCtCQUNaO0FBQUEsc0JBQ0M7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVU7QUFBQSxZQUNWLFNBQVM7QUFBQSxZQUNULFVBQVU7QUFBQSxZQUVUO0FBQUE7QUFBQSxRQUNIO0FBQUEsUUFFRCxlQUNDO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxXQUFVO0FBQUEsWUFDVixTQUFTO0FBQUEsWUFDVCxVQUFVO0FBQUEsWUFFVCxpQkFBTyxjQUFjO0FBQUE7QUFBQSxRQUN4QjtBQUFBLFNBRUo7QUFBQSxPQUNGLEdBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxFQUNYO0FBQ0Y7OztBQzlFQSxtQkFBOEM7QUE4QnZDLElBQU0sbUJBQW1CLENBQUMsRUFBRSxvQkFBb0Isa0JBQWtCLE1BQTRCO0FBQ25HLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBNEI7QUFBQSxJQUNwRCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsSUFDWixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsRUFDYixDQUFDO0FBRUQsUUFBTSx5QkFBcUIscUJBQU8sS0FBSztBQUV2QyxRQUFNLGtCQUFjO0FBQUEsSUFDbEIsQ0FBQyxTQUE2QjtBQUM1QixlQUFTO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixPQUFPLE1BQU0sU0FBUztBQUFBLFFBQ3RCLFNBQVMsTUFBTSxXQUFXO0FBQUEsUUFDMUIsYUFBYSxNQUFNLGVBQWU7QUFBQSxRQUNsQyxZQUFZLE1BQU0sY0FBYztBQUFBLFFBQ2hDLFlBQVksTUFBTSxlQUFlO0FBQUEsUUFDakMsYUFBYSxNQUFNLGdCQUFnQjtBQUFBLFFBQ25DLFdBQVcsTUFBTSxhQUFhO0FBQUEsTUFDaEMsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsbUJBQW1CLGtCQUFrQjtBQUFBLEVBQ3hDO0FBRUEsUUFBTSxtQkFBZSwwQkFBWSxNQUFNO0FBQ3JDLGFBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxNQUFNLE1BQU0sTUFBTSxFQUFFO0FBQUEsRUFDL0MsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG9CQUFnQjtBQUFBLElBQ3BCLE9BQU8sRUFBRSxNQUFNLFNBQVMsb0JBQW9CLE1BQXlCO0FBQ25FLFVBQUksS0FBTTtBQUNWLFlBQU0sS0FBSyxNQUFNO0FBQ2pCLFVBQUksT0FBTyxPQUFPLFlBQVk7QUFDNUIscUJBQWE7QUFDYjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLG1CQUFtQixRQUFTO0FBQ2hDLHlCQUFtQixVQUFVO0FBQzdCLFVBQUk7QUFDRixjQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ3hCLFlBQUksV0FBVyxPQUFPO0FBQ3BCLHVCQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0YsU0FBUyxLQUFVO0FBQ2pCLGNBQU0sTUFDSixLQUFLLFdBQ0wsdUJBQ0EsS0FBSyxxQkFBcUIsbUJBQW1CO0FBQy9DLGdCQUFRLEdBQUc7QUFBQSxNQUNiLFVBQUU7QUFDQSwyQkFBbUIsVUFBVTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxjQUFjLE1BQU0sU0FBUztBQUFBLEVBQ2hDO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ2xHTyxJQUFNLE9BQU8sQ0FBQyxPQUFlLElBQUksUUFBUSxDQUFDLFlBQVksV0FBVyxTQUFTLEVBQUUsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
