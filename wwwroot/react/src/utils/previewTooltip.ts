const PREVIEW_MAX_HEIGHT_RATIO = 0.8;
const PREVIEW_BASE_FONT = 13;
const PREVIEW_MIN_FONT = 11;

let previewAnchor: HTMLElement | null = null;
let previewCloseBound = false;

export const setPreviewAnchor = (anchor: HTMLElement | null) => {
  previewAnchor = anchor;
};

const ensurePreviewTooltip = (): HTMLElement => {
  let tooltipEl = document.getElementById("indPreviewTooltip") as HTMLElement | null;
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement("div");
  tooltipEl.id = "indPreviewTooltip";
  tooltipEl.className = "ind-preview-tooltip";
  document.body.appendChild(tooltipEl);
  return tooltipEl;
};

const ensurePreviewAutoClose = () => {
  if (previewCloseBound) return;
  previewCloseBound = true;
  document.addEventListener(
    "pointerdown",
    (event) => {
      const tooltipEl = document.getElementById("indPreviewTooltip");
      if (!tooltipEl || !tooltipEl.classList.contains("visible")) return;
      if (previewAnchor && previewAnchor.contains(event.target as Node)) return;
      hidePreviewTooltip();
    },
    true
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hidePreviewTooltip();
  });
};

export const showPreviewTooltip = (text: string, clientY: number): boolean => {
  if (!text) return false;
  const tooltipEl = ensurePreviewTooltip();
  tooltipEl.textContent = text;
  tooltipEl.classList.add("visible");
  previewAnchor = null;
  ensurePreviewAutoClose();

  const centerX = Math.round(window.innerWidth / 2);
  tooltipEl.style.left = `${centerX}px`;

  const margin = 12;
  tooltipEl.style.maxHeight = `${Math.round(window.innerHeight * PREVIEW_MAX_HEIGHT_RATIO)}px`;
  tooltipEl.style.overflowY = "auto";

  let fontSize = PREVIEW_BASE_FONT;
  tooltipEl.style.fontSize = `${fontSize}px`;
  let rect = tooltipEl.getBoundingClientRect();
  const maxHeight = window.innerHeight * PREVIEW_MAX_HEIGHT_RATIO;
  while (rect.height > maxHeight && fontSize > PREVIEW_MIN_FONT) {
    fontSize -= 1;
    tooltipEl.style.fontSize = `${fontSize}px`;
    rect = tooltipEl.getBoundingClientRect();
  }

  const centerY = Math.round((window.innerHeight - rect.height) / 2);
  let top = Number.isFinite(centerY) ? centerY : margin;
  const minTop = margin;
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  if (top < minTop) top = minTop;
  if (top > maxTop) top = maxTop;
  tooltipEl.style.top = `${Math.round(top)}px`;
  return true;
};

export const hidePreviewTooltip = () => {
  const tooltipEl = document.getElementById("indPreviewTooltip");
  if (!tooltipEl) return;
  tooltipEl.classList.remove("visible");
  previewAnchor = null;
};

export const isOverflowing = (el: HTMLElement | null): boolean => {
  if (!el) return false;
  return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
};
