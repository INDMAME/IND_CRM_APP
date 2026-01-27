using System.Text.Json;
using IND_CRM_APP.Models.Shared;

namespace IND_CRM_APP.Services.ApiHelpers
{
    /// <summary>
    /// Parser for Entra context API responses.
    /// </summary>
    internal static class EntraContextParser
    {
        // Parses the Entra context payload into a response model.
        public static IndEntraContextResponse Parse(string raw, bool httpSuccess, JsonSerializerOptions options)
        {
            using var doc = JsonDocument.Parse(raw);
            var root = doc.RootElement;

            var response = new IndEntraContextResponse
            {
                Success = JsonPropertyHelper.TryGetBool(root, "success") ?? httpSuccess,
                Message = JsonPropertyHelper.TryGetString(root, "message"),
                ErrorCode = JsonPropertyHelper.TryGetString(root, "errorCode")
            };

            var items = ExtractContextItems(root, options);
            if (items.Count == 0 && JsonPropertyHelper.TryGetPropertyInsensitive(root, "data", out var dataEl))
            {
                items = ExtractContextItems(dataEl, options);
            }

            response.Items = items;
            return response;
        }

        // Extracts context items from a JSON payload.
        private static List<IndEntraContextItem> ExtractContextItems(JsonElement element, JsonSerializerOptions options)
        {
            if (element.ValueKind == JsonValueKind.Array)
            {
                var list = DeserializeContextList(element, options);
                if (list.Count > 0)
                    return list;

                foreach (var entry in element.EnumerateArray())
                {
                    var nested = ExtractContextItems(entry, options);
                    if (nested.Count > 0)
                        return nested;
                }

                return new List<IndEntraContextItem>();
            }

            if (element.ValueKind == JsonValueKind.Object)
            {
                if (JsonPropertyHelper.TryGetPropertyInsensitive(element, "items", out var itemsEl))
                {
                    if (itemsEl.ValueKind == JsonValueKind.Array)
                        return DeserializeContextList(itemsEl, options);

                    if (itemsEl.ValueKind == JsonValueKind.Object)
                    {
                        var item = TryDeserializeContextItem(itemsEl, options);
                        if (item != null)
                            return new List<IndEntraContextItem> { item };
                    }

                    if (itemsEl.ValueKind == JsonValueKind.String)
                    {
                        var fromString = TryParseContextItemsFromString(itemsEl.GetString(), options);
                        if (fromString.Count > 0)
                            return fromString;
                    }
                }

                if (JsonPropertyHelper.TryGetPropertyInsensitive(element, "data", out var dataEl))
                {
                    var nested = ExtractContextItems(dataEl, options);
                    if (nested.Count > 0)
                        return nested;
                }

                if (JsonPropertyHelper.TryGetPropertyInsensitive(element, "result", out var resultEl))
                {
                    var nested = ExtractContextItems(resultEl, options);
                    if (nested.Count > 0)
                        return nested;
                }

                if (JsonPropertyHelper.TryGetPropertyInsensitive(element, "payload", out var payloadEl))
                {
                    var nested = ExtractContextItems(payloadEl, options);
                    if (nested.Count > 0)
                        return nested;
                }

                if (JsonPropertyHelper.TryGetPropertyInsensitive(element, "header", out _))
                {
                    var item = TryDeserializeContextItem(element, options);
                    if (item != null)
                        return new List<IndEntraContextItem> { item };
                }

                foreach (var prop in element.EnumerateObject())
                {
                    if (prop.Value.ValueKind == JsonValueKind.Object ||
                        prop.Value.ValueKind == JsonValueKind.Array)
                    {
                        var nested = ExtractContextItems(prop.Value, options);
                        if (nested.Count > 0)
                            return nested;
                    }

                    if (prop.Value.ValueKind == JsonValueKind.String)
                    {
                        var fromString = TryParseContextItemsFromString(prop.Value.GetString(), options);
                        if (fromString.Count > 0)
                            return fromString;
                    }
                }
            }

            return new List<IndEntraContextItem>();
        }

        // Deserializes a list of context items.
        private static List<IndEntraContextItem> DeserializeContextList(JsonElement itemsEl, JsonSerializerOptions options)
        {
            try
            {
                return JsonSerializer.Deserialize<List<IndEntraContextItem>>(itemsEl.GetRawText(), options)
                    ?? new List<IndEntraContextItem>();
            }
            catch
            {
                return new List<IndEntraContextItem>();
            }
        }

        // Deserializes a single context item.
        private static IndEntraContextItem? TryDeserializeContextItem(JsonElement element, JsonSerializerOptions options)
        {
            try
            {
                return element.Deserialize<IndEntraContextItem>(options);
            }
            catch
            {
                return null;
            }
        }

        // Parses context items from an embedded JSON string.
        private static List<IndEntraContextItem> TryParseContextItemsFromString(string? raw, JsonSerializerOptions options)
        {
            if (!ApiPayloadParser.LooksLikeJson(raw))
                return new List<IndEntraContextItem>();

            try
            {
                using var doc = JsonDocument.Parse(raw!);
                return ExtractContextItems(doc.RootElement, options);
            }
            catch
            {
                return new List<IndEntraContextItem>();
            }
        }
    }
}
