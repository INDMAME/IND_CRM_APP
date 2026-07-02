using System.Collections.Generic;

namespace IND_CRM_APP.Services.Enums
{
    // Provides localized option lists for CRM enum-like dropdowns.
    public interface IINDCrmEnumLocalizer
    {
        IEnumerable<dynamic> GetActividadTypeItems();
        IEnumerable<dynamic> GetTipoVisitaItems();
        IEnumerable<dynamic> GetContactMethodItems();
        IEnumerable<dynamic> GetActividadOrigenItems();
        IEnumerable<dynamic> GetAsistenteTipoItems();
        // Expense sheet type items (GastoType).
        IEnumerable<dynamic> GetGastoTypeItems();
    }
}

