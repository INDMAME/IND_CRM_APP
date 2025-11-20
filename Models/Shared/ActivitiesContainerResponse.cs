using IND_CRM_APP.Models.Activities;

namespace IND_CRM_APP.Models.Shared
{
    public class ActivitiesContainerResponse
    {
        public int Total { get; set; }
        public List<ActivityDto> Items { get; set; }
    }
}
