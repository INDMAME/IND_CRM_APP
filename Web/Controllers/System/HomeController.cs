using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;
using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Models.Shared;
using Microsoft.Extensions.Localization;

namespace IND_CRM_APP.Controllers
{
    /// <summary>
    /// Handles MVC requests for home.
    /// </summary>
    public class HomeController : BaseMvcController
    {
        private const string HelpFeatureFlagKey = "Features:CrmHelpAssistantEnabled";
        private const int MaxQuestionLength = 1200;
        private const int MaxSelectedModuleIdLength = 80;
        private const int MaxHistoryItems = 8;
        private const int MaxHistoryContentLength = 1600;
        private const int MaxFeedbackCommentLength = 500;
        private static readonly string[] SupportedHelpLocales = { "es-ES", "eu-ES", "en", "pt", "it", "zh-Hans" };
        private static readonly HashSet<string> FeedbackReasons = new(StringComparer.OrdinalIgnoreCase)
        {
            "incorrect",
            "outdated",
            "unclear",
            "incomplete",
            "permissions",
            "other"
        };

        private readonly IIndAuthContextService _authContext;
        private readonly IConfiguration _configuration;
        private readonly IStringLocalizer<INDSharedResource> _sr;
        private readonly ILogger<HomeController> _logger;

        public HomeController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            IIndAuthContextService authContext,
            IConfiguration configuration,
            IStringLocalizer<INDSharedResource> sr,
            ILogger<HomeController> logger) : base(apiClient, tokenSession)
        {
            _authContext = authContext;
            _configuration = configuration;
            _sr = sr;
            _logger = logger;
        }

        // Renders Home and exposes the fail-closed help feature flag to Razor.
        public async Task<IActionResult> Index()
        {
            // Force-refresh without clearing first so a temporary API failure does not destroy a valid context.
            await _authContext.EnsureContextAsync(forceRefresh: true);

            await LoadEnvironmentInfoAsync();
            ViewBag.CrmHelpAssistantEnabled = IsHelpAssistantEnabled();
            return View();
        }

        // Renders the dedicated CRM manual while the help feature is enabled.
        [HttpGet]
        public async Task<IActionResult> Manual()
        {
            if (!IsHelpAssistantEnabled())
                return NotFound(StatusCodes.Status404NotFound);

            // Keep the sidebar company and permission context fresh on direct navigation.
            await _authContext.EnsureContextAsync(forceRefresh: true);
            return View();
        }

        // Returns the localized CRM help catalog to the Home React island.
        [HttpGet]
        public async Task<IActionResult> ApiHelpCatalog([FromQuery] string? responseLocale = null)
        {
            var guard = ValidateHelpRequest(responseLocale);
            if (guard.Error != null)
                return guard.Error;

            try
            {
                var transport = await _apiClient.GetHelpCatalogAsync(
                    guard.Token!,
                    guard.Locale!,
                    HttpContext.RequestAborted);
                return CreateTransportResult(transport);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiHelpCatalog");
                return CreateHelpError(StatusCodes.Status502BadGateway, "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiHelpCatalog");
                return CreateHelpError(StatusCodes.Status500InternalServerError, "UNHANDLED_ERROR");
            }
        }

        // Returns one localized CRM help topic for source inspection.
        [HttpGet]
        public async Task<IActionResult> ApiHelpTopic(string? topicId, [FromQuery] string? responseLocale = null)
        {
            var guard = ValidateHelpRequest(responseLocale);
            if (guard.Error != null)
                return guard.Error;

            var normalizedTopicId = NormalizeText(topicId);
            if (string.IsNullOrWhiteSpace(normalizedTopicId) || normalizedTopicId.Length > 128)
                return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_TOPIC_ID");

            try
            {
                var transport = await _apiClient.GetHelpTopicAsync(
                    guard.Token!,
                    normalizedTopicId,
                    guard.Locale!,
                    HttpContext.RequestAborted);
                return CreateTransportResult(transport);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiHelpTopic");
                return CreateHelpError(StatusCodes.Status502BadGateway, "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiHelpTopic");
                return CreateHelpError(StatusCodes.Status500InternalServerError, "UNHANDLED_ERROR");
            }
        }

        // Proxies one bounded CRM help question to the grounded assistant endpoint.
        [HttpPost]
        public async Task<IActionResult> ApiHelpAsk([FromBody] CrmHelpAskRequest? request)
        {
            var guard = ValidateHelpRequest(request?.ResponseLocale);
            if (guard.Error != null)
                return guard.Error;

            var validationError = NormalizeAskRequest(request, guard.Locale!);
            if (validationError != null)
                return validationError;

            try
            {
                var transport = await _apiClient.AskCrmHelpAsync(
                    guard.Token!,
                    request!,
                    HttpContext.RequestAborted);
                return CreateTransportResult(transport);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiHelpAsk");
                return CreateHelpError(StatusCodes.Status502BadGateway, "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiHelpAsk");
                return CreateHelpError(StatusCodes.Status500InternalServerError, "UNHANDLED_ERROR");
            }
        }

        // Proxies one signed helpful or not-helpful rating to the CRM help API.
        [HttpPost]
        public async Task<IActionResult> ApiHelpFeedback([FromBody] CrmHelpFeedbackRequest? request)
        {
            var guard = ValidateHelpRequest("es-ES");
            if (guard.Error != null)
                return guard.Error;

            var validationError = NormalizeFeedbackRequest(request);
            if (validationError != null)
                return validationError;

            try
            {
                var transport = await _apiClient.SubmitCrmHelpFeedbackAsync(
                    guard.Token!,
                    request!,
                    HttpContext.RequestAborted);
                return CreateTransportResult(transport);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiHelpFeedback");
                return CreateHelpError(StatusCodes.Status502BadGateway, "UPSTREAM_ERROR");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiHelpFeedback");
                return CreateHelpError(StatusCodes.Status500InternalServerError, "UNHANDLED_ERROR");
            }
        }

        // Shows a friendly 404 page for missing routes.
        [HttpGet]
        public IActionResult NotFound(int? code = null)
        {
            Response.StatusCode = 404;
            ViewData["StatusCode"] = code ?? 404;
            return View("NotFound");
        }

        // Reads the help flag with a false default when configuration is missing.
        private bool IsHelpAssistantEnabled()
        {
            return _configuration.GetValue<bool?>(HelpFeatureFlagKey) == true;
        }

        // Validates the shared feature, session, and locale requirements for help routes.
        private (string? Token, string? Locale, IActionResult? Error) ValidateHelpRequest(string? responseLocale)
        {
            if (!IsHelpAssistantEnabled())
                return (null, null, CreateHelpError(StatusCodes.Status404NotFound, "FEATURE_DISABLED"));

            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
                return (null, null, CreateHelpError(StatusCodes.Status401Unauthorized, "SESSION_EXPIRED"));

            var requestedLocale = NormalizeText(responseLocale) ?? "es-ES";
            var locale = SupportedHelpLocales.FirstOrDefault(item =>
                string.Equals(item, requestedLocale, StringComparison.OrdinalIgnoreCase));
            if (string.IsNullOrWhiteSpace(locale))
                return (null, null, CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_LOCALE"));

            return (token, locale, null);
        }

        // Normalizes and bounds one assistant request before it leaves the APP.
        private IActionResult? NormalizeAskRequest(CrmHelpAskRequest? request, string locale)
        {
            if (request == null)
                return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_REQUEST");

            request.Question = NormalizeText(request.Question) ?? string.Empty;
            request.ResponseLocale = locale;
            request.SelectedTopicId = NormalizeText(request.SelectedTopicId);
            request.SelectedModuleId = NormalizeText(request.SelectedModuleId) ?? string.Empty;
            request.AnswerInstructions = CrmHelpAnswerInstructions.Value;
            request.ClientInteractionId = NormalizeText(request.ClientInteractionId) ?? string.Empty;
            request.History ??= new List<CrmHelpHistoryMessage>();

            if (request.Question.Length == 0 || request.Question.Length > MaxQuestionLength)
                return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_QUESTION");
            if (request.SelectedModuleId.Length == 0 || request.SelectedModuleId.Length > MaxSelectedModuleIdLength)
                return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_MODULE_ID");
            if (request.SelectedTopicId?.Length > 128)
                return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_TOPIC_ID");
            if (!Guid.TryParse(request.ClientInteractionId, out _))
                return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_INTERACTION_ID");
            if (request.History.Count > MaxHistoryItems)
                return CreateHelpError(StatusCodes.Status400BadRequest, "HISTORY_TOO_LARGE");

            foreach (var item in request.History)
            {
                if (item == null)
                    return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_HISTORY");

                item.Role = NormalizeText(item.Role) ?? string.Empty;
                item.Content = NormalizeText(item.Content) ?? string.Empty;
                if ((item.Role != "user" && item.Role != "assistant") ||
                    item.Content.Length == 0 ||
                    item.Content.Length > MaxHistoryContentLength)
                {
                    return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_HISTORY");
                }
            }

            return null;
        }

        // Normalizes and validates signed feedback without logging its text.
        private IActionResult? NormalizeFeedbackRequest(CrmHelpFeedbackRequest? request)
        {
            if (request == null)
                return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_REQUEST");

            request.FeedbackToken = NormalizeText(request.FeedbackToken) ?? string.Empty;
            request.Reason = NormalizeText(request.Reason)?.ToLowerInvariant();
            request.Comment = NormalizeText(request.Comment);

            if (request.FeedbackToken.Length == 0 || request.FeedbackToken.Length > 4096)
                return CreateHelpError(StatusCodes.Status400BadRequest, "INVALID_FEEDBACK_TOKEN");
            if (request.Comment?.Length > MaxFeedbackCommentLength)
                return CreateHelpError(StatusCodes.Status400BadRequest, "COMMENT_TOO_LARGE");
            if (!request.Helpful && (string.IsNullOrWhiteSpace(request.Reason) || !FeedbackReasons.Contains(request.Reason)))
                return CreateHelpError(StatusCodes.Status400BadRequest, "FEEDBACK_REASON_REQUIRED");

            if (request.Helpful)
                request.Reason = null;

            return null;
        }

        // Preserves the upstream API envelope, HTTP status, and Retry-After header.
        private IActionResult CreateTransportResult<T>(ApiTransportResponse<T> transport)
        {
            if (transport.Headers.TryGetValue("Retry-After", out var values))
            {
                var retryAfter = values?.FirstOrDefault();
                if (!string.IsNullOrWhiteSpace(retryAfter))
                    Response.Headers["Retry-After"] = retryAfter;
            }

            return StatusCode((int)transport.StatusCode, transport.Response);
        }

        // Creates one standard local help error without exposing technical details.
        private IActionResult CreateHelpError(int statusCode, string errorCode)
        {
            return StatusCode(statusCode, new ApiResponse<object>
            {
                Success = false,
                Message = statusCode == StatusCodes.Status401Unauthorized
                    ? _sr["Api_SessionExpired"].Value
                    : _sr["Api_RequestFailed"].Value,
                ErrorCode = errorCode,
                TraceId = HttpContext.TraceIdentifier
            });
        }

        // Returns trimmed text or null for an empty value.
        private static string? NormalizeText(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }
    }
}
