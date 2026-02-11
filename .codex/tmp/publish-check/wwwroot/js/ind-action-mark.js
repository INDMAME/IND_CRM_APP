(function () {
  const colorClasses = ["text-emerald-600", "text-rose-600", "text-amber-500"];
  const shadowClass = "drop-shadow-[0_18px_24px_rgba(0,0,0,0.15)]";
  let hideTimer = null;

  const buildActionMark = () => {
    if (document.getElementById("indActionMark")) return;
    const root = document.createElement("div");
    root.id = "indActionMark";
    root.className = "fixed inset-0 z-2147483647 hidden pointer-events-none flex items-center justify-center";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = `
<div id="indActionMarkWrap" class="h-40 w-40">
  <svg id="indMarkCheck" class="hidden h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <rect class="ind-mark-stroke ind-stroke-animate" x="4" y="4" width="16" height="16" rx="0.75" stroke-width="1.1"></rect>
    <path class="ind-mark-stroke ind-stroke-animate" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8.2 12.6l2.5 2.5 5.1-6.2"></path>
  </svg>
  <svg id="indMarkWarning" class="hidden h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <rect class="ind-mark-stroke ind-stroke-animate" x="4" y="4" width="16" height="16" rx="0.75" stroke-width="1.1"></rect>
    <path class="ind-mark-stroke ind-stroke-animate" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M12 7.2v7.1"></path>
    <path class="ind-mark-stroke ind-stroke-animate" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 17.3h.01"></path>
  </svg>
  <svg id="indMarkError" class="hidden h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <rect class="ind-mark-stroke ind-stroke-animate" x="4" y="4" width="16" height="16" rx="0.75" stroke-width="1.1"></rect>
    <path class="ind-mark-stroke ind-stroke-animate" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8.5 8.5l7 7"></path>
    <path class="ind-mark-stroke ind-stroke-animate" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M15.5 8.5l-7 7"></path>
  </svg>
</div>
`;
    const target = document.body || document.documentElement;
    if (target) {
      target.appendChild(root);
    }
  };

  const getNodes = () => {
    let root = document.getElementById("indActionMark");
    if (!root) {
      buildActionMark();
      root = document.getElementById("indActionMark");
    }
    return {
      root,
      wrap: document.getElementById("indActionMarkWrap"),
      check: document.getElementById("indMarkCheck"),
      warn: document.getElementById("indMarkWarning"),
      error: document.getElementById("indMarkError")
    };
  };

  const resetIcons = (nodes) => {
    if (!nodes.wrap) return;
    nodes.wrap.classList.remove(...colorClasses);
    nodes.wrap.classList.remove(shadowClass);
    if (nodes.check) nodes.check.classList.add("hidden");
    if (nodes.warn) nodes.warn.classList.add("hidden");
    if (nodes.error) nodes.error.classList.add("hidden");
  };

  const hideMark = (nodes) => {
    if (!nodes.root) return;
    nodes.root.classList.add("hidden");
    nodes.root.setAttribute("aria-hidden", "true");
    resetIcons(nodes);
  };

  const flashActionMark = (payload) => {
    const type = payload && typeof payload.type === "string" ? payload.type : "";
    if (!type) return;
    const durationRaw = payload ? Number(payload.durationMs) : NaN;
    const durationMs = Number.isFinite(durationRaw) ? Math.max(0, durationRaw) : 1500;
    const nodes = getNodes();

    if (!nodes.root || !nodes.wrap || !nodes.check || !nodes.warn || !nodes.error) return;

    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }

    resetIcons(nodes);

    let icon = nodes.check;
    let colorClass = "text-emerald-600";

    switch (type) {
      case "okProcess":
        icon = nodes.check;
        colorClass = "text-emerald-600";
        break;
      case "okDelProcess":
        icon = nodes.check;
        colorClass = "text-rose-600";
        break;
      case "warningProcess":
        icon = nodes.warn;
        colorClass = "text-amber-500";
        break;
      case "errorProcess":
        icon = nodes.error;
        colorClass = "text-rose-600";
        break;
      default:
        icon = nodes.check;
        colorClass = "text-emerald-600";
        break;
    }

    nodes.wrap.classList.add(colorClass);
    nodes.wrap.classList.add(shadowClass);
    icon.classList.remove("hidden");
    nodes.root.classList.remove("hidden");
    nodes.root.setAttribute("aria-hidden", "false");
    nodes.root.style.setProperty("display", "flex", "important");
    nodes.root.style.setProperty("opacity", "1", "important");
    nodes.root.style.setProperty("visibility", "visible", "important");

    if (durationMs > 0) {
      hideTimer = setTimeout(() => {
        nodes.root.style.removeProperty("display");
        nodes.root.style.removeProperty("opacity");
        nodes.root.style.removeProperty("visibility");
        hideMark(nodes);
      }, durationMs);
    }
  };

  window.IND = window.IND || {};
  window.IND.flashActionMark = flashActionMark;
})();
