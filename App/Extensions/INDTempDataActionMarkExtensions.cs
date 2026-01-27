using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace IND_CRM_APP.Extensions
{
    /// <summary>
    /// TempData helpers for the ActionMark overlay (PRG flow).
    /// </summary>
    public static class INDTempDataActionMarkExtensions
    {
        private const string TypeKey = "IND_ActionMark_Type";
        private const string DurationKey = "IND_ActionMark_DurationMs";

        /// <summary>
        /// Stores ActionMark payload in TempData with a default duration.
        /// </summary>
        public static void INDSetActionMark(this ITempDataDictionary tempData, string type, int durationMs = 1500)
        {
            if (tempData == null) return;
            if (string.IsNullOrWhiteSpace(type)) return;

            tempData[TypeKey] = type;
            tempData[DurationKey] = durationMs.ToString();
        }

        /// <summary>
        /// Marks a successful operation (okProcess).
        /// </summary>
        public static void INDSetActionMarkSuccess(this ITempDataDictionary tempData, int durationMs = 1500)
        {
            tempData.INDSetActionMark("okProcess", durationMs);
        }

        /// <summary>
        /// Marks a delete success (okDelProcess).
        /// </summary>
        public static void INDSetActionMarkDanger(this ITempDataDictionary tempData, int durationMs = 1500)
        {
            tempData.INDSetActionMark("okDelProcess", durationMs);
        }

        /// <summary>
        /// Marks a failure (errorProcess).
        /// </summary>
        public static void INDSetActionMarkError(this ITempDataDictionary tempData, int durationMs = 1500)
        {
            tempData.INDSetActionMark("errorProcess", durationMs);
        }

        /// <summary>
        /// Marks a warning (warningProcess).
        /// </summary>
        public static void INDSetActionMarkWarning(this ITempDataDictionary tempData, int durationMs = 1500)
        {
            tempData.INDSetActionMark("warningProcess", durationMs);
        }
    }
}
