using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace IND_CRM_APP.Extensions
{
// IND TempData helpers to trigger Action Mark after Redirect (PRG).
public static class INDTempDataActionMarkExtensions
{
// Green check for create/update (okProcess).
public static void INDSetActionMarkSuccess(this ITempDataDictionary tempData, int durationMs = 1500)
{
// Store values for the next request.
tempData["IND_ActionMark_Type"] = "okProcess";
tempData["IND_ActionMark_DurationMs"] = durationMs.ToString();
}

    // Red check for delete (okDelProcess).
    public static void INDSetActionMarkDanger(this ITempDataDictionary tempData, int durationMs = 1500)
    {
        // Store values for the next request.
        tempData["IND_ActionMark_Type"] = "okDelProcess";
        tempData["IND_ActionMark_DurationMs"] = durationMs.ToString();
    }
}


}
