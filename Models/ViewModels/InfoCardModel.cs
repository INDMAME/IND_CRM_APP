namespace IND_CRM_APP.Models.ViewModels
{
    /// <summary>
    /// View model for reusable info cards.
    /// </summary>
    public class InfoCardModel
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Accent { get; set; }
        public IEnumerable<(string Label, string Value)> Lines { get; set; } = Enumerable.Empty<(string, string)>();
    }
}

