using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace IND_CRM_APP.Controllers
{
    // Handles UI culture switching via the standard .AspNetCore.Culture cookie.
    public class INDLocalizationController : Controller
    {
        private static readonly HashSet<string> SupportedCultures = new(StringComparer.OrdinalIgnoreCase)
        {
            "es-ES",
            "eu-ES",
            "en",
            "pt",
            "it",
            "zh-Hans"
        };

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SetCulture(string? culture, string? returnUrl)
        {
            var effectiveCulture = !string.IsNullOrWhiteSpace(culture) && SupportedCultures.Contains(culture)
                ? culture
                : "es-ES";

            var safeReturnUrl = Url.IsLocalUrl(returnUrl) ? returnUrl! : "/";

            // Defensive: remove any older culture cookies that may exist with a different Path attribute.
            foreach (var path in new[] { "/", "/Visitas", "/Historial", "/Auth", "/Home" })
            {
                Response.Cookies.Delete(CookieRequestCultureProvider.DefaultCookieName, new CookieOptions { Path = path });
            }

            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(effectiveCulture)),
                new CookieOptions
                {
                    Expires = DateTimeOffset.UtcNow.AddYears(1),
                    IsEssential = true,
                    HttpOnly = true,
                    SameSite = SameSiteMode.Lax,
                    Path = "/",
                    Secure = Request.IsHttps
                }
            );

            return LocalRedirect(safeReturnUrl);
        }
    }
}
