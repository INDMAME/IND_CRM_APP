namespace IND_CRM_APP.Models.ViewModels
{
    /// <summary>
    /// View model for reusable primary action buttons.
    /// </summary>
    public class PrimaryButtonModel
    {
        public string Id { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string? IconClass { get; set; }
        public string Type { get; set; } = "button";
        public string CssClass { get; set; } = string.Empty;
    }
}

