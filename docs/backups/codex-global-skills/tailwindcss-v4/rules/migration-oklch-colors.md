---
title: "OKLCH Color Space"
impact: "HIGH"
impactDescription: "Wider color gamut and predictable mixing; may affect visual regression."
tags: ["migration", "colors", "oklch", "p3"]
---

## OKLCH Color Space

v4 uses OKLCH color space by default. Colors appear more vibrant but may look different from v3.

**What changed:**

```css
/* v3 output */
.bg-blue-500 { background-color: rgb(59 130 246); }

/* v4 output */
.bg-blue-500 { background-color: oklch(0.623 0.214 259.815); }
```

**Opacity still works:**

```html
<!-- 50% opacity -->
<div class="bg-blue-500/50">Semi-transparent</div>
```

```css
/* v4 output */
.bg-blue-500\/50 { background-color: oklch(0.623 0.214 259.815 / 0.5); }
```

**Gradients look different:**

```html
<!-- Gradient interpolation uses oklch -->
<div class="bg-gradient-to-r from-red-500 to-blue-500">
  <!-- v4: smoother, more vibrant transition -->
  <!-- v3: may have muddy middle colors -->
</div>
```

**Custom colors with oklch:**

```css
@theme {
  --color-brand: oklch(0.7 0.15 250);
  --color-brand-light: oklch(from var(--color-brand) calc(l + 0.1) c h);
}
```

**P3 wide gamut:**

```css
@theme {
  /* Wide gamut color (brighter than sRGB) */
  --color-vivid: oklch(0.8 0.3 150);
}
```

**If you need exact v3 colors:**

```css
@theme {
  /* Override with rgb if needed */
  --color-blue-500: rgb(59 130 246);
}
```

**Trade-offs / When NOT to use:**

- **Legacy browser support:** OKLCH support is excellent in modern browsers but lacks support in older ones (though Tailwind includes fallbacks).
- **Exact brand matching:** If you have strict brand guidelines defined in RGB/Hex, using OKLCH conversion might result in extremely subtle differences. Stick to the definition format if critical.

Reference: [Colors](https://tailwindcss.com/docs/colors)
