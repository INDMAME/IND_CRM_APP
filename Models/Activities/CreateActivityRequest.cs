namespace IND_CRM_APP.Models.Activities
{
    public class CreateActivityRequest
    {
        public string AccountNum { get; set; }
        public string VisitType { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public string TransDate { get; set; }
        public string Comentarios { get; set; }
        public string Antecedentes { get; set; }
        public string Conclusiones { get; set; }
    }
}
