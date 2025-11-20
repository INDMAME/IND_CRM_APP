using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Services;
using IND_CRM_APP.Services.Enums;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    public class VisitasController : Controller
    {
        private readonly ApiClientService _api;

        public VisitasController(ApiClientService api)
        {
            _api = api;
        }

        [HttpGet]
        public async Task<IActionResult> GetAccountsForDropdown(
            string term = "",
            int page = 1,
            int pageSize = 20)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { message = "Sesion expirada" });

            var result = await _api.GetAccountsAsync(token, term ?? "", page, pageSize);

            return Json(new
            {
                total = result.Total,
                items = result.Items
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetContactsForDropdown(
            string accountNum,
            int page = 1,
            int pageSize = 500)
        {
            var token = HttpContext.Session.GetString("Token");
            if (string.IsNullOrWhiteSpace(token))
                return Unauthorized(new { message = "Sesion expirada" });

            if (string.IsNullOrWhiteSpace(accountNum))
                return BadRequest(new { message = "Falta accountNum" });

            var result = await _api.GetContactosAsync(token, accountNum, page, pageSize);

            return Json(new
            {
                total = result.Total,
                items = result.Items
            });
        }

        [HttpGet]
        public IActionResult Create()
        {
            try
            {
                var token = HttpContext.Session.GetString("Token");
                if (string.IsNullOrEmpty(token))
                    return RedirectToAction("Login", "Auth");

                ViewBag.CRMActividadTypeEnum = CrmEnumHelper.GetActividadTypeItems();
                ViewBag.CRMTipoVisitaEnum = CrmEnumHelper.GetTipoVisitaItems();
                ViewBag.CRMActividadOrigenEnum = CrmEnumHelper.GetActividadOrigenItems();
                ViewBag.AsistenteTipoEnum = CrmEnumHelper.GetAsistenteTipoItems();

                ViewBag.Environment = HttpContext.Session.GetString("Environment");
                ViewBag.Company = HttpContext.Session.GetString("Company");
                ViewBag.AxUser = HttpContext.Session.GetString("AxUser");

                return View();
            }
            catch
            {
                return View();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] CreateActivityRequest req)
        {
            try
            {
                string token = HttpContext.Session.GetString("Token") ?? "";
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = "Token no encontrado en sesion." });

                var response = await _api.CreateActivityAsync(token, req);

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

        [HttpPost]
        public async Task<IActionResult> CreateVisitaAsistente([FromBody] CreateVisitaAsistenteRequest req)
        {
            try
            {
                string token = HttpContext.Session.GetString("Token") ?? "";
                if (string.IsNullOrEmpty(token))
                    return Json(new { success = false, message = "Token no encontrado en sesion." });

                var response = await _api.CreateVisitaAsistenteAsync(token, req);

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
