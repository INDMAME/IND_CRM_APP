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
using Microsoft.Extensions.Options;

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
        private const string AxUserKey = "AxUser";
        private const string ContextTokenKey = "INDContextToken";
        private const string ContextVersionKey = "INDContextVersion";
        private const string PermissionsRevisionKey = "INDPermissionsRevision";
        private const string ContextIssuedUtcKey = "INDContextIssuedUtc";
        private const string ContextExpiresUtcKey = "INDContextExpiresUtc";
        private const string ContextLastActivityUtcKey = "INDContextLastActivityUtc";
        private const string ContextTenantIdKey = "INDContextTenantId";
        private const string ErrorCodeSessionExpired = "SESSION_EXPIRED";
        private const string ErrorCodeUpstream = "UPSTREAM_ERROR";
        private const string ErrorCodeContextDenied = "CONTEXT_DENIED";

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ICrmApiClient _apiClient;
        private readonly ITokenSessionService _tokenSession;
        private readonly ILogger<IndAuthContextService> _logger;
        private readonly ContextSessionSettings _contextSettings;

        public IndAuthContextService(
            IHttpContextAccessor httpContextAccessor,
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            IOptions<ContextSessionSettings> contextOptions,
            ILogger<IndAuthContextService> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _apiClient = apiClient;
            _tokenSession = tokenSession;
            _logger = logger;
            _contextSettings = contextOptions?.Value ?? new ContextSessionSettings();
            if (_contextSettings.IdleRefreshMinutes <= 0)
                _contextSettings.IdleRefreshMinutes = 20;
            if (_contextSettings.RefreshBeforeExpiryMinutes <= 0)
                _contextSettings.RefreshBeforeExpiryMinutes = 5;
        }

        public IndWebContext? GetCachedContext()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return null;

            return TryReadCachedContext(ctx, logDiagnostics: true);
        }

        public string? GetSelectedCompanyId(IndWebContext? context)
        {
            var ctx = _httpContextAccessor.HttpContext;
            var resolution = ResolveSelectedCompany(ctx, context);
            if (ctx != null)
            {
                LogContextSnapshot(
                    ctx,
                    "GetSelectedCompanyId",
                    context,
                    resolution.CompanyId,
                    resolution.Reason);
            }

            return resolution.CompanyId;
        }

        // Clears cached context (optionally preserving the selected company).
        public void ClearContextCache(bool preserveCompanySelection = false)
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
                return;

            var cachedContext = TryReadCachedContext(ctx, logDiagnostics: false);
            var selected = preserveCompanySelection ? ctx.Session.GetString(CompanyKey) : null;
            var cachedSelection = ResolveSelectedCompany(ctx, cachedContext);
            LogContextSnapshot(
                ctx,
                "ClearContextCache before",
                cachedContext,
                cachedSelection.CompanyId,
                preserveCompanySelection
                    ? "Preserving selected company in session."
                    : "Clearing selected company from session.");
            ClearCachedContext(ctx, preserveCompanySelection);

            if (preserveCompanySelection && !string.IsNullOrWhiteSpace(selected))
                ctx.Session.SetString(CompanyKey, selected);

            LogContextSnapshot(
                ctx,
                "ClearContextCache after",
                null,
                preserveCompanySelection ? selected : null,
                preserveCompanySelection
                    ? "Context cleared and selected company kept."
                    : "Context and selected company cleared.");
        }

        public async Task EnsureFreshContextForRequestAsync()
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null || ctx.User?.Identity?.IsAuthenticated != true)
                return;

            var cachedContext = TryReadCachedContext(ctx, logDiagnostics: false);
            if (cachedContext == null || cachedContext.Companies.Count == 0)
                return;

            if (!ShouldRefreshContext(ctx, cachedContext))
            {
                TouchContextActivity(ctx);
                return;
            }

            _logger.LogInformation(
                "Refreshing auth context for request. ContextVersion={ContextVersion}; SessionCompany={SessionCompany}; ContextExpiresUtc={ContextExpiresUtc}",
                cachedContext.ContextVersion,
                NormalizeLogValue(ctx.Session.GetString(CompanyKey)),
                NormalizeLogValue(ctx.Session.GetString(ContextExpiresUtcKey)));

            var refreshResult = await EnsureContextAsync(forceRefresh: true);
            if (!refreshResult.Success)
            {
                var cachedExpiresUtc = TryReadSessionUtc(ctx, ContextExpiresUtcKey);
                if (cachedExpiresUtc.HasValue && cachedExpiresUtc.Value <= DateTime.UtcNow)
                {
                    ClearCachedContext(ctx, preserveCompanySelection: true);
                }

                _logger.LogWarning(
                    "Auth context refresh did not complete. Message={Message}; PreviousContextVersion={ContextVersion}",
                    NormalizeLogValue(refreshResult.Message),
                    cachedContext.ContextVersion);
            }
        }

        public async Task<IndAuthContextResult> EnsureContextAsync(bool forceRefresh = false)
        {
            var ctx = _httpContextAccessor.HttpContext;
            if (ctx == null)
            {
                return new IndAuthContextResult
                {
                    Success = false,
                    Message = "Session not available.",
                    ErrorCode = ErrorCodeSessionExpired
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
                        Message = "Missing Entra OID.",
                        ErrorCode = ErrorCodeSessionExpired
                    };
                }
            }

            // Log Entra OID to help diagnose user mapping issues.
            _logger.LogInformation("Using Entra OID from session: {EntraOid}", entraOid);

            var cachedOid = ctx.Session.GetString(EntraOidContextKey);
            if (!string.IsNullOrWhiteSpace(cachedOid) &&
                !string.Equals(cachedOid, entraOid, StringComparison.OrdinalIgnoreCase))
            {
                var staleContext = TryReadCachedContext(ctx, logDiagnostics: false);
                var staleSelection = ResolveSelectedCompany(ctx, staleContext);
                LogContextSnapshot(
                    ctx,
                    "EnsureContextAsync stale cache detected",
                    staleContext,
                    staleSelection.CompanyId,
                    "Cached OID differs from current session OID.");
                _logger.LogInformation(
                    "Clearing cached context because OID changed. Old: {OldOid} New: {NewOid}",
                    cachedOid,
                    entraOid);
                ClearCachedContext(ctx, preserveCompanySelection: false);
            }

            var cached = TryReadCachedContext(ctx, logDiagnostics: false);
            if (!forceRefresh && cached != null && cached.Companies.Count > 0 && !ShouldRefreshContext(ctx, cached))
            {
                _logger.LogInformation("Using cached Entra context for OID {EntraOid}.", entraOid);
                RestoreAxUserSession(ctx, cached);
                EnsureCompanySelection(ctx, cached);
                RestoreContextMetadata(ctx, cached);
                TouchContextActivity(ctx);
                LogSelectedCompany(ctx);
                var cachedSelection = ResolveSelectedCompany(ctx, cached);
                LogContextSnapshot(
                    ctx,
                    "EnsureContextAsync cache hit",
                    cached,
                    cachedSelection.CompanyId,
                    "Returning cached context.");
                return new IndAuthContextResult
                {
                    Success = true,
                    Context = cached
                };
            }

            if (!forceRefresh && cached != null && cached.Companies.Count > 0)
            {
                _logger.LogInformation(
                    "Refreshing cached Entra context because session metadata is stale. ContextVersion={ContextVersion}; EntraOid={EntraOid}",
                    cached.ContextVersion,
                    NormalizeLogValue(cached.EntraOid));
            }

            var token = await EnsureInternalTokenAsync(ctx, forceRefresh);
            if (string.IsNullOrWhiteSpace(token))
            {
                return new IndAuthContextResult
                {
                    Success = false,
                    Message = "Missing internal token.",
                    ErrorCode = ErrorCodeUpstream
                };
            }

            try
            {
                _logger.LogInformation("Requesting Entra context for OID {EntraOid} and app {AppCode}.", entraOid, IndAuthEnv.AppCode);
                var response = await _apiClient.GetEntraContextAsync(token, entraOid, IndAuthEnv.AppCode);
                if (!forceRefresh && ShouldRetryContextAfterInternalLogin(response))
                {
                    _logger.LogWarning(
                        "Entra context load failed with a recoverable upstream error. Reauthenticating internal API session once. ErrorCode={ErrorCode}; Message={Message}",
                        NormalizeLogValue(response?.ErrorCode),
                        NormalizeLogValue(response?.Message));

                    token = await EnsureInternalTokenAsync(ctx, forceRefresh: true);
                    if (!string.IsNullOrWhiteSpace(token))
                        response = await _apiClient.GetEntraContextAsync(token, entraOid, IndAuthEnv.AppCode);
                }

                if (response == null || response.Items.Count == 0)
                {
                    _logger.LogWarning("Entra context not available for OID {EntraOid}. Message: {Message}", entraOid, response?.Message);
                    return new IndAuthContextResult
                    {
                        Success = false,
                        Message = response?.Message ?? "Context not available.",
                        ErrorCode = NormalizeErrorCode(response?.ErrorCode) ?? ErrorCodeContextDenied
                    };
                }

                var webContext = MapContext(response.Items[0]);
                if (!webContext.Header.Success || webContext.Companies.Count == 0)
                {
                    var deniedSelection = ResolveSelectedCompany(ctx, webContext);
                    LogContextSnapshot(
                        ctx,
                        "EnsureContextAsync denied",
                        webContext,
                        deniedSelection.CompanyId,
                        webContext.Header.Message ?? "Context denied or empty.");
                    ClearCachedContext(ctx, preserveCompanySelection: true);
                    _logger.LogWarning("Entra context denied for OID {EntraOid}. Message: {Message}", entraOid, webContext.Header.Message);
                    return new IndAuthContextResult
                    {
                        Success = false,
                        Message = string.IsNullOrWhiteSpace(webContext.Header.Message)
                            ? "Access denied."
                            : webContext.Header.Message,
                        ErrorCode = NormalizeErrorCode(response.ErrorCode) ?? ErrorCodeContextDenied
                    };
                }

                try
                {
                    ctx.Session.SetString(ContextKey, JsonSerializer.Serialize(webContext));
                    StoreContextMetadata(ctx, webContext, response.Items[0].ContextToken);
                    _logger.LogInformation("Cached Entra context for OID {EntraOid}.", entraOid);
                    var cachedSelection = ResolveSelectedCompany(ctx, webContext);
                    LogContextSnapshot(
                        ctx,
                        "EnsureContextAsync cache stored",
                        webContext,
                        cachedSelection.CompanyId,
                        "Stored fresh Entra context in session.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to cache IND web context.");
                }

                EnsureCompanySelection(ctx, webContext);
                LogSelectedCompany(ctx);
                RestoreAxUserSession(ctx, webContext);
                TouchContextActivity(ctx);
                var finalSelection = ResolveSelectedCompany(ctx, webContext);
                LogContextSnapshot(
                    ctx,
                    "EnsureContextAsync completed",
                    webContext,
                    finalSelection.CompanyId,
                    "Fresh context loaded and session restored.");

                return new IndAuthContextResult
                {
                    Success = true,
                    ErrorCode = string.Empty,
                    Context = webContext
                };
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Context API error.");
                return new IndAuthContextResult
                {
                    Success = false,
                    Message = "Context API error.",
                    ErrorCode = ErrorCodeUpstream
                };
            }
        }

        private async Task<string?> EnsureInternalTokenAsync(HttpContext ctx, bool forceRefresh = false)
        {
            var (token, _) = _tokenSession.GetToken();
            if (!forceRefresh && !string.IsNullOrWhiteSpace(token))
                return token;

            var login = await _apiClient.AuthenticateAsync(IndAuthEnv.ServiceUser, IndAuthEnv.ServicePass);
            if (login == null || string.IsNullOrWhiteSpace(login.Token))
                return null;

            _tokenSession.SetToken(
                login.Token,
                login.Expires != default ? login.Expires : null);

            return login.Token;
        }

        // Detects API process restarts where the JWT is still valid but the AX password cache is gone.
        private static bool ShouldRetryContextAfterInternalLogin(IndEntraContextResponse? response)
        {
            if (response == null)
                return true;

            if (response.Items.Count > 0)
                return false;

            var errorCode = NormalizeErrorCode(response.ErrorCode);
            if (string.Equals(errorCode, ErrorCodeUpstream, StringComparison.OrdinalIgnoreCase) ||
                string.Equals(errorCode, "INTERNAL_ERROR", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(errorCode, "AX_SESSION_ERROR", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(errorCode, "AX_COM_ERROR", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            var message = (response.Message ?? string.Empty).Trim();
            return message.Contains("Error interno", StringComparison.OrdinalIgnoreCase) ||
                   message.Contains("No hay credenciales disponibles", StringComparison.OrdinalIgnoreCase) ||
                   message.Contains("Context API error", StringComparison.OrdinalIgnoreCase);
        }

        // Stores the signed context metadata needed for downstream API calls.
        private void StoreContextMetadata(HttpContext ctx, IndWebContext context, string? contextToken)
        {
            ctx.Session.SetString(EntraOidContextKey, context.EntraOid ?? string.Empty);
            ctx.Session.SetString(ContextTenantIdKey, context.TenantId ?? string.Empty);
            ctx.Session.SetString(ContextVersionKey, context.ContextVersion > 0 ? context.ContextVersion.ToString(CultureInfo.InvariantCulture) : string.Empty);
            ctx.Session.SetString(PermissionsRevisionKey, context.PermissionsRevision ?? string.Empty);
            var normalizedToken = (contextToken ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(normalizedToken))
                ctx.Session.Remove(ContextTokenKey);
            else
                ctx.Session.SetString(ContextTokenKey, normalizedToken);
            WriteOptionalUtc(ctx, ContextIssuedUtcKey, context.ContextIssuedUtc);
            WriteOptionalUtc(ctx, ContextExpiresUtcKey, context.ContextExpiresUtc);
        }

        // Restores derived metadata in session from the cached context.
        private void RestoreContextMetadata(HttpContext ctx, IndWebContext context)
        {
            ctx.Session.SetString(EntraOidContextKey, context.EntraOid ?? string.Empty);
            ctx.Session.SetString(ContextTenantIdKey, context.TenantId ?? string.Empty);
            if (context.ContextVersion > 0)
                ctx.Session.SetString(ContextVersionKey, context.ContextVersion.ToString(CultureInfo.InvariantCulture));
            ctx.Session.SetString(PermissionsRevisionKey, context.PermissionsRevision ?? string.Empty);
            WriteOptionalUtc(ctx, ContextIssuedUtcKey, context.ContextIssuedUtc);
            WriteOptionalUtc(ctx, ContextExpiresUtcKey, context.ContextExpiresUtc);
        }

        // Updates the last activity timestamp for context refresh decisions.
        private static void TouchContextActivity(HttpContext ctx)
        {
            ctx.Session.SetString(ContextLastActivityUtcKey, DateTime.UtcNow.ToString("o", CultureInfo.InvariantCulture));
        }

        // Determines if the current cached context should be refreshed before serving the request.
        private bool ShouldRefreshContext(HttpContext ctx, IndWebContext context)
        {
            if (context == null || context.Companies.Count == 0)
                return false;

            var cachedVersion = TryReadSessionLong(ctx, ContextVersionKey);
            var permissionsRevision = (ctx.Session.GetString(PermissionsRevisionKey) ?? string.Empty).Trim();
            var contextToken = ctx.Session.GetString(ContextTokenKey);
            if (cachedVersion <= 0 || string.IsNullOrWhiteSpace(permissionsRevision) || string.IsNullOrWhiteSpace(contextToken))
                return true;

            var sessionEntraOid = (ctx.Session.GetString(EntraOidKey) ?? string.Empty).Trim();
            if (!string.Equals(sessionEntraOid, context.EntraOid ?? string.Empty, StringComparison.OrdinalIgnoreCase))
                return true;

            var expiresUtc = TryReadSessionUtc(ctx, ContextExpiresUtcKey) ?? context.ContextExpiresUtc;
            if (!expiresUtc.HasValue)
                return true;

            var idleThreshold = TimeSpan.FromMinutes(_contextSettings.IdleRefreshMinutes);
            var lastActivityUtc = TryReadSessionUtc(ctx, ContextLastActivityUtcKey);
            if (!lastActivityUtc.HasValue)
                return true;

            if (lastActivityUtc.HasValue && DateTime.UtcNow - lastActivityUtc.Value >= idleThreshold)
                return true;

            var refreshWindow = TimeSpan.FromMinutes(_contextSettings.RefreshBeforeExpiryMinutes);
            return expiresUtc.Value <= DateTime.UtcNow.Add(refreshWindow);
        }

        private static long TryReadSessionLong(HttpContext ctx, string key)
        {
            var raw = ctx.Session.GetString(key);
            return long.TryParse(raw, NumberStyles.Integer, CultureInfo.InvariantCulture, out var value) ? value : 0L;
        }

        private static DateTime? TryReadSessionUtc(HttpContext ctx, string key)
        {
            var raw = ctx.Session.GetString(key);
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            if (DateTime.TryParse(raw, CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind, out var parsed))
                return parsed.ToUniversalTime();

            return null;
        }

        private static void WriteOptionalUtc(HttpContext ctx, string key, DateTime? value)
        {
            if (!value.HasValue)
            {
                ctx.Session.Remove(key);
                return;
            }

            ctx.Session.SetString(key, value.Value.ToUniversalTime().ToString("o", CultureInfo.InvariantCulture));
        }

        private static DateTime? ParseUtc(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            return DateTime.TryParse(raw, CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind, out var parsed)
                ? parsed.ToUniversalTime()
                : (DateTime?)null;
        }

        private static IndWebContext MapContext(IndEntraContextItem item)
        {
            var context = new IndWebContext
            {
                TenantId = item.TenantId ?? string.Empty,
                EntraOid = item.EntraOid ?? string.Empty,
                ContextVersion = item.ContextVersion ?? 0L,
                PermissionsRevision = item.PermissionsRevision ?? string.Empty,
                ContextIssuedUtc = ParseUtc(item.ContextIssuedUtc),
                ContextExpiresUtc = ParseUtc(item.ContextExpiresUtc),
                Header = MapHeader(item.Header)
            };

            if (item.Companies != null)
            {
                foreach (var c in item.Companies)
                {
                    // Keep the company even when CrmUserId is empty because module access can still be valid.
                    var company = new IndWebCompany
                    {
                        CompanyId = c.CompanyId ?? string.Empty,
                        CompanyName = c.CompanyName ?? string.Empty,
                        IsDefault = ToBool(c.IsDefault),
                        CurrencyCode = c.CurrencyCode ?? string.Empty,
                        CrmUserId = c.CrmUserId ?? string.Empty,
                        AllowSelfManagement = ToBool(c.AllowSelfManagement)
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

        // Keeps the session Ax user aligned with the resolved Entra context.
        private void RestoreAxUserSession(HttpContext ctx, IndWebContext context)
        {
            var previousAxUser = NormalizeLogValue(ctx.Session.GetString(AxUserKey));
            var normalizedAxUserId = (context?.Header?.AxUserId ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(normalizedAxUserId))
            {
                ctx.Session.Remove(AxUserKey);
                _logger.LogWarning(
                    "RestoreAxUserSession cleared session AxUser. PreviousAxUser={PreviousAxUser}; ContextAxUser={ContextAxUser}",
                    previousAxUser,
                    NormalizeLogValue(context?.Header?.AxUserId));
                return;
            }

            ctx.Session.SetString(AxUserKey, normalizedAxUserId);
            _logger.LogInformation(
                "RestoreAxUserSession applied context AxUser. PreviousAxUser={PreviousAxUser}; ContextAxUser={ContextAxUser}",
                previousAxUser,
                normalizedAxUserId);
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
                DefaultCompany = header.DefaultCompany ?? string.Empty,
                DefaultCurrencyCode = header.DefaultCurrencyCode ?? string.Empty
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

        private void EnsureCompanySelection(HttpContext ctx, IndWebContext context)
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
                var selectedCompany = FindCompany(context, selected);
                if (selectedCompany != null)
                {
                    ctx.Session.SetString(CompanyKey, selectedCompany.CompanyId);
                    CacheSelectedCompanyName(ctx, context, selectedCompany.CompanyId);
                    LogContextSnapshot(
                        ctx,
                        "EnsureCompanySelection kept existing",
                        context,
                        selectedCompany.CompanyId,
                        "Existing session company is valid for current context.");
                    return;
                }

                if (isUserSelection)
                {
                    LogContextSnapshot(
                        ctx,
                        "EnsureCompanySelection invalid user selection",
                        context,
                        null,
                        "User-selected company is not available in current context. Applying fallback.");
                }
            }

            var fallback = FindCompany(context, context.Header.DefaultCompany)?.CompanyId
                ?? context.Companies.FirstOrDefault(c => !string.IsNullOrWhiteSpace(c.CompanyId))?.CompanyId;

            if (!string.IsNullOrWhiteSpace(fallback))
            {
                ctx.Session.SetString(CompanyKey, fallback);
                ctx.Session.SetString(CompanySelectionSourceKey, CompanySelectionSourceDefault);
                CacheSelectedCompanyName(ctx, context, fallback);
                LogContextSnapshot(
                    ctx,
                    "EnsureCompanySelection applied fallback",
                    context,
                    fallback,
                    string.Equals(fallback, context.Header.DefaultCompany, StringComparison.OrdinalIgnoreCase)
                        ? "Default company selected."
                        : "First available company selected.");
                return;
            }

            ctx.Session.Remove(CompanyKey);
            ctx.Session.Remove(CompanySelectionSourceKey);
            ctx.Session.Remove(CompanyNameKey);
            LogContextSnapshot(
                ctx,
                "EnsureCompanySelection cleared selection",
                context,
                null,
                "No company available in context.");
        }

        // Resolves a company from the current context using case-insensitive company id matching.
        private static IndWebCompany? FindCompany(IndWebContext? context, string? companyId)
        {
            if (context == null || string.IsNullOrWhiteSpace(companyId))
                return null;

            return context.Companies.FirstOrDefault(c =>
                string.Equals(c.CompanyId, companyId, StringComparison.OrdinalIgnoreCase));
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
            var cachedContext = TryReadCachedContext(ctx, logDiagnostics: false);
            var resolution = ResolveSelectedCompany(ctx, cachedContext);
            if (string.IsNullOrWhiteSpace(resolution.CompanyId))
            {
                _logger.LogWarning("No company selected after Entra context load.");
                return;
            }

            _logger.LogInformation(
                "Selected company from context: {CompanyId}. Reason={Reason}",
                resolution.CompanyId,
                resolution.Reason);
        }

        // Clears cached context and related session values.
        private void ClearCachedContext(HttpContext ctx, bool preserveCompanySelection)
        {
            var cachedContext = TryReadCachedContext(ctx, logDiagnostics: false);
            var cachedSelection = ResolveSelectedCompany(ctx, cachedContext);
            LogContextSnapshot(
                ctx,
                "ClearCachedContext before",
                cachedContext,
                cachedSelection.CompanyId,
                preserveCompanySelection
                    ? "Clearing cache while preserving selected company keys."
                    : "Clearing cache and company selection keys.");
            ctx.Session.Remove(ContextKey);
            ctx.Session.Remove(CompanyNameKey);
            ctx.Session.Remove(EntraOidContextKey);
            ctx.Session.Remove(AxUserKey);
            ctx.Session.Remove(ContextTokenKey);
            ctx.Session.Remove(ContextVersionKey);
            ctx.Session.Remove(PermissionsRevisionKey);
            ctx.Session.Remove(ContextIssuedUtcKey);
            ctx.Session.Remove(ContextExpiresUtcKey);
            ctx.Session.Remove(ContextLastActivityUtcKey);
            ctx.Session.Remove(ContextTenantIdKey);
            if (!preserveCompanySelection)
            {
                ctx.Session.Remove(CompanyKey);
                ctx.Session.Remove(CompanySelectionSourceKey);
            }

            LogContextSnapshot(
                ctx,
                "ClearCachedContext after",
                null,
                preserveCompanySelection ? ctx.Session.GetString(CompanyKey) : null,
                preserveCompanySelection
                    ? "Cache cleared and company selection preserved."
                    : "Cache and company selection cleared.");
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

        private IndWebContext? TryReadCachedContext(HttpContext ctx, bool logDiagnostics)
        {
            var raw = ctx.Session.GetString(ContextKey);
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            try
            {
                var cachedContext = JsonSerializer.Deserialize<IndWebContext>(raw);
                if (cachedContext != null && logDiagnostics)
                {
                    var selection = ResolveSelectedCompany(ctx, cachedContext);
                    LogContextSnapshot(
                        ctx,
                        "GetCachedContext hit",
                        cachedContext,
                        selection.CompanyId,
                        "Session cache deserialized successfully.");
                }

                return cachedContext;
            }
            catch (Exception ex)
            {
                if (logDiagnostics)
                {
                    _logger.LogWarning(ex, "Failed to deserialize cached IND web context.");
                    LogContextSnapshot(
                        ctx,
                        "GetCachedContext deserialize failure",
                        null,
                        null,
                        "Session cache could not be deserialized.");
                }

                return null;
            }
        }

        private (string? CompanyId, string Reason) ResolveSelectedCompany(HttpContext? ctx, IndWebContext? context)
        {
            var selected = ctx?.Session.GetString(CompanyKey);
            var selectionSource = ctx?.Session.GetString(CompanySelectionSourceKey);
            if (!string.IsNullOrWhiteSpace(selected))
            {
                var selectedCompany = FindCompany(context, selected);
                if (selectedCompany != null)
                    return (selectedCompany.CompanyId, "session-selection");

                if (context == null)
                    return (selected, "session-selection-without-context");

                if (string.Equals(selectionSource, CompanySelectionSourceUser, StringComparison.OrdinalIgnoreCase))
                    return (null, "invalid-user-selection");
            }

            if (context != null)
            {
                var defaultCompany = FindCompany(context, context.Header.DefaultCompany);
                if (defaultCompany != null)
                    return (defaultCompany.CompanyId, "default-company");

                var first = context.Companies.FirstOrDefault(c => !string.IsNullOrWhiteSpace(c.CompanyId));
                if (first != null)
                    return (first.CompanyId, "first-company");
            }

            return (null, "no-company");
        }

        private void LogContextSnapshot(
            HttpContext ctx,
            string stage,
            IndWebContext? context,
            string? resolvedCompanyId,
            string? note)
        {
            _logger.LogInformation(
                "IND context trace [{Stage}]. SessionEntraOid={SessionEntraOid}; ContextEntraOid={ContextEntraOid}; ClaimsEntraOid={ClaimsEntraOid}; SessionAxUser={SessionAxUser}; ContextAxUser={ContextAxUser}; SessionCompany={SessionCompany}; SessionCompanyName={SessionCompanyName}; SelectionSource={SelectionSource}; ResolvedCompany={ResolvedCompany}; DefaultCompany={DefaultCompany}; CompanyCount={CompanyCount}; SessionContextVersion={SessionContextVersion}; ContextVersion={ContextVersion}; SessionPermissionsRevision={SessionPermissionsRevision}; ContextPermissionsRevision={ContextPermissionsRevision}; SessionContextExpiresUtc={SessionContextExpiresUtc}; ContextExpiresUtc={ContextExpiresUtc}; Note={Note}",
                stage,
                NormalizeLogValue(ctx.Session.GetString(EntraOidKey)),
                NormalizeLogValue(ctx.Session.GetString(EntraOidContextKey)),
                NormalizeLogValue(TryGetEntraOidFromClaims(ctx.User)),
                NormalizeLogValue(ctx.Session.GetString(AxUserKey)),
                NormalizeLogValue(context?.Header?.AxUserId),
                NormalizeLogValue(ctx.Session.GetString(CompanyKey)),
                NormalizeLogValue(ctx.Session.GetString(CompanyNameKey)),
                NormalizeLogValue(ctx.Session.GetString(CompanySelectionSourceKey)),
                NormalizeLogValue(resolvedCompanyId),
                NormalizeLogValue(context?.Header?.DefaultCompany),
                context?.Companies?.Count ?? 0,
                NormalizeLogValue(ctx.Session.GetString(ContextVersionKey)),
                context?.ContextVersion ?? 0,
                NormalizeLogValue(ctx.Session.GetString(PermissionsRevisionKey)),
                NormalizeLogValue(context?.PermissionsRevision),
                NormalizeLogValue(ctx.Session.GetString(ContextExpiresUtcKey)),
                NormalizeLogValue(context?.ContextExpiresUtc?.ToString("o", CultureInfo.InvariantCulture)),
                NormalizeLogValue(note));
        }

        private static string? NormalizeErrorCode(string? value)
        {
            var normalized = (value ?? string.Empty).Trim();
            return string.IsNullOrWhiteSpace(normalized) ? null : normalized;
        }

        private static string NormalizeLogValue(string? value)
        {
            var trimmed = (value ?? string.Empty).Trim();
            return string.IsNullOrWhiteSpace(trimmed) ? "(empty)" : trimmed;
        }
    }
}
