import {
  require_jsx_runtime
} from "./chunk-WUZVRL45.js";
import {
  indT
} from "./chunk-5TAE4PEJ.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/Spinner.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Spinner = ({ size = "h-4 w-4", label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: `ind-spinner ${size}`, viewBox: "0 0 20 20", role: "status", "aria-label": label || indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) });
var Spinner_default = Spinner;

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

export {
  Spinner_default,
  canAccess,
  showPermissionModal,
  classNames
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvcGVybWlzc2lvbnMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2NsYXNzTmFtZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIHNpemU/OiBzdHJpbmc7XHJcbiAgbGFiZWw/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBTcGlubmVyID0gKHsgc2l6ZSA9IFwiaC00IHctNFwiLCBsYWJlbCB9OiBQcm9wcykgPT4gKFxyXG4gIDxzdmcgY2xhc3NOYW1lPXtgaW5kLXNwaW5uZXIgJHtzaXplfWB9IHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17bGFiZWwgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXI7XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4vaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFDQ0VTU19SSUdIVFMgPSB7XHJcbiAgVmlldzogMSxcclxuICBFZGl0OiAyLFxyXG4gIEFkZDogMyxcclxuICBGdWxsQWNjZXNzOiA0LFxyXG59IGFzIGNvbnN0O1xyXG5cclxuZXhwb3J0IHR5cGUgQWNjZXNzUmlnaHQgPSBrZXlvZiB0eXBlb2YgQUNDRVNTX1JJR0hUUztcclxuXHJcbmNvbnN0IGdldFBlcm1pc3Npb25JMThuID0gKCkgPT4ge1xyXG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9QRVJNSVNTSU9OX0kxOE5fXykgfHwge307XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0TW9kdWxlQWNjZXNzID0gKGNvZGU6IHN0cmluZyk6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgYWNjZXNzID0gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfTU9EVUxFX0FDQ0VTU19fKSB8fCB7fTtcclxuICBjb25zdCB2YWx1ZSA9IGFjY2Vzc1tjb2RlIGFzIGtleW9mIHR5cGVvZiBhY2Nlc3NdO1xyXG4gIHJldHVybiBOdW1iZXIodmFsdWUgPz8gMCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2FuQWNjZXNzID0gKGNvZGU6IHN0cmluZywgbGV2ZWw6IEFjY2Vzc1JpZ2h0ID0gXCJWaWV3XCIpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gZ2V0TW9kdWxlQWNjZXNzKGNvZGUpID49IEFDQ0VTU19SSUdIVFNbbGV2ZWxdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNob3dQZXJtaXNzaW9uTW9kYWwgPSAob3B0cz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LklORD8uc2hvd1Blcm1pc3Npb25Nb2RhbCkge1xyXG4gICAgd2luZG93LklORC5zaG93UGVybWlzc2lvbk1vZGFsKG9wdHMgfHwge30pO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCBwZXJtID0gZ2V0UGVybWlzc2lvbkkxOG4oKTtcclxuICBjb25zdCBmYWxsYmFjayA9IHBlcm0ubWVzc2FnZSB8fCBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiKTtcclxuICBhbGVydChmYWxsYmFjayk7XHJcbn07XHJcbiIsICJleHBvcnQgY29uc3QgY2xhc3NOYW1lcyA9ICguLi5jbGFzc2VzOiBBcnJheTxzdHJpbmcgfCBmYWxzZSB8IG51bGwgfCB1bmRlZmluZWQ+KSA9PlxyXG4gIGNsYXNzZXMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztBQVVJO0FBRkosSUFBTSxVQUFVLENBQUMsRUFBRSxPQUFPLFdBQVcsTUFBTSxNQUN6Qyw0Q0FBQyxTQUFJLFdBQVcsZUFBZSxJQUFJLElBQUksU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLFNBQVMsS0FBSyxrQkFBa0IsU0FBUyxHQUM1SCxzREFBQyxZQUFPLFdBQVUsdUJBQXNCLElBQUcsTUFBSyxJQUFHLE1BQUssR0FBRSxLQUFJLGFBQVksS0FBSSxHQUNoRjtBQUdGLElBQU8sa0JBQVE7OztBQ1pSLElBQU0sZ0JBQWdCO0FBQUEsRUFDM0IsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsWUFBWTtBQUNkO0FBSUEsSUFBTSxvQkFBb0IsTUFBTTtBQUM5QixTQUFRLE9BQU8sZUFBZSxlQUFlLFdBQVcsMkJBQTRCLENBQUM7QUFDdkY7QUFFTyxJQUFNLGtCQUFrQixDQUFDLFNBQXlCO0FBQ3ZELFFBQU0sU0FBVSxPQUFPLGVBQWUsZUFBZSxXQUFXLHlCQUEwQixDQUFDO0FBQzNGLFFBQU0sUUFBUSxPQUFPLElBQTJCO0FBQ2hELFNBQU8sT0FBTyxTQUFTLENBQUM7QUFDMUI7QUFFTyxJQUFNLFlBQVksQ0FBQyxNQUFjLFFBQXFCLFdBQW9CO0FBQy9FLFNBQU8sZ0JBQWdCLElBQUksS0FBSyxjQUFjLEtBQUs7QUFDckQ7QUFFTyxJQUFNLHNCQUFzQixDQUFDLFNBQW1DO0FBQ3JFLE1BQUksT0FBTyxXQUFXLGVBQWUsT0FBTyxLQUFLLHFCQUFxQjtBQUNwRSxXQUFPLElBQUksb0JBQW9CLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDO0FBQUEsRUFDRjtBQUNBLFFBQU0sT0FBTyxrQkFBa0I7QUFDL0IsUUFBTSxXQUFXLEtBQUssV0FBVyxLQUFLLDhCQUE4Qiw0QkFBNEI7QUFDaEcsUUFBTSxRQUFRO0FBQ2hCOzs7QUNqQ08sSUFBTSxhQUFhLElBQUksWUFDNUIsUUFBUSxPQUFPLE9BQU8sRUFBRSxLQUFLLEdBQUc7IiwKICAibmFtZXMiOiBbXQp9Cg==
