using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    // Controller for visit and activity screens
    public class VisitasController : BaseMvcController
    {
        public VisitasController(ICrmApiClient apiClient) : base(apiClient)
        {
        }

        // Returns accounts for dropdown with paging
        // Uses api/crm/accounts/listAccounts via ICrmApiClient
        [HttpGet]
        public async Task<IActionResult> GetAccountsForDropdown(
            string term = "",
            int page = 1,
            int pageSize = 20)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { message = "Session expired" });

            var result = await _apiClient.GetAccountsAsync(token, term ?? string.Empty, page, pageSize);

            return Json(new
            {
                total = result.Total,
                items = result.Items
            });
        }

        // Returns contacts for dropdown given an account number
        // Uses api/crm/accounts/listContacts via ICrmApiClient
        [HttpGet]
        public async Task<IActionResult> GetContactsForDropdown(
            string accountNum,
            int page = 1,
            int pageSize = 500)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { message = "Session expired" });

            if (string.IsNullOrWhiteSpace(accountNum))
                return BadRequest(new { message = "Missing accountNum" });

            var result = await _apiClient.GetContactosAsync(token, accountNum, page, pageSize);

            return Json(new
            {
                total = result.Total,
                items = result.Items
            });
        }

        // Shows main create activity view
        [HttpGet]
        public IActionResult Create()
        {
            try
            {
                var token = HttpContext.Session.GetString("Token");
                if (string.IsNullOrEmpty(token))
                    return RedirectToAction("Login", "Auth");

                // Load enum lists for selects
                ViewBag.CRMActividadTypeEnum = CrmEnumHelper.GetActividadTypeItems();
                ViewBag.CRMTipoVisitaEnum = CrmEnumHelper.GetTipoVisitaItems();
                ViewBag.CRMActividadOrigenEnum = CrmEnumHelper.GetActividadOrigenItems();
                ViewBag.AsistenteTipoEnum = CrmEnumHelper.GetAsistenteTipoItems();

                // Optional session info for layout
                ViewBag.Environment = HttpContext.Session.GetString("Environment");
                ViewBag.Company = HttpContext.Session.GetString("Company");
                ViewBag.AxUser = HttpContext.Session.GetString("AxUser");

                return View();
            }
            catch
            {
                // In case of error, still return view
                return View();
            }
        }

        // Creates a new activity calling api/crm/activities/create
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] CreateActivityRequest req)
        {
            try
            {
                string token = HttpContext.Session.GetString("Token") ?? string.Empty;
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = "Token not found in session." });

                var response = await _apiClient.CreateActivityAsync(token, req);

                return Json(new
                {
                    success = response.Success,
                    message = response.Message
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        // Creates a new visit assistant calling api/crm/visits/createVisitaAsistente
        [HttpPost]
        public async Task<IActionResult> CreateVisitaAsistente([FromBody] CreateVisitaAsistenteRequest req)
        {
            try
            {
                string token = HttpContext.Session.GetString("Token") ?? string.Empty;
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = "Token not found in session." });

                var response = await _apiClient.CreateVisitaAsistenteAsync(token, req);

                return Json(new
                {
                    success = response.Success,
                    message = response.Message
                });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}
