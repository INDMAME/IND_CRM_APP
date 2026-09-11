using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.Caching.Distributed;
using System.Diagnostics.CodeAnalysis;

namespace IND_CRM_APP.Infrastructure.Session;

// Merges session writes under a short lock while keeping request execution concurrent.
public sealed class ConcurrentSessionStore : ISessionStore
{
    private readonly DistributedSessionStore _store;
    private readonly ILogger<ConcurrentSessionStore> _logger;
    private readonly SemaphoreSlim[] _commitLocks = Enumerable.Range(0, 128)
        .Select(_ => new SemaphoreSlim(1, 1)).ToArray();

    // Retains the framework session format, cookies, expiry and memory cache provider.
    public ConcurrentSessionStore(IDistributedCache cache, ILoggerFactory loggerFactory)
    {
        _store = new DistributedSessionStore(cache, loggerFactory);
        _logger = loggerFactory.CreateLogger<ConcurrentSessionStore>();
    }

    // Fixed lock stripes bound coordination memory regardless of session count.
    public ISession Create(string sessionKey, TimeSpan idleTimeout, TimeSpan ioTimeout,
        Func<bool> tryEstablishSession, bool isNewSessionKey)
    {
        var gate = _commitLocks[StringComparer.Ordinal.GetHashCode(sessionKey) & 127];
        return new MergingSession(
            _store.Create(sessionKey, idleTimeout, ioTimeout, tryEstablishSession, isNewSessionKey),
            () => _store.Create(sessionKey, idleTimeout, ioTimeout, () => true, false),
            gate, _logger);
    }

    // Tracks the original state so unchanged keys never overwrite a concurrent update.
    private sealed class MergingSession : ISession
    {
        private ISession _inner;
        private readonly Func<ISession> _reload;
        private readonly SemaphoreSlim _gate;
        private readonly ILogger _logger;
        private Dictionary<string, byte[]>? _original;
        private bool _changed;
        private bool _cleared;

        public MergingSession(ISession inner, Func<ISession> reload, SemaphoreSlim gate, ILogger logger)
        {
            _inner = inner;
            _reload = reload;
            _gate = gate;
            _logger = logger;
        }

        public string Id => _inner.Id;
        public bool IsAvailable => _inner.IsAvailable;
        public IEnumerable<string> Keys => _inner.Keys;

        // Loads asynchronously when callers request it, using the normal framework contract.
        public async Task LoadAsync(CancellationToken cancellationToken = default)
        {
            await _inner.LoadAsync(cancellationToken);
            CaptureOriginal();
        }

        // Captures the complete baseline before exposing or changing session values.
        public bool TryGetValue(string key, [NotNullWhen(true)] out byte[]? value)
        {
            CaptureOriginal();
            return _inner.TryGetValue(key, out value);
        }

        // Avoids making a read-only request dirty when derived metadata is unchanged.
        public void Set(string key, byte[] value)
        {
            ArgumentNullException.ThrowIfNull(value);
            CaptureOriginal();
            if (_inner.TryGetValue(key, out var existing) && existing.AsSpan().SequenceEqual(value))
                return;
            _inner.Set(key, value);
            _changed = true;
        }

        // Removes only an existing value and records an actual mutation.
        public void Remove(string key)
        {
            CaptureOriginal();
            if (!_inner.TryGetValue(key, out _))
                return;
            _inner.Remove(key);
            _changed = true;
        }

        // Explicit logout clears the latest state within the same identity and company.
        public void Clear()
        {
            CaptureOriginal();
            _inner.Clear();
            _changed = true;
            _cleared = true;
        }

        // Locks only reload, merge and commit; no upstream request runs while holding it.
        public async Task CommitAsync(CancellationToken cancellationToken = default)
        {
            if (!_changed)
            {
                await _inner.CommitAsync(cancellationToken);
                return;
            }

            var desired = SessionStateMerge.Snapshot(_inner);
            await _gate.WaitAsync(cancellationToken);
            try
            {
                var latest = _reload();
                await latest.LoadAsync(cancellationToken);
                // Preserve the initial framework session id when no concurrent commit occurred.
                if (SessionStateMerge.Unchanged(_original!, latest))
                    latest = _inner;
                else if (!SessionStateMerge.Apply(_original!, desired, latest, _cleared))
                    _logger.LogInformation("Discarded session writes from an obsolete identity or company context.");
                await latest.CommitAsync(cancellationToken);
                _inner = latest;
                _original = SessionStateMerge.Snapshot(latest);
                _changed = false;
                _cleared = false;
            }
            finally
            {
                _gate.Release();
            }
        }

        // The default provider loads synchronously here only when LoadAsync was not used.
        private void CaptureOriginal() => _original ??= SessionStateMerge.Snapshot(_inner);
    }
}
