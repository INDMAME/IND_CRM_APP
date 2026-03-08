import {
  clearExpenseActingUserOverride,
  normalizeExpenseSheetSubordinates,
  setExpenseActingUserOverride
} from "./chunk-LCBK6SHP.js";
import {
  getSessionJsonWithExpiry,
  setSessionJsonWithExpiry
} from "./chunk-7SKLSV7K.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/context/AuthContext.tsx
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/utils/expenseScope.ts
var normalizeScopePart = (value, uppercase = false) => {
  const normalized = String(value || "").trim();
  if (!normalized) return "";
  return uppercase ? normalized.toUpperCase() : normalized.toLowerCase();
};
var getExpenseScopeValues = () => {
  if (typeof window === "undefined") {
    return {
      entraOid: "",
      companyId: ""
    };
  }
  const runtimeWindow = window;
  const entraOid = normalizeScopePart(runtimeWindow.__IND_ENTRA_OID__);
  const companyId = normalizeScopePart(runtimeWindow.__IND_SELECTED_COMPANY__ || runtimeWindow.__IND_COMPANY__, true);
  return {
    entraOid,
    companyId
  };
};
var getExpenseScopeToken = () => {
  const { entraOid, companyId } = getExpenseScopeValues();
  const scope = `${entraOid}__${companyId}`.replace(/^_+|_+$/g, "");
  return scope || "session";
};

// Web/wwwroot/react/src/context/AuthContext.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ACCESS_RIGHTS = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4
};
var EXPENSE_MANAGEMENT_CACHE_KEY_PREFIX = "expense_management_context_v1";
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
var ensureCurrentUserInSubordinates = (source, currentAxUserId) => {
  const normalizedCurrent = normalizeText(currentAxUserId);
  if (!normalizedCurrent) return source;
  if (source.some((entry) => isSameUser(entry.axUserId, normalizedCurrent))) {
    return source;
  }
  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrent
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
  return users[0]?.axUserId || "";
};
var getExpenseManagementCacheKey = () => {
  return `${EXPENSE_MANAGEMENT_CACHE_KEY_PREFIX}_${getExpenseScopeToken()}`;
};
var readExpenseManagementCache = () => {
  const cacheKey = getExpenseManagementCacheKey();
  const raw = getSessionJsonWithExpiry(cacheKey);
  if (!raw || typeof raw !== "object") return null;
  const currentAxUserId = normalizeText(raw.currentAxUserId);
  const currentCrmUserId = normalizeText(raw.currentCrmUserId);
  const subordinates = normalizeSubordinates(raw.subordinates);
  const selectedManagedUserId = resolveManagedUserSelection(raw.selectedManagedUserId, currentAxUserId, subordinates);
  return {
    currentAxUserId,
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
  const [currentCrmUserId, setCurrentCrmUserId] = (0, import_react.useState)(() => normalizeText(cachedEntry?.currentCrmUserId));
  const [subordinates, setSubordinates] = (0, import_react.useState)(
    () => ensureCurrentUserInSubordinates(cachedEntry?.subordinates || [], cachedEntry?.currentAxUserId || "")
  );
  const [selectedManagedUserId, setSelectedManagedUserIdState] = (0, import_react.useState)(() => {
    const cachedCurrent = normalizeText(cachedEntry?.currentAxUserId);
    const cachedUsers = ensureCurrentUserInSubordinates(cachedEntry?.subordinates || [], cachedCurrent);
    const fallbackSelection = resolveManagedUserSelection(cachedEntry?.selectedManagedUserId || "", cachedCurrent, cachedUsers);
    return fallbackSelection;
  });
  const [selfManagement, setSelfManagement] = (0, import_react.useState)(selfManagementFromLayout);
  const [managementBootstrapReady, setManagementBootstrapReady] = (0, import_react.useState)(!enableExpenseManagement);
  (0, import_react.useEffect)(() => {
    if (enableExpenseManagement) return;
    setCurrentAxUserId("");
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
      const cachedUsers = ensureCurrentUserInSubordinates(cached.subordinates, cached.currentAxUserId);
      const cachedSelection = resolveManagedUserSelection(cached.selectedManagedUserId, cached.currentAxUserId, cachedUsers);
      setCurrentAxUserId(cached.currentAxUserId);
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
        const expenseApiModule = await import("./expenseApi-ZT4SJ3GY.js");
        const contextSnapshot = await expenseApiModule.getExpenseApiContextSnapshot({
          suppressPermissionModal: true
        });
        const resolvedCurrentUser = normalizeText(contextSnapshot.axUserId);
        const resolvedCurrentCrmUser = normalizeText(contextSnapshot.crmUserId);
        const shouldFetchSubordinates = !cached || !Array.isArray(cached.subordinates) || cached.subordinates.length === 0;
        let nextSubordinates = ensureCurrentUserInSubordinates(cached?.subordinates || [], resolvedCurrentUser);
        if (shouldFetchSubordinates) {
          const subordinatesResponse = await expenseApiModule.getExpenseSheetSubordinates({
            suppressPermissionModal: true
          });
          nextSubordinates = ensureCurrentUserInSubordinates(
            normalizeSubordinates(subordinatesResponse?.Items),
            resolvedCurrentUser
          );
        }
        const nextSelection = resolveManagedUserSelection(
          cached?.selectedManagedUserId || resolvedCurrentUser,
          resolvedCurrentUser,
          nextSubordinates
        );
        if (cancelled) return;
        setCurrentAxUserId(resolvedCurrentUser);
        setCurrentCrmUserId(resolvedCurrentCrmUser);
        setSubordinates(nextSubordinates);
        setSelectedManagedUserIdState(nextSelection);
        setSelfManagement(contextSnapshot.allowSelfManagement === true);
      } catch {
        if (cancelled) return;
        if (!cached) {
          setCurrentAxUserId("");
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
      currentCrmUserId: normalizeText(currentCrmUserId),
      allowSelfManagement: selfManagement === true,
      selectedManagedUserId: normalizeText(selectedManagedUserId),
      subordinates: ensureCurrentUserInSubordinates(subordinates, currentAxUserId)
    });
  }, [
    currentAxUserId,
    currentCrmUserId,
    enableExpenseManagement,
    managementBootstrapReady,
    selectedManagedUserId,
    selfManagement,
    subordinates
  ]);
  (0, import_react.useEffect)(() => {
    if (!enableExpenseManagement) return;
    const normalizedCurrent = normalizeText(currentAxUserId);
    const normalizedSelected = normalizeText(selectedManagedUserId);
    const shouldOverride = !!normalizedSelected && (!normalizedCurrent || !isSameUser(normalizedSelected, normalizedCurrent));
    if (!shouldOverride) {
      clearExpenseActingUserOverride();
      return;
    }
    setExpenseActingUserOverride(normalizedSelected);
  }, [currentAxUserId, enableExpenseManagement, selectedManagedUserId]);
  const manageableSubordinates = (0, import_react.useMemo)(() => {
    const normalizedCurrent = normalizeText(currentAxUserId);
    return subordinates.filter((entry) => !normalizedCurrent || !isSameUser(entry.axUserId, normalizedCurrent));
  }, [currentAxUserId, subordinates]);
  const setSelectedManagedUserId = (0, import_react.useCallback)(
    (userId) => {
      const normalizedCurrent = normalizeText(currentAxUserId);
      const normalizedUsers = ensureCurrentUserInSubordinates(subordinates, normalizedCurrent);
      const nextSelection = resolveManagedUserSelection(userId, normalizedCurrent, normalizedUsers);
      setSelectedManagedUserIdState(nextSelection);
    },
    [currentAxUserId, subordinates]
  );
  const resetSelectedManagedUserId = (0, import_react.useCallback)(() => {
    const normalizedCurrent = normalizeText(currentAxUserId);
    const normalizedUsers = ensureCurrentUserInSubordinates(subordinates, normalizedCurrent);
    const nextSelection = resolveManagedUserSelection(normalizedCurrent, normalizedCurrent, normalizedUsers);
    setSelectedManagedUserIdState(nextSelection);
  }, [currentAxUserId, subordinates]);
  const value = (0, import_react.useMemo)(() => {
    const canAccess = (code, level = "View") => {
      const current = Number(access?.[code] ?? 0);
      return current >= ACCESS_RIGHTS[level];
    };
    return {
      moduleAccess: access,
      selectedCompany: company,
      currentAxUserId,
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
  getExpenseScopeToken,
  useAuthContext,
  VisitasPageProviders_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbnRleHQvQXV0aENvbnRleHQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVNjb3BlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb250ZXh0L0kxOG5Db250ZXh0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNhbGxiYWNrLCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2NvcGVUb2tlbiB9IGZyb20gXCIuLi9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVNjb3BlLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgfSBmcm9tIFwiLi4vcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VTdWJvcmRpbmF0ZU1hcHBlci50c1wiO1xuaW1wb3J0IHtcbiAgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlLFxuICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlLFxufSBmcm9tIFwiLi4vcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5cbmV4cG9ydCB0eXBlIEFjY2Vzc0xldmVsID0gXCJWaWV3XCIgfCBcIkVkaXRcIiB8IFwiQWRkXCIgfCBcIkZ1bGxBY2Nlc3NcIjtcbmV4cG9ydCB0eXBlIEF1dGhNYW5hZ2VkVXNlciA9IHtcbiAgY3JtVXNlcklkOiBzdHJpbmc7XG4gIGF4VXNlcklkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn07XG5cbmNvbnN0IEFDQ0VTU19SSUdIVFM6IFJlY29yZDxBY2Nlc3NMZXZlbCwgbnVtYmVyPiA9IHtcbiAgVmlldzogMSxcbiAgRWRpdDogMixcbiAgQWRkOiAzLFxuICBGdWxsQWNjZXNzOiA0LFxufTtcblxuY29uc3QgRVhQRU5TRV9NQU5BR0VNRU5UX0NBQ0hFX0tFWV9QUkVGSVggPSBcImV4cGVuc2VfbWFuYWdlbWVudF9jb250ZXh0X3YxXCI7XG5jb25zdCBFWFBFTlNFX01BTkFHRU1FTlRfQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcblxudHlwZSBFeHBlbnNlTWFuYWdlbWVudENhY2hlRW50cnkgPSB7XG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xuICBjdXJyZW50Q3JtVXNlcklkPzogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgc3Vib3JkaW5hdGVzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcblxuY29uc3QgaXNTYW1lVXNlciA9IChsZWZ0OiBzdHJpbmcsIHJpZ2h0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZExlZnQgPSBub3JtYWxpemVUZXh0KGxlZnQpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZVRleHQocmlnaHQpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiAhIW5vcm1hbGl6ZWRMZWZ0ICYmIG5vcm1hbGl6ZWRMZWZ0ID09PSBub3JtYWxpemVkUmlnaHQ7XG59O1xuXG5jb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXMgPSAoc291cmNlOiB1bmtub3duKTogQXV0aE1hbmFnZWRVc2VyW10gPT4ge1xuICBjb25zdCBub3JtYWxpemVkU291cmNlID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzKHNvdXJjZSk7XG4gIGNvbnN0IHNlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZWRTb3VyY2VcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgY3JtVXNlcklkID0gbm9ybWFsaXplVGV4dChlbnRyeS5jcm1Vc2VySWQpO1xuICAgICAgY29uc3QgYXhVc2VySWQgPSBub3JtYWxpemVUZXh0KGVudHJ5LmF4VXNlcklkKTtcbiAgICAgIGlmICghY3JtVXNlcklkIHx8ICFheFVzZXJJZCkgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCBuYW1lID0gbm9ybWFsaXplVGV4dChlbnRyeS5uYW1lKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNybVVzZXJJZCxcbiAgICAgICAgYXhVc2VySWQsXG4gICAgICAgIG5hbWU6IG5hbWUgfHwgYXhVc2VySWQsXG4gICAgICB9IGFzIEF1dGhNYW5hZ2VkVXNlcjtcbiAgICB9KVxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgQXV0aE1hbmFnZWRVc2VyID0+ICEhZW50cnkpXG4gICAgLmZpbHRlcigoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IGVudHJ5LmF4VXNlcklkLnRvVXBwZXJDYXNlKCk7XG4gICAgICBpZiAoc2Vlbi5oYXMoa2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgc2Vlbi5hZGQoa2V5KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xufTtcblxuY29uc3QgZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyA9IChzb3VyY2U6IEF1dGhNYW5hZ2VkVXNlcltdLCBjdXJyZW50QXhVc2VySWQ6IHN0cmluZyk6IEF1dGhNYW5hZ2VkVXNlcltdID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVUZXh0KGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmICghbm9ybWFsaXplZEN1cnJlbnQpIHJldHVybiBzb3VyY2U7XG4gIGlmIChzb3VyY2Uuc29tZSgoZW50cnkpID0+IGlzU2FtZVVzZXIoZW50cnkuYXhVc2VySWQsIG5vcm1hbGl6ZWRDdXJyZW50KSkpIHtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgY3JtVXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIGF4VXNlcklkOiBub3JtYWxpemVkQ3VycmVudCxcbiAgICAgIG5hbWU6IG5vcm1hbGl6ZWRDdXJyZW50LFxuICAgIH0sXG4gICAgLi4uc291cmNlLFxuICBdO1xufTtcblxuY29uc3QgcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uID0gKFxuICByZXF1ZXN0ZWRVc2VySWQ6IHN0cmluZyxcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmcsXG4gIHVzZXJzOiBBdXRoTWFuYWdlZFVzZXJbXVxuKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZFJlcXVlc3RlZCA9IG5vcm1hbGl6ZVRleHQocmVxdWVzdGVkVXNlcklkKTtcbiAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbnQgPSBub3JtYWxpemVUZXh0KGN1cnJlbnRBeFVzZXJJZCk7XG4gIGlmIChub3JtYWxpemVkUmVxdWVzdGVkKSB7XG4gICAgY29uc3QgZXhhY3QgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZFJlcXVlc3RlZCkpO1xuICAgIGlmIChleGFjdCkgcmV0dXJuIGV4YWN0LmF4VXNlcklkO1xuICB9XG4gIGlmIChub3JtYWxpemVkQ3VycmVudCkge1xuICAgIGNvbnN0IHNlbGYgPSB1c2Vycy5maW5kKChlbnRyeSkgPT4gaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcbiAgICByZXR1cm4gc2VsZj8uYXhVc2VySWQgfHwgbm9ybWFsaXplZEN1cnJlbnQ7XG4gIH1cbiAgcmV0dXJuIHVzZXJzWzBdPy5heFVzZXJJZCB8fCBcIlwiO1xufTtcblxuY29uc3QgZ2V0RXhwZW5zZU1hbmFnZW1lbnRDYWNoZUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7RVhQRU5TRV9NQU5BR0VNRU5UX0NBQ0hFX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xufTtcblxuY29uc3QgcmVhZEV4cGVuc2VNYW5hZ2VtZW50Q2FjaGUgPSAoKTogRXhwZW5zZU1hbmFnZW1lbnRDYWNoZUVudHJ5IHwgbnVsbCA9PiB7XG4gIGNvbnN0IGNhY2hlS2V5ID0gZ2V0RXhwZW5zZU1hbmFnZW1lbnRDYWNoZUtleSgpO1xuICBjb25zdCByYXcgPSBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RXhwZW5zZU1hbmFnZW1lbnRDYWNoZUVudHJ5PihjYWNoZUtleSk7XG4gIGlmICghcmF3IHx8IHR5cGVvZiByYXcgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGN1cnJlbnRBeFVzZXJJZCA9IG5vcm1hbGl6ZVRleHQocmF3LmN1cnJlbnRBeFVzZXJJZCk7XG4gIGNvbnN0IGN1cnJlbnRDcm1Vc2VySWQgPSBub3JtYWxpemVUZXh0KHJhdy5jdXJyZW50Q3JtVXNlcklkKTtcbiAgY29uc3Qgc3Vib3JkaW5hdGVzID0gbm9ybWFsaXplU3Vib3JkaW5hdGVzKHJhdy5zdWJvcmRpbmF0ZXMpO1xuICBjb25zdCBzZWxlY3RlZE1hbmFnZWRVc2VySWQgPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24ocmF3LnNlbGVjdGVkTWFuYWdlZFVzZXJJZCwgY3VycmVudEF4VXNlcklkLCBzdWJvcmRpbmF0ZXMpO1xuXG4gIHJldHVybiB7XG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudDogcmF3LmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWUsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHN1Ym9yZGluYXRlcyxcbiAgfTtcbn07XG5cbmNvbnN0IHdyaXRlRXhwZW5zZU1hbmFnZW1lbnRDYWNoZSA9IChlbnRyeTogRXhwZW5zZU1hbmFnZW1lbnRDYWNoZUVudHJ5KTogdm9pZCA9PiB7XG4gIGNvbnN0IGNhY2hlS2V5ID0gZ2V0RXhwZW5zZU1hbmFnZW1lbnRDYWNoZUtleSgpO1xuICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoY2FjaGVLZXksIGVudHJ5LCBFWFBFTlNFX01BTkFHRU1FTlRfQ0FDSEVfVFRMX01TKTtcbn07XG5cbnR5cGUgQXV0aFZhbHVlID0ge1xuICBtb2R1bGVBY2Nlc3M6IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gIHNlbGVjdGVkQ29tcGFueTogc3RyaW5nO1xuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xuICBzdWJvcmRpbmF0ZXM6IEF1dGhNYW5hZ2VkVXNlcltdO1xuICBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzOiBBdXRoTWFuYWdlZFVzZXJbXTtcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeTogYm9vbGVhbjtcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbiAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiAodXNlcklkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiAoKSA9PiB2b2lkO1xuICBjYW5BY2Nlc3M6IChjb2RlOiBzdHJpbmcsIGxldmVsPzogQWNjZXNzTGV2ZWwpID0+IGJvb2xlYW47XG59O1xuXG5jb25zdCBkZWZhdWx0VmFsdWU6IEF1dGhWYWx1ZSA9IHtcbiAgbW9kdWxlQWNjZXNzOiB7fSxcbiAgc2VsZWN0ZWRDb21wYW55OiBcIlwiLFxuICBjdXJyZW50QXhVc2VySWQ6IFwiXCIsXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IFwiXCIsXG4gIHN1Ym9yZGluYXRlczogW10sXG4gIG1hbmFnZWFibGVTdWJvcmRpbmF0ZXM6IFtdLFxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBmYWxzZSxcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBcIlwiLFxuICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHk6IGZhbHNlLFxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBmYWxzZSxcbiAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiAoKSA9PiB1bmRlZmluZWQsXG4gIHJlc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiAoKSA9PiB1bmRlZmluZWQsXG4gIGNhbkFjY2VzczogKCkgPT4gZmFsc2UsXG59O1xuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8QXV0aFZhbHVlPihkZWZhdWx0VmFsdWUpO1xuXG50eXBlIFByb3ZpZGVyUHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIG1vZHVsZUFjY2Vzcz86IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gIHNlbGVjdGVkQ29tcGFueT86IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudD86IGJvb2xlYW47XG4gIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXIgPSAoe1xuICBjaGlsZHJlbixcbiAgbW9kdWxlQWNjZXNzLFxuICBzZWxlY3RlZENvbXBhbnksXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50ID0gZmFsc2UsXG59OiBQcm92aWRlclByb3BzKSA9PiB7XG4gIGNvbnN0IGFjY2VzcyA9IG1vZHVsZUFjY2VzcyB8fCAoZ2xvYmFsVGhpcy5fX0lORF9NT0RVTEVfQUNDRVNTX18gfHwge30pO1xuICBjb25zdCBjb21wYW55ID0gc2VsZWN0ZWRDb21wYW55IHx8IFN0cmluZyhnbG9iYWxUaGlzLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXyB8fCBcIlwiKTtcbiAgLy8gQ29tcGFueS1zY29wZWQgcGVybWlzc2lvbiBpbmplY3RlZCBieSBSYXpvciBsYXlvdXQgZnJvbSBzZWxlY3RlZCBjb21wYW55IGNvbnRleHQuXG4gIC8vIFNlbnNpdGl2ZSBlZGl0IGZsb3dzIG11c3QgZ2F0ZSB3aXRoIHRoaXMgdmFsdWUgaW4gYWRkaXRpb24gdG8gbW9kdWxlIGFjY2VzcyByaWdodHMuXG4gIGNvbnN0IHNlbGZNYW5hZ2VtZW50RnJvbUxheW91dCA9IGFsbG93U2VsZk1hbmFnZW1lbnQgPz8gZ2xvYmFsVGhpcy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9PT0gdHJ1ZTtcbiAgY29uc3QgY2FjaGVkRW50cnkgPSB1c2VNZW1vKCgpID0+IHJlYWRFeHBlbnNlTWFuYWdlbWVudENhY2hlKCksIFtjb21wYW55XSk7XG4gIGNvbnN0IFtjdXJyZW50QXhVc2VySWQsIHNldEN1cnJlbnRBeFVzZXJJZF0gPSB1c2VTdGF0ZSgoKSA9PiBub3JtYWxpemVUZXh0KGNhY2hlZEVudHJ5Py5jdXJyZW50QXhVc2VySWQpKTtcbiAgY29uc3QgW2N1cnJlbnRDcm1Vc2VySWQsIHNldEN1cnJlbnRDcm1Vc2VySWRdID0gdXNlU3RhdGUoKCkgPT4gbm9ybWFsaXplVGV4dChjYWNoZWRFbnRyeT8uY3VycmVudENybVVzZXJJZCkpO1xuICBjb25zdCBbc3Vib3JkaW5hdGVzLCBzZXRTdWJvcmRpbmF0ZXNdID0gdXNlU3RhdGU8QXV0aE1hbmFnZWRVc2VyW10+KCgpID0+XG4gICAgZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyhjYWNoZWRFbnRyeT8uc3Vib3JkaW5hdGVzIHx8IFtdLCBjYWNoZWRFbnRyeT8uY3VycmVudEF4VXNlcklkIHx8IFwiXCIpXG4gICk7XG4gIGNvbnN0IFtzZWxlY3RlZE1hbmFnZWRVc2VySWQsIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZFN0YXRlXSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICBjb25zdCBjYWNoZWRDdXJyZW50ID0gbm9ybWFsaXplVGV4dChjYWNoZWRFbnRyeT8uY3VycmVudEF4VXNlcklkKTtcbiAgICBjb25zdCBjYWNoZWRVc2VycyA9IGVuc3VyZUN1cnJlbnRVc2VySW5TdWJvcmRpbmF0ZXMoY2FjaGVkRW50cnk/LnN1Ym9yZGluYXRlcyB8fCBbXSwgY2FjaGVkQ3VycmVudCk7XG4gICAgY29uc3QgZmFsbGJhY2tTZWxlY3Rpb24gPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24oY2FjaGVkRW50cnk/LnNlbGVjdGVkTWFuYWdlZFVzZXJJZCB8fCBcIlwiLCBjYWNoZWRDdXJyZW50LCBjYWNoZWRVc2Vycyk7XG4gICAgcmV0dXJuIGZhbGxiYWNrU2VsZWN0aW9uO1xuICB9KTtcbiAgY29uc3QgW3NlbGZNYW5hZ2VtZW50LCBzZXRTZWxmTWFuYWdlbWVudF0gPSB1c2VTdGF0ZShzZWxmTWFuYWdlbWVudEZyb21MYXlvdXQpO1xuICBjb25zdCBbbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LCBzZXRNYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHldID0gdXNlU3RhdGUoIWVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChlbmFibGVFeHBlbnNlTWFuYWdlbWVudCkgcmV0dXJuO1xuICAgIHNldEN1cnJlbnRBeFVzZXJJZChcIlwiKTtcbiAgICBzZXRDdXJyZW50Q3JtVXNlcklkKFwiXCIpO1xuICAgIHNldFN1Ym9yZGluYXRlcyhbXSk7XG4gICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkU3RhdGUoXCJcIik7XG4gICAgc2V0U2VsZk1hbmFnZW1lbnQoc2VsZk1hbmFnZW1lbnRGcm9tTGF5b3V0KTtcbiAgfSwgW2VuYWJsZUV4cGVuc2VNYW5hZ2VtZW50LCBzZWxmTWFuYWdlbWVudEZyb21MYXlvdXRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQpIHtcbiAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgc2V0TWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5KHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjYWNoZWQgPSByZWFkRXhwZW5zZU1hbmFnZW1lbnRDYWNoZSgpO1xuICAgIGlmIChjYWNoZWQpIHtcbiAgICAgIGNvbnN0IGNhY2hlZFVzZXJzID0gZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyhjYWNoZWQuc3Vib3JkaW5hdGVzLCBjYWNoZWQuY3VycmVudEF4VXNlcklkKTtcbiAgICAgIGNvbnN0IGNhY2hlZFNlbGVjdGlvbiA9IHJlc29sdmVNYW5hZ2VkVXNlclNlbGVjdGlvbihjYWNoZWQuc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLCBjYWNoZWQuY3VycmVudEF4VXNlcklkLCBjYWNoZWRVc2Vycyk7XG4gICAgICBzZXRDdXJyZW50QXhVc2VySWQoY2FjaGVkLmN1cnJlbnRBeFVzZXJJZCk7XG4gICAgICBzZXRDdXJyZW50Q3JtVXNlcklkKG5vcm1hbGl6ZVRleHQoY2FjaGVkLmN1cnJlbnRDcm1Vc2VySWQpKTtcbiAgICAgIHNldFN1Ym9yZGluYXRlcyhjYWNoZWRVc2Vycyk7XG4gICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRTdGF0ZShjYWNoZWRTZWxlY3Rpb24pO1xuICAgICAgc2V0U2VsZk1hbmFnZW1lbnQoY2FjaGVkLmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWUgPyB0cnVlIDogc2VsZk1hbmFnZW1lbnRGcm9tTGF5b3V0KTtcbiAgICAgIHNldE1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5KGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBib290c3RyYXBFeHBlbnNlTWFuYWdlbWVudCA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGV4cGVuc2VBcGlNb2R1bGUgPSBhd2FpdCBpbXBvcnQoXCIuLi9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaS50c1wiKTtcbiAgICAgICAgY29uc3QgY29udGV4dFNuYXBzaG90ID0gYXdhaXQgZXhwZW5zZUFwaU1vZHVsZS5nZXRFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90KHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkQ3VycmVudFVzZXIgPSBub3JtYWxpemVUZXh0KGNvbnRleHRTbmFwc2hvdC5heFVzZXJJZCk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkQ3VycmVudENybVVzZXIgPSBub3JtYWxpemVUZXh0KGNvbnRleHRTbmFwc2hvdC5jcm1Vc2VySWQpO1xuICAgICAgICBjb25zdCBzaG91bGRGZXRjaFN1Ym9yZGluYXRlcyA9ICFjYWNoZWQgfHwgIUFycmF5LmlzQXJyYXkoY2FjaGVkLnN1Ym9yZGluYXRlcykgfHwgY2FjaGVkLnN1Ym9yZGluYXRlcy5sZW5ndGggPT09IDA7XG4gICAgICAgIGxldCBuZXh0U3Vib3JkaW5hdGVzID0gZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyhjYWNoZWQ/LnN1Ym9yZGluYXRlcyB8fCBbXSwgcmVzb2x2ZWRDdXJyZW50VXNlcik7XG5cbiAgICAgICAgaWYgKHNob3VsZEZldGNoU3Vib3JkaW5hdGVzKSB7XG4gICAgICAgICAgY29uc3Qgc3Vib3JkaW5hdGVzUmVzcG9uc2UgPSBhd2FpdCBleHBlbnNlQXBpTW9kdWxlLmdldEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyh7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBuZXh0U3Vib3JkaW5hdGVzID0gZW5zdXJlQ3VycmVudFVzZXJJblN1Ym9yZGluYXRlcyhcbiAgICAgICAgICAgIG5vcm1hbGl6ZVN1Ym9yZGluYXRlcyhzdWJvcmRpbmF0ZXNSZXNwb25zZT8uSXRlbXMpLFxuICAgICAgICAgICAgcmVzb2x2ZWRDdXJyZW50VXNlclxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0U2VsZWN0aW9uID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKFxuICAgICAgICAgIGNhY2hlZD8uc2VsZWN0ZWRNYW5hZ2VkVXNlcklkIHx8IHJlc29sdmVkQ3VycmVudFVzZXIsXG4gICAgICAgICAgcmVzb2x2ZWRDdXJyZW50VXNlcixcbiAgICAgICAgICBuZXh0U3Vib3JkaW5hdGVzXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIHNldEN1cnJlbnRBeFVzZXJJZChyZXNvbHZlZEN1cnJlbnRVc2VyKTtcbiAgICAgICAgc2V0Q3VycmVudENybVVzZXJJZChyZXNvbHZlZEN1cnJlbnRDcm1Vc2VyKTtcbiAgICAgICAgc2V0U3Vib3JkaW5hdGVzKG5leHRTdWJvcmRpbmF0ZXMpO1xuICAgICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRTdGF0ZShuZXh0U2VsZWN0aW9uKTtcbiAgICAgICAgc2V0U2VsZk1hbmFnZW1lbnQoY29udGV4dFNuYXBzaG90LmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWUpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIWNhY2hlZCkge1xuICAgICAgICAgIHNldEN1cnJlbnRBeFVzZXJJZChcIlwiKTtcbiAgICAgICAgICBzZXRDdXJyZW50Q3JtVXNlcklkKFwiXCIpO1xuICAgICAgICAgIHNldFN1Ym9yZGluYXRlcyhbXSk7XG4gICAgICAgICAgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkU3RhdGUoXCJcIik7XG4gICAgICAgICAgc2V0U2VsZk1hbmFnZW1lbnQoc2VsZk1hbmFnZW1lbnRGcm9tTGF5b3V0KTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICBzZXRNYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBib290c3RyYXBFeHBlbnNlTWFuYWdlbWVudCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW2NvbXBhbnksIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50LCBzZWxmTWFuYWdlbWVudEZyb21MYXlvdXRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQpIHJldHVybjtcbiAgICBpZiAoIW1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSkgcmV0dXJuO1xuXG4gICAgd3JpdGVFeHBlbnNlTWFuYWdlbWVudENhY2hlKHtcbiAgICAgIGN1cnJlbnRBeFVzZXJJZDogbm9ybWFsaXplVGV4dChjdXJyZW50QXhVc2VySWQpLFxuICAgICAgY3VycmVudENybVVzZXJJZDogbm9ybWFsaXplVGV4dChjdXJyZW50Q3JtVXNlcklkKSxcbiAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IHNlbGZNYW5hZ2VtZW50ID09PSB0cnVlLFxuICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBub3JtYWxpemVUZXh0KHNlbGVjdGVkTWFuYWdlZFVzZXJJZCksXG4gICAgICBzdWJvcmRpbmF0ZXM6IGVuc3VyZUN1cnJlbnRVc2VySW5TdWJvcmRpbmF0ZXMoc3Vib3JkaW5hdGVzLCBjdXJyZW50QXhVc2VySWQpLFxuICAgIH0pO1xuICB9LCBbXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQsXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICBzZWxmTWFuYWdlbWVudCxcbiAgICBzdWJvcmRpbmF0ZXMsXG4gIF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFlbmFibGVFeHBlbnNlTWFuYWdlbWVudCkgcmV0dXJuO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW50ID0gbm9ybWFsaXplVGV4dChjdXJyZW50QXhVc2VySWQpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRTZWxlY3RlZCA9IG5vcm1hbGl6ZVRleHQoc2VsZWN0ZWRNYW5hZ2VkVXNlcklkKTtcbiAgICBjb25zdCBzaG91bGRPdmVycmlkZSA9XG4gICAgICAhIW5vcm1hbGl6ZWRTZWxlY3RlZCAmJiAoIW5vcm1hbGl6ZWRDdXJyZW50IHx8ICFpc1NhbWVVc2VyKG5vcm1hbGl6ZWRTZWxlY3RlZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcblxuICAgIGlmICghc2hvdWxkT3ZlcnJpZGUpIHtcbiAgICAgIGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUobm9ybWFsaXplZFNlbGVjdGVkKTtcbiAgfSwgW2N1cnJlbnRBeFVzZXJJZCwgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQsIHNlbGVjdGVkTWFuYWdlZFVzZXJJZF0pO1xuXG4gIGNvbnN0IG1hbmFnZWFibGVTdWJvcmRpbmF0ZXMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVRleHQoY3VycmVudEF4VXNlcklkKTtcbiAgICByZXR1cm4gc3Vib3JkaW5hdGVzLmZpbHRlcigoZW50cnkpID0+ICFub3JtYWxpemVkQ3VycmVudCB8fCAhaXNTYW1lVXNlcihlbnRyeS5heFVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQpKTtcbiAgfSwgW2N1cnJlbnRBeFVzZXJJZCwgc3Vib3JkaW5hdGVzXSk7XG5cbiAgY29uc3Qgc2V0U2VsZWN0ZWRNYW5hZ2VkVXNlcklkID0gdXNlQ2FsbGJhY2soXG4gICAgKHVzZXJJZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVRleHQoY3VycmVudEF4VXNlcklkKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVc2VycyA9IGVuc3VyZUN1cnJlbnRVc2VySW5TdWJvcmRpbmF0ZXMoc3Vib3JkaW5hdGVzLCBub3JtYWxpemVkQ3VycmVudCk7XG4gICAgICBjb25zdCBuZXh0U2VsZWN0aW9uID0gcmVzb2x2ZU1hbmFnZWRVc2VyU2VsZWN0aW9uKHVzZXJJZCwgbm9ybWFsaXplZEN1cnJlbnQsIG5vcm1hbGl6ZWRVc2Vycyk7XG4gICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWRTdGF0ZShuZXh0U2VsZWN0aW9uKTtcbiAgICB9LFxuICAgIFtjdXJyZW50QXhVc2VySWQsIHN1Ym9yZGluYXRlc11cbiAgKTtcblxuICBjb25zdCByZXNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVudCA9IG5vcm1hbGl6ZVRleHQoY3VycmVudEF4VXNlcklkKTtcbiAgICBjb25zdCBub3JtYWxpemVkVXNlcnMgPSBlbnN1cmVDdXJyZW50VXNlckluU3Vib3JkaW5hdGVzKHN1Ym9yZGluYXRlcywgbm9ybWFsaXplZEN1cnJlbnQpO1xuICAgIGNvbnN0IG5leHRTZWxlY3Rpb24gPSByZXNvbHZlTWFuYWdlZFVzZXJTZWxlY3Rpb24obm9ybWFsaXplZEN1cnJlbnQsIG5vcm1hbGl6ZWRDdXJyZW50LCBub3JtYWxpemVkVXNlcnMpO1xuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZFN0YXRlKG5leHRTZWxlY3Rpb24pO1xuICB9LCBbY3VycmVudEF4VXNlcklkLCBzdWJvcmRpbmF0ZXNdKTtcblxuICBjb25zdCB2YWx1ZSA9IHVzZU1lbW88QXV0aFZhbHVlPigoKSA9PiB7XG4gICAgY29uc3QgY2FuQWNjZXNzID0gKGNvZGU6IHN0cmluZywgbGV2ZWw6IEFjY2Vzc0xldmVsID0gXCJWaWV3XCIpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBOdW1iZXIoYWNjZXNzPy5bY29kZV0gPz8gMCk7XG4gICAgICByZXR1cm4gY3VycmVudCA+PSBBQ0NFU1NfUklHSFRTW2xldmVsXTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBtb2R1bGVBY2Nlc3M6IGFjY2VzcyxcbiAgICAgIHNlbGVjdGVkQ29tcGFueTogY29tcGFueSxcbiAgICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgICBzdWJvcmRpbmF0ZXMsXG4gICAgICBtYW5hZ2VhYmxlU3Vib3JkaW5hdGVzLFxuICAgICAgY2FuTWFuYWdlT3RoZXJVc2VyczogbWFuYWdlYWJsZVN1Ym9yZGluYXRlcy5sZW5ndGggPiAwLFxuICAgICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudDogc2VsZk1hbmFnZW1lbnQsXG4gICAgICBzZXRTZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgICByZXNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICAgIGNhbkFjY2VzcyxcbiAgICB9O1xuICB9LCBbXG4gICAgYWNjZXNzLFxuICAgIGNvbXBhbnksXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgbWFuYWdlYWJsZVN1Ym9yZGluYXRlcyxcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXG4gICAgc2VsZk1hbmFnZW1lbnQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICByZXNldFNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICBzdWJvcmRpbmF0ZXMsXG4gIF0pO1xuXG4gIHJldHVybiA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9BdXRoQ29udGV4dC5Qcm92aWRlcj47XG59O1xuXG5leHBvcnQgY29uc3QgdXNlQXV0aENvbnRleHQgPSAoKSA9PiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbiIsICJ0eXBlIEV4cGVuc2VTY29wZVdpbmRvdyA9IHtcbiAgX19JTkRfRU5UUkFfT0lEX18/OiB1bmtub3duO1xuICBfX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18/OiB1bmtub3duO1xuICBfX0lORF9DT01QQU5ZX18/OiB1bmtub3duO1xufTtcblxuY29uc3Qgbm9ybWFsaXplU2NvcGVQYXJ0ID0gKHZhbHVlOiB1bmtub3duLCB1cHBlcmNhc2UgPSBmYWxzZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gdXBwZXJjYXNlID8gbm9ybWFsaXplZC50b1VwcGVyQ2FzZSgpIDogbm9ybWFsaXplZC50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gUmVhZHMgdGhlIGN1cnJlbnQgc2Vzc2lvbiBzY29wZSB2YWx1ZXMgdXNlZCBieSBHYXN0b3MgY2FjaGVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTY29wZVZhbHVlcyA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZW50cmFPaWQ6IFwiXCIsXG4gICAgICBjb21wYW55SWQ6IFwiXCIsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSB3aW5kb3cgYXMgRXhwZW5zZVNjb3BlV2luZG93O1xuICBjb25zdCBlbnRyYU9pZCA9IG5vcm1hbGl6ZVNjb3BlUGFydChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKTtcbiAgY29uc3QgY29tcGFueUlkID0gbm9ybWFsaXplU2NvcGVQYXJ0KHJ1bnRpbWVXaW5kb3cuX19JTkRfU0VMRUNURURfQ09NUEFOWV9fIHx8IHJ1bnRpbWVXaW5kb3cuX19JTkRfQ09NUEFOWV9fLCB0cnVlKTtcblxuICByZXR1cm4ge1xuICAgIGVudHJhT2lkLFxuICAgIGNvbXBhbnlJZCxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkcyB0aGUgc3RhbmRhcmQgR2FzdG9zIGNhY2hlIHNjb3BlIGtleSAoZW50cmFPaWQgKyBjb21wYW55SWQpLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTY29wZVRva2VuID0gKCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHsgZW50cmFPaWQsIGNvbXBhbnlJZCB9ID0gZ2V0RXhwZW5zZVNjb3BlVmFsdWVzKCk7XG4gIGNvbnN0IHNjb3BlID0gYCR7ZW50cmFPaWR9X18ke2NvbXBhbnlJZH1gLnJlcGxhY2UoL15fK3xfKyQvZywgXCJcIik7XG4gIHJldHVybiBzY29wZSB8fCBcInNlc3Npb25cIjtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBJMThuRGljdCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbnR5cGUgSTE4blZhbHVlID0ge1xuICBkaWN0aW9uYXJ5OiBJMThuRGljdDtcbiAgdDogKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4gc3RyaW5nO1xuICBmb3JtYXQ6IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4gc3RyaW5nO1xufTtcblxuY29uc3QgZGVmYXVsdERpY3Q6IEkxOG5EaWN0ID0ge307XG5cbmNvbnN0IGRlZmF1bHRWYWx1ZTogSTE4blZhbHVlID0ge1xuICBkaWN0aW9uYXJ5OiBkZWZhdWx0RGljdCxcbiAgdDogKGtleSwgZmFsbGJhY2spID0+IGZhbGxiYWNrIHx8IGtleSxcbiAgZm9ybWF0OiAoa2V5LCBmYWxsYmFjaywgLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gZmFsbGJhY2sgfHwga2V5O1xuICAgIHJldHVybiBTdHJpbmcodGVtcGxhdGUpLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCAoXywgaWR4KSA9PiBTdHJpbmcoYXJnc1tOdW1iZXIoaWR4KV0gPz8gXCJcIikpO1xuICB9LFxufTtcblxuY29uc3QgSTE4bkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEkxOG5WYWx1ZT4oZGVmYXVsdFZhbHVlKTtcblxudHlwZSBQcm92aWRlclByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBkaWN0aW9uYXJ5PzogSTE4bkRpY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgSTE4blByb3ZpZGVyID0gKHsgY2hpbGRyZW4sIGRpY3Rpb25hcnkgfTogUHJvdmlkZXJQcm9wcykgPT4ge1xuICBjb25zdCBkaWN0ID0gZGljdGlvbmFyeSB8fCAoZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge30pO1xuXG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbzxJMThuVmFsdWU+KCgpID0+IHtcbiAgICBjb25zdCB0ID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBkaWN0W2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgcmV0dXJuIGZhbGxiYWNrIHx8IGtleTtcbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdCA9IChrZXk6IHN0cmluZywgZmFsbGJhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCwgLi4uYXJnczogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0KGtleSwgZmFsbGJhY2spO1xuICAgICAgcmV0dXJuIFN0cmluZyh0ZW1wbGF0ZSkucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIChfLCBpZHgpID0+IFN0cmluZyhhcmdzW051bWJlcihpZHgpXSA/PyBcIlwiKSk7XG4gICAgfTtcbiAgICByZXR1cm4geyBkaWN0aW9uYXJ5OiBkaWN0LCB0LCBmb3JtYXQgfTtcbiAgfSwgW2RpY3RdKTtcblxuICByZXR1cm4gPEkxOG5Db250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvSTE4bkNvbnRleHQuUHJvdmlkZXI+O1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUkxOG4gPSAoKSA9PiB1c2VDb250ZXh0KEkxOG5Db250ZXh0KTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJMThuUHJvdmlkZXIgfSBmcm9tIFwiLi4vLi4vY29udGV4dC9JMThuQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gXCIuLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD86IGJvb2xlYW47XG59O1xuXG4vLyBTaGFyZWQgcHJvdmlkZXIgd3JhcHBlciBmb3IgdmlzaXRhcyBSZWFjdCBpc2xhbmRzLlxuY29uc3QgVmlzaXRhc1BhZ2VQcm92aWRlcnMgPSAoeyBjaGlsZHJlbiwgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQgPSBmYWxzZSB9OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxJMThuUHJvdmlkZXI+XG4gICAgICA8QXV0aFByb3ZpZGVyIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PXtlbmFibGVFeHBlbnNlTWFuYWdlbWVudH0+e2NoaWxkcmVufTwvQXV0aFByb3ZpZGVyPlxuICAgIDwvSTE4blByb3ZpZGVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlzaXRhc1BhZ2VQcm92aWRlcnM7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBNEY7OztBQ001RixJQUFNLHFCQUFxQixDQUFDLE9BQWdCLFlBQVksVUFBa0I7QUFDeEUsUUFBTSxhQUFhLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUM1QyxNQUFJLENBQUMsV0FBWSxRQUFPO0FBQ3hCLFNBQU8sWUFBWSxXQUFXLFlBQVksSUFBSSxXQUFXLFlBQVk7QUFDdkU7QUFHTyxJQUFNLHdCQUF3QixNQUFNO0FBQ3pDLE1BQUksT0FBTyxXQUFXLGFBQWE7QUFDakMsV0FBTztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBRUEsUUFBTSxnQkFBZ0I7QUFDdEIsUUFBTSxXQUFXLG1CQUFtQixjQUFjLGlCQUFpQjtBQUNuRSxRQUFNLFlBQVksbUJBQW1CLGNBQWMsNEJBQTRCLGNBQWMsaUJBQWlCLElBQUk7QUFFbEgsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBR08sSUFBTSx1QkFBdUIsTUFBYztBQUNoRCxRQUFNLEVBQUUsVUFBVSxVQUFVLElBQUksc0JBQXNCO0FBQ3RELFFBQU0sUUFBUSxHQUFHLFFBQVEsS0FBSyxTQUFTLEdBQUcsUUFBUSxZQUFZLEVBQUU7QUFDaEUsU0FBTyxTQUFTO0FBQ2xCOzs7QURzVlM7QUExV1QsSUFBTSxnQkFBNkM7QUFBQSxFQUNqRCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQ2Q7QUFFQSxJQUFNLHNDQUFzQztBQUM1QyxJQUFNLGtDQUFrQyxLQUFLLEtBQUssS0FBSztBQVV2RCxJQUFNLGdCQUFnQixDQUFDLFVBQTJCLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUUzRSxJQUFNLGFBQWEsQ0FBQyxNQUFj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QSxnQkFBMEQ7QUE0Q2pELElBQUFDLHNCQUFBO0FBbENULElBQU0sY0FBd0IsQ0FBQztBQUUvQixJQUFNQyxnQkFBMEI7QUFBQSxFQUM5QixZQUFZO0FBQUEsRUFDWixHQUFHLENBQUMsS0FBSyxhQUFhLFlBQVk7QUFBQSxFQUNsQyxRQUFRLENBQUMsS0FBSyxhQUFhLFNBQVM7QUFDbEMsVUFBTSxXQUFXLFlBQVk7QUFDN0IsV0FBTyxPQUFPLFFBQVEsRUFBRSxRQUFRLGNBQWMsQ0FBQyxHQUFHLFFBQVEsT0FBTyxLQUFLLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQUEsRUFDM0Y7QUFDRjtBQUVBLElBQU0sa0JBQWMsNkJBQXlCQSxhQUFZO0FBT2xELElBQU0sZUFBZSxDQUFDLEVBQUUsVUFBVSxXQUFXLE1BQXFCO0FBQ3ZFLFFBQU0sT0FBTyxlQUFlLFdBQVcsZ0JBQWdCLENBQUM7QUFFeEQsUUFBTSxZQUFRLHVCQUFtQixNQUFNO0FBQ3JDLFVBQU0sSUFBSSxDQUFDLEtBQWEsYUFBc0I7QUFDNUMsWUFBTUMsU0FBUSxLQUFLLEdBQUc7QUFDdEIsVUFBSSxPQUFPQSxXQUFVLFlBQVlBLE9BQU0sS0FBSyxFQUFHLFFBQU9BO0FBQ3RELGFBQU8sWUFBWTtBQUFBLElBQ3JCO0FBQ0EsVUFBTSxTQUFTLENBQUMsS0FBYSxhQUFpQyxTQUFpQztBQUM3RixZQUFNLFdBQVcsRUFBRSxLQUFLLFFBQVE7QUFDaEMsYUFBTyxPQUFPLFFBQVEsRUFBRSxRQUFRLGNBQWMsQ0FBQyxHQUFHLFFBQVEsT0FBTyxLQUFLLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQUEsSUFDM0Y7QUFDQSxXQUFPLEVBQUUsWUFBWSxNQUFNLEdBQUcsT0FBTztBQUFBLEVBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFFVCxTQUFPLDZDQUFDLFlBQVksVUFBWixFQUFxQixPQUFlLFVBQVM7QUFDdkQ7OztBQ2hDTSxJQUFBQyxzQkFBQTtBQUhOLElBQU0sdUJBQXVCLENBQUMsRUFBRSxVQUFVLDBCQUEwQixNQUFNLE1BQWE7QUFDckYsU0FDRSw2Q0FBQyxnQkFDQyx1REFBQyxnQkFBYSx5QkFBbUQsVUFBUyxHQUM1RTtBQUVKO0FBRUEsSUFBTywrQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJkZWZhdWx0VmFsdWUiLCAidmFsdWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
