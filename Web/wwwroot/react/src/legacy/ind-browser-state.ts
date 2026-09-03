import { getBrowserStorageScopeValues } from "../utils/browserStorageScope.ts";

type InvalidationMode = "none" | "login" | "reload";

type BrowserInvalidationMessage = {
  version: 1;
  nonce: string;
  reason: string;
  mode: InvalidationMode;
  targetUrl: string;
  removeIdentityMarker: boolean;
  clearState: boolean;
};

const IDENTITY_MARKER_KEY = "ind_browser_identity_v1";
const INVALIDATION_KEY = "ind_browser_invalidation_v1";
const CHANNEL_NAME = "ind-browser-state-v1";
const DEFAULT_LOGIN_URL = "/Auth/Login?loggedOut=true";
const EXPECTED_COMPANY_HEADER = "X-IND-Expected-Company";
const STALE_COMPANY_HEADER = "X-IND-Company-Context-Stale";
const SESSION_PREFIXES = ["expense_", "visitas_", "ind_texteditor_", "ind_visit_", "module_data_visibility_v3"];
const LOCAL_PREFIXES = ["expense_"];
const CACHE_PREFIXES = ["ind-expense-ticket-image-"];

const getStorage = (kind: "localStorage" | "sessionStorage"): Storage | null => {
  try {
    return window[kind];
  } catch {
    return null;
  }
};

const removeKeysByPrefix = (storage: Storage | null, prefixes: string[]): void => {
  if (!storage) return;
  try {
    const keys: string[] = [];
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key && prefixes.some((prefix) => key.startsWith(prefix))) keys.push(key);
    }
    keys.forEach((key) => storage.removeItem(key));
  } catch {
    // Storage cleanup must never block logout or login.
  }
};

const normalizeLocalTarget = (candidate: unknown, fallback: string): string => {
  try {
    const url = new URL(String(candidate || fallback), window.location.origin);
    if (url.origin !== window.location.origin) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
};

const createNonce = (): string => {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {
    // Fall back to a timestamp-based value in older browsers.
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

// Coordinates sensitive browser state across identity changes and browser tabs.
class BrowserStateCoordinator {
  private readonly renderedCompanyId = String(window.__IND_SELECTED_COMPANY__ || "").trim();
  private persistenceAllowed = false;
  private epoch = 0;
  private logoutInProgress = false;
  private lastInvalidationNonce = "";
  private channel: BroadcastChannel | null = null;

  public readonly ready: Promise<void>;

  public constructor() {
    this.installCompanyContextFetchGuard();
    this.lastInvalidationNonce = this.readLatestInvalidation()?.nonce || "";
    this.channel = this.openChannel();
    this.bindCrossTabEvents();
    this.ready = this.initializeIdentity();
  }

  // Reports whether feature code may persist sensitive state.
  public isPersistenceAllowed = (): boolean => this.persistenceAllowed;

  // Returns the current invalidation epoch for async race checks.
  public getEpoch = (): number => this.epoch;

  // Clears only application-owned sensitive browser namespaces.
  public clearSensitiveState = async (removeIdentityMarker = true): Promise<void> => {
    this.stopSensitivePersistence();

    const localStorage = getStorage("localStorage");
    removeKeysByPrefix(getStorage("sessionStorage"), SESSION_PREFIXES);
    removeKeysByPrefix(localStorage, LOCAL_PREFIXES);
    if (removeIdentityMarker) {
      try {
        localStorage?.removeItem(IDENTITY_MARKER_KEY);
      } catch {
        // Ignore unavailable storage.
      }
    }

    await this.deleteSensitiveCaches();
  };

  // Stops writes and notifies other tabs before a server-side relogin.
  public prepareForRelogin = async (reason = "forced-relogin"): Promise<void> => {
    const cleanup = this.clearSensitiveState(true);
    this.publishInvalidation({ reason, mode: "none", targetUrl: "", removeIdentityMarker: true });
    await cleanup;
  };

  // Redirects every open CRM tab after the server has cleared authentication.
  public completeRelogin = (targetUrl = DEFAULT_LOGIN_URL): void => {
    const safeTarget = normalizeLocalTarget(targetUrl, DEFAULT_LOGIN_URL);
    this.publishInvalidation({
      reason: "relogin-complete",
      mode: "login",
      targetUrl: safeTarget,
      removeIdentityMarker: true,
    });
  };

  // Stops stale tabs before the shared server-side company changes.
  public prepareForCompanyChange = (): void => {
    this.stopSensitivePersistence();
    this.publishInvalidation({
      reason: "company-change-start",
      mode: "none",
      targetUrl: "",
      removeIdentityMarker: false,
      clearState: false,
    });
  };

  // Reloads every tab after the server confirms the company change.
  public completeCompanyChange = (): void => {
    this.stopSensitivePersistence();
    this.publishInvalidation({
      reason: "company-change-complete",
      mode: "reload",
      targetUrl: "",
      removeIdentityMarker: false,
      clearState: false,
    });
  };

  // Submits logout only after local cleanup and preserves antiforgery fields.
  public submitLogoutForm = async (form: HTMLFormElement): Promise<void> => {
    if (this.logoutInProgress) return;
    this.logoutInProgress = true;
    form.setAttribute("aria-busy", "true");
    await this.prepareForRelogin("explicit-logout");

    try {
      const response = await fetch(form.action || "/Auth/Logout", {
        method: "POST",
        credentials: "same-origin",
        body: new FormData(form),
      });
      if (!response.ok && !response.redirected) throw new Error("Logout request failed.");

      const loginUrl = normalizeLocalTarget(response.url, DEFAULT_LOGIN_URL);
      this.completeRelogin(loginUrl);
      window.location.replace(loginUrl);
    } catch {
      this.completeRelogin(DEFAULT_LOGIN_URL);
      try {
        HTMLFormElement.prototype.submit.call(form);
      } catch {
        window.location.replace(DEFAULT_LOGIN_URL);
      }
    }
  };

  private async initializeIdentity(): Promise<void> {
    const { entraOid, companyId } = getBrowserStorageScopeValues();
    const localStorage = getStorage("localStorage");
    const previousOid = this.readIdentityMarker(localStorage);

    if (!entraOid) {
      const cleanup = this.clearSensitiveState(true);
      const isLoginPage = this.isLoginPage();
      this.publishInvalidation({
        reason: "missing-identity",
        mode: isLoginPage ? "login" : "none",
        targetUrl: isLoginPage ? DEFAULT_LOGIN_URL : "",
        removeIdentityMarker: true,
      });
      await cleanup;
      if (!isLoginPage) await this.forceServerRelogin("missing-identity");
      return;
    }

    if (!companyId) {
      await this.clearSensitiveState(false);
      return;
    }

    if (!previousOid || previousOid !== entraOid) {
      const cleanup = this.clearSensitiveState(false);
      const activationEpoch = this.epoch;
      this.writeIdentityMarker(localStorage, entraOid);

      if (previousOid && previousOid !== entraOid) {
        this.publishInvalidation({
          reason: "identity-change",
          mode: "reload",
          targetUrl: "",
          removeIdentityMarker: false,
        });
      }

      await cleanup;
      const currentScope = getBrowserStorageScopeValues();
      const identityMarker = this.readIdentityMarker(localStorage);
      if (
        this.epoch === activationEpoch &&
        identityMarker === entraOid &&
        currentScope.entraOid === entraOid &&
        currentScope.companyId === companyId
      ) {
        this.persistenceAllowed = true;
      }
      return;
    }

    this.persistenceAllowed = true;
  }

  // Adds the render-time company to same-origin fetches and reloads on a stale-context response.
  private installCompanyContextFetchGuard(): void {
    if (!this.renderedCompanyId || typeof window.fetch !== "function") return;

    const nativeFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      let requestUrl: URL | null = null;
      try {
        const rawUrl = input instanceof Request ? input.url : input.toString();
        requestUrl = new URL(rawUrl, window.location.href);
      } catch {
        requestUrl = null;
      }

      if (!requestUrl || requestUrl.origin !== window.location.origin) {
        return nativeFetch(input, init);
      }

      const headers = new Headers(input instanceof Request ? input.headers : undefined);
      if (init?.headers) {
        new Headers(init.headers).forEach((value, name) => headers.set(name, value));
      }
      headers.set(EXPECTED_COMPANY_HEADER, this.renderedCompanyId);

      const response = await nativeFetch(input, { ...init, headers });
      if (response.status === 409 && response.headers.get(STALE_COMPANY_HEADER) === "true") {
        this.stopSensitivePersistence();
        this.publishInvalidation({
          reason: "stale-company-context",
          mode: "reload",
          targetUrl: "",
          removeIdentityMarker: false,
          clearState: false,
        });
        window.location.reload();
        return await new Promise<Response>(() => undefined);
      }

      return response;
    };
  }

  private bindCrossTabEvents(): void {
    window.addEventListener("storage", (event) => {
      if (event.key !== INVALIDATION_KEY || !event.newValue) return;
      const message = this.parseInvalidation(event.newValue);
      if (message) void this.handleInvalidation(message);
    });

    window.addEventListener("pageshow", (event) => {
      if (!event.persisted) return;
      const latest = this.readLatestInvalidation();
      if (latest && latest.nonce !== this.lastInvalidationNonce) {
        void this.handleInvalidation(latest);
      }
    });
  }

  private openChannel(): BroadcastChannel | null {
    try {
      if (typeof BroadcastChannel !== "function") return null;
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.addEventListener("message", (event: MessageEvent<BrowserInvalidationMessage>) => {
        if (event.data) void this.handleInvalidation(event.data);
      });
      return channel;
    } catch {
      return null;
    }
  }

  private publishInvalidation(
    values: Omit<BrowserInvalidationMessage, "version" | "nonce" | "clearState"> & { clearState?: boolean }
  ): BrowserInvalidationMessage {
    const message: BrowserInvalidationMessage = {
      version: 1,
      nonce: createNonce(),
      ...values,
      clearState: values.clearState !== false,
    };
    this.lastInvalidationNonce = message.nonce;
    const serialized = JSON.stringify(message);

    try {
      getStorage("localStorage")?.setItem(INVALIDATION_KEY, serialized);
    } catch {
      // BroadcastChannel remains available when local storage is blocked.
    }
    try {
      this.channel?.postMessage(message);
    } catch {
      // The current tab still completes cleanup and navigation.
    }
    return message;
  }

  private async handleInvalidation(message: BrowserInvalidationMessage): Promise<void> {
    if (message.version !== 1 || !message.nonce || message.nonce === this.lastInvalidationNonce) return;
    this.lastInvalidationNonce = message.nonce;
    if (message.clearState !== false) {
      await this.clearSensitiveState(message.removeIdentityMarker);
    } else {
      this.stopSensitivePersistence();
    }

    if (message.mode === "login") {
      if (!this.isLoginPage()) {
        window.location.replace(normalizeLocalTarget(message.targetUrl, DEFAULT_LOGIN_URL));
      }
      return;
    }

    if (message.mode === "reload") window.location.reload();
  }

  private async deleteSensitiveCaches(): Promise<void> {
    try {
      if (!("caches" in window)) return;
      const names = await window.caches.keys();
      const targets = names.filter((name) => CACHE_PREFIXES.some((prefix) => name.startsWith(prefix)));
      await Promise.all(targets.map((name) => window.caches.delete(name).catch(() => false)));
    } catch {
      // Cache cleanup is best effort; scoped keys still prevent cross-user reads.
    }
  }

  // Clears the authenticated server session before navigating to Login.
  private async forceServerRelogin(reason: string): Promise<void> {
    const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || "";
    const safeReason = encodeURIComponent(reason || "browser-state-error");

    try {
      const headers: Record<string, string> = {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      };
      if (csrfToken) headers.RequestVerificationToken = csrfToken;

      const response = await fetch(`/Auth/ForceRelogin?reason=${safeReason}`, {
        method: "POST",
        credentials: "same-origin",
        headers,
      });
      if (!response.ok) throw new Error("Forced relogin request failed.");

      const payload = await response.json().catch(() => null) as { loginUrl?: unknown } | null;
      const loginUrl = normalizeLocalTarget(payload?.loginUrl, DEFAULT_LOGIN_URL);
      this.completeRelogin(loginUrl);
      window.location.replace(loginUrl);
    } catch {
      this.submitForcedReloginForm(safeReason, csrfToken);
    }
  }

  private submitForcedReloginForm(safeReason: string, csrfToken: string): void {
    try {
      const form = document.createElement("form");
      form.method = "post";
      form.action = `/Auth/ForceRelogin?reason=${safeReason}`;
      form.hidden = true;
      if (csrfToken) {
        const token = document.createElement("input");
        token.type = "hidden";
        token.name = "__RequestVerificationToken";
        token.value = csrfToken;
        form.appendChild(token);
      }
      document.body.appendChild(form);
      HTMLFormElement.prototype.submit.call(form);
    } catch {
      window.location.replace(DEFAULT_LOGIN_URL);
    }
  }

  private stopSensitivePersistence(): void {
    this.persistenceAllowed = false;
    this.epoch += 1;
  }

  private readIdentityMarker(storage: Storage | null): string {
    try {
      return String(storage?.getItem(IDENTITY_MARKER_KEY) || "").trim().toLowerCase();
    } catch {
      return "";
    }
  }

  private writeIdentityMarker(storage: Storage | null, entraOid: string): void {
    try {
      storage?.setItem(IDENTITY_MARKER_KEY, entraOid);
    } catch {
      // Identity-scoped keys remain safe when durable storage is unavailable.
    }
  }

  private readLatestInvalidation(): BrowserInvalidationMessage | null {
    try {
      return this.parseInvalidation(getStorage("localStorage")?.getItem(INVALIDATION_KEY) || "");
    } catch {
      return null;
    }
  }

  private parseInvalidation(raw: string): BrowserInvalidationMessage | null {
    try {
      const parsed = JSON.parse(raw) as Partial<BrowserInvalidationMessage>;
      if (parsed.version !== 1 || !parsed.nonce || !parsed.reason || !parsed.mode) return null;
      const mode = String(parsed.mode);
      if (mode !== "none" && mode !== "login" && mode !== "reload") return null;
      return {
        version: 1,
        nonce: String(parsed.nonce),
        reason: String(parsed.reason),
        mode,
        targetUrl: String(parsed.targetUrl || ""),
        removeIdentityMarker: parsed.removeIdentityMarker !== false,
        clearState: parsed.clearState !== false,
      };
    } catch {
      return null;
    }
  }

  private isLoginPage(): boolean {
    return window.location.pathname.toLowerCase().startsWith("/auth/login");
  }
}

const coordinator = new BrowserStateCoordinator();
window.IND = window.IND || {};
window.IND.browserState = {
  ready: coordinator.ready,
  isPersistenceAllowed: coordinator.isPersistenceAllowed,
  getEpoch: coordinator.getEpoch,
  clearSensitiveState: coordinator.clearSensitiveState,
  prepareForRelogin: coordinator.prepareForRelogin,
  completeRelogin: coordinator.completeRelogin,
  prepareForCompanyChange: coordinator.prepareForCompanyChange,
  completeCompanyChange: coordinator.completeCompanyChange,
  submitLogoutForm: coordinator.submitLogoutForm,
};
