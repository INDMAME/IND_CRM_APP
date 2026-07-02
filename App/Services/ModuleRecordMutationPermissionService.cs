using System.Globalization;
using System.Text;
using IND_CRM_APP.Infrastructure.Security.Modules;
using IND_CRM_APP.Infrastructure.Security.Permissions;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Services
{
    // Applies generic module record-level mutation policy using AX owner ids.
    public sealed class ModuleRecordMutationPermissionService : IModuleRecordMutationPermissionService
    {
        private readonly ICrmApiClient _apiClient;
        private readonly IIndAuthContextService _authContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<ModuleRecordMutationPermissionService> _logger;

        public ModuleRecordMutationPermissionService(
            ICrmApiClient apiClient,
            IIndAuthContextService authContext,
            IHttpContextAccessor httpContextAccessor,
            ILogger<ModuleRecordMutationPermissionService> logger)
        {
            _apiClient = apiClient;
            _authContext = authContext;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }

        // Returns normalized visible owners without failing the page render.
        public async Task<IReadOnlyList<DataVisibilityVisibleUserDto>> GetVisibleUsersForViewAsync(
            string token,
            ModuleRecordMutationScope scope,
            string reason)
        {
            try
            {
                return await LoadVisibleUsersAsync(token, scope, reason);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(
                    ex,
                    "Could not preload visible users for module scope. AppCode={AppCode}; ModuleCode={ModuleCode}; Reason={Reason}",
                    SanitizeValue(scope.AppCode),
                    SanitizeValue(scope.ModuleCode),
                    SanitizeValue(reason));
                return Array.Empty<DataVisibilityVisibleUserDto>();
            }
        }

        // Validates one owner-scoped record mutation with a restrictive default.
        public async Task<ModuleRecordMutationPermissionResult> ValidateAsync(
            string token,
            ModuleRecordMutationValidationRequest request)
        {
            var scope = NormalizeScope(request.Scope);
            var recordId = request.RecordId;
            var viewerAxUserId = GetCurrentSessionAxUserId();
            var ownerAxUserId = SanitizeValue(request.OwnerAxUserId);

            if (string.IsNullOrWhiteSpace(scope.AppCode) || string.IsNullOrWhiteSpace(scope.ModuleCode))
            {
                _logger.LogWarning(
                    "Record mutation permission denied. Reason=missing_scope; AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; Operation={Operation}",
                    scope.AppCode,
                    scope.ModuleCode,
                    recordId,
                    SanitizeValue(request.Operation));

                return ModuleRecordMutationPermissionResult.Forbidden("Module scope could not be resolved.");
            }

            if (string.IsNullOrWhiteSpace(viewerAxUserId))
            {
                _logger.LogWarning(
                    "Record mutation permission denied. Reason=missing_viewer; AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; Operation={Operation}",
                    scope.AppCode,
                    scope.ModuleCode,
                    recordId,
                    SanitizeValue(request.Operation));

                return ModuleRecordMutationPermissionResult.Unauthorized();
            }

            try
            {
                _logger.LogInformation(
                    "Record mutation permission validation started. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; OwnerSource={OwnerSource}; OwnerName={OwnerName}; OwnerAlias={OwnerAlias}; Operation={Operation}",
                    scope.AppCode,
                    scope.ModuleCode,
                    recordId,
                    viewerAxUserId,
                    ownerAxUserId,
                    SanitizeValue(request.OwnerSource),
                    SanitizeValue(request.OwnerName),
                    SanitizeValue(request.OwnerAlias),
                    SanitizeValue(request.Operation));

                if (string.IsNullOrWhiteSpace(ownerAxUserId))
                {
                    _logger.LogWarning(
                        "Record mutation denied because owner could not be resolved. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; Operation={Operation}",
                        scope.AppCode,
                        scope.ModuleCode,
                        recordId,
                        viewerAxUserId,
                        SanitizeValue(request.Operation));

                    return ModuleRecordMutationPermissionResult.Forbidden("Owner could not be resolved.");
                }

                var modulePolicy = await ResolveCurrentModuleMutationPolicyAsync(scope.ModuleCode);
                if (IsModuleMutationPolicyIncomplete(modulePolicy))
                {
                    _logger.LogWarning(
                        "Record mutation module policy incomplete; forcing context refresh. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; SelectedCompany={SelectedCompany}; ModulePolicy={ModulePolicy}; ModulePolicyInt={ModulePolicyInt}; ModulePolicyLabel={ModulePolicyLabel}; DataVisibilityMode={DataVisibilityMode}; HierarchyDepth={HierarchyDepth}; AccessRightsInt={AccessRightsInt}; ModulePolicyFound={ModulePolicyFound}; Operation={Operation}",
                        scope.AppCode,
                        scope.ModuleCode,
                        recordId,
                        viewerAxUserId,
                        ownerAxUserId,
                        modulePolicy.SelectedCompanyId,
                        modulePolicy.Policy,
                        modulePolicy.PolicyInt,
                        modulePolicy.PolicyLabel,
                        modulePolicy.DataVisibilityMode,
                        modulePolicy.HierarchyDepth,
                        modulePolicy.AccessRightsInt,
                        modulePolicy.Found,
                        SanitizeValue(request.Operation));

                    modulePolicy = await ResolveCurrentModuleMutationPolicyAsync(scope.ModuleCode, forceRefresh: true);
                }

                var modulePolicyKind = ResolveModuleMutationPolicyKind(modulePolicy);
                _logger.LogInformation(
                    "Record mutation permission module policy evaluated. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; SelectedCompany={SelectedCompany}; ModulePolicy={ModulePolicy}; ModulePolicyInt={ModulePolicyInt}; ModulePolicyLabel={ModulePolicyLabel}; ModulePolicyKind={ModulePolicyKind}; DataVisibilityMode={DataVisibilityMode}; HierarchyDepth={HierarchyDepth}; AccessRightsInt={AccessRightsInt}; ModulePolicyFound={ModulePolicyFound}; Operation={Operation}",
                    scope.AppCode,
                    scope.ModuleCode,
                    recordId,
                    viewerAxUserId,
                    ownerAxUserId,
                    modulePolicy.SelectedCompanyId,
                    modulePolicy.Policy,
                    modulePolicy.PolicyInt,
                    modulePolicy.PolicyLabel,
                    modulePolicyKind,
                    modulePolicy.DataVisibilityMode,
                    modulePolicy.HierarchyDepth,
                    modulePolicy.AccessRightsInt,
                    modulePolicy.Found,
                    SanitizeValue(request.Operation));

                if (!HasModuleMutationAccess(modulePolicy))
                {
                    _logger.LogWarning(
                        "Record mutation denied by module access rights. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; AccessRightsInt={AccessRightsInt}; ModulePolicyFound={ModulePolicyFound}; Operation={Operation}",
                        scope.AppCode,
                        scope.ModuleCode,
                        recordId,
                        viewerAxUserId,
                        ownerAxUserId,
                        modulePolicy.AccessRightsInt,
                        modulePolicy.Found,
                        SanitizeValue(request.Operation));

                    return ModuleRecordMutationPermissionResult.Forbidden("Module access rights denied the record operation.");
                }

                if (NormalizeOwnerAxUserId(ownerAxUserId) == NormalizeOwnerAxUserId(viewerAxUserId))
                {
                    _logger.LogInformation(
                        "Record mutation permission allowed. Reason=current_owner; AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; AccessRightsInt={AccessRightsInt}; Operation={Operation}",
                        scope.AppCode,
                        scope.ModuleCode,
                        recordId,
                        viewerAxUserId,
                        ownerAxUserId,
                        modulePolicy.AccessRightsInt,
                        SanitizeValue(request.Operation));

                    return ModuleRecordMutationPermissionResult.Allowed();
                }

                if (modulePolicyKind == MutationPolicyKind.OwnOnly)
                {
                    _logger.LogWarning(
                        "Record mutation denied by own-only module mutation policy. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; ModulePolicy={ModulePolicy}; ModulePolicyInt={ModulePolicyInt}; ModulePolicyLabel={ModulePolicyLabel}; Operation={Operation}",
                        scope.AppCode,
                        scope.ModuleCode,
                        recordId,
                        viewerAxUserId,
                        ownerAxUserId,
                        modulePolicy.Policy,
                        modulePolicy.PolicyInt,
                        modulePolicy.PolicyLabel,
                        SanitizeValue(request.Operation));

                    return ModuleRecordMutationPermissionResult.Forbidden("Module mutation policy denied the record operation.");
                }

                if (modulePolicyKind == MutationPolicyKind.Unknown)
                {
                    _logger.LogWarning(
                        "Record mutation denied by unknown module mutation policy. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; ModulePolicy={ModulePolicy}; ModulePolicyInt={ModulePolicyInt}; ModulePolicyLabel={ModulePolicyLabel}; Operation={Operation}",
                        scope.AppCode,
                        scope.ModuleCode,
                        recordId,
                        viewerAxUserId,
                        ownerAxUserId,
                        modulePolicy.Policy,
                        modulePolicy.PolicyInt,
                        modulePolicy.PolicyLabel,
                        SanitizeValue(request.Operation));

                    return ModuleRecordMutationPermissionResult.Forbidden("Module mutation policy denied the record operation.");
                }

                var visibleUsers = await LoadVisibleUsersAsync(token, scope, "mutation-validation");
                var visibleOwner = visibleUsers.FirstOrDefault(x =>
                    NormalizeOwnerAxUserId(x.AxUserId) == NormalizeOwnerAxUserId(ownerAxUserId));
                var visibleOwnerPolicyKind = ResolveVisibleOwnerMutationPolicyKind(visibleOwner);

                _logger.LogInformation(
                    "Record mutation permission visible owner evaluated. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; VisibleOwnerFound={VisibleOwnerFound}; MutationPolicy={MutationPolicy}; MutationPolicyInt={MutationPolicyInt}; MutationPolicyLabel={MutationPolicyLabel}; VisibleOwnerPolicyKind={VisibleOwnerPolicyKind}; CanMutate={CanMutate}; VisibleOwnerSource={VisibleOwnerSource}; Operation={Operation}",
                    scope.AppCode,
                    scope.ModuleCode,
                    recordId,
                    viewerAxUserId,
                    ownerAxUserId,
                    visibleOwner != null,
                    visibleOwner?.MutationPolicy ?? string.Empty,
                    visibleOwner?.MutationPolicyInt,
                    visibleOwner?.MutationPolicyLabel ?? string.Empty,
                    visibleOwnerPolicyKind,
                    visibleOwner?.CanMutate,
                    visibleOwner?.Source ?? string.Empty,
                    SanitizeValue(request.Operation));

                if (CanMutateVisibleOwner(visibleOwner, ownerAxUserId, viewerAxUserId))
                {
                    var allowReason = ResolveAllowReason(modulePolicyKind, visibleOwnerPolicyKind);
                    if (modulePolicyKind == MutationPolicyKind.Missing)
                    {
                        _logger.LogWarning(
                            "Record mutation allowed by visible-owner fallback after incomplete module context. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; VisibleOwnerPolicy={MutationPolicy}; VisibleOwnerPolicyInt={MutationPolicyInt}; CanMutate={CanMutate}; Operation={Operation}",
                            scope.AppCode,
                            scope.ModuleCode,
                            recordId,
                            viewerAxUserId,
                            ownerAxUserId,
                            visibleOwner?.MutationPolicyLabel ?? visibleOwner?.MutationPolicy ?? string.Empty,
                            visibleOwner?.MutationPolicyInt,
                            visibleOwner?.CanMutate,
                            SanitizeValue(request.Operation));
                    }

                    _logger.LogInformation(
                        "Record mutation permission allowed. Reason={Reason}; AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; MutationPolicy={MutationPolicy}; MutationPolicyInt={MutationPolicyInt}; CanMutate={CanMutate}; Operation={Operation}",
                        allowReason,
                        scope.AppCode,
                        scope.ModuleCode,
                        recordId,
                        viewerAxUserId,
                        ownerAxUserId,
                        visibleOwner?.MutationPolicyLabel ?? visibleOwner?.MutationPolicy ?? string.Empty,
                        visibleOwner?.MutationPolicyInt,
                        visibleOwner?.CanMutate,
                        SanitizeValue(request.Operation));

                    return ModuleRecordMutationPermissionResult.Allowed();
                }

                _logger.LogWarning(
                    "Record mutation denied by owner policy. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; ModulePolicyKind={ModulePolicyKind}; VisibleOwnerPolicyKind={VisibleOwnerPolicyKind}; MutationPolicy={MutationPolicy}; MutationPolicyInt={MutationPolicyInt}; CanMutate={CanMutate}; Operation={Operation}",
                    scope.AppCode,
                    scope.ModuleCode,
                    recordId,
                    viewerAxUserId,
                    ownerAxUserId,
                    modulePolicyKind,
                    visibleOwnerPolicyKind,
                    visibleOwner?.MutationPolicyLabel ?? visibleOwner?.MutationPolicy ?? string.Empty,
                    visibleOwner?.MutationPolicyInt,
                    visibleOwner?.CanMutate,
                    SanitizeValue(request.Operation));

                return ModuleRecordMutationPermissionResult.Forbidden("Mutation policy denied the record operation.");
            }
            catch (ApiException ex)
            {
                _logger.LogError(
                    ex,
                    "Upstream API error while validating record mutation permission. AppCode={AppCode}; ModuleCode={ModuleCode}; RecordId={RecordId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; Operation={Operation}",
                    scope.AppCode,
                    scope.ModuleCode,
                    recordId,
                    viewerAxUserId,
                    ownerAxUserId,
                    SanitizeValue(request.Operation));
                return ModuleRecordMutationPermissionResult.UpstreamError();
            }
        }

        private async Task<IReadOnlyList<DataVisibilityVisibleUserDto>> LoadVisibleUsersAsync(
            string token,
            ModuleRecordMutationScope rawScope,
            string reason)
        {
            var scope = NormalizeScope(rawScope);
            var viewerAxUserId = GetCurrentSessionAxUserId();
            _logger.LogInformation(
                "Module visible-users load started. Reason={Reason}; ViewerAxUserId={ViewerAxUserId}; AppCode={AppCode}; ModuleCode={ModuleCode}; IncludeCrmUserId={IncludeCrmUserId}",
                SanitizeValue(reason),
                viewerAxUserId,
                scope.AppCode,
                scope.ModuleCode,
                scope.IncludeCrmUserId);

            var result = await _apiClient.GetVisibleUsersAsync(
                token,
                scope.AppCode,
                scope.ModuleCode,
                includeCrmUserId: scope.IncludeCrmUserId);

            var users = result.GetAnyItems()
                .Select(NormalizeVisibleUser)
                .Where(x => !string.IsNullOrWhiteSpace(x.AxUserId))
                .GroupBy(x => x.AxUserId, StringComparer.OrdinalIgnoreCase)
                .Select(x => x.First())
                .OrderBy(x => string.IsNullOrWhiteSpace(x.Name) ? x.AxUserId : x.Name, StringComparer.OrdinalIgnoreCase)
                .ToList();

            _logger.LogInformation(
                "Module visible-users load completed. Reason={Reason}; ViewerAxUserId={ViewerAxUserId}; AppCode={AppCode}; ModuleCode={ModuleCode}; IncludeCrmUserId={IncludeCrmUserId}; Success={Success}; TraceId={TraceId}; ItemCount={ItemCount}; Total={Total}; CanMutateCount={CanMutateCount}; PolicySummary={PolicySummary}; Sample={Sample}",
                SanitizeValue(reason),
                viewerAxUserId,
                scope.AppCode,
                scope.ModuleCode,
                scope.IncludeCrmUserId,
                result.Success,
                result.TraceId ?? string.Empty,
                users.Count,
                result.Total,
                users.Count(x => x.CanMutate),
                BuildPolicySummary(users),
                BuildVisibleUserSample(users));

            return users;
        }

        private string GetCurrentSessionAxUserId()
        {
            return NormalizeOptionalText(_httpContextAccessor.HttpContext?.Session.GetString("AxUser")) ?? string.Empty;
        }

        private async Task<ModuleMutationPolicySnapshot> ResolveCurrentModuleMutationPolicyAsync(
            string moduleCode,
            bool forceRefresh = false)
        {
            var contextResult = await _authContext.EnsureContextAsync(forceRefresh: forceRefresh);
            var context = contextResult.Context;
            var selectedCompanyId = _authContext.GetSelectedCompanyId(context) ?? string.Empty;
            var selectedCompany = ResolveSelectedCompany(context, selectedCompanyId);
            var module = selectedCompany?.Modules.FirstOrDefault(m =>
                INDModuleRegistry.MatchesModuleCode(m.ModuleCode, moduleCode));

            if (module == null)
            {
                return new ModuleMutationPolicySnapshot(
                    Found: false,
                    SelectedCompanyId: selectedCompanyId,
                    Policy: string.Empty,
                    PolicyInt: null,
                    PolicyLabel: string.Empty,
                    AccessRightsInt: null,
                    DataVisibilityMode: string.Empty,
                    HierarchyDepth: string.Empty);
            }

            return new ModuleMutationPolicySnapshot(
                Found: true,
                SelectedCompanyId: selectedCompany?.CompanyId ?? selectedCompanyId,
                Policy: SanitizeValue(module.MutationPolicy),
                PolicyInt: module.MutationPolicyInt,
                PolicyLabel: SanitizeValue(module.MutationPolicyLabel),
                AccessRightsInt: module.AccessRightsInt,
                DataVisibilityMode: SanitizeValue(module.DataVisibilityMode),
                HierarchyDepth: SanitizeValue(module.HierarchyDepth));
        }

        private static IndWebCompany? ResolveSelectedCompany(IndWebContext? context, string selectedCompanyId)
        {
            if (context?.Companies == null || context.Companies.Count == 0)
                return null;

            if (!string.IsNullOrWhiteSpace(selectedCompanyId))
            {
                var selected = context.Companies.FirstOrDefault(c =>
                    string.Equals(c.CompanyId, selectedCompanyId, StringComparison.OrdinalIgnoreCase));
                if (selected != null)
                    return selected;
            }

            return context.Companies.FirstOrDefault(c =>
                       string.Equals(c.CompanyId, context.Header.DefaultCompany, StringComparison.OrdinalIgnoreCase))
                   ?? context.Companies.FirstOrDefault();
        }

        private static ModuleRecordMutationScope NormalizeScope(ModuleRecordMutationScope scope)
        {
            return new ModuleRecordMutationScope(
                SanitizeValue(scope.AppCode),
                SanitizeValue(scope.ModuleCode),
                scope.IncludeCrmUserId);
        }

        private static string? NormalizeOptionalText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        private static string SanitizeValue(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? string.Empty : value.Trim();
        }

        private static string FirstNonEmpty(params string?[] values)
        {
            foreach (var value in values)
            {
                var normalized = NormalizeOptionalText(value);
                if (!string.IsNullOrWhiteSpace(normalized))
                    return normalized;
            }

            return string.Empty;
        }

        private static string NormalizeOwnerAxUserId(string? value)
        {
            return SanitizeValue(value).ToUpperInvariant();
        }

        private static string NormalizeMutationPolicyToken(string? value)
        {
            var normalized = SanitizeValue(value).Normalize(NormalizationForm.FormD);
            var builder = new StringBuilder(normalized.Length);

            foreach (var ch in normalized)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(ch) == UnicodeCategory.NonSpacingMark)
                    continue;

                if (char.IsLetterOrDigit(ch))
                    builder.Append(char.ToLowerInvariant(ch));
            }

            return builder.ToString();
        }

        // Classifies the logged user's module-level mutation policy.
        private static MutationPolicyKind ResolveModuleMutationPolicyKind(ModuleMutationPolicySnapshot policy)
        {
            if (!policy.Found)
                return MutationPolicyKind.Missing;

            return ResolveMutationPolicyKind(policy.PolicyInt, policy.Policy, policy.PolicyLabel);
        }

        // Classifies the visible-owner mutation policy returned by AX/API.
        private static MutationPolicyKind ResolveVisibleOwnerMutationPolicyKind(DataVisibilityVisibleUserDto? item)
        {
            return item == null
                ? MutationPolicyKind.Missing
                : ResolveMutationPolicyKind(item.MutationPolicyInt, item.MutationPolicy, item.MutationPolicyLabel);
        }

        // Maps enum integers and labels to one stable mutation policy kind.
        private static MutationPolicyKind ResolveMutationPolicyKind(int? policyInt, params string?[] values)
        {
            if (policyInt == 0)
                return MutationPolicyKind.OwnOnly;
            if (policyInt == 1)
                return MutationPolicyKind.SameAsVisibility;
            if (policyInt == 2)
                return MutationPolicyKind.ModuleBusinessRules;

            var hasAnyPolicyValue = false;
            foreach (var value in values)
            {
                var token = NormalizeMutationPolicyToken(value);
                if (string.IsNullOrWhiteSpace(token))
                    continue;

                hasAnyPolicyValue = true;
                if (token == "0" || token == "ownonly" || token == "solopropios" || token == "propios")
                    return MutationPolicyKind.OwnOnly;
                if (token == "1" || token == "sameasvisibility" || token == "igualquevisibilidad" || token == "igualvisibilidad")
                    return MutationPolicyKind.SameAsVisibility;
                if (token == "2" || token == "modulebusinessrules" || token == "modulebusinessrule" || token == "reglasdelmodulo" || token == "reglasmodulo")
                    return MutationPolicyKind.ModuleBusinessRules;
            }

            return hasAnyPolicyValue ? MutationPolicyKind.Unknown : MutationPolicyKind.Missing;
        }

        // Detects context snapshots that need one forced refresh before fallback.
        private static bool IsModuleMutationPolicyIncomplete(ModuleMutationPolicySnapshot policy)
        {
            if (!policy.Found)
                return true;

            return ResolveModuleMutationPolicyKind(policy) == MutationPolicyKind.Missing;
        }

        // Requires module edit-level rights before any record mutation is allowed.
        private static bool HasModuleMutationAccess(ModuleMutationPolicySnapshot policy)
        {
            return policy.Found && (policy.AccessRightsInt ?? IndAccessRights.NoAccess) >= IndAccessRights.Edit;
        }

        // Selects a diagnostic reason that identifies the effective allow path.
        private static string ResolveAllowReason(
            MutationPolicyKind modulePolicyKind,
            MutationPolicyKind visibleOwnerPolicyKind)
        {
            if (modulePolicyKind == MutationPolicyKind.Missing)
                return "visible_owner_policy_fallback";

            if (modulePolicyKind == MutationPolicyKind.ModuleBusinessRules ||
                visibleOwnerPolicyKind == MutationPolicyKind.ModuleBusinessRules)
            {
                return "module_business_rules_policy";
            }

            return "same_as_visibility_policy";
        }

        private static bool CanMutateVisibleOwner(
            DataVisibilityVisibleUserDto? visibleOwner,
            string ownerAxUserId,
            string viewerAxUserId)
        {
            var ownerKey = NormalizeOwnerAxUserId(ownerAxUserId);
            var viewerKey = NormalizeOwnerAxUserId(viewerAxUserId);

            if (string.IsNullOrWhiteSpace(ownerKey) || string.IsNullOrWhiteSpace(viewerKey))
                return false;

            if (ownerKey == viewerKey)
                return true;

            var visibleOwnerPolicyKind = ResolveVisibleOwnerMutationPolicyKind(visibleOwner);
            if (visibleOwnerPolicyKind != MutationPolicyKind.SameAsVisibility &&
                visibleOwnerPolicyKind != MutationPolicyKind.ModuleBusinessRules)
            {
                return false;
            }

            return visibleOwner?.CanMutate == true;
        }

        private static DataVisibilityVisibleUserDto NormalizeVisibleUser(DataVisibilityVisibleUserDto item)
        {
            return new DataVisibilityVisibleUserDto
            {
                Alias = SanitizeValue(item.Alias),
                AxUserId = SanitizeValue(item.AxUserId),
                CrmUserId = SanitizeValue(item.CrmUserId),
                Name = SanitizeValue(item.Name),
                Source = SanitizeValue(item.Source),
                MutationPolicy = SanitizeValue(item.MutationPolicy),
                MutationPolicyInt = item.MutationPolicyInt,
                MutationPolicyLabel = SanitizeValue(item.MutationPolicyLabel),
                CanMutate = item.CanMutate
            };
        }

        private static string BuildPolicySummary(IEnumerable<DataVisibilityVisibleUserDto> users)
        {
            return string.Join(
                ",",
                users
                    .GroupBy(x => FirstNonEmpty(
                        x.MutationPolicyLabel,
                        x.MutationPolicy,
                        x.MutationPolicyInt?.ToString(CultureInfo.InvariantCulture),
                        "missing"))
                    .OrderBy(x => x.Key, StringComparer.OrdinalIgnoreCase)
                    .Select(x => $"{x.Key}:{x.Count()}"));
        }

        private static string BuildVisibleUserSample(IEnumerable<DataVisibilityVisibleUserDto> users)
        {
            return string.Join(
                "|",
                users
                    .Take(5)
                    .Select(x =>
                        $"{x.AxUserId}:{FirstNonEmpty(x.MutationPolicyLabel, x.MutationPolicy, x.MutationPolicyInt?.ToString(CultureInfo.InvariantCulture), "missing")}:{x.CanMutate}"));
        }

        // Snapshot of the logged user's module mutation policy.
        private sealed record ModuleMutationPolicySnapshot(
            bool Found,
            string SelectedCompanyId,
            string Policy,
            int? PolicyInt,
            string PolicyLabel,
            int? AccessRightsInt,
            string DataVisibilityMode,
            string HierarchyDepth);

        private enum MutationPolicyKind
        {
            Missing,
            OwnOnly,
            SameAsVisibility,
            ModuleBusinessRules,
            Unknown
        }
    }
}
