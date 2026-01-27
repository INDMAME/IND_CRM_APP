namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// JWT settings for refresh from the MVC frontend.
    /// </summary>
    public class JwtSettings
    {
        /// <summary>
        /// Minutes before expiry when the token should be refreshed.
        /// </summary>
        public double RefreshThresholdMinutes { get; set; } = 5.0;
    }
}
