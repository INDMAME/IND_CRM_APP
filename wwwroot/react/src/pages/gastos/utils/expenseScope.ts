import {
  getBrowserStorageScopeToken,
  getBrowserStorageScopeValues,
} from "../../../utils/browserStorageScope.ts";

// Reads the current session scope values used by Gastos caches.
export const getExpenseScopeValues = () => {
  return getBrowserStorageScopeValues();
};

// Builds the standard Gastos cache scope key (entraOid + companyId).
export const getExpenseScopeToken = (): string => {
  return getBrowserStorageScopeToken() || "scope-unavailable";
};
