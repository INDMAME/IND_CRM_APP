namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Representa la configuración base para la conexión con la API de Axapta.
    /// </summary>
    /// <remarks>
    /// Se utiliza junto con <see cref="Microsoft.Extensions.Options.IOptions{T}"/> 
    /// para inyectar los valores definidos en los archivos *appsettings.json*.
    /// </remarks>
    public class ApiSettings
    {
        /// <summary>
        /// URL base del servicio API remoto.
        /// </summary>
        public string BaseUrl { get; set; } = string.Empty;
    }
}
