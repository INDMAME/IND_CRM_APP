namespace IND_CRM_APP.Models.CRM
{
    // Fuel price payload returned by /api/crm/expensesheets/fuel-price-km.
    public class FuelPriceKmDto
    {
        public decimal? PriceKm { get; set; }
        public string Source { get; set; } = string.Empty;
        public string TransDate { get; set; } = string.Empty;
    }
}
