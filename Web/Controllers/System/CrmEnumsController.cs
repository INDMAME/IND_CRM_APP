using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Models.CRM;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Controllers
{
    // Provides local JSON endpoints for CRM enum catalog consumers.
    public class CrmEnumsController : BaseMvcController
    {
        private readonly ILogger<CrmEnumsController> _logger;
        private readonly IStringLocalizer<INDSharedResource> _sr;

        public CrmEnumsController(
            ICrmApiClient apiClient,
            ITokenSessionService tokenSession,
            ILogger<CrmEnumsController> logger,
            IStringLocalizer<INDSharedResource> sr) : base(apiClient, tokenSession)
        {
            _logger = logger;
            _sr = sr;
        }

        // API route used by React clients for /api/crm/enums/by-name.
        [HttpGet]
        public async Task<IActionResult> ApiCrmEnumsByName(
            [FromQuery] string appCode = "CRM",
            [FromQuery] string axEnumNames = "")
        {
            var token = GetToken();
            if (string.IsNullOrWhiteSpace(token))
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new
                {
                    success = false,
                    message = _sr["Api_SessionExpired"].Value,
                    items = Array.Empty<CrmEnumCatalogDto>()
                });
            }

            try
            {
                var result = await _apiClient.GetEnumCatalogByNameAsync(token, appCode, SplitCsv(axEnumNames));
                var items = result.GetAnyItems().ToList();

                return Json(new
                {
                    success = result.Success,
                    message = result.Message,
                    errorCode = result.ErrorCode,
                    total = result.Total > 0 ? result.Total : items.Count,
                    page = result.Page,
                    pageSize = result.PageSize,
                    items,
                    traceId = result.TraceId,
                    errors = result.Errors
                });
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "Upstream API error in ApiCrmEnumsByName");
                return StatusCode(StatusCodes.Status502BadGateway, new
                {
                    success = false,
                    message = _sr["Api_RequestFailed"].Value,
                    items = Array.Empty<CrmEnumCatalogDto>()
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in ApiCrmEnumsByName");
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    message = _sr["Api_RequestFailed"].Value,
                    items = Array.Empty<CrmEnumCatalogDto>()
                });
            }
        }

        // Splits optional CSV query values into clean enum names.
        private static IEnumerable<string> SplitCsv(string raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return Enumerable.Empty<string>();

            return raw
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Where(value => !string.IsNullOrWhiteSpace(value))
                .Distinct(StringComparer.OrdinalIgnoreCase);
        }
    }
}
