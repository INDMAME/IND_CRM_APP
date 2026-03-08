type ExpenseScopeWindow = {
  __IND_ENTRA_OID__?: unknown;
  __IND_SELECTED_COMPANY__?: unknown;
  __IND_COMPANY__?: unknown;
};

const normalizeScopePart = (value: unknown, uppercase = false): string => {
  const normalized = String(value || "").trim();
  if (!normalized) return "";
  return uppercase ? normalized.toUpperCase() : normalized.toLowerCase();
};

// Reads the current session scope values used by Gastos caches.
export const getExpenseScopeValues = () => {
  if (typeof window === "undefined") {
    return {
      entraOid: "",
      companyId: "",
    };
  }

  const runtimeWindow = window as ExpenseScopeWindow;
  const entraOid = normalizeScopePart(runtimeWindow.__IND_ENTRA_OID__);
  const companyId = normalizeScopePart(runtimeWindow.__IND_SELECTED_COMPANY__ || runtimeWindow.__IND_COMPANY__, true);

  return {
    entraOid,
    companyId,
  };
};

// Builds the standard Gastos cache scope key (entraOid + companyId).
export const getExpenseScopeToken = (): string => {
  const { entraOid, companyId } = getExpenseScopeValues();
  const scope = `${entraOid}__${companyId}`.replace(/^_+|_+$/g, "");
  return scope || "session";
};
