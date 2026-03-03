import {
  require_jsx_runtime,
  require_react
} from "./chunk-KJNAPDCZ.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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
  const cardClassName = embedded ? "relative w-full rounded-xl sm:rounded-2xl bg-white border shadow-xl" : "relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[520px] rounded-xl sm:rounded-2xl bg-white border shadow-xl";
  const showTranscribeButton = !!wavBlob && typeof onTranscribe === "function";
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
                className: "h-12 w-12 sm:h-14 sm:w-14 rounded-md border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
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
                className: "h-14 w-14 sm:h-16 sm:w-16 rounded-md border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
                style: {
                  borderColor: "rgba(0, 41, 107, 0.18)",
                  backgroundColor: canRecord ? "rgba(0, 41, 107, 0.06)" : "rgba(0, 41, 107, 0.04)",
                  boxShadow: isActiveRec ? "0 0 0 7px rgba(0, 41, 107, 0.08), 0 14px 34px rgba(0, 41, 107, 0.14)" : "0 10px 22px rgba(0, 41, 107, 0.08)",
                  opacity: canRecord ? 1 : 0.45,
                  cursor: canRecord ? "pointer" : "not-allowed"
                },
                "aria-label": centerLabel,
                title: centerLabel,
                children: !isRecording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-5 rounded-md bg-red-500" }) : isPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 7L19 12L9 17V7Z", fill: "currentColor" }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", style: { color: IND_BRAND }, children: [
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
                className: "h-12 w-12 sm:h-14 sm:w-14 rounded-md border flex items-center justify-center transition shadow-xs hover:shadow-md active:scale-95",
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
                className: "px-4 py-1.5 rounded-md border text-[13px] font-medium transition shadow-xs hover:shadow-md active:scale-95",
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
                className: "px-4 py-1.5 rounded-md border text-[13px] font-medium transition shadow-xs hover:shadow-md active:scale-95",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL3N5c3RlbS9BdWRpb1JlY29yZGVyTWluaW1hbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IElORF9JMThOID0gZ2xvYmFsVGhpcy5fX0lORF9JMThOX18gfHwge307XG5jb25zdCBpbmRUID0gKGtleTogc3RyaW5nLCBmYWxsYmFjaz86IHN0cmluZykgPT5cbiAgKElORF9JMThOICYmIHR5cGVvZiBJTkRfSTE4TltrZXldID09PSBcInN0cmluZ1wiICYmIElORF9JMThOW2tleV0pIHx8IGZhbGxiYWNrIHx8IGtleTtcblxudHlwZSBBdWRpb1JlY29yZGVyUHJvcHMgPSB7XG4gIGVtYmVkZGVkPzogYm9vbGVhbjtcbiAgb25BdWRpb1JlYWR5PzogKHdhdjogQmxvYikgPT4gdm9pZDtcbiAgb25BdWRpb0NsZWFyZWQ/OiAoKSA9PiB2b2lkO1xuICBvblRyYW5zY3JpYmU/OiAod2F2OiBCbG9iKSA9PiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcbiAgdHJhbnNjcmliZUJ1c3k/OiBib29sZWFuO1xuICB0cmFuc2NyaWJlTGFiZWw/OiBzdHJpbmc7XG4gIHRyYW5zY3JpYmVCdXN5TGFiZWw/OiBzdHJpbmc7XG4gIG9uUmVjb3JkaW5nRXJyb3I/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxyXG4vLyBBdWRpb1JlY29yZGVyTWluaW1hbFxyXG4vLyBNaW5pbWFsIFVJIHJlY29yZGVyIHRoYXQgcHJvZHVjZXMgYSBXQVYgKFBDTSAxNi1iaXQpIGJsb2IuXHJcbi8vIE5vdGVzOlxyXG4vLyAtIFJlY29yZHMgbW9ubyBhdWRpbyBhbmQgZXhwb3J0cyAud2F2LlxyXG4vLyAtIENlbnRlciBidXR0b24gdG9nZ2xlcyByZWNvcmQgYW5kIHBhdXNlL3Jlc3VtZS5cclxuLy8gLSBSaWdodCBidXR0b24gc3RvcHMgYW5kIGZpbmFsaXplcyBXQVYgd2hpbGUgcmVjb3JkaW5nLCBvciBjbGVhcnMgd2hlbiBpZGxlLlxyXG4vLyAtIFVzZXMgU2NyaXB0UHJvY2Vzc29yIGZvciBzaW1wbGljaXR5ICh3b3JrcyBmb3IgZGVtb3MsIGJ1dCBpcyBkZXByZWNhdGVkKS5cclxuLy8gLSBEZWZlbnNpdmUgZXJyb3IgbWVzc2FnZXMgZm9yIGNvbW1vbiBnZXRVc2VyTWVkaWEgZmFpbHVyZXMuXHJcbi8vXHJcbi8vIEltcG9ydGFudCBjb25zdHJhaW50IChDaHJvbWUpOiBtaWNyb3Bob25lIGNhcHR1cmUgcmVxdWlyZXMgYSBTZWN1cmUgQ29udGV4dC5cclxuLy8gLSBBbGxvd2VkOiBodHRwczovLy4uLiBvciBodHRwOi8vbG9jYWxob3N0XHJcbi8vIC0gQmxvY2tlZDogaHR0cDovL2ludHJhbmV0LWhvc3QgKHVubGVzcyBjb3Jwb3JhdGUgcG9saWN5IHRyZWF0cyBvcmlnaW4gYXMgc2VjdXJlKVxyXG5cclxuY29uc3QgSU5EX0JSQU5EID0gXCIjMDAyOTZiXCI7XHJcbmNvbnN0IElORF9CUkFORF9SR0IgPSBbMCwgNDEsIDEwN107IC8vICMwMDI5NmJcclxuY29uc3QgSU5EX0FVRElPX1dPUktMRVRfUEFUSCA9IFwiL2pzL2luZC1hdWRpby13b3JrbGV0LmpzXCI7XHJcbmNvbnN0IElORF9BVURJT19MT0dfUFJFRklYID0gXCJbQXVkaW9SZWNvcmRlck1pbmltYWxdXCI7XHJcblxyXG5mdW5jdGlvbiBsb2dJbmZvKC4uLmFyZ3MpIHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5pbmZvKSB7XHJcbiAgICBjb25zb2xlLmluZm8oSU5EX0FVRElPX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9nV2FybiguLi5hcmdzKSB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2Fybikge1xyXG4gICAgY29uc29sZS53YXJuKElORF9BVURJT19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvZ0Vycm9yKC4uLmFyZ3MpIHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZS5lcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihJTkRfQVVESU9fTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBicmFuZFJnYmEoYWxwaGEpIHtcclxuICByZXR1cm4gYHJnYmEoJHtJTkRfQlJBTkRfUkdCWzBdfSwgJHtJTkRfQlJBTkRfUkdCWzFdfSwgJHtJTkRfQlJBTkRfUkdCWzJdfSwgJHthbHBoYX0pYDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZUVyck5hbWUoZXJyKSB7XHJcbiAgcmV0dXJuIGVyciAmJiBlcnIubmFtZSA/IGVyci5uYW1lIDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZUVyck1lc3NhZ2UoZXJyKSB7XHJcbiAgcmV0dXJuIGVyciAmJiBlcnIubWVzc2FnZSA/IGVyci5tZXNzYWdlIDogXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNTZWN1cmVDb250ZXh0U2FmZSgpIHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHRydWU7XHJcbiAgcmV0dXJuICEhd2luZG93LmlzU2VjdXJlQ29udGV4dDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9jYXRpb25TYWZlKCkge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcclxuICBpZiAoIXdpbmRvdy5sb2NhdGlvbikgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNMb2NhbGhvc3RIb3N0KGhvc3RuYW1lKSB7XHJcbiAgcmV0dXJuIGhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiIHx8IGhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiIHx8IGhvc3RuYW1lID09PSBcIls6OjFdXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSHR0cEludHJhbmV0QmxvY2tlZCgpIHtcclxuICBjb25zdCBsb2MgPSBnZXRMb2NhdGlvblNhZmUoKTtcclxuICBpZiAoIWxvYykgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBjb25zdCBwcm90b2NvbCA9IGxvYy5wcm90b2NvbCB8fCBcIlwiO1xyXG4gIGNvbnN0IGhvc3RuYW1lID0gbG9jLmhvc3RuYW1lIHx8IFwiXCI7XHJcblxyXG4gIGlmIChwcm90b2NvbCAhPT0gXCJodHRwOlwiKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKGlzTG9jYWxob3N0SG9zdChob3N0bmFtZSkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgLy8gaHR0cCArIG5vdCBsb2NhbGhvc3Q6IG5vcm1hbGx5IGJsb2NrZWQgZm9yIG1pYy5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXVkaW9Xb3JrbGV0VXJsKCkge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICF3aW5kb3cubG9jYXRpb24pIHtcclxuICAgIHJldHVybiBJTkRfQVVESU9fV09SS0xFVF9QQVRIO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBuZXcgVVJMKElORF9BVURJT19XT1JLTEVUX1BBVEgsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pLnRvU3RyaW5nKCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gSU5EX0FVRElPX1dPUktMRVRfUEFUSDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdFRpbWVNcyhtcykge1xyXG4gIC8vIEFsd2F5cyBzaG93IG1tOnNzLiBNaW51dGVzIGtlZXAgaW5jcmVhc2luZyBhZnRlciA1OS5cclxuICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKG1zIC8gMTAwMCk7XHJcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xyXG4gIGNvbnN0IHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcclxuXHJcbiAgY29uc3QgbW0gPSBTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIGNvbnN0IHNzID0gU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbiAgcmV0dXJuIGAke21tfToke3NzfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhbml0aXplRmlsZU5hbWVCYXNlKHZhbHVlKSB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcclxuICAgIC50cmltKClcclxuICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiLVwiKVxyXG4gICAgLnJlcGxhY2UoL1tcXFxcLzoqP1wiPD58XSsvZywgXCJcIilcclxuICAgIC5yZXBsYWNlKC8tKy9nLCBcIi1cIilcclxuICAgIC5yZXBsYWNlKC9eLSsvLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoLy0rJC8sIFwiXCIpO1xyXG59XHJcblxyXG4vLyBCdWlsZCBhIHNhZmUsIHRpbWVzdGFtcGVkIGZpbGUgbmFtZSBmb3IgdGhlIFdBViBkb3dubG9hZC5cclxuZnVuY3Rpb24gYnVpbGREb3dubG9hZEZpbGVOYW1lKGJhc2VOYW1lKSB7XHJcbiAgY29uc3Qgc2FmZUJhc2UgPSBzYW5pdGl6ZUZpbGVOYW1lQmFzZShiYXNlTmFtZSk7XHJcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICBjb25zdCBwYWQgPSAobikgPT4gU3RyaW5nKG4pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCBzdGFtcCA9IGAke25vdy5nZXRGdWxsWWVhcigpfSR7cGFkKG5vdy5nZXRNb250aCgpICsgMSl9JHtwYWQobm93LmdldERhdGUoKSl9LSR7cGFkKG5vdy5nZXRIb3VycygpKX0ke3BhZChub3cuZ2V0TWludXRlcygpKX0ke3BhZChub3cuZ2V0U2Vjb25kcygpKX1gO1xyXG4gIHJldHVybiBgJHtzYWZlQmFzZX0tJHtzdGFtcH0ud2F2YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZmxvYXRUbzE2Qml0UENNKGZsb2F0MzJBcnJheSkge1xyXG4gIGNvbnN0IG91dCA9IG5ldyBJbnQxNkFycmF5KGZsb2F0MzJBcnJheS5sZW5ndGgpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmxvYXQzMkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBzID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIGZsb2F0MzJBcnJheVtpXSkpO1xyXG4gICAgb3V0W2ldID0gcyA8IDAgPyBzICogMHg4MDAwIDogcyAqIDB4N2ZmZjtcclxuICB9XHJcbiAgcmV0dXJuIG91dDtcclxufVxyXG5cclxuZnVuY3Rpb24gZW5jb2RlV2F2KGFyZ3MpIHtcclxuICBjb25zdCBzYW1wbGVzMTYgPSBhcmdzLnNhbXBsZXMxNjtcclxuICBjb25zdCBzYW1wbGVSYXRlID0gYXJncy5zYW1wbGVSYXRlO1xyXG4gIGNvbnN0IG51bUNoYW5uZWxzID0gYXJncy5udW1DaGFubmVscztcclxuXHJcbiAgY29uc3QgYnl0ZXNQZXJTYW1wbGUgPSAyO1xyXG4gIGNvbnN0IGJsb2NrQWxpZ24gPSBudW1DaGFubmVscyAqIGJ5dGVzUGVyU2FtcGxlO1xyXG4gIGNvbnN0IGJ5dGVSYXRlID0gc2FtcGxlUmF0ZSAqIGJsb2NrQWxpZ247XHJcbiAgY29uc3QgZGF0YVNpemUgPSBzYW1wbGVzMTYubGVuZ3RoICogYnl0ZXNQZXJTYW1wbGU7XHJcblxyXG4gIGNvbnN0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcig0NCArIGRhdGFTaXplKTtcclxuICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XHJcblxyXG4gIGxldCBvZmZzZXQgPSAwO1xyXG4gIGZ1bmN0aW9uIHdyaXRlU3RyaW5nKHMpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykgdmlldy5zZXRVaW50OChvZmZzZXQgKyBpLCBzLmNoYXJDb2RlQXQoaSkpO1xyXG4gICAgb2Zmc2V0ICs9IHMubGVuZ3RoO1xyXG4gIH1cclxuICBmdW5jdGlvbiB3cml0ZVVpbnQzMih2KSB7XHJcbiAgICB2aWV3LnNldFVpbnQzMihvZmZzZXQsIHYsIHRydWUpO1xyXG4gICAgb2Zmc2V0ICs9IDQ7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHdyaXRlVWludDE2KHYpIHtcclxuICAgIHZpZXcuc2V0VWludDE2KG9mZnNldCwgdiwgdHJ1ZSk7XHJcbiAgICBvZmZzZXQgKz0gMjtcclxuICB9XHJcblxyXG4gIHdyaXRlU3RyaW5nKFwiUklGRlwiKTtcclxuICB3cml0ZVVpbnQzMigzNiArIGRhdGFTaXplKTtcclxuICB3cml0ZVN0cmluZyhcIldBVkVcIik7XHJcblxyXG4gIHdyaXRlU3RyaW5nKFwiZm10IFwiKTtcclxuICB3cml0ZVVpbnQzMigxNik7XHJcbiAgd3JpdGVVaW50MTYoMSk7XHJcbiAgd3JpdGVVaW50MTYobnVtQ2hhbm5lbHMpO1xyXG4gIHdyaXRlVWludDMyKHNhbXBsZVJhdGUpO1xyXG4gIHdyaXRlVWludDMyKGJ5dGVSYXRlKTtcclxuICB3cml0ZVVpbnQxNihibG9ja0FsaWduKTtcclxuICB3cml0ZVVpbnQxNigxNik7XHJcblxyXG4gIHdyaXRlU3RyaW5nKFwiZGF0YVwiKTtcclxuICB3cml0ZVVpbnQzMihkYXRhU2l6ZSk7XHJcblxyXG4gIGZvciAobGV0IGogPSAwOyBqIDwgc2FtcGxlczE2Lmxlbmd0aDsgaisrLCBvZmZzZXQgKz0gMikge1xyXG4gICAgdmlldy5zZXRJbnQxNihvZmZzZXQsIHNhbXBsZXMxNltqXSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogXCJhdWRpby93YXZcIiB9KTtcclxufVxyXG5cclxuLy8gQ29udmVydCBQQ00gZmxvYXQgc2FtcGxlcyBpbnRvIHBlci1zZWNvbmQgbGV2ZWxzIGZvciB3YXZlZm9ybSBkaXNwbGF5LlxyXG5mdW5jdGlvbiBidWlsZFNlY29uZExldmVscyhzYW1wbGVzLCBzYW1wbGVSYXRlKSB7XHJcbiAgaWYgKCFzYW1wbGVzIHx8ICFzYW1wbGVzLmxlbmd0aCB8fCAhc2FtcGxlUmF0ZSkgcmV0dXJuIFtdO1xyXG5cclxuICBjb25zdCBzZWNvbmRzID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHNhbXBsZXMubGVuZ3RoIC8gc2FtcGxlUmF0ZSkpO1xyXG4gIGNvbnN0IGxldmVscyA9IG5ldyBBcnJheShzZWNvbmRzKS5maWxsKDApO1xyXG4gIGxldCBtYXggPSAwO1xyXG5cclxuICBmb3IgKGxldCBzID0gMDsgcyA8IHNlY29uZHM7IHMrKykge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBzICogc2FtcGxlUmF0ZTtcclxuICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKChzICsgMSkgKiBzYW1wbGVSYXRlLCBzYW1wbGVzLmxlbmd0aCk7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIGNvbnN0IGxlbiA9IGVuZCAtIHN0YXJ0O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHYgPSBzYW1wbGVzW2ldO1xyXG4gICAgICBzdW0gKz0gdiAqIHY7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgcm1zID0gTWF0aC5zcXJ0KHN1bSAvIE1hdGgubWF4KDEsIGxlbikpO1xyXG4gICAgbGV2ZWxzW3NdID0gcm1zO1xyXG4gICAgaWYgKHJtcyA+IG1heCkgbWF4ID0gcm1zO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1heCA8PSAwKSByZXR1cm4gbGV2ZWxzO1xyXG5cclxuICByZXR1cm4gbGV2ZWxzLm1hcCgodikgPT4gTWF0aC5taW4oMSwgTWF0aC5wb3codiAvIG1heCwgMC43NSkpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd1JvdW5kZWRSZWN0KGN0eCwgeCwgeSwgdywgaCwgcikge1xyXG4gIGlmIChjdHgucm91bmRSZWN0KSB7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgucm91bmRSZWN0KHgsIHksIHcsIGgsIHIpO1xyXG4gICAgY3R4LmZpbGwoKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGN0eC5maWxsUmVjdCh4LCB5LCB3LCBoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRIdHRwTWljQmxvY2tlZE1lc3NhZ2UoKSB7XHJcbiAgcmV0dXJuIGluZFQoXHJcbiAgICBcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfSHR0cEJsb2NrZWRcIixcclxuICAgIFwiQ2hyb21lIGJsb2NrcyBtaWNyb3Bob25lIG9uIEhUVFAgKGludHJhbmV0KS4gVXNlIEhUVFBTIG9yIG9wZW4gdGhlIGFwcCB2aWEgaHR0cDovL2xvY2FsaG9zdC4gRm9yIGRldiwgY29uZmlndXJlIENocm9tZSB0byB0cmVhdCB5b3VyIEhUVFAgb3JpZ2luIGFzIHNlY3VyZS5cIlxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkTWljRXJyb3JNZXNzYWdlKGVycikge1xyXG4gIGNvbnN0IG5hbWUgPSBzYWZlRXJyTmFtZShlcnIpO1xyXG5cclxuICBpZiAoaXNIdHRwSW50cmFuZXRCbG9ja2VkKCkgJiYgIWlzU2VjdXJlQ29udGV4dFNhZmUoKSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkSHR0cE1pY0Jsb2NrZWRNZXNzYWdlKCk7XHJcbiAgfVxyXG5cclxuICBpZiAobmFtZSA9PT0gXCJOb3RBbGxvd2VkRXJyb3JcIiB8fCBuYW1lID09PSBcIlBlcm1pc3Npb25EZW5pZWRFcnJvclwiKSB7XHJcbiAgICByZXR1cm4gaW5kVChcclxuICAgICAgXCJBdWRpb1JlY29yZGVyX0Vycm9yX1Blcm1pc3Npb25EZW5pZWRcIixcclxuICAgICAgXCJNaWNyb3Bob25lIHBlcm1pc3Npb24gZGVuaWVkLiBBbGxvdyBpdCBpbiB0aGUgYnJvd3NlciBhbmQgcmVsb2FkIHRoZSBwYWdlLlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5hbWUgPT09IFwiTm90Rm91bmRFcnJvclwiIHx8IG5hbWUgPT09IFwiRGV2aWNlc05vdEZvdW5kRXJyb3JcIikge1xyXG4gICAgcmV0dXJuIGluZFQoXCJBdWRpb1JlY29yZGVyX0Vycm9yX05vRGV2aWNlXCIsIFwiTm8gbWljcm9waG9uZSBkZXZpY2UgZm91bmQuIENvbm5lY3Qgb25lIGFuZCB0cnkgYWdhaW4uXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5hbWUgPT09IFwiTm90UmVhZGFibGVFcnJvclwiIHx8IG5hbWUgPT09IFwiVHJhY2tTdGFydEVycm9yXCIpIHtcclxuICAgIHJldHVybiBpbmRUKFxyXG4gICAgICBcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfRGV2aWNlQnVzeVwiLFxyXG4gICAgICBcIlRoZSBtaWNyb3Bob25lIGlzIGJ1c3kgb3IgY291bGQgbm90IHN0YXJ0LiBDbG9zZSBvdGhlciBhcHBzIChUZWFtcywgWm9vbSkgYW5kIHRyeSBhZ2Fpbi5cIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChuYW1lID09PSBcIlNlY3VyaXR5RXJyb3JcIikge1xyXG4gICAgcmV0dXJuIGluZFQoXHJcbiAgICAgIFwiQXVkaW9SZWNvcmRlcl9FcnJvcl9TZWN1cml0eVwiLFxyXG4gICAgICBcIkJsb2NrZWQgYnkgYnJvd3NlciBzZWN1cml0eS4gSW4gQ2hyb21lLCB1c2UgSFRUUFMgb3IgY29ycG9yYXRlIHBvbGljeSB0byBhbGxvdyB0aGUgbWljIG9uIGludHJhbmV0LlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5hbWUgPT09IFwiT3ZlcmNvbnN0cmFpbmVkRXJyb3JcIiB8fCBuYW1lID09PSBcIkNvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvclwiKSB7XHJcbiAgICByZXR1cm4gaW5kVChcclxuICAgICAgXCJBdWRpb1JlY29yZGVyX0Vycm9yX0NvbnN0cmFpbnRzXCIsXHJcbiAgICAgIFwiQXVkaW8gY29uc3RyYWludHMgY291bGQgbm90IGJlIHNhdGlzZmllZC4gVHJ5IGFub3RoZXIgbWljcm9waG9uZSBvciBjb25maWd1cmF0aW9uLlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZFQoXHJcbiAgICBcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfR2VuZXJpY1wiLFxyXG4gICAgXCJDb3VsZCBub3Qgc3RhcnQgcmVjb3JkaW5nLiBDaGVjayBtaWNyb3Bob25lIHBlcm1pc3Npb25zLiBJbiBDaHJvbWUsIGl0IHVzdWFsbHkgcmVxdWlyZXMgSFRUUFMgb3IgbG9jYWxob3N0LlwiXHJcbiAgKTtcclxufVxyXG5cclxuLy8gU2VsZi10ZXN0cyBmb3IgcHVyZSBmdW5jdGlvbnMuXHJcbi8vIEVuYWJsZSBieSBzZXR0aW5nOiB3aW5kb3cuX19JTkRfQVVESU9fUkVDT1JERVJfVEVTVFNfXyA9IHRydWVcclxuZnVuY3Rpb24gcnVuU2VsZlRlc3RzKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zb2xlLmFzc2VydChmb3JtYXRUaW1lTXMoMCkgPT09IFwiMDA6MDBcIiwgXCJmb3JtYXRUaW1lTXMoMCkgc2hvdWxkIGJlIDAwOjAwXCIpO1xyXG4gICAgY29uc29sZS5hc3NlcnQoZm9ybWF0VGltZU1zKDYxXzAwMCkgPT09IFwiMDE6MDFcIiwgXCJmb3JtYXRUaW1lTXMoNjEwMDApIHNob3VsZCBiZSAwMTowMVwiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KGZvcm1hdFRpbWVNcygzXzY2MV8wMDApID09PSBcIjYxOjAxXCIsIFwiZm9ybWF0VGltZU1zKDM2NjEwMDApIHNob3VsZCBiZSA2MTowMVwiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KGZvcm1hdFRpbWVNcygzXzYwMF8wMDApID09PSBcIjYwOjAwXCIsIFwiZm9ybWF0VGltZU1zKDM2MDAwMDApIHNob3VsZCBiZSA2MDowMFwiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KGZvcm1hdFRpbWVNcyg1OV8wMDApID09PSBcIjAwOjU5XCIsIFwiZm9ybWF0VGltZU1zKDU5MDAwKSBzaG91bGQgYmUgMDA6NTlcIik7XHJcbiAgICBjb25zb2xlLmFzc2VydChmb3JtYXRUaW1lTXMoNjBfMDAwKSA9PT0gXCIwMTowMFwiLCBcImZvcm1hdFRpbWVNcyg2MDAwMCkgc2hvdWxkIGJlIDAxOjAwXCIpO1xyXG5cclxuICAgIGNvbnN0IGYgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAtMSwgMC41LCAtMC41XSk7XHJcbiAgICBjb25zdCBwY20gPSBmbG9hdFRvMTZCaXRQQ00oZik7XHJcbiAgICBjb25zb2xlLmFzc2VydChwY20ubGVuZ3RoID09PSA1LCBcIlBDTSBsZW5ndGggc2hvdWxkIG1hdGNoIGlucHV0XCIpO1xyXG4gICAgY29uc29sZS5hc3NlcnQocGNtWzFdID09PSAzMjc2NywgXCIxLjAgc2hvdWxkIG1hcCB0byAzMjc2N1wiKTtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KHBjbVsyXSA9PT0gLTMyNzY4LCBcIi0xLjAgc2hvdWxkIG1hcCB0byAtMzI3NjhcIik7XHJcblxyXG4gICAgY29uc3Qgd2F2ID0gZW5jb2RlV2F2KHsgc2FtcGxlczE2OiBuZXcgSW50MTZBcnJheShbMCwgMSwgLTFdKSwgc2FtcGxlUmF0ZTogNDgwMDAsIG51bUNoYW5uZWxzOiAxIH0pO1xyXG4gICAgY29uc29sZS5hc3NlcnQod2F2ICYmIHdhdi50eXBlID09PSBcImF1ZGlvL3dhdlwiLCBcIldBViBibG9iIHNob3VsZCBiZSBhdWRpby93YXZcIik7XHJcblxyXG4gICAgY29uc29sZS5hc3NlcnQoYnJhbmRSZ2JhKDAuNSkuc3RhcnRzV2l0aChcInJnYmEoXCIpLCBcImJyYW5kUmdiYSBzaG91bGQgcmV0dXJuIHJnYmEoLi4uKVwiKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkF1ZGlvUmVjb3JkZXJNaW5pbWFsIHNlbGYtdGVzdHM6IE9LXCIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJBdWRpb1JlY29yZGVyTWluaW1hbCBzZWxmLXRlc3RzOiBGQUlMRURcIiwgZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBdWRpb1JlY29yZGVyTWluaW1hbCh7XG4gIGVtYmVkZGVkID0gZmFsc2UsXG4gIG9uQXVkaW9SZWFkeSxcbiAgb25BdWRpb0NsZWFyZWQsXG4gIG9uVHJhbnNjcmliZSxcbiAgdHJhbnNjcmliZUJ1c3kgPSBmYWxzZSxcbiAgdHJhbnNjcmliZUxhYmVsLFxuICB0cmFuc2NyaWJlQnVzeUxhYmVsLFxuICBvblJlY29yZGluZ0Vycm9yLFxufTogQXVkaW9SZWNvcmRlclByb3BzKSB7XG4gIGNvbnN0IFtjYW5SZWNvcmQsIHNldENhblJlY29yZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3VpRXJyb3IsIHNldFVpRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3VpSGludCwgc2V0VWlIaW50XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBbaXNSZWNvcmRpbmcsIHNldElzUmVjb3JkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNQYXVzZWQsIHNldElzUGF1c2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNQbGF5aW5nLCBzZXRJc1BsYXlpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBbZWxhcHNlZE1zLCBzZXRFbGFwc2VkTXNdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3dhdkJsb2IsIHNldFdhdkJsb2JdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3dhdlVybCwgc2V0V2F2VXJsXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFt3YXZGaWxlTmFtZSwgc2V0V2F2RmlsZU5hbWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3dhdkxldmVscywgc2V0V2F2TGV2ZWxzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbd2F2RHVyYXRpb25TZWMsIHNldFdhdkR1cmF0aW9uU2VjXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtwbGF5YmFja1JlbWFpbmluZ1NlYywgc2V0UGxheWJhY2tSZW1haW5pbmdTZWNdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3BsYXliYWNrU2Vjb25kLCBzZXRQbGF5YmFja1NlY29uZF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCB3YXZVcmxSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgd2F2TGV2ZWxzUmVmID0gdXNlUmVmKFtdKTtcclxuXHJcbiAgY29uc3QgYXVkaW9FbFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBpc01vdW50ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICBjb25zdCBzdHJlYW1SZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYXVkaW9DdHhSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgc291cmNlUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGFuYWx5c2VyUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IHByb2Nlc3NvclJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB6ZXJvR2FpblJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB3b3JrbGV0Tm9kZVJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3Qgc2FtcGxlUmF0ZVJlZiA9IHVzZVJlZig0ODAwMCk7XHJcbiAgY29uc3QgY2h1bmtzUmVmID0gdXNlUmVmKFtdKTtcclxuXHJcbiAgY29uc3Qgc3RhcnRlZEF0UmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGFjY3VtdWxhdGVkTXNSZWYgPSB1c2VSZWYoMCk7XHJcbiAgY29uc3QgdGltZXJJZFJlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgcmFmSWRSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYmFyc0NhbnZhc1JlZiA9IHVzZVJlZihudWxsKTtcclxuXHJcbiAgY29uc3QgYmFyV2lkdGhQeCA9IDI7XHJcbiAgY29uc3QgYmFyR2FwUHggPSAyO1xyXG4gIGNvbnN0IGJhck1pbkNvdW50ID0gNDg7XHJcbiAgY29uc3QgYmFyTWF4Q291bnQgPSAxMjA7XHJcblxyXG4gIGNvbnN0IGVxTGFzdFJlZiA9IHVzZVJlZihbXSk7XHJcblxyXG4gIGNvbnN0IGlzUmVjb3JkaW5nUmVmID0gdXNlUmVmKGZhbHNlKTtcclxuICBjb25zdCBpc1BhdXNlZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIGNvbnN0IGRvd25sb2FkTGFiZWwgPSBpbmRUKFwiQXVkaW9SZWNvcmRlcl9Eb3dubG9hZFwiKTtcclxuICBjb25zdCBkb3dubG9hZEJhc2VOYW1lID0gaW5kVChcIkF1ZGlvUmVjb3JkZXJfRG93bmxvYWRfRmlsZU5hbWVcIik7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpc01vdW50ZWRSZWYuY3VycmVudCA9IHRydWU7XHJcblxyXG4gICAgY29uc3Qgb2sgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmICEhKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpO1xyXG4gICAgc2V0Q2FuUmVjb3JkKG9rKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuX19JTkRfQVVESU9fUkVDT1JERVJfVEVTVFNfXyA9PT0gdHJ1ZSkge1xyXG4gICAgICBydW5TZWxmVGVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICBpZiAoaXNIdHRwSW50cmFuZXRCbG9ja2VkKCkgJiYgIWlzU2VjdXJlQ29udGV4dFNhZmUoKSkge1xyXG4gICAgICAgIHNldFVpRXJyb3IoYnVpbGRIdHRwTWljQmxvY2tlZE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgY29uc3QgbG9jID0gZ2V0TG9jYXRpb25TYWZlKCk7XHJcbiAgICAgICAgaWYgKGxvYykgc2V0VWlIaW50KGluZFQoXCJBdWRpb1JlY29yZGVyX0hpbnRfT3JpZ2luXCIsIFwiQ3VycmVudCBvcmlnaW46IHswfVwiKS5yZXBsYWNlKFwiezB9XCIsIGxvYy5vcmlnaW4pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN5bmNDYW52YXNTaXplKCk7XHJcbiAgICBkcmF3RXFJZGxlKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb25SZXNpemUoKSB7XHJcbiAgICAgIHN5bmNDYW52YXNTaXplKCk7XHJcbiAgICAgIGRyYXdFcUlkbGUoKTtcclxuICAgIH1cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIG9uUmVzaXplKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc01vdW50ZWRSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XHJcblxyXG4gICAgICBzYWZlU3RvcFBsYXliYWNrKCk7XHJcbiAgICAgIHNhZmVTdG9wUmVjb3JkaW5nSW50ZXJuYWwoeyBrZWVwV2F2OiB0cnVlLCBza2lwVWlTdGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgaWYgKHdhdlVybFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwod2F2VXJsUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlzUmVjb3JkaW5nUmVmLmN1cnJlbnQgPSBpc1JlY29yZGluZztcclxuICB9LCBbaXNSZWNvcmRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlzUGF1c2VkUmVmLmN1cnJlbnQgPSBpc1BhdXNlZDtcclxuICB9LCBbaXNQYXVzZWRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdhdlVybFJlZi5jdXJyZW50ID0gd2F2VXJsO1xyXG4gIH0sIFt3YXZVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHdhdkxldmVsc1JlZi5jdXJyZW50ID0gd2F2TGV2ZWxzO1xyXG4gIH0sIFt3YXZMZXZlbHNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGF1ZGlvRWwgPSBhdWRpb0VsUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWF1ZGlvRWwpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgZnVuY3Rpb24gb25FbmRlZCgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKGZhbHNlKTtcclxuICAgICAgaWYgKHdhdkR1cmF0aW9uU2VjID4gMCkge1xyXG4gICAgICAgIHNldFBsYXliYWNrUmVtYWluaW5nU2VjKHdhdkR1cmF0aW9uU2VjKTtcclxuICAgICAgICBzZXRQbGF5YmFja1NlY29uZCgwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25QYXVzZSgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKGZhbHNlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uUGxheSgpIHtcclxuICAgICAgc2V0SXNQbGF5aW5nKHRydWUpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25Mb2FkZWRNZXRhZGF0YSgpIHtcclxuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmNlaWwoYXVkaW9FbC5kdXJhdGlvbiB8fCAwKTtcclxuICAgICAgaWYgKGR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgIHNldFdhdkR1cmF0aW9uU2VjKGR1cmF0aW9uKTtcclxuICAgICAgICBzZXRQbGF5YmFja1JlbWFpbmluZ1NlYyhkdXJhdGlvbik7XHJcbiAgICAgICAgc2V0UGxheWJhY2tTZWNvbmQoMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uVGltZVVwZGF0ZSgpIHtcclxuICAgICAgY29uc3QgdG90YWwgPSB3YXZEdXJhdGlvblNlYyA+IDAgPyB3YXZEdXJhdGlvblNlYyA6IE1hdGguY2VpbChhdWRpb0VsLmR1cmF0aW9uIHx8IDApO1xyXG4gICAgICBpZiAodG90YWwgPD0gMCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBjdXJyZW50ID0gYXVkaW9FbC5jdXJyZW50VGltZSB8fCAwO1xyXG4gICAgICBjb25zdCByZW1haW5pbmcgPSBNYXRoLm1heCgwLCB0b3RhbCAtIGN1cnJlbnQpO1xyXG4gICAgICBzZXRQbGF5YmFja1JlbWFpbmluZ1NlYyhyZW1haW5pbmcpO1xyXG4gICAgICBzZXRQbGF5YmFja1NlY29uZChNYXRoLm1heCgwLCBNYXRoLm1pbih0b3RhbCAtIDEsIE1hdGguZmxvb3IoY3VycmVudCkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXVkaW9FbC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgb25FbmRlZCk7XHJcbiAgICBhdWRpb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCBvblBhdXNlKTtcclxuICAgIGF1ZGlvRWwuYWRkRXZlbnRMaXN0ZW5lcihcInBsYXlcIiwgb25QbGF5KTtcclxuICAgIGF1ZGlvRWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsIG9uTG9hZGVkTWV0YWRhdGEpO1xyXG4gICAgYXVkaW9FbC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBvblRpbWVVcGRhdGUpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGF1ZGlvRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIG9uRW5kZWQpO1xyXG4gICAgICBhdWRpb0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCBvblBhdXNlKTtcclxuICAgICAgYXVkaW9FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwicGxheVwiLCBvblBsYXkpO1xyXG4gICAgICBhdWRpb0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLCBvbkxvYWRlZE1ldGFkYXRhKTtcclxuICAgICAgYXVkaW9FbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBvblRpbWVVcGRhdGUpO1xyXG4gICAgfTtcclxuICB9LCBbd2F2RHVyYXRpb25TZWNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpc1JlY29yZGluZyAmJiAhaXNQYXVzZWQpIHtcclxuICAgICAgc3RhcnRFcUxvb3AoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0b3BFcUxvb3AoKTtcclxuICAgICAgaWYgKHdhdkxldmVsc1JlZi5jdXJyZW50ICYmIHdhdkxldmVsc1JlZi5jdXJyZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBkcmF3RXFXYXZlZm9ybShwbGF5YmFja1NlY29uZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZHJhd0VxSWRsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW2lzUmVjb3JkaW5nLCBpc1BhdXNlZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc1JlY29yZGluZyAmJiB3YXZMZXZlbHNSZWYuY3VycmVudCAmJiB3YXZMZXZlbHNSZWYuY3VycmVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGRyYXdFcVdhdmVmb3JtKHBsYXliYWNrU2Vjb25kKTtcclxuICAgIH1cclxuICB9LCBbcGxheWJhY2tTZWNvbmQsIHdhdkxldmVscywgaXNSZWNvcmRpbmddKTtcclxuXHJcbiAgZnVuY3Rpb24gc2FmZVNldFN0YXRlKGZuKSB7XG4gICAgaWYgKCFpc01vdW50ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGZuKCk7XG4gIH1cblxuICBjb25zdCBub3RpZnlSZWNvcmRpbmdFcnJvciA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgICAvLyBOb3RpZnkgcGFyZW50IHNvIGl0IGNhbiBzdXJmYWNlIGEgd2FybmluZyBhbmQgY2xvc2UgdGhlIHJlY29yZGVyLlxuICAgIGlmICh0eXBlb2Ygb25SZWNvcmRpbmdFcnJvciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIG9uUmVjb3JkaW5nRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBpZ25vcmUgKi9cbiAgICB9XG4gIH07XG5cclxuICBmdW5jdGlvbiBzYWZlU3RvcFBsYXliYWNrKCkge1xyXG4gICAgY29uc3QgYXVkaW9FbCA9IGF1ZGlvRWxSZWYuY3VycmVudDtcclxuICAgIGlmICghYXVkaW9FbCkgcmV0dXJuO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF1ZGlvRWwucGF1c2UoKTtcclxuICAgICAgYXVkaW9FbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcblxyXG4gICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgc2V0SXNQbGF5aW5nKGZhbHNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3RhcnRUaW1lcigpIHtcclxuICAgIGlmICh0aW1lcklkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBzdGFydGVkQXRSZWYuY3VycmVudCA9IERhdGUubm93KCk7XHJcbiAgICB0aW1lcklkUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBpZiAoIXN0YXJ0ZWRBdFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhY2N1bXVsYXRlZE1zUmVmLmN1cnJlbnQgKyAobm93IC0gc3RhcnRlZEF0UmVmLmN1cnJlbnQpO1xyXG4gICAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICAgIHNldEVsYXBzZWRNcyhjdXJyZW50KTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAyMDApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGF1c2VUaW1lcigpIHtcclxuICAgIGlmICghc3RhcnRlZEF0UmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgYWNjdW11bGF0ZWRNc1JlZi5jdXJyZW50ID0gYWNjdW11bGF0ZWRNc1JlZi5jdXJyZW50ICsgKG5vdyAtIHN0YXJ0ZWRBdFJlZi5jdXJyZW50KTtcclxuICAgIHN0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodGltZXJJZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVySWRSZWYuY3VycmVudCk7XHJcbiAgICAgIHRpbWVySWRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xyXG4gICAgYWNjdW11bGF0ZWRNc1JlZi5jdXJyZW50ID0gMDtcclxuICAgIHN0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIGlmICh0aW1lcklkUmVmLmN1cnJlbnQpIHtcclxuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGltZXJJZFJlZi5jdXJyZW50KTtcclxuICAgICAgdGltZXJJZFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgIHNldEVsYXBzZWRNcygwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gc3RhcnRSZWNvcmRpbmcoKSB7XHJcbiAgICBpZiAoIWNhblJlY29yZCkge1xuICAgICAgbG9nV2FybihcImdldFVzZXJNZWRpYSBub3QgYXZhaWxhYmxlIG9yIGJsb2NrZWQuXCIpO1xuICAgICAgY29uc3QgbG9jID0gZ2V0TG9jYXRpb25TYWZlKCk7XG4gICAgICBjb25zdCBibG9ja2VkID0gaXNIdHRwSW50cmFuZXRCbG9ja2VkKCkgJiYgIWlzU2VjdXJlQ29udGV4dFNhZmUoKTtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGJsb2NrZWRcbiAgICAgICAgPyBidWlsZEh0dHBNaWNCbG9ja2VkTWVzc2FnZSgpXG4gICAgICAgIDogaW5kVChcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfVW5zdXBwb3J0ZWRcIiwgXCJZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBnZXRVc2VyTWVkaWEuXCIpO1xuICAgICAgY29uc3QgaGludE1lc3NhZ2UgPVxuICAgICAgICBibG9ja2VkICYmIGxvYyA/IGluZFQoXCJBdWRpb1JlY29yZGVyX0hpbnRfT3JpZ2luXCIsIFwiQ3VycmVudCBvcmlnaW46IHswfVwiKS5yZXBsYWNlKFwiezB9XCIsIGxvYy5vcmlnaW4pIDogXCJcIjtcbiAgICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XG4gICAgICAgIHNldFVpRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgc2V0VWlIaW50KGhpbnRNZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICBub3RpZnlSZWNvcmRpbmdFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxyXG4gICAgc2FmZVN0b3BQbGF5YmFjaygpO1xyXG4gICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgc2V0VWlFcnJvcihcIlwiKTtcclxuICAgICAgc2V0VWlIaW50KFwiXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2FmZVN0b3BSZWNvcmRpbmdJbnRlcm5hbCh7IGtlZXBXYXY6IHRydWUsIHNraXBVaVN0YXRlOiB0cnVlIH0pO1xyXG5cclxuICAgIGlmICh3YXZVcmxSZWYuY3VycmVudCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwod2F2VXJsUmVmLmN1cnJlbnQpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgc2V0V2F2VXJsKG51bGwpO1xyXG4gICAgICBzZXRXYXZCbG9iKG51bGwpO1xyXG4gICAgICBzZXRXYXZGaWxlTmFtZShcIlwiKTtcclxuICAgIH0pO1xyXG4gICAgc2V0V2F2TGV2ZWxzKFtdKTtcclxuICAgIHNldFdhdkR1cmF0aW9uU2VjKDApO1xyXG4gICAgc2V0UGxheWJhY2tSZW1haW5pbmdTZWMoMCk7XHJcbiAgICBzZXRQbGF5YmFja1NlY29uZCgwKTtcclxuICAgIGlmICh0eXBlb2Ygb25BdWRpb0NsZWFyZWQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIG9uQXVkaW9DbGVhcmVkKCk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2h1bmtzUmVmLmN1cnJlbnQgPSBbXTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBQcmVmZXIgcmF3IG1vbm8gY2FwdHVyZSBhbmQgZGlzYWJsZSBicm93c2VyIHByb2Nlc3Npbmcgd2hlbiBhdmFpbGFibGUuXHJcbiAgICAgIGNvbnN0IHByZWZlcnJlZENvbnN0cmFpbnRzID0ge1xyXG4gICAgICAgIGNoYW5uZWxDb3VudDogMSxcclxuICAgICAgICBlY2hvQ2FuY2VsbGF0aW9uOiBmYWxzZSxcclxuICAgICAgICBub2lzZVN1cHByZXNzaW9uOiBmYWxzZSxcclxuICAgICAgICBhdXRvR2FpbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IHN0cmVhbSA9IG51bGw7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBhdWRpbzogcHJlZmVycmVkQ29uc3RyYWludHMgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGxvZ1dhcm4oXCJQcmVmZXJyZWQgYXVkaW8gY29uc3RyYWludHMgZmFpbGVkLiBSZXRyeWluZyB3aXRoIGRlZmF1bHRzLlwiLCBlcnIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXN0cmVhbSkge1xyXG4gICAgICAgIHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0cmVhbVJlZi5jdXJyZW50ID0gc3RyZWFtO1xyXG5cclxuICAgICAgY29uc3QgQXVkaW9Db250ZXh0Q3RvciA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcclxuICAgICAgaWYgKCFBdWRpb0NvbnRleHRDdG9yKSB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkF1ZGlvUmVjb3JkZXJfRXJyb3JfTm9BdWRpb0NvbnRleHRcIiwgXCJBdWRpb0NvbnRleHQgaXMgbm90IGF2YWlsYWJsZS5cIikpO1xyXG5cclxuICAgICAgY29uc3QgYXVkaW9DdHggPSBuZXcgQXVkaW9Db250ZXh0Q3RvcigpO1xyXG4gICAgICBhdWRpb0N0eFJlZi5jdXJyZW50ID0gYXVkaW9DdHg7XHJcbiAgICAgIHNhbXBsZVJhdGVSZWYuY3VycmVudCA9IGF1ZGlvQ3R4LnNhbXBsZVJhdGU7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGF1ZGlvQ3R4LnJlc3VtZSgpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc291cmNlID0gYXVkaW9DdHguY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2Uoc3RyZWFtKTtcclxuICAgICAgc291cmNlUmVmLmN1cnJlbnQgPSBzb3VyY2U7XHJcblxyXG4gICAgICBjb25zdCBhbmFseXNlciA9IGF1ZGlvQ3R4LmNyZWF0ZUFuYWx5c2VyKCk7XHJcbiAgICAgIGFuYWx5c2VyLmZmdFNpemUgPSAyMDQ4O1xyXG4gICAgICBhbmFseXNlci5zbW9vdGhpbmdUaW1lQ29uc3RhbnQgPSAwLjg4O1xyXG4gICAgICBhbmFseXNlclJlZi5jdXJyZW50ID0gYW5hbHlzZXI7XHJcblxyXG4gICAgICBjb25zdCB6ZXJvR2FpbiA9IGF1ZGlvQ3R4LmNyZWF0ZUdhaW4oKTtcclxuICAgICAgemVyb0dhaW4uZ2Fpbi52YWx1ZSA9IDA7XHJcbiAgICAgIHplcm9HYWluUmVmLmN1cnJlbnQgPSB6ZXJvR2FpbjtcclxuXHJcbiAgICAgIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBwcm9jZXNzb3JSZWYuY3VycmVudCA9IG51bGw7XHJcblxyXG4gICAgICBsZXQgY2FwdHVyZU5vZGUgPSBudWxsO1xyXG4gICAgICBjb25zdCBjYW5Xb3JrbGV0ID0gISEoYXVkaW9DdHguYXVkaW9Xb3JrbGV0ICYmIHR5cGVvZiBhdWRpb0N0eC5hdWRpb1dvcmtsZXQuYWRkTW9kdWxlID09PSBcImZ1bmN0aW9uXCIpO1xyXG4gICAgICBpZiAoY2FuV29ya2xldCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCB3b3JrbGV0VXJsID0gZ2V0QXVkaW9Xb3JrbGV0VXJsKCk7XHJcbiAgICAgICAgICBhd2FpdCBhdWRpb0N0eC5hdWRpb1dvcmtsZXQuYWRkTW9kdWxlKHdvcmtsZXRVcmwpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHdvcmtsZXROb2RlID0gbmV3IEF1ZGlvV29ya2xldE5vZGUoYXVkaW9DdHgsIFwiaW5kLWF1ZGlvLWNhcHR1cmVcIik7XHJcbiAgICAgICAgICB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50ID0gd29ya2xldE5vZGU7XHJcbiAgICAgICAgICBjYXB0dXJlTm9kZSA9IHdvcmtsZXROb2RlO1xyXG5cclxuICAgICAgICAgIHdvcmtsZXROb2RlLm9ucHJvY2Vzc29yZXJyb3IgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbG9nRXJyb3IoXCJBdWRpb1dvcmtsZXQgcHJvY2Vzc29yIGVycm9yXCIsIGV2ZW50KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB3b3JrbGV0Tm9kZS5wb3J0Lm9ubWVzc2FnZWVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxvZ0Vycm9yKFwiQXVkaW9Xb3JrbGV0IG1lc3NhZ2UgZXJyb3JcIiwgZXZlbnQpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHdvcmtsZXROb2RlLnBvcnQub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBldmVudCAmJiBldmVudC5kYXRhID8gZXZlbnQuZGF0YSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSB8fCBkYXRhLnR5cGUgIT09IFwiY2h1bmtcIikgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoIWlzUmVjb3JkaW5nUmVmLmN1cnJlbnQgfHwgaXNQYXVzZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmF3ID0gZGF0YS5zYW1wbGVzO1xyXG4gICAgICAgICAgICBpZiAoIXJhdykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNodW5rID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHJhdyBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSkgY2h1bmsgPSByYXc7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJhdy5idWZmZXIpIGNodW5rID0gbmV3IEZsb2F0MzJBcnJheShyYXcuYnVmZmVyKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAocmF3LmJ5dGVMZW5ndGgpIGNodW5rID0gbmV3IEZsb2F0MzJBcnJheShyYXcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjaHVuayB8fCAhY2h1bmsubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNodW5rc1JlZi5jdXJyZW50LnB1c2goY2h1bmspO1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBsb2dJbmZvKFwiQXVkaW9Xb3JrbGV0IGNhcHR1cmUgZW5hYmxlZFwiLCB3b3JrbGV0VXJsKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGxvZ1dhcm4oXCJBdWRpb1dvcmtsZXQgZmFpbGVkLiBGYWxsaW5nIGJhY2sgdG8gU2NyaXB0UHJvY2Vzc29yLlwiLCBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2dXYXJuKFwiQXVkaW9Xb3JrbGV0IG5vdCBzdXBwb3J0ZWQuIFVzaW5nIFNjcmlwdFByb2Nlc3Nvci5cIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghY2FwdHVyZU5vZGUpIHtcclxuICAgICAgICBjb25zdCBwcm9jZXNzb3IgPSBhdWRpb0N0eC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoNDA5NiwgMSwgMSk7XHJcbiAgICAgICAgcHJvY2Vzc29yUmVmLmN1cnJlbnQgPSBwcm9jZXNzb3I7XHJcbiAgICAgICAgY2FwdHVyZU5vZGUgPSBwcm9jZXNzb3I7XHJcblxyXG4gICAgICAgIHByb2Nlc3Nvci5vbmF1ZGlvcHJvY2VzcyA9IChlKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWlzUmVjb3JkaW5nUmVmLmN1cnJlbnQgfHwgaXNQYXVzZWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgICAgY29uc3QgaW5wdXQgPSBlLmlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xyXG4gICAgICAgICAgY2h1bmtzUmVmLmN1cnJlbnQucHVzaChuZXcgRmxvYXQzMkFycmF5KGlucHV0KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gS2VlcCB0aGUgYW5hbHlzZXIgb3V0IG9mIHRoZSByZWNvcmRpbmcgcGF0aCB0byBhdm9pZCBhZmZlY3RpbmcgY2FwdHVyZS5cclxuICAgICAgc291cmNlLmNvbm5lY3QoYW5hbHlzZXIpO1xyXG4gICAgICBhbmFseXNlci5jb25uZWN0KHplcm9HYWluKTtcclxuICAgICAgc291cmNlLmNvbm5lY3QoY2FwdHVyZU5vZGUpO1xyXG4gICAgICBjYXB0dXJlTm9kZS5jb25uZWN0KHplcm9HYWluKTtcclxuICAgICAgemVyb0dhaW4uY29ubmVjdChhdWRpb0N0eC5kZXN0aW5hdGlvbik7XHJcblxyXG4gICAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICAgIHNldElzUmVjb3JkaW5nKHRydWUpO1xyXG4gICAgICAgIHNldElzUGF1c2VkKGZhbHNlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgIHN0YXJ0VGltZXIoKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBzYWZlU3RvcFJlY29yZGluZ0ludGVybmFsKHsga2VlcFdhdjogZmFsc2UsIHNraXBVaVN0YXRlOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG1zZyA9IGJ1aWxkTWljRXJyb3JNZXNzYWdlKGVycik7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBzYWZlRXJyTmFtZShlcnIpO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gc2FmZUVyck1lc3NhZ2UoZXJyKTtcclxuXHJcbiAgICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XG4gICAgICAgIHNldFVpRXJyb3IobXNnKTtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICBjb25zdCBkZXRhaWwgPSBtZXNzYWdlID8gYCR7bmFtZX0gLSAke21lc3NhZ2V9YCA6IG5hbWU7XG4gICAgICAgICAgc2V0VWlIaW50KGluZFQoXCJBdWRpb1JlY29yZGVyX0hpbnRfVGVjaG5pY2FsXCIsIFwiVGVjaG5pY2FsIGRldGFpbHM6IHswfVwiKS5yZXBsYWNlKFwiezB9XCIsIGRldGFpbCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKG1zZykge1xuICAgICAgICBub3RpZnlSZWNvcmRpbmdFcnJvcihtc2cpO1xuICAgICAgfVxuXG4gICAgICBsb2dFcnJvcihcIkF1ZGlvIHJlY29yZGVyIHN0YXJ0IGZhaWxlZFwiLCBlcnIpO1xuICAgIH1cbiAgfVxuXHJcbiAgZnVuY3Rpb24gcGF1c2VSZWNvcmRpbmcoKSB7XHJcbiAgICBpZiAoIWlzUmVjb3JkaW5nKSByZXR1cm47XHJcbiAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICBzZXRJc1BhdXNlZCh0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHdvcmtsZXROb2RlUmVmLmN1cnJlbnQgJiYgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudC5wb3J0LnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRSZWNvcmRpbmdcIiwgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGF1c2VUaW1lcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzdW1lUmVjb3JkaW5nKCkge1xyXG4gICAgaWYgKCFpc1JlY29yZGluZykgcmV0dXJuO1xyXG4gICAgc2FmZVNldFN0YXRlKCgpID0+IHtcclxuICAgICAgc2V0SXNQYXVzZWQoZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAod29ya2xldE5vZGVSZWYuY3VycmVudCAmJiB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50LnBvcnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50LnBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldFJlY29yZGluZ1wiLCB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0VGltZXIoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGZpbmlzaFJlY29yZGluZygpIHtcclxuICAgIGlmICghaXNSZWNvcmRpbmcpIHJldHVybjtcclxuXHJcbiAgICBwYXVzZVRpbWVyKCk7XHJcblxyXG4gICAgLy8gRmx1c2ggYW55IGJ1ZmZlcmVkIHdvcmtsZXQgc2FtcGxlcyBiZWZvcmUgYnVpbGRpbmcgdGhlIFdBVi5cclxuICAgIGlmICh3b3JrbGV0Tm9kZVJlZi5jdXJyZW50ICYmIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQucG9ydCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHdvcmtsZXROb2RlUmVmLmN1cnJlbnQucG9ydC5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0UmVjb3JkaW5nXCIsIHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHdpbmRvdy5zZXRUaW1lb3V0KHJlc29sdmUsIDMwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjaHVua3NSZWYuY3VycmVudC5sZW5ndGgpIHtcclxuICAgICAgc2FmZVN0b3BSZWNvcmRpbmdJbnRlcm5hbCh7IGtlZXBXYXY6IGZhbHNlLCBza2lwVWlTdGF0ZTogZmFsc2UgfSk7XHJcbiAgICAgIHJlc2V0VGltZXIoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFsbCA9IGNodW5rc1JlZi5jdXJyZW50O1xyXG4gICAgY29uc3QgdG90YWxMZW4gPSBhbGwucmVkdWNlKChzdW0sIGEpID0+IHN1bSArIGEubGVuZ3RoLCAwKTtcclxuICAgIGNvbnN0IG1lcmdlZCA9IG5ldyBGbG9hdDMyQXJyYXkodG90YWxMZW4pO1xyXG5cclxuICAgIGxldCBvZmZzZXQgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbWVyZ2VkLnNldChhbGxbaV0sIG9mZnNldCk7XHJcbiAgICAgIG9mZnNldCArPSBhbGxbaV0ubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNhbXBsZXMxNiA9IGZsb2F0VG8xNkJpdFBDTShtZXJnZWQpO1xyXG4gICAgY29uc3Qgd2F2ID0gZW5jb2RlV2F2KHsgc2FtcGxlczE2OiBzYW1wbGVzMTYsIHNhbXBsZVJhdGU6IHNhbXBsZVJhdGVSZWYuY3VycmVudCwgbnVtQ2hhbm5lbHM6IDEgfSk7XHJcblxyXG4gICAgc2FmZVN0b3BSZWNvcmRpbmdJbnRlcm5hbCh7IGtlZXBXYXY6IHRydWUsIHNraXBVaVN0YXRlOiBmYWxzZSB9KTtcclxuXHJcbiAgICBjb25zdCBsZXZlbHMgPSBidWlsZFNlY29uZExldmVscyhtZXJnZWQsIHNhbXBsZVJhdGVSZWYuY3VycmVudCk7XHJcbiAgICBjb25zdCBkdXJhdGlvblNlYyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChtZXJnZWQubGVuZ3RoIC8gc2FtcGxlUmF0ZVJlZi5jdXJyZW50KSk7XHJcblxyXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh3YXYpO1xyXG4gICAgY29uc3QgZmlsZU5hbWUgPSBidWlsZERvd25sb2FkRmlsZU5hbWUoZG93bmxvYWRCYXNlTmFtZSk7XHJcbiAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICBzZXRXYXZCbG9iKHdhdik7XHJcbiAgICAgIHNldFdhdlVybCh1cmwpO1xyXG4gICAgICBzZXRXYXZGaWxlTmFtZShmaWxlTmFtZSk7XHJcbiAgICAgIHNldFdhdkxldmVscyhsZXZlbHMpO1xyXG4gICAgICBzZXRXYXZEdXJhdGlvblNlYyhkdXJhdGlvblNlYyk7XHJcbiAgICAgIHNldFBsYXliYWNrUmVtYWluaW5nU2VjKGR1cmF0aW9uU2VjKTtcclxuICAgICAgc2V0UGxheWJhY2tTZWNvbmQoMCk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0eXBlb2Ygb25BdWRpb1JlYWR5ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBvbkF1ZGlvUmVhZHkod2F2KTtcclxuICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgLyogaWdub3JlICovXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsZWFyUmVjb3JkaW5nKCkge1xyXG4gICAgc2FmZVN0b3BQbGF5YmFjaygpO1xyXG4gICAgc2FmZVN0b3BSZWNvcmRpbmdJbnRlcm5hbCh7IGtlZXBXYXY6IGZhbHNlLCBza2lwVWlTdGF0ZTogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKHdhdlVybFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh3YXZVcmxSZWYuY3VycmVudCk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzYWZlU2V0U3RhdGUoKCkgPT4ge1xyXG4gICAgICBzZXRXYXZVcmwobnVsbCk7XHJcbiAgICAgIHNldFdhdkJsb2IobnVsbCk7XHJcbiAgICAgIHNldFdhdkZpbGVOYW1lKFwiXCIpO1xyXG4gICAgICBzZXRVaUVycm9yKFwiXCIpO1xyXG4gICAgICBzZXRVaUhpbnQoXCJcIik7XHJcbiAgICB9KTtcclxuICAgIHNldFdhdkxldmVscyhbXSk7XHJcbiAgICBzZXRXYXZEdXJhdGlvblNlYygwKTtcclxuICAgIHNldFBsYXliYWNrUmVtYWluaW5nU2VjKDApO1xyXG4gICAgc2V0UGxheWJhY2tTZWNvbmQoMCk7XHJcbiAgICBpZiAodHlwZW9mIG9uQXVkaW9DbGVhcmVkID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBvbkF1ZGlvQ2xlYXJlZCgpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNodW5rc1JlZi5jdXJyZW50ID0gW107XHJcbiAgICByZXNldFRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYWZlU3RvcFJlY29yZGluZ0ludGVybmFsKGFyZ3MpIHtcclxuICAgIGNvbnN0IGtlZXBXYXYgPSBhcmdzLmtlZXBXYXY7XHJcbiAgICBjb25zdCBza2lwVWlTdGF0ZSA9IGFyZ3Muc2tpcFVpU3RhdGU7XHJcblxyXG4gICAgc3RvcEVxTG9vcCgpO1xyXG4gICAgaWYgKCFrZWVwV2F2KSByZXNldFRpbWVyKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHdvcmtsZXROb2RlUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKHdvcmtsZXROb2RlUmVmLmN1cnJlbnQucG9ydCkge1xyXG4gICAgICAgICAgICB3b3JrbGV0Tm9kZVJlZi5jdXJyZW50LnBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldFJlY29yZGluZ1wiLCB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAvKiBpZ25vcmUgKi9cclxuICAgICAgICB9XHJcbiAgICAgICAgd29ya2xldE5vZGVSZWYuY3VycmVudC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHByb2Nlc3NvclJlZi5jdXJyZW50KSBwcm9jZXNzb3JSZWYuY3VycmVudC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIGlmIChhbmFseXNlclJlZi5jdXJyZW50KSBhbmFseXNlclJlZi5jdXJyZW50LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgaWYgKHNvdXJjZVJlZi5jdXJyZW50KSBzb3VyY2VSZWYuY3VycmVudC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIGlmICh6ZXJvR2FpblJlZi5jdXJyZW50KSB6ZXJvR2FpblJlZi5jdXJyZW50LmRpc2Nvbm5lY3QoKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoYXVkaW9DdHhSZWYuY3VycmVudCAmJiBhdWRpb0N0eFJlZi5jdXJyZW50LnN0YXRlICE9PSBcImNsb3NlZFwiKSBhdWRpb0N0eFJlZi5jdXJyZW50LmNsb3NlKCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHN0cmVhbVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY29uc3QgdHJhY2tzID0gc3RyZWFtUmVmLmN1cnJlbnQuZ2V0VHJhY2tzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFja3MubGVuZ3RoOyBpKyspIHRyYWNrc1tpXS5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvKiBpZ25vcmUgKi9cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzb3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBhbmFseXNlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHNvdXJjZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHplcm9HYWluUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgd29ya2xldE5vZGVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBhdWRpb0N0eFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHN0cmVhbVJlZi5jdXJyZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoIXNraXBVaVN0YXRlKSB7XHJcbiAgICAgIHNhZmVTZXRTdGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgc2V0SXNSZWNvcmRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldElzUGF1c2VkKGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b2dnbGVQbGF5KCkge1xyXG4gICAgY29uc3QgYXVkaW9FbCA9IGF1ZGlvRWxSZWYuY3VycmVudDtcclxuICAgIGlmICghYXVkaW9FbCB8fCAhd2F2VXJsKSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKGF1ZGlvRWwucGF1c2VkKSBhdWRpb0VsLnBsYXkoKTtcclxuICAgICAgZWxzZSBhdWRpb0VsLnBhdXNlKCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzeW5jQ2FudmFzU2l6ZSgpIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGJhcnNDYW52YXNSZWYuY3VycmVudDtcclxuICAgIGlmICghY2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdyA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoY2FudmFzLmNsaWVudFdpZHRoKSk7XHJcbiAgICBjb25zdCBoID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihjYW52YXMuY2xpZW50SGVpZ2h0KSk7XHJcbiAgICBpZiAoY2FudmFzLndpZHRoICE9PSB3KSBjYW52YXMud2lkdGggPSB3O1xyXG4gICAgaWYgKGNhbnZhcy5oZWlnaHQgIT09IGgpIGNhbnZhcy5oZWlnaHQgPSBoO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3RhcnRFcUxvb3AoKSB7XHJcbiAgICBpZiAocmFmSWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgY29uc3QgY2FudmFzID0gYmFyc0NhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgY29uc3QgYW5hbHlzZXIgPSBhbmFseXNlclJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMgfHwgIWFuYWx5c2VyKSByZXR1cm47XHJcblxyXG4gICAgc3luY0NhbnZhc1NpemUoKTtcclxuXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgaWYgKCFjdHgpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBmcmVxID0gbmV3IFVpbnQ4QXJyYXkoYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvb3AoKSB7XHJcbiAgICAgIHJhZklkUmVmLmN1cnJlbnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcblxyXG4gICAgICBhbmFseXNlci5nZXRCeXRlRnJlcXVlbmN5RGF0YShmcmVxKTtcclxuXHJcbiAgICAgIGNvbnN0IHcgPSBjYW52YXMud2lkdGg7XHJcbiAgICAgIGNvbnN0IGggPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHcsIGgpO1xyXG5cclxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGJyYW5kUmdiYSgwLjEwKTtcclxuICAgICAgY3R4LmZpbGxSZWN0KDAsIE1hdGguZmxvb3IoaCAvIDIpLCB3LCAxKTtcclxuXHJcbiAgICAgIGNvbnN0IGdhcCA9IGJhckdhcFB4O1xyXG4gICAgICBjb25zdCBiYXJXID0gYmFyV2lkdGhQeDtcclxuICAgICAgbGV0IGNvdW50ID0gTWF0aC5mbG9vcigodyArIGdhcCkgLyAoYmFyVyArIGdhcCkpO1xyXG4gICAgICBpZiAoY291bnQgPCBiYXJNaW5Db3VudCkgY291bnQgPSBiYXJNaW5Db3VudDtcclxuICAgICAgaWYgKGNvdW50ID4gYmFyTWF4Q291bnQpIGNvdW50ID0gYmFyTWF4Q291bnQ7XHJcblxyXG4gICAgICBjb25zdCB0b3RhbFcgPSBjb3VudCAqIGJhclcgKyAoY291bnQgLSAxKSAqIGdhcDtcclxuICAgICAgY29uc3Qgc3RhcnRYID0gTWF0aC5mbG9vcigodyAtIHRvdGFsVykgLyAyKTtcclxuXHJcbiAgICAgIGNvbnN0IG1heEggPSBNYXRoLmZsb29yKGggKiAwLjkyKTtcclxuXHJcbiAgICAgIGlmICghZXFMYXN0UmVmLmN1cnJlbnQgfHwgZXFMYXN0UmVmLmN1cnJlbnQubGVuZ3RoICE9PSBjb3VudCkge1xyXG4gICAgICAgIGVxTGFzdFJlZi5jdXJyZW50ID0gbmV3IEFycmF5KGNvdW50KS5maWxsKDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKChpIC8gY291bnQpICogZnJlcS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IHYgPSBNYXRoLnBvdyhmcmVxW2lkeF0gLyAyNTUsIDAuOSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3QgPSBlcUxhc3RSZWYuY3VycmVudFtpXSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IHNtb290aCA9IGxhc3QgKiAwLjc4ICsgdiAqIDAuMjI7XHJcbiAgICAgICAgZXFMYXN0UmVmLmN1cnJlbnRbaV0gPSBzbW9vdGg7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhckggPSBNYXRoLm1heCgyLCBNYXRoLmZsb29yKHNtb290aCAqIG1heEgpKTtcclxuICAgICAgICBjb25zdCB4ID0gc3RhcnRYICsgaSAqIChiYXJXICsgZ2FwKTtcclxuICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcigoaCAtIGJhckgpIC8gMik7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBicmFuZFJnYmEoMC40Mik7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIGJhclcsIGJhckgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmFmSWRSZWYuY3VycmVudCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0b3BFcUxvb3AoKSB7XHJcbiAgICBpZiAocmFmSWRSZWYuY3VycmVudCkge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWZJZFJlZi5jdXJyZW50KTtcclxuICAgICAgcmFmSWRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkcmF3RXFJZGxlKCkge1xyXG4gICAgY29uc3QgY2FudmFzID0gYmFyc0NhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuXHJcbiAgICBzeW5jQ2FudmFzU2l6ZSgpO1xyXG5cclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHcgPSBjYW52YXMud2lkdGg7XHJcbiAgICBjb25zdCBoID0gY2FudmFzLmhlaWdodDtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdywgaCk7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGJyYW5kUmdiYSgwLjA4KTtcclxuICAgIGN0eC5maWxsUmVjdCgwLCBNYXRoLmZsb29yKGggLyAyKSwgdywgMSk7XHJcblxyXG4gICAgY29uc3QgZ2FwID0gYmFyR2FwUHg7XHJcbiAgICBjb25zdCBiYXJXID0gYmFyV2lkdGhQeDtcclxuICAgIGxldCBjb3VudCA9IE1hdGguZmxvb3IoKHcgKyBnYXApIC8gKGJhclcgKyBnYXApKTtcclxuICAgIGlmIChjb3VudCA8IGJhck1pbkNvdW50KSBjb3VudCA9IGJhck1pbkNvdW50O1xyXG4gICAgaWYgKGNvdW50ID4gYmFyTWF4Q291bnQpIGNvdW50ID0gYmFyTWF4Q291bnQ7XHJcblxyXG4gICAgY29uc3QgdG90YWxXID0gY291bnQgKiBiYXJXICsgKGNvdW50IC0gMSkgKiBnYXA7XHJcbiAgICBjb25zdCBzdGFydFggPSBNYXRoLmZsb29yKCh3IC0gdG90YWxXKSAvIDIpO1xyXG5cclxuICAgIGNvbnN0IG1heEggPSBNYXRoLmZsb29yKGggKiAwLjM1KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICBjb25zdCB2ID0gMC4xOCArIChpICUgOSkgKiAwLjAxO1xyXG4gICAgICBjb25zdCBiYXJIID0gTWF0aC5tYXgoMiwgTWF0aC5mbG9vcih2ICogbWF4SCkpO1xyXG5cclxuICAgICAgY29uc3QgeCA9IHN0YXJ0WCArIGkgKiAoYmFyVyArIGdhcCk7XHJcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKChoIC0gYmFySCkgLyAyKTtcclxuXHJcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBicmFuZFJnYmEoMC4xNik7XHJcbiAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBiYXJXLCBiYXJIKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRyYXdFcVdhdmVmb3JtKGFjdGl2ZVNlY29uZCkge1xyXG4gICAgY29uc3QgY2FudmFzID0gYmFyc0NhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuXHJcbiAgICBzeW5jQ2FudmFzU2l6ZSgpO1xyXG5cclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGxldmVscyA9IHdhdkxldmVsc1JlZi5jdXJyZW50IHx8IFtdO1xyXG4gICAgaWYgKCFsZXZlbHMubGVuZ3RoKSB7XHJcbiAgICAgIGRyYXdFcUlkbGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHcgPSBjYW52YXMud2lkdGg7XHJcbiAgICBjb25zdCBoID0gY2FudmFzLmhlaWdodDtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdywgaCk7XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9IGJyYW5kUmdiYSgwLjEwKTtcclxuICAgIGN0eC5maWxsUmVjdCgwLCBNYXRoLmZsb29yKGggLyAyKSwgdywgMSk7XHJcblxyXG4gICAgY29uc3QgbWF4SCA9IE1hdGguZmxvb3IoaCAqIDAuOSk7XHJcbiAgICBjb25zdCBtaW5IID0gMztcclxuXHJcbiAgICBjb25zdCBiYXJXID0gMztcclxuICAgIGNvbnN0IGdhcCA9IDI7XHJcbiAgICBjb25zdCBtaW5CYXJzID0gNDg7XHJcbiAgICBjb25zdCBtYXhCYXJzID0gMTQwO1xyXG4gICAgY29uc3QgZml0QmFycyA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoKHcgKyBnYXApIC8gKGJhclcgKyBnYXApKSk7XHJcbiAgICBjb25zdCBjb3VudCA9IE1hdGgubWF4KG1pbkJhcnMsIE1hdGgubWluKG1heEJhcnMsIE1hdGgubWF4KGxldmVscy5sZW5ndGgsIGZpdEJhcnMpKSk7XHJcbiAgICBjb25zdCB0b3RhbFcgPSBjb3VudCAqIGJhclcgKyAoY291bnQgLSAxKSAqIGdhcDtcclxuICAgIGNvbnN0IHN0YXJ0WCA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IoKHcgLSB0b3RhbFcpIC8gMikpO1xyXG5cclxuICAgIGNvbnN0IGR1cmF0aW9uU2VjID0gTWF0aC5tYXgoMSwgd2F2RHVyYXRpb25TZWMgfHwgbGV2ZWxzLmxlbmd0aCB8fCAxKTtcclxuICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oY291bnQgLSAxLCBNYXRoLmZsb29yKChhY3RpdmVTZWNvbmQgLyBkdXJhdGlvblNlYykgKiAoY291bnQgLSAxKSkpKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgY29uc3QgdCA9IGNvdW50ID4gMSA/IGkgLyAoY291bnQgLSAxKSA6IDA7XHJcbiAgICAgIGNvbnN0IHJhd0luZGV4ID0gdCAqIE1hdGgubWF4KDAsIGxldmVscy5sZW5ndGggLSAxKTtcclxuICAgICAgY29uc3QgbG93ID0gTWF0aC5mbG9vcihyYXdJbmRleCk7XHJcbiAgICAgIGNvbnN0IGhpZ2ggPSBNYXRoLm1pbihsZXZlbHMubGVuZ3RoIC0gMSwgbG93ICsgMSk7XHJcbiAgICAgIGNvbnN0IGZyYWMgPSByYXdJbmRleCAtIGxvdztcclxuICAgICAgY29uc3QgdkxvdyA9IGxldmVsc1tsb3ddIHx8IDA7XHJcbiAgICAgIGNvbnN0IHZIaWdoID0gbGV2ZWxzW2hpZ2hdIHx8IDA7XHJcbiAgICAgIGNvbnN0IHYgPSB2TG93ICogKDEgLSBmcmFjKSArIHZIaWdoICogZnJhYztcclxuICAgICAgY29uc3QgYmFySCA9IE1hdGgubWF4KG1pbkgsIE1hdGguZmxvb3IodiAqIChtYXhIIC0gbWluSCkgKyBtaW5IKSk7XHJcbiAgICAgIGNvbnN0IHggPSBzdGFydFggKyBpICogKGJhclcgKyBnYXApO1xyXG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcigoaCAtIGJhckgpIC8gMik7XHJcblxyXG4gICAgICBjb25zdCBpc0FjdGl2ZSA9IGkgPT09IGFjdGl2ZUluZGV4O1xyXG4gICAgICBjdHguZmlsbFN0eWxlID0gaXNBY3RpdmUgPyBicmFuZFJnYmEoMC43OCkgOiBicmFuZFJnYmEoMC4yOCk7XHJcbiAgICAgIGRyYXdSb3VuZGVkUmVjdChjdHgsIHgsIHksIGJhclcsIGJhckgsIE1hdGgubWluKDYsIE1hdGguZmxvb3IoYmFyVyAvIDIpKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBvbkNlbnRlckNsaWNrKCkge1xyXG4gICAgaWYgKCFpc1JlY29yZGluZykge1xyXG4gICAgICBzdGFydFJlY29yZGluZygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaXNQYXVzZWQpIHJlc3VtZVJlY29yZGluZygpO1xyXG4gICAgZWxzZSBwYXVzZVJlY29yZGluZygpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gb25SaWdodENsaWNrKCkge1xyXG4gICAgaWYgKGlzUmVjb3JkaW5nKSB7XHJcbiAgICAgIGZpbmlzaFJlY29yZGluZygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAod2F2QmxvYikgY2xlYXJSZWNvcmRpbmcoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNlbnRlckxhYmVsID0gIWlzUmVjb3JkaW5nXHJcbiAgICA/IGluZFQoXCJBdWRpb1JlY29yZGVyX1JlY29yZFwiLCBcIlJlY29yZFwiKVxyXG4gICAgOiBpc1BhdXNlZFxyXG4gICAgICA/IGluZFQoXCJBdWRpb1JlY29yZGVyX1Jlc3VtZVwiLCBcIlJlc3VtZVwiKVxyXG4gICAgICA6IGluZFQoXCJBdWRpb1JlY29yZGVyX1BhdXNlXCIsIFwiUGF1c2VcIik7XHJcblxyXG4gIGNvbnN0IHRvdGFsV2F2TXMgPSB3YXZEdXJhdGlvblNlYyA+IDAgPyB3YXZEdXJhdGlvblNlYyAqIDEwMDAgOiAwO1xyXG4gIGNvbnN0IHJlbWFpbmluZ1dhdk1zID0gd2F2RHVyYXRpb25TZWMgPiAwID8gTWF0aC5tYXgoMCwgcGxheWJhY2tSZW1haW5pbmdTZWMgKiAxMDAwKSA6IDA7XHJcbiAgY29uc3QgdGltZXJUZXh0ID0gaXNSZWNvcmRpbmdcclxuICAgID8gZm9ybWF0VGltZU1zKGVsYXBzZWRNcylcclxuICAgIDogd2F2VXJsXHJcbiAgICAgID8gZm9ybWF0VGltZU1zKHJlbWFpbmluZ1dhdk1zIHx8IHRvdGFsV2F2TXMpXHJcbiAgICAgIDogZm9ybWF0VGltZU1zKDApO1xyXG5cclxuICBjb25zdCBpc0FjdGl2ZVJlYyA9IGlzUmVjb3JkaW5nICYmICFpc1BhdXNlZDtcclxuICBjb25zdCBzdGF0dXNUZXh0ID0gdWlFcnJvclxyXG4gICAgPyBcIlwiXHJcbiAgICA6IGlzQWN0aXZlUmVjXHJcbiAgICAgID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfU3RhdHVzX1JlY29yZGluZ1wiLCBcIlJlY29yZGluZ1wiKVxyXG4gICAgICA6IGlzUGF1c2VkXHJcbiAgICAgICAgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9TdGF0dXNfUGF1c2VkXCIsIFwiUGF1c2VkXCIpXHJcbiAgICAgICAgOiB3YXZVcmxcclxuICAgICAgICAgID8gaW5kVChcIkF1ZGlvUmVjb3JkZXJfU3RhdHVzX1JlYWR5VG9QbGF5XCIsIFwiUmVhZHkgdG8gcGxheVwiKVxyXG4gICAgICAgICAgOiBpbmRUKFwiQXVkaW9SZWNvcmRlcl9TdGF0dXNfUmVhZHlcIiwgXCJSZWFkeVwiKTtcclxuXHJcbiAgY29uc3QgdGltZXJBbHBoYSA9IGlzQWN0aXZlUmVjID8gMC41NSA6IGlzUGF1c2VkID8gMC40NiA6IDAuNDA7XHJcbiAgY29uc3Qgc3RhdHVzQWxwaGEgPSAwLjM1O1xyXG4gIGNvbnN0IGNhcmRCZyA9IFwicmFkaWFsLWdyYWRpZW50KDcwMHB4IGNpcmNsZSBhdCAxOCUgMCUsIHJnYmEoMCwgNDEsIDEwNywgMC4wNiksIHRyYW5zcGFyZW50IDU1JSlcIjtcclxuXHJcbiAgY29uc3Qgb3V0ZXJDbGFzc05hbWUgPSBlbWJlZGRlZFxyXG4gICAgPyBcInctZnVsbFwiXHJcbiAgICA6IFwidy1mdWxsIG1pbi1oLVsyODBweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHNtOnAtNlwiO1xyXG5cclxuICBjb25zdCBvdXRlclN0eWxlID0gZW1iZWRkZWRcclxuICAgID8gdW5kZWZpbmVkXHJcbiAgICA6IHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwicmFkaWFsLWdyYWRpZW50KDkwMHB4IGNpcmNsZSBhdCAyMCUgMjAlLCByZ2JhKDAsIDQxLCAxMDcsIDAuMDgpLCB0cmFuc3BhcmVudCA2MCUpXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4wNSlcIixcclxuICAgICAgICBmb250RmFtaWx5OiAnXCJNb250c2VycmF0XCIsIHNhbnMtc2VyaWYnLFxyXG4gICAgICB9O1xyXG5cclxuICBjb25zdCBjYXJkQ2xhc3NOYW1lID0gZW1iZWRkZWRcclxuICAgID8gXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC14bCBzbTpyb3VuZGVkLTJ4bCBiZy13aGl0ZSBib3JkZXIgc2hhZG93LXhsXCJcclxuICAgIDogXCJyZWxhdGl2ZSB3LWZ1bGwgbWF4LXctWzM2MHB4XSBzbTptYXgtdy1bNDIwcHhdIGxnOm1heC13LVs1MjBweF0gcm91bmRlZC14bCBzbTpyb3VuZGVkLTJ4bCBiZy13aGl0ZSBib3JkZXIgc2hhZG93LXhsXCI7XHJcblxyXG4gIGNvbnN0IHNob3dUcmFuc2NyaWJlQnV0dG9uID0gISF3YXZCbG9iICYmIHR5cGVvZiBvblRyYW5zY3JpYmUgPT09IFwiZnVuY3Rpb25cIjtcclxuICBjb25zdCB0cmFuc2NyaWJlVGV4dCA9IHRyYW5zY3JpYmVMYWJlbCB8fCBpbmRUKFwiVGV4dEVkaXRvcl9UcmFuc2NyaWJlXCIsIFwiVHJhbnNjcmliZVwiKTtcclxuICBjb25zdCB0cmFuc2NyaWJlQnVzeVRleHQgPSB0cmFuc2NyaWJlQnVzeUxhYmVsIHx8IGluZFQoXCJUZXh0RWRpdG9yX1RyYW5zY3JpYmluZ1wiLCBcIlRyYW5zY3JpYmluZ1wiKTtcclxuICAgIGNvbnN0IHNob3dEb3dubG9hZEJ1dHRvbiA9IGZhbHNlO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtvdXRlckNsYXNzTmFtZX0gc3R5bGU9e291dGVyU3R5bGV9PlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPXtjYXJkQ2xhc3NOYW1lfVxyXG4gICAgICAgIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4xOClcIiwgYmFja2dyb3VuZEltYWdlOiBjYXJkQmcgfX1cclxuICAgICAgPlxyXG4gICAgICAgIHshd2F2VXJsID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtNCBzbTpyaWdodC01IHNtOnRvcC01XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtbGlnaHQgaXRhbGljIHRhYnVsYXItbnVtcyB0ZXh0LVsxNnB4XSBzbTp0ZXh0LVsxOHB4XSBsZWFkaW5nLW5vbmUgdHJhY2tpbmctWzAuMTRlbV1cIlxuICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogYnJhbmRSZ2JhKHRpbWVyQWxwaGEpIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aW1lclRleHR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTUgc206cHgtNyBwdC0zIHNtOnB0LTQgJHt3YXZVcmwgPyBcInBiLTAgc206cGItMVwiIDogXCJwYi0xIHNtOnBiLTJcIn1gfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgPGNhbnZhcyByZWY9e2JhcnNDYW52YXNSZWZ9IGNsYXNzTmFtZT1cInctZnVsbCBoLTEyIHNtOmgtMTZcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt3YXZVcmwgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTAuNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1saWdodCBpdGFsaWMgdGFidWxhci1udW1zIHRleHQtWzE2cHhdIHNtOnRleHQtWzE4cHhdIGxlYWRpbmctbm9uZSB0cmFja2luZy1bMC4xNGVtXVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IGJyYW5kUmdiYSh0aW1lckFscGhhKSB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RpbWVyVGV4dH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BweC01IHNtOnB4LTcgcGItNCBzbTpwYi01ICR7d2F2VXJsID8gXCJwdC0xIHNtOnB0LTJcIiA6IFwicHQtMiBzbTpwdC0zXCJ9YH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIHN0eWxlPXt7IGdhcDogXCIyNHB4XCIgfX0+XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVQbGF5fVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshd2F2VXJsfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtMTIgdy0xMiBzbTpoLTE0IHNtOnctMTQgcm91bmRlZC1tZCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbiBzaGFkb3cteHMgaG92ZXI6c2hhZG93LW1kIGFjdGl2ZTpzY2FsZS05NVwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB3YXZVcmwgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjE4KVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB3YXZVcmwgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4wNilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogd2F2VXJsID8gMSA6IDAuNDUsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHdhdlVybCA/IFwicG9pbnRlclwiIDogXCJub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkF1ZGlvUmVjb3JkZXJfUGxheVwiLCBcIlBsYXlcIil9XHJcbiAgICAgICAgICAgICAgdGl0bGU9e3dhdlVybCA/IChpc1BsYXlpbmcgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9QYXVzZVwiLCBcIlBhdXNlXCIpIDogaW5kVChcIkF1ZGlvUmVjb3JkZXJfUGxheVwiLCBcIlBsYXlcIikpIDogaW5kVChcIkF1ZGlvUmVjb3JkZXJfTm9BdWRpb1wiLCBcIk5vIGF1ZGlvXCIpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2lzUGxheWluZyA/IChcclxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMlwiIGhlaWdodD1cIjIyXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3R5bGU9e3sgY29sb3I6IElORF9CUkFORCB9fT5cclxuICAgICAgICAgICAgICAgICAgPHJlY3QgeD1cIjZcIiB5PVwiNVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCIxNFwiIHk9XCI1XCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiMTRcIiByeD1cIjFcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0eWxlPXt7IGNvbG9yOiBJTkRfQlJBTkQgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOSA3TDE5IDEyTDkgMTdWN1pcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2VudGVyQ2xpY2t9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5SZWNvcmR9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC0xNCB3LTE0IHNtOmgtMTYgc206dy0xNiByb3VuZGVkLW1kIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uIHNoYWRvdy14cyBob3ZlcjpzaGFkb3ctbWQgYWN0aXZlOnNjYWxlLTk1XCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjE4KVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjYW5SZWNvcmQgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4wNilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgYm94U2hhZG93OiBpc0FjdGl2ZVJlY1xyXG4gICAgICAgICAgICAgICAgICA/IFwiMCAwIDAgN3B4IHJnYmEoMCwgNDEsIDEwNywgMC4wOCksIDAgMTRweCAzNHB4IHJnYmEoMCwgNDEsIDEwNywgMC4xNClcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwiMCAxMHB4IDIycHggcmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogY2FuUmVjb3JkID8gMSA6IDAuNDUsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6IGNhblJlY29yZCA/IFwicG9pbnRlclwiIDogXCJub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17Y2VudGVyTGFiZWx9XHJcbiAgICAgICAgICAgICAgdGl0bGU9e2NlbnRlckxhYmVsfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgeyFpc1JlY29yZGluZyA/IChcclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImgtNSB3LTUgcm91bmRlZC1tZCBiZy1yZWQtNTAwXCIgLz5cclxuICAgICAgICAgICAgICApIDogaXNQYXVzZWQgPyAoXHJcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0eWxlPXt7IGNvbG9yOiBJTkRfQlJBTkQgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOSA3TDE5IDEyTDkgMTdWN1pcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjJcIiBoZWlnaHQ9XCIyMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0eWxlPXt7IGNvbG9yOiBJTkRfQlJBTkQgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI2XCIgeT1cIjVcIiB3aWR0aD1cIjRcIiBoZWlnaHQ9XCIxNFwiIHJ4PVwiMVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPlxyXG4gICAgICAgICAgICAgICAgICA8cmVjdCB4PVwiMTRcIiB5PVwiNVwiIHdpZHRoPVwiNFwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblJpZ2h0Q2xpY2t9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc1JlY29yZGluZ31cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTEyIHctMTIgc206aC0xNCBzbTp3LTE0IHJvdW5kZWQtbWQgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24gc2hhZG93LXhzIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTVcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogaXNSZWNvcmRpbmcgPyBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIiA6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjE4KVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc1JlY29yZGluZyA/IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA2KVwiIDogXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDQpXCIsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiBpc1JlY29yZGluZyA/IDEgOiAwLjQ1LFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiBpc1JlY29yZGluZyA/IFwicG9pbnRlclwiIDogXCJub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aXNSZWNvcmRpbmcgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9TdG9wXCIsIFwiU3RvcFwiKSA6IGluZFQoXCJBdWRpb1JlY29yZGVyX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cclxuICAgICAgICAgICAgICB0aXRsZT17aXNSZWNvcmRpbmcgPyBpbmRUKFwiQXVkaW9SZWNvcmRlcl9TdG9wXCIsIFwiU3RvcFwiKSA6IGluZFQoXCJBdWRpb1JlY29yZGVyX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3R5bGU9e3sgY29sb3I6IElORF9CUkFORCB9fT5cclxuICAgICAgICAgICAgICAgIDxyZWN0IHg9XCI3XCIgeT1cIjdcIiB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMTBcIiByeD1cIjFcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICB7c2hvd0Rvd25sb2FkQnV0dG9uIHx8IHNob3dUcmFuc2NyaWJlQnV0dG9uID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTIgZmxleC13cmFwXCI+XHJcbiAgICAgICAgICAgICAge3Nob3dEb3dubG9hZEJ1dHRvbiA/IChcclxuICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9e3dhdlVybCB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkPXt3YXZGaWxlTmFtZSB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMS41IHJvdW5kZWQtbWQgYm9yZGVyIHRleHQtWzEzcHhdIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gc2hhZG93LXhzIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTVcIlxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIixcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLCA0MSwgMTA3LCAwLjA0KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBJTkRfQlJBTkQsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2Rvd25sb2FkTGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkb3dubG9hZExhYmVsfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7ZG93bmxvYWRMYWJlbH1cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICB7c2hvd1RyYW5zY3JpYmVCdXR0b24gPyAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRyYW5zY3JpYmUgJiYgb25UcmFuc2NyaWJlKHdhdkJsb2IpfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJhbnNjcmliZUJ1c3l9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMS41IHJvdW5kZWQtbWQgYm9yZGVyIHRleHQtWzEzcHhdIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24gc2hhZG93LXhzIGhvdmVyOnNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTVcIlxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInJnYmEoMCwgNDEsIDEwNywgMC4yMilcIixcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRyYW5zY3JpYmVCdXN5ID8gXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDgpXCIgOiBcInJnYmEoMCwgNDEsIDEwNywgMC4wNClcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogSU5EX0JSQU5ELFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IHRyYW5zY3JpYmVCdXN5ID8gMC43IDogMSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IHRyYW5zY3JpYmVCdXN5ID8gXCJub3QtYWxsb3dlZFwiIDogXCJwb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3RyYW5zY3JpYmVCdXN5ID8gdHJhbnNjcmliZUJ1c3lUZXh0IDogdHJhbnNjcmliZVRleHR9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0cmFuc2NyaWJlQnVzeSA/IHRyYW5zY3JpYmVCdXN5VGV4dCA6IHRyYW5zY3JpYmVUZXh0fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7dHJhbnNjcmliZUJ1c3kgPyB0cmFuc2NyaWJlQnVzeVRleHQgOiB0cmFuc2NyaWJlVGV4dH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgIDxhdWRpbyByZWY9e2F1ZGlvRWxSZWZ9IHNyYz17d2F2VXJsIHx8IHVuZGVmaW5lZH0gY2xhc3NOYW1lPVwiaGlkZGVuXCIgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgbWluLWgtWzIycHhdXCI+XHJcbiAgICAgICAgICAgIHt1aUVycm9yID8gKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1yb3NlLTcwMCB0ZXh0LWNlbnRlciBsZWFkaW5nLXRpZ2h0XCI+e3VpRXJyb3J9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dWlIaW50ID8gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwIHRleHQtY2VudGVyIGxlYWRpbmctdGlnaHRcIj57dWlIaW50fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGxlYWRpbmctdGlnaHRcIiBzdHlsZT17eyBjb2xvcjogYnJhbmRSZ2JhKHN0YXR1c0FscGhhKSB9fT5cclxuICAgICAgICAgICAgICAgIHtzdGF0dXNUZXh0fVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQUEsbUJBQW1EO0FBMHJDdkM7QUF4ckNaLElBQU0sV0FBVyxXQUFXLGdCQUFnQixDQUFDO0FBQzdDLElBQU0sT0FBTyxDQUFDLEtBQWEsYUFDeEIsWUFBWSxPQUFPLFNBQVMsR0FBRyxNQUFNLFlBQVksU0FBUyxHQUFHLEtBQU0sWUFBWTtBQTBCbEYsSUFBTSxZQUFZO0FBQ2xCLElBQU0sZ0JBQWdCLENBQUMsR0FBRyxJQUFJLEdBQUc7QUFDakMsSUFBTSx5QkFBeUI7QUFDL0IsSUFBTSx1QkFBdUI7QUFFN0IsU0FBUyxXQUFXLE1BQU07QUFDeEIsTUFBSSxPQUFPLFlBQVksZUFBZSxRQUFRLE1BQU07QUFDbEQsWUFBUSxLQUFLLHNCQUFzQixHQUFHLElBQUk7QUFBQSxFQUM1QztBQUNGO0FBRUEsU0FBUyxXQUFXLE1BQU07QUFDeEIsTUFBSSxPQUFPLFlBQVksZUFBZSxRQUFRLE1BQU07QUFDbEQsWUFBUSxLQUFLLHNCQUFzQixHQUFHLElBQUk7QUFBQSxFQUM1QztBQUNGO0FBRUEsU0FBUyxZQUFZLE1BQU07QUFDekIsTUFBSSxPQUFPLFlBQVksZUFBZSxRQUFRLE9BQU87QUFDbkQsWUFBUSxNQUFNLHNCQUFzQixHQUFHLElBQUk7QUFBQSxFQUM3QztBQUNGO0FBRUEsU0FBUyxVQUFVLE9BQU87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
