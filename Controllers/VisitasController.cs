using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace IND_CRM_APP.Controllers
{
    public class VisitasController : Controller
    {
        // Verifica que la sesión exista antes de mostrar vistas.
        private bool ValidateSession()
        {
            var username = HttpContext.Session.GetString("Username");
            return !string.IsNullOrEmpty(username);
        }

        // Página principal (redirección opcional)
        public IActionResult Index()
        {
            if (!ValidateSession())
                return RedirectToAction("Login", "Auth");

            return RedirectToAction("Historial");
        }

        // Crear visita
        public IActionResult Create()
        {
            if (!ValidateSession())
                return RedirectToAction("Login", "Auth");

            return View("~/Views/Visitas/Create.cshtml");
        }

        // Historial de visitas
        public IActionResult Historial()
        {
            if (!ValidateSession())
                return RedirectToAction("Login", "Auth");

            return View("~/Views/Visitas/Historial.cshtml");
        }
    }
}
