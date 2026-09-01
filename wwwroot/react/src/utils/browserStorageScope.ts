type BrowserScopeWindow = {
  __IND_ENTRA_OID__?: unknown;
  __IND_SELECTED_COMPANY__?: unknown;
  __IND_COMPANY__?: unknown;
  IND?: {
    browserState?: {
      getEpoch?: () => number;
      isPersistenceAllowed?: () => boolean;
    };
  };
};

const normalizeOid = (value: unknown): string => String(value || "").trim().toLowerCase();
const normalizeCompany = (value: unknown): string => String(value || "").trim().toUpperCase();

const encodeScopePart = (value: string): string => {
  const encoded = encodeURIComponent(value);
  return `${encoded.length}_${encoded}`;
};

// Reads the authenticated browser identity and selected company.
export const getBrowserStorageScopeValues = () => {
  if (typeof window === "undefined") {
    return { entraOid: "", companyId: "" };
  }

  const runtimeWindow = window as BrowserScopeWindow;
  return {
    entraOid: normalizeOid(runtimeWindow.__IND_ENTRA_OID__),
    companyId: normalizeCompany(runtimeWindow.__IND_SELECTED_COMPANY__ || runtimeWindow.__IND_COMPANY__),
  };
};

// Builds a collision-free user and company token for sensitive browser keys.
export const getBrowserStorageScopeToken = (): string => {
  const { entraOid, companyId } = getBrowserStorageScopeValues();
  if (!entraOid || !companyId) return "";
  return `v2_u${encodeScopePart(entraOid)}_c${encodeScopePart(companyId)}`;
};

// Allows sensitive persistence only after the central identity guard is ready.
export const canPersistSensitiveBrowserState = (): boolean => {
  if (!getBrowserStorageScopeToken() || typeof window === "undefined") return false;
  const browserState = (window as BrowserScopeWindow).IND?.browserState;
  return browserState?.isPersistenceAllowed?.() === true;
};

// Captures the active identity scope and invalidation epoch around async writes.
export const captureSensitiveBrowserState = (): string => {
  if (!canPersistSensitiveBrowserState() || typeof window === "undefined") return "";
  const browserState = (window as BrowserScopeWindow).IND?.browserState;
  const epoch = Number(browserState?.getEpoch?.() ?? 0);
  return `${getBrowserStorageScopeToken()}::${Number.isFinite(epoch) ? epoch : 0}`;
};

// Confirms that no logout or identity change occurred during async work.
export const isSensitiveBrowserStateCurrent = (snapshot: string): boolean => {
  return !!snapshot && snapshot === captureSensitiveBrowserState();
};
