using System.Text.Json.Serialization;
using System.Linq;

namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Standard IND paged response envelope for list endpoints.
    /// Mirrors IndPagedResponse<T> from the backend.
    /// </summary>
    public class PagedApiResponse<T> : ApiResponse<IEnumerable<T>>
    {
        [JsonPropertyName("items")]
        public IEnumerable<T>? Items { get; set; }

        [JsonConverter(typeof(JsonIntNullToZeroConverter))]
        public int Total { get; set; }
        [JsonConverter(typeof(JsonIntNullToZeroConverter))]
        public int Page { get; set; }
        [JsonConverter(typeof(JsonIntNullToZeroConverter))]
        public int PageSize { get; set; }

        /// <summary>
        /// Returns Items, DataItems or Data (from base) in that order.
        /// </summary>
        public IEnumerable<T> GetAnyItems()
        {
            if (Items != null && Items.Any()) return Items;
            if (Data != null && Data.Any()) return Data;
            return Enumerable.Empty<T>();
        }
    }
}
