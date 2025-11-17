namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Modelo que representa un proyecto recuperado desde el sistema Axapta.
    /// </summary>
    /// <remarks>
    /// Se utiliza para la carga de proyectos mediante llamadas a la API 
    /// y para renderizar la información en la interfaz web.
    /// </remarks>
    public class ProjectResponse
    {
        /// <summary>
        /// Identificador único del proyecto.
        /// </summary>
        public string Id { get; set; } = string.Empty;

        /// <summary>
        /// Nombre o descripción principal del proyecto.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Nombre del cliente asociado al proyecto.
        /// </summary>
        public string Client { get; set; } = string.Empty;
    }
}
