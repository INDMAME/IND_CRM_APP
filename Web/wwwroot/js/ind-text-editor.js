import {
  AudioRecorderMinimal
} from "./chunks/chunk-Y4JTW4BU.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9UZXh0RWRpdG9yLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1B1bHNlUmluZ3NNdWx0aXBsZUljb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uTGVmdEljb24sIExvY2tDbG9zZWRJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZVwiO1xyXG5pbXBvcnQgQXVkaW9SZWNvcmRlck1pbmltYWwgZnJvbSBcIi4vQXVkaW9SZWNvcmRlck1pbmltYWwudHN4XCI7XHJcbmltcG9ydCBQdWxzZVJpbmdzTXVsdGlwbGVJY29uIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUHVsc2VSaW5nc011bHRpcGxlSWNvbi50c3hcIjtcclxuaW1wb3J0IHsgVEVYVF9FRElUT1JfUFJFRklYIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3RleHRFZGl0b3IudHNcIjtcclxuaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcblxyXG5jb25zdCBJTkRfSTE4TiA9IGdsb2JhbFRoaXMuX19JTkRfSTE4Tl9fIHx8IHt9O1xyXG5jb25zdCBpbmRUID0gKGtleSwgZmFsbGJhY2spID0+IChJTkRfSTE4TiAmJiB0eXBlb2YgSU5EX0kxOE5ba2V5XSA9PT0gXCJzdHJpbmdcIiAmJiBJTkRfSTE4TltrZXldKSB8fCBmYWxsYmFjayB8fCBrZXk7XHJcblxyXG5jb25zdCBTVE9SQUdFX1BSRUZJWCA9IFRFWFRfRURJVE9SX1BSRUZJWDtcclxuY29uc3QgVE9QQkFSX0hFSUdIVCA9IDY0O1xyXG5jb25zdCBPVVRFUl9NQVJHSU4gPSA1O1xyXG5jb25zdCBNSU5fRURJVE9SX0hFSUdIVCA9IDI0MDtcclxuY29uc3QgUkVDT1JERVJfR0FQID0gMTI7XHJcbmNvbnN0IFRZUEVfSU5URVJWQUxfTVMgPSAyODtcclxuY29uc3QgVFlQRV9UQVJHRVRfTVMgPSA0MjAwO1xyXG5jb25zdCBUWVBFX01JTl9TVEVQID0gMTtcclxuY29uc3QgVFlQRV9NQVhfU1RFUCA9IDQ7XHJcbmNvbnN0IFRFWFRfRURJVE9SX1NUT1JBR0VfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbi8vIFNoYXJlZCBzcGlubmVyIGZvciBsb2NhbCBsb2FkaW5nIHN0YXRlcy5cclxudHlwZSBTcGlubmVyUHJvcHMgPSB7XHJcbiAgc2l6ZT86IHN0cmluZztcclxuICBsYWJlbD86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IFNwaW5uZXIgPSAoeyBzaXplID0gXCJoLTYgdy02XCIsIGxhYmVsID0gXCJcIiB9OiBTcGlubmVyUHJvcHMpID0+IChcclxuICA8c3ZnXHJcbiAgICBjbGFzc05hbWU9e2BpbmQtc3Bpbm5lciAke3NpemV9YH1cclxuICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxyXG4gICAgcm9sZT1cInN0YXR1c1wiXHJcbiAgICBhcmlhLWxhYmVsPXtsYWJlbCB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gID5cclxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgZ2V0Q3NyZlRva2VuID0gKCkgPT4ge1xyXG4gIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XHJcbiAgcmV0dXJuIG1ldGEgPyBtZXRhLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIikgOiBcIlwiO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2FmZUdldFNlc3Npb25WYWx1ZShrZXkpIHtcclxuICByZXR1cm4gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYWZlU2V0U2Vzc2lvblZhbHVlKGtleSwgdmFsdWUpIHtcclxuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGtleSwgdmFsdWUsIFRFWFRfRURJVE9SX1NUT1JBR0VfVFRMX01TKTtcclxufVxyXG5cclxuLy8gUmVtb3ZlIGEgc2Vzc2lvbiB2YWx1ZSB3aXRob3V0IHRocm93aW5nIGZvciBibG9ja2VkIHN0b3JhZ2UuXHJcbmZ1bmN0aW9uIHNhZmVSZW1vdmVTZXNzaW9uVmFsdWUoa2V5KSB7XHJcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUJvb2wodmFsdWUpIHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBub3JtYWxpemVkID09PSBcIjFcIiB8fCBub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcInllc1wiO1xyXG59XHJcblxyXG4vLyBQYXJzZXMgb3B0aW9uYWwgYm9vbGVhbiB2YWx1ZXMgd2l0aCBhIGRlZmF1bHQgZmFsbGJhY2suXHJcbmZ1bmN0aW9uIHBhcnNlT3B0aW9uYWxCb29sKHZhbHVlLCBmYWxsYmFjaykge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbGxiYWNrO1xyXG4gIHJldHVybiBwYXJzZUJvb2wobm9ybWFsaXplZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFF1ZXJ5UGFyYW0oa2V5KSB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcIlwiO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IFwiXCIpLmdldChrZXkpIHx8IFwiXCI7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVkaXRNb2RlS2V5KHZhbHVlKSB7XHJcbiAgY29uc3Qga2V5ID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIWtleSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIGtleS5zdGFydHNXaXRoKFwiaW5kX3Zpc2l0X2VkaXRfXCIpID8ga2V5IDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gSW5kVGV4dEVkaXRvckFwcCh7IGZpZWxkSWQsIGZpZWxkTGFiZWwsIGluaXRpYWxWYWx1ZSwgcmV0dXJuVXJsLCBpbml0aWFsUmVhZE9ubHkgPSBmYWxzZSwgZWRpdE1vZGVLZXkgPSBcIlwiLCBhbGxvd0VkaXQgPSB0cnVlIH0pIHtcclxuICBjb25zdCBzdG9yYWdlS2V5ID0gdXNlTWVtbygoKSA9PiBgJHtTVE9SQUdFX1BSRUZJWH0ke1N0cmluZyhmaWVsZElkIHx8IFwiXCIpLnRyaW0oKX1gLCBbZmllbGRJZF0pO1xyXG4gIC8vIFJlc29sdmUgcmV0dXJuIFVSTCBmcm9tIHByb3BzIG9yIHNlc3Npb25TdG9yYWdlLlxyXG4gIGNvbnN0IHJlc29sdmVkUmV0dXJuVXJsID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBkaXJlY3QgPSB0eXBlb2YgcmV0dXJuVXJsID09PSBcInN0cmluZ1wiID8gcmV0dXJuVXJsLnRyaW0oKSA6IFwiXCI7XHJcbiAgICBpZiAoZGlyZWN0KSByZXR1cm4gZGlyZWN0O1xyXG4gICAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGZpZWxkSWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKCFzYWZlSWQpIHJldHVybiBcIlwiO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3RvcmVkID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShgJHtTVE9SQUdFX1BSRUZJWH0ke3NhZmVJZH1fcmV0dXJuVXJsYCk7XHJcbiAgICAgIHJldHVybiBzdG9yZWQgPyBTdHJpbmcoc3RvcmVkKS50cmltKCkgOiBcIlwiO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gIH0sIFtmaWVsZElkLCByZXR1cm5VcmxdKTtcclxuICBjb25zdCBjYW5FZGl0ID0gISFhbGxvd0VkaXQ7XHJcbiAgY29uc3QgW2lzUmVhZE9ubHksIHNldElzUmVhZE9ubHldID0gdXNlU3RhdGUoISFpbml0aWFsUmVhZE9ubHkgfHwgIWNhbkVkaXQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRFZGl0TW9kZUtleSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplRWRpdE1vZGVLZXkoZWRpdE1vZGVLZXkpLCBbZWRpdE1vZGVLZXldKTtcclxuICBjb25zdCBbcmVjb3JkZXJPcGVuLCBzZXRSZWNvcmRlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtyZWNvcmRlclJlc2V0S2V5LCBzZXRSZWNvcmRlclJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtyZWNvcmRlckhlaWdodFB4LCBzZXRSZWNvcmRlckhlaWdodFB4XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtpc1RyYW5zY3JpYmluZywgc2V0SXNUcmFuc2NyaWJpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFt0cmFuc2NyaWJlRXJyb3IsIHNldFRyYW5zY3JpYmVFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNUeXBpbmcsIHNldElzVHlwaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCByZWNvcmRlckJveFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB0eXBpbmdUaW1lclJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB0eXBpbmdUZXh0UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IHR5cGluZ0luZGV4UmVmID0gdXNlUmVmKDApO1xyXG4gIGNvbnN0IGluaXRpYWxUZXh0UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IHRleHRhcmVhUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGNvbXB1dGVFZGl0b3JIZWlnaHQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGBjYWxjKDEwMHZoIC0gJHtUT1BCQVJfSEVJR0hUICsgT1VURVJfTUFSR0lOICogMn1weClgO1xyXG4gICAgICByZXR1cm4gZmFsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2aWV3cG9ydCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCAwO1xyXG4gICAgaWYgKCF2aWV3cG9ydCkge1xyXG4gICAgICByZXR1cm4gYGNhbGMoMTAwdmggLSAke1RPUEJBUl9IRUlHSFQgKyBPVVRFUl9NQVJHSU4gKiAyfXB4KWA7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWNvcmRlclNwYWNlID0gcmVjb3JkZXJPcGVuID8gcmVjb3JkZXJIZWlnaHRQeCArIFJFQ09SREVSX0dBUCA6IDA7XHJcbiAgICBjb25zdCBhdmFpbGFibGUgPSBNYXRoLm1heCh2aWV3cG9ydCAtIFRPUEJBUl9IRUlHSFQgLSBPVVRFUl9NQVJHSU4gKiAyIC0gcmVjb3JkZXJTcGFjZSwgTUlOX0VESVRPUl9IRUlHSFQpO1xyXG4gICAgcmV0dXJuIGAke2F2YWlsYWJsZX1weGA7XHJcbiAgfSwgW3JlY29yZGVyT3BlbiwgcmVjb3JkZXJIZWlnaHRQeF0pO1xyXG5cclxuICBjb25zdCBbZWRpdG9ySGVpZ2h0LCBzZXRFZGl0b3JIZWlnaHRdID0gdXNlU3RhdGUoKCkgPT4gY29tcHV0ZUVkaXRvckhlaWdodCgpKTtcclxuXHJcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gdXNlU3RhdGUoKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RvcmVkID0gc2FmZUdldFNlc3Npb25WYWx1ZShzdG9yYWdlS2V5KTtcclxuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gc3RvcmVkICE9PSBudWxsID8gc3RvcmVkIDogU3RyaW5nKGluaXRpYWxWYWx1ZSB8fCBcIlwiKTtcclxuICAgIGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPSBpbml0aWFsVGV4dDtcclxuICAgIHJldHVybiBpbml0aWFsVGV4dDtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiAhaXNSZWFkT25seSAmJiAoaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmcgfHwgdGV4dCAhPT0gKGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPz8gXCJcIikpLFxyXG4gICAgW2lzUmVhZE9ubHksIGlzVHJhbnNjcmliaW5nLCBpc1R5cGluZywgdGV4dF1cclxuICApO1xyXG5cclxuICBjb25zdCBzdG9wVHlwaW5nID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICB0eXBpbmdUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHR5cGluZ1RleHRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICB0eXBpbmdJbmRleFJlZi5jdXJyZW50ID0gMDtcclxuICAgIHNldElzVHlwaW5nKGZhbHNlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHN0YXJ0VHlwaW5nID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZnVsbFRleHQpID0+IHtcclxuICAgICAgY29uc3QgdGV4dFZhbHVlID0gU3RyaW5nKGZ1bGxUZXh0IHx8IFwiXCIpO1xyXG4gICAgICBzdG9wVHlwaW5nKCk7XHJcbiAgICAgIGlmICghdGV4dFZhbHVlKSB7XHJcbiAgICAgICAgc2V0VGV4dChcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHR5cGluZ1RleHRSZWYuY3VycmVudCA9IHRleHRWYWx1ZTtcclxuICAgICAgdHlwaW5nSW5kZXhSZWYuY3VycmVudCA9IDA7XHJcbiAgICAgIHNldElzVHlwaW5nKHRydWUpO1xyXG4gICAgICBzZXRUZXh0KFwiXCIpO1xyXG5cclxuICAgICAgY29uc3QgdG90YWwgPSB0ZXh0VmFsdWUubGVuZ3RoO1xyXG4gICAgICBjb25zdCBtYXhTdGVwcyA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoVFlQRV9UQVJHRVRfTVMgLyBUWVBFX0lOVEVSVkFMX01TKSk7XHJcbiAgICAgIGNvbnN0IHN0ZXBTaXplID0gTWF0aC5taW4oVFlQRV9NQVhfU1RFUCwgTWF0aC5tYXgoVFlQRV9NSU5fU1RFUCwgTWF0aC5jZWlsKHRvdGFsIC8gbWF4U3RlcHMpKSk7XHJcblxyXG4gICAgICBjb25zdCB0aWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBNYXRoLm1pbih0eXBpbmdJbmRleFJlZi5jdXJyZW50ICsgc3RlcFNpemUsIHRvdGFsKTtcclxuICAgICAgICB0eXBpbmdJbmRleFJlZi5jdXJyZW50ID0gbmV4dDtcclxuICAgICAgICBzZXRUZXh0KHR5cGluZ1RleHRSZWYuY3VycmVudC5zbGljZSgwLCBuZXh0KSk7XHJcbiAgICAgICAgaWYgKG5leHQgPCB0b3RhbCkge1xyXG4gICAgICAgICAgdHlwaW5nVGltZXJSZWYuY3VycmVudCA9IHNldFRpbWVvdXQodGljaywgVFlQRV9JTlRFUlZBTF9NUyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgc2V0SXNUeXBpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KHRpY2ssIFRZUEVfSU5URVJWQUxfTVMpO1xyXG4gICAgfSxcclxuICAgIFtzdG9wVHlwaW5nXVxyXG4gICk7XHJcblxyXG4gIC8vIFNlbmQgdGhlIFdBViB0byBNVkMgYW5kIHJlcGxhY2UgdGV4dGFyZWEgd2l0aCB0aGUgdHJhbnNjcmlwdGlvbi5cclxuICBjb25zdCBoYW5kbGVUcmFuc2NyaWJlID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAod2F2QmxvYikgPT4ge1xyXG4gICAgICBpZiAoIXdhdkJsb2IgfHwgaXNUcmFuc2NyaWJpbmcpIHJldHVybjtcclxuXHJcbiAgICAgIC8vIExvY2sgdGhlIGVkaXRvciB3aGlsZSB0aGUgdHJhbnNjcmlwdGlvbiByZXF1ZXN0IGlzIGluIGZsaWdodC5cclxuICAgICAgc2V0SXNUcmFuc2NyaWJpbmcodHJ1ZSk7XHJcbiAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gQnVpbGQgbXVsdGlwYXJ0IGZvcm0gcGF5bG9hZCBleHBlY3RlZCBieSAvVmlzaXRhcy9UcmFuc2NyaWJlU3BlZWNoLlxyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmb3JtLmFwcGVuZChcImxhbmd1YWdlSWRcIiwgXCJhdXRvXCIpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwiYXVkaW9GaWxlXCIsIHdhdkJsb2IsIFwiYXVkaW8ud2F2XCIpO1xyXG4gICAgICAgIGlmIChyZXNvbHZlZFJldHVyblVybCkge1xyXG4gICAgICAgICAgZm9ybS5hcHBlbmQoXCJyZXR1cm5VcmxcIiwgcmVzb2x2ZWRSZXR1cm5VcmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHtcclxuICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxyXG4gICAgICAgICAgLi4uKGNzcmZUb2tlbiA/IHsgUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuOiBjc3JmVG9rZW4gfSA6IHt9KSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZW5kIHRoZSBXQVYgdG8gTVZDIChzZXJ2ZXIgd2lsbCBjYWxsIHRoZSBzcGVlY2ggQVBJKS5cclxuICAgICAgICBjb25zdCBxdWVyeSA9IHJlc29sdmVkUmV0dXJuVXJsID8gYD9yZXR1cm5Vcmw9JHtlbmNvZGVVUklDb21wb25lbnQocmVzb2x2ZWRSZXR1cm5VcmwpfWAgOiBcIlwiO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9WaXNpdGFzL1RyYW5zY3JpYmVTcGVlY2gke3F1ZXJ5fWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICBib2R5OiBmb3JtLFxyXG4gICAgICAgICAgaGVhZGVycyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiBudWxsKTtcclxuICAgICAgICBjb25zdCBvayA9IHJlc3BvbnNlLm9rICYmIHBheWxvYWQgJiYgcGF5bG9hZC5zdWNjZXNzID09PSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgICBjb25zdCBtc2cgPSBwYXlsb2FkICYmIHBheWxvYWQubWVzc2FnZSA/IFN0cmluZyhwYXlsb2FkLm1lc3NhZ2UpIDogaW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZUZhaWxlZFwiLCBcIlRyYW5zY3JpYmUgZmFpbGVkLlwiKTtcclxuICAgICAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihtc2cpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdHJhbnNjcmlwdCA9IHBheWxvYWQgJiYgdHlwZW9mIHBheWxvYWQuZGF0YSA9PT0gXCJzdHJpbmdcIiA/IHBheWxvYWQuZGF0YSA6IFwiXCI7XHJcbiAgICAgICAgaWYgKCF0cmFuc2NyaXB0LnRyaW0oKSkge1xyXG4gICAgICAgICAgc2V0VHJhbnNjcmliZUVycm9yKGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVGYWlsZWRcIiwgXCJUcmFuc2NyaWJlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVwbGFjZSB0aGUgZnVsbCB0ZXh0YXJlYSBjb250ZW50IHdpdGggdGhlIG5ldyB0cmFuc2NyaXB0aW9uLlxyXG4gICAgICAgIHN0YXJ0VHlwaW5nKHRyYW5zY3JpcHQpO1xyXG4gICAgICAgIC8vIEhpZGUgdGhlIHJlY29yZGVyIGFmdGVyIGEgc3VjY2Vzc2Z1bCB0cmFuc2NyaXB0aW9uLlxyXG4gICAgICAgIHNldFJlY29yZGVyT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0UmVjb3JkZXJSZXNldEtleSgoaykgPT4gayArIDEpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zdCBtc2cgPSBlcnIgJiYgZXJyLm1lc3NhZ2UgPyBTdHJpbmcoZXJyLm1lc3NhZ2UpIDogaW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZUZhaWxlZFwiLCBcIlRyYW5zY3JpYmUgZmFpbGVkLlwiKTtcclxuICAgICAgICBzZXRUcmFuc2NyaWJlRXJyb3IobXNnKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAvLyBSZS1lbmFibGUgdGhlIGVkaXRvciBhZnRlciBjb21wbGV0aW9uLlxyXG4gICAgICAgIHNldElzVHJhbnNjcmliaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtpc1RyYW5zY3JpYmluZywgc3RhcnRUeXBpbmddXHJcbiAgKTtcclxuXHJcbiAgLy8gQ2xlYXIgdHJhbnNjcmlwdGlvbiBlcnJvcnMgd2hlbiBhdWRpbyBjaGFuZ2VzLlxyXG4gIGNvbnN0IGhhbmRsZUF1ZGlvQ2xlYXJlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVJlY29yZGluZ0Vycm9yID0gdXNlQ2FsbGJhY2soKG1lc3NhZ2UpID0+IHtcclxuICAgIC8vIFNob3cgYSB3YXJuaW5nIGFjdGlvbiBtYXJrOyBrZWVwIHRoZSByZWNvcmRlciBvcGVuIHRvIGRpc3BsYXkgdGhlIGVycm9yIGxhYmVsLlxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHdpbmRvdy5JTkQgJiYgdHlwZW9mIHdpbmRvdy5JTkQuZmxhc2hBY3Rpb25NYXJrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuSU5ELmZsYXNoQWN0aW9uTWFyayh7IHR5cGU6IFwid2FybmluZ1Byb2Nlc3NcIiwgZHVyYXRpb25NczogMTUwMCB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIGlnbm9yZVxyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgdXBkYXRlSGVpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICBzZXRFZGl0b3JIZWlnaHQoY29tcHV0ZUVkaXRvckhlaWdodCgpKTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlSGVpZ2h0KCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlSGVpZ2h0KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgfTtcclxuICB9LCBbY29tcHV0ZUVkaXRvckhlaWdodF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoIXJlY29yZGVyT3Blbikge1xyXG4gICAgICBzZXRSZWNvcmRlckhlaWdodFB4KDApO1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVsID0gcmVjb3JkZXJCb3hSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3QgbWVhc3VyZSA9ICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgc2V0UmVjb3JkZXJIZWlnaHRQeChNYXRoLm1heCgwLCBNYXRoLmZsb29yKHJlY3QuaGVpZ2h0KSkpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBtZWFzdXJlKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBjb25zdCBybyA9IG5ldyBSZXNpemVPYnNlcnZlcihtZWFzdXJlKTtcclxuICAgICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICAgIHJldHVybiAoKSA9PiByby5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWVhc3VyZSk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgbWVhc3VyZSk7XHJcbiAgfSwgW3JlY29yZGVyT3Blbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4gc3RvcFR5cGluZywgW3N0b3BUeXBpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGhhc0FjdGl2ZVByb2Nlc3MpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1R5cGluZykgcmV0dXJuO1xyXG4gICAgY29uc3QgZWwgPSB0ZXh0YXJlYVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgZWwuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsSGVpZ2h0O1xyXG4gIH0sIFtpc1R5cGluZywgdGV4dF0pO1xyXG5cclxuICBjb25zdCB0b2dnbGVSZWNvcmRlciA9ICgpID0+IHtcclxuICAgIGlmIChpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nKSByZXR1cm47XHJcbiAgICBzZXRUcmFuc2NyaWJlRXJyb3IoXCJcIik7XHJcbiAgICBzZXRSZWNvcmRlck9wZW4oKG9wZW4pID0+IHtcclxuICAgICAgaWYgKG9wZW4pIHNldFJlY29yZGVyUmVzZXRLZXkoKGspID0+IGsgKyAxKTtcclxuICAgICAgcmV0dXJuICFvcGVuO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWxsb3dIaXN0b3J5TmF2ID0gKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kQWxsb3dIaXN0b3J5T25jZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHdpbmRvdy5fX2luZEFsbG93SGlzdG9yeU9uY2UoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuRWRpdCB8fCAhaXNSZWFkT25seSkgcmV0dXJuO1xyXG4gICAgc2V0SXNSZWFkT25seShmYWxzZSk7XHJcbiAgICBpZiAobm9ybWFsaXplZEVkaXRNb2RlS2V5KSBzYWZlU2V0U2Vzc2lvblZhbHVlKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSwgXCJ0cnVlXCIpO1xyXG4gIH0sIFtjYW5FZGl0LCBpc1JlYWRPbmx5LCBub3JtYWxpemVkRWRpdE1vZGVLZXldKTtcclxuXHJcbiAgY29uc3QgcGVyc2lzdERyYWZ0ID0gKCkgPT4ge1xyXG4gICAgLy8gUGVyc2lzdCB0aGUgZHJhZnQgc28gdGhlIHByZXZpb3VzIHBhZ2UgY2FuIHJlc3RvcmUgaXQuXHJcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIHRleHQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdvQmFjayA9ICgpID0+IHtcclxuICAgIHBlcnNpc3REcmFmdCgpO1xyXG4gICAgaWYgKHJlc29sdmVkUmV0dXJuVXJsKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzb2x2ZWRSZXR1cm5Vcmw7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxICYmIGFsbG93SGlzdG9yeU5hdigpKSByZXR1cm47XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ29CYWNrQWZ0ZXJTYXZlID0gKCkgPT4ge1xyXG4gICAgLy8gUHJlZmVyIHJldHVyblVybCBmb3IgZGV0ZXJtaW5pc3RpYyBuYXZpZ2F0aW9uIGFjcm9zcyBicm93c2Vycy5cclxuICAgIGlmIChyZXNvbHZlZFJldHVyblVybCkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc29sdmVkUmV0dXJuVXJsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMSAmJiBhbGxvd0hpc3RvcnlOYXYoKSkgcmV0dXJuO1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uU2F2ZSA9ICgpID0+IHtcclxuICAgIGlmIChpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nKSByZXR1cm47XHJcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIHRleHQpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSkge1xyXG4gICAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSwgXCJ0cnVlXCIpO1xyXG4gICAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKGAke25vcm1hbGl6ZWRFZGl0TW9kZUtleX1fcmV0dXJuYCwgXCIxXCIpO1xyXG4gICAgfVxyXG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICBnb0JhY2tBZnRlclNhdmUoKTtcclxuICB9O1xyXG5cclxuICAvLyBSZXN0b3JlIHRoZSBpbml0aWFsIHRleHQgdmFsdWUgZm9yIHRoaXMgc2Vzc2lvbiB3aXRob3V0IHNhdmluZy5cclxuICBjb25zdCBvbkNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNSZWFkT25seSB8fCBpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZykgcmV0dXJuO1xyXG4gICAgc3RvcFR5cGluZygpO1xyXG4gICAgc2V0VHJhbnNjcmliZUVycm9yKFwiXCIpO1xyXG4gICAgY29uc3QgaW5pdGlhbFRleHQgPSBpbml0aWFsVGV4dFJlZi5jdXJyZW50ID8/IFwiXCI7XHJcbiAgICBzZXRUZXh0KGluaXRpYWxUZXh0KTtcclxuICAgIHNhZmVTZXRTZXNzaW9uVmFsdWUoc3RvcmFnZUtleSwgaW5pdGlhbFRleHQpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSkge1xyXG4gICAgICBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKGAke25vcm1hbGl6ZWRFZGl0TW9kZUtleX1fcmV0dXJuYCk7XHJcbiAgICAgIHNhZmVSZW1vdmVTZXNzaW9uVmFsdWUobm9ybWFsaXplZEVkaXRNb2RlS2V5KTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgZ29CYWNrQWZ0ZXJTYXZlKCk7XHJcbiAgfSwgW2lzUmVhZE9ubHksIGlzVHJhbnNjcmliaW5nLCBpc1R5cGluZywgc3RvcFR5cGluZywgc3RvcmFnZUtleSwgZ29CYWNrQWZ0ZXJTYXZlLCBub3JtYWxpemVkRWRpdE1vZGVLZXldKTtcclxuXHJcbiAgY29uc3QgZWRpdG9yQm94Q2xhc3MgPSBpc1JlYWRPbmx5XHJcbiAgICA/IFwicmVsYXRpdmUgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHNoYWRvdy1sZyBvdmVyZmxvdy1oaWRkZW4gZm9jdXMtd2l0aGluOnJpbmctNCBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5LzQwIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeVwiXHJcbiAgICA6IFwicmVsYXRpdmUgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgYmctd2hpdGUgc2hhZG93LWxnIG92ZXJmbG93LWhpZGRlbiBmb2N1cy13aXRoaW46cmluZy00IGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkvNDAgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5XCI7XHJcbiAgY29uc3QgbWljRGlzYWJsZWQgPSBpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nO1xyXG4gIGNvbnN0IG1pY1JlYWRPbmx5SGludCA9IGluZFQoXCJUZXh0RWRpdG9yX01pY3JvcGhvbmVfUmVhZE9ubHlIaW50XCIsIFwiQXVkaW8gdHJhbnNjcmlwdGlvbiBpcyBhdmFpbGFibGUgb25seSBpbiBlZGl0IG1vZGUuXCIpO1xyXG4gIGNvbnN0IG1pY0Jhc2VMYWJlbCA9IGluZFQoXCJUZXh0RWRpdG9yX01pY3JvcGhvbmVcIiwgXCJNaWNyb3Bob25lXCIpO1xyXG4gIGNvbnN0IG1pY0FyaWFMYWJlbCA9IGlzUmVhZE9ubHkgPyBgJHttaWNCYXNlTGFiZWx9LiAke21pY1JlYWRPbmx5SGludH1gIDogbWljQmFzZUxhYmVsO1xyXG4gIGNvbnN0IG1pY1Rvb2x0aXAgPSBpc1JlYWRPbmx5ID8gbWljUmVhZE9ubHlIaW50IDogbWljQmFzZUxhYmVsO1xyXG4gIGNvbnN0IG1pY0J1dHRvbkNsYXNzID0gYGFic29sdXRlIHRvcC0wIHJpZ2h0LTAgei0yMCBpbmxpbmUtZmxleCBoLVs3MHB4XSB3LVs3MHB4XSBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctdmlzaWJsZSBiZy10cmFuc3BhcmVudCBwLTAgbS0wIGJvcmRlci0wIHJvdW5kZWQtbm9uZSB0ZXh0LXByaW1hcnkgc2hhZG93LW5vbmUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0wIGZvY3VzOnJpbmctb2Zmc2V0LTAke1xyXG4gICAgbWljRGlzYWJsZWRcclxuICAgICAgPyBpc1JlYWRPbmx5XHJcbiAgICAgICAgPyBcIiBvcGFjaXR5LTcwIGN1cnNvci1ub3QtYWxsb3dlZCB0ZXh0LXNsYXRlLTQwMFwiXHJcbiAgICAgICAgOiBcIiBvcGFjaXR5LTcwIGN1cnNvci1ub3QtYWxsb3dlZCB0ZXh0LXByaW1hcnkvNjBcIlxyXG4gICAgICA6IFwiIGhvdmVyOnRleHQtcHJpbWFyeS84MFwiXHJcbiAgfWA7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBoLWR2aCB3LWZ1bGwgZmxleCBmbGV4LWNvbCBiZy1zbGF0ZS0yMDBcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BiYXIgc2hhZG93LW1kXCI+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJUb3BiYXJfQmFja1wiLCBcIkJhY2tcIil9XHJcbiAgICAgICAgICBvbkNsaWNrPXtnb0JhY2t9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPENoZXZyb25MZWZ0SWNvbiBjbGFzc05hbWU9XCJoLTYgdy02XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BiYXItY2VudGVyIGZsZXgtMSBmbGV4IGp1c3RpZnktY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmUgcHgtMlwiPlxyXG4gICAgICAgICAgPHNwYW4gaWQ9XCJ0b3BiYXJUaXRsZVwiIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XHJcbiAgICAgICAgICAgIHtmaWVsZExhYmVsfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7aXNSZWFkT25seSA/IChcclxuICAgICAgICAgIGNhbkVkaXQgPyAoXHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0VkaXRcIiwgXCJFZGl0XCIpfVxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2VuYWJsZUVkaXR9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTYgdy02XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE2Ljg2MiA0LjQ4NyAxLjY4Ny0xLjY4OGExLjg3NSAxLjg3NSAwIDEgMSAyLjY1MiAyLjY1Mkw2LjgzMiAxOS44MmE0LjUgNC41IDAgMCAxLTEuODk3IDEuMTNsLTIuNjg1LjguOC0yLjY4NWE0LjUgNC41IDAgMCAxIDEuMTMtMS44OTdMMTYuODYzIDQuNDg3Wm0wIDBMMTkuNSA3LjEyNVwiIC8+XHJcbiAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyB3aWR0aDogXCIyNXB4XCIsIGhlaWdodDogXCIyNXB4XCIgfX0gLz5cclxuICAgICAgICAgIClcclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtWzE0cHhdIHByLTFcIj5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRvcGJhci1idG5cIlxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIil9XHJcbiAgICAgICAgICAgICAgb25DbGljaz17b25TYXZlfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTYgdy02XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm00LjUgMTIuNzUgNiA2IDktMTMuNVwiIC8+XHJcbiAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wYmFyLWJ0blwiXHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XHJcbiAgICAgICAgICAgICAgb25DbGljaz17b25DYW5jZWxFZGl0fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTYgdy02XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk02IDE4IDE4IDZNNiA2bDEyIDEyXCIgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi1oLTAgdy1mdWxsIHB4LTQgcGItNCBwdC0zXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctM3hsIG14LWF1dG9cIiBzdHlsZT17eyBtYXJnaW5Ub3A6IGAke09VVEVSX01BUkdJTn1weGAsIG1hcmdpbkJvdHRvbTogYCR7T1VURVJfTUFSR0lOfXB4YCB9fT5cclxuICAgICAgICAgIHtyZWNvcmRlck9wZW4gJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17cmVjb3JkZXJCb3hSZWZ9IGNsYXNzTmFtZT1cIm1iLTMgdy1mdWxsXCI+XHJcbiAgICAgICAgICAgICAgPEF1ZGlvUmVjb3JkZXJNaW5pbWFsXHJcbiAgICAgICAgICAgICAgICBrZXk9e3JlY29yZGVyUmVzZXRLZXl9XHJcbiAgICAgICAgICAgICAgICBlbWJlZGRlZFxyXG4gICAgICAgICAgICAgICAgb25UcmFuc2NyaWJlPXtoYW5kbGVUcmFuc2NyaWJlfVxyXG4gICAgICAgICAgICAgICAgaGlkZVRyYW5zY3JpYmVCdXR0b25cclxuICAgICAgICAgICAgICAgIGF1dG9UcmFuc2NyaWJlT25TdG9wXHJcbiAgICAgICAgICAgICAgICB0cmFuc2NyaWJlQnVzeT17aXNUcmFuc2NyaWJpbmd9XHJcbiAgICAgICAgICAgICAgICB0cmFuc2NyaWJlTGFiZWw9e2luZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVcIiwgXCJUcmFuc2NyaWJlXCIpfVxyXG4gICAgICAgICAgICAgICAgdHJhbnNjcmliZUJ1c3lMYWJlbD17aW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliaW5nXCIsIFwiVHJhbnNjcmliaW5nXCIpfVxyXG4gICAgICAgICAgICAgICAgb25BdWRpb0NsZWFyZWQ9e2hhbmRsZUF1ZGlvQ2xlYXJlZH1cclxuICAgICAgICAgICAgICAgIG9uUmVjb3JkaW5nRXJyb3I9e2hhbmRsZVJlY29yZGluZ0Vycm9yfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICB7dHJhbnNjcmliZUVycm9yID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTMgdGV4dC14cyB0ZXh0LXJvc2UtNzAwIHRleHQtY2VudGVyXCI+e3RyYW5zY3JpYmVFcnJvcn08L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtlZGl0b3JCb3hDbGFzc30+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgIHJlZj17dGV4dGFyZWFSZWZ9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHJlc2l6ZS1ub25lIGJnLXRyYW5zcGFyZW50IHB4LTUgcGItNSBwdC0xMCBwci0xNCBmb2N1czpvdXRsaW5lLWhpZGRlbiAke2lzUmVhZE9ubHkgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwifWB9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3RleHR9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUZXh0KGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgYXJpYS1yZWFkb25seT17aXNSZWFkT25seSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgIGFyaWEtYnVzeT17aXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiBlZGl0b3JIZWlnaHQgfX1cclxuICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgIHtpc1RyYW5zY3JpYmluZyA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS0yMDAvODBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtMTYgdy0xNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj57aW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliaW5nXCIsIFwiVHJhbnNjcmliaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e21pY0J1dHRvbkNsYXNzfVxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXttaWNBcmlhTGFiZWx9XHJcbiAgICAgICAgICAgIHRpdGxlPXttaWNUb29sdGlwfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVSZWNvcmRlcn1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e21pY0Rpc2FibGVkfVxyXG4gICAgICAgICAgICBhcmlhLWRpc2FibGVkPXttaWNEaXNhYmxlZCA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge2lzUmVhZE9ubHkgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxMb2NrQ2xvc2VkSWNvbiBjbGFzc05hbWU9XCJoLTYgdy02IHJlbGF0aXZlIHotMTBcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxQdWxzZVJpbmdzTXVsdGlwbGVJY29uIHNpemU9ezI0MH0gcGFkZGluZz17MTJ9IGNvbG9yPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezJ9IG9wYWNpdHk9ezAuM30gcm90YXRpb249ezkwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC02IHctNiByZWxhdGl2ZSB6LTEwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMiAxOC43NWE2IDYgMCAwIDAgNi02di0xLjVtLTYgNy41YTYgNiAwIDAgMS02LTZ2LTEuNW02IDcuNXYzLjc1bS0zLjc1IDBoNy41TTEyIDE1Ljc1YTMgMyAwIDAgMS0zLTNWNC41YTMgMyAwIDEgMSA2IDB2OC4yNWEzIDMgMCAwIDEtMyAzWlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gTW91bnQgdGhlIHRleHQgZWRpdG9yIGludG8gdGhlIFJhem9yIHZpZXcuXHJcbmV4cG9ydCBjb25zdCBtb3VudFRleHRFZGl0b3IgPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmQtdGV4dC1lZGl0b3Itcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCBmaWVsZElkID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtZmllbGQtaWRcIikgfHwgXCJcIjtcclxuICBjb25zdCBmaWVsZExhYmVsID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtZmllbGQtbGFiZWxcIikgfHwgXCJcIjtcclxuICBjb25zdCBpbml0aWFsVmFsdWUgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1maWVsZC12YWx1ZVwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IHJldHVyblVybCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJldHVybi11cmxcIikgfHwgXCJcIjtcclxuICBjb25zdCByZWFkT25seUF0dHIgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1yZWFkLW9ubHlcIikgfHwgXCJcIjtcclxuICBjb25zdCBpbml0aWFsUmVhZE9ubHkgPVxyXG4gICAgcGFyc2VCb29sKHJlYWRPbmx5QXR0cikgfHwgcGFyc2VCb29sKGdldFF1ZXJ5UGFyYW0oXCJyZWFkT25seVwiKSkgfHwgcGFyc2VCb29sKGdldFF1ZXJ5UGFyYW0oXCJyZWFkb25seVwiKSk7XHJcbiAgY29uc3QgYWxsb3dFZGl0QXR0ciA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFsbG93LWVkaXRcIikgfHwgXCJcIjtcclxuICBjb25zdCBhbGxvd0VkaXRRdWVyeSA9IGdldFF1ZXJ5UGFyYW0oXCJhbGxvd0VkaXRcIikgfHwgZ2V0UXVlcnlQYXJhbShcImNhbkVkaXRcIik7XHJcbiAgY29uc3QgYWxsb3dFZGl0ID0gcGFyc2VPcHRpb25hbEJvb2woYWxsb3dFZGl0UXVlcnksIHBhcnNlT3B0aW9uYWxCb29sKGFsbG93RWRpdEF0dHIsIHRydWUpKTtcclxuICBjb25zdCBlZGl0TW9kZUtleUF0dHIgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1lZGl0LW1vZGUta2V5XCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgZWRpdE1vZGVLZXkgPSBlZGl0TW9kZUtleUF0dHIgfHwgZ2V0UXVlcnlQYXJhbShcImVkaXRNb2RlS2V5XCIpIHx8IFwiXCI7XHJcblxyXG4gIG1vdW50UmVhY3RJc2xhbmQoXHJcbiAgICByb290RWwsXHJcbiAgICA8SW5kVGV4dEVkaXRvckFwcFxyXG4gICAgICBmaWVsZElkPXtmaWVsZElkfVxyXG4gICAgICBmaWVsZExhYmVsPXtmaWVsZExhYmVsfVxyXG4gICAgICBpbml0aWFsVmFsdWU9e2luaXRpYWxWYWx1ZX1cclxuICAgICAgcmV0dXJuVXJsPXtyZXR1cm5Vcmx9XHJcbiAgICAgIGluaXRpYWxSZWFkT25seT17aW5pdGlhbFJlYWRPbmx5fVxyXG4gICAgICBlZGl0TW9kZUtleT17ZWRpdE1vZGVLZXl9XHJcbiAgICAgIGFsbG93RWRpdD17YWxsb3dFZGl0fVxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuLy8gQXV0by1tb3VudCB3aGVuIHRoZSBwYWdlIGJ1bmRsZSBsb2Fkcy5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgbW91bnRUZXh0RWRpdG9yKCk7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuZXhwb3J0IGRlZmF1bHQgSW5kVGV4dEVkaXRvckFwcDtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgUHVsc2VSaW5nc011bHRpcGxlSWNvblByb3BzID0ge1xyXG4gIHNpemU/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgY29sb3I/OiBzdHJpbmc7XHJcbiAgc3Ryb2tlV2lkdGg/OiBudW1iZXI7XHJcbiAgYmFja2dyb3VuZD86IHN0cmluZztcclxuICBvcGFjaXR5PzogbnVtYmVyO1xyXG4gIHJvdGF0aW9uPzogbnVtYmVyO1xyXG4gIHNoYWRvdz86IG51bWJlcjtcclxuICBmbGlwSG9yaXpvbnRhbD86IGJvb2xlYW47XHJcbiAgZmxpcFZlcnRpY2FsPzogYm9vbGVhbjtcclxuICBwYWRkaW5nPzogbnVtYmVyO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbi8vIFB1bHNlIHJpbmdzIGljb24gd2l0aCBDU1MgYW5pbWF0aW9uIHRvIGF2b2lkIFNNSUwgY29tcGF0aWJpbGl0eSBpc3N1ZXMuXHJcbmNvbnN0IFB1bHNlUmluZ3NNdWx0aXBsZUljb24gPSAoe1xyXG4gIHNpemUsXHJcbiAgY29sb3IgPSBcImN1cnJlbnRDb2xvclwiLFxyXG4gIHN0cm9rZVdpZHRoID0gMixcclxuICBiYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudFwiLFxyXG4gIG9wYWNpdHkgPSAwLjQsXHJcbiAgcm90YXRpb24gPSA5MCxcclxuICBzaGFkb3cgPSAwLFxyXG4gIGZsaXBIb3Jpem9udGFsID0gZmFsc2UsXHJcbiAgZmxpcFZlcnRpY2FsID0gZmFsc2UsXHJcbiAgcGFkZGluZyA9IDEyLFxyXG4gIGNsYXNzTmFtZSxcclxufTogUHVsc2VSaW5nc011bHRpcGxlSWNvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgdHJhbnNmb3JtcyA9IFtdO1xyXG4gIGlmIChyb3RhdGlvbiAhPT0gMCkgdHJhbnNmb3Jtcy5wdXNoKGByb3RhdGUoJHtyb3RhdGlvbn1kZWcpYCk7XHJcbiAgaWYgKGZsaXBIb3Jpem9udGFsKSB0cmFuc2Zvcm1zLnB1c2goXCJzY2FsZVgoLTEpXCIpO1xyXG4gIGlmIChmbGlwVmVydGljYWwpIHRyYW5zZm9ybXMucHVzaChcInNjYWxlWSgtMSlcIik7XHJcblxyXG4gIGNvbnN0IHZpZXdCb3hTaXplID0gMjQgKyBwYWRkaW5nICogMjtcclxuICBjb25zdCB2aWV3Qm94T2Zmc2V0ID0gLXBhZGRpbmc7XHJcbiAgY29uc3Qgdmlld0JveCA9IGAke3ZpZXdCb3hPZmZzZXR9ICR7dmlld0JveE9mZnNldH0gJHt2aWV3Qm94U2l6ZX0gJHt2aWV3Qm94U2l6ZX1gO1xyXG4gIGNvbnN0IHJpbmdQYXRoID1cclxuICAgIFwiTTEyLDFBMTEsMTEsMCwxLDAsMjMsMTIsMTEsMTEsMCwwLDAsMTIsMVptMCwyMGE5LDksMCwxLDEsOS05QTksOSwwLDAsMSwxMiwyMVpcIjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIHZpZXdCb3g9e3ZpZXdCb3h9XHJcbiAgICAgIHdpZHRoPXtzaXplfVxyXG4gICAgICBoZWlnaHQ9e3NpemV9XHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgc3Ryb2tlPXtjb2xvcn1cclxuICAgICAgc3Ryb2tlV2lkdGg9e3N0cm9rZVdpZHRofVxyXG4gICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgb3BhY2l0eSxcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybXMuam9pbihcIiBcIikgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIGZpbHRlcjogc2hhZG93ID4gMCA/IGBkcm9wLXNoYWRvdygwICR7c2hhZG93fXB4ICR7c2hhZG93ICogMn1weCByZ2JhKDAsMCwwLDAuMykpYCA6IHVuZGVmaW5lZCxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmQgIT09IFwidHJhbnNwYXJlbnRcIiA/IGJhY2tncm91bmQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgY29sb3I6IGNvbG9yLFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJpbmQtcHVsc2UtcmluZy0tYmFzZVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPXtyaW5nUGF0aH0gLz5cclxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmdcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XHJcbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImluZC1wdWxzZS1yaW5nIGluZC1wdWxzZS1yaW5nLS1kZWxheS0xXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9e3JpbmdQYXRofSAvPlxyXG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJpbmQtcHVsc2UtcmluZyBpbmQtcHVsc2UtcmluZy0tZGVsYXktMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPXtyaW5nUGF0aH0gLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQdWxzZVJpbmdzTXVsdGlwbGVJY29uO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTs7O0FDMENyRTtBQXpCSixJQUFNLHlCQUF5QixDQUFDO0FBQUEsRUFDOUI7QUFBQSxFQUNBLFFBQVE7QUFBQSxFQUNSLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUNiLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLFNBQVM7QUFBQSxFQUNULGlCQUFpQjtBQUFBLEVBQ2pCLGVBQWU7QUFBQSxFQUNmLFVBQVU7QUFBQSxFQUNWO0FBQ0YsTUFBbUM7QUFDakMsUUFBTSxhQUFhLENBQUM7QUFDcEIsTUFBSSxhQUFhLEVBQUcsWUFBVyxLQUFLLFVBQVUsUUFBUSxNQUFNO0FBQzVELE1BQUksZUFBZ0IsWUFBVyxLQUFLLFlBQVk7QUFDaEQsTUFBSSxhQUFjLFlBQVcsS0FBSyxZQUFZO0FBRTlDLFFBQU0sY0FBYyxLQUFLLFVBQVU7QUFDbkMsUUFBTSxnQkFBZ0IsQ0FBQztBQUN2QixRQUFNLFVBQVUsR0FBRyxhQUFhLElBQUksYUFBYSxJQUFJLFdBQVcsSUFBSSxXQUFXO0FBQy9FLFFBQU0sV0FDSjtBQUVGLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLE9BQU07QUFBQSxNQUNOO0FBQUEsTUFDQSxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixNQUFLO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUjtBQUFBLE1BQ0EsZUFBYztBQUFBLE1BQ2QsZ0JBQWU7QUFBQSxNQUNmO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsV0FBVyxXQUFXLEtBQUssR0FBRyxLQUFLO0FBQUEsUUFDbkMsUUFBUSxTQUFTLElBQUksaUJBQWlCLE1BQU0sTUFBTSxTQUFTLENBQUMsd0JBQXdCO0FBQUEsUUFDcEYsaUJBQWlCLGVBQWUsZ0JBQWdCLGFBQWE7QUFBQSxRQUM3RDtBQUFBLE1BQ0Y7QUFBQSxNQUVBO0FBQUEsb0RBQUMsVUFBSyxXQUFVLHdCQUF1QixNQUFLLGdCQUFlLEdBQUcsVUFBVTtBQUFBLFFBQ3hFLDRDQUFDLFVBQUssV0FBVSxrQkFBaUIsTUFBSyxnQkFBZSxHQUFHLFVBQVU7QUFBQSxRQUNsRSw0Q0FBQyxVQUFLLFdBQVUsMENBQXlDLE1BQUssZ0JBQWUsR0FBRyxVQUFVO0FBQUEsUUFDMUYsNENBQUMsVUFBSyxXQUFVLDBDQUF5QyxNQUFLLGdCQUFlLEdBQUcsVUFBVTtBQUFBO0FBQUE7QUFBQSxFQUM1RjtBQUVKO0FBRUEsSUFBTyxpQ0FBUTs7O0FEbENYLElBQUFBLHNCQUFBO0FBM0JKLElBQU0sV0FBVyxXQUFXLGdCQUFnQixDQUFDO0FBQzdDLElBQU0sT0FBTyxDQUFDLEtBQUssYUFBYyxZQUFZLE9BQU8sU0FBUyxHQUFHLE1BQU0sWUFBWSxTQUFTLEdBQUcsS0FBTSxZQUFZO0FBRWhILElBQU0saUJBQWlCO0FBQ3ZCLElBQU0sZ0JBQWdCO0FBQ3RCLElBQU0sZUFBZTtBQUNyQixJQUFNLG9CQUFvQjtBQUMxQixJQUFNLGVBQWU7QUFDckIsSUFBTSxtQkFBbUI7QUFDekIsSUFBTSxpQkFBaUI7QUFDdkIsSUFBTSxnQkFBZ0I7QUFDdEIsSUFBTSxnQkFBZ0I7QUFDdEIsSUFBTSw2QkFBNkIsS0FBSyxLQUFLLEtBQUs7QUFRbEQsSUFBTSxVQUFVLENBQUMsRUFBRSxPQUFPLFdBQVcsUUFBUSxHQUFHLE1BQzlDO0FBQUEsRUFBQztBQUFBO0FBQUEsSUFDQyxXQUFXLGVBQWUsSUFBSTtBQUFBLElBQzlCLFNBQVE7QUFBQSxJQUNSLE1BQUs7QUFBQSxJQUNMLGNBQVksU0FBUyxLQUFLLGtCQUFrQixTQUFTO0FBQUEsSUFFckQsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUk7QUFBQTtBQUNoRjtBQUdGLElBQU0sZUFBZSxNQUFNO0FBQ3pCLFFBQU0sT0FBTyxTQUFTLGNBQWMseUJBQXlCO0FBQzdELFNBQU8sT0FBTyxLQUFLLGFBQWEsU0FBUyxJQUFJO0FBQy9DO0FBRUEsU0FBUyxvQkFBb0IsS0FBSztBQUNoQyxTQUFPLDBCQUEwQixHQUFHO0FBQ3RDO0FBRUEsU0FBUyxvQkFBb0IsS0FBSyxPQUFPO0FBQ3ZDLDRCQUEwQixLQUFLLE9BQU8sMEJBQTBCO0FBQ2xFO0FBR0EsU0FBUyx1QkFBdUIsS0FBSztBQUNuQywrQkFBNkIsR0FBRztBQUNsQztBQUVBLFNBQVMsVUFBVSxPQUFPO0FBQ3hCLFFBQU0sYUFBYSxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQzFELFNBQU8sZUFBZSxPQUFPLGVBQWUsVUFBVSxlQUFlO0FBQ3ZFO0FBR0EsU0FBUyxrQkFBa0IsT0FBTyxVQUFVO0FBQzFDLFFBQU0sYUFBYSxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDNUMsTUFBSSxDQUFDLFdBQVksUUFBTztBQUN4QixTQUFPLFVBQVUsVUFBVTtBQUM3QjtBQUVBLFNBQVMsY0FBYyxLQUFLO0FBQzFCLE1BQUksT0FBTyxXQUFXLFlBQWEsUUFBTztBQUMxQyxNQUFJO0FBQ0YsV0FBTyxJQUFJLGdCQUFnQixPQUFPLFNBQVMsVUFBVSxFQUFFLEVBQUUsSUFBSSxHQUFHLEtBQUs7QUFBQSxFQUN2RSxRQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVBLFNBQVMscUJBQXFCLE9BQU87QUFDbkMsUUFBTSxNQUFNLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUNyQyxNQUFJLENBQUMsSUFBSyxRQUFPO0FBQ2pCLFNBQU8sSUFBSSxXQUFXLGlCQUFpQixJQUFJLE1BQU07QUFDbkQ7QUFFQSxTQUFTLGlCQUFpQixFQUFFLFNBQVMsWUFBWSxjQUFjLFdBQVcsa0JBQWtCLE9BQU8sY0FBYyxJQUFJLFlBQVksS0FBSyxHQUFHO0FBQ3ZJLFFBQU0saUJBQWEsc0JBQVEsTUFBTSxHQUFHLGNBQWMsR0FBRyxPQUFPLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBRTlGLFFBQU0sd0JBQW9CLHNCQUFRLE1BQU07QUFDdEMsVUFBTSxTQUFTLE9BQU8sY0FBYyxXQUFXLFVBQVUsS0FBSyxJQUFJO0FBQ2xFLFFBQUksT0FBUSxRQUFPO0FBQ25CLFVBQU0sU0FBUyxPQUFPLFdBQVcsRUFBRSxFQUFFLEtBQUs7QUFDMUMsUUFBSSxDQUFDLE9BQVEsUUFBTztBQUNwQixRQUFJO0FBQ0YsWUFBTSxTQUFTLDBCQUEwQixHQUFHLGNBQWMsR0FBRyxNQUFNLFlBQVk7QUFDL0UsYUFBTyxTQUFTLE9BQU8sTUFBTSxFQUFFLEtBQUssSUFBSTtBQUFBLElBQzFDLFFBQVE7QUFDTixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0YsR0FBRyxDQUFDLFNBQVMsU0FBUyxDQUFDO0FBQ3ZCLFFBQU0sVUFBVSxDQUFDLENBQUM7QUFDbEIsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHVCQUFTLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPO0FBQzFFLFFBQU0sNEJBQXdCLHNCQUFRLE1BQU0scUJBQXFCLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQztBQUM1RixRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksdUJBQVMsS0FBSztBQUN0RCxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHVCQUFTLENBQUM7QUFDMUQsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx1QkFBUyxDQUFDO0FBQzFELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksdUJBQVMsS0FBSztBQUMxRCxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixRQUFJLHVCQUFTLEVBQUU7QUFDekQsUUFBTSxDQUFDLFVBQVUsV0FBVyxRQUFJLHVCQUFTLEtBQUs7QUFDOUMsUUFBTSxxQkFBaUIscUJBQU8sSUFBSTtBQUNsQyxRQUFNLHFCQUFpQixxQkFBTyxJQUFJO0FBQ2xDLFFBQU0sb0JBQWdCLHFCQUFPLEVBQUU7QUFDL0IsUUFBTSxxQkFBaUIscUJBQU8sQ0FBQztBQUMvQixRQUFNLHFCQUFpQixxQkFBTyxFQUFFO0FBQ2hDLFFBQU0sa0JBQWMscUJBQU8sSUFBSTtBQUMvQixRQUFNLDBCQUFzQiwwQkFBWSxNQUFNO0FBQzVDLFFBQUksT0FBTyxXQUFXLGFBQWE7QUFDakMsWUFBTSxXQUFXLGdCQUFnQixnQkFBZ0IsZUFBZSxDQUFDO0FBQ2pFLGFBQU87QUFBQSxJQUNUO0FBQ0EsVUFBTSxXQUFXLE9BQU8sZUFBZTtBQUN2QyxRQUFJLENBQUMsVUFBVTtBQUNiLGFBQU8sZ0JBQWdCLGdCQUFnQixlQUFlLENBQUM7QUFBQSxJQUN6RDtBQUNBLFVBQU0sZ0JBQWdCLGVBQWUsbUJBQW1CLGVBQWU7QUFDdkUsVUFBTSxZQUFZLEtBQUssSUFBSSxXQUFXLGdCQUFnQixlQUFlLElBQUksZUFBZSxpQkFBaUI7QUFDekcsV0FBTyxHQUFHLFNBQVM7QUFBQSxFQUNyQixHQUFHLENBQUMsY0FBYyxnQkFBZ0IsQ0FBQztBQUVuQyxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksdUJBQVMsTUFBTSxvQkFBb0IsQ0FBQztBQUU1RSxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksdUJBQVMsTUFBTTtBQUNyQyxVQUFNLFNBQVMsb0JBQW9CLFVBQVU7QUFDN0MsVUFBTSxjQUFjLFdBQVcsT0FBTyxTQUFTLE9BQU8sZ0JBQWdCLEVBQUU7QUFDeEUsbUJBQWUsVUFBVTtBQUN6QixXQUFPO0FBQUEsRUFDVCxDQUFDO0FBRUQsUUFBTSx1QkFBbUI7QUFBQSxJQUN2QixNQUFNLENBQUMsZUFBZSxrQkFBa0IsWUFBWSxVQUFVLGVBQWUsV0FBVztBQUFBLElBQ3hGLENBQUMsWUFBWSxnQkFBZ0IsVUFBVSxJQUFJO0FBQUEsRUFDN0M7QUFFQSxRQUFNLGlCQUFhLDBCQUFZLE1BQU07QUFDbkMsUUFBSSxlQUFlLFNBQVM7QUFDMUIsbUJBQWEsZUFBZSxPQUFPO0FBQ25DLHFCQUFlLFVBQVU7QUFBQSxJQUMzQjtBQUNBLGtCQUFjLFVBQVU7QUFDeEIsbUJBQWUsVUFBVTtBQUN6QixnQkFBWSxLQUFLO0FBQUEsRUFDbkIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGtCQUFjO0FBQUEsSUFDbEIsQ0FBQyxhQUFhO0FBQ1osWUFBTSxZQUFZLE9BQU8sWUFBWSxFQUFFO0FBQ3ZDLGlCQUFXO0FBQ1gsVUFBSSxDQUFDLFdBQVc7QUFDZCxnQkFBUSxFQUFFO0FBQ1Y7QUFBQSxNQUNGO0FBRUEsb0JBQWMsVUFBVTtBQUN4QixxQkFBZSxVQUFVO0FBQ3pCLGtCQUFZLElBQUk7QUFDaEIsY0FBUSxFQUFFO0FBRVYsWUFBTSxRQUFRLFVBQVU7QUFDeEIsWUFBTSxXQUFXLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxpQkFBaUIsZ0JBQWdCLENBQUM7QUFDMUUsWUFBTSxXQUFXLEtBQUssSUFBSSxlQUFlLEtBQUssSUFBSSxlQUFlLEtBQUssS0FBSyxRQUFRLFFBQVEsQ0FBQyxDQUFDO0FBRTdGLFlBQU0sT0FBTyxNQUFNO0FBQ2pCLGNBQU0sT0FBTyxLQUFLLElBQUksZUFBZSxVQUFVLFVBQVUsS0FBSztBQUM5RCx1QkFBZSxVQUFVO0FBQ3pCLGdCQUFRLGNBQWMsUUFBUSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzVDLFlBQUksT0FBTyxPQUFPO0FBQ2hCLHlCQUFlLFVBQVUsV0FBVyxNQUFNLGdCQUFnQjtBQUFBLFFBQzVELE9BQU87QUFDTCx5QkFBZSxVQUFVO0FBQ3pCLHNCQUFZLEtBQUs7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFFQSxxQkFBZSxVQUFVLFdBQVcsTUFBTSxnQkFBZ0I7QUFBQSxJQUM1RDtBQUFBLElBQ0EsQ0FBQyxVQUFVO0FBQUEsRUFDYjtBQUdBLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTyxZQUFZO0FBQ2pCLFVBQUksQ0FBQyxXQUFXLGVBQWdCO0FBR2hDLHdCQUFrQixJQUFJO0FBQ3RCLHlCQUFtQixFQUFFO0FBRXJCLFVBQUk7QUFFRixjQUFNLE9BQU8sSUFBSSxTQUFTO0FBQzFCLGFBQUssT0FBTyxjQUFjLE1BQU07QUFDaEMsYUFBSyxPQUFPLGFBQWEsU0FBUyxXQUFXO0FBQzdDLFlBQUksbUJBQW1CO0FBQ3JCLGVBQUssT0FBTyxhQUFhLGlCQUFpQjtBQUFBLFFBQzVDO0FBRUEsY0FBTSxZQUFZLGFBQWE7QUFDL0IsY0FBTSxVQUFVO0FBQUEsVUFDZCxRQUFRO0FBQUEsVUFDUixvQkFBb0I7QUFBQSxVQUNwQixHQUFJLFlBQVksRUFBRSwwQkFBMEIsVUFBVSxJQUFJLENBQUM7QUFBQSxRQUM3RDtBQUdBLGNBQU0sUUFBUSxvQkFBb0IsY0FBYyxtQkFBbUIsaUJBQWlCLENBQUMsS0FBSztBQUMxRixjQUFNLFdBQVcsTUFBTSxNQUFNLDRCQUE0QixLQUFLLElBQUk7QUFBQSxVQUNoRSxRQUFRO0FBQUEsVUFDUixNQUFNO0FBQUEsVUFDTjtBQUFBLFFBQ0YsQ0FBQztBQUVELGNBQU0sVUFBVSxNQUFNLFNBQVMsS0FBSyxFQUFFLE1BQU0sTUFBTSxJQUFJO0FBQ3RELGNBQU0sS0FBSyxTQUFTLE1BQU0sV0FBVyxRQUFRLFlBQVk7QUFFekQsWUFBSSxDQUFDLElBQUk7QUFDUCxnQkFBTSxNQUFNLFdBQVcsUUFBUSxVQUFVLE9BQU8sUUFBUSxPQUFPLElBQUksS0FBSywrQkFBK0Isb0JBQW9CO0FBQzNILDZCQUFtQixHQUFHO0FBQ3RCO0FBQUEsUUFDRjtBQUVBLGNBQU0sYUFBYSxXQUFXLE9BQU8sUUFBUSxTQUFTLFdBQVcsUUFBUSxPQUFPO0FBQ2hGLFlBQUksQ0FBQyxXQUFXLEtBQUssR0FBRztBQUN0Qiw2QkFBbUIsS0FBSywrQkFBK0Isb0JBQW9CLENBQUM7QUFDNUU7QUFBQSxRQUNGO0FBR0Esb0JBQVksVUFBVTtBQUV0Qix3QkFBZ0IsS0FBSztBQUNyQiw0QkFBb0IsQ0FBQyxNQUFNLElBQUksQ0FBQztBQUFBLE1BQ2xDLFNBQVMsS0FBSztBQUNaLGNBQU0sTUFBTSxPQUFPLElBQUksVUFBVSxPQUFPLElBQUksT0FBTyxJQUFJLEtBQUssK0JBQStCLG9CQUFvQjtBQUMvRywyQkFBbUIsR0FBRztBQUFBLE1BQ3hCLFVBQUU7QUFFQSwwQkFBa0IsS0FBSztBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxnQkFBZ0IsV0FBVztBQUFBLEVBQzlCO0FBR0EsUUFBTSx5QkFBcUIsMEJBQVksTUFBTTtBQUMzQyx1QkFBbUIsRUFBRTtBQUFBLEVBQ3ZCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSwyQkFBdUIsMEJBQVksQ0FBQyxZQUFZO0FBRXBELFFBQUk7QUFDRixVQUFJLE9BQU8sT0FBTyxPQUFPLE9BQU8sSUFBSSxvQkFBb0IsWUFBWTtBQUNsRSxlQUFPLElBQUksZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsWUFBWSxLQUFLLENBQUM7QUFBQSxNQUN6RTtBQUFBLElBQ0YsUUFBUTtBQUFBLElBRVI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsOEJBQVUsTUFBTTtBQUNkLFFBQUksT0FBTyxXQUFXLFlBQWEsUUFBTztBQUMxQyxVQUFNLGVBQWUsTUFBTTtBQUN6QixzQkFBZ0Isb0JBQW9CLENBQUM7QUFBQSxJQUN2QztBQUVBLGlCQUFhO0FBQ2IsV0FBTyxpQkFBaUIsVUFBVSxZQUFZO0FBQzlDLFdBQU8saUJBQWlCLHFCQUFxQixZQUFZO0FBQ3pELFdBQU8sTUFBTTtBQUNYLGFBQU8sb0JBQW9CLFVBQVUsWUFBWTtBQUNqRCxhQUFPLG9CQUFvQixxQkFBcUIsWUFBWTtBQUFBLElBQzlEO0FBQUEsRUFDRixHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFFeEIsOEJBQVUsTUFBTTtBQUNkLFFBQUksT0FBTyxXQUFXLFlBQWEsUUFBTztBQUMxQyxRQUFJLENBQUMsY0FBYztBQUNqQiwwQkFBb0IsQ0FBQztBQUNyQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sS0FBSyxlQUFlO0FBQzFCLFFBQUksQ0FBQyxHQUFJLFFBQU87QUFFaEIsVUFBTSxVQUFVLE1BQU07QUFDcEIsVUFBSTtBQUNGLGNBQU0sT0FBTyxHQUFHLHNCQUFzQjtBQUN0Qyw0QkFBb0IsS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUM7QUFBQSxNQUMxRCxRQUFRO0FBQUEsTUFFUjtBQUFBLElBQ0Y7QUFFQSxZQUFRO0FBRVIsUUFBSSxPQUFPLG1CQUFtQixhQUFhO0FBQ3pDLFlBQU0sS0FBSyxJQUFJLGVBQWUsT0FBTztBQUNyQyxTQUFHLFFBQVEsRUFBRTtBQUNiLGFBQU8sTUFBTSxHQUFHLFdBQVc7QUFBQSxJQUM3QjtBQUVBLFdBQU8saUJBQWlCLFVBQVUsT0FBTztBQUN6QyxXQUFPLE1BQU0sT0FBTyxvQkFBb0IsVUFBVSxPQUFPO0FBQUEsRUFDM0QsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUVqQiw4QkFBVSxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUM7QUFFeEMsOEJBQVUsTUFBTTtBQUNkLFdBQU8sMEJBQTBCLGdCQUFnQjtBQUNqRCxXQUFPLE1BQU07QUFDWCxhQUFPLDRCQUE0QjtBQUFBLElBQ3JDO0FBQUEsRUFDRixHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxTQUFVO0FBQ2YsVUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBSSxDQUFDLEdBQUk7QUFDVCxPQUFHLFlBQVksR0FBRztBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQztBQUVuQixRQUFNLGlCQUFpQixNQUFNO0FBQzNCLFFBQUksY0FBYyxrQkFBa0IsU0FBVTtBQUM5Qyx1QkFBbUIsRUFBRTtBQUNyQixvQkFBZ0IsQ0FBQyxTQUFTO0FBQ3hCLFVBQUksS0FBTSxxQkFBb0IsQ0FBQyxNQUFNLElBQUksQ0FBQztBQUMxQyxhQUFPLENBQUM7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTSxrQkFBa0IsTUFBTTtBQUM1QixRQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFDMUMsUUFBSSxPQUFPLE9BQU8sMEJBQTBCLFlBQVk7QUFDdEQsYUFBTyxzQkFBc0I7QUFDN0IsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0saUJBQWEsMEJBQVksTUFBTTtBQUNuQyxRQUFJLENBQUMsV0FBVyxDQUFDLFdBQVk7QUFDN0Isa0JBQWMsS0FBSztBQUNuQixRQUFJLHNCQUF1QixxQkFBb0IsdUJBQXVCLE1BQU07QUFBQSxFQUM5RSxHQUFHLENBQUMsU0FBUyxZQUFZLHFCQUFxQixDQUFDO0FBRS9DLFFBQU0sZUFBZSxNQUFNO0FBRXpCLHdCQUFvQixZQUFZLElBQUk7QUFBQSxFQUN0QztBQUVBLFFBQU0sU0FBUyxNQUFNO0FBQ25CLGlCQUFhO0FBQ2IsUUFBSSxtQkFBbUI7QUFDckIsYUFBTyxTQUFTLE9BQU87QUFDdkI7QUFBQSxJQUNGO0FBQ0EsUUFBSSxPQUFPLFFBQVEsU0FBUyxLQUFLLGdCQUFnQixFQUFHO0FBQ3BELFdBQU8sUUFBUSxLQUFLO0FBQUEsRUFDdEI7QUFFQSxRQUFNLGtCQUFrQixNQUFNO0FBRTVCLFFBQUksbUJBQW1CO0FBQ3JCLGFBQU8sU0FBUyxPQUFPO0FBQ3ZCO0FBQUEsSUFDRjtBQUNBLFFBQUksT0FBTyxRQUFRLFNBQVMsS0FBSyxnQkFBZ0IsRUFBRztBQUNwRCxXQUFPLFFBQVEsS0FBSztBQUFBLEVBQ3RCO0FBRUEsUUFBTSxTQUFTLE1BQU07QUFDbkIsUUFBSSxjQUFjLGtCQUFrQixTQUFVO0FBQzlDLHdCQUFvQixZQUFZLElBQUk7QUFDcEMsUUFBSSx1QkFBdUI7QUFDekIsMEJBQW9CLHVCQUF1QixNQUFNO0FBQ2pELDBCQUFvQixHQUFHLHFCQUFxQixXQUFXLEdBQUc7QUFBQSxJQUM1RDtBQUNBLFdBQU8saUNBQWlDO0FBQ3hDLG9CQUFnQjtBQUFBLEVBQ2xCO0FBR0EsUUFBTSxtQkFBZSwwQkFBWSxNQUFNO0FBQ3JDLFFBQUksY0FBYyxrQkFBa0IsU0FBVTtBQUM5QyxlQUFXO0FBQ1gsdUJBQW1CLEVBQUU7QUFDckIsVUFBTSxjQUFjLGVBQWUsV0FBVztBQUM5QyxZQUFRLFdBQVc7QUFDbkIsd0JBQW9CLFlBQVksV0FBVztBQUMzQyxRQUFJLHVCQUF1QjtBQUN6Qiw2QkFBdUIsR0FBRyxxQkFBcUIsU0FBUztBQUN4RCw2QkFBdUIscUJBQXFCO0FBQUEsSUFDOUM7QUFDQSxXQUFPLGlDQUFpQztBQUN4QyxvQkFBZ0I7QUFBQSxFQUNsQixHQUFHLENBQUMsWUFBWSxnQkFBZ0IsVUFBVSxZQUFZLFlBQVksaUJBQWlCLHFCQUFxQixDQUFDO0FBRXpHLFFBQU0saUJBQWlCLGFBQ25CLG9MQUNBO0FBQ0osUUFBTSxjQUFjLGNBQWMsa0JBQWtCO0FBQ3BELFFBQU0sa0JBQWtCLEtBQUssc0NBQXNDLHFEQUFxRDtBQUN4SCxRQUFNLGVBQWUsS0FBSyx5QkFBeUIsWUFBWTtBQUMvRCxRQUFNLGVBQWUsYUFBYSxHQUFHLFlBQVksS0FBSyxlQUFlLEtBQUs7QUFDMUUsUUFBTSxhQUFhLGFBQWEsa0JBQWtCO0FBQ2xELFFBQU0saUJBQWlCLHFPQUNyQixjQUNJLGFBQ0Usa0RBQ0EsbURBQ0Ysd0JBQ047QUFFQSxTQUNFLDhDQUFDLFNBQUksV0FBVSx3REFDYjtBQUFBLGtEQUFDLFNBQUksV0FBVSxvQkFDYjtBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxXQUFVO0FBQUEsVUFDVixjQUFZLEtBQUssZUFBZSxNQUFNO0FBQUEsVUFDdEMsU0FBUztBQUFBLFVBRVQsdURBQUMsMkJBQWdCLFdBQVUsV0FBVSxlQUFZLFFBQU87QUFBQTtBQUFBLE1BQzFEO0FBQUEsTUFFQSw2Q0FBQyxTQUFJLFdBQVUscUVBQ2IsdURBQUMsVUFBSyxJQUFHLGVBQWMsV0FBVSxZQUM5QixzQkFDSCxHQUNGO0FBQUEsTUFFQyxhQUNDLFVBQ0U7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE1BQUs7QUFBQSxVQUNMLFdBQVU7QUFBQSxVQUNWLGNBQVksS0FBSyxlQUFlLE1BQU07QUFBQSxVQUN0QyxTQUFTO0FBQUEsVUFFVCx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLFdBQVUsV0FBVSxNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQVksT0FBTSxRQUFPLGdCQUFlLGVBQVksUUFDOUksdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLHVLQUFzSyxHQUM3TjtBQUFBO0FBQUEsTUFDRixJQUVBLDZDQUFDLFNBQUksZUFBWSxRQUFPLE9BQU8sRUFBRSxPQUFPLFFBQVEsUUFBUSxPQUFPLEdBQUcsSUFHcEUsOENBQUMsU0FBSSxXQUFVLHFDQUNiO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVU7QUFBQSxZQUNWLGNBQVksS0FBSyxlQUFlLE1BQU07QUFBQSxZQUN0QyxTQUFTO0FBQUEsWUFFVCx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLE1BQUssUUFBTyxTQUFRLGFBQVksYUFBWSxPQUFNLFFBQU8sZ0JBQWUsV0FBVSxXQUFVLGVBQVksUUFDOUksdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLHlCQUF3QixHQUMvRTtBQUFBO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVU7QUFBQSxZQUNWLGNBQVksS0FBSyxpQkFBaUIsUUFBUTtBQUFBLFlBQzFDLFNBQVM7QUFBQSxZQUVULHVEQUFDLFNBQUksT0FBTSw4QkFBNkIsTUFBSyxRQUFPLFNBQVEsYUFBWSxhQUFZLE9BQU0sUUFBTyxnQkFBZSxXQUFVLFdBQVUsZUFBWSxRQUM5SSx1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsd0JBQXVCLEdBQzlFO0FBQUE7QUFBQSxRQUNGO0FBQUEsU0FDRjtBQUFBLE9BRUo7QUFBQSxJQUVBLDZDQUFDLFNBQUksV0FBVSx3Q0FDYix3REFBQyxTQUFJLFdBQVUsNEJBQTJCLE9BQU8sRUFBRSxXQUFXLEdBQUcsWUFBWSxNQUFNLGNBQWMsR0FBRyxZQUFZLEtBQUssR0FDbEg7QUFBQSxzQkFDQyw2Q0FBQyxTQUFJLEtBQUssZ0JBQWdCLFdBQVUsZUFDbEM7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUVDLFVBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLHNCQUFvQjtBQUFBLFVBQ3BCLHNCQUFvQjtBQUFBLFVBQ3BCLGdCQUFnQjtBQUFBLFVBQ2hCLGlCQUFpQixLQUFLLHlCQUF5QixZQUFZO0FBQUEsVUFDM0QscUJBQXFCLEtBQUssMkJBQTJCLGNBQWM7QUFBQSxVQUNuRSxnQkFBZ0I7QUFBQSxVQUNoQixrQkFBa0I7QUFBQTtBQUFBLFFBVGI7QUFBQSxNQVVQLEdBQ0Y7QUFBQSxNQUdELGtCQUNDLDZDQUFDLFNBQUksV0FBVSwwQ0FBMEMsMkJBQWdCLElBQ3ZFO0FBQUEsTUFFSiw4Q0FBQyxTQUFJLFdBQVcsZ0JBQ2Q7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsV0FBVyxnRkFBZ0YsYUFBYSx1QkFBdUIsZ0JBQWdCO0FBQUEsWUFDL0ksT0FBTztBQUFBLFlBQ1AsVUFBVSxDQUFDLE1BQU0sUUFBUSxFQUFFLE9BQU8sS0FBSztBQUFBLFlBQ3ZDLFVBQVUsa0JBQWtCO0FBQUEsWUFDNUIsVUFBVSxjQUFjLGtCQUFrQjtBQUFBLFlBQzFDLGlCQUFlLGFBQWEsU0FBUztBQUFBLFlBQ3JDLGFBQVcsa0JBQWtCO0FBQUEsWUFDN0IsT0FBTyxFQUFFLFFBQVEsYUFBYTtBQUFBO0FBQUEsUUFDaEM7QUFBQSxRQUVDLGlCQUNDLDZDQUFDLFNBQUksV0FBVSwwRUFDYix3REFBQyxTQUFJLFdBQVUsb0NBQ2I7QUFBQSx1REFBQyxXQUFRLE1BQUssYUFBWTtBQUFBLFVBQzFCLDZDQUFDLFVBQUssV0FBVSxXQUFXLGVBQUssMkJBQTJCLGNBQWMsR0FBRTtBQUFBLFdBQzdFLEdBQ0YsSUFDRTtBQUFBLFFBRU47QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE1BQUs7QUFBQSxZQUNMLFdBQVc7QUFBQSxZQUNYLGNBQVk7QUFBQSxZQUNaLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxZQUNULFVBQVU7QUFBQSxZQUNWLGlCQUFlLGNBQWMsU0FBUztBQUFBLFlBRWpDLHVCQUNDLDZDQUFDLDBCQUFlLFdBQVUseUJBQXdCLGVBQVksUUFBTyxJQUVyRSw4RUFDRTtBQUFBLDJEQUFDLFVBQUssV0FBVSx5RUFBd0UsZUFBWSxRQUNsRyx1REFBQyxrQ0FBdUIsTUFBTSxLQUFLLFNBQVMsSUFBSSxPQUFNLGdCQUFlLGFBQWEsR0FBRyxTQUFTLEtBQUssVUFBVSxJQUFJLEdBQ25IO0FBQUEsY0FDQSw2Q0FBQyxTQUFJLE9BQU0sOEJBQTZCLE1BQUssUUFBTyxTQUFRLGFBQVksYUFBYSxHQUFHLFFBQU8sZ0JBQWUsV0FBVSx5QkFBd0IsZUFBWSxRQUMxSix1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsOElBQTZJLEdBQ3BNO0FBQUEsZUFDRjtBQUFBO0FBQUEsUUFFUjtBQUFBLFNBQ0E7QUFBQSxPQUNGLEdBQ0Y7QUFBQSxLQUNGO0FBRUo7QUFHTyxJQUFNLGtCQUFrQixNQUFNO0FBQ25DLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBRWIsUUFBTSxVQUFVLE9BQU8sYUFBYSxlQUFlLEtBQUs7QUFDeEQsUUFBTSxhQUFhLE9BQU8sYUFBYSxrQkFBa0IsS0FBSztBQUM5RCxRQUFNLGVBQWUsT0FBTyxhQUFhLGtCQUFrQixLQUFLO0FBQ2hFLFFBQU0sWUFBWSxPQUFPLGFBQWEsaUJBQWlCLEtBQUs7QUFDNUQsUUFBTSxlQUFlLE9BQU8sYUFBYSxnQkFBZ0IsS0FBSztBQUM5RCxRQUFNLGtCQUNKLFVBQVUsWUFBWSxLQUFLLFVBQVUsY0FBYyxVQUFVLENBQUMsS0FBSyxVQUFVLGNBQWMsVUFBVSxDQUFDO0FBQ3hHLFFBQU0sZ0JBQWdCLE9BQU8sYUFBYSxpQkFBaUIsS0FBSztBQUNoRSxRQUFNLGlCQUFpQixjQUFjLFdBQVcsS0FBSyxjQUFjLFNBQVM7QUFDNUUsUUFBTSxZQUFZLGtCQUFrQixnQkFBZ0Isa0JBQWtCLGVBQWUsSUFBSSxDQUFDO0FBQzFGLFFBQU0sa0JBQWtCLE9BQU8sYUFBYSxvQkFBb0IsS0FBSztBQUNyRSxRQUFNLGNBQWMsbUJBQW1CLGNBQWMsYUFBYSxLQUFLO0FBRXZFO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTSxRQUFRLE1BQU07QUFDbEIsa0JBQWdCO0FBQ2xCO0FBRUEsdUJBQXVCLEtBQUs7QUFDNUIsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
