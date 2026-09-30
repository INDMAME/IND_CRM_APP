using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    // MMS - Defines the minimal request used to attach a ticket to an expense line. - 2026.08.04
    public class ExpenseSheetLineTicketRequest
    {
        [JsonPropertyName("fileId")]
        public string FileId { get; set; } = string.Empty;
    }

    // MMS - Describes the relationship state returned after an attach or detach command. - 2026.08.04
    public class ExpenseSheetLineTicketResultDto
    {
        [JsonPropertyName("HojaGastosId")]
        public string HojaGastosId { get; set; } = string.Empty;

        [JsonPropertyName("LineRecId")]
        public long LineRecId { get; set; }

        [JsonPropertyName("FileId")]
        public string FileId { get; set; } = string.Empty;

        [JsonPropertyName("TicketStatus")]
        public int? TicketStatus { get; set; }

        [JsonPropertyName("Changed")]
        public bool Changed { get; set; }
    }
}
