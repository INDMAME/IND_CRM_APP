import {
  TEXT_EDITOR_PREFIX
} from "./chunks/chunk-QO7GVWVB.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  AudioRecorderMinimal
} from "./chunks/chunk-LVUQ5WFG.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/system/TextEditor.tsx
var import_react = __toESM(require_react());

// node_modules/@heroicons/react/24/outline/esm/ChevronLeftIcon.js
var React = __toESM(require_react(), 1);
function ChevronLeftIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
var ForwardRef = /* @__PURE__ */ React.forwardRef(ChevronLeftIcon);
var ChevronLeftIcon_default = ForwardRef;

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
  const editorBoxClass = isReadOnly ? "relative rounded-2xl border border-slate-200 bg-slate-100 shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary" : "relative rounded-2xl border border-slate-300 bg-white shadow-lg overflow-hidden focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary";
  const micDisabled = isReadOnly || isTranscribing || isTyping;
  const micButtonClass = `absolute top-0 right-0 z-20 inline-flex h-[70px] w-[70px] items-center justify-center overflow-visible bg-transparent p-0 m-0 border-0 rounded-none text-primary shadow-none focus:outline-hidden focus:ring-0 focus:ring-offset-0${micDisabled ? " opacity-70 cursor-not-allowed" : " hover:text-primary/80"}`;
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
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            className: micButtonClass,
            "aria-label": indT("TextEditor_Microphone", "Microphone"),
            onClick: toggleRecorder,
            disabled: micDisabled,
            "aria-disabled": micDisabled ? "true" : void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PulseRingsMultipleIcon_default, { size: 240, padding: 12, color: "currentColor", strokeWidth: 2, opacity: 0.3, rotation: 90 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1, stroke: "currentColor", className: "h-6 w-6 relative z-10", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" }) })
            ]
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9UZXh0RWRpdG9yLnRzeCIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lL2VzbS9DaGV2cm9uTGVmdEljb24uanMiLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QdWxzZVJpbmdzTXVsdGlwbGVJY29uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENoZXZyb25MZWZ0SWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzI0L291dGxpbmVcIjtcbmltcG9ydCBBdWRpb1JlY29yZGVyTWluaW1hbCBmcm9tIFwiLi9BdWRpb1JlY29yZGVyTWluaW1hbC50c3hcIjtcbmltcG9ydCBQdWxzZVJpbmdzTXVsdGlwbGVJY29uIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUHVsc2VSaW5nc011bHRpcGxlSWNvbi50c3hcIjtcbmltcG9ydCB7IFRFWFRfRURJVE9SX1BSRUZJWCB9IGZyb20gXCIuLi8uLi91dGlscy90ZXh0RWRpdG9yLnRzXCI7XG5pbXBvcnQgeyBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5cclxuY29uc3QgSU5EX0kxOE4gPSBnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXyB8fCB7fTtcclxuY29uc3QgaW5kVCA9IChrZXksIGZhbGxiYWNrKSA9PiAoSU5EX0kxOE4gJiYgdHlwZW9mIElORF9JMThOW2tleV0gPT09IFwic3RyaW5nXCIgJiYgSU5EX0kxOE5ba2V5XSkgfHwgZmFsbGJhY2sgfHwga2V5O1xyXG5cclxuY29uc3QgU1RPUkFHRV9QUkVGSVggPSBURVhUX0VESVRPUl9QUkVGSVg7XG5jb25zdCBUT1BCQVJfSEVJR0hUID0gNjQ7XG5jb25zdCBPVVRFUl9NQVJHSU4gPSA1O1xuY29uc3QgTUlOX0VESVRPUl9IRUlHSFQgPSAyNDA7XG5jb25zdCBSRUNPUkRFUl9HQVAgPSAxMjtcbmNvbnN0IFRZUEVfSU5URVJWQUxfTVMgPSAyODtcbmNvbnN0IFRZUEVfVEFSR0VUX01TID0gNDIwMDtcbmNvbnN0IFRZUEVfTUlOX1NURVAgPSAxO1xuY29uc3QgVFlQRV9NQVhfU1RFUCA9IDQ7XG5jb25zdCBURVhUX0VESVRPUl9TVE9SQUdFX1RUTF9NUyA9IDEyICogNjAgKiA2MCAqIDEwMDA7XG5cbi8vIFNoYXJlZCBzcGlubmVyIGZvciBsb2NhbCBsb2FkaW5nIHN0YXRlcy5cclxudHlwZSBTcGlubmVyUHJvcHMgPSB7XG4gIHNpemU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xufTtcblxuY29uc3QgU3Bpbm5lciA9ICh7IHNpemUgPSBcImgtNiB3LTZcIiwgbGFiZWwgPSBcIlwiIH06IFNwaW5uZXJQcm9wcykgPT4gKFxuICA8c3ZnXHJcbiAgICBjbGFzc05hbWU9e2BpbmQtc3Bpbm5lciAke3NpemV9YH1cclxuICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxyXG4gICAgcm9sZT1cInN0YXR1c1wiXHJcbiAgICBhcmlhLWxhYmVsPXtsYWJlbCB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gID5cclxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xuXG5jb25zdCBnZXRDc3JmVG9rZW4gPSAoKSA9PiB7XG4gIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XG4gIHJldHVybiBtZXRhID8gbWV0YS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpIDogXCJcIjtcbn07XG5cclxuZnVuY3Rpb24gc2FmZUdldFNlc3Npb25WYWx1ZShrZXkpIHtcbiAgcmV0dXJuIGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcbn1cblxuZnVuY3Rpb24gc2FmZVNldFNlc3Npb25WYWx1ZShrZXksIHZhbHVlKSB7XG4gIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCB2YWx1ZSwgVEVYVF9FRElUT1JfU1RPUkFHRV9UVExfTVMpO1xufVxuXG4vLyBSZW1vdmUgYSBzZXNzaW9uIHZhbHVlIHdpdGhvdXQgdGhyb3dpbmcgZm9yIGJsb2NrZWQgc3RvcmFnZS5cbmZ1bmN0aW9uIHNhZmVSZW1vdmVTZXNzaW9uVmFsdWUoa2V5KSB7XG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcbn1cblxyXG5mdW5jdGlvbiBwYXJzZUJvb2wodmFsdWUpIHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBub3JtYWxpemVkID09PSBcIjFcIiB8fCBub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcInllc1wiO1xyXG59XHJcblxyXG4vLyBQYXJzZXMgb3B0aW9uYWwgYm9vbGVhbiB2YWx1ZXMgd2l0aCBhIGRlZmF1bHQgZmFsbGJhY2suXHJcbmZ1bmN0aW9uIHBhcnNlT3B0aW9uYWxCb29sKHZhbHVlLCBmYWxsYmFjaykge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbGxiYWNrO1xyXG4gIHJldHVybiBwYXJzZUJvb2wobm9ybWFsaXplZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFF1ZXJ5UGFyYW0oa2V5KSB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcIlwiO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IFwiXCIpLmdldChrZXkpIHx8IFwiXCI7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVkaXRNb2RlS2V5KHZhbHVlKSB7XHJcbiAgY29uc3Qga2V5ID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIWtleSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIGtleS5zdGFydHNXaXRoKFwiaW5kX3Zpc2l0X2VkaXRfXCIpID8ga2V5IDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gSW5kVGV4dEVkaXRvckFwcCh7IGZpZWxkSWQsIGZpZWxkTGFiZWwsIGluaXRpYWxWYWx1ZSwgcmV0dXJuVXJsLCBpbml0aWFsUmVhZE9ubHkgPSBmYWxzZSwgZWRpdE1vZGVLZXkgPSBcIlwiLCBhbGxvd0VkaXQgPSB0cnVlIH0pIHtcbiAgY29uc3Qgc3RvcmFnZUtleSA9IHVzZU1lbW8oKCkgPT4gYCR7U1RPUkFHRV9QUkVGSVh9JHtTdHJpbmcoZmllbGRJZCB8fCBcIlwiKS50cmltKCl9YCwgW2ZpZWxkSWRdKTtcbiAgLy8gUmVzb2x2ZSByZXR1cm4gVVJMIGZyb20gcHJvcHMgb3Igc2Vzc2lvblN0b3JhZ2UuXHJcbiAgY29uc3QgcmVzb2x2ZWRSZXR1cm5VcmwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGRpcmVjdCA9IHR5cGVvZiByZXR1cm5VcmwgPT09IFwic3RyaW5nXCIgPyByZXR1cm5VcmwudHJpbSgpIDogXCJcIjtcclxuICAgIGlmIChkaXJlY3QpIHJldHVybiBkaXJlY3Q7XHJcbiAgICBjb25zdCBzYWZlSWQgPSBTdHJpbmcoZmllbGRJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKCFzYWZlSWQpIHJldHVybiBcIlwiO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9yZWQgPSBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGAke1NUT1JBR0VfUFJFRklYfSR7c2FmZUlkfV9yZXR1cm5VcmxgKTtcbiAgICAgIHJldHVybiBzdG9yZWQgPyBTdHJpbmcoc3RvcmVkKS50cmltKCkgOiBcIlwiO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxyXG4gIH0sIFtmaWVsZElkLCByZXR1cm5VcmxdKTtcclxuICBjb25zdCBjYW5FZGl0ID0gISFhbGxvd0VkaXQ7XHJcbiAgY29uc3QgW2lzUmVhZE9ubHksIHNldElzUmVhZE9ubHldID0gdXNlU3RhdGUoISFpbml0aWFsUmVhZE9ubHkgfHwgIWNhbkVkaXQpO1xuICBjb25zdCBub3JtYWxpemVkRWRpdE1vZGVLZXkgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUVkaXRNb2RlS2V5KGVkaXRNb2RlS2V5KSwgW2VkaXRNb2RlS2V5XSk7XG4gIGNvbnN0IFtyZWNvcmRlck9wZW4sIHNldFJlY29yZGVyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3JlY29yZGVyUmVzZXRLZXksIHNldFJlY29yZGVyUmVzZXRLZXldID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3JlY29yZGVySGVpZ2h0UHgsIHNldFJlY29yZGVySGVpZ2h0UHhdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2lzVHJhbnNjcmliaW5nLCBzZXRJc1RyYW5zY3JpYmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3RyYW5zY3JpYmVFcnJvciwgc2V0VHJhbnNjcmliZUVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc1R5cGluZywgc2V0SXNUeXBpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHJlY29yZGVyQm94UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHR5cGluZ1RpbWVyUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCB0eXBpbmdUZXh0UmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCB0eXBpbmdJbmRleFJlZiA9IHVzZVJlZigwKTtcbiAgY29uc3QgaW5pdGlhbFRleHRSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IHRleHRhcmVhUmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBjb21wdXRlRWRpdG9ySGVpZ2h0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgY29uc3QgZmFsbGJhY2sgPSBgY2FsYygxMDB2aCAtICR7VE9QQkFSX0hFSUdIVCArIE9VVEVSX01BUkdJTiAqIDJ9cHgpYDtcclxuICAgICAgcmV0dXJuIGZhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgdmlld3BvcnQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMDtcclxuICAgIGlmICghdmlld3BvcnQpIHtcclxuICAgICAgcmV0dXJuIGBjYWxjKDEwMHZoIC0gJHtUT1BCQVJfSEVJR0hUICsgT1VURVJfTUFSR0lOICogMn1weClgO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVjb3JkZXJTcGFjZSA9IHJlY29yZGVyT3BlbiA/IHJlY29yZGVySGVpZ2h0UHggKyBSRUNPUkRFUl9HQVAgOiAwO1xyXG4gICAgY29uc3QgYXZhaWxhYmxlID0gTWF0aC5tYXgodmlld3BvcnQgLSBUT1BCQVJfSEVJR0hUIC0gT1VURVJfTUFSR0lOICogMiAtIHJlY29yZGVyU3BhY2UsIE1JTl9FRElUT1JfSEVJR0hUKTtcclxuICAgIHJldHVybiBgJHthdmFpbGFibGV9cHhgO1xyXG4gIH0sIFtyZWNvcmRlck9wZW4sIHJlY29yZGVySGVpZ2h0UHhdKTtcclxuXHJcbiAgY29uc3QgW2VkaXRvckhlaWdodCwgc2V0RWRpdG9ySGVpZ2h0XSA9IHVzZVN0YXRlKCgpID0+IGNvbXB1dGVFZGl0b3JIZWlnaHQoKSk7XHJcblxyXG4gIGNvbnN0IFt0ZXh0LCBzZXRUZXh0XSA9IHVzZVN0YXRlKCgpID0+IHtcbiAgICBjb25zdCBzdG9yZWQgPSBzYWZlR2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXkpO1xuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gc3RvcmVkICE9PSBudWxsID8gc3RvcmVkIDogU3RyaW5nKGluaXRpYWxWYWx1ZSB8fCBcIlwiKTtcbiAgICBpbml0aWFsVGV4dFJlZi5jdXJyZW50ID0gaW5pdGlhbFRleHQ7XG4gICAgcmV0dXJuIGluaXRpYWxUZXh0O1xuICB9KTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAhaXNSZWFkT25seSAmJiAoaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmcgfHwgdGV4dCAhPT0gKGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPz8gXCJcIikpLFxuICAgIFtpc1JlYWRPbmx5LCBpc1RyYW5zY3JpYmluZywgaXNUeXBpbmcsIHRleHRdXG4gICk7XG5cclxuICBjb25zdCBzdG9wVHlwaW5nID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICB0eXBpbmdUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHR5cGluZ1RleHRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICB0eXBpbmdJbmRleFJlZi5jdXJyZW50ID0gMDtcclxuICAgIHNldElzVHlwaW5nKGZhbHNlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHN0YXJ0VHlwaW5nID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZnVsbFRleHQpID0+IHtcclxuICAgICAgY29uc3QgdGV4dFZhbHVlID0gU3RyaW5nKGZ1bGxUZXh0IHx8IFwiXCIpO1xyXG4gICAgICBzdG9wVHlwaW5nKCk7XHJcbiAgICAgIGlmICghdGV4dFZhbHVlKSB7XHJcbiAgICAgICAgc2V0VGV4dChcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHR5cGluZ1RleHRSZWYuY3VycmVudCA9IHRleHRWYWx1ZTtcclxuICAgICAgdHlwaW5nSW5kZXhSZWYuY3VycmVudCA9IDA7XHJcbiAgICAgIHNldElzVHlwaW5nKHRydWUpO1xyXG4gICAgICBzZXRUZXh0KFwiXCIpO1xyXG5cclxuICAgICAgY29uc3QgdG90YWwgPSB0ZXh0VmFsdWUubGVuZ3RoO1xyXG4gICAgICBjb25zdCBtYXhTdGVwcyA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoVFlQRV9UQVJHRVRfTVMgLyBUWVBFX0lOVEVSVkFMX01TKSk7XHJcbiAgICAgIGNvbnN0IHN0ZXBTaXplID0gTWF0aC5taW4oVFlQRV9NQVhfU1RFUCwgTWF0aC5tYXgoVFlQRV9NSU5fU1RFUCwgTWF0aC5jZWlsKHRvdGFsIC8gbWF4U3RlcHMpKSk7XHJcblxyXG4gICAgICBjb25zdCB0aWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5leHQgPSBNYXRoLm1pbih0eXBpbmdJbmRleFJlZi5jdXJyZW50ICsgc3RlcFNpemUsIHRvdGFsKTtcclxuICAgICAgICB0eXBpbmdJbmRleFJlZi5jdXJyZW50ID0gbmV4dDtcclxuICAgICAgICBzZXRUZXh0KHR5cGluZ1RleHRSZWYuY3VycmVudC5zbGljZSgwLCBuZXh0KSk7XHJcbiAgICAgICAgaWYgKG5leHQgPCB0b3RhbCkge1xyXG4gICAgICAgICAgdHlwaW5nVGltZXJSZWYuY3VycmVudCA9IHNldFRpbWVvdXQodGljaywgVFlQRV9JTlRFUlZBTF9NUyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgc2V0SXNUeXBpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBzZXRUaW1lb3V0KHRpY2ssIFRZUEVfSU5URVJWQUxfTVMpO1xyXG4gICAgfSxcclxuICAgIFtzdG9wVHlwaW5nXVxyXG4gICk7XHJcblxyXG4gIC8vIFNlbmQgdGhlIFdBViB0byBNVkMgYW5kIHJlcGxhY2UgdGV4dGFyZWEgd2l0aCB0aGUgdHJhbnNjcmlwdGlvbi5cclxuICBjb25zdCBoYW5kbGVUcmFuc2NyaWJlID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAod2F2QmxvYikgPT4ge1xyXG4gICAgICBpZiAoIXdhdkJsb2IgfHwgaXNUcmFuc2NyaWJpbmcpIHJldHVybjtcclxuXHJcbiAgICAgIC8vIExvY2sgdGhlIGVkaXRvciB3aGlsZSB0aGUgdHJhbnNjcmlwdGlvbiByZXF1ZXN0IGlzIGluIGZsaWdodC5cclxuICAgICAgc2V0SXNUcmFuc2NyaWJpbmcodHJ1ZSk7XHJcbiAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gQnVpbGQgbXVsdGlwYXJ0IGZvcm0gcGF5bG9hZCBleHBlY3RlZCBieSAvVmlzaXRhcy9UcmFuc2NyaWJlU3BlZWNoLlxyXG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmb3JtLmFwcGVuZChcImxhbmd1YWdlSWRcIiwgXCJhdXRvXCIpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwiYXVkaW9GaWxlXCIsIHdhdkJsb2IsIFwiYXVkaW8ud2F2XCIpO1xyXG4gICAgICAgIGlmIChyZXNvbHZlZFJldHVyblVybCkge1xyXG4gICAgICAgICAgZm9ybS5hcHBlbmQoXCJyZXR1cm5VcmxcIiwgcmVzb2x2ZWRSZXR1cm5VcmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHtcclxuICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxyXG4gICAgICAgICAgLi4uKGNzcmZUb2tlbiA/IHsgUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuOiBjc3JmVG9rZW4gfSA6IHt9KSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZW5kIHRoZSBXQVYgdG8gTVZDIChzZXJ2ZXIgd2lsbCBjYWxsIHRoZSBzcGVlY2ggQVBJKS5cclxuICAgICAgICBjb25zdCBxdWVyeSA9IHJlc29sdmVkUmV0dXJuVXJsID8gYD9yZXR1cm5Vcmw9JHtlbmNvZGVVUklDb21wb25lbnQocmVzb2x2ZWRSZXR1cm5VcmwpfWAgOiBcIlwiO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9WaXNpdGFzL1RyYW5zY3JpYmVTcGVlY2gke3F1ZXJ5fWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICBib2R5OiBmb3JtLFxyXG4gICAgICAgICAgaGVhZGVycyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiBudWxsKTtcclxuICAgICAgICBjb25zdCBvayA9IHJlc3BvbnNlLm9rICYmIHBheWxvYWQgJiYgcGF5bG9hZC5zdWNjZXNzID09PSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgICBjb25zdCBtc2cgPSBwYXlsb2FkICYmIHBheWxvYWQubWVzc2FnZSA/IFN0cmluZyhwYXlsb2FkLm1lc3NhZ2UpIDogaW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZUZhaWxlZFwiLCBcIlRyYW5zY3JpYmUgZmFpbGVkLlwiKTtcclxuICAgICAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihtc2cpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdHJhbnNjcmlwdCA9IHBheWxvYWQgJiYgdHlwZW9mIHBheWxvYWQuZGF0YSA9PT0gXCJzdHJpbmdcIiA/IHBheWxvYWQuZGF0YSA6IFwiXCI7XHJcbiAgICAgICAgaWYgKCF0cmFuc2NyaXB0LnRyaW0oKSkge1xyXG4gICAgICAgICAgc2V0VHJhbnNjcmliZUVycm9yKGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVGYWlsZWRcIiwgXCJUcmFuc2NyaWJlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVwbGFjZSB0aGUgZnVsbCB0ZXh0YXJlYSBjb250ZW50IHdpdGggdGhlIG5ldyB0cmFuc2NyaXB0aW9uLlxyXG4gICAgICAgIHN0YXJ0VHlwaW5nKHRyYW5zY3JpcHQpO1xyXG4gICAgICAgIC8vIEhpZGUgdGhlIHJlY29yZGVyIGFmdGVyIGEgc3VjY2Vzc2Z1bCB0cmFuc2NyaXB0aW9uLlxyXG4gICAgICAgIHNldFJlY29yZGVyT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0UmVjb3JkZXJSZXNldEtleSgoaykgPT4gayArIDEpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zdCBtc2cgPSBlcnIgJiYgZXJyLm1lc3NhZ2UgPyBTdHJpbmcoZXJyLm1lc3NhZ2UpIDogaW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZUZhaWxlZFwiLCBcIlRyYW5zY3JpYmUgZmFpbGVkLlwiKTtcclxuICAgICAgICBzZXRUcmFuc2NyaWJlRXJyb3IobXNnKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAvLyBSZS1lbmFibGUgdGhlIGVkaXRvciBhZnRlciBjb21wbGV0aW9uLlxyXG4gICAgICAgIHNldElzVHJhbnNjcmliaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtpc1RyYW5zY3JpYmluZywgc3RhcnRUeXBpbmddXHJcbiAgKTtcclxuXHJcbiAgLy8gQ2xlYXIgdHJhbnNjcmlwdGlvbiBlcnJvcnMgd2hlbiBhdWRpbyBjaGFuZ2VzLlxyXG4gIGNvbnN0IGhhbmRsZUF1ZGlvQ2xlYXJlZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRUcmFuc2NyaWJlRXJyb3IoXCJcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVSZWNvcmRpbmdFcnJvciA9IHVzZUNhbGxiYWNrKChtZXNzYWdlKSA9PiB7XG4gICAgLy8gU2hvdyBhIHdhcm5pbmcgYWN0aW9uIG1hcms7IGtlZXAgdGhlIHJlY29yZGVyIG9wZW4gdG8gZGlzcGxheSB0aGUgZXJyb3IgbGFiZWwuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh3aW5kb3cuSU5EICYmIHR5cGVvZiB3aW5kb3cuSU5ELmZsYXNoQWN0aW9uTWFyayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHdpbmRvdy5JTkQuZmxhc2hBY3Rpb25NYXJrKHsgdHlwZTogXCJ3YXJuaW5nUHJvY2Vzc1wiLCBkdXJhdGlvbk1zOiAxNTAwIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gaWdub3JlXG4gICAgfVxuICB9LCBbXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCB1cGRhdGVIZWlnaHQgPSAoKSA9PiB7XHJcbiAgICAgIHNldEVkaXRvckhlaWdodChjb21wdXRlRWRpdG9ySGVpZ2h0KCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGVIZWlnaHQoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZUhlaWdodCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIHVwZGF0ZUhlaWdodCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVIZWlnaHQpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIHVwZGF0ZUhlaWdodCk7XHJcbiAgICB9O1xyXG4gIH0sIFtjb21wdXRlRWRpdG9ySGVpZ2h0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGlmICghcmVjb3JkZXJPcGVuKSB7XHJcbiAgICAgIHNldFJlY29yZGVySGVpZ2h0UHgoMCk7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWwgPSByZWNvcmRlckJveFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdCBtZWFzdXJlID0gKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBzZXRSZWNvcmRlckhlaWdodFB4KE1hdGgubWF4KDAsIE1hdGguZmxvb3IocmVjdC5oZWlnaHQpKSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIG1lYXN1cmUoKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgIGNvbnN0IHJvID0gbmV3IFJlc2l6ZU9ic2VydmVyKG1lYXN1cmUpO1xyXG4gICAgICByby5vYnNlcnZlKGVsKTtcclxuICAgICAgcmV0dXJuICgpID0+IHJvLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtZWFzdXJlKTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBtZWFzdXJlKTtcclxuICB9LCBbcmVjb3JkZXJPcGVuXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiBzdG9wVHlwaW5nLCBbc3RvcFR5cGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcbiAgICB9O1xuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNUeXBpbmcpIHJldHVybjtcclxuICAgIGNvbnN0IGVsID0gdGV4dGFyZWFSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuICAgIGVsLnNjcm9sbFRvcCA9IGVsLnNjcm9sbEhlaWdodDtcclxuICB9LCBbaXNUeXBpbmcsIHRleHRdKTtcclxuXHJcbiAgY29uc3QgdG9nZ2xlUmVjb3JkZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAoaXNSZWFkT25seSB8fCBpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZykgcmV0dXJuO1xyXG4gICAgc2V0VHJhbnNjcmliZUVycm9yKFwiXCIpO1xyXG4gICAgc2V0UmVjb3JkZXJPcGVuKChvcGVuKSA9PiB7XHJcbiAgICAgIGlmIChvcGVuKSBzZXRSZWNvcmRlclJlc2V0S2V5KChrKSA9PiBrICsgMSk7XHJcbiAgICAgIHJldHVybiAhb3BlbjtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFsbG93SGlzdG9yeU5hdiA9ICgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZEFsbG93SGlzdG9yeU9uY2UgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB3aW5kb3cuX19pbmRBbGxvd0hpc3RvcnlPbmNlKCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWNhbkVkaXQgfHwgIWlzUmVhZE9ubHkpIHJldHVybjtcclxuICAgIHNldElzUmVhZE9ubHkoZmFsc2UpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSkgc2FmZVNldFNlc3Npb25WYWx1ZShub3JtYWxpemVkRWRpdE1vZGVLZXksIFwidHJ1ZVwiKTtcclxuICB9LCBbY2FuRWRpdCwgaXNSZWFkT25seSwgbm9ybWFsaXplZEVkaXRNb2RlS2V5XSk7XHJcblxyXG4gIGNvbnN0IHBlcnNpc3REcmFmdCA9ICgpID0+IHtcclxuICAgIC8vIFBlcnNpc3QgdGhlIGRyYWZ0IHNvIHRoZSBwcmV2aW91cyBwYWdlIGNhbiByZXN0b3JlIGl0LlxyXG4gICAgc2FmZVNldFNlc3Npb25WYWx1ZShzdG9yYWdlS2V5LCB0ZXh0KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBnb0JhY2sgPSAoKSA9PiB7XHJcbiAgICBwZXJzaXN0RHJhZnQoKTtcclxuICAgIGlmIChyZXNvbHZlZFJldHVyblVybCkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc29sdmVkUmV0dXJuVXJsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMSAmJiBhbGxvd0hpc3RvcnlOYXYoKSkgcmV0dXJuO1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdvQmFja0FmdGVyU2F2ZSA9ICgpID0+IHtcclxuICAgIC8vIFByZWZlciByZXR1cm5VcmwgZm9yIGRldGVybWluaXN0aWMgbmF2aWdhdGlvbiBhY3Jvc3MgYnJvd3NlcnMuXHJcbiAgICBpZiAocmVzb2x2ZWRSZXR1cm5VcmwpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNvbHZlZFJldHVyblVybDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHdpbmRvdy5oaXN0b3J5Lmxlbmd0aCA+IDEgJiYgYWxsb3dIaXN0b3J5TmF2KCkpIHJldHVybjtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBvblNhdmUgPSAoKSA9PiB7XG4gICAgaWYgKGlzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmcpIHJldHVybjtcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIHRleHQpO1xuICAgIGlmIChub3JtYWxpemVkRWRpdE1vZGVLZXkpIHtcbiAgICAgIHNhZmVTZXRTZXNzaW9uVmFsdWUobm9ybWFsaXplZEVkaXRNb2RlS2V5LCBcInRydWVcIik7XG4gICAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKGAke25vcm1hbGl6ZWRFZGl0TW9kZUtleX1fcmV0dXJuYCwgXCIxXCIpO1xuICAgIH1cbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICBnb0JhY2tBZnRlclNhdmUoKTtcbiAgfTtcblxuICAvLyBSZXN0b3JlIHRoZSBpbml0aWFsIHRleHQgdmFsdWUgZm9yIHRoaXMgc2Vzc2lvbiB3aXRob3V0IHNhdmluZy5cbiAgY29uc3Qgb25DYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nKSByZXR1cm47XG4gICAgc3RvcFR5cGluZygpO1xuICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcbiAgICBjb25zdCBpbml0aWFsVGV4dCA9IGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPz8gXCJcIjtcbiAgICBzZXRUZXh0KGluaXRpYWxUZXh0KTtcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIGluaXRpYWxUZXh0KTtcbiAgICBpZiAobm9ybWFsaXplZEVkaXRNb2RlS2V5KSB7XG4gICAgICBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKGAke25vcm1hbGl6ZWRFZGl0TW9kZUtleX1fcmV0dXJuYCk7XG4gICAgICBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSk7XG4gICAgfVxuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgIGdvQmFja0FmdGVyU2F2ZSgpO1xuICB9LCBbaXNSZWFkT25seSwgaXNUcmFuc2NyaWJpbmcsIGlzVHlwaW5nLCBzdG9wVHlwaW5nLCBzdG9yYWdlS2V5LCBnb0JhY2tBZnRlclNhdmUsIG5vcm1hbGl6ZWRFZGl0TW9kZUtleV0pO1xuXHJcbiAgY29uc3QgZWRpdG9yQm94Q2xhc3MgPSBpc1JlYWRPbmx5XG4gICAgPyBcInJlbGF0aXZlIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTEwMCBzaGFkb3ctbGcgb3ZlcmZsb3ctaGlkZGVuIGZvY3VzLXdpdGhpbjpyaW5nLTQgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeS80MCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnlcIlxuICAgIDogXCJyZWxhdGl2ZSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBiZy13aGl0ZSBzaGFkb3ctbGcgb3ZlcmZsb3ctaGlkZGVuIGZvY3VzLXdpdGhpbjpyaW5nLTQgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeS80MCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnlcIjtcbiAgY29uc3QgbWljRGlzYWJsZWQgPSBpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nO1xuICBjb25zdCBtaWNCdXR0b25DbGFzcyA9IGBhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHotMjAgaW5saW5lLWZsZXggaC1bNzBweF0gdy1bNzBweF0gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJmbG93LXZpc2libGUgYmctdHJhbnNwYXJlbnQgcC0wIG0tMCBib3JkZXItMCByb3VuZGVkLW5vbmUgdGV4dC1wcmltYXJ5IHNoYWRvdy1ub25lIGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMCBmb2N1czpyaW5nLW9mZnNldC0wJHtcbiAgICBtaWNEaXNhYmxlZCA/IFwiIG9wYWNpdHktNzAgY3Vyc29yLW5vdC1hbGxvd2VkXCIgOiBcIiBob3Zlcjp0ZXh0LXByaW1hcnkvODBcIlxuICB9YDtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBoLWR2aCB3LWZ1bGwgZmxleCBmbGV4LWNvbCBiZy1zbGF0ZS0yMDBcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BiYXIgc2hhZG93LW1kXCI+XHJcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInRvcGJhci1idG5cIlxuICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJUb3BiYXJfQmFja1wiLCBcIkJhY2tcIil9XG4gICAgICAgICAgb25DbGljaz17Z29CYWNrfVxuICAgICAgICA+XG4gICAgICAgICAgPENoZXZyb25MZWZ0SWNvbiBjbGFzc05hbWU9XCJoLTYgdy02XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcGJhci1jZW50ZXIgZmxleC0xIGZsZXgganVzdGlmeS1jZW50ZXIgcG9pbnRlci1ldmVudHMtbm9uZSBweC0yXCI+XHJcbiAgICAgICAgICA8c3BhbiBpZD1cInRvcGJhclRpdGxlXCIgY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj5cclxuICAgICAgICAgICAge2ZpZWxkTGFiZWx9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtpc1JlYWRPbmx5ID8gKFxyXG4gICAgICAgICAgY2FuRWRpdCA/IChcclxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidG9wYmFyLWJ0blwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fRWRpdFwiLCBcIkVkaXRcIil9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2VuYWJsZUVkaXR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE2Ljg2MiA0LjQ4NyAxLjY4Ny0xLjY4OGExLjg3NSAxLjg3NSAwIDEgMSAyLjY1MiAyLjY1Mkw2LjgzMiAxOS44MmE0LjUgNC41IDAgMCAxLTEuODk3IDEuMTNsLTIuNjg1LjguOC0yLjY4NWE0LjUgNC41IDAgMCAxIDEuMTMtMS44OTdMMTYuODYzIDQuNDg3Wm0wIDBMMTkuNSA3LjEyNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9e3sgd2lkdGg6IFwiMjVweFwiLCBoZWlnaHQ6IFwiMjVweFwiIH19IC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLVsxNHB4XSBwci0xXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKX1cbiAgICAgICAgICAgICAgb25DbGljaz17b25TYXZlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm00LjUgMTIuNzUgNiA2IDktMTMuNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2FuY2VsRWRpdH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTYgdy02XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNNiAxOCAxOCA2TTYgNmwxMiAxMlwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4taC0wIHctZnVsbCBweC00IHBiLTQgcHQtM1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTN4bCBteC1hdXRvXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiBgJHtPVVRFUl9NQVJHSU59cHhgLCBtYXJnaW5Cb3R0b206IGAke09VVEVSX01BUkdJTn1weGAgfX0+XHJcbiAgICAgICAgICB7cmVjb3JkZXJPcGVuICYmIChcclxuICAgICAgICAgICAgPGRpdiByZWY9e3JlY29yZGVyQm94UmVmfSBjbGFzc05hbWU9XCJtYi0zIHctZnVsbFwiPlxyXG4gICAgICAgICAgICAgIDxBdWRpb1JlY29yZGVyTWluaW1hbFxuICAgICAgICAgICAgICAgIGtleT17cmVjb3JkZXJSZXNldEtleX1cbiAgICAgICAgICAgICAgICBlbWJlZGRlZFxuICAgICAgICAgICAgICAgIG9uVHJhbnNjcmliZT17aGFuZGxlVHJhbnNjcmliZX1cbiAgICAgICAgICAgICAgICB0cmFuc2NyaWJlQnVzeT17aXNUcmFuc2NyaWJpbmd9XG4gICAgICAgICAgICAgICAgdHJhbnNjcmliZUxhYmVsPXtpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJlXCIsIFwiVHJhbnNjcmliZVwiKX1cbiAgICAgICAgICAgICAgICB0cmFuc2NyaWJlQnVzeUxhYmVsPXtpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJpbmdcIiwgXCJUcmFuc2NyaWJpbmdcIil9XG4gICAgICAgICAgICAgICAgb25BdWRpb0NsZWFyZWQ9e2hhbmRsZUF1ZGlvQ2xlYXJlZH1cbiAgICAgICAgICAgICAgICBvblJlY29yZGluZ0Vycm9yPXtoYW5kbGVSZWNvcmRpbmdFcnJvcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cclxuICAgICAgICAgIHt0cmFuc2NyaWJlRXJyb3IgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItMyB0ZXh0LXhzIHRleHQtcm9zZS03MDAgdGV4dC1jZW50ZXJcIj57dHJhbnNjcmliZUVycm9yfTwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2VkaXRvckJveENsYXNzfT5cclxuICAgICAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgICAgcmVmPXt0ZXh0YXJlYVJlZn1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcmVzaXplLW5vbmUgYmctdHJhbnNwYXJlbnQgcHgtNSBwYi01IHB0LTEwIHByLTE0IGZvY3VzOm91dGxpbmUtaGlkZGVuICR7aXNSZWFkT25seSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJ9YH1cbiAgICAgICAgICAgICAgdmFsdWU9e3RleHR9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUZXh0KGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgYXJpYS1yZWFkb25seT17aXNSZWFkT25seSA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgIGFyaWEtYnVzeT17aXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmd9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiBlZGl0b3JIZWlnaHQgfX1cclxuICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgIHtpc1RyYW5zY3JpYmluZyA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS0yMDAvODBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtMTYgdy0xNlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj57aW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliaW5nXCIsIFwiVHJhbnNjcmliaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17bWljQnV0dG9uQ2xhc3N9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiVGV4dEVkaXRvcl9NaWNyb3Bob25lXCIsIFwiTWljcm9waG9uZVwiKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVJlY29yZGVyfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e21pY0Rpc2FibGVkfVxuICAgICAgICAgICAgYXJpYS1kaXNhYmxlZD17bWljRGlzYWJsZWQgPyBcInRydWVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwb2ludGVyLWV2ZW50cy1ub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICA8UHVsc2VSaW5nc011bHRpcGxlSWNvbiBzaXplPXsyNDB9IHBhZGRpbmc9ezEyfSBjb2xvcj1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsyfSBvcGFjaXR5PXswLjN9IHJvdGF0aW9uPXs5MH0gLz5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezF9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNiB3LTYgcmVsYXRpdmUgei0xMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTIgMTguNzVhNiA2IDAgMCAwIDYtNnYtMS41bS02IDcuNWE2IDYgMCAwIDEtNi02di0xLjVtNiA3LjV2My43NW0tMy43NSAwaDcuNU0xMiAxNS43NWEzIDMgMCAwIDEtMy0zVjQuNWEzIDMgMCAxIDEgNiAwdjguMjVhMyAzIDAgMCAxLTMgM1pcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIE1vdW50IHRoZSB0ZXh0IGVkaXRvciBpbnRvIHRoZSBSYXpvciB2aWV3LlxyXG5leHBvcnQgY29uc3QgbW91bnRUZXh0RWRpdG9yID0gKCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZC10ZXh0LWVkaXRvci1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXHJcbiAgY29uc3QgZmllbGRJZCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkLWlkXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgZmllbGRMYWJlbCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkLWxhYmVsXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgaW5pdGlhbFZhbHVlID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtZmllbGQtdmFsdWVcIikgfHwgXCJcIjtcclxuICBjb25zdCByZXR1cm5VcmwgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1yZXR1cm4tdXJsXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgcmVhZE9ubHlBdHRyID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcmVhZC1vbmx5XCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgaW5pdGlhbFJlYWRPbmx5ID1cclxuICAgIHBhcnNlQm9vbChyZWFkT25seUF0dHIpIHx8IHBhcnNlQm9vbChnZXRRdWVyeVBhcmFtKFwicmVhZE9ubHlcIikpIHx8IHBhcnNlQm9vbChnZXRRdWVyeVBhcmFtKFwicmVhZG9ubHlcIikpO1xyXG4gIGNvbnN0IGFsbG93RWRpdEF0dHIgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1hbGxvdy1lZGl0XCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgYWxsb3dFZGl0UXVlcnkgPSBnZXRRdWVyeVBhcmFtKFwiYWxsb3dFZGl0XCIpIHx8IGdldFF1ZXJ5UGFyYW0oXCJjYW5FZGl0XCIpO1xyXG4gIGNvbnN0IGFsbG93RWRpdCA9IHBhcnNlT3B0aW9uYWxCb29sKGFsbG93RWRpdFF1ZXJ5LCBwYXJzZU9wdGlvbmFsQm9vbChhbGxvd0VkaXRBdHRyLCB0cnVlKSk7XHJcbiAgY29uc3QgZWRpdE1vZGVLZXlBdHRyID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtZWRpdC1tb2RlLWtleVwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGVkaXRNb2RlS2V5ID0gZWRpdE1vZGVLZXlBdHRyIHx8IGdldFF1ZXJ5UGFyYW0oXCJlZGl0TW9kZUtleVwiKSB8fCBcIlwiO1xyXG5cclxuICBtb3VudFJlYWN0SXNsYW5kKFxuICAgIHJvb3RFbCxcbiAgICA8SW5kVGV4dEVkaXRvckFwcFxuICAgICAgZmllbGRJZD17ZmllbGRJZH1cbiAgICAgIGZpZWxkTGFiZWw9e2ZpZWxkTGFiZWx9XG4gICAgICBpbml0aWFsVmFsdWU9e2luaXRpYWxWYWx1ZX1cbiAgICAgIHJldHVyblVybD17cmV0dXJuVXJsfVxuICAgICAgaW5pdGlhbFJlYWRPbmx5PXtpbml0aWFsUmVhZE9ubHl9XG4gICAgICBlZGl0TW9kZUtleT17ZWRpdE1vZGVLZXl9XG4gICAgICBhbGxvd0VkaXQ9e2FsbG93RWRpdH1cbiAgICAvPlxuICApO1xufTtcblxuLy8gQXV0by1tb3VudCB3aGVuIHRoZSBwYWdlIGJ1bmRsZSBsb2Fkcy5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBtb3VudFRleHRFZGl0b3IoKTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuZXhwb3J0IGRlZmF1bHQgSW5kVGV4dEVkaXRvckFwcDtcbiIsICJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIENoZXZyb25MZWZ0SWNvbih7XG4gIHRpdGxlLFxuICB0aXRsZUlkLFxuICAuLi5wcm9wc1xufSwgc3ZnUmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgIGZpbGw6IFwibm9uZVwiLFxuICAgIHZpZXdCb3g6IFwiMCAwIDI0IDI0XCIsXG4gICAgc3Ryb2tlV2lkdGg6IDEuNSxcbiAgICBzdHJva2U6IFwiY3VycmVudENvbG9yXCIsXG4gICAgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIixcbiAgICBcImRhdGEtc2xvdFwiOiBcImljb25cIixcbiAgICByZWY6IHN2Z1JlZixcbiAgICBcImFyaWEtbGFiZWxsZWRieVwiOiB0aXRsZUlkXG4gIH0sIHByb3BzKSwgdGl0bGUgPyAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInRpdGxlXCIsIHtcbiAgICBpZDogdGl0bGVJZFxuICB9LCB0aXRsZSkgOiBudWxsLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICAgIHN0cm9rZUxpbmVjYXA6IFwicm91bmRcIixcbiAgICBzdHJva2VMaW5lam9pbjogXCJyb3VuZFwiLFxuICAgIGQ6IFwiTTE1Ljc1IDE5LjUgOC4yNSAxMmw3LjUtNy41XCJcbiAgfSkpO1xufVxuY29uc3QgRm9yd2FyZFJlZiA9IC8qI19fUFVSRV9fKi8gUmVhY3QuZm9yd2FyZFJlZihDaGV2cm9uTGVmdEljb24pO1xuZXhwb3J0IGRlZmF1bHQgRm9yd2FyZFJlZjsiLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFB1bHNlUmluZ3NNdWx0aXBsZUljb25Qcm9wcyA9IHtcbiAgc2l6ZT86IG51bWJlciB8IHN0cmluZztcbiAgY29sb3I/OiBzdHJpbmc7XG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICBiYWNrZ3JvdW5kPzogc3RyaW5nO1xuICBvcGFjaXR5PzogbnVtYmVyO1xuICByb3RhdGlvbj86IG51bWJlcjtcbiAgc2hhZG93PzogbnVtYmVyO1xuICBmbGlwSG9yaXpvbnRhbD86IGJvb2xlYW47XG4gIGZsaXBWZXJ0aWNhbD86IGJvb2xlYW47XG4gIHBhZGRpbmc/OiBudW1iZXI7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIFB1bHNlIHJpbmdzIGljb24gd2l0aCBDU1MgYW5pbWF0aW9uIHRvIGF2b2lkIFNNSUwgY29tcGF0aWJpbGl0eSBpc3N1ZXMuXG5jb25zdCBQdWxzZVJpbmdzTXVsdGlwbGVJY29uID0gKHtcbiAgc2l6ZSxcbiAgY29sb3IgPSBcImN1cnJlbnRDb2xvclwiLFxuICBzdHJva2VXaWR0aCA9IDIsXG4gIGJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50XCIsXG4gIG9wYWNpdHkgPSAwLjQsXG4gIHJvdGF0aW9uID0gOTAsXG4gIHNoYWRvdyA9IDAsXG4gIGZsaXBIb3Jpem9udGFsID0gZmFsc2UsXG4gIGZsaXBWZXJ0aWNhbCA9IGZhbHNlLFxuICBwYWRkaW5nID0gMTIsXG4gIGNsYXNzTmFtZSxcbn06IFB1bHNlUmluZ3NNdWx0aXBsZUljb25Qcm9wcykgPT4ge1xuICBjb25zdCB0cmFuc2Zvcm1zID0gW107XG4gIGlmIChyb3RhdGlvbiAhPT0gMCkgdHJhbnNmb3Jtcy5wdXNoKGByb3RhdGUoJHtyb3RhdGlvbn1kZWcpYCk7XG4gIGlmIChmbGlwSG9yaXpvbnRhbCkgdHJhbnNmb3Jtcy5wdXNoKFwic2NhbGVYKC0xKVwiKTtcbiAgaWYgKGZsaXBWZXJ0aWNhbCkgdHJhbnNmb3Jtcy5wdXNoKFwic2NhbGVZKC0xKVwiKTtcblxuICBjb25zdCB2aWV3Qm94U2l6ZSA9IDI0ICsgcGFkZGluZyAqIDI7XG4gIGNvbnN0IHZpZXdCb3hPZmZzZXQgPSAtcGFkZGluZztcbiAgY29uc3Qgdmlld0JveCA9IGAke3ZpZXdCb3hPZmZzZXR9ICR7dmlld0JveE9mZnNldH0gJHt2aWV3Qm94U2l6ZX0gJHt2aWV3Qm94U2l6ZX1gO1xuICBjb25zdCByaW5nUGF0aCA9XG4gICAgXCJNMTIsMUExMSwxMSwwLDEsMCwyMywxMiwxMSwxMSwwLDAsMCwxMiwxWm0wLDIwYTksOSwwLDEsMSw5LTlBOSw5LDAsMCwxLDEyLDIxWlwiO1xuXG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICB2aWV3Qm94PXt2aWV3Qm94fVxuICAgICAgd2lkdGg9e3NpemV9XG4gICAgICBoZWlnaHQ9e3NpemV9XG4gICAgICBmaWxsPVwibm9uZVwiXG4gICAgICBzdHJva2U9e2NvbG9yfVxuICAgICAgc3Ryb2tlV2lkdGg9e3N0cm9rZVdpZHRofVxuICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICBzdHlsZT17e1xuICAgICAgICBvcGFjaXR5LFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybXMuam9pbihcIiBcIikgfHwgdW5kZWZpbmVkLFxuICAgICAgICBmaWx0ZXI6IHNoYWRvdyA+IDAgPyBgZHJvcC1zaGFkb3coMCAke3NoYWRvd31weCAke3NoYWRvdyAqIDJ9cHggcmdiYSgwLDAsMCwwLjMpKWAgOiB1bmRlZmluZWQsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZCAhPT0gXCJ0cmFuc3BhcmVudFwiID8gYmFja2dyb3VuZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJpbmQtcHVsc2UtcmluZy0tYmFzZVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPXtyaW5nUGF0aH0gLz5cbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImluZC1wdWxzZS1yaW5nXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9e3JpbmdQYXRofSAvPlxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmcgaW5kLXB1bHNlLXJpbmctLWRlbGF5LTFcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJpbmQtcHVsc2UtcmluZyBpbmQtcHVsc2UtcmluZy0tZGVsYXktMlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPXtyaW5nUGF0aH0gLz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1bHNlUmluZ3NNdWx0aXBsZUljb247XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQXlFOzs7QUNBekUsWUFBdUI7QUFDdkIsU0FBUyxnQkFBZ0I7QUFBQSxFQUN2QjtBQUFBLEVBQ0E7QUFBQSxFQUNBLEdBQUc7QUFDTCxHQUFHLFFBQVE7QUFDVCxTQUFvQixnQkFBTSxvQkFBYyxPQUFPLE9BQU8sT0FBTztBQUFBLElBQzNELE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxJQUNmLGFBQWE7QUFBQSxJQUNiLEtBQUs7QUFBQSxJQUNMLG1CQUFtQjtBQUFBLEVBQ3JCLEdBQUcsS0FBSyxHQUFHLFFBQXFCLGdCQUFNLG9CQUFjLFNBQVM7QUFBQSxJQUMzRCxJQUFJO0FBQUEsRUFDTixHQUFHLEtBQUssSUFBSSxNQUFtQixnQkFBTSxvQkFBYyxRQUFRO0FBQUEsSUFDekQsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsR0FBRztBQUFBLEVBQ0wsQ0FBQyxDQUFDO0FBQ0o7QUFDQSxJQUFNLGFBQTJCLGdCQUFNLGlCQUFXLGVBQWU7QUFDakUsSUFBTywwQkFBUTs7O0FDaUJYO0FBekJKLElBQU0seUJBQXlCLENB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
