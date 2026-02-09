import {
  AudioRecorderMinimal
} from "./chunks/chunk-SIPNQN4V.js";
import {
  require_client,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-RGGEM6AY.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/system/TextEditor.tsx
var import_react = __toESM(require_react());
var import_client = __toESM(require_client());

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
var STORAGE_PREFIX = "ind_texteditor_";
var TOPBAR_HEIGHT = 64;
var OUTER_MARGIN = 5;
var MIN_EDITOR_HEIGHT = 240;
var RECORDER_GAP = 12;
var TYPE_INTERVAL_MS = 28;
var TYPE_TARGET_MS = 4200;
var TYPE_MIN_STEP = 1;
var TYPE_MAX_STEP = 4;
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
  }
}
function safeRemoveSessionValue(key) {
  try {
    sessionStorage.removeItem(key);
  } catch {
  }
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
      const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${safeId}_returnUrl`);
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
  const existing = rootEl.__indRoot;
  const element = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  );
  if (existing) {
    existing.render(element);
    return;
  }
  const root = (0, import_client.createRoot)(rootEl);
  rootEl.__indRoot = root;
  root.render(element);
};
var mount = () => {
  mountTextEditor();
};
if (typeof document !== "undefined") {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }
}
var TextEditor_default = IndTextEditorApp;
export {
  TextEditor_default as default,
  mountTextEditor
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9UZXh0RWRpdG9yLnRzeCIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lL2VzbS9DaGV2cm9uTGVmdEljb24uanMiLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QdWxzZVJpbmdzTXVsdGlwbGVJY29uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xuaW1wb3J0IHsgQ2hldnJvbkxlZnRJY29uIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZVwiO1xyXG5pbXBvcnQgQXVkaW9SZWNvcmRlck1pbmltYWwgZnJvbSBcIi4vQXVkaW9SZWNvcmRlck1pbmltYWwudHN4XCI7XG5pbXBvcnQgUHVsc2VSaW5nc011bHRpcGxlSWNvbiBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1B1bHNlUmluZ3NNdWx0aXBsZUljb24udHN4XCI7XG5cclxuY29uc3QgSU5EX0kxOE4gPSBnbG9iYWxUaGlzLl9fSU5EX0kxOE5fXyB8fCB7fTtcclxuY29uc3QgaW5kVCA9IChrZXksIGZhbGxiYWNrKSA9PiAoSU5EX0kxOE4gJiYgdHlwZW9mIElORF9JMThOW2tleV0gPT09IFwic3RyaW5nXCIgJiYgSU5EX0kxOE5ba2V5XSkgfHwgZmFsbGJhY2sgfHwga2V5O1xyXG5cclxuY29uc3QgU1RPUkFHRV9QUkVGSVggPSBcImluZF90ZXh0ZWRpdG9yX1wiO1xyXG5jb25zdCBUT1BCQVJfSEVJR0hUID0gNjQ7XHJcbmNvbnN0IE9VVEVSX01BUkdJTiA9IDU7XHJcbmNvbnN0IE1JTl9FRElUT1JfSEVJR0hUID0gMjQwO1xyXG5jb25zdCBSRUNPUkRFUl9HQVAgPSAxMjtcbmNvbnN0IFRZUEVfSU5URVJWQUxfTVMgPSAyODtcbmNvbnN0IFRZUEVfVEFSR0VUX01TID0gNDIwMDtcbmNvbnN0IFRZUEVfTUlOX1NURVAgPSAxO1xuY29uc3QgVFlQRV9NQVhfU1RFUCA9IDQ7XG5cbnR5cGUgSW5kUm9vdEVsZW1lbnQgPSBIVE1MRWxlbWVudCAmIHsgX19pbmRSb290PzogaW1wb3J0KFwicmVhY3QtZG9tL2NsaWVudFwiKS5Sb290IH07XG5cbi8vIFNoYXJlZCBzcGlubmVyIGZvciBsb2NhbCBsb2FkaW5nIHN0YXRlcy5cclxudHlwZSBTcGlubmVyUHJvcHMgPSB7XG4gIHNpemU/OiBzdHJpbmc7XG4gIGxhYmVsPzogc3RyaW5nO1xufTtcblxuY29uc3QgU3Bpbm5lciA9ICh7IHNpemUgPSBcImgtNiB3LTZcIiwgbGFiZWwgPSBcIlwiIH06IFNwaW5uZXJQcm9wcykgPT4gKFxuICA8c3ZnXHJcbiAgICBjbGFzc05hbWU9e2BpbmQtc3Bpbm5lciAke3NpemV9YH1cclxuICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxyXG4gICAgcm9sZT1cInN0YXR1c1wiXHJcbiAgICBhcmlhLWxhYmVsPXtsYWJlbCB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gID5cclxuICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xuXG5jb25zdCBnZXRDc3JmVG9rZW4gPSAoKSA9PiB7XG4gIGNvbnN0IG1ldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJyk7XG4gIHJldHVybiBtZXRhID8gbWV0YS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpIDogXCJcIjtcbn07XG5cclxuZnVuY3Rpb24gc2FmZUdldFNlc3Npb25WYWx1ZShrZXkpIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZVNldFNlc3Npb25WYWx1ZShrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn1cblxuLy8gUmVtb3ZlIGEgc2Vzc2lvbiB2YWx1ZSB3aXRob3V0IHRocm93aW5nIGZvciBibG9ja2VkIHN0b3JhZ2UuXG5mdW5jdGlvbiBzYWZlUmVtb3ZlU2Vzc2lvblZhbHVlKGtleSkge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn1cblxyXG5mdW5jdGlvbiBwYXJzZUJvb2wodmFsdWUpIHtcclxuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBub3JtYWxpemVkID09PSBcIjFcIiB8fCBub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcInllc1wiO1xyXG59XHJcblxyXG4vLyBQYXJzZXMgb3B0aW9uYWwgYm9vbGVhbiB2YWx1ZXMgd2l0aCBhIGRlZmF1bHQgZmFsbGJhY2suXHJcbmZ1bmN0aW9uIHBhcnNlT3B0aW9uYWxCb29sKHZhbHVlLCBmYWxsYmFjaykge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbGxiYWNrO1xyXG4gIHJldHVybiBwYXJzZUJvb2wobm9ybWFsaXplZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFF1ZXJ5UGFyYW0oa2V5KSB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcIlwiO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IFwiXCIpLmdldChrZXkpIHx8IFwiXCI7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVkaXRNb2RlS2V5KHZhbHVlKSB7XHJcbiAgY29uc3Qga2V5ID0gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIWtleSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIGtleS5zdGFydHNXaXRoKFwiaW5kX3Zpc2l0X2VkaXRfXCIpID8ga2V5IDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gSW5kVGV4dEVkaXRvckFwcCh7IGZpZWxkSWQsIGZpZWxkTGFiZWwsIGluaXRpYWxWYWx1ZSwgcmV0dXJuVXJsLCBpbml0aWFsUmVhZE9ubHkgPSBmYWxzZSwgZWRpdE1vZGVLZXkgPSBcIlwiLCBhbGxvd0VkaXQgPSB0cnVlIH0pIHtcbiAgY29uc3Qgc3RvcmFnZUtleSA9IHVzZU1lbW8oKCkgPT4gYCR7U1RPUkFHRV9QUkVGSVh9JHtTdHJpbmcoZmllbGRJZCB8fCBcIlwiKS50cmltKCl9YCwgW2ZpZWxkSWRdKTtcbiAgLy8gUmVzb2x2ZSByZXR1cm4gVVJMIGZyb20gcHJvcHMgb3Igc2Vzc2lvblN0b3JhZ2UuXHJcbiAgY29uc3QgcmVzb2x2ZWRSZXR1cm5VcmwgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGRpcmVjdCA9IHR5cGVvZiByZXR1cm5VcmwgPT09IFwic3RyaW5nXCIgPyByZXR1cm5VcmwudHJpbSgpIDogXCJcIjtcclxuICAgIGlmIChkaXJlY3QpIHJldHVybiBkaXJlY3Q7XHJcbiAgICBjb25zdCBzYWZlSWQgPSBTdHJpbmcoZmllbGRJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoIXNhZmVJZCkgcmV0dXJuIFwiXCI7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzdG9yZWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGAke1NUT1JBR0VfUFJFRklYfSR7c2FmZUlkfV9yZXR1cm5VcmxgKTtcclxuICAgICAgcmV0dXJuIHN0b3JlZCA/IFN0cmluZyhzdG9yZWQpLnRyaW0oKSA6IFwiXCI7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgfSwgW2ZpZWxkSWQsIHJldHVyblVybF0pO1xyXG4gIGNvbnN0IGNhbkVkaXQgPSAhIWFsbG93RWRpdDtcclxuICBjb25zdCBbaXNSZWFkT25seSwgc2V0SXNSZWFkT25seV0gPSB1c2VTdGF0ZSghIWluaXRpYWxSZWFkT25seSB8fCAhY2FuRWRpdCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRFZGl0TW9kZUtleSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplRWRpdE1vZGVLZXkoZWRpdE1vZGVLZXkpLCBbZWRpdE1vZGVLZXldKTtcbiAgY29uc3QgW3JlY29yZGVyT3Blbiwgc2V0UmVjb3JkZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcmVjb3JkZXJSZXNldEtleSwgc2V0UmVjb3JkZXJSZXNldEtleV0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbcmVjb3JkZXJIZWlnaHRQeCwgc2V0UmVjb3JkZXJIZWlnaHRQeF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbaXNUcmFuc2NyaWJpbmcsIHNldElzVHJhbnNjcmliaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbdHJhbnNjcmliZUVycm9yLCBzZXRUcmFuc2NyaWJlRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzVHlwaW5nLCBzZXRJc1R5cGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcmVjb3JkZXJCb3hSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgdHlwaW5nVGltZXJSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHR5cGluZ1RleHRSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IHR5cGluZ0luZGV4UmVmID0gdXNlUmVmKDApO1xuICBjb25zdCBpbml0aWFsVGV4dFJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgdGV4dGFyZWFSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbXB1dGVFZGl0b3JIZWlnaHQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGBjYWxjKDEwMHZoIC0gJHtUT1BCQVJfSEVJR0hUICsgT1VURVJfTUFSR0lOICogMn1weClgO1xyXG4gICAgICByZXR1cm4gZmFsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2aWV3cG9ydCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCAwO1xyXG4gICAgaWYgKCF2aWV3cG9ydCkge1xyXG4gICAgICByZXR1cm4gYGNhbGMoMTAwdmggLSAke1RPUEJBUl9IRUlHSFQgKyBPVVRFUl9NQVJHSU4gKiAyfXB4KWA7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZWNvcmRlclNwYWNlID0gcmVjb3JkZXJPcGVuID8gcmVjb3JkZXJIZWlnaHRQeCArIFJFQ09SREVSX0dBUCA6IDA7XHJcbiAgICBjb25zdCBhdmFpbGFibGUgPSBNYXRoLm1heCh2aWV3cG9ydCAtIFRPUEJBUl9IRUlHSFQgLSBPVVRFUl9NQVJHSU4gKiAyIC0gcmVjb3JkZXJTcGFjZSwgTUlOX0VESVRPUl9IRUlHSFQpO1xyXG4gICAgcmV0dXJuIGAke2F2YWlsYWJsZX1weGA7XHJcbiAgfSwgW3JlY29yZGVyT3BlbiwgcmVjb3JkZXJIZWlnaHRQeF0pO1xyXG5cclxuICBjb25zdCBbZWRpdG9ySGVpZ2h0LCBzZXRFZGl0b3JIZWlnaHRdID0gdXNlU3RhdGUoKCkgPT4gY29tcHV0ZUVkaXRvckhlaWdodCgpKTtcclxuXHJcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gdXNlU3RhdGUoKCkgPT4ge1xuICAgIGNvbnN0IHN0b3JlZCA9IHNhZmVHZXRTZXNzaW9uVmFsdWUoc3RvcmFnZUtleSk7XG4gICAgY29uc3QgaW5pdGlhbFRleHQgPSBzdG9yZWQgIT09IG51bGwgPyBzdG9yZWQgOiBTdHJpbmcoaW5pdGlhbFZhbHVlIHx8IFwiXCIpO1xuICAgIGluaXRpYWxUZXh0UmVmLmN1cnJlbnQgPSBpbml0aWFsVGV4dDtcbiAgICByZXR1cm4gaW5pdGlhbFRleHQ7XG4gIH0pO1xuXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKFxuICAgICgpID0+ICFpc1JlYWRPbmx5ICYmIChpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZyB8fCB0ZXh0ICE9PSAoaW5pdGlhbFRleHRSZWYuY3VycmVudCA/PyBcIlwiKSksXG4gICAgW2lzUmVhZE9ubHksIGlzVHJhbnNjcmliaW5nLCBpc1R5cGluZywgdGV4dF1cbiAgKTtcblxyXG4gIGNvbnN0IHN0b3BUeXBpbmcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwaW5nVGltZXJSZWYuY3VycmVudCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgIHR5cGluZ1RpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgdHlwaW5nVGV4dFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIHR5cGluZ0luZGV4UmVmLmN1cnJlbnQgPSAwO1xyXG4gICAgc2V0SXNUeXBpbmcoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc3RhcnRUeXBpbmcgPSB1c2VDYWxsYmFjayhcclxuICAgIChmdWxsVGV4dCkgPT4ge1xyXG4gICAgICBjb25zdCB0ZXh0VmFsdWUgPSBTdHJpbmcoZnVsbFRleHQgfHwgXCJcIik7XHJcbiAgICAgIHN0b3BUeXBpbmcoKTtcclxuICAgICAgaWYgKCF0ZXh0VmFsdWUpIHtcclxuICAgICAgICBzZXRUZXh0KFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdHlwaW5nVGV4dFJlZi5jdXJyZW50ID0gdGV4dFZhbHVlO1xyXG4gICAgICB0eXBpbmdJbmRleFJlZi5jdXJyZW50ID0gMDtcclxuICAgICAgc2V0SXNUeXBpbmcodHJ1ZSk7XHJcbiAgICAgIHNldFRleHQoXCJcIik7XHJcblxyXG4gICAgICBjb25zdCB0b3RhbCA9IHRleHRWYWx1ZS5sZW5ndGg7XHJcbiAgICAgIGNvbnN0IG1heFN0ZXBzID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihUWVBFX1RBUkdFVF9NUyAvIFRZUEVfSU5URVJWQUxfTVMpKTtcclxuICAgICAgY29uc3Qgc3RlcFNpemUgPSBNYXRoLm1pbihUWVBFX01BWF9TVEVQLCBNYXRoLm1heChUWVBFX01JTl9TVEVQLCBNYXRoLmNlaWwodG90YWwgLyBtYXhTdGVwcykpKTtcclxuXHJcbiAgICAgIGNvbnN0IHRpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9IE1hdGgubWluKHR5cGluZ0luZGV4UmVmLmN1cnJlbnQgKyBzdGVwU2l6ZSwgdG90YWwpO1xyXG4gICAgICAgIHR5cGluZ0luZGV4UmVmLmN1cnJlbnQgPSBuZXh0O1xyXG4gICAgICAgIHNldFRleHQodHlwaW5nVGV4dFJlZi5jdXJyZW50LnNsaWNlKDAsIG5leHQpKTtcclxuICAgICAgICBpZiAobmV4dCA8IHRvdGFsKSB7XHJcbiAgICAgICAgICB0eXBpbmdUaW1lclJlZi5jdXJyZW50ID0gc2V0VGltZW91dCh0aWNrLCBUWVBFX0lOVEVSVkFMX01TKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdHlwaW5nVGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgICBzZXRJc1R5cGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdHlwaW5nVGltZXJSZWYuY3VycmVudCA9IHNldFRpbWVvdXQodGljaywgVFlQRV9JTlRFUlZBTF9NUyk7XHJcbiAgICB9LFxyXG4gICAgW3N0b3BUeXBpbmddXHJcbiAgKTtcclxuXHJcbiAgLy8gU2VuZCB0aGUgV0FWIHRvIE1WQyBhbmQgcmVwbGFjZSB0ZXh0YXJlYSB3aXRoIHRoZSB0cmFuc2NyaXB0aW9uLlxyXG4gIGNvbnN0IGhhbmRsZVRyYW5zY3JpYmUgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jICh3YXZCbG9iKSA9PiB7XHJcbiAgICAgIGlmICghd2F2QmxvYiB8fCBpc1RyYW5zY3JpYmluZykgcmV0dXJuO1xyXG5cclxuICAgICAgLy8gTG9jayB0aGUgZWRpdG9yIHdoaWxlIHRoZSB0cmFuc2NyaXB0aW9uIHJlcXVlc3QgaXMgaW4gZmxpZ2h0LlxyXG4gICAgICBzZXRJc1RyYW5zY3JpYmluZyh0cnVlKTtcclxuICAgICAgc2V0VHJhbnNjcmliZUVycm9yKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBCdWlsZCBtdWx0aXBhcnQgZm9ybSBwYXlsb2FkIGV4cGVjdGVkIGJ5IC9WaXNpdGFzL1RyYW5zY3JpYmVTcGVlY2guXHJcbiAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kKFwibGFuZ3VhZ2VJZFwiLCBcImF1dG9cIik7XHJcbiAgICAgICAgZm9ybS5hcHBlbmQoXCJhdWRpb0ZpbGVcIiwgd2F2QmxvYiwgXCJhdWRpby53YXZcIik7XHJcbiAgICAgICAgaWYgKHJlc29sdmVkUmV0dXJuVXJsKSB7XHJcbiAgICAgICAgICBmb3JtLmFwcGVuZChcInJldHVyblVybFwiLCByZXNvbHZlZFJldHVyblVybCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcclxuICAgICAgICBjb25zdCBoZWFkZXJzID0ge1xyXG4gICAgICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIsXHJcbiAgICAgICAgICAuLi4oY3NyZlRva2VuID8geyBSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW46IGNzcmZUb2tlbiB9IDoge30pLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNlbmQgdGhlIFdBViB0byBNVkMgKHNlcnZlciB3aWxsIGNhbGwgdGhlIHNwZWVjaCBBUEkpLlxyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gcmVzb2x2ZWRSZXR1cm5VcmwgPyBgP3JldHVyblVybD0ke2VuY29kZVVSSUNvbXBvbmVudChyZXNvbHZlZFJldHVyblVybCl9YCA6IFwiXCI7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL1Zpc2l0YXMvVHJhbnNjcmliZVNwZWVjaCR7cXVlcnl9YCwge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgIGJvZHk6IGZvcm0sXHJcbiAgICAgICAgICBoZWFkZXJzLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+IG51bGwpO1xyXG4gICAgICAgIGNvbnN0IG9rID0gcmVzcG9uc2Uub2sgJiYgcGF5bG9hZCAmJiBwYXlsb2FkLnN1Y2Nlc3MgPT09IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgIGNvbnN0IG1zZyA9IHBheWxvYWQgJiYgcGF5bG9hZC5tZXNzYWdlID8gU3RyaW5nKHBheWxvYWQubWVzc2FnZSkgOiBpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJlRmFpbGVkXCIsIFwiVHJhbnNjcmliZSBmYWlsZWQuXCIpO1xyXG4gICAgICAgICAgc2V0VHJhbnNjcmliZUVycm9yKG1zZyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0cmFuc2NyaXB0ID0gcGF5bG9hZCAmJiB0eXBlb2YgcGF5bG9hZC5kYXRhID09PSBcInN0cmluZ1wiID8gcGF5bG9hZC5kYXRhIDogXCJcIjtcclxuICAgICAgICBpZiAoIXRyYW5zY3JpcHQudHJpbSgpKSB7XHJcbiAgICAgICAgICBzZXRUcmFuc2NyaWJlRXJyb3IoaW5kVChcIlRleHRFZGl0b3JfVHJhbnNjcmliZUZhaWxlZFwiLCBcIlRyYW5zY3JpYmUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBmdWxsIHRleHRhcmVhIGNvbnRlbnQgd2l0aCB0aGUgbmV3IHRyYW5zY3JpcHRpb24uXHJcbiAgICAgICAgc3RhcnRUeXBpbmcodHJhbnNjcmlwdCk7XHJcbiAgICAgICAgLy8gSGlkZSB0aGUgcmVjb3JkZXIgYWZ0ZXIgYSBzdWNjZXNzZnVsIHRyYW5zY3JpcHRpb24uXHJcbiAgICAgICAgc2V0UmVjb3JkZXJPcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRSZWNvcmRlclJlc2V0S2V5KChrKSA9PiBrICsgMSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnN0IG1zZyA9IGVyciAmJiBlcnIubWVzc2FnZSA/IFN0cmluZyhlcnIubWVzc2FnZSkgOiBpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJlRmFpbGVkXCIsIFwiVHJhbnNjcmliZSBmYWlsZWQuXCIpO1xyXG4gICAgICAgIHNldFRyYW5zY3JpYmVFcnJvcihtc2cpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIC8vIFJlLWVuYWJsZSB0aGUgZWRpdG9yIGFmdGVyIGNvbXBsZXRpb24uXHJcbiAgICAgICAgc2V0SXNUcmFuc2NyaWJpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2lzVHJhbnNjcmliaW5nLCBzdGFydFR5cGluZ11cclxuICApO1xyXG5cclxuICAvLyBDbGVhciB0cmFuc2NyaXB0aW9uIGVycm9ycyB3aGVuIGF1ZGlvIGNoYW5nZXMuXHJcbiAgY29uc3QgaGFuZGxlQXVkaW9DbGVhcmVkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFRyYW5zY3JpYmVFcnJvcihcIlwiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVJlY29yZGluZ0Vycm9yID0gdXNlQ2FsbGJhY2soKG1lc3NhZ2UpID0+IHtcbiAgICAvLyBTaG93IGEgd2FybmluZyBhY3Rpb24gbWFyazsga2VlcCB0aGUgcmVjb3JkZXIgb3BlbiB0byBkaXNwbGF5IHRoZSBlcnJvciBsYWJlbC5cbiAgICB0cnkge1xuICAgICAgaWYgKHdpbmRvdy5JTkQgJiYgdHlwZW9mIHdpbmRvdy5JTkQuZmxhc2hBY3Rpb25NYXJrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgd2luZG93LklORC5mbGFzaEFjdGlvbk1hcmsoeyB0eXBlOiBcIndhcm5pbmdQcm9jZXNzXCIsIGR1cmF0aW9uTXM6IDE1MDAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBpZ25vcmVcbiAgICB9XG4gIH0sIFtdKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHVwZGF0ZUhlaWdodCA9ICgpID0+IHtcclxuICAgICAgc2V0RWRpdG9ySGVpZ2h0KGNvbXB1dGVFZGl0b3JIZWlnaHQoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZUhlaWdodCgpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlSGVpZ2h0KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgdXBkYXRlSGVpZ2h0KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZUhlaWdodCk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgdXBkYXRlSGVpZ2h0KTtcclxuICAgIH07XHJcbiAgfSwgW2NvbXB1dGVFZGl0b3JIZWlnaHRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgaWYgKCFyZWNvcmRlck9wZW4pIHtcclxuICAgICAgc2V0UmVjb3JkZXJIZWlnaHRQeCgwKTtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbCA9IHJlY29yZGVyQm94UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsKSByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0IG1lYXN1cmUgPSAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHNldFJlY29yZGVySGVpZ2h0UHgoTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihyZWN0LmhlaWdodCkpKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbWVhc3VyZSgpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgY29uc3Qgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIobWVhc3VyZSk7XHJcbiAgICAgIHJvLm9ic2VydmUoZWwpO1xyXG4gICAgICByZXR1cm4gKCkgPT4gcm8uZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG1lYXN1cmUpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG1lYXN1cmUpO1xyXG4gIH0sIFtyZWNvcmRlck9wZW5dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHN0b3BUeXBpbmcsIFtzdG9wVHlwaW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihoYXNBY3RpdmVQcm9jZXNzKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xuICAgIH07XG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1R5cGluZykgcmV0dXJuO1xyXG4gICAgY29uc3QgZWwgPSB0ZXh0YXJlYVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgZWwuc2Nyb2xsVG9wID0gZWwuc2Nyb2xsSGVpZ2h0O1xyXG4gIH0sIFtpc1R5cGluZywgdGV4dF0pO1xyXG5cclxuICBjb25zdCB0b2dnbGVSZWNvcmRlciA9ICgpID0+IHtcclxuICAgIGlmIChpc1JlYWRPbmx5IHx8IGlzVHJhbnNjcmliaW5nIHx8IGlzVHlwaW5nKSByZXR1cm47XHJcbiAgICBzZXRUcmFuc2NyaWJlRXJyb3IoXCJcIik7XHJcbiAgICBzZXRSZWNvcmRlck9wZW4oKG9wZW4pID0+IHtcclxuICAgICAgaWYgKG9wZW4pIHNldFJlY29yZGVyUmVzZXRLZXkoKGspID0+IGsgKyAxKTtcclxuICAgICAgcmV0dXJuICFvcGVuO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWxsb3dIaXN0b3J5TmF2ID0gKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kQWxsb3dIaXN0b3J5T25jZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIHdpbmRvdy5fX2luZEFsbG93SGlzdG9yeU9uY2UoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuRWRpdCB8fCAhaXNSZWFkT25seSkgcmV0dXJuO1xyXG4gICAgc2V0SXNSZWFkT25seShmYWxzZSk7XHJcbiAgICBpZiAobm9ybWFsaXplZEVkaXRNb2RlS2V5KSBzYWZlU2V0U2Vzc2lvblZhbHVlKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSwgXCJ0cnVlXCIpO1xyXG4gIH0sIFtjYW5FZGl0LCBpc1JlYWRPbmx5LCBub3JtYWxpemVkRWRpdE1vZGVLZXldKTtcclxuXHJcbiAgY29uc3QgcGVyc2lzdERyYWZ0ID0gKCkgPT4ge1xyXG4gICAgLy8gUGVyc2lzdCB0aGUgZHJhZnQgc28gdGhlIHByZXZpb3VzIHBhZ2UgY2FuIHJlc3RvcmUgaXQuXHJcbiAgICBzYWZlU2V0U2Vzc2lvblZhbHVlKHN0b3JhZ2VLZXksIHRleHQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdvQmFjayA9ICgpID0+IHtcclxuICAgIHBlcnNpc3REcmFmdCgpO1xyXG4gICAgaWYgKHJlc29sdmVkUmV0dXJuVXJsKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzb2x2ZWRSZXR1cm5Vcmw7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxICYmIGFsbG93SGlzdG9yeU5hdigpKSByZXR1cm47XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ29CYWNrQWZ0ZXJTYXZlID0gKCkgPT4ge1xyXG4gICAgLy8gUHJlZmVyIHJldHVyblVybCBmb3IgZGV0ZXJtaW5pc3RpYyBuYXZpZ2F0aW9uIGFjcm9zcyBicm93c2Vycy5cclxuICAgIGlmIChyZXNvbHZlZFJldHVyblVybCkge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc29sdmVkUmV0dXJuVXJsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMSAmJiBhbGxvd0hpc3RvcnlOYXYoKSkgcmV0dXJuO1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uU2F2ZSA9ICgpID0+IHtcbiAgICBpZiAoaXNSZWFkT25seSB8fCBpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZykgcmV0dXJuO1xuICAgIHNhZmVTZXRTZXNzaW9uVmFsdWUoc3RvcmFnZUtleSwgdGV4dCk7XG4gICAgaWYgKG5vcm1hbGl6ZWRFZGl0TW9kZUtleSkge1xuICAgICAgc2FmZVNldFNlc3Npb25WYWx1ZShub3JtYWxpemVkRWRpdE1vZGVLZXksIFwidHJ1ZVwiKTtcbiAgICAgIHNhZmVTZXRTZXNzaW9uVmFsdWUoYCR7bm9ybWFsaXplZEVkaXRNb2RlS2V5fV9yZXR1cm5gLCBcIjFcIik7XG4gICAgfVxuICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgIGdvQmFja0FmdGVyU2F2ZSgpO1xuICB9O1xuXG4gIC8vIFJlc3RvcmUgdGhlIGluaXRpYWwgdGV4dCB2YWx1ZSBmb3IgdGhpcyBzZXNzaW9uIHdpdGhvdXQgc2F2aW5nLlxuICBjb25zdCBvbkNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmcpIHJldHVybjtcbiAgICBzdG9wVHlwaW5nKCk7XG4gICAgc2V0VHJhbnNjcmliZUVycm9yKFwiXCIpO1xuICAgIGNvbnN0IGluaXRpYWxUZXh0ID0gaW5pdGlhbFRleHRSZWYuY3VycmVudCA/PyBcIlwiO1xuICAgIHNldFRleHQoaW5pdGlhbFRleHQpO1xuICAgIHNhZmVTZXRTZXNzaW9uVmFsdWUoc3RvcmFnZUtleSwgaW5pdGlhbFRleHQpO1xuICAgIGlmIChub3JtYWxpemVkRWRpdE1vZGVLZXkpIHtcbiAgICAgIHNhZmVSZW1vdmVTZXNzaW9uVmFsdWUoYCR7bm9ybWFsaXplZEVkaXRNb2RlS2V5fV9yZXR1cm5gKTtcbiAgICAgIHNhZmVSZW1vdmVTZXNzaW9uVmFsdWUobm9ybWFsaXplZEVkaXRNb2RlS2V5KTtcbiAgICB9XG4gICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgZ29CYWNrQWZ0ZXJTYXZlKCk7XG4gIH0sIFtpc1JlYWRPbmx5LCBpc1RyYW5zY3JpYmluZywgaXNUeXBpbmcsIHN0b3BUeXBpbmcsIHN0b3JhZ2VLZXksIGdvQmFja0FmdGVyU2F2ZSwgbm9ybWFsaXplZEVkaXRNb2RlS2V5XSk7XG5cclxuICBjb25zdCBlZGl0b3JCb3hDbGFzcyA9IGlzUmVhZE9ubHlcbiAgICA/IFwicmVsYXRpdmUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHNoYWRvdy1sZyBvdmVyZmxvdy1oaWRkZW4gZm9jdXMtd2l0aGluOnJpbmctNCBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5LzQwIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeVwiXG4gICAgOiBcInJlbGF0aXZlIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGJnLXdoaXRlIHNoYWRvdy1sZyBvdmVyZmxvdy1oaWRkZW4gZm9jdXMtd2l0aGluOnJpbmctNCBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5LzQwIGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeVwiO1xuICBjb25zdCBtaWNEaXNhYmxlZCA9IGlzUmVhZE9ubHkgfHwgaXNUcmFuc2NyaWJpbmcgfHwgaXNUeXBpbmc7XG4gIGNvbnN0IG1pY0J1dHRvbkNsYXNzID0gYGFic29sdXRlIHRvcC0wIHJpZ2h0LTAgei0yMCBpbmxpbmUtZmxleCBoLVs3MHB4XSB3LVs3MHB4XSBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctdmlzaWJsZSBiZy10cmFuc3BhcmVudCBwLTAgbS0wIGJvcmRlci0wIHJvdW5kZWQtbm9uZSB0ZXh0LXByaW1hcnkgc2hhZG93LW5vbmUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0wIGZvY3VzOnJpbmctb2Zmc2V0LTAke1xuICAgIG1pY0Rpc2FibGVkID8gXCIgb3BhY2l0eS03MCBjdXJzb3Itbm90LWFsbG93ZWRcIiA6IFwiIGhvdmVyOnRleHQtcHJpbWFyeS84MFwiXG4gIH1gO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGgtZHZoIHctZnVsbCBmbGV4IGZsZXgtY29sIGJnLXNsYXRlLTIwMFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcGJhciBzaGFkb3ctbWRcIj5cclxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwidG9wYmFyLWJ0blwiXG4gICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIlRvcGJhcl9CYWNrXCIsIFwiQmFja1wiKX1cbiAgICAgICAgICBvbkNsaWNrPXtnb0JhY2t9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICA8L2J1dHRvbj5cblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wYmFyLWNlbnRlciBmbGV4LTEgZmxleCBqdXN0aWZ5LWNlbnRlciBwb2ludGVyLWV2ZW50cy1ub25lIHB4LTJcIj5cclxuICAgICAgICAgIDxzcGFuIGlkPVwidG9wYmFyVGl0bGVcIiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPlxyXG4gICAgICAgICAgICB7ZmllbGRMYWJlbH1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAge2lzUmVhZE9ubHkgPyAoXHJcbiAgICAgICAgICBjYW5FZGl0ID8gKFxyXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0b3BiYXItYnRuXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9FZGl0XCIsIFwiRWRpdFwiKX1cbiAgICAgICAgICAgICAgb25DbGljaz17ZW5hYmxlRWRpdH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC02IHctNlwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTYuODYyIDQuNDg3IDEuNjg3LTEuNjg4YTEuODc1IDEuODc1IDAgMSAxIDIuNjUyIDIuNjUyTDYuODMyIDE5LjgyYTQuNSA0LjUgMCAwIDEtMS44OTcgMS4xM2wtMi42ODUuOC44LTIuNjg1YTQuNSA0LjUgMCAwIDEgMS4xMy0xLjg5N0wxNi44NjMgNC40ODdabTAgMEwxOS41IDcuMTI1XCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyB3aWR0aDogXCIyNXB4XCIsIGhlaWdodDogXCIyNXB4XCIgfX0gLz5cbiAgICAgICAgICApXG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtWzE0cHhdIHByLTFcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRvcGJhci1idG5cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpfVxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblNhdmV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPVwiMS41XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC02IHctNlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTQuNSAxMi43NSA2IDYgOS0xMy41XCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRvcGJhci1idG5cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cbiAgICAgICAgICAgICAgb25DbGljaz17b25DYW5jZWxFZGl0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD1cIjEuNVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNiB3LTZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk02IDE4IDE4IDZNNiA2bDEyIDEyXCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi1oLTAgdy1mdWxsIHB4LTQgcGItNCBwdC0zXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctM3hsIG14LWF1dG9cIiBzdHlsZT17eyBtYXJnaW5Ub3A6IGAke09VVEVSX01BUkdJTn1weGAsIG1hcmdpbkJvdHRvbTogYCR7T1VURVJfTUFSR0lOfXB4YCB9fT5cclxuICAgICAgICAgIHtyZWNvcmRlck9wZW4gJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHJlZj17cmVjb3JkZXJCb3hSZWZ9IGNsYXNzTmFtZT1cIm1iLTMgdy1mdWxsXCI+XHJcbiAgICAgICAgICAgICAgPEF1ZGlvUmVjb3JkZXJNaW5pbWFsXG4gICAgICAgICAgICAgICAga2V5PXtyZWNvcmRlclJlc2V0S2V5fVxuICAgICAgICAgICAgICAgIGVtYmVkZGVkXG4gICAgICAgICAgICAgICAgb25UcmFuc2NyaWJlPXtoYW5kbGVUcmFuc2NyaWJlfVxuICAgICAgICAgICAgICAgIHRyYW5zY3JpYmVCdXN5PXtpc1RyYW5zY3JpYmluZ31cbiAgICAgICAgICAgICAgICB0cmFuc2NyaWJlTGFiZWw9e2luZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmVcIiwgXCJUcmFuc2NyaWJlXCIpfVxuICAgICAgICAgICAgICAgIHRyYW5zY3JpYmVCdXN5TGFiZWw9e2luZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmluZ1wiLCBcIlRyYW5zY3JpYmluZ1wiKX1cbiAgICAgICAgICAgICAgICBvbkF1ZGlvQ2xlYXJlZD17aGFuZGxlQXVkaW9DbGVhcmVkfVxuICAgICAgICAgICAgICAgIG9uUmVjb3JkaW5nRXJyb3I9e2hhbmRsZVJlY29yZGluZ0Vycm9yfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxyXG4gICAgICAgICAge3RyYW5zY3JpYmVFcnJvciA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi0zIHRleHQteHMgdGV4dC1yb3NlLTcwMCB0ZXh0LWNlbnRlclwiPnt0cmFuc2NyaWJlRXJyb3J9PC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17ZWRpdG9yQm94Q2xhc3N9PlxyXG4gICAgICAgICAgICA8dGV4dGFyZWFcclxuICAgICAgICAgICAgICByZWY9e3RleHRhcmVhUmVmfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCByZXNpemUtbm9uZSBiZy10cmFuc3BhcmVudCBweC01IHBiLTUgcHQtMTAgcHItMTQgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHtpc1JlYWRPbmx5ID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIn1gfVxuICAgICAgICAgICAgICB2YWx1ZT17dGV4dH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFRleHQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZ31cclxuICAgICAgICAgICAgICByZWFkT25seT17aXNSZWFkT25seSB8fCBpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZ31cclxuICAgICAgICAgICAgICBhcmlhLXJlYWRvbmx5PXtpc1JlYWRPbmx5ID8gXCJ0cnVlXCIgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgYXJpYS1idXN5PXtpc1RyYW5zY3JpYmluZyB8fCBpc1R5cGluZ31cclxuICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IGVkaXRvckhlaWdodCB9fVxyXG4gICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAge2lzVHJhbnNjcmliaW5nID8gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTIwMC84MFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC0xNiB3LTE2XCIgLz5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPntpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJpbmdcIiwgXCJUcmFuc2NyaWJpbmdcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXttaWNCdXR0b25DbGFzc31cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJUZXh0RWRpdG9yX01pY3JvcGhvbmVcIiwgXCJNaWNyb3Bob25lXCIpfVxuICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlUmVjb3JkZXJ9XG4gICAgICAgICAgICBkaXNhYmxlZD17bWljRGlzYWJsZWR9XG4gICAgICAgICAgICBhcmlhLWRpc2FibGVkPXttaWNEaXNhYmxlZCA/IFwidHJ1ZVwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgIDxQdWxzZVJpbmdzTXVsdGlwbGVJY29uIHNpemU9ezI0MH0gcGFkZGluZz17MTJ9IGNvbG9yPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezJ9IG9wYWNpdHk9ezAuM30gcm90YXRpb249ezkwfSAvPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC02IHctNiByZWxhdGl2ZSB6LTEwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMiAxOC43NWE2IDYgMCAwIDAgNi02di0xLjVtLTYgNy41YTYgNiAwIDAgMS02LTZ2LTEuNW02IDcuNXYzLjc1bS0zLjc1IDBoNy41TTEyIDE1Ljc1YTMgMyAwIDAgMS0zLTNWNC41YTMgMyAwIDEgMSA2IDB2OC4yNWEzIDMgMCAwIDEtMyAzWlwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gTW91bnQgdGhlIHRleHQgZWRpdG9yIGludG8gdGhlIFJhem9yIHZpZXcuXHJcbmV4cG9ydCBjb25zdCBtb3VudFRleHRFZGl0b3IgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kLXRleHQtZWRpdG9yLXJvb3RcIikgYXMgSW5kUm9vdEVsZW1lbnQgfCBudWxsO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuXHJcbiAgY29uc3QgZmllbGRJZCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkLWlkXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgZmllbGRMYWJlbCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkLWxhYmVsXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgaW5pdGlhbFZhbHVlID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtZmllbGQtdmFsdWVcIikgfHwgXCJcIjtcclxuICBjb25zdCByZXR1cm5VcmwgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1yZXR1cm4tdXJsXCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgcmVhZE9ubHlBdHRyID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcmVhZC1vbmx5XCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgaW5pdGlhbFJlYWRPbmx5ID1cclxuICAgIHBhcnNlQm9vbChyZWFkT25seUF0dHIpIHx8IHBhcnNlQm9vbChnZXRRdWVyeVBhcmFtKFwicmVhZE9ubHlcIikpIHx8IHBhcnNlQm9vbChnZXRRdWVyeVBhcmFtKFwicmVhZG9ubHlcIikpO1xyXG4gIGNvbnN0IGFsbG93RWRpdEF0dHIgPSByb290RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1hbGxvdy1lZGl0XCIpIHx8IFwiXCI7XHJcbiAgY29uc3QgYWxsb3dFZGl0UXVlcnkgPSBnZXRRdWVyeVBhcmFtKFwiYWxsb3dFZGl0XCIpIHx8IGdldFF1ZXJ5UGFyYW0oXCJjYW5FZGl0XCIpO1xyXG4gIGNvbnN0IGFsbG93RWRpdCA9IHBhcnNlT3B0aW9uYWxCb29sKGFsbG93RWRpdFF1ZXJ5LCBwYXJzZU9wdGlvbmFsQm9vbChhbGxvd0VkaXRBdHRyLCB0cnVlKSk7XHJcbiAgY29uc3QgZWRpdE1vZGVLZXlBdHRyID0gcm9vdEVsLmdldEF0dHJpYnV0ZShcImRhdGEtZWRpdC1tb2RlLWtleVwiKSB8fCBcIlwiO1xyXG4gIGNvbnN0IGVkaXRNb2RlS2V5ID0gZWRpdE1vZGVLZXlBdHRyIHx8IGdldFF1ZXJ5UGFyYW0oXCJlZGl0TW9kZUtleVwiKSB8fCBcIlwiO1xyXG5cclxuICBjb25zdCBleGlzdGluZyA9IHJvb3RFbC5fX2luZFJvb3Q7XG4gIGNvbnN0IGVsZW1lbnQgPSAoXG4gICAgPEluZFRleHRFZGl0b3JBcHBcbiAgICAgIGZpZWxkSWQ9e2ZpZWxkSWR9XG4gICAgICBmaWVsZExhYmVsPXtmaWVsZExhYmVsfVxuICAgICAgaW5pdGlhbFZhbHVlPXtpbml0aWFsVmFsdWV9XG4gICAgICByZXR1cm5Vcmw9e3JldHVyblVybH1cbiAgICAgIGluaXRpYWxSZWFkT25seT17aW5pdGlhbFJlYWRPbmx5fVxuICAgICAgZWRpdE1vZGVLZXk9e2VkaXRNb2RlS2V5fVxuICAgICAgYWxsb3dFZGl0PXthbGxvd0VkaXR9XG4gICAgLz5cbiAgKTtcblxuICBpZiAoZXhpc3RpbmcpIHtcbiAgICBleGlzdGluZy5yZW5kZXIoZWxlbWVudCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgcm9vdCA9IGNyZWF0ZVJvb3Qocm9vdEVsKTtcbiAgcm9vdEVsLl9faW5kUm9vdCA9IHJvb3Q7XG4gIHJvb3QucmVuZGVyKGVsZW1lbnQpO1xufTtcblxuLy8gQXV0by1tb3VudCB3aGVuIHRoZSBwYWdlIGJ1bmRsZSBsb2Fkcy5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBtb3VudFRleHRFZGl0b3IoKTtcbn07XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpIHtcbiAgICBtb3VudCgpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG1vdW50KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEluZFRleHRFZGl0b3JBcHA7XG4iLCAiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiBDaGV2cm9uTGVmdEljb24oe1xuICB0aXRsZSxcbiAgdGl0bGVJZCxcbiAgLi4ucHJvcHNcbn0sIHN2Z1JlZikge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICBmaWxsOiBcIm5vbmVcIixcbiAgICB2aWV3Qm94OiBcIjAgMCAyNCAyNFwiLFxuICAgIHN0cm9rZVdpZHRoOiAxLjUsXG4gICAgc3Ryb2tlOiBcImN1cnJlbnRDb2xvclwiLFxuICAgIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsXG4gICAgXCJkYXRhLXNsb3RcIjogXCJpY29uXCIsXG4gICAgcmVmOiBzdmdSZWYsXG4gICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogdGl0bGVJZFxuICB9LCBwcm9wcyksIHRpdGxlID8gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiLCB7XG4gICAgaWQ6IHRpdGxlSWRcbiAgfSwgdGl0bGUpIDogbnVsbCwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgICBzdHJva2VMaW5lY2FwOiBcInJvdW5kXCIsXG4gICAgc3Ryb2tlTGluZWpvaW46IFwicm91bmRcIixcbiAgICBkOiBcIk0xNS43NSAxOS41IDguMjUgMTJsNy41LTcuNVwiXG4gIH0pKTtcbn1cbmNvbnN0IEZvcndhcmRSZWYgPSAvKiNfX1BVUkVfXyovIFJlYWN0LmZvcndhcmRSZWYoQ2hldnJvbkxlZnRJY29uKTtcbmV4cG9ydCBkZWZhdWx0IEZvcndhcmRSZWY7IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBQdWxzZVJpbmdzTXVsdGlwbGVJY29uUHJvcHMgPSB7XG4gIHNpemU/OiBudW1iZXIgfCBzdHJpbmc7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBzdHJva2VXaWR0aD86IG51bWJlcjtcbiAgYmFja2dyb3VuZD86IHN0cmluZztcbiAgb3BhY2l0eT86IG51bWJlcjtcbiAgcm90YXRpb24/OiBudW1iZXI7XG4gIHNoYWRvdz86IG51bWJlcjtcbiAgZmxpcEhvcml6b250YWw/OiBib29sZWFuO1xuICBmbGlwVmVydGljYWw/OiBib29sZWFuO1xuICBwYWRkaW5nPzogbnVtYmVyO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBQdWxzZSByaW5ncyBpY29uIHdpdGggQ1NTIGFuaW1hdGlvbiB0byBhdm9pZCBTTUlMIGNvbXBhdGliaWxpdHkgaXNzdWVzLlxuY29uc3QgUHVsc2VSaW5nc011bHRpcGxlSWNvbiA9ICh7XG4gIHNpemUsXG4gIGNvbG9yID0gXCJjdXJyZW50Q29sb3JcIixcbiAgc3Ryb2tlV2lkdGggPSAyLFxuICBiYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudFwiLFxuICBvcGFjaXR5ID0gMC40LFxuICByb3RhdGlvbiA9IDkwLFxuICBzaGFkb3cgPSAwLFxuICBmbGlwSG9yaXpvbnRhbCA9IGZhbHNlLFxuICBmbGlwVmVydGljYWwgPSBmYWxzZSxcbiAgcGFkZGluZyA9IDEyLFxuICBjbGFzc05hbWUsXG59OiBQdWxzZVJpbmdzTXVsdGlwbGVJY29uUHJvcHMpID0+IHtcbiAgY29uc3QgdHJhbnNmb3JtcyA9IFtdO1xuICBpZiAocm90YXRpb24gIT09IDApIHRyYW5zZm9ybXMucHVzaChgcm90YXRlKCR7cm90YXRpb259ZGVnKWApO1xuICBpZiAoZmxpcEhvcml6b250YWwpIHRyYW5zZm9ybXMucHVzaChcInNjYWxlWCgtMSlcIik7XG4gIGlmIChmbGlwVmVydGljYWwpIHRyYW5zZm9ybXMucHVzaChcInNjYWxlWSgtMSlcIik7XG5cbiAgY29uc3Qgdmlld0JveFNpemUgPSAyNCArIHBhZGRpbmcgKiAyO1xuICBjb25zdCB2aWV3Qm94T2Zmc2V0ID0gLXBhZGRpbmc7XG4gIGNvbnN0IHZpZXdCb3ggPSBgJHt2aWV3Qm94T2Zmc2V0fSAke3ZpZXdCb3hPZmZzZXR9ICR7dmlld0JveFNpemV9ICR7dmlld0JveFNpemV9YDtcbiAgY29uc3QgcmluZ1BhdGggPVxuICAgIFwiTTEyLDFBMTEsMTEsMCwxLDAsMjMsMTIsMTEsMTEsMCwwLDAsMTIsMVptMCwyMGE5LDksMCwxLDEsOS05QTksOSwwLDAsMSwxMiwyMVpcIjtcblxuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgdmlld0JveD17dmlld0JveH1cbiAgICAgIHdpZHRoPXtzaXplfVxuICAgICAgaGVpZ2h0PXtzaXplfVxuICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgc3Ryb2tlPXtjb2xvcn1cbiAgICAgIHN0cm9rZVdpZHRoPXtzdHJva2VXaWR0aH1cbiAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgb3BhY2l0eSxcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1zLmpvaW4oXCIgXCIpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZmlsdGVyOiBzaGFkb3cgPiAwID8gYGRyb3Atc2hhZG93KDAgJHtzaGFkb3d9cHggJHtzaGFkb3cgKiAyfXB4IHJnYmEoMCwwLDAsMC4zKSlgIDogdW5kZWZpbmVkLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmQgIT09IFwidHJhbnNwYXJlbnRcIiA/IGJhY2tncm91bmQgOiB1bmRlZmluZWQsXG4gICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIH19XG4gICAgPlxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmctLWJhc2VcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XG4gICAgICA8cGF0aCBjbGFzc05hbWU9XCJpbmQtcHVsc2UtcmluZ1wiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPXtyaW5nUGF0aH0gLz5cbiAgICAgIDxwYXRoIGNsYXNzTmFtZT1cImluZC1wdWxzZS1yaW5nIGluZC1wdWxzZS1yaW5nLS1kZWxheS0xXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9e3JpbmdQYXRofSAvPlxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwiaW5kLXB1bHNlLXJpbmcgaW5kLXB1bHNlLXJpbmctLWRlbGF5LTJcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgZD17cmluZ1BhdGh9IC8+XG4gICAgPC9zdmc+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWxzZVJpbmdzTXVsdGlwbGVJY29uO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTtBQUN6RSxvQkFBMkI7OztBQ0QzQixZQUF1QjtBQUN2QixTQUFTLGdCQUFnQjtBQUFBLEVBQ3ZCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsR0FBRztBQUNMLEdBQUcsUUFBUTtBQUNULFNBQW9CLGdCQUFNLG9CQUFjLE9BQU8sT0FBTyxPQUFPO0FBQUEsSUFDM0QsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsYUFBYTtB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QUF3RSxlQUFZLFFBQ2xHLHVEQUFDLGtDQUF1QixNQUFNLEtBQUssU0FBUyxJQUFJLE9BQU0sZ0JBQWUsYUFBYSxHQUFHLFNBQVMsS0FBSyxVQUFVLElBQUksR0FDbkg7QUFBQSxjQUNBLDZDQUFDLFNBQUksT0FBTSw4QkFBNkIsTUFBSyxRQUFPLFNBQVEsYUFBWSxhQUFhLEdBQUcsUUFBTyxnQkFBZSxXQUFVLHlCQUF3QixlQUFZLFFBQzFKLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSw4SUFBNkksR0FDcE07QUFBQTtBQUFBO0FBQUEsUUFDTjtBQUFBLFNBQ0E7QUFBQSxPQUNGLEdBQ0Y7QUFBQSxLQUNGO0FBRUo7QUFHTyxJQUFNLGtCQUFrQixNQUFNO0FBQ25DLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBRWIsUUFBTSxVQUFVLE9BQU8sYUFBYSxlQUFlLEtBQUs7QUFDeEQsUUFBTSxhQUFhLE9BQU8sYUFBYSxrQkFBa0IsS0FBSztBQUM5RCxRQUFNLGVBQWUsT0FBTyxhQUFhLGtCQUFrQixLQUFLO0FBQ2hFLFFBQU0sWUFBWSxPQUFPLGFBQWEsaUJBQWlCLEtBQUs7QUFDNUQsUUFBTSxlQUFlLE9BQU8sYUFBYSxnQkFBZ0IsS0FBSztBQUM5RCxRQUFNLGtCQUNKLFVBQVUsWUFBWSxLQUFLLFVBQVUsY0FBYyxVQUFVLENBQUMsS0FBSyxVQUFVLGNBQWMsVUFBVSxDQUFDO0FBQ3hHLFFBQU0sZ0JBQWdCLE9BQU8sYUFBYSxpQkFBaUIsS0FBSztBQUNoRSxRQUFNLGlCQUFpQixjQUFjLFdBQVcsS0FBSyxjQUFjLFNBQVM7QUFDNUUsUUFBTSxZQUFZLGtCQUFrQixnQkFBZ0Isa0JBQWtCLGVBQWUsSUFBSSxDQUFDO0FBQzFGLFFBQU0sa0JBQWtCLE9BQU8sYUFBYSxvQkFBb0IsS0FBSztBQUNyRSxRQUFNLGNBQWMsbUJBQW1CLGNBQWMsYUFBYSxLQUFLO0FBRXZFLFFBQU0sV0FBVyxPQUFPO0FBQ3hCLFFBQU0sVUFDSjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLEVBQ0Y7QUFHRixNQUFJLFVBQVU7QUFDWixhQUFTLE9BQU8sT0FBTztBQUN2QjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFdBQU8sMEJBQVcsTUFBTTtBQUM5QixTQUFPLFlBQVk7QUFDbkIsT0FBSyxPQUFPLE9BQU87QUFDckI7QUFHQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixrQkFBZ0I7QUFDbEI7QUFFQSxJQUFJLE9BQU8sYUFBYSxhQUFhO0FBQ25DLE1BQUksU0FBUyxlQUFlLGNBQWMsU0FBUyxlQUFlLGVBQWU7QUFDL0UsVUFBTTtBQUFBLEVBQ1IsT0FBTztBQUNMLGFBQVMsaUJBQWlCLG9CQUFvQixLQUFLO0FBQUEsRUFDckQ7QUFDRjtBQUdBLElBQU8scUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSJdCn0K
