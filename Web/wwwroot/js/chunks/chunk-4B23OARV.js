import {
  clearExpenseActingUserOverride,
  getExpenseScopeToken,
  normalizeExpenseSheetSubordinates
} from "./chunk-UYN2TXUI.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  getSessionJsonWithExpiry,
  setSessionJsonWithExpiry
} from "./chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/context/AuthContext.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ACCESS_RIGHTS = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4
};
var EXPENSE_MANAGEMENT_CACHE_KEY_PREFIX = "expense_management_context_v2";
var EXPENSE_MANAGEMENT_CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var normalizeText = (value) => String(value || "").trim();
var isSameUser = (left, right) => {
  const normalizedLeft = normalizeText(left).toUpperCase();
  const normalizedRight = normalizeText(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};
var normalizeSubordinates = (source) => {
  const normalizedSource = normalizeExpenseSheetSubordinates(source);
  const seen = /* @__PURE__ */ new Set();
  return normalizedSource.map((entry) => {
    const crmUserId = normalizeText(entry.crmUserId);
    const axUserId = normalizeText(entry.axUserId);
    if (!crmUserId || !axUserId) return null;
    const name = normalizeText(entry.name);
    return {
      crmUserId,
      axUserId,
      name: name || axUserId
    };
  }).filter((entry) => !!entry).filter((entry) => {
    const key = entry.axUserId.toUpperCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
var ensureCurrentUserInSubordinates = (source, currentAxUserId, currentUserName = "") => {
  const normalizedCurrent = normalizeText(currentAxUserId);
  if (!normalizedCurrent) return source;
  const normalizedCurrentName = normalizeText(currentUserName);
  let foundCurrent = false;
  const merged = source.map((entry) => {
    if (!isSameUser(entry.axUserId, normalizedCurrent)) {
      return entry;
    }
    foundCurrent = true;
    const resolvedName = normalizedCurrentName || normalizeText(entry.name) || normalizedCurrent;
    return {
      ...entry,
      crmUserId: normalizeText(entry.crmUserId) || normalizedCurrent,
      axUserId: normalizeText(entry.axUserId) || normalizedCurrent,
      name: resolvedName,
      userName: normalizedCurrentName || entry.userName
    };
  });
  if (foundCurrent) {
    return merged;
  }
  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrentName || normalizedCurrent,
      userName: normalizedCurrentName || void 0
    },
    ...source
  ];
};
var resolveManagedUserSelection = (requestedUserId, currentAxUserId, users) => {
  const normalizedRequested = normalizeText(requestedUserId);
  const normalizedCurrent = normalizeText(currentAxUserId);
  if (normalizedRequested) {
    const exact = users.find((entry) => isSameUser(entry.axUserId, normalizedRequested));
    if (exact) return exact.axUserId;
  }
  if (normalizedCurrent) {
    const self = users.find((entry) => isSameUser(entry.axUserId, normalizedCurrent));
    return self?.axUserId || normalizedCurrent;
  }
  return "";
};
var getExpenseManagementCacheKey = () => {
  return `${EXPENSE_MANAGEMENT_CACHE_KEY_PREFIX}_${getExpenseScopeToken()}`;
};
var readExpenseManagementCache = () => {
  const cacheKey = getExpenseManagementCacheKey();
  const raw = getSessionJsonWithExpiry(cacheKey);
  if (!raw || typeof raw !== "object") return null;
  const currentAxUserId = normalizeText(raw.currentAxUserId);
  const currentUserName = normalizeText(raw.currentUserName);
  const currentCrmUserId = normalizeText(raw.currentCrmUserId);
  const subordinates = normalizeSubordinates(raw.subordinates);
  const selectedManagedUserId = resolveManagedUserSelection(raw.selectedManagedUserId, currentAxUserId, subordinates);
  return {
    currentAxUserId,
    currentUserName,
    currentCrmUserId,
    allowSelfManagement: raw.allowSelfManagement === true,
    selectedManagedUserId,
    subordinates
  };
};
var writeExpenseManagementCache = (entry) => {
  const cacheKey = getExpenseManagementCacheKey();
  setSessionJsonWithExpiry(cacheKey, entry, EXPENSE_MANAGEMENT_CACHE_TTL_MS);
};
var defaultValue = {
  moduleAccess: {},
  selectedCompany: "",
  currentAxUserId: "",
  currentUserName: "",
  currentCrmUserId: "",
  subordinates: [],
  manageableSubordinates: [],
  canManageOtherUsers: false,
  selectedManagedUserId: "",
  managementBootstrapReady: false,
  allowSelfManagement: false,
  setSelectedManagedUserId: () => void 0,
  resetSelectedManagedUserId: () => void 0,
  canAccess: () => false
};
var AuthContext = (0, import_react.createContext)(defaultValue);
var AuthProvider = ({
  children,
  moduleAccess,
  selectedCompany,
  allowSelfManagement,
  enableExpenseManagement = false
}) => {
  const access = moduleAccess || (globalThis.__IND_MODULE_ACCESS__ || {});
  const company = selectedCompany || String(globalThis.__IND_SELECTED_COMPANY__ || "");
  const selfManagementFromLayout = allowSelfManagement ?? globalThis.__IND_ALLOW_SELF_MANAGEMENT__ === true;
  const cachedEntry = (0, import_react.useMemo)(() => readExpenseManagementCache(), [company]);
  const [currentAxUserId, setCurrentAxUserId] = (0, import_react.useState)(() => normalizeText(cachedEntry?.currentAxUserId));
  const [currentUserName, setCurrentUserName] = (0, import_react.useState)(() => normalizeText(cachedEntry?.currentUserName));
  const [currentCrmUserId, setCurrentCrmUserId] = (0, import_react.useState)(() => normalizeText(cachedEntry?.currentCrmUserId));
  const [subordinates, setSubordinates] = (0, import_react.useState)(
    () => ensureCurrentUserInSubordinates(
      cachedEntry?.subordinates || [],
      cachedEntry?.currentAxUserId || "",
      cachedEntry?.currentUserName || ""
    )
  );
  const [selectedManagedUserId, setSelectedManagedUserIdState] = (0, import_react.useState)(() => {
    const cachedCurrent = normalizeText(cachedEntry?.currentAxUserId);
    const cachedUsers = ensureCurrentUserInSubordinates(
      cachedEntry?.subordinates || [],
      cachedCurrent,
      cachedEntry?.currentUserName || ""
    );
    const fallbackSelection = resolveManagedUserSelection(cachedEntry?.selectedManagedUserId || "", cachedCurrent, cachedUsers);
    return fallbackSelection;
  });
  const [selfManagement, setSelfManagement] = (0, import_react.useState)(selfManagementFromLayout);
  const [managementBootstrapReady, setManagementBootstrapReady] = (0, import_react.useState)(!enableExpenseManagement);
  (0, import_react.useEffect)(() => {
    if (enableExpenseManagement) return;
    setCurrentAxUserId("");
    setCurrentUserName("");
    setCurrentCrmUserId("");
    setSubordinates([]);
    setSelectedManagedUserIdState("");
    setSelfManagement(selfManagementFromLayout);
  }, [enableExpenseManagement, selfManagementFromLayout]);
  (0, import_react.useEffect)(() => {
    if (!enableExpenseManagement) {
      clearExpenseActingUserOverride();
      setManagementBootstrapReady(true);
      return;
    }
    let cancelled = false;
    const cached = readExpenseManagementCache();
    if (cached) {
      const cachedUsers = ensureCurrentUserInSubordinates(cached.subordinates, cached.currentAxUserId, cached.currentUserName);
      const cachedSelection = resolveManagedUserSelection(cached.selectedManagedUserId, cached.currentAxUserId, cachedUsers);
      setCurrentAxUserId(cached.currentAxUserId);
      setCurrentUserName(cached.currentUserName);
      setCurrentCrmUserId(normalizeText(cached.currentCrmUserId));
      setSubordinates(cachedUsers);
      setSelectedManagedUserIdState(cachedSelection);
      setSelfManagement(cached.allowSelfManagement === true ? true : selfManagementFromLayout);
      setManagementBootstrapReady(true);
    } else {
      setManagementBootstrapReady(false);
    }
    const bootstrapExpenseManagement = async () => {
      try {
        const expenseApiModule = await import("./expenseApi-QKGZH3XD.js");
        const contextSnapshot = await expenseApiModule.getExpenseApiContextSnapshot({
          suppressPermissionModal: true
        });
        const resolvedCurrentUser = normalizeText(contextSnapshot.axUserId);
        const resolvedCurrentUserName = normalizeText(contextSnapshot.userName);
        const resolvedCurrentCrmUser = normalizeText(contextSnapshot.crmUserId);
        let nextSubordinates = ensureCurrentUserInSubordinates(
          cached?.subordinates || [],
          resolvedCurrentUser,
          resolvedCurrentUserName
        );
        try {
          const subordinatesResponse = await expenseApiModule.getExpenseSheetSubordinates({
            suppressPermissionModal: true
          });
          nextSubordinates = ensureCurrentUserInSubordinates(
            normalizeSubordinates(subordinatesResponse?.Items),
            resolvedCurrentUser,
            resolvedCurrentUserName
          );
        } catch {
        }
        const nextSelection = resolveManagedUserSelection(
          cached?.selectedManagedUserId || resolvedCurrentUser,
          resolvedCurrentUser,
          nextSubordinates
        );
        if (cancelled) return;
        setCurrentAxUserId(resolvedCurrentUser);
        setCurrentUserName(resolvedCurrentUserName);
        setCurrentCrmUserId(resolvedCurrentCrmUser);
        setSubordinates(nextSubordinates);
        setSelectedManagedUserIdState(nextSelection);
        setSelfManagement(contextSnapshot.allowSelfManagement === true);
      } catch {
        if (cancelled) return;
        if (!cached) {
          setCurrentAxUserId("");
          setCurrentUserName("");
          setCurrentCrmUserId("");
          setSubordinates([]);
          setSelectedManagedUserIdState("");
          setSelfManagement(selfManagementFromLayout);
        }
      } finally {
        if (!cancelled) {
          setManagementBootstrapReady(true);
        }
      }
    };
    void bootstrapExpenseManagement();
    return () => {
      cancelled = true;
    };
  }, [company, enableExpenseManagement, selfManagementFromLayout]);
  (0, import_react.useEffect)(() => {
    if (!enableExpenseManagement) return;
    if (!managementBootstrapReady) return;
    writeExpenseManagementCache({
      currentAxUserId: normalizeText(currentAxUserId),
      currentUserName: normalizeText(currentUserName),
      currentCrmUserId: normalizeText(currentCrmUserId),
      allowSelfManagement: selfManagement === true,
      selectedManagedUserId: normalizeText(selectedManagedUserId),
      subordinates: ensureCurrentUserInSubordinates(subordinates, currentAxUserId, currentUserName)
    });
  }, [
    currentAxUserId,
    currentUserName,
    currentCrmUserId,
    enableExpenseManagement,
    managementBootstrapReady,
    selectedManagedUserId,
    selfManagement,
    subordinates
  ]);
  const manageableSubordinates = (0, import_react.useMemo)(() => {
    const normalizedCurrent = normalizeText(currentAxUserId);
    return subordinates.filter((entry) => !normalizedCurrent || !isSameUser(entry.axUserId, normalizedCurrent));
  }, [currentAxUserId, subordinates]);
  const setSelectedManagedUserId = (0, import_react.useCallback)(
    (userId) => {
      const normalizedCurrent = normalizeText(currentAxUserId);
      const normalizedUsers = ensureCurrentUserInSubordinates(subordinates, normalizedCurrent, currentUserName);
      const nextSelection = resolveManagedUserSelection(userId, normalizedCurrent, normalizedUsers);
      setSelectedManagedUserIdState(nextSelection);
    },
    [currentAxUserId, currentUserName, subordinates]
  );
  const resetSelectedManagedUserId = (0, import_react.useCallback)(() => {
    const normalizedCurrent = normalizeText(currentAxUserId);
    const normalizedUsers = ensureCurrentUserInSubordinates(subordinates, normalizedCurrent, currentUserName);
    const nextSelection = resolveManagedUserSelection(normalizedCurrent, normalizedCurrent, normalizedUsers);
    setSelectedManagedUserIdState(nextSelection);
  }, [currentAxUserId, currentUserName, subordinates]);
  const value = (0, import_react.useMemo)(() => {
    const canAccess = (code, level = "View") => {
      const current = Number(access?.[code] ?? 0);
      return current >= ACCESS_RIGHTS[level];
    };
    return {
      moduleAccess: access,
      selectedCompany: company,
      currentAxUserId,
      currentUserName,
      currentCrmUserId,
      subordinates,
      manageableSubordinates,
      canManageOtherUsers: manageableSubordinates.length > 0,
      selectedManagedUserId,
      managementBootstrapReady,
      allowSelfManagement: selfManagement,
      setSelectedManagedUserId,
      resetSelectedManagedUserId,
      canAccess
    };
  }, [
    access,
    company,
    currentAxUserId,
    currentUserName,
    currentCrmUserId,
    manageableSubordinates,
    managementBootstrapReady,
    selfManagement,
    selectedManagedUserId,
    setSelectedManagedUserId,
    resetSelectedManagedUserId,
    subordinates
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, { value, children });
};
var useAuthContext = () => (0, import_react.useContext)(AuthContext);

// Web/wwwroot/react/src/context/I18nContext.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var defaultDict = {};
var defaultValue2 = {
  dictionary: defaultDict,
  t: (key, fallback) => fallback || key,
  format: (key, fallback, ...args) => {
    const template = fallback || key;
    return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
  }
};
var I18nContext = (0, import_react2.createContext)(defaultValue2);
var I18nProvider = ({ children, dictionary }) => {
  const dict = dictionary || (globalThis.__IND_I18N__ || {});
  const value = (0, import_react2.useMemo)(() => {
    const t = (key, fallback) => {
      const value2 = dict[key];
      if (typeof value2 === "string" && value2.trim()) return value2;
      return fallback || key;
    };
    const format = (key, fallback, ...args) => {
      const template = t(key, fallback);
      return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
    };
    return { dictionary: dict, t, format };
  }, [dict]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(I18nContext.Provider, { value, children });
};

// Web/wwwroot/react/src/components/commons/VisitasPageProviders.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var VisitasPageProviders = ({ children, enableExpenseManagement = false }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AuthProvider, { enableExpenseManagement, children }) });
};
var VisitasPageProviders_default = VisitasPageProviders;

export {
  useAuthContext,
  VisitasPageProviders_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbnRleHQvQXV0aENvbnRleHQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb250ZXh0L0kxOG5Db250ZXh0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNhbGxiYWNrLCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSwgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5IH0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi4vcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgfSBmcm9tIFwiLi4vcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VTdWJvcmRpbmF0ZU1hcHBlci50c1wiO1xyXG5pbXBvcnQgeyBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgfSBmcm9tIFwiLi4vcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBBY2Nlc3NMZXZlbCA9IFwiVmlld1wiIHwgXCJFZGl0XCIgfCBcIkFkZFwiIHwgXCJGdWxsQWNjZXNzXCI7XHJcbmV4cG9ydCB0eXBlIEF1dGhNYW5hZ2VkVXNlciA9IHtcbiAgY3JtVXNlcklkOiBzdHJpbmc7XG4gIGF4VXNlcklkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdXNlck5hbWU/OiBzdHJpbmc7XG59O1xuXHJcbmNvbnN0IEFDQ0VTU19SSUdIVFM6IFJlY29yZDxBY2Nlc3NMZXZlbCwgbnVtYmVyPiA9IHtcclxuICBWaWV3OiAxLFxyXG4gIEVkaXQ6IDIsXHJcbiAgQWRkOiAzLFxyXG4gIEZ1bGxBY2Nlc3M6IDQsXHJcbn07XHJcblxyXG5jb25zdCBFWFBFTlNFX01BTkFHRU1FTlRfQ0FDSEVfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV9tYW5hZ2VtZW50X2NvbnRleHRfdjJcIjtcclxuY29uc3QgRVhQRU5TRV9NQU5BR0VNRU5UX0NBQ0hFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG50eXBlIEV4cGVuc2VNYW5hZ2VtZW50Q2FjaGVFbnRyeSA9IHtcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XG4gIGN1cnJlbnRVc2VyTmFtZT86IHN0cmluZztcbiAgY3VycmVudENybVVzZXJJZD86IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIHN1Ym9yZGluYXRlczogQXV0aE1hbmFnZWRVc2VyW107XG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG5cclxuY29uc3QgaXNTYW1lVXNlciA9IChsZWZ0OiBzdHJpbmcsIHJpZ2h0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkTGVmdCA9IG5vcm1hbGl6ZVRleHQobGVmdCkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkUmlnaHQgPSBub3JtYWxpemVUZXh0KHJpZ2h0KS50b1VwcGVyQ2FzZSgpO1xyXG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXMgPSAoc291cmNlOiB1bmtub3duKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRTb3VyY2UgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMoc291cmNlKTtcclxuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWRTb3VyY2VcclxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNybVVzZXJJZCA9IG5vcm1hbGl6ZVRleHQoZW50cnkuY3JtVXNlcklkKTtcclxuICAgICAgY29uc3QgYXhVc2VySWQgPSBub3JtYWxpemVUZXh0KGVudHJ5LmF4VXNlcklkKTtcclxuICAgICAgaWYgKCFjcm1Vc2VySWQgfHwgIWF4VXNlcklkKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgbmFtZSA9IG5vcm1hbGl6ZVRleHQoZW50cnkubmFtZSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JtVXNlcklkLFxyXG4gICAgICAgIGF4VXNlcklkLFxyXG4gICAgICAgIG5hbWU6IG5hbWUgfHwgYXhVc2VySWQsXHJcbiAgICAgIH0gYXMgQXV0aE1hbmFnZWRVc2VyO1xyXG4gICAgfSlcclxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgQXV0aE1hbmFnZWRVc2VyID0+ICEhZW50cnkpXHJcbiAgICAuZmlsdGVyKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBlbnRyeS5heFVzZXJJZC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBpZiAoc2Vlbi5oYXMoa2V5KSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBzZWVuLmFkZChrZXkpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyA9IChcbiAgc291cmNlOiBBdXRoTWFuYWdlZFVzZXJbXSxcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmcsXG4gIGN1cnJlbnRVc2VyTmFtZSA9IFwiXCJcbik6IEF1dGhNYW5hZ2VkVXNlcltdID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVUZXh0KGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnQpIHJldHVybiBzb3VyY2U7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50TmFtZSA9IG5vcm1hbGl6ZVRleHQoY3VycmVudFVzZXJOYW1lKTtcbiAgbGV0IGZvdW5kQ3VycmVudCA9IGZhbHNlO1xuICBjb25zdCBtZXJnZWQgPSBzb3VyY2UubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmICghaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKSB7XG4gICAgICByZXR1cm4gZW50cnk7XG4gICAgfVxuXG4gICAgZm91bmRDdXJyZW50ID0gdHJ1ZTtcbiAgICBjb25zdCByZXNvbHZlZE5hbWUgPSBub3JtYWxpemVkQ3VycmVudE5hbWUgfHwgbm9ybWFsaXplVGV4dChlbnRyeS5uYW1lKSB8fCBub3JtYWxpemVkQ3VycmVudDtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZW50cnksXG4gICAgICBjcm1Vc2VySWQ6IG5vcm1hbGl6ZVRleHQoZW50cnkuY3JtVXNlcklkKSB8fCBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVUZXh0KGVudHJ5LmF4VXNlcklkKSB8fCBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIG5hbWU6IHJlc29sdmVkTmFtZSxcbiAgICAgIHVzZXJOYW1lOiBub3JtYWxpemVkQ3VycmVudE5hbWUgfHwgZW50cnkudXNlck5hbWUsXG4gICAgfTtcbiAgfSk7XG5cbiAgaWYgKGZvdW5kQ3VycmVudCkge1xuICAgIHJldHVybiBtZXJnZWQ7XG4gIH1cblxuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGNybVVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBheFVzZXJJZDogbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICBuYW1lOiBub3JtYWxpemVkQ3VycmVudE5hbWUgfHwgbm9ybWFsaXplZEN1cnJlbnQsXG4gICAgICB1c2VyTmFtZTogbm9ybWFsaXplZEN1cnJlbnROYW1lIHx8IHVuZGVmaW5lZCxcbiAgICB9LFxuICAgIC4uLnNvdXJjZSxcbiAgXTtcbn07XG5cclxuY29uc3QgcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uID0gKFxyXG4gIHJlcXVlc3RlZFVzZXJJZDogc3RyaW5nLFxyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nLFxyXG4gIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXVxyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRSZXF1ZXN0ZWQgPSBub3JtYWxpemVUZXh0KHJlcXVlc3RlZFVzZXJJZCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVUZXh0KGN1cnJlbnRBeFVzZXJJZCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpIHtcclxuICAgIGNvbnN0IGV4YWN0ID0gdXNlcnMuZmluZCgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRSZXF1ZXN0ZWQpKTtcclxuICAgIGlmIChleGFjdCkgcmV0dXJuIGV4YWN0LmF4VXNlcklkO1xyXG4gIH1cclxuICBpZiAobm9ybWFsaXplZEN1cnJlbnQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcclxuICAgIHJldHVybiBzZWxmPy5heFVzZXJJZCB8fCBub3JtYWxpemVkQ3VycmVudDtcclxuICB9XHJcbiAgcmV0dXJuIFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCBnZXRFeHBlbnNlTWFuYWdlbWVudENhY2hlS2V5ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke0VYUEVOU0VfTUFOQUdFTUVOVF9DQUNIRV9LRVlfUFJFRklYfV8ke2dldEV4cGVuc2VTY29wZVRva2VuKCl9YDtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRFeHBlbnNlTWFuYWdlbWVudENhY2hlID0gKCk6IEV4cGVuc2VNYW5hZ2VtZW50Q2FjaGVFbnRyeSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNhY2hlS2V5ID0gZ2V0RXhwZW5zZU1hbmFnZW1lbnRDYWNoZUtleSgpO1xyXG4gIGNvbnN0IHJhdyA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxFeHBlbnNlTWFuYWdlbWVudENhY2hlRW50cnk+KGNhY2hlS2V5KTtcclxuICBpZiAoIXJhdyB8fCB0eXBlb2YgcmF3ICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgY3VycmVudEF4VXNlcklkID0gbm9ybWFsaXplVGV4dChyYXcuY3VycmVudEF4VXNlcklkKTtcbiAgY29uc3QgY3VycmVudFVzZXJOYW1lID0gbm9ybWFsaXplVGV4dChyYXcuY3VycmVudFVzZXJOYW1lKTtcbiAgY29uc3QgY3VycmVudENybVVzZXJJZCA9IG5vcm1hbGl6ZVRleHQocmF3LmN1cnJlbnRDcm1Vc2VySWQpO1xuICBjb25zdCBzdWJvcmRpbmF0ZXMgPSBub3JtYWxpemVTdWJvcmRpbmF0ZXMocmF3LnN1Ym9yZGluYXRlcyk7XG4gIGNvbnN0IHNlbGVjdGVkTWFuYWdlZFVzZXJJZCA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihyYXcuc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLCBjdXJyZW50QXhVc2VySWQsIHN1Ym9yZGluYXRlcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudFVzZXJOYW1lLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudDogcmF3LmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWUsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHN1Ym9yZGluYXRlcyxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgd3JpdGVFeHBlbnNlTWFuYWdlbWVudENhY2hlID0gKGVudHJ5OiBFeHBlbnNlTWFuYWdlbWVudENhY2hlRW50cnkpOiB2b2lkID0+IHtcclxuICBjb25zdCBjYWNoZUtleSA9IGdldEV4cGVuc2VNYW5hZ2VtZW50Q2FjaGVLZXkoKTtcclxuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoY2FjaGVLZXksIGVudHJ5LCBFWFBFTlNFX01BTkFHRU1FTlRfQ0FDSEVfVFRMX01TKTtcclxufTtcclxuXHJcbnR5cGUgQXV0aFZhbHVlID0ge1xyXG4gIG1vZHVsZUFjY2VzczogUmVjb3JkPHN0cmluZywgbnVtYmVyPjtcbiAgc2VsZWN0ZWRDb21wYW55OiBzdHJpbmc7XG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xuICBjdXJyZW50VXNlck5hbWU6IHN0cmluZztcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xuICBzdWJvcmRpbmF0ZXM6IEF1dGhNYW5hZ2VkVXNlcltdO1xuICBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzOiBBdXRoTWFuYWdlZFVzZXJbXTtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeTogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZDogKHVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHJlc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiAoKSA9PiB2b2lkO1xyXG4gIGNhbkFjY2VzczogKGNvZGU6IHN0cmluZywgbGV2ZWw/OiBBY2Nlc3NMZXZlbCkgPT4gYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRWYWx1ZTogQXV0aFZhbHVlID0ge1xyXG4gIG1vZHVsZUFjY2Vzczoge30sXG4gIHNlbGVjdGVkQ29tcGFueTogXCJcIixcbiAgY3VycmVudEF4VXNlcklkOiBcIlwiLFxuICBjdXJyZW50VXNlck5hbWU6IFwiXCIsXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IFwiXCIsXG4gIHN1Ym9yZGluYXRlczogW10sXG4gIG1hbmFnZWFibGVTdWJvcmRpbmF0ZXM6IFtdLFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGZhbHNlLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogXCJcIixcclxuICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHk6IGZhbHNlLFxyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGZhbHNlLFxyXG4gIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZDogKCkgPT4gdW5kZWZpbmVkLFxyXG4gIHJlc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiAoKSA9PiB1bmRlZmluZWQsXHJcbiAgY2FuQWNjZXNzOiAoKSA9PiBmYWxzZSxcclxufTtcclxuXHJcbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoVmFsdWU+KGRlZmF1bHRWYWx1ZSk7XHJcblxyXG50eXBlIFByb3ZpZGVyUHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBtb2R1bGVBY2Nlc3M/OiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xyXG4gIHNlbGVjdGVkQ29tcGFueT86IHN0cmluZztcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogYm9vbGVhbjtcclxuICBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHtcclxuICBjaGlsZHJlbixcclxuICBtb2R1bGVBY2Nlc3MsXHJcbiAgc2VsZWN0ZWRDb21wYW55LFxyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQgPSBmYWxzZSxcclxufTogUHJvdmlkZXJQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGFjY2VzcyA9IG1vZHVsZUFjY2VzcyB8fCAoZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18gfHwge30pO1xyXG4gIGNvbnN0IGNvbXBhbnkgPSBzZWxlY3RlZENvbXBhbnkgfHwgU3RyaW5nKGdsb2JhbFRoaXMuX19JTkRfU0VMRUNURURfQ09NUEFOWV9fIHx8IFwiXCIpO1xyXG4gIC8vIENvbXBhbnktc2NvcGVkIHBlcm1pc3Npb24gaW5qZWN0ZWQgYnkgUmF6b3IgbGF5b3V0IGZyb20gc2VsZWN0ZWQgY29tcGFueSBjb250ZXh0LlxyXG4gIC8vIFNlbnNpdGl2ZSBlZGl0IGZsb3dzIG11c3QgZ2F0ZSB3aXRoIHRoaXMgdmFsdWUgaW4gYWRkaXRpb24gdG8gbW9kdWxlIGFjY2VzcyByaWdodHMuXHJcbiAgY29uc3Qgc2VsZk1hbmFnZW1lbnRGcm9tTGF5b3V0ID0gYWxsb3dTZWxmTWFuYWdlbWVudCA/PyBnbG9iYWxUaGlzLl9fSU5EX0FMTE9XX1NFTEZfTUFOQUdFTUVOVF9fID09PSB0cnVlO1xyXG4gIGNvbnN0IGNhY2hlZEVudHJ5ID0gdXNlTWVtbygoKSA9PiByZWFkRXhwZW5zZU1hbmFnZW1lbnRDYWNoZSgpLCBbY29tcGFueV0pO1xuICBjb25zdCBbY3VycmVudEF4VXNlcklkLCBzZXRDdXJyZW50QXhVc2VySWRdID0gdXNlU3RhdGUoKCkgPT4gbm9ybWFsaXplVGV4dChjYWNoZWRFbnRyeT8uY3VycmVudEF4VXNlcklkKSk7XG4gIGNvbnN0IFtjdXJyZW50VXNlck5hbWUsIHNldEN1cnJlbnRVc2VyTmFtZV0gPSB1c2VTdGF0ZSgoKSA9PiBub3JtYWxpemVUZXh0KGNhY2hlZEVudHJ5Py5jdXJyZW50VXNlck5hbWUpKTtcbiAgY29uc3QgW2N1cnJlbnRDcm1Vc2VySWQsIHNldEN1cnJlbnRDcm1Vc2VySWRdID0gdXNlU3RhdGUoKCkgPT4gbm9ybWFsaXplVGV4dChjYWNoZWRFbnRyeT8uY3VycmVudENybVVzZXJJZCkpO1xuICBjb25zdCBbc3Vib3JkaW5hdGVzLCBzZXRTdWJvcmRpbmF0ZXNdID0gdXNlU3RhdGU8QXV0aE1hbmFnZWRVc2VyW10+KCgpID0+XG4gICAgZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyhcbiAgICAgIGNhY2hlZEVudHJ5Py5zdWJvcmRpbmF0ZXMgfHwgW10sXG4gICAgICBjYWNoZWRFbnRyeT8uY3VycmVudEF4VXNlcklkIHx8IFwiXCIsXG4gICAgICBjYWNoZWRFbnRyeT8uY3VycmVudFVzZXJOYW1lIHx8IFwiXCJcbiAgICApXG4gICk7XG4gIGNvbnN0IFtzZWxlY3RlZE1hbmFnZWRVc2VySWQsIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZFN0YXRlXSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICBjb25zdCBjYWNoZWRDdXJyZW50ID0gbm9ybWFsaXplVGV4dChjYWNoZWRFbnRyeT8uY3VycmVudEF4VXNlcklkKTtcbiAgICBjb25zdCBjYWNoZWRVc2VycyA9IGVuc3VyZUN1cnJlbnRVc2VySW5TdWJvcmRpbmF0ZXMoXG4gICAgICBjYWNoZWRFbnRyeT8uc3Vib3JkaW5hdGVzIHx8IFtdLFxuICAgICAgY2FjaGVkQ3VycmVudCxcbiAgICAgIGNhY2hlZEVudHJ5Py5jdXJyZW50VXNlck5hbWUgfHwgXCJcIlxuICAgICk7XG4gICAgY29uc3QgZmFsbGJhY2tTZWxlY3Rpb24gPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkRW50cnk/LnNlbGVjdGVkTWFuYWdlZFVzZXJJZCB8fCBcIlwiLCBjYWNoZWRDdXJyZW50LCBjYWNoZWRVc2Vycyk7XG4gICAgcmV0dXJuIGZhbGxiYWNrU2VsZWN0aW9uO1xuICB9KTtcbiAgY29uc3QgW3NlbGZNYW5hZ2VtZW50LCBzZXRTZWxmTWFuYWdlbWVudF0gPSB1c2VTdGF0ZShzZWxmTWFuYWdlbWVudEZyb21MYXlvdXQpO1xyXG4gIGNvbnN0IFttYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksIHNldE1hbmFnZW1lbnRCb290c3RyYXBSZWFkeV0gPSB1c2VTdGF0ZSghZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50KSByZXR1cm47XG4gICAgc2V0Q3VycmVudEF4VXNlcklkKFwiXCIpO1xuICAgIHNldEN1cnJlbnRVc2VyTmFtZShcIlwiKTtcbiAgICBzZXRDdXJyZW50Q3JtVXNlcklkKFwiXCIpO1xuICAgIHNldFN1Ym9yZGluYXRlcyhbXSk7XG4gICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkU3RhdGUoXCJcIik7XHJcbiAgICBzZXRTZWxmTWFuYWdlbWVudChzZWxmTWFuYWdlbWVudEZyb21MYXlvdXQpO1xyXG4gIH0sIFtlbmFibGVFeHBlbnNlTWFuYWdlbWVudCwgc2VsZk1hbmFnZW1lbnRGcm9tTGF5b3V0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50KSB7XHJcbiAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xyXG4gICAgICBzZXRNYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkodHJ1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjYWNoZWQgPSByZWFkRXhwZW5zZU1hbmFnZW1lbnRDYWNoZSgpO1xuICAgIGlmIChjYWNoZWQpIHtcbiAgICAgIGNvbnN0IGNhY2hlZFVzZXJzID0gZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyhjYWNoZWQuc3Vib3JkaW5hdGVzLCBjYWNoZWQuY3VycmVudEF4VXNlcklkLCBjYWNoZWQuY3VycmVudFVzZXJOYW1lKTtcbiAgICAgIGNvbnN0IGNhY2hlZFNlbGVjdGlvbiA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWQuc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLCBjYWNoZWQuY3VycmVudEF4VXNlcklkLCBjYWNoZWRVc2Vycyk7XG4gICAgICBzZXRDdXJyZW50QXhVc2VySWQoY2FjaGVkLmN1cnJlbnRBeFVzZXJJZCk7XG4gICAgICBzZXRDdXJyZW50VXNlck5hbWUoY2FjaGVkLmN1cnJlbnRVc2VyTmFtZSk7XG4gICAgICBzZXRDdXJyZW50Q3JtVXNlcklkKG5vcm1hbGl6ZVRleHQoY2FjaGVkLmN1cnJlbnRDcm1Vc2VySWQpKTtcbiAgICAgIHNldFN1Ym9yZGluYXRlcyhjYWNoZWRVc2Vycyk7XG4gICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRTdGF0ZShjYWNoZWRTZWxlY3Rpb24pO1xyXG4gICAgICBzZXRTZWxmTWFuYWdlbWVudChjYWNoZWQuYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZSA/IHRydWUgOiBzZWxmTWFuYWdlbWVudEZyb21MYXlvdXQpO1xyXG4gICAgICBzZXRNYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkodHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZXRNYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvb3RzdHJhcEV4cGVuc2VNYW5hZ2VtZW50ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGV4cGVuc2VBcGlNb2R1bGUgPSBhd2FpdCBpbXBvcnQoXCIuLi9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaS50c1wiKTtcclxuICAgICAgICBjb25zdCBjb250ZXh0U25hcHNob3QgPSBhd2FpdCBleHBlbnNlQXBpTW9kdWxlLmdldEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3Qoe1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkQ3VycmVudFVzZXIgPSBub3JtYWxpemVUZXh0KGNvbnRleHRTbmFwc2hvdC5heFVzZXJJZCk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkQ3VycmVudFVzZXJOYW1lID0gbm9ybWFsaXplVGV4dChjb250ZXh0U25hcHNob3QudXNlck5hbWUpO1xuICAgICAgICBjb25zdCByZXNvbHZlZEN1cnJlbnRDcm1Vc2VyID0gbm9ybWFsaXplVGV4dChjb250ZXh0U25hcHNob3QuY3JtVXNlcklkKTtcbiAgICAgICAgbGV0IG5leHRTdWJvcmRpbmF0ZXMgPSBlbnN1cmVDdXJyZW50VXNlckluU3Vib3JkaW5hdGVzKFxuICAgICAgICAgIGNhY2hlZD8uc3Vib3JkaW5hdGVzIHx8IFtdLFxuICAgICAgICAgIHJlc29sdmVkQ3VycmVudFVzZXIsXG4gICAgICAgICAgcmVzb2x2ZWRDdXJyZW50VXNlck5hbWVcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBBbHdheXMgcmVmcmVzaCBzdWJvcmRpbmF0ZXMgZnJvbSBBUEkgdG8gYXZvaWQgc3RhbGUgbGVnYWN5IGlkIG1hcHBpbmdzLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHN1Ym9yZGluYXRlc1Jlc3BvbnNlID0gYXdhaXQgZXhwZW5zZUFwaU1vZHVsZS5nZXRFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMoe1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG5leHRTdWJvcmRpbmF0ZXMgPSBlbnN1cmVDdXJyZW50VXNlckluU3Vib3JkaW5hdGVzKFxuICAgICAgICAgICAgbm9ybWFsaXplU3Vib3JkaW5hdGVzKHN1Ym9yZGluYXRlc1Jlc3BvbnNlPy5JdGVtcyksXG4gICAgICAgICAgICByZXNvbHZlZEN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgcmVzb2x2ZWRDdXJyZW50VXNlck5hbWVcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvLyBLZWVwIGNhY2hlZCBzdWJvcmRpbmF0ZXMgd2hlbiByZWZyZXNoIGZhaWxzLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV4dFNlbGVjdGlvbiA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihcclxuICAgICAgICAgIGNhY2hlZD8uc2VsZWN0ZWRNYW5hZ2VkVXNlcklkIHx8IHJlc29sdmVkQ3VycmVudFVzZXIsXHJcbiAgICAgICAgICByZXNvbHZlZEN1cnJlbnRVc2VyLFxyXG4gICAgICAgICAgbmV4dFN1Ym9yZGluYXRlc1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcclxuXG4gICAgICAgIHNldEN1cnJlbnRBeFVzZXJJZChyZXNvbHZlZEN1cnJlbnRVc2VyKTtcbiAgICAgICAgc2V0Q3VycmVudFVzZXJOYW1lKHJlc29sdmVkQ3VycmVudFVzZXJOYW1lKTtcbiAgICAgICAgc2V0Q3VycmVudENybVVzZXJJZChyZXNvbHZlZEN1cnJlbnRDcm1Vc2VyKTtcbiAgICAgICAgc2V0U3Vib3JkaW5hdGVzKG5leHRTdWJvcmRpbmF0ZXMpO1xuICAgICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRTdGF0ZShuZXh0U2VsZWN0aW9uKTtcclxuICAgICAgICBzZXRTZWxmTWFuYWdlbWVudChjb250ZXh0U25hcHNob3QuYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCFjYWNoZWQpIHtcbiAgICAgICAgICBzZXRDdXJyZW50QXhVc2VySWQoXCJcIik7XG4gICAgICAgICAgc2V0Q3VycmVudFVzZXJOYW1lKFwiXCIpO1xuICAgICAgICAgIHNldEN1cnJlbnRDcm1Vc2VySWQoXCJcIik7XG4gICAgICAgICAgc2V0U3Vib3JkaW5hdGVzKFtdKTtcbiAgICAgICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRTdGF0ZShcIlwiKTtcclxuICAgICAgICAgIHNldFNlbGZNYW5hZ2VtZW50KHNlbGZNYW5hZ2VtZW50RnJvbUxheW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmICghY2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRNYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgYm9vdHN0cmFwRXhwZW5zZU1hbmFnZW1lbnQoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICB9LCBbY29tcGFueSwgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQsIHNlbGZNYW5hZ2VtZW50RnJvbUxheW91dF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFlbmFibGVFeHBlbnNlTWFuYWdlbWVudCkgcmV0dXJuO1xyXG4gICAgaWYgKCFtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkpIHJldHVybjtcclxuXHJcbiAgICB3cml0ZUV4cGVuc2VNYW5hZ2VtZW50Q2FjaGUoe1xuICAgICAgY3VycmVudEF4VXNlcklkOiBub3JtYWxpemVUZXh0KGN1cnJlbnRBeFVzZXJJZCksXG4gICAgICBjdXJyZW50VXNlck5hbWU6IG5vcm1hbGl6ZVRleHQoY3VycmVudFVzZXJOYW1lKSxcbiAgICAgIGN1cnJlbnRDcm1Vc2VySWQ6IG5vcm1hbGl6ZVRleHQoY3VycmVudENybVVzZXJJZCksXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBzZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZSxcbiAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogbm9ybWFsaXplVGV4dChzZWxlY3RlZE1hbmFnZWRVc2VySWQpLFxuICAgICAgc3Vib3JkaW5hdGVzOiBlbnN1cmVDdXJyZW50VXNlckluU3Vib3JkaW5hdGVzKHN1Ym9yZGluYXRlcywgY3VycmVudEF4VXNlcklkLCBjdXJyZW50VXNlck5hbWUpLFxuICAgIH0pO1xuICB9LCBbXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRVc2VyTmFtZSxcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50LFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2VsZk1hbmFnZW1lbnQsXHJcbiAgICBzdWJvcmRpbmF0ZXMsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IG1hbmFnZWFibGVTdWJvcmRpbmF0ZXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVGV4dChjdXJyZW50QXhVc2VySWQpO1xyXG4gICAgcmV0dXJuIHN1Ym9yZGluYXRlcy5maWx0ZXIoKGVudHJ5KSA9PiAhbm9ybWFsaXplZEN1cnJlbnQgfHwgIWlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSk7XHJcbiAgfSwgW2N1cnJlbnRBeFVzZXJJZCwgc3Vib3JkaW5hdGVzXSk7XHJcblxyXG4gIGNvbnN0IHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHVzZXJJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVGV4dChjdXJyZW50QXhVc2VySWQpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFVzZXJzID0gZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyhzdWJvcmRpbmF0ZXMsIG5vcm1hbGl6ZWRDdXJyZW50LCBjdXJyZW50VXNlck5hbWUpO1xuICAgICAgY29uc3QgbmV4dFNlbGVjdGlvbiA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbih1c2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50LCBub3JtYWxpemVkVXNlcnMpO1xuICAgICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkU3RhdGUobmV4dFNlbGVjdGlvbik7XG4gICAgfSxcbiAgICBbY3VycmVudEF4VXNlcklkLCBjdXJyZW50VXNlck5hbWUsIHN1Ym9yZGluYXRlc11cbiAgKTtcblxuICBjb25zdCByZXNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVRleHQoY3VycmVudEF4VXNlcklkKTtcbiAgICBjb25zdCBub3JtYWxpemVkVXNlcnMgPSBlbnN1cmVDdXJyZW50VXNlckluU3Vib3JkaW5hdGVzKHN1Ym9yZGluYXRlcywgbm9ybWFsaXplZEN1cnJlbnQsIGN1cnJlbnRVc2VyTmFtZSk7XG4gICAgY29uc3QgbmV4dFNlbGVjdGlvbiA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihub3JtYWxpemVkQ3VycmVudCwgbm9ybWFsaXplZEN1cnJlbnQsIG5vcm1hbGl6ZWRVc2Vycyk7XG4gICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkU3RhdGUobmV4dFNlbGVjdGlvbik7XG4gIH0sIFtjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRVc2VyTmFtZSwgc3Vib3JkaW5hdGVzXSk7XG5cclxuICBjb25zdCB2YWx1ZSA9IHVzZU1lbW88QXV0aFZhbHVlPigoKSA9PiB7XHJcbiAgICBjb25zdCBjYW5BY2Nlc3MgPSAoY29kZTogc3RyaW5nLCBsZXZlbDogQWNjZXNzTGV2ZWwgPSBcIlZpZXdcIikgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50ID0gTnVtYmVyKGFjY2Vzcz8uW2NvZGVdID8/IDApO1xyXG4gICAgICByZXR1cm4gY3VycmVudCA+PSBBQ0NFU1NfUklHSFRTW2xldmVsXTtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtb2R1bGVBY2Nlc3M6IGFjY2VzcyxcbiAgICAgIHNlbGVjdGVkQ29tcGFueTogY29tcGFueSxcbiAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgIGN1cnJlbnRVc2VyTmFtZSxcbiAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgICBzdWJvcmRpbmF0ZXMsXG4gICAgICBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzLFxyXG4gICAgICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzLmxlbmd0aCA+IDAsXHJcbiAgICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBzZWxmTWFuYWdlbWVudCxcclxuICAgICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgICByZXNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgICAgY2FuQWNjZXNzLFxyXG4gICAgfTtcclxuICB9LCBbXHJcbiAgICBhY2Nlc3MsXHJcbiAgICBjb21wYW55LFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBjdXJyZW50VXNlck5hbWUsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzLFxyXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxyXG4gICAgc2VsZk1hbmFnZW1lbnQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZXNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHN1Ym9yZGluYXRlcyxcclxuICBdKTtcclxuXHJcbiAgcmV0dXJuIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0F1dGhDb250ZXh0LlByb3ZpZGVyPjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VBdXRoQ29udGV4dCA9ICgpID0+IHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgSTE4bkRpY3QgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG5cclxudHlwZSBJMThuVmFsdWUgPSB7XHJcbiAgZGljdGlvbmFyeTogSTE4bkRpY3Q7XHJcbiAgdDogKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIGZvcm1hdDogKGtleTogc3RyaW5nLCBmYWxsYmFjazogc3RyaW5nIHwgdW5kZWZpbmVkLCAuLi5hcmdzOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0RGljdDogSTE4bkRpY3QgPSB7fTtcclxuXHJcbmNvbnN0IGRlZmF1bHRWYWx1ZTogSTE4blZhbHVlID0ge1xyXG4gIGRpY3Rpb25hcnk6IGRlZmF1bHREaWN0LFxyXG4gIHQ6IChrZXksIGZhbGxiYWNrKSA9PiBmYWxsYmFjayB8fCBrZXksXHJcbiAgZm9ybWF0OiAoa2V5LCBmYWxsYmFjaywgLi4uYXJncykgPT4ge1xyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBmYWxsYmFjayB8fCBrZXk7XHJcbiAgICByZXR1cm4gU3RyaW5nKHRlbXBsYXRlKS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKF8sIGlkeCkgPT4gU3RyaW5nKGFyZ3NbTnVtYmVyKGlkeCldID8/IFwiXCIpKTtcclxuICB9LFxyXG59O1xyXG5cclxuY29uc3QgSTE4bkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEkxOG5WYWx1ZT4oZGVmYXVsdFZhbHVlKTtcclxuXHJcbnR5cGUgUHJvdmlkZXJQcm9wcyA9IHtcclxuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIGRpY3Rpb25hcnk/OiBJMThuRGljdDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBJMThuUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiwgZGljdGlvbmFyeSB9OiBQcm92aWRlclByb3BzKSA9PiB7XHJcbiAgY29uc3QgZGljdCA9IGRpY3Rpb25hcnkgfHwgKGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fIHx8IHt9KTtcclxuXHJcbiAgY29uc3QgdmFsdWUgPSB1c2VNZW1vPEkxOG5WYWx1ZT4oKCkgPT4ge1xyXG4gICAgY29uc3QgdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s/OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpKSByZXR1cm4gdmFsdWU7XHJcbiAgICAgIHJldHVybiBmYWxsYmFjayB8fCBrZXk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgZm9ybWF0ID0gKGtleTogc3RyaW5nLCBmYWxsYmFjazogc3RyaW5nIHwgdW5kZWZpbmVkLCAuLi5hcmdzOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdChrZXksIGZhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuIFN0cmluZyh0ZW1wbGF0ZSkucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIChfLCBpZHgpID0+IFN0cmluZyhhcmdzW051bWJlcihpZHgpXSA/PyBcIlwiKSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgZGljdGlvbmFyeTogZGljdCwgdCwgZm9ybWF0IH07XHJcbiAgfSwgW2RpY3RdKTtcclxuXHJcbiAgcmV0dXJuIDxJMThuQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0kxOG5Db250ZXh0LlByb3ZpZGVyPjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VJMThuID0gKCkgPT4gdXNlQ29udGV4dChJMThuQ29udGV4dCk7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEkxOG5Qcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb250ZXh0L0kxOG5Db250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD86IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgcHJvdmlkZXIgd3JhcHBlciBmb3IgdmlzaXRhcyBSZWFjdCBpc2xhbmRzLlxyXG5jb25zdCBWaXNpdGFzUGFnZVByb3ZpZGVycyA9ICh7IGNoaWxkcmVuLCBlbmFibGVFeHBlbnNlTWFuYWdlbWVudCA9IGZhbHNlIH06IFByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxJMThuUHJvdmlkZXI+XHJcbiAgICAgIDxBdXRoUHJvdmlkZXIgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ9e2VuYWJsZUV4cGVuc2VNYW5hZ2VtZW50fT57Y2hpbGRyZW59PC9BdXRoUHJvdmlkZXI+XHJcbiAgICA8L0kxOG5Qcm92aWRlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlzaXRhc1BhZ2VQcm92aWRlcnM7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUE0RjtBQStabkY7QUFqWlQsSUFBTSxnQkFBNkM7QUFBQSxFQUNqRCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQ2Q7QUFFQSxJQUFNLHNDQUFzQztBQUM1QyxJQUFNLGtDQUFrQyxLQUFLLEtBQUssS0FBSztBQVd2RCxJQUFNLGdCQUFnQixDQUFDLFVBQTJCLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUUzRSxJQUFNLGFBQWEsQ0FBQyxNQUFjLFVBQTJCO0FBQzNELFFBQU0saUJBQWlCLGNBQWMsSUFBSSxFQUFFLFlBQVk7QUFDdkQsUUFBTSxrQkFBa0IsY0FBYyxLQUFLLEVBQUUsWUFBWTtBQUN6RCxTQUFP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LFVBQU0sU0FBUyxDQUFDLEtBQWEsYUFBaUMsU0FBaUM7QUFDN0YsWUFBTSxXQUFXLEVBQUUsS0FBSyxRQUFRO0FBQ2hDLGFBQU8sT0FBTyxRQUFRLEVBQUUsUUFBUSxjQUFjLENBQUMsR0FBRyxRQUFRLE9BQU8sS0FBSyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUFBLElBQzNGO0FBQ0EsV0FBTyxFQUFFLFlBQVksTUFBTSxHQUFHLE9BQU87QUFBQSxFQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsU0FBTyw2Q0FBQyxZQUFZLFVBQVosRUFBcUIsT0FBZSxVQUFTO0FBQ3ZEOzs7QUNoQ00sSUFBQUMsc0JBQUE7QUFITixJQUFNLHVCQUF1QixDQUFDLEVBQUUsVUFBVSwwQkFBMEIsTUFBTSxNQUFhO0FBQ3JGLFNBQ0UsNkNBQUMsZ0JBQ0MsdURBQUMsZ0JBQWEseUJBQW1ELFVBQVMsR0FDNUU7QUFFSjtBQUVBLElBQU8sK0JBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiZGVmYXVsdFZhbHVlIiwgInZhbHVlIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
