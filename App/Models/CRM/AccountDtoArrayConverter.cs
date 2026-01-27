using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Allows deserializing accounts that arrive as arrays:
    /// ["VC0001","Comercial","Razon social","Origen"].
    /// Also supports the standard object format.
    /// </summary>
    public class AccountDtoArrayConverter : JsonConverter<AccountDto>
    {
        public override AccountDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // Common case: JSON object.
            if (reader.TokenType == JsonTokenType.StartObject)
            {
                return JsonSerializer.Deserialize<AccountDto>(ref reader, options)!;
            }

            if (reader.TokenType != JsonTokenType.StartArray)
                throw new JsonException("Se esperaba un array para AccountDto.");

            reader.Read(); // first array element

            var accountNum = ReadAsString(ref reader);
            var nombreComercial = ReadAsString(ref reader);
            var razonSocial = ReadAsString(ref reader);
            var origen = ReadAsString(ref reader);

            // Consume any extra elements if present.
            while (reader.TokenType != JsonTokenType.EndArray && reader.Read()) { }

            return new AccountDto
            {
                AccountNum = accountNum ?? string.Empty,
                NombreComercial = nombreComercial ?? string.Empty,
                RazonSocial = razonSocial ?? string.Empty,
                Origen = origen ?? string.Empty
            };
        }

        public override void Write(Utf8JsonWriter writer, AccountDto value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, (object)value, options);
        }

        private static string? ReadAsString(ref Utf8JsonReader reader)
        {
            if (reader.TokenType == JsonTokenType.EndArray) return null;

            string? result = reader.TokenType switch
            {
                JsonTokenType.String => reader.GetString(),
                JsonTokenType.Number => reader.TryGetInt64(out var i)
                    ? i.ToString(CultureInfo.InvariantCulture)
                    : reader.GetDouble().ToString(CultureInfo.InvariantCulture),
                JsonTokenType.Null => null,
                _ => reader.GetString()
            };

            reader.Read();
            return result;
        }
    }
}
