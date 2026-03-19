using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // Request payload for asking AI about the current expense sheet list.
    public class ExpenseSheetsAskRequest
    {
        [JsonPropertyName("question")]
        public string? Question { get; set; }

        [JsonPropertyName("answerInstructions")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? AnswerInstructions { get; set; }

        [JsonPropertyName("listRequest")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public ExpenseSheetListApiRequest? ListRequest { get; set; }

        [JsonPropertyName("sourceJson")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public JsonElement? SourceJson { get; set; }
    }

    // Response data returned by the expense sheet AI ask endpoint.
    public class ExpenseSheetsAskResponseData
    {
        public string? Answer { get; set; }

        public string? Model { get; set; }

        public string? SourceKey { get; set; }

        public JsonElement? FiltersApplied { get; set; }

        public int? TotalSourceRecords { get; set; }

        public int? RecordsSentToModel { get; set; }

        public string? RetrievalMode { get; set; }

        public bool? Truncated { get; set; }

        public List<string>? Warnings { get; set; }
    }
}
