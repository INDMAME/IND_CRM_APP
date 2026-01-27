using IND_CRM_APP.Models.Shared;

namespace IND_CRM_APP.Services
{
    /// <summary>
    /// Session token storage for the current request context.
    /// </summary>
    public interface ITokenSessionService
    {
        /// <summary>
        /// Stores token and expiration in session.
        /// </summary>
        void SetToken(string token, DateTime? expiresUtc = null);

        /// <summary>
        /// Reads token and expiration from session.
        /// </summary>
        (string? Token, DateTime? ExpiresUtc) GetToken();

        /// <summary>
        /// Clears authentication data for the current session.
        /// </summary>
        void Clear();
    }
}
