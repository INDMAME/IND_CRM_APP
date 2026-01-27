using System.Text.Json;

namespace IND_CRM_APP.Services.ApiHelpers
{
    /// <summary>
    /// Helper for tolerant JSON property access.
    /// </summary>
    internal static class JsonPropertyHelper
    {
        // Attempts to get a JSON property using case-insensitive variants.
        public static bool TryGetPropertyInsensitive(JsonElement root, string name, out JsonElement value)
        {
            if (root.TryGetProperty(name, out value))
                return true;

            var alt = char.ToUpperInvariant(name[0]) + name[1..];
            if (root.TryGetProperty(alt, out value))
                return true;

            var lower = name.ToLowerInvariant();
            if (root.TryGetProperty(lower, out value))
                return true;

            value = default;
            return false;
        }

        // Reads a boolean-like value from a JSON payload.
        public static bool? TryGetBool(JsonElement root, string name)
        {
            if (!TryGetPropertyInsensitive(root, name, out var el))
                return null;

            if (el.ValueKind == JsonValueKind.True || el.ValueKind == JsonValueKind.False)
                return el.GetBoolean();

            if (el.ValueKind == JsonValueKind.Number && el.TryGetInt32(out var number))
                return number != 0;

            if (el.ValueKind == JsonValueKind.String)
            {
                var raw = el.GetString();
                if (bool.TryParse(raw, out var b))
                    return b;
                if (int.TryParse(raw, out var i))
                    return i != 0;
            }

            return null;
        }

        // Reads a string property from a JSON payload.
        public static string? TryGetString(JsonElement root, string name)
        {
            if (!TryGetPropertyInsensitive(root, name, out var el))
                return null;

            return el.ValueKind == JsonValueKind.String ? el.GetString() : null;
        }
    }
}
