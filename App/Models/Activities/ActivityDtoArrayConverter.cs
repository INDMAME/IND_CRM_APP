using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Activities
{
    /// <summary>
    /// Allows deserializing responses that return ActivityDto as arrays.
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
                // Fallback to normal deserialization to avoid recursion.
                return JsonSerializer.Deserialize<ActivityDto>(ref reader, ObjectOptions)!;
            }

            if (reader.TokenType != JsonTokenType.StartArray)
                throw new JsonException("Se esperaba un array para ActivityDto.");

            using var doc = JsonDocument.ParseValue(ref reader);
            var values = new List<JsonElement>();
            foreach (var item in doc.RootElement.EnumerateArray())
            {
                values.Add(item);
            }

            if (LooksLikeFullDetailArray(values))
                return MapFullDetailArray(values);

            if (LooksLikeExpandedListArray(values))
                return MapExpandedListArray(values);

            return MapLegacyArray(values);
        }

        // Maps getActivityByCode/getActivityByRecId rows, including the optional ContactMethod slot.
        private static ActivityDto MapFullDetailArray(List<JsonElement> values)
        {
            var hasContactMethod = values.Count >= 14 && IsContactMethodCandidate(values[8]);
            var descriptionIndex = hasContactMethod ? 9 : 8;
            var assistantsIndex = hasContactMethod ? 13 : 12;

            return new ActivityDto
            {
                ActividadId = ElementToString(values, 0),
                RecId = ElementToString(values, 1),
                Name = ElementToString(values, 2),
                AccountNum = ElementToString(values, 3),
                TransDate = ElementToString(values, 4),
                Country = ElementToString(values, 5),
                ActividadType = ElementToString(values, 6),
                TipoVisita = ElementToString(values, 7),
                ContactMethod = hasContactMethod ? ElementToNullableContactMethod(values, 8) : null,
                Description = ElementToString(values, descriptionIndex),
                Comentarios = ElementToString(values, descriptionIndex + 1),
                Antecedentes = ElementToString(values, descriptionIndex + 2),
                Conclusiones = ElementToString(values, descriptionIndex + 3),
                Asistentes = ReadAssistants(values, assistantsIndex)
            };
        }

        // Maps list rows emitted by getActivityContainer with RecId, AccountNum and ContactMethod.
        private static ActivityDto MapExpandedListArray(List<JsonElement> values)
        {
            var hasContactMethod = values.Count >= 11 && IsContactMethodCandidate(values[8]);
            var descriptionIndex = hasContactMethod ? 9 : 8;
            var assistantsIndex = hasContactMethod ? 10 : 9;

            return new ActivityDto
            {
                ActividadId = ElementToString(values, 0),
                RecId = ElementToString(values, 1),
                Name = ElementToString(values, 2),
                AccountNum = ElementToString(values, 3),
                TransDate = ElementToString(values, 4),
                Country = ElementToString(values, 5),
                ActividadType = ElementToString(values, 6),
                TipoVisita = ElementToString(values, 7),
                ContactMethod = hasContactMethod ? ElementToNullableContactMethod(values, 8) : null,
                Description = ElementToString(values, descriptionIndex),
                Asistentes = ReadAssistants(values, assistantsIndex)
            };
        }

        // Preserves older AX array shapes while the AOS class rollout catches up.
        private static ActivityDto MapLegacyArray(List<JsonElement> values)
        {
            return new ActivityDto
            {
                ActividadId = ElementToString(values, 0),
                Name = ElementToString(values, 1),
                TransDate = ElementToString(values, 2),
                Country = ElementToString(values, 3),
                ActividadType = ElementToString(values, 4),
                Description = ElementToString(values, 5),
                AccountNum = values.Count >= 8 ? ElementToString(values, 6) : null,
                Asistentes = ReadAssistants(values, values.Count >= 8 ? 7 : 6)
            };
        }

        private static bool LooksLikeFullDetailArray(List<JsonElement> values)
        {
            return values.Count >= 13 &&
                   IsLikelyRecId(ElementToString(values, 1)) &&
                   LooksLikeDate(ElementToString(values, 4));
        }

        private static bool LooksLikeExpandedListArray(List<JsonElement> values)
        {
            return values.Count >= 10 &&
                   IsLikelyRecId(ElementToString(values, 1)) &&
                   LooksLikeDate(ElementToString(values, 4));
        }

        private static string? ElementToString(List<JsonElement> values, int index)
        {
            if (index < 0 || index >= values.Count) return null;
            return ElementToString(values[index]);
        }

        private static string? ElementToString(JsonElement element)
        {
            return element.ValueKind switch
            {
                JsonValueKind.String => element.GetString(),
                JsonValueKind.Number => element.TryGetInt64(out var num)
                    ? num.ToString(CultureInfo.InvariantCulture)
                    : element.GetDouble().ToString(CultureInfo.InvariantCulture),
                JsonValueKind.True => "true",
                JsonValueKind.False => "false",
                JsonValueKind.Null => null,
                _ => null
            };
        }

        private static int? ElementToNullableContactMethod(List<JsonElement> values, int index)
        {
            return ElementToNullableContactMethod(ElementToString(values, index));
        }

        private static int? ElementToNullableContactMethod(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            var value = raw.Trim();
            if (int.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var parsed) &&
                parsed >= 0 &&
                parsed <= 2)
            {
                return parsed;
            }

            return NormalizeContactMethodKey(value) switch
            {
                "inperson" or "presencial" or "dipersona" => 0,
                "phonecall" or "llamadatelefonica" or "llamadadetelefono" or "telefonata" => 1,
                "onlinemeeting" or "reuniononline" or "riunioneonline" => 2,
                _ => null
            };
        }

        private static List<ActivityAsistenteDto>? ReadAssistants(List<JsonElement> values, int index)
        {
            if (index < 0 || index >= values.Count || values[index].ValueKind != JsonValueKind.Array)
                return null;

            return JsonSerializer.Deserialize<List<ActivityAsistenteDto>>(values[index].GetRawText(), ObjectOptions);
        }

        private static bool IsContactMethodCandidate(JsonElement element)
        {
            return ElementToNullableContactMethod(ElementToString(element)).HasValue;
        }

        private static bool IsLikelyRecId(string? value)
        {
            if (string.IsNullOrWhiteSpace(value)) return false;
            var trimmed = value.Trim();
            if (trimmed[0] == '-') trimmed = trimmed.Substring(1);
            if (trimmed.Length == 0) return false;

            foreach (var ch in trimmed)
            {
                if (!char.IsDigit(ch)) return false;
            }

            return true;
        }

        private static bool LooksLikeDate(string? value)
        {
            if (string.IsNullOrWhiteSpace(value)) return false;

            var trimmed = value.Trim();
            var datePart = trimmed.Split('T', ' ')[0];
            var supportedFormats = new[]
            {
                "yyyy-MM-dd",
                "yyyy.MM.dd",
                "yyyy/MM/dd",
                "dd-MM-yyyy",
                "dd.MM.yyyy",
                "dd/MM/yyyy",
                "d-M-yyyy",
                "d.M.yyyy",
                "d/M/yyyy"
            };

            return DateTime.TryParseExact(
                       datePart,
                       supportedFormats,
                       CultureInfo.InvariantCulture,
                       DateTimeStyles.AllowWhiteSpaces,
                       out _) ||
                   DateTime.TryParse(trimmed, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out _);
        }

        private static string NormalizeContactMethodKey(string value)
        {
            var normalized = value.Normalize(System.Text.NormalizationForm.FormD).ToLowerInvariant().Trim();
            var chars = new List<char>(normalized.Length);

            foreach (var ch in normalized)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(ch) == UnicodeCategory.NonSpacingMark)
                    continue;

                if (char.IsLetterOrDigit(ch))
                    chars.Add(ch);
            }

            return new string(chars.ToArray()).Normalize(System.Text.NormalizationForm.FormC);
        }

        public override void Write(Utf8JsonWriter writer, ActivityDto value, JsonSerializerOptions options)
        {
            // Writing is not used in this scenario.
            JsonSerializer.Serialize(writer, (object)value, options);
        }
    }

    /// <summary>
    /// Converter for assistants in array format.
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
                JsonTokenType.Number => reader.TryGetInt32(out var num) ? num.ToString(CultureInfo.InvariantCulture) : reader.GetDouble().ToString(CultureInfo.InvariantCulture),
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
