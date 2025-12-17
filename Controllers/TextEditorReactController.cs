using IND_CRM_APP.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // Hosts a React island used to edit long multiline text.
    public class TextEditorReactController : Controller
    {
        // Opens the React editor for a specific multiline field.
        [HttpGet]
        public IActionResult EditField(
            string fieldId,
            string fieldLabel,
            string? fieldValue = null,
            string? returnUrl = null)
        {
            if (string.IsNullOrWhiteSpace(fieldId) || string.IsNullOrWhiteSpace(fieldLabel))
            {
                return NotFound();
            }

            var safeReturnUrl = !string.IsNullOrWhiteSpace(returnUrl) && Url.IsLocalUrl(returnUrl)
                ? returnUrl
                : null;

            var vm = new TextEditorReactViewModel
            {
                FieldId = fieldId.Trim(),
                FieldLabel = fieldLabel.Trim(),
                FieldValue = fieldValue ?? string.Empty,
                ReturnUrl = safeReturnUrl
            };

            return View(vm);
        }
    }
}

