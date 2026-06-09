import { useCallback, useEffect, useRef, useState } from "react";
import { ApiFetchError, fetchJson } from "../../../services/apiService.ts";
import { getSessionJsonWithExpiry, setSessionJsonWithExpiry } from "../../../utils/sessionExpiry.ts";
import { indT } from "../../../utils/indI18n.ts";
import { resolveEffectiveCompanyId } from "../../../utils/companySelection.ts";
import { normalizeVisibleVisitUsers, type DataVisibilityVisibleUser } from "./visibleVisitUsers.ts";

type VisibleUsersResponse = {
  Success?: boolean;
  success?: boolean;
  Message?: string;
  message?: string;
  Total?: number;
  total?: number;
  Items?: unknown[];
  items?: unknown[];
  TraceId?: string;
  traceId?: string;
};

type VisibleUsersCacheEntry = {
  users: DataVisibilityVisibleUser[];
  total: number;
  traceId?: string;
};

type UseVisibleVisitUsersArgs = {
  enabled: boolean;
  companyId: string;
  axUserId: string;
  permissionsRevision: string;
  onForbidden: () => void;
  onDebug?: (message: string, data?: Record<string, unknown>) => void;
};

const CACHE_PREFIX = "visits_visible_users_v1";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const APP_CODE = "CRM";
const MODULE_CODE = "VISITAS_GESTION";

const normalizeScopePart = (value: unknown): string => {
  const normalized = String(value || "").trim().toUpperCase();
  return normalized || "NONE";
};

const resolveCacheCompanyId = (companyId: string): string => {
  const selectedCompanyId = String(globalThis.__IND_SELECTED_COMPANY__ || companyId || "");
  const companyCandidates = companyId ? [{ companyId, isDefault: true }] : [];
  return resolveEffectiveCompanyId(selectedCompanyId, companyCandidates, companyId);
};

const buildCacheKey = (companyId: string, axUserId: string, permissionsRevision: string): string => {
  const effectiveCompanyId = resolveCacheCompanyId(companyId);
  return [
    CACHE_PREFIX,
    normalizeScopePart(effectiveCompanyId),
    normalizeScopePart(axUserId),
    normalizeScopePart(permissionsRevision),
    MODULE_CODE,
  ].join("_");
};

const getResponseItems = (response: VisibleUsersResponse): unknown[] => {
  return Array.isArray(response.Items) ? response.Items : Array.isArray(response.items) ? response.items : [];
};

const isResponseSuccess = (response: VisibleUsersResponse): boolean => {
  const success = response.Success ?? response.success;
  return success !== false;
};

const getResponseMessage = (response: VisibleUsersResponse): string => {
  return String(response.Message || response.message || "").trim();
};

// Loads visible visit owners through the MVC API and keeps a session-scoped cache.
export const useVisibleVisitUsers = ({
  enabled,
  companyId,
  axUserId,
  permissionsRevision,
  onForbidden,
  onDebug,
}: UseVisibleVisitUsersArgs) => {
  const [visibleVisitUsers, setVisibleVisitUsers] = useState<DataVisibilityVisibleUser[]>([]);
  const [visibleUsersLoading, setVisibleUsersLoading] = useState(false);
  const [visibleUsersError, setVisibleUsersError] = useState("");
  const activeAbortRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef(0);

  const abortActiveRequest = useCallback(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
      // Ignore abort errors.
    }
    activeAbortRef.current = null;
  }, []);

  const loadVisibleVisitUsers = useCallback(
    async (force = false) => {
      if (!enabled) {
        abortActiveRequest();
        setVisibleVisitUsers([]);
        setVisibleUsersLoading(false);
        setVisibleUsersError("");
        return;
      }

      const cacheKey = buildCacheKey(companyId, axUserId, permissionsRevision);
      const cached = force ? null : getSessionJsonWithExpiry<VisibleUsersCacheEntry>(cacheKey);
      if (cached && Array.isArray(cached.users)) {
        setVisibleVisitUsers(cached.users);
        setVisibleUsersLoading(false);
        setVisibleUsersError("");
        onDebug?.("visibleUsers:cache", { count: cached.users.length, cacheKey });
        return;
      }

      const requestId = ++activeRequestIdRef.current;
      abortActiveRequest();

      const controller = new AbortController();
      activeAbortRef.current = controller;
      setVisibleUsersLoading(true);
      setVisibleUsersError("");

      try {
        const url = `/api/crm/data-visibility/visible-users?appCode=${APP_CODE}&moduleCode=${MODULE_CODE}&includeCrmUserId=true`;
        const response = await fetchJson<VisibleUsersResponse>(url, {
          method: "GET",
          signal: controller.signal,
          suppressPermissionModal: true,
        });
        if (requestId !== activeRequestIdRef.current) return;

        const users = normalizeVisibleVisitUsers(getResponseItems(response));
        const traceId = String(response.TraceId || response.traceId || "").trim() || undefined;
        if (!isResponseSuccess(response) && users.length === 0) {
          setVisibleVisitUsers([]);
          setVisibleUsersLoading(false);
          setVisibleUsersError(getResponseMessage(response) || indT("Api_RequestFailed", "Could not load visible users."));
          activeAbortRef.current = null;
          return;
        }

        setVisibleVisitUsers(users);
        setVisibleUsersLoading(false);
        setVisibleUsersError("");
        activeAbortRef.current = null;
        setSessionJsonWithExpiry(
          cacheKey,
          {
            users,
            total: users.length,
            traceId,
          },
          CACHE_TTL_MS
        );
        onDebug?.("visibleUsers:response", { count: users.length, traceId: traceId || "" });
      } catch (err: any) {
        if (requestId !== activeRequestIdRef.current) return;
        if (err?.name === "AbortError") {
          activeAbortRef.current = null;
          return;
        }

        if (err instanceof ApiFetchError && err.status === 403) {
          setVisibleUsersLoading(false);
          activeAbortRef.current = null;
          onForbidden();
          return;
        }

        setVisibleVisitUsers([]);
        setVisibleUsersLoading(false);
        setVisibleUsersError(err?.message || indT("Api_RequestFailed", "Could not load visible users."));
        activeAbortRef.current = null;
        onDebug?.("visibleUsers:error", { message: err?.message || "" });
      }
    },
    [abortActiveRequest, axUserId, companyId, enabled, onDebug, onForbidden, permissionsRevision]
  );

  useEffect(() => {
    void loadVisibleVisitUsers(false);
    return () => {
      abortActiveRequest();
    };
  }, [abortActiveRequest, loadVisibleVisitUsers]);

  return {
    visibleVisitUsers,
    visibleUsersLoading,
    visibleUsersError,
    loadVisibleVisitUsers,
  };
};
