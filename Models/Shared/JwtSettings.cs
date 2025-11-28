namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Configuración JWT para refresco desde el frontend MVC.
    /// </summary>
    public class JwtSettings
    {
        /// <summary>
        /// Minutos antes del vencimiento en que se debe refrescar el token.
        /// </summary>
        public double RefreshThresholdMinutes { get; set; } = 5.0;
    }
}
