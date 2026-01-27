using System.Collections.Generic;

namespace IND_CRM_APP.Models.Shared
{
    // Parsed web context used for module authorization and company selection.
    public class IndWebContext
    {
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
    }

    // Company data with module permissions.
    public class IndWebCompany
    {
        public string CompanyId { get; set; } = string.Empty;
        public bool IsDefault { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public List<IndWebModule> Modules { get; set; } = new();
    }

    // Module permission data for a company.
    public class IndWebModule
    {
        public string ModuleCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public int AccessRightsInt { get; set; }
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
    }
    /// <summary>
    /// Model for ind entra company data.
    /// </summary>

    public class IndEntraCompany
    {
        public string? CompanyId { get; set; }
        public object? IsDefault { get; set; }
        public string? CompanyName { get; set; }
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
    }
}
