namespace IND_CRM_APP.Models
{
    /// <summary>
    /// Representa la estructura de una persona obtenida desde Axapta.
    /// </summary>
    /// <remarks>
    /// Este modelo se utiliza tanto para las consultas del listado de personas
    /// como para los registros nuevos creados a través de la API.
    /// </remarks>
    public class PersonRequest
    {
        /// <summary>
        /// Nombre completo de la persona.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Código identificador único de la persona en Axapta.
        /// </summary>
        public string Code { get; set; }
    }
} 