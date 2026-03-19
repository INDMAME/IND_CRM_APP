import {
  require_jsx_runtime
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2luZEkxOG4udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvcGVybWlzc2lvbnMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2NsYXNzTmFtZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IGdldEkxOG4gPSAoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XHJcbiAgcmV0dXJuICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXykgfHwge307XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5kVCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRpY3QgPSBnZXRJMThuKCk7XHJcbiAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50cmltKCkgJiYgdmFsdWUgIT09IGtleSkgcmV0dXJuIHZhbHVlO1xyXG4gIHJldHVybiBmYWxsYmFjayB8fCBrZXk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5kRm9ybWF0ID0gKGtleTogc3RyaW5nLCBmYWxsYmFjazogc3RyaW5nIHwgdW5kZWZpbmVkLCAuLi5hcmdzOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgY29uc3QgdGVtcGxhdGUgPSBpbmRUKGtleSwgZmFsbGJhY2spO1xyXG4gIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgc2l6ZT86IHN0cmluZztcclxuICBsYWJlbD86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IFNwaW5uZXIgPSAoeyBzaXplID0gXCJoLTQgdy00XCIsIGxhYmVsIH06IFByb3BzKSA9PiAoXHJcbiAgPHN2ZyBjbGFzc05hbWU9e2BpbmQtc3Bpbm5lciAke3NpemV9YH0gdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtsYWJlbCB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lcjtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi9pbmRJMThuLnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQUNDRVNTX1JJR0hUUyA9IHtcclxuICBWaWV3OiAxLFxyXG4gIEVkaXQ6IDIsXHJcbiAgQWRkOiAzLFxyXG4gIEZ1bGxBY2Nlc3M6IDQsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG5leHBvcnQgdHlwZSBBY2Nlc3NSaWdodCA9IGtleW9mIHR5cGVvZiBBQ0NFU1NfUklHSFRTO1xyXG5cclxuY29uc3QgZ2V0UGVybWlzc2lvbkkxOG4gPSAoKSA9PiB7XHJcbiAgcmV0dXJuICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWxUaGlzLl9fSU5EX1BFUk1JU1NJT05fSTE4Tl9fKSB8fCB7fTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRNb2R1bGVBY2Nlc3MgPSAoY29kZTogc3RyaW5nKTogbnVtYmVyID0+IHtcclxuICBjb25zdCBhY2Nlc3MgPSAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18pIHx8IHt9O1xyXG4gIGNvbnN0IHZhbHVlID0gYWNjZXNzW2NvZGUgYXMga2V5b2YgdHlwZW9mIGFjY2Vzc107XHJcbiAgcmV0dXJuIE51bWJlcih2YWx1ZSA/PyAwKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjYW5BY2Nlc3MgPSAoY29kZTogc3RyaW5nLCBsZXZlbDogQWNjZXNzUmlnaHQgPSBcIlZpZXdcIik6IGJvb2xlYW4gPT4ge1xyXG4gIHJldHVybiBnZXRNb2R1bGVBY2Nlc3MoY29kZSkgPj0gQUNDRVNTX1JJR0hUU1tsZXZlbF07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2hvd1Blcm1pc3Npb25Nb2RhbCA9IChvcHRzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuSU5EPy5zaG93UGVybWlzc2lvbk1vZGFsKSB7XHJcbiAgICB3aW5kb3cuSU5ELnNob3dQZXJtaXNzaW9uTW9kYWwob3B0cyB8fCB7fSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHBlcm0gPSBnZXRQZXJtaXNzaW9uSTE4bigpO1xyXG4gIGNvbnN0IGZhbGxiYWNrID0gcGVybS5tZXNzYWdlIHx8IGluZFQoXCJBdXRoX1Blcm1pc3Npb25EZW5pZWRfQm9keVwiLCBcIkF1dGhfUGVybWlzc2lvbkRlbmllZF9Cb2R5XCIpO1xyXG4gIGFsZXJ0KGZhbGxiYWNrKTtcclxufTtcclxuIiwgImV4cG9ydCBjb25zdCBjbGFzc05hbWVzID0gKC4uLmNsYXNzZXM6IEFycmF5PHN0cmluZyB8IGZhbHNlIHwgbnVsbCB8IHVuZGVmaW5lZD4pID0+XHJcbiAgY2xhc3Nlcy5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUEsSUFBTSxVQUFVLE1BQThCO0FBQzVDLFNBQVEsT0FBTyxlQUFlLGVBQWUsV0FBVyxnQkFBaUIsQ0FBQztBQUM1RTtBQUVPLElBQU0sT0FBTyxDQUFDLEtBQWEsYUFBOEI7QUFDOUQsUUFBTSxPQUFPLFFBQVE7QUFDckIsUUFBTSxRQUFRLEtBQUssR0FBRztBQUN0QixNQUFJLE9BQU8sVUFBVSxZQUFZLE1BQU0sS0FBSyxLQUFLLFVBQVUsSUFBSyxRQUFPO0FBQ3ZFLFNBQU8sWUFBWTtBQUNyQjtBQUVPLElBQU0sWUFBWSxDQUFDLEtBQWEsYUFBaUMsU0FBaUM7QUFDdkcsUUFBTSxXQUFXLEtBQUssS0FBSyxRQUFRO0FBQ25DLFNBQU8sT0FBTyxRQUFRLEVBQUUsUUFBUSxjQUFjLENBQUMsR0FBRyxRQUFRLE9BQU8sS0FBSyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMzRjs7O0FDSkk7QUFGSixJQUFNLFVBQVUsQ0FBQyxFQUFFLE9BQU8sV0FBVyxNQUFNLE1BQ3pDLDRDQUFDLFNBQUksV0FBVyxlQUFlLElBQUksSUFBSSxTQUFRLGFBQVksTUFBSyxVQUFTLGNBQVksU0FBUyxLQUFLLGtCQUFrQixTQUFTLEdBQzVILHNEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJLEdBQ2hGO0FBR0YsSUFBTyxrQkFBUTs7O0FDWlIsSUFBTSxnQkFBZ0I7QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQ2Q7QUFJQSxJQUFNLG9CQUFvQixNQUFNO0FBQzlCLFNBQVEsT0FBTyxlQUFlLGVBQWUsV0FBVywyQkFBNEIsQ0FBQztBQUN2RjtBQUVPLElBQU0sa0JBQWtCLENBQUMsU0FBeUI7QUFDdkQsUUFBTSxTQUFVLE9BQU8sZUFBZSxlQUFlLFdBQVcseUJBQTBCLENBQUM7QUFDM0YsUUFBTSxRQUFRLE9BQU8sSUFBMkI7QUFDaEQsU0FBTyxPQUFPLFNBQVMsQ0FBQztBQUMxQjtBQUVPLElBQU0sWUFBWSxDQUFDLE1BQWMsUUFBcUIsV0FBb0I7QUFDL0UsU0FBTyxnQkFBZ0IsSUFBSSxLQUFLLGNBQWMsS0FBSztBQUNyRDtBQUVPLElBQU0sc0JBQXNCLENBQUMsU0FBbUM7QUFDckUsTUFBSSxPQUFPLFdBQVcsZUFBZSxPQUFPLEtBQUsscUJBQXFCO0FBQ3BFLFdBQU8sSUFBSSxvQkFBb0IsUUFBUSxDQUFDLENBQUM7QUFDekM7QUFBQSxFQUNGO0FBQ0EsUUFBTSxPQUFPLGtCQUFrQjtBQUMvQixRQUFNLFdBQVcsS0FBSyxXQUFXLEtBQUssOEJBQThCLDRCQUE0QjtBQUNoRyxRQUFNLFFBQVE7QUFDaEI7OztBQ2pDTyxJQUFNLGFBQWEsSUFBSSxZQUM1QixRQUFRLE9BQU8sT0FBTyxFQUFFLEtBQUssR0FBRzsiLAogICJuYW1lcyI6IFtdCn0K
