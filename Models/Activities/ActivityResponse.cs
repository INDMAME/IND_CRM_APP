using System.Collections.Generic;

namespace IND_CRM_APP.Models.Activities
{
    public class ActivityResponse
    {
        public string ActividadId { get; set; }
        public string Name { get; set; }
        public string TransDate { get; set; }
        public string Country { get; set; }
        public string ActividadType { get; set; }
        public string Description { get; set; }
        public List<AsistenteResponse> Asistentes { get; set; }
    }
}