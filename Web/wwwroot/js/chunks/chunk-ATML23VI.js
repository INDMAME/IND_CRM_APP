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
} from "./chunk-63VW7TTG.js";
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
  const name = safeText(user.name);
  const axUserId = safeText(user.axUserId);
  if (name && axUserId && name.toUpperCase() !== axUserId.toUpperCase()) {
    return `${name} (${axUserId})`;
  }
  return name || axUserId;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL21vZHVsZURhdGFWaXNpYmlsaXR5LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VNb2R1bGVEYXRhVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvc2VydmljZXMvbW9kdWxlRGF0YVZpc2liaWxpdHlTZXJ2aWNlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBTaGFyZWQgcm93IHJldHVybmVkIGJ5IC9hcGkvY3JtL2RhdGEtdmlzaWJpbGl0eS92aXNpYmxlLXVzZXJzIGZvciBvd25lciB2aXNpYmlsaXR5IGFuZCBtdXRhdGlvbiBjaGVja3MuXG5leHBvcnQgdHlwZSBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyID0ge1xuICBhbGlhczogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBjcm1Vc2VySWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBzb3VyY2U6IHN0cmluZztcbiAgbXV0YXRpb25Qb2xpY3k6IHN0cmluZztcbiAgbXV0YXRpb25Qb2xpY3lJbnQ6IG51bWJlciB8IG51bGw7XG4gIG11dGF0aW9uUG9saWN5TGFiZWw6IHN0cmluZztcbiAgY2FuTXV0YXRlOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgTW9kdWxlT3duZXJNdXRhdGlvbkFjY2Vzc1JlYXNvbiA9XG4gIHwgXCJhbGxvd2VkX2N1cnJlbnRfb3duZXJcIlxuICB8IFwiYWxsb3dlZF9zYW1lX2FzX3Zpc2liaWxpdHlcIlxuICB8IFwiYWxsb3dlZF9tb2R1bGVfYnVzaW5lc3NfcnVsZXNcIlxuICB8IFwiYmxvY2tlZF9taXNzaW5nX293bmVyXCJcbiAgfCBcImJsb2NrZWRfbWlzc2luZ192aWV3ZXJcIlxuICB8IFwiYmxvY2tlZF92aXNpYmlsaXR5X2xvYWRpbmdcIlxuICB8IFwiYmxvY2tlZF9vd25lcl9ub3RfdmlzaWJsZVwiXG4gIHwgXCJibG9ja2VkX21pc3NpbmdfcG9saWN5XCJcbiAgfCBcImJsb2NrZWRfcmVzdHJpY3RlZF9wb2xpY3lcIlxuICB8IFwiYmxvY2tlZF9jYW5fbXV0YXRlX2ZhbHNlXCI7XG5cbmV4cG9ydCB0eXBlIE1vZHVsZU93bmVyTXV0YXRpb25BY2Nlc3MgPSB7XG4gIGNhbk11dGF0ZTogYm9vbGVhbjtcbiAgaXNDdXJyZW50T3duZXI6IGJvb2xlYW47XG4gIHJlYWR5OiBib29sZWFuO1xuICBvd25lcjogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciB8IG51bGw7XG4gIHJlYXNvbjogTW9kdWxlT3duZXJNdXRhdGlvbkFjY2Vzc1JlYXNvbjtcbn07XG5cbnR5cGUgUmF3VmlzaWJsZVVzZXIgPSB7XG4gIGFsaWFzPzogdW5rbm93bjtcbiAgQWxpYXM/OiB1bmtub3duO1xuICBheFVzZXJJZD86IHVua25vd247XG4gIEF4VXNlcklkPzogdW5rbm93bjtcbiAgY3JtVXNlcklkPzogdW5rbm93bjtcbiAgQ3JtVXNlcklkPzogdW5rbm93bjtcbiAgbmFtZT86IHVua25vd247XG4gIE5hbWU/OiB1bmtub3duO1xuICBzb3VyY2U/OiB1bmtub3duO1xuICBTb3VyY2U/OiB1bmtub3duO1xuICBtdXRhdGlvblBvbGljeT86IHVua25vd247XG4gIE11dGF0aW9uUG9saWN5PzogdW5rbm93bjtcbiAgbXV0YXRpb25Qb2xpY3lJbnQ/OiB1bmtub3duO1xuICBNdXRhdGlvblBvbGljeUludD86IHVua25vd247XG4gIG11dGF0aW9uUG9saWN5TGFiZWw/OiB1bmtub3duO1xuICBNdXRhdGlvblBvbGljeUxhYmVsPzogdW5rbm93bjtcbiAgY2FuTXV0YXRlPzogdW5rbm93bjtcbiAgQ2FuTXV0YXRlPzogdW5rbm93bjtcbn07XG5cbmNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCk7XG5cbmNvbnN0IHBhcnNlTXV0YXRpb25Qb2xpY3lJbnQgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcihzYWZlVGV4dCh2YWx1ZSkpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgcGFyc2VDYW5NdXRhdGUgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gbm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCI7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplT3duZXJBeFVzZXJJZCA9IChvd25lckF4VXNlcklkOiB1bmtub3duKTogc3RyaW5nID0+IHNhZmVUZXh0KG93bmVyQXhVc2VySWQpLnRvVXBwZXJDYXNlKCk7XG5cbmNvbnN0IG5vcm1hbGl6ZVBvbGljeVRva2VuID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHNhZmVUZXh0KHZhbHVlKVxuICAgIC5ub3JtYWxpemUoXCJORkRcIilcbiAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiXCIpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplVmlzaWJsZVVzZXIgPSAoaXRlbTogUmF3VmlzaWJsZVVzZXIpOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoaXRlbS5heFVzZXJJZCA/PyBpdGVtLkF4VXNlcklkKTtcbiAgaWYgKCFheFVzZXJJZCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICBhbGlhczogc2FmZVRleHQoaXRlbS5hbGlhcyA/PyBpdGVtLkFsaWFzKSxcbiAgICBheFVzZXJJZCxcbiAgICBjcm1Vc2VySWQ6IHNhZmVUZXh0KGl0ZW0uY3JtVXNlcklkID8/IGl0ZW0uQ3JtVXNlcklkKSxcbiAgICBuYW1lOiBzYWZlVGV4dChpdGVtLm5hbWUgPz8gaXRlbS5OYW1lKSB8fCBheFVzZXJJZCxcbiAgICBzb3VyY2U6IHNhZmVUZXh0KGl0ZW0uc291cmNlID8/IGl0ZW0uU291cmNlKSxcbiAgICBtdXRhdGlvblBvbGljeTogc2FmZVRleHQoaXRlbS5tdXRhdGlvblBvbGljeSA/PyBpdGVtLk11dGF0aW9uUG9saWN5KSxcbiAgICBtdXRhdGlvblBvbGljeUludDogcGFyc2VNdXRhdGlvblBvbGljeUludChpdGVtLm11dGF0aW9uUG9saWN5SW50ID8/IGl0ZW0uTXV0YXRpb25Qb2xpY3lJbnQpLFxuICAgIG11dGF0aW9uUG9saWN5TGFiZWw6IHNhZmVUZXh0KGl0ZW0ubXV0YXRpb25Qb2xpY3lMYWJlbCA/PyBpdGVtLk11dGF0aW9uUG9saWN5TGFiZWwpLFxuICAgIGNhbk11dGF0ZTogcGFyc2VDYW5NdXRhdGUoaXRlbS5jYW5NdXRhdGUgPz8gaXRlbS5DYW5NdXRhdGUpLFxuICB9O1xufTtcblxuLy8gTm9ybWFsaXplcyBkYXRhLXZpc2liaWxpdHkgcm93cyBhbmQgZHJvcHMgZW50cmllcyB3aXRob3V0IGFuIEFYIHVzZXIgaWQuXG4vLyBSZWNvcmQtbGV2ZWwgY2hlY2tzIG11c3Qga2V5IG93bmVyc2hpcCBieSB0aGUgZnVuY3Rpb25hbCBBWCB1c2VyLCBub3QgYnkgZGlzcGxheSB0ZXh0LlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU1vZHVsZURhdGFWaXNpYmlsaXR5VXNlcnMgPSAoc291cmNlOiB1bmtub3duKTogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHNvdXJjZSkpIHJldHVybiBbXTtcblxuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIHJldHVybiBzb3VyY2VcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgaWYgKCFlbnRyeSB8fCB0eXBlb2YgZW50cnkgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShlbnRyeSkpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZVZpc2libGVVc2VyKGVudHJ5IGFzIFJhd1Zpc2libGVVc2VyKTtcbiAgICB9KVxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciA9PiAhIWVudHJ5KVxuICAgIC5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBub3JtYWxpemVPd25lckF4VXNlcklkKGVudHJ5LmF4VXNlcklkKTtcbiAgICAgIGlmIChzZWVuLmhhcyhrZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgICBzZWVuLmFkZChrZXkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG59O1xuXG4vLyBCdWlsZHMgYSBjYXNlLWluc2Vuc2l0aXZlIG93bmVyIGxvb2t1cCBmb3IgdmlzaWJpbGl0eSBhbmQgbXV0YXRpb24gY2hlY2tzLlxuZXhwb3J0IGNvbnN0IGJ1aWxkVmlzaWJsZVVzZXJCeU93bmVyTWFwID0gKFxuICB1c2VyczogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdXG4pOiBSZWFkb25seU1hcDxzdHJpbmcsIE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXI+ID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcDxzdHJpbmcsIE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXI+KCk7XG4gIGZvciAoY29uc3QgdXNlciBvZiB1c2Vycykge1xuICAgIGNvbnN0IGtleSA9IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQodXNlci5heFVzZXJJZCk7XG4gICAgaWYgKGtleSAmJiAhcmVzdWx0LmhhcyhrZXkpKSB7XG4gICAgICByZXN1bHQuc2V0KGtleSwgdXNlcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIFJlc29sdmVzIHRoZSB2aXNpYmxlLXVzZXIgcm93IHRoYXQgb3ducyBhIHJlY29yZC5cbi8vIFBhc3MgdGhlIHJlY29yZCBkZXRhaWwgb3duZXIgZmllbGQgaGVyZSwgcHJlZmVyYWJseSBPd25lckF4VXNlcklkIGZyb20gdGhlIEFQSS9BWCBjb250cmFjdC5cbmV4cG9ydCBjb25zdCBnZXRWaXNpYmxlVXNlckZvck93bmVyID0gKFxuICB1c2Vyc0J5T3duZXJBeFVzZXJJZDogUmVhZG9ubHlNYXA8c3RyaW5nLCBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyPixcbiAgb3duZXJBeFVzZXJJZDogdW5rbm93blxuKTogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlciB8IG51bGwgPT4ge1xuICBjb25zdCBrZXkgPSBub3JtYWxpemVPd25lckF4VXNlcklkKG93bmVyQXhVc2VySWQpO1xuICByZXR1cm4ga2V5ID8gdXNlcnNCeU93bmVyQXhVc2VySWQuZ2V0KGtleSkgfHwgbnVsbCA6IG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTYW1lQXNWaXNpYmlsaXR5TXV0YXRpb25Qb2xpY3kgPSAoXG4gIHVzZXI6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuID0+IHtcbiAgaWYgKCF1c2VyKSByZXR1cm4gZmFsc2U7XG4gIGlmICh1c2VyLm11dGF0aW9uUG9saWN5SW50ID09PSAxKSByZXR1cm4gdHJ1ZTtcblxuICBjb25zdCBwb2xpY3kgPSBub3JtYWxpemVQb2xpY3lUb2tlbih1c2VyLm11dGF0aW9uUG9saWN5KTtcbiAgY29uc3QgbGFiZWwgPSBub3JtYWxpemVQb2xpY3lUb2tlbih1c2VyLm11dGF0aW9uUG9saWN5TGFiZWwpO1xuICByZXR1cm4gcG9saWN5ID09PSBcInNhbWVhc3Zpc2liaWxpdHlcIiB8fFxuICAgIHBvbGljeSA9PT0gXCJpZ3VhbHF1ZXZpc2liaWxpZGFkXCIgfHxcbiAgICBwb2xpY3kgPT09IFwiaWd1YWx2aXNpYmlsaWRhZFwiIHx8XG4gICAgbGFiZWwgPT09IFwic2FtZWFzdmlzaWJpbGl0eVwiIHx8XG4gICAgbGFiZWwgPT09IFwiaWd1YWxxdWV2aXNpYmlsaWRhZFwiIHx8XG4gICAgbGFiZWwgPT09IFwiaWd1YWx2aXNpYmlsaWRhZFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTW9kdWxlQnVzaW5lc3NSdWxlc011dGF0aW9uUG9saWN5ID0gKFxuICB1c2VyOiBNb2R1bGVEYXRhVmlzaWJpbGl0eVZpc2libGVVc2VyIHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogYm9vbGVhbiA9PiB7XG4gIGlmICghdXNlcikgcmV0dXJuIGZhbHNlO1xuICBpZiAodXNlci5tdXRhdGlvblBvbGljeUludCA9PT0gMikgcmV0dXJuIHRydWU7XG5cbiAgY29uc3QgcG9saWN5ID0gbm9ybWFsaXplUG9saWN5VG9rZW4odXNlci5tdXRhdGlvblBvbGljeSk7XG4gIGNvbnN0IGxhYmVsID0gbm9ybWFsaXplUG9saWN5VG9rZW4odXNlci5tdXRhdGlvblBvbGljeUxhYmVsKTtcbiAgcmV0dXJuIHBvbGljeSA9PT0gXCJtb2R1bGVidXNpbmVzc3J1bGVzXCIgfHxcbiAgICBwb2xpY3kgPT09IFwibW9kdWxlYnVzaW5lc3NydWxlXCIgfHxcbiAgICBwb2xpY3kgPT09IFwicmVnbGFzZGVsbW9kdWxvXCIgfHxcbiAgICBwb2xpY3kgPT09IFwicmVnbGFzbW9kdWxvXCIgfHxcbiAgICBsYWJlbCA9PT0gXCJtb2R1bGVidXNpbmVzc3J1bGVzXCIgfHxcbiAgICBsYWJlbCA9PT0gXCJtb2R1bGVidXNpbmVzc3J1bGVcIiB8fFxuICAgIGxhYmVsID09PSBcInJlZ2xhc2RlbG1vZHVsb1wiIHx8XG4gICAgbGFiZWwgPT09IFwicmVnbGFzbW9kdWxvXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaXNPd25Pbmx5TXV0YXRpb25Qb2xpY3kgPSAoXG4gIHVzZXI6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuID0+IHtcbiAgaWYgKCF1c2VyKSByZXR1cm4gZmFsc2U7XG4gIGlmICh1c2VyLm11dGF0aW9uUG9saWN5SW50ID09PSAwKSByZXR1cm4gdHJ1ZTtcblxuICBjb25zdCBwb2xpY3kgPSBub3JtYWxpemVQb2xpY3lUb2tlbih1c2VyLm11dGF0aW9uUG9saWN5KTtcbiAgY29uc3QgbGFiZWwgPSBub3JtYWxpemVQb2xpY3lUb2tlbih1c2VyLm11dGF0aW9uUG9saWN5TGFiZWwpO1xuICByZXR1cm4gcG9saWN5ID09PSBcIm93bm9ubHlcIiB8fFxuICAgIHBvbGljeSA9PT0gXCJzb2xvcHJvcGlvc1wiIHx8XG4gICAgcG9saWN5ID09PSBcInByb3Bpb3NcIiB8fFxuICAgIGxhYmVsID09PSBcIm93bm9ubHlcIiB8fFxuICAgIGxhYmVsID09PSBcInNvbG9wcm9waW9zXCIgfHxcbiAgICBsYWJlbCA9PT0gXCJwcm9waW9zXCI7XG59O1xuXG4vLyBEZXRlY3RzIHdoZXRoZXIgdGhlIGVuZHBvaW50IHJldHVybmVkIHRoZSBleHRlbmRlZCBtdXRhdGlvbiBwb2xpY3kgZmllbGRzLlxuLy8gV2l0aG91dCB0aGlzIGNvbnRyYWN0LCBDYW5NdXRhdGUgbWF5IGJlIGZhbHNlIG9ubHkgYmVjYXVzZSBvbGRlciBBWCBkaWQgbm90IHJldHVybiB0aGUgY29sdW1uLlxuZXhwb3J0IGNvbnN0IGhhc011dGF0aW9uUG9saWN5ID0gKHVzZXI6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiA9PiB7XG4gIGlmICghdXNlcikgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gISFzYWZlVGV4dCh1c2VyLm11dGF0aW9uUG9saWN5KSB8fFxuICAgIHVzZXIubXV0YXRpb25Qb2xpY3lJbnQgIT09IG51bGwgfHxcbiAgICAhIXNhZmVUZXh0KHVzZXIubXV0YXRpb25Qb2xpY3lMYWJlbCk7XG59O1xuXG5leHBvcnQgdHlwZSBSZXNvbHZlTW9kdWxlT3duZXJNdXRhdGlvbkFjY2Vzc0FyZ3MgPSB7XG4gIHVzZXJzQnlPd25lckF4VXNlcklkOiBSZWFkb25seU1hcDxzdHJpbmcsIE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXI+O1xuICBvd25lckF4VXNlcklkOiB1bmtub3duO1xuICB2aWV3ZXJBeFVzZXJJZD86IHVua25vd247XG4gIHZpc2libGVVc2Vyc1JlYWR5PzogYm9vbGVhbjtcbn07XG5cbi8vIFJlc29sdmVzIG93bmVyIG11dGF0aW9uIGFjY2VzcyB3aXRoIGEgcmVzdHJpY3RpdmUgZGVmYXVsdC5cbi8vIEZvcmVpZ24tb3duZXIgbXV0YXRpb24gbmVlZHMgYSBwb2xpY3kgdGhhdCBkZWxlZ2F0ZXMgYmV5b25kIG93biByZWNvcmRzIHBsdXMgQ2FuTXV0YXRlPXRydWUuXG5leHBvcnQgY29uc3QgcmVzb2x2ZU1vZHVsZU93bmVyTXV0YXRpb25BY2Nlc3MgPSAoe1xuICB1c2Vyc0J5T3duZXJBeFVzZXJJZCxcbiAgb3duZXJBeFVzZXJJZCxcbiAgdmlld2VyQXhVc2VySWQsXG4gIHZpc2libGVVc2Vyc1JlYWR5ID0gdHJ1ZSxcbn06IFJlc29sdmVNb2R1bGVPd25lck11dGF0aW9uQWNjZXNzQXJncyk6IE1vZHVsZU93bmVyTXV0YXRpb25BY2Nlc3MgPT4ge1xuICBjb25zdCBvd25lcktleSA9IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQob3duZXJBeFVzZXJJZCk7XG4gIGNvbnN0IHZpZXdlcktleSA9IG5vcm1hbGl6ZU93bmVyQXhVc2VySWQodmlld2VyQXhVc2VySWQpO1xuXG4gIGlmICghb3duZXJLZXkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FuTXV0YXRlOiBmYWxzZSxcbiAgICAgIGlzQ3VycmVudE93bmVyOiBmYWxzZSxcbiAgICAgIHJlYWR5OiB0cnVlLFxuICAgICAgb3duZXI6IG51bGwsXG4gICAgICByZWFzb246IFwiYmxvY2tlZF9taXNzaW5nX293bmVyXCIsXG4gICAgfTtcbiAgfVxuXG4gIGlmICghdmlld2VyS2V5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbk11dGF0ZTogZmFsc2UsXG4gICAgICBpc0N1cnJlbnRPd25lcjogZmFsc2UsXG4gICAgICByZWFkeTogdHJ1ZSxcbiAgICAgIG93bmVyOiBudWxsLFxuICAgICAgcmVhc29uOiBcImJsb2NrZWRfbWlzc2luZ192aWV3ZXJcIixcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgb3duZXIgPSBnZXRWaXNpYmxlVXNlckZvck93bmVyKHVzZXJzQnlPd25lckF4VXNlcklkLCBvd25lckF4VXNlcklkKTtcbiAgY29uc3QgaXNDdXJyZW50T3duZXIgPSBvd25lcktleSA9PT0gdmlld2VyS2V5O1xuICBpZiAoaXNDdXJyZW50T3duZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FuTXV0YXRlOiB0cnVlLFxuICAgICAgaXNDdXJyZW50T3duZXI6IHRydWUsXG4gICAgICByZWFkeTogdHJ1ZSxcbiAgICAgIG93bmVyLFxuICAgICAgcmVhc29uOiBcImFsbG93ZWRfY3VycmVudF9vd25lclwiLFxuICAgIH07XG4gIH1cblxuICBpZiAoIXZpc2libGVVc2Vyc1JlYWR5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbk11dGF0ZTogZmFsc2UsXG4gICAgICBpc0N1cnJlbnRPd25lcjogZmFsc2UsXG4gICAgICByZWFkeTogZmFsc2UsXG4gICAgICBvd25lcjogbnVsbCxcbiAgICAgIHJlYXNvbjogXCJibG9ja2VkX3Zpc2liaWxpdHlfbG9hZGluZ1wiLFxuICAgIH07XG4gIH1cblxuICBpZiAoIW93bmVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbk11dGF0ZTogZmFsc2UsXG4gICAgICBpc0N1cnJlbnRPd25lcjogZmFsc2UsXG4gICAgICByZWFkeTogdHJ1ZSxcbiAgICAgIG93bmVyOiBudWxsLFxuICAgICAgcmVhc29uOiBcImJsb2NrZWRfb3duZXJfbm90X3Zpc2libGVcIixcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFoYXNNdXRhdGlvblBvbGljeShvd25lcikpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FuTXV0YXRlOiBmYWxzZSxcbiAgICAgIGlzQ3VycmVudE93bmVyOiBmYWxzZSxcbiAgICAgIHJlYWR5OiB0cnVlLFxuICAgICAgb3duZXIsXG4gICAgICByZWFzb246IFwiYmxvY2tlZF9taXNzaW5nX3BvbGljeVwiLFxuICAgIH07XG4gIH1cblxuICBjb25zdCB1c2VzU2FtZUFzVmlzaWJpbGl0eSA9IGlzU2FtZUFzVmlzaWJpbGl0eU11dGF0aW9uUG9saWN5KG93bmVyKTtcbiAgY29uc3QgdXNlc01vZHVsZUJ1c2luZXNzUnVsZXMgPSBpc01vZHVsZUJ1c2luZXNzUnVsZXNNdXRhdGlvblBvbGljeShvd25lcik7XG4gIGlmICghdXNlc1NhbWVBc1Zpc2liaWxpdHkgJiYgIXVzZXNNb2R1bGVCdXNpbmVzc1J1bGVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbk11dGF0ZTogZmFsc2UsXG4gICAgICBpc0N1cnJlbnRPd25lcjogZmFsc2UsXG4gICAgICByZWFkeTogdHJ1ZSxcbiAgICAgIG93bmVyLFxuICAgICAgcmVhc29uOiBcImJsb2NrZWRfcmVzdHJpY3RlZF9wb2xpY3lcIixcbiAgICB9O1xuICB9XG5cbiAgaWYgKG93bmVyLmNhbk11dGF0ZSAhPT0gdHJ1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBjYW5NdXRhdGU6IGZhbHNlLFxuICAgICAgaXNDdXJyZW50T3duZXI6IGZhbHNlLFxuICAgICAgcmVhZHk6IHRydWUsXG4gICAgICBvd25lcixcbiAgICAgIHJlYXNvbjogXCJibG9ja2VkX2Nhbl9tdXRhdGVfZmFsc2VcIixcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjYW5NdXRhdGU6IHRydWUsXG4gICAgaXNDdXJyZW50T3duZXI6IGZhbHNlLFxuICAgIHJlYWR5OiB0cnVlLFxuICAgIG93bmVyLFxuICAgIHJlYXNvbjogdXNlc01vZHVsZUJ1c2luZXNzUnVsZXMgPyBcImFsbG93ZWRfbW9kdWxlX2J1c2luZXNzX3J1bGVzXCIgOiBcImFsbG93ZWRfc2FtZV9hc192aXNpYmlsaXR5XCIsXG4gIH07XG59O1xuXG4vLyBSZXNvbHZlcyBtdXRhdGlvbiBmb3IgdGhlIG93bmVyIHVzaW5nIHBvbGljeSBmaWVsZHMgYmVmb3JlIHRydXN0aW5nIENhbk11dGF0ZS5cbmV4cG9ydCBjb25zdCBjYW5NdXRhdGVPd25lciA9IChcbiAgdXNlcnNCeU93bmVyQXhVc2VySWQ6IFJlYWRvbmx5TWFwPHN0cmluZywgTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcj4sXG4gIG93bmVyQXhVc2VySWQ6IHVua25vd24sXG4gIHZpZXdlckF4VXNlcklkPzogdW5rbm93blxuKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiByZXNvbHZlTW9kdWxlT3duZXJNdXRhdGlvbkFjY2Vzcyh7XG4gICAgdXNlcnNCeU93bmVyQXhVc2VySWQsXG4gICAgb3duZXJBeFVzZXJJZCxcbiAgICB2aWV3ZXJBeFVzZXJJZCxcbiAgfSkuY2FuTXV0YXRlO1xufTtcblxuLy8gRm9ybWF0cyBvbmUgdmlzaWJsZSB1c2VyIGZvciBjb21wYWN0IHNlbGVjdCBvcHRpb25zLlxuZXhwb3J0IGNvbnN0IGZvcm1hdE1vZHVsZVZpc2libGVVc2VyTGFiZWwgPSAodXNlcjogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5hbWUgPSBzYWZlVGV4dCh1c2VyLm5hbWUpO1xuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KHVzZXIuYXhVc2VySWQpO1xuICBpZiAobmFtZSAmJiBheFVzZXJJZCAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgIT09IGF4VXNlcklkLnRvVXBwZXJDYXNlKCkpIHtcbiAgICByZXR1cm4gYCR7bmFtZX0gKCR7YXhVc2VySWR9KWA7XG4gIH1cblxuICByZXR1cm4gbmFtZSB8fCBheFVzZXJJZDtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQge1xuICBnZXRWaXNpYmxlVXNlcnMsXG4gIGdldFZpc2libGVVc2Vyc1Jlc3BvbnNlSXRlbXMsXG4gIGdldFZpc2libGVVc2Vyc1Jlc3BvbnNlTWVzc2FnZSxcbiAgZ2V0VmlzaWJsZVVzZXJzUmVzcG9uc2VUcmFjZUlkLFxuICBpc1Zpc2libGVVc2Vyc1Jlc3BvbnNlU3VjY2Vzcyxcbn0gZnJvbSBcIi4uL3NlcnZpY2VzL21vZHVsZURhdGFWaXNpYmlsaXR5U2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyByZXNvbHZlRWZmZWN0aXZlQ29tcGFueUlkIH0gZnJvbSBcIi4uL3V0aWxzL2NvbXBhbnlTZWxlY3Rpb24udHNcIjtcbmltcG9ydCB7IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSwgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5IH0gZnJvbSBcIi4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcbmltcG9ydCB7XG4gIGJ1aWxkVmlzaWJsZVVzZXJCeU93bmVyTWFwLFxuICBub3JtYWxpemVNb2R1bGVEYXRhVmlzaWJpbGl0eVVzZXJzLFxuICB0eXBlIE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXIsXG59IGZyb20gXCIuLi91dGlscy9tb2R1bGVEYXRhVmlzaWJpbGl0eS50c1wiO1xuXG50eXBlIE1vZHVsZURhdGFWaXNpYmlsaXR5Q2FjaGVFbnRyeSA9IHtcbiAgdXNlcnM6IE1vZHVsZURhdGFWaXNpYmlsaXR5VmlzaWJsZVVzZXJbXTtcbiAgdG90YWw6IG51bWJlcjtcbiAgdHJhY2VJZD86IHN0cmluZztcbn07XG5cbnR5cGUgVXNlTW9kdWxlRGF0YVZpc2liaWxpdHlBcmdzID0ge1xuICBlbmFibGVkOiBib29sZWFuO1xuICBjb21wYW55SWQ6IHN0cmluZztcbiAgYXhVc2VySWQ6IHN0cmluZztcbiAgcGVybWlzc2lvbnNSZXZpc2lvbjogc3RyaW5nO1xuICBhcHBDb2RlOiBzdHJpbmc7XG4gIG1vZHVsZUNvZGU6IHN0cmluZztcbiAgaW5jbHVkZUNybVVzZXJJZD86IGJvb2xlYW47XG4gIGFsbG93Q2FjaGVkVXNlcnM/OiBib29sZWFuO1xuICBwcmVsb2FkZWRVc2Vycz86IHVua25vd25bXSB8IG51bGw7XG4gIG9uRm9yYmlkZGVuPzogKCkgPT4gdm9pZDtcbiAgb25EZWJ1Zz86IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbn07XG5cbmNvbnN0IENBQ0hFX1BSRUZJWCA9IFwibW9kdWxlX2RhdGFfdmlzaWJpbGl0eV92M1wiO1xuY29uc3QgQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcblxuY29uc3Qgbm9ybWFsaXplU2NvcGVQYXJ0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZWQgfHwgXCJOT05FXCI7XG59O1xuXG5jb25zdCByZXNvbHZlQ2FjaGVDb21wYW55SWQgPSAoY29tcGFueUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzZWxlY3RlZENvbXBhbnlJZCA9IFN0cmluZyhnbG9iYWxUaGlzLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXyB8fCBjb21wYW55SWQgfHwgXCJcIik7XG4gIGNvbnN0IGNvbXBhbnlDYW5kaWRhdGVzID0gY29tcGFueUlkID8gW3sgY29tcGFueUlkLCBpc0RlZmF1bHQ6IHRydWUgfV0gOiBbXTtcbiAgcmV0dXJuIHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQoc2VsZWN0ZWRDb21wYW55SWQsIGNvbXBhbnlDYW5kaWRhdGVzLCBjb21wYW55SWQpO1xufTtcblxuY29uc3QgYnVpbGRDYWNoZUtleSA9IChcbiAgY29tcGFueUlkOiBzdHJpbmcsXG4gIGF4VXNlcklkOiBzdHJpbmcsXG4gIHBlcm1pc3Npb25zUmV2aXNpb246IHN0cmluZyxcbiAgYXBwQ29kZTogc3RyaW5nLFxuICBtb2R1bGVDb2RlOiBzdHJpbmcsXG4gIGluY2x1ZGVDcm1Vc2VySWQ6IGJvb2xlYW5cbik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGVmZmVjdGl2ZUNvbXBhbnlJZCA9IHJlc29sdmVDYWNoZUNvbXBhbnlJZChjb21wYW55SWQpO1xuICByZXR1cm4gW1xuICAgIENBQ0hFX1BSRUZJWCxcbiAgICBub3JtYWxpemVTY29wZVBhcnQoZWZmZWN0aXZlQ29tcGFueUlkKSxcbiAgICBub3JtYWxpemVTY29wZVBhcnQoYXhVc2VySWQpLFxuICAgIG5vcm1hbGl6ZVNjb3BlUGFydChwZXJtaXNzaW9uc1JldmlzaW9uKSxcbiAgICBub3JtYWxpemVTY29wZVBhcnQoYXBwQ29kZSksXG4gICAgbm9ybWFsaXplU2NvcGVQYXJ0KG1vZHVsZUNvZGUpLFxuICAgIGluY2x1ZGVDcm1Vc2VySWQgPyBcIkNSTUlEMVwiIDogXCJDUk1JRDBcIixcbiAgXS5qb2luKFwiX1wiKTtcbn07XG5cbmNvbnN0IGhhc1ByZWxvYWRlZFVzZXJzID0gKHByZWxvYWRlZFVzZXJzOiB1bmtub3duW10gfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHByZWxvYWRlZFVzZXJzKSAmJiBwcmVsb2FkZWRVc2Vycy5sZW5ndGggPiAwO1xufTtcblxuY29uc3QgcmVhZFByZWxvYWRlZFVzZXJzID0gKHByZWxvYWRlZFVzZXJzOiB1bmtub3duW10gfCBudWxsIHwgdW5kZWZpbmVkKTogTW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdID0+IHtcbiAgcmV0dXJuIG5vcm1hbGl6ZU1vZHVsZURhdGFWaXNpYmlsaXR5VXNlcnMocHJlbG9hZGVkVXNlcnMpO1xufTtcblxuLy8gU3RhbmRhcmQgaG9vayBmb3IgbW9kdWxlIHJlY29yZCB2aXNpYmlsaXR5LlxuLy8gVXNlIGl0IGZvciBvd25lciBmaWx0ZXJzLCBzdWJvcmRpbmF0ZSBzY29wZXMsIGFuZCByZWNvcmQtbGV2ZWwgZWRpdC9kZWxldGUgZ2F0ZXMuXG5leHBvcnQgY29uc3QgdXNlTW9kdWxlRGF0YVZpc2liaWxpdHkgPSAoe1xuICBlbmFibGVkLFxuICBjb21wYW55SWQsXG4gIGF4VXNlcklkLFxuICBwZXJtaXNzaW9uc1JldmlzaW9uLFxuICBhcHBDb2RlLFxuICBtb2R1bGVDb2RlLFxuICBpbmNsdWRlQ3JtVXNlcklkID0gdHJ1ZSxcbiAgYWxsb3dDYWNoZWRVc2VycyA9IHRydWUsXG4gIHByZWxvYWRlZFVzZXJzLFxuICBvbkZvcmJpZGRlbixcbiAgb25EZWJ1Zyxcbn06IFVzZU1vZHVsZURhdGFWaXNpYmlsaXR5QXJncykgPT4ge1xuICBjb25zdCBbdmlzaWJsZVVzZXJzLCBzZXRWaXNpYmxlVXNlcnNdID0gdXNlU3RhdGU8TW9kdWxlRGF0YVZpc2liaWxpdHlWaXNpYmxlVXNlcltdPigoKSA9PiByZWFkUHJlbG9hZGVkVXNlcnMocHJlbG9hZGVkVXNlcnMpKTtcbiAgY29uc3QgW3Zpc2libGVVc2Vyc0xvYWRpbmcsIHNldFZpc2libGVVc2Vyc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdmlzaWJsZVVzZXJzRXJyb3IsIHNldFZpc2libGVVc2Vyc0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdmlzaWJsZVVzZXJzUmVhZHksIHNldFZpc2libGVVc2Vyc1JlYWR5XSA9IHVzZVN0YXRlKCgpID0+IGhhc1ByZWxvYWRlZFVzZXJzKHByZWxvYWRlZFVzZXJzKSk7XG4gIGNvbnN0IGFjdGl2ZUFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhY3RpdmVSZXF1ZXN0SWRSZWYgPSB1c2VSZWYoMCk7XG5cbiAgY29uc3QgdmlzaWJsZVVzZXJCeU93bmVyQXhVc2VySWQgPSB1c2VNZW1vKCgpID0+IGJ1aWxkVmlzaWJsZVVzZXJCeU93bmVyTWFwKHZpc2libGVVc2VycyksIFt2aXNpYmxlVXNlcnNdKTtcblxuICBjb25zdCBhYm9ydEFjdGl2ZVJlcXVlc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFhY3RpdmVBYm9ydFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQuYWJvcnQoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBhYm9ydCBlcnJvcnMuXG4gICAgfVxuICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbG9hZFZpc2libGVVc2VycyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmb3JjZSA9IGZhbHNlKSA9PiB7XG4gICAgICBpZiAoIWVuYWJsZWQpIHtcbiAgICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG4gICAgICAgIHNldFZpc2libGVVc2VycyhbXSk7XG4gICAgICAgIHNldFZpc2libGVVc2Vyc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRWaXNpYmxlVXNlcnNFcnJvcihcIlwiKTtcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzUmVhZHkodHJ1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2FjaGVLZXkgPSBidWlsZENhY2hlS2V5KGNvbXBhbnlJZCwgYXhVc2VySWQsIHBlcm1pc3Npb25zUmV2aXNpb24sIGFwcENvZGUsIG1vZHVsZUNvZGUsIGluY2x1ZGVDcm1Vc2VySWQpO1xuICAgICAgY29uc3QgcHJlbG9hZGVkID0gcmVhZFByZWxvYWRlZFVzZXJzKHByZWxvYWRlZFVzZXJzKTtcbiAgICAgIGlmICghZm9yY2UgJiYgaGFzUHJlbG9hZGVkVXNlcnMocHJlbG9hZGVkVXNlcnMpKSB7XG4gICAgICAgIHNldFZpc2libGVVc2VycyhwcmVsb2FkZWQpO1xuICAgICAgICBzZXRWaXNpYmxlVXNlcnNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzRXJyb3IoXCJcIik7XG4gICAgICAgIHNldFZpc2libGVVc2Vyc1JlYWR5KHRydWUpO1xuICAgICAgICBzZXRTZXNzaW9uSnNvbldpdGhFeHBpcnkoY2FjaGVLZXksIHsgdXNlcnM6IHByZWxvYWRlZCwgdG90YWw6IHByZWxvYWRlZC5sZW5ndGggfSwgQ0FDSEVfVFRMX01TKTtcbiAgICAgICAgb25EZWJ1Zz8uKFwibW9kdWxlRGF0YVZpc2liaWxpdHk6cHJlbG9hZGVkXCIsIHsgYXBwQ29kZSwgbW9kdWxlQ29kZSwgY291bnQ6IHByZWxvYWRlZC5sZW5ndGgsIGNhY2hlS2V5IH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNhY2hlZCA9IGZvcmNlIHx8ICFhbGxvd0NhY2hlZFVzZXJzID8gbnVsbCA6IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxNb2R1bGVEYXRhVmlzaWJpbGl0eUNhY2hlRW50cnk+KGNhY2hlS2V5KTtcbiAgICAgIGlmIChjYWNoZWQgJiYgQXJyYXkuaXNBcnJheShjYWNoZWQudXNlcnMpKSB7XG4gICAgICAgIHNldFZpc2libGVVc2VycyhjYWNoZWQudXNlcnMpO1xuICAgICAgICBzZXRWaXNpYmxlVXNlcnNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzRXJyb3IoXCJcIik7XG4gICAgICAgIHNldFZpc2libGVVc2Vyc1JlYWR5KHRydWUpO1xuICAgICAgICBvbkRlYnVnPy4oXCJtb2R1bGVEYXRhVmlzaWJpbGl0eTpjYWNoZVwiLCB7IGFwcENvZGUsIG1vZHVsZUNvZGUsIGNvdW50OiBjYWNoZWQudXNlcnMubGVuZ3RoLCBjYWNoZUtleSB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSArK2FjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50O1xuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICAgIHNldFZpc2libGVVc2Vyc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRWaXNpYmxlVXNlcnNFcnJvcihcIlwiKTtcbiAgICAgIHNldFZpc2libGVVc2Vyc1JlYWR5KGZhbHNlKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRWaXNpYmxlVXNlcnMoYXBwQ29kZSwgbW9kdWxlQ29kZSwge1xuICAgICAgICAgIGluY2x1ZGVDcm1Vc2VySWQsXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgdXNlcnMgPSBub3JtYWxpemVNb2R1bGVEYXRhVmlzaWJpbGl0eVVzZXJzKGdldFZpc2libGVVc2Vyc1Jlc3BvbnNlSXRlbXMocmVzcG9uc2UpKTtcbiAgICAgICAgY29uc3QgdHJhY2VJZCA9IGdldFZpc2libGVVc2Vyc1Jlc3BvbnNlVHJhY2VJZChyZXNwb25zZSk7XG4gICAgICAgIGlmICghaXNWaXNpYmxlVXNlcnNSZXNwb25zZVN1Y2Nlc3MocmVzcG9uc2UpICYmIHVzZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHNldFZpc2libGVVc2VycyhbXSk7XG4gICAgICAgICAgc2V0VmlzaWJsZVVzZXJzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgc2V0VmlzaWJsZVVzZXJzRXJyb3IoZ2V0VmlzaWJsZVVzZXJzUmVzcG9uc2VNZXNzYWdlKHJlc3BvbnNlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJDb3VsZCBub3QgbG9hZCB2aXNpYmxlIHVzZXJzLlwiKSk7XG4gICAgICAgICAgc2V0VmlzaWJsZVVzZXJzUmVhZHkodHJ1ZSk7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzKHVzZXJzKTtcbiAgICAgICAgc2V0VmlzaWJsZVVzZXJzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldFZpc2libGVVc2Vyc0Vycm9yKFwiXCIpO1xuICAgICAgICBzZXRWaXNpYmxlVXNlcnNSZWFkeSh0cnVlKTtcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShjYWNoZUtleSwgeyB1c2VycywgdG90YWw6IHVzZXJzLmxlbmd0aCwgdHJhY2VJZCB9LCBDQUNIRV9UVExfTVMpO1xuICAgICAgICBvbkRlYnVnPy4oXCJtb2R1bGVEYXRhVmlzaWJpbGl0eTpyZXNwb25zZVwiLCB7IGFwcENvZGUsIG1vZHVsZUNvZGUsIGNvdW50OiB1c2Vycy5sZW5ndGgsIHRyYWNlSWQ6IHRyYWNlSWQgfHwgXCJcIiB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgc2V0VmlzaWJsZVVzZXJzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgc2V0VmlzaWJsZVVzZXJzUmVhZHkodHJ1ZSk7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgb25Gb3JiaWRkZW4/LigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZpc2libGVVc2VycyhbXSk7XG4gICAgICAgIHNldFZpc2libGVVc2Vyc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRWaXNpYmxlVXNlcnNFcnJvcihlcnI/Lm1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiQ291bGQgbm90IGxvYWQgdmlzaWJsZSB1c2Vycy5cIikpO1xuICAgICAgICBzZXRWaXNpYmxlVXNlcnNSZWFkeSh0cnVlKTtcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIG9uRGVidWc/LihcIm1vZHVsZURhdGFWaXNpYmlsaXR5OmVycm9yXCIsIHsgYXBwQ29kZSwgbW9kdWxlQ29kZSwgbWVzc2FnZTogZXJyPy5tZXNzYWdlIHx8IFwiXCIgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QsXG4gICAgICBhbGxvd0NhY2hlZFVzZXJzLFxuICAgICAgYXBwQ29kZSxcbiAgICAgIGF4VXNlcklkLFxuICAgICAgY29tcGFueUlkLFxuICAgICAgZW5hYmxlZCxcbiAgICAgIGluY2x1ZGVDcm1Vc2VySWQsXG4gICAgICBtb2R1bGVDb2RlLFxuICAgICAgb25EZWJ1ZyxcbiAgICAgIG9uRm9yYmlkZGVuLFxuICAgICAgcGVybWlzc2lvbnNSZXZpc2lvbixcbiAgICAgIHByZWxvYWRlZFVzZXJzLFxuICAgIF1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHZvaWQgbG9hZFZpc2libGVVc2VycyhmYWxzZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xuICAgIH07XG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGxvYWRWaXNpYmxlVXNlcnNdKTtcblxuICByZXR1cm4ge1xuICAgIHZpc2libGVVc2VycyxcbiAgICB2aXNpYmxlVXNlckJ5T3duZXJBeFVzZXJJZCxcbiAgICB2aXNpYmxlVXNlcnNMb2FkaW5nLFxuICAgIHZpc2libGVVc2Vyc0Vycm9yLFxuICAgIHZpc2libGVVc2Vyc1JlYWR5LFxuICAgIGxvYWRWaXNpYmxlVXNlcnMsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IGZldGNoSnNvbiwgdHlwZSBBcGlGZXRjaE9wdGlvbnMgfSBmcm9tIFwiLi9hcGlTZXJ2aWNlLnRzXCI7XG5cbmV4cG9ydCB0eXBlIE1vZHVsZVZpc2libGVVc2Vyc1Jlc3BvbnNlID0ge1xuICBTdWNjZXNzPzogYm9vbGVhbjtcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG4gIE1lc3NhZ2U/OiBzdHJpbmc7XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIFRvdGFsPzogbnVtYmVyO1xuICB0b3RhbD86IG51bWJlcjtcbiAgSXRlbXM/OiB1bmtub3duW107XG4gIGl0ZW1zPzogdW5rbm93bltdO1xuICBUcmFjZUlkPzogc3RyaW5nO1xuICB0cmFjZUlkPzogc3RyaW5nO1xufTtcblxudHlwZSBHZXRWaXNpYmxlVXNlcnNPcHRpb25zID0gUGljazxBcGlGZXRjaE9wdGlvbnMsIFwic2lnbmFsXCIgfCBcInN1cHByZXNzUGVybWlzc2lvbk1vZGFsXCI+ICYge1xuICBpbmNsdWRlQ3JtVXNlcklkPzogYm9vbGVhbjtcbn07XG5cbi8vIENhbGxzIHRoZSBzdGFuZGFyZCBtb2R1bGUgZGF0YS12aXNpYmlsaXR5IGVuZHBvaW50IGZvciBhbnkgYXBwL21vZHVsZSBzY29wZS5cbi8vIGluY2x1ZGVDcm1Vc2VySWQgY29udHJvbHMgbGVnYWN5IENSTSBpZCBoeWRyYXRpb247IGl0IGRvZXMgbm90IGdyYW50IHZpc2liaWxpdHkuXG5leHBvcnQgY29uc3QgZ2V0VmlzaWJsZVVzZXJzID0gKFxuICBhcHBDb2RlOiBzdHJpbmcsXG4gIG1vZHVsZUNvZGU6IHN0cmluZyxcbiAgb3B0aW9uczogR2V0VmlzaWJsZVVzZXJzT3B0aW9ucyA9IHt9XG4pOiBQcm9taXNlPE1vZHVsZVZpc2libGVVc2Vyc1Jlc3BvbnNlPiA9PiB7XG4gIGNvbnN0IHF1ZXJ5ID0gW1xuICAgIGBhcHBDb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFwcENvZGUpfWAsXG4gICAgYG1vZHVsZUNvZGU9JHtlbmNvZGVVUklDb21wb25lbnQobW9kdWxlQ29kZSl9YCxcbiAgICBgaW5jbHVkZUNybVVzZXJJZD0ke29wdGlvbnMuaW5jbHVkZUNybVVzZXJJZCA9PT0gZmFsc2UgPyBcImZhbHNlXCIgOiBcInRydWVcIn1gLFxuICBdLmpvaW4oXCImXCIpO1xuICBjb25zdCB1cmwgPSBgL2FwaS9jcm0vZGF0YS12aXNpYmlsaXR5L3Zpc2libGUtdXNlcnM/JHtxdWVyeX1gO1xuXG4gIHJldHVybiBmZXRjaEpzb248TW9kdWxlVmlzaWJsZVVzZXJzUmVzcG9uc2U+KHVybCwge1xuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBzaWduYWw6IG9wdGlvbnMuc2lnbmFsLFxuICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiBvcHRpb25zLnN1cHByZXNzUGVybWlzc2lvbk1vZGFsID8/IHRydWUsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFZpc2libGVVc2Vyc1Jlc3BvbnNlSXRlbXMgPSAocmVzcG9uc2U6IE1vZHVsZVZpc2libGVVc2Vyc1Jlc3BvbnNlKTogdW5rbm93bltdID0+IHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkocmVzcG9uc2UuSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlLml0ZW1zKSA/IHJlc3BvbnNlLml0ZW1zIDogW107XG59O1xuXG5leHBvcnQgY29uc3QgaXNWaXNpYmxlVXNlcnNSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IE1vZHVsZVZpc2libGVVc2Vyc1Jlc3BvbnNlKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHN1Y2Nlc3MgPSByZXNwb25zZS5TdWNjZXNzID8/IHJlc3BvbnNlLnN1Y2Nlc3M7XG4gIHJldHVybiBzdWNjZXNzICE9PSBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRWaXNpYmxlVXNlcnNSZXNwb25zZU1lc3NhZ2UgPSAocmVzcG9uc2U6IE1vZHVsZVZpc2libGVVc2Vyc1Jlc3BvbnNlKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyhyZXNwb25zZS5NZXNzYWdlIHx8IHJlc3BvbnNlLm1lc3NhZ2UgfHwgXCJcIikudHJpbSgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFZpc2libGVVc2Vyc1Jlc3BvbnNlVHJhY2VJZCA9IChyZXNwb25zZTogTW9kdWxlVmlzaWJsZVVzZXJzUmVzcG9uc2UpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICByZXR1cm4gU3RyaW5nKHJlc3BvbnNlLlRyYWNlSWQgfHwgcmVzcG9uc2UudHJhY2VJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0RBLElBQU0sV0FBVyxDQUFDLFVBQTJCLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUV0RSxJQUFNLHlCQUF5QixDQUFDLFVBQWtDO0FBQ2hFLE1BQUksT0FBTyxVQUFVLFlBQVksT0FBTyxTQUFTLEtBQUssRUFBRyxRQUFPO0FBQ2hFLFFBQU0sU0FBUyxPQUFPLFNBQVMsS0FBSyxDQUFDO0FBQ3JDLFNB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
