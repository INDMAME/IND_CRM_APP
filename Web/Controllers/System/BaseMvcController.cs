using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

using IND_CRM_APP.Models.Shared;
using System.Linq;
using System.Text.Json;

namespace IND_CRM_APP.Controllers
{
    // Base controller for MVC controllers
    // Centralizes token management and common environment info
    public abstract class BaseMvcController : Controller
    {
        protected readonly ICrmApiClient _apiClient;
        private const string CompanyNameKey = "INDCompanySelectedName";

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

            try
            {
                var env = await _apiClient.GetEnvironmentAsync(token);
                var cachedCompany = GetCachedCompanyName();
                var company = string.IsNullOrWhiteSpace(cachedCompany)
                    ? await _apiClient.GetCompanyNameAsync(token)
                    : cachedCompany;

                var envSafe = string.IsNullOrWhiteSpace(env) ? "Unknown" : env;
                var companySafe = string.IsNullOrWhiteSpace(company) ? "N/A" : company;

                ViewBag.Environment = envSafe;
                ViewBag.Company = companySafe;
                ViewBag.EnvironmentName = envSafe;
                ViewBag.CompanyName = companySafe;

                HttpContext.Session.SetString("Environment", envSafe);
                HttpContext.Session.SetString("Company", companySafe);
            }
            catch (ApiException)
            {
                ViewBag.Environment = "Unknown";
                ViewBag.Company = "N/A";
            }
            catch (Exception)
            {
                ViewBag.Environment = "Unknown";
                ViewBag.Company = "N/A";
            }
        }

        // Resolves the selected company name from cached context, if available.
        private string? GetCachedCompanyName()
        {
            var cached = HttpContext.Session.GetString(CompanyNameKey);
            if (!string.IsNullOrWhiteSpace(cached))
                return cached;

            var contextRaw = HttpContext.Session.GetString("INDWebContext");
            if (string.IsNullOrWhiteSpace(contextRaw))
                return null;

            try
            {
                var context = JsonSerializer.Deserialize<IndWebContext>(contextRaw);
                if (context == null)
                    return null;

                var selectedId = HttpContext.Session.GetString("INDCompanySelected");
                if (!string.IsNullOrWhiteSpace(selectedId))
                {
                    return context.Companies
                        .FirstOrDefault(c => string.Equals(c.CompanyId, selectedId, StringComparison.OrdinalIgnoreCase))
                        ?.CompanyName;
                }

                if (!string.IsNullOrWhiteSpace(context.Header.DefaultCompany))
                {
                    return context.Companies
                        .FirstOrDefault(c => string.Equals(c.CompanyId, context.Header.DefaultCompany, StringComparison.OrdinalIgnoreCase))
                        ?.CompanyName;
                }

                return context.Companies.FirstOrDefault()?.CompanyName;
            }
            catch
            {
                return null;
            }
        }
    }
}
