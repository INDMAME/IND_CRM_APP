import { useMemo } from "react";
import { showPermissionModal } from "../../../utils/permissions.ts";
import { useVisibleVisitUsers } from "./useVisibleVisitUsers.ts";
import { formatVisibleVisitUserLabel } from "./visibleVisitUsers.ts";

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
  const { visibleVisitUsers, visibleUsersLoading, visibleUsersError } = useVisibleVisitUsers({
    enabled,
    companyId,
    axUserId,
    permissionsRevision,
    onForbidden: showPermissionModal,
    onDebug,
  });

  const selectedOwner = useMemo(() => {
    if (!selectedOwnerAxUserId || visibleVisitUsers.length <= 1) return null;
    return (
      visibleVisitUsers.find((user) => user.axUserId.toUpperCase() === selectedOwnerAxUserId.toUpperCase()) || null
    );
  }, [selectedOwnerAxUserId, visibleVisitUsers]);

  return {
    visibleVisitUsers,
    visibleUsersLoading,
    visibleUsersError,
    selectedOwnerText: selectedOwner ? formatVisibleVisitUserLabel(selectedOwner) : "",
    effectiveSelectedOwnerAxUserId: selectedOwner?.axUserId || "",
  };
};
