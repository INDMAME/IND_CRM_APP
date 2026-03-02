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
  fixedWidthPx,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-md",
  role,
  portalClassName,
  panelClassName,
  panelStyle,
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
          width: typeof fixedWidthPx === "number" && Number.isFinite(fixedWidthPx) ? fixedWidthPx : style.width,
          zIndex
        },
        className: portalClassName,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            role,
            className: `w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`,
            style: panelStyle,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Blcm1pc3Npb25zLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy9jbGFzc05hbWVzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL2FwaVNlcnZpY2UudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGljdCA9IGdldEkxOG4oKTtcbiAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpICYmIHZhbHVlICE9PSBrZXkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRGb3JtYXQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcbiAgY29uc3QgdGVtcGxhdGUgPSBpbmRUKGtleSwgZmFsbGJhY2spO1xuICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IGNvbnN0IEFDQ0VTU19SSUdIVFMgPSB7XG4gIFZpZXc6IDEsXG4gIEVkaXQ6IDIsXG4gIEFkZDogMyxcbiAgRnVsbEFjY2VzczogNCxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIEFjY2Vzc1JpZ2h0ID0ga2V5b2YgdHlwZW9mIEFDQ0VTU19SSUdIVFM7XG5cbmNvbnN0IGdldFBlcm1pc3Npb25JMThuID0gKCkgPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfUEVSTUlTU0lPTl9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1vZHVsZUFjY2VzcyA9IChjb2RlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18pIHx8IHt9O1xuICBjb25zdCB2YWx1ZSA9IGFjY2Vzc1tjb2RlIGFzIGtleW9mIHR5cGVvZiBhY2Nlc3NdO1xuICByZXR1cm4gTnVtYmVyKHZhbHVlID8/IDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbkFjY2VzcyA9IChjb2RlOiBzdHJpbmcsIGxldmVsOiBBY2Nlc3NSaWdodCA9IFwiVmlld1wiKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBnZXRNb2R1bGVBY2Nlc3MoY29kZSkgPj0gQUNDRVNTX1JJR0hUU1tsZXZlbF07XG59O1xuXG5leHBvcnQgY29uc3Qgc2hvd1Blcm1pc3Npb25Nb2RhbCA9IChvcHRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LklORD8uc2hvd1Blcm1pc3Npb25Nb2RhbCkge1xuICAgIHdpbmRvdy5JTkQuc2hvd1Blcm1pc3Npb25Nb2RhbChvcHRzIHx8IHt9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGVybSA9IGdldFBlcm1pc3Npb25JMThuKCk7XG4gIGNvbnN0IGZhbGxiYWNrID0gcGVybS5tZXNzYWdlIHx8IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGVzdGEgYWNjaW9uLlwiKTtcbiAgYWxlcnQoZmFsbGJhY2spO1xufTtcbiIsICJleHBvcnQgY29uc3QgY2xhc3NOYW1lcyA9ICguLi5jbGFzc2VzOiBBcnJheTxzdHJpbmcgfCBmYWxzZSB8IG51bGwgfCB1bmRlZmluZWQ+KSA9PlxuICBjbGFzc2VzLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgc2l6ZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBTcGlubmVyID0gKHsgc2l6ZSA9IFwiaC00IHctNFwiLCBsYWJlbCB9OiBQcm9wcykgPT4gKFxuICA8c3ZnIGNsYXNzTmFtZT17YGluZC1zcGlubmVyICR7c2l6ZX1gfSB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2xhYmVsIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXI7XG4iLCAidHlwZSBQZXJtaXNzaW9uSTE4biA9IHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIG9rPzogc3RyaW5nO1xufTtcblxudHlwZSBWYWxpZGF0aW9uRXJyb3JJdGVtID0ge1xuICBGaWVsZDogc3RyaW5nO1xuICBNZXNzYWdlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBBcGlGZXRjaE9wdGlvbnMgPSBSZXF1ZXN0SW5pdCAmIHtcbiAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIEFwaUZldGNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHN0YXR1cz86IG51bWJlcjtcbiAgcmVzcG9uc2VCb2R5Pzogc3RyaW5nO1xuICB2YWxpZGF0aW9uRXJyb3JzPzogVmFsaWRhdGlvbkVycm9ySXRlbVtdO1xuXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgc3RhdHVzPzogbnVtYmVyLCByZXNwb25zZUJvZHk/OiBzdHJpbmcsIHZhbGlkYXRpb25FcnJvcnM/OiBWYWxpZGF0aW9uRXJyb3JJdGVtW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSBcIkFwaUZldGNoRXJyb3JcIjtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLnJlc3BvbnNlQm9keSA9IHJlc3BvbnNlQm9keTtcbiAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnMgPSB2YWxpZGF0aW9uRXJyb3JzO1xuICB9XG59XG5cbmNvbnN0IGdldFBlcm1pc3Npb25JMThuID0gKCk6IFBlcm1pc3Npb25JMThuID0+IHtcbiAgcmV0dXJuICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5fX0lORF9QRVJNSVNTSU9OX0kxOE5fXykgfHwge307XG59O1xuXG5jb25zdCBnZXRJMThuID0gKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGljdCA9IGdldEkxOG4oKTtcbiAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpKSByZXR1cm4gdmFsdWU7XG4gIHJldHVybiBmYWxsYmFjayB8fCBrZXk7XG59O1xuXG5jb25zdCBzaG93UGVybWlzc2lvbk1vZGFsID0gKG9wdHM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuSU5EPy5zaG93UGVybWlzc2lvbk1vZGFsKSB7XG4gICAgd2luZG93LklORC5zaG93UGVybWlzc2lvbk1vZGFsKG9wdHMgfHwge30pO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwZXJtID0gZ2V0UGVybWlzc2lvbkkxOG4oKTtcbiAgY29uc3QgZmFsbGJhY2sgPSBwZXJtLm1lc3NhZ2UgfHwgaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiTm8gdGllbmVzIHBlcm1pc29zIHBhcmEgcmVhbGl6YXIgZXN0YSBhY2Npb24uXCIpO1xuICBhbGVydChmYWxsYmFjayk7XG59O1xuXG5jb25zdCBDT05URVhUX0ZBSUxVUkVfSElOVFMgPSBbXG4gIFwiY29udGV4dG8gZGUgY29tcGFuaWFzIG5vIGluaWNpYWxpemFkb1wiLFxuICBcIi9hcGkvYXV0aC9lbnRyYS9jb250ZXh0XCIsXG4gIFwiY29tcGFueSBjb250ZXh0IG5vdCBpbml0aWFsaXplZFwiLFxuICBcImNvbnRleHQgbm90IGluaXRpYWxpemVkXCIsXG5dO1xuXG5sZXQgZm9yY2VkUmVsb2dpblByb21pc2U6IFByb21pc2U8c3RyaW5nPiB8IG51bGwgPSBudWxsO1xuXG5leHBvcnQgY29uc3QgZ2V0Q3NyZlRva2VuID0gKCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XG4gIHJldHVybiBtZXRhID8gbWV0YS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpIHx8IFwiXCIgOiBcIlwiO1xufTtcblxuY29uc3QgdHJ5UGFyc2VKc29uID0gKHJhdzogc3RyaW5nKTogdW5rbm93biB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCAhcmF3LnRyaW0oKSkgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IGFzUmVjb3JkID0gKHBheWxvYWQ6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xuICBpZiAoIXBheWxvYWQgfHwgdHlwZW9mIHBheWxvYWQgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuICByZXR1cm4gcGF5bG9hZCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn07XG5cbmNvbnN0IGdldFN0cmluZ1Byb3AgPSAocGF5bG9hZDogdW5rbm93biwgLi4ua2V5czogc3RyaW5nW10pOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWNvcmQgPSBhc1JlY29yZChwYXlsb2FkKTtcbiAgaWYgKCFyZWNvcmQpIHJldHVybiBcIlwiO1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZFtrZXldO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBcIlwiO1xufTtcblxuY29uc3QgZ2V0Qm9vbGVhblByb3AgPSAocGF5bG9hZDogdW5rbm93biwgLi4ua2V5czogc3RyaW5nW10pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHJlY29yZCA9IGFzUmVjb3JkKHBheWxvYWQpO1xuICBpZiAoIXJlY29yZCkgcmV0dXJuIG51bGw7XG5cbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgZ2V0QXJyYXlQcm9wID0gKHBheWxvYWQ6IHVua25vd24sIC4uLmtleXM6IHN0cmluZ1tdKTogdW5rbm93bltdID0+IHtcbiAgY29uc3QgcmVjb3JkID0gYXNSZWNvcmQocGF5bG9hZCk7XG4gIGlmICghcmVjb3JkKSByZXR1cm4gW107XG5cbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gW107XG59O1xuXG5jb25zdCBnZXRNZXNzYWdlRnJvbVBheWxvYWQgPSAocGF5bG9hZDogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiBnZXRTdHJpbmdQcm9wKHBheWxvYWQsIFwibWVzc2FnZVwiLCBcIk1lc3NhZ2VcIik7XG59O1xuXG5jb25zdCB0b1ZhbGlkYXRpb25FcnJvckl0ZW0gPSAodmFsdWU6IHVua25vd24pOiBWYWxpZGF0aW9uRXJyb3JJdGVtIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHJlY29yZCA9IGFzUmVjb3JkKHZhbHVlKTtcbiAgaWYgKCFyZWNvcmQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGZpZWxkID0gZ2V0U3RyaW5nUHJvcChyZWNvcmQsIFwiRmllbGRcIiwgXCJmaWVsZFwiKTtcbiAgY29uc3QgbWVzc2FnZSA9IGdldFN0cmluZ1Byb3AocmVjb3JkLCBcIk1lc3NhZ2VcIiwgXCJtZXNzYWdlXCIpO1xuICBpZiAoIWZpZWxkICYmICFtZXNzYWdlKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4ge1xuICAgIEZpZWxkOiBmaWVsZCxcbiAgICBNZXNzYWdlOiBtZXNzYWdlLFxuICB9O1xufTtcblxuY29uc3QgZ2V0VmFsaWRhdGlvbkVycm9yc0Zyb21QYXlsb2FkID0gKHBheWxvYWQ6IHVua25vd24pOiBWYWxpZGF0aW9uRXJyb3JJdGVtW10gPT4ge1xuICBjb25zdCByYXdFcnJvcnMgPSBnZXRBcnJheVByb3AocGF5bG9hZCwgXCJFcnJvcnNcIiwgXCJlcnJvcnNcIik7XG4gIHJldHVybiByYXdFcnJvcnNcbiAgICAubWFwKChlbnRyeSkgPT4gdG9WYWxpZGF0aW9uRXJyb3JJdGVtKGVudHJ5KSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIFZhbGlkYXRpb25FcnJvckl0ZW0gPT4gZW50cnkgIT09IG51bGwpO1xufTtcblxuY29uc3QgZm9ybWF0VmFsaWRhdGlvbkVycm9ycyA9IChlcnJvcnM6IFZhbGlkYXRpb25FcnJvckl0ZW1bXSk6IHN0cmluZyA9PiB7XG4gIGlmICghZXJyb3JzLmxlbmd0aCkgcmV0dXJuIFwiXCI7XG5cbiAgcmV0dXJuIGVycm9yc1xuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkuRmllbGQgJiYgZW50cnkuTWVzc2FnZSkgcmV0dXJuIGAke2VudHJ5LkZpZWxkfTogJHtlbnRyeS5NZXNzYWdlfWA7XG4gICAgICByZXR1cm4gZW50cnkuTWVzc2FnZSB8fCBlbnRyeS5GaWVsZDtcbiAgICB9KVxuICAgIC5maWx0ZXIoKHBhcnQpID0+IHBhcnQpXG4gICAgLmpvaW4oXCIgfCBcIik7XG59O1xuXG5jb25zdCBub3JtYWxpemVGb3JNYXRjaCA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiB2YWx1ZVxuICAgIC5ub3JtYWxpemUoXCJORkRcIilcbiAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IGlzQ29udGV4dEJvb3RzdHJhcEZhaWx1cmVNZXNzYWdlID0gKG1lc3NhZ2U6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRm9yTWF0Y2gobWVzc2FnZSk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gQ09OVEVYVF9GQUlMVVJFX0hJTlRTLnNvbWUoKGhpbnQpID0+IG5vcm1hbGl6ZWQuaW5jbHVkZXMoaGludCkpO1xufTtcblxuY29uc3QgZ2V0RGVmYXVsdExvZ2luVXJsID0gKCk6IHN0cmluZyA9PiBcIi9BdXRoL0xvZ2luP2xvZ2dlZE91dD10cnVlXCI7XG5cbmNvbnN0IHJlcXVlc3RGb3JjZWRSZWxvZ2luID0gYXN5bmMgKHJlYXNvbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XG4gIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0ID0ge1xuICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIixcbiAgfTtcblxuICBpZiAoY3NyZlRva2VuKSB7XG4gICAgKGhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XG4gIH1cblxuICBjb25zdCBzYWZlUmVhc29uID0gZW5jb2RlVVJJQ29tcG9uZW50KHJlYXNvbiB8fCBcImNvbnRleHQtZXJyb3JcIik7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvQXV0aC9Gb3JjZVJlbG9naW4/cmVhc29uPSR7c2FmZVJlYXNvbn1gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG5cbiAgICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgY29uc3QgcGF5bG9hZCA9IHRyeVBhcnNlSnNvbihyYXcpO1xuICAgIGNvbnN0IGxvZ2luVXJsID0gZ2V0U3RyaW5nUHJvcChwYXlsb2FkLCBcImxvZ2luVXJsXCIsIFwiTG9naW5VcmxcIik7XG4gICAgcmV0dXJuIGxvZ2luVXJsIHx8IGdldERlZmF1bHRMb2dpblVybCgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZ2V0RGVmYXVsdExvZ2luVXJsKCk7XG4gIH1cbn07XG5cbmNvbnN0IHNob3VsZEZvcmNlUmVsb2dpbiA9IChwYXlsb2FkOiB1bmtub3duLCBzdGF0dXM6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICBpZiAoc3RhdHVzID09PSA0MDEpIHJldHVybiB0cnVlO1xuICBpZiAoZ2V0Qm9vbGVhblByb3AocGF5bG9hZCwgXCJmb3JjZVJlbG9naW5cIiwgXCJGb3JjZVJlbG9naW5cIikgPT09IHRydWUpIHJldHVybiB0cnVlO1xuXG4gIGlmIChnZXRCb29sZWFuUHJvcChwYXlsb2FkLCBcInN1Y2Nlc3NcIiwgXCJTdWNjZXNzXCIpID09PSBmYWxzZSkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBnZXRNZXNzYWdlRnJvbVBheWxvYWQocGF5bG9hZCk7XG4gICAgcmV0dXJuIGlzQ29udGV4dEJvb3RzdHJhcEZhaWx1cmVNZXNzYWdlKG1lc3NhZ2UpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgZm9yY2VSZWxvZ2luQW5kV2FpdCA9IGFzeW5jIDxUPihyZWFzb246IHN0cmluZyk6IFByb21pc2U8VD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKGluZFQoXCJBcGlfU2Vzc2lvbkV4cGlyZWRcIiwgXCJZb3VyIHNlc3Npb24gaGFzIGV4cGlyZWQuXCIpLCA0MDEpO1xuICB9XG5cbiAgaWYgKCFmb3JjZWRSZWxvZ2luUHJvbWlzZSkge1xuICAgIGZvcmNlZFJlbG9naW5Qcm9taXNlID0gcmVxdWVzdEZvcmNlZFJlbG9naW4ocmVhc29uKTtcbiAgfVxuXG4gIGNvbnN0IGxvZ2luVXJsID0gYXdhaXQgZm9yY2VkUmVsb2dpblByb21pc2U7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGxvZ2luVXJsIHx8IGdldERlZmF1bHRMb2dpblVybCgpKTtcblxuICAvLyBLZWVwIHBlbmRpbmcgdW50aWwgbmF2aWdhdGlvbiBmaW5pc2hlcyB0byBhdm9pZCByZW5kZXJpbmcgdHJhbnNpZW50IGVycm9ycy5cbiAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KCgpID0+IHt9KTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEpzb248VCA9IHVua25vd24+KHVybDogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwsIC4uLmZldGNoT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XG5cbiAgY29uc3QgaGVhZGVyczogSGVhZGVyc0luaXQgPSB7XG4gICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAuLi4oZmV0Y2hPcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICB9O1xuXG4gIGlmIChjc3JmVG9rZW4pIHtcbiAgICAoaGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KVtcIlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXSA9IGNzcmZUb2tlbjtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgaGVhZGVycyxcbiAgfSk7XG5cbiAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBjb25zdCBwYXlsb2FkID0gdHJ5UGFyc2VKc29uKHJhdyk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IHBheWxvYWRNZXNzYWdlID0gZ2V0TWVzc2FnZUZyb21QYXlsb2FkKHBheWxvYWQpO1xuICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvcnMgPSBnZXRWYWxpZGF0aW9uRXJyb3JzRnJvbVBheWxvYWQocGF5bG9hZCk7XG4gICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKHZhbGlkYXRpb25FcnJvcnMpO1xuXG4gICAgaWYgKHNob3VsZEZvcmNlUmVsb2dpbihwYXlsb2FkLCByZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgICByZXR1cm4gZm9yY2VSZWxvZ2luQW5kV2FpdDxUPihwYXlsb2FkTWVzc2FnZSB8fCBgaHR0cC0ke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgIGlmICghc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwpIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxuICAgICAgICBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyB0aWVuZXMgcGVybWlzb3MgcGFyYSByZWFsaXphciBlc3RhIGFjY2lvbi5cIiksXG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgcmF3XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChwYXlsb2FkTWVzc2FnZSB8fCB2YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocGF5bG9hZE1lc3NhZ2UgfHwgdmFsaWRhdGlvbk1lc3NhZ2UsIHJlc3BvbnNlLnN0YXR1cywgcmF3LCB2YWxpZGF0aW9uRXJyb3JzKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcbiAgICAgIGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLlwiKSxcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJhdyxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnNcbiAgICApO1xuICB9XG5cbiAgaWYgKCFyYXcudHJpbSgpKSB7XG4gICAgcmV0dXJuIHt9IGFzIFQ7XG4gIH1cblxuICBpZiAocGF5bG9hZCAhPT0gbnVsbCkge1xuICAgIGlmIChzaG91bGRGb3JjZVJlbG9naW4ocGF5bG9hZCwgcmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgICAgY29uc3QgcGF5bG9hZE1lc3NhZ2UgPSBnZXRNZXNzYWdlRnJvbVBheWxvYWQocGF5bG9hZCk7XG4gICAgICByZXR1cm4gZm9yY2VSZWxvZ2luQW5kV2FpdDxUPihwYXlsb2FkTWVzc2FnZSB8fCBcImNvbnRleHQtZXJyb3JcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbiAgfVxuXG4gIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKGluZFQoXCJBcGlfSW52YWxpZEpzb25cIiwgXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIiksIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcbn1cbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgYW5jaG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xuICBvcGVuOiBib29sZWFuO1xuICB6SW5kZXg/OiBudW1iZXI7XG4gIGZpeGVkV2lkdGhQeD86IG51bWJlcjtcbiAgbWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XG4gIHJvdW5kZWRDbGFzcz86IHN0cmluZztcbiAgcm9sZT86IHN0cmluZztcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG5jb25zdCBGbG9hdGluZ0xpc3QgPSAoe1xuICBhbmNob3JSZWYsXG4gIG9wZW4sXG4gIHpJbmRleCA9IDMwMDAwMCxcbiAgZml4ZWRXaWR0aFB4LFxuICBtYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcbiAgcm91bmRlZENsYXNzID0gXCJyb3VuZGVkLW1kXCIsXG4gIHJvbGUsXG4gIHBvcnRhbENsYXNzTmFtZSxcbiAgcGFuZWxDbGFzc05hbWUsXG4gIHBhbmVsU3R5bGUsXG4gIGNoaWxkcmVuLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB1c2VGbG9hdGluZ1Bvc2l0aW9uKGFuY2hvclJlZiwgb3Blbik7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgdG9wOiBzdHlsZS50b3AsXG4gICAgICAgIGxlZnQ6IHN0eWxlLmxlZnQsXG4gICAgICAgIHdpZHRoOiB0eXBlb2YgZml4ZWRXaWR0aFB4ID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZShmaXhlZFdpZHRoUHgpID8gZml4ZWRXaWR0aFB4IDogc3R5bGUud2lkdGgsXG4gICAgICAgIHpJbmRleCxcbiAgICAgIH19XG4gICAgICBjbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIHJvbGU9e3JvbGV9XG4gICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBvdmVyZmxvdy1hdXRvICR7cm91bmRlZENsYXNzfSBiZy13aGl0ZSBweS0xIHRleHQtc20gc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHttYXhIZWlnaHRDbGFzc30gJHtwYW5lbENsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgIHN0eWxlPXtwYW5lbFN0eWxlfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4sXG4gICAgZG9jdW1lbnQuYm9keVxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmdMaXN0O1xuIiwgImltcG9ydCB7IHVzZUxheW91dEVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IHVzZUZsb2F0aW5nUG9zaXRpb24gPSAodGFyZ2V0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+LCBvcGVuOiBib29sZWFuKSA9PiB7XG4gIGNvbnN0IFtzdHlsZSwgc2V0U3R5bGVdID0gdXNlU3RhdGUoeyB0b3A6IDAsIGxlZnQ6IDAsIHdpZHRoOiAwIH0pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuIHx8ICF0YXJnZXRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlY3QgPSB0YXJnZXRSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoIXJlY3QpIHJldHVybjtcbiAgICAgIHNldFN0eWxlKHtcbiAgICAgICAgdG9wOiByZWN0LmJvdHRvbSArIDYsXG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHVwZGF0ZSgpO1xuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4gb3BlbiAmJiB1cGRhdGUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZSk7XG4gICAgfTtcbiAgfSwgW29wZW4sIHRhcmdldFJlZl0pO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25Eb3duU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTkuNSA4LjI1LTcuNSA3LjUtNy41LTcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25VcFN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTQuNSAxNS43NSA3LjUtNy41IDcuNSA3LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgdXNlT3V0c2lkZUNsaWNrID0gKFxuICByZWZzOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+IHwgQXJyYXk8UmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50Pj4sXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWRcbikgPT4ge1xuICBjb25zdCBsaXN0ID0gdXNlTWVtbygoKSA9PiAoQXJyYXkuaXNBcnJheShyZWZzKSA/IHJlZnMgOiBbcmVmc10pLCBbcmVmc10pO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKGxpc3QpO1xuICBjb25zdCBvbkNsb3NlUmVmID0gdXNlUmVmKG9uQ2xvc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGlzdFJlZi5jdXJyZW50ID0gbGlzdDtcbiAgfSwgW2xpc3RdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2xvc2VSZWYuY3VycmVudCA9IG9uQ2xvc2U7XG4gIH0sIFtvbkNsb3NlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVyID0gKGV2OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudExpc3QgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBpc0luc2lkZSA9IGN1cnJlbnRMaXN0LnNvbWUoKHIpID0+IHI/LmN1cnJlbnQgJiYgci5jdXJyZW50LmNvbnRhaW5zKGV2LnRhcmdldCBhcyBOb2RlKSk7XG4gICAgICBpZiAoaXNJbnNpZGUpIHJldHVybjtcbiAgICAgIG9uQ2xvc2VSZWYuY3VycmVudCgpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlcik7XG4gICAgfTtcbiAgfSwgW10pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFVBQVUsTUFBOEI7QUFDNUMsU0FBUSxPQUFPLGVBQWUsZUFBZSxX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Q0FBQztBQUVULCtCQUFVLE1BQU07QUFDZCxlQUFXLFVBQVU7QUFBQSxFQUN2QixHQUFHLENBQUMsT0FBTyxDQUFDO0FBRVosK0JBQVUsTUFBTTtBQUNkLFVBQU0sVUFBVSxDQUFDLE9BQWdDO0FBQy9DLFlBQU0sY0FBYyxRQUFRO0FBQzVCLFlBQU0sV0FBVyxZQUFZLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBVyxFQUFFLFFBQVEsU0FBUyxHQUFHLE1BQWMsQ0FBQztBQUM1RixVQUFJLFNBQVU7QUFDZCxpQkFBVyxRQUFRO0FBQUEsSUFDckI7QUFFQSxhQUFTLGlCQUFpQixhQUFhLE9BQU87QUFDOUMsYUFBUyxpQkFBaUIsY0FBYyxTQUFTLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFFbEUsV0FBTyxNQUFNO0FBQ1gsZUFBUyxvQkFBb0IsYUFBYSxPQUFPO0FBQ2pELGVBQVMsb0JBQW9CLGNBQWMsT0FBTztBQUFBLElBQ3BEO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUNQOyIsCiAgIm5hbWVzIjogWyJnZXRQZXJtaXNzaW9uSTE4biIsICJnZXRJMThuIiwgImluZFQiLCAic2hvd1Blcm1pc3Npb25Nb2RhbCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCJdCn0K
