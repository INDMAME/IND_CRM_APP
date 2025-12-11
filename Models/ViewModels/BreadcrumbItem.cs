using System;

namespace IND_CRM_APP.Models.ViewModels
{
    public class BreadcrumbItem
    {
        public string Text { get; set; } = string.Empty;
        public string? Url { get; set; }
        public bool IsCurrent { get; set; }
    }
}
