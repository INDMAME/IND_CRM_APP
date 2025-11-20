public class ApiResponse
{
    public bool Success { get; set; }
    public string? Message { get; set; }

    // AX devuelve RecId o NULL → lo agregamos aquí
    public string? RecId { get; set; }
}
