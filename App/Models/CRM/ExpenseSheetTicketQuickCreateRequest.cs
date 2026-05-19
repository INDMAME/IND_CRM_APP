using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Form payload for one-step ticket quick creation from image.
    public class ExpenseSheetTicketQuickCreateRequest
    {
        [JsonPropertyName("currencyCode")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? CurrencyCode { get; set; }

        [JsonPropertyName("description")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Description { get; set; }

        [JsonPropertyName("comentario")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Comentario { get; set; }

        [JsonPropertyName("existingHojaGastosId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ExistingHojaGastosId { get; set; }

        [JsonPropertyName("projId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ProjId { get; set; }

        [JsonPropertyName("projectId")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? ProjectId { get; set; }
    }
}
