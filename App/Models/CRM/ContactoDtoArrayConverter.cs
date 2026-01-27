using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.CRM
{
    /// <summary>
    /// Deserializes contacts sent as arrays:
    /// ["Nombre","Cargo","Empresa","RecId","Origen"].
    /// Keeps compatibility with JSON object format.
    /// </summary>
    public class ContactoDtoArrayConverter : JsonConverter<ContactoDto>
    {
        public override ContactoDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.StartObject)
                return JsonSerializer.Deserialize<ContactoDto>(ref reader, options)!;

            if (reader.TokenType != JsonTokenType.StartArray)
                throw new JsonException("Se esperaba un array para ContactoDto.");

            reader.Read();

            var name = ReadAsString(ref reader);
            var cargo = ReadAsString(ref reader);
            var empresa = ReadAsString(ref reader);
            var recId = ReadAsString(ref reader);
            var origen = ReadAsString(ref reader);

            while (reader.TokenType != JsonTokenType.EndArray && reader.Read()) { }

            return new ContactoDto
            {
                Name = name ?? string.Empty,
                Cargo = cargo ?? string.Empty,
                Empresa = empresa ?? string.Empty,
                RecId = recId ?? string.Empty,
                Origen = origen ?? string.Empty
            };
        }

        public override void Write(Utf8JsonWriter writer, ContactoDto value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, (object)value, options);
        }

        private static string? ReadAsString(ref Utf8JsonReader reader)
        {
            if (reader.TokenType == JsonTokenType.EndArray) return null;

            var result = reader.TokenType switch
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
