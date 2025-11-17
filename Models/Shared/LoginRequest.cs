using System.ComponentModel.DataAnnotations;

namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Modelo utilizado para representar las credenciales de inicio de sesión del usuario.
    /// </summary>
    /// <remarks>
    /// Se valida automáticamente por el sistema MVC antes de ser enviada a la API 
    /// para obtener el token JWT correspondiente.
    /// </remarks>
    public class LoginRequest
    {
        /// <summary>
        /// Nombre de usuario registrado en el sistema.
        /// </summary>
        [Required]
        public string Username { get; set; }

        /// <summary>
        /// Contraseña asociada al usuario.
        /// </summary>
        [Required]
        public string Password { get; set; }
    }
}
