namespace IND_CRM_APP.Models.Shared
{
    // Configures how long a cached auth context can stay idle before a refresh.
    public class ContextSessionSettings
    {
        public int IdleRefreshMinutes { get; set; } = 20;
        public int RefreshBeforeExpiryMinutes { get; set; } = 5;
    }
}
