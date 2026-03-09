const TOPBAR_ACTIONS_PENDING_CLASS = "topbar-actions-pending";

// Reveals a topbar action group only after client-side permissions and mode are resolved.
export const setTopbarActionGroupReady = (groupId: string | undefined): void => {
  const safeGroupId = String(groupId || "").trim();
  if (!safeGroupId || typeof document === "undefined") return;

  const group = document.getElementById(safeGroupId);
  if (!group) return;

  group.classList.remove(TOPBAR_ACTIONS_PENDING_CLASS);
};
