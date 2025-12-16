using System.Collections.Generic;

namespace IND_CRM_APP.Services.Enums
{
    // Provides localized option lists for CRM enum-like dropdowns.
    public interface IINDCrmEnumLocalizer
    {
        IEnumerable<dynamic> GetActividadTypeItems();
        IEnumerable<dynamic> GetTipoVisitaItems();
        IEnumerable<dynamic> GetActividadOrigenItems();
        IEnumerable<dynamic> GetAsistenteTipoItems();
    }
}

