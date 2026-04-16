using System.Threading.Tasks;
using IND_CRM_APP.Models.Shared;

namespace IND_CRM_APP.Services
{
    // Provides cached context and permission data for Entra users.
    public interface IIndAuthContextService
    {
        // Ensures the context is loaded and cached in session.
        Task<IndAuthContextResult> EnsureContextAsync(bool forceRefresh = false);
        // Refreshes the cached context when request inactivity or expiry says it is stale.
        Task EnsureFreshContextForRequestAsync();
        // Returns cached context from session if available.
        IndWebContext? GetCachedContext();
        // Resolves the selected company id from session or defaults.
        string? GetSelectedCompanyId(IndWebContext? context);
        // Clears cached context values (optionally preserving the selected company).
        void ClearContextCache(bool preserveCompanySelection = false);
    }

    // Result wrapper for context loading.
    public class IndAuthContextResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string ErrorCode { get; set; } = string.Empty;
        public IndWebContext? Context { get; set; }
    }
}
