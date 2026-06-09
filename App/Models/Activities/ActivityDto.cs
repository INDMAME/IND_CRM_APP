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
        public int? ContactMethod { get; set; }
        public string? Description { get; set; }
        public string? Comentarios { get; set; }
        public string? Antecedentes { get; set; }
        public string? Conclusiones { get; set; }
        // AX user id that owns the activity when the API returns ownership metadata.
        public string? OwnerAxUserId { get; set; }
        // Display name for the owner when available from the API.
        public string? OwnerName { get; set; }
        // Short owner alias when the full name is not returned.
        public string? OwnerAlias { get; set; }
        // Backward-compatible owner fields used by older AX/API payloads.
        public string? UserId { get; set; }
        public string? CreatedByUserId { get; set; }
        public string? INDCreatedByUserId { get; set; }

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
