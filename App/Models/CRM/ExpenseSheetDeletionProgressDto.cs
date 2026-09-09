namespace IND_CRM_APP.Models.CRM
{
    // Describes durable deletion progress without exposing ticket or blob inventory.
    public sealed class ExpenseSheetDeletionProgressDto
    {
        public bool Exists { get; set; }
        public bool SheetDeleted { get; set; }
        public bool DeleteAttempted { get; set; }
        public bool Complete { get; set; }
        public bool MetadataAvailable { get; set; }
    }
}
