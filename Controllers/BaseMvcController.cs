using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // Base controller for MVC controllers
    // Centralizes token management and common environment info
    public abstract class BaseMvcController : Controller
    {
        protected readonly ICrmApiClient _apiClient;

        protected BaseMvcController(ICrmApiClient apiClient)
        {
            _apiClient = apiClient;
        }

        // Gets the token from session
        // If it is missing, redirects to login
        protected string? GetTokenOrRedirect()
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrEmpty(token))
            {
                Response.Redirect("/Auth/Login");
                return null;
            }
            return token;
        }

        // Loads environment and company name into ViewBag
        // To show this info in layout or views
        protected async Task LoadEnvironmentInfoAsync()
        {
            var token = GetTokenOrRedirect();
            if (string.IsNullOrEmpty(token))
                return;

            var env = await _apiClient.GetEnvironmentAsync(token);
            var company = await _apiClient.GetCompanyNameAsync(token);

            ViewBag.EnvironmentName = env;
            ViewBag.CompanyName = company;
        }
    }
}
