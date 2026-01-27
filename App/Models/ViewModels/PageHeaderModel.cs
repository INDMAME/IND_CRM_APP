namespace IND_CRM_APP.Models.ViewModels
    {
        /// <summary>
        /// View model for reusable page headers.
        /// </summary>
        public class PageHeaderModel
        {
            public string Title { get; set; } = string.Empty;
            public string? Subtitle { get; set; }
            public string? IconClass { get; set; }
            public string? Badge { get; set; }

            // Optional raw HTML for action area (e.g., buttons/links)
            public string? ActionsHtml { get; set; }
        }
    }
