namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Contacto asociado a un cliente Axapta.
    /// </summary>
    public class ContactoDto
    {
        public string Name { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string Empresa { get; set; } = string.Empty;
        public string RecId { get; set; } = string.Empty;
        public string Origen { get; set; } = string.Empty;
        public string AccountNum { get; set; } = string.Empty;
    }
}
