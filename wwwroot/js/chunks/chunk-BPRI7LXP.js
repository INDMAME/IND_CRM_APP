import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-RGGEM6AY.js";
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

// Web/wwwroot/react/src/utils/classNames.ts
var classNames = (...classes) => classes.filter(Boolean).join(" ");

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

// Web/wwwroot/react/src/components/commons/Spinner.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Spinner = ({ size = "h-4 w-4", label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: `ind-spinner ${size}`, viewBox: "0 0 20 20", role: "status", "aria-label": label || indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) });
var Spinner_default = Spinner;

// Web/wwwroot/react/src/components/commons/chevrons.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ChevronDownSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" })
    }
  );
};
var ChevronUpSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" })
    }
  );
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
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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

// Web/wwwroot/react/src/services/apiService.ts
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
  const text = await response.text();
  if (!response.ok) {
    if (response.status === 403) {
      if (!suppressPermissionModal) showPermissionModal2();
      throw new Error(indT2("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."));
    }
    try {
      const json = JSON.parse(text);
      const msg = json?.message;
      if (typeof msg === "string" && msg.trim()) {
        throw new Error(msg);
      }
    } catch {
    }
    throw new Error(indT2("Api_RequestFailed", "Request failed. Please try again."));
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(indT2("Api_InvalidJson", "Invalid server response."));
  }
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

export {
  indT,
  indFormat,
  Spinner_default,
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick,
  classNames,
  getCsrfToken,
  fetchJson,
  canAccess,
  showPermissionModal,
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY,
  setHistoryFilterForDate,
  flashActionMark
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2NsYXNzTmFtZXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Blcm1pc3Npb25zLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9jaGV2cm9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL2FwaVNlcnZpY2UudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBnZXRJMThuID0gKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRUID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRpY3QgPSBnZXRJMThuKCk7XG4gIGNvbnN0IHZhbHVlID0gZGljdFtrZXldO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gZmFsbGJhY2sgfHwga2V5O1xufTtcblxuZXhwb3J0IGNvbnN0IGluZEZvcm1hdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZSA9IGluZFQoa2V5LCBmYWxsYmFjayk7XG4gIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xufTtcbiIsICJleHBvcnQgY29uc3QgY2xhc3NOYW1lcyA9ICguLi5jbGFzc2VzOiBBcnJheTxzdHJpbmcgfCBmYWxzZSB8IG51bGwgfCB1bmRlZmluZWQ+KSA9PlxuICBjbGFzc2VzLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4vaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgY29uc3QgQUNDRVNTX1JJR0hUUyA9IHtcbiAgVmlldzogMSxcbiAgRWRpdDogMixcbiAgQWRkOiAzLFxuICBGdWxsQWNjZXNzOiA0LFxufSBhcyBjb25zdDtcblxuZXhwb3J0IHR5cGUgQWNjZXNzUmlnaHQgPSBrZXlvZiB0eXBlb2YgQUNDRVNTX1JJR0hUUztcblxuY29uc3QgZ2V0UGVybWlzc2lvbkkxOG4gPSAoKSA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9QRVJNSVNTSU9OX0kxOE5fXykgfHwge307XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TW9kdWxlQWNjZXNzID0gKGNvZGU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gIGNvbnN0IGFjY2VzcyA9ICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWxUaGlzLl9fSU5EX01PRFVMRV9BQ0NFU1NfXykgfHwge307XG4gIGNvbnN0IHZhbHVlID0gYWNjZXNzW2NvZGUgYXMga2V5b2YgdHlwZW9mIGFjY2Vzc107XG4gIHJldHVybiBOdW1iZXIodmFsdWUgPz8gMCk7XG59O1xuXG5leHBvcnQgY29uc3QgY2FuQWNjZXNzID0gKGNvZGU6IHN0cmluZywgbGV2ZWw6IEFjY2Vzc1JpZ2h0ID0gXCJWaWV3XCIpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGdldE1vZHVsZUFjY2Vzcyhjb2RlKSA+PSBBQ0NFU1NfUklHSFRTW2xldmVsXTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaG93UGVybWlzc2lvbk1vZGFsID0gKG9wdHM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuSU5EPy5zaG93UGVybWlzc2lvbk1vZGFsKSB7XG4gICAgd2luZG93LklORC5zaG93UGVybWlzc2lvbk1vZGFsKG9wdHMgfHwge30pO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwZXJtID0gZ2V0UGVybWlzc2lvbkkxOG4oKTtcbiAgY29uc3QgZmFsbGJhY2sgPSBwZXJtLm1lc3NhZ2UgfHwgaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gdGllbmVzIHBlcm1pc29zIHBhcmEgcmVhbGl6YXIgZXN0YSBhY2Npb24uXCIpO1xuICBhbGVydChmYWxsYmFjayk7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBzaXplPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbn07XG5cbmNvbnN0IFNwaW5uZXIgPSAoeyBzaXplID0gXCJoLTQgdy00XCIsIGxhYmVsIH06IFByb3BzKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtgaW5kLXNwaW5uZXIgJHtzaXplfWB9IHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17bGFiZWwgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcjtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvbkRvd25TdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xOS41IDguMjUtNy41IDcuNS03LjUtNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvblVwU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNC41IDE1Ljc1IDcuNS03LjUgNy41IDcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBhbmNob3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD47XG4gIG9wZW46IGJvb2xlYW47XG4gIHpJbmRleD86IG51bWJlcjtcbiAgbWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XG4gIHJvdW5kZWRDbGFzcz86IHN0cmluZztcbiAgcm9sZT86IHN0cmluZztcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XG4gIGFuY2hvclJlZixcbiAgb3BlbixcbiAgekluZGV4ID0gMzAwMDAwLFxuICBtYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcbiAgcm91bmRlZENsYXNzID0gXCJyb3VuZGVkLW1kXCIsXG4gIHJvbGUsXG4gIHBvcnRhbENsYXNzTmFtZSxcbiAgcGFuZWxDbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB1c2VGbG9hdGluZ1Bvc2l0aW9uKGFuY2hvclJlZiwgb3Blbik7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgdG9wOiBzdHlsZS50b3AsXG4gICAgICAgIGxlZnQ6IHN0eWxlLmxlZnQsXG4gICAgICAgIHdpZHRoOiBzdHlsZS53aWR0aCxcbiAgICAgICAgekluZGV4LFxuICAgICAgfX1cbiAgICAgIGNsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgcm9sZT17cm9sZX1cbiAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG92ZXJmbG93LWF1dG8gJHtyb3VuZGVkQ2xhc3N9IGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke21heEhlaWdodENsYXNzfSAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmJvZHlcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nTGlzdDtcbiIsICJpbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ1Bvc2l0aW9uID0gKHRhcmdldFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50Piwgb3BlbjogYm9vbGVhbikgPT4ge1xuICBjb25zdCBbc3R5bGUsIHNldFN0eWxlXSA9IHVzZVN0YXRlKHsgdG9wOiAwLCBsZWZ0OiAwLCB3aWR0aDogMCB9KTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhdGFyZ2V0UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gdGFyZ2V0UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKCFyZWN0KSByZXR1cm47XG4gICAgICBzZXRTdHlsZSh7XG4gICAgICAgIHRvcDogcmVjdC5ib3R0b20gKyA2LFxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB1cGRhdGUoKTtcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IG9wZW4gJiYgdXBkYXRlKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGUpO1xuICAgIH07XG4gIH0sIFtvcGVuLCB0YXJnZXRSZWZdKTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCB1c2VPdXRzaWRlQ2xpY2sgPSAoXG4gIHJlZnM6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4gfCBBcnJheTxSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+PixcbiAgb25DbG9zZTogKCkgPT4gdm9pZFxuKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSB1c2VNZW1vKCgpID0+IChBcnJheS5pc0FycmF5KHJlZnMpID8gcmVmcyA6IFtyZWZzXSksIFtyZWZzXSk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWYobGlzdCk7XG4gIGNvbnN0IG9uQ2xvc2VSZWYgPSB1c2VSZWYob25DbG9zZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsaXN0UmVmLmN1cnJlbnQgPSBsaXN0O1xuICB9LCBbbGlzdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DbG9zZVJlZi5jdXJyZW50ID0gb25DbG9zZTtcbiAgfSwgW29uQ2xvc2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSAoZXY6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGlzSW5zaWRlID0gY3VycmVudExpc3Quc29tZSgocikgPT4gcj8uY3VycmVudCAmJiByLmN1cnJlbnQuY29udGFpbnMoZXYudGFyZ2V0IGFzIE5vZGUpKTtcbiAgICAgIGlmIChpc0luc2lkZSkgcmV0dXJuO1xuICAgICAgb25DbG9zZVJlZi5jdXJyZW50KCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyKTtcbiAgICB9O1xuICB9LCBbXSk7XG59O1xuIiwgInR5cGUgUGVybWlzc2lvbkkxOG4gPSB7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICBvaz86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEFwaUZldGNoT3B0aW9ucyA9IFJlcXVlc3RJbml0ICYge1xuICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBnZXRQZXJtaXNzaW9uSTE4biA9ICgpOiBQZXJtaXNzaW9uSTE4biA9PiB7XG4gIHJldHVybiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuX19JTkRfUEVSTUlTU0lPTl9JMThOX18pIHx8IHt9O1xufTtcblxuY29uc3QgZ2V0STE4biA9ICgpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcbiAgcmV0dXJuICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXykgfHwge307XG59O1xuXG5jb25zdCBpbmRUID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRpY3QgPSBnZXRJMThuKCk7XG4gIGNvbnN0IHZhbHVlID0gZGljdFtrZXldO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gZmFsbGJhY2sgfHwga2V5O1xufTtcblxuY29uc3Qgc2hvd1Blcm1pc3Npb25Nb2RhbCA9IChvcHRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LklORD8uc2hvd1Blcm1pc3Npb25Nb2RhbCkge1xuICAgIHdpbmRvdy5JTkQuc2hvd1Blcm1pc3Npb25Nb2RhbChvcHRzIHx8IHt9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGVybSA9IGdldFBlcm1pc3Npb25JMThuKCk7XG4gIGNvbnN0IGZhbGxiYWNrID0gcGVybS5tZXNzYWdlIHx8IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGVzdGEgYWNjaW9uLlwiKTtcbiAgYWxlcnQoZmFsbGJhY2spO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENzcmZUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpO1xuICByZXR1cm4gbWV0YSA/IG1ldGEuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKSB8fCBcIlwiIDogXCJcIjtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEpzb248VCA9IGFueT4odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgeyBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcblxuICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHtcbiAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIC4uLihmZXRjaE9wdGlvbnMuaGVhZGVycyB8fCB7fSksXG4gIH07XG5cbiAgaWYgKGNzcmZUb2tlbikge1xuICAgIChoZWFkZXJzIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4pW1wiUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuXCJdID0gY3NyZlRva2VuO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICBoZWFkZXJzLFxuICB9KTtcblxuICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgIGlmICghc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwpIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyB0aWVuZXMgcGVybWlzb3MgcGFyYSByZWFsaXphciBlc3RhIGFjY2lvbi5cIikpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIGNvbnN0IG1zZyA9IGpzb24/Lm1lc3NhZ2U7XG4gICAgICBpZiAodHlwZW9mIG1zZyA9PT0gXCJzdHJpbmdcIiAmJiBtc2cudHJpbSgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gaWdub3JlIHBhcnNlIGVycm9yc1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIikpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh0ZXh0KSBhcyBUO1xuICB9IGNhdGNoIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkFwaV9JbnZhbGlkSnNvblwiLCBcIkludmFsaWQgc2VydmVyIHJlc3BvbnNlLlwiKSk7XG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgSElTVE9SWV9GSUxURVJfS0VZID0gXCJ2aXNpdGFzX2hpc3RvcnlfZmlsdGVyX3YxXCI7XG5leHBvcnQgY29uc3QgSElTVE9SWV9SRVRVUk5fRkxBR19LRVkgPSBcInZpc2l0YXNfaGlzdG9yeV9yZXR1cm5fdjFcIjtcblxuZXhwb3J0IGNvbnN0IGlzSXNvRGF0ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpKTtcblxuZXhwb3J0IGNvbnN0IGhhc0hpc3RvcnlGaWx0ZXJSYW5nZSA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKEhJU1RPUllfRklMVEVSX0tFWSk7XG4gICAgaWYgKCFyYXcpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7XG4gICAgcmV0dXJuICEhKHBhcnNlZCAmJiBwYXJzZWQuZnJvbURhdGUgJiYgcGFyc2VkLnRvRGF0ZSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1hcmtIaXN0b3J5UmV0dXJuID0gKCk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oSElTVE9SWV9SRVRVUk5fRkxBR19LRVksIFwiMVwiKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSA9IChpc29EYXRlOiBzdHJpbmcsIGZvcmNlID0gZmFsc2UpOiB2b2lkID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcoaXNvRGF0ZSB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghaXNJc29EYXRlKHZhbHVlKSkge1xuICAgIGlmIChoYXNIaXN0b3J5RmlsdGVyUmFuZ2UoKSkgbWFya0hpc3RvcnlSZXR1cm4oKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBXaGVuIGZvcmNlIGlzIHRydWUsIHJlcGxhY2UgYW55IGV4aXN0aW5nIGhpc3RvcnkgcmFuZ2UuXG4gICAgaWYgKGZvcmNlIHx8ICFoYXNIaXN0b3J5RmlsdGVyUmFuZ2UoKSkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShISVNUT1JZX0ZJTFRFUl9LRVksIEpTT04uc3RyaW5naWZ5KHsgZnJvbURhdGU6IHZhbHVlLCB0b0RhdGU6IHZhbHVlIH0pKTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG4gIG1hcmtIaXN0b3J5UmV0dXJuKCk7XG59O1xuXG5sZXQgYWN0aW9uTWFya0hpZGVUaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbmNvbnN0IGdldEFjdGlvbk1hcmtOb2RlcyA9ICgpID0+ICh7XG4gIHJvb3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kQWN0aW9uTWFya1wiKSxcbiAgd3JhcDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRBY3Rpb25NYXJrV3JhcFwiKSxcbiAgY2hlY2s6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kTWFya0NoZWNrXCIpLFxuICB3YXJuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZE1hcmtXYXJuaW5nXCIpLFxuICBlcnJvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRNYXJrRXJyb3JcIiksXG59KTtcblxuY29uc3QgcmVzZXRBY3Rpb25NYXJrID0gKG5vZGVzOiBSZXR1cm5UeXBlPHR5cGVvZiBnZXRBY3Rpb25NYXJrTm9kZXM+KSA9PiB7XG4gIGlmICghbm9kZXMud3JhcCkgcmV0dXJuO1xuICBub2Rlcy53cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJ0ZXh0LWVtZXJhbGQtNjAwXCIsIFwidGV4dC1yb3NlLTYwMFwiLCBcInRleHQtYW1iZXItNTAwXCIpO1xuICBub2Rlcy53cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wLXNoYWRvdy1bMF8xOHB4XzI0cHhfcmdiYSgwLDAsMCwwLjE1KV1cIik7XG4gIGlmIChub2Rlcy5jaGVjaykgbm9kZXMuY2hlY2suY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgaWYgKG5vZGVzLndhcm4pIG5vZGVzLndhcm4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgaWYgKG5vZGVzLmVycm9yKSBub2Rlcy5lcnJvci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufTtcblxuY29uc3QgaGlkZUFjdGlvbk1hcmsgPSAobm9kZXM6IFJldHVyblR5cGU8dHlwZW9mIGdldEFjdGlvbk1hcmtOb2Rlcz4pID0+IHtcbiAgaWYgKCFub2Rlcy5yb290KSByZXR1cm47XG4gIG5vZGVzLnJvb3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgbm9kZXMucm9vdC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gIHJlc2V0QWN0aW9uTWFyayhub2Rlcyk7XG59O1xuXG5jb25zdCBmbGFzaEFjdGlvbk1hcmtMb2NhbCA9ICh0eXBlOiBzdHJpbmcsIGR1cmF0aW9uTXM6IG51bWJlcikgPT4ge1xuICBjb25zdCBub2RlcyA9IGdldEFjdGlvbk1hcmtOb2RlcygpO1xuICBpZiAoIW5vZGVzLnJvb3QgfHwgIW5vZGVzLndyYXAgfHwgIW5vZGVzLmNoZWNrIHx8ICFub2Rlcy53YXJuIHx8ICFub2Rlcy5lcnJvcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChhY3Rpb25NYXJrSGlkZVRpbWVyKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChhY3Rpb25NYXJrSGlkZVRpbWVyKTtcbiAgICBhY3Rpb25NYXJrSGlkZVRpbWVyID0gbnVsbDtcbiAgfVxuXG4gIHJlc2V0QWN0aW9uTWFyayhub2Rlcyk7XG5cbiAgbGV0IGljb24gPSBub2Rlcy5jaGVjaztcbiAgbGV0IGNvbG9yQ2xhc3MgPSBcInRleHQtZW1lcmFsZC02MDBcIjtcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwib2tQcm9jZXNzXCI6XG4gICAgICBpY29uID0gbm9kZXMuY2hlY2s7XG4gICAgICBjb2xvckNsYXNzID0gXCJ0ZXh0LWVtZXJhbGQtNjAwXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwib2tEZWxQcm9jZXNzXCI6XG4gICAgICBpY29uID0gbm9kZXMuY2hlY2s7XG4gICAgICBjb2xvckNsYXNzID0gXCJ0ZXh0LXJvc2UtNjAwXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwid2FybmluZ1Byb2Nlc3NcIjpcbiAgICAgIGljb24gPSBub2Rlcy53YXJuO1xuICAgICAgY29sb3JDbGFzcyA9IFwidGV4dC1hbWJlci01MDBcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJlcnJvclByb2Nlc3NcIjpcbiAgICAgIGljb24gPSBub2Rlcy5lcnJvcjtcbiAgICAgIGNvbG9yQ2xhc3MgPSBcInRleHQtcm9zZS02MDBcIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpY29uID0gbm9kZXMuY2hlY2s7XG4gICAgICBjb2xvckNsYXNzID0gXCJ0ZXh0LWVtZXJhbGQtNjAwXCI7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIG5vZGVzLndyYXAuY2xhc3NMaXN0LmFkZChjb2xvckNsYXNzKTtcbiAgbm9kZXMud3JhcC5jbGFzc0xpc3QuYWRkKFwiZHJvcC1zaGFkb3ctWzBfMThweF8yNHB4X3JnYmEoMCwwLDAsMC4xNSldXCIpO1xuICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIG5vZGVzLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgbm9kZXMucm9vdC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuICBub2Rlcy5yb290LnN0eWxlLnNldFByb3BlcnR5KFwiZGlzcGxheVwiLCBcImZsZXhcIiwgXCJpbXBvcnRhbnRcIik7XG4gIG5vZGVzLnJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCJvcGFjaXR5XCIsIFwiMVwiLCBcImltcG9ydGFudFwiKTtcbiAgbm9kZXMucm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIsIFwiaW1wb3J0YW50XCIpO1xuXG4gIGlmIChkdXJhdGlvbk1zID4gMCkge1xuICAgIGFjdGlvbk1hcmtIaWRlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBub2Rlcy5yb290LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcbiAgICAgIG5vZGVzLnJvb3Quc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgICAgbm9kZXMucm9vdC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInZpc2liaWxpdHlcIik7XG4gICAgICBoaWRlQWN0aW9uTWFyayhub2Rlcyk7XG4gICAgfSwgZHVyYXRpb25Ncyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmbGFzaEFjdGlvbk1hcmsgPSAodHlwZTogc3RyaW5nLCBkdXJhdGlvbk1zOiBudW1iZXIpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAod2luZG93LklORCAmJiB0eXBlb2Ygd2luZG93LklORC5mbGFzaEFjdGlvbk1hcmsgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgd2luZG93LklORC5mbGFzaEFjdGlvbk1hcmsoeyB0eXBlLCBkdXJhdGlvbk1zIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cblxuICB0cnkge1xuICAgIGZsYXNoQWN0aW9uTWFya0xvY2FsKHR5cGUsIGR1cmF0aW9uTXMpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFVBQVUsTUFBOEI7QUFDNUMsU0FBUSxPQUFPLGVBQWUsZUFBZSxXQUFXLGdCQUFpQixDQUFDO0FBQzVFO0FBRU8sSUFBTSxPQUFPLENBQUMsS0FBYSxhQUE4QjtBQUM5RCxRQUFNLE9BQU8sUUFBUTtBQUNyQixRQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3RCLE1BQUksT0FBTyxVQUFVLFlBQVksTUFBTSxLQUFLLEVBQUcsUUFBTztBQUN0RCxTQUFPLFlBQVk7QUFDckI7QUFFTyxJQUFNLFlBQVksQ0FBQyxLQUFhLGFBQWlDLFNBQWlDO0FBQ3ZHLFFBQU0sV0FBVyxLQUFLLEtBQUssUUFBUTtB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Q3ZCLFdBQU8sYUFBYSxtQkFBbUI7QUFDdkMsMEJBQXNCO0FBQUEsRUFDeEI7QUFFQSxrQkFBZ0IsS0FBSztBQUVyQixNQUFJLE9BQU8sTUFBTTtBQUNqQixNQUFJLGFBQWE7QUFFakIsVUFBUSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0gsYUFBTyxNQUFNO0FBQ2IsbUJBQWE7QUFDYjtBQUFBLElBQ0YsS0FBSztBQUNILGFBQU8sTUFBTTtBQUNiLG1CQUFhO0FBQ2I7QUFBQSxJQUNGLEtBQUs7QUFDSCxhQUFPLE1BQU07QUFDYixtQkFBYTtBQUNiO0FBQUEsSUFDRixLQUFLO0FBQ0gsYUFBTyxNQUFNO0FBQ2IsbUJBQWE7QUFDYjtBQUFBLElBQ0Y7QUFDRSxhQUFPLE1BQU07QUFDYixtQkFBYTtBQUNiO0FBQUEsRUFDSjtBQUVBLFFBQU0sS0FBSyxVQUFVLElBQUksVUFBVTtBQUNuQyxRQUFNLEtBQUssVUFBVSxJQUFJLDRDQUE0QztBQUNyRSxPQUFLLFVBQVUsT0FBTyxRQUFRO0FBQzlCLFFBQU0sS0FBSyxVQUFVLE9BQU8sUUFBUTtBQUNwQyxRQUFNLEtBQUssYUFBYSxlQUFlLE9BQU87QUFDOUMsUUFBTSxLQUFLLE1BQU0sWUFBWSxXQUFXLFFBQVEsV0FBVztBQUMzRCxRQUFNLEtBQUssTUFBTSxZQUFZLFdBQVcsS0FBSyxXQUFXO0FBQ3hELFFBQU0sS0FBSyxNQUFNLFlBQVksY0FBYyxXQUFXLFdBQVc7QUFFakUsTUFBSSxhQUFhLEdBQUc7QUFDbEIsMEJBQXNCLE9BQU8sV0FBVyxNQUFNO0FBQzVDLFlBQU0sS0FBSyxNQUFNLGVBQWUsU0FBUztBQUN6QyxZQUFNLEtBQUssTUFBTSxlQUFlLFNBQVM7QUFDekMsWUFBTSxLQUFLLE1BQU0sZUFBZSxZQUFZO0FBQzVDLHFCQUFlLEtBQUs7QUFBQSxJQUN0QixHQUFHLFVBQVU7QUFBQSxFQUNmO0FBQ0Y7QUFFTyxJQUFNLGtCQUFrQixDQUFDLE1BQWMsZUFBdUI7QUFDbkUsTUFBSTtBQUNGLFFBQUksT0FBTyxPQUFPLE9BQU8sT0FBTyxJQUFJLG9CQUFvQixZQUFZO0FBQ2xFLGFBQU8sSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvQztBQUFBLElBQ0Y7QUFBQSxFQUNGLFFBQVE7QUFBQSxFQUVSO0FBRUEsTUFBSTtBQUNGLHlCQUFxQixNQUFNLFVBQVU7QUFBQSxFQUN2QyxRQUFRO0FBQUEsRUFFUjtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJnZXRQZXJtaXNzaW9uSTE4biIsICJnZXRJMThuIiwgImluZFQiLCAic2hvd1Blcm1pc3Npb25Nb2RhbCJdCn0K
