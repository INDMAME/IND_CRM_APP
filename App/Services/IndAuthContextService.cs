using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using IND_CRM_APP.Infrastructure.Security.Auth;
using IND_CRM_APP.Infrastructure.Security.Permissions;
using IND_CRM_APP.Models.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Services
{
    // Loads and caches Entra context and company selection in session.
    public class IndAuthContextService : IIndAuthContextService
    {
        private const string ContextKey = "INDWebContext";
        private const string CompanyKey = "INDCompanySelected";
        private const string CompanyNameKey = "INDCompanySelectedName";
        private const string CompanySelectionSourceKey = "INDCompanySelectionSource";
        private const string CompanySelectionSourceDefault = "default";
        private const string CompanySelectionSourceUser = "user";
        private const string EntraOidKey = "ENTRAOID";
        private const string EntraOidContextKey = "INDEntraOidContext";

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICrmApiClient _apiClient;
        private readonly ITokenSessionService _tokenSession;
        private readonly ILogger<IndAuthContextService> _logger;

        public IndAuthContextService(
            IHttpContextAccessor httpContextAccessor,
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            ILogger<IndAuthContextService> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _apiClient = apiClient;
            _tokenSession = tokenSession;
            _logger = logger;
        }

        public IndWebContext? GetCachedContext()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            var raw = ctx.Session.GetString(ContextKey);
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            try
            {
                return JsonSerializer.Deserialize<IndWebContext>(raw);
            }
            catch
            {
                return null;
            }
        }

        public string? GetSelectedCompanyId(IndWebContext? context)
        {
            var ctx = _httpContextAccessor.HttpContext;
            var selected = ctx?.Session.GetString(CompanyKey);
            if (!string.IsNullOrWhiteSpace(selected))
                return selected;

            var selectionSource = ctx?.Session.GetString(CompanySelectionSourceKey);
            if (string.Equals(selectionSource, CompanySelectionSourceUser, StringComparison.OrdinalIgnoreCase))
                return null;

            if (context != null)
            {
                if (!string.IsNullOrWhiteSpace(context.Header.DefaultCompany))
                    return context.Header.DefaultCompany;

                var first = context.Companies.FirstOrDefault();
                if (first != null && !string.IsNullOrWhiteSpace(first.CompanyId))
                    return first.CompanyId;
            }

            return null;
        }

        // Clears cached context (optionally preserving the selected company).
        public void ClearContextCache(bool preserveCompanySelection = false)
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return;

            var selected = preserveCompanySelection ? ctx.Session.GetString(CompanyKey) : null;
            ClearCachedContext(ctx, preserveCompanySelection);

            if (preserveCompanySelection && !string.IsNullOrWhiteSpace(selected))
                ctx.Session.SetString(CompanyKey, selected);
        }

        public async Task<IndAuthContextResult> EnsureContextAsync()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
            {
                return new IndAuthContextResult
                {
                    Success = false,
                    Message = "Session not available."
                };
            }

            var entraOid = ctx.Session.GetString(EntraOidKey);
            if (string.IsNullOrWhiteSpace(entraOid))
            {
                var claimOid = TryGetEntraOidFromClaims(ctx.User);
                if (!string.IsNullOrWhiteSpace(claimOid))
                {
                    ctx.Session.SetString(EntraOidKey, claimOid);
                    entraOid = claimOid;
                    _logger.LogInformation("Recovered Entra OID from auth claims: {EntraOid}", entraOid);
                }
                else
                {
                    _logger.LogWarning("Missing Entra OID in session and claims.");
                    return new IndAuthContextResult
                    {
                        Success = false,
                        Message = "Missing Entra OID."
                    };
                }
            }

            // Log Entra OID to help diagnose user mapping issues.
            _logger.LogInformation("Using Entra OID from session: {EntraOid}", entraOid);

            var cachedOid = ctx.Session.GetString(EntraOidContextKey);
            if (!string.IsNullOrWhiteSpace(cachedOid) &&
                !string.Equals(cachedOid, entraOid, StringComparison.OrdinalIgnoreCase))
            {
                _logger.LogInformation(
                    "Clearing cached context because OID changed. Old: {OldOid} New: {NewOid}",
                    cachedOid,
                    entraOid);
                ClearCachedContext(ctx, preserveCompanySelection: false);
            }

            var cached = GetCachedContext();
            if (cached != null && cached.Companies.Count > 0)
            {
                _logger.LogInformation("Using cached Entra context for OID {EntraOid}.", entraOid);
                EnsureCompanySelection(ctx, cached);
                LogSelectedCompany(ctx);
                return new IndAuthContextResult
                {
                    Success = true,
                    Context = cached
                };
            }

            var token = await EnsureInternalTokenAsync(ctx);
            if (string.IsNullOrWhiteSpace(token))
            {
                return new IndAuthContextResult
                {
                    Success = false,
                    Message = "Missing internal token."
                };
            }

            try
            {
                _logger.LogInformation("Requesting Entra context for OID {EntraOid} and app {AppCode}.", entraOid, IndAuthEnv.AppCode);
                var response = await _apiClient.GetEntraContextAsync(token, entraOid, IndAuthEnv.AppCode);
                if (response == null || response.Items.Count == 0)
                {
                    _logger.LogWarning("Entra context not available for OID {EntraOid}. Message: {Message}", entraOid, response?.Message);
                    return new IndAuthContextResult
                    {
                        Success = false,
                        Message = response?.Message ?? "Context not available."
                    };
                }

                var webContext = MapContext(response.Items[0]);
                if (!webContext.Header.Success || webContext.Companies.Count == 0)
                {
                    _logger.LogWarning("Entra context denied for OID {EntraOid}. Message: {Message}", entraOid, webContext.Header.Message);
                    return new IndAuthContextResult
                    {
                        Success = false,
                        Message = string.IsNullOrWhiteSpace(webContext.Header.Message)
                            ? "Access denied."
                            : webContext.Header.Message
                    };
                }

                try
                {
                    ctx.Session.SetString(ContextKey, JsonSerializer.Serialize(webContext));
                    ctx.Session.SetString(EntraOidContextKey, entraOid);
                    _logger.LogInformation("Cached Entra context for OID {EntraOid}.", entraOid);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to cache IND web context.");
                }

                EnsureCompanySelection(ctx, webContext);
                LogSelectedCompany(ctx);

                if (!string.IsNullOrWhiteSpace(webContext.Header.AxUserId))
                    ctx.Session.SetString("AxUser", webContext.Header.AxUserId);

                return new IndAuthContextResult
                {
                    Success = true,
                    Context = webContext
                };
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Context API error.");
                return new IndAuthContextResult
                {
                    Success = false,
                    Message = "Context API error."
                };
            }
        }

        private async Task<string?> EnsureInternalTokenAsync(HttpContext ctx)
        {
            var (token, _) = _tokenSession.GetToken();
            if (!string.IsNullOrWhiteSpace(token))
                return token;

            var login = await _apiClient.AuthenticateAsync(IndAuthEnv.ServiceUser, IndAuthEnv.ServicePass);
            if (login == null || string.IsNullOrWhiteSpace(login.Token))
                return null;

            _tokenSession.SetToken(
                login.Token,
                login.Expires != default ? login.Expires : null);

            return login.Token;
        }

        private static IndWebContext MapContext(IndEntraContextItem item)
        {
            var context = new IndWebContext
            {
                Header = MapHeader(item.Header)
            };

            if (item.Companies != null)
            {
                foreach (var c in item.Companies)
                {
                    var company = new IndWebCompany
                    {
                        CompanyId = c.CompanyId ?? string.Empty,
                        CompanyName = c.CompanyName ?? string.Empty,
                        IsDefault = ToBool(c.IsDefault)
                    };

                    if (c.Modules != null)
                    {
                        foreach (var m in c.Modules)
                        {
                            company.Modules.Add(new IndWebModule
                            {
                                ModuleCode = m.ModuleCode ?? string.Empty,
                                Description = m.Description ?? string.Empty,
                                IsActive = ToBool(m.IsActive),
                                AccessRightsInt = ToInt(m.AccessRightsInt) ?? ToInt(m.AccessRights) ?? 0
                            });
                        }
                    }

                    context.Companies.Add(company);
                }
            }

            return context;
        }

        private static IndWebContextHeader MapHeader(IndEntraContextHeader? header)
        {
            if (header == null)
                return new IndWebContextHeader { Success = false, Message = "Empty header." };

            return new IndWebContextHeader
            {
                Success = ToBool(header.Success),
                Message = header.Message ?? string.Empty,
                AxUserId = header.AxUserId ?? string.Empty,
                UserActive = ToBool(header.UserActive),
                AppActive = ToBool(header.AppActive),
                DefaultCompany = header.DefaultCompany ?? string.Empty
            };
        }

        // Converts string/bool/number/JsonElement values into a bool safely.
        private static bool ToBool(object? raw)
        {
            if (raw == null)
                return false;

            if (raw is bool b)
                return b;

            if (raw is int i)
                return i != 0;

            if (raw is long l)
                return l != 0;

            if (raw is JsonElement el)
            {
                if (el.ValueKind == JsonValueKind.True || el.ValueKind == JsonValueKind.False)
                    return el.GetBoolean();

                if (el.ValueKind == JsonValueKind.Number && el.TryGetInt64(out var num))
                    return num != 0;

                if (el.ValueKind == JsonValueKind.String)
                    return ToBool(el.GetString());

                return false;
            }

            var rawString = raw as string ?? raw.ToString();
            if (string.IsNullOrWhiteSpace(rawString))
                return false;

            if (bool.TryParse(rawString, out var parsed))
                return parsed;

            return rawString.Trim() == "1";
        }

        // Converts string/number/JsonElement values into an int when possible.
        private static int? ToInt(object? raw)
        {
            if (raw == null)
                return null;

            if (raw is int i)
                return i;

            if (raw is long l)
                return (int)l;

            if (raw is JsonElement el)
            {
                if (el.ValueKind == JsonValueKind.Number && el.TryGetInt32(out var num))
                    return num;

                if (el.ValueKind == JsonValueKind.String)
                    return ToInt(el.GetString());

                return null;
            }

            var rawString = raw as string ?? raw.ToString();
            if (string.IsNullOrWhiteSpace(rawString))
                return null;

            if (int.TryParse(rawString, out var value))
                return value;

            return MapAccessRight(rawString);
        }

        // Maps textual access rights into numeric levels.
        private static int? MapAccessRight(string raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            var normalized = new string(raw
                .Trim()
                .ToLowerInvariant()
                .Normalize(NormalizationForm.FormD)
                .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                .ToArray());

            normalized = normalized.Replace(" ", string.Empty)
                                   .Replace("_", string.Empty)
                                   .Replace("-", string.Empty)
                                   .Replace("/", string.Empty);

            switch (normalized)
            {
                case "ver":
                case "view":
                case "read":
                case "readonly":
                    return IndAccessRights.View;
                case "editar":
                case "edit":
                case "modify":
                case "modifyonly":
                    return IndAccessRights.Edit;
                case "crear":
                case "create":
                case "add":
                case "new":
                    return IndAccessRights.Add;
                case "full":
                case "fullaccess":
                case "total":
                case "eliminar":
                case "delete":
                    return IndAccessRights.FullAccess;
                default:
                    return null;
            }
        }

        private static void EnsureCompanySelection(HttpContext ctx, IndWebContext context)
        {
            var selected = ctx.Session.GetString(CompanyKey);
            var selectionSource = ctx.Session.GetString(CompanySelectionSourceKey);
            if (!string.IsNullOrWhiteSpace(selected) && string.IsNullOrWhiteSpace(selectionSource))
            {
                ctx.Session.SetString(CompanySelectionSourceKey, CompanySelectionSourceUser);
                selectionSource = CompanySelectionSourceUser;
            }

            var isUserSelection = string.Equals(selectionSource, CompanySelectionSourceUser, StringComparison.OrdinalIgnoreCase);
            if (!string.IsNullOrWhiteSpace(selected))
            {
                if (context.Companies.Any(c => string.Equals(c.CompanyId, selected, StringComparison.OrdinalIgnoreCase)))
                {
                    CacheSelectedCompanyName(ctx, context, selected);
                    return;
                }

                if (isUserSelection)
                {
                    ctx.Session.Remove(CompanyNameKey);
                    return;
                }
            }

            var fallback = !string.IsNullOrWhiteSpace(context.Header.DefaultCompany)
                ? context.Header.DefaultCompany
                : context.Companies.FirstOrDefault()?.CompanyId;

            if (!string.IsNullOrWhiteSpace(fallback))
            {
                ctx.Session.SetString(CompanyKey, fallback);
                ctx.Session.SetString(CompanySelectionSourceKey, CompanySelectionSourceDefault);
                CacheSelectedCompanyName(ctx, context, fallback);
                return;
            }

            ctx.Session.Remove(CompanyNameKey);
        }

        // Stores the selected company name in session for quick UI use.
        private static void CacheSelectedCompanyName(HttpContext ctx, IndWebContext context, string? companyId)
        {
            if (string.IsNullOrWhiteSpace(companyId))
            {
                ctx.Session.Remove(CompanyNameKey);
                return;
            }

            var name = context.Companies
                .FirstOrDefault(c => string.Equals(c.CompanyId, companyId, StringComparison.OrdinalIgnoreCase))
                ?.CompanyName;

            if (string.IsNullOrWhiteSpace(name))
                ctx.Session.Remove(CompanyNameKey);
            else
                ctx.Session.SetString(CompanyNameKey, name);
        }

        // Logs the current company selection after context load.
        private void LogSelectedCompany(HttpContext ctx)
        {
            var selected = ctx.Session.GetString(CompanyKey);
            if (string.IsNullOrWhiteSpace(selected))
            {
                _logger.LogWarning("No company selected after Entra context load.");
                return;
            }

            _logger.LogInformation("Selected company from context: {CompanyId}", selected);
        }

        // Clears cached context and related session values.
        private static void ClearCachedContext(HttpContext ctx, bool preserveCompanySelection)
        {
            ctx.Session.Remove(ContextKey);
            ctx.Session.Remove(CompanyNameKey);
            ctx.Session.Remove(EntraOidContextKey);
            ctx.Session.Remove("AxUser");
            if (!preserveCompanySelection)
            {
                ctx.Session.Remove(CompanyKey);
                ctx.Session.Remove(CompanySelectionSourceKey);
            }
        }

        // Extracts Entra OID from the authenticated user claims, if available.
        private static string? TryGetEntraOidFromClaims(ClaimsPrincipal? user)
        {
            if (user == null)
                return null;

            var oid = user.FindFirst(IndAuthEnv.ClaimOid)?.Value
                      ?? user.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;

            return string.IsNullOrWhiteSpace(oid) ? null : oid;
        }
    }
}
