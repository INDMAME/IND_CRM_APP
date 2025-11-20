namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Contacto asociado a un cliente Axapta.
    /// </summary>
    public class ContactoDto
    {
        public string Name { get; set; }
        public string Cargo { get; set; }
        public string Empresa { get; set; }
        public string RecId { get; set; }
        public string Origen { get; set; }
    }
}
