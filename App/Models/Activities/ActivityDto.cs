namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// Model for activity dto data.
    /// </summary>
    public class ActivityDto
    {
        public string? ActividadId { get; set; }
        public string? RecId { get; set; }
        public string? AccountNum { get; set; }
        public string? Name { get; set; }
        // Alias for APIs that send "Nombre".
        public string? Nombre { get => Name; set => Name = value; }
        public string? TransDate { get; set; }
        public string? Country { get; set; }
        public string? ActividadType { get; set; }
        public string? TipoVisita { get; set; }
        public string? VisitType { get => TipoVisita; set => TipoVisita = value; }
        public string? Description { get; set; }
        public string? Comentarios { get; set; }
        public string? Antecedentes { get; set; }
        public string? Conclusiones { get; set; }

        public List<ActivityAsistenteDto>? Asistentes { get; set; }
    }
    /// <summary>
    /// Model for activity asistente dto data.
    /// </summary>

    public class ActivityAsistenteDto
    {
        public string? AsistenteId { get; set; }
        public string? AsistenteTipo { get; set; }
        public string? AsistenteCargo { get; set; }
    }
}
