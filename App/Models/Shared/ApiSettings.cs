namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Model for api settings data.
    /// </summary>
    public class ApiSettings
    {
        public string BaseUrl { get; set; } = "";
        public int TimeoutSeconds { get; set; } = 30;
    }
}
