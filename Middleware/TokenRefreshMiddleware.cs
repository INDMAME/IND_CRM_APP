namespace IND_CRM_APP.Middleware
{
    public class TokenRefreshMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenRefreshMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Session.GetString("Token");
            var expiresString = context.Session.GetString("TokenExpires");

            if (!string.IsNullOrEmpty(token) && DateTime.TryParse(expiresString, out var expires))
            {
                var minutesLeft = (expires - DateTime.UtcNow).TotalMinutes;

                // Si faltan menos de 3 minutos -> refrescar token
                if (minutesLeft < 3)
                {
                    var username = context.Session.GetString("AxUser");
                    var password = context.Session.GetString("AxPassword");

                    if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
                    {
                        // Hacer login silencioso
                        var api = context.RequestServices.GetService<Services.ApiClientService>();
                        var newToken = await api.AuthenticateAsync(username, password);

                        if (!string.IsNullOrWhiteSpace(newToken))
                        {
                            context.Session.SetString("Token", newToken);
                            context.Session.SetString("TokenExpires", DateTime.UtcNow.AddMinutes(15).ToString("o"));
                        }
                    }
                }
            }

            await _next(context);
        }
    }
}
