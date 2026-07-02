using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Activities;

namespace IND_CRM_APP.Services
{
    // Resolves VISITAS_GESTION ownership and delegates policy checks to the shared module service.
    public interface IVisitMutationPermissionService
    {
        // Returns visible owners for VISITAS_GESTION, normalized for UI preloading.
        Task<IReadOnlyList<DataVisibilityVisibleUserDto>> GetVisibleVisitUsersForViewAsync(string token);

        // Validates whether the current session user can mutate one visit record.
        Task<ModuleRecordMutationPermissionResult> ValidateAsync(string token, long recId);

        // Validates a visit activity when the controller already loaded it.
        Task<ModuleRecordMutationPermissionResult> ValidateActivityAsync(
            string token,
            long recId,
            ActivityDto activity,
            string operation);
    }
}
