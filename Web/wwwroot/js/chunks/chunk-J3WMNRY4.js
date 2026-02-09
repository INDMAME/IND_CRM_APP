import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/utils/indI18n.ts
var getI18n = () => {
  return typeof globalThis !== "undefined" && globalThis.__IND_I18N__ || {};
};
var indT = (key, fallback) => {
  const dict = getI18n();
  const value = dict[key];
  if (typeof value === "string" && value.trim()) return value;
  return fallback || key;
};
var indFormat = (key, fallback, ...args) => {
  const template = indT(key, fallback);
  return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
};

// Web/wwwroot/react/src/utils/permissions.ts
var ACCESS_RIGHTS = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4
};
var getPermissionI18n = () => {
  return typeof globalThis !== "undefined" && globalThis.__IND_PERMISSION_I18N__ || {};
};
var getModuleAccess = (code) => {
  const access = typeof globalThis !== "undefined" && globalThis.__IND_MODULE_ACCESS__ || {};
  const value = access[code];
  return Number(value ?? 0);
};
var canAccess = (code, level = "View") => {
  return getModuleAccess(code) >= ACCESS_RIGHTS[level];
};
var showPermissionModal = (opts) => {
  if (typeof window !== "undefined" && window.IND?.showPermissionModal) {
    window.IND.showPermissionModal(opts || {});
    return;
  }
  const perm = getPermissionI18n();
  const fallback = perm.message || indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion.");
  alert(fallback);
};

// Web/wwwroot/react/src/utils/classNames.ts
var classNames = (...classes) => classes.filter(Boolean).join(" ");

// Web/wwwroot/react/src/components/commons/Spinner.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Spinner = ({ size = "h-4 w-4", label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: `ind-spinner ${size}`, viewBox: "0 0 20 20", role: "status", "aria-label": label || indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) });
var Spinner_default = Spinner;

// Web/wwwroot/react/src/services/apiService.ts
var ApiFetchError = class extends Error {
  constructor(message, status, responseBody) {
    super(message);
    this.name = "ApiFetchError";
    this.status = status;
    this.responseBody = responseBody;
  }
};
var getPermissionI18n2 = () => {
  return typeof window !== "undefined" && window.__IND_PERMISSION_I18N__ || {};
};
var getI18n2 = () => {
  return typeof globalThis !== "undefined" && globalThis.__IND_I18N__ || {};
};
var indT2 = (key, fallback) => {
  const dict = getI18n2();
  const value = dict[key];
  if (typeof value === "string" && value.trim()) return value;
  return fallback || key;
};
var showPermissionModal2 = (opts) => {
  if (typeof window !== "undefined" && window.IND?.showPermissionModal) {
    window.IND.showPermissionModal(opts || {});
    return;
  }
  const perm = getPermissionI18n2();
  const fallback = perm.message || indT2("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion.");
  alert(fallback);
};
var getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") || "" : "";
};
var tryParseJson = (raw) => {
  if (!raw || !raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
var getMessageFromPayload = (payload) => {
  const message = payload?.message;
  return typeof message === "string" && message.trim() ? message : "";
};
async function fetchJson(url, options) {
  const { suppressPermissionModal, ...fetchOptions } = options || {};
  const csrfToken = getCsrfToken();
  const headers = {
    Accept: "application/json",
    ...fetchOptions.headers || {}
  };
  if (csrfToken) {
    headers["RequestVerificationToken"] = csrfToken;
  }
  const response = await fetch(url, {
    credentials: "same-origin",
    ...fetchOptions,
    headers
  });
  const raw = await response.text();
  const payload = tryParseJson(raw);
  if (!response.ok) {
    if (response.status === 403) {
      if (!suppressPermissionModal) showPermissionModal2();
      throw new ApiFetchError(
        indT2("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."),
        response.status,
        raw
      );
    }
    const payloadMessage = getMessageFromPayload(payload);
    if (payloadMessage) {
      throw new ApiFetchError(payloadMessage, response.status, raw);
    }
    throw new ApiFetchError(indT2("Api_RequestFailed", "Request failed. Please try again."), response.status, raw);
  }
  if (!raw.trim()) {
    return {};
  }
  if (payload !== null) {
    return payload;
  }
  throw new ApiFetchError(indT2("Api_InvalidJson", "Invalid server response."), response.status, raw);
}

// Web/wwwroot/react/src/utils/visitasHistory.ts
var HISTORY_FILTER_KEY = "visitas_history_filter_v1";
var HISTORY_RETURN_FLAG_KEY = "visitas_history_return_v1";
var isIsoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());
var hasHistoryFilterRange = () => {
  try {
    const raw = sessionStorage.getItem(HISTORY_FILTER_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!(parsed && parsed.fromDate && parsed.toDate);
  } catch {
    return false;
  }
};
var markHistoryReturn = () => {
  try {
    sessionStorage.setItem(HISTORY_RETURN_FLAG_KEY, "1");
  } catch {
  }
};
var setHistoryFilterForDate = (isoDate, force = false) => {
  const value = String(isoDate || "").trim();
  if (!isIsoDate(value)) {
    if (hasHistoryFilterRange()) markHistoryReturn();
    return;
  }
  try {
    if (force || !hasHistoryFilterRange()) {
      sessionStorage.setItem(HISTORY_FILTER_KEY, JSON.stringify({ fromDate: value, toDate: value }));
    }
  } catch {
  }
  markHistoryReturn();
};
var actionMarkHideTimer = null;
var getActionMarkNodes = () => ({
  root: document.getElementById("indActionMark"),
  wrap: document.getElementById("indActionMarkWrap"),
  check: document.getElementById("indMarkCheck"),
  warn: document.getElementById("indMarkWarning"),
  error: document.getElementById("indMarkError")
});
var resetActionMark = (nodes) => {
  if (!nodes.wrap) return;
  nodes.wrap.classList.remove("text-emerald-600", "text-rose-600", "text-amber-500");
  nodes.wrap.classList.remove("drop-shadow-[0_18px_24px_rgba(0,0,0,0.15)]");
  if (nodes.check) nodes.check.classList.add("hidden");
  if (nodes.warn) nodes.warn.classList.add("hidden");
  if (nodes.error) nodes.error.classList.add("hidden");
};
var hideActionMark = (nodes) => {
  if (!nodes.root) return;
  nodes.root.classList.add("hidden");
  nodes.root.setAttribute("aria-hidden", "true");
  resetActionMark(nodes);
};
var flashActionMarkLocal = (type, durationMs) => {
  const nodes = getActionMarkNodes();
  if (!nodes.root || !nodes.wrap || !nodes.check || !nodes.warn || !nodes.error) {
    return;
  }
  if (actionMarkHideTimer) {
    window.clearTimeout(actionMarkHideTimer);
    actionMarkHideTimer = null;
  }
  resetActionMark(nodes);
  let icon = nodes.check;
  let colorClass = "text-emerald-600";
  switch (type) {
    case "okProcess":
      icon = nodes.check;
      colorClass = "text-emerald-600";
      break;
    case "okDelProcess":
      icon = nodes.check;
      colorClass = "text-rose-600";
      break;
    case "warningProcess":
      icon = nodes.warn;
      colorClass = "text-amber-500";
      break;
    case "errorProcess":
      icon = nodes.error;
      colorClass = "text-rose-600";
      break;
    default:
      icon = nodes.check;
      colorClass = "text-emerald-600";
      break;
  }
  nodes.wrap.classList.add(colorClass);
  nodes.wrap.classList.add("drop-shadow-[0_18px_24px_rgba(0,0,0,0.15)]");
  icon.classList.remove("hidden");
  nodes.root.classList.remove("hidden");
  nodes.root.setAttribute("aria-hidden", "false");
  nodes.root.style.setProperty("display", "flex", "important");
  nodes.root.style.setProperty("opacity", "1", "important");
  nodes.root.style.setProperty("visibility", "visible", "important");
  if (durationMs > 0) {
    actionMarkHideTimer = window.setTimeout(() => {
      nodes.root.style.removeProperty("display");
      nodes.root.style.removeProperty("opacity");
      nodes.root.style.removeProperty("visibility");
      hideActionMark(nodes);
    }, durationMs);
  }
};
var flashActionMark = (type, durationMs) => {
  try {
    if (window.IND && typeof window.IND.flashActionMark === "function") {
      window.IND.flashActionMark({ type, durationMs });
      return;
    }
  } catch {
  }
  try {
    flashActionMarkLocal(type, durationMs);
  } catch {
  }
};

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/useFloatingPosition.ts
var import_react = __toESM(require_react());
var useFloatingPosition = (targetRef, open) => {
  const [style, setStyle] = (0, import_react.useState)({ top: 0, left: 0, width: 0 });
  (0, import_react.useLayoutEffect)(() => {
    if (!open || !targetRef.current) return;
    const update = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;
      setStyle({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width
      });
    };
    update();
    const onScroll = () => open && update();
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", update);
    };
  }, [open, targetRef]);
  return style;
};

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var FloatingList = ({
  anchorRef,
  open,
  zIndex = 3e5,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-md",
  role,
  portalClassName,
  panelClassName,
  children
}) => {
  const style = useFloatingPosition(anchorRef, open);
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        style: {
          position: "fixed",
          top: style.top,
          left: style.left,
          width: style.width,
          zIndex
        },
        className: portalClassName,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            role,
            className: `w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`,
            children
          }
        )
      }
    ),
    document.body
  );
};
var FloatingList_default = FloatingList;

// Web/wwwroot/react/src/components/commons/chevrons.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ChevronDownSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" })
    }
  );
};
var ChevronUpSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" })
    }
  );
};

// Web/wwwroot/react/src/hooks/useOutsideClick.ts
var import_react2 = __toESM(require_react());
var useOutsideClick = (refs, onClose) => {
  const list = (0, import_react2.useMemo)(() => Array.isArray(refs) ? refs : [refs], [refs]);
  const listRef = (0, import_react2.useRef)(list);
  const onCloseRef = (0, import_react2.useRef)(onClose);
  (0, import_react2.useEffect)(() => {
    listRef.current = list;
  }, [list]);
  (0, import_react2.useEffect)(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  (0, import_react2.useEffect)(() => {
    const handler = (ev) => {
      const currentList = listRef.current;
      const isInside = currentList.some((r) => r?.current && r.current.contains(ev.target));
      if (isInside) return;
      onCloseRef.current();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);
};

export {
  indT,
  indFormat,
  Spinner_default,
  ApiFetchError,
  fetchJson,
  canAccess,
  showPermissionModal,
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY,
  setHistoryFilterForDate,
  flashActionMark,
  FloatingList_default,
  ChevronDownSvg,
  ChevronUpSvg,
  useOutsideClick,
  classNames
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Blcm1pc3Npb25zLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy9jbGFzc05hbWVzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL2FwaVNlcnZpY2UudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50cyIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL2NoZXZyb25zLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBnZXRJMThuID0gKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRUID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRpY3QgPSBnZXRJMThuKCk7XG4gIGNvbnN0IHZhbHVlID0gZGljdFtrZXldO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gZmFsbGJhY2sgfHwga2V5O1xufTtcblxuZXhwb3J0IGNvbnN0IGluZEZvcm1hdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZSA9IGluZFQoa2V5LCBmYWxsYmFjayk7XG4gIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xufTtcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4vaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgY29uc3QgQUNDRVNTX1JJR0hUUyA9IHtcbiAgVmlldzogMSxcbiAgRWRpdDogMixcbiAgQWRkOiAzLFxuICBGdWxsQWNjZXNzOiA0LFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgQWNjZXNzUmlnaHQgPSBrZXlvZiB0eXBlb2YgQUNDRVNTX1JJR0hUUztcblxuY29uc3QgZ2V0UGVybWlzc2lvbkkxOG4gPSAoKSA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9QRVJNSVNTSU9OX0kxOE5fXykgfHwge307XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TW9kdWxlQWNjZXNzID0gKGNvZGU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gIGNvbnN0IGFjY2VzcyA9ICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWxUaGlzLl9fSU5EX01PRFVMRV9BQ0NFU1NfXykgfHwge307XG4gIGNvbnN0IHZhbHVlID0gYWNjZXNzW2NvZGUgYXMga2V5b2YgdHlwZW9mIGFjY2Vzc107XG4gIHJldHVybiBOdW1iZXIodmFsdWUgPz8gMCk7XG59O1xuXG5leHBvcnQgY29uc3QgY2FuQWNjZXNzID0gKGNvZGU6IHN0cmluZywgbGV2ZWw6IEFjY2Vzc1JpZ2h0ID0gXCJWaWV3XCIpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGdldE1vZHVsZUFjY2Vzcyhjb2RlKSA+PSBBQ0NFU1NfUklHSFRTW2xldmVsXTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaG93UGVybWlzc2lvbk1vZGFsID0gKG9wdHM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuSU5EPy5zaG93UGVybWlzc2lvbk1vZGFsKSB7XG4gICAgd2luZG93LklORC5zaG93UGVybWlzc2lvbk1vZGFsKG9wdHMgfHwge30pO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwZXJtID0gZ2V0UGVybWlzc2lvbkkxOG4oKTtcbiAgY29uc3QgZmFsbGJhY2sgPSBwZXJtLm1lc3NhZ2UgfHwgaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gdGllbmVzIHBlcm1pc29zIHBhcmEgcmVhbGl6YXIgZXN0YSBhY2Npb24uXCIpO1xuICBhbGVydChmYWxsYmFjayk7XG59O1xuIiwgImV4cG9ydCBjb25zdCBjbGFzc05hbWVzID0gKC4uLmNsYXNzZXM6IEFycmF5PHN0cmluZyB8IGZhbHNlIHwgbnVsbCB8IHVuZGVmaW5lZD4pID0+XG4gIGNsYXNzZXMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBzaXplPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbn07XG5cbmNvbnN0IFNwaW5uZXIgPSAoeyBzaXplID0gXCJoLTQgdy00XCIsIGxhYmVsIH06IFByb3BzKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtgaW5kLXNwaW5uZXIgJHtzaXplfWB9IHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17bGFiZWwgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcjtcbiIsICJ0eXBlIFBlcm1pc3Npb25JMThuID0ge1xuICB0aXRsZT86IHN0cmluZztcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgb2s/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBBcGlGZXRjaE9wdGlvbnMgPSBSZXF1ZXN0SW5pdCAmIHtcbiAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIEFwaUZldGNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHN0YXR1cz86IG51bWJlcjtcbiAgcmVzcG9uc2VCb2R5Pzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgc3RhdHVzPzogbnVtYmVyLCByZXNwb25zZUJvZHk/OiBzdHJpbmcpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkFwaUZldGNoRXJyb3JcIjtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLnJlc3BvbnNlQm9keSA9IHJlc3BvbnNlQm9keTtcbiAgfVxufVxuXG5jb25zdCBnZXRQZXJtaXNzaW9uSTE4biA9ICgpOiBQZXJtaXNzaW9uSTE4biA9PiB7XG4gIHJldHVybiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuX19JTkRfUEVSTUlTU0lPTl9JMThOX18pIHx8IHt9O1xufTtcblxuY29uc3QgZ2V0STE4biA9ICgpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcbiAgcmV0dXJuICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXykgfHwge307XG59O1xuXG5jb25zdCBpbmRUID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRpY3QgPSBnZXRJMThuKCk7XG4gIGNvbnN0IHZhbHVlID0gZGljdFtrZXldO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gZmFsbGJhY2sgfHwga2V5O1xufTtcblxuY29uc3Qgc2hvd1Blcm1pc3Npb25Nb2RhbCA9IChvcHRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LklORD8uc2hvd1Blcm1pc3Npb25Nb2RhbCkge1xuICAgIHdpbmRvdy5JTkQuc2hvd1Blcm1pc3Npb25Nb2RhbChvcHRzIHx8IHt9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGVybSA9IGdldFBlcm1pc3Npb25JMThuKCk7XG4gIGNvbnN0IGZhbGxiYWNrID0gcGVybS5tZXNzYWdlIHx8IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGVzdGEgYWNjaW9uLlwiKTtcbiAgYWxlcnQoZmFsbGJhY2spO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENzcmZUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpO1xuICByZXR1cm4gbWV0YSA/IG1ldGEuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKSB8fCBcIlwiIDogXCJcIjtcbn07XG5cbmNvbnN0IHRyeVBhcnNlSnNvbiA9IChyYXc6IHN0cmluZyk6IGFueSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCAhcmF3LnRyaW0oKSkgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IGdldE1lc3NhZ2VGcm9tUGF5bG9hZCA9IChwYXlsb2FkOiBhbnkpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBtZXNzYWdlID0gcGF5bG9hZD8ubWVzc2FnZTtcbiAgcmV0dXJuIHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiICYmIG1lc3NhZ2UudHJpbSgpID8gbWVzc2FnZSA6IFwiXCI7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hKc29uPFQgPSBhbnk+KHVybDogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwsIC4uLmZldGNoT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XG5cbiAgY29uc3QgaGVhZGVyczogSGVhZGVyc0luaXQgPSB7XG4gICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAuLi4oZmV0Y2hPcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICB9O1xuXG4gIGlmIChjc3JmVG9rZW4pIHtcbiAgICAoaGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KVtcIlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXSA9IGNzcmZUb2tlbjtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgaGVhZGVycyxcbiAgfSk7XG5cbiAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBjb25zdCBwYXlsb2FkID0gdHJ5UGFyc2VKc29uKHJhdyk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgaWYgKCFzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCkgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXG4gICAgICAgIGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGVzdGEgYWNjaW9uLlwiKSxcbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICByYXdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZE1lc3NhZ2UgPSBnZXRNZXNzYWdlRnJvbVBheWxvYWQocGF5bG9hZCk7XG4gICAgaWYgKHBheWxvYWRNZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihwYXlsb2FkTWVzc2FnZSwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLlwiKSwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xuICB9XG5cbiAgaWYgKCFyYXcudHJpbSgpKSB7XG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cblxuICBpZiAocGF5bG9hZCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBwYXlsb2FkIGFzIFQ7XG4gIH1cblxuICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihpbmRUKFwiQXBpX0ludmFsaWRKc29uXCIsIFwiSW52YWxpZCBzZXJ2ZXIgcmVzcG9uc2UuXCIpLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XG59XG4iLCAiZXhwb3J0IGNvbnN0IEhJU1RPUllfRklMVEVSX0tFWSA9IFwidmlzaXRhc19oaXN0b3J5X2ZpbHRlcl92MVwiO1xuZXhwb3J0IGNvbnN0IEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZID0gXCJ2aXNpdGFzX2hpc3RvcnlfcmV0dXJuX3YxXCI7XG5cbmV4cG9ydCBjb25zdCBpc0lzb0RhdGUgPSAodmFsdWU6IHN0cmluZykgPT4gL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKSk7XG5cbmV4cG9ydCBjb25zdCBoYXNIaXN0b3J5RmlsdGVyUmFuZ2UgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmF3ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShISVNUT1JZX0ZJTFRFUl9LRVkpO1xuICAgIGlmICghcmF3KSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShyYXcpO1xuICAgIHJldHVybiAhIShwYXJzZWQgJiYgcGFyc2VkLmZyb21EYXRlICYmIHBhcnNlZC50b0RhdGUpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBtYXJrSGlzdG9yeVJldHVybiA9ICgpOiB2b2lkID0+IHtcbiAgdHJ5IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZLCBcIjFcIik7XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUgPSAoaXNvRGF0ZTogc3RyaW5nLCBmb3JjZSA9IGZhbHNlKTogdm9pZCA9PiB7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGlzb0RhdGUgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIWlzSXNvRGF0ZSh2YWx1ZSkpIHtcbiAgICBpZiAoaGFzSGlzdG9yeUZpbHRlclJhbmdlKCkpIG1hcmtIaXN0b3J5UmV0dXJuKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gV2hlbiBmb3JjZSBpcyB0cnVlLCByZXBsYWNlIGFueSBleGlzdGluZyBoaXN0b3J5IHJhbmdlLlxuICAgIGlmIChmb3JjZSB8fCAhaGFzSGlzdG9yeUZpbHRlclJhbmdlKCkpIHtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oSElTVE9SWV9GSUxURVJfS0VZLCBKU09OLnN0cmluZ2lmeSh7IGZyb21EYXRlOiB2YWx1ZSwgdG9EYXRlOiB2YWx1ZSB9KSk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxuICBtYXJrSGlzdG9yeVJldHVybigpO1xufTtcblxubGV0IGFjdGlvbk1hcmtIaWRlVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG5jb25zdCBnZXRBY3Rpb25NYXJrTm9kZXMgPSAoKSA9PiAoe1xuICByb290OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZEFjdGlvbk1hcmtcIiksXG4gIHdyYXA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kQWN0aW9uTWFya1dyYXBcIiksXG4gIGNoZWNrOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZE1hcmtDaGVja1wiKSxcbiAgd2FybjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRNYXJrV2FybmluZ1wiKSxcbiAgZXJyb3I6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kTWFya0Vycm9yXCIpLFxufSk7XG5cbmNvbnN0IHJlc2V0QWN0aW9uTWFyayA9IChub2RlczogUmV0dXJuVHlwZTx0eXBlb2YgZ2V0QWN0aW9uTWFya05vZGVzPikgPT4ge1xuICBpZiAoIW5vZGVzLndyYXApIHJldHVybjtcbiAgbm9kZXMud3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwidGV4dC1lbWVyYWxkLTYwMFwiLCBcInRleHQtcm9zZS02MDBcIiwgXCJ0ZXh0LWFtYmVyLTUwMFwiKTtcbiAgbm9kZXMud3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcC1zaGFkb3ctWzBfMThweF8yNHB4X3JnYmEoMCwwLDAsMC4xNSldXCIpO1xuICBpZiAobm9kZXMuY2hlY2spIG5vZGVzLmNoZWNrLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIGlmIChub2Rlcy53YXJuKSBub2Rlcy53YXJuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIGlmIChub2Rlcy5lcnJvcikgbm9kZXMuZXJyb3IuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn07XG5cbmNvbnN0IGhpZGVBY3Rpb25NYXJrID0gKG5vZGVzOiBSZXR1cm5UeXBlPHR5cGVvZiBnZXRBY3Rpb25NYXJrTm9kZXM+KSA9PiB7XG4gIGlmICghbm9kZXMucm9vdCkgcmV0dXJuO1xuICBub2Rlcy5yb290LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIG5vZGVzLnJvb3Quc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICByZXNldEFjdGlvbk1hcmsobm9kZXMpO1xufTtcblxuY29uc3QgZmxhc2hBY3Rpb25NYXJrTG9jYWwgPSAodHlwZTogc3RyaW5nLCBkdXJhdGlvbk1zOiBudW1iZXIpID0+IHtcbiAgY29uc3Qgbm9kZXMgPSBnZXRBY3Rpb25NYXJrTm9kZXMoKTtcbiAgaWYgKCFub2Rlcy5yb290IHx8ICFub2Rlcy53cmFwIHx8ICFub2Rlcy5jaGVjayB8fCAhbm9kZXMud2FybiB8fCAhbm9kZXMuZXJyb3IpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoYWN0aW9uTWFya0hpZGVUaW1lcikge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoYWN0aW9uTWFya0hpZGVUaW1lcik7XG4gICAgYWN0aW9uTWFya0hpZGVUaW1lciA9IG51bGw7XG4gIH1cblxuICByZXNldEFjdGlvbk1hcmsobm9kZXMpO1xuXG4gIGxldCBpY29uID0gbm9kZXMuY2hlY2s7XG4gIGxldCBjb2xvckNsYXNzID0gXCJ0ZXh0LWVtZXJhbGQtNjAwXCI7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBcIm9rUHJvY2Vzc1wiOlxuICAgICAgaWNvbiA9IG5vZGVzLmNoZWNrO1xuICAgICAgY29sb3JDbGFzcyA9IFwidGV4dC1lbWVyYWxkLTYwMFwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm9rRGVsUHJvY2Vzc1wiOlxuICAgICAgaWNvbiA9IG5vZGVzLmNoZWNrO1xuICAgICAgY29sb3JDbGFzcyA9IFwidGV4dC1yb3NlLTYwMFwiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIndhcm5pbmdQcm9jZXNzXCI6XG4gICAgICBpY29uID0gbm9kZXMud2FybjtcbiAgICAgIGNvbG9yQ2xhc3MgPSBcInRleHQtYW1iZXItNTAwXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZXJyb3JQcm9jZXNzXCI6XG4gICAgICBpY29uID0gbm9kZXMuZXJyb3I7XG4gICAgICBjb2xvckNsYXNzID0gXCJ0ZXh0LXJvc2UtNjAwXCI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaWNvbiA9IG5vZGVzLmNoZWNrO1xuICAgICAgY29sb3JDbGFzcyA9IFwidGV4dC1lbWVyYWxkLTYwMFwiO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBub2Rlcy53cmFwLmNsYXNzTGlzdC5hZGQoY29sb3JDbGFzcyk7XG4gIG5vZGVzLndyYXAuY2xhc3NMaXN0LmFkZChcImRyb3Atc2hhZG93LVswXzE4cHhfMjRweF9yZ2JhKDAsMCwwLDAuMTUpXVwiKTtcbiAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICBub2Rlcy5yb290LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIG5vZGVzLnJvb3Quc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcbiAgbm9kZXMucm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcImRpc3BsYXlcIiwgXCJmbGV4XCIsIFwiaW1wb3J0YW50XCIpO1xuICBub2Rlcy5yb290LnN0eWxlLnNldFByb3BlcnR5KFwib3BhY2l0eVwiLCBcIjFcIiwgXCJpbXBvcnRhbnRcIik7XG4gIG5vZGVzLnJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiLCBcImltcG9ydGFudFwiKTtcblxuICBpZiAoZHVyYXRpb25NcyA+IDApIHtcbiAgICBhY3Rpb25NYXJrSGlkZVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbm9kZXMucm9vdC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG4gICAgICBub2Rlcy5yb290LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3BhY2l0eVwiKTtcbiAgICAgIG5vZGVzLnJvb3Quc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ2aXNpYmlsaXR5XCIpO1xuICAgICAgaGlkZUFjdGlvbk1hcmsobm9kZXMpO1xuICAgIH0sIGR1cmF0aW9uTXMpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmxhc2hBY3Rpb25NYXJrID0gKHR5cGU6IHN0cmluZywgZHVyYXRpb25NczogbnVtYmVyKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKHdpbmRvdy5JTkQgJiYgdHlwZW9mIHdpbmRvdy5JTkQuZmxhc2hBY3Rpb25NYXJrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHdpbmRvdy5JTkQuZmxhc2hBY3Rpb25NYXJrKHsgdHlwZSwgZHVyYXRpb25NcyB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG5cbiAgdHJ5IHtcbiAgICBmbGFzaEFjdGlvbk1hcmtMb2NhbCh0eXBlLCBkdXJhdGlvbk1zKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgdXNlRmxvYXRpbmdQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzXCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGFuY2hvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PjtcbiAgb3BlbjogYm9vbGVhbjtcbiAgekluZGV4PzogbnVtYmVyO1xuICBtYXhIZWlnaHRDbGFzcz86IHN0cmluZztcbiAgcm91bmRlZENsYXNzPzogc3RyaW5nO1xuICByb2xlPzogc3RyaW5nO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xufTtcblxuY29uc3QgRmxvYXRpbmdMaXN0ID0gKHtcbiAgYW5jaG9yUmVmLFxuICBvcGVuLFxuICB6SW5kZXggPSAzMDAwMDAsXG4gIG1heEhlaWdodENsYXNzID0gXCJtYXgtaC03MlwiLFxuICByb3VuZGVkQ2xhc3MgPSBcInJvdW5kZWQtbWRcIixcbiAgcm9sZSxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgY2hpbGRyZW4sXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBzdHlsZSA9IHVzZUZsb2F0aW5nUG9zaXRpb24oYW5jaG9yUmVmLCBvcGVuKTtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICB0b3A6IHN0eWxlLnRvcCxcbiAgICAgICAgbGVmdDogc3R5bGUubGVmdCxcbiAgICAgICAgd2lkdGg6IHN0eWxlLndpZHRoLFxuICAgICAgICB6SW5kZXgsXG4gICAgICB9fVxuICAgICAgY2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICByb2xlPXtyb2xlfVxuICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgb3ZlcmZsb3ctYXV0byAke3JvdW5kZWRDbGFzc30gYmctd2hpdGUgcHktMSB0ZXh0LXNtIHNoYWRvdy1sZyByaW5nLTEgcmluZy1ibGFjay81IGZvY3VzOm91dGxpbmUtaGlkZGVuICR7bWF4SGVpZ2h0Q2xhc3N9ICR7cGFuZWxDbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4sXG4gICAgZG9jdW1lbnQuYm9keVxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmdMaXN0O1xuIiwgImltcG9ydCB7IHVzZUxheW91dEVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IHVzZUZsb2F0aW5nUG9zaXRpb24gPSAodGFyZ2V0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+LCBvcGVuOiBib29sZWFuKSA9PiB7XG4gIGNvbnN0IFtzdHlsZSwgc2V0U3R5bGVdID0gdXNlU3RhdGUoeyB0b3A6IDAsIGxlZnQ6IDAsIHdpZHRoOiAwIH0pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuIHx8ICF0YXJnZXRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlY3QgPSB0YXJnZXRSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoIXJlY3QpIHJldHVybjtcbiAgICAgIHNldFN0eWxlKHtcbiAgICAgICAgdG9wOiByZWN0LmJvdHRvbSArIDYsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHVwZGF0ZSgpO1xuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4gb3BlbiAmJiB1cGRhdGUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZSk7XG4gICAgfTtcbiAgfSwgW29wZW4sIHRhcmdldFJlZl0pO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25Eb3duU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTkuNSA4LjI1LTcuNSA3LjUtNy41LTcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25VcFN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTQuNSAxNS43NSA3LjUtNy41IDcuNSA3LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgdXNlT3V0c2lkZUNsaWNrID0gKFxuICByZWZzOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+IHwgQXJyYXk8UmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50Pj4sXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWRcbikgPT4ge1xuICBjb25zdCBsaXN0ID0gdXNlTWVtbygoKSA9PiAoQXJyYXkuaXNBcnJheShyZWZzKSA/IHJlZnMgOiBbcmVmc10pLCBbcmVmc10pO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKGxpc3QpO1xuICBjb25zdCBvbkNsb3NlUmVmID0gdXNlUmVmKG9uQ2xvc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGlzdFJlZi5jdXJyZW50ID0gbGlzdDtcbiAgfSwgW2xpc3RdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2xvc2VSZWYuY3VycmVudCA9IG9uQ2xvc2U7XG4gIH0sIFtvbkNsb3NlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVyID0gKGV2OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudExpc3QgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBpc0luc2lkZSA9IGN1cnJlbnRMaXN0LnNvbWUoKHIpID0+IHI/LmN1cnJlbnQgJiYgci5jdXJyZW50LmNvbnRhaW5zKGV2LnRhcmdldCBhcyBOb2RlKSk7XG4gICAgICBpZiAoaXNJbnNpZGUpIHJldHVybjtcbiAgICAgIG9uQ2xvc2VSZWYuY3VycmVudCgpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlcik7XG4gICAgfTtcbiAgfSwgW10pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFVBQVUsTUFBOEI7QUFDNUMsU0FBUSxPQUFPLGVBQWUsZUFBZSxXQUFXLGdCQUFpQixDQUFDO0FBQzVFO0FBRU8sSUFBTSxPQUFPLENBQUMsS0FBYSxhQUE4QjtBQUM5RCxRQUFNLE9BQU8sUUFBUTtBQUNyQixRQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3RCLE1BQUksT0FBTyxVQUFVLFlBQVksTUFBTSxLQUFLLEVBQUcsUUFBTztBQUN0RCxTQUFPLFlBQVk7QUFDckI7QUFFTyxJQUFNLFlBQVksQ0FBQyxLQUFhLGFBQWlDLFNBQWlDO0FBQ3ZHLFFBQU0sV0FBVyxLQUFLLEtBQUssUUFBUTtBQUNuQyxTQUFPLE9BQU8sUUFBUSxFQUFFLFFBQVEsY0FBYyxDQUFDLEdBQUcsUUFBUSxPQUFPLEtBQUssT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDM0Y7OztBQ1pPLElBQU0sZ0JBQWdCO0FBQUEsRUFDM0IsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsWUFBWTtBQUNkO0FBSUEsSUFBTSxvQkFBb0IsTUFBTTtBQUM5QixTQUFRLE9BQU8sZUFBZSxlQUFlLFdBQVcsMkJBQTRCLENBQUM7QUFDdkY7QUFFTyxJQUFNLGtCQUFrQixDQUFDLFNBQXlCO0FBQ3ZELFFBQU0sU0FBVSxPQUFPLGVBQWUsZUFBZSxXQUFXLHlCQUEwQixDQUFDO0FBQzNGLFFBQU0sUUFBUSxPQUFPLElBQTJCO0FBQ2hELFNBQU8sT0FBTyxTQUFTLENBQUM7QUFDMUI7QUFFTyxJQUFNLFlBQVksQ0FBQyxNQUFjLFFBQXFCLFdBQW9CO0FBQy9FLFNBQU8sZ0JBQWdCLElBQUksS0FBSyxjQUFjLEtBQUs7QUFDckQ7QUFFTyxJQUFNLHNCQUFzQixDQUFDLFNBQW1DO0FBQ3JFLE1BQUksT0FBTyxXQUFXLGVBQWUsT0FBTyxLQUFLLHFCQUFxQjtBQUNwRSxXQUFPLElBQUksb0JBQW9CLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDO0FBQUEsRUFDRjtBQUNBLFFBQU0sT0FBTyxrQkFBa0I7QUFDL0IsUUFBTSxXQUFXLEtBQUssV0FBVyxLQUFLLDhCQUE4QiwrQ0FBK0M7QUFDbkgsUUFBTSxRQUFRO0FBQ2hCOzs7QUNqQ08sSUFBTSxhQUFhLElBQUksWUFDNUIsUUFBUSxPQUFPLE9BQU8sRUFBRSxLQUFLLEdBQUc7OztBQ1M5QjtBQUZKLElBQU0sVUFBVSxDQUFDLEVBQUUsT0FBTyxXQUFXLE1BQU0sTUFDekMsNENBQUMsU0FBSSxXQUFXLGVBQWUsSUFBSSxJQUFJLFNBQVEsYUFBWSxNQUFLLFVBQVMsY0FBWSxTQUFTLEtBQUssa0JBQWtCLFNBQVMsR0FDNUgsc0RBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFHRixJQUFPLGtCQUFROzs7QUNKUixJQUFNLGdCQUFOLGNBQTRCLE1BQU07QUFBQSxFQUl2QyxZQUFZLFNBQWlCLFFBQWlCLGNBQXVCO0FBQ25FLFVBQU0sT0FBTztBQUNiLFNBQUssT0FBTztBQUNaLFNBQUssU0FBUztBQUNkLFNBQUssZUFBZTtBQUFBLEVBQ3RCO0FBQ0Y7QUFFQSxJQUFNQSxxQkFBb0IsTUFBc0I7QUFDOUMsU0FBUSxPQUFPLFdBQVcsZUFBZSxPQUFPLDJCQUE0QixDQUFDO0FBQy9FO0FBRUEsSUFBTUMsV0FBVSxNQUE4QjtBQUM1QyxTQUFRLE9BQU8sZUFBZSxlQUFlLFdBQVcsZ0JBQWlCLENBQUM7QUFDNUU7QUFFQSxJQUFNQyxRQUFPLENBQUMsS0FBYSxhQUE4QjtBQUN2RCxRQUFNLE9BQU9ELFNBQVE7QUFDckIsUUFBTSxRQUFRLEtBQUssR0FBRztBQUN0QixNQUFJLE9BQU8sVUFBVSxZQUFZLE1BQU0sS0FBSyxFQUFHLFFBQU87QUFDdEQsU0FBTyxZQUFZO0FBQ3JCO0FBRUEsSUFBTUUsdUJBQXNCLENBQUMsU0FBbUM7QUFDOUQsTUFBSSxPQUFPLFdBQVcsZUFBZSxPQUFPLEtBQUsscUJBQXFCO0FBQ3BFLFdBQU8sSUFBSSxvQkFBb0IsUUFBUSxDQUFDLENBQUM7QUFDekM7QUFBQSxFQUNGO0FBQ0EsUUFBTSxPQUFPSCxtQkFBa0I7QUFDL0IsUUFBTSxXQUFXLEtBQUssV0FBV0UsTUFBSyw4QkFBOEIsK0NBQStDO0FBQ25ILFFBQU0sUUFBUTtBQUNoQjtBQUVPLElBQU0sZUFBZSxNQUFjO0FBQ3hDLFFBQU0sT0FBTyxTQUFTLGNBQWMseUJBQXlCO0FBQzdELFNBQU8sT0FBTyxLQUFLLGFBQWEsU0FBUyxLQUFLLEtBQUs7QUFDckQ7QUFFQSxJQUFNLGVBQWUsQ0FBQyxRQUE0QjtBQUNoRCxNQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFHLFFBQU87QUFDaEMsTUFBSTtBQUNGLFdBQU8sS0FBSyxNQUFNLEdBQUc7QUFBQSxFQUN2QixRQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVBLElBQU0sd0JBQXdCLENBQUMsWUFBeUI7QUFDdEQsUUFBTSxVQUFVLFNBQVM7QUFDekIsU0FBTyxPQUFPLFlBQVksWUFBWSxRQUFRLEtBQUssSUFBSSxVQUFVO0FBQ25FO0FBRUEsZUFBc0IsVUFBbUIsS0FBYSxTQUF1QztBQUMzRixRQUFNLEVBQUUseUJBQXlCLEdBQUcsYUFBYSxJQUFJLFdBQVcsQ0FBQztBQUNqRSxRQUFNLFlBQVksYUFBYTtBQUUvQixRQUFNLFVBQXVCO0FBQUEsSUFDM0IsUUFBUTtBQUFBLElBQ1IsR0FBSSxhQUFhLFdBQVcsQ0FBQztBQUFBLEVBQy9CO0FBRUEsTUFBSSxXQUFXO0FBQ2IsSUFBQyxRQUFtQywwQkFBMEIsSUFBSTtBQUFBLEVBQ3BFO0FBRUEsUUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLO0FBQUEsSUFDaEMsYUFBYTtBQUFBLElBQ2IsR0FBRztBQUFBLElBQ0g7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLE1BQU0sTUFBTSxTQUFTLEtBQUs7QUFDaEMsUUFBTSxVQUFVLGFBQWEsR0FBRztBQUVoQyxNQUFJLENBQUMsU0FBUyxJQUFJO0FBQ2hCLFFBQUksU0FBUyxXQUFXLEtBQUs7QUFDM0IsVUFBSSxDQUFDLHdCQUF5QixDQUFBQyxxQkFBb0I7QUFDbEQsWUFBTSxJQUFJO0FBQUEsUUFDUkQsTUFBSyw4QkFBOEIsK0NBQStDO0FBQUEsUUFDbEYsU0FBUztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFVBQU0saUJBQWlCLHNCQUFzQixPQUFPO0FBQ3BELFFBQUksZ0JBQWdCO0FBQ2xCLFlBQU0sSUFBSSxjQUFjLGdCQUFnQixTQUFTLFFBQVEsR0FBRztBQUFBLElBQzlEO0FBRUEsVUFBTSxJQUFJLGNBQWNBLE1BQUsscUJBQXFCLG1DQUFtQyxHQUFHLFNBQVMsUUFBUSxHQUFHO0FBQUEsRUFDOUc7QUFFQSxNQUFJLENBQUMsSUFBSSxLQUFLLEdBQUc7QUFDZixXQUFPLENBQUM7QUFBQSxFQUNWO0FBRUEsTUFBSSxZQUFZLE1BQU07QUFDcEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLElBQUksY0FBY0EsTUFBSyxtQkFBbUIsMEJBQTBCLEdBQUcsU0FBUyxRQUFRLEdBQUc7QUFDbkc7OztBQ25ITyxJQUFNLHFCQUFxQjtBQUMzQixJQUFNLDBCQUEwQjtBQUVoQyxJQUFNLFlBQVksQ0FBQyxVQUFrQixzQkFBc0IsS0FBSyxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUUxRixJQUFNLHdCQUF3QixNQUFlO0FBQ2xELE1BQUk7QUFDRixVQUFNLE1BQU0sZUFBZSxRQUFRLGtCQUFrQjtBQUNyRCxRQUFJLENBQUMsSUFBSyxRQUFPO0FBQ2pCLFVBQU0sU0FBUyxLQUFLLE1BQU0sR0FBRztBQUM3QixXQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sWUFBWSxPQUFPO0FBQUEsRUFDaEQsUUFBUTtBQUNOLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFFTyxJQUFNLG9CQUFvQixNQUFZO0FBQzNDLE1BQUk7QUFDRixtQkFBZSxRQUFRLHlCQUF5QixHQUFHO0FBQUEsRUFDckQsUUFBUTtBQUFBLEVBRVI7QUFDRjtBQUVPLElBQU0sMEJBQTBCLENBQUMsU0FBaUIsUUFBUSxVQUFnQjtBQUMvRSxRQUFNLFFBQVEsT0FBTyxXQUFXLEVBQUUsRUFBRSxLQUFLO0FBQ3pDLE1BQUksQ0FBQyxVQUFVLEtBQUssR0FBRztBQUNyQixRQUFJLHNCQUFzQixFQUFHLG1CQUFrQjtBQUMvQztBQUFBLEVBQ0Y7QUFDQSxNQUFJO0FBRUYsUUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUc7QUFDckMscUJBQWUsUUFBUSxvQkFBb0IsS0FBSyxVQUFVLEVBQUUsVUFBVSxPQUFPLFFBQVEsTUFBTSxDQUFDLENBQUM7QUFBQSxJQUMvRjtBQUFBLEVBQ0YsUUFBUTtBQUFBLEVBRVI7QUFDQSxvQkFBa0I7QUFDcEI7QUFFQSxJQUFJLHNCQUFxQztBQUV6QyxJQUFNLHFCQUFxQixPQUFPO0FBQUEsRUFDaEMsTUFBTSxTQUFTLGVBQWUsZUFBZTtBQUFBLEVBQzdDLE1BQU0sU0FBUyxlQUFlLG1CQUFtQjtBQUFBLEVBQ2pELE9BQU8sU0FBUyxlQUFlLGNBQWM7QUFBQSxFQUM3QyxNQUFNLFNBQVMsZUFBZSxnQkFBZ0I7QUFBQSxFQUM5QyxPQUFPLFNBQVMsZUFBZSxjQUFjO0FBQy9DO0FBRUEsSUFBTSxrQkFBa0IsQ0FBQyxVQUFpRDtBQUN4RSxNQUFJLENBQUMsTUFBTSxLQUFNO0FBQ2pCLFFBQU0sS0FBSyxVQUFVLE9BQU8sb0JBQW9CLGlCQUFpQixnQkFBZ0I7QUFDakYsUUFBTSxLQUFLLFVBQVUsT0FBTyw0Q0FBNEM7QUFDeEUsTUFBSSxNQUFNLE1BQU8sT0FBTSxNQUFNLFVBQVUsSUFBSSxRQUFRO0FBQ25ELE1BQUksTUFBTSxLQUFNLE9BQU0sS0FBSyxVQUFVLElBQUksUUFBUTtBQUNqRCxNQUFJLE1BQU0sTUFBTyxPQUFNLE1BQU0sVUFBVSxJQUFJLFFBQVE7QUFDckQ7QUFFQSxJQUFNLGlCQUFpQixDQUFDLFVBQWlEO0FBQ3ZFLE1BQUksQ0FBQyxNQUFNLEtBQU07QUFDakIsUUFBTSxLQUFLLFVBQVUsSUFBSSxRQUFRO0FBQ2pDLFFBQU0sS0FBSyxhQUFhLGVBQWUsTUFBTTtBQUM3QyxrQkFBZ0IsS0FBSztBQUN2QjtBQUVBLElBQU0sdUJBQXVCLENBQUMsTUFBYyxlQUF1QjtBQUNqRSxRQUFNLFFBQVEsbUJBQW1CO0FBQ2pDLE1BQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxNQUFNLFNBQVMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxNQUFNLE9BQU87QUFDN0U7QUFBQSxFQUNGO0FBRUEsTUFBSSxxQkFBcUI7QUFDdkIsV0FBTyxhQUFhLG1CQUFtQjtBQUN2QywwQkFBc0I7QUFBQSxFQUN4QjtBQUVBLGtCQUFnQixLQUFLO0FBRXJCLE1BQUksT0FBTyxNQUFNO0FBQ2pCLE1BQUksYUFBYTtBQUVqQixVQUFRLE1BQU07QUFBQSxJQUNaLEtBQUs7QUFDSCxhQUFPLE1BQU07QUFDYixtQkFBYTtBQUNiO0FBQUEsSUFDRixLQUFLO0FBQ0gsYUFBTyxNQUFNO0FBQ2IsbUJBQWE7QUFDYjtBQUFBLElBQ0YsS0FBSztBQUNILGFBQU8sTUFBTTtBQUNiLG1CQUFhO0FBQ2I7QUFBQSxJQUNGLEtBQUs7QUFDSCxhQUFPLE1BQU07QUFDYixtQkFBYTtBQUNiO0FBQUEsSUFDRjtBQUNFLGFBQU8sTUFBTTtBQUNiLG1CQUFhO0FBQ2I7QUFBQSxFQUNKO0FBRUEsUUFBTSxLQUFLLFVBQVUsSUFBSSxVQUFVO0FBQ25DLFFBQU0sS0FBSyxVQUFVLElBQUksNENBQTRDO0FBQ3JFLE9BQUssVUFBVSxPQUFPLFFBQVE7QUFDOUIsUUFBTSxLQUFLLFVBQVUsT0FBTyxRQUFRO0FBQ3BDLFFBQU0sS0FBSyxhQUFhLGVBQWUsT0FBTztBQUM5QyxRQUFNLEtBQUssTUFBTSxZQUFZLFdBQVcsUUFBUSxXQUFXO0FBQzNELFFBQU0sS0FBSyxNQUFNLFlBQVksV0FBVyxLQUFLLFdBQVc7QUFDeEQsUUFBTSxLQUFLLE1BQU0sWUFBWSxjQUFjLFdBQVcsV0FBVztBQUVqRSxNQUFJLGFBQWEsR0FBRztBQUNsQiwwQkFBc0IsT0FBTyxXQUFXLE1BQU07QUFDNUMsWUFBTSxLQUFLLE1BQU0sZUFBZSxTQUFTO0FBQ3pDLFlBQU0sS0FBSyxNQUFNLGVBQWUsU0FBUztBQUN6QyxZQUFNLEtBQUssTUFBTSxlQUFlLFlBQVk7QUFDNUMscUJBQWUsS0FBSztBQUFBLElBQ3RCLEdBQUcsVUFBVTtBQUFBLEVBQ2Y7QUFDRjtBQUVPLElBQU0sa0JBQWtCLENBQUMsTUFBYyxlQUF1QjtBQUNuRSxNQUFJO0FBQ0YsUUFBSSxPQUFPLE9BQU8sT0FBTyxPQUFPLElBQUksb0JBQW9CLFlBQVk7QUFDbEUsYUFBTyxJQUFJLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9DO0FBQUEsSUFDRjtBQUFBLEVBQ0YsUUFBUTtBQUFBLEVBRVI7QUFFQSxNQUFJO0FBQ0YseUJBQXFCLE1BQU0sVUFBVTtBQUFBLEVBQ3ZDLFFBQVE7QUFBQSxFQUVSO0FBQ0Y7OztBQzNJQSx1QkFBNkI7OztBQ0Q3QixtQkFBMEM7QUFFbkMsSUFBTSxzQkFBc0IsQ0FBQyxXQUF5QyxTQUFrQjtBQUM3RixRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksdUJBQVMsRUFBRSxLQUFLLEdBQUcsTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBRWhFLG9DQUFnQixNQUFNO0FBQ3BCLFFBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxRQUFTO0FBQ2pDLFVBQU0sU0FBUyxNQUFNO0FBQ25CLFlBQU0sT0FBTyxVQUFVLFNBQVMsc0JBQXNCO0FBQ3RELFVBQUksQ0FBQyxLQUFNO0FBQ1gsZUFBUztBQUFBLFFBQ1AsS0FBSyxLQUFLLFNBQVM7QUFBQSxRQUNuQixNQUFNLEtBQUs7QUFBQSxRQUNYLE9BQU8sS0FBSztBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0g7QUFDQSxXQUFPO0FBQ1AsVUFBTSxXQUFXLE1BQU0sUUFBUSxPQUFPO0FBQ3RDLFdBQU8saUJBQWlCLFVBQVUsVUFBVSxFQUFFLFNBQVMsTUFBTSxTQUFTLEtBQUssQ0FBQztBQUM1RSxXQUFPLGlCQUFpQixVQUFVLE1BQU07QUFDeEMsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsVUFBVSxVQUFVLElBQUk7QUFDbkQsYUFBTyxvQkFBb0IsVUFBVSxNQUFNO0FBQUEsSUFDN0M7QUFBQSxFQUNGLEdBQUcsQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUVwQixTQUFPO0FBQ1Q7OztBRGFNLElBQUFFLHNCQUFBO0FBeEJOLElBQU0sZUFBZSxDQUFDO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQSxTQUFTO0FBQUEsRUFDVCxpQkFBaUI7QUFBQSxFQUNqQixlQUFlO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQWE7QUFDWCxRQUFNLFFBQVEsb0JBQW9CLFdBQVcsSUFBSTtBQUNqRCxNQUFJLENBQUMsS0FBTSxRQUFPO0FBQ2xCLGFBQU87QUFBQSxJQUNMO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFDVixLQUFLLE1BQU07QUFBQSxVQUNYLE1BQU0sTUFBTTtBQUFBLFVBQ1osT0FBTyxNQUFNO0FBQUEsVUFDYjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFdBQVc7QUFBQSxRQUVYO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQztBQUFBLFlBQ0EsV0FBVyx3QkFBd0IsWUFBWSw2RUFBNkUsY0FBYyxJQUFJLGtCQUFrQixFQUFFO0FBQUEsWUFFaks7QUFBQTtBQUFBLFFBQ0g7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxFQUNYO0FBQ0Y7QUFFQSxJQUFPLHVCQUFROzs7QUV0Q1QsSUFBQUMsc0JBQUE7QUFYQyxJQUFNLGlCQUFpQixDQUFDLEVBQUUsWUFBWSxVQUFVLE1BQU07QUFDM0QsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTTtBQUFBLE1BQ04sTUFBSztBQUFBLE1BQ0wsU0FBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLE1BQ2IsUUFBTztBQUFBLE1BQ1A7QUFBQSxNQUNBLGVBQVk7QUFBQSxNQUVaLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSw4QkFBNkI7QUFBQTtBQUFBLEVBQ3BGO0FBRUo7QUFFTyxJQUFNLGVBQWUsQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUFNO0FBQ3pELFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLE9BQU07QUFBQSxNQUNOLE1BQUs7QUFBQSxNQUNMLFNBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLFFBQU87QUFBQSxNQUNQO0FBQUEsTUFDQSxlQUFZO0FBQUEsTUFFWix1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsOEJBQTZCO0FBQUE7QUFBQSxFQUNwRjtBQUVKOzs7QUNoQ0EsSUFBQUMsZ0JBQTJDO0FBRXBDLElBQU0sa0JBQWtCLENBQzdCLE1BQ0EsWUFDRztBQUNILFFBQU0sV0FBTyx1QkFBUSxNQUFPLE1BQU0sUUFBUSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksR0FBSSxDQUFDLElBQUksQ0FBQztBQUN4RSxRQUFNLGNBQVUsc0JBQU8sSUFBSTtBQUMzQixRQUFNLGlCQUFhLHNCQUFPLE9BQU87QUFFakMsK0JBQVUsTUFBTTtBQUNkLFlBQVEsVUFBVTtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFFVCwrQkFBVSxNQUFNO0FBQ2QsZUFBVyxVQUFVO0FBQUEsRUFDdkIsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUVaLCtCQUFVLE1BQU07QUFDZCxVQUFNLFVBQVUsQ0FBQyxPQUFnQztBQUMvQyxZQUFNLGNBQWMsUUFBUTtBQUM1QixZQUFNLFdBQVcsWUFBWSxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsRUFBRSxRQUFRLFNBQVMsR0FBRyxNQUFjLENBQUM7QUFDNUYsVUFBSSxTQUFVO0FBQ2QsaUJBQVcsUUFBUTtBQUFBLElBQ3JCO0FBRUEsYUFBUyxpQkFBaUIsYUFBYSxPQUFPO0FBQzlDLGFBQVMsaUJBQWlCLGNBQWMsU0FBUyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBRWxFLFdBQU8sTUFBTTtBQUNYLGVBQVMsb0JBQW9CLGFBQWEsT0FBTztBQUNqRCxlQUFTLG9CQUFvQixjQUFjLE9BQU87QUFBQSxJQUNwRDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFDUDsiLAogICJuYW1lcyI6IFsiZ2V0UGVybWlzc2lvbkkxOG4iLCAiZ2V0STE4biIsICJpbmRUIiwgInNob3dQZXJtaXNzaW9uTW9kYWwiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiXQp9Cg==
