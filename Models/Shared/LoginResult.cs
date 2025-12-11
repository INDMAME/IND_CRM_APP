namespace IND_CRM_APP.Models.Shared
{
    // Resultado de login o refresh de token
    public class LoginResult
    {
        // Indica si la operacion tuvo éxito
        public bool Success { get; set; }

        // Token JWT recibido desde la API
        public string Token { get; set; } = string.Empty;

        // Mensaje de error o informacion adicional
        public string Message { get; set; } = string.Empty;

        // Fecha de expiracion del token en UTC
        public DateTime Expires { get; set; }

        // Codigo de error de negocio cuando Success es false
        public string? ErrorCode { get; set; }

        // Errores de validacion retornados por la API
        public List<IndValidationError> Errors { get; set; } = new();

        // Identificador de traza opcional
        public string? TraceId { get; set; }
    }
}
