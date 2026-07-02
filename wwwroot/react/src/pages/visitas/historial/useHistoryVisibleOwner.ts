import { useCallback, useMemo } from "react";
import { showPermissionModal } from "../../../utils/permissions.ts";
import { useModuleDataVisibility } from "../../../hooks/useModuleDataVisibility.ts";
import { buildVisibleUserByOwnerMap, formatModuleVisibleUserLabel, getVisibleUserForOwner } from "../../../utils/moduleDataVisibility.ts";
import {
  ensureCurrentHistoryVisibleOwnerInList,
  hasHistoryVisibleSubordinates,
  resolveHistoryEffectiveOwnerAxUserId,
  resolveHistoryVisibleOwnerSelectValue,
} from "./historyVisibleOwnerSelection.ts";

type Args = {
  enabled: boolean;
  companyId: string;
  axUserId: string;
  permissionsRevision: string;
  selectedOwnerAxUserId: string;
  onDebug: (message: string, data?: Record<string, unknown>) => void;
};

const APP_CODE = "CRM";
const MODULE_CODE = "VISITAS_GESTION";

// Loads visible visit owners and resolves the currently selected owner safely.
export const useHistoryVisibleOwner = ({
  enabled,
  companyId,
  axUserId,
  permissionsRevision,
  selectedOwnerAxUserId,
  onDebug,
}: Args) => {
  const {
    visibleUsers,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
  } = useModuleDataVisibility({
    enabled,
    companyId,
    axUserId,
    permissionsRevision,
    appCode: APP_CODE,
    moduleCode: MODULE_CODE,
    preloadedUsers: typeof window !== "undefined" ? window.__IND_VISIBLE_VISIT_USERS__ : undefined,
    onForbidden: showPermissionModal,
    onDebug,
  });

  const visibleVisitUsers = useMemo(() => {
    return ensureCurrentHistoryVisibleOwnerInList(visibleUsers, axUserId);
  }, [axUserId, visibleUsers]);

  const visibleVisitUserByOwnerAxUserId = useMemo(() => {
    return buildVisibleUserByOwnerMap(visibleVisitUsers);
  }, [visibleVisitUsers]);

  const canManageVisibleOwners = useMemo(() => {
    return visibleUsersReady && hasHistoryVisibleSubordinates(visibleVisitUsers, axUserId);
  }, [axUserId, visibleUsersReady, visibleVisitUsers]);

  const ownerSelectValue = useMemo(() => {
    return resolveHistoryVisibleOwnerSelectValue({
      selectedOwnerAxUserId,
      currentAxUserId: axUserId,
      users: visibleVisitUsers,
      canManageVisibleOwners,
    });
  }, [axUserId, canManageVisibleOwners, selectedOwnerAxUserId, visibleVisitUsers]);

  const resolveEffectiveOwnerAxUserId = useCallback(
    (requestedOwnerAxUserId?: string) => {
      return resolveHistoryEffectiveOwnerAxUserId({
        selectedOwnerAxUserId: requestedOwnerAxUserId ?? selectedOwnerAxUserId,
        currentAxUserId: axUserId,
        users: visibleVisitUsers,
        canManageVisibleOwners,
      });
    },
    [axUserId, canManageVisibleOwners, selectedOwnerAxUserId, visibleVisitUsers]
  );

  const effectiveSelectedOwnerAxUserId = useMemo(() => {
    return resolveEffectiveOwnerAxUserId(selectedOwnerAxUserId);
  }, [resolveEffectiveOwnerAxUserId, selectedOwnerAxUserId]);

  const selectedOwner = useMemo(() => {
    return getVisibleUserForOwner(visibleVisitUserByOwnerAxUserId, effectiveSelectedOwnerAxUserId);
  }, [effectiveSelectedOwnerAxUserId, visibleVisitUserByOwnerAxUserId]);

  return {
    visibleVisitUsers,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
    ownerSelectValue,
    ownerFilterDisabled: !visibleUsersReady || visibleUsersLoading || !canManageVisibleOwners,
    canManageVisibleOwners,
    selectedOwnerText: selectedOwner ? formatModuleVisibleUserLabel(selectedOwner) : "",
    effectiveSelectedOwnerAxUserId,
    resolveEffectiveOwnerAxUserId,
  };
};
