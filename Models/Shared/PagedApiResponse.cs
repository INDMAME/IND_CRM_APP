namespace IND_CRM_APP.Models.Shared
{
    public class PagedApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = "";
        public IEnumerable<T> Items { get; set; } = new List<T>();
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int Total { get; set; }
    }
}
