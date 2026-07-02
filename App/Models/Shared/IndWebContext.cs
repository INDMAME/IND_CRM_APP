using System.Collections.Generic;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Shared
{
    // Parsed web context used for module authorization and company selection.
    public class IndWebContext
    {
        public string TenantId { get; set; } = string.Empty;
        public string EntraOid { get; set; } = string.Empty;
        public long ContextVersion { get; set; }
        public string PermissionsRevision { get; set; } = string.Empty;
        public DateTime? ContextIssuedUtc { get; set; }
        public DateTime? ContextExpiresUtc { get; set; }
        public IndWebContextHeader Header { get; set; } = new();
        public List<IndWebCompany> Companies { get; set; } = new();
    }

    // Header metadata for the context response.
    public class IndWebContextHeader
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string AxUserId { get; set; } = string.Empty;
        public bool UserActive { get; set; }
        public bool AppActive { get; set; }
        public string DefaultCompany { get; set; } = string.Empty;
        public string DefaultCurrencyCode { get; set; } = string.Empty;
    }

    // Company data with module permissions.
    public class IndWebCompany
    {
        public string CompanyId { get; set; } = string.Empty;
        public bool IsDefault { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string CurrencyCode { get; set; } = string.Empty;
        public string CrmUserId { get; set; } = string.Empty;
        public bool AllowSelfManagement { get; set; }
        public List<IndWebModule> Modules { get; set; } = new();
    }

    // Module permission data for a company.
    public class IndWebModule
    {
        public string ModuleCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public int AccessRightsInt { get; set; }
        public string DataVisibilityMode { get; set; } = string.Empty;
        public int? DataVisibilityModeInt { get; set; }
        public string HierarchyDepth { get; set; } = string.Empty;
        public int? HierarchyDepthInt { get; set; }
        public string MutationPolicy { get; set; } = string.Empty;
        public int? MutationPolicyInt { get; set; }
        public string MutationPolicyLabel { get; set; } = string.Empty;
    }

    // Raw context models for /api/auth/entra/context parsing.
    // These mirror the API contract and should not be used in views.
    public class IndEntraContextResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? ErrorCode { get; set; }
        public List<IndEntraContextItem> Items { get; set; } = new();
    }
    /// <summary>
    /// Model for ind entra context item data.
    /// </summary>

    public class IndEntraContextItem
    {
        public string? TenantId { get; set; }
        public string? EntraOid { get; set; }
        public long? ContextVersion { get; set; }
        public string? PermissionsRevision { get; set; }
        public string? ContextToken { get; set; }
        public string? ContextIssuedUtc { get; set; }
        public string? ContextExpiresUtc { get; set; }
        public IndEntraContextHeader? Header { get; set; }
        public List<IndEntraCompany>? Companies { get; set; }
    }
    /// <summary>
    /// Model for ind entra context header data.
    /// </summary>

    public class IndEntraContextHeader
    {
        public object? Success { get; set; }
        public string? Message { get; set; }
        public string? AxUserId { get; set; }
        public object? UserActive { get; set; }
        public object? AppActive { get; set; }
        public string? DefaultCompany { get; set; }
        public string? DefaultCurrencyCode { get; set; }
    }
    /// <summary>
    /// Model for ind entra company data.
    /// </summary>

    public class IndEntraCompany
    {
        public string? CompanyId { get; set; }
        public object? IsDefault { get; set; }
        public string? CompanyName { get; set; }
        public string? CurrencyCode { get; set; }
        public string? CrmUserId { get; set; }
        public object? AllowSelfManagement { get; set; }
        public List<IndEntraModule>? Modules { get; set; }
    }
    /// <summary>
    /// Model for ind entra module data.
    /// </summary>

    public class IndEntraModule
    {
        public string? ModuleCode { get; set; }
        public string? Description { get; set; }
        public object? IsActive { get; set; }
        public object? AccessRightsInt { get; set; }
        public object? AccessRights { get; set; }
        public object? DataVisibilityMode { get; set; }
        public object? DataVisibilityModeInt { get; set; }
        public object? DataVisibilityModeLabel { get; set; }
        public object? VisibilityMode { get; set; }
        public object? VisibilityModeInt { get; set; }
        public object? HierarchyDepth { get; set; }
        public object? HierarchyDepthInt { get; set; }
        public object? HierarchyDepthLabel { get; set; }
        public object? MutationPolicy { get; set; }
        public object? MutationPolicyInt { get; set; }
        public object? MutationPolicyLabel { get; set; }
        public object? ModificationPolicy { get; set; }
        public object? ModificationPolicyInt { get; set; }
        public object? ModificationPolicyLabel { get; set; }

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? ExtensionData { get; set; }
    }
}
