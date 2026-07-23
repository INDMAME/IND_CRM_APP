import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSessionJsonWithExpiry, setSessionJsonWithExpiry } from "../utils/sessionExpiry.ts";
import { getExpenseScopeToken } from "../pages/gastos/utils/expenseScope.ts";
import { normalizeExpenseSheetSubordinates } from "../pages/gastos/utils/expenseSubordinateMapper.ts";
import { clearExpenseActingUserOverride } from "../pages/gastos/utils/expenseActingUser.ts";

export type AccessLevel = "View" | "Edit" | "Add" | "FullAccess";
export type AuthManagedUser = {
  crmUserId: string;
  axUserId: string;
  name: string;
  userName?: string;
};

const ACCESS_RIGHTS: Record<AccessLevel, number> = {
  View: 1,
  Edit: 2,
  Add: 3,
  FullAccess: 4,
};

const EXPENSE_MANAGEMENT_CACHE_KEY_PREFIX = "expense_management_context_v2";
const EXPENSE_MANAGEMENT_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

type ExpenseManagementCacheEntry = {
  currentAxUserId: string;
  currentUserName?: string;
  currentCrmUserId?: string;
  allowSelfManagement: boolean;
  selectedManagedUserId: string;
  subordinates: AuthManagedUser[];
};

const normalizeText = (value: unknown): string => String(value || "").trim();

const isSameUser = (left: string, right: string): boolean => {
  const normalizedLeft = normalizeText(left).toUpperCase();
  const normalizedRight = normalizeText(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

const normalizeSubordinates = (source: unknown): AuthManagedUser[] => {
  const normalizedSource = normalizeExpenseSheetSubordinates(source);
  const seen = new Set<string>();
  return normalizedSource
    .map((entry) => {
      const crmUserId = normalizeText(entry.crmUserId);
      const axUserId = normalizeText(entry.axUserId);
      if (!crmUserId || !axUserId) return null;
      const name = normalizeText(entry.name);
      return {
        crmUserId,
        axUserId,
        name: name || axUserId,
      } as AuthManagedUser;
    })
    .filter((entry): entry is AuthManagedUser => !!entry)
    .filter((entry) => {
      const key = entry.axUserId.toUpperCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const ensureCurrentUserInSubordinates = (
  source: AuthManagedUser[],
  currentAxUserId: string,
  currentUserName = ""
): AuthManagedUser[] => {
  const normalizedCurrent = normalizeText(currentAxUserId);
  if (!normalizedCurrent) return source;
  const normalizedCurrentName = normalizeText(currentUserName);
  let foundCurrent = false;
  const merged = source.map((entry) => {
    if (!isSameUser(entry.axUserId, normalizedCurrent)) {
      return entry;
    }

    foundCurrent = true;
    const resolvedName = normalizedCurrentName || normalizeText(entry.name) || normalizedCurrent;
    return {
      ...entry,
      crmUserId: normalizeText(entry.crmUserId) || normalizedCurrent,
      axUserId: normalizeText(entry.axUserId) || normalizedCurrent,
      name: resolvedName,
      userName: normalizedCurrentName || entry.userName,
    };
  });

  if (foundCurrent) {
    return merged;
  }

  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrentName || normalizedCurrent,
      userName: normalizedCurrentName || undefined,
    },
    ...source,
  ];
};

const resolveManagedUserSelection = (
  requestedUserId: string,
  currentAxUserId: string,
  users: AuthManagedUser[]
): string => {
  const normalizedRequested = normalizeText(requestedUserId);
  const normalizedCurrent = normalizeText(currentAxUserId);
  if (normalizedRequested) {
    const exact = users.find((entry) => isSameUser(entry.axUserId, normalizedRequested));
    if (exact) return exact.axUserId;
  }
  if (normalizedCurrent) {
    const self = users.find((entry) => isSameUser(entry.axUserId, normalizedCurrent));
    return self?.axUserId || normalizedCurrent;
  }
  return "";
};

const getExpenseManagementCacheKey = (): string => {
  return `${EXPENSE_MANAGEMENT_CACHE_KEY_PREFIX}_${getExpenseScopeToken()}`;
};

const readExpenseManagementCache = (): ExpenseManagementCacheEntry | null => {
  const cacheKey = getExpenseManagementCacheKey();
  const raw = getSessionJsonWithExpiry<ExpenseManagementCacheEntry>(cacheKey);
  if (!raw || typeof raw !== "object") return null;

  const currentAxUserId = normalizeText(raw.currentAxUserId);
  const currentUserName = normalizeText(raw.currentUserName);
  const currentCrmUserId = normalizeText(raw.currentCrmUserId);
  const subordinates = normalizeSubordinates(raw.subordinates);
  const selectedManagedUserId = resolveManagedUserSelection(raw.selectedManagedUserId, currentAxUserId, subordinates);

  return {
    currentAxUserId,
    currentUserName,
    currentCrmUserId,
    allowSelfManagement: raw.allowSelfManagement === true,
    selectedManagedUserId,
    subordinates,
  };
};

const writeExpenseManagementCache = (entry: ExpenseManagementCacheEntry): void => {
  const cacheKey = getExpenseManagementCacheKey();
  setSessionJsonWithExpiry(cacheKey, entry, EXPENSE_MANAGEMENT_CACHE_TTL_MS);
};

type AuthValue = {
  moduleAccess: Record<string, number>;
  selectedCompany: string;
  currentAxUserId: string;
  currentUserName: string;
  currentCrmUserId: string;
  subordinates: AuthManagedUser[];
  manageableSubordinates: AuthManagedUser[];
  canManageOtherUsers: boolean;
  selectedManagedUserId: string;
  managementBootstrapReady: boolean;
  allowSelfManagement: boolean;
  setSelectedManagedUserId: (userId: string) => void;
  resetSelectedManagedUserId: () => void;
  canAccess: (code: string, level?: AccessLevel) => boolean;
};

const defaultValue: AuthValue = {
  moduleAccess: {},
  selectedCompany: "",
  currentAxUserId: "",
  currentUserName: "",
  currentCrmUserId: "",
  subordinates: [],
  manageableSubordinates: [],
  canManageOtherUsers: false,
  selectedManagedUserId: "",
  managementBootstrapReady: false,
  allowSelfManagement: false,
  setSelectedManagedUserId: () => undefined,
  resetSelectedManagedUserId: () => undefined,
  canAccess: () => false,
};

const AuthContext = createContext<AuthValue>(defaultValue);

type ProviderProps = {
  children: React.ReactNode;
  moduleAccess?: Record<string, number>;
  selectedCompany?: string;
  allowSelfManagement?: boolean;
  enableExpenseManagement?: boolean;
};

export const AuthProvider = ({
  children,
  moduleAccess,
  selectedCompany,
  allowSelfManagement,
  enableExpenseManagement = false,
}: ProviderProps) => {
  const access = moduleAccess || (globalThis.__IND_MODULE_ACCESS__ || {});
  const company = selectedCompany || String(globalThis.__IND_SELECTED_COMPANY__ || "");
  // Company-scoped permission injected by Razor layout from selected company context.
  // Sensitive edit flows must gate with this value in addition to module access rights.
  const selfManagementFromLayout = allowSelfManagement ?? globalThis.__IND_ALLOW_SELF_MANAGEMENT__ === true;
  const cachedEntry = useMemo(() => readExpenseManagementCache(), [company]);
  const [currentAxUserId, setCurrentAxUserId] = useState(() => normalizeText(cachedEntry?.currentAxUserId));
  const [currentUserName, setCurrentUserName] = useState(() => normalizeText(cachedEntry?.currentUserName));
  const [currentCrmUserId, setCurrentCrmUserId] = useState(() => normalizeText(cachedEntry?.currentCrmUserId));
  const [subordinates, setSubordinates] = useState<AuthManagedUser[]>(() =>
    ensureCurrentUserInSubordinates(
      cachedEntry?.subordinates || [],
      cachedEntry?.currentAxUserId || "",
      cachedEntry?.currentUserName || ""
    )
  );
  const [selectedManagedUserId, setSelectedManagedUserIdState] = useState(() => {
    const cachedCurrent = normalizeText(cachedEntry?.currentAxUserId);
    const cachedUsers = ensureCurrentUserInSubordinates(
      cachedEntry?.subordinates || [],
      cachedCurrent,
      cachedEntry?.currentUserName || ""
    );
    const fallbackSelection = resolveManagedUserSelection(cachedEntry?.selectedManagedUserId || "", cachedCurrent, cachedUsers);
    return fallbackSelection;
  });
  const [selfManagement, setSelfManagement] = useState(selfManagementFromLayout);
  const [managementBootstrapReady, setManagementBootstrapReady] = useState(!enableExpenseManagement);

  useEffect(() => {
    if (enableExpenseManagement) return;
    setCurrentAxUserId("");
    setCurrentUserName("");
    setCurrentCrmUserId("");
    setSubordinates([]);
    setSelectedManagedUserIdState("");
    setSelfManagement(selfManagementFromLayout);
  }, [enableExpenseManagement, selfManagementFromLayout]);

  useEffect(() => {
    if (!enableExpenseManagement) {
      clearExpenseActingUserOverride();
      setManagementBootstrapReady(true);
      return;
    }

    let cancelled = false;
    const cached = readExpenseManagementCache();
    if (cached) {
      const cachedUsers = ensureCurrentUserInSubordinates(cached.subordinates, cached.currentAxUserId, cached.currentUserName);
      const cachedSelection = resolveManagedUserSelection(cached.selectedManagedUserId, cached.currentAxUserId, cachedUsers);
      setCurrentAxUserId(cached.currentAxUserId);
      setCurrentUserName(cached.currentUserName);
      setCurrentCrmUserId(normalizeText(cached.currentCrmUserId));
      setSubordinates(cachedUsers);
      setSelectedManagedUserIdState(cachedSelection);
      setSelfManagement(cached.allowSelfManagement === true ? true : selfManagementFromLayout);
      setManagementBootstrapReady(true);
    } else {
      setManagementBootstrapReady(false);
    }

    const bootstrapExpenseManagement = async () => {
      try {
        const expenseApiModule = await import("../pages/gastos/utils/expenseApi.ts");
        const contextSnapshot = await expenseApiModule.getExpenseApiContextSnapshot({
          suppressPermissionModal: true,
        });
        const resolvedCurrentUser = normalizeText(contextSnapshot.axUserId);
        const resolvedCurrentUserName = normalizeText(contextSnapshot.userName);
        const resolvedCurrentCrmUser = normalizeText(contextSnapshot.crmUserId);
        let nextSubordinates = ensureCurrentUserInSubordinates(
          cached?.subordinates || [],
          resolvedCurrentUser,
          resolvedCurrentUserName
        );

        // Always refresh subordinates from API to avoid stale legacy id mappings.
        try {
          const subordinatesResponse = await expenseApiModule.getExpenseSheetSubordinates({
            suppressPermissionModal: true,
          });
          nextSubordinates = ensureCurrentUserInSubordinates(
            normalizeSubordinates(subordinatesResponse?.Items),
            resolvedCurrentUser,
            resolvedCurrentUserName
          );
        } catch {
          // Keep cached subordinates when refresh fails.
        }

        const nextSelection = resolveManagedUserSelection(
          cached?.selectedManagedUserId || resolvedCurrentUser,
          resolvedCurrentUser,
          nextSubordinates
        );

        if (cancelled) return;

        setCurrentAxUserId(resolvedCurrentUser);
        setCurrentUserName(resolvedCurrentUserName);
        setCurrentCrmUserId(resolvedCurrentCrmUser);
        setSubordinates(nextSubordinates);
        setSelectedManagedUserIdState(nextSelection);
        setSelfManagement(contextSnapshot.allowSelfManagement === true);
      } catch {
        if (cancelled) return;

        if (!cached) {
          setCurrentAxUserId("");
          setCurrentUserName("");
          setCurrentCrmUserId("");
          setSubordinates([]);
          setSelectedManagedUserIdState("");
          setSelfManagement(selfManagementFromLayout);
        }
      } finally {
        if (!cancelled) {
          setManagementBootstrapReady(true);
        }
      }
    };

    void bootstrapExpenseManagement();

    return () => {
      cancelled = true;
    };
  }, [company, enableExpenseManagement, selfManagementFromLayout]);

  useEffect(() => {
    if (!enableExpenseManagement) return;
    if (!managementBootstrapReady) return;

    writeExpenseManagementCache({
      currentAxUserId: normalizeText(currentAxUserId),
      currentUserName: normalizeText(currentUserName),
      currentCrmUserId: normalizeText(currentCrmUserId),
      allowSelfManagement: selfManagement === true,
      selectedManagedUserId: normalizeText(selectedManagedUserId),
      subordinates: ensureCurrentUserInSubordinates(subordinates, currentAxUserId, currentUserName),
    });
  }, [
    currentAxUserId,
    currentUserName,
    currentCrmUserId,
    enableExpenseManagement,
    managementBootstrapReady,
    selectedManagedUserId,
    selfManagement,
    subordinates,
  ]);

  const manageableSubordinates = useMemo(() => {
    const normalizedCurrent = normalizeText(currentAxUserId);
    return subordinates.filter((entry) => !normalizedCurrent || !isSameUser(entry.axUserId, normalizedCurrent));
  }, [currentAxUserId, subordinates]);

  const setSelectedManagedUserId = useCallback(
    (userId: string) => {
      const normalizedCurrent = normalizeText(currentAxUserId);
      const normalizedUsers = ensureCurrentUserInSubordinates(subordinates, normalizedCurrent, currentUserName);
      const nextSelection = resolveManagedUserSelection(userId, normalizedCurrent, normalizedUsers);
      setSelectedManagedUserIdState(nextSelection);
    },
    [currentAxUserId, currentUserName, subordinates]
  );

  const resetSelectedManagedUserId = useCallback(() => {
    const normalizedCurrent = normalizeText(currentAxUserId);
    const normalizedUsers = ensureCurrentUserInSubordinates(subordinates, normalizedCurrent, currentUserName);
    const nextSelection = resolveManagedUserSelection(normalizedCurrent, normalizedCurrent, normalizedUsers);
    setSelectedManagedUserIdState(nextSelection);
  }, [currentAxUserId, currentUserName, subordinates]);

  const value = useMemo<AuthValue>(() => {
    const canAccess = (code: string, level: AccessLevel = "View") => {
      const current = Number(access?.[code] ?? 0);
      return current >= ACCESS_RIGHTS[level];
    };
    return {
      moduleAccess: access,
      selectedCompany: company,
      currentAxUserId,
      currentUserName,
      currentCrmUserId,
      subordinates,
      manageableSubordinates,
      canManageOtherUsers: manageableSubordinates.length > 0,
      selectedManagedUserId,
      managementBootstrapReady,
      allowSelfManagement: selfManagement,
      setSelectedManagedUserId,
      resetSelectedManagedUserId,
      canAccess,
    };
  }, [
    access,
    company,
    currentAxUserId,
    currentUserName,
    currentCrmUserId,
    manageableSubordinates,
    managementBootstrapReady,
    selfManagement,
    selectedManagedUserId,
    setSelectedManagedUserId,
    resetSelectedManagedUserId,
    subordinates,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
