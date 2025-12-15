using System.Globalization;
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
        private static readonly JsonSerializerOptions ObjectOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new ActivityAsistenteDtoArrayConverter() }
        };

        public override ActivityDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.StartObject)
            {
                // Fallback a deserialización normal evitando recursión
                return JsonSerializer.Deserialize<ActivityDto>(ref reader, ObjectOptions)!;
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

            string? recId = null;
            string? accountNum = null;
            List<ActivityAsistenteDto>? asistentes = null;

            // Lee el resto de elementos hasta cerrar el array principal
            while (reader.TokenType != JsonTokenType.EndArray)
            {
                if (reader.TokenType == JsonTokenType.StartArray)
                {
                    // Assistant list can arrive as arrays or objects.
                    var list = new List<ActivityAsistenteDto>();
                    while (reader.Read() && reader.TokenType != JsonTokenType.EndArray)
                    {
                        if (reader.TokenType == JsonTokenType.StartArray || reader.TokenType == JsonTokenType.StartObject)
                        {
                            var asistente = ActivityAsistenteDtoArrayConverter.ReadAsistente(ref reader);
                            list.Add(asistente);
                        }
                        else
                        {
                            reader.Skip();
                        }
                    }
                    asistentes = list;
                    reader.Read(); // avanzar después del EndArray de asistentes
                    continue;
                }

                // Si encontramos números/strings sueltos, intenta mapear recId y accountNum
                if (recId == null)
                {
                    recId = ReadValueAsString(ref reader);
                    continue;
                }
                if (accountNum == null)
                {
                    accountNum = ReadValueAsString(ref reader);
                    continue;
                }

                // Cualquier cosa extra: consumir y avanzar
                reader.Read();
            }

            return new ActivityDto
            {
                ActividadId = actividadId,
                RecId = recId,
                AccountNum = accountNum,
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

        private static string? ReadValueAsString(ref Utf8JsonReader reader)
        {
            string? value = reader.TokenType switch
            {
                JsonTokenType.String => reader.GetString(),
                JsonTokenType.Number => reader.TryGetInt64(out var num) ? num.ToString() : reader.GetDouble().ToString(),
                JsonTokenType.Null => null,
                _ => null
            };
            reader.Read();
            return value;
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
            if (reader.TokenType == JsonTokenType.Null)
            {
                return new ActivityAsistenteDto();
            }

            // New format: assistant can arrive as an object { AsistenteId, AsistenteTipo, AsistenteCargo }.
            if (reader.TokenType == JsonTokenType.StartObject)
            {
                var asistente = new ActivityAsistenteDto();

                while (reader.Read())
                {
                    if (reader.TokenType == JsonTokenType.EndObject)
                        break;

                    if (reader.TokenType != JsonTokenType.PropertyName)
                    {
                        reader.Skip();
                        continue;
                    }

                    var propName = reader.GetString() ?? string.Empty;
                    if (!reader.Read())
                        break;

                    switch (propName.ToLowerInvariant())
                    {
                        case "asistenteid":
                            asistente.AsistenteId = ReadCurrentValue(ref reader);
                            break;
                        case "asistentetipo":
                            asistente.AsistenteTipo = ReadCurrentValue(ref reader);
                            break;
                        case "asistentecargo":
                            asistente.AsistenteCargo = ReadCurrentValue(ref reader);
                            break;
                        default:
                            reader.Skip();
                            break;
                    }
                }

                return asistente;
            }

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

        private static string? ReadCurrentValue(ref Utf8JsonReader reader)
        {
            return reader.TokenType switch
            {
                JsonTokenType.String => reader.GetString(),
                JsonTokenType.Number => reader.TryGetInt64(out var num)
                    ? num.ToString(CultureInfo.InvariantCulture)
                    : reader.GetDouble().ToString(CultureInfo.InvariantCulture),
                JsonTokenType.True => "true",
                JsonTokenType.False => "false",
                JsonTokenType.Null => null,
                _ => reader.GetString()
            };
        }

        public override void Write(Utf8JsonWriter writer, ActivityAsistenteDto value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, (object)value, options);
        }
    }
}
