using System.ComponentModel.DataAnnotations;

namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Model for login request data.
    /// </summary>
    public class LoginRequest
    {
        [Required]
        [MaxLength(128)]
        public string Username { get; set; } = "";
        [Required]
        [MaxLength(256)]
        public string Password { get; set; } = "";
    }
}
