using IND_CRM_APP.Models.CRM;

namespace IND_CRM_APP.Services
{
    // Result categories for record-level mutation authorization.
    public enum ModuleRecordMutationPermissionStatus
    {
        Allowed,
        Unauthorized,
        Forbidden,
        NotFound,
        UpstreamError
    }

    // Identifies the CRM app/module scope used by visibility and mutation policies.
    public sealed record ModuleRecordMutationScope(
        string AppCode,
        string ModuleCode,
        bool IncludeCrmUserId = true);

    // Describes one owner-based mutation validation request.
    public sealed record ModuleRecordMutationValidationRequest(
        ModuleRecordMutationScope Scope,
        long? RecordId,
        string OwnerAxUserId,
        string OwnerSource = "",
        string OwnerName = "",
        string OwnerAlias = "",
        string Operation = "mutation");

    // Immutable result returned by the module record mutation permission service.
    public sealed record ModuleRecordMutationPermissionResult(
        ModuleRecordMutationPermissionStatus Status,
        string Message = "")
    {
        public bool IsAllowed => Status == ModuleRecordMutationPermissionStatus.Allowed;

        public static ModuleRecordMutationPermissionResult Allowed() =>
            new(ModuleRecordMutationPermissionStatus.Allowed);

        public static ModuleRecordMutationPermissionResult Unauthorized() =>
            new(ModuleRecordMutationPermissionStatus.Unauthorized);

        public static ModuleRecordMutationPermissionResult Forbidden(string message = "") =>
            new(ModuleRecordMutationPermissionStatus.Forbidden, message);

        public static ModuleRecordMutationPermissionResult NotFound(string message = "") =>
            new(ModuleRecordMutationPermissionStatus.NotFound, message);

        public static ModuleRecordMutationPermissionResult UpstreamError(string message = "") =>
            new(ModuleRecordMutationPermissionStatus.UpstreamError, message);
    }

    // Centralizes owner-based mutation policy checks for any module.
    public interface IModuleRecordMutationPermissionService
    {
        // Returns visible owners for a module scope, normalized for UI preloading.
        Task<IReadOnlyList<DataVisibilityVisibleUserDto>> GetVisibleUsersForViewAsync(
            string token,
            ModuleRecordMutationScope scope,
            string reason);

        // Validates whether the current session user can mutate one owner-scoped record.
        Task<ModuleRecordMutationPermissionResult> ValidateAsync(
            string token,
            ModuleRecordMutationValidationRequest request);
    }
}
