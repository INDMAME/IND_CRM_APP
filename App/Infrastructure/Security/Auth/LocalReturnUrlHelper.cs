using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Infrastructure.Security.Auth
{
    // Centralizes local return URL validation for auth redirects.
    public static class LocalReturnUrlHelper
    {
        private const string DefaultFallback = "/Home/Index";

        // Builds the current request path and query as a local URL.
        public static string BuildCurrentLocalUrl(HttpRequest? request)
        {
            if (request == null)
                return DefaultFallback;

            var pathBase = request.PathBase.HasValue ? request.PathBase.ToUriComponent() : string.Empty;
            var path = request.Path.HasValue ? request.Path.ToUriComponent() : "/";
            var query = request.QueryString.HasValue ? request.QueryString.ToUriComponent() : string.Empty;
            var current = $"{pathBase}{path}{query}";

            return string.IsNullOrWhiteSpace(current) ? DefaultFallback : current;
        }

        // Normalizes a return URL and falls back when it is unsafe or auth-exit related.
        public static string NormalizeLocalReturnUrl(IUrlHelper url, string? returnUrl, string fallback = DefaultFallback)
        {
            var safeFallback = NormalizeCandidate(fallback);
            if (!IsSafeLocalUrl(url, safeFallback))
                safeFallback = DefaultFallback;

            var candidate = NormalizeCandidate(returnUrl);
            return IsSafeLocalUrl(url, candidate) ? candidate : safeFallback;
        }

        // Returns a normalized local URL or null when the candidate is unsafe.
        public static string? TryNormalizeLocalReturnUrl(IUrlHelper url, string? returnUrl)
        {
            var candidate = NormalizeCandidate(returnUrl);
            return IsSafeLocalUrl(url, candidate) ? candidate : null;
        }

        // Builds a login URL that preserves the current request as returnUrl.
        public static string BuildLoginUrlWithReturnUrl(HttpRequest? request, string loginPath = "/Auth/Login")
        {
            var current = BuildCurrentLocalUrl(request);
            if (string.IsNullOrWhiteSpace(current) || IsAuthExitPath(current))
                return loginPath;

            return loginPath + QueryString.Create("returnUrl", current).ToUriComponent();
        }

        // Converts supported app-relative values into a path accepted by MVC redirects.
        private static string NormalizeCandidate(string? value)
        {
            var trimmed = (value ?? string.Empty).Trim();
            return trimmed.StartsWith("~/", StringComparison.Ordinal) ? trimmed[1..] : trimmed;
        }

        // Confirms that a URL is local and not an auth exit target.
        private static bool IsSafeLocalUrl(IUrlHelper url, string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return false;

            return url.IsLocalUrl(value) && !IsAuthExitPath(value);
        }

        // Rejects login, logout, and signout callback paths as return destinations.
        private static bool IsAuthExitPath(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return false;

            var path = value;
            var queryIndex = path.IndexOf('?', StringComparison.Ordinal);
            if (queryIndex >= 0)
                path = path[..queryIndex];

            return path.Equals("/Auth/Login", StringComparison.OrdinalIgnoreCase) ||
                   path.Equals("/Auth/EntraLogin", StringComparison.OrdinalIgnoreCase) ||
                   path.Equals("/Auth/Logout", StringComparison.OrdinalIgnoreCase) ||
                   path.Equals("/Auth/ForceRelogin", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/signin-oidc", StringComparison.OrdinalIgnoreCase) ||
                   path.StartsWith("/signout-", StringComparison.OrdinalIgnoreCase);
        }
    }
}
