using System.Collections.Generic;

namespace IND_CRM_APP.Services.Enums
{
    // Centralized enum catalog used by controllers for normalization and labels.
    public interface ICrmEnumCatalog
    {
        string NormalizeTipoVisitaValue(string? raw);
        IReadOnlyDictionary<string, string> GetGastoTypeMap();
        string GetGastoTypeLabel(string? rawTypeValue);
    }
}
