import { useMemo } from "react";
import { showPermissionModal } from "../../../utils/permissions.ts";
import { useModuleDataVisibility } from "../../../hooks/useModuleDataVisibility.ts";
import { formatModuleVisibleUserLabel, getVisibleUserForOwner } from "../../../utils/moduleDataVisibility.ts";

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
    visibleUserByOwnerAxUserId,
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

  const selectedOwner = useMemo(() => {
    return getVisibleUserForOwner(visibleUserByOwnerAxUserId, selectedOwnerAxUserId);
  }, [selectedOwnerAxUserId, visibleUserByOwnerAxUserId]);

  return {
    visibleVisitUsers: visibleUsers,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
    selectedOwnerText: selectedOwner ? formatModuleVisibleUserLabel(selectedOwner) : "",
    effectiveSelectedOwnerAxUserId: selectedOwner?.axUserId || "",
  };
};
