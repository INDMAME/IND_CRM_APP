using IND_CRM_APP.Models.Shared;

namespace IND_CRM_APP.Services
{
    public interface ITokenSessionService
    {
        /// <summary>
        /// Guarda token y expiración en sesión y propaga cabecera X-Refreshed-Token.
        /// </summary>
        void SetToken(string token, DateTime? expiresUtc = null);

        /// <summary>
        /// Obtiene token + expiración actuales desde sesión.
        /// </summary>
        (string? Token, DateTime? ExpiresUtc) GetToken();

        /// <summary>
        /// Limpia cualquier dato de autenticación de la sesión actual.
        /// </summary>
        void Clear();
    }
}
