namespace IND_CRM_APP.Models.Activities
{
    public class ActivityDto
    {
        public string? ActividadId { get; set; }
        public string? Name { get; set; }
        public string? TransDate { get; set; }
        public string? Country { get; set; }
        public string? ActividadType { get; set; }
        public string? Description { get; set; }

        public List<ActivityAsistenteDto>? Asistentes { get; set; }
    }

    public class ActivityAsistenteDto
    {
        public string? AsistenteId { get; set; }
        public string? AsistenteTipo { get; set; }
        public string? AsistenteCargo { get; set; }
    }
}
