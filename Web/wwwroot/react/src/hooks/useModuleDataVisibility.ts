import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ApiFetchError } from "../services/apiService.ts";
import {
  getVisibleUsers,
  getVisibleUsersResponseItems,
  getVisibleUsersResponseMessage,
  getVisibleUsersResponseTraceId,
  isVisibleUsersResponseSuccess,
} from "../services/moduleDataVisibilityService.ts";
import { indT } from "../utils/indI18n.ts";
import { resolveEffectiveCompanyId } from "../utils/companySelection.ts";
import { getSessionJsonWithExpiry, setSessionJsonWithExpiry } from "../utils/sessionExpiry.ts";
import {
  buildVisibleUserByOwnerMap,
  normalizeModuleDataVisibilityUsers,
  type ModuleDataVisibilityVisibleUser,
} from "../utils/moduleDataVisibility.ts";

type ModuleDataVisibilityCacheEntry = {
  users: ModuleDataVisibilityVisibleUser[];
  total: number;
  traceId?: string;
};

type UseModuleDataVisibilityArgs = {
  enabled: boolean;
  companyId: string;
  axUserId: string;
  permissionsRevision: string;
  appCode: string;
  moduleCode: string;
  includeCrmUserId?: boolean;
  preloadedUsers?: unknown[] | null;
  onForbidden?: () => void;
  onDebug?: (message: string, data?: Record<string, unknown>) => void;
};

const CACHE_PREFIX = "module_data_visibility_v1";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

const normalizeScopePart = (value: unknown): string => {
  const normalized = String(value || "").trim().toUpperCase();
  return normalized || "NONE";
};

const resolveCacheCompanyId = (companyId: string): string => {
  const selectedCompanyId = String(globalThis.__IND_SELECTED_COMPANY__ || companyId || "");
  const companyCandidates = companyId ? [{ companyId, isDefault: true }] : [];
  return resolveEffectiveCompanyId(selectedCompanyId, companyCandidates, companyId);
};

const buildCacheKey = (
  companyId: string,
  axUserId: string,
  permissionsRevision: string,
  appCode: string,
  moduleCode: string,
  includeCrmUserId: boolean
): string => {
  const effectiveCompanyId = resolveCacheCompanyId(companyId);
  return [
    CACHE_PREFIX,
    normalizeScopePart(effectiveCompanyId),
    normalizeScopePart(axUserId),
    normalizeScopePart(permissionsRevision),
    normalizeScopePart(appCode),
    normalizeScopePart(moduleCode),
    includeCrmUserId ? "CRMID1" : "CRMID0",
  ].join("_");
};

const hasPreloadedUsers = (preloadedUsers: unknown[] | null | undefined): boolean => Array.isArray(preloadedUsers);

const readPreloadedUsers = (preloadedUsers: unknown[] | null | undefined): ModuleDataVisibilityVisibleUser[] => {
  return normalizeModuleDataVisibilityUsers(preloadedUsers);
};

// Standard hook for module record visibility.
// Use it for owner filters, subordinate scopes, and record-level edit/delete gates.
export const useModuleDataVisibility = ({
  enabled,
  companyId,
  axUserId,
  permissionsRevision,
  appCode,
  moduleCode,
  includeCrmUserId = true,
  preloadedUsers,
  onForbidden,
  onDebug,
}: UseModuleDataVisibilityArgs) => {
  const [visibleUsers, setVisibleUsers] = useState<ModuleDataVisibilityVisibleUser[]>(() => readPreloadedUsers(preloadedUsers));
  const [visibleUsersLoading, setVisibleUsersLoading] = useState(false);
  const [visibleUsersError, setVisibleUsersError] = useState("");
  const [visibleUsersReady, setVisibleUsersReady] = useState(() => hasPreloadedUsers(preloadedUsers));
  const activeAbortRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef(0);

  const visibleUserByOwnerAxUserId = useMemo(() => buildVisibleUserByOwnerMap(visibleUsers), [visibleUsers]);

  const abortActiveRequest = useCallback(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
      // Ignore abort errors.
    }
    activeAbortRef.current = null;
  }, []);

  const loadVisibleUsers = useCallback(
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
      const cached = force ? null : getSessionJsonWithExpiry<ModuleDataVisibilityCacheEntry>(cacheKey);
      if (cached && Array.isArray(cached.users)) {
        setVisibleUsers(cached.users);
        setVisibleUsersLoading(false);
        setVisibleUsersError("");
        setVisibleUsersReady(true);
        onDebug?.("moduleDataVisibility:cache", { appCode, moduleCode, count: cached.users.length, cacheKey });
        return;
      }

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
          suppressPermissionModal: true,
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
      } catch (err: any) {
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
      appCode,
      axUserId,
      companyId,
      enabled,
      includeCrmUserId,
      moduleCode,
      onDebug,
      onForbidden,
      permissionsRevision,
      preloadedUsers,
    ]
  );

  useEffect(() => {
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
    loadVisibleUsers,
  };
};
