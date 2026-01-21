namespace IND_CRM_APP.Infrastructure.Security
{
    // Shared access right levels for module permissions.
    public static class IndAccessRights
    {
        public const int NoAccess = 0;
        public const int View = 1;
        public const int Edit = 2;
        public const int Add = 3;
        public const int FullAccess = 4;
    }
}
