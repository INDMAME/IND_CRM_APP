using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using IND_CRM_APP.Models.CRM;

namespace IND_CRM_APP.Services.Enums
{
    // Resolves localized enum labels and normalization helpers for CRM flows.
    public sealed class CrmEnumCatalog : ICrmEnumCatalog
    {
        private readonly IINDCrmEnumLocalizer _enumLocalizer;

        public CrmEnumCatalog(IINDCrmEnumLocalizer enumLocalizer)
        {
            _enumLocalizer = enumLocalizer;
        }

        // Normalizes visit type values from API payloads to numeric catalog values.
        public string NormalizeTipoVisitaValue(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return string.Empty;

            var value = raw.Trim();
            if (value is "0" or "1" or "2")
                return value;

            var key = NormalizeKey(value);
            if (key == "comercial")
                return "1";
            if (key == "tecnica")
                return "2";

            return value;
        }

        // Normalizes contact method values from API payloads to numeric catalog values.
        public string NormalizeContactMethodValue(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return "0";

            var value = raw.Trim();
            if (value is "0" or "1" or "2")
                return value;

            var key = NormalizeKey(value);
            if (key is "inperson" or "presencial" or "dipersona")
                return "0";
            if (key is "phonecall" or "llamadatelefonica" or "llamadadetelefono" or "telefonico" or "telefonata")
                return "1";
            if (key is "onlinemeeting" or "reuniononline" or "riunioneonline")
                return "2";

            return value;
        }

        // Returns select-ready options for one AX enum from the remote catalog.
        public IEnumerable<dynamic> GetOptionsByAxEnumName(
            IEnumerable<CrmEnumCatalogDto>? catalog,
            string axEnumName,
            IEnumerable<dynamic>? fallback = null)
        {
            var fallbackItems = fallback ?? Enumerable.Empty<dynamic>();
            var options = BuildUsableOptionsByAxEnumName(catalog, axEnumName).ToList();

            return options.Count > 0 ? options : fallbackItems;
        }

        // Reports whether the remote catalog has active options for the requested AX enum.
        public bool HasUsableOptionsByAxEnumName(
            IEnumerable<CrmEnumCatalogDto>? catalog,
            string axEnumName)
        {
            return BuildUsableOptionsByAxEnumName(catalog, axEnumName).Any();
        }

        // Returns a map of gasto type code to localized label.
        public IReadOnlyDictionary<string, string> GetGastoTypeMap()
        {
            var map = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            var items = _enumLocalizer.GetGastoTypeItems();

            foreach (var item in items)
            {
                var value = ReadProperty(item, "Value");
                var text = ReadProperty(item, "Text");
                if (string.IsNullOrWhiteSpace(value) || string.IsNullOrWhiteSpace(text))
                    continue;

                map[NormalizeEnumCode(value)] = text.Trim();
            }

            return map;
        }

        // Resolves one gasto type value to localized text, preserving the code when no match exists.
        public string GetGastoTypeLabel(string? rawTypeValue)
        {
            var code = NormalizeEnumCode(rawTypeValue);
            if (string.IsNullOrWhiteSpace(code))
                return string.Empty;

            var map = GetGastoTypeMap();
            return map.TryGetValue(code, out var label) && !string.IsNullOrWhiteSpace(label)
                ? label
                : code;
        }

        // Extracts known anonymous object properties from localizer enum items.
        private static string ReadProperty(dynamic item, string propertyName)
        {
            if (item == null)
                return string.Empty;

            var property = item.GetType().GetProperty(propertyName);
            var value = property?.GetValue(item);
            return value?.ToString()?.Trim() ?? string.Empty;
        }

        // Normalizes enum code values so "14.0" and "14" resolve to the same key.
        private static string NormalizeEnumCode(string? rawValue)
        {
            if (string.IsNullOrWhiteSpace(rawValue))
                return string.Empty;

            var value = rawValue.Trim();
            if (long.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var number))
                return number.ToString(CultureInfo.InvariantCulture);

            if (decimal.TryParse(value, NumberStyles.Float, CultureInfo.InvariantCulture, out var decimalValue) &&
                decimal.Truncate(decimalValue) == decimalValue)
            {
                return decimal.ToInt64(decimalValue).ToString(CultureInfo.InvariantCulture);
            }

            return value;
        }

        // Builds active select options from the remote AX enum catalog.
        private static IEnumerable<dynamic> BuildUsableOptionsByAxEnumName(
            IEnumerable<CrmEnumCatalogDto>? catalog,
            string axEnumName)
        {
            if (catalog == null || string.IsNullOrWhiteSpace(axEnumName))
                return Enumerable.Empty<dynamic>();

            var enumGroup = catalog.FirstOrDefault(item =>
                string.Equals(item.AxEnumName, axEnumName, StringComparison.OrdinalIgnoreCase));
            if (enumGroup == null || !enumGroup.Found || enumGroup.Options == null || enumGroup.Options.Count == 0)
                return Enumerable.Empty<dynamic>();

            return enumGroup.Options
                .Where(option => option.Active && option.Value.HasValue && !string.IsNullOrWhiteSpace(option.Label))
                .OrderBy(option => option.SortOrder ?? int.MaxValue)
                .ThenBy(option => option.Value ?? int.MaxValue)
                .Select(option => new
                {
                    Value = option.Value!.Value.ToString(CultureInfo.InvariantCulture),
                    Text = option.Label.Trim()
                })
                .Cast<dynamic>()
                .ToList();
        }

        private static string NormalizeKey(string value)
        {
            var normalized = StripDiacritics(value).ToLowerInvariant().Trim();
            var sb = new StringBuilder(normalized.Length);

            foreach (var ch in normalized)
            {
                if (char.IsLetterOrDigit(ch))
                {
                    sb.Append(ch);
                    continue;
                }

                if (ch == '\u201A')
                {
                    sb.Append('e');
                    continue;
                }

                if (ch == '\u00A4')
                {
                    sb.Append('n');
                }
            }

            return sb.ToString();
        }

        private static string StripDiacritics(string input)
        {
            if (string.IsNullOrEmpty(input))
                return string.Empty;

            var normalized = input.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder(normalized.Length);

            foreach (var c in normalized)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(c);
                }
            }

            return sb.ToString().Normalize(NormalizationForm.FormC);
        }
    }
}
