namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Represents a client (account) returned by Axapta.
    /// </summary>
    public class AccountDto
    {
        public string NombreComercial { get; set; } = string.Empty;
        public string RazonSocial { get; set; } = string.Empty;
        public string AccountNum { get; set; } = string.Empty;
        public string Origen { get; set; } = string.Empty;
    }
}
