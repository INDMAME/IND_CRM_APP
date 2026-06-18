using IND_CRM_APP.Infrastructure.Localization;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace IND_CRM_APP.Controllers
{
    // JSON casing options used by legacy MVC endpoints.
    internal enum ModuleRecordMutationJsonCase
    {
        CamelCase,
        PascalCase
    }

    // Converts reusable mutation permission decisions into MVC action results.
    internal static class ModuleRecordMutationActionResults
    {
        public static IActionResult? ToActionResult(
            ControllerBase controller,
            ModuleRecordMutationPermissionResult result,
            IStringLocalizer<INDSharedResource> sr,
            ModuleRecordMutationJsonCase jsonCase = ModuleRecordMutationJsonCase.CamelCase)
        {
            if (result.IsAllowed)
                return null;

            var message = string.IsNullOrWhiteSpace(result.Message)
                ? sr["Api_RequestFailed"].Value
                : result.Message;

            return result.Status switch
            {
                ModuleRecordMutationPermissionStatus.Unauthorized => controller.Unauthorized(
                    BuildPayload(jsonCase, sr["Api_SessionExpired"].Value)),
                ModuleRecordMutationPermissionStatus.NotFound => controller.NotFound(
                    BuildPayload(jsonCase, message)),
                ModuleRecordMutationPermissionStatus.UpstreamError => controller.StatusCode(
                    StatusCodes.Status502BadGateway,
                    BuildPayload(jsonCase, sr["Api_RequestFailed"].Value)),
                _ => controller.StatusCode(
                    StatusCodes.Status403Forbidden,
                    BuildPayload(jsonCase, sr["Auth_PermissionDenied_Body"].Value))
            };
        }

        private static object BuildPayload(ModuleRecordMutationJsonCase jsonCase, string message)
        {
            return jsonCase == ModuleRecordMutationJsonCase.PascalCase
                ? new { Success = false, Message = message }
                : new { success = false, message };
        }
    }
}
