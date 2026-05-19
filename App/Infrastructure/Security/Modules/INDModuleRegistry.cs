using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace IND_CRM_APP.Infrastructure.Security.Modules
{
    // Registry for module codes and their route prefixes.
    public static class INDModuleRegistry
    {
        public const string ModuleVisitasGestion = "VISITAS_GESTION";
        public const string ModuleGastosHojaGasto = "GASTOS_HOJA_GASTO";
        public const string ModuleGastosTickets = "GASTOS_TICKETS";

        private static readonly IReadOnlyDictionary<string, string[]> ModulePrefixes =
            new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
            {
                [ModuleVisitasGestion] = new[]
                {
                    ModuleVisitasGestion,
                    "VISITAS/GESTION",
                    "VISITAS_GESTION",
                    "VISITAS/CREACION",
                    "/Visitas/Create",
                    "/Visitas/CreateActivity",
                    "/Visitas/CreateVisitaAsistente",
                    "VISITAS/HISTORIAL",
                    "/Historial",
                    "/Visitas/Detalle",
                    "/Visitas/UpdateActivity",
                    "/Visitas/DeleteActivity",
                    "/Visitas/UpdateAsistenteTipo",
                    "/Visitas/GetActivityByCode",
                    "/Visitas/GetAccountsForDropdown",
                    "/Visitas/GetContactsForDropdown"
                },
                [ModuleGastosTickets] = new[]
                {
                    ModuleGastosTickets,
                    "GASTOS_TICKETS",
                    "GASTO_TICKETS",
                    "GASTOS/TICKETS",
                    "/Gastos/Tickets",
                    "/Gastos/ApiExpenseSheetTicket",
                    "/Gastos/ApiExpenseSheetTickets",
                    "/api/crm/expensesheets/tickets"
                },
                [ModuleGastosHojaGasto] = new[]
                {
                    ModuleGastosHojaGasto,
                    "GASTOS_HOJA_GASTO",
                    "GASTO_HOJA_GASTO",
                    "GASTOS/HOJAS",
                    "GASTOS_HOJAS_GASTOS",
                    "/Gastos",
                    "/Gastos/ExpenseSheets",
                    "/Gastos/ExpenseSheetDetail",
                    "/Gastos/ExpenseSheetLineDetail",
                    "/Gastos/ListExpenseSheets",
                    "/Gastos/GetExpenseSheetDetail",
                    "/Gastos/GetExpenseSheetLineDetail",
                    "/Gastos/CreateExpenseSheet",
                    "/Gastos/UpdateExpenseSheetHeader",
                    "/Gastos/UpdateExpenseSheetLine",
                    "/Gastos/DeleteExpenseSheet",
                    "/Gastos/DeleteExpenseSheetLine",
                    "/Gastos/GetProjectsForDropdown",
                    "/api/crm/projects/list",
                    "/api/crm/expensesheets",
                    "/api/system/exchange-rate",
                    "/api/ia/service/expensefromticket",
                    "/api/ia/service/expensesheets/ask"
                }
            };

        // Shared endpoints can be used by multiple modules.
        private static readonly IReadOnlyDictionary<string, string[]> SharedRouteCandidates =
            new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
            {
                ["/Visitas/GetAccountsForDropdown"] = new[]
                {
                    ModuleVisitasGestion
                },
                ["/Visitas/TranscribeSpeech"] = new[]
                {
                    ModuleVisitasGestion
                },
                ["/TextEditorReact"] = new[]
                {
                    ModuleVisitasGestion
                },
                ["/api/ia/service/expensefromticket"] = new[]
                {
                    ModuleGastosHojaGasto,
                    ModuleGastosTickets
                }
            };

        // Known module code aliases mapped to a canonical module code.
        private static readonly IReadOnlyDictionary<string, string[]> ModuleAliases =
            new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
            {
                [ModuleVisitasGestion] = new[]
                {
                    ModuleVisitasGestion,
                    "VISITAS/GESTION",
                    "VISITAS_GESTION"
                },
                [ModuleGastosTickets] = new[]
                {
                    ModuleGastosTickets,
                    "GASTOS_TICKETS",
                    "GASTO_TICKETS",
                    "GASTOS/TICKETS"
                },
                [ModuleGastosHojaGasto] = new[]
                {
                    ModuleGastosHojaGasto,
                    "GASTOS_HOJA_GASTO",
                    "GASTO_HOJA_GASTO",
                    "GASTOS/HOJAS",
                    "GASTOS_HOJAS_GASTOS"
                }
            };

        private static readonly IReadOnlyDictionary<string, string> NormalizedAliasToCanonical =
            BuildNormalizedAliasMap();

        public static bool TryResolveModule(string path, out string moduleCode)
        {
            moduleCode = string.Empty;
            if (string.IsNullOrWhiteSpace(path))
                return false;

            // Ticket routes must resolve first because "/Gastos" and "/api/crm/expensesheets"
            // are generic prefixes used by other expense features.
            if (IsGastosTicketsPath(path))
            {
                moduleCode = ModuleGastosTickets;
                return true;
            }

            foreach (var entry in ModulePrefixes)
            {
                if (entry.Value.Any(prefix =>
                        path.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)))
                {
                    moduleCode = entry.Key;
                    return true;
                }
            }

            return false;
        }

        // Detects explicit ticket paths to avoid accidental capture by generic expense prefixes.
        private static bool IsGastosTicketsPath(string path)
        {
            return path.StartsWith("/Gastos/Tickets", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/Gastos/ApiExpenseSheetTicket", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/Gastos/ApiExpenseSheetTickets", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/api/crm/expensesheets/tickets", StringComparison.OrdinalIgnoreCase);
        }

        // Returns candidate modules for shared endpoints.
        public static bool TryResolveSharedRouteCandidates(string path, out string[] moduleCodes)
        {
            moduleCodes = Array.Empty<string>();
            if (string.IsNullOrWhiteSpace(path))
                return false;

            foreach (var entry in SharedRouteCandidates)
            {
                if (path.StartsWith(entry.Key, StringComparison.OrdinalIgnoreCase))
                {
                    moduleCodes = entry.Value;
                    return true;
                }
            }

            return false;
        }

        // Normalizes a module code for resilient comparisons.
        public static string NormalizeModuleCode(string code)
        {
            if (string.IsNullOrWhiteSpace(code))
                return string.Empty;

            var normalized = code.Trim().Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder(normalized.Length);
            foreach (var ch in normalized)
            {
                var category = CharUnicodeInfo.GetUnicodeCategory(ch);
                if (category == UnicodeCategory.NonSpacingMark)
                    continue;

                if (char.IsLetterOrDigit(ch))
                {
                    sb.Append(char.ToUpperInvariant(ch));
                }
            }

            return sb.ToString();
        }

        // Returns a canonical module code for a raw module code if it is known.
        public static bool TryGetCanonicalModuleCode(string rawCode, out string canonical)
        {
            canonical = string.Empty;
            if (string.IsNullOrWhiteSpace(rawCode))
                return false;

            var key = NormalizeModuleCode(rawCode);
            if (string.IsNullOrWhiteSpace(key))
                return false;

            if (NormalizedAliasToCanonical.TryGetValue(key, out var value) && !string.IsNullOrWhiteSpace(value))
            {
                canonical = value;
                return true;
            }

            return false;
        }

        // Checks if a raw module code matches a canonical or alias code.
        public static bool MatchesModuleCode(string rawCode, string moduleCode)
        {
            if (string.IsNullOrWhiteSpace(rawCode) || string.IsNullOrWhiteSpace(moduleCode))
                return false;

            var rawCanonical = TryGetCanonicalModuleCode(rawCode, out var canonicalRaw)
                ? canonicalRaw
                : rawCode;

            var targetCanonical = TryGetCanonicalModuleCode(moduleCode, out var canonicalTarget)
                ? canonicalTarget
                : moduleCode;

            return string.Equals(
                NormalizeModuleCode(rawCanonical),
                NormalizeModuleCode(targetCanonical),
                StringComparison.OrdinalIgnoreCase);
        }

        private static IReadOnlyDictionary<string, string> BuildNormalizedAliasMap()
        {
            var map = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

            foreach (var entry in ModuleAliases)
            {
                foreach (var alias in entry.Value ?? Array.Empty<string>())
                {
                    var normalized = NormalizeModuleCode(alias);
                    if (string.IsNullOrWhiteSpace(normalized))
                        continue;

                    if (!map.ContainsKey(normalized))
                        map[normalized] = entry.Key;
                }
            }

            return map;
        }
    }
}
