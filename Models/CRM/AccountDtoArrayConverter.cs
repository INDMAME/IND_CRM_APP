using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Permite deserializar cuentas que llegan como arrays:
    /// ["VC0001","Comercial","Razón social","Origen"].
    /// También admite el formato objeto estándar.
    /// </summary>
    public class AccountDtoArrayConverter : JsonConverter<AccountDto>
    {
        public override AccountDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            // Caso habitual: objeto JSON
            if (reader.TokenType == JsonTokenType.StartObject)
            {
                return JsonSerializer.Deserialize<AccountDto>(ref reader, options)!;
            }

            if (reader.TokenType != JsonTokenType.StartArray)
                throw new JsonException("Se esperaba un array para AccountDto.");

            reader.Read(); // primer elemento del array

            var accountNum = ReadAsString(ref reader);
            var nombreComercial = ReadAsString(ref reader);
            var razonSocial = ReadAsString(ref reader);
            var origen = ReadAsString(ref reader);

            // Consumir elementos sobrantes si los hubiera
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
