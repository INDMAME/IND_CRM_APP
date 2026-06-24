using System.Collections.Generic;
using IND_CRM_APP.Models.CRM;

namespace IND_CRM_APP.Services.Enums
{
    // Centralized enum catalog used by controllers for normalization and labels.
    public interface ICrmEnumCatalog
    {
        string NormalizeTipoVisitaValue(string? raw);
        string NormalizeContactMethodValue(string? raw);
        IEnumerable<dynamic> GetOptionsByAxEnumName(
            IEnumerable<CrmEnumCatalogDto>? catalog,
            string axEnumName,
            IEnumerable<dynamic>? fallback = null);
        bool HasUsableOptionsByAxEnumName(
            IEnumerable<CrmEnumCatalogDto>? catalog,
            string axEnumName);
        IReadOnlyDictionary<string, string> GetGastoTypeMap();
        string GetGastoTypeLabel(string? rawTypeValue);
    }
}
