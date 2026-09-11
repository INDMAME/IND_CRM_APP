import type { HelpAction } from "./helpTypes.ts";

type HelpNavigationDefinition = {
  href: string;
  moduleCode: string | null;
};

export type ResolvedHelpNavigation = {
  href: string;
  label: string;
};

const VIEW_ACCESS = 1;
const HELP_NAVIGATION_ALLOWLIST: Record<string, HelpNavigationDefinition> = {
  home: { href: "/Home/Index", moduleCode: null },
  "visits.history": { href: "/Historial/History", moduleCode: "VISITAS_GESTION" },
  "expenses.sheets": { href: "/Gastos/ExpenseSheets", moduleCode: "GASTOS_HOJA_GASTO" },
  "expenses.tickets": { href: "/Gastos/Tickets", moduleCode: "GASTOS_TICKETS" },
};

// Resolves only known route keys and enforces the current module view permission.
export const resolveHelpNavigation = (
  action: HelpAction,
  moduleAccess?: Record<string, number>
): ResolvedHelpNavigation | null => {
  if (String(action?.type || "").trim().toLowerCase() !== "navigate") {
    return null;
  }

  const routeKey = String(action?.routeKey || "").trim();
  const definition = HELP_NAVIGATION_ALLOWLIST[routeKey];
  if (!definition) {
    return null;
  }

  const access = moduleAccess ?? globalThis.__IND_MODULE_ACCESS__ ?? {};
  if (definition.moduleCode && Number(access[definition.moduleCode] ?? 0) < VIEW_ACCESS) {
    return null;
  }

  return {
    href: definition.href,
    label: String(action.label || "").trim(),
  };
};
