using Microsoft.AspNetCore.Html;

namespace IND_CRM_APP.Models.ViewModels
{
    public class ModalViewModel
    {
        public string Id { get; set; } = "modal";
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string PrimaryText { get; set; } = "Aceptar";
        public string? SecondaryText { get; set; } = "Cancelar";
        public string PrimaryButtonCss { get; set; } = string.Empty;
        public string SecondaryButtonCss { get; set; } = string.Empty;
        public bool ShowCloseButton { get; set; } = true;
        public IHtmlContent? Body { get; set; }
    }
}
