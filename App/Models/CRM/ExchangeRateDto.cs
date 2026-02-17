namespace IND_CRM_APP.Models.CRM
{
    // Exchange rate payload returned by /api/system/exchange-rate.
    public class ExchangeRateDto
    {
        public string BaseCurrency { get; set; } = string.Empty;
        public string TargetCurrency { get; set; } = string.Empty;
        public decimal Rate { get; set; }
        public string Date { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
    }
}
