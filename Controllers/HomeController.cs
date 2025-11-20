using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("Create", "Visitas");
        }
    }
}
