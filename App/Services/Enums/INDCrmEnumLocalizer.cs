using IND_CRM_APP.Infrastructure.Localization;
using Microsoft.Extensions.Localization;
using System.Collections.Generic;

namespace IND_CRM_APP.Services.Enums
{
    // Builds localized dropdown items for CRM enums using shared resources.
    public sealed class INDCrmEnumLocalizer : IINDCrmEnumLocalizer
    {
        private readonly IStringLocalizer<INDSharedResource> _sr;

        public INDCrmEnumLocalizer(IStringLocalizer<INDSharedResource> sr)
        {
            _sr = sr;
        }

        public IEnumerable<dynamic> GetActividadTypeItems()
        {
            return new[]
            {
                new { Value = "0", Text = _sr["Enum_None"].Value },
                new { Value = "1", Text = _sr["Enum_ActividadType_Fax"].Value },
                new { Value = "2", Text = _sr["Enum_ActividadType_Email"].Value },
                new { Value = "3", Text = _sr["Enum_ActividadType_PhoneCall"].Value },
                new { Value = "4", Text = _sr["Enum_ActividadType_Visit"].Value },
                new { Value = "5", Text = _sr["Enum_ActividadType_Task"].Value }
            };
        }

        public IEnumerable<dynamic> GetTipoVisitaItems()
        {
            return new[]
            {
                new { Value = "0", Text = _sr["Enum_None"].Value },
                new { Value = "1", Text = _sr["Enum_TipoVisita_Commercial"].Value },
                new { Value = "2", Text = _sr["Enum_TipoVisita_Technical"].Value }
            };
        }

        public IEnumerable<dynamic> GetContactMethodItems()
        {
            return new[]
            {
                new { Value = "0", Text = _sr["Enum_ContactMethod_InPerson"].Value },
                new { Value = "1", Text = _sr["Enum_ContactMethod_PhoneCall"].Value },
                new { Value = "2", Text = _sr["Enum_ContactMethod_OnlineMeeting"].Value }
            };
        }

        public IEnumerable<dynamic> GetActividadOrigenItems()
        {
            return new[]
            {
                new { Value = "0", Text = _sr["Enum_None"].Value },
                new { Value = "1", Text = _sr["Enum_ActividadOrigen_Consulta"].Value },
                new { Value = "2", Text = _sr["Enum_ActividadOrigen_Oferta"].Value },
                new { Value = "3", Text = _sr["Enum_ActividadOrigen_Evento"].Value },
                new { Value = "4", Text = _sr["Enum_ActividadOrigen_Usuario"].Value },
                new { Value = "5", Text = _sr["Enum_ActividadOrigen_CampanaMarketing"].Value },
                new { Value = "6", Text = _sr["Enum_ActividadOrigen_ClientePotencial"].Value },
                new { Value = "7", Text = _sr["Enum_ActividadOrigen_ContactoEvento"].Value },
                new { Value = "8", Text = _sr["Enum_ActividadOrigen_Cliente"].Value },
                new { Value = "9", Text = _sr["Enum_ActividadOrigen_Proveedor"].Value },
                new { Value = "10", Text = _sr["Enum_ActividadOrigen_Proyecto"].Value },
                new { Value = "11", Text = _sr["Enum_ActividadOrigen_ProveedorPotencial"].Value }
            };
        }

        public IEnumerable<dynamic> GetAsistenteTipoItems()
        {
            return new[]
            {
                new { Value = "0", Text = _sr["Enum_AsistenteTipo_None"].Value },
                new { Value = "1", Text = _sr["Enum_AsistenteTipo_Tecnico"].Value },
                new { Value = "2", Text = _sr["Enum_AsistenteTipo_Commercial"].Value }
            };
        }

        // Expense sheet type items (GastoType).
        public IEnumerable<dynamic> GetGastoTypeItems()
        {
            return new[]
            {
                new { Value = "0", Text = _sr["Enum_None"].Value },
                new { Value = "1", Text = _sr["Enum_GastoType_Peaje"].Value },
                new { Value = "2", Text = _sr["Enum_GastoType_Parking"].Value },
                new { Value = "3", Text = _sr["Enum_GastoType_Km"].Value },
                new { Value = "4", Text = _sr["Enum_GastoType_Desayuno"].Value },
                new { Value = "5", Text = _sr["Enum_GastoType_Comida"].Value },
                new { Value = "6", Text = _sr["Enum_GastoType_Cena"].Value },
                new { Value = "7", Text = _sr["Enum_GastoType_Hotel"].Value },
                new { Value = "8", Text = _sr["Enum_GastoType_Varios"].Value },
                new { Value = "9", Text = _sr["Enum_GastoType_MontajeNacional"].Value },
                new { Value = "10", Text = _sr["Enum_GastoType_MontajeNacionalFestivo"].Value },
                new { Value = "11", Text = _sr["Enum_GastoType_MontajeInternacional"].Value },
                new { Value = "12", Text = _sr["Enum_GastoType_MontajeInternacionalFestivo"].Value },
                new { Value = "13", Text = _sr["Enum_GastoType_DiaViajeNacional"].Value },
                new { Value = "14", Text = _sr["Enum_GastoType_Taxi"].Value },
                new { Value = "15", Text = _sr["Enum_GastoType_DiaViajeFestivoNacional"].Value },
                new { Value = "16", Text = _sr["Enum_GastoType_DiaViajeInternacional"].Value },
                new { Value = "17", Text = _sr["Enum_GastoType_DiaViajeFestivoInternacional"].Value },
                new { Value = "18", Text = _sr["Enum_GastoType_Horas"].Value },
                new { Value = "19", Text = _sr["Enum_GastoType_Propinas"].Value },
                new { Value = "20", Text = _sr["Enum_GastoType_Gasolina"].Value }
            };
        }
    }
}

