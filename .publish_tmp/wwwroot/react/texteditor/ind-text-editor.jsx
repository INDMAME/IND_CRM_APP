import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import AudioRecorderMinimal from "../audio-recorder/AudioRecorderMinimal.jsx";

const IND_I18N = globalThis.__IND_I18N__ || {};
const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;

const STORAGE_PREFIX = "ind_texteditor_";
const TOPBAR_HEIGHT = 74;
const OUTER_MARGIN = 20;
const MIN_EDITOR_HEIGHT = 240;
const RECORDER_GAP = 12;

function safeGetSessionValue(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetSessionValue(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function IndTextEditorApp({ fieldId, fieldLabel, initialValue, returnUrl }) {
  const storageKey = useMemo(() => `${STORAGE_PREFIX}${String(fieldId || "").trim()}`, [fieldId]);
  const [recorderOpen, setRecorderOpen] = useState(false);
  const [recorderResetKey, setRecorderResetKey] = useState(0);
  const [recorderHeightPx, setRecorderHeightPx] = useState(0);
  const recorderBoxRef = useRef(null);
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
    if (stored !== null) return stored;
    return String(initialValue || "");
  });

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

  const toggleRecorder = () => {
    setRecorderOpen((open) => {
      if (open) setRecorderResetKey((k) => k + 1);
      return !open;
    });
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    if (returnUrl && typeof returnUrl === "string" && returnUrl.trim()) {
      window.location.href = returnUrl;
      return;
    }
    window.history.back();
  };

  const goBackAfterSave = () => {
    // Prefer history navigation to preserve the origin page state.
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    if (returnUrl && typeof returnUrl === "string" && returnUrl.trim()) {
      window.location.href = returnUrl;
      return;
    }
    window.history.back();
  };

  const onSave = () => {
    safeSetSessionValue(storageKey, text);
    goBackAfterSave();
  };

  return (
    <div className="min-h-screen h-[100dvh] w-full flex flex-col bg-slate-200">
      <div className="topbar shadow-md">
        <button
          type="button"
          className="text-white rounded-md"
          aria-label={indT("Topbar_Back", "Back")}
          onClick={goBack}
          style={{
            width: "44px",
            height: "44px",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            padding: 0,
          }}
        >
          <ChevronLeftIcon className="h-[30px] w-[30px]" aria-hidden="true" />
        </button>

        <div className="topbar-center flex-1 flex justify-center pointer-events-none px-2">
          <span id="topbarTitle" className="truncate">
            {fieldLabel}
          </span>
        </div>

        <button
          type="button"
          className="text-white rounded-md"
          aria-label={indT("Common_Save", "Save")}
          onClick={onSave}
          style={{
            width: "44px",
            height: "44px",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            padding: 0,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[30px] h-[30px]" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </button>
      </div>

      <div className="flex-1 min-h-0 w-full px-4 pb-4 pt-3">
        <div className="w-full max-w-3xl mx-auto" style={{ marginTop: `${OUTER_MARGIN}px`, marginBottom: `${OUTER_MARGIN}px` }}>
          {recorderOpen && (
            <div ref={recorderBoxRef} className="mb-3">
              <AudioRecorderMinimal key={recorderResetKey} embedded />
            </div>
          )}

          <div className="relative rounded-2xl border border-slate-300 bg-white shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary">
            <textarea
              className="w-full resize-none bg-transparent px-5 pb-5 pt-10 pr-14 text-slate-900 focus:outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: editorHeight }}
            />

            <button
              type="button"
              className="absolute top-4 right-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={indT("TextEditor_Microphone", "Microphone")}
              onClick={toggleRecorder}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mount = () => {
  const rootEl = document.getElementById("ind-text-editor-root");
  if (!rootEl) return;

  const fieldId = rootEl.getAttribute("data-field-id") || "";
  const fieldLabel = rootEl.getAttribute("data-field-label") || "";
  const initialValue = rootEl.getAttribute("data-field-value") || "";
  const returnUrl = rootEl.getAttribute("data-return-url") || "";

  const root = createRoot(rootEl);
  root.render(
    <IndTextEditorApp
      fieldId={fieldId}
      fieldLabel={fieldLabel}
      initialValue={initialValue}
      returnUrl={returnUrl}
    />
  );
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}
