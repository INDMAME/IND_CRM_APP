import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import AudioRecorderMinimal from "./AudioRecorderMinimal.tsx";
import PulseRingsMultipleIcon from "../../components/commons/PulseRingsMultipleIcon.tsx";
import { TEXT_EDITOR_PREFIX } from "../../utils/textEditor.ts";
import { getSessionValueWithExpiry, removeSessionValueWithExpiry, setSessionValueWithExpiry } from "../../utils/sessionExpiry.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../utils/reactIsland.tsx";

const IND_I18N = globalThis.__IND_I18N__ || {};
const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;

const STORAGE_PREFIX = TEXT_EDITOR_PREFIX;
const TOPBAR_HEIGHT = 64;
const OUTER_MARGIN = 5;
const MIN_EDITOR_HEIGHT = 240;
const RECORDER_GAP = 12;
const TYPE_INTERVAL_MS = 28;
const TYPE_TARGET_MS = 4200;
const TYPE_MIN_STEP = 1;
const TYPE_MAX_STEP = 4;
const TEXT_EDITOR_STORAGE_TTL_MS = 12 * 60 * 60 * 1000;

// Shared spinner for local loading states.
type SpinnerProps = {
  size?: string;
  label?: string;
};

const Spinner = ({ size = "h-6 w-6", label = "" }: SpinnerProps) => (
  <svg
    className={`ind-spinner ${size}`}
    viewBox="0 0 20 20"
    role="status"
    aria-label={label || indT("Common_Loading", "Loading")}
  >
    <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
  </svg>
);

const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : "";
};

function safeGetSessionValue(key) {
  return getSessionValueWithExpiry(key);
}

function safeSetSessionValue(key, value) {
  setSessionValueWithExpiry(key, value, TEXT_EDITOR_STORAGE_TTL_MS);
}

// Remove a session value without throwing for blocked storage.
function safeRemoveSessionValue(key) {
  removeSessionValueWithExpiry(key);
}

function parseBool(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

// Parses optional boolean values with a default fallback.
function parseOptionalBool(value, fallback) {
  const normalized = String(value || "").trim();
  if (!normalized) return fallback;
  return parseBool(normalized);
}

function getQueryParam(key) {
  if (typeof window === "undefined") return "";
  try {
    return new URLSearchParams(window.location.search || "").get(key) || "";
  } catch {
    return "";
  }
}

function normalizeEditModeKey(value) {
  const key = String(value || "").trim();
  if (!key) return "";
  return key.startsWith("ind_visit_edit_") ? key : "";
}

function IndTextEditorApp({ fieldId, fieldLabel, initialValue, returnUrl, initialReadOnly = false, editModeKey = "", allowEdit = true }) {
  const storageKey = useMemo(() => `${STORAGE_PREFIX}${String(fieldId || "").trim()}`, [fieldId]);
  // Resolve return URL from props or sessionStorage.
  const resolvedReturnUrl = useMemo(() => {
    const direct = typeof returnUrl === "string" ? returnUrl.trim() : "";
    if (direct) return direct;
    const safeId = String(fieldId || "").trim();
    if (!safeId) return "";
    try {
      const stored = getSessionValueWithExpiry(`${STORAGE_PREFIX}${safeId}_returnUrl`);
      return stored ? String(stored).trim() : "";
    } catch {
      return "";
    }
  }, [fieldId, returnUrl]);
  const canEdit = !!allowEdit;
  const [isReadOnly, setIsReadOnly] = useState(!!initialReadOnly || !canEdit);
  const normalizedEditModeKey = useMemo(() => normalizeEditModeKey(editModeKey), [editModeKey]);
  const [recorderOpen, setRecorderOpen] = useState(false);
  const [recorderResetKey, setRecorderResetKey] = useState(0);
  const [recorderHeightPx, setRecorderHeightPx] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribeError, setTranscribeError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const recorderBoxRef = useRef(null);
  const typingTimerRef = useRef(null);
  const typingTextRef = useRef("");
  const typingIndexRef = useRef(0);
  const initialTextRef = useRef("");
  const textareaRef = useRef(null);
  const computeEditorHeight = useCallback(() => {
    if (typeof window === "undefined") {
      const fallback = `calc(100vh - ${TOPBAR_HEIGHT + OUTER_MARGIN * 2}px)`;
      return fallback;
    }
    const viewport = window.innerHeight || 0;
    if (!viewport) {
      return `calc(100vh - ${TOPBAR_HEIGHT + OUTER_MARGIN * 2}px)`;
    }
    const recorderSpace = recorderOpen ? recorderHeightPx + RECORDER_GAP : 0;
    const available = Math.max(viewport - TOPBAR_HEIGHT - OUTER_MARGIN * 2 - recorderSpace, MIN_EDITOR_HEIGHT);
    return `${available}px`;
  }, [recorderOpen, recorderHeightPx]);

  const [editorHeight, setEditorHeight] = useState(() => computeEditorHeight());

  const [text, setText] = useState(() => {
    const stored = safeGetSessionValue(storageKey);
    const initialText = stored !== null ? stored : String(initialValue || "");
    initialTextRef.current = initialText;
    return initialText;
  });

  const hasActiveProcess = useMemo(
    () => !isReadOnly && (isTranscribing || isTyping || text !== (initialTextRef.current ?? "")),
    [isReadOnly, isTranscribing, isTyping, text]
  );

  const stopTyping = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    typingTextRef.current = "";
    typingIndexRef.current = 0;
    setIsTyping(false);
  }, []);

  const startTyping = useCallback(
    (fullText) => {
      const textValue = String(fullText || "");
      stopTyping();
      if (!textValue) {
        setText("");
        return;
      }

      typingTextRef.current = textValue;
      typingIndexRef.current = 0;
      setIsTyping(true);
      setText("");

      const total = textValue.length;
      const maxSteps = Math.max(1, Math.floor(TYPE_TARGET_MS / TYPE_INTERVAL_MS));
      const stepSize = Math.min(TYPE_MAX_STEP, Math.max(TYPE_MIN_STEP, Math.ceil(total / maxSteps)));

      const tick = () => {
        const next = Math.min(typingIndexRef.current + stepSize, total);
        typingIndexRef.current = next;
        setText(typingTextRef.current.slice(0, next));
        if (next < total) {
          typingTimerRef.current = setTimeout(tick, TYPE_INTERVAL_MS);
        } else {
          typingTimerRef.current = null;
          setIsTyping(false);
        }
      };

      typingTimerRef.current = setTimeout(tick, TYPE_INTERVAL_MS);
    },
    [stopTyping]
  );

  // Send the WAV to MVC and replace textarea with the transcription.
  const handleTranscribe = useCallback(
    async (wavBlob) => {
      if (!wavBlob || isTranscribing) return;

      // Lock the editor while the transcription request is in flight.
      setIsTranscribing(true);
      setTranscribeError("");

      try {
        // Build multipart form payload expected by /Visitas/TranscribeSpeech.
        const form = new FormData();
        form.append("languageId", "auto");
        form.append("audioFile", wavBlob, "audio.wav");
        if (resolvedReturnUrl) {
          form.append("returnUrl", resolvedReturnUrl);
        }

        const csrfToken = getCsrfToken();
        const headers = {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...(csrfToken ? { RequestVerificationToken: csrfToken } : {}),
        };

        // Send the WAV to MVC (server will call the speech API).
        const query = resolvedReturnUrl ? `?returnUrl=${encodeURIComponent(resolvedReturnUrl)}` : "";
        const response = await fetch(`/Visitas/TranscribeSpeech${query}`, {
          method: "POST",
          body: form,
          headers,
        });

        const payload = await response.json().catch(() => null);
        const ok = response.ok && payload && payload.success === true;

        if (!ok) {
          const msg = payload && payload.message ? String(payload.message) : indT("TextEditor_TranscribeFailed", "Transcribe failed.");
          setTranscribeError(msg);
          return;
        }

        const transcript = payload && typeof payload.data === "string" ? payload.data : "";
        if (!transcript.trim()) {
          setTranscribeError(indT("TextEditor_TranscribeFailed", "Transcribe failed."));
          return;
        }

        // Replace the full textarea content with the new transcription.
        startTyping(transcript);
        // Hide the recorder after a successful transcription.
        setRecorderOpen(false);
        setRecorderResetKey((k) => k + 1);
      } catch (err) {
        const msg = err && err.message ? String(err.message) : indT("TextEditor_TranscribeFailed", "Transcribe failed.");
        setTranscribeError(msg);
      } finally {
        // Re-enable the editor after completion.
        setIsTranscribing(false);
      }
    },
    [isTranscribing, startTyping]
  );

  // Clear transcription errors when audio changes.
  const handleAudioCleared = useCallback(() => {
    setTranscribeError("");
  }, []);

  const handleRecordingError = useCallback((message) => {
    // Show a warning action mark; keep the recorder open to display the error label.
    try {
      if (window.IND && typeof window.IND.flashActionMark === "function") {
        window.IND.flashActionMark({ type: "warningProcess", durationMs: 1500 });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const updateHeight = () => {
      setEditorHeight(computeEditorHeight());
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, [computeEditorHeight]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!recorderOpen) {
      setRecorderHeightPx(0);
      return undefined;
    }

    const el = recorderBoxRef.current;
    if (!el) return undefined;

    const measure = () => {
      try {
        const rect = el.getBoundingClientRect();
        setRecorderHeightPx(Math.max(0, Math.floor(rect.height)));
      } catch {
        /* ignore */
      }
    };

    measure();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [recorderOpen]);

  useEffect(() => stopTyping, [stopTyping]);

  useEffect(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);

  useEffect(() => {
    if (!isTyping) return;
    const el = textareaRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [isTyping, text]);

  const toggleRecorder = () => {
    if (isReadOnly || isTranscribing || isTyping) return;
    setTranscribeError("");
    setRecorderOpen((open) => {
      if (open) setRecorderResetKey((k) => k + 1);
      return !open;
    });
  };

  const allowHistoryNav = () => {
    if (typeof window === "undefined") return false;
    if (typeof window.__indAllowHistoryOnce === "function") {
      window.__indAllowHistoryOnce();
      return true;
    }
    return false;
  };

  const enableEdit = useCallback(() => {
    if (!canEdit || !isReadOnly) return;
    setIsReadOnly(false);
    if (normalizedEditModeKey) safeSetSessionValue(normalizedEditModeKey, "true");
  }, [canEdit, isReadOnly, normalizedEditModeKey]);

  const persistDraft = () => {
    // Persist the draft so the previous page can restore it.
    safeSetSessionValue(storageKey, text);
  };

  const goBack = () => {
    persistDraft();
    if (resolvedReturnUrl) {
      window.location.href = resolvedReturnUrl;
      return;
    }
    if (window.history.length > 1 && allowHistoryNav()) return;
    window.history.back();
  };

  const goBackAfterSave = () => {
    // Prefer returnUrl for deterministic navigation across browsers.
    if (resolvedReturnUrl) {
      window.location.href = resolvedReturnUrl;
      return;
    }
    if (window.history.length > 1 && allowHistoryNav()) return;
    window.history.back();
  };

  const onSave = () => {
    if (isReadOnly || isTranscribing || isTyping) return;
    safeSetSessionValue(storageKey, text);
    if (normalizedEditModeKey) {
      safeSetSessionValue(normalizedEditModeKey, "true");
      safeSetSessionValue(`${normalizedEditModeKey}_return`, "1");
    }
    window.__indBypassNavigationGuardOnce?.();
    goBackAfterSave();
  };

  // Restore the initial text value for this session without saving.
  const onCancelEdit = useCallback(() => {
    if (isReadOnly || isTranscribing || isTyping) return;
    stopTyping();
    setTranscribeError("");
    const initialText = initialTextRef.current ?? "";
    setText(initialText);
    safeSetSessionValue(storageKey, initialText);
    if (normalizedEditModeKey) {
      safeRemoveSessionValue(`${normalizedEditModeKey}_return`);
      safeRemoveSessionValue(normalizedEditModeKey);
    }
    window.__indBypassNavigationGuardOnce?.();
    goBackAfterSave();
  }, [isReadOnly, isTranscribing, isTyping, stopTyping, storageKey, goBackAfterSave, normalizedEditModeKey]);

  const editorBoxClass = isReadOnly
    ? "relative rounded-[var(--radius-xl)] border border-slate-200 bg-slate-100 shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary"
    : "relative rounded-[var(--radius-xl)] border border-slate-300 bg-white shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary";
  const micDisabled = isReadOnly || isTranscribing || isTyping;
  const micReadOnlyHint = indT("TextEditor_Microphone_ReadOnlyHint", "Audio transcription is available only in edit mode.");
  const micBaseLabel = indT("TextEditor_Microphone", "Microphone");
  const micAriaLabel = isReadOnly ? `${micBaseLabel}. ${micReadOnlyHint}` : micBaseLabel;
  const micTooltip = isReadOnly ? micReadOnlyHint : micBaseLabel;
  const micButtonClass = `absolute top-0 right-0 z-20 inline-flex h-[70px] w-[70px] items-center justify-center overflow-visible bg-transparent p-0 m-0 border-0 rounded-none text-primary shadow-none focus:outline-hidden focus:ring-0 focus:ring-offset-0${
    micDisabled
      ? isReadOnly
        ? " opacity-70 cursor-not-allowed text-slate-400"
        : " opacity-70 cursor-not-allowed text-primary/60"
      : " hover:text-primary/80"
  }`;

  return (
    <div className="min-h-screen h-dvh w-full flex flex-col bg-slate-200">
      <div className="topbar shadow-md">
        <button
          type="button"
          className="topbar-btn"
          aria-label={indT("Topbar_Back", "Back")}
          onClick={goBack}
        >
          <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="topbar-center flex-1 flex justify-center pointer-events-none px-2">
          <span id="topbarTitle" className="truncate">
            {fieldLabel}
          </span>
        </div>

        {isReadOnly ? (
          canEdit ? (
            <button
              type="button"
              className="topbar-btn"
              aria-label={indT("Common_Edit", "Edit")}
              onClick={enableEdit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </button>
          ) : (
            <div aria-hidden="true" style={{ width: "25px", height: "25px" }} />
          )
        ) : (
          <div className="flex items-center gap-[14px] pr-1">
            <button
              type="button"
              className="topbar-btn"
              aria-label={indT("Common_Save", "Save")}
              onClick={onSave}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </button>
            <button
              type="button"
              className="topbar-btn"
              aria-label={indT("Common_Cancel", "Cancel")}
              onClick={onCancelEdit}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 w-full px-4 pb-4 pt-3">
        <div className="w-full max-w-3xl mx-auto" style={{ marginTop: `${OUTER_MARGIN}px`, marginBottom: `${OUTER_MARGIN}px` }}>
          {recorderOpen && (
            <div ref={recorderBoxRef} className="mb-3 w-full">
              <AudioRecorderMinimal
                key={recorderResetKey}
                embedded
                onTranscribe={handleTranscribe}
                hideTranscribeButton
                autoTranscribeOnStop
                transcribeBusy={isTranscribing}
                transcribeLabel={indT("TextEditor_Transcribe", "Transcribe")}
                transcribeBusyLabel={indT("TextEditor_Transcribing", "Transcribing")}
                onAudioCleared={handleAudioCleared}
                onRecordingError={handleRecordingError}
              />
            </div>
          )}

          {transcribeError ? (
            <div className="mb-3 text-xs text-rose-700 text-center">{transcribeError}</div>
          ) : null}

          <div className={editorBoxClass}>
            <textarea
              ref={textareaRef}
              className={`w-full resize-none bg-transparent px-5 pb-5 pt-10 pr-14 focus:outline-hidden ${isReadOnly ? "ind-readonly-field" : "text-slate-900"}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isTranscribing || isTyping}
              readOnly={isReadOnly || isTranscribing || isTyping}
              aria-readonly={isReadOnly ? "true" : undefined}
              aria-busy={isTranscribing || isTyping}
              style={{ height: editorHeight }}
            />

            {isTranscribing ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-200/80">
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="h-16 w-16" />
                  <span className="sr-only">{indT("TextEditor_Transcribing", "Transcribing")}</span>
                </div>
              </div>
            ) : null}

          <button
            type="button"
            className={micButtonClass}
            aria-label={micAriaLabel}
            title={micTooltip}
            onClick={toggleRecorder}
            disabled={micDisabled}
            aria-disabled={micDisabled ? "true" : undefined}
          >
                {isReadOnly ? (
                  <LockClosedIcon className="h-6 w-6 relative z-10" aria-hidden="true" />
                ) : (
                  <>
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                      <PulseRingsMultipleIcon size={240} padding={12} color="currentColor" strokeWidth={2} opacity={0.3} rotation={90} />
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="h-6 w-6 relative z-10" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                  </>
                )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mount the text editor into the Razor view.
export const mountTextEditor = () => {
  const rootEl = document.getElementById("ind-text-editor-root");
  if (!rootEl) return;

  const fieldId = rootEl.getAttribute("data-field-id") || "";
  const fieldLabel = rootEl.getAttribute("data-field-label") || "";
  const initialValue = rootEl.getAttribute("data-field-value") || "";
  const returnUrl = rootEl.getAttribute("data-return-url") || "";
  const readOnlyAttr = rootEl.getAttribute("data-read-only") || "";
  const initialReadOnly =
    parseBool(readOnlyAttr) || parseBool(getQueryParam("readOnly")) || parseBool(getQueryParam("readonly"));
  const allowEditAttr = rootEl.getAttribute("data-allow-edit") || "";
  const allowEditQuery = getQueryParam("allowEdit") || getQueryParam("canEdit");
  const allowEdit = parseOptionalBool(allowEditQuery, parseOptionalBool(allowEditAttr, true));
  const editModeKeyAttr = rootEl.getAttribute("data-edit-mode-key") || "";
  const editModeKey = editModeKeyAttr || getQueryParam("editModeKey") || "";

  mountReactIsland(
    rootEl,
    <IndTextEditorApp
      fieldId={fieldId}
      fieldLabel={fieldLabel}
      initialValue={initialValue}
      returnUrl={returnUrl}
      initialReadOnly={initialReadOnly}
      editModeKey={editModeKey}
      allowEdit={allowEdit}
    />
  );
};

// Auto-mount when the page bundle loads.
const mount = () => {
  mountTextEditor();
};

mountWhenDocumentReady(mount);
export default IndTextEditorApp;
