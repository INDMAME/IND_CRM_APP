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

// Web/wwwroot/react/src/services/apiService.ts
var getPermissionI18n = () => {
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
var showPermissionModal = (opts) => {
  if (typeof window !== "undefined" && window.IND?.showPermissionModal) {
    window.IND.showPermissionModal(opts || {});
    return;
  }
  const perm = getPermissionI18n();
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
      if (!suppressPermissionModal) showPermissionModal();
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

// Web/wwwroot/react/src/utils/permissions.ts
var ACCESS_RIGHTS = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4
};
var getPermissionI18n2 = () => {
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
var showPermissionModal2 = (opts) => {
  if (typeof window !== "undefined" && window.IND?.showPermissionModal) {
    window.IND.showPermissionModal(opts || {});
    return;
  }
  const perm = getPermissionI18n2();
  const fallback = perm.message || indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion.");
  alert(fallback);
};

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
  showPermissionModal2 as showPermissionModal,
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY,
  setHistoryFilterForDate,
  flashActionMark
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2NsYXNzTmFtZXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL2FwaVNlcnZpY2UudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Blcm1pc3Npb25zLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy92aXNpdGFzSGlzdG9yeS50cyIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdMaXN0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50cyIsICIuLi8uLi9yZWFjdC9zcmMvaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBnZXRJMThuID0gKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRUID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRpY3QgPSBnZXRJMThuKCk7XG4gIGNvbnN0IHZhbHVlID0gZGljdFtrZXldO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gZmFsbGJhY2sgfHwga2V5O1xufTtcblxuZXhwb3J0IGNvbnN0IGluZEZvcm1hdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZSA9IGluZFQoa2V5LCBmYWxsYmFjayk7XG4gIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xufTtcbiIsICJleHBvcnQgY29uc3QgY2xhc3NOYW1lcyA9ICguLi5jbGFzc2VzOiBBcnJheTxzdHJpbmcgfCBmYWxzZSB8IG51bGwgfCB1bmRlZmluZWQ+KSA9PlxuICBjbGFzc2VzLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiIsICJ0eXBlIFBlcm1pc3Npb25JMThuID0ge1xuICB0aXRsZT86IHN0cmluZztcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgb2s/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBBcGlGZXRjaE9wdGlvbnMgPSBSZXF1ZXN0SW5pdCAmIHtcbiAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw/OiBib29sZWFuO1xufTtcblxuY29uc3QgZ2V0UGVybWlzc2lvbkkxOG4gPSAoKTogUGVybWlzc2lvbkkxOG4gPT4ge1xuICByZXR1cm4gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Ll9fSU5EX1BFUk1JU1NJT05fSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9JMThOX18pIHx8IHt9O1xufTtcblxuY29uc3QgaW5kVCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkaWN0ID0gZ2V0STE4bigpO1xuICBjb25zdCB2YWx1ZSA9IGRpY3Rba2V5XTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50cmltKCkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbn07XG5cbmNvbnN0IHNob3dQZXJtaXNzaW9uTW9kYWwgPSAob3B0cz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5JTkQ/LnNob3dQZXJtaXNzaW9uTW9kYWwpIHtcbiAgICB3aW5kb3cuSU5ELnNob3dQZXJtaXNzaW9uTW9kYWwob3B0cyB8fCB7fSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBlcm0gPSBnZXRQZXJtaXNzaW9uSTE4bigpO1xuICBjb25zdCBmYWxsYmFjayA9IHBlcm0ubWVzc2FnZSB8fCBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyB0aWVuZXMgcGVybWlzb3MgcGFyYSByZWFsaXphciBlc3RhIGFjY2lvbi5cIik7XG4gIGFsZXJ0KGZhbGxiYWNrKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDc3JmVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcbiAgY29uc3QgbWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKTtcbiAgcmV0dXJuIG1ldGEgPyBtZXRhLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIikgfHwgXCJcIiA6IFwiXCI7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hKc29uPFQgPSBhbnk+KHVybDogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwsIC4uLmZldGNoT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XG5cbiAgY29uc3QgaGVhZGVyczogSGVhZGVyc0luaXQgPSB7XG4gICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAuLi4oZmV0Y2hPcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICB9O1xuXG4gIGlmIChjc3JmVG9rZW4pIHtcbiAgICAoaGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KVtcIlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXSA9IGNzcmZUb2tlbjtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgaGVhZGVycyxcbiAgfSk7XG5cbiAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICBpZiAoIXN1cHByZXNzUGVybWlzc2lvbk1vZGFsKSBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gdGllbmVzIHBlcm1pc29zIHBhcmEgcmVhbGl6YXIgZXN0YSBhY2Npb24uXCIpKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICBjb25zdCBtc2cgPSBqc29uPy5tZXNzYWdlO1xuICAgICAgaWYgKHR5cGVvZiBtc2cgPT09IFwic3RyaW5nXCIgJiYgbXNnLnRyaW0oKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIGlnbm9yZSBwYXJzZSBlcnJvcnNcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCIpKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCkgYXMgVDtcbiAgfSBjYXRjaCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBcGlfSW52YWxpZEpzb25cIiwgXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIikpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IGNvbnN0IEFDQ0VTU19SSUdIVFMgPSB7XG4gIFZpZXc6IDEsXG4gIEVkaXQ6IDIsXG4gIEFkZDogMyxcbiAgRnVsbEFjY2VzczogNCxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIEFjY2Vzc1JpZ2h0ID0ga2V5b2YgdHlwZW9mIEFDQ0VTU19SSUdIVFM7XG5cbmNvbnN0IGdldFBlcm1pc3Npb25JMThuID0gKCkgPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfUEVSTUlTU0lPTl9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1vZHVsZUFjY2VzcyA9IChjb2RlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18pIHx8IHt9O1xuICBjb25zdCB2YWx1ZSA9IGFjY2Vzc1tjb2RlIGFzIGtleW9mIHR5cGVvZiBhY2Nlc3NdO1xuICByZXR1cm4gTnVtYmVyKHZhbHVlID8/IDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbkFjY2VzcyA9IChjb2RlOiBzdHJpbmcsIGxldmVsOiBBY2Nlc3NSaWdodCA9IFwiVmlld1wiKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBnZXRNb2R1bGVBY2Nlc3MoY29kZSkgPj0gQUNDRVNTX1JJR0hUU1tsZXZlbF07XG59O1xuXG5leHBvcnQgY29uc3Qgc2hvd1Blcm1pc3Npb25Nb2RhbCA9IChvcHRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LklORD8uc2hvd1Blcm1pc3Npb25Nb2RhbCkge1xuICAgIHdpbmRvdy5JTkQuc2hvd1Blcm1pc3Npb25Nb2RhbChvcHRzIHx8IHt9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGVybSA9IGdldFBlcm1pc3Npb25JMThuKCk7XG4gIGNvbnN0IGZhbGxiYWNrID0gcGVybS5tZXNzYWdlIHx8IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGVzdGEgYWNjaW9uLlwiKTtcbiAgYWxlcnQoZmFsbGJhY2spO1xufTtcbiIsICJleHBvcnQgY29uc3QgSElTVE9SWV9GSUxURVJfS0VZID0gXCJ2aXNpdGFzX2hpc3RvcnlfZmlsdGVyX3YxXCI7XG5leHBvcnQgY29uc3QgSElTVE9SWV9SRVRVUk5fRkxBR19LRVkgPSBcInZpc2l0YXNfaGlzdG9yeV9yZXR1cm5fdjFcIjtcblxuZXhwb3J0IGNvbnN0IGlzSXNvRGF0ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpKTtcblxuZXhwb3J0IGNvbnN0IGhhc0hpc3RvcnlGaWx0ZXJSYW5nZSA9ICgpOiBib29sZWFuID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKEhJU1RPUllfRklMVEVSX0tFWSk7XG4gICAgaWYgKCFyYXcpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7XG4gICAgcmV0dXJuICEhKHBhcnNlZCAmJiBwYXJzZWQuZnJvbURhdGUgJiYgcGFyc2VkLnRvRGF0ZSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1hcmtIaXN0b3J5UmV0dXJuID0gKCk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oSElTVE9SWV9SRVRVUk5fRkxBR19LRVksIFwiMVwiKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzZXRIaXN0b3J5RmlsdGVyRm9yRGF0ZSA9IChpc29EYXRlOiBzdHJpbmcsIGZvcmNlID0gZmFsc2UpOiB2b2lkID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcoaXNvRGF0ZSB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghaXNJc29EYXRlKHZhbHVlKSkge1xuICAgIGlmIChoYXNIaXN0b3J5RmlsdGVyUmFuZ2UoKSkgbWFya0hpc3RvcnlSZXR1cm4oKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBXaGVuIGZvcmNlIGlzIHRydWUsIHJlcGxhY2UgYW55IGV4aXN0aW5nIGhpc3RvcnkgcmFuZ2UuXG4gICAgaWYgKGZvcmNlIHx8ICFoYXNIaXN0b3J5RmlsdGVyUmFuZ2UoKSkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShISVNUT1JZX0ZJTFRFUl9LRVksIEpTT04uc3RyaW5naWZ5KHsgZnJvbURhdGU6IHZhbHVlLCB0b0RhdGU6IHZhbHVlIH0pKTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG4gIG1hcmtIaXN0b3J5UmV0dXJuKCk7XG59O1xuXG5sZXQgYWN0aW9uTWFya0hpZGVUaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbmNvbnN0IGdldEFjdGlvbk1hcmtOb2RlcyA9ICgpID0+ICh7XG4gIHJvb3Q6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kQWN0aW9uTWFya1wiKSxcbiAgd3JhcDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRBY3Rpb25NYXJrV3JhcFwiKSxcbiAgY2hlY2s6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kTWFya0NoZWNrXCIpLFxuICB3YXJuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZE1hcmtXYXJuaW5nXCIpLFxuICBlcnJvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRNYXJrRXJyb3JcIiksXG59KTtcblxuY29uc3QgcmVzZXRBY3Rpb25NYXJrID0gKG5vZGVzOiBSZXR1cm5UeXBlPHR5cGVvZiBnZXRBY3Rpb25NYXJrTm9kZXM+KSA9PiB7XG4gIGlmICghbm9kZXMud3JhcCkgcmV0dXJuO1xuICBub2Rlcy53cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJ0ZXh0LWVtZXJhbGQtNjAwXCIsIFwidGV4dC1yb3NlLTYwMFwiLCBcInRleHQtYW1iZXItNTAwXCIpO1xuICBub2Rlcy53cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wLXNoYWRvdy1bMF8xOHB4XzI0cHhfcmdiYSgwLDAsMCwwLjE1KV1cIik7XG4gIGlmIChub2Rlcy5jaGVjaykgbm9kZXMuY2hlY2suY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgaWYgKG5vZGVzLndhcm4pIG5vZGVzLndhcm4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgaWYgKG5vZGVzLmVycm9yKSBub2Rlcy5lcnJvci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufTtcblxuY29uc3QgaGlkZUFjdGlvbk1hcmsgPSAobm9kZXM6IFJldHVyblR5cGU8dHlwZW9mIGdldEFjdGlvbk1hcmtOb2Rlcz4pID0+IHtcbiAgaWYgKCFub2Rlcy5yb290KSByZXR1cm47XG4gIG5vZGVzLnJvb3QuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgbm9kZXMucm9vdC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gIHJlc2V0QWN0aW9uTWFyayhub2Rlcyk7XG59O1xuXG5jb25zdCBmbGFzaEFjdGlvbk1hcmtMb2NhbCA9ICh0eXBlOiBzdHJpbmcsIGR1cmF0aW9uTXM6IG51bWJlcikgPT4ge1xuICBjb25zdCBub2RlcyA9IGdldEFjdGlvbk1hcmtOb2RlcygpO1xuICBpZiAoIW5vZGVzLnJvb3QgfHwgIW5vZGVzLndyYXAgfHwgIW5vZGVzLmNoZWNrIHx8ICFub2Rlcy53YXJuIHx8ICFub2Rlcy5lcnJvcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChhY3Rpb25NYXJrSGlkZVRpbWVyKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChhY3Rpb25NYXJrSGlkZVRpbWVyKTtcbiAgICBhY3Rpb25NYXJrSGlkZVRpbWVyID0gbnVsbDtcbiAgfVxuXG4gIHJlc2V0QWN0aW9uTWFyayhub2Rlcyk7XG5cbiAgbGV0IGljb24gPSBub2Rlcy5jaGVjaztcbiAgbGV0IGNvbG9yQ2xhc3MgPSBcInRleHQtZW1lcmFsZC02MDBcIjtcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwib2tQcm9jZXNzXCI6XG4gICAgICBpY29uID0gbm9kZXMuY2hlY2s7XG4gICAgICBjb2xvckNsYXNzID0gXCJ0ZXh0LWVtZXJhbGQtNjAwXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwib2tEZWxQcm9jZXNzXCI6XG4gICAgICBpY29uID0gbm9kZXMuY2hlY2s7XG4gICAgICBjb2xvckNsYXNzID0gXCJ0ZXh0LXJvc2UtNjAwXCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwid2FybmluZ1Byb2Nlc3NcIjpcbiAgICAgIGljb24gPSBub2Rlcy53YXJuO1xuICAgICAgY29sb3JDbGFzcyA9IFwidGV4dC1hbWJlci01MDBcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJlcnJvclByb2Nlc3NcIjpcbiAgICAgIGljb24gPSBub2Rlcy5lcnJvcjtcbiAgICAgIGNvbG9yQ2xhc3MgPSBcInRleHQtcm9zZS02MDBcIjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpY29uID0gbm9kZXMuY2hlY2s7XG4gICAgICBjb2xvckNsYXNzID0gXCJ0ZXh0LWVtZXJhbGQtNjAwXCI7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIG5vZGVzLndyYXAuY2xhc3NMaXN0LmFkZChjb2xvckNsYXNzKTtcbiAgbm9kZXMud3JhcC5jbGFzc0xpc3QuYWRkKFwiZHJvcC1zaGFkb3ctWzBfMThweF8yNHB4X3JnYmEoMCwwLDAsMC4xNSldXCIpO1xuICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIG5vZGVzLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgbm9kZXMucm9vdC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuICBub2Rlcy5yb290LnN0eWxlLnNldFByb3BlcnR5KFwiZGlzcGxheVwiLCBcImZsZXhcIiwgXCJpbXBvcnRhbnRcIik7XG4gIG5vZGVzLnJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCJvcGFjaXR5XCIsIFwiMVwiLCBcImltcG9ydGFudFwiKTtcbiAgbm9kZXMucm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIsIFwiaW1wb3J0YW50XCIpO1xuXG4gIGlmIChkdXJhdGlvbk1zID4gMCkge1xuICAgIGFjdGlvbk1hcmtIaWRlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBub2Rlcy5yb290LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcbiAgICAgIG5vZGVzLnJvb3Quc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvcGFjaXR5XCIpO1xuICAgICAgbm9kZXMucm9vdC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInZpc2liaWxpdHlcIik7XG4gICAgICBoaWRlQWN0aW9uTWFyayhub2Rlcyk7XG4gICAgfSwgZHVyYXRpb25Ncyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmbGFzaEFjdGlvbk1hcmsgPSAodHlwZTogc3RyaW5nLCBkdXJhdGlvbk1zOiBudW1iZXIpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAod2luZG93LklORCAmJiB0eXBlb2Ygd2luZG93LklORC5mbGFzaEFjdGlvbk1hcmsgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgd2luZG93LklORC5mbGFzaEFjdGlvbk1hcmsoeyB0eXBlLCBkdXJhdGlvbk1zIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cblxuICB0cnkge1xuICAgIGZsYXNoQWN0aW9uTWFya0xvY2FsKHR5cGUsIGR1cmF0aW9uTXMpO1xuICB9IGNhdGNoIHtcbiAgICAvLyBpZ25vcmVcbiAgfVxufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgc2l6ZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBTcGlubmVyID0gKHsgc2l6ZSA9IFwiaC00IHctNFwiLCBsYWJlbCB9OiBQcm9wcykgPT4gKFxuICA8c3ZnIGNsYXNzTmFtZT17YGluZC1zcGlubmVyICR7c2l6ZX1gfSB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2xhYmVsIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXI7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25Eb3duU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTkuNSA4LjI1LTcuNSA3LjUtNy41LTcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25VcFN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTQuNSAxNS43NSA3LjUtNy41IDcuNSA3LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgYW5jaG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xuICBvcGVuOiBib29sZWFuO1xuICB6SW5kZXg/OiBudW1iZXI7XG4gIG1heEhlaWdodENsYXNzPzogc3RyaW5nO1xuICByb3VuZGVkQ2xhc3M/OiBzdHJpbmc7XG4gIHJvbGU/OiBzdHJpbmc7XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG5jb25zdCBGbG9hdGluZ0xpc3QgPSAoe1xuICBhbmNob3JSZWYsXG4gIG9wZW4sXG4gIHpJbmRleCA9IDMwMDAwMCxcbiAgbWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXG4gIHJvdW5kZWRDbGFzcyA9IFwicm91bmRlZC1tZFwiLFxuICByb2xlLFxuICBwb3J0YWxDbGFzc05hbWUsXG4gIHBhbmVsQ2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbn06IFByb3BzKSA9PiB7XG4gIGNvbnN0IHN0eWxlID0gdXNlRmxvYXRpbmdQb3NpdGlvbihhbmNob3JSZWYsIG9wZW4pO1xuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgIHRvcDogc3R5bGUudG9wLFxuICAgICAgICBsZWZ0OiBzdHlsZS5sZWZ0LFxuICAgICAgICB3aWR0aDogc3R5bGUud2lkdGgsXG4gICAgICAgIHpJbmRleCxcbiAgICAgIH19XG4gICAgICBjbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIHJvbGU9e3JvbGV9XG4gICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBvdmVyZmxvdy1hdXRvICR7cm91bmRlZENsYXNzfSBiZy13aGl0ZSBweS0xIHRleHQtc20gc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHttYXhIZWlnaHRDbGFzc30gJHtwYW5lbENsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5ib2R5XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0xpc3Q7XG4iLCAiaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdQb3NpdGlvbiA9ICh0YXJnZXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4sIG9wZW46IGJvb2xlYW4pID0+IHtcbiAgY29uc3QgW3N0eWxlLCBzZXRTdHlsZV0gPSB1c2VTdGF0ZSh7IHRvcDogMCwgbGVmdDogMCwgd2lkdGg6IDAgfSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4gfHwgIXRhcmdldFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IHRhcmdldFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICghcmVjdCkgcmV0dXJuO1xuICAgICAgc2V0U3R5bGUoe1xuICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgNixcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdXBkYXRlKCk7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBvcGVuICYmIHVwZGF0ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IGNhcHR1cmU6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcbiAgICB9O1xuICB9LCBbb3BlbiwgdGFyZ2V0UmVmXSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgdXNlT3V0c2lkZUNsaWNrID0gKFxuICByZWZzOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+IHwgQXJyYXk8UmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50Pj4sXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWRcbikgPT4ge1xuICBjb25zdCBsaXN0ID0gdXNlTWVtbygoKSA9PiAoQXJyYXkuaXNBcnJheShyZWZzKSA/IHJlZnMgOiBbcmVmc10pLCBbcmVmc10pO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKGxpc3QpO1xuICBjb25zdCBvbkNsb3NlUmVmID0gdXNlUmVmKG9uQ2xvc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGlzdFJlZi5jdXJyZW50ID0gbGlzdDtcbiAgfSwgW2xpc3RdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2xvc2VSZWYuY3VycmVudCA9IG9uQ2xvc2U7XG4gIH0sIFtvbkNsb3NlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVyID0gKGV2OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudExpc3QgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBpc0luc2lkZSA9IGN1cnJlbnRMaXN0LnNvbWUoKHIpID0+IHI/LmN1cnJlbnQgJiYgci5jdXJyZW50LmNvbnRhaW5zKGV2LnRhcmdldCBhcyBOb2RlKSk7XG4gICAgICBpZiAoaXNJbnNpZGUpIHJldHVybjtcbiAgICAgIG9uQ2xvc2VSZWYuY3VycmVudCgpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlcik7XG4gICAgfTtcbiAgfSwgW10pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFVBQVUsTUFBOEI7QUFDNUMsU0FBUSxPQUFPLGVBQWUsZUFBZSxXQUFXLGdCQUFpQixDQUFDO0FBQzVFO0FBRU8sSUFBTSxPQUFPLENBQUMsS0FBYSxhQUE4QjtBQUM5RCxRQUFNLE9BQU8sUUFBUTtBQUNyQixRQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3RCLE1BQUksT0FBTyxVQUFVLFlBQVksTUFBTSxLQUFLLEVBQUcsUUFBTztBQUN0RCxTQUFPLFlBQVk7QUFDckI7QUFFTyxJQUFNLFlBQVksQ0FBQyxLQUFhLGFBQWlDLFNBQWlDO0FBQ3ZHLFFBQU0sV0FBVyxLQUFLLEtBQUssUUFBUTtB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O0FBQ2pELE1BQUksQ0FBQyxLQUFNLFFBQU87QUFDbEIsYUFBTztBQUFBLElBQ0w7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU87QUFBQSxVQUNMLFVBQVU7QUFBQSxVQUNWLEtBQUssTUFBTTtBQUFBLFVBQ1gsTUFBTSxNQUFNO0FBQUEsVUFDWixPQUFPLE1BQU07QUFBQSxVQUNiO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBRVg7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDO0FBQUEsWUFDQSxXQUFXLHdCQUF3QixZQUFZLDZFQUE2RSxjQUFjLElBQUksa0JBQWtCLEVBQUU7QUFBQSxZQUVqSztBQUFBO0FBQUEsUUFDSDtBQUFBO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLEVBQ1g7QUFDRjtBQUVBLElBQU8sdUJBQVE7OztBRW5EZixJQUFBQyxnQkFBMkM7QUFFcEMsSUFBTSxrQkFBa0IsQ0FDN0IsTUFDQSxZQUNHO0FBQ0gsUUFBTSxXQUFPLHVCQUFRLE1BQU8sTUFBTSxRQUFRLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxHQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3hFLFFBQU0sY0FBVSxzQkFBTyxJQUFJO0FBQzNCLFFBQU0saUJBQWEsc0JBQU8sT0FBTztBQUVqQywrQkFBVSxNQUFNO0FBQ2QsWUFBUSxVQUFVO0FBQUEsRUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQztBQUVULCtCQUFVLE1BQU07QUFDZCxlQUFXLFVBQVU7QUFBQSxFQUN2QixHQUFHLENBQUMsT0FBTyxDQUFDO0FBRVosK0JBQVUsTUFBTTtBQUNkLFVBQU0sVUFBVSxDQUFDLE9BQWdDO0FBQy9DLFlBQU0sY0FBYyxRQUFRO0FBQzVCLFlBQU0sV0FBVyxZQUFZLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBVyxFQUFFLFFBQVEsU0FBUyxHQUFHLE1BQWMsQ0FBQztBQUM1RixVQUFJLFNBQVU7QUFDZCxpQkFBVyxRQUFRO0FBQUEsSUFDckI7QUFFQSxhQUFTLGlCQUFpQixhQUFhLE9BQU87QUFDOUMsYUFBUyxpQkFBaUIsY0FBYyxTQUFTLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFFbEUsV0FBTyxNQUFNO0FBQ1gsZUFBUyxvQkFBb0IsYUFBYSxPQUFPO0FBQ2pELGVBQVMsb0JBQW9CLGNBQWMsT0FBTztBQUFBLElBQ3BEO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUNQOyIsCiAgIm5hbWVzIjogWyJnZXRJMThuIiwgImluZFQiLCAiZ2V0UGVybWlzc2lvbkkxOG4iLCAic2hvd1Blcm1pc3Npb25Nb2RhbCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCJdCn0K
