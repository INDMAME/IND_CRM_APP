using System.Globalization;
using System.Text;

namespace IND_CRM_APP.Infrastructure.Session;

// Keeps signed context fields coherent while merging independent session mutations.
internal static class SessionStateMerge
{
    private static readonly string[] BoundaryKeys = ["ENTRAOID", "INDEntraOidContext", "INDCompanySelected"];
    private static readonly string[] ContextKeys =
    [
        "ENTRAOID", "INDEntraOidContext", "INDCompanySelected", "INDCompanySelectedName",
        "INDCompanySelectionSource", "INDWebContext", "AxUser", "INDContextToken", "INDContextVersion",
        "INDPermissionsRevision", "INDContextIssuedUtc", "INDContextExpiresUtc", "INDContextTenantId",
        "Username", "Company", "Environment"
    ];
    private static readonly string[] TokenKeys = ["Token", "TokenExpires"];
    private static readonly HashSet<string> GroupedKeys = new(
        ContextKeys.Concat(TokenKeys).Append(CompanySelectionRevision.Key), StringComparer.Ordinal);
    private const string ActivityKey = "INDContextLastActivityUtc";

    // Copies bytes because callers and the framework own the source buffers.
    internal static Dictionary<string, byte[]> Snapshot(ISession session)
    {
        var result = new Dictionary<string, byte[]>(StringComparer.Ordinal);
        foreach (var key in session.Keys)
            if (session.TryGetValue(key, out var value))
                result[key] = value.ToArray();
        return result;
    }

    // Detects the ordinary uncontended case, including initial session creation.
    internal static bool Unchanged(Dictionary<string, byte[]> original, ISession latest)
    {
        var current = Snapshot(latest);
        return original.Count == current.Count && original.Keys.All(key => Same(original, current, key));
    }

    // Logout and identity changes win; explicit company choices use their accepted order.
    internal static bool Apply(Dictionary<string, byte[]> original, Dictionary<string, byte[]> desired,
        ISession latest, bool cleared)
    {
        var current = Snapshot(latest);
        if (!Same(original, current, "ENTRAOID") || (original.Count > 0 && current.Count == 0))
            return false;

        var selectionRevision = ReadLong(desired, CompanySelectionRevision.Key);
        var explicitSelection = selectionRevision > ReadLong(original, CompanySelectionRevision.Key);
        var latestSelection = explicitSelection && Same(original, desired, "ENTRAOID") &&
            selectionRevision > ReadLong(current, CompanySelectionRevision.Key);
        if ((explicitSelection && !latestSelection) ||
            (!Matches(original, current, BoundaryKeys) && !latestSelection))
            return false;

        if (cleared)
        {
            latest.Clear();
            foreach (var pair in desired)
                latest.Set(pair.Key, pair.Value);
            return true;
        }

        var boundaryChanged = !Matches(original, desired, BoundaryKeys) ||
            (latestSelection && !Matches(current, desired, BoundaryKeys));
        var contextSuperseded = boundaryChanged && ReadVersion(desired) < ReadVersion(current);
        var canReplaceContext = boundaryChanged || Matches(original, current, ContextKeys) ||
            ReadVersion(desired) > ReadVersion(current);
        if (contextSuperseded)
        {
            // Keep an explicit selection, but force a fresh signed context instead of installing an older one.
            foreach (var key in ContextKeys)
            {
                if (key is "ENTRAOID" or "Username" or "INDCompanySelected" or "INDCompanySelectionSource")
                    Write(latest, desired, key);
                else
                    latest.Remove(key);
            }
        }
        else
        {
            MergeGroup(original, desired, latest, ContextKeys, canReplaceContext,
                latestSelection && !Matches(current, desired, ContextKeys));
        }
        MergeGroup(original, desired, latest, TokenKeys,
            !contextSuperseded && (boundaryChanged || Matches(original, current, TokenKeys)));
        if (latestSelection)
            Write(latest, desired, CompanySelectionRevision.Key);

        foreach (var key in original.Keys.Union(desired.Keys, StringComparer.Ordinal))
        {
            if (GroupedKeys.Contains(key) || Same(original, desired, key))
                continue;
            // Monotonic UTC activity must not be moved backwards by a slower request.
            if (key == ActivityKey && desired.TryGetValue(key, out var activity) &&
                current.TryGetValue(key, out var latestActivity))
            {
                if (ReadUtc(activity) <= ReadUtc(latestActivity))
                    continue;
            }
            else if (!Same(original, current, key))
            {
                continue;
            }
            Write(latest, desired, key);
        }
        return true;
    }

    // Replaces an entire signed group to avoid combining fields from different refreshes.
    private static void MergeGroup(Dictionary<string, byte[]> original, Dictionary<string, byte[]> desired,
        ISession latest, string[] keys, bool allowed, bool force = false)
    {
        if (!allowed || (!force && Matches(original, desired, keys)))
            return;
        foreach (var key in keys)
            Write(latest, desired, key);
    }

    // Preserves the latest value when both requests changed the same ordinary key.
    private static bool Same(Dictionary<string, byte[]> left, Dictionary<string, byte[]> right, string key)
    {
        var hasLeft = left.TryGetValue(key, out var leftValue);
        var hasRight = right.TryGetValue(key, out var rightValue);
        return hasLeft == hasRight && (!hasLeft || leftValue.AsSpan().SequenceEqual(rightValue));
    }

    // Compares only fields belonging to the requested consistency boundary.
    private static bool Matches(Dictionary<string, byte[]> left, Dictionary<string, byte[]> right, string[] keys)
        => keys.All(key => Same(left, right, key));

    // Applies a value or deletion without changing the session serialization format.
    private static void Write(ISession session, Dictionary<string, byte[]> desired, string key)
    {
        if (desired.TryGetValue(key, out var value))
            session.Set(key, value);
        else
            session.Remove(key);
    }

    // Fresh context versions come from the existing API contract.
    private static long ReadVersion(Dictionary<string, byte[]> values)
        => ReadLong(values, "INDContextVersion");

    // Missing legacy metadata is older than an explicitly recorded selection.
    private static long ReadLong(Dictionary<string, byte[]> values, string key)
        => values.TryGetValue(key, out var value) &&
           long.TryParse(Encoding.UTF8.GetString(value), NumberStyles.Integer, CultureInfo.InvariantCulture, out var version)
            ? version : 0;

    // Invalid activity metadata cannot displace a valid timestamp.
    private static DateTimeOffset ReadUtc(byte[] value)
        => DateTimeOffset.TryParse(Encoding.UTF8.GetString(value), CultureInfo.InvariantCulture,
            DateTimeStyles.AssumeUniversal, out var utc) ? utc : DateTimeOffset.MinValue;
}
