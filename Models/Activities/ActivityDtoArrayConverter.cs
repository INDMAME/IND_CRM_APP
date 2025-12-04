using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// Permite deserializar respuestas que devuelven ActivityDto como arrays.
    /// Formato esperado:
    /// ["VC2025-0369","ALUDIUM ALICANTE","24.11.2025","","Visita","DESCRIPCIÓN TXT", [["JAVIER PEÑA",1,"MANTENIMIENTO"]]]
    /// </summary>
    public class ActivityDtoArrayConverter : JsonConverter<ActivityDto>
    {
        public override ActivityDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.StartObject)
            {
                // Fallback a deserialización normal
                return JsonSerializer.Deserialize<ActivityDto>(ref reader, options)!;
            }

            if (reader.TokenType != JsonTokenType.StartArray)
                throw new JsonException("Se esperaba un array para ActivityDto.");

            // Leer elementos del array en orden
            reader.Read(); // posicionar en primer valor

            string? actividadId = ReadString(ref reader);
            string? name = ReadString(ref reader);
            string? transDate = ReadString(ref reader);
            string? country = ReadString(ref reader);
            string? actividadType = ReadString(ref reader);
            string? description = ReadString(ref reader);

            List<ActivityAsistenteDto>? asistentes = null;

            // Siguiente token: inicio de array de asistentes o EndArray
            if (reader.TokenType == JsonTokenType.StartArray)
            {
                asistentes = new List<ActivityAsistenteDto>();
                while (reader.Read() && reader.TokenType != JsonTokenType.EndArray)
                {
                    if (reader.TokenType == JsonTokenType.StartArray)
                    {
                        var asistente = ActivityAsistenteDtoArrayConverter.ReadAsistente(ref reader);
                        asistentes.Add(asistente);
                    }
                    else
                    {
                        reader.Skip();
                    }
                }
                // Ahora estamos en EndArray de asistentes; avanzar al siguiente token
                // (debería ser el EndArray de la actividad principal).
                reader.Read();
            }

            // Garantizar que consumimos el EndArray principal (en caso de elementos extra).
            while (reader.TokenType != JsonTokenType.EndArray && reader.Read()) { }

            return new ActivityDto
            {
                ActividadId = actividadId,
                Name = name,
                TransDate = transDate,
                Country = country,
                ActividadType = actividadType,
                Description = description,
                Asistentes = asistentes
            };
        }

        private static string? ReadString(ref Utf8JsonReader reader)
        {
            if (reader.TokenType == JsonTokenType.EndArray) return null;
            var val = reader.TokenType == JsonTokenType.String ? reader.GetString() : null;
            reader.Read();
            return val;
        }

        public override void Write(Utf8JsonWriter writer, ActivityDto value, JsonSerializerOptions options)
        {
            // No se usa escritura en este escenario
            JsonSerializer.Serialize(writer, (object)value, options);
        }
    }

    /// <summary>
    /// Converter para asistentes en formato array.
    /// </summary>
    public class ActivityAsistenteDtoArrayConverter : JsonConverter<ActivityAsistenteDto>
    {
        public override ActivityAsistenteDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return ReadAsistente(ref reader);
        }

        internal static ActivityAsistenteDto ReadAsistente(ref Utf8JsonReader reader)
        {
            if (reader.TokenType != JsonTokenType.StartArray)
                throw new JsonException("Se esperaba un array para ActivityAsistenteDto.");

            reader.Read();
            string? asistenteId = reader.TokenType == JsonTokenType.String ? reader.GetString() : null;
            reader.Read();
            string? asistenteTipo = reader.TokenType switch
            {
                JsonTokenType.Number => reader.TryGetInt32(out var num) ? num.ToString() : reader.GetDouble().ToString(),
                JsonTokenType.String => reader.GetString(),
                _ => null
            };
            reader.Read();
            string? asistenteCargo = reader.TokenType == JsonTokenType.String ? reader.GetString() : null;

            // avanzar hasta EndArray
            while (reader.TokenType != JsonTokenType.EndArray && reader.Read()) { }

            return new ActivityAsistenteDto
            {
                AsistenteId = asistenteId,
                AsistenteTipo = asistenteTipo,
                AsistenteCargo = asistenteCargo
            };
        }

        public override void Write(Utf8JsonWriter writer, ActivityAsistenteDto value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, (object)value, options);
        }
    }
}
