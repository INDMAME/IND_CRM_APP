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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL3Blcm1pc3Npb25zLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy9jbGFzc05hbWVzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3NlcnZpY2VzL2FwaVNlcnZpY2UudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGljdCA9IGdldEkxOG4oKTtcbiAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpICYmIHZhbHVlICE9PSBrZXkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRGb3JtYXQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcbiAgY29uc3QgdGVtcGxhdGUgPSBpbmRUKGtleSwgZmFsbGJhY2spO1xuICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IGNvbnN0IEFDQ0VTU19SSUdIVFMgPSB7XG4gIFZpZXc6IDEsXG4gIEVkaXQ6IDIsXG4gIEFkZDogMyxcbiAgRnVsbEFjY2VzczogNCxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCB0eXBlIEFjY2Vzc1JpZ2h0ID0ga2V5b2YgdHlwZW9mIEFDQ0VTU19SSUdIVFM7XG5cbmNvbnN0IGdldFBlcm1pc3Npb25JMThuID0gKCkgPT4ge1xuICByZXR1cm4gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfUEVSTUlTU0lPTl9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE1vZHVsZUFjY2VzcyA9IChjb2RlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBhY2Nlc3MgPSAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18pIHx8IHt9O1xuICBjb25zdCB2YWx1ZSA9IGFjY2Vzc1tjb2RlIGFzIGtleW9mIHR5cGVvZiBhY2Nlc3NdO1xuICByZXR1cm4gTnVtYmVyKHZhbHVlID8/IDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbkFjY2VzcyA9IChjb2RlOiBzdHJpbmcsIGxldmVsOiBBY2Nlc3NSaWdodCA9IFwiVmlld1wiKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBnZXRNb2R1bGVBY2Nlc3MoY29kZSkgPj0gQUNDRVNTX1JJR0hUU1tsZXZlbF07XG59O1xuXG5leHBvcnQgY29uc3Qgc2hvd1Blcm1pc3Npb25Nb2RhbCA9IChvcHRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LklORD8uc2hvd1Blcm1pc3Npb25Nb2RhbCkge1xuICAgIHdpbmRvdy5JTkQuc2hvd1Blcm1pc3Npb25Nb2RhbChvcHRzIHx8IHt9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGVybSA9IGdldFBlcm1pc3Npb25JMThuKCk7XG4gIGNvbnN0IGZhbGxiYWNrID0gcGVybS5tZXNzYWdlIHx8IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIk5vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGVzdGEgYWNjaW9uLlwiKTtcbiAgYWxlcnQoZmFsbGJhY2spO1xufTtcbiIsICJleHBvcnQgY29uc3QgY2xhc3NOYW1lcyA9ICguLi5jbGFzc2VzOiBBcnJheTxzdHJpbmcgfCBmYWxzZSB8IG51bGwgfCB1bmRlZmluZWQ+KSA9PlxuICBjbGFzc2VzLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgc2l6ZT86IHN0cmluZztcbiAgbGFiZWw/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBTcGlubmVyID0gKHsgc2l6ZSA9IFwiaC00IHctNFwiLCBsYWJlbCB9OiBQcm9wcykgPT4gKFxuICA8c3ZnIGNsYXNzTmFtZT17YGluZC1zcGlubmVyICR7c2l6ZX1gfSB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2xhYmVsIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXI7XG4iLCAidHlwZSBQZXJtaXNzaW9uSTE4biA9IHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIG9rPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQXBpRmV0Y2hPcHRpb25zID0gUmVxdWVzdEluaXQgJiB7XG4gIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBBcGlGZXRjaEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0dXM/OiBudW1iZXI7XG4gIHJlc3BvbnNlQm9keT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHN0YXR1cz86IG51bWJlciwgcmVzcG9uc2VCb2R5Pzogc3RyaW5nKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gXCJBcGlGZXRjaEVycm9yXCI7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5yZXNwb25zZUJvZHkgPSByZXNwb25zZUJvZHk7XG4gIH1cbn1cblxuY29uc3QgZ2V0UGVybWlzc2lvbkkxOG4gPSAoKTogUGVybWlzc2lvbkkxOG4gPT4ge1xuICByZXR1cm4gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Ll9fSU5EX1BFUk1JU1NJT05fSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9JMThOX18pIHx8IHt9O1xufTtcblxuY29uc3QgaW5kVCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkaWN0ID0gZ2V0STE4bigpO1xuICBjb25zdCB2YWx1ZSA9IGRpY3Rba2V5XTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50cmltKCkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbn07XG5cbmNvbnN0IHNob3dQZXJtaXNzaW9uTW9kYWwgPSAob3B0cz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5JTkQ/LnNob3dQZXJtaXNzaW9uTW9kYWwpIHtcbiAgICB3aW5kb3cuSU5ELnNob3dQZXJtaXNzaW9uTW9kYWwob3B0cyB8fCB7fSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBlcm0gPSBnZXRQZXJtaXNzaW9uSTE4bigpO1xuICBjb25zdCBmYWxsYmFjayA9IHBlcm0ubWVzc2FnZSB8fCBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyB0aWVuZXMgcGVybWlzb3MgcGFyYSByZWFsaXphciBlc3RhIGFjY2lvbi5cIik7XG4gIGFsZXJ0KGZhbGxiYWNrKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDc3JmVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcbiAgY29uc3QgbWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKTtcbiAgcmV0dXJuIG1ldGEgPyBtZXRhLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIikgfHwgXCJcIiA6IFwiXCI7XG59O1xuXG5jb25zdCB0cnlQYXJzZUpzb24gPSAocmF3OiBzdHJpbmcpOiBhbnkgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcgfHwgIXJhdy50cmltKCkpIHJldHVybiBudWxsO1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJhdyk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5jb25zdCBnZXRNZXNzYWdlRnJvbVBheWxvYWQgPSAocGF5bG9hZDogYW55KTogc3RyaW5nID0+IHtcbiAgY29uc3QgbWVzc2FnZSA9IHBheWxvYWQ/Lm1lc3NhZ2U7XG4gIHJldHVybiB0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIiAmJiBtZXNzYWdlLnRyaW0oKSA/IG1lc3NhZ2UgOiBcIlwiO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSnNvbjxUID0gYW55Pih1cmw6IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8VD4ge1xuICBjb25zdCB7IHN1cHByZXNzUGVybWlzc2lvbk1vZGFsLCAuLi5mZXRjaE9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xuXG4gIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0ID0ge1xuICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgLi4uKGZldGNoT3B0aW9ucy5oZWFkZXJzIHx8IHt9KSxcbiAgfTtcblxuICBpZiAoY3NyZlRva2VuKSB7XG4gICAgKGhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgIGhlYWRlcnMsXG4gIH0pO1xuXG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgY29uc3QgcGF5bG9hZCA9IHRyeVBhcnNlSnNvbihyYXcpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgIGlmICghc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwpIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxuICAgICAgICBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJObyB0aWVuZXMgcGVybWlzb3MgcGFyYSByZWFsaXphciBlc3RhIGFjY2lvbi5cIiksXG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgcmF3XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWRNZXNzYWdlID0gZ2V0TWVzc2FnZUZyb21QYXlsb2FkKHBheWxvYWQpO1xuICAgIGlmIChwYXlsb2FkTWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocGF5bG9hZE1lc3NhZ2UsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIiksIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcbiAgfVxuXG4gIGlmICghcmF3LnRyaW0oKSkge1xuICAgIHJldHVybiB7fSBhcyBUO1xuICB9XG5cbiAgaWYgKHBheWxvYWQgIT09IG51bGwpIHtcbiAgICByZXR1cm4gcGF5bG9hZCBhcyBUO1xuICB9XG5cbiAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoaW5kVChcIkFwaV9JbnZhbGlkSnNvblwiLCBcIkludmFsaWQgc2VydmVyIHJlc3BvbnNlLlwiKSwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xufVxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBhbmNob3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD47XG4gIG9wZW46IGJvb2xlYW47XG4gIHpJbmRleD86IG51bWJlcjtcbiAgbWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XG4gIHJvdW5kZWRDbGFzcz86IHN0cmluZztcbiAgcm9sZT86IHN0cmluZztcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XG4gIGFuY2hvclJlZixcbiAgb3BlbixcbiAgekluZGV4ID0gMzAwMDAwLFxuICBtYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcbiAgcm91bmRlZENsYXNzID0gXCJyb3VuZGVkLW1kXCIsXG4gIHJvbGUsXG4gIHBvcnRhbENsYXNzTmFtZSxcbiAgcGFuZWxDbGFzc05hbWUsXG4gIGNoaWxkcmVuLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB1c2VGbG9hdGluZ1Bvc2l0aW9uKGFuY2hvclJlZiwgb3Blbik7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgdG9wOiBzdHlsZS50b3AsXG4gICAgICAgIGxlZnQ6IHN0eWxlLmxlZnQsXG4gICAgICAgIHdpZHRoOiBzdHlsZS53aWR0aCxcbiAgICAgICAgekluZGV4LFxuICAgICAgfX1cbiAgICAgIGNsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgcm9sZT17cm9sZX1cbiAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG92ZXJmbG93LWF1dG8gJHtyb3VuZGVkQ2xhc3N9IGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke21heEhlaWdodENsYXNzfSAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmJvZHlcbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nTGlzdDtcbiIsICJpbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ1Bvc2l0aW9uID0gKHRhcmdldFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50Piwgb3BlbjogYm9vbGVhbikgPT4ge1xuICBjb25zdCBbc3R5bGUsIHNldFN0eWxlXSA9IHVzZVN0YXRlKHsgdG9wOiAwLCBsZWZ0OiAwLCB3aWR0aDogMCB9KTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhdGFyZ2V0UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gdGFyZ2V0UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKCFyZWN0KSByZXR1cm47XG4gICAgICBzZXRTdHlsZSh7XG4gICAgICAgIHRvcDogcmVjdC5ib3R0b20gKyA2LFxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB1cGRhdGUoKTtcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IG9wZW4gJiYgdXBkYXRlKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGUpO1xuICAgIH07XG4gIH0sIFtvcGVuLCB0YXJnZXRSZWZdKTtcblxuICByZXR1cm4gc3R5bGU7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uRG93blN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE5LjUgOC4yNS03LjUgNy41LTcuNS03LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uVXBTdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm00LjUgMTUuNzUgNy41LTcuNSA3LjUgNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IHVzZU91dHNpZGVDbGljayA9IChcbiAgcmVmczogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PiB8IEFycmF5PFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4+LFxuICBvbkNsb3NlOiAoKSA9PiB2b2lkXG4pID0+IHtcbiAgY29uc3QgbGlzdCA9IHVzZU1lbW8oKCkgPT4gKEFycmF5LmlzQXJyYXkocmVmcykgPyByZWZzIDogW3JlZnNdKSwgW3JlZnNdKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZihsaXN0KTtcbiAgY29uc3Qgb25DbG9zZVJlZiA9IHVzZVJlZihvbkNsb3NlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxpc3RSZWYuY3VycmVudCA9IGxpc3Q7XG4gIH0sIFtsaXN0XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNsb3NlUmVmLmN1cnJlbnQgPSBvbkNsb3NlO1xuICB9LCBbb25DbG9zZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IChldjogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRMaXN0ID0gbGlzdFJlZi5jdXJyZW50O1xuICAgICAgY29uc3QgaXNJbnNpZGUgPSBjdXJyZW50TGlzdC5zb21lKChyKSA9PiByPy5jdXJyZW50ICYmIHIuY3VycmVudC5jb250YWlucyhldi50YXJnZXQgYXMgTm9kZSkpO1xuICAgICAgaWYgKGlzSW5zaWRlKSByZXR1cm47XG4gICAgICBvbkNsb3NlUmVmLmN1cnJlbnQoKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIpO1xuICAgIH07XG4gIH0sIFtdKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsSUFBTSxVQUFVLE1BQThCO0FBQzVDLFNBQVEsT0FBTyxlQUFlLGVBQWUsV0FBVyxnQkFBaUIsQ0FBQztBQUM1RTtBQUVPLElBQU0sT0FBTyxDQUFDLEtBQWEsYUFBOEI7QUFDOUQsUUFBTSxPQUFPLFFBQVE7QUFDckIsUUFBTSxRQUFRLEtBQUssR0FBRztBQUN0QixNQUFJLE9BQU8sVUFBVSxZQUFZLE1BQU0sS0FBSyxLQUFLLFVBQVUsSUFBSyxRQUFPO0FBQ3ZFLFNBQU8sWUFBWTtBQUNyQjtBQUVPLElBQU0sWUFBWSxDQUFDLEtBQWEsYUFBaUMsU0FBaUM7QUFDdkcsUUFBTSxXQUFXLEtBQUssS0FBSyxRQUFRO0FBQ25DLFNBQU8sT0FBTyxRQUFRLEVBQUUsUUFBUSxj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Q3BGO0FBRUo7OztBQ2hDQSxJQUFBQyxnQkFBMkM7QUFFcEMsSUFBTSxrQkFBa0IsQ0FDN0IsTUFDQSxZQUNHO0FBQ0gsUUFBTSxXQUFPLHVCQUFRLE1BQU8sTUFBTSxRQUFRLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxHQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3hFLFFBQU0sY0FBVSxzQkFBTyxJQUFJO0FBQzNCLFFBQU0saUJBQWEsc0JBQU8sT0FBTztBQUVqQywrQkFBVSxNQUFNO0FBQ2QsWUFBUSxVQUFVO0FBQUEsRUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQztBQUVULCtCQUFVLE1BQU07QUFDZCxlQUFXLFVBQVU7QUFBQSxFQUN2QixHQUFHLENBQUMsT0FBTyxDQUFDO0FBRVosK0JBQVUsTUFBTTtBQUNkLFVBQU0sVUFBVSxDQUFDLE9BQWdDO0FBQy9DLFlBQU0sY0FBYyxRQUFRO0FBQzVCLFlBQU0sV0FBVyxZQUFZLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBVyxFQUFFLFFBQVEsU0FBUyxHQUFHLE1BQWMsQ0FBQztBQUM1RixVQUFJLFNBQVU7QUFDZCxpQkFBVyxRQUFRO0FBQUEsSUFDckI7QUFFQSxhQUFTLGlCQUFpQixhQUFhLE9BQU87QUFDOUMsYUFBUyxpQkFBaUIsY0FBYyxTQUFTLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFFbEUsV0FBTyxNQUFNO0FBQ1gsZUFBUyxvQkFBb0IsYUFBYSxPQUFPO0FBQ2pELGVBQVMsb0JBQW9CLGNBQWMsT0FBTztBQUFBLElBQ3BEO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUNQOyIsCiAgIm5hbWVzIjogWyJnZXRQZXJtaXNzaW9uSTE4biIsICJnZXRJMThuIiwgImluZFQiLCAic2hvd1Blcm1pc3Npb25Nb2RhbCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCJdCn0K
