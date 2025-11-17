namespace IND_CRM_APP.Models.Activities
{
    public class CreateActivityRequest
    {
        public string accountNum { get; set; }
        public string actividadType { get; set; }
        public string visitType { get; set; }
        public string userId { get; set; }
        public string description { get; set; }
        public string origen { get; set; }
        public string transDate { get; set; }
        public string comentarios { get; set; }
        public string antecedentes { get; set; }
        public string conclusiones { get; set; }
    }
}

