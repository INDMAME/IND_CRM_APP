using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;

namespace IND_CRM_APP.Services
{
    // Interfaz para el cliente de APIs CRM
    public interface ICrmApiClient
    {
        // Login principal
        Task<LoginResult?> AuthenticateAsync(string username, string password);

        // Entorno y compania
        Task<string> GetEnvironmentAsync(string token);
        Task<string> GetCompanyNameAsync(string token);

        // Cuentas CRM
        Task<PagedApiResponse<AccountDto>> GetAccountsAsync(
            string token,
            string? accountNum,
            int page,
            int pageSize
        );

        // Contactos CRM
        Task<PagedApiResponse<ContactoDto>> GetContactosAsync(
            string token,
            string accountNum,
            int page,
            int pageSize
        );

        // Actividades
        Task<PagedApiResponse<ActivityDto>> GetActivitiesAsync(
            string token,
            ActivitiesFilter filter
        );

        Task<ApiResponse<object>> CreateActivityAsync(
            string token,
            CreateActivityRequest req
        );

        Task<ApiResponse<object>> UpdateActivityAsync(
            string token,
            long recId,
            UpdateActivityRequest req
        );

        Task<ApiResponse<object>> DeleteActivityAsync(
            string token,
            long recId
        );

        Task<ApiResponse<ActivityDto>> GetActivityByCodeAsync(
            string token,
            string actividadId
        );

        Task<ApiResponse<ActivityDto>> GetActivityByRecIdAsync(
            string token,
            long recId
        );

        // Asistentes de visita
        Task<ApiResponse<object>> CreateVisitaAsistenteAsync(
            string token,
            CreateVisitaAsistenteRequest req
        );

        Task<ApiResponse<object>> DeleteVisitaAsistenteAsync(
            string token,
            DeleteVisitaAsistenteRequest req
        );

        // Refresh de token
        Task<LoginResult?> RefreshTokenAsync(string currentToken);
    }
}
