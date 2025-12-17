import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const IND_I18N = globalThis.__IND_I18N__ || {};
const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;

const STORAGE_PREFIX = "ind_texteditor_";
const TOPBAR_HEIGHT = 74;
const OUTER_MARGIN = 20;
const MIN_EDITOR_HEIGHT = 240;

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
  const computeEditorHeight = useCallback(() => {
    if (typeof window === "undefined") {
      const fallback = `calc(100vh - ${TOPBAR_HEIGHT + OUTER_MARGIN * 2}px)`;
      return fallback;
    }
    const viewport = window.innerHeight || 0;
    if (!viewport) {
      return `calc(100vh - ${TOPBAR_HEIGHT + OUTER_MARGIN * 2}px)`;
    }
    const available = Math.max(viewport - TOPBAR_HEIGHT - OUTER_MARGIN * 2, MIN_EDITOR_HEIGHT);
    return `${available}px`;
  }, []);

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
          <textarea
            className="w-full resize-none bg-white px-5 py-5 text-slate-900 rounded-2xl shadow-lg border border-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ height: editorHeight }}
          />
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
