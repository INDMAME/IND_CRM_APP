using IND_CRM_APP.Models.Shared;
using IND_CRM_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace IND_CRM_APP.Controllers
{
    public class AuthController : Controller
    {
        private readonly ApiClientService _api;

        public AuthController(ApiClientService api)
        {
            _api = api;
        }

        public IActionResult Login()
        {
            return View(new LoginRequest());
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest dto)
        {
            var token = await _api.AuthenticateAsync(dto.Username, dto.Password);

            if (string.IsNullOrWhiteSpace(token))
            {
                ViewBag.Error = "Credenciales inválidas.";
                return View(dto);
            }

            HttpContext.Session.SetString("Token", token);
            HttpContext.Session.SetString("AxUser", dto.Username);
            HttpContext.Session.SetString("AxPassword", dto.Password);

            // Nuestro middleware usará esta fecha para refrescar el token
            HttpContext.Session.SetString("TokenExpires", DateTime.UtcNow.AddMinutes(15).ToString("o"));

            return RedirectToAction("Index", "Home");
        }


        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
