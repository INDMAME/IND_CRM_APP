namespace IND_CRM_APP.Models.ViewModels
{
    // View model for the React long-text editor page.
    public class TextEditorReactViewModel
    {
        public string FieldId { get; set; } = string.Empty;
        public string FieldLabel { get; set; } = string.Empty;
        public string FieldValue { get; set; } = string.Empty;
        public string? ReturnUrl { get; set; }
    }
}

