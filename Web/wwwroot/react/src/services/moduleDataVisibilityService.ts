import { fetchJson, type ApiFetchOptions } from "./apiService.ts";

export type ModuleVisibleUsersResponse = {
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

type GetVisibleUsersOptions = Pick<ApiFetchOptions, "signal" | "suppressPermissionModal"> & {
  includeCrmUserId?: boolean;
};

// Calls the standard module data-visibility endpoint for any app/module scope.
export const getVisibleUsers = (
  appCode: string,
  moduleCode: string,
  options: GetVisibleUsersOptions = {}
): Promise<ModuleVisibleUsersResponse> => {
  const query = [
    `appCode=${encodeURIComponent(appCode)}`,
    `moduleCode=${encodeURIComponent(moduleCode)}`,
    `includeCrmUserId=${options.includeCrmUserId === false ? "false" : "true"}`,
  ].join("&");
  const url = `/api/crm/data-visibility/visible-users?${query}`;

  return fetchJson<ModuleVisibleUsersResponse>(url, {
    method: "GET",
    signal: options.signal,
    suppressPermissionModal: options.suppressPermissionModal ?? true,
  });
};

export const getVisibleUsersResponseItems = (response: ModuleVisibleUsersResponse): unknown[] => {
  return Array.isArray(response.Items) ? response.Items : Array.isArray(response.items) ? response.items : [];
};

export const isVisibleUsersResponseSuccess = (response: ModuleVisibleUsersResponse): boolean => {
  const success = response.Success ?? response.success;
  return success !== false;
};

export const getVisibleUsersResponseMessage = (response: ModuleVisibleUsersResponse): string => {
  return String(response.Message || response.message || "").trim();
};

export const getVisibleUsersResponseTraceId = (response: ModuleVisibleUsersResponse): string | undefined => {
  return String(response.TraceId || response.traceId || "").trim() || undefined;
};
