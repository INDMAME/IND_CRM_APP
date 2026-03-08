const normalizeUserId = (value: unknown): string => String(value || "").trim();

let expenseActingUserIdOverride = "";

// Returns the active AxUserId override used by Gastos API calls.
export const getExpenseActingUserOverride = (): string => {
  return expenseActingUserIdOverride;
};

// Sets the active AxUserId override used by Gastos API calls.
export const setExpenseActingUserOverride = (userId: unknown): string => {
  const normalized = normalizeUserId(userId);
  expenseActingUserIdOverride = normalized;
  return normalized;
};

// Clears the active AxUserId override.
export const clearExpenseActingUserOverride = (): void => {
  expenseActingUserIdOverride = "";
};
