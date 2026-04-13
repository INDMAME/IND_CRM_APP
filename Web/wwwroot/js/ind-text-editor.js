import {
  AudioRecorderMinimal
} from "./chunks/chunk-BZJHIVAU.js";
import {
  TEXT_EDITOR_PREFIX
} from "./chunks/chunk-FBLVVGLA.js";
import {
  ChevronLeftIcon_default,
  LockClosedIcon_default
} from "./chunks/chunk-WYCUWPMC.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/system/TextEditor.tsx
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/components/commons/PulseRingsMultipleIcon.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var PulseRingsMultipleIcon = ({
  size,
  color = "currentColor",
  strokeWidth = 2,
  background = "transparent",
  opacity = 0.4,
  rotation = 90,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 12,
  className
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push("scaleX(-1)");
  if (flipVertical) transforms.push("scaleY(-1)");
  const viewBoxSize = 24 + padding * 2;
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;
  const ringPath = "M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox,
      width: size,
      height: size,
      fill: "none",
      stroke: color,
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      style: {
        opacity,
        transform: transforms.join(" ") || void 0,
        filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : void 0,
        backgroundColor: background !== "transparent" ? background : void 0,
        color
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "ind-pulse-ring--base", fill: "currentColor", d: ringPath }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "ind-pulse-ring", fill: "currentColor", d: ringPath }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "ind-pulse-ring ind-pulse-ring--delay-1", fill: "currentColor", d: ringPath }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "ind-pulse-ring ind-pulse-ring--delay-2", fill: "currentColor", d: ringPath })
      ]
    }
  );
};
var PulseRingsMultipleIcon_default = PulseRingsMultipleIcon;

// Web/wwwroot/react/src/pages/system/TextEditor.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var IND_I18N = globalThis.__IND_I18N__ || {};
var indT = (key, fallback) => IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key] || fallback || key;
var STORAGE_PREFIX = TEXT_EDITOR_PREFIX;
var TOPBAR_HEIGHT = 64;
var OUTER_MARGIN = 5;
var MIN_EDITOR_HEIGHT = 240;
var RECORDER_GAP = 12;
var TYPE_INTERVAL_MS = 28;
var TYPE_TARGET_MS = 4200;
var TYPE_MIN_STEP = 1;
var TYPE_MAX_STEP = 4;
var TEXT_EDITOR_STORAGE_TTL_MS = 12 * 60 * 60 * 1e3;
var Spinner = ({ size = "h-6 w-6", label = "" }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "svg",
  {
    className: `ind-spinner ${size}`,
    viewBox: "0 0 20 20",
    role: "status",
    "aria-label": label || indT("Common_Loading", "Loading"),
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" })
  }
);
var getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : "";
};
function safeGetSessionValue(key) {
  return getSessionValueWithExpiry(key);
}
function safeSetSessionValue(key, value) {
  setSessionValueWithExpiry(key, value, TEXT_EDITOR_STORAGE_TTL_MS);
}
function safeRemoveSessionValue(key) {
  removeSessionValueWithExpiry(key);
}
function parseBool(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}
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
  const storageKey = (0, import_react.useMemo)(() => `${STORAGE_PREFIX}${String(fieldId || "").trim()}`, [fieldId]);
  const resolvedReturnUrl = (0, import_react.useMemo)(() => {
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
  const [isReadOnly, setIsReadOnly] = (0, import_react.useState)(!!initialReadOnly || !canEdit);
  const normalizedEditModeKey = (0, import_react.useMemo)(() => normalizeEditModeKey(editModeKey), [editModeKey]);
  const [recorderOpen, setRecorderOpen] = (0, import_react.useState)(false);
  const [recorderResetKey, setRecorderResetKey] = (0, import_react.useState)(0);
  const [recorderHeightPx, setRecorderHeightPx] = (0, import_react.useState)(0);
  const [isTranscribing, setIsTranscribing] = (0, import_react.useState)(false);
  const [transcribeError, setTranscribeError] = (0, import_react.useState)("");
  const [isTyping, setIsTyping] = (0, import_react.useState)(false);
  const recorderBoxRef = (0, import_react.useRef)(null);
  const typingTimerRef = (0, import_react.useRef)(null);
  const typingTextRef = (0, import_react.useRef)("");
  const typingIndexRef = (0, import_react.useRef)(0);
  const initialTextRef = (0, import_react.useRef)("");
  const textareaRef = (0, import_react.useRef)(null);
  const computeEditorHeight = (0, import_react.useCallback)(() => {
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
  const [editorHeight, setEditorHeight] = (0, import_react.useState)(() => computeEditorHeight());
  const [text, setText] = (0, import_react.useState)(() => {
    const stored = safeGetSessionValue(storageKey);
    const initialText = stored !== null ? stored : String(initialValue || "");
    initialTextRef.current = initialText;
    return initialText;
  });
  const hasActiveProcess = (0, import_react.useMemo)(
    () => !isReadOnly && (isTranscribing || isTyping || text !== (initialTextRef.current ?? "")),
    [isReadOnly, isTranscribing, isTyping, text]
  );
  const stopTyping = (0, import_react.useCallback)(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    typingTextRef.current = "";
    typingIndexRef.current = 0;
    setIsTyping(false);
  }, []);
  const startTyping = (0, import_react.useCallback)(
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
  const handleTranscribe = (0, import_react.useCallback)(
    async (wavBlob) => {
      if (!wavBlob || isTranscribing) return;
      setIsTranscribing(true);
      setTranscribeError("");
      try {
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
          ...csrfToken ? { RequestVerificationToken: csrfToken } : {}
        };
        const query = resolvedReturnUrl ? `?returnUrl=${encodeURIComponent(resolvedReturnUrl)}` : "";
        const response = await fetch(`/Visitas/TranscribeSpeech${query}`, {
          method: "POST",
          body: form,
          headers
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
        startTyping(transcript);
        setRecorderOpen(false);
        setRecorderResetKey((k) => k + 1);
      } catch (err) {
        const msg = err && err.message ? String(err.message) : indT("TextEditor_TranscribeFailed", "Transcribe failed.");
        setTranscribeError(msg);
      } finally {
        setIsTranscribing(false);
      }
    },
    [isTranscribing, startTyping]
  );
  const handleAudioCleared = (0, import_react.useCallback)(() => {
    setTranscribeError("");
  }, []);
  const handleRecordingError = (0, import_react.useCallback)((message) => {
    try {
      if (window.IND && typeof window.IND.flashActionMark === "function") {
        window.IND.flashActionMark({ type: "warningProcess", durationMs: 1500 });
      }
    } catch {
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return void 0;
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
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return void 0;
    if (!recorderOpen) {
      setRecorderHeightPx(0);
      return void 0;
    }
    const el = recorderBoxRef.current;
    if (!el) return void 0;
    const measure = () => {
      try {
        const rect = el.getBoundingClientRect();
        setRecorderHeightPx(Math.max(0, Math.floor(rect.height)));
      } catch {
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
  (0, import_react.useEffect)(() => stopTyping, [stopTyping]);
  (0, import_react.useEffect)(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);
  (0, import_react.useEffect)(() => {
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
  const enableEdit = (0, import_react.useCallback)(() => {
    if (!canEdit || !isReadOnly) return;
    setIsReadOnly(false);
    if (normalizedEditModeKey) safeSetSessionValue(normalizedEditModeKey, "true");
  }, [canEdit, isReadOnly, normalizedEditModeKey]);
  const persistDraft = () => {
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
  const onCancelEdit = (0, import_react.useCallback)(() => {
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
  const editorBoxClass = isReadOnly ? "relative rounded-[var(--radius-xl)] border border-slate-200 bg-slate-100 shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary" : "relative rounded-[var(--radius-xl)] border border-slate-300 bg-white shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary";
  const micDisabled = isReadOnly || isTranscribing || isTyping;
  const micReadOnlyHint = indT("TextEditor_Microphone_ReadOnlyHint", "Audio transcription is available only in edit mode.");
  const micBaseLabel = indT("TextEditor_Microphone", "Microphone");
  const micAriaLabel = isReadOnly ? `${micBaseLabel}. ${micReadOnlyHint}` : micBaseLabel;
  const micTooltip = isReadOnly ? micReadOnlyHint : micBaseLabel;
  const micButtonClass = `absolute top-0 right-0 z-20 inline-flex h-[70px] w-[70px] items-center justify-center overflow-visible bg-transparent p-0 m-0 border-0 rounded-none text-primary shadow-none focus:outline-hidden focus:ring-0 focus:ring-offset-0${micDisabled ? isReadOnly ? " opacity-70 cursor-not-allowed text-slate-400" : " opacity-70 cursor-not-allowed text-primary/60" : " hover:text-primary/80"}`;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "min-h-screen h-dvh w-full flex flex-col bg-slate-200", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "topbar shadow-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "topbar-btn",
          "aria-label": indT("Topbar_Back", "Back"),
          onClick: goBack,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronLeftIcon_default, { className: "h-6 w-6", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "topbar-center flex-1 flex justify-center pointer-events-none px-2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { id: "topbarTitle", className: "truncate", children: fieldLabel }) }),
      isReadOnly ? canEdit ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "button",
        {
          type: "button",
          className: "topbar-btn",
          "aria-label": indT("Common_Edit", "Edit"),
          onClick: enableEdit,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" }) })
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { "aria-hidden": "true", style: { width: "25px", height: "25px" } }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-[14px] pr-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "topbar-btn",
            "aria-label": indT("Common_Save", "Save"),
            onClick: onSave,
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "h-6 w-6", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 12.75 6 6 9-13.5" }) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: "topbar-btn",
            "aria-label": indT("Common_Cancel", "Cancel"),
            onClick: onCancelEdit,
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "h-6 w-6", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18 18 6M6 6l12 12" }) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex-1 min-h-0 w-full px-4 pb-4 pt-3", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "w-full max-w-3xl mx-auto", style: { marginTop: `${OUTER_MARGIN}px`, marginBottom: `${OUTER_MARGIN}px` }, children: [
      recorderOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: recorderBoxRef, className: "mb-3 w-full", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        AudioRecorderMinimal,
        {
          embedded: true,
          onTranscribe: handleTranscribe,
          hideTranscribeButton: true,
          autoTranscribeOnStop: true,
          transcribeBusy: isTranscribing,
          transcribeLabel: indT("TextEditor_Transcribe", "Transcribe"),
          transcribeBusyLabel: indT("TextEditor_Transcribing", "Transcribing"),
          onAudioCleared: handleAudioCleared,
          onRecordingError: handleRecordingError
        },
        recorderResetKey
      ) }),
      transcribeError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mb-3 text-xs text-rose-700 text-center", children: transcribeError }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: editorBoxClass, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "textarea",
          {
            ref: textareaRef,
            className: `w-full resize-none bg-transparent px-5 pb-5 pt-10 pr-14 focus:outline-hidden ${isReadOnly ? "ind-readonly-field" : "text-slate-900"}`,
            value: text,
            onChange: (e) => setText(e.target.value),
            disabled: isTranscribing || isTyping,
            readOnly: isReadOnly || isTranscribing || isTyping,
            "aria-readonly": isReadOnly ? "true" : void 0,
            "aria-busy": isTranscribing || isTyping,
            style: { height: editorHeight }
          }
        ),
        isTranscribing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute inset-0 z-20 flex items-center justify-center bg-slate-200/80", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner, { size: "h-16 w-16" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "sr-only", children: indT("TextEditor_Transcribing", "Transcribing") })
        ] }) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: micButtonClass,
            "aria-label": micAriaLabel,
            title: micTooltip,
            onClick: toggleRecorder,
            disabled: micDisabled,
            "aria-disabled": micDisabled ? "true" : void 0,
            children: isReadOnly ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LockClosedIcon_default, { className: "h-6 w-6 relative z-10", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PulseRingsMultipleIcon_default, { size: 240, padding: 12, color: "currentColor", strokeWidth: 2, opacity: 0.3, rotation: 90 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1, stroke: "currentColor", className: "h-6 w-6 relative z-10", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" }) })
            ] })
          }
        )
      ] })
    ] }) })
  ] });
}
var mountTextEditor = () => {
  const rootEl = document.getElementById("ind-text-editor-root");
  if (!rootEl) return;
  const fieldId = rootEl.getAttribute("data-field-id") || "";
  const fieldLabel = rootEl.getAttribute("data-field-label") || "";
  const initialValue = rootEl.getAttribute("data-field-value") || "";
  const returnUrl = rootEl.getAttribute("data-return-url") || "";
  const readOnlyAttr = rootEl.getAttribute("data-read-only") || "";
  const initialReadOnly = parseBool(readOnlyAttr) || parseBool(getQueryParam("readOnly")) || parseBool(getQueryParam("readonly"));
  const allowEditAttr = rootEl.getAttribute("data-allow-edit") || "";
  const allowEditQuery = getQueryParam("allowEdit") || getQueryParam("canEdit");
  const allowEdit = parseOptionalBool(allowEditQuery, parseOptionalBool(allowEditAttr, true));
  const editModeKeyAttr = rootEl.getAttribute("data-edit-mode-key") || "";
  const editModeKey = editModeKeyAttr || getQueryParam("editModeKey") || "";
  mountReactIsland(
    rootEl,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      IndTextEditorApp,
      {
        fieldId,
        fieldLabel,
        initialValue,
        returnUrl,
        initialReadOnly,
        editModeKey,
        allowEdit
      }
    )
  );
};
var mount = () => {
  mountTextEditor();
};
mountWhenDocumentReady(mount);
var TextEditor_default = IndTextEditorApp;
export {
  TextEditor_default as default,
  mountTextEditor
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9UZXh0RWRpdG9yLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1B1bHNlUmluZ3NNdWx0aXBsZUljb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uTGVmdEljb24sIExvY2tDbG9zZWRJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZVwiO1xyXG5pbXBvcnQgQXVkaW9SZWNvcmRlck1pbmltYWwgZnJvbSBcIi4vQXVkaW9SZWNvcmRlck1pbmltYWwudHN4XCI7XHJcbmltcG9ydCBQdWxzZVJpbmdzTXVsdGlwbGVJY29uIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUHVsc2VSaW5nc011bHRpcGxlSWNvbi50c3hcIjtcclxuaW1wb3J0IHsgVEVYVF9FRElUT1JfUFJFRklYIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3RleHRFZGl0b3IudHNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcblxyXG5jb25zdCBJTkRfSTE4TiA9IGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fIHx8IHt9O1xyXG5jb25zdCBpbmRUID0gKGtleSwgZmFsbGJhY2spID0+IChJTkRfSTE4TiAmJiB0eXBlb2YgSU5EX0kxOE5ba2V5XSA9PT0gXCJzdHJpbmdcIiAmJiBJTkRfSTE4TltrZXldKSB8fCBmYWxsYmFjayB8fCBrZXk7XHJcblxyXG5jb25zdCBTVE9SQUdFX1BSRUZJWCA9IFRFWFRfRURJVE9SX1BSRUZJWDtcclxuY29uc3QgVE9QQkFSX0hFSUdIVCA9IDY0O1xyXG5jb25zdCBPVVRFUl9NQVJHSU4gPSA1O1xyXG5jb25zdCBNSU5fRURJVE9SX0hFSUdIVCA9IDI0MDtcclxuY29uc3QgUkVDT1JERVJfR0FQID0gMTI7XHJcbmNvbnN0IFRZUEVfSU5URVJWQUxfTVMgPSAyODtcclxuY29uc3QgVFlQRV9UQVJHRVRfTVMgPSA0MjAwO1xyXG5jb25zdCBUWVBFX01JTl9TVEVQID0gMTtcclxuY29uc3QgVFlQRV9NQVhfU1RFUCA9IDQ7XHJcbmNvbnN0IFRFWFRfRURJVE9SX1NUT1JBR0VfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbi8vIFNoYXJlZCBzcGlubmVyIGZvciBsb2NhbCBsb2FkaW5nIHN0YXRlcy5cclxudHlwZSBTcGlubmVyUHJvcHMgPSB7XHJcbiAgc2l6ZT86IHN0cmluZztcclxuICBsYWJlbD86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IFNwaW5uZXIgPSAoeyBzaXplID0gXCJoLTYgdy02XCIsIGxhYmVsID0gXCJcIiB9OiBTcGlubmVyUHJvcHMpID0+IChcclxuICA8c3ZnXHJcbiAgICBjbGFzc05hbWU9e2BpbmQtc3Bpbm5lciAke3NpemV9YH1cclxuICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxyXG4gICAgcm9sZT1cInN0YXR1c1wiXHJcbiAgICBhcmlhLWxhYmVsPXtsYWJlbCB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gID5cclxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgZ2V0Q3NyZlRva2VuID0gKCkgPT4ge1xyXG4gIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XHJcbiAgcmV0dXJuIG1ldGEgPyBtZXRhLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIikgOiBcIlwiO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2FmZUdldFNlc3Npb25WYWx1ZShrZXkpIHtcclxuICByZXR1cm4gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYWZlU2V0U2Vzc2lvblZhbHVlKGtleSwgdmFsdWUpIHtcclxuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgdmFsdWUsIFRFWFRfRURJVE9SX1NUT1JBR0VfVFRMX01TKTtcclxufVxyXG5cclxuLy8gUmVtb3ZlIGEgc2Vzc2lvbiB2YWx1ZSB3aXRob3V0IHRocm93aW5nIGZvciBibG9ja2VkIHN0b3JhZ2UuXHJcbmZ1bmN0aW9uIHNhZmVSZW1vdmVTZXNzaW9uVmFsdWUoa2V5KSB7XHJcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUJvb2wodmFsdWUpIHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBub3JtYWxpemVkID09PSBcIjFcIiB8fCBub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcInllc1wiO1xyXG59XHJcblxyXG4vLyBQYXJzZXMgb3B0aW9uYWwgYm9vbGVhbiB2YWx1ZXMgd2l0aCBhIGRlZmF1bHQgZmFsbGJhY2suXHJcbmZ1bmN0aW9uIHBhcnNlT3B0aW9uYWxCb29sKHZhbHVlLCBmYWxsYmFjaykge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbGxiYWNrO1xyXG4gIHJldHVybiBwYXJzZUJvb2wobm9ybWFsaXplZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFF1ZXJ5UGFyYW0oa2V5KSB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcIlwiO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IFwiXCIpLmdldChrZXkpIHx8IFwiXCI7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVkaXRNb2RlS2V5KHZhbHVlKSB7XHJcbiAgY29uc3Qga2V5ID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIWtleSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIGtleS5zdGFydHNXaXRoKFwiaW5kX3Zpc2l0X2VkaXRfXCIpID8ga2V5IDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gSW5kVGV4dEVkaXRvckFwcCh7IGZpZWxkSWQsIGZpZWxkTGFiZWwsIGluaXRpYWxWYWx1ZSwgcmV0dXJuVXJsLCBpbml0aWFsUmVhZE9ubHkgPSBmYWxzZSwgZWRpdE1vZGVLZXkgPSBcIlwiLCBhbGxvd0VkaXQgPSB0cnVlIH0pIHtcclxuICBjb25zdCBzdG9yYWdlS2V5ID0gdXNlTWVtbygoKSA9PiBgJHtTVE9SQUdFX1BSRUZJWH0ke1N0cmluZyhmaWVsZElkIHx8IFwiXCIpLnRyaW0oKX1gLCBbZmllbGRJZF0pO1xyXG4gIC8vIFJlc29sdmUgcmV0dXJuIFVSTCBmcm9tIHByb3BzIG9yIHNlc3Npb25TdG9yYWdlLlxyXG4gIGNvbnN0IHJlc29sdmVkUmV0dXJuVXJsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBkaXJlY3QgPSB0eXBlb2YgcmV0dXJuVXJsID09PSBcInN0cmluZ1wiID8gcmV0dXJuVXJsLnRyaW0oKSA6IFwiXCI7XHJcbiAgICBpZiAoZGlyZWN0KSByZXR1cm4gZGlyZWN0O1xyXG4gICAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKCFzYWZlSWQpIHJldHVybiBcIlwiO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3RvcmVkID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShgJHtTVE9SQUdFX1BSRUZJWH0ke3NhZmVJZH1fcmV0dXJuVXJsYCk7XHJcbiAgICAgIHJldHVybiBzdG9yZWQgPyBTdHJpbmcoc3RvcmVkKS50cmltKCkgOiBcIlwiO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gIH0sIFtmaWVsZElkLCByZXR1cm5VcmxdKTtcclxuICBjb25zdCBjYW5FZGl0ID0gISFhbGxvd0VkaXQ7XHJcbiAgY29uc3QgW2lzUmVhZE9ubHksIHNldElzUmVhZE9ubHldID0gdXNlU3RhdGUoISFpbml0aWFsUmVhZE9ubHkgfHwgIWNhbkVkaXQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRFZGl0TW9kZUtleSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplRWRpdE1vZGVLZXkoZWRpdE1vZGVLZXkpLCBbZWRpdE1vZGVLZXldKTtcclxuICBjb25zdCBbcmVjb3JkZXJPcGVuLCBzZXRSZWNvcmRlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtyZWNvcmRlclJlc2V0S2V5LCBzZXRSZWNvcmRlclJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtyZWNvcmRlckhlaWdodFB4LCBzZXRSZWNvcmRlckhlaWdodFB4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtpc1RyYW5zY3JpYmluZywgc2V0SXNUcmFuc2NyaWJpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFt0cmFuc2NyaWJlRXJyb3IsIHNldFRyYW5zY3JpYmVFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNUeXBpbmcsIHNldElzVHlwaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCByZWNvcmRlckJveFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB0eXBpbmdUaW1lclJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB0eXBpbmdUZXh0UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IHR5cGluZ0luZGV4UmVmID0gdXNlUmVmKDApO1xyXG4gIGNvbnN0IGluaXRpYWxUZXh0UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IHRleHRhcmVhUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGNvbXB1dGVFZGl0b3JIZWlnaHQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGBjYWxjKDEwMHZoIC0gJHtUT1BCQVJfSEVJR0hUICsgT1VURVJfTUFSR0lOICogMn1weClgO1xyXG4gICAgICByZXR1cm4gZmFsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2aWV3cG9ydCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCAwO1xyXG4gICAgaWYgKCF2aWV3cG9ydCkge1xyXG4gICAgICByZXR1cm4gYGNhbGMoMTAwdmggLSAke1RPUEJBUl9IRUlHSFQgKyBPVVRFUl9NQVJHSU4gKiAyfXB4KWA7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWNvcmRlclNwYWNlID0gcmVjb3JkZXJPcGVuID8gcmVjb3JkZXJIZWlnaHRQeCArIFJFQ09SREVSX0dBUCA6IDA7XHJcbiAgICBjb25zdCBhdmFpbGFibGUgPSBNYXRoLm1heCh2aWV3cG9ydCAtIFRPUEJBUl9IRUlHSFQgLSBPVVRFUl9NQVJHSU4gKiAyIC0gcmVjb3JkZXJTcGFjZSwgTUlOX0VESVRPUl9IRUlHSFQpO1xyXG4gICAgcmV0dXJuIGAke2F2YWlsYWJsZX1weGA7XHJcbiAgfSwgW3JlY29yZGVyT3BlbiwgcmVjb3JkZXJIZWlnaHRQeF0pO1xyXG5cclxuICBjb25zdCBbZWRpdG9ySGVpZ2h0LCBzZXRFZGl0b3JIZWlnaHRdID0gdXNlU3RhdGUoKCkgPT4gY29tcHV0ZUVkaXRvckhlaWdodCgpKTtcclxuXHJcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gdXNlU3RhdGUoKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmVkID0gc2FmZUdldFNlc3Npb25WYWx1ZShzdG9yYWdlS2V5KTtcclxuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gc3RvcmVkICE9PSBudWxsID8gc3RvcmVkIDogU3RyaW5nKGluaXRpYWxWYWx1ZSB8fCBcIlwiKTtcclxuICAgIGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPSBpbml0aWFsVGV4dDtcclxuICAgIHJldHVybiBpbml0aWFsVGV4dDtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAhaXNSZWFkT25seSAmJiAoaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmcgfHwgdGV4dCAhPT0gKGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPz8gXCJcIikpLFxyXG4gICAgW2lzUmVhZE9ubHksIGlzVHJhbnNjcmliaW5nLCBpc1R5cGluZywgdGV4dF1cclxuICApO1xyXG5cclxuICBjb25zdCBzdG9wVHlwaW5nID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICB0eXBpbmdUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHR5cGluZ1RleHRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICB0eXBpbmdJbmRleFJlZi5jdXJyZW50ID0gMDtcclxuICAgIHNldElzVHlwaW5nKGZhbHNlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHN0YXJ0VHlwaW5nID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZnVsbFRleHQpID0+IHtcclxuICAgICAgY29uc3QgdGV4dFZhbHVlID0gU3RyaW5nKGZ1bGxUZXh0IHx8IFwiXCIpO1xyXG4gICAgICBzdG9wVHlwaW5nKCk7XHJcbiAgICAgIGlmICghdGV4dFZhbHVlKSB7XHJcbiAgICAgICAgc2V0VGV4dChcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHR5cGluZ1RleHRSZWYuY3VycmVudCA9IHRleHRWYWx1ZTtcclxuICAgICAgdHlwaW5nSW5kZXhSZWYuY3VycmVudCA9IDA7XHJcbiAgICAgIHNldElzVHlwaW5nKHRydWUpO1xyXG4gICAgICBzZXRUZXh0KFwiXCIpO1xyXG5cclxuICAgICAgY29uc3QgdG90YWwgPSB0ZXh0VmFsdWUubGVuZ3RoO1xyXG4gICAgICBjb25zdCBtYXhTdGVwcyA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoVFlQRV9UQVJHRVRfTVMgLyBUWVBFX0lOVEVSVkFMX01TKSk7XHJcbiAgICAgIGNvbnN0IHN0ZXBTaXplID0gTWF0aC5taW4oVFlQRV9NQVhfU1RFUCwgTWF0aC5tYXgoVFlQRV9NSU5fU1RFUCwgTWF0aC5jZWlsKHRvdGFsIC8gbWF4U3RlcHMpKSk7XHJcblxyXG4gICAgICBjb25zdCB0aWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBNYXRoLm1pbih0eXBpbmdJbmRleFJlZi5jdXJyZW50ICsgc3RlcFNpemUsIHRvdGFsKTtcclxuICAgICAgICB0eXBpbmdJbmRleFJlZi5jdXJyZW50ID0gbmV4dDtcclxuICAgICAgICBzZXRUZXh0KHR5cGluZ1RleHRSZWYuY3VycmVudC5zbGljZSgwLCBuZXh0KSk7XHJcbiAgICAgICAgaWYgKG5leHQgPCB0b3RhbCkge1xyXG4gICAgICAgICAgdHlwaW5nVGltZXJSZWYuY3VycmVudCA9IHNldFRpbWVvdXQodGljaywgVFlQRV9JTlRFUlZBTF9NUyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgc2V0SXNUeXBpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KHRpY2ssIFRZUEVfSU5URVJWQUxfTVMpO1xyXG4gICAgfSxcclxuICAgIFtzdG9wVHlwaW5nXVxyXG4gICk7XHJcblxyXG4gIC8vIFNlbmQgdGhlIFdBViB0byBNVkMgYW5kIHJlcGxhY2UgdGV4dGFyZWEgd2l0aCB0aGUgdHJhbnNjcmlwdGlvbi5cclxuICBjb25zdCBoYW5kbGVUcmFuc2NyaWJlID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAod2F2QmxvYikgPT4ge1xyXG4gICAgICBpZiAoIXdhdkJsb2IgfHwgaXNUcmFuc2NyaWJpbmcpIHJldHVybjtcclxuXHJcbiAgICAgIC8vIExvY2sgdGhlIGVkaXRvciB3aGlsZSB0aGUgdHJhbnNjcmlwdGlvbiByZXF1ZXN0IGlzIGluIGZsaWdodC5cclxuICAgICAgc2V0SXNUcmFuc2NyaWJpbmcodHJ1ZSk7XHJcbiAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gQnVpbGQgbXVsdGlwYXJ0IGZvcm0gcGF5bG9hZCBleHBlY3RlZCBieSAvVmlzaXRhcy9UcmFuc2NyaWJlU3BlZWNoLlxyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmb3JtLmFwcGVuZChcImxhbmd1YWdlSWRcIiwgXCJhdXRvXCIpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwiYXVkaW9GaWxlXCIsIHdhdkJsb2IsIFwiYXVkaW8ud2F2XCIpO1xyXG4gICAgICAgIGlmIChyZXNvbHZlZFJldHVyblVybCkge1xyXG4gICAgICAgICAgZm9ybS5hcHBlbmQoXCJyZXR1cm5VcmxcIiwgcmVzb2x2ZWRSZXR1cm5VcmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHtcclxuICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxyXG4gICAgICAgICAgLi4uKGNzcmZUb2tlbiA/IHsgUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuOiBjc3JmVG9rZW4gfSA6IHt9KSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZW5kIHRoZSBXQVYgdG8gTVZDIChzZXJ2ZXIgd2lsbCBjYWxsIHRoZSBzcGVlY2ggQVBJKS5cclxuICAgICAgICBjb25zdCBxdWVyeSA9IHJlc29sdmVkUmV0dXJuVXJsID8gYD9yZXR1cm5Vcmw9JHtlbmNvZGVVUklDb21wb25lbnQocmVzb2x2ZWRSZXR1cm5VcmwpfWAgOiBcIlwiO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9WaXNpdGFzL1RyYW5zY3JpYmVTcGVlY2gke3F1ZXJ5fWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICBib2R5OiBmb3JtLFxyXG4gICAgICAgICAgaGVhZGVycyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiBudWxsKTtcclxuICAgICAgICBjb25zdCBvayA9IHJlc3BvbnNlLm9rICYmIHBheWxvYWQgJiYgcGF5bG9hZC5zdWNjZXNzID09PSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgICBjb25zdCBtc2cgPSBwYXlsb2FkICYmIHBheWxvYWQubWVzc2FnZSA/IFN0cmluZyhwYXlsb2FkLm1lc3NhZ2UpIDogaW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZUZhaWxlZFwiLCBcIlRyYW5zY3JpYmUgZmFpbGVkLlwiKTtcclxuICAgICAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihtc2cpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdHJhbnNjcmlwdCA9IHBheWxvYWQgJiYgdHlwZW9mIHBheWxvYWQuZGF0YSA9PT0gXCJzdHJpbmdcIiA/IHBheWxvYWQuZGF0YSA6IFwiXCI7XHJcbiAgICAgICAgaWYgKCF0cmFuc2NyaXB0LnRyaW0oKSkge1xyXG4gICAgICAgICAgc2V0VHJhbnNjcmliZUVycm9yKGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVGYWlsZWRcIiwgXCJUcmFuc2NyaWJlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVwbGFjZSB0aGUgZnVsbCB0ZXh0YXJlYSBjb250ZW50IHdpdGggdGhlIG5ldyB0cmFuc2NyaXB0aW9uLlxyXG4gICAgICAgIHN0YXJ0VHlwaW5nKHRyYW5zY3JpcHQpO1xyXG4gICAgICAgIC8vIEhpZGUgdGhlIHJlY29yZGVyIGFmdGVyIGEgc3VjY2Vzc2Z1bCB0cmFuc2NyaXB0aW9uLlxyXG4gICAgICAgIHNldFJlY29yZGVyT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0UmVjb3JkZXJSZXNldEtleSgoaykgPT4gayArIDEpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zdCBtc2cgPSBlcnIgJiYgZXJyLm1lc3NhZ2UgPyBTdHJpbmcoZXJyLm1lc3NhZ2UpIDogaW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZUZhaWxlZFwiLCBcIlRyYW5zY3JpYmUgZmFpbGVkLlwiKTtcclxuICAgICAgICBzZXRUcmFuc2NyaWJlRXJyb3IobXNnKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAvLyBSZS1lbmFibGUgdGhlIGVkaXRvciBhZnRlciBjb21wbGV0aW9uLlxyXG4gICAgICAgIHNldElzVHJhbnNjcmliaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtpc1RyYW5zY3JpYmluZywgc3RhcnRUeXBpbmddXHJcbiAgKTtcclxuXHJcbiAgLy8gQ2xlYXIgdHJhbnNjcmlwdGlvbiBlcnJvcnMgd2hlbiBhdWRpbyBjaGFuZ2VzLlxyXG4gIGNvbnN0IGhhbmRsZUF1ZGlvQ2xlYXJlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVJlY29yZGluZ0Vycm9yID0gdXNlQ2FsbGJhY2soKG1lc3NhZ2UpID0+IHtcclxuICAgIC8vIFNob3cgYSB3YXJuaW5nIGFjdGlvbiBtYXJrOyBrZWVwIHRoZSByZWNvcmRlciBvcGVuIHRvIGRpc3BsYXkgdGhlIGVycm9yIGxhYmVsLlxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHdpbmRvdy5JTkQgJiYgdHlwZW9mIHdpbmRvdy5JTkQuZmxhc2hBY3Rpb25NYXJrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuSU5ELmZsYXNoQWN0aW9uTWFyayh7IHR5cGU6IFwid2FybmluZ1Byb2Nlc3NcIiwgZHVyYXRpb25NczogMTUwMCB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIGlnbm9yZVxyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgdXBkYXRlSGVpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICBzZXRFZGl0b3JIZWlnaHQoY29tcHV0ZUVkaXRvckhlaWdodCgpKTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlSGVpZ2h0KCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlSGVpZ2h0KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgfTtcclxuICB9LCBbY29tcHV0ZUVkaXRvckhlaWdodF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoIXJlY29yZGVyT3Blbikge1xyXG4gICAgICBzZXRSZWNvcmRlckhlaWdodFB4KDApO1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVsID0gcmVjb3JkZXJCb3hSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3QgbWVhc3VyZSA9ICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgc2V0UmVjb3JkZXJIZWlnaHRQeChNYXRoLm1heCgwLCBNYXRoLmZsb29yKHJlY3QuaGVpZ2h0KSkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBtZWFzdXJlKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBjb25zdCBybyA9IG5ldyBSZXNpemVPYnNlcnZlcihtZWFzdXJlKTtcclxuICAgICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICAgIHJldHVybiAoKSA9PiByby5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWVhc3VyZSk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWVhc3VyZSk7XHJcbiAgfSwgW3JlY29yZGVyT3Blbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4gc3RvcFR5cGluZywgW3N0b3BUeXBpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1R5cGluZykgcmV0dXJuO1xyXG4gICAgY29uc3QgZWwgPSB0ZXh0YXJlYVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgZWwuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsSGVpZ2h0O1xyXG4gIH0sIFtpc1R5cGluZywgdGV4dF0pO1xyXG5cclxuICBjb25zdCB0b2dnbGVSZWNvcmRlciA9ICgpID0+IHtcclxuICAgIGlmIChpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nKSByZXR1cm47XHJcbiAgICBzZXRUcmFuc2NyaWJlRXJyb3IoXCJcIik7XHJcbiAgICBzZXRSZWNvcmRlck9wZW4oKG9wZW4pID0+IHtcclxuICAgICAgaWYgKG9wZW4pIHNldFJlY29yZGVyUmVzZXRLZXkoKGspID0+IGsgKyAxKTtcclxuICAgICAgcmV0dXJuICFvcGVuO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWxsb3dIaXN0b3J5TmF2ID0gKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kQWxsb3dIaXN0b3J5T25jZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHdpbmRvdy5fX2luZEFsbG93SGlzdG9yeU9uY2UoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuRWRpdCB8fCAhaXNSZWFkT25seSkgcmV0dXJuO1xyXG4gICAgc2V0SXNSZWFkT25seShmYWxzZSk7XHJcbiAgICBpZiAobm9ybWFsaXplZEVkaXRNb2RlS2V5KSBzYWZlU2V0U2Vzc2lvblZhbHVlKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSwgXCJ0cnVlXCIpO1xyXG4gIH0sIFtjYW5FZGl0LCBpc1JlYWRPbmx5LCBub3JtYWxpemVkRWRpdE1vZGVLZXldKTtcclxuXHJcbiAgY29uc3QgcGVyc2lzdERyYWZ0ID0gKCkgPT4ge1xyXG4gICAgLy8gUGVyc2lzdCB0aGUgZHJhZnQgc28gdGhlIHByZXZpb3VzIHBhZ2UgY2FuIHJlc3RvcmUgaXQuXHJcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIHRleHQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdvQmFjayA9ICgpID0+IHtcclxuICAgIHBlcnNpc3REcmFmdCgpO1xyXG4gICAgaWYgKHJlc29sdmVkUmV0dXJuVXJsKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzb2x2ZWRSZXR1cm5Vcmw7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxICYmIGFsbG93SGlzdG9yeU5hdigpKSByZXR1cm47XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ29CYWNrQWZ0ZXJTYXZlID0gKCkgPT4ge1xyXG4gICAgLy8gUHJlZmVyIHJldHVyblVybCBmb3IgZGV0ZXJtaW5pc3RpYyBuYXZpZ2F0aW9uIGFjcm9zcyBicm93c2Vycy5cclxuICAgIGlmIChyZXNvbHZlZFJldHVyblVybCkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc29sdmVkUmV0dXJuVXJsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMSAmJiBhbGxvd0hpc3RvcnlOYXYoKSkgcmV0dXJuO1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uU2F2ZSA9ICgpID0+IHtcclxuICAgIGlmIChpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nKSByZXR1cm47XHJcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIHRleHQpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSkge1xyXG4gICAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSwgXCJ0cnVlXCIpO1xyXG4gICAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKGAke25vcm1hbGl6ZWRFZGl0TW9kZUtleX1fcmV0dXJuYCwgXCIxXCIpO1xyXG4gICAgfVxyXG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICBnb0JhY2tBZnRlclNhdmUoKTtcclxuICB9O1xyXG5cclxuICAvLyBSZXN0b3JlIHRoZSBpbml0aWFsIHRleHQgdmFsdWUgZm9yIHRoaXMgc2Vzc2lvbiB3aXRob3V0IHNhdmluZy5cclxuICBjb25zdCBvbkNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNSZWFkT25seSB8fCBpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZykgcmV0dXJuO1xyXG4gICAgc3RvcFR5cGluZygpO1xyXG4gICAgc2V0VHJhbnNjcmliZUVycm9yKFwiXCIpO1xyXG4gICAgY29uc3QgaW5pdGlhbFRleHQgPSBpbml0aWFsVGV4dFJlZi5jdXJyZW50ID8/IFwiXCI7XHJcbiAgICBzZXRUZXh0KGluaXRpYWxUZXh0KTtcclxuICAgIHNhZmVTZXRTZXNzaW9uVmFsdWUoc3RvcmFnZUtleSwgaW5pdGlhbFRleHQpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSkge1xyXG4gICAgICBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKGAke25vcm1hbGl6ZWRFZGl0TW9kZUtleX1fcmV0dXJuYCk7XHJcbiAgICAgIHNhZmVSZW1vdmVTZXNzaW9uVmFsdWUobm9ybWFsaXplZEVkaXRNb2RlS2V5KTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgZ29CYWNrQWZ0ZXJTYXZlKCk7XHJcbiAgfSwgW2lzUmVhZE9ubHksIGlzVHJhbnNjcmliaW5nLCBpc1R5cGluZywgc3RvcFR5cGluZywgc3RvcmFnZUtleSwgZ29CYWNrQWZ0ZXJTYXZlLCBub3JtYWxpemVkRWRpdE1vZGVLZXldKTtcclxuXHJcbiAgY29uc3QgZWRpdG9yQm94Q2xhc3MgPSBpc1JlYWRPbmx5XHJcbiAgICA/IFwicmVsYXRpdmUgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHNoYWRvdy1sZyBvdmVyZmxvdy1oaWRkZW4gZm9jdXMtd2l0aGluOnJpbmctNCBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5LzQwIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeVwiXG4gICAgOiBcInJlbGF0aXZlIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHNoYWRvdy1sZyBvdmVyZmxvdy1oaWRkZW4gZm9jdXMtd2l0aGluOnJpbmctNCBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5LzQwIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeVwiO1xuICBjb25zdCBtaWNEaXNhYmxlZCA9IGlzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmc7XHJcbiAgY29uc3QgbWljUmVhZE9ubHlIaW50ID0gaW5kVChcIlRleHRFZGl0b3JfTWljcm9waG9uZV9SZWFkT25seUhpbnRcIiwgXCJBdWRpbyB0cmFuc2NyaXB0aW9uIGlzIGF2YWlsYWJsZSBvbmx5IGluIGVkaXQgbW9kZS5cIik7XHJcbiAgY29uc3QgbWljQmFzZUxhYmVsID0gaW5kVChcIlRleHRFZGl0b3JfTWljcm9waG9uZVwiLCBcIk1pY3JvcGhvbmVcIik7XHJcbiAgY29uc3QgbWljQXJpYUxhYmVsID0gaXNSZWFkT25seSA/IGAke21pY0Jhc2VMYWJlbH0uICR7bWljUmVhZE9ubHlIaW50fWAgOiBtaWNCYXNlTGFiZWw7XHJcbiAgY29uc3QgbWljVG9vbHRpcCA9IGlzUmVhZE9ubHkgPyBtaWNSZWFkT25seUhpbnQgOiBtaWNCYXNlTGFiZWw7XHJcbiAgY29uc3QgbWljQnV0dG9uQ2xhc3MgPSBgYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCB6LTIwIGlubGluZS1mbGV4IGgtWzcwcHhdIHctWzcwcHhdIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyZmxvdy12aXNpYmxlIGJnLXRyYW5zcGFyZW50IHAtMCBtLTAgYm9yZGVyLTAgcm91bmRlZC1ub25lIHRleHQtcHJpbWFyeSBzaGFkb3ctbm9uZSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTAgZm9jdXM6cmluZy1vZmZzZXQtMCR7XHJcbiAgICBtaWNEaXNhYmxlZFxyXG4gICAgICA/IGlzUmVhZE9ubHlcclxuICAgICAgICA/IFwiIG9wYWNpdHktNzAgY3Vyc29yLW5vdC1hbGxvd2VkIHRleHQtc2xhdGUtNDAwXCJcclxuICAgICAgICA6IFwiIG9wYWNpdHktNzAgY3Vyc29yLW5vdC1hbGxvd2VkIHRleHQtcHJpbWFyeS82MFwiXHJcbiAgICAgIDogXCIgaG92ZXI6dGV4dC1wcmltYXJ5LzgwXCJcclxuICB9YDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGgtZHZoIHctZnVsbCBmbGV4IGZsZXgtY29sIGJnLXNsYXRlLTIwMFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcGJhciBzaGFkb3ctbWRcIj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cInRvcGJhci1idG5cIlxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIlRvcGJhcl9CYWNrXCIsIFwiQmFja1wiKX1cclxuICAgICAgICAgIG9uQ2xpY2s9e2dvQmFja31cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcGJhci1jZW50ZXIgZmxleC0xIGZsZXgganVzdGlmeS1jZW50ZXIgcG9pbnRlci1ldmVudHMtbm9uZSBweC0yXCI+XHJcbiAgICAgICAgICA8c3BhbiBpZD1cInRvcGJhclRpdGxlXCIgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cclxuICAgICAgICAgICAge2ZpZWxkTGFiZWx9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtpc1JlYWRPbmx5ID8gKFxyXG4gICAgICAgICAgY2FuRWRpdCA/IChcclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRvcGJhci1idG5cIlxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fRWRpdFwiLCBcIkVkaXRcIil9XHJcbiAgICAgICAgICAgICAgb25DbGljaz17ZW5hYmxlRWRpdH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTYuODYyIDQuNDg3IDEuNjg3LTEuNjg4YTEuODc1IDEuODc1IDAgMSAxIDIuNjUyIDIuNjUyTDYuODMyIDE5LjgyYTQuNSA0LjUgMCAwIDEtMS44OTcgMS4xM2wtMi42ODUuOC44LTIuNjg1YTQuNSA0LjUgMCAwIDEgMS4xMy0xLjg5N0wxNi44NjMgNC40ODdabTAgMEwxOS41IDcuMTI1XCIgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8ZGl2IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHN0eWxlPXt7IHdpZHRoOiBcIjI1cHhcIiwgaGVpZ2h0OiBcIjI1cHhcIiB9fSAvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC1bMTRweF0gcHItMVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wYmFyLWJ0blwiXHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKX1cclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblNhdmV9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTQuNSAxMi43NSA2IDYgOS0xMy41XCIgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNhbmNlbEVkaXR9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTYgMTggMTggNk02IDZsMTIgMTJcIiAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLWgtMCB3LWZ1bGwgcHgtNCBwYi00IHB0LTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy0zeGwgbXgtYXV0b1wiIHN0eWxlPXt7IG1hcmdpblRvcDogYCR7T1VURVJfTUFSR0lOfXB4YCwgbWFyZ2luQm90dG9tOiBgJHtPVVRFUl9NQVJHSU59cHhgIH19PlxyXG4gICAgICAgICAge3JlY29yZGVyT3BlbiAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgcmVmPXtyZWNvcmRlckJveFJlZn0gY2xhc3NOYW1lPVwibWItMyB3LWZ1bGxcIj5cclxuICAgICAgICAgICAgICA8QXVkaW9SZWNvcmRlck1pbmltYWxcbiAgICAgICAgICAgICAgICBrZXk9e3JlY29yZGVyUmVzZXRLZXl9XG4gICAgICAgICAgICAgICAgZW1iZWRkZWRcbiAgICAgICAgICAgICAgICBvblRyYW5zY3JpYmU9e2hhbmRsZVRyYW5zY3JpYmV9XG4gICAgICAgICAgICAgICAgaGlkZVRyYW5zY3JpYmVCdXR0b25cbiAgICAgICAgICAgICAgICBhdXRvVHJhbnNjcmliZU9uU3RvcFxuICAgICAgICAgICAgICAgIHRyYW5zY3JpYmVCdXN5PXtpc1RyYW5zY3JpYmluZ31cbiAgICAgICAgICAgICAgICB0cmFuc2NyaWJlTGFiZWw9e2luZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVcIiwgXCJUcmFuc2NyaWJlXCIpfVxuICAgICAgICAgICAgICAgIHRyYW5zY3JpYmVCdXN5TGFiZWw9e2luZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmluZ1wiLCBcIlRyYW5zY3JpYmluZ1wiKX1cbiAgICAgICAgICAgICAgICBvbkF1ZGlvQ2xlYXJlZD17aGFuZGxlQXVkaW9DbGVhcmVkfVxuICAgICAgICAgICAgICAgIG9uUmVjb3JkaW5nRXJyb3I9e2hhbmRsZVJlY29yZGluZ0Vycm9yfVxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAge3RyYW5zY3JpYmVFcnJvciA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi0zIHRleHQteHMgdGV4dC1yb3NlLTcwMCB0ZXh0LWNlbnRlclwiPnt0cmFuc2NyaWJlRXJyb3J9PC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17ZWRpdG9yQm94Q2xhc3N9PlxyXG4gICAgICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgICAgICByZWY9e3RleHRhcmVhUmVmfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCByZXNpemUtbm9uZSBiZy10cmFuc3BhcmVudCBweC01IHBiLTUgcHQtMTAgcHItMTQgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHtpc1JlYWRPbmx5ID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIn1gfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXt0ZXh0fVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VGV4dChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nfVxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5PXtpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nfVxyXG4gICAgICAgICAgICAgIGFyaWEtcmVhZG9ubHk9e2lzUmVhZE9ubHkgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICBhcmlhLWJ1c3k9e2lzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nfVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IGhlaWdodDogZWRpdG9ySGVpZ2h0IH19XHJcbiAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICB7aXNUcmFuc2NyaWJpbmcgPyAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtMjAwLzgwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTE2IHctMTZcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+e2luZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmluZ1wiLCBcIlRyYW5zY3JpYmluZ1wiKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXttaWNCdXR0b25DbGFzc31cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bWljQXJpYUxhYmVsfVxyXG4gICAgICAgICAgICB0aXRsZT17bWljVG9vbHRpcH1cclxuICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlUmVjb3JkZXJ9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXttaWNEaXNhYmxlZH1cclxuICAgICAgICAgICAgYXJpYS1kaXNhYmxlZD17bWljRGlzYWJsZWQgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtpc1JlYWRPbmx5ID8gKFxyXG4gICAgICAgICAgICAgICAgICA8TG9ja0Nsb3NlZEljb24gY2xhc3NOYW1lPVwiaC02IHctNiByZWxhdGl2ZSB6LTEwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwb2ludGVyLWV2ZW50cy1ub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8UHVsc2VSaW5nc011bHRpcGxlSWNvbiBzaXplPXsyNDB9IHBhZGRpbmc9ezEyfSBjb2xvcj1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsyfSBvcGFjaXR5PXswLjN9IHJvdGF0aW9uPXs5MH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNiB3LTYgcmVsYXRpdmUgei0xMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgMTguNzVhNiA2IDAgMCAwIDYtNnYtMS41bS02IDcuNWE2IDYgMCAwIDEtNi02di0xLjVtNiA3LjV2My43NW0tMy43NSAwaDcuNU0xMiAxNS43NWEzIDMgMCAwIDEtMy0zVjQuNWEzIDMgMCAxIDEgNiAwdjguMjVhMyAzIDAgMCAxLTMgM1pcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIE1vdW50IHRoZSB0ZXh0IGVkaXRvciBpbnRvIHRoZSBSYXpvciB2aWV3LlxyXG5leHBvcnQgY29uc3QgbW91bnRUZXh0RWRpdG9yID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kLXRleHQtZWRpdG9yLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuXHJcbiAgY29uc3QgZmllbGRJZCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkLWlkXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgZmllbGRMYWJlbCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkLWxhYmVsXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgaW5pdGlhbFZhbHVlID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtZmllbGQtdmFsdWVcIikgfHwgXCJcIjtcclxuICBjb25zdCByZXR1cm5VcmwgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1yZXR1cm4tdXJsXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgcmVhZE9ubHlBdHRyID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcmVhZC1vbmx5XCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgaW5pdGlhbFJlYWRPbmx5ID1cclxuICAgIHBhcnNlQm9vbChyZWFkT25seUF0dHIpIHx8IHBhcnNlQm9vbChnZXRRdWVyeVBhcmFtKFwicmVhZE9ubHlcIikpIHx8IHBhcnNlQm9vbChnZXRRdWVyeVBhcmFtKFwicmVhZG9ubHlcIikpO1xyXG4gIGNvbnN0IGFsbG93RWRpdEF0dHIgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1hbGxvdy1lZGl0XCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgYWxsb3dFZGl0UXVlcnkgPSBnZXRRdWVyeVBhcmFtKFwiYWxsb3dFZGl0XCIpIHx8IGdldFF1ZXJ5UGFyYW0oXCJjYW5FZGl0XCIpO1xyXG4gIGNvbnN0IGFsbG93RWRpdCA9IHBhcnNlT3B0aW9uYWxCb29sKGFsbG93RWRpdFF1ZXJ5LCBwYXJzZU9wdGlvbmFsQm9vbChhbGxvd0VkaXRBdHRyLCB0cnVlKSk7XHJcbiAgY29uc3QgZWRpdE1vZGVLZXlBdHRyID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtZWRpdC1tb2RlLWtleVwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGVkaXRNb2RlS2V5ID0gZWRpdE1vZGVLZXlBdHRyIHx8IGdldFF1ZXJ5UGFyYW0oXCJlZGl0TW9kZUtleVwiKSB8fCBcIlwiO1xyXG5cclxuICBtb3VudFJlYWN0SXNsYW5kKFxyXG4gICAgcm9vdEVsLFxyXG4gICAgPEluZFRleHRFZGl0b3JBcHBcclxuICAgICAgZmllbGRJZD17ZmllbGRJZH1cclxuICAgICAgZmllbGRMYWJlbD17ZmllbGRMYWJlbH1cclxuICAgICAgaW5pdGlhbFZhbHVlPXtpbml0aWFsVmFsdWV9XHJcbiAgICAgIHJldHVyblVybD17cmV0dXJuVXJsfVxyXG4gICAgICBpbml0aWFsUmVhZE9ubHk9e2luaXRpYWxSZWFkT25seX1cclxuICAgICAgZWRpdE1vZGVLZXk9e2VkaXRNb2RlS2V5fVxyXG4gICAgICBhbGxvd0VkaXQ9e2FsbG93RWRpdH1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIEF1dG8tbW91bnQgd2hlbiB0aGUgcGFnZSBidW5kbGUgbG9hZHMuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIG1vdW50VGV4dEVkaXRvcigpO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcbmV4cG9ydCBkZWZhdWx0IEluZFRleHRFZGl0b3JBcHA7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG50eXBlIFB1bHNlUmluZ3NNdWx0aXBsZUljb25Qcm9wcyA9IHtcclxuICBzaXplPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIGNvbG9yPzogc3RyaW5nO1xyXG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xyXG4gIGJhY2tncm91bmQ/OiBzdHJpbmc7XHJcbiAgb3BhY2l0eT86IG51bWJlcjtcclxuICByb3RhdGlvbj86IG51bWJlcjtcclxuICBzaGFkb3c/OiBudW1iZXI7XHJcbiAgZmxpcEhvcml6b250YWw/OiBib29sZWFuO1xyXG4gIGZsaXBWZXJ0aWNhbD86IGJvb2xlYW47XHJcbiAgcGFkZGluZz86IG51bWJlcjtcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBQdWxzZSByaW5ncyBpY29uIHdpdGggQ1NTIGFuaW1hdGlvbiB0byBhdm9pZCBTTUlMIGNvbXBhdGliaWxpdHkgaXNzdWVzLlxyXG5jb25zdCBQdWxzZVJpbmdzTXVsdGlwbGVJY29uID0gKHtcclxuICBzaXplLFxyXG4gIGNvbG9yID0gXCJjdXJyZW50Q29sb3JcIixcclxuICBzdHJva2VXaWR0aCA9IDIsXHJcbiAgYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnRcIixcclxuICBvcGFjaXR5ID0gMC40LFxyXG4gIHJvdGF0aW9uID0gOTAsXHJcbiAgc2hhZG93ID0gMCxcclxuICBmbGlwSG9yaXpvbnRhbCA9IGZhbHNlLFxyXG4gIGZsaXBWZXJ0aWNhbCA9IGZhbHNlLFxyXG4gIHBhZGRpbmcgPSAxMixcclxuICBjbGFzc05hbWUsXHJcbn06IFB1bHNlUmluZ3NNdWx0aXBsZUljb25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHRyYW5zZm9ybXMgPSBbXTtcclxuICBpZiAocm90YXRpb24gIT09IDApIHRyYW5zZm9ybXMucHVzaChgcm90YXRlKCR7cm90YXRpb259ZGVnKWApO1xyXG4gIGlmIChmbGlwSG9yaXpvbnRhbCkgdHJhbnNmb3Jtcy5wdXNoKFwic2NhbGVYKC0xKVwiKTtcclxuICBpZiAoZmxpcFZlcnRpY2FsKSB0cmFuc2Zvcm1zLnB1c2goXCJzY2FsZVkoLTEpXCIpO1xyXG5cclxuICBjb25zdCB2aWV3Qm94U2l6ZSA9IDI0ICsgcGFkZGluZyAqIDI7XHJcbiAgY29uc3Qgdmlld0JveE9mZnNldCA9IC1wYWRkaW5nO1xyXG4gIGNvbnN0IHZpZXdCb3ggPSBgJHt2aWV3Qm94T2Zmc2V0fSAke3ZpZXdCb3hPZmZzZXR9ICR7dmlld0JveFNpemV9ICR7dmlld0JveFNpemV9YDtcclxuICBjb25zdCByaW5nUGF0aCA9XHJcbiAgICBcIk0xMiwxQTExLDExLDAsMSwwLDIzLDEyLDExLDExLDAsMCwwLDEyLDFabTAsMjBhOSw5LDAsMSwxLDktOUE5LDksMCwwLDEsMTIsMjFaXCI7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICB2aWV3Qm94PXt2aWV3Qm94fVxyXG4gICAgICB3aWR0aD17c2l6ZX1cclxuICAgICAgaGVpZ2h0PXtzaXplfVxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHN0cm9rZT17Y29sb3J9XHJcbiAgICAgIHN0cm9rZVdpZHRoPXtzdHJva2VXaWR0aH1cclxuICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIG9wYWNpdHksXHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1zLmpvaW4oXCIgXCIpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBmaWx0ZXI6IHNoYWRvdyA+IDAgPyBgZHJvcC1zaGFkb3coMCAke3NoYWRvd31weCAke3NoYWRvdyAqIDJ9cHggcmdiYSgwLDAsMCwwLjMpKWAgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kICE9PSBcInRyYW5zcGFyZW50XCIgPyBiYWNrZ3JvdW5kIDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmctLWJhc2VcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XHJcbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImluZC1wdWxzZS1yaW5nXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9e3JpbmdQYXRofSAvPlxyXG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJpbmQtcHVsc2UtcmluZyBpbmQtcHVsc2UtcmluZy0tZGVsYXktMVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPXtyaW5nUGF0aH0gLz5cclxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmcgaW5kLXB1bHNlLXJpbmctLWRlbGF5LTJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHVsc2VSaW5nc011bHRpcGxlSWNvbjtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBeUU7OztBQzBDckU7QUF6QkosSUFBTSx5QkFBeUIsQ0FBQztBQUFBLEVBQzlCO0FBQUEsRUFDQSxRQUFRO0FBQUEsRUFDUixjQUFjO0FBQUEsRUFDZCxhQUFhO0FBQUEsRUFDYixVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxTQUFTO0FBQUEsRUFDVCxpQkFBaUI7QUFBQSxFQUNqQixlQUFlO0FBQUEsRUFDZixVQUFVO0FBQUEsRUFDVjtBQUNGLE1BQW1DO0FBQ2pDLFFBQU0sYUFBYSxDQUFDO0FBQ3BCLE1BQUksYUFBYSxFQUFHLFlBQVcsS0FBSyxVQUFVLFFBQVEsTUFBTTtBQUM1RCxNQUFJLGVBQWdCLFlBQVcsS0FBSyxZQUFZO0FBQ2hELE1BQUksYUFBYyxZQUFXLEtBQUssWUFBWTtBQUU5QyxRQUFNLGNBQWMsS0FBSyxVQUFVO0FBQ25DLFFBQU0sZ0JBQWdCLENBQUM7QUFDdkIsUUFBTSxVQUFVLEdBQUcsYUFBYSxJQUFJLGFBQWEsSUFBSSxXQUFXLElBQUksV0FBVztBQUMvRSxRQUFNLFdBQ0o7QUFFRixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxPQUFNO0FBQUEsTUFDTjtBQUFBLE1BQ0EsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsTUFBSztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1I7QUFBQSxNQUNBLGVBQWM7QUFBQSxNQUNkLGdCQUFlO0FBQUEsTUFDZjtBQUFBLE1BQ0EsT0FBTztBQUFBLFFBQ0w7QUFBQSxRQUNBLFdBQVcsV0FBVyxLQUFLLEdBQUcsS0FBSztBQUFBLFFBQ25DLFFBQVEsU0FBUyxJQUFJLGlCQUFpQixNQUFNLE1BQU0sU0FBUyxDQUFDLHdCQUF3QjtBQUFBLFFBQ3BGLGlCQUFpQixlQUFlLGdCQUFnQixhQUFhO0FBQUEsUUFDN0Q7QUFBQSxNQUNGO0FBQUEsTUFFQTtBQUFBLG9EQUFDLFVBQUssV0FBVSx3QkFBdUIsTUFBSyxnQkFBZSxHQUFHLFVBQVU7QUFBQSxRQUN4RSw0Q0FBQyxVQUFLLFdBQVUsa0JBQWlCLE1BQUssZ0JBQWUsR0FBRyxVQUFVO0FBQUEsUUFDbEUsNENBQUMsVUFBSyxXQUFVLDBDQUF5QyxNQUFLLGdCQUFlLEdBQUcsVUFBVTtBQUFBLFFBQzFGLDRDQUFDLFVBQUssV0FBVSwwQ0FBeUMsTUFBSyxnQkFBZSxHQUFHLFVBQVU7QUFBQTtBQUFBO0FBQUEsRUFDNUY7QUFFSjtBQUVBLElBQU8saUNBQVE7OztBRGxDWCxJQUFBQSxzQkFBQTtBQTNCSixJQUFNLFdBQVcsV0FBVyxnQkFBZ0IsQ0FBQztBQUM3QyxJQUFNLE9BQU8sQ0FBQyxLQUFLLGFBQWMsWUFBWSxPQUFPLFNBQVMsR0FBRyxNQUFNLFlBQVksU0FBUyxHQUFHLEtBQU0sWUFBWTtBQUVoSCxJQUFNLGlCQUFpQjtBQUN2QixJQUFNLGdCQUFnQjtBQUN0QixJQUFNLGVBQWU7QUFDckIsSUFBTSxvQkFBb0I7QUFDMUIsSUFBTSxlQUFlO0FBQ3JCLElBQU0sbUJBQW1CO0FBQ3pCLElBQU0saUJBQWlCO0FBQ3ZCLElBQU0sZ0JBQWdCO0FBQ3RCLElBQU0sZ0JBQWdCO0FBQ3RCLElBQU0sNkJBQTZCLEtBQUssS0FBSyxLQUFLO0FBUWxELElBQU0sVUFBVSxDQUFDLEVBQUUsT0FBTyxXQUFXLFFBQVEsR0FBRyxNQUM5QztBQUFBLEVBQUM7QUFBQTtBQUFBLElBQ0MsV0FBVyxlQUFlLElBQUk7QUFBQSxJQUM5QixTQUFRO0FBQUEsSUFDUixNQUFLO0FBQUEsSUFDTCxjQUFZLFNBQVMsS0FBSyxrQkFBa0IsU0FBUztBQUFBLElBRXJELHVEQUFDLFlBQU8sV0FBVSx1QkFBc0IsSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLEtBQUksYUFBWSxLQUFJO0FBQUE7QUFDaEY7QUFHRixJQUFNLGVBQWUsTUFBTTtBQUN6QixRQUFNLE9BQU8sU0FBUyxjQUFjLHlCQUF5QjtBQUM3RCxTQUFPLE9BQU8sS0FBSyxhQUFhLFNBQVMsSUFBSTtBQUMvQztBQUVBLFNBQVMsb0JBQW9CLEtBQUs7QUFDaEMsU0FBTywwQkFBMEIsR0FBRztBQUN0QztBQUVBLFNBQVMsb0JBQW9CLEtBQUssT0FBTztBQUN2Qyw0QkFBMEIsS0FBSyxPQUFPLDBCQUEwQjtBQUNsRTtBQUdBLFNBQVMsdUJBQXVCLEtBQUs7QUFDbkMsK0JBQTZCLEdBQUc7QUFDbEM7QUFFQSxTQUFTLFVBQVUsT0FBTztBQUN4QixRQUFNLGFBQWEsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUMxRCxTQUFPLGVBQWUsT0FBTyxlQUFlLFVBQVUsZUFBZTtBQUN2RTtBQUdBLFNBQVMsa0JBQWtCLE9BQU8sVUFBVTtBQUMxQyxRQUFNLGFBQWEsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBQzVDLE1BQUksQ0FBQyxXQUFZLFFBQU87QUFDeEIsU0FBTyxVQUFVLFVBQVU7QUFDN0I7QUFFQSxTQUFTLGNBQWMsS0FBSztBQUMxQixNQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFDMUMsTUFBSTtBQUNGLFdBQU8sSUFBSSxnQkFBZ0IsT0FBTyxTQUFTLFVBQVUsRUFBRSxFQUFFLElBQUksR0FBRyxLQUFLO0FBQUEsRUFDdkUsUUFBUTtBQUNOLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFFQSxTQUFTLHFCQUFxQixPQUFPO0FBQ25DLFFBQU0sTUFBTSxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDckMsTUFBSSxDQUFDLElBQUssUUFBTztBQUNqQixTQUFPLElBQUksV0FBVyxpQkFBaUIsSUFBSSxNQUFNO0FBQ25EO0FBRUEsU0FBUyxpQkFBaUIsRUFBRSxTQUFTLFlBQVksY0FBYyxXQUFXLGtCQUFrQixPQUFPLGNBQWMsSUFBSSxZQUFZLEtBQUssR0FBRztBQUN2SSxRQUFNLGlCQUFhLHNCQUFRLE1BQU0sR0FBRyxjQUFjLEdBQUcsT0FBTyxXQUFXLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUU5RixRQUFNLHdCQUFvQixzQkFBUSxNQUFNO0FBQ3RDLFVBQU0sU0FBUyxPQUFPLGNBQWMsV0FBVyxVQUFVLEtBQUssSUFBSTtBQUNsRSxRQUFJLE9BQVEsUUFBTztBQUNuQixVQUFNLFNBQVMsT0FBTyxXQUFXLEVBQUUsRUFBRSxLQUFLO0FBQzFDLFFBQUksQ0FBQyxPQUFRLFFBQU87QUFDcEIsUUFBSTtBQUNGLFlBQU0sU0FBUywwQkFBMEIsR0FBRyxjQUFjLEdBQUcsTUFBTSxZQUFZO0FBQy9FLGFBQU8sU0FBUyxPQUFPLE1BQU0sRUFBRSxLQUFLLElBQUk7QUFBQSxJQUMxQyxRQUFRO0FBQ04sYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGLEdBQUcsQ0FBQyxTQUFTLFNBQVMsQ0FBQztBQUN2QixRQUFNLFVBQVUsQ0FBQyxDQUFDO0FBQ2xCLFFBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSSx1QkFBUyxDQUFDLENBQUMsbUJBQW1CLENBQUMsT0FBTztBQUMxRSxRQUFNLDRCQUF3QixzQkFBUSxNQUFNLHFCQUFxQixXQUFXLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDNUYsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHVCQUFTLEtBQUs7QUFDdEQsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx1QkFBUyxDQUFDO0FBQzFELFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUksdUJBQVMsQ0FBQztBQUMxRCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHVCQUFTLEtBQUs7QUFDMUQsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsUUFBSSx1QkFBUyxFQUFFO0FBQ3pELFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSSx1QkFBUyxLQUFLO0FBQzlDLFFBQU0scUJBQWlCLHFCQUFPLElBQUk7QUFDbEMsUUFBTSxxQkFBaUIscUJBQU8sSUFBSTtBQUNsQyxRQUFNLG9CQUFnQixxQkFBTyxFQUFFO0FBQy9CLFFBQU0scUJBQWlCLHFCQUFPLENBQUM7QUFDL0IsUUFBTSxxQkFBaUIscUJBQU8sRUFBRTtBQUNoQyxRQUFNLGtCQUFjLHFCQUFPLElBQUk7QUFDL0IsUUFBTSwwQkFBc0IsMEJBQVksTUFBTTtBQUM1QyxRQUFJLE9BQU8sV0FBVyxhQUFhO0FBQ2pDLFlBQU0sV0FBVyxnQkFBZ0IsZ0JBQWdCLGVBQWUsQ0FBQztBQUNqRSxhQUFPO0FBQUEsSUFDVDtBQUNBLFVBQU0sV0FBVyxPQUFPLGVBQWU7QUFDdkMsUUFBSSxDQUFDLFVBQVU7QUFDYixhQUFPLGdCQUFnQixnQkFBZ0IsZUFBZSxDQUFDO0FBQUEsSUFDekQ7QUFDQSxVQUFNLGdCQUFnQixlQUFlLG1CQUFtQixlQUFlO0FBQ3ZFLFVBQU0sWUFBWSxLQUFLLElBQUksV0FBVyxnQkFBZ0IsZUFBZSxJQUFJLGVBQWUsaUJBQWlCO0FBQ3pHLFdBQU8sR0FBRyxTQUFTO0FBQUEsRUFDckIsR0FBRyxDQUFDLGNBQWMsZ0JBQWdCLENBQUM7QUFFbkMsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHVCQUFTLE1BQU0sb0JBQW9CLENBQUM7QUFFNUUsUUFBTSxDQUFDLE1BQU0sT0FBTyxRQUFJLHVCQUFTLE1BQU07QUFDckMsVUFBTSxTQUFTLG9CQUFvQixVQUFVO0FBQzdDLFVBQU0sY0FBYyxXQUFXLE9BQU8sU0FBUyxPQUFPLGdCQUFnQixFQUFFO0FBQ3hFLG1CQUFlLFVBQVU7QUFDekIsV0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsTUFBTSxDQUFDLGVBQWUsa0JBQWtCLFlBQVksVUFBVSxlQUFlLFdBQVc7QUFBQSxJQUN4RixDQUFDLFlBQVksZ0JBQWdCLFVBQVUsSUFBSTtBQUFBLEVBQzdDO0FBRUEsUUFBTSxpQkFBYSwwQkFBWSxNQUFNO0FBQ25DLFFBQUksZUFBZSxTQUFTO0FBQzFCLG1CQUFhLGVBQWUsT0FBTztBQUNuQyxxQkFBZSxVQUFVO0FBQUEsSUFDM0I7QUFDQSxrQkFBYyxVQUFVO0FBQ3hCLG1CQUFlLFVBQVU7QUFDekIsZ0JBQVksS0FBSztBQUFBLEVBQ25CLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxrQkFBYztBQUFBLElBQ2xCLENBQUMsYUFBYTtBQUNaLFlBQU0sWUFBWSxPQUFPLFlBQVksRUFBRTtBQUN2QyxpQkFBVztBQUNYLFVBQUksQ0FBQyxXQUFXO0FBQ2QsZ0JBQVEsRUFBRTtBQUNWO0FBQUEsTUFDRjtBQUVBLG9CQUFjLFVBQVU7QUFDeEIscUJBQWUsVUFBVTtBQUN6QixrQkFBWSxJQUFJO0FBQ2hCLGNBQVEsRUFBRTtBQUVWLFlBQU0sUUFBUSxVQUFVO0FBQ3hCLFlBQU0sV0FBVyxLQUFLLElBQUksR0FBRyxLQUFLLE1BQU0saUJBQWlCLGdCQUFnQixDQUFDO0FBQzFFLFlBQU0sV0FBVyxLQUFLLElBQUksZUFBZSxLQUFLLElBQUksZUFBZSxLQUFLLEtBQUssUUFBUSxRQUFRLENBQUMsQ0FBQztBQUU3RixZQUFNLE9BQU8sTUFBTTtBQUNqQixjQUFNLE9BQU8sS0FBSyxJQUFJLGVBQWUsVUFBVSxVQUFVLEtBQUs7QUFDOUQsdUJBQWUsVUFBVTtBQUN6QixnQkFBUSxjQUFjLFFBQVEsTUFBTSxHQUFHLElBQUksQ0FBQztBQUM1QyxZQUFJLE9BQU8sT0FBTztBQUNoQix5QkFBZSxVQUFVLFdBQVcsTUFBTSxnQkFBZ0I7QUFBQSxRQUM1RCxPQUFPO0FBQ0wseUJBQWUsVUFBVTtBQUN6QixzQkFBWSxLQUFLO0FBQUEsUUFDbkI7QUFBQSxNQUNGO0FBRUEscUJBQWUsVUFBVSxXQUFXLE1BQU0sZ0JBQWdCO0FBQUEsSUFDNUQ7QUFBQSxJQUNBLENBQUMsVUFBVTtBQUFBLEVBQ2I7QUFHQSxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLE9BQU8sWUFBWTtBQUNqQixVQUFJLENBQUMsV0FBVyxlQUFnQjtBQUdoQyx3QkFBa0IsSUFBSTtBQUN0Qix5QkFBbUIsRUFBRTtBQUVyQixVQUFJO0FBRUYsY0FBTSxPQUFPLElBQUksU0FBUztBQUMxQixhQUFLLE9BQU8sY0FBYyxNQUFNO0FBQ2hDLGFBQUssT0FBTyxhQUFhLFNBQVMsV0FBVztBQUM3QyxZQUFJLG1CQUFtQjtBQUNyQixlQUFLLE9BQU8sYUFBYSxpQkFBaUI7QUFBQSxRQUM1QztBQUVBLGNBQU0sWUFBWSxhQUFhO0FBQy9CLGNBQU0sVUFBVTtBQUFBLFVBQ2QsUUFBUTtBQUFBLFVBQ1Isb0JBQW9CO0FBQUEsVUFDcEIsR0FBSSxZQUFZLEVBQUUsMEJBQTBCLFVBQVUsSUFBSSxDQUFDO0FBQUEsUUFDN0Q7QUFHQSxjQUFNLFFBQVEsb0JBQW9CLGNBQWMsbUJBQW1CLGlCQUFpQixDQUFDLEtBQUs7QUFDMUYsY0FBTSxXQUFXLE1BQU0sTUFBTSw0QkFBNEIsS0FBSyxJQUFJO0FBQUEsVUFDaEUsUUFBUTtBQUFBLFVBQ1IsTUFBTTtBQUFBLFVBQ047QUFBQSxRQUNGLENBQUM7QUFFRCxjQUFNLFVBQVUsTUFBTSxTQUFTLEtBQUssRUFBRSxNQUFNLE1BQU0sSUFBSTtBQUN0RCxjQUFNLEtBQUssU0FBUyxNQUFNLFdBQVcsUUFBUSxZQUFZO0FBRXpELFlBQUksQ0FBQyxJQUFJO0FBQ1AsZ0JBQU0sTUFBTSxXQUFXLFFBQVEsVUFBVSxPQUFPLFFBQVEsT0FBTyxJQUFJLEtBQUssK0JBQStCLG9CQUFvQjtBQUMzSCw2QkFBbUIsR0FBRztBQUN0QjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGFBQWEsV0FBVyxPQUFPLFFBQVEsU0FBUyxXQUFXLFFBQVEsT0FBTztBQUNoRixZQUFJLENBQUMsV0FBVyxLQUFLLEdBQUc7QUFDdEIsNkJBQW1CLEtBQUssK0JBQStCLG9CQUFvQixDQUFDO0FBQzVFO0FBQUEsUUFDRjtBQUdBLG9CQUFZLFVBQVU7QUFFdEIsd0JBQWdCLEtBQUs7QUFDckIsNEJBQW9CLENBQUMsTUFBTSxJQUFJLENBQUM7QUFBQSxNQUNsQyxTQUFTLEtBQUs7QUFDWixjQUFNLE1BQU0sT0FBTyxJQUFJLFVBQVUsT0FBTyxJQUFJLE9BQU8sSUFBSSxLQUFLLCtCQUErQixvQkFBb0I7QUFDL0csMkJBQW1CLEdBQUc7QUFBQSxNQUN4QixVQUFFO0FBRUEsMEJBQWtCLEtBQUs7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsZ0JBQWdCLFdBQVc7QUFBQSxFQUM5QjtBQUdBLFFBQU0seUJBQXFCLDBCQUFZLE1BQU07QUFDM0MsdUJBQW1CLEVBQUU7QUFBQSxFQUN2QixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sMkJBQXVCLDBCQUFZLENBQUMsWUFBWTtBQUVwRCxRQUFJO0FBQ0YsVUFBSSxPQUFPLE9BQU8sT0FBTyxPQUFPLElBQUksb0JBQW9CLFlBQVk7QUFDbEUsZUFBTyxJQUFJLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLFlBQVksS0FBSyxDQUFDO0FBQUEsTUFDekU7QUFBQSxJQUNGLFFBQVE7QUFBQSxJQUVSO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLDhCQUFVLE1BQU07QUFDZCxRQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFDMUMsVUFBTSxlQUFlLE1BQU07QUFDekIsc0JBQWdCLG9CQUFvQixDQUFDO0FBQUEsSUFDdkM7QUFFQSxpQkFBYTtBQUNiLFdBQU8saUJBQWlCLFVBQVUsWUFBWTtBQUM5QyxXQUFPLGlCQUFpQixxQkFBcUIsWUFBWTtBQUN6RCxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQixVQUFVLFlBQVk7QUFDakQsYUFBTyxvQkFBb0IscUJBQXFCLFlBQVk7QUFBQSxJQUM5RDtBQUFBLEVBQ0YsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0FBRXhCLDhCQUFVLE1BQU07QUFDZCxRQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFDMUMsUUFBSSxDQUFDLGNBQWM7QUFDakIsMEJBQW9CLENBQUM7QUFDckIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLEtBQUssZUFBZTtBQUMxQixRQUFJLENBQUMsR0FBSSxRQUFPO0FBRWhCLFVBQU0sVUFBVSxNQUFNO0FBQ3BCLFVBQUk7QUFDRixjQUFNLE9BQU8sR0FBRyxzQkFBc0I7QUFDdEMsNEJBQW9CLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQUEsTUFDMUQsUUFBUTtBQUFBLE1BRVI7QUFBQSxJQUNGO0FBRUEsWUFBUTtBQUVSLFFBQUksT0FBTyxtQkFBbUIsYUFBYTtBQUN6QyxZQUFNLEtBQUssSUFBSSxlQUFlLE9BQU87QUFDckMsU0FBRyxRQUFRLEVBQUU7QUFDYixhQUFPLE1BQU0sR0FBRyxXQUFXO0FBQUEsSUFDN0I7QUFFQSxXQUFPLGlCQUFpQixVQUFVLE9BQU87QUFDekMsV0FBTyxNQUFNLE9BQU8sb0JBQW9CLFVBQVUsT0FBTztBQUFBLEVBQzNELEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFFakIsOEJBQVUsTUFBTSxZQUFZLENBQUMsVUFBVSxDQUFDO0FBRXhDLDhCQUFVLE1BQU07QUFDZCxXQUFPLDBCQUEwQixnQkFBZ0I7QUFDakQsV0FBTyxNQUFNO0FBQ1gsYUFBTyw0QkFBNEI7QUFBQSxJQUNyQztBQUFBLEVBQ0YsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLDhCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsU0FBVTtBQUNmLFVBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQUksQ0FBQyxHQUFJO0FBQ1QsT0FBRyxZQUFZLEdBQUc7QUFBQSxFQUNwQixHQUFHLENBQUMsVUFBVSxJQUFJLENBQUM7QUFFbkIsUUFBTSxpQkFBaUIsTUFBTTtBQUMzQixRQUFJLGNBQWMsa0JBQWtCLFNBQVU7QUFDOUMsdUJBQW1CLEVBQUU7QUFDckIsb0JBQWdCLENBQUMsU0FBUztBQUN4QixVQUFJLEtBQU0scUJBQW9CLENBQUMsTUFBTSxJQUFJLENBQUM7QUFDMUMsYUFBTyxDQUFDO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sa0JBQWtCLE1BQU07QUFDNUIsUUFBSSxPQUFPLFdBQVcsWUFBYSxRQUFPO0FBQzFDLFFBQUksT0FBTyxPQUFPLDBCQUEwQixZQUFZO0FBQ3RELGFBQU8sc0JBQXNCO0FBQzdCLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGlCQUFhLDBCQUFZLE1BQU07QUFDbkMsUUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFZO0FBQzdCLGtCQUFjLEtBQUs7QUFDbkIsUUFBSSxzQkFBdUIscUJBQW9CLHVCQUF1QixNQUFNO0FBQUEsRUFDOUUsR0FBRyxDQUFDLFNBQVMsWUFBWSxxQkFBcUIsQ0FBQztBQUUvQyxRQUFNLGVBQWUsTUFBTTtBQUV6Qix3QkFBb0IsWUFBWSxJQUFJO0FBQUEsRUFDdEM7QUFFQSxRQUFNLFNBQVMsTUFBTTtBQUNuQixpQkFBYTtBQUNiLFFBQUksbUJBQW1CO0FBQ3JCLGFBQU8sU0FBUyxPQUFPO0FBQ3ZCO0FBQUEsSUFDRjtBQUNBLFFBQUksT0FBTyxRQUFRLFNBQVMsS0FBSyxnQkFBZ0IsRUFBRztBQUNwRCxXQUFPLFFBQVEsS0FBSztBQUFBLEVBQ3RCO0FBRUEsUUFBTSxrQkFBa0IsTUFBTTtBQUU1QixRQUFJLG1CQUFtQjtBQUNyQixhQUFPLFNBQVMsT0FBTztBQUN2QjtBQUFBLElBQ0Y7QUFDQSxRQUFJLE9BQU8sUUFBUSxTQUFTLEtBQUssZ0JBQWdCLEVBQUc7QUFDcEQsV0FBTyxRQUFRLEtBQUs7QUFBQSxFQUN0QjtBQUVBLFFBQU0sU0FBUyxNQUFNO0FBQ25CLFFBQUksY0FBYyxrQkFBa0IsU0FBVTtBQUM5Qyx3QkFBb0IsWUFBWSxJQUFJO0FBQ3BDLFFBQUksdUJBQXVCO0FBQ3pCLDBCQUFvQix1QkFBdUIsTUFBTTtBQUNqRCwwQkFBb0IsR0FBRyxxQkFBcUIsV0FBVyxHQUFHO0FBQUEsSUFDNUQ7QUFDQSxXQUFPLGlDQUFpQztBQUN4QyxvQkFBZ0I7QUFBQSxFQUNsQjtBQUdBLFFBQU0sbUJBQWUsMEJBQVksTUFBTTtBQUNyQyxRQUFJLGNBQWMsa0JBQWtCLFNBQVU7QUFDOUMsZUFBVztBQUNYLHVCQUFtQixFQUFFO0FBQ3JCLFVBQU0sY0FBYyxlQUFlLFdBQVc7QUFDOUMsWUFBUSxXQUFXO0FBQ25CLHdCQUFvQixZQUFZLFdBQVc7QUFDM0MsUUFBSSx1QkFBdUI7QUFDekIsNkJBQXVCLEdBQUcscUJBQXFCLFNBQVM7QUFDeEQsNkJBQXVCLHFCQUFxQjtBQUFBLElBQzlDO0FBQ0EsV0FBTyxpQ0FBaUM7QUFDeEMsb0JBQWdCO0FBQUEsRUFDbEIsR0FBRyxDQUFDLFlBQVksZ0JBQWdCLFVBQVUsWUFBWSxZQUFZLGlCQUFpQixxQkFBcUIsQ0FBQztBQUV6RyxRQUFNLGlCQUFpQixhQUNuQixvTEFDQTtBQUNKLFFBQU0sY0FBYyxjQUFjLGtCQUFrQjtBQUNwRCxRQUFNLGtCQUFrQixLQUFLLHNDQUFzQyxxREFBcUQ7QUFDeEgsUUFBTSxlQUFlLEtBQUsseUJBQXlCLFlBQVk7QUFDL0QsUUFBTSxlQUFlLGFBQWEsR0FBRyxZQUFZLEtBQUssZUFBZSxLQUFLO0FBQzFFLFFBQU0sYUFBYSxhQUFhLGtCQUFrQjtBQUNsRCxRQUFNLGlCQUFpQixxT0FDckIsY0FDSSxhQUNFLGtEQUNBLG1EQUNGLHdCQUNOO0FBRUEsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsd0RBQ2I7QUFBQSxrREFBQyxTQUFJLFdBQVUsb0JBQ2I7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsV0FBVTtBQUFBLFVBQ1YsY0FBWSxLQUFLLGVBQWUsTUFBTTtBQUFBLFVBQ3RDLFNBQVM7QUFBQSxVQUVULHVEQUFDLDJCQUFnQixXQUFVLFdBQVUsZUFBWSxRQUFPO0FBQUE7QUFBQSxNQUMxRDtBQUFBLE1BRUEsNkNBQUMsU0FBSSxXQUFVLHFFQUNiLHVEQUFDLFVBQUssSUFBRyxlQUFjLFdBQVUsWUFDOUIsc0JBQ0gsR0FDRjtBQUFBLE1BRUMsYUFDQyxVQUNFO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxXQUFVO0FBQUEsVUFDVixjQUFZLEtBQUssZUFBZSxNQUFNO0FBQUEsVUFDdEMsU0FBUztBQUFBLFVBRVQsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixXQUFVLFdBQVUsTUFBSyxRQUFPLFNBQVEsYUFBWSxhQUFZLE9BQU0sUUFBTyxnQkFBZSxlQUFZLFFBQzlJLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSx1S0FBc0ssR0FDN047QUFBQTtBQUFBLE1BQ0YsSUFFQSw2Q0FBQyxTQUFJLGVBQVksUUFBTyxPQUFPLEVBQUUsT0FBTyxRQUFRLFFBQVEsT0FBTyxHQUFHLElBR3BFLDhDQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxXQUFVO0FBQUEsWUFDVixjQUFZLEtBQUssZUFBZSxNQUFNO0FBQUEsWUFDdEMsU0FBUztBQUFBLFlBRVQsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQVksT0FBTSxRQUFPLGdCQUFlLFdBQVUsV0FBVSxlQUFZLFFBQzlJLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSx5QkFBd0IsR0FDL0U7QUFBQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxXQUFVO0FBQUEsWUFDVixjQUFZLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxZQUMxQyxTQUFTO0FBQUEsWUFFVCx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLE1BQUssUUFBTyxTQUFRLGFBQVksYUFBWSxPQUFNLFFBQU8sZ0JBQWUsV0FBVSxXQUFVLGVBQVksUUFDOUksdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLHdCQUF1QixHQUM5RTtBQUFBO0FBQUEsUUFDRjtBQUFBLFNBQ0Y7QUFBQSxPQUVKO0FBQUEsSUFFQSw2Q0FBQyxTQUFJLFdBQVUsd0NBQ2Isd0RBQUMsU0FBSSxXQUFVLDRCQUEyQixPQUFPLEVBQUUsV0FBVyxHQUFHLFlBQVksTUFBTSxjQUFjLEdBQUcsWUFBWSxLQUFLLEdBQ2xIO0FBQUEsc0JBQ0MsNkNBQUMsU0FBSSxLQUFLLGdCQUFnQixXQUFVLGVBQ2xDO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFFQyxVQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxzQkFBb0I7QUFBQSxVQUNwQixzQkFBb0I7QUFBQSxVQUNwQixnQkFBZ0I7QUFBQSxVQUNoQixpQkFBaUIsS0FBSyx5QkFBeUIsWUFBWTtBQUFBLFVBQzNELHFCQUFxQixLQUFLLDJCQUEyQixjQUFjO0FBQUEsVUFDbkUsZ0JBQWdCO0FBQUEsVUFDaEIsa0JBQWtCO0FBQUE7QUFBQSxRQVRiO0FBQUEsTUFVUCxHQUNGO0FBQUEsTUFHRCxrQkFDQyw2Q0FBQyxTQUFJLFdBQVUsMENBQTBDLDJCQUFnQixJQUN2RTtBQUFBLE1BRUosOENBQUMsU0FBSSxXQUFXLGdCQUNkO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLFdBQVcsZ0ZBQWdGLGFBQWEsdUJBQXVCLGdCQUFnQjtBQUFBLFlBQy9JLE9BQU87QUFBQSxZQUNQLFVBQVUsQ0FBQyxNQUFNLFFBQVEsRUFBRSxPQUFPLEtBQUs7QUFBQSxZQUN2QyxVQUFVLGtCQUFrQjtBQUFBLFlBQzVCLFVBQVUsY0FBYyxrQkFBa0I7QUFBQSxZQUMxQyxpQkFBZSxhQUFhLFNBQVM7QUFBQSxZQUNyQyxhQUFXLGtCQUFrQjtBQUFBLFlBQzdCLE9BQU8sRUFBRSxRQUFRLGFBQWE7QUFBQTtBQUFBLFFBQ2hDO0FBQUEsUUFFQyxpQkFDQyw2Q0FBQyxTQUFJLFdBQVUsMEVBQ2Isd0RBQUMsU0FBSSxXQUFVLG9DQUNiO0FBQUEsdURBQUMsV0FBUSxNQUFLLGFBQVk7QUFBQSxVQUMxQiw2Q0FBQyxVQUFLLFdBQVUsV0FBVyxlQUFLLDJCQUEyQixjQUFjLEdBQUU7QUFBQSxXQUM3RSxHQUNGLElBQ0U7QUFBQSxRQUVOO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxXQUFXO0FBQUEsWUFDWCxjQUFZO0FBQUEsWUFDWixPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsWUFDVCxVQUFVO0FBQUEsWUFDVixpQkFBZSxjQUFjLFNBQVM7QUFBQSxZQUVqQyx1QkFDQyw2Q0FBQywwQkFBZSxXQUFVLHlCQUF3QixlQUFZLFFBQU8sSUFFckUsOEVBQ0U7QUFBQSwyREFBQyxVQUFLLFdBQVUseUVBQXdFLGVBQVksUUFDbEcsdURBQUMsa0NBQXVCLE1BQU0sS0FBSyxTQUFTLElBQUksT0FBTSxnQkFBZSxhQUFhLEdBQUcsU0FBUyxLQUFLLFVBQVUsSUFBSSxHQUNuSDtBQUFBLGNBQ0EsNkNBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsR0FBRyxRQUFPLGdCQUFlLFdBQVUseUJBQXdCLGVBQVksUUFDMUosdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLDhJQUE2SSxHQUNwTTtBQUFBLGVBQ0Y7QUFBQTtBQUFBLFFBRVI7QUFBQSxTQUNBO0FBQUEsT0FDRixHQUNGO0FBQUEsS0FDRjtBQUVKO0FBR08sSUFBTSxrQkFBa0IsTUFBTTtBQUNuQyxRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUViLFFBQU0sVUFBVSxPQUFPLGFBQWEsZUFBZSxLQUFLO0FBQ3hELFFBQU0sYUFBYSxPQUFPLGFBQWEsa0JBQWtCLEtBQUs7QUFDOUQsUUFBTSxlQUFlLE9BQU8sYUFBYSxrQkFBa0IsS0FBSztBQUNoRSxRQUFNLFlBQVksT0FBTyxhQUFhLGlCQUFpQixLQUFLO0FBQzVELFFBQU0sZUFBZSxPQUFPLGFBQWEsZ0JBQWdCLEtBQUs7QUFDOUQsUUFBTSxrQkFDSixVQUFVLFlBQVksS0FBSyxVQUFVLGNBQWMsVUFBVSxDQUFDLEtBQUssVUFBVSxjQUFjLFVBQVUsQ0FBQztBQUN4RyxRQUFNLGdCQUFnQixPQUFPLGFBQWEsaUJBQWlCLEtBQUs7QUFDaEUsUUFBTSxpQkFBaUIsY0FBYyxXQUFXLEtBQUssY0FBYyxTQUFTO0FBQzVFLFFBQU0sWUFBWSxrQkFBa0IsZ0JBQWdCLGtCQUFrQixlQUFlLElBQUksQ0FBQztBQUMxRixRQUFNLGtCQUFrQixPQUFPLGFBQWEsb0JBQW9CLEtBQUs7QUFDckUsUUFBTSxjQUFjLG1CQUFtQixjQUFjLGFBQWEsS0FBSztBQUV2RTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLGtCQUFnQjtBQUNsQjtBQUVBLHVCQUF1QixLQUFLO0FBQzVCLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSJdCn0K
