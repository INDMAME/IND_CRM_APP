using System;
using System.Collections.Generic;
using System.Linq;

namespace IND_CRM_APP.Infrastructure.Security
{
    // Registry for module codes and their route prefixes.
    public static class INDModuleRegistry
    {
        public const string ModuleVisitasCreacion = "VISITAS_CREACION";
        public const string ModuleVisitasHistorial = "VISITAS_VISITAS";

        private static readonly IReadOnlyDictionary<string, string[]> ModulePrefixes =
            new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
            {
                [ModuleVisitasCreacion] = new[]
                {
                    "/Visitas/Create",
                    "/Visitas/CreateActivity",
                    "/Visitas/CreateVisitaAsistente",
                    "/Visitas/GetAccountsForDropdown",
                    "/Visitas/GetContactsForDropdown",
                    "/Visitas/TranscribeSpeech"
                },
                [ModuleVisitasHistorial] = new[]
                {
                    "/Historial/History",
                    "/Historial/GetActivities",
                    "/Visitas/Detalle",
                    "/Visitas/GetActivityByCode",
                    "/Visitas/UpdateActivity",
                    "/Visitas/UpdateAsistenteTipo",
                    "/Visitas/DeleteActivity"
                }
            };

        public static bool TryResolveModule(string path, out string moduleCode)
        {
            moduleCode = string.Empty;
            if (string.IsNullOrWhiteSpace(path))
                return false;

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
    }
}
