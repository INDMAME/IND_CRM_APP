import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/system/AudioRecorderMinimal.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var IND_I18N = globalThis.__IND_I18N__ || {};
var indT = (key, fallback) => IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key] || fallback || key;
var IND_BRAND = "#00296b";
var IND_BRAND_RGB = [0, 41, 107];
var IND_AUDIO_WORKLET_PATH = "/js/ind-audio-worklet.js";
var IND_AUDIO_LOG_PREFIX = "[AudioRecorderMinimal]";
function logInfo(...args) {
  if (typeof console !== "undefined" && console.info) {
    console.info(IND_AUDIO_LOG_PREFIX, ...args);
  }
}
function logWarn(...args) {
  if (typeof console !== "undefined" && console.warn) {
    console.warn(IND_AUDIO_LOG_PREFIX, ...args);
  }
}
function logError(...args) {
  if (typeof console !== "undefined" && console.error) {
    console.error(IND_AUDIO_LOG_PREFIX, ...args);
  }
}
function brandRgba(alpha) {
  return `rgba(${IND_BRAND_RGB[0]}, ${IND_BRAND_RGB[1]}, ${IND_BRAND_RGB[2]}, ${alpha})`;
}
function safeErrName(err) {
  return err && err.name ? err.name : "";
}
function safeErrMessage(err) {
  return err && err.message ? err.message : "";
}
function isSecureContextSafe() {
  if (typeof window === "undefined") return true;
  return !!window.isSecureContext;
}
function getLocationSafe() {
  if (typeof window === "undefined") return null;
  if (!window.location) return null;
  return window.location;
}
function isLocalhostHost(hostname) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}
function isHttpIntranetBlocked() {
  const loc = getLocationSafe();
  if (!loc) return false;
  const protocol = loc.protocol || "";
  const hostname = loc.hostname || "";
  if (protocol !== "http:") return false;
  if (isLocalhostHost(hostname)) return false;
  return true;
}
function getAudioWorkletUrl() {
  if (typeof window === "undefined" || !window.location) {
    return IND_AUDIO_WORKLET_PATH;
  }
  try {
    return new URL(IND_AUDIO_WORKLET_PATH, window.location.origin).toString();
  } catch {
    return IND_AUDIO_WORKLET_PATH;
  }
}
function formatTimeMs(ms) {
  const totalSeconds = Math.floor(ms / 1e3);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}`;
}
function sanitizeFileNameBase(value) {
  if (!value) return "";
  return String(value).trim().replace(/\s+/g, "-").replace(/[\\/:*?"<>|]+/g, "").replace(/-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
function buildDownloadFileName(baseName) {
  const safeBase = sanitizeFileNameBase(baseName);
  const now = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `${safeBase}-${stamp}.wav`;
}
function floatTo16BitPCM(float32Array) {
  const out = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    out[i] = s < 0 ? s * 32768 : s * 32767;
  }
  return out;
}
function encodeWav(args) {
  const samples16 = args.samples16;
  const sampleRate = args.sampleRate;
  const numChannels = args.numChannels;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples16.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  let offset = 0;
  function writeString(s) {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
    offset += s.length;
  }
  function writeUint32(v) {
    view.setUint32(offset, v, true);
    offset += 4;
  }
  function writeUint16(v) {
    view.setUint16(offset, v, true);
    offset += 2;
  }
  writeString("RIFF");
  writeUint32(36 + dataSize);
  writeString("WAVE");
  writeString("fmt ");
  writeUint32(16);
  writeUint16(1);
  writeUint16(numChannels);
  writeUint32(sampleRate);
  writeUint32(byteRate);
  writeUint16(blockAlign);
  writeUint16(16);
  writeString("data");
  writeUint32(dataSize);
  for (let j = 0; j < samples16.length; j++, offset += 2) {
    view.setInt16(offset, samples16[j], true);
  }
  return new Blob([buffer], { type: "audio/wav" });
}
function buildSecondLevels(samples, sampleRate) {
  if (!samples || !samples.length || !sampleRate) return [];
  const seconds = Math.max(1, Math.ceil(samples.length / sampleRate));
  const levels = new Array(seconds).fill(0);
  let max = 0;
  for (let s = 0; s < seconds; s++) {
    const start = s * sampleRate;
    const end = Math.min((s + 1) * sampleRate, samples.length);
    let sum = 0;
    const len = end - start;
    for (let i = start; i < end; i++) {
      const v = samples[i];
      sum += v * v;
    }
    const rms = Math.sqrt(sum / Math.max(1, len));
    levels[s] = rms;
    if (rms > max) max = rms;
  }
  if (max <= 0) return levels;
  return levels.map((v) => Math.min(1, Math.pow(v / max, 0.75)));
}
function drawRoundedRect(ctx, x, y, w, h, r) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
    return;
  }
  ctx.fillRect(x, y, w, h);
}
function buildHttpMicBlockedMessage() {
  return indT(
    "AudioRecorder_Error_HttpBlocked",
    "Chrome blocks microphone on HTTP (intranet). Use HTTPS or open the app via http://localhost. For dev, configure Chrome to treat your HTTP origin as secure."
  );
}
function buildMicErrorMessage(err) {
  const name = safeErrName(err);
  if (isHttpIntranetBlocked() && !isSecureContextSafe()) {
    return buildHttpMicBlockedMessage();
  }
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return indT(
      "AudioRecorder_Error_PermissionDenied",
      "Microphone permission denied. Allow it in the browser and reload the page."
    );
  }
  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    return indT("AudioRecorder_Error_NoDevice", "No microphone device found. Connect one and try again.");
  }
  if (name === "NotReadableError" || name === "TrackStartError") {
    return indT(
      "AudioRecorder_Error_DeviceBusy",
      "The microphone is busy or could not start. Close other apps (Teams, Zoom) and try again."
    );
  }
  if (name === "SecurityError") {
    return indT(
      "AudioRecorder_Error_Security",
      "Blocked by browser security. In Chrome, use HTTPS or corporate policy to allow the mic on intranet."
    );
  }
  if (name === "OverconstrainedError" || name === "ConstraintNotSatisfiedError") {
    return indT(
      "AudioRecorder_Error_Constraints",
      "Audio constraints could not be satisfied. Try another microphone or configuration."
    );
  }
  return indT(
    "AudioRecorder_Error_Generic",
    "Could not start recording. Check microphone permissions. In Chrome, it usually requires HTTPS or localhost."
  );
}
function runSelfTests() {
  try {
    console.assert(formatTimeMs(0) === "00:00", "formatTimeMs(0) should be 00:00");
    console.assert(formatTimeMs(61e3) === "01:01", "formatTimeMs(61000) should be 01:01");
    console.assert(formatTimeMs(3661e3) === "61:01", "formatTimeMs(3661000) should be 61:01");
    console.assert(formatTimeMs(36e5) === "60:00", "formatTimeMs(3600000) should be 60:00");
    console.assert(formatTimeMs(59e3) === "00:59", "formatTimeMs(59000) should be 00:59");
    console.assert(formatTimeMs(6e4) === "01:00", "formatTimeMs(60000) should be 01:00");
    const f = new Float32Array([0, 1, -1, 0.5, -0.5]);
    const pcm = floatTo16BitPCM(f);
    console.assert(pcm.length === 5, "PCM length should match input");
    console.assert(pcm[1] === 32767, "1.0 should map to 32767");
    console.assert(pcm[2] === -32768, "-1.0 should map to -32768");
    const wav = encodeWav({ samples16: new Int16Array([0, 1, -1]), sampleRate: 48e3, numChannels: 1 });
    console.assert(wav && wav.type === "audio/wav", "WAV blob should be audio/wav");
    console.assert(brandRgba(0.5).startsWith("rgba("), "brandRgba should return rgba(...)");
    console.log("AudioRecorderMinimal self-tests: OK");
  } catch (e) {
    console.error("AudioRecorderMinimal self-tests: FAILED", e);
  }
}
function AudioRecorderMinimal({
  embedded = false,
  onAudioReady,
  onAudioCleared,
  onTranscribe,
  hideTranscribeButton = false,
  autoTranscribeOnStop = false,
  transcribeBusy = false,
  transcribeLabel,
  transcribeBusyLabel,
  onRecordingError
}) {
  const [canRecord, setCanRecord] = (0, import_react.useState)(false);
  const [uiError, setUiError] = (0, import_react.useState)("");
  const [uiHint, setUiHint] = (0, import_react.useState)("");
  const [isRecording, setIsRecording] = (0, import_react.useState)(false);
  const [isPaused, setIsPaused] = (0, import_react.useState)(false);
  const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
  const [elapsedMs, setElapsedMs] = (0, import_react.useState)(0);
  const [wavBlob, setWavBlob] = (0, import_react.useState)(null);
  const [wavUrl, setWavUrl] = (0, import_react.useState)(null);
  const [wavFileName, setWavFileName] = (0, import_react.useState)("");
  const [wavLevels, setWavLevels] = (0, import_react.useState)([]);
  const [wavDurationSec, setWavDurationSec] = (0, import_react.useState)(0);
  const [playbackRemainingSec, setPlaybackRemainingSec] = (0, import_react.useState)(0);
  const [playbackSecond, setPlaybackSecond] = (0, import_react.useState)(0);
  const wavUrlRef = (0, import_react.useRef)(null);
  const wavLevelsRef = (0, import_react.useRef)([]);
  const audioElRef = (0, import_react.useRef)(null);
  const isMountedRef = (0, import_react.useRef)(false);
  const streamRef = (0, import_react.useRef)(null);
  const audioCtxRef = (0, import_react.useRef)(null);
  const sourceRef = (0, import_react.useRef)(null);
  const analyserRef = (0, import_react.useRef)(null);
  const processorRef = (0, import_react.useRef)(null);
  const zeroGainRef = (0, import_react.useRef)(null);
  const workletNodeRef = (0, import_react.useRef)(null);
  const sampleRateRef = (0, import_react.useRef)(48e3);
  const chunksRef = (0, import_react.useRef)([]);
  const startedAtRef = (0, import_react.useRef)(null);
  const accumulatedMsRef = (0, import_react.useRef)(0);
  const timerIdRef = (0, import_react.useRef)(null);
  const rafIdRef = (0, import_react.useRef)(null);
  const barsCanvasRef = (0, import_react.useRef)(null);
  const barWidthPx = 2;
  const barGapPx = 2;
  const barMinCount = 48;
  const barMaxCount = 120;
  const eqLastRef = (0, import_react.useRef)([]);
  const isRecordingRef = (0, import_react.useRef)(false);
  const isPausedRef = (0, import_react.useRef)(false);
  const downloadLabel = indT("AudioRecorder_Download");
  const downloadBaseName = indT("AudioRecorder_Download_FileName");
  (0, import_react.useEffect)(() => {
    isMountedRef.current = true;
    const ok = typeof navigator !== "undefined" && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    setCanRecord(ok);
    if (typeof window !== "undefined" && window.__IND_AUDIO_RECORDER_TESTS__ === true) {
      runSelfTests();
    }
    if (typeof window !== "undefined") {
      if (isHttpIntranetBlocked() && !isSecureContextSafe()) {
        setUiError(buildHttpMicBlockedMessage());
        const loc = getLocationSafe();
        if (loc) setUiHint(indT("AudioRecorder_Hint_Origin", "Current origin: {0}").replace("{0}", loc.origin));
      }
    }
    syncCanvasSize();
    drawEqIdle();
    function onResize() {
      syncCanvasSize();
      drawEqIdle();
    }
    window.addEventListener("resize", onResize);
    return () => {
      isMountedRef.current = false;
      window.removeEventListener("resize", onResize);
      safeStopPlayback();
      safeStopRecordingInternal({ keepWav: true, skipUiState: true });
      if (wavUrlRef.current) {
        try {
          URL.revokeObjectURL(wavUrlRef.current);
        } catch {
        }
      }
    };
  }, []);
  (0, import_react.useEffect)(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);
  (0, import_react.useEffect)(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  (0, import_react.useEffect)(() => {
    wavUrlRef.current = wavUrl;
  }, [wavUrl]);
  (0, import_react.useEffect)(() => {
    wavLevelsRef.current = wavLevels;
  }, [wavLevels]);
  (0, import_react.useEffect)(() => {
    const audioEl = audioElRef.current;
    if (!audioEl) return void 0;
    function onEnded() {
      setIsPlaying(false);
      if (wavDurationSec > 0) {
        setPlaybackRemainingSec(wavDurationSec);
        setPlaybackSecond(0);
      }
    }
    function onPause() {
      setIsPlaying(false);
    }
    function onPlay() {
      setIsPlaying(true);
    }
    function onLoadedMetadata() {
      const duration = Math.ceil(audioEl.duration || 0);
      if (duration > 0) {
        setWavDurationSec(duration);
        setPlaybackRemainingSec(duration);
        setPlaybackSecond(0);
      }
    }
    function onTimeUpdate() {
      const total = wavDurationSec > 0 ? wavDurationSec : Math.ceil(audioEl.duration || 0);
      if (total <= 0) return;
      const current = audioEl.currentTime || 0;
      const remaining = Math.max(0, total - current);
      setPlaybackRemainingSec(remaining);
      setPlaybackSecond(Math.max(0, Math.min(total - 1, Math.floor(current))));
    }
    audioEl.addEventListener("ended", onEnded);
    audioEl.addEventListener("pause", onPause);
    audioEl.addEventListener("play", onPlay);
    audioEl.addEventListener("loadedmetadata", onLoadedMetadata);
    audioEl.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      audioEl.removeEventListener("ended", onEnded);
      audioEl.removeEventListener("pause", onPause);
      audioEl.removeEventListener("play", onPlay);
      audioEl.removeEventListener("loadedmetadata", onLoadedMetadata);
      audioEl.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [wavDurationSec]);
  (0, import_react.useEffect)(() => {
    if (isRecording && !isPaused) {
      startEqLoop();
    } else {
      stopEqLoop();
      if (wavLevelsRef.current && wavLevelsRef.current.length > 0) {
        drawEqWaveform(playbackSecond);
      } else {
        drawEqIdle();
      }
    }
  }, [isRecording, isPaused]);
  (0, import_react.useEffect)(() => {
    if (!isRecording && wavLevelsRef.current && wavLevelsRef.current.length > 0) {
      drawEqWaveform(playbackSecond);
    }
  }, [playbackSecond, wavLevels, isRecording]);
  function safeSetState(fn) {
    if (!isMountedRef.current) return;
    fn();
  }
  const notifyRecordingError = (message) => {
    if (typeof onRecordingError !== "function") return;
    try {
      onRecordingError(message);
    } catch {
    }
  };
  function safeStopPlayback() {
    const audioEl = audioElRef.current;
    if (!audioEl) return;
    try {
      audioEl.pause();
      audioEl.currentTime = 0;
    } catch {
    }
    safeSetState(() => {
      setIsPlaying(false);
    });
  }
  function startTimer() {
    if (timerIdRef.current) return;
    startedAtRef.current = Date.now();
    timerIdRef.current = window.setInterval(() => {
      if (!startedAtRef.current) return;
      const now = Date.now();
      const current = accumulatedMsRef.current + (now - startedAtRef.current);
      safeSetState(() => {
        setElapsedMs(current);
      });
    }, 200);
  }
  function pauseTimer() {
    if (!startedAtRef.current) return;
    const now = Date.now();
    accumulatedMsRef.current = accumulatedMsRef.current + (now - startedAtRef.current);
    startedAtRef.current = null;
    if (timerIdRef.current) {
      window.clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }
  function resetTimer() {
    accumulatedMsRef.current = 0;
    startedAtRef.current = null;
    if (timerIdRef.current) {
      window.clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    safeSetState(() => {
      setElapsedMs(0);
    });
  }
  async function startRecording() {
    if (!canRecord) {
      logWarn("getUserMedia not available or blocked.");
      const loc = getLocationSafe();
      const blocked = isHttpIntranetBlocked() && !isSecureContextSafe();
      const errorMessage = blocked ? buildHttpMicBlockedMessage() : indT("AudioRecorder_Error_Unsupported", "Your browser does not support getUserMedia.");
      const hintMessage = blocked && loc ? indT("AudioRecorder_Hint_Origin", "Current origin: {0}").replace("{0}", loc.origin) : "";
      safeSetState(() => {
        setUiError(errorMessage);
        setUiHint(hintMessage);
      });
      if (errorMessage) {
        notifyRecordingError(errorMessage);
      }
      return;
    }
    safeStopPlayback();
    safeSetState(() => {
      setUiError("");
      setUiHint("");
    });
    safeStopRecordingInternal({ keepWav: true, skipUiState: true });
    if (wavUrlRef.current) {
      try {
        URL.revokeObjectURL(wavUrlRef.current);
      } catch {
      }
    }
    safeSetState(() => {
      setWavUrl(null);
      setWavBlob(null);
      setWavFileName("");
    });
    setWavLevels([]);
    setWavDurationSec(0);
    setPlaybackRemainingSec(0);
    setPlaybackSecond(0);
    if (typeof onAudioCleared === "function") {
      try {
        onAudioCleared();
      } catch {
      }
    }
    chunksRef.current = [];
    try {
      const preferredConstraints = {
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      };
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: preferredConstraints });
      } catch (err) {
        logWarn("Preferred audio constraints failed. Retrying with defaults.", err);
      }
      if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      streamRef.current = stream;
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) throw new Error(indT("AudioRecorder_Error_NoAudioContext", "AudioContext is not available."));
      const audioCtx = new AudioContextCtor();
      audioCtxRef.current = audioCtx;
      sampleRateRef.current = audioCtx.sampleRate;
      try {
        await audioCtx.resume();
      } catch {
      }
      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.88;
      analyserRef.current = analyser;
      const zeroGain = audioCtx.createGain();
      zeroGain.gain.value = 0;
      zeroGainRef.current = zeroGain;
      workletNodeRef.current = null;
      processorRef.current = null;
      let captureNode = null;
      const canWorklet = !!(audioCtx.audioWorklet && typeof audioCtx.audioWorklet.addModule === "function");
      if (canWorklet) {
        try {
          const workletUrl = getAudioWorkletUrl();
          await audioCtx.audioWorklet.addModule(workletUrl);
          const workletNode = new AudioWorkletNode(audioCtx, "ind-audio-capture");
          workletNodeRef.current = workletNode;
          captureNode = workletNode;
          workletNode.onprocessorerror = (event) => {
            logError("AudioWorklet processor error", event);
          };
          workletNode.port.onmessageerror = (event) => {
            logError("AudioWorklet message error", event);
          };
          workletNode.port.onmessage = (event) => {
            const data = event && event.data ? event.data : null;
            if (!data || data.type !== "chunk") return;
            if (!isRecordingRef.current || isPausedRef.current) return;
            const raw = data.samples;
            if (!raw) return;
            let chunk = null;
            if (raw instanceof Float32Array) chunk = raw;
            else if (raw.buffer) chunk = new Float32Array(raw.buffer);
            else if (raw.byteLength) chunk = new Float32Array(raw);
            if (!chunk || !chunk.length) return;
            chunksRef.current.push(chunk);
          };
          logInfo("AudioWorklet capture enabled", workletUrl);
        } catch (err) {
          logWarn("AudioWorklet failed. Falling back to ScriptProcessor.", err);
        }
      } else {
        logWarn("AudioWorklet not supported. Using ScriptProcessor.");
      }
      if (!captureNode) {
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        captureNode = processor;
        processor.onaudioprocess = (e) => {
          if (!isRecordingRef.current || isPausedRef.current) return;
          const input = e.inputBuffer.getChannelData(0);
          chunksRef.current.push(new Float32Array(input));
        };
      }
      source.connect(analyser);
      analyser.connect(zeroGain);
      source.connect(captureNode);
      captureNode.connect(zeroGain);
      zeroGain.connect(audioCtx.destination);
      safeSetState(() => {
        setIsRecording(true);
        setIsPaused(false);
      });
      resetTimer();
      startTimer();
    } catch (err) {
      safeStopRecordingInternal({ keepWav: false, skipUiState: false });
      const msg = buildMicErrorMessage(err);
      const name = safeErrName(err);
      const message = safeErrMessage(err);
      safeSetState(() => {
        setUiError(msg);
        if (name) {
          const detail = message ? `${name} - ${message}` : name;
          setUiHint(indT("AudioRecorder_Hint_Technical", "Technical details: {0}").replace("{0}", detail));
        }
      });
      if (msg) {
        notifyRecordingError(msg);
      }
      logError("Audio recorder start failed", err);
    }
  }
  function pauseRecording() {
    if (!isRecording) return;
    safeSetState(() => {
      setIsPaused(true);
    });
    if (workletNodeRef.current && workletNodeRef.current.port) {
      try {
        workletNodeRef.current.port.postMessage({ type: "setRecording", value: false });
      } catch {
      }
    }
    pauseTimer();
  }
  function resumeRecording() {
    if (!isRecording) return;
    safeSetState(() => {
      setIsPaused(false);
    });
    if (workletNodeRef.current && workletNodeRef.current.port) {
      try {
        workletNodeRef.current.port.postMessage({ type: "setRecording", value: true });
      } catch {
      }
    }
    startTimer();
  }
  async function finishRecording() {
    if (!isRecording) return;
    pauseTimer();
    if (workletNodeRef.current && workletNodeRef.current.port) {
      try {
        workletNodeRef.current.port.postMessage({ type: "setRecording", value: false });
      } catch {
      }
      await new Promise((resolve) => window.setTimeout(resolve, 30));
    }
    if (!chunksRef.current.length) {
      safeStopRecordingInternal({ keepWav: false, skipUiState: false });
      resetTimer();
      return;
    }
    const all = chunksRef.current;
    const totalLen = all.reduce((sum, a) => sum + a.length, 0);
    const merged = new Float32Array(totalLen);
    let offset = 0;
    for (let i = 0; i < all.length; i++) {
      merged.set(all[i], offset);
      offset += all[i].length;
    }
    const samples16 = floatTo16BitPCM(merged);
    const wav = encodeWav({ samples16, sampleRate: sampleRateRef.current, numChannels: 1 });
    safeStopRecordingInternal({ keepWav: true, skipUiState: false });
    const levels = buildSecondLevels(merged, sampleRateRef.current);
    const durationSec = Math.max(1, Math.ceil(merged.length / sampleRateRef.current));
    const url = URL.createObjectURL(wav);
    const fileName = buildDownloadFileName(downloadBaseName);
    safeSetState(() => {
      setWavBlob(wav);
      setWavUrl(url);
      setWavFileName(fileName);
      setWavLevels(levels);
      setWavDurationSec(durationSec);
      setPlaybackRemainingSec(durationSec);
      setPlaybackSecond(0);
    });
    if (typeof onAudioReady === "function") {
      try {
        onAudioReady(wav);
      } catch {
      }
    }
    if (autoTranscribeOnStop && typeof onTranscribe === "function" && !transcribeBusy) {
      try {
        void onTranscribe(wav);
      } catch {
      }
    }
  }
  function clearRecording() {
    safeStopPlayback();
    safeStopRecordingInternal({ keepWav: false, skipUiState: false });
    if (wavUrlRef.current) {
      try {
        URL.revokeObjectURL(wavUrlRef.current);
      } catch {
      }
    }
    safeSetState(() => {
      setWavUrl(null);
      setWavBlob(null);
      setWavFileName("");
      setUiError("");
      setUiHint("");
    });
    setWavLevels([]);
    setWavDurationSec(0);
    setPlaybackRemainingSec(0);
    setPlaybackSecond(0);
    if (typeof onAudioCleared === "function") {
      try {
        onAudioCleared();
      } catch {
      }
    }
    chunksRef.current = [];
    resetTimer();
  }
  function safeStopRecordingInternal(args) {
    const keepWav = args.keepWav;
    const skipUiState = args.skipUiState;
    stopEqLoop();
    if (!keepWav) resetTimer();
    try {
      if (workletNodeRef.current) {
        try {
          if (workletNodeRef.current.port) {
            workletNodeRef.current.port.postMessage({ type: "setRecording", value: false });
          }
        } catch {
        }
        workletNodeRef.current.disconnect();
      }
      if (processorRef.current) processorRef.current.disconnect();
      if (analyserRef.current) analyserRef.current.disconnect();
      if (sourceRef.current) sourceRef.current.disconnect();
      if (zeroGainRef.current) zeroGainRef.current.disconnect();
    } catch {
    }
    try {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") audioCtxRef.current.close();
    } catch {
    }
    try {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        for (let i = 0; i < tracks.length; i++) tracks[i].stop();
      }
    } catch {
    }
    processorRef.current = null;
    analyserRef.current = null;
    sourceRef.current = null;
    zeroGainRef.current = null;
    workletNodeRef.current = null;
    audioCtxRef.current = null;
    streamRef.current = null;
    if (!skipUiState) {
      safeSetState(() => {
        setIsRecording(false);
        setIsPaused(false);
      });
    }
  }
  function togglePlay() {
    const audioEl = audioElRef.current;
    if (!audioEl || !wavUrl) return;
    try {
      if (audioEl.paused) audioEl.play();
      else audioEl.pause();
    } catch {
    }
  }
  function syncCanvasSize() {
    const canvas = barsCanvasRef.current;
    if (!canvas) return;
    const w = Math.max(1, Math.floor(canvas.clientWidth));
    const h = Math.max(1, Math.floor(canvas.clientHeight));
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
  }
  function startEqLoop() {
    if (rafIdRef.current) return;
    const canvas = barsCanvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    syncCanvasSize();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const freq = new Uint8Array(analyser.frequencyBinCount);
    function loop() {
      rafIdRef.current = requestAnimationFrame(loop);
      analyser.getByteFrequencyData(freq);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = brandRgba(0.1);
      ctx.fillRect(0, Math.floor(h / 2), w, 1);
      const gap = barGapPx;
      const barW = barWidthPx;
      let count = Math.floor((w + gap) / (barW + gap));
      if (count < barMinCount) count = barMinCount;
      if (count > barMaxCount) count = barMaxCount;
      const totalW = count * barW + (count - 1) * gap;
      const startX = Math.floor((w - totalW) / 2);
      const maxH = Math.floor(h * 0.92);
      if (!eqLastRef.current || eqLastRef.current.length !== count) {
        eqLastRef.current = new Array(count).fill(0);
      }
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(i / count * freq.length);
        const v = Math.pow(freq[idx] / 255, 0.9);
        const last = eqLastRef.current[i] || 0;
        const smooth = last * 0.78 + v * 0.22;
        eqLastRef.current[i] = smooth;
        const barH = Math.max(2, Math.floor(smooth * maxH));
        const x = startX + i * (barW + gap);
        const y = Math.floor((h - barH) / 2);
        ctx.fillStyle = brandRgba(0.42);
        ctx.fillRect(x, y, barW, barH);
      }
    }
    rafIdRef.current = requestAnimationFrame(loop);
  }
  function stopEqLoop() {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }
  function drawEqIdle() {
    const canvas = barsCanvasRef.current;
    if (!canvas) return;
    syncCanvasSize();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = brandRgba(0.08);
    ctx.fillRect(0, Math.floor(h / 2), w, 1);
    const gap = barGapPx;
    const barW = barWidthPx;
    let count = Math.floor((w + gap) / (barW + gap));
    if (count < barMinCount) count = barMinCount;
    if (count > barMaxCount) count = barMaxCount;
    const totalW = count * barW + (count - 1) * gap;
    const startX = Math.floor((w - totalW) / 2);
    const maxH = Math.floor(h * 0.35);
    for (let i = 0; i < count; i++) {
      const v = 0.18 + i % 9 * 0.01;
      const barH = Math.max(2, Math.floor(v * maxH));
      const x = startX + i * (barW + gap);
      const y = Math.floor((h - barH) / 2);
      ctx.fillStyle = brandRgba(0.16);
      ctx.fillRect(x, y, barW, barH);
    }
  }
  function drawEqWaveform(activeSecond) {
    const canvas = barsCanvasRef.current;
    if (!canvas) return;
    syncCanvasSize();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const levels = wavLevelsRef.current || [];
    if (!levels.length) {
      drawEqIdle();
      return;
    }
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = brandRgba(0.1);
    ctx.fillRect(0, Math.floor(h / 2), w, 1);
    const maxH = Math.floor(h * 0.9);
    const minH = 3;
    const barW = 3;
    const gap = 2;
    const minBars = 48;
    const maxBars = 140;
    const fitBars = Math.max(1, Math.floor((w + gap) / (barW + gap)));
    const count = Math.max(minBars, Math.min(maxBars, Math.max(levels.length, fitBars)));
    const totalW = count * barW + (count - 1) * gap;
    const startX = Math.max(0, Math.floor((w - totalW) / 2));
    const durationSec = Math.max(1, wavDurationSec || levels.length || 1);
    const activeIndex = Math.max(0, Math.min(count - 1, Math.floor(activeSecond / durationSec * (count - 1))));
    for (let i = 0; i < count; i++) {
      const t = count > 1 ? i / (count - 1) : 0;
      const rawIndex = t * Math.max(0, levels.length - 1);
      const low = Math.floor(rawIndex);
      const high = Math.min(levels.length - 1, low + 1);
      const frac = rawIndex - low;
      const vLow = levels[low] || 0;
      const vHigh = levels[high] || 0;
      const v = vLow * (1 - frac) + vHigh * frac;
      const barH = Math.max(minH, Math.floor(v * (maxH - minH) + minH));
      const x = startX + i * (barW + gap);
      const y = Math.floor((h - barH) / 2);
      const isActive = i === activeIndex;
      ctx.fillStyle = isActive ? brandRgba(0.78) : brandRgba(0.28);
      drawRoundedRect(ctx, x, y, barW, barH, Math.min(6, Math.floor(barW / 2)));
    }
  }
  function onCenterClick() {
    if (!isRecording) {
      startRecording();
      return;
    }
    if (isPaused) resumeRecording();
    else pauseRecording();
  }
  function onRightClick() {
    if (isRecording) {
      finishRecording();
      return;
    }
    if (wavBlob) clearRecording();
  }
  const centerLabel = !isRecording ? indT("AudioRecorder_Record", "Record") : isPaused ? indT("AudioRecorder_Resume", "Resume") : indT("AudioRecorder_Pause", "Pause");
  const totalWavMs = wavDurationSec > 0 ? wavDurationSec * 1e3 : 0;
  const remainingWavMs = wavDurationSec > 0 ? Math.max(0, playbackRemainingSec * 1e3) : 0;
  const timerText = isRecording ? formatTimeMs(elapsedMs) : wavUrl ? formatTimeMs(remainingWavMs || totalWavMs) : formatTimeMs(0);
  const isActiveRec = isRecording && !isPaused;
  const statusText = uiError ? "" : isActiveRec ? indT("AudioRecorder_Status_Recording", "Recording") : isPaused ? indT("AudioRecorder_Status_Paused", "Paused") : wavUrl ? indT("AudioRecorder_Status_ReadyToPlay", "Ready to play") : indT("AudioRecorder_Status_Ready", "Ready");
  const timerAlpha = isActiveRec ? 0.55 : isPaused ? 0.46 : 0.4;
  const statusAlpha = 0.35;
  const cardBg = "radial-gradient(700px circle at 18% 0%, rgba(0, 41, 107, 0.06), transparent 55%)";
  const outerClassName = embedded ? "w-full" : "w-full min-h-[280px] flex items-center justify-center p-4 sm:p-6";
  const outerStyle = embedded ? void 0 : {
    backgroundImage: "radial-gradient(900px circle at 20% 20%, rgba(0, 41, 107, 0.08), transparent 60%)",
    backgroundColor: "rgba(0, 41, 107, 0.05)",
    fontFamily: '"Montserrat", sans-serif'
  };
  const cardClassName = embedded ? "relative w-full rounded-[var(--radius-xl)] bg-white border shadow-xl" : "relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[520px] rounded-[var(--radius-xl)] bg-white border shadow-xl";
  const showTranscribeButton = !!wavBlob && typeof onTranscribe === "function" && !hideTranscribeButton;
  const transcribeText = transcribeLabel || indT("TextEditor_Transcribe", "Transcribe");
  const transcribeBusyText = transcribeBusyLabel || indT("TextEditor_Transcribing", "Transcribing");
  const showDownloadButton = false;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: outerClassName, style: outerStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: cardClassName,
      style: { borderColor: "rgba(0, 41, 107, 0.18)", backgroundImage: cardBg },
      children: [
        !wavUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-4 top-4 sm:right-5 sm:top-5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "font-light italic tabular-nums text-[16px] sm:text-[18px] leading-none tracking-[0.14em]",
            style: { color: brandRgba(timerAlpha) },
            children: timerText
          }
        ) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: `px-5 sm:px-7 pt-3 sm:pt-4 ${wavUrl ? "pb-0 sm:pb-1" : "pb-1 sm:pb-2"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: barsCanvasRef, className: "w-full h-12 sm:h-16" }) }),
              wavUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 flex items-center justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  className: "font-light italic tabular-nums text-[16px] sm:text-[18px] leading-none tracking-[0.14em]",
                  style: { color: brandRgba(timerAlpha) },
                  children: timerText
                }
              ) }) : null
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `px-5 sm:px-7 pb-4 sm:pb-5 ${wavUrl ? "pt-1 sm:pt-2" : "pt-2 sm:pt-3"}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-center", style: { gap: "24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: togglePlay,
                disabled: !wavUrl,
                className: "h-12 w-12 sm:h-14 sm:w-14 rounded-[var(--radius-xl)] border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: wavUrl ? "rgba(0, 41, 107, 0.22)" : "rgba(0, 41, 107, 0.18)",
                  backgroundColor: wavUrl ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                  opacity: wavUrl ? 1 : 0.45,
                  cursor: wavUrl ? "pointer" : "not-allowed"
                },
                "aria-label": indT("AudioRecorder_Play", "Play"),
                title: wavUrl ? isPlaying ? indT("AudioRecorder_Pause", "Pause") : indT("AudioRecorder_Play", "Play") : indT("AudioRecorder_NoAudio", "No audio"),
                children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "5", width: "4", height: "14", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "14", y: "5", width: "4", height: "14", rx: "1", fill: "currentColor" })
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 7L19 12L9 17V7Z", fill: "currentColor" }) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: onCenterClick,
                disabled: !canRecord,
                className: "h-14 w-14 sm:h-16 sm:w-16 rounded-[var(--radius-xl)] border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: "rgba(0, 41, 107, 0.18)",
                  backgroundColor: canRecord ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                  boxShadow: isActiveRec ? "0 0 0 7px rgba(0, 41, 107, 0.08), 0 14px 34px rgba(0, 41, 107, 0.14)" : "0 10px 22px rgba(0, 41, 107, 0.08)",
                  opacity: canRecord ? 1 : 0.45,
                  cursor: canRecord ? "pointer" : "not-allowed"
                },
                "aria-label": centerLabel,
                title: centerLabel,
                children: !isRecording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-5 rounded-[var(--radius-xl)] bg-red-500" }) : isPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 7L19 12L9 17V7Z", fill: "currentColor" }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "6", y: "5", width: "4", height: "14", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "14", y: "5", width: "4", height: "14", rx: "1", fill: "currentColor" })
                ] })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: onRightClick,
                disabled: !isRecording,
                className: "h-12 w-12 sm:h-14 sm:w-14 rounded-[var(--radius-xl)] border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: isRecording ? "rgba(0, 41, 107, 0.22)" : "rgba(0, 41, 107, 0.18)",
                  backgroundColor: isRecording ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                  opacity: isRecording ? 1 : 0.45,
                  cursor: isRecording ? "pointer" : "not-allowed"
                },
                "aria-label": isRecording ? indT("AudioRecorder_Stop", "Stop") : indT("AudioRecorder_Cancel", "Cancel"),
                title: isRecording ? indT("AudioRecorder_Stop", "Stop") : indT("AudioRecorder_Cancel", "Cancel"),
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "7", y: "7", width: "10", height: "10", rx: "1", fill: "currentColor" }) })
              }
            )
          ] }),
          showDownloadButton || showTranscribeButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mt-3 flex items-center justify-end gap-2 flex-wrap", children: [
            showDownloadButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "a",
              {
                href: wavUrl || void 0,
                download: wavFileName || void 0,
                className: "px-4 py-1.5 rounded-[var(--radius-xl)] border text-[13px] font-medium transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: "rgba(0, 41, 107, 0.22)",
                  backgroundColor: "rgba(0, 41, 107, 0.04)",
                  color: IND_BRAND
                },
                "aria-label": downloadLabel,
                title: downloadLabel,
                children: downloadLabel
              }
            ) : null,
            showTranscribeButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: () => onTranscribe && onTranscribe(wavBlob),
                disabled: transcribeBusy,
                className: "px-4 py-1.5 rounded-[var(--radius-xl)] border text-[13px] font-medium transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: "rgba(0, 41, 107, 0.22)",
                  backgroundColor: transcribeBusy ? "rgba(0, 41, 107, 0.08)" : "rgba(0, 41, 107, 0.04)",
                  color: IND_BRAND,
                  opacity: transcribeBusy ? 0.7 : 1,
                  cursor: transcribeBusy ? "not-allowed" : "pointer"
                },
                "aria-label": transcribeBusy ? transcribeBusyText : transcribeText,
                title: transcribeBusy ? transcribeBusyText : transcribeText,
                children: transcribeBusy ? transcribeBusyText : transcribeText
              }
            ) : null
          ] }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", { ref: audioElRef, src: wavUrl || void 0, className: "hidden" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 flex flex-col items-center justify-center gap-1 min-h-[22px]", children: uiError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-rose-700 text-center leading-tight", children: uiError }),
            uiHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-[11px] text-slate-600 text-center leading-tight", children: uiHint }) : null
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs leading-tight", style: { color: brandRgba(statusAlpha) }, children: statusText }) })
        ] })
      ]
    }
  ) });
}

export {
  AudioRecorderMinimal
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9BdWRpb1JlY29yZGVyTWluaW1hbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IElORF9JMThOID0gZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge307XHJcbmNvbnN0IGluZFQgPSAoa2V5OiBzdHJpbmcsIGZhbGxiYWNrPzogc3RyaW5nKSA9PlxyXG4gIChJTkRfSTE4TiAmJiB0eXBlb2YgSU5EX0kxOE5ba2V5XSA9PT0gXCJzdHJpbmdcIiAmJiBJTkRfSTE4TltrZXldKSB8fCBmYWxsYmFjayB8fCBrZXk7XHJcblxyXG50eXBlIEF1ZGlvUmVjb3JkZXJQcm9wcyA9IHtcbiAgZW1iZWRkZWQ/OiBib29sZWFuO1xuICBvbkF1ZGlvUmVhZHk/OiAod2F2OiBCbG9iKSA9PiB2b2lkO1xuICBvbkF1ZGlvQ2xlYXJlZD86ICgpID0+IHZvaWQ7XG4gIG9uVHJhbnNjcmliZT86ICh3YXY6IEJsb2IpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+O1xuICBoaWRlVHJhbnNjcmliZUJ1dHRvbj86IGJvb2xlYW47XG4gIGF1dG9UcmFuc2NyaWJlT25TdG9wPzogYm9vbGVhbjtcbiAgdHJhbnNjcmliZUJ1c3k/OiBib29sZWFuO1xuICB0cmFuc2NyaWJlTGFiZWw/OiBzdHJpbmc7XG4gIHRyYW5zY3JpYmVCdXN5TGFiZWw/OiBzdHJpbmc7XG4gIG9uUmVjb3JkaW5nRXJyb3I/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxyXG4vLyBBdWRpb1JlY29yZGVyTWluaW1hbFxyXG4vLyBNaW5pbWFsIFVJIHJlY29yZGVyIHRoYXQgcHJvZHVjZXMgYSBXQVYgKFBDTSAxNi1iaXQpIGJsb2IuXHJcbi8vIE5vdGVzOlxyXG4vLyAtIFJlY29yZHMgbW9ubyBhdWRpbyBhbmQgZXhwb3J0cyAud2F2LlxyXG4vLyAtIENlbnRlciBidXR0b24gdG9nZ2xlcyByZWNvcmQgYW5kIHBhdXNlL3Jlc3VtZS5cclxuLy8gLSBSaWdodCBidXR0b24gc3RvcHMgYW5kIGZpbmFsaXplcyBXQVYgd2hpbGUgcmVjb3JkaW5nLCBvciBjbGVhcnMgd2hlbiBpZGxlLlxyXG4vLyAtIFVzZXMgU2NyaXB0UHJvY2Vzc29yIGZvciBzaW1wbGljaXR5ICh3b3JrcyBmb3IgZGVtb3MsIGJ1dCBpcyBkZXByZWNhdGVkKS5cclxuLy8gLSBEZWZlbnNpdmUgZXJyb3IgbWVzc2FnZXMgZm9yIGNvbW1vbiBnZXRVc2VyTWVkaWEgZmFpbHVyZXMuXHJcbi8vXHJcbi8vIEltcG9ydGFudCBjb25zdHJhaW50IChDaHJvbWUpOiBtaWNyb3Bob25lIGNhcHR1cmUgcmVxdWlyZXMgYSBTZWN1cmUgQ29udGV4dC5cclxuLy8gLSBBbGxvd2VkOiBodHRwczovLy4uLiBvciBodHRwOi8vbG9jYWxob3N0XHJcbi8vIC0gQmxvY2tlZDogaHR0cDovL2ludHJhbmV0LWhvc3QgKHVubGVzcyBjb3Jwb3JhdGUgcG9saWN5IHRyZWF0cyBvcmlnaW4gYXMgc2VjdXJlKVxyXG5cclxuY29uc3QgSU5EX0JSQU5EID0gXCIjMDAyOTZiXCI7XHJcbmNvbnN0IElORF9CUkFORF9SR0IgPSBbMCwgNDEsIDEwN107IC8vICMwMDI5NmJcclxuY29uc3QgSU5EX0FVRElPX1dPUktMRVRfUEFUSCA9IFwiL2pzL2luZC1hdWRpby13b3JrbGV0LmpzXCI7XHJcbmNvbnN0IElORF9BVURJT19MT0dfUFJFRklYID0gXCJbQXVkaW9SZWNvcmRlck1pbmltYWxdXCI7XHJcblxyXG5mdW5jdGlvbiBsb2dJbmZvKC4uLmFyZ3MpIHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5pbmZvKSB7XHJcbiAgICBjb25zb2xlLmluZm8oSU5EX0FVRElPX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9nV2FybiguLi5hcmdzKSB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2Fybikge1xyXG4gICAgY29uc29sZS53YXJuKElORF9BVURJT19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvZ0Vycm9yKC4uLmFyZ3MpIHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihJTkRfQVVESU9fTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBicmFuZFJnYmEoYWxwaGEpIHtcclxuICByZXR1cm4gYHJnYmEoJHtJTkRfQlJBTkRfUkdCWzBdfSwgJHtJTkRfQlJBTkRfUkdCWzFdfSwgJHtJTkRfQlJBTkRfUkdCWzJdfSwgJHthbHBoYX0pYDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZUVyck5hbWUoZXJyKSB7XHJcbiAgcmV0dXJuIGVyciAmJiBlcnIubmFtZSA/IGVyci5uYW1lIDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZUVyck1lc3NhZ2UoZXJyKSB7XHJcbiAgcmV0dXJuIGVyciAmJiBlcnIubWVzc2FnZSA/IGVyci5tZXNzYWdlIDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNTZWN1cmVDb250ZXh0U2FmZSgpIHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRydWU7XHJcbiAgcmV0dXJuICEhd2luZG93LmlzU2VjdXJlQ29udGV4dDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9jYXRpb25TYWZlKCkge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcclxuICBpZiAoIXdpbmRvdy5sb2NhdGlvbikgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNMb2NhbGhvc3RIb3N0KGhvc3RuYW1lKSB7XHJcbiAgcmV0dXJuIGhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiIHx8IGhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiIHx8IGhvc3RuYW1lID09PSBcIls6OjFdXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSHR0cEludHJhbmV0QmxvY2tlZCgpIHtcclxuICBjb25zdCBsb2MgPSBnZXRMb2NhdGlvblNhZmUoKTtcclxuICBpZiAoIWxvYykgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBjb25zdCBwcm90b2NvbCA9IGxvYy5wcm90b2NvbCB8fCBcIlwiO1xyXG4gIGNvbnN0IGhvc3RuYW1lID0gbG9jLmhvc3RuYW1lIHx8IFwiXCI7XHJcblxyXG4gIGlmIChwcm90b2NvbCAhPT0gXCJodHRwOlwiKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKGlzTG9jYWxob3N0SG9zdChob3N0bmFtZSkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgLy8gaHR0cCArIG5vdCBsb2NhbGhvc3Q6IG5vcm1hbGx5IGJsb2NrZWQgZm9yIG1pYy5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXVkaW9Xb3JrbGV0VXJsKCkge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICF3aW5kb3cubG9jYXRpb24pIHtcclxuICAgIHJldHVybiBJTkRfQVVESU9fV09SS0xFVF9QQVRIO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBuZXcgVVJMKElORF9BVURJT19XT1JLTEVUX1BBVEgsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pLnRvU3RyaW5nKCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gSU5EX0FVRElPX1dPUktMRVRfUEFUSDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdFRpbWVNcyhtcykge1xyXG4gIC8vIEFsd2F5cyBzaG93IG1tOnNzLiBNaW51dGVzIGtlZXAgaW5jcmVhc2luZyBhZnRlciA1OS5cclxuICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKG1zIC8gMTAwMCk7XHJcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xyXG4gIGNvbnN0IHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcclxuXHJcbiAgY29uc3QgbW0gPSBTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIGNvbnN0IHNzID0gU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbiAgcmV0dXJuIGAke21tfToke3NzfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhbml0aXplRmlsZU5hbWVCYXNlKHZhbHVlKSB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcclxuICAgIC50cmltKClcclxuICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiLVwiKVxyXG4gICAgLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58XSsvZywgXCJcIilcclxuICAgIC5yZXBsYWNlKC8tKy9nLCBcIi1cIilcclxuICAgIC5yZXBsYWNlKC9eLSsvLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoLy0rJC8sIFwiXCIpO1xyXG59XHJcblxyXG4vLyBCdWlsZCBhIHNhZmUsIHRpbWVzdGFtcGVkIGZpbGUgbmFtZSBmb3IgdGhlIFdBViBkb3dubG9hZC5cclxuZnVuY3Rpb24gYnVpbGREb3dubG9hZEZpbGVOYW1lKGJhc2VOYW1lKSB7XHJcbiAgY29uc3Qgc2FmZUJhc2UgPSBzYW5pdGl6ZUZpbGVOYW1lQmFzZShiYXNlTmFtZSk7XHJcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICBjb25zdCBwYWQgPSAobikgPT4gU3RyaW5nKG4pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCBzdGFtcCA9IGAke25vdy5nZXRGdWxsWWVhcigpfSR7cGFkKG5vdy5nZXRNb250aCgpICsgMSl9JHtwYWQobm93LmdldERhdGUoKSl9LSR7cGFkKG5vdy5nZXRIb3VycygpKX0ke3BhZChub3cuZ2V0TWludXRlcygpKX0ke3BhZChub3cuZ2V0U2Vjb25kcygpKX1gO1xyXG4gIHJldHVybiBgJHtzYWZlQmFzZX0tJHtzdGFtcH0ud2F2YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZmxvYXRUbzE2Qml0UENNKGZsb2F0MzJBcnJheSkge1xyXG4gIGNvbnN0IG91dCA9IG5ldyBJbnQxNkFycmF5KGZsb2F0MzJBcnJheS5sZW5ndGgpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmxvYXQzMkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBzID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIGZsb2F0MzJBcnJheVtpXSkpO1xyXG4gICAgb3V0W2ldID0gcyA8IDAgPyBzICogMHg4MDAwIDogcyAqIDB4N2ZmZjtcclxuICB9XHJcbiAgcmV0dXJuIG91dDtcclxufVxyXG5cclxuZnVuY3Rpb24gZW5jb2RlV2F2KGFyZ3MpIHtcclxuICBjb25zdCBzYW1wbGVzMTYgPSBhcmdzLnNhbXBsZXMxNjtcclxuICBjb25zdCBzYW1wbGVSYXRlID0gYXJncy5zYW1wbGVSYXRlO1xyXG4gIGNvbnN0IG51bUNoYW5uZWxzID0gYXJncy5udW1DaGFubmVscztcclxuXHJcbiAgY29uc3QgYnl0ZXNQZXJTYW1wbGUgPSAyO1xyXG4gIGNvbnN0IGJsb2NrQWxpZ24gPSBudW1DaGFubmVscyAqIGJ5dGVzUGVyU2FtcGxlO1xyXG4gIGNvbnN0IGJ5dGVSYXRlID0gc2FtcGxlUmF0ZSAqIGJsb2NrQWxpZ247XHJcbiAgY29uc3QgZGF0YVNpemUgPSBzYW1wbGVzMTYubGVuZ3RoICogYnl0ZXNQZXJTYW1wbGU7XHJcblxyXG4gIGNvbnN0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcig0NCArIGRhdGFTaXplKTtcclxuICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XHJcblxyXG4gIGxldCBvZmZzZXQgPSAwO1xyXG4gIGZ1bmN0aW9uIHdyaXRlU3RyaW5nKHMpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykgdmlldy5zZXRVaW50OChvZmZzZXQgKyBpLCBzLmNoYXJDb2RlQXQoaSkpO1xyXG4gICAgb2Zmc2V0ICs9IHMubGVuZ3RoO1xyXG4gIH1cclxuICBmdW5jdGlvbiB3cml0ZVVpbnQzMih2KSB7XHJcbiAgICB2aWV3LnNldFVpbnQzMihvZmZzZXQsIHYsIHRydWUpO1xyXG4gICAgb2Zmc2V0ICs9IDQ7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHdyaXRlVWludDE2KHYpIHtcclxuICAgIHZpZXcuc2V0VWludDE2KG9mZnNldCwgdiwgdHJ1ZSk7XHJcbiAgICBvZmZzZXQgKz0gMjtcclxuICB9XHJcblxyXG4gIHdyaXRlU3RyaW5nKFwiUklGRlwiKTtcclxuICB3cml0ZVVpbnQzMigzNiArIGRhdGFTaXplKTtcclxuICB3cml0ZVN0cmluZyhcIldBVkVcIik7XHJcblxyXG4gIHdyaXRlU3RyaW5nKFwiZm10IFwiKTtcclxuICB3cml0ZVVpbnQzMigxNik7XHJcbiAgd3JpdGVVaW50MTYoMSk7XHJcbiAgd3JpdGVVaW50MTYobnVtQ2hhbm5lbHMpO1xyXG4gIHdyaXRlVWludDMyKHNhbXBsZVJhdGUpO1xyXG4gIHdyaXRlVWludDMyKGJ5dGVSYXRlKTtcclxuICB3cml0ZVVpbnQxNihibG9ja0FsaWduKTtcclxuICB3cml0ZVVpbnQxNigxNik7XHJcblxyXG4gIHdyaXRlU3RyaW5nKFwiZGF0YVwiKTtcclxuICB3cml0ZVVpbnQzMihkYXRhU2l6ZSk7XHJcblxyXG4gIGZvciAobGV0IGogPSAwOyBqIDwgc2FtcGxlczE2Lmxlbmd0aDsgaisrLCBvZmZzZXQgKz0gMikge1xyXG4gICAgdmlldy5zZXRJbnQxNihvZmZzZXQsIHNhbXBsZXMxNltqXSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogXCJhdWRpby93YXZcIiB9KTtcclxufVxyXG5cclxuLy8gQ29udmVydCBQQ00gZmxvYXQgc2FtcGxlcyBpbnRvIHBlci1zZWNvbmQgbGV2ZWxzIGZvciB3YXZlZm9ybSBkaXNwbGF5LlxyXG5mdW5jdGlvbiBidWlsZFNlY29uZExldmVscyhzYW1wbGVzLCBzYW1wbGVSYXRlKSB7XHJcbiAgaWYgKCFzYW1wbGVzIHx8ICFzYW1wbGVzLmxlbmd0aCB8fCAhc2FtcGxlUmF0ZSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBzZWNvbmRzID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHNhbXBsZXMubGVuZ3RoIC8gc2FtcGxlUmF0ZSkpO1xyXG4gIGNvbnN0IGxldmVscyA9IG5ldyBBcnJheShzZWNvbmRzKS5maWxsKDApO1xyXG4gIGxldCBtYXggPSAwO1xyXG5cclxuICBmb3IgKGxldCBzID0gMDsgcyA8IHNlY29uZHM7IHMrKykge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBzICogc2FtcGxlUmF0ZTtcclxuICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKChzICsgMSkgKiBzYW1wbGVSYXRlLCBzYW1wbGVzLmxlbmd0aCk7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIGNvbnN0IGxlbiA9IGVuZCAtIHN0YXJ0O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHYgPSBzYW1wbGVzW2ldO1xyXG4gICAgICBzdW0gKz0gdiAqIHY7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgcm1zID0gTWF0aC5zcXJ0KHN1bSAvIE1hdGgubWF4KDEsIGxlbikpO1xyXG4gICAgbGV2ZWxzW3NdID0gcm1zO1xyXG4gICAgaWYgKHJtcyA+IG1heCkgbWF4ID0gcm1zO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1heCA8PSAwKSByZXR1cm4gbGV2ZWxzO1xyXG5cclxuICByZXR1cm4gbGV2ZWxzLm1hcCgodikgPT4gTWF0aC5taW4oMSwgTWF0aC5wb3codiAvIG1heCwgMC43NSkpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1JvdW5kZWRSZWN0KGN0eCwgeCwgeSwgdywgaCwgcikge1xyXG4gIGlmIChjdHgucm91bmRSZWN0KSB7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgucm91bmRSZWN0KHgsIHksIHcsIGgsIHIpO1xyXG4gICAgY3R4LmZpbGwoKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGN0eC5maWxsUmVjdCh4LCB5LCB3LCBoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRIdHRwTWljQmxvY2tlZE1lc3NhZ2UoKSB7XHJcbiAgcmV0dXJuIGluZFQoXHJcbiAgICBcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfSHR0cEJsb2NrZWRcIixcclxuICAgIFwiQ2hyb21lIGJsb2NrcyBtaWNyb3Bob25lIG9uIEhUVFAgKGludHJhbmV0KS4gVXNlIEhUVFBTIG9yIG9wZW4gdGhlIGFwcCB2aWEgaHR0cDovL2xvY2FsaG9zdC4gRm9yIGRldiwgY29uZmlndXJlIENocm9tZSB0byB0cmVhdCB5b3VyIEhUVFAgb3JpZ2luIGFzIHNlY3VyZS5cIlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkTWljRXJyb3JNZXNzYWdlKGVycikge1xyXG4gIGNvbnN0IG5hbWUgPSBzYWZlRXJyTmFtZShlcnIpO1xyXG5cclxuICBpZiAoaXNIdHRwSW50cmFuZXRCbG9ja2VkKCkgJiYgIWlzU2VjdXJlQ29udGV4dFNhZmUoKSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkSHR0cE1pY0Jsb2NrZWRNZXNzYWdlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAobmFtZSA9PT0gXCJOb3RBbGxvd2VkRXJyb3JcIiB8fCBuYW1lID09PSBcIlBlcm1pc3Npb25EZW5pZWRFcnJvclwiKSB7XHJcbiAgICByZXR1cm4gaW5kVChcclxuICAgICAgXCJBdWRpb1JlY29yZGVyX0Vycm9yX1Blcm1pc3Npb25EZW5pZWRcIixcclxuICAgICAgXCJNaWNyb3Bob25lIHBlcm1pc3Npb24gZGVuaWVkLiBBbGxvdyBpdCBpbiB0aGUgYnJvd3NlciBhbmQgcmVsb2FkIHRoZSBwYWdlLlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5hbWUgPT09IFwiTm90Rm91bmRFcnJvclwiIHx8IG5hbWUgPT09IFwiRGV2aWNlc05vdEZvdW5kRXJyb3JcIikge1xyXG4gICAgcmV0dXJuIGluZFQoXCJBdWRpb1JlY29yZGVyX0Vycm9yX05vRGV2aWNlXCIsIFwiTm8gbWljcm9waG9uZSBkZXZpY2UgZm91bmQuIENvbm5lY3Qgb25lIGFuZCB0cnkgYWdhaW4uXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5hbWUgPT09IFwiTm90UmVhZGFibGVFcnJvclwiIHx8IG5hbWUgPT09IFwiVHJhY2tTdGFydEVycm9yXCIpIHtcclxuICAgIHJldHVybiBpbmRUKFxyXG4gICAgICBcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfRGV2aWNlQnVzeVwiLFxyXG4gICAgICBcIlRoZSBtaWNyb3Bob25lIGlzIGJ1c3kgb3IgY291bGQgbm90IHN0YXJ0LiBDbG9zZSBvdGhlciBhcHBzIChUZWFtcywgWm9vbSkgYW5kIHRyeSBhZ2Fpbi5cIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChuYW1lID09PSBcIlNlY3VyaXR5RXJyb3JcIikge1xyXG4gICAgcmV0dXJuIGluZFQoXHJcbiAgICAgIFwiQXVkaW9SZWNvcmRlcl9FcnJvcl9TZWN1cml0eVwiLFxyXG4gICAgICBcIkJsb2NrZWQgYnkgYnJvd3NlciBzZWN1cml0eS4gSW4gQ2hyb21lLCB1c2UgSFRUUFMgb3IgY29ycG9yYXRlIHBvbGljeSB0byBhbGxvdyB0aGUgbWljIG9uIGludHJhbmV0LlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5hbWUgPT09IFwiT3ZlcmNvbnN0cmFpbmVkRXJyb3JcIiB8fCBuYW1lID09PSBcIkNvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvclwiKSB7XHJcbiAgICByZXR1cm4gaW5kVChcclxuICAgICAgXCJBdWRpb1JlY29yZGVyX0Vycm9yX0NvbnN0cmFpbnRzXCIsXHJcbiAgICAgIFwiQXVkaW8gY29uc3RyYWludHMgY291bGQgbm90IGJlIHNhdGlzZmllZC4gVHJ5IGFub3RoZXIgbWljcm9waG9uZSBvciBjb25maWd1cmF0aW9uLlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZFQoXHJcbiAgICBcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfR2VuZXJpY1wiLFxyXG4gICAgXCJDb3VsZCBub3Qgc3RhcnQgcmVjb3JkaW5nLiBDaGVjayBtaWNyb3Bob25lIHBlcm1pc3Npb25zLiBJbiBDaHJvbWUsIGl0IHVzdWFsbHkgcmVxdWlyZXMgSFRUUFMgb3IgbG9jYWxob3N0LlwiXHJcbiAgKTtcclxufVxyXG5cclxuLy8gU2VsZi10ZXN0cyBmb3IgcHVyZSBmdW5jdGlvbnMuXHJcbi8vIEVuYWJsZSBieSBzZXR0aW5nOiB3aW5kb3cuX19JTkRfQVVESU9fUkVDT1JERVJfVEVTVFNfXyA9IHRydWVcclxuZnVuY3Rpb24gcnVuU2VsZlRlc3RzKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zb2xlLmFzc2VydChmb3JtYXRUaW1lTXMoMCkgPT09IFwiMDA6MDBcIiwgXCJmb3JtYXRUaW1lTXMoMCkgc2hvdWxkIGJlIDAwOjAwXCIpO1xyXG4gICAgY29uc29sZS5hc3NlcnQoZm9ybWF0VGltZU1zKDYxXzAwMCkgPT09IFwiMDE6MDFcIiwgXCJmb3JtYXRUaW1lTXMoNjEwMDApIHNob3VsZCBiZSAwMTowMVwiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KGZvcm1hdFRpbWVNcygzXzY2MV8wMDApID09PSBcIjYxOjAxXCIsIFwiZm9ybWF0VGltZU1zKDM2NjEwMDApIHNob3VsZCBiZSA2MTowMVwiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KGZvcm1hdFRpbWVNcygzXzYwMF8wMDApID09PSBcIjYwOjAwXCIsIFwiZm9ybWF0VGltZU1zKDM2MDAwMDApIHNob3VsZCBiZSA2MDowMFwiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KGZvcm1hdFRpbWVNcyg1OV8wMDApID09PSBcIjAwOjU5XCIsIFwiZm9ybWF0VGltZU1zKDU5MDAwKSBzaG91bGQgYmUgMDA6NTlcIik7XHJcbiAgICBjb25zb2xlLmFzc2VydChmb3JtYXRUaW1lTXMoNjBfMDAwKSA9PT0gXCIwMTowMFwiLCBcImZvcm1hdFRpbWVNcyg2MDAwMCkgc2hvdWxkIGJlIDAxOjAwXCIpO1xyXG5cclxuICAgIGNvbnN0IGYgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAtMSwgMC41LCAtMC41XSk7XHJcbiAgICBjb25zdCBwY20gPSBmbG9hdFRvMTZCaXRQQ00oZik7XHJcbiAgICBjb25zb2xlLmFzc2VydChwY20ubGVuZ3RoID09PSA1LCBcIlBDTSBsZW5ndGggc2hvdWxkIG1hdGNoIGlucHV0XCIpO1xyXG4gICAgY29uc29sZS5hc3NlcnQocGNtWzFdID09PSAzMjc2NywgXCIxLjAgc2hvdWxkIG1hcCB0byAzMjc2N1wiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KHBjbVsyXSA9PT0gLTMyNzY4LCBcIi0xLjAgc2hvdWxkIG1hcCB0byAtMzI3NjhcIik7XHJcblxyXG4gICAgY29uc3Qgd2F2ID0gZW5jb2RlV2F2KHsgc2FtcGxlczE2OiBuZXcgSW50MTZBcnJheShbMCwgMSwgLTFdKSwgc2FtcGxlUmF0ZTogNDgwMDAsIG51bUNoYW5uZWxzOiAxIH0pO1xyXG4gICAgY29uc29sZS5hc3NlcnQod2F2ICYmIHdhdi50eXBlID09PSBcImF1ZGlvL3dhdlwiLCBcIldBViBibG9iIHNob3VsZCBiZSBhdWRpby93YXZcIik7XHJcblxyXG4gICAgY29uc29sZS5hc3NlcnQoYnJhbmRSZ2JhKDAuNSkuc3RhcnRzV2l0aChcInJnYmEoXCIpLCBcImJyYW5kUmdiYSBzaG91bGQgcmV0dXJuIHJnYmEoLi4uKVwiKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkF1ZGlvUmVjb3JkZXJNaW5pbWFsIHNlbGYtdGVzdHM6IE9LXCIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJBdWRpb1JlY29yZGVyTWluaW1hbCBzZWxmLXRlc3RzOiBGQUlMRURcIiwgZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBdWRpb1JlY29yZGVyTWluaW1hbCh7XG4gIGVtYmVkZGVkID0gZmFsc2UsXG4gIG9uQXVkaW9SZWFkeSxcbiAgb25BdWRpb0NsZWFyZWQsXG4gIG9uVHJhbnNjcmliZSxcbiAgaGlkZVRyYW5zY3JpYmVCdXR0b24gPSBmYWxzZSxcbiAgYXV0b1RyYW5zY3JpYmVPblN0b3AgPSBmYWxzZSxcbiAgdHJhbnNjcmliZUJ1c3kgPSBmYWxzZSxcbiAgdHJhbnNjcmliZUxhYmVsLFxuICB0cmFuc2NyaWJlQnVzeUxhYmVsLFxuICBvblJlY29yZGluZ0Vycm9yLFxufTogQXVkaW9SZWNvcmRlclByb3BzKSB7XG4gIGNvbnN0IFtjYW5SZWNvcmQsIHNldENhblJlY29yZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3VpRXJyb3IsIHNldFVpRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3VpSGludCwgc2V0VWlIaW50XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBbaXNSZWNvcmRpbmcsIHNldElzUmVjb3JkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNQYXVzZWQsIHNldElzUGF1c2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNQbGF5aW5nLCBzZXRJc1BsYXlpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBbZWxhcHNlZE1zLCBzZXRFbGFwc2VkTXNdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3dhdkJsb2IsIHNldFdhdkJsb2JdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3dhdlVybCwgc2V0V2F2VXJsXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFt3YXZGaWxlTmFtZSwgc2V0V2F2RmlsZU5hbWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3dhdkxldmVscywgc2V0V2F2TGV2ZWxzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbd2F2RHVyYXRpb25TZWMsIHNldFdhdkR1cmF0aW9uU2VjXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtwbGF5YmFja1JlbWFpbmluZ1NlYywgc2V0UGxheWJhY2tSZW1haW5pbmdTZWNdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3BsYXliYWNrU2Vjb25kLCBzZXRQbGF5YmFja1NlY29uZF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCB3YXZVcmxSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgd2F2TGV2ZWxzUmVmID0gdXNlUmVmKFtdKTtcclxuXHJcbiAgY29uc3QgYXVkaW9FbFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBpc01vdW50ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICBjb25zdCBzdHJlYW1SZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYXVkaW9DdHhSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgc291cmNlUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGFuYWx5c2VyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHByb2Nlc3NvclJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB6ZXJvR2FpblJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB3b3JrbGV0Tm9kZVJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3Qgc2FtcGxlUmF0ZVJlZiA9IHVzZVJlZig0ODAwMCk7XHJcbiAgY29uc3QgY2h1bmtzUmVmID0gdXNlUmVmKFtdKTtcclxuXHJcbiAgY29uc3Qgc3RhcnRlZEF0UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGFjY3VtdWxhdGVkTXNSZWYgPSB1c2VSZWYoMCk7XHJcbiAgY29uc3QgdGltZXJJZFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgcmFmSWRSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYmFyc0NhbnZhc1JlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgYmFyV2lkdGhQeCA9IDI7XHJcbiAgY29uc3QgYmFyR2FwUHggPSAyO1xyXG4gIGNvbnN0IGJhck1pbkNvdW50ID0gNDg7XHJcbiAgY29uc3QgYmFyTWF4Q291bnQgPSAxMjA7XHJcblxyXG4gIGNvbnN0IGVxTGFzdFJlZiA9IHVzZVJlZihbXSk7XHJcblxyXG4gIGNvbnN0IGlzUmVjb3JkaW5nUmVmID0gdXNlUmVmKGZhbHNlKTtcclxuICBjb25zdCBpc1BhdXNlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGRvd25sb2FkTGFiZWwgPSBpbmRUKFwiQXVkaW9SZWNvcmRlcl9Eb3dubG9hZFwiKTtcclxuICBjb25zdCBkb3dubG9hZEJhc2VOYW1lID0gaW5kVChcIkF1ZGlvUmVjb3JkZXJfRG93bmxvYWRfRmlsZU5hbWVcIik7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpc01vdW50ZWRSZWYuY3VycmVudCA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qgb2sgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmICEhKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpO1xyXG4gICAgc2V0Q2FuUmVjb3JkKG9rKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuX19JTkRfQVVESU9fUkVDT1JERVJfVEVTVFNfXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBydW5TZWxmVGVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBpZiAoaXNIdHRwSW50cmFuZXRCbG9ja2VkKCkgJiYgIWlzU2VjdXJlQ29udGV4dFNhZmUoKSkge1xyXG4gICAgICAgIHNldFVpRXJyb3IoYnVpbGRIdHRwTWljQmxvY2tlZE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgY29uc3QgbG9jID0gZ2V0TG9jYXRpb25TYWZlKCk7XHJcbiAgICAgICAgaWYgKGxvYykgc2V0VWlIaW50KGluZFQoXCJBdWRpb1JlY29yZGVyX0hpbnRfT3JpZ2luXCIsIFwiQ3VycmVudCBvcmlnaW46IHswfVwiKS5yZXBsYWNlKFwiezB9XCIsIGxvYy5vcmlnaW4pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN5bmNDYW52YXNTaXplKCk7XHJcbiAgICBkcmF3RXFJZGxlKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25SZXNpemUoKSB7XHJcbiAgICAgIHN5bmNDYW52YXNTaXplKCk7XHJcbiAgICAgIGRyYXdFcUlkbGUoKTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc01vdW50ZWRSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XHJcblxyXG4gICAgICBzYWZlU3RvcFBsYXliYWNrKCk7XHJcbiAgICAgIHNhZmVTdG9wUmVjb3JkaW5nSW50ZXJuYWwoeyBrZWVwV2F2OiB0cnVlLCBza2lwVWlTdGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgaWYgKHdhdlVybFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwod2F2VXJsUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlzUmVjb3JkaW5nUmVmLmN1cnJlbnQgPSBpc1JlY29yZGluZztcclxuICB9LCBbaXNSZWNvcmRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlzUGF1c2VkUmVmLmN1cnJlbnQgPSBpc1BhdXNlZDtcclxuICB9LCBbaXNQYXVzZWRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdhdlVybFJlZi5jdXJyZW50ID0gd2F2VXJsO1xyXG4gIH0sIFt3YXZVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdhdkxldmVsc1JlZi5jdXJyZW50ID0gd2F2TGV2ZWxzO1xyXG4gIH0sIFt3YXZMZXZlbHNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGF1ZGlvRWwgPSBhdWRpb0VsUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWF1ZGlvRWwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgZnVuY3Rpb24gb25FbmRlZCgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKGZhbHNlKTtcclxuICAgICAgaWYgKHdhdkR1cmF0aW9uU2VjID4gMCkge1xyXG4gICAgICAgIHNldFBsYXliYWNrUmVtYWluaW5nU2VjKHdhdkR1cmF0aW9uU2VjKTtcclxuICAgICAgICBzZXRQbGF5YmFja1NlY29uZCgwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25QYXVzZSgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKGZhbHNlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uUGxheSgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKHRydWUpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25Mb2FkZWRNZXRhZGF0YSgpIHtcclxuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmNlaWwoYXVkaW9FbC5kdXJhdGlvbiB8fCAwKTtcclxuICAgICAgaWYgKGR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgIHNldFdhdkR1cmF0aW9uU2VjKGR1cmF0aW9uKTtcclxuICAgICAgICBzZXRQbGF5YmFja1JlbWFpbmluZ1NlYyhkdXJhdGlvbik7XHJcbiAgICAgICAgc2V0UGxheWJhY2tTZWNvbmQoMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uVGltZVVwZGF0ZSgpIHtcclxuICAgICAgY29uc3QgdG90YWwgPSB3YXZEdXJhdGlvblNlYyA+IDAgPyB3YXZEdXJhdGlvblNlYyA6IE1hdGguY2VpbChhdWRpb0VsLmR1cmF0aW9uIHx8IDApO1xyXG4gICAgICBpZiAodG90YWwgPD0gMCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBjdXJyZW50ID0gYXVkaW9FbC5jdXJyZW50VGltZSB8fCAwO1xyXG4gICAgICBjb25zdCByZW1haW5pbmcgPSBNYXRoLm1heCgwLCB0b3RhbCAtIGN1cnJlbnQpO1xyXG4gICAgICBzZXRQbGF5YmFja1JlbWFpbmluZ1NlYyhyZW1haW5pbmcpO1xyXG4gICAgICBzZXRQbGF5YmFja1NlY29uZChNYXRoLm1heCgwLCBNYXRoLm1pbih0b3RhbCAtIDEsIE1hdGguZmxvb3IoY3VycmVudCkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXVkaW9FbC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgb25FbmRlZCk7XHJcbiAgICBhdWRpb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCBvblBhdXNlKTtcclxuICAgIGF1ZGlvRWwuYWRkRXZlbnRMaXN0ZW5lcihcInBsYXlcIiwgb25QbGF5KTtcclxuICAgIGF1ZGlvRWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsIG9uTG9hZGVkTWV0YWRhdGEpO1xyXG4gICAgYXVkaW9FbC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBvblRpbWVVcGRhdGUpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGF1ZGlvRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIG9uRW5kZWQpO1xyXG4gICAgICBhdWRpb0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCBvblBhdXNlKTtcclxuICAgICAgYXVkaW9FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwicGxheVwiLCBvblBsYXkpO1xyXG4gICAgICBhdWRpb0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLCBvbkxvYWRlZE1ldGFkYXRhKTtcclxuICAgICAgYXVkaW9FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBvblRpbWVVcGRhdGUpO1xyXG4gICAgfTtcclxuICB9LCBbd2F2RHVyYXRpb25TZWNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpc1JlY29yZGluZyAmJiAhaXNQYXVzZWQpIHtcclxuICAgICAgc3RhcnRFcUxvb3AoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3BFcUxvb3AoKTtcclxuICAgICAgaWYgKHdhdkxldmVsc1JlZi5jdXJyZW50ICYmIHdhdkxldmVsc1JlZi5jdXJyZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBkcmF3RXFXYXZlZm9ybShwbGF5YmFja1NlY29uZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZHJhd0VxSWRsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW2lzUmVjb3JkaW5nLCBpc1BhdXNlZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1JlY29yZGluZyAmJiB3YXZMZXZlbHNSZWYuY3VycmVudCAmJiB3YXZMZXZlbHNSZWYuY3VycmVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGRyYXdFcVdhdmVmb3JtKHBsYXliYWNrU2Vjb25kKTtcclxuICAgIH1cclxuICB9LCBbcGxheWJhY2tTZWNvbmQsIHdhdkxldmVscywgaXNSZWNvcmRpbmddKTtcclxuXHJcbiAgZnVuY3Rpb24gc2FmZVNldFN0YXRlKGZuKSB7XHJcbiAgICBpZiAoIWlzTW91bnRlZFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBmbigpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm90aWZ5UmVjb3JkaW5nRXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICAvLyBOb3RpZnkgcGFyZW50IHNvIGl0IGNhbiBzdXJmYWNlIGEgd2FybmluZyBhbmQgY2xvc2UgdGhlIHJlY29yZGVyLlxyXG4gICAgaWYgKHR5cGVvZiBvblJlY29yZGluZ0Vycm9yICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybjtcclxuICAgIHRyeSB7XHJcbiAgICAgIG9uUmVjb3JkaW5nRXJyb3IobWVzc2FnZSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gc2FmZVN0b3BQbGF5YmFjaygpIHtcclxuICAgIGNvbnN0IGF1ZGlvRWwgPSBhdWRpb0VsUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWF1ZGlvRWwpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhdWRpb0VsLnBhdXNlKCk7XHJcbiAgICAgIGF1ZGlvRWwuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG5cclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldElzUGxheWluZyhmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XHJcbiAgICBpZiAodGltZXJJZFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgc3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBEYXRlLm5vdygpO1xyXG4gICAgdGltZXJJZFJlZi5jdXJyZW50ID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKCFzdGFydGVkQXRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICBjb25zdCBjdXJyZW50ID0gYWNjdW11bGF0ZWRNc1JlZi5jdXJyZW50ICsgKG5vdyAtIHN0YXJ0ZWRBdFJlZi5jdXJyZW50KTtcclxuICAgICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgICBzZXRFbGFwc2VkTXMoY3VycmVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMjAwKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBhdXNlVGltZXIoKSB7XHJcbiAgICBpZiAoIXN0YXJ0ZWRBdFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgIGFjY3VtdWxhdGVkTXNSZWYuY3VycmVudCA9IGFjY3VtdWxhdGVkTXNSZWYuY3VycmVudCArIChub3cgLSBzdGFydGVkQXRSZWYuY3VycmVudCk7XHJcbiAgICBzdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHRpbWVySWRSZWYuY3VycmVudCkge1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcklkUmVmLmN1cnJlbnQpO1xyXG4gICAgICB0aW1lcklkUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcclxuICAgIGFjY3VtdWxhdGVkTXNSZWYuY3VycmVudCA9IDA7XHJcbiAgICBzdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBpZiAodGltZXJJZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVySWRSZWYuY3VycmVudCk7XHJcbiAgICAgIHRpbWVySWRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICBzZXRFbGFwc2VkTXMoMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIHN0YXJ0UmVjb3JkaW5nKCkge1xyXG4gICAgaWYgKCFjYW5SZWNvcmQpIHtcclxuICAgICAgbG9nV2FybihcImdldFVzZXJNZWRpYSBub3QgYXZhaWxhYmxlIG9yIGJsb2NrZWQuXCIpO1xyXG4gICAgICBjb25zdCBsb2MgPSBnZXRMb2NhdGlvblNhZmUoKTtcclxuICAgICAgY29uc3QgYmxvY2tlZCA9IGlzSHR0cEludHJhbmV0QmxvY2tlZCgpICYmICFpc1NlY3VyZUNvbnRleHRTYWZlKCk7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGJsb2NrZWRcclxuICAgICAgICA/IGJ1aWxkSHR0cE1pY0Jsb2NrZWRNZXNzYWdlKClcclxuICAgICAgICA6IGluZFQoXCJBdWRpb1JlY29yZGVyX0Vycm9yX1Vuc3VwcG9ydGVkXCIsIFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgZ2V0VXNlck1lZGlhLlwiKTtcclxuICAgICAgY29uc3QgaGludE1lc3NhZ2UgPVxyXG4gICAgICAgIGJsb2NrZWQgJiYgbG9jID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfSGludF9PcmlnaW5cIiwgXCJDdXJyZW50IG9yaWdpbjogezB9XCIpLnJlcGxhY2UoXCJ7MH1cIiwgbG9jLm9yaWdpbikgOiBcIlwiO1xyXG4gICAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICAgIHNldFVpRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICBzZXRVaUhpbnQoaGludE1lc3NhZ2UpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgIG5vdGlmeVJlY29yZGluZ0Vycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNhZmVTdG9wUGxheWJhY2soKTtcclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldFVpRXJyb3IoXCJcIik7XHJcbiAgICAgIHNldFVpSGludChcIlwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNhZmVTdG9wUmVjb3JkaW5nSW50ZXJuYWwoeyBrZWVwV2F2OiB0cnVlLCBza2lwVWlTdGF0ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICBpZiAod2F2VXJsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHdhdlVybFJlZi5jdXJyZW50KTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldFdhdlVybChudWxsKTtcclxuICAgICAgc2V0V2F2QmxvYihudWxsKTtcclxuICAgICAgc2V0V2F2RmlsZU5hbWUoXCJcIik7XHJcbiAgICB9KTtcclxuICAgIHNldFdhdkxldmVscyhbXSk7XHJcbiAgICBzZXRXYXZEdXJhdGlvblNlYygwKTtcclxuICAgIHNldFBsYXliYWNrUmVtYWluaW5nU2VjKDApO1xyXG4gICAgc2V0UGxheWJhY2tTZWNvbmQoMCk7XHJcbiAgICBpZiAodHlwZW9mIG9uQXVkaW9DbGVhcmVkID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBvbkF1ZGlvQ2xlYXJlZCgpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNodW5rc1JlZi5jdXJyZW50ID0gW107XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gUHJlZmVyIHJhdyBtb25vIGNhcHR1cmUgYW5kIGRpc2FibGUgYnJvd3NlciBwcm9jZXNzaW5nIHdoZW4gYXZhaWxhYmxlLlxyXG4gICAgICBjb25zdCBwcmVmZXJyZWRDb25zdHJhaW50cyA9IHtcclxuICAgICAgICBjaGFubmVsQ291bnQ6IDEsXHJcbiAgICAgICAgZWNob0NhbmNlbGxhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgbm9pc2VTdXBwcmVzc2lvbjogZmFsc2UsXHJcbiAgICAgICAgYXV0b0dhaW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBzdHJlYW0gPSBudWxsO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHByZWZlcnJlZENvbnN0cmFpbnRzIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBsb2dXYXJuKFwiUHJlZmVycmVkIGF1ZGlvIGNvbnN0cmFpbnRzIGZhaWxlZC4gUmV0cnlpbmcgd2l0aCBkZWZhdWx0cy5cIiwgZXJyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzdHJlYW0pIHtcclxuICAgICAgICBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdHJlYW1SZWYuY3VycmVudCA9IHN0cmVhbTtcclxuXHJcbiAgICAgIGNvbnN0IEF1ZGlvQ29udGV4dEN0b3IgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XHJcbiAgICAgIGlmICghQXVkaW9Db250ZXh0Q3RvcikgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBdWRpb1JlY29yZGVyX0Vycm9yX05vQXVkaW9Db250ZXh0XCIsIFwiQXVkaW9Db250ZXh0IGlzIG5vdCBhdmFpbGFibGUuXCIpKTtcclxuXHJcbiAgICAgIGNvbnN0IGF1ZGlvQ3R4ID0gbmV3IEF1ZGlvQ29udGV4dEN0b3IoKTtcclxuICAgICAgYXVkaW9DdHhSZWYuY3VycmVudCA9IGF1ZGlvQ3R4O1xyXG4gICAgICBzYW1wbGVSYXRlUmVmLmN1cnJlbnQgPSBhdWRpb0N0eC5zYW1wbGVSYXRlO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBhdWRpb0N0eC5yZXN1bWUoKTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNvdXJjZSA9IGF1ZGlvQ3R4LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XHJcbiAgICAgIHNvdXJjZVJlZi5jdXJyZW50ID0gc291cmNlO1xyXG5cclxuICAgICAgY29uc3QgYW5hbHlzZXIgPSBhdWRpb0N0eC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgICBhbmFseXNlci5mZnRTaXplID0gMjA0ODtcclxuICAgICAgYW5hbHlzZXIuc21vb3RoaW5nVGltZUNvbnN0YW50ID0gMC44ODtcclxuICAgICAgYW5hbHlzZXJSZWYuY3VycmVudCA9IGFuYWx5c2VyO1xyXG5cclxuICAgICAgY29uc3QgemVyb0dhaW4gPSBhdWRpb0N0eC5jcmVhdGVHYWluKCk7XHJcbiAgICAgIHplcm9HYWluLmdhaW4udmFsdWUgPSAwO1xyXG4gICAgICB6ZXJvR2FpblJlZi5jdXJyZW50ID0gemVyb0dhaW47XHJcblxyXG4gICAgICB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJvY2Vzc29yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG5cclxuICAgICAgbGV0IGNhcHR1cmVOb2RlID0gbnVsbDtcclxuICAgICAgY29uc3QgY2FuV29ya2xldCA9ICEhKGF1ZGlvQ3R4LmF1ZGlvV29ya2xldCAmJiB0eXBlb2YgYXVkaW9DdHguYXVkaW9Xb3JrbGV0LmFkZE1vZHVsZSA9PT0gXCJmdW5jdGlvblwiKTtcclxuICAgICAgaWYgKGNhbldvcmtsZXQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3Qgd29ya2xldFVybCA9IGdldEF1ZGlvV29ya2xldFVybCgpO1xyXG4gICAgICAgICAgYXdhaXQgYXVkaW9DdHguYXVkaW9Xb3JrbGV0LmFkZE1vZHVsZSh3b3JrbGV0VXJsKTtcclxuXHJcbiAgICAgICAgICBjb25zdCB3b3JrbGV0Tm9kZSA9IG5ldyBBdWRpb1dvcmtsZXROb2RlKGF1ZGlvQ3R4LCBcImluZC1hdWRpby1jYXB0dXJlXCIpO1xyXG4gICAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudCA9IHdvcmtsZXROb2RlO1xyXG4gICAgICAgICAgY2FwdHVyZU5vZGUgPSB3b3JrbGV0Tm9kZTtcclxuXHJcbiAgICAgICAgICB3b3JrbGV0Tm9kZS5vbnByb2Nlc3NvcmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKFwiQXVkaW9Xb3JrbGV0IHByb2Nlc3NvciBlcnJvclwiLCBldmVudCk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgd29ya2xldE5vZGUucG9ydC5vbm1lc3NhZ2VlcnJvciA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsb2dFcnJvcihcIkF1ZGlvV29ya2xldCBtZXNzYWdlIGVycm9yXCIsIGV2ZW50KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB3b3JrbGV0Tm9kZS5wb3J0Lm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQgJiYgZXZlbnQuZGF0YSA/IGV2ZW50LmRhdGEgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS50eXBlICE9PSBcImNodW5rXCIpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKCFpc1JlY29yZGluZ1JlZi5jdXJyZW50IHx8IGlzUGF1c2VkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJhdyA9IGRhdGEuc2FtcGxlcztcclxuICAgICAgICAgICAgaWYgKCFyYXcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaHVuayA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChyYXcgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpIGNodW5rID0gcmF3O1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyYXcuYnVmZmVyKSBjaHVuayA9IG5ldyBGbG9hdDMyQXJyYXkocmF3LmJ1ZmZlcik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJhdy5ieXRlTGVuZ3RoKSBjaHVuayA9IG5ldyBGbG9hdDMyQXJyYXkocmF3KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghY2h1bmsgfHwgIWNodW5rLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjaHVua3NSZWYuY3VycmVudC5wdXNoKGNodW5rKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgbG9nSW5mbyhcIkF1ZGlvV29ya2xldCBjYXB0dXJlIGVuYWJsZWRcIiwgd29ya2xldFVybCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBsb2dXYXJuKFwiQXVkaW9Xb3JrbGV0IGZhaWxlZC4gRmFsbGluZyBiYWNrIHRvIFNjcmlwdFByb2Nlc3Nvci5cIiwgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9nV2FybihcIkF1ZGlvV29ya2xldCBub3Qgc3VwcG9ydGVkLiBVc2luZyBTY3JpcHRQcm9jZXNzb3IuXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWNhcHR1cmVOb2RlKSB7XHJcbiAgICAgICAgY29uc3QgcHJvY2Vzc29yID0gYXVkaW9DdHguY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDQwOTYsIDEsIDEpO1xyXG4gICAgICAgIHByb2Nlc3NvclJlZi5jdXJyZW50ID0gcHJvY2Vzc29yO1xyXG4gICAgICAgIGNhcHR1cmVOb2RlID0gcHJvY2Vzc29yO1xyXG5cclxuICAgICAgICBwcm9jZXNzb3Iub25hdWRpb3Byb2Nlc3MgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFpc1JlY29yZGluZ1JlZi5jdXJyZW50IHx8IGlzUGF1c2VkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICAgIGNvbnN0IGlucHV0ID0gZS5pbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKTtcclxuICAgICAgICAgIGNodW5rc1JlZi5jdXJyZW50LnB1c2gobmV3IEZsb2F0MzJBcnJheShpbnB1dCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEtlZXAgdGhlIGFuYWx5c2VyIG91dCBvZiB0aGUgcmVjb3JkaW5nIHBhdGggdG8gYXZvaWQgYWZmZWN0aW5nIGNhcHR1cmUuXHJcbiAgICAgIHNvdXJjZS5jb25uZWN0KGFuYWx5c2VyKTtcclxuICAgICAgYW5hbHlzZXIuY29ubmVjdCh6ZXJvR2Fpbik7XHJcbiAgICAgIHNvdXJjZS5jb25uZWN0KGNhcHR1cmVOb2RlKTtcclxuICAgICAgY2FwdHVyZU5vZGUuY29ubmVjdCh6ZXJvR2Fpbik7XHJcbiAgICAgIHplcm9HYWluLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgICBzZXRJc1JlY29yZGluZyh0cnVlKTtcclxuICAgICAgICBzZXRJc1BhdXNlZChmYWxzZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmVzZXRUaW1lcigpO1xyXG4gICAgICBzdGFydFRpbWVyKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgc2FmZVN0b3BSZWNvcmRpbmdJbnRlcm5hbCh7IGtlZXBXYXY6IGZhbHNlLCBza2lwVWlTdGF0ZTogZmFsc2UgfSk7XHJcblxyXG4gICAgICBjb25zdCBtc2cgPSBidWlsZE1pY0Vycm9yTWVzc2FnZShlcnIpO1xyXG4gICAgICBjb25zdCBuYW1lID0gc2FmZUVyck5hbWUoZXJyKTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHNhZmVFcnJNZXNzYWdlKGVycik7XHJcblxyXG4gICAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICAgIHNldFVpRXJyb3IobXNnKTtcclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgY29uc3QgZGV0YWlsID0gbWVzc2FnZSA/IGAke25hbWV9IC0gJHttZXNzYWdlfWAgOiBuYW1lO1xyXG4gICAgICAgICAgc2V0VWlIaW50KGluZFQoXCJBdWRpb1JlY29yZGVyX0hpbnRfVGVjaG5pY2FsXCIsIFwiVGVjaG5pY2FsIGRldGFpbHM6IHswfVwiKS5yZXBsYWNlKFwiezB9XCIsIGRldGFpbCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgbm90aWZ5UmVjb3JkaW5nRXJyb3IobXNnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG9nRXJyb3IoXCJBdWRpbyByZWNvcmRlciBzdGFydCBmYWlsZWRcIiwgZXJyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBhdXNlUmVjb3JkaW5nKCkge1xyXG4gICAgaWYgKCFpc1JlY29yZGluZykgcmV0dXJuO1xyXG4gICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgc2V0SXNQYXVzZWQodHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh3b3JrbGV0Tm9kZVJlZi5jdXJyZW50ICYmIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQucG9ydCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQucG9ydC5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0UmVjb3JkaW5nXCIsIHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHBhdXNlVGltZXIoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc3VtZVJlY29yZGluZygpIHtcclxuICAgIGlmICghaXNSZWNvcmRpbmcpIHJldHVybjtcclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldElzUGF1c2VkKGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHdvcmtsZXROb2RlUmVmLmN1cnJlbnQgJiYgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0LnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRSZWNvcmRpbmdcIiwgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydFRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBmaW5pc2hSZWNvcmRpbmcoKSB7XG4gICAgaWYgKCFpc1JlY29yZGluZykgcmV0dXJuO1xyXG5cclxuICAgIHBhdXNlVGltZXIoKTtcclxuXHJcbiAgICAvLyBGbHVzaCBhbnkgYnVmZmVyZWQgd29ya2xldCBzYW1wbGVzIGJlZm9yZSBidWlsZGluZyB0aGUgV0FWLlxyXG4gICAgaWYgKHdvcmtsZXROb2RlUmVmLmN1cnJlbnQgJiYgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0LnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRSZWNvcmRpbmdcIiwgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gd2luZG93LnNldFRpbWVvdXQocmVzb2x2ZSwgMzApKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNodW5rc1JlZi5jdXJyZW50Lmxlbmd0aCkge1xyXG4gICAgICBzYWZlU3RvcFJlY29yZGluZ0ludGVybmFsKHsga2VlcFdhdjogZmFsc2UsIHNraXBVaVN0YXRlOiBmYWxzZSB9KTtcclxuICAgICAgcmVzZXRUaW1lcigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWxsID0gY2h1bmtzUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCB0b3RhbExlbiA9IGFsbC5yZWR1Y2UoKHN1bSwgYSkgPT4gc3VtICsgYS5sZW5ndGgsIDApO1xyXG4gICAgY29uc3QgbWVyZ2VkID0gbmV3IEZsb2F0MzJBcnJheSh0b3RhbExlbik7XHJcblxyXG4gICAgbGV0IG9mZnNldCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBtZXJnZWQuc2V0KGFsbFtpXSwgb2Zmc2V0KTtcclxuICAgICAgb2Zmc2V0ICs9IGFsbFtpXS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FtcGxlczE2ID0gZmxvYXRUbzE2Qml0UENNKG1lcmdlZCk7XHJcbiAgICBjb25zdCB3YXYgPSBlbmNvZGVXYXYoeyBzYW1wbGVzMTY6IHNhbXBsZXMxNiwgc2FtcGxlUmF0ZTogc2FtcGxlUmF0ZVJlZi5jdXJyZW50LCBudW1DaGFubmVsczogMSB9KTtcclxuXHJcbiAgICBzYWZlU3RvcFJlY29yZGluZ0ludGVybmFsKHsga2VlcFdhdjogdHJ1ZSwgc2tpcFVpU3RhdGU6IGZhbHNlIH0pO1xyXG5cclxuICAgIGNvbnN0IGxldmVscyA9IGJ1aWxkU2Vjb25kTGV2ZWxzKG1lcmdlZCwgc2FtcGxlUmF0ZVJlZi5jdXJyZW50KTtcclxuICAgIGNvbnN0IGR1cmF0aW9uU2VjID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKG1lcmdlZC5sZW5ndGggLyBzYW1wbGVSYXRlUmVmLmN1cnJlbnQpKTtcclxuXHJcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHdhdik7XHJcbiAgICBjb25zdCBmaWxlTmFtZSA9IGJ1aWxkRG93bmxvYWRGaWxlTmFtZShkb3dubG9hZEJhc2VOYW1lKTtcclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldFdhdkJsb2Iod2F2KTtcclxuICAgICAgc2V0V2F2VXJsKHVybCk7XHJcbiAgICAgIHNldFdhdkZpbGVOYW1lKGZpbGVOYW1lKTtcclxuICAgICAgc2V0V2F2TGV2ZWxzKGxldmVscyk7XHJcbiAgICAgIHNldFdhdkR1cmF0aW9uU2VjKGR1cmF0aW9uU2VjKTtcclxuICAgICAgc2V0UGxheWJhY2tSZW1haW5pbmdTZWMoZHVyYXRpb25TZWMpO1xyXG4gICAgICBzZXRQbGF5YmFja1NlY29uZCgwKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHR5cGVvZiBvbkF1ZGlvUmVhZHkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgb25BdWRpb1JlYWR5KHdhdik7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaWdub3JlICovXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXV0by10cmFuc2NyaWJlIG9ubHkgd2hlbiB0aGUgcGFyZW50IGV4cGxpY2l0bHkgZW5hYmxlcyBpdC5cbiAgICBpZiAoYXV0b1RyYW5zY3JpYmVPblN0b3AgJiYgdHlwZW9mIG9uVHJhbnNjcmliZSA9PT0gXCJmdW5jdGlvblwiICYmICF0cmFuc2NyaWJlQnVzeSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdm9pZCBvblRyYW5zY3JpYmUod2F2KTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBpZ25vcmUgKi9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxyXG4gIGZ1bmN0aW9uIGNsZWFyUmVjb3JkaW5nKCkge1xyXG4gICAgc2FmZVN0b3BQbGF5YmFjaygpO1xyXG4gICAgc2FmZVN0b3BSZWNvcmRpbmdJbnRlcm5hbCh7IGtlZXBXYXY6IGZhbHNlLCBza2lwVWlTdGF0ZTogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKHdhdlVybFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh3YXZVcmxSZWYuY3VycmVudCk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICBzZXRXYXZVcmwobnVsbCk7XHJcbiAgICAgIHNldFdhdkJsb2IobnVsbCk7XHJcbiAgICAgIHNldFdhdkZpbGVOYW1lKFwiXCIpO1xyXG4gICAgICBzZXRVaUVycm9yKFwiXCIpO1xyXG4gICAgICBzZXRVaUhpbnQoXCJcIik7XHJcbiAgICB9KTtcclxuICAgIHNldFdhdkxldmVscyhbXSk7XHJcbiAgICBzZXRXYXZEdXJhdGlvblNlYygwKTtcclxuICAgIHNldFBsYXliYWNrUmVtYWluaW5nU2VjKDApO1xyXG4gICAgc2V0UGxheWJhY2tTZWNvbmQoMCk7XHJcbiAgICBpZiAodHlwZW9mIG9uQXVkaW9DbGVhcmVkID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBvbkF1ZGlvQ2xlYXJlZCgpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNodW5rc1JlZi5jdXJyZW50ID0gW107XHJcbiAgICByZXNldFRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYWZlU3RvcFJlY29yZGluZ0ludGVybmFsKGFyZ3MpIHtcclxuICAgIGNvbnN0IGtlZXBXYXYgPSBhcmdzLmtlZXBXYXY7XHJcbiAgICBjb25zdCBza2lwVWlTdGF0ZSA9IGFyZ3Muc2tpcFVpU3RhdGU7XHJcblxyXG4gICAgc3RvcEVxTG9vcCgpO1xyXG4gICAgaWYgKCFrZWVwV2F2KSByZXNldFRpbWVyKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHdvcmtsZXROb2RlUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKHdvcmtsZXROb2RlUmVmLmN1cnJlbnQucG9ydCkge1xyXG4gICAgICAgICAgICB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50LnBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldFJlY29yZGluZ1wiLCB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHByb2Nlc3NvclJlZi5jdXJyZW50KSBwcm9jZXNzb3JSZWYuY3VycmVudC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIGlmIChhbmFseXNlclJlZi5jdXJyZW50KSBhbmFseXNlclJlZi5jdXJyZW50LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgaWYgKHNvdXJjZVJlZi5jdXJyZW50KSBzb3VyY2VSZWYuY3VycmVudC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIGlmICh6ZXJvR2FpblJlZi5jdXJyZW50KSB6ZXJvR2FpblJlZi5jdXJyZW50LmRpc2Nvbm5lY3QoKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoYXVkaW9DdHhSZWYuY3VycmVudCAmJiBhdWRpb0N0eFJlZi5jdXJyZW50LnN0YXRlICE9PSBcImNsb3NlZFwiKSBhdWRpb0N0eFJlZi5jdXJyZW50LmNsb3NlKCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHN0cmVhbVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY29uc3QgdHJhY2tzID0gc3RyZWFtUmVmLmN1cnJlbnQuZ2V0VHJhY2tzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHRyYWNrc1tpXS5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzb3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBhbmFseXNlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHNvdXJjZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHplcm9HYWluUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgd29ya2xldE5vZGVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBhdWRpb0N0eFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHN0cmVhbVJlZi5jdXJyZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoIXNraXBVaVN0YXRlKSB7XHJcbiAgICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgc2V0SXNSZWNvcmRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldElzUGF1c2VkKGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b2dnbGVQbGF5KCkge1xyXG4gICAgY29uc3QgYXVkaW9FbCA9IGF1ZGlvRWxSZWYuY3VycmVudDtcclxuICAgIGlmICghYXVkaW9FbCB8fCAhd2F2VXJsKSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKGF1ZGlvRWwucGF1c2VkKSBhdWRpb0VsLnBsYXkoKTtcclxuICAgICAgZWxzZSBhdWRpb0VsLnBhdXNlKCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzeW5jQ2FudmFzU2l6ZSgpIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGJhcnNDYW52YXNSZWYuY3VycmVudDtcclxuICAgIGlmICghY2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdyA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoY2FudmFzLmNsaWVudFdpZHRoKSk7XHJcbiAgICBjb25zdCBoID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihjYW52YXMuY2xpZW50SGVpZ2h0KSk7XHJcbiAgICBpZiAoY2FudmFzLndpZHRoICE9PSB3KSBjYW52YXMud2lkdGggPSB3O1xyXG4gICAgaWYgKGNhbnZhcy5oZWlnaHQgIT09IGgpIGNhbnZhcy5oZWlnaHQgPSBoO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3RhcnRFcUxvb3AoKSB7XHJcbiAgICBpZiAocmFmSWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgY29uc3QgY2FudmFzID0gYmFyc0NhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgY29uc3QgYW5hbHlzZXIgPSBhbmFseXNlclJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMgfHwgIWFuYWx5c2VyKSByZXR1cm47XHJcblxyXG4gICAgc3luY0NhbnZhc1NpemUoKTtcclxuXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgaWYgKCFjdHgpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBmcmVxID0gbmV3IFVpbnQ4QXJyYXkoYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvb3AoKSB7XHJcbiAgICAgIHJhZklkUmVmLmN1cnJlbnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcblxyXG4gICAgICBhbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YShmcmVxKTtcclxuXHJcbiAgICAgIGNvbnN0IHcgPSBjYW52YXMud2lkdGg7XHJcbiAgICAgIGNvbnN0IGggPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHcsIGgpO1xyXG5cclxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGJyYW5kUmdiYSgwLjEwKTtcclxuICAgICAgY3R4LmZpbGxSZWN0KDAsIE1hdGguZmxvb3IoaCAvIDIpLCB3LCAxKTtcclxuXHJcbiAgICAgIGNvbnN0IGdhcCA9IGJhckdhcFB4O1xyXG4gICAgICBjb25zdCBiYXJXID0gYmFyV2lkdGhQeDtcclxuICAgICAgbGV0IGNvdW50ID0gTWF0aC5mbG9vcigodyArIGdhcCkgLyAoYmFyVyArIGdhcCkpO1xyXG4gICAgICBpZiAoY291bnQgPCBiYXJNaW5Db3VudCkgY291bnQgPSBiYXJNaW5Db3VudDtcclxuICAgICAgaWYgKGNvdW50ID4gYmFyTWF4Q291bnQpIGNvdW50ID0gYmFyTWF4Q291bnQ7XHJcblxyXG4gICAgICBjb25zdCB0b3RhbFcgPSBjb3VudCAqIGJhclcgKyAoY291bnQgLSAxKSAqIGdhcDtcclxuICAgICAgY29uc3Qgc3RhcnRYID0gTWF0aC5mbG9vcigodyAtIHRvdGFsVykgLyAyKTtcclxuXHJcbiAgICAgIGNvbnN0IG1heEggPSBNYXRoLmZsb29yKGggKiAwLjkyKTtcclxuXHJcbiAgICAgIGlmICghZXFMYXN0UmVmLmN1cnJlbnQgfHwgZXFMYXN0UmVmLmN1cnJlbnQubGVuZ3RoICE9PSBjb3VudCkge1xyXG4gICAgICAgIGVxTGFzdFJlZi5jdXJyZW50ID0gbmV3IEFycmF5KGNvdW50KS5maWxsKDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKChpIC8gY291bnQpICogZnJlcS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IHYgPSBNYXRoLnBvdyhmcmVxW2lkeF0gLyAyNTUsIDAuOSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3QgPSBlcUxhc3RSZWYuY3VycmVudFtpXSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IHNtb290aCA9IGxhc3QgKiAwLjc4ICsgdiAqIDAuMjI7XHJcbiAgICAgICAgZXFMYXN0UmVmLmN1cnJlbnRbaV0gPSBzbW9vdGg7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhckggPSBNYXRoLm1heCgyLCBNYXRoLmZsb29yKHNtb290aCAqIG1heEgpKTtcclxuICAgICAgICBjb25zdCB4ID0gc3RhcnRYICsgaSAqIChiYXJXICsgZ2FwKTtcclxuICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcigoaCAtIGJhckgpIC8gMik7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBicmFuZFJnYmEoMC40Mik7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIGJhclcsIGJhckgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmFmSWRSZWYuY3VycmVudCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0b3BFcUxvb3AoKSB7XHJcbiAgICBpZiAocmFmSWRSZWYuY3VycmVudCkge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWZJZFJlZi5jdXJyZW50KTtcclxuICAgICAgcmFmSWRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkcmF3RXFJZGxlKCkge1xyXG4gICAgY29uc3QgY2FudmFzID0gYmFyc0NhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuXHJcbiAgICBzeW5jQ2FudmFzU2l6ZSgpO1xyXG5cclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHcgPSBjYW52YXMud2lkdGg7XHJcbiAgICBjb25zdCBoID0gY2FudmFzLmhlaWdodDtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdywgaCk7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGJyYW5kUmdiYSgwLjA4KTtcclxuICAgIGN0eC5maWxsUmVjdCgwLCBNYXRoLmZsb29yKGggLyAyKSwgdywgMSk7XHJcblxyXG4gICAgY29uc3QgZ2FwID0gYmFyR2FwUHg7XHJcbiAgICBjb25zdCBiYXJXID0gYmFyV2lkdGhQeDtcclxuICAgIGxldCBjb3VudCA9IE1hdGguZmxvb3IoKHcgKyBnYXApIC8gKGJhclcgKyBnYXApKTtcclxuICAgIGlmIChjb3VudCA8IGJhck1pbkNvdW50KSBjb3VudCA9IGJhck1pbkNvdW50O1xyXG4gICAgaWYgKGNvdW50ID4gYmFyTWF4Q291bnQpIGNvdW50ID0gYmFyTWF4Q291bnQ7XHJcblxyXG4gICAgY29uc3QgdG90YWxXID0gY291bnQgKiBiYXJXICsgKGNvdW50IC0gMSkgKiBnYXA7XHJcbiAgICBjb25zdCBzdGFydFggPSBNYXRoLmZsb29yKCh3IC0gdG90YWxXKSAvIDIpO1xyXG5cclxuICAgIGNvbnN0IG1heEggPSBNYXRoLmZsb29yKGggKiAwLjM1KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICBjb25zdCB2ID0gMC4xOCArIChpICUgOSkgKiAwLjAxO1xyXG4gICAgICBjb25zdCBiYXJIID0gTWF0aC5tYXgoMiwgTWF0aC5mbG9vcih2ICogbWF4SCkpO1xyXG5cclxuICAgICAgY29uc3QgeCA9IHN0YXJ0WCArIGkgKiAoYmFyVyArIGdhcCk7XHJcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKChoIC0gYmFySCkgLyAyKTtcclxuXHJcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBicmFuZFJnYmEoMC4xNik7XHJcbiAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBiYXJXLCBiYXJIKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRyYXdFcVdhdmVmb3JtKGFjdGl2ZVNlY29uZCkge1xyXG4gICAgY29uc3QgY2FudmFzID0gYmFyc0NhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuXHJcbiAgICBzeW5jQ2FudmFzU2l6ZSgpO1xyXG5cclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGxldmVscyA9IHdhdkxldmVsc1JlZi5jdXJyZW50IHx8IFtdO1xyXG4gICAgaWYgKCFsZXZlbHMubGVuZ3RoKSB7XHJcbiAgICAgIGRyYXdFcUlkbGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHcgPSBjYW52YXMud2lkdGg7XHJcbiAgICBjb25zdCBoID0gY2FudmFzLmhlaWdodDtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdywgaCk7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGJyYW5kUmdiYSgwLjEwKTtcclxuICAgIGN0eC5maWxsUmVjdCgwLCBNYXRoLmZsb29yKGggLyAyKSwgdywgMSk7XHJcblxyXG4gICAgY29uc3QgbWF4SCA9IE1hdGguZmxvb3IoaCAqIDAuOSk7XHJcbiAgICBjb25zdCBtaW5IID0gMztcclxuXHJcbiAgICBjb25zdCBiYXJXID0gMztcclxuICAgIGNvbnN0IGdhcCA9IDI7XHJcbiAgICBjb25zdCBtaW5CYXJzID0gNDg7XHJcbiAgICBjb25zdCBtYXhCYXJzID0gMTQwO1xyXG4gICAgY29uc3QgZml0QmFycyA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoKHcgKyBnYXApIC8gKGJhclcgKyBnYXApKSk7XHJcbiAgICBjb25zdCBjb3VudCA9IE1hdGgubWF4KG1pbkJhcnMsIE1hdGgubWluKG1heEJhcnMsIE1hdGgubWF4KGxldmVscy5sZW5ndGgsIGZpdEJhcnMpKSk7XHJcbiAgICBjb25zdCB0b3RhbFcgPSBjb3VudCAqIGJhclcgKyAoY291bnQgLSAxKSAqIGdhcDtcclxuICAgIGNvbnN0IHN0YXJ0WCA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoKHcgLSB0b3RhbFcpIC8gMikpO1xyXG5cclxuICAgIGNvbnN0IGR1cmF0aW9uU2VjID0gTWF0aC5tYXgoMSwgd2F2RHVyYXRpb25TZWMgfHwgbGV2ZWxzLmxlbmd0aCB8fCAxKTtcclxuICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oY291bnQgLSAxLCBNYXRoLmZsb29yKChhY3RpdmVTZWNvbmQgLyBkdXJhdGlvblNlYykgKiAoY291bnQgLSAxKSkpKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgY29uc3QgdCA9IGNvdW50ID4gMSA/IGkgLyAoY291bnQgLSAxKSA6IDA7XHJcbiAgICAgIGNvbnN0IHJhd0luZGV4ID0gdCAqIE1hdGgubWF4KDAsIGxldmVscy5sZW5ndGggLSAxKTtcclxuICAgICAgY29uc3QgbG93ID0gTWF0aC5mbG9vcihyYXdJbmRleCk7XHJcbiAgICAgIGNvbnN0IGhpZ2ggPSBNYXRoLm1pbihsZXZlbHMubGVuZ3RoIC0gMSwgbG93ICsgMSk7XHJcbiAgICAgIGNvbnN0IGZyYWMgPSByYXdJbmRleCAtIGxvdztcclxuICAgICAgY29uc3QgdkxvdyA9IGxldmVsc1tsb3ddIHx8IDA7XHJcbiAgICAgIGNvbnN0IHZIaWdoID0gbGV2ZWxzW2hpZ2hdIHx8IDA7XHJcbiAgICAgIGNvbnN0IHYgPSB2TG93ICogKDEgLSBmcmFjKSArIHZIaWdoICogZnJhYztcclxuICAgICAgY29uc3QgYmFySCA9IE1hdGgubWF4KG1pbkgsIE1hdGguZmxvb3IodiAqIChtYXhIIC0gbWluSCkgKyBtaW5IKSk7XHJcbiAgICAgIGNvbnN0IHggPSBzdGFydFggKyBpICogKGJhclcgKyBnYXApO1xyXG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcigoaCAtIGJhckgpIC8gMik7XHJcblxyXG4gICAgICBjb25zdCBpc0FjdGl2ZSA9IGkgPT09IGFjdGl2ZUluZGV4O1xyXG4gICAgICBjdHguZmlsbFN0eWxlID0gaXNBY3RpdmUgPyBicmFuZFJnYmEoMC43OCkgOiBicmFuZFJnYmEoMC4yOCk7XHJcbiAgICAgIGRyYXdSb3VuZGVkUmVjdChjdHgsIHgsIHksIGJhclcsIGJhckgsIE1hdGgubWluKDYsIE1hdGguZmxvb3IoYmFyVyAvIDIpKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkNlbnRlckNsaWNrKCkge1xyXG4gICAgaWYgKCFpc1JlY29yZGluZykge1xyXG4gICAgICBzdGFydFJlY29yZGluZygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaXNQYXVzZWQpIHJlc3VtZVJlY29yZGluZygpO1xyXG4gICAgZWxzZSBwYXVzZVJlY29yZGluZygpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25SaWdodENsaWNrKCkge1xyXG4gICAgaWYgKGlzUmVjb3JkaW5nKSB7XHJcbiAgICAgIGZpbmlzaFJlY29yZGluZygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAod2F2QmxvYikgY2xlYXJSZWNvcmRpbmcoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNlbnRlckxhYmVsID0gIWlzUmVjb3JkaW5nXHJcbiAgICA/IGluZFQoXCJBdWRpb1JlY29yZGVyX1JlY29yZFwiLCBcIlJlY29yZFwiKVxyXG4gICAgOiBpc1BhdXNlZFxyXG4gICAgICA/IGluZFQoXCJBdWRpb1JlY29yZGVyX1Jlc3VtZVwiLCBcIlJlc3VtZVwiKVxyXG4gICAgICA6IGluZFQoXCJBdWRpb1JlY29yZGVyX1BhdXNlXCIsIFwiUGF1c2VcIik7XHJcblxyXG4gIGNvbnN0IHRvdGFsV2F2TXMgPSB3YXZEdXJhdGlvblNlYyA+IDAgPyB3YXZEdXJhdGlvblNlYyAqIDEwMDAgOiAwO1xyXG4gIGNvbnN0IHJlbWFpbmluZ1dhdk1zID0gd2F2RHVyYXRpb25TZWMgPiAwID8gTWF0aC5tYXgoMCwgcGxheWJhY2tSZW1haW5pbmdTZWMgKiAxMDAwKSA6IDA7XHJcbiAgY29uc3QgdGltZXJUZXh0ID0gaXNSZWNvcmRpbmdcclxuICAgID8gZm9ybWF0VGltZU1zKGVsYXBzZWRNcylcclxuICAgIDogd2F2VXJsXHJcbiAgICAgID8gZm9ybWF0VGltZU1zKHJlbWFpbmluZ1dhdk1zIHx8IHRvdGFsV2F2TXMpXHJcbiAgICAgIDogZm9ybWF0VGltZU1zKDApO1xyXG5cclxuICBjb25zdCBpc0FjdGl2ZVJlYyA9IGlzUmVjb3JkaW5nICYmICFpc1BhdXNlZDtcclxuICBjb25zdCBzdGF0dXNUZXh0ID0gdWlFcnJvclxyXG4gICAgPyBcIlwiXHJcbiAgICA6IGlzQWN0aXZlUmVjXHJcbiAgICAgID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfU3RhdHVzX1JlY29yZGluZ1wiLCBcIlJlY29yZGluZ1wiKVxyXG4gICAgICA6IGlzUGF1c2VkXHJcbiAgICAgICAgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9TdGF0dXNfUGF1c2VkXCIsIFwiUGF1c2VkXCIpXHJcbiAgICAgICAgOiB3YXZVcmxcclxuICAgICAgICAgID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfU3RhdHVzX1JlYWR5VG9QbGF5XCIsIFwiUmVhZHkgdG8gcGxheVwiKVxyXG4gICAgICAgICAgOiBpbmRUKFwiQXVkaW9SZWNvcmRlcl9TdGF0dXNfUmVhZHlcIiwgXCJSZWFkeVwiKTtcclxuXHJcbiAgY29uc3QgdGltZXJBbHBoYSA9IGlzQWN0aXZlUmVjID8gMC41NSA6IGlzUGF1c2VkID8gMC40NiA6IDAuNDA7XHJcbiAgY29uc3Qgc3RhdHVzQWxwaGEgPSAwLjM1O1xyXG4gIGNvbnN0IGNhcmRCZyA9IFwicmFkaWFsLWdyYWRpZW50KDcwMHB4IGNpcmNsZSBhdCAxOCUgMCUsIHJnYmEoMCwgNDEsIDEwNywgMC4wNiksIHRyYW5zcGFyZW50IDU1JSlcIjtcclxuXHJcbiAgY29uc3Qgb3V0ZXJDbGFzc05hbWUgPSBlbWJlZGRlZFxyXG4gICAgPyBcInctZnVsbFwiXHJcbiAgICA6IFwidy1mdWxsIG1pbi1oLVsyODBweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHNtOnAtNlwiO1xyXG5cclxuICBjb25zdCBvdXRlclN0eWxlID0gZW1iZWRkZWRcclxuICAgID8gdW5kZWZpbmVkXHJcbiAgICA6IHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwicmFkaWFsLWdyYWRpZW50KDkwMHB4IGNpcmNsZSBhdCAyMCUgMjAlLCByZ2JhKDAsIDQxLCAxMDcsIDAuMDgpLCB0cmFuc3BhcmVudCA2MCUpXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4wNSlcIixcclxuICAgICAgICBmb250RmFtaWx5OiAnXCJNb250c2VycmF0XCIsIHNhbnMtc2VyaWYnLFxyXG4gICAgICB9O1xyXG5cclxuICBjb25zdCBjYXJkQ2xhc3NOYW1lID0gZW1iZWRkZWRcclxuICAgID8gXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctd2hpdGUgYm9yZGVyIHNoYWRvdy14bFwiXG4gICAgOiBcInJlbGF0aXZlIHctZnVsbCBtYXgtdy1bMzYwcHhdIHNtOm1heC13LVs0MjBweF0gbGc6bWF4LXctWzUyMHB4XSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy13aGl0ZSBib3JkZXIgc2hhZG93LXhsXCI7XG5cclxuICBjb25zdCBzaG93VHJhbnNjcmliZUJ1dHRvbiA9ICEhd2F2QmxvYiAmJiB0eXBlb2Ygb25UcmFuc2NyaWJlID09PSBcImZ1bmN0aW9uXCIgJiYgIWhpZGVUcmFuc2NyaWJlQnV0dG9uO1xuICBjb25zdCB0cmFuc2NyaWJlVGV4dCA9IHRyYW5zY3JpYmVMYWJlbCB8fCBpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJlXCIsIFwiVHJhbnNjcmliZVwiKTtcclxuICBjb25zdCB0cmFuc2NyaWJlQnVzeVRleHQgPSB0cmFuc2NyaWJlQnVzeUxhYmVsIHx8IGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmluZ1wiLCBcIlRyYW5zY3JpYmluZ1wiKTtcclxuICAgIGNvbnN0IHNob3dEb3dubG9hZEJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e291dGVyQ2xhc3NOYW1lfSBzdHlsZT17b3V0ZXJTdHlsZX0+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9e2NhcmRDbGFzc05hbWV9XHJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjE4KVwiLCBiYWNrZ3JvdW5kSW1hZ2U6IGNhcmRCZyB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgeyF3YXZVcmwgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTQgdG9wLTQgc206cmlnaHQtNSBzbTp0b3AtNVwiPlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1saWdodCBpdGFsaWMgdGFidWxhci1udW1zIHRleHQtWzE2cHhdIHNtOnRleHQtWzE4cHhdIGxlYWRpbmctbm9uZSB0cmFja2luZy1bMC4xNGVtXVwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IGJyYW5kUmdiYSh0aW1lckFscGhhKSB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3RpbWVyVGV4dH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNSBzbTpweC03IHB0LTMgc206cHQtNCAke3dhdlVybCA/IFwicGItMCBzbTpwYi0xXCIgOiBcInBiLTEgc206cGItMlwifWB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8Y2FudmFzIHJlZj17YmFyc0NhbnZhc1JlZn0gY2xhc3NOYW1lPVwidy1mdWxsIGgtMTIgc206aC0xNlwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHt3YXZVcmwgPyAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMC41IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kXCI+XHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1saWdodCBpdGFsaWMgdGFidWxhci1udW1zIHRleHQtWzE2cHhdIHNtOnRleHQtWzE4cHhdIGxlYWRpbmctbm9uZSB0cmFja2luZy1bMC4xNGVtXVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogYnJhbmRSZ2JhKHRpbWVyQWxwaGEpIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge3RpbWVyVGV4dH1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BweC01IHNtOnB4LTcgcGItNCBzbTpwYi01ICR7d2F2VXJsID8gXCJwdC0xIHNtOnB0LTJcIiA6IFwicHQtMiBzbTpwdC0zXCJ9YH0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIgc3R5bGU9e3sgZ2FwOiBcIjI0cHhcIiB9fT5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVBsYXl9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyF3YXZVcmx9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC0xMiB3LTEyIHNtOmgtMTQgc206dy0xNCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbiBzaGFkb3cteHMgaG92ZXI6c2hhZG93LW1kIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogd2F2VXJsID8gXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMjIpXCIgOiBcInJnYmEoMCwgNDEsIDEwNywgMC4xOClcIixcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogd2F2VXJsID8gXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDYpXCIgOiBcInJnYmEoMCwgNDEsIDEwNywgMC4wNClcIixcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IHdhdlVybCA/IDEgOiAwLjQ1LFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiB3YXZVcmwgPyBcInBvaW50ZXJcIiA6IFwibm90LWFsbG93ZWRcIixcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJBdWRpb1JlY29yZGVyX1BsYXlcIiwgXCJQbGF5XCIpfVxyXG4gICAgICAgICAgICAgIHRpdGxlPXt3YXZVcmwgPyAoaXNQbGF5aW5nID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfUGF1c2VcIiwgXCJQYXVzZVwiKSA6IGluZFQoXCJBdWRpb1JlY29yZGVyX1BsYXlcIiwgXCJQbGF5XCIpKSA6IGluZFQoXCJBdWRpb1JlY29yZGVyX05vQXVkaW9cIiwgXCJObyBhdWRpb1wiKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtpc1BsYXlpbmcgPyAoXHJcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0eWxlPXt7IGNvbG9yOiBJTkRfQlJBTkQgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI2XCIgeT1cIjVcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCIxNFwiIHJ4PVwiMVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMTRcIiB5PVwiNVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIyXCIgaGVpZ2h0PVwiMjJcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHlsZT17eyBjb2xvcjogSU5EX0JSQU5EIH19PlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTkgN0wxOSAxMkw5IDE3VjdaXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNlbnRlckNsaWNrfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshY2FuUmVjb3JkfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtMTQgdy0xNCBzbTpoLTE2IHNtOnctMTYgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24gc2hhZG93LXhzIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTVcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjE4KVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjYW5SZWNvcmQgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4wNilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgYm94U2hhZG93OiBpc0FjdGl2ZVJlY1xyXG4gICAgICAgICAgICAgICAgICA/IFwiMCAwIDAgN3B4IHJnYmEoMCwgNDEsIDEwNywgMC4wOCksIDAgMTRweCAzNHB4IHJnYmEoMCwgNDEsIDEwNywgMC4xNClcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwiMCAxMHB4IDIycHggcmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogY2FuUmVjb3JkID8gMSA6IDAuNDUsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6IGNhblJlY29yZCA/IFwicG9pbnRlclwiIDogXCJub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17Y2VudGVyTGFiZWx9XHJcbiAgICAgICAgICAgICAgdGl0bGU9e2NlbnRlckxhYmVsfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgeyFpc1JlY29yZGluZyA/IChcclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImgtNSB3LTUgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctcmVkLTUwMFwiIC8+XG4gICAgICAgICAgICAgICkgOiBpc1BhdXNlZCA/IChcclxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMlwiIGhlaWdodD1cIjIyXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3R5bGU9e3sgY29sb3I6IElORF9CUkFORCB9fT5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk05IDdMMTkgMTJMOSAxN1Y3WlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMlwiIGhlaWdodD1cIjIyXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3R5bGU9e3sgY29sb3I6IElORF9CUkFORCB9fT5cclxuICAgICAgICAgICAgICAgICAgPHJlY3QgeD1cIjZcIiB5PVwiNVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNFwiIHk9XCI1XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiMTRcIiByeD1cIjFcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uUmlnaHRDbGlja31cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzUmVjb3JkaW5nfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtMTIgdy0xMiBzbTpoLTE0IHNtOnctMTQgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24gc2hhZG93LXhzIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTVcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGlzUmVjb3JkaW5nID8gXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMjIpXCIgOiBcInJnYmEoMCwgNDEsIDEwNywgMC4xOClcIixcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNSZWNvcmRpbmcgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4wNilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogaXNSZWNvcmRpbmcgPyAxIDogMC40NSxcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogaXNSZWNvcmRpbmcgPyBcInBvaW50ZXJcIiA6IFwibm90LWFsbG93ZWRcIixcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2lzUmVjb3JkaW5nID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfU3RvcFwiLCBcIlN0b3BcIikgOiBpbmRUKFwiQXVkaW9SZWNvcmRlcl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XHJcbiAgICAgICAgICAgICAgdGl0bGU9e2lzUmVjb3JkaW5nID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfU3RvcFwiLCBcIlN0b3BcIikgOiBpbmRUKFwiQXVkaW9SZWNvcmRlcl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0eWxlPXt7IGNvbG9yOiBJTkRfQlJBTkQgfX0+XHJcbiAgICAgICAgICAgICAgICA8cmVjdCB4PVwiN1wiIHk9XCI3XCIgd2lkdGg9XCIxMFwiIGhlaWdodD1cIjEwXCIgcng9XCIxXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAge3Nob3dEb3dubG9hZEJ1dHRvbiB8fCBzaG93VHJhbnNjcmliZUJ1dHRvbiA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0yIGZsZXgtd3JhcFwiPlxyXG4gICAgICAgICAgICAgIHtzaG93RG93bmxvYWRCdXR0b24gPyAoXHJcbiAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICBocmVmPXt3YXZVcmwgfHwgdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgICAgICBkb3dubG9hZD17d2F2RmlsZU5hbWUgfHwgdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTEuNSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgdGV4dC1bMTNweF0gZm9udC1tZWRpdW0gdHJhbnNpdGlvbiBzaGFkb3cteHMgaG92ZXI6c2hhZG93LW1kIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIixcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBJTkRfQlJBTkQsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2Rvd25sb2FkTGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkb3dubG9hZExhYmVsfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7ZG93bmxvYWRMYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICB7c2hvd1RyYW5zY3JpYmVCdXR0b24gPyAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRyYW5zY3JpYmUgJiYgb25UcmFuc2NyaWJlKHdhdkJsb2IpfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJhbnNjcmliZUJ1c3l9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMS41IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciB0ZXh0LVsxM3B4XSBmb250LW1lZGl1bSB0cmFuc2l0aW9uIHNoYWRvdy14cyBob3ZlcjpzaGFkb3ctbWQgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjIyKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdHJhbnNjcmliZUJ1c3kgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4wOClcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBJTkRfQlJBTkQsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogdHJhbnNjcmliZUJ1c3kgPyAwLjcgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogdHJhbnNjcmliZUJ1c3kgPyBcIm5vdC1hbGxvd2VkXCIgOiBcInBvaW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17dHJhbnNjcmliZUJ1c3kgPyB0cmFuc2NyaWJlQnVzeVRleHQgOiB0cmFuc2NyaWJlVGV4dH1cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RyYW5zY3JpYmVCdXN5ID8gdHJhbnNjcmliZUJ1c3lUZXh0IDogdHJhbnNjcmliZVRleHR9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHt0cmFuc2NyaWJlQnVzeSA/IHRyYW5zY3JpYmVCdXN5VGV4dCA6IHRyYW5zY3JpYmVUZXh0fVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgPGF1ZGlvIHJlZj17YXVkaW9FbFJlZn0gc3JjPXt3YXZVcmwgfHwgdW5kZWZpbmVkfSBjbGFzc05hbWU9XCJoaWRkZW5cIiAvPlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBtaW4taC1bMjJweF1cIj5cclxuICAgICAgICAgICAge3VpRXJyb3IgPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXJvc2UtNzAwIHRleHQtY2VudGVyIGxlYWRpbmctdGlnaHRcIj57dWlFcnJvcn08L2Rpdj5cclxuICAgICAgICAgICAgICAgIHt1aUhpbnQgPyAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDAgdGV4dC1jZW50ZXIgbGVhZGluZy10aWdodFwiPnt1aUhpbnR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgbGVhZGluZy10aWdodFwiIHN0eWxlPXt7IGNvbG9yOiBicmFuZFJnYmEoc3RhdHVzQWxwaGEpIH19PlxyXG4gICAgICAgICAgICAgICAge3N0YXR1c1RleHR9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7QUFBQSxtQkFBbUQ7QUF1c0N2QztBQXJzQ1osSUFBTSxXQUFXLFdBQVcsZ0JBQWdCLENBQUM7QUFDN0MsSUFBTSxPQUFPLENBQUMsS0FBYSxhQUN4QixZQUFZLE9BQU8sU0FBUyxHQUFHLE1BQU0sWUFBWSxTQUFTLEdBQUcsS0FBTSxZQUFZO0FBNEJsRixJQUFNLFlBQVk7QUFDbEIsSUFBTSxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksR0FBRztBQUNqQyxJQUFNLHlCQUF5QjtBQUMvQixJQUFNLHVCQUF1QjtBQUU3QixTQUFTLFdBQVcsTUFBTTtBQUN4QixNQUFJLE9BQU8sWUFBWSxlQUFlLFFBQVEsTUFBTTtBQUNsRCxZQUFRLEtBQUssc0JBQXNCLEdBQUcsSUFBSTtBQUFBLEVBQzVDO0FBQ0Y7QUFFQSxTQUFTLFdBQVcsTUFBTTtBQUN4QixNQUFJLE9BQU8sWUFBWSxlQUFlLFFBQVEsTUFBTTtBQUNsRCxZQUFRLEtBQUssc0JBQXNCLEdBQUcsSUFBSTtBQUFBLEVBQzVDO0FBQ0Y7QUFFQSxTQUFTLFlBQVksTUFBTTtBQUN6QixNQUFJLE9BQU8sWUFBWSxlQUFlLFFBQVEsT0FBTztBQUNuRCxZQUFRLE1BQU0sc0JBQXNCLEdBQUcsSUFBSTtBQUFBLEVBQzdDO0FBQ0Y7QUFFQSxTQUFTLFVBQVUsT0FBTztBQUN4QixTQUFPLFFBQVEsY0FBYyxDQUFDLENBQUMsS0FBSyxjQUFjLENBQUMsQ0FBQyxLQUFLLGNBQWMsQ0FBQyxDQUFDLEtBQUssS0FBSztBQUNyRjtBQUVBLFNBQVMsWUFBWSxLQUFLO0FBQ3hCLFNBQU8sT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPO0FBQ3RDO0FBRUEsU0FBUyxlQUFlLEtBQUs7QUFDM0IsU0FBTyxPQUFPLElBQUksVUFBVSxJQUFJLFVBQVU7QUFDNUM7QUFFQSxTQUFTLHNCQUFzQjtBQUM3QixNQUFJLE9BQU8sV0FBVyxZ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
