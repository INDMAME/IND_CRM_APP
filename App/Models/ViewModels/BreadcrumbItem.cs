using System;

namespace IND_CRM_APP.Models.ViewModels
{
    /// <summary>
    /// Model for breadcrumb item data.
    /// </summary>
    public class BreadcrumbItem
    {
        public string Text { get; set; } = string.Empty;
        public string? Url { get; set; }
        public bool IsCurrent { get; set; }
    }
}
