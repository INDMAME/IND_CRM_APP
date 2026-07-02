using IND_CRM_APP.Infrastructure.Security.Modules;
using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Services
{
    // Resolves visit ownership, then delegates record mutation checks to the shared module service.
    public sealed class VisitMutationPermissionService : IVisitMutationPermissionService
    {
        private static readonly ModuleRecordMutationScope VisitScope = new(
            "CRM",
            INDModuleRegistry.ModuleVisitasGestion,
            IncludeCrmUserId: true);

        private readonly ICrmApiClient _apiClient;
        private readonly IModuleRecordMutationPermissionService _moduleRecordPermissions;
        private readonly ILogger<VisitMutationPermissionService> _logger;

        public VisitMutationPermissionService(
            ICrmApiClient apiClient,
            IModuleRecordMutationPermissionService moduleRecordPermissions,
            ILogger<VisitMutationPermissionService> logger)
        {
            _apiClient = apiClient;
            _moduleRecordPermissions = moduleRecordPermissions;
            _logger = logger;
        }

        // Returns normalized visible owners for the visit detail UI.
        public Task<IReadOnlyList<DataVisibilityVisibleUserDto>> GetVisibleVisitUsersForViewAsync(string token)
        {
            return _moduleRecordPermissions.GetVisibleUsersForViewAsync(token, VisitScope, "visit-detail-preload");
        }

        // Validates whether the current session user can mutate one visit record.
        public async Task<ModuleRecordMutationPermissionResult> ValidateAsync(string token, long recId)
        {
            try
            {
                _logger.LogInformation(
                    "Visit mutation permission validation started. RecId={RecId}",
                    recId);

                var activityResult = await _apiClient.GetActivityByRecIdAsync(token, recId);
                var activity = activityResult.Data;
                if (activity == null)
                {
                    _logger.LogWarning(
                        "Visit mutation permission denied. Reason=activity_not_found; RecId={RecId}; Message={Message}",
                        recId,
                        activityResult.GetMessageOrDefault(string.Empty));

                    return ModuleRecordMutationPermissionResult.NotFound(activityResult.GetMessageOrDefault(string.Empty));
                }

                return await ValidateActivityAsync(token, recId, activity, "visit-mutation");
            }
            catch (ApiException ex)
            {
                _logger.LogError(
                    ex,
                    "Upstream API error while resolving visit mutation owner. RecId={RecId}",
                    recId);
                return ModuleRecordMutationPermissionResult.UpstreamError();
            }
        }

        // Validates a visit activity when the controller already loaded the detail payload.
        public Task<ModuleRecordMutationPermissionResult> ValidateActivityAsync(
            string token,
            long recId,
            ActivityDto activity,
            string operation)
        {
            var ownerResolution = ResolveActivityOwnerAxUserId(activity);
            _logger.LogInformation(
                "Visit mutation permission owner resolved. RecId={RecId}; OwnerAxUserId={OwnerAxUserId}; OwnerSource={OwnerSource}; OwnerName={OwnerName}; OwnerAlias={OwnerAlias}; Operation={Operation}",
                recId,
                ownerResolution.OwnerAxUserId,
                ownerResolution.Source,
                SanitizeValue(activity.OwnerName),
                SanitizeValue(activity.OwnerAlias),
                SanitizeValue(operation));

            return _moduleRecordPermissions.ValidateAsync(
                token,
                new ModuleRecordMutationValidationRequest(
                    VisitScope,
                    recId,
                    ownerResolution.OwnerAxUserId,
                    ownerResolution.Source,
                    SanitizeValue(activity.OwnerName),
                    SanitizeValue(activity.OwnerAlias),
                    SanitizeValue(operation)));
        }

        private static string SanitizeValue(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? string.Empty : value.Trim();
        }

        private static string? NormalizeOptionalText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        private static (string Value, string Source) FirstNonEmptyWithSource(params (string? Value, string Source)[] values)
        {
            foreach (var (value, source) in values)
            {
                var normalized = NormalizeOptionalText(value);
                if (!string.IsNullOrWhiteSpace(normalized))
                    return (normalized, source);
            }

            return (string.Empty, string.Empty);
        }

        private static (string OwnerAxUserId, string Source) ResolveActivityOwnerAxUserId(ActivityDto? activity)
        {
            if (activity == null)
                return (string.Empty, string.Empty);

            return FirstNonEmptyWithSource(
                (activity.OwnerAxUserId, nameof(activity.OwnerAxUserId)),
                (activity.INDCreatedByUserId, nameof(activity.INDCreatedByUserId)),
                (activity.CreatedByUserId, nameof(activity.CreatedByUserId)),
                (activity.UserId, nameof(activity.UserId)));
        }
    }
}
