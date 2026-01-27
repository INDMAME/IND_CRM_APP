using System.Text.Json;
using IND_CRM_APP.Models.Activities;
using IND_CRM_APP.Models.Shared;

namespace IND_CRM_APP.Services.ApiHelpers
{
    /// <summary>
    /// Helper for parsing non-standard API payloads.
    /// </summary>
    internal static class ApiPayloadParser
    {
        private static readonly string[] SpeechTextKeys = new[]
        {
            "text",
            "transcript",
            "transcription"
        };

        // Quick check to see if the payload looks like JSON.
        public static bool LooksLikeJson(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw)) return false;
            var trimmed = raw.TrimStart();
            return trimmed.StartsWith("{") || trimmed.StartsWith("[");
        }

        // Parses an ActivityDto from a JSON element.
        public static ActivityDto? ParseActivityFromElement(JsonElement el, JsonSerializerOptions options)
        {
            try
            {
                if (el.ValueKind == JsonValueKind.Null || el.ValueKind == JsonValueKind.Undefined)
                    return null;

                if (el.ValueKind == JsonValueKind.Array)
                {
                    if (el.GetArrayLength() == 0)
                        return null;

                    return ParseActivityFromElement(el[0], options);
                }

                return el.Deserialize<ActivityDto>(options);
            }
            catch
            {
                return null;
            }
        }

        // Treats an empty ActivityDto as no data.
        public static bool IsActivityEmpty(ActivityDto? dto)
        {
            if (dto == null) return true;

            return string.IsNullOrWhiteSpace(dto.ActividadId) &&
                   string.IsNullOrWhiteSpace(dto.RecId) &&
                   string.IsNullOrWhiteSpace(dto.AccountNum) &&
                   string.IsNullOrWhiteSpace(dto.Description) &&
                   string.IsNullOrWhiteSpace(dto.TransDate);
        }

        // Parses an activity response envelope from raw JSON.
        public static bool TryParseEnvelope(string raw, JsonSerializerOptions options, out ApiResponse<ActivityDto> envelope)
        {
            envelope = new ApiResponse<ActivityDto>();
            try
            {
                using var doc = JsonDocument.Parse(raw);
                var root = doc.RootElement;

                envelope.Success = root.TryGetProperty("Success", out var s) && s.GetBoolean();
                envelope.Message = root.TryGetProperty("Message", out var m) && m.ValueKind == JsonValueKind.String ? m.GetString() : null;
                envelope.TraceId = root.TryGetProperty("TraceId", out var t) && t.ValueKind == JsonValueKind.String ? t.GetString() : null;

                if (root.TryGetProperty("Data", out var dataEl))
                {
                    envelope.Data = ParseActivityFromElement(dataEl, options);
                }
                else if (root.ValueKind == JsonValueKind.Object && root.GetRawText().Contains("ActividadId"))
                {
                    envelope.Data = ParseActivityFromElement(root, options);
                }

                return envelope.Data != null || envelope.Success;
            }
            catch
            {
                return false;
            }
        }

        // Attempts to extract speech text from a payload.
        public static string? TryExtractSpeechText(string raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return null;

            try
            {
                using var doc = JsonDocument.Parse(raw);
                var root = doc.RootElement;

                if (JsonPropertyHelper.TryGetPropertyInsensitive(root, "items", out var itemsEl) &&
                    itemsEl.ValueKind == JsonValueKind.Array)
                {
                    var fromItems = ExtractSpeechTextFromArray(itemsEl);
                    if (!string.IsNullOrWhiteSpace(fromItems))
                        return fromItems;
                }

                if (JsonPropertyHelper.TryGetPropertyInsensitive(root, "data", out var dataEl))
                {
                    if (dataEl.ValueKind == JsonValueKind.String)
                        return dataEl.GetString();

                    if (dataEl.ValueKind == JsonValueKind.Array)
                    {
                        var fromData = ExtractSpeechTextFromArray(dataEl);
                        if (!string.IsNullOrWhiteSpace(fromData))
                            return fromData;
                    }
                }

                return FindSpeechText(root, 0, 5);
            }
            catch
            {
                // Ignore parsing failures and let the caller handle the empty response.
            }

            return null;
        }

        // Extracts text from array-based payloads.
        private static string? ExtractSpeechTextFromArray(JsonElement arrayEl)
        {
            foreach (var item in arrayEl.EnumerateArray())
            {
                if (item.ValueKind == JsonValueKind.String)
                {
                    var value = item.GetString();
                    if (!string.IsNullOrWhiteSpace(value))
                        return value;
                    continue;
                }

                if (item.ValueKind == JsonValueKind.Object || item.ValueKind == JsonValueKind.Array)
                {
                    var found = FindSpeechText(item, 0, 5);
                    if (!string.IsNullOrWhiteSpace(found))
                        return found;
                }
            }

            return null;
        }

        // Finds a text field in nested JSON payloads.
        private static string? FindSpeechText(JsonElement element, int depth, int maxDepth)
        {
            if (depth > maxDepth)
                return null;

            if (element.ValueKind == JsonValueKind.Object)
            {
                foreach (var key in SpeechTextKeys)
                {
                    if (JsonPropertyHelper.TryGetPropertyInsensitive(element, key, out var textEl) &&
                        textEl.ValueKind == JsonValueKind.String)
                    {
                        return textEl.GetString();
                    }
                }

                foreach (var prop in element.EnumerateObject())
                {
                    var found = FindSpeechText(prop.Value, depth + 1, maxDepth);
                    if (!string.IsNullOrWhiteSpace(found))
                        return found;
                }
            }
            else if (element.ValueKind == JsonValueKind.Array)
            {
                foreach (var item in element.EnumerateArray())
                {
                    var found = FindSpeechText(item, depth + 1, maxDepth);
                    if (!string.IsNullOrWhiteSpace(found))
                        return found;
                }
            }

            return null;
        }
    }
}
