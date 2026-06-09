import { useMemo } from "react";
import { showPermissionModal } from "../../../utils/permissions.ts";
import { useVisibleVisitUsers } from "../../../hooks/useVisibleVisitUsers.ts";
import { formatVisibleVisitUserLabel } from "../../../utils/visibleVisitUsers.ts";

type Args = {
  enabled: boolean;
  companyId: string;
  axUserId: string;
  permissionsRevision: string;
  selectedOwnerAxUserId: string;
  onDebug: (message: string, data?: Record<string, unknown>) => void;
};

// Loads visible visit owners and resolves the currently selected owner safely.
export const useHistoryVisibleOwner = ({
  enabled,
  companyId,
  axUserId,
  permissionsRevision,
  selectedOwnerAxUserId,
  onDebug,
}: Args) => {
  const { visibleVisitUsers, visibleUsersLoading, visibleUsersError, visibleUsersReady } = useVisibleVisitUsers({
    enabled,
    companyId,
    axUserId,
    permissionsRevision,
    onForbidden: showPermissionModal,
    onDebug,
  });

  const currentAxUserId = axUserId.trim();
  const hasVisibleSubordinates = visibleUsersReady && visibleVisitUsers.length > 0;
  const selectedOwner = useMemo(() => {
    if (!selectedOwnerAxUserId || !hasVisibleSubordinates) return null;
    return (
      visibleVisitUsers.find((user) => user.axUserId.toUpperCase() === selectedOwnerAxUserId.toUpperCase()) || null
    );
  }, [hasVisibleSubordinates, selectedOwnerAxUserId, visibleVisitUsers]);

  const fallbackOwnerText = !hasVisibleSubordinates && visibleUsersReady && currentAxUserId ? currentAxUserId : "";

  return {
    visibleVisitUsers,
    visibleUsersLoading,
    visibleUsersError,
    visibleUsersReady,
    selectedOwnerText: selectedOwner ? formatVisibleVisitUserLabel(selectedOwner) : fallbackOwnerText,
    effectiveSelectedOwnerAxUserId: selectedOwner?.axUserId || fallbackOwnerText,
  };
};
