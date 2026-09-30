using System.Globalization;

namespace IND_CRM_APP.Infrastructure.Session;

// Orders explicit company choices before any upstream work can reorder their completion.
internal static class CompanySelectionRevision
{
    internal const string Key = "INDCompanySelectionRevision";
    private static long _lastRevision;

    // Generates monotonic process-local revisions for the process-local session store.
    internal static long Create()
    {
        long previous;
        long next;
        do
        {
            previous = Interlocked.Read(ref _lastRevision);
            next = Math.Max(DateTime.UtcNow.Ticks, previous + 1);
        } while (Interlocked.CompareExchange(ref _lastRevision, next, previous) != previous);
        return next;
    }

    // Records intent only after the existing authorization check accepts the company.
    internal static void Record(ISession session, long revision)
        => session.SetString(Key, revision.ToString(CultureInfo.InvariantCulture));
}
