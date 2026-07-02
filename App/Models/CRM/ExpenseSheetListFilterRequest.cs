namespace IND_CRM_APP.Models.CRM
{
    // Filter payload for expense sheet list screen.
    public class ExpenseSheetListFilterRequest
    {
        public string Filter { get; set; } = string.Empty;
        public int? BilledMode { get; set; }
        public string FromDate { get; set; } = string.Empty;
        public string ToDate { get; set; } = string.Empty;
        public string ProjectId { get; set; } = string.Empty;
        public string HojaGastosId { get; set; } = string.Empty;
        public string CurrencyCode { get; set; } = string.Empty;
        public int? ExpenseSheetStatus { get; set; }
        public int? ReimbursableExpense { get; set; }
        public bool IncludeSubordinates { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 6;
    }
}
