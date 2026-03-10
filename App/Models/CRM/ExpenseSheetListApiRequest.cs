using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Request payload for the expense sheets list API endpoint.
    public class ExpenseSheetListApiRequest
    {
        [JsonPropertyName("filter")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Filter { get; set; }

        [JsonPropertyName("billedMode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? BilledMode { get; set; }

        [JsonPropertyName("createdDateFrom")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CreatedDateFrom { get; set; }

        [JsonPropertyName("createdDateTo")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CreatedDateTo { get; set; }

        [JsonPropertyName("projId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ProjId { get; set; }

        [JsonPropertyName("currencyCode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CurrencyCode { get; set; }

        [JsonPropertyName("expenseSheetStatus")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? ExpenseSheetStatus { get; set; }

        [JsonPropertyName("includeSubordinates")]
        public bool IncludeSubordinates { get; set; }

        [JsonPropertyName("page")]
        public int Page { get; set; } = 1;

        [JsonPropertyName("pageSize")]
        public int PageSize { get; set; } = 50;
    }
}
