using System;

namespace IND_CRM_APP.Infrastructure.Security.Auth
{
    // Centralized access to auth environment variables and related constants.
    public static class IndAuthEnv
    {
        // Read secrets from environment variables to avoid hardcoded values.
        public static string TenantId => GetRequiredEnv("CRM_TENANT_ID");
        public static string ClientId => GetRequiredEnv("CRM_CLIENT_ID");
        public static string ClientSecret => GetRequiredEnv("CRM_CLIENT_SECRET");
        public static string Authority => GetRequiredEnv("CRM_AUTHORITY");
        public const string RedirectPath = "/signin-oidc";
        public const string ClaimOid = "oid";
        public const string ClaimEmailPreferred = "preferred_username";
        public const string AppCode = "CRM";

        public static string ServiceUser => GetRequiredEnv("USER_DEFAULT");
        public static string ServicePass => GetRequiredEnv("USER_PASS_DEFAULT");

        // Return an environment variable value or throw if it is missing.
        private static string GetRequiredEnv(string name)
        {
            var value = Environment.GetEnvironmentVariable(name);
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new InvalidOperationException($"Missing required environment variable: {name}");
            }

            return value;
        }
    }
}
