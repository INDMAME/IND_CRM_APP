using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace IND_CRM_APP.Services.Enums
{
    /// <summary>
    /// Legacy helper for CRM enum values.
    /// UI should use INDCrmEnumLocalizer for translated display text.
    /// </summary>
    public static class CrmEnumHelper
    {
        // Normalizes raw visit type values from API data to the expected numeric value.
        public static string NormalizeTipoVisitaValue(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw)) return string.Empty;

            var value = raw.Trim();
            if (value is "0" or "1" or "2") return value;

            var key = NormalizeKey(value);
            if (key == "comercial") return "1";
            if (key == "tecnica") return "2";

            return value;
        }

        private static string NormalizeKey(string value)
        {
            var v = StripDiacritics(value).ToLowerInvariant().Trim();

            // Defensive: handle a few common mojibake variants seen in this repo.
            // \u201A often shows up instead of 'e' and \u00A4 instead of 'n'.
            var sb = new StringBuilder(v.Length);
            foreach (var ch in v)
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
                    continue;
                }
            }

            return sb.ToString();
        }

        private static string StripDiacritics(string input)
        {
            if (string.IsNullOrEmpty(input)) return string.Empty;

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

        public static IEnumerable<dynamic> GetActividadTypeItems()
        {
            return new[]
            {
                new { Value = "0", Text = "None" },
                new { Value = "1", Text = "Fax" },
                new { Value = "2", Text = "Email" },
                new { Value = "3", Text = "Phone call" },
                new { Value = "4", Text = "Visit" },
                new { Value = "5", Text = "Task" }
            };
        }

        public static IEnumerable<dynamic> GetTipoVisitaItems()
        {
            return new[]
            {
                new { Value = "0", Text = "None" },
                new { Value = "1", Text = "Commercial" },
                new { Value = "2", Text = "Technical" }
            };
        }

        public static IEnumerable<dynamic> GetActividadOrigenItems()
        {
            return new[]
            {
                new { Value = "0", Text = "None" },
                new { Value = "1", Text = "Inquiry" },
                new { Value = "2", Text = "Offer" },
                new { Value = "3", Text = "Event" },
                new { Value = "4", Text = "User" },
                new { Value = "5", Text = "Marketing campaign" },
                new { Value = "6", Text = "Prospect" },
                new { Value = "7", Text = "Event contact" },
                new { Value = "8", Text = "Customer" },
                new { Value = "9", Text = "Supplier" },
                new { Value = "10", Text = "Project" },
                new { Value = "11", Text = "Potential supplier" }
            };
        }

        public static IEnumerable<dynamic> GetAsistenteTipoItems()
        {
            return new[]
            {
                new { Value = "0", Text = "None" },
                new { Value = "1", Text = "Technical" },
                new { Value = "2", Text = "Commercial" }
            };
        }

        // Expense sheet type items (GastoType).
        public static IEnumerable<dynamic> GetGastoTypeItems()
        {
            return new[]
            {
                new { Value = "0", Text = "None" },
                new { Value = "1", Text = "Toll" },
                new { Value = "2", Text = "Parking" },
                new { Value = "3", Text = "Km" },
                new { Value = "4", Text = "Breakfast" },
                new { Value = "5", Text = "Lunch" },
                new { Value = "6", Text = "Dinner" },
                new { Value = "7", Text = "Hotel" },
                new { Value = "8", Text = "Miscellaneous" },
                new { Value = "14", Text = "Taxi" }
            };
        }
    }
}
