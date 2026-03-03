using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace IND_CRM_APP.Models.Shared
{
    /// <summary>
    /// Converts nullable or string-like JSON numbers into int values.
    /// Null, empty, and invalid values are normalized to zero.
    /// </summary>
    public sealed class JsonIntNullToZeroConverter : JsonConverter<int>
    {
        public override int Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.Null)
            {
                return 0;
            }

            if (reader.TokenType == JsonTokenType.Number)
            {
                if (reader.TryGetInt32(out var intValue))
                {
                    return intValue;
                }

                if (reader.TryGetDouble(out var doubleValue))
                {
                    return double.IsFinite(doubleValue) ? Convert.ToInt32(doubleValue) : 0;
                }

                return 0;
            }

            if (reader.TokenType == JsonTokenType.String)
            {
                var raw = reader.GetString();
                if (string.IsNullOrWhiteSpace(raw))
                {
                    return 0;
                }

                if (int.TryParse(raw, NumberStyles.Integer, CultureInfo.InvariantCulture, out var intFromString))
                {
                    return intFromString;
                }

                if (double.TryParse(raw, NumberStyles.Float, CultureInfo.InvariantCulture, out var doubleFromString))
                {
                    return double.IsFinite(doubleFromString) ? Convert.ToInt32(doubleFromString) : 0;
                }

                return 0;
            }

            return 0;
        }

        public override void Write(Utf8JsonWriter writer, int value, JsonSerializerOptions options)
        {
            writer.WriteNumberValue(value);
        }
    }
}
