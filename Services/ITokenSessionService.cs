using IND_CRM_APP.Models.Shared;

namespace IND_CRM_APP.Services
{
    public interface ITokenSessionService
    {
        /// <summary>
        /// Guarda token y expiracion en sesion.
        /// </summary>
        void SetToken(string token, DateTime? expiresUtc = null);

        /// <summary>
        /// Obtiene token + expiracion actuales desde sesion.
        /// </summary>
        (string? Token, DateTime? ExpiresUtc) GetToken();

        /// <summary>
        /// Limpia cualquier dato de autenticacion de la sesion actual.
        /// </summary>
        void Clear();
    }
}
