namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Catalog values available for one AX enum in one company and app.
    /// </summary>
    public class CrmEnumCatalogDto
    {
        public string Company { get; set; } = string.Empty;
        public string AppCode { get; set; } = string.Empty;
        public string AxEnumName { get; set; } = string.Empty;
        public int? AxEnumId { get; set; }
        public bool Found { get; set; }
        public List<CrmEnumOptionDto> Options { get; set; } = new();
    }

    /// <summary>
    /// Public option for one configured AX enum value.
    /// </summary>
    public class CrmEnumOptionDto
    {
        public int? Value { get; set; }
        public int? EnumIndex { get; set; }
        public string Label { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Active { get; set; }
        public int? SortOrder { get; set; }
        public long? AxEnumsTableRefRecId { get; set; }
    }
}
