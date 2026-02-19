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
  if (typeof value === "string" && value.trim() && value !== key) return value;
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
  constructor(message, status, responseBody, validationErrors) {
    super(message);
    this.name = "ApiFetchError";
    this.status = status;
    this.responseBody = responseBody;
    this.validationErrors = validationErrors;
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
var CONTEXT_FAILURE_HINTS = [
  "contexto de companias no inicializado",
  "/api/auth/entra/context",
  "company context not initialized",
  "context not initialized"
];
var forcedReloginPromise = null;
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
var asRecord = (payload) => {
  if (!payload || typeof payload !== "object") return null;
  return payload;
};
var getStringProp = (payload, ...keys) => {
  const record = asRecord(payload);
  if (!record) return "";
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
};
var getBooleanProp = (payload, ...keys) => {
  const record = asRecord(payload);
  if (!record) return null;
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "boolean") return value;
  }
  return null;
};
var getArrayProp = (payload, ...keys) => {
  const record = asRecord(payload);
  if (!record) return [];
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) return value;
  }
  return [];
};
var getMessageFromPayload = (payload) => {
  return getStringProp(payload, "message", "Message");
};
var toValidationErrorItem = (value) => {
  const record = asRecord(value);
  if (!record) return null;
  const field = getStringProp(record, "Field", "field");
  const message = getStringProp(record, "Message", "message");
  if (!field && !message) return null;
  return {
    Field: field,
    Message: message
  };
};
var getValidationErrorsFromPayload = (payload) => {
  const rawErrors = getArrayProp(payload, "Errors", "errors");
  return rawErrors.map((entry) => toValidationErrorItem(entry)).filter((entry) => entry !== null);
};
var formatValidationErrors = (errors) => {
  if (!errors.length) return "";
  return errors.map((entry) => {
    if (entry.Field && entry.Message) return `${entry.Field}: ${entry.Message}`;
    return entry.Message || entry.Field;
  }).filter((part) => part).join(" | ");
};
var normalizeForMatch = (value) => {
  if (!value) return "";
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};
var isContextBootstrapFailureMessage = (message) => {
  const normalized = normalizeForMatch(message);
  if (!normalized) return false;
  return CONTEXT_FAILURE_HINTS.some((hint) => normalized.includes(hint));
};
var getDefaultLoginUrl = () => "/Auth/Login?loggedOut=true";
var requestForcedRelogin = async (reason) => {
  const csrfToken = getCsrfToken();
  const headers = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest"
  };
  if (csrfToken) {
    headers["RequestVerificationToken"] = csrfToken;
  }
  const safeReason = encodeURIComponent(reason || "context-error");
  try {
    const response = await fetch(`/Auth/ForceRelogin?reason=${safeReason}`, {
      method: "POST",
      credentials: "same-origin",
      headers
    });
    const raw = await response.text();
    const payload = tryParseJson(raw);
    const loginUrl = getStringProp(payload, "loginUrl", "LoginUrl");
    return loginUrl || getDefaultLoginUrl();
  } catch {
    return getDefaultLoginUrl();
  }
};
var shouldForceRelogin = (payload, status) => {
  if (status === 401) return true;
  if (getBooleanProp(payload, "forceRelogin", "ForceRelogin") === true) return true;
  if (getBooleanProp(payload, "success", "Success") === false) {
    const message = getMessageFromPayload(payload);
    return isContextBootstrapFailureMessage(message);
  }
  return false;
};
var forceReloginAndWait = async (reason) => {
  if (typeof window === "undefined") {
    throw new ApiFetchError(indT2("Api_SessionExpired", "Your session has expired."), 401);
  }
  if (!forcedReloginPromise) {
    forcedReloginPromise = requestForcedRelogin(reason);
  }
  const loginUrl = await forcedReloginPromise;
  window.location.replace(loginUrl || getDefaultLoginUrl());
  return new Promise(() => {
  });
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
    const payloadMessage = getMessageFromPayload(payload);
    const validationErrors = getValidationErrorsFromPayload(payload);
    const validationMessage = formatValidationErrors(validationErrors);
    if (shouldForceRelogin(payload, response.status)) {
      return forceReloginAndWait(payloadMessage || `http-${response.status}`);
    }
    if (response.status === 403) {
      if (!suppressPermissionModal) showPermissionModal2();
      throw new ApiFetchError(
        indT2("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."),
        response.status,
        raw
      );
    }
    if (payloadMessage || validationMessage) {
      throw new ApiFetchError(payloadMessage || validationMessage, response.status, raw, validationErrors);
    }
    throw new ApiFetchError(
      indT2("Api_RequestFailed", "Request failed. Please try again."),
      response.status,
      raw,
      validationErrors
    );
  }
  if (!raw.trim()) {
    return {};
  }
  if (payload !== null) {
    if (shouldForceRelogin(payload, response.status)) {
      const payloadMessage = getMessageFromPayload(payload);
      return forceReloginAndWait(payloadMessage || "context-error");
    }
    return payload;
  }
  throw new ApiFetchError(indT2("Api_InvalidJson", "Invalid server response."), response.status, raw);
}

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
  FloatingList_default,
  ChevronDownSvg,
  ChevronUpSvg,
  useOutsideClick,
  classNames
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Blcm1pc3Npb25zLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy9jbGFzc05hbWVzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL2FwaVNlcnZpY2UudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGljdCA9IGdldEkxOG4oKTtcbiAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpICYmIHZhbHVlICE9PSBrZXkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRGb3JtYXQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcbiAgY29uc3QgdGVtcGxhdGUgPSBpbmRUKGtleSwgZmFsbGJhY2spO1xuICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IGNvbnN0IEFDQ0VTU19SSUdIVFMgPSB7XG4gIFZpZXc6IDEsXG4gIEVkaXQ6IDIsXG4gIEFkZDogMyxcbiAgRnVsbEFjY2VzczogNCxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIEFjY2Vzc1JpZ2h0ID0ga2V5b2YgdHlwZW9mIEFDQ0VTU19SSUdIVFM7XG5cbmNvbnN0IGdldFBlcm1pc3Npb25JMThuID0gKCkgPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfUEVSTUlTU0lPTl9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1vZHVsZUFjY2VzcyA9IChjb2RlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18pIHx8IHt9O1xuICBjb25zdCB2YWx1ZSA9IGFjY2Vzc1tjb2RlIGFzIGtleW9mIHR5cGVvZiBhY2Nlc3NdO1xuICByZXR1cm4gTnVtYmVyKHZhbHVlID8/IDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbkFjY2VzcyA9IChjb2RlOiBzdHJpbmcsIGxldmVsOiBBY2Nlc3NSaWdodCA9IFwiVmlld1wiKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBnZXRNb2R1bGVBY2Nlc3MoY29kZSkgPj0gQUNDRVNTX1JJR0hUU1tsZXZlbF07XG59O1xuXG5leHBvcnQgY29uc3Qgc2hvd1Blcm1pc3Npb25Nb2RhbCA9IChvcHRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LklORD8uc2hvd1Blcm1pc3Npb25Nb2RhbCkge1xuICAgIHdpbmRvdy5JTkQuc2hvd1Blcm1pc3Npb25Nb2RhbChvcHRzIHx8IHt9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGVybSA9IGdldFBlcm1pc3Npb25JMThuKCk7XG4gIGNvbnN0IGZhbGxiYWNrID0gcGVybS5tZXNzYWdlIHx8IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGVzdGEgYWNjaW9uLlwiKTtcbiAgYWxlcnQoZmFsbGJhY2spO1xufTtcbiIsICJleHBvcnQgY29uc3QgY2xhc3NOYW1lcyA9ICguLi5jbGFzc2VzOiBBcnJheTxzdHJpbmcgfCBmYWxzZSB8IG51bGwgfCB1bmRlZmluZWQ+KSA9PlxuICBjbGFzc2VzLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgc2l6ZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBTcGlubmVyID0gKHsgc2l6ZSA9IFwiaC00IHctNFwiLCBsYWJlbCB9OiBQcm9wcykgPT4gKFxuICA8c3ZnIGNsYXNzTmFtZT17YGluZC1zcGlubmVyICR7c2l6ZX1gfSB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2xhYmVsIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXI7XG4iLCAidHlwZSBQZXJtaXNzaW9uSTE4biA9IHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIG9rPzogc3RyaW5nO1xufTtcblxudHlwZSBWYWxpZGF0aW9uRXJyb3JJdGVtID0ge1xuICBGaWVsZDogc3RyaW5nO1xuICBNZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBBcGlGZXRjaE9wdGlvbnMgPSBSZXF1ZXN0SW5pdCAmIHtcbiAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIEFwaUZldGNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHN0YXR1cz86IG51bWJlcjtcbiAgcmVzcG9uc2VCb2R5Pzogc3RyaW5nO1xuICB2YWxpZGF0aW9uRXJyb3JzPzogVmFsaWRhdGlvbkVycm9ySXRlbVtdO1xuXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgc3RhdHVzPzogbnVtYmVyLCByZXNwb25zZUJvZHk/OiBzdHJpbmcsIHZhbGlkYXRpb25FcnJvcnM/OiBWYWxpZGF0aW9uRXJyb3JJdGVtW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkFwaUZldGNoRXJyb3JcIjtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLnJlc3BvbnNlQm9keSA9IHJlc3BvbnNlQm9keTtcbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSB2YWxpZGF0aW9uRXJyb3JzO1xuICB9XG59XG5cbmNvbnN0IGdldFBlcm1pc3Npb25JMThuID0gKCk6IFBlcm1pc3Npb25JMThuID0+IHtcbiAgcmV0dXJuICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5fX0lORF9QRVJNSVNTSU9OX0kxOE5fXykgfHwge307XG59O1xuXG5jb25zdCBnZXRJMThuID0gKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGljdCA9IGdldEkxOG4oKTtcbiAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpKSByZXR1cm4gdmFsdWU7XG4gIHJldHVybiBmYWxsYmFjayB8fCBrZXk7XG59O1xuXG5jb25zdCBzaG93UGVybWlzc2lvbk1vZGFsID0gKG9wdHM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuSU5EPy5zaG93UGVybWlzc2lvbk1vZGFsKSB7XG4gICAgd2luZG93LklORC5zaG93UGVybWlzc2lvbk1vZGFsKG9wdHMgfHwge30pO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwZXJtID0gZ2V0UGVybWlzc2lvbkkxOG4oKTtcbiAgY29uc3QgZmFsbGJhY2sgPSBwZXJtLm1lc3NhZ2UgfHwgaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gdGllbmVzIHBlcm1pc29zIHBhcmEgcmVhbGl6YXIgZXN0YSBhY2Npb24uXCIpO1xuICBhbGVydChmYWxsYmFjayk7XG59O1xuXG5jb25zdCBDT05URVhUX0ZBSUxVUkVfSElOVFMgPSBbXG4gIFwiY29udGV4dG8gZGUgY29tcGFuaWFzIG5vIGluaWNpYWxpemFkb1wiLFxuICBcIi9hcGkvYXV0aC9lbnRyYS9jb250ZXh0XCIsXG4gIFwiY29tcGFueSBjb250ZXh0IG5vdCBpbml0aWFsaXplZFwiLFxuICBcImNvbnRleHQgbm90IGluaXRpYWxpemVkXCIsXG5dO1xuXG5sZXQgZm9yY2VkUmVsb2dpblByb21pc2U6IFByb21pc2U8c3RyaW5nPiB8IG51bGwgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgZ2V0Q3NyZlRva2VuID0gKCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XG4gIHJldHVybiBtZXRhID8gbWV0YS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpIHx8IFwiXCIgOiBcIlwiO1xufTtcblxuY29uc3QgdHJ5UGFyc2VKc29uID0gKHJhdzogc3RyaW5nKTogdW5rbm93biB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCAhcmF3LnRyaW0oKSkgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IGFzUmVjb3JkID0gKHBheWxvYWQ6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xuICBpZiAoIXBheWxvYWQgfHwgdHlwZW9mIHBheWxvYWQgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuICByZXR1cm4gcGF5bG9hZCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn07XG5cbmNvbnN0IGdldFN0cmluZ1Byb3AgPSAocGF5bG9hZDogdW5rbm93biwgLi4ua2V5czogc3RyaW5nW10pOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWNvcmQgPSBhc1JlY29yZChwYXlsb2FkKTtcbiAgaWYgKCFyZWNvcmQpIHJldHVybiBcIlwiO1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZFtrZXldO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBcIlwiO1xufTtcblxuY29uc3QgZ2V0Qm9vbGVhblByb3AgPSAocGF5bG9hZDogdW5rbm93biwgLi4ua2V5czogc3RyaW5nW10pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHJlY29yZCA9IGFzUmVjb3JkKHBheWxvYWQpO1xuICBpZiAoIXJlY29yZCkgcmV0dXJuIG51bGw7XG5cbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgZ2V0QXJyYXlQcm9wID0gKHBheWxvYWQ6IHVua25vd24sIC4uLmtleXM6IHN0cmluZ1tdKTogdW5rbm93bltdID0+IHtcbiAgY29uc3QgcmVjb3JkID0gYXNSZWNvcmQocGF5bG9hZCk7XG4gIGlmICghcmVjb3JkKSByZXR1cm4gW107XG5cbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gW107XG59O1xuXG5jb25zdCBnZXRNZXNzYWdlRnJvbVBheWxvYWQgPSAocGF5bG9hZDogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiBnZXRTdHJpbmdQcm9wKHBheWxvYWQsIFwibWVzc2FnZVwiLCBcIk1lc3NhZ2VcIik7XG59O1xuXG5jb25zdCB0b1ZhbGlkYXRpb25FcnJvckl0ZW0gPSAodmFsdWU6IHVua25vd24pOiBWYWxpZGF0aW9uRXJyb3JJdGVtIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHJlY29yZCA9IGFzUmVjb3JkKHZhbHVlKTtcbiAgaWYgKCFyZWNvcmQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGZpZWxkID0gZ2V0U3RyaW5nUHJvcChyZWNvcmQsIFwiRmllbGRcIiwgXCJmaWVsZFwiKTtcbiAgY29uc3QgbWVzc2FnZSA9IGdldFN0cmluZ1Byb3AocmVjb3JkLCBcIk1lc3NhZ2VcIiwgXCJtZXNzYWdlXCIpO1xuICBpZiAoIWZpZWxkICYmICFtZXNzYWdlKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4ge1xuICAgIEZpZWxkOiBmaWVsZCxcbiAgICBNZXNzYWdlOiBtZXNzYWdlLFxuICB9O1xufTtcblxuY29uc3QgZ2V0VmFsaWRhdGlvbkVycm9yc0Zyb21QYXlsb2FkID0gKHBheWxvYWQ6IHVua25vd24pOiBWYWxpZGF0aW9uRXJyb3JJdGVtW10gPT4ge1xuICBjb25zdCByYXdFcnJvcnMgPSBnZXRBcnJheVByb3AocGF5bG9hZCwgXCJFcnJvcnNcIiwgXCJlcnJvcnNcIik7XG4gIHJldHVybiByYXdFcnJvcnNcbiAgICAubWFwKChlbnRyeSkgPT4gdG9WYWxpZGF0aW9uRXJyb3JJdGVtKGVudHJ5KSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIFZhbGlkYXRpb25FcnJvckl0ZW0gPT4gZW50cnkgIT09IG51bGwpO1xufTtcblxuY29uc3QgZm9ybWF0VmFsaWRhdGlvbkVycm9ycyA9IChlcnJvcnM6IFZhbGlkYXRpb25FcnJvckl0ZW1bXSk6IHN0cmluZyA9PiB7XG4gIGlmICghZXJyb3JzLmxlbmd0aCkgcmV0dXJuIFwiXCI7XG5cbiAgcmV0dXJuIGVycm9yc1xuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkuRmllbGQgJiYgZW50cnkuTWVzc2FnZSkgcmV0dXJuIGAke2VudHJ5LkZpZWxkfTogJHtlbnRyeS5NZXNzYWdlfWA7XG4gICAgICByZXR1cm4gZW50cnkuTWVzc2FnZSB8fCBlbnRyeS5GaWVsZDtcbiAgICB9KVxuICAgIC5maWx0ZXIoKHBhcnQpID0+IHBhcnQpXG4gICAgLmpvaW4oXCIgfCBcIik7XG59O1xuXG5jb25zdCBub3JtYWxpemVGb3JNYXRjaCA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiB2YWx1ZVxuICAgIC5ub3JtYWxpemUoXCJORkRcIilcbiAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IGlzQ29udGV4dEJvb3RzdHJhcEZhaWx1cmVNZXNzYWdlID0gKG1lc3NhZ2U6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRm9yTWF0Y2gobWVzc2FnZSk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gQ09OVEVYVF9GQUlMVVJFX0hJTlRTLnNvbWUoKGhpbnQpID0+IG5vcm1hbGl6ZWQuaW5jbHVkZXMoaGludCkpO1xufTtcblxuY29uc3QgZ2V0RGVmYXVsdExvZ2luVXJsID0gKCk6IHN0cmluZyA9PiBcIi9BdXRoL0xvZ2luP2xvZ2dlZE91dD10cnVlXCI7XG5cbmNvbnN0IHJlcXVlc3RGb3JjZWRSZWxvZ2luID0gYXN5bmMgKHJlYXNvbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XG4gIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0ID0ge1xuICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgfTtcblxuICBpZiAoY3NyZlRva2VuKSB7XG4gICAgKGhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XG4gIH1cblxuICBjb25zdCBzYWZlUmVhc29uID0gZW5jb2RlVVJJQ29tcG9uZW50KHJlYXNvbiB8fCBcImNvbnRleHQtZXJyb3JcIik7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvQXV0aC9Gb3JjZVJlbG9naW4/cmVhc29uPSR7c2FmZVJlYXNvbn1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG5cbiAgICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHRyeVBhcnNlSnNvbihyYXcpO1xuICAgIGNvbnN0IGxvZ2luVXJsID0gZ2V0U3RyaW5nUHJvcChwYXlsb2FkLCBcImxvZ2luVXJsXCIsIFwiTG9naW5VcmxcIik7XG4gICAgcmV0dXJuIGxvZ2luVXJsIHx8IGdldERlZmF1bHRMb2dpblVybCgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZ2V0RGVmYXVsdExvZ2luVXJsKCk7XG4gIH1cbn07XG5cbmNvbnN0IHNob3VsZEZvcmNlUmVsb2dpbiA9IChwYXlsb2FkOiB1bmtub3duLCBzdGF0dXM6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICBpZiAoc3RhdHVzID09PSA0MDEpIHJldHVybiB0cnVlO1xuICBpZiAoZ2V0Qm9vbGVhblByb3AocGF5bG9hZCwgXCJmb3JjZVJlbG9naW5cIiwgXCJGb3JjZVJlbG9naW5cIikgPT09IHRydWUpIHJldHVybiB0cnVlO1xuXG4gIGlmIChnZXRCb29sZWFuUHJvcChwYXlsb2FkLCBcInN1Y2Nlc3NcIiwgXCJTdWNjZXNzXCIpID09PSBmYWxzZSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBnZXRNZXNzYWdlRnJvbVBheWxvYWQocGF5bG9hZCk7XG4gICAgcmV0dXJuIGlzQ29udGV4dEJvb3RzdHJhcEZhaWx1cmVNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgZm9yY2VSZWxvZ2luQW5kV2FpdCA9IGFzeW5jIDxUPihyZWFzb246IHN0cmluZyk6IFByb21pc2U8VD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKGluZFQoXCJBcGlfU2Vzc2lvbkV4cGlyZWRcIiwgXCJZb3VyIHNlc3Npb24gaGFzIGV4cGlyZWQuXCIpLCA0MDEpO1xuICB9XG5cbiAgaWYgKCFmb3JjZWRSZWxvZ2luUHJvbWlzZSkge1xuICAgIGZvcmNlZFJlbG9naW5Qcm9taXNlID0gcmVxdWVzdEZvcmNlZFJlbG9naW4ocmVhc29uKTtcbiAgfVxuXG4gIGNvbnN0IGxvZ2luVXJsID0gYXdhaXQgZm9yY2VkUmVsb2dpblByb21pc2U7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGxvZ2luVXJsIHx8IGdldERlZmF1bHRMb2dpblVybCgpKTtcblxuICAvLyBLZWVwIHBlbmRpbmcgdW50aWwgbmF2aWdhdGlvbiBmaW5pc2hlcyB0byBhdm9pZCByZW5kZXJpbmcgdHJhbnNpZW50IGVycm9ycy5cbiAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KCgpID0+IHt9KTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEpzb248VCA9IHVua25vd24+KHVybDogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwsIC4uLmZldGNoT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XG5cbiAgY29uc3QgaGVhZGVyczogSGVhZGVyc0luaXQgPSB7XG4gICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAuLi4oZmV0Y2hPcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICB9O1xuXG4gIGlmIChjc3JmVG9rZW4pIHtcbiAgICAoaGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KVtcIlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXSA9IGNzcmZUb2tlbjtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgaGVhZGVycyxcbiAgfSk7XG5cbiAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBjb25zdCBwYXlsb2FkID0gdHJ5UGFyc2VKc29uKHJhdyk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IHBheWxvYWRNZXNzYWdlID0gZ2V0TWVzc2FnZUZyb21QYXlsb2FkKHBheWxvYWQpO1xuICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvcnMgPSBnZXRWYWxpZGF0aW9uRXJyb3JzRnJvbVBheWxvYWQocGF5bG9hZCk7XG4gICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKHZhbGlkYXRpb25FcnJvcnMpO1xuXG4gICAgaWYgKHNob3VsZEZvcmNlUmVsb2dpbihwYXlsb2FkLCByZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgICByZXR1cm4gZm9yY2VSZWxvZ2luQW5kV2FpdDxUPihwYXlsb2FkTWVzc2FnZSB8fCBgaHR0cC0ke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgIGlmICghc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwpIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxuICAgICAgICBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyB0aWVuZXMgcGVybWlzb3MgcGFyYSByZWFsaXphciBlc3RhIGFjY2lvbi5cIiksXG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgcmF3XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChwYXlsb2FkTWVzc2FnZSB8fCB2YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocGF5bG9hZE1lc3NhZ2UgfHwgdmFsaWRhdGlvbk1lc3NhZ2UsIHJlc3BvbnNlLnN0YXR1cywgcmF3LCB2YWxpZGF0aW9uRXJyb3JzKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcbiAgICAgIGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLlwiKSxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJhdyxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnNcbiAgICApO1xuICB9XG5cbiAgaWYgKCFyYXcudHJpbSgpKSB7XG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cblxuICBpZiAocGF5bG9hZCAhPT0gbnVsbCkge1xuICAgIGlmIChzaG91bGRGb3JjZVJlbG9naW4ocGF5bG9hZCwgcmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgICAgY29uc3QgcGF5bG9hZE1lc3NhZ2UgPSBnZXRNZXNzYWdlRnJvbVBheWxvYWQocGF5bG9hZCk7XG4gICAgICByZXR1cm4gZm9yY2VSZWxvZ2luQW5kV2FpdDxUPihwYXlsb2FkTWVzc2FnZSB8fCBcImNvbnRleHQtZXJyb3JcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbiAgfVxuXG4gIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKGluZFQoXCJBcGlfSW52YWxpZEpzb25cIiwgXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIiksIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcbn1cbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgYW5jaG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xuICBvcGVuOiBib29sZWFuO1xuICB6SW5kZXg/OiBudW1iZXI7XG4gIG1heEhlaWdodENsYXNzPzogc3RyaW5nO1xuICByb3VuZGVkQ2xhc3M/OiBzdHJpbmc7XG4gIHJvbGU/OiBzdHJpbmc7XG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG5jb25zdCBGbG9hdGluZ0xpc3QgPSAoe1xuICBhbmNob3JSZWYsXG4gIG9wZW4sXG4gIHpJbmRleCA9IDMwMDAwMCxcbiAgbWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXG4gIHJvdW5kZWRDbGFzcyA9IFwicm91bmRlZC1tZFwiLFxuICByb2xlLFxuICBwb3J0YWxDbGFzc05hbWUsXG4gIHBhbmVsQ2xhc3NOYW1lLFxuICBjaGlsZHJlbixcbn06IFByb3BzKSA9PiB7XG4gIGNvbnN0IHN0eWxlID0gdXNlRmxvYXRpbmdQb3NpdGlvbihhbmNob3JSZWYsIG9wZW4pO1xuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgIHRvcDogc3R5bGUudG9wLFxuICAgICAgICBsZWZ0OiBzdHlsZS5sZWZ0LFxuICAgICAgICB3aWR0aDogc3R5bGUud2lkdGgsXG4gICAgICAgIHpJbmRleCxcbiAgICAgIH19XG4gICAgICBjbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIHJvbGU9e3JvbGV9XG4gICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBvdmVyZmxvdy1hdXRvICR7cm91bmRlZENsYXNzfSBiZy13aGl0ZSBweS0xIHRleHQtc20gc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHttYXhIZWlnaHRDbGFzc30gJHtwYW5lbENsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5ib2R5XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0xpc3Q7XG4iLCAiaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdQb3NpdGlvbiA9ICh0YXJnZXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4sIG9wZW46IGJvb2xlYW4pID0+IHtcbiAgY29uc3QgW3N0eWxlLCBzZXRTdHlsZV0gPSB1c2VTdGF0ZSh7IHRvcDogMCwgbGVmdDogMCwgd2lkdGg6IDAgfSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4gfHwgIXRhcmdldFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IHRhcmdldFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICghcmVjdCkgcmV0dXJuO1xuICAgICAgc2V0U3R5bGUoe1xuICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgNixcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdXBkYXRlKCk7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBvcGVuICYmIHVwZGF0ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IGNhcHR1cmU6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcbiAgICB9O1xuICB9LCBbb3BlbiwgdGFyZ2V0UmVmXSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvbkRvd25TdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xOS41IDguMjUtNy41IDcuNS03LjUtNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvblVwU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNC41IDE1Ljc1IDcuNS03LjUgNy41IDcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCB1c2VPdXRzaWRlQ2xpY2sgPSAoXG4gIHJlZnM6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4gfCBBcnJheTxSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+PixcbiAgb25DbG9zZTogKCkgPT4gdm9pZFxuKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSB1c2VNZW1vKCgpID0+IChBcnJheS5pc0FycmF5KHJlZnMpID8gcmVmcyA6IFtyZWZzXSksIFtyZWZzXSk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWYobGlzdCk7XG4gIGNvbnN0IG9uQ2xvc2VSZWYgPSB1c2VSZWYob25DbG9zZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsaXN0UmVmLmN1cnJlbnQgPSBsaXN0O1xuICB9LCBbbGlzdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DbG9zZVJlZi5jdXJyZW50ID0gb25DbG9zZTtcbiAgfSwgW29uQ2xvc2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSAoZXY6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGlzSW5zaWRlID0gY3VycmVudExpc3Quc29tZSgocikgPT4gcj8uY3VycmVudCAmJiByLmN1cnJlbnQuY29udGFpbnMoZXYudGFyZ2V0IGFzIE5vZGUpKTtcbiAgICAgIGlmIChpc0luc2lkZSkgcmV0dXJuO1xuICAgICAgb25DbG9zZVJlZi5jdXJyZW50KCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyKTtcbiAgICB9O1xuICB9LCBbXSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQU0sVUFBVSxNQUE4QjtBQUM1QyxTQUFRLE9BQU8sZUFBZSxlQUFlLFdBQVcsZ0JBQWlCLENBQUM7QUFDNUU7QUFFTyxJQUFNLE9BQU8sQ0FBQyxLQUFhLGFBQThCO0FBQzlELFFBQU0sT0FBTyxRQUFRO0FBQ3JCLFFBQU0sUUFBUSxLQUFLLEdBQUc7QUFDdEIsTUFBSSxPQUFPLFVBQVUsWUFBWSxNQUFNLEtBQUssS0FBSyxVQUFVLElBQUssUUFBTztBQUN2RSxTQUFPLFlBQVk7QUFDckI7QUFFTyxJQUFNLFlBQVksQ0FBQyxLQUFhLGFBQWlD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Q1IsYUFBYTtBQUFBLE1BQ2IsUUFBTztBQUFBLE1BQ1A7QUFBQSxNQUNBLGVBQVk7QUFBQSxNQUVaLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSw4QkFBNkI7QUFBQTtBQUFBLEVBQ3BGO0FBRUo7QUFFTyxJQUFNLGVBQWUsQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUFNO0FBQ3pELFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLE9BQU07QUFBQSxNQUNOLE1BQUs7QUFBQSxNQUNMLFNBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLFFBQU87QUFBQSxNQUNQO0FBQUEsTUFDQSxlQUFZO0FBQUEsTUFFWix1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsOEJBQTZCO0FBQUE7QUFBQSxFQUNwRjtBQUVKOzs7QUNoQ0EsSUFBQUMsZ0JBQTJDO0FBRXBDLElBQU0sa0JBQWtCLENBQzdCLE1BQ0EsWUFDRztBQUNILFFBQU0sV0FBTyx1QkFBUSxNQUFPLE1BQU0sUUFBUSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksR0FBSSxDQUFDLElBQUksQ0FBQztBQUN4RSxRQUFNLGNBQVUsc0JBQU8sSUFBSTtBQUMzQixRQUFNLGlCQUFhLHNCQUFPLE9BQU87QUFFakMsK0JBQVUsTUFBTTtBQUNkLFlBQVEsVUFBVTtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFFVCwrQkFBVSxNQUFNO0FBQ2QsZUFBVyxVQUFVO0FBQUEsRUFDdkIsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUVaLCtCQUFVLE1BQU07QUFDZCxVQUFNLFVBQVUsQ0FBQyxPQUFnQztBQUMvQyxZQUFNLGNBQWMsUUFBUTtBQUM1QixZQUFNLFdBQVcsWUFBWSxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsRUFBRSxRQUFRLFNBQVMsR0FBRyxNQUFjLENBQUM7QUFDNUYsVUFBSSxTQUFVO0FBQ2QsaUJBQVcsUUFBUTtBQUFBLElBQ3JCO0FBRUEsYUFBUyxpQkFBaUIsYUFBYSxPQUFPO0FBQzlDLGFBQVMsaUJBQWlCLGNBQWMsU0FBUyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBRWxFLFdBQU8sTUFBTTtBQUNYLGVBQVMsb0JBQW9CLGFBQWEsT0FBTztBQUNqRCxlQUFTLG9CQUFvQixjQUFjLE9BQU87QUFBQSxJQUNwRDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFDUDsiLAogICJuYW1lcyI6IFsiZ2V0UGVybWlzc2lvbkkxOG4iLCAiZ2V0STE4biIsICJpbmRUIiwgInNob3dQZXJtaXNzaW9uTW9kYWwiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiXQp9Cg==
