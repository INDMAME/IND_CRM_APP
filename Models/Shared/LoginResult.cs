namespace IND_CRM_APP.Models.Shared
{
    public class LoginResult
    {
        public bool Success { get; set; }
        public string Token { get; set; } = "";
        public string Message { get; set; } = "";
    }
}
