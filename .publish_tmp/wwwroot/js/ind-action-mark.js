// IND Action Mark: overlay without backdrop, icon only.
// API: IND.flashActionMark({ type: 'okProcess'|'okDelProcess'|'errorProcess'|'warningProcess', durationMs: 1500 })
(function () {
"use strict";

var hideTimer = null;
var leaveTimer = null;

function isDebugEnabled() {
  try {
    return sessionStorage.getItem("IND_ActionMark_Debug") === "1";
  } catch (e) {
    return false;
  }
}

function ensureMarkup() {
  var overlay = document.getElementById("indActionMark");
  var wrap = document.getElementById("indActionMarkWrap");
  var checkSvg = document.getElementById("indMarkCheck");
  var warnSvg = document.getElementById("indMarkWarning");
  var errSvg = document.getElementById("indMarkError");

  if (overlay && wrap && checkSvg && warnSvg && errSvg) {
    try {
      overlay.style.zIndex = "2147483647";
    } catch (e) {
      // ignore
    }
    return { overlay: overlay, wrap: wrap, checkSvg: checkSvg, warnSvg: warnSvg, errSvg: errSvg };
  }

  // Defensive: if the partial is not rendered for any reason, create the markup at runtime.
  try {
    // If the overlay exists but children are missing, rebuild inside it to avoid duplicate ids.
    if (overlay && (!wrap || !checkSvg || !warnSvg || !errSvg)) {
      try {
        overlay.innerHTML = "";
      } catch (e) {
        // ignore
      }
      overlay.className =
        "fixed inset-0 z-2147483647 hidden pointer-events-none flex items-center justify-center";
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.zIndex = "2147483647";
    } else {
    overlay = document.createElement("div");
    overlay.id = "indActionMark";
    overlay.className =
      "fixed inset-0 z-2147483647 hidden pointer-events-none flex items-center justify-center";
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.zIndex = "2147483647";
    }

    wrap = document.createElement("div");
    wrap.id = "indActionMarkWrap";
    wrap.className = "h-40 w-40";

    var svgNs = "http://www.w3.org/2000/svg";
    function makeSvg(id) {
      var svg = document.createElementNS(svgNs, "svg");
      svg.setAttribute("id", id);
      svg.setAttribute("class", "hidden h-full w-full");
      svg.setAttribute("xmlns", svgNs);
      svg.setAttribute("fill", "none");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("aria-hidden", "true");
      return svg;
    }

    function makeRect() {
      var rect = document.createElementNS(svgNs, "rect");
      rect.setAttribute("class", "ind-mark-stroke ind-stroke-animate");
      rect.setAttribute("x", "4");
      rect.setAttribute("y", "4");
      rect.setAttribute("width", "16");
      rect.setAttribute("height", "16");
      rect.setAttribute("rx", "4");
      rect.setAttribute("stroke-width", "1.1");
      return rect;
    }

    function makePath(d, width) {
      var path = document.createElementNS(svgNs, "path");
      path.setAttribute("class", "ind-mark-stroke ind-stroke-animate");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("stroke-width", width);
      path.setAttribute("d", d);
      return path;
    }

    checkSvg = makeSvg("indMarkCheck");
    checkSvg.appendChild(makeRect());
    checkSvg.appendChild(makePath("M8.2 12.6l2.5 2.5 5.1-6.2", "1.2"));

    warnSvg = makeSvg("indMarkWarning");
    warnSvg.appendChild(makeRect());
    warnSvg.appendChild(makePath("M12 7.2v7.1", "1.2"));
    warnSvg.appendChild(makePath("M12 17.3h.01", "1.6"));

    errSvg = makeSvg("indMarkError");
    errSvg.appendChild(makeRect());
    errSvg.appendChild(makePath("M8.5 8.5l7 7", "1.2"));
    errSvg.appendChild(makePath("M15.5 8.5l-7 7", "1.2"));

    wrap.appendChild(checkSvg);
    wrap.appendChild(warnSvg);
    wrap.appendChild(errSvg);
    overlay.appendChild(wrap);

    if (!document.getElementById("indActionMark")) {
      document.body.appendChild(overlay);
    }

    if (isDebugEnabled()) {
      console.debug("IND Action Mark: markup created at runtime");
    }

    return { overlay: overlay, wrap: wrap, checkSvg: checkSvg, warnSvg: warnSvg, errSvg: errSvg };
  } catch (e) {
    if (isDebugEnabled()) {
      console.warn("IND Action Mark: failed to create markup", e);
    }
    return null;
  }
}

// Restart CSS animations so stroke is drawn every time.
function restartAnimations(wrap, checkSvg) {
try {
wrap.style.animation = "none";
wrap.getBoundingClientRect();
wrap.style.animation = "";

  var strokes = checkSvg.querySelectorAll(".ind-stroke-animate");
  for (var i = 0; i < strokes.length; i++) {
    strokes[i].style.animation = "none";
    strokes[i].getBoundingClientRect();
    strokes[i].style.animation = "";
  }
} catch (e) {
  // Defensive: never break the UI.
}


}

// Hide with leave animation then set hidden.
function hideInternal(nodes) {
var overlay = nodes && nodes.overlay;
var checkSvg = nodes && nodes.checkSvg;
if (!overlay || !checkSvg) return;
try {
overlay.classList.remove("ind-mark-open");
overlay.classList.add("ind-mark-leave");

  if (leaveTimer) window.clearTimeout(leaveTimer);
  leaveTimer = window.setTimeout(function () {
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
    overlay.classList.remove("ind-mark-leave");
    checkSvg.classList.add("hidden");
  }, 340);
} catch (e) {
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  checkSvg.classList.add("hidden");
}


}

// Public API: show the check with color based on type.
function flashInternal(opts) {
opts = opts || {};

function normalizeType(t) {
  var raw = String(t || "").trim().toLowerCase();
  if (!raw) return "okprocess";

  // Back-compat
  if (raw === "success" || raw === "ok" || raw === "okprocess") return "okprocess";
  if (raw === "danger" || raw === "delete" || raw === "okdelprocess") return "okdelprocess";
  if (raw === "error" || raw === "errorprocess") return "errorprocess";
  if (raw === "warning" || raw === "warn" || raw === "question" || raw === "warningprocess") return "warningprocess";

  return raw;
}

var rawType = opts.type;
var type = normalizeType(rawType);
var durationMs = typeof opts.durationMs === "number" ? opts.durationMs : 1500;

var nodes = ensureMarkup();
if (!nodes) return false;

var overlay = nodes.overlay;
var wrap = nodes.wrap;
var checkSvg = nodes.checkSvg;
var warnSvg = nodes.warnSvg;
var errSvg = nodes.errSvg;

try {
  window.IND = window.IND || {};
  window.IND.__lastActionMark = { type: type, durationMs: durationMs, at: Date.now() };
  sessionStorage.setItem("IND_ActionMark_Last", JSON.stringify(window.IND.__lastActionMark));
} catch (e) {
  // ignore
}

if (isDebugEnabled()) {
  console.debug("IND Action Mark: flash", { rawType: rawType, type: type, durationMs: durationMs });
}

if (hideTimer) window.clearTimeout(hideTimer);
if (leaveTimer) window.clearTimeout(leaveTimer);

function hideAll() {
  try { checkSvg.classList.add("hidden"); } catch (e) {}
  try { warnSvg.classList.add("hidden"); } catch (e) {}
  try { errSvg.classList.add("hidden"); } catch (e) {}
}

function applyType() {
  hideAll();
  // Tailwind color only (no Bootstrap).
  // okProcess: green, okDelProcess/errorProcess: red, warningProcess: amber.
  wrap.classList.add("drop-shadow-[0_18px_24px_rgba(0,0,0,0.15)]");
  if (type === "warningprocess") {
    wrap.classList.remove("text-emerald-600");
    wrap.classList.remove("text-rose-600");
    wrap.classList.add("text-amber-500");
    try { warnSvg.classList.remove("hidden"); } catch (e) {}
    return warnSvg;
  }
  if (type === "errorprocess") {
    wrap.classList.remove("text-emerald-600");
    wrap.classList.remove("text-amber-500");
    wrap.classList.add("text-rose-600");
    try { errSvg.classList.remove("hidden"); } catch (e) {}
    return errSvg;
  }
  if (type === "okdelprocess") {
    wrap.classList.remove("text-emerald-600");
    wrap.classList.remove("text-amber-500");
    wrap.classList.add("text-rose-600");
    try { checkSvg.classList.remove("hidden"); } catch (e) {}
    return checkSvg;
  }
  // Default: okProcess
  wrap.classList.remove("text-rose-600");
  wrap.classList.remove("text-amber-500");
  wrap.classList.add("text-emerald-600");
  try { checkSvg.classList.remove("hidden"); } catch (e) {}
  return checkSvg;
}

var activeSvg = applyType();

// Show overlay and animate.
overlay.classList.remove("hidden");
overlay.setAttribute("aria-hidden", "false");
overlay.classList.remove("ind-mark-leave");
overlay.classList.add("ind-mark-open");

restartAnimations(wrap, activeSvg || checkSvg);

// Auto hide.
if (durationMs > 0) {
  hideTimer = window.setTimeout(function () {
    hideInternal(nodes);
  }, durationMs);
}


return true;
}

window.IND = window.IND || {};
window.IND.flashActionMark = flashInternal;

// Manual tests (no framework). Use from console: IND.runActionMarkTests()
window.IND.runActionMarkTests = function () {
  var results = [];
  function log(ok, name, detail) {
    results.push({ ok: ok, name: name, detail: detail || "" });
  }

  try {
    var types = ["okProcess", "okDelProcess", "warningProcess", "errorProcess"];
    for (var i = 0; i < types.length; i++) {
      var t = types[i];
      var ok = false;
      try {
        ok = window.IND.flashActionMark({ type: t, durationMs: 350 });
      } catch (e) {
        ok = false;
      }
      log(!!ok, "flash " + t, ok ? "" : "flash returned false");
    }
    log(true, "API exists", typeof window.IND.flashActionMark === "function" ? "" : "missing");
  } catch (e) {
    log(false, "runActionMarkTests exception", String(e && e.message ? e.message : e));
  }

  try {
    console.table(results);
  } catch (e) {
    console.log(results);
  }
  return results;
};
})();
