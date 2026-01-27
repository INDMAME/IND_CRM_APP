namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Describes a validation issue returned by IND_CRM_API.
    /// </summary>
    public class IndValidationError
    {
        public string? Field { get; set; }
        public string? Message { get; set; }
    }
}

