import {
  formatUserNameWithId
} from "./chunk-DG56V5LO.js";
import {
  resolveEffectiveCompanyId
} from "./chunk-DY2B5JHI.js";
import {
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  fetchJson,
  indT
} from "./chunk-PNIKV5DC.js";
import {
  getSessionJsonWithExpiry,
  setSessionJsonWithExpiry
} from "./chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/utils/moduleDataVisibility.ts
var safeText = (value) => String(value ?? "").trim();
var parseMutationPolicyInt = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(safeText(value));
  return Number.isFinite(parsed) ? parsed : null;
};
var parseCanMutate = (value) => {
  if (typeof value === "boolean") return value;
  const normalized = safeText(value).toLowerCase();
  return normalized === "true" || normalized === "1";
};
var normalizeOwnerAxUserId = (ownerAxUserId) => safeText(ownerAxUserId).toUpperCase();
var normalizePolicyToken = (value) => {
  return safeText(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "");
};
var normalizeVisibleUser = (item) => {
  const axUserId = safeText(item.axUserId ?? item.AxUserId);
  if (!axUserId) return null;
  return {
    alias: safeText(item.alias ?? item.Alias),
    axUserId,
    crmUserId: safeText(item.crmUserId ?? item.CrmUserId),
    name: safeText(item.name ?? item.Name) || axUserId,
    source: safeText(item.source ?? item.Source),
    mutationPolicy: safeText(item.mutationPolicy ?? item.MutationPolicy),
    mutationPolicyInt: parseMutationPolicyInt(item.mutationPolicyInt ?? item.MutationPolicyInt),
    mutationPolicyLabel: safeText(item.mutationPolicyLabel ?? item.MutationPolicyLabel),
    canMutate: parseCanMutate(item.canMutate ?? item.CanMutate)
  };
};
var normalizeModuleDataVisibilityUsers = (source) => {
  if (!Array.isArray(source)) return [];
  const seen = /* @__PURE__ */ new Set();
  return source.map((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
    return normalizeVisibleUser(entry);
  }).filter((entry) => !!entry).filter((entry) => {
    const key = normalizeOwnerAxUserId(entry.axUserId);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
var buildVisibleUserByOwnerMap = (users) => {
  const result = /* @__PURE__ */ new Map();
  for (const user of users) {
    const key = normalizeOwnerAxUserId(user.axUserId);
    if (key && !result.has(key)) {
      result.set(key, user);
    }
  }
  return result;
};
var getVisibleUserForOwner = (usersByOwnerAxUserId, ownerAxUserId) => {
  const key = normalizeOwnerAxUserId(ownerAxUserId);
  return key ? usersByOwnerAxUserId.get(key) || null : null;
};
var isSameAsVisibilityMutationPolicy = (user) => {
  if (!user) return false;
  if (user.mutationPolicyInt === 1) return true;
  const policy = normalizePolicyToken(user.mutationPolicy);
  const label = normalizePolicyToken(user.mutationPolicyLabel);
  return policy === "sameasvisibility" || policy === "igualquevisibilidad" || policy === "igualvisibilidad" || label === "sameasvisibility" || label === "igualquevisibilidad" || label === "igualvisibilidad";
};
var isModuleBusinessRulesMutationPolicy = (user) => {
  if (!user) return false;
  if (user.mutationPolicyInt === 2) return true;
  const policy = normalizePolicyToken(user.mutationPolicy);
  const label = normalizePolicyToken(user.mutationPolicyLabel);
  return policy === "modulebusinessrules" || policy === "modulebusinessrule" || policy === "reglasdelmodulo" || policy === "reglasmodulo" || label === "modulebusinessrules" || label === "modulebusinessrule" || label === "reglasdelmodulo" || label === "reglasmodulo";
};
var hasMutationPolicy = (user) => {
  if (!user) return false;
  return !!safeText(user.mutationPolicy) || user.mutationPolicyInt !== null || !!safeText(user.mutationPolicyLabel);
};
var resolveModuleOwnerMutationAccess = ({
  usersByOwnerAxUserId,
  ownerAxUserId,
  viewerAxUserId,
  visibleUsersReady = true
}) => {
  const ownerKey = normalizeOwnerAxUserId(ownerAxUserId);
  const viewerKey = normalizeOwnerAxUserId(viewerAxUserId);
  if (!ownerKey) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner: null,
      reason: "blocked_missing_owner"
    };
  }
  if (!viewerKey) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner: null,
      reason: "blocked_missing_viewer"
    };
  }
  const owner = getVisibleUserForOwner(usersByOwnerAxUserId, ownerAxUserId);
  const isCurrentOwner = ownerKey === viewerKey;
  if (isCurrentOwner) {
    return {
      canMutate: true,
      isCurrentOwner: true,
      ready: true,
      owner,
      reason: "allowed_current_owner"
    };
  }
  if (!visibleUsersReady) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: false,
      owner: null,
      reason: "blocked_visibility_loading"
    };
  }
  if (!owner) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner: null,
      reason: "blocked_owner_not_visible"
    };
  }
  if (!hasMutationPolicy(owner)) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner,
      reason: "blocked_missing_policy"
    };
  }
  const usesSameAsVisibility = isSameAsVisibilityMutationPolicy(owner);
  const usesModuleBusinessRules = isModuleBusinessRulesMutationPolicy(owner);
  if (!usesSameAsVisibility && !usesModuleBusinessRules) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner,
      reason: "blocked_restricted_policy"
    };
  }
  if (owner.canMutate !== true) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner,
      reason: "blocked_can_mutate_false"
    };
  }
  return {
    canMutate: true,
    isCurrentOwner: false,
    ready: true,
    owner,
    reason: usesModuleBusinessRules ? "allowed_module_business_rules" : "allowed_same_as_visibility"
  };
};
var formatModuleVisibleUserLabel = (user) => {
  return formatUserNameWithId(user.name, user.axUserId);
};

// Web/wwwroot/react/src/hooks/useModuleDataVisibility.ts
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/services/moduleDataVisibilityService.ts
var getVisibleUsers = (appCode, moduleCode, options = {}) => {
  const query = [
    `appCode=${encodeURIComponent(appCode)}`,
    `moduleCode=${encodeURIComponent(moduleCode)}`,
    `includeCrmUserId=${options.includeCrmUserId === false ? "false" : "true"}`
  ].join("&");
  const url = `/api/crm/data-visibility/visible-users?${query}`;
  return fetchJson(url, {
    method: "GET",
    signal: options.signal,
    suppressPermissionModal: options.suppressPermissionModal ?? true
  });
};
var getVisibleUsersResponseItems = (response) => {
  return Array.isArray(response.Items) ? response.Items : Array.isArray(response.items) ? response.items : [];
};
var isVisibleUsersResponseSuccess = (response) => {
  const success = response.Success ?? response.success;
  return success !== false;
};
var getVisibleUsersResponseMessage = (response) => {
  return String(response.Message || response.message || "").trim();
};
var getVisibleUsersResponseTraceId = (response) => {
  return String(response.TraceId || response.traceId || "").trim() || void 0;
};

// Web/wwwroot/react/src/hooks/useModuleDataVisibility.ts
var CACHE_PREFIX = "module_data_visibility_v3";
var CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var normalizeScopePart = (value) => {
  const normalized = String(value || "").trim().toUpperCase();
  return normalized || "NONE";
};
var resolveCacheCompanyId = (companyId) => {
  const selectedCompanyId = String(globalThis.__IND_SELECTED_COMPANY__ || companyId || "");
  const companyCandidates = companyId ? [{ companyId, isDefault: true }] : [];
  return resolveEffectiveCompanyId(selectedCompanyId, companyCandidates, companyId);
};
var buildCacheKey = (companyId, axUserId, permissionsRevision, appCode, moduleCode, includeCrmUserId) => {
  const effectiveCompanyId = resolveCacheCompanyId(companyId);
  return [
    CACHE_PREFIX,
    normalizeScopePart(effectiveCompanyId),
    normalizeScopePart(axUserId),
    normalizeScopePart(permissionsRevision),
    normalizeScopePart(appCode),
    normalizeScopePart(moduleCode),
    includeCrmUserId ? "CRMID1" : "CRMID0"
  ].join("_");
};
var hasPreloadedUsers = (preloadedUsers) => {
  return Array.isArray(preloadedUsers) && preloadedUsers.length > 0;
};
var readPreloadedUsers = (preloadedUsers) => {
  return normalizeModuleDataVisibilityUsers(preloadedUsers);
};
var useModuleDataVisibility = ({
  enabled,
  companyId,
  axUserId,
  permissionsRevision,
  appCode,
  moduleCode,
  includeCrmUserId = true,
  allowCachedUsers = true,
  preloadedUsers,
  onForbidden,
  onDebug
}) => {
  const [visibleUsers, setVisibleUsers] = (0, import_react.useState)(() => readPreloadedUsers(preloadedUsers));
  const [visibleUsersLoading, setVisibleUsersLoading] = (0, import_react.useState)(false);
  const [visibleUsersError, setVisibleUsersError] = (0, import_react.useState)("");
  const [visibleUsersReady, setVisibleUsersReady] = (0, import_react.useState)(() => hasPreloadedUsers(preloadedUsers));
  const activeAbortRef = (0, import_react.useRef)(null);
  const activeRequestIdRef = (0, import_react.useRef)(0);
  const visibleUserByOwnerAxUserId = (0, import_react.useMemo)(() => buildVisibleUserByOwnerMap(visibleUsers), [visibleUsers]);
  const abortActiveRequest = (0, import_react.useCallback)(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
    }
    activeAbortRef.current = null;
  }, []);
  const loadVisibleUsers = (0, import_react.useCallback)(
    async (force = false) => {
      if (!enabled) {
        abortActiveRequest();
        setVisibleUsers([]);
        setVisibleUsersLoading(false);
        setVisibleUsersError("");
        setVisibleUsersReady(true);
        return;
      }
      const cacheKey = buildCacheKey(companyId, axUserId, permissionsRevision, appCode, moduleCode, includeCrmUserId);
      const preloaded = readPreloadedUsers(preloadedUsers);
      if (!force && hasPreloadedUsers(preloadedUsers)) {
        setVisibleUsers(preloaded);
        setVisibleUsersLoading(false);
        setVisibleUsersError("");
        setVisibleUsersReady(true);
        setSessionJsonWithExpiry(cacheKey, { users: preloaded, total: preloaded.length }, CACHE_TTL_MS);
        onDebug?.("moduleDataVisibility:preloaded", { appCode, moduleCode, count: preloaded.length, cacheKey });
        return;
      }
      const cached = force || !allowCachedUsers ? null : getSessionJsonWithExpiry(cacheKey);
      if (cached && Array.isArray(cached.users)) {
        setVisibleUsers(cached.users);
        setVisibleUsersLoading(false);
        setVisibleUsersError("");
        setVisibleUsersReady(true);
        onDebug?.("moduleDataVisibility:cache", { appCode, moduleCode, count: cached.users.length, cacheKey });
        return;
      }
      const requestId = ++activeRequestIdRef.current;
      abortActiveRequest();
      const controller = new AbortController();
      activeAbortRef.current = controller;
      setVisibleUsersLoading(true);
      setVisibleUsersError("");
      setVisibleUsersReady(false);
      try {
        const response = await getVisibleUsers(appCode, moduleCode, {
          includeCrmUserId,
          signal: controller.signal,
          suppressPermissionModal: true
        });
        if (requestId !== activeRequestIdRef.current) return;
        const users = normalizeModuleDataVisibilityUsers(getVisibleUsersResponseItems(response));
        const traceId = getVisibleUsersResponseTraceId(response);
        if (!isVisibleUsersResponseSuccess(response) && users.length === 0) {
          setVisibleUsers([]);
          setVisibleUsersLoading(false);
          setVisibleUsersError(getVisibleUsersResponseMessage(response) || indT("Api_RequestFailed", "Could not load visible users."));
          setVisibleUsersReady(true);
          activeAbortRef.current = null;
          return;
        }
        setVisibleUsers(users);
        setVisibleUsersLoading(false);
        setVisibleUsersError("");
        setVisibleUsersReady(true);
        activeAbortRef.current = null;
        setSessionJsonWithExpiry(cacheKey, { users, total: users.length, traceId }, CACHE_TTL_MS);
        onDebug?.("moduleDataVisibility:response", { appCode, moduleCode, count: users.length, traceId: traceId || "" });
      } catch (err) {
        if (requestId !== activeRequestIdRef.current) return;
        if (err?.name === "AbortError") {
          activeAbortRef.current = null;
          return;
        }
        if (err instanceof ApiFetchError && err.status === 403) {
          setVisibleUsersLoading(false);
          setVisibleUsersReady(true);
          activeAbortRef.current = null;
          onForbidden?.();
          return;
        }
        setVisibleUsers([]);
        setVisibleUsersLoading(false);
        setVisibleUsersError(err?.message || indT("Api_RequestFailed", "Could not load visible users."));
        setVisibleUsersReady(true);
        activeAbortRef.current = null;
        onDebug?.("moduleDataVisibility:error", { appCode, moduleCode, message: err?.message || "" });
      }
    },
    [
      abortActiveRequest,
      allowCachedUsers,
      appCode,
      axUserId,
      companyId,
      enabled,
      includeCrmUserId,
      moduleCode,
      onDebug,
      onForbidden,
      permissionsRevision,
      preloadedUsers
    ]
  );
  (0, import_react.useEffect)(() => {
    void loadVisibleUsers(false);
    return () => {
      abortActiveRequest();
    };
  }, [abortActiveRequest, loadVisibleUsers]);
  return {
    visibleUsers,
    visibleUserByOwnerAxUserId,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
    loadVisibleUsers
  };
};

export {
  normalizeOwnerAxUserId,
  buildVisibleUserByOwnerMap,
  getVisibleUserForOwner,
  resolveModuleOwnerMutationAccess,
  formatModuleVisibleUserLabel,
  useModuleDataVisibility
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL21vZHVsZURhdGFWaXNpYmlsaXR5LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VNb2R1bGVEYXRhVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvc2VydmljZXMvbW9kdWxlRGF0YVZpc2liaWxpdHlTZXJ2aWNlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBmb3JtYXRVc2VyTmFtZVdpdGhJZCB9IGZyb20gXCIuL3VzZXJMYWJlbHMudHNcIjtcblxuLy8gU2hhcmVkIHJvdyByZXR1cm5lZCBieSAvYXBpL2NybS9kYXRhLXZpc2liaWxpdHkvdmlzaWJsZS11c2VycyBmb3Igb3duZXIgdmlzaWJpbGl0eSBhbmQgbXV0YXRpb24gY2hlY2tzLlxuZXhwb3J0IHR5cGUgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciA9IHtcbiAgYWxpYXM6IHN0cmluZztcclxuICBheFVzZXJJZDogc3RyaW5nO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBzb3VyY2U6IHN0cmluZztcclxuICBtdXRhdGlvblBvbGljeTogc3RyaW5nO1xyXG4gIG11dGF0aW9uUG9saWN5SW50OiBudW1iZXIgfCBudWxsO1xyXG4gIG11dGF0aW9uUG9saWN5TGFiZWw6IHN0cmluZztcclxuICBjYW5NdXRhdGU6IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBNb2R1bGVPd25lck11dGF0aW9uQWNjZXNzUmVhc29uID1cclxuICB8IFwiYWxsb3dlZF9jdXJyZW50X293bmVyXCJcclxuICB8IFwiYWxsb3dlZF9zYW1lX2FzX3Zpc2liaWxpdHlcIlxyXG4gIHwgXCJhbGxvd2VkX21vZHVsZV9idXNpbmVzc19ydWxlc1wiXHJcbiAgfCBcImJsb2NrZWRfbWlzc2luZ19vd25lclwiXHJcbiAgfCBcImJsb2NrZWRfbWlzc2luZ192aWV3ZXJcIlxyXG4gIHwgXCJibG9ja2VkX3Zpc2liaWxpdHlfbG9hZGluZ1wiXHJcbiAgfCBcImJsb2NrZWRfb3duZXJfbm90X3Zpc2libGVcIlxyXG4gIHwgXCJibG9ja2VkX21pc3NpbmdfcG9saWN5XCJcclxuICB8IFwiYmxvY2tlZF9yZXN0cmljdGVkX3BvbGljeVwiXHJcbiAgfCBcImJsb2NrZWRfY2FuX211dGF0ZV9mYWxzZVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgTW9kdWxlT3duZXJNdXRhdGlvbkFjY2VzcyA9IHtcclxuICBjYW5NdXRhdGU6IGJvb2xlYW47XHJcbiAgaXNDdXJyZW50T3duZXI6IGJvb2xlYW47XHJcbiAgcmVhZHk6IGJvb2xlYW47XHJcbiAgb3duZXI6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfCBudWxsO1xyXG4gIHJlYXNvbjogTW9kdWxlT3duZXJNdXRhdGlvbkFjY2Vzc1JlYXNvbjtcclxufTtcclxuXHJcbnR5cGUgUmF3VmlzaWJsZVVzZXIgPSB7XHJcbiAgYWxpYXM/OiB1bmtub3duO1xyXG4gIEFsaWFzPzogdW5rbm93bjtcclxuICBheFVzZXJJZD86IHVua25vd247XHJcbiAgQXhVc2VySWQ/OiB1bmtub3duO1xyXG4gIGNybVVzZXJJZD86IHVua25vd247XHJcbiAgQ3JtVXNlcklkPzogdW5rbm93bjtcclxuICBuYW1lPzogdW5rbm93bjtcclxuICBOYW1lPzogdW5rbm93bjtcclxuICBzb3VyY2U/OiB1bmtub3duO1xyXG4gIFNvdXJjZT86IHVua25vd247XHJcbiAgbXV0YXRpb25Qb2xpY3k/OiB1bmtub3duO1xyXG4gIE11dGF0aW9uUG9saWN5PzogdW5rbm93bjtcclxuICBtdXRhdGlvblBvbGljeUludD86IHVua25vd247XHJcbiAgTXV0YXRpb25Qb2xpY3lJbnQ/OiB1bmtub3duO1xyXG4gIG11dGF0aW9uUG9saWN5TGFiZWw/OiB1bmtub3duO1xyXG4gIE11dGF0aW9uUG9saWN5TGFiZWw/OiB1bmtub3duO1xyXG4gIGNhbk11dGF0ZT86IHVua25vd247XHJcbiAgQ2FuTXV0YXRlPzogdW5rbm93bjtcclxufTtcclxuXHJcbmNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcblxyXG5jb25zdCBwYXJzZU11dGF0aW9uUG9saWN5SW50ID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gdmFsdWU7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHNhZmVUZXh0KHZhbHVlKSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlQ2FuTXV0YXRlID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcclxuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQgPT09IFwidHJ1ZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMVwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQgPSAob3duZXJBeFVzZXJJZDogdW5rbm93bik6IHN0cmluZyA9PiBzYWZlVGV4dChvd25lckF4VXNlcklkKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplUG9saWN5VG9rZW4gPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBzYWZlVGV4dCh2YWx1ZSlcclxuICAgIC5ub3JtYWxpemUoXCJORkRcIilcclxuICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKClcclxuICAgIC5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiXCIpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVmlzaWJsZVVzZXIgPSAoaXRlbTogUmF3VmlzaWJsZVVzZXIpOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChpdGVtLmF4VXNlcklkID8/IGl0ZW0uQXhVc2VySWQpO1xyXG4gIGlmICghYXhVc2VySWQpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYWxpYXM6IHNhZmVUZXh0KGl0ZW0uYWxpYXMgPz8gaXRlbS5BbGlhcyksXHJcbiAgICBheFVzZXJJZCxcclxuICAgIGNybVVzZXJJZDogc2FmZVRleHQoaXRlbS5jcm1Vc2VySWQgPz8gaXRlbS5Dcm1Vc2VySWQpLFxyXG4gICAgbmFtZTogc2FmZVRleHQoaXRlbS5uYW1lID8/IGl0ZW0uTmFtZSkgfHwgYXhVc2VySWQsXHJcbiAgICBzb3VyY2U6IHNhZmVUZXh0KGl0ZW0uc291cmNlID8/IGl0ZW0uU291cmNlKSxcclxuICAgIG11dGF0aW9uUG9saWN5OiBzYWZlVGV4dChpdGVtLm11dGF0aW9uUG9saWN5ID8/IGl0ZW0uTXV0YXRpb25Qb2xpY3kpLFxyXG4gICAgbXV0YXRpb25Qb2xpY3lJbnQ6IHBhcnNlTXV0YXRpb25Qb2xpY3lJbnQoaXRlbS5tdXRhdGlvblBvbGljeUludCA/PyBpdGVtLk11dGF0aW9uUG9saWN5SW50KSxcclxuICAgIG11dGF0aW9uUG9saWN5TGFiZWw6IHNhZmVUZXh0KGl0ZW0ubXV0YXRpb25Qb2xpY3lMYWJlbCA/PyBpdGVtLk11dGF0aW9uUG9saWN5TGFiZWwpLFxyXG4gICAgY2FuTXV0YXRlOiBwYXJzZUNhbk11dGF0ZShpdGVtLmNhbk11dGF0ZSA/PyBpdGVtLkNhbk11dGF0ZSksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgZGF0YS12aXNpYmlsaXR5IHJvd3MgYW5kIGRyb3BzIGVudHJpZXMgd2l0aG91dCBhbiBBWCB1c2VyIGlkLlxyXG4vLyBSZWNvcmQtbGV2ZWwgY2hlY2tzIG11c3Qga2V5IG93bmVyc2hpcCBieSB0aGUgZnVuY3Rpb25hbCBBWCB1c2VyLCBub3QgYnkgZGlzcGxheSB0ZXh0LlxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplTW9kdWxlRGF0YVZpc2liaWxpdHlVc2VycyA9IChzb3VyY2U6IHVua25vd24pOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyW10gPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShzb3VyY2UpKSByZXR1cm4gW107XHJcblxyXG4gIGNvbnN0IHNlZW4gPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICByZXR1cm4gc291cmNlXHJcbiAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBpZiAoIWVudHJ5IHx8IHR5cGVvZiBlbnRyeSAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KGVudHJ5KSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHJldHVybiBub3JtYWxpemVWaXNpYmxlVXNlcihlbnRyeSBhcyBSYXdWaXNpYmxlVXNlcik7XHJcbiAgICB9KVxyXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyID0+ICEhZW50cnkpXHJcbiAgICAuZmlsdGVyKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBub3JtYWxpemVPd25lckF4VXNlcklkKGVudHJ5LmF4VXNlcklkKTtcclxuICAgICAgaWYgKHNlZW4uaGFzKGtleSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgc2Vlbi5hZGQoa2V5KTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIEJ1aWxkcyBhIGNhc2UtaW5zZW5zaXRpdmUgb3duZXIgbG9va3VwIGZvciB2aXNpYmlsaXR5IGFuZCBtdXRhdGlvbiBjaGVja3MuXHJcbmV4cG9ydCBjb25zdCBidWlsZFZpc2libGVVc2VyQnlPd25lck1hcCA9IChcclxuICB1c2VyczogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdXHJcbik6IFJlYWRvbmx5TWFwPHN0cmluZywgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcj4gPT4ge1xyXG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXA8c3RyaW5nLCBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyPigpO1xyXG4gIGZvciAoY29uc3QgdXNlciBvZiB1c2Vycykge1xyXG4gICAgY29uc3Qga2V5ID0gbm9ybWFsaXplT3duZXJBeFVzZXJJZCh1c2VyLmF4VXNlcklkKTtcclxuICAgIGlmIChrZXkgJiYgIXJlc3VsdC5oYXMoa2V5KSkge1xyXG4gICAgICByZXN1bHQuc2V0KGtleSwgdXNlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgdGhlIHZpc2libGUtdXNlciByb3cgdGhhdCBvd25zIGEgcmVjb3JkLlxyXG4vLyBQYXNzIHRoZSByZWNvcmQgZGV0YWlsIG93bmVyIGZpZWxkIGhlcmUsIHByZWZlcmFibHkgT3duZXJBeFVzZXJJZCBmcm9tIHRoZSBBUEkvQVggY29udHJhY3QuXHJcbmV4cG9ydCBjb25zdCBnZXRWaXNpYmxlVXNlckZvck93bmVyID0gKFxyXG4gIHVzZXJzQnlPd25lckF4VXNlcklkOiBSZWFkb25seU1hcDxzdHJpbmcsIE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXI+LFxyXG4gIG93bmVyQXhVc2VySWQ6IHVua25vd25cclxuKTogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGtleSA9IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQob3duZXJBeFVzZXJJZCk7XHJcbiAgcmV0dXJuIGtleSA/IHVzZXJzQnlPd25lckF4VXNlcklkLmdldChrZXkpIHx8IG51bGwgOiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzU2FtZUFzVmlzaWJpbGl0eU11dGF0aW9uUG9saWN5ID0gKFxyXG4gIHVzZXI6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfCBudWxsIHwgdW5kZWZpbmVkXHJcbik6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICghdXNlcikgcmV0dXJuIGZhbHNlO1xyXG4gIGlmICh1c2VyLm11dGF0aW9uUG9saWN5SW50ID09PSAxKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgY29uc3QgcG9saWN5ID0gbm9ybWFsaXplUG9saWN5VG9rZW4odXNlci5tdXRhdGlvblBvbGljeSk7XHJcbiAgY29uc3QgbGFiZWwgPSBub3JtYWxpemVQb2xpY3lUb2tlbih1c2VyLm11dGF0aW9uUG9saWN5TGFiZWwpO1xyXG4gIHJldHVybiBwb2xpY3kgPT09IFwic2FtZWFzdmlzaWJpbGl0eVwiIHx8XHJcbiAgICBwb2xpY3kgPT09IFwiaWd1YWxxdWV2aXNpYmlsaWRhZFwiIHx8XHJcbiAgICBwb2xpY3kgPT09IFwiaWd1YWx2aXNpYmlsaWRhZFwiIHx8XHJcbiAgICBsYWJlbCA9PT0gXCJzYW1lYXN2aXNpYmlsaXR5XCIgfHxcclxuICAgIGxhYmVsID09PSBcImlndWFscXVldmlzaWJpbGlkYWRcIiB8fFxyXG4gICAgbGFiZWwgPT09IFwiaWd1YWx2aXNpYmlsaWRhZFwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzTW9kdWxlQnVzaW5lc3NSdWxlc011dGF0aW9uUG9saWN5ID0gKFxyXG4gIHVzZXI6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfCBudWxsIHwgdW5kZWZpbmVkXHJcbik6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICghdXNlcikgcmV0dXJuIGZhbHNlO1xyXG4gIGlmICh1c2VyLm11dGF0aW9uUG9saWN5SW50ID09PSAyKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgY29uc3QgcG9saWN5ID0gbm9ybWFsaXplUG9saWN5VG9rZW4odXNlci5tdXRhdGlvblBvbGljeSk7XHJcbiAgY29uc3QgbGFiZWwgPSBub3JtYWxpemVQb2xpY3lUb2tlbih1c2VyLm11dGF0aW9uUG9saWN5TGFiZWwpO1xyXG4gIHJldHVybiBwb2xpY3kgPT09IFwibW9kdWxlYnVzaW5lc3NydWxlc1wiIHx8XHJcbiAgICBwb2xpY3kgPT09IFwibW9kdWxlYnVzaW5lc3NydWxlXCIgfHxcclxuICAgIHBvbGljeSA9PT0gXCJyZWdsYXNkZWxtb2R1bG9cIiB8fFxyXG4gICAgcG9saWN5ID09PSBcInJlZ2xhc21vZHVsb1wiIHx8XHJcbiAgICBsYWJlbCA9PT0gXCJtb2R1bGVidXNpbmVzc3J1bGVzXCIgfHxcclxuICAgIGxhYmVsID09PSBcIm1vZHVsZWJ1c2luZXNzcnVsZVwiIHx8XHJcbiAgICBsYWJlbCA9PT0gXCJyZWdsYXNkZWxtb2R1bG9cIiB8fFxyXG4gICAgbGFiZWwgPT09IFwicmVnbGFzbW9kdWxvXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNPd25Pbmx5TXV0YXRpb25Qb2xpY3kgPSAoXHJcbiAgdXNlcjogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciB8IG51bGwgfCB1bmRlZmluZWRcclxuKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKCF1c2VyKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKHVzZXIubXV0YXRpb25Qb2xpY3lJbnQgPT09IDApIHJldHVybiB0cnVlO1xyXG5cclxuICBjb25zdCBwb2xpY3kgPSBub3JtYWxpemVQb2xpY3lUb2tlbih1c2VyLm11dGF0aW9uUG9saWN5KTtcclxuICBjb25zdCBsYWJlbCA9IG5vcm1hbGl6ZVBvbGljeVRva2VuKHVzZXIubXV0YXRpb25Qb2xpY3lMYWJlbCk7XHJcbiAgcmV0dXJuIHBvbGljeSA9PT0gXCJvd25vbmx5XCIgfHxcclxuICAgIHBvbGljeSA9PT0gXCJzb2xvcHJvcGlvc1wiIHx8XHJcbiAgICBwb2xpY3kgPT09IFwicHJvcGlvc1wiIHx8XHJcbiAgICBsYWJlbCA9PT0gXCJvd25vbmx5XCIgfHxcclxuICAgIGxhYmVsID09PSBcInNvbG9wcm9waW9zXCIgfHxcclxuICAgIGxhYmVsID09PSBcInByb3Bpb3NcIjtcclxufTtcclxuXHJcbi8vIERldGVjdHMgd2hldGhlciB0aGUgZW5kcG9pbnQgcmV0dXJuZWQgdGhlIGV4dGVuZGVkIG11dGF0aW9uIHBvbGljeSBmaWVsZHMuXHJcbi8vIFdpdGhvdXQgdGhpcyBjb250cmFjdCwgQ2FuTXV0YXRlIG1heSBiZSBmYWxzZSBvbmx5IGJlY2F1c2Ugb2xkZXIgQVggZGlkIG5vdCByZXR1cm4gdGhlIGNvbHVtbi5cclxuZXhwb3J0IGNvbnN0IGhhc011dGF0aW9uUG9saWN5ID0gKHVzZXI6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKCF1c2VyKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuICEhc2FmZVRleHQodXNlci5tdXRhdGlvblBvbGljeSkgfHxcclxuICAgIHVzZXIubXV0YXRpb25Qb2xpY3lJbnQgIT09IG51bGwgfHxcclxuICAgICEhc2FmZVRleHQodXNlci5tdXRhdGlvblBvbGljeUxhYmVsKTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFJlc29sdmVNb2R1bGVPd25lck11dGF0aW9uQWNjZXNzQXJncyA9IHtcclxuICB1c2Vyc0J5T3duZXJBeFVzZXJJZDogUmVhZG9ubHlNYXA8c3RyaW5nLCBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyPjtcclxuICBvd25lckF4VXNlcklkOiB1bmtub3duO1xyXG4gIHZpZXdlckF4VXNlcklkPzogdW5rbm93bjtcclxuICB2aXNpYmxlVXNlcnNSZWFkeT86IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBvd25lciBtdXRhdGlvbiBhY2Nlc3Mgd2l0aCBhIHJlc3RyaWN0aXZlIGRlZmF1bHQuXHJcbi8vIEZvcmVpZ24tb3duZXIgbXV0YXRpb24gbmVlZHMgYSBwb2xpY3kgdGhhdCBkZWxlZ2F0ZXMgYmV5b25kIG93biByZWNvcmRzIHBsdXMgQ2FuTXV0YXRlPXRydWUuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlTW9kdWxlT3duZXJNdXRhdGlvbkFjY2VzcyA9ICh7XHJcbiAgdXNlcnNCeU93bmVyQXhVc2VySWQsXHJcbiAgb3duZXJBeFVzZXJJZCxcclxuICB2aWV3ZXJBeFVzZXJJZCxcclxuICB2aXNpYmxlVXNlcnNSZWFkeSA9IHRydWUsXHJcbn06IFJlc29sdmVNb2R1bGVPd25lck11dGF0aW9uQWNjZXNzQXJncyk6IE1vZHVsZU93bmVyTXV0YXRpb25BY2Nlc3MgPT4ge1xyXG4gIGNvbnN0IG93bmVyS2V5ID0gbm9ybWFsaXplT3duZXJBeFVzZXJJZChvd25lckF4VXNlcklkKTtcclxuICBjb25zdCB2aWV3ZXJLZXkgPSBub3JtYWxpemVPd25lckF4VXNlcklkKHZpZXdlckF4VXNlcklkKTtcclxuXHJcbiAgaWYgKCFvd25lcktleSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2FuTXV0YXRlOiBmYWxzZSxcclxuICAgICAgaXNDdXJyZW50T3duZXI6IGZhbHNlLFxyXG4gICAgICByZWFkeTogdHJ1ZSxcclxuICAgICAgb3duZXI6IG51bGwsXHJcbiAgICAgIHJlYXNvbjogXCJibG9ja2VkX21pc3Npbmdfb3duZXJcIixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpZiAoIXZpZXdlcktleSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2FuTXV0YXRlOiBmYWxzZSxcclxuICAgICAgaXNDdXJyZW50T3duZXI6IGZhbHNlLFxyXG4gICAgICByZWFkeTogdHJ1ZSxcclxuICAgICAgb3duZXI6IG51bGwsXHJcbiAgICAgIHJlYXNvbjogXCJibG9ja2VkX21pc3Npbmdfdmlld2VyXCIsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgb3duZXIgPSBnZXRWaXNpYmxlVXNlckZvck93bmVyKHVzZXJzQnlPd25lckF4VXNlcklkLCBvd25lckF4VXNlcklkKTtcclxuICBjb25zdCBpc0N1cnJlbnRPd25lciA9IG93bmVyS2V5ID09PSB2aWV3ZXJLZXk7XHJcbiAgaWYgKGlzQ3VycmVudE93bmVyKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjYW5NdXRhdGU6IHRydWUsXHJcbiAgICAgIGlzQ3VycmVudE93bmVyOiB0cnVlLFxyXG4gICAgICByZWFkeTogdHJ1ZSxcclxuICAgICAgb3duZXIsXHJcbiAgICAgIHJlYXNvbjogXCJhbGxvd2VkX2N1cnJlbnRfb3duZXJcIixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpZiAoIXZpc2libGVVc2Vyc1JlYWR5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjYW5NdXRhdGU6IGZhbHNlLFxyXG4gICAgICBpc0N1cnJlbnRPd25lcjogZmFsc2UsXHJcbiAgICAgIHJlYWR5OiBmYWxzZSxcclxuICAgICAgb3duZXI6IG51bGwsXHJcbiAgICAgIHJlYXNvbjogXCJibG9ja2VkX3Zpc2liaWxpdHlfbG9hZGluZ1wiLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmICghb3duZXIpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNhbk11dGF0ZTogZmFsc2UsXHJcbiAgICAgIGlzQ3VycmVudE93bmVyOiBmYWxzZSxcclxuICAgICAgcmVhZHk6IHRydWUsXHJcbiAgICAgIG93bmVyOiBudWxsLFxyXG4gICAgICByZWFzb246IFwiYmxvY2tlZF9vd25lcl9ub3RfdmlzaWJsZVwiLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmICghaGFzTXV0YXRpb25Qb2xpY3kob3duZXIpKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjYW5NdXRhdGU6IGZhbHNlLFxyXG4gICAgICBpc0N1cnJlbnRPd25lcjogZmFsc2UsXHJcbiAgICAgIHJlYWR5OiB0cnVlLFxyXG4gICAgICBvd25lcixcclxuICAgICAgcmVhc29uOiBcImJsb2NrZWRfbWlzc2luZ19wb2xpY3lcIixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCB1c2VzU2FtZUFzVmlzaWJpbGl0eSA9IGlzU2FtZUFzVmlzaWJpbGl0eU11dGF0aW9uUG9saWN5KG93bmVyKTtcclxuICBjb25zdCB1c2VzTW9kdWxlQnVzaW5lc3NSdWxlcyA9IGlzTW9kdWxlQnVzaW5lc3NSdWxlc011dGF0aW9uUG9saWN5KG93bmVyKTtcclxuICBpZiAoIXVzZXNTYW1lQXNWaXNpYmlsaXR5ICYmICF1c2VzTW9kdWxlQnVzaW5lc3NSdWxlcykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2FuTXV0YXRlOiBmYWxzZSxcclxuICAgICAgaXNDdXJyZW50T3duZXI6IGZhbHNlLFxyXG4gICAgICByZWFkeTogdHJ1ZSxcclxuICAgICAgb3duZXIsXHJcbiAgICAgIHJlYXNvbjogXCJibG9ja2VkX3Jlc3RyaWN0ZWRfcG9saWN5XCIsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKG93bmVyLmNhbk11dGF0ZSAhPT0gdHJ1ZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2FuTXV0YXRlOiBmYWxzZSxcclxuICAgICAgaXNDdXJyZW50T3duZXI6IGZhbHNlLFxyXG4gICAgICByZWFkeTogdHJ1ZSxcclxuICAgICAgb3duZXIsXHJcbiAgICAgIHJlYXNvbjogXCJibG9ja2VkX2Nhbl9tdXRhdGVfZmFsc2VcIixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2FuTXV0YXRlOiB0cnVlLFxyXG4gICAgaXNDdXJyZW50T3duZXI6IGZhbHNlLFxyXG4gICAgcmVhZHk6IHRydWUsXHJcbiAgICBvd25lcixcclxuICAgIHJlYXNvbjogdXNlc01vZHVsZUJ1c2luZXNzUnVsZXMgPyBcImFsbG93ZWRfbW9kdWxlX2J1c2luZXNzX3J1bGVzXCIgOiBcImFsbG93ZWRfc2FtZV9hc192aXNpYmlsaXR5XCIsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIG11dGF0aW9uIGZvciB0aGUgb3duZXIgdXNpbmcgcG9saWN5IGZpZWxkcyBiZWZvcmUgdHJ1c3RpbmcgQ2FuTXV0YXRlLlxyXG5leHBvcnQgY29uc3QgY2FuTXV0YXRlT3duZXIgPSAoXHJcbiAgdXNlcnNCeU93bmVyQXhVc2VySWQ6IFJlYWRvbmx5TWFwPHN0cmluZywgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcj4sXHJcbiAgb3duZXJBeFVzZXJJZDogdW5rbm93bixcclxuICB2aWV3ZXJBeFVzZXJJZD86IHVua25vd25cclxuKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHJlc29sdmVNb2R1bGVPd25lck11dGF0aW9uQWNjZXNzKHtcclxuICAgIHVzZXJzQnlPd25lckF4VXNlcklkLFxyXG4gICAgb3duZXJBeFVzZXJJZCxcclxuICAgIHZpZXdlckF4VXNlcklkLFxyXG4gIH0pLmNhbk11dGF0ZTtcclxufTtcclxuXHJcbi8vIEZvcm1hdHMgb25lIHZpc2libGUgdXNlciBmb3IgY29tcGFjdCBzZWxlY3Qgb3B0aW9ucy5cbmV4cG9ydCBjb25zdCBmb3JtYXRNb2R1bGVWaXNpYmxlVXNlckxhYmVsID0gKHVzZXI6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZm9ybWF0VXNlck5hbWVXaXRoSWQodXNlci5uYW1lLCB1c2VyLmF4VXNlcklkKTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHtcclxuICBnZXRWaXNpYmxlVXNlcnMsXHJcbiAgZ2V0VmlzaWJsZVVzZXJzUmVzcG9uc2VJdGVtcyxcclxuICBnZXRWaXNpYmxlVXNlcnNSZXNwb25zZU1lc3NhZ2UsXHJcbiAgZ2V0VmlzaWJsZVVzZXJzUmVzcG9uc2VUcmFjZUlkLFxyXG4gIGlzVmlzaWJsZVVzZXJzUmVzcG9uc2VTdWNjZXNzLFxyXG59IGZyb20gXCIuLi9zZXJ2aWNlcy9tb2R1bGVEYXRhVmlzaWJpbGl0eVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgfSBmcm9tIFwiLi4vdXRpbHMvY29tcGFueVNlbGVjdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnksIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSB9IGZyb20gXCIuLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgYnVpbGRWaXNpYmxlVXNlckJ5T3duZXJNYXAsXHJcbiAgbm9ybWFsaXplTW9kdWxlRGF0YVZpc2liaWxpdHlVc2VycyxcclxuICB0eXBlIE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL21vZHVsZURhdGFWaXNpYmlsaXR5LnRzXCI7XHJcblxyXG50eXBlIE1vZHVsZURhdGFWaXNpYmlsaXR5Q2FjaGVFbnRyeSA9IHtcclxuICB1c2VyczogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdO1xyXG4gIHRvdGFsOiBudW1iZXI7XHJcbiAgdHJhY2VJZD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVXNlTW9kdWxlRGF0YVZpc2liaWxpdHlBcmdzID0ge1xyXG4gIGVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgY29tcGFueUlkOiBzdHJpbmc7XHJcbiAgYXhVc2VySWQ6IHN0cmluZztcclxuICBwZXJtaXNzaW9uc1JldmlzaW9uOiBzdHJpbmc7XHJcbiAgYXBwQ29kZTogc3RyaW5nO1xyXG4gIG1vZHVsZUNvZGU6IHN0cmluZztcclxuICBpbmNsdWRlQ3JtVXNlcklkPzogYm9vbGVhbjtcclxuICBhbGxvd0NhY2hlZFVzZXJzPzogYm9vbGVhbjtcclxuICBwcmVsb2FkZWRVc2Vycz86IHVua25vd25bXSB8IG51bGw7XHJcbiAgb25Gb3JiaWRkZW4/OiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVidWc/OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBDQUNIRV9QUkVGSVggPSBcIm1vZHVsZV9kYXRhX3Zpc2liaWxpdHlfdjNcIjtcclxuY29uc3QgQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNjb3BlUGFydCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuICByZXR1cm4gbm9ybWFsaXplZCB8fCBcIk5PTkVcIjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVDYWNoZUNvbXBhbnlJZCA9IChjb21wYW55SWQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55SWQgPSBTdHJpbmcoZ2xvYmFsVGhpcy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgY29tcGFueUlkIHx8IFwiXCIpO1xyXG4gIGNvbnN0IGNvbXBhbnlDYW5kaWRhdGVzID0gY29tcGFueUlkID8gW3sgY29tcGFueUlkLCBpc0RlZmF1bHQ6IHRydWUgfV0gOiBbXTtcclxuICByZXR1cm4gcmVzb2x2ZUVmZmVjdGl2ZUNvbXBhbnlJZChzZWxlY3RlZENvbXBhbnlJZCwgY29tcGFueUNhbmRpZGF0ZXMsIGNvbXBhbnlJZCk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZENhY2hlS2V5ID0gKFxyXG4gIGNvbXBhbnlJZDogc3RyaW5nLFxyXG4gIGF4VXNlcklkOiBzdHJpbmcsXHJcbiAgcGVybWlzc2lvbnNSZXZpc2lvbjogc3RyaW5nLFxyXG4gIGFwcENvZGU6IHN0cmluZyxcclxuICBtb2R1bGVDb2RlOiBzdHJpbmcsXHJcbiAgaW5jbHVkZUNybVVzZXJJZDogYm9vbGVhblxyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGVmZmVjdGl2ZUNvbXBhbnlJZCA9IHJlc29sdmVDYWNoZUNvbXBhbnlJZChjb21wYW55SWQpO1xyXG4gIHJldHVybiBbXHJcbiAgICBDQUNIRV9QUkVGSVgsXHJcbiAgICBub3JtYWxpemVTY29wZVBhcnQoZWZmZWN0aXZlQ29tcGFueUlkKSxcclxuICAgIG5vcm1hbGl6ZVNjb3BlUGFydChheFVzZXJJZCksXHJcbiAgICBub3JtYWxpemVTY29wZVBhcnQocGVybWlzc2lvbnNSZXZpc2lvbiksXHJcbiAgICBub3JtYWxpemVTY29wZVBhcnQoYXBwQ29kZSksXHJcbiAgICBub3JtYWxpemVTY29wZVBhcnQobW9kdWxlQ29kZSksXHJcbiAgICBpbmNsdWRlQ3JtVXNlcklkID8gXCJDUk1JRDFcIiA6IFwiQ1JNSUQwXCIsXHJcbiAgXS5qb2luKFwiX1wiKTtcclxufTtcclxuXHJcbmNvbnN0IGhhc1ByZWxvYWRlZFVzZXJzID0gKHByZWxvYWRlZFVzZXJzOiB1bmtub3duW10gfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocHJlbG9hZGVkVXNlcnMpICYmIHByZWxvYWRlZFVzZXJzLmxlbmd0aCA+IDA7XHJcbn07XHJcblxyXG5jb25zdCByZWFkUHJlbG9hZGVkVXNlcnMgPSAocHJlbG9hZGVkVXNlcnM6IHVua25vd25bXSB8IG51bGwgfCB1bmRlZmluZWQpOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyW10gPT4ge1xyXG4gIHJldHVybiBub3JtYWxpemVNb2R1bGVEYXRhVmlzaWJpbGl0eVVzZXJzKHByZWxvYWRlZFVzZXJzKTtcclxufTtcclxuXHJcbi8vIFN0YW5kYXJkIGhvb2sgZm9yIG1vZHVsZSByZWNvcmQgdmlzaWJpbGl0eS5cclxuLy8gVXNlIGl0IGZvciBvd25lciBmaWx0ZXJzLCBzdWJvcmRpbmF0ZSBzY29wZXMsIGFuZCByZWNvcmQtbGV2ZWwgZWRpdC9kZWxldGUgZ2F0ZXMuXHJcbmV4cG9ydCBjb25zdCB1c2VNb2R1bGVEYXRhVmlzaWJpbGl0eSA9ICh7XHJcbiAgZW5hYmxlZCxcclxuICBjb21wYW55SWQsXHJcbiAgYXhVc2VySWQsXHJcbiAgcGVybWlzc2lvbnNSZXZpc2lvbixcclxuICBhcHBDb2RlLFxyXG4gIG1vZHVsZUNvZGUsXHJcbiAgaW5jbHVkZUNybVVzZXJJZCA9IHRydWUsXHJcbiAgYWxsb3dDYWNoZWRVc2VycyA9IHRydWUsXHJcbiAgcHJlbG9hZGVkVXNlcnMsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbiAgb25EZWJ1ZyxcclxufTogVXNlTW9kdWxlRGF0YVZpc2liaWxpdHlBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3Zpc2libGVVc2Vycywgc2V0VmlzaWJsZVVzZXJzXSA9IHVzZVN0YXRlPE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXT4oKCkgPT4gcmVhZFByZWxvYWRlZFVzZXJzKHByZWxvYWRlZFVzZXJzKSk7XHJcbiAgY29uc3QgW3Zpc2libGVVc2Vyc0xvYWRpbmcsIHNldFZpc2libGVVc2Vyc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFt2aXNpYmxlVXNlcnNFcnJvciwgc2V0VmlzaWJsZVVzZXJzRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3Zpc2libGVVc2Vyc1JlYWR5LCBzZXRWaXNpYmxlVXNlcnNSZWFkeV0gPSB1c2VTdGF0ZSgoKSA9PiBoYXNQcmVsb2FkZWRVc2VycyhwcmVsb2FkZWRVc2VycykpO1xyXG4gIGNvbnN0IGFjdGl2ZUFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcclxuXHJcbiAgY29uc3QgdmlzaWJsZVVzZXJCeU93bmVyQXhVc2VySWQgPSB1c2VNZW1vKCgpID0+IGJ1aWxkVmlzaWJsZVVzZXJCeU93bmVyTWFwKHZpc2libGVVc2VycyksIFt2aXNpYmxlVXNlcnNdKTtcclxuXHJcbiAgY29uc3QgYWJvcnRBY3RpdmVSZXF1ZXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFhY3RpdmVBYm9ydFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICB0cnkge1xyXG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gSWdub3JlIGFib3J0IGVycm9ycy5cclxuICAgIH1cclxuICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbG9hZFZpc2libGVVc2VycyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGZvcmNlID0gZmFsc2UpID0+IHtcclxuICAgICAgaWYgKCFlbmFibGVkKSB7XHJcbiAgICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XHJcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzKFtdKTtcclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnNFcnJvcihcIlwiKTtcclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnNSZWFkeSh0cnVlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gYnVpbGRDYWNoZUtleShjb21wYW55SWQsIGF4VXNlcklkLCBwZXJtaXNzaW9uc1JldmlzaW9uLCBhcHBDb2RlLCBtb2R1bGVDb2RlLCBpbmNsdWRlQ3JtVXNlcklkKTtcclxuICAgICAgY29uc3QgcHJlbG9hZGVkID0gcmVhZFByZWxvYWRlZFVzZXJzKHByZWxvYWRlZFVzZXJzKTtcclxuICAgICAgaWYgKCFmb3JjZSAmJiBoYXNQcmVsb2FkZWRVc2VycyhwcmVsb2FkZWRVc2VycykpIHtcclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnMocHJlbG9hZGVkKTtcclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnNFcnJvcihcIlwiKTtcclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnNSZWFkeSh0cnVlKTtcclxuICAgICAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoY2FjaGVLZXksIHsgdXNlcnM6IHByZWxvYWRlZCwgdG90YWw6IHByZWxvYWRlZC5sZW5ndGggfSwgQ0FDSEVfVFRMX01TKTtcclxuICAgICAgICBvbkRlYnVnPy4oXCJtb2R1bGVEYXRhVmlzaWJpbGl0eTpwcmVsb2FkZWRcIiwgeyBhcHBDb2RlLCBtb2R1bGVDb2RlLCBjb3VudDogcHJlbG9hZGVkLmxlbmd0aCwgY2FjaGVLZXkgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjYWNoZWQgPSBmb3JjZSB8fCAhYWxsb3dDYWNoZWRVc2VycyA/IG51bGwgOiBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8TW9kdWxlRGF0YVZpc2liaWxpdHlDYWNoZUVudHJ5PihjYWNoZUtleSk7XHJcbiAgICAgIGlmIChjYWNoZWQgJiYgQXJyYXkuaXNBcnJheShjYWNoZWQudXNlcnMpKSB7XHJcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzKGNhY2hlZC51c2Vycyk7XHJcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzRXJyb3IoXCJcIik7XHJcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzUmVhZHkodHJ1ZSk7XHJcbiAgICAgICAgb25EZWJ1Zz8uKFwibW9kdWxlRGF0YVZpc2liaWxpdHk6Y2FjaGVcIiwgeyBhcHBDb2RlLCBtb2R1bGVDb2RlLCBjb3VudDogY2FjaGVkLnVzZXJzLmxlbmd0aCwgY2FjaGVLZXkgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSArK2FjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50O1xyXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xyXG4gICAgICBzZXRWaXNpYmxlVXNlcnNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRWaXNpYmxlVXNlcnNFcnJvcihcIlwiKTtcclxuICAgICAgc2V0VmlzaWJsZVVzZXJzUmVhZHkoZmFsc2UpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldFZpc2libGVVc2VycyhhcHBDb2RlLCBtb2R1bGVDb2RlLCB7XHJcbiAgICAgICAgICBpbmNsdWRlQ3JtVXNlcklkLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJzID0gbm9ybWFsaXplTW9kdWxlRGF0YVZpc2liaWxpdHlVc2VycyhnZXRWaXNpYmxlVXNlcnNSZXNwb25zZUl0ZW1zKHJlc3BvbnNlKSk7XHJcbiAgICAgICAgY29uc3QgdHJhY2VJZCA9IGdldFZpc2libGVVc2Vyc1Jlc3BvbnNlVHJhY2VJZChyZXNwb25zZSk7XHJcbiAgICAgICAgaWYgKCFpc1Zpc2libGVVc2Vyc1Jlc3BvbnNlU3VjY2VzcyhyZXNwb25zZSkgJiYgdXNlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICBzZXRWaXNpYmxlVXNlcnMoW10pO1xyXG4gICAgICAgICAgc2V0VmlzaWJsZVVzZXJzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgICBzZXRWaXNpYmxlVXNlcnNFcnJvcihnZXRWaXNpYmxlVXNlcnNSZXNwb25zZU1lc3NhZ2UocmVzcG9uc2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIkNvdWxkIG5vdCBsb2FkIHZpc2libGUgdXNlcnMuXCIpKTtcclxuICAgICAgICAgIHNldFZpc2libGVVc2Vyc1JlYWR5KHRydWUpO1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnModXNlcnMpO1xyXG4gICAgICAgIHNldFZpc2libGVVc2Vyc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldFZpc2libGVVc2Vyc0Vycm9yKFwiXCIpO1xyXG4gICAgICAgIHNldFZpc2libGVVc2Vyc1JlYWR5KHRydWUpO1xyXG4gICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShjYWNoZUtleSwgeyB1c2VycywgdG90YWw6IHVzZXJzLmxlbmd0aCwgdHJhY2VJZCB9LCBDQUNIRV9UVExfTVMpO1xyXG4gICAgICAgIG9uRGVidWc/LihcIm1vZHVsZURhdGFWaXNpYmlsaXR5OnJlc3BvbnNlXCIsIHsgYXBwQ29kZSwgbW9kdWxlQ29kZSwgY291bnQ6IHVzZXJzLmxlbmd0aCwgdHJhY2VJZDogdHJhY2VJZCB8fCBcIlwiIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycj8ubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHtcclxuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBzZXRWaXNpYmxlVXNlcnNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgIHNldFZpc2libGVVc2Vyc1JlYWR5KHRydWUpO1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbj8uKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRWaXNpYmxlVXNlcnMoW10pO1xyXG4gICAgICAgIHNldFZpc2libGVVc2Vyc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldFZpc2libGVVc2Vyc0Vycm9yKGVycj8ubWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJDb3VsZCBub3QgbG9hZCB2aXNpYmxlIHVzZXJzLlwiKSk7XHJcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzUmVhZHkodHJ1ZSk7XHJcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgb25EZWJ1Zz8uKFwibW9kdWxlRGF0YVZpc2liaWxpdHk6ZXJyb3JcIiwgeyBhcHBDb2RlLCBtb2R1bGVDb2RlLCBtZXNzYWdlOiBlcnI/Lm1lc3NhZ2UgfHwgXCJcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0LFxyXG4gICAgICBhbGxvd0NhY2hlZFVzZXJzLFxyXG4gICAgICBhcHBDb2RlLFxyXG4gICAgICBheFVzZXJJZCxcclxuICAgICAgY29tcGFueUlkLFxyXG4gICAgICBlbmFibGVkLFxyXG4gICAgICBpbmNsdWRlQ3JtVXNlcklkLFxyXG4gICAgICBtb2R1bGVDb2RlLFxyXG4gICAgICBvbkRlYnVnLFxyXG4gICAgICBvbkZvcmJpZGRlbixcclxuICAgICAgcGVybWlzc2lvbnNSZXZpc2lvbixcclxuICAgICAgcHJlbG9hZGVkVXNlcnMsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHZvaWQgbG9hZFZpc2libGVVc2VycyhmYWxzZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcclxuICAgIH07XHJcbiAgfSwgW2Fib3J0QWN0aXZlUmVxdWVzdCwgbG9hZFZpc2libGVVc2Vyc10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdmlzaWJsZVVzZXJzLFxyXG4gICAgdmlzaWJsZVVzZXJCeU93bmVyQXhVc2VySWQsXHJcbiAgICB2aXNpYmxlVXNlcnNMb2FkaW5nLFxyXG4gICAgdmlzaWJsZVVzZXJzRXJyb3IsXHJcbiAgICB2aXNpYmxlVXNlcnNSZWFkeSxcclxuICAgIGxvYWRWaXNpYmxlVXNlcnMsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IGZldGNoSnNvbiwgdHlwZSBBcGlGZXRjaE9wdGlvbnMgfSBmcm9tIFwiLi9hcGlTZXJ2aWNlLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBNb2R1bGVWaXNpYmxlVXNlcnNSZXNwb25zZSA9IHtcclxuICBTdWNjZXNzPzogYm9vbGVhbjtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBNZXNzYWdlPzogc3RyaW5nO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgVG90YWw/OiBudW1iZXI7XHJcbiAgdG90YWw/OiBudW1iZXI7XHJcbiAgSXRlbXM/OiB1bmtub3duW107XHJcbiAgaXRlbXM/OiB1bmtub3duW107XHJcbiAgVHJhY2VJZD86IHN0cmluZztcclxuICB0cmFjZUlkPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBHZXRWaXNpYmxlVXNlcnNPcHRpb25zID0gUGljazxBcGlGZXRjaE9wdGlvbnMsIFwic2lnbmFsXCIgfCBcInN1cHByZXNzUGVybWlzc2lvbk1vZGFsXCI+ICYge1xyXG4gIGluY2x1ZGVDcm1Vc2VySWQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxuLy8gQ2FsbHMgdGhlIHN0YW5kYXJkIG1vZHVsZSBkYXRhLXZpc2liaWxpdHkgZW5kcG9pbnQgZm9yIGFueSBhcHAvbW9kdWxlIHNjb3BlLlxyXG4vLyBpbmNsdWRlQ3JtVXNlcklkIGNvbnRyb2xzIGxlZ2FjeSBDUk0gaWQgaHlkcmF0aW9uOyBpdCBkb2VzIG5vdCBncmFudCB2aXNpYmlsaXR5LlxyXG5leHBvcnQgY29uc3QgZ2V0VmlzaWJsZVVzZXJzID0gKFxyXG4gIGFwcENvZGU6IHN0cmluZyxcclxuICBtb2R1bGVDb2RlOiBzdHJpbmcsXHJcbiAgb3B0aW9uczogR2V0VmlzaWJsZVVzZXJzT3B0aW9ucyA9IHt9XHJcbik6IFByb21pc2U8TW9kdWxlVmlzaWJsZVVzZXJzUmVzcG9uc2U+ID0+IHtcclxuICBjb25zdCBxdWVyeSA9IFtcclxuICAgIGBhcHBDb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFwcENvZGUpfWAsXHJcbiAgICBgbW9kdWxlQ29kZT0ke2VuY29kZVVSSUNvbXBvbmVudChtb2R1bGVDb2RlKX1gLFxyXG4gICAgYGluY2x1ZGVDcm1Vc2VySWQ9JHtvcHRpb25zLmluY2x1ZGVDcm1Vc2VySWQgPT09IGZhbHNlID8gXCJmYWxzZVwiIDogXCJ0cnVlXCJ9YCxcclxuICBdLmpvaW4oXCImXCIpO1xyXG4gIGNvbnN0IHVybCA9IGAvYXBpL2NybS9kYXRhLXZpc2liaWxpdHkvdmlzaWJsZS11c2Vycz8ke3F1ZXJ5fWA7XHJcblxyXG4gIHJldHVybiBmZXRjaEpzb248TW9kdWxlVmlzaWJsZVVzZXJzUmVzcG9uc2U+KHVybCwge1xyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgc2lnbmFsOiBvcHRpb25zLnNpZ25hbCxcclxuICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiBvcHRpb25zLnN1cHByZXNzUGVybWlzc2lvbk1vZGFsID8/IHRydWUsXHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VmlzaWJsZVVzZXJzUmVzcG9uc2VJdGVtcyA9IChyZXNwb25zZTogTW9kdWxlVmlzaWJsZVVzZXJzUmVzcG9uc2UpOiB1bmtub3duW10gPT4ge1xyXG4gIHJldHVybiBBcnJheS5pc0FycmF5KHJlc3BvbnNlLkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogQXJyYXkuaXNBcnJheShyZXNwb25zZS5pdGVtcykgPyByZXNwb25zZS5pdGVtcyA6IFtdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzVmlzaWJsZVVzZXJzUmVzcG9uc2VTdWNjZXNzID0gKHJlc3BvbnNlOiBNb2R1bGVWaXNpYmxlVXNlcnNSZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHN1Y2Nlc3MgPSByZXNwb25zZS5TdWNjZXNzID8/IHJlc3BvbnNlLnN1Y2Nlc3M7XHJcbiAgcmV0dXJuIHN1Y2Nlc3MgIT09IGZhbHNlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFZpc2libGVVc2Vyc1Jlc3BvbnNlTWVzc2FnZSA9IChyZXNwb25zZTogTW9kdWxlVmlzaWJsZVVzZXJzUmVzcG9uc2UpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcocmVzcG9uc2UuTWVzc2FnZSB8fCByZXNwb25zZS5tZXNzYWdlIHx8IFwiXCIpLnRyaW0oKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRWaXNpYmxlVXNlcnNSZXNwb25zZVRyYWNlSWQgPSAocmVzcG9uc2U6IE1vZHVsZVZpc2libGVVc2Vyc1Jlc3BvbnNlKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcclxuICByZXR1cm4gU3RyaW5nKHJlc3BvbnNlLlRyYWNlSWQgfHwgcmVzcG9uc2UudHJhY2VJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkO1xyXG59O1xy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K0JBQStCLFFBQVEsS0FBSyxLQUFLLHFCQUFxQiwrQkFBK0IsQ0FBQztBQUMzSCwrQkFBcUIsSUFBSTtBQUN6Qix5QkFBZSxVQUFVO0FBQ3pCO0FBQUEsUUFDRjtBQUVBLHdCQUFnQixLQUFLO0FBQ3JCLCtCQUF1QixLQUFLO0FBQzVCLDZCQUFxQixFQUFFO0FBQ3ZCLDZCQUFxQixJQUFJO0FBQ3pCLHVCQUFlLFVBQVU7QUFDekIsaUNBQXlCLFVBQVUsRUFBRSxPQUFPLE9BQU8sTUFBTSxRQUFRLFFBQVEsR0FBRyxZQUFZO0FBQ3hGLGtCQUFVLGlDQUFpQyxFQUFFLFNBQVMsWUFBWSxPQUFPLE1BQU0sUUFBUSxTQUFTLFdBQVcsR0FBRyxDQUFDO0FBQUEsTUFDakgsU0FBUyxLQUFVO0FBQ2pCLFlBQUksY0FBYyxtQkFBbUIsUUFBUztBQUM5QyxZQUFJLEtBQUssU0FBUyxjQUFjO0FBQzlCLHlCQUFlLFVBQVU7QUFDekI7QUFBQSxRQUNGO0FBRUEsWUFBSSxlQUFlLGlCQUFpQixJQUFJLFdBQVcsS0FBSztBQUN0RCxpQ0FBdUIsS0FBSztBQUM1QiwrQkFBcUIsSUFBSTtBQUN6Qix5QkFBZSxVQUFVO0FBQ3pCLHdCQUFjO0FBQ2Q7QUFBQSxRQUNGO0FBRUEsd0JBQWdCLENBQUMsQ0FBQztBQUNsQiwrQkFBdUIsS0FBSztBQUM1Qiw2QkFBcUIsS0FBSyxXQUFXLEtBQUsscUJBQXFCLCtCQUErQixDQUFDO0FBQy9GLDZCQUFxQixJQUFJO0FBQ3pCLHVCQUFlLFVBQVU7QUFDekIsa0JBQVUsOEJBQThCLEVBQUUsU0FBUyxZQUFZLFNBQVMsS0FBSyxXQUFXLEdBQUcsQ0FBQztBQUFBLE1BQzlGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLDhCQUFVLE1BQU07QUFDZCxTQUFLLGlCQUFpQixLQUFLO0FBQzNCLFdBQU8sTUFBTTtBQUNYLHlCQUFtQjtBQUFBLElBQ3JCO0FBQUEsRUFDRixHQUFHLENBQUMsb0JBQW9CLGdCQUFnQixDQUFDO0FBRXpDLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
