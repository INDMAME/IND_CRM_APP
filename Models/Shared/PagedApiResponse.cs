namespace IND_CRM_APP.Models.Shared
{
    public class PagedApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = "";
        [System.Text.Json.Serialization.JsonPropertyName("items")]
        public IEnumerable<T> Items { get; set; } = new List<T>();

        // Algunas API devuelven el listado bajo la clave "data"
        [System.Text.Json.Serialization.JsonPropertyName("data")]
        public IEnumerable<T> Data { get; set; } = new List<T>();

        /// <summary>
        /// Devuelve el listado disponible (Items o Data).
        /// </summary>
        public IEnumerable<T> GetAnyItems()
        {
            if (Items != null && Items.Any()) return Items;
            if (Data != null && Data.Any()) return Data;
            return Enumerable.Empty<T>();
        }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int Total { get; set; }
    }
}
