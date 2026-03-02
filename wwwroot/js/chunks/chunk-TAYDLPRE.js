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
  const fallback = perm.message || indT("Auth_PermissionDenied_Body", "Auth_PermissionDenied_Body");
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
  const fallback = perm.message || indT2("Auth_PermissionDenied_Body", "Auth_PermissionDenied_Body");
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
        indT2("Auth_PermissionDenied_Body", "Auth_PermissionDenied_Body"),
        response.status,
        raw
      );
    }
    if (payloadMessage || validationMessage) {
      throw new ApiFetchError(payloadMessage || validationMessage, response.status, raw, validationErrors);
    }
    throw new ApiFetchError(
      indT2("Api_RequestFailed", "Api_RequestFailed"),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Blcm1pc3Npb25zLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy9jbGFzc05hbWVzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL2FwaVNlcnZpY2UudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGljdCA9IGdldEkxOG4oKTtcbiAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpICYmIHZhbHVlICE9PSBrZXkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRGb3JtYXQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcbiAgY29uc3QgdGVtcGxhdGUgPSBpbmRUKGtleSwgZmFsbGJhY2spO1xuICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IGNvbnN0IEFDQ0VTU19SSUdIVFMgPSB7XG4gIFZpZXc6IDEsXG4gIEVkaXQ6IDIsXG4gIEFkZDogMyxcbiAgRnVsbEFjY2VzczogNCxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIEFjY2Vzc1JpZ2h0ID0ga2V5b2YgdHlwZW9mIEFDQ0VTU19SSUdIVFM7XG5cbmNvbnN0IGdldFBlcm1pc3Npb25JMThuID0gKCkgPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfUEVSTUlTU0lPTl9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1vZHVsZUFjY2VzcyA9IChjb2RlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18pIHx8IHt9O1xuICBjb25zdCB2YWx1ZSA9IGFjY2Vzc1tjb2RlIGFzIGtleW9mIHR5cGVvZiBhY2Nlc3NdO1xuICByZXR1cm4gTnVtYmVyKHZhbHVlID8/IDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbkFjY2VzcyA9IChjb2RlOiBzdHJpbmcsIGxldmVsOiBBY2Nlc3NSaWdodCA9IFwiVmlld1wiKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBnZXRNb2R1bGVBY2Nlc3MoY29kZSkgPj0gQUNDRVNTX1JJR0hUU1tsZXZlbF07XG59O1xuXG5leHBvcnQgY29uc3Qgc2hvd1Blcm1pc3Npb25Nb2RhbCA9IChvcHRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LklORD8uc2hvd1Blcm1pc3Npb25Nb2RhbCkge1xuICAgIHdpbmRvdy5JTkQuc2hvd1Blcm1pc3Npb25Nb2RhbChvcHRzIHx8IHt9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGVybSA9IGdldFBlcm1pc3Npb25JMThuKCk7XG4gIGNvbnN0IGZhbGxiYWNrID0gcGVybS5tZXNzYWdlIHx8IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIpO1xuICBhbGVydChmYWxsYmFjayk7XG59O1xuIiwgImV4cG9ydCBjb25zdCBjbGFzc05hbWVzID0gKC4uLmNsYXNzZXM6IEFycmF5PHN0cmluZyB8IGZhbHNlIHwgbnVsbCB8IHVuZGVmaW5lZD4pID0+XG4gIGNsYXNzZXMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBzaXplPzogc3RyaW5nO1xuICBsYWJlbD86IHN0cmluZztcbn07XG5cbmNvbnN0IFNwaW5uZXIgPSAoeyBzaXplID0gXCJoLTQgdy00XCIsIGxhYmVsIH06IFByb3BzKSA9PiAoXG4gIDxzdmcgY2xhc3NOYW1lPXtgaW5kLXNwaW5uZXIgJHtzaXplfWB9IHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17bGFiZWwgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcjtcbiIsICJ0eXBlIFBlcm1pc3Npb25JMThuID0ge1xuICB0aXRsZT86IHN0cmluZztcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgb2s/OiBzdHJpbmc7XG59O1xuXG50eXBlIFZhbGlkYXRpb25FcnJvckl0ZW0gPSB7XG4gIEZpZWxkOiBzdHJpbmc7XG4gIE1lc3NhZ2U6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEFwaUZldGNoT3B0aW9ucyA9IFJlcXVlc3RJbml0ICYge1xuICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY2xhc3MgQXBpRmV0Y2hFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdHVzPzogbnVtYmVyO1xuICByZXNwb25zZUJvZHk/OiBzdHJpbmc7XG4gIHZhbGlkYXRpb25FcnJvcnM/OiBWYWxpZGF0aW9uRXJyb3JJdGVtW107XG5cbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBzdGF0dXM/OiBudW1iZXIsIHJlc3BvbnNlQm9keT86IHN0cmluZywgdmFsaWRhdGlvbkVycm9ycz86IFZhbGlkYXRpb25FcnJvckl0ZW1bXSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9IFwiQXBpRmV0Y2hFcnJvclwiO1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIHRoaXMucmVzcG9uc2VCb2R5ID0gcmVzcG9uc2VCb2R5O1xuICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IHZhbGlkYXRpb25FcnJvcnM7XG4gIH1cbn1cblxuY29uc3QgZ2V0UGVybWlzc2lvbkkxOG4gPSAoKTogUGVybWlzc2lvbkkxOG4gPT4ge1xuICByZXR1cm4gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Ll9fSU5EX1BFUk1JU1NJT05fSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9JMThOX18pIHx8IHt9O1xufTtcblxuY29uc3QgaW5kVCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkaWN0ID0gZ2V0STE4bigpO1xuICBjb25zdCB2YWx1ZSA9IGRpY3Rba2V5XTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50cmltKCkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbn07XG5cbmNvbnN0IHNob3dQZXJtaXNzaW9uTW9kYWwgPSAob3B0cz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5JTkQ/LnNob3dQZXJtaXNzaW9uTW9kYWwpIHtcbiAgICB3aW5kb3cuSU5ELnNob3dQZXJtaXNzaW9uTW9kYWwob3B0cyB8fCB7fSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBlcm0gPSBnZXRQZXJtaXNzaW9uSTE4bigpO1xuICBjb25zdCBmYWxsYmFjayA9IHBlcm0ubWVzc2FnZSB8fCBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiKTtcbiAgYWxlcnQoZmFsbGJhY2spO1xufTtcblxuY29uc3QgQ09OVEVYVF9GQUlMVVJFX0hJTlRTID0gW1xuICBcImNvbnRleHRvIGRlIGNvbXBhbmlhcyBubyBpbmljaWFsaXphZG9cIixcbiAgXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLFxuICBcImNvbXBhbnkgY29udGV4dCBub3QgaW5pdGlhbGl6ZWRcIixcbiAgXCJjb250ZXh0IG5vdCBpbml0aWFsaXplZFwiLFxuXTtcblxubGV0IGZvcmNlZFJlbG9naW5Qcm9taXNlOiBQcm9taXNlPHN0cmluZz4gfCBudWxsID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGdldENzcmZUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBtZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpO1xuICByZXR1cm4gbWV0YSA/IG1ldGEuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKSB8fCBcIlwiIDogXCJcIjtcbn07XG5cbmNvbnN0IHRyeVBhcnNlSnNvbiA9IChyYXc6IHN0cmluZyk6IHVua25vd24gfCBudWxsID0+IHtcbiAgaWYgKCFyYXcgfHwgIXJhdy50cmltKCkpIHJldHVybiBudWxsO1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJhdyk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBhc1JlY29yZCA9IChwYXlsb2FkOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0+IHtcbiAgaWYgKCFwYXlsb2FkIHx8IHR5cGVvZiBwYXlsb2FkICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIHBheWxvYWQgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG59O1xuXG5jb25zdCBnZXRTdHJpbmdQcm9wID0gKHBheWxvYWQ6IHVua25vd24sIC4uLmtleXM6IHN0cmluZ1tdKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmVjb3JkID0gYXNSZWNvcmQocGF5bG9hZCk7XG4gIGlmICghcmVjb3JkKSByZXR1cm4gXCJcIjtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgY29uc3QgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRyaW0oKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gXCJcIjtcbn07XG5cbmNvbnN0IGdldEJvb2xlYW5Qcm9wID0gKHBheWxvYWQ6IHVua25vd24sIC4uLmtleXM6IHN0cmluZ1tdKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBjb25zdCByZWNvcmQgPSBhc1JlY29yZChwYXlsb2FkKTtcbiAgaWYgKCFyZWNvcmQpIHJldHVybiBudWxsO1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZFtrZXldO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGdldEFycmF5UHJvcCA9IChwYXlsb2FkOiB1bmtub3duLCAuLi5rZXlzOiBzdHJpbmdbXSk6IHVua25vd25bXSA9PiB7XG4gIGNvbnN0IHJlY29yZCA9IGFzUmVjb3JkKHBheWxvYWQpO1xuICBpZiAoIXJlY29yZCkgcmV0dXJuIFtdO1xuXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZFtrZXldO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufTtcblxuY29uc3QgZ2V0TWVzc2FnZUZyb21QYXlsb2FkID0gKHBheWxvYWQ6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZ2V0U3RyaW5nUHJvcChwYXlsb2FkLCBcIm1lc3NhZ2VcIiwgXCJNZXNzYWdlXCIpO1xufTtcblxuY29uc3QgdG9WYWxpZGF0aW9uRXJyb3JJdGVtID0gKHZhbHVlOiB1bmtub3duKTogVmFsaWRhdGlvbkVycm9ySXRlbSB8IG51bGwgPT4ge1xuICBjb25zdCByZWNvcmQgPSBhc1JlY29yZCh2YWx1ZSk7XG4gIGlmICghcmVjb3JkKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBmaWVsZCA9IGdldFN0cmluZ1Byb3AocmVjb3JkLCBcIkZpZWxkXCIsIFwiZmllbGRcIik7XG4gIGNvbnN0IG1lc3NhZ2UgPSBnZXRTdHJpbmdQcm9wKHJlY29yZCwgXCJNZXNzYWdlXCIsIFwibWVzc2FnZVwiKTtcbiAgaWYgKCFmaWVsZCAmJiAhbWVzc2FnZSkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICBGaWVsZDogZmllbGQsXG4gICAgTWVzc2FnZTogbWVzc2FnZSxcbiAgfTtcbn07XG5cbmNvbnN0IGdldFZhbGlkYXRpb25FcnJvcnNGcm9tUGF5bG9hZCA9IChwYXlsb2FkOiB1bmtub3duKTogVmFsaWRhdGlvbkVycm9ySXRlbVtdID0+IHtcbiAgY29uc3QgcmF3RXJyb3JzID0gZ2V0QXJyYXlQcm9wKHBheWxvYWQsIFwiRXJyb3JzXCIsIFwiZXJyb3JzXCIpO1xuICByZXR1cm4gcmF3RXJyb3JzXG4gICAgLm1hcCgoZW50cnkpID0+IHRvVmFsaWRhdGlvbkVycm9ySXRlbShlbnRyeSkpXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBWYWxpZGF0aW9uRXJyb3JJdGVtID0+IGVudHJ5ICE9PSBudWxsKTtcbn07XG5cbmNvbnN0IGZvcm1hdFZhbGlkYXRpb25FcnJvcnMgPSAoZXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JJdGVtW10pOiBzdHJpbmcgPT4ge1xuICBpZiAoIWVycm9ycy5sZW5ndGgpIHJldHVybiBcIlwiO1xuXG4gIHJldHVybiBlcnJvcnNcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgaWYgKGVudHJ5LkZpZWxkICYmIGVudHJ5Lk1lc3NhZ2UpIHJldHVybiBgJHtlbnRyeS5GaWVsZH06ICR7ZW50cnkuTWVzc2FnZX1gO1xuICAgICAgcmV0dXJuIGVudHJ5Lk1lc3NhZ2UgfHwgZW50cnkuRmllbGQ7XG4gICAgfSlcbiAgICAuZmlsdGVyKChwYXJ0KSA9PiBwYXJ0KVxuICAgIC5qb2luKFwiIHwgXCIpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplRm9yTWF0Y2ggPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xuICByZXR1cm4gdmFsdWVcbiAgICAubm9ybWFsaXplKFwiTkZEXCIpXG4gICAgLnJlcGxhY2UoL1tcXHUwMzAwLVxcdTAzNmZdL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5jb25zdCBpc0NvbnRleHRCb290c3RyYXBGYWlsdXJlTWVzc2FnZSA9IChtZXNzYWdlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUZvck1hdGNoKG1lc3NhZ2UpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIENPTlRFWFRfRkFJTFVSRV9ISU5UUy5zb21lKChoaW50KSA9PiBub3JtYWxpemVkLmluY2x1ZGVzKGhpbnQpKTtcbn07XG5cbmNvbnN0IGdldERlZmF1bHRMb2dpblVybCA9ICgpOiBzdHJpbmcgPT4gXCIvQXV0aC9Mb2dpbj9sb2dnZWRPdXQ9dHJ1ZVwiO1xuXG5jb25zdCByZXF1ZXN0Rm9yY2VkUmVsb2dpbiA9IGFzeW5jIChyZWFzb246IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xuICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHtcbiAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXG4gIH07XG5cbiAgaWYgKGNzcmZUb2tlbikge1xuICAgIChoZWFkZXJzIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4pW1wiUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuXCJdID0gY3NyZlRva2VuO1xuICB9XG5cbiAgY29uc3Qgc2FmZVJlYXNvbiA9IGVuY29kZVVSSUNvbXBvbmVudChyZWFzb24gfHwgXCJjb250ZXh0LWVycm9yXCIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL0F1dGgvRm9yY2VSZWxvZ2luP3JlYXNvbj0ke3NhZmVSZWFzb259YCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICBoZWFkZXJzLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgIGNvbnN0IHBheWxvYWQgPSB0cnlQYXJzZUpzb24ocmF3KTtcbiAgICBjb25zdCBsb2dpblVybCA9IGdldFN0cmluZ1Byb3AocGF5bG9hZCwgXCJsb2dpblVybFwiLCBcIkxvZ2luVXJsXCIpO1xuICAgIHJldHVybiBsb2dpblVybCB8fCBnZXREZWZhdWx0TG9naW5VcmwoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGdldERlZmF1bHRMb2dpblVybCgpO1xuICB9XG59O1xuXG5jb25zdCBzaG91bGRGb3JjZVJlbG9naW4gPSAocGF5bG9hZDogdW5rbm93biwgc3RhdHVzOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgaWYgKHN0YXR1cyA9PT0gNDAxKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKGdldEJvb2xlYW5Qcm9wKHBheWxvYWQsIFwiZm9yY2VSZWxvZ2luXCIsIFwiRm9yY2VSZWxvZ2luXCIpID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoZ2V0Qm9vbGVhblByb3AocGF5bG9hZCwgXCJzdWNjZXNzXCIsIFwiU3VjY2Vzc1wiKSA9PT0gZmFsc2UpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gZ2V0TWVzc2FnZUZyb21QYXlsb2FkKHBheWxvYWQpO1xuICAgIHJldHVybiBpc0NvbnRleHRCb290c3RyYXBGYWlsdXJlTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGZvcmNlUmVsb2dpbkFuZFdhaXQgPSBhc3luYyA8VD4ocmVhc29uOiBzdHJpbmcpOiBQcm9taXNlPFQ+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihpbmRUKFwiQXBpX1Nlc3Npb25FeHBpcmVkXCIsIFwiWW91ciBzZXNzaW9uIGhhcyBleHBpcmVkLlwiKSwgNDAxKTtcbiAgfVxuXG4gIGlmICghZm9yY2VkUmVsb2dpblByb21pc2UpIHtcbiAgICBmb3JjZWRSZWxvZ2luUHJvbWlzZSA9IHJlcXVlc3RGb3JjZWRSZWxvZ2luKHJlYXNvbik7XG4gIH1cblxuICBjb25zdCBsb2dpblVybCA9IGF3YWl0IGZvcmNlZFJlbG9naW5Qcm9taXNlO1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShsb2dpblVybCB8fCBnZXREZWZhdWx0TG9naW5VcmwoKSk7XG5cbiAgLy8gS2VlcCBwZW5kaW5nIHVudGlsIG5hdmlnYXRpb24gZmluaXNoZXMgdG8gYXZvaWQgcmVuZGVyaW5nIHRyYW5zaWVudCBlcnJvcnMuXG4gIHJldHVybiBuZXcgUHJvbWlzZTxUPigoKSA9PiB7fSk7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hKc29uPFQgPSB1bmtub3duPih1cmw6IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8VD4ge1xuICBjb25zdCB7IHN1cHByZXNzUGVybWlzc2lvbk1vZGFsLCAuLi5mZXRjaE9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xuXG4gIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0ID0ge1xuICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgLi4uKGZldGNoT3B0aW9ucy5oZWFkZXJzIHx8IHt9KSxcbiAgfTtcblxuICBpZiAoY3NyZlRva2VuKSB7XG4gICAgKGhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgIGhlYWRlcnMsXG4gIH0pO1xuXG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgY29uc3QgcGF5bG9hZCA9IHRyeVBhcnNlSnNvbihyYXcpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCBwYXlsb2FkTWVzc2FnZSA9IGdldE1lc3NhZ2VGcm9tUGF5bG9hZChwYXlsb2FkKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzID0gZ2V0VmFsaWRhdGlvbkVycm9yc0Zyb21QYXlsb2FkKHBheWxvYWQpO1xuICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gZm9ybWF0VmFsaWRhdGlvbkVycm9ycyh2YWxpZGF0aW9uRXJyb3JzKTtcblxuICAgIGlmIChzaG91bGRGb3JjZVJlbG9naW4ocGF5bG9hZCwgcmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgICAgcmV0dXJuIGZvcmNlUmVsb2dpbkFuZFdhaXQ8VD4ocGF5bG9hZE1lc3NhZ2UgfHwgYGh0dHAtJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICBpZiAoIXN1cHByZXNzUGVybWlzc2lvbk1vZGFsKSBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcbiAgICAgICAgaW5kVChcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIsIFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiksXG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgcmF3XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChwYXlsb2FkTWVzc2FnZSB8fCB2YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocGF5bG9hZE1lc3NhZ2UgfHwgdmFsaWRhdGlvbk1lc3NhZ2UsIHJlc3BvbnNlLnN0YXR1cywgcmF3LCB2YWxpZGF0aW9uRXJyb3JzKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcbiAgICAgIGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIkFwaV9SZXF1ZXN0RmFpbGVkXCIpLFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmF3LFxuICAgICAgdmFsaWRhdGlvbkVycm9yc1xuICAgICk7XG4gIH1cblxuICBpZiAoIXJhdy50cmltKCkpIHtcbiAgICByZXR1cm4ge30gYXMgVDtcbiAgfVxuXG4gIGlmIChwYXlsb2FkICE9PSBudWxsKSB7XG4gICAgaWYgKHNob3VsZEZvcmNlUmVsb2dpbihwYXlsb2FkLCByZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgICBjb25zdCBwYXlsb2FkTWVzc2FnZSA9IGdldE1lc3NhZ2VGcm9tUGF5bG9hZChwYXlsb2FkKTtcbiAgICAgIHJldHVybiBmb3JjZVJlbG9naW5BbmRXYWl0PFQ+KHBheWxvYWRNZXNzYWdlIHx8IFwiY29udGV4dC1lcnJvclwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF5bG9hZCBhcyBUO1xuICB9XG5cbiAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoaW5kVChcIkFwaV9JbnZhbGlkSnNvblwiLCBcIkludmFsaWQgc2VydmVyIHJlc3BvbnNlLlwiKSwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xufVxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBhbmNob3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD47XG4gIG9wZW46IGJvb2xlYW47XG4gIHpJbmRleD86IG51bWJlcjtcbiAgZml4ZWRXaWR0aFB4PzogbnVtYmVyO1xuICBtYXhIZWlnaHRDbGFzcz86IHN0cmluZztcbiAgcm91bmRlZENsYXNzPzogc3RyaW5nO1xuICByb2xlPzogc3RyaW5nO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbFN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XG4gIGFuY2hvclJlZixcbiAgb3BlbixcbiAgekluZGV4ID0gMzAwMDAwLFxuICBmaXhlZFdpZHRoUHgsXG4gIG1heEhlaWdodENsYXNzID0gXCJtYXgtaC03MlwiLFxuICByb3VuZGVkQ2xhc3MgPSBcInJvdW5kZWQtbWRcIixcbiAgcm9sZSxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgcGFuZWxTdHlsZSxcbiAgY2hpbGRyZW4sXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBzdHlsZSA9IHVzZUZsb2F0aW5nUG9zaXRpb24oYW5jaG9yUmVmLCBvcGVuKTtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICB0b3A6IHN0eWxlLnRvcCxcbiAgICAgICAgbGVmdDogc3R5bGUubGVmdCxcbiAgICAgICAgd2lkdGg6IHR5cGVvZiBmaXhlZFdpZHRoUHggPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKGZpeGVkV2lkdGhQeCkgPyBmaXhlZFdpZHRoUHggOiBzdHlsZS53aWR0aCxcbiAgICAgICAgekluZGV4LFxuICAgICAgfX1cbiAgICAgIGNsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgcm9sZT17cm9sZX1cbiAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG92ZXJmbG93LWF1dG8gJHtyb3VuZGVkQ2xhc3N9IGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke21heEhlaWdodENsYXNzfSAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgICAgc3R5bGU9e3BhbmVsU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5ib2R5XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0xpc3Q7XG4iLCAiaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdQb3NpdGlvbiA9ICh0YXJnZXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4sIG9wZW46IGJvb2xlYW4pID0+IHtcbiAgY29uc3QgW3N0eWxlLCBzZXRTdHlsZV0gPSB1c2VTdGF0ZSh7IHRvcDogMCwgbGVmdDogMCwgd2lkdGg6IDAgfSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4gfHwgIXRhcmdldFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IHRhcmdldFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICghcmVjdCkgcmV0dXJuO1xuICAgICAgc2V0U3R5bGUoe1xuICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgNixcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdXBkYXRlKCk7XG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBvcGVuICYmIHVwZGF0ZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IGNhcHR1cmU6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcbiAgICB9O1xuICB9LCBbb3BlbiwgdGFyZ2V0UmVmXSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvbkRvd25TdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xOS41IDguMjUtNy41IDcuNS03LjUtNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvblVwU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNC41IDE1Ljc1IDcuNS03LjUgNy41IDcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCB1c2VPdXRzaWRlQ2xpY2sgPSAoXG4gIHJlZnM6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4gfCBBcnJheTxSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+PixcbiAgb25DbG9zZTogKCkgPT4gdm9pZFxuKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSB1c2VNZW1vKCgpID0+IChBcnJheS5pc0FycmF5KHJlZnMpID8gcmVmcyA6IFtyZWZzXSksIFtyZWZzXSk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWYobGlzdCk7XG4gIGNvbnN0IG9uQ2xvc2VSZWYgPSB1c2VSZWYob25DbG9zZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsaXN0UmVmLmN1cnJlbnQgPSBsaXN0O1xuICB9LCBbbGlzdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DbG9zZVJlZi5jdXJyZW50ID0gb25DbG9zZTtcbiAgfSwgW29uQ2xvc2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSAoZXY6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGlzSW5zaWRlID0gY3VycmVudExpc3Quc29tZSgocikgPT4gcj8uY3VycmVudCAmJiByLmN1cnJlbnQuY29udGFpbnMoZXYudGFyZ2V0IGFzIE5vZGUpKTtcbiAgICAgIGlmIChpc0luc2lkZSkgcmV0dXJuO1xuICAgICAgb25DbG9zZVJlZi5jdXJyZW50KCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyKTtcbiAgICB9O1xuICB9LCBbXSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQU0sVUFBVSxNQUE4QjtBQUM1QyxTQUFRLE9BQU8sZUFBZSxlQUFlLFdBQVcsZ0JBQWlCLENBQUM7QUFDNUU7QUFFTyxJQUFNLE9BQU8sQ0FBQyxLQUFhLGFBQThCO0FBQzlELFFBQU0sT0FBTyxRQUFR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QkFBVSxNQUFNO0FBQ2QsVUFBTSxVQUFVLENBQUMsT0FBZ0M7QUFDL0MsWUFBTSxjQUFjLFFBQVE7QUFDNUIsWUFBTSxXQUFXLFlBQVksS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLEVBQUUsUUFBUSxTQUFTLEdBQUcsTUFBYyxDQUFDO0FBQzVGLFVBQUksU0FBVTtBQUNkLGlCQUFXLFFBQVE7QUFBQSxJQUNyQjtBQUVBLGFBQVMsaUJBQWlCLGFBQWEsT0FBTztBQUM5QyxhQUFTLGlCQUFpQixjQUFjLFNBQVMsRUFBRSxTQUFTLEtBQUssQ0FBQztBQUVsRSxXQUFPLE1BQU07QUFDWCxlQUFTLG9CQUFvQixhQUFhLE9BQU87QUFDakQsZUFBUyxvQkFBb0IsY0FBYyxPQUFPO0FBQUEsSUFDcEQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBQ1A7IiwKICAibmFtZXMiOiBbImdldFBlcm1pc3Npb25JMThuIiwgImdldEkxOG4iLCAiaW5kVCIsICJzaG93UGVybWlzc2lvbk1vZGFsIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0Il0KfQo=
