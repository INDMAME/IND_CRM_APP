namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Representa un cliente (cuenta) devuelto por Axapta.
    /// </summary>
    public class AccountDto
    {
        public string NombreComercial { get; set; }
        public string RazonSocial { get; set; }
        public string AccountNum { get; set; }
        public string Origen { get; set; }
    }
}
