namespace IND_CRM_APP.Services.Enums
{
    /// <summary>
    /// Helper centralizado para todos los enums CRM utilizados
    /// en la aplicación.
    /// </summary>
    public static class CrmEnumHelper
    {
        public static IEnumerable<dynamic> GetActividadTypeItems()
        {
            return new[]
            {
                new { Value = "0", Text = "Ninguno" },
                new { Value = "1", Text = "Fax" },
                new { Value = "2", Text = "Email" },
                new { Value = "3", Text = "Llamada de Telefono" },
                new { Value = "4", Text = "Visita" },
                new { Value = "5", Text = "Tarea" }
            };
        }

        public static IEnumerable<dynamic> GetTipoVisitaItems()
        {
            return new[]
            {
                new { Value = "0", Text = "Ninguno" },
                new { Value = "1", Text = "Comercial" },
                new { Value = "2", Text = "Técnica" }
            };
        }

        public static IEnumerable<dynamic> GetActividadOrigenItems()
        {
            return new[]
            {
                new { Value = "0", Text = "Ninguno" },
                new { Value = "1", Text = "Consulta" },
                new { Value = "2", Text = "Oferta" },
                new { Value = "3", Text = "Evento" },
                new { Value = "4", Text = "Usuario" },
                new { Value = "5", Text = "Campaña Marketing" },
                new { Value = "6", Text = "Cliente Potencial" },
                new { Value = "7", Text = "Contacto Evento" },
                new { Value = "8", Text = "Cliente" },
                new { Value = "9", Text = "Proveedor" },
                new { Value = "10", Text = "Proyecto" },
                new { Value = "11", Text = "Proveedor Potencial" }
            };
        }

        public static IEnumerable<dynamic> GetAsistenteTipoItems()
        {
            return new[]
            {
                new { Value = "0", Text = "Sin asistente" },
                new { Value = "1", Text = "Técnico" },
                new { Value = "2", Text = "Comercial" }
            };
        }
    }
}
