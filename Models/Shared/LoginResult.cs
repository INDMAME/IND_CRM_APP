namespace IND_CRM_APP.Models.Shared
{
    // Resultado de login o refresh de token
    public class LoginResult
    {
        // Indica si la operacion tuvo exito
        public bool Success { get; set; }

        // Token JWT recibido desde la API
        public string Token { get; set; } = string.Empty;

        // Mensaje de error o informacion adicional
        public string Message { get; set; } = string.Empty;

        // Fecha de expiracion del token en UTC
        public DateTime Expires { get; set; }
    }
}
