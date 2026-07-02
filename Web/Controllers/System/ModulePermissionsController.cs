using System;
using System.Linq;
using System.Text.Json;
using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace IND_CRM_APP.Controllers
{
    // Receives client-side diagnostics for reusable module permission flows.
    [Route("ModulePermissions")]
    public sealed class ModulePermissionsController : Controller
    {
        private readonly ITokenSessionService _tokenSession;
        private readonly IStringLocalizer<INDSharedResource> _sr;
        private readonly ILogger<ModulePermissionsController> _logger;

        public ModulePermissionsController(
            ITokenSessionService tokenSession,
            IStringLocalizer<INDSharedResource> sr,
            ILogger<ModulePermissionsController> logger)
        {
            _tokenSession = tokenSession;
            _sr = sr;
            _logger = logger;
        }

        // Logs one client-side module permission decision without changing UI flow.
        [HttpPost("Trace")]
        [ValidateAntiForgeryToken]
        public IActionResult Trace([FromBody] JsonElement payload)
        {
            var token = _tokenSession.GetToken().Token;
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { success = false, message = _sr["Api_SessionExpired"].Value });

            if (payload.ValueKind != JsonValueKind.Object)
                return BadRequest(new { success = false, message = _sr["Api_RequestFailed"].Value });

            var eventName = ReadTraceString(payload, "event", "Event");
            if (string.IsNullOrWhiteSpace(eventName))
                eventName = "unknown";

            _logger.LogInformation(
                "Module permission client trace. Event={Event}; AppCode={AppCode}; ModuleCode={ModuleCode}; Path={Path}; RecId={RecId}; ViewerAxUserId={ViewerAxUserId}; OwnerAxUserId={OwnerAxUserId}; Reason={Reason}; Payload={Payload}",
                eventName,
                ReadTraceString(payload, "appCode", "AppCode"),
                ReadTraceString(payload, "moduleCode", "ModuleCode"),
                ReadTraceString(payload, "path", "Path"),
                ReadTraceString(payload, "recId", "RecId"),
                ReadTraceString(payload, "viewerAxUserId", "ViewerAxUserId"),
                ReadTraceString(payload, "ownerAxUserId", "OwnerAxUserId"),
                ReadTraceString(payload, "reason", "Reason"),
                LimitTracePayload(payload.GetRawText()));

            return Json(new { success = true });
        }

        // Reads string-like values from JSON trace payloads using case-insensitive names.
        private static string ReadTraceString(JsonElement payload, params string[] propertyNames)
        {
            if (payload.ValueKind != JsonValueKind.Object || propertyNames.Length == 0)
                return string.Empty;

            foreach (var property in payload.EnumerateObject())
            {
                if (!propertyNames.Any(name => string.Equals(name, property.Name, StringComparison.OrdinalIgnoreCase)))
                    continue;

                return property.Value.ValueKind switch
                {
                    JsonValueKind.String => property.Value.GetString()?.Trim() ?? string.Empty,
                    JsonValueKind.Number => property.Value.GetRawText(),
                    JsonValueKind.True => "true",
                    JsonValueKind.False => "false",
                    _ => string.Empty
                };
            }

            return string.Empty;
        }

        // Keeps diagnostic payloads readable without flooding the application log.
        private static string LimitTracePayload(string rawPayload)
        {
            const int maxLength = 4000;
            if (string.IsNullOrWhiteSpace(rawPayload))
                return string.Empty;

            return rawPayload.Length <= maxLength
                ? rawPayload
                : rawPayload.Substring(0, maxLength);
        }
    }
}
