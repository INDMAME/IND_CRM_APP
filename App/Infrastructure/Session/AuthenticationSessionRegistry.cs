namespace IND_CRM_APP.Infrastructure.Session;

// Identifies one authenticated login independently of the expiring session data.
internal sealed record AuthenticationSessionIdentity(
    string Family, string Generation, string EntraOid, long Revision, DateTimeOffset ExpiresUtc);

// Travels in protected OIDC state even when the callback has no session cookie.
internal sealed record AuthenticationSessionAttempt(string Family, long Revision, DateTimeOffset IssuedUtc);

// Coordinates login and logout using the same process-local lifetime as the session provider.
internal sealed class AuthenticationSessionRegistry
{
    private const int DefaultCapacity = 10000;
    private readonly object _gate = new();
    private readonly Dictionary<string, State> _states = new(StringComparer.Ordinal);
    private readonly int _capacity;
    private readonly TimeProvider _time;
    private static long _revision;

    // Owns a bounded registry so general cache pressure cannot evict a live logout marker.
    public AuthenticationSessionRegistry() : this(DefaultCapacity, TimeProvider.System) { }

    // Allows deterministic capacity and expiry checks without changing runtime configuration.
    internal AuthenticationSessionRegistry(int capacity, TimeProvider time)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(capacity);
        _capacity = capacity;
        _time = time ?? throw new ArgumentNullException(nameof(time));
    }

    // Orders login attempts before asynchronous identity-provider work starts.
    internal AuthenticationSessionAttempt? Begin(string family, AuthenticationSessionIdentity? current, TimeSpan timeout)
    {
        lock (_gate)
        {
            var now = _time.GetUtcNow();
            var state = Read(family);
            if (current != null && !Matches(state, current))
                return null;
            state ??= Admit(family, now);
            var revision = NextRevision();
            state.AttemptRevision = revision;
            state.AttemptPending = true;
            state.RecoveredFromCookie = false;
            Save(state, now.Add(timeout));
            return new(family, revision, now);
        }
    }

    // Publishes a new generation only for the latest valid login attempt.
    internal AuthenticationSessionIdentity? Activate(AuthenticationSessionAttempt attempt, string oid,
        DateTimeOffset expiresUtc, TimeSpan timeout)
    {
        lock (_gate)
        {
            var now = _time.GetUtcNow();
            if (string.IsNullOrWhiteSpace(oid) || expiresUtc <= now || attempt.IssuedUtc > now ||
                now - attempt.IssuedUtc >= timeout)
                return null;
            var state = Read(attempt.Family);
            // A missing entry after process restart can recover from protected OIDC state.
            var pendingMatches = state?.AttemptPending == true && state.AttemptRevision == attempt.Revision;
            var recoveredLaterAttempt = state?.RecoveredFromCookie == true && attempt.Revision > state.Revision;
            if (state != null && !pendingMatches && !recoveredLaterAttempt)
                return null;
            state ??= Admit(attempt.Family, now);
            var identity = new AuthenticationSessionIdentity(attempt.Family, Guid.NewGuid().ToString("N"),
                oid, attempt.Revision, expiresUtc);
            state.Active = identity;
            state.Revision = attempt.Revision;
            state.AttemptRevision = attempt.Revision;
            state.AttemptPending = false;
            state.RecoveredFromCookie = false;
            Save(state, expiresUtc);
            // A recovered callback stays consumed even when its cookie expires before the OIDC attempt.
            Save(state, attempt.IssuedUtc.Add(timeout));
            return identity;
        }
    }

    // A valid protected cookie can rebuild metadata after restart without changing login expiry.
    internal bool Validate(AuthenticationSessionIdentity identity, DateTimeOffset retainUntil)
    {
        lock (_gate)
        {
            var now = _time.GetUtcNow();
            if (identity.ExpiresUtc <= now)
                return false;
            var state = Read(identity.Family);
            if (state == null)
            {
                state = Admit(identity.Family, now);
                state.Active = identity;
                state.Revision = identity.Revision;
                state.AttemptRevision = identity.Revision;
                // The old valid cookie may arrive before a newer protected callback after restart.
                state.RecoveredFromCookie = true;
            }
            else if (!Matches(state, identity))
                return false;
            Save(state, retainUntil > identity.ExpiresUtc ? retainUntil : identity.ExpiresUtc);
            return true;
        }
    }

    // Rechecks the request identity after upstream work without adopting a later login.
    internal bool IsCurrent(AuthenticationSessionIdentity identity)
    {
        lock (_gate)
            return Matches(Read(identity.Family), identity);
    }

    // Closing one login also cancels its pending OIDC callbacks, but cannot close a newer login.
    internal long? Close(AuthenticationSessionIdentity identity)
    {
        lock (_gate)
        {
            var state = Read(identity.Family);
            if (!Matches(state, identity))
                return null;
            var revision = NextRevision();
            state!.Active = null;
            state.Revision = revision;
            state.AttemptRevision = revision;
            state.AttemptPending = false;
            state.RecoveredFromCookie = false;
            Save(state, identity.ExpiresUtc);
            return revision;
        }
    }

    // Logout before first sign-in cancels the pending anonymous login attempt too.
    internal long? CancelAnonymous(string family)
    {
        lock (_gate)
        {
            var state = Read(family);
            if (state == null || state.Active != null)
                return null;
            state.Revision = NextRevision();
            state.AttemptRevision = state.Revision;
            state.AttemptPending = false;
            state.RecoveredFromCookie = false;
            return state.Revision;
        }
    }

    // Response cookie writes belong to the accepted login or its own logout revision.
    internal bool IsRevision(string family, long revision)
    {
        lock (_gate)
            return Read(family)?.Revision == revision;
    }

    // Retains closure markers through cookie expiry, independently of the two-hour data cache.
    private static void Save(State state, DateTimeOffset expiresUtc)
    {
        if (expiresUtc > state.ExpiresUtc)
            state.ExpiresUtc = expiresUtc;
    }

    // Expiry is absolute and checked under the same lock as admission and state transitions.
    private State? Read(string family)
    {
        if (!_states.TryGetValue(family, out var state))
            return null;
        if (state.ExpiresUtc > _time.GetUtcNow())
            return state;
        _states.Remove(family);
        return null;
    }

    // Only expired entries may free a slot; saturation never removes a valid cookie or tombstone.
    private State Admit(string family, DateTimeOffset now)
    {
        if (_states.Count >= _capacity)
        {
            foreach (var key in _states.Where(pair => pair.Value.ExpiresUtc <= now).Select(pair => pair.Key).ToArray())
                _states.Remove(key);
        }
        if (_states.Count >= _capacity)
            throw new AuthenticationSessionCapacityException();
        var state = new State();
        _states.Add(family, state);
        return state;
    }

    // Identity checks never promote a different generation from its protected cookie.
    private static bool Matches(State? state, AuthenticationSessionIdentity identity)
        => state?.Active?.Generation == identity.Generation &&
           string.Equals(state.Active.EntraOid, identity.EntraOid, StringComparison.OrdinalIgnoreCase);

    // Monotonic revisions prevent completion order from changing accepted login order.
    private static long NextRevision()
    {
        long previous;
        long next;
        do
        {
            previous = Interlocked.Read(ref _revision);
            next = Math.Max(DateTime.UtcNow.Ticks, previous + 1);
        } while (Interlocked.CompareExchange(ref _revision, next, previous) != previous);
        return next;
    }

    // Each browser lineage keeps only its current generation and the latest attempt.
    private sealed class State
    {
        internal AuthenticationSessionIdentity? Active;
        internal long Revision;
        internal long AttemptRevision;
        internal bool AttemptPending;
        internal bool RecoveredFromCookie;
        internal DateTimeOffset ExpiresUtc;
    }
}

// Adapters return a temporary failure when preserving live authentication state fills the registry.
internal sealed class AuthenticationSessionCapacityException : InvalidOperationException
{
    internal AuthenticationSessionCapacityException() : base("Authentication session capacity is temporarily exhausted.") { }
}
