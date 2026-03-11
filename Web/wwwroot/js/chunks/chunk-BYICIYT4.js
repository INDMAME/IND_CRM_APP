import {
  require_jsx_runtime
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
  indT,
  indFormat,
  Spinner_default,
  canAccess,
  showPermissionModal,
  classNames
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvcGVybWlzc2lvbnMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2NsYXNzTmFtZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIHJldHVybiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9JMThOX18pIHx8IHt9O1xufTtcblxuZXhwb3J0IGNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGljdCA9IGdldEkxOG4oKTtcbiAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpICYmIHZhbHVlICE9PSBrZXkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmRGb3JtYXQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrOiBzdHJpbmcgfCB1bmRlZmluZWQsIC4uLmFyZ3M6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pID0+IHtcbiAgY29uc3QgdGVtcGxhdGUgPSBpbmRUKGtleSwgZmFsbGJhY2spO1xuICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIHNpemU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xufTtcblxuY29uc3QgU3Bpbm5lciA9ICh7IHNpemUgPSBcImgtNCB3LTRcIiwgbGFiZWwgfTogUHJvcHMpID0+IChcbiAgPHN2ZyBjbGFzc05hbWU9e2BpbmQtc3Bpbm5lciAke3NpemV9YH0gdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtsYWJlbCB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyO1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi9pbmRJMThuLnRzXCI7XG5cbmV4cG9ydCBjb25zdCBBQ0NFU1NfUklHSFRTID0ge1xuICBWaWV3OiAxLFxuICBFZGl0OiAyLFxuICBBZGQ6IDMsXG4gIEZ1bGxBY2Nlc3M6IDQsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBBY2Nlc3NSaWdodCA9IGtleW9mIHR5cGVvZiBBQ0NFU1NfUklHSFRTO1xuXG5jb25zdCBnZXRQZXJtaXNzaW9uSTE4biA9ICgpID0+IHtcbiAgcmV0dXJuICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWxUaGlzLl9fSU5EX1BFUk1JU1NJT05fSTE4Tl9fKSB8fCB7fTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRNb2R1bGVBY2Nlc3MgPSAoY29kZTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgY29uc3QgYWNjZXNzID0gKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbFRoaXMuX19JTkRfTU9EVUxFX0FDQ0VTU19fKSB8fCB7fTtcbiAgY29uc3QgdmFsdWUgPSBhY2Nlc3NbY29kZSBhcyBrZXlvZiB0eXBlb2YgYWNjZXNzXTtcbiAgcmV0dXJuIE51bWJlcih2YWx1ZSA/PyAwKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjYW5BY2Nlc3MgPSAoY29kZTogc3RyaW5nLCBsZXZlbDogQWNjZXNzUmlnaHQgPSBcIlZpZXdcIik6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gZ2V0TW9kdWxlQWNjZXNzKGNvZGUpID49IEFDQ0VTU19SSUdIVFNbbGV2ZWxdO1xufTtcblxuZXhwb3J0IGNvbnN0IHNob3dQZXJtaXNzaW9uTW9kYWwgPSAob3B0cz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5JTkQ/LnNob3dQZXJtaXNzaW9uTW9kYWwpIHtcbiAgICB3aW5kb3cuSU5ELnNob3dQZXJtaXNzaW9uTW9kYWwob3B0cyB8fCB7fSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBlcm0gPSBnZXRQZXJtaXNzaW9uSTE4bigpO1xuICBjb25zdCBmYWxsYmFjayA9IHBlcm0ubWVzc2FnZSB8fCBpbmRUKFwiQXV0aF9QZXJtaXNzaW9uRGVuaWVkX0JvZHlcIiwgXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiKTtcbiAgYWxlcnQoZmFsbGJhY2spO1xufTtcbiIsICJleHBvcnQgY29uc3QgY2xhc3NOYW1lcyA9ICguLi5jbGFzc2VzOiBBcnJheTxzdHJpbmcgfCBmYWxzZSB8IG51bGwgfCB1bmRlZmluZWQ+KSA9PlxuICBjbGFzc2VzLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUEsSUFBTSxVQUFVLE1BQThCO0FBQzVDLFNBQVEsT0FBTyxlQUFlLGVBQWUsV0FBVyxnQkFBaUIsQ0FBQztBQUM1RTtBQUVPLElBQU0sT0FBTyxDQUFDLEtBQWEsYUFBOEI7QUFDOUQsUUFBTSxPQUFPLFFBQVE7QUFDckIsUUFBTSxRQUFRLEtBQUssR0FBRztBQUN0QixNQUFJLE9BQU8sVUFBVSxZQUFZLE1BQU0sS0FBSyxLQUFLLFVBQVUsSUFBSyxRQUFPO0FBQ3ZFLFNBQU8sWUFBWTtBQUNyQjtBQUVPLElBQU0sWUFBWSxDQUFDLEtBQWEsYUFBaUMsU0FBaUM7QUFDdkcsUUFBTSxXQUFXLEtBQUssS0FBSyxRQUFRO0FBQ25DLFNBQU8sT0FBTyxRQUFRLEVBQUUsUUFBUSxjQUFjLENBQUMsR0FBRyxRQUFRLE9BQU8sS0FBSyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMzRjs7O0FDSkk7QUFGSixJQUFNLFVBQVUsQ0FBQyxFQUFFLE9BQU8sV0FBVyxNQUFNLE1BQ3pDLDRDQUFDLFNBQUksV0FBVyxlQUFlLElBQUksSUFBSSxTQUFRLGFBQVksTUFBSyxVQUFTLGNBQVksU0FBUyxLQUFLLGtCQUFrQixTQUFTLEdBQzVILHNEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBR0YsSUFBTyxrQkFBUTs7O0FDWlIsSUFBTSxnQkFBZ0I7QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQ2Q7QUFJQSxJQUFNLG9CQUFvQixNQUFNO0FBQzlCLFNBQVEsT0FBTyxlQUFlLGVBQWUsV0FBVywyQkFBNEIsQ0FBQztBQUN2RjtBQUVPLElBQU0sa0JBQWtCLENBQUMsU0FBeUI7QUFDdkQsUUFBTSxTQUFVLE9BQU8sZUFBZSxlQUFlLFdBQVcseUJBQTBCLENBQUM7QUFDM0YsUUFBTSxRQUFRLE9BQU8sSUFBMkI7QUFDaEQsU0FBTyxPQUFPLFNBQVMsQ0FBQztBQUMxQjtBQUVPLElBQU0sWUFBWSxDQUFDLE1BQWMsUUFBcUIsV0FBb0I7QUFDL0UsU0FBTyxnQkFBZ0IsSUFBSSxLQUFLLGNBQWMsS0FBSztBQUNyRDtBQUVPLElBQU0sc0JBQXNCLENBQUMsU0FBbUM7QUFDckUsTUFBSSxPQUFPLFdBQVcsZUFBZSxPQUFPLEtBQUsscUJBQXFCO0FBQ3BFLFdBQU8sSUFBSSxvQkFBb0IsUUFBUSxDQUFDLENBQUM7QUFDekM7QUFBQSxFQUNGO0FBQ0EsUUFBTSxPQUFPLGtCQUFrQjtBQUMvQixRQUFNLFdBQVcsS0FBSyxXQUFXLEtBQUssOEJBQThCLDRCQUE0QjtBQUNoRyxRQUFNLFFBQVE7QUFDaEI7OztBQ2pDTyxJQUFNLGFBQWEsSUFBSSxZQUM1QixRQUFRLE9BQU8sT0FBTyxFQUFFLEtBQUssR0FBRzsiLAogICJuYW1lcyI6IFtdCn0K
