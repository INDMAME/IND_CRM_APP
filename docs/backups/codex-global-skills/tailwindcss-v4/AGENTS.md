# Tailwind CSS v4 Skill

> Tailwind CSS v4 patterns for AI coding agents. CSS-first configuration, new directives (@theme, @utility, @variant, @source), migration from v3, and anti-patterns to avoid.

**Version**: 0.1.0 | **Status**: verified | **Last Verified**: 2026-01-16
**Source**: [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)

---

## Quick Reference

### v4 Entry Point
```css
@import "tailwindcss";
```

### Key Directives
| Directive | Purpose |
|-----------|---------|
| `@theme` | Define design tokens (colors, spacing, fonts) |
| `@utility` | Create custom utility classes |
| `@variant` | Define custom variants (hover, focus, etc.) |
| `@source` | Control class detection and safelisting |
| `@reference` | Import for @apply without emitting CSS |

---

## Setup & Configuration

## CSS Entry Point

v4 uses `@import 'tailwindcss'` as the single entry point. The v3 `@tailwind` directives cause errors.

**Incorrect (v3 directives - will error in v4):**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Correct (v4 single import):**

```css
@import 'tailwindcss';
```

**With options:**

```css
/* Set source scanning base */
@import 'tailwindcss' source('../src');

/* Add prefix */
@import 'tailwindcss' prefix(tw);

/* Disable auto-detection */
@import 'tailwindcss' source(none);
```

Reference: [Functions and Directives](https://tailwindcss.com/docs/functions-and-directives)

---

## Next.js App Router Integration

v4 works with Next.js via PostCSS or the experimental `@next/tailwind` integration.

**Setup (PostCSS - recommended):**

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

```css
/* app/globals.css */
@import 'tailwindcss';

@source '../components/**/*.tsx';
@source '../app/**/*.tsx';
```

```tsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Incorrect (v3 config reference):**

```js
// tailwind.config.js - NOT the v4 way
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
}
```

**Correct (v4 CSS source detection):**

```css
/* In globals.css */
@import 'tailwindcss';

/* Explicit source paths if auto-detection misses files */
@source '../components/**/*.tsx';
```

**Turbopack compatibility:**

```bash
# Works with Turbopack
next dev --turbo
```

Reference: [Installation - Next.js](https://tailwindcss.com/docs/installation/nextjs)

---

## Vite Integration

v4 has a dedicated Vite plugin that's faster than PostCSS. Use `@tailwindcss/vite` instead of `postcss.config.js`.

**Incorrect (v3 PostCSS approach):**

```js
// postcss.config.js - SLOWER in v4
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

**Correct (v4 Vite plugin):**

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

```css
/* src/index.css */
@import 'tailwindcss';
```

**If you must use PostCSS:**

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}  // NEW package name
  }
}
```

**Key differences:**
- `@tailwindcss/vite` - Fastest, uses Lightning CSS
- `@tailwindcss/postcss` - For non-Vite builds
- No `autoprefixer` needed - v4 handles prefixes

Reference: [Installation - Vite](https://tailwindcss.com/docs/installation/vite)

---

## Source Detection and Safelisting

v4 auto-detects source files but provides `@source` for manual control. Safelisting uses `@source inline()`.

**Add paths:**

```css
@source "../shared-components/**/*.tsx";
@source "./templates/*.html";
```

**Exclude paths:**

```css
@source not "./legacy/**/*";
@source not "../packages/deprecated";
```

**Safelist specific classes:**

```css
/* Safelist exact classes */
@source inline("bg-red-500 text-white p-4");

/* With brace expansion */
@source inline("bg-{red,blue,green}-{100,500,900}");

/* With variants */
@source inline("hover:bg-red-500 dark:text-white");
```

**Incorrect (v3 safelist in JS - not supported):**

```js
// tailwind.config.js - THIS DOES NOT WORK IN V4
module.exports = {
  safelist: ['bg-red-500', 'text-white']  // Not supported!
}
```

**Correct (v4 @source inline):**

```css
@source inline("bg-red-500 text-white");
```

**Important:** Tailwind scans files as plain text. String interpolation won't work:

```tsx
// ❌ These classes WON'T be detected
const color = 'red'
className={`bg-${color}-500`}

// ✅ Use complete class names
className={color === 'red' ? 'bg-red-500' : 'bg-blue-500'}
```

Reference: [Detecting Classes](https://tailwindcss.com/docs/detecting-classes-in-source-files)

---

## Theme Configuration with @theme

v4 uses `@theme` blocks in CSS to define design tokens. This replaces the JS-based `tailwind.config.js` for most use cases.

**Incorrect (v3 JS config as primary):**

```js
// tailwind.config.js - still works but not the v4 way
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      }
    }
  }
}
```

**Correct (v4 CSS-first):**

```css
@import 'tailwindcss';

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --breakpoint-3xl: 1920px;
  --font-display: "Satoshi", sans-serif;
}
```

**Override entire namespace:**

```css
@theme {
  /* Remove all default colors */
  --color-*: initial;

  /* Define only your colors */
  --color-brand: #ff6b00;
  --color-surface: #fafafa;
}
```

**Reference variables (use @theme inline):**

```css
@theme inline {
  /* Can reference other variables */
  --color-primary-light: oklch(from var(--color-primary) calc(l + 0.1) c h);
}
```

Reference: [Theme Variables](https://tailwindcss.com/docs/theme)

---

## Migration from v3

## Native Container Queries

v4 includes container queries natively. Remove `@tailwindcss/container-queries` plugin.

**Incorrect (v3 with plugin):**

```js
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/container-queries'),  // NOT needed in v4
  ],
}
```

**Correct (v4 native):**

```html
<!-- Define container -->
<div class="@container">
  <!-- Respond to container width -->
  <div class="@lg:grid-cols-2 @md:flex-row">
    Content
  </div>
</div>
```

**Container variants:**

| Variant | Container Width |
|---------|-----------------|
| `@sm:` | 320px (20rem) |
| `@md:` | 448px (28rem) |
| `@lg:` | 512px (32rem) |
| `@xl:` | 576px (36rem) |
| `@2xl:` | 672px (42rem) |

**Named containers:**

```html
<div class="@container/sidebar">
  <div class="@lg/sidebar:hidden">
    Hidden when sidebar is large
  </div>
</div>
```

**Common confusion:**
- `lg:` = viewport breakpoint (screen width)
- `@lg:` = container query (parent width)

```html
<!-- Viewport-based (screen width) -->
<div class="lg:hidden">Hidden on large screens</div>

<!-- Container-based (parent width) -->
<div class="@lg:hidden">Hidden in large containers</div>
```

Reference: [Container Queries](https://tailwindcss.com/docs/container-queries)

---

## Dark Mode Configuration

v4 defaults to `media` strategy (prefers-color-scheme). For class-based dark mode, use `@variant`.

**v4 default (media query):**

```css
/* Automatic - follows system preference */
@import 'tailwindcss';

/* dark: variants use @media (prefers-color-scheme: dark) */
```

```html
<div class="bg-white dark:bg-gray-900">
  Follows system preference
</div>
```

**Class-based dark mode:**

```css
@import 'tailwindcss';

@variant dark (&:is(.dark, .dark *));
```

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-gray-900">
      Dark when .dark class on html
    </div>
  </body>
</html>
```

**Data attribute strategy:**

```css
@variant dark (&:is([data-theme="dark"], [data-theme="dark"] *));
```

```html
<html data-theme="dark">
  <div class="dark:bg-gray-900">Dark mode active</div>
</html>
```

**Incorrect (v3 config):**

```js
// tailwind.config.js - NOT the v4 way
module.exports = {
  darkMode: 'class',  // Use @variant instead
}
```

**Correct (v4 @variant):**

```css
@variant dark (&:is(.dark, .dark *));
```

Reference: [Dark Mode](https://tailwindcss.com/docs/dark-mode)

---

## Explicit var() in Arbitrary Values

v4 requires explicit `var()` when using CSS variables in arbitrary values. The v3 implicit injection is removed.

**Incorrect (v3 implicit var):**

```html
<div class="bg-[--my-color]">Colored box</div>
<!-- In v4, this produces NO CSS output - silently fails -->
```

**Correct (v4 explicit var):**

```html
<div class="bg-[var(--my-color)]">Colored box</div>
<!-- Correctly references the CSS variable -->
```

This applies to all arbitrary values that reference CSS variables:

```html
<!-- All incorrect in v4 -->
<div class="w-[--sidebar-width]">
<div class="p-[--spacing-lg]">
<div class="text-[--heading-size]">

<!-- All correct in v4 -->
<div class="w-[var(--sidebar-width)]">
<div class="p-[var(--spacing-lg)]">
<div class="text-[var(--heading-size)]">
```

Reference: [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

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

Reference: [Colors](https://tailwindcss.com/docs/colors)

---

## Ring Requires Explicit Width

v4 changed `ring` to require an explicit width. The default `ring` utility no longer applies a visible ring.

**Incorrect (v3 mental model):**

```html
<button class="focus:ring">Focusable button</button>
<!-- In v4, this produces a ring with width 0 - invisible -->
```

**Correct (v4 explicit width):**

```html
<button class="focus:ring-3">Focusable button</button>
<!-- Produces a 3px ring, similar to v3's default "ring" -->
```

**Available widths:** `ring-0`, `ring-1`, `ring-2`, `ring-3`, `ring-4`, `ring-8`

Reference: [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

---

## Shadow Scale Shift

v4 shifted the shadow scale down by one step. What was `shadow` in v3 is now `shadow-sm` in v4.

**Incorrect (v3 mental model):**

```html
<div class="shadow">Card with shadow</div>
<!-- In v4, this produces a SMALLER shadow than v3's "shadow" -->
```

**Correct (v4 equivalent):**

```html
<div class="shadow-sm">Card with shadow</div>
<!-- Matches v3's "shadow" visual output -->
```

**Full scale mapping:**

| v3 Class | v4 Equivalent |
|----------|---------------|
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `shadow-md` | `shadow` |
| `shadow-lg` | `shadow-md` |
| `shadow-xl` | `shadow-lg` |
| `shadow-2xl` | `shadow-xl` |

Reference: [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

---

## Customization

## Custom Variants

Use `@custom-variant` for advanced selector logic beyond built-in variants.

**Dark mode with class strategy:**

```css
@custom-variant dark (&:is(.dark *));
```

This creates a `dark:` variant that matches elements inside a `.dark` parent.

**Usage:**

```html
<html class="dark">
  <body class="bg-white dark:bg-black">
    <!-- dark:bg-black applies -->
  </body>
</html>
```

**Multiple selectors:**

```css
@custom-variant hocus (&:hover, &:focus);
@custom-variant group-hocus (:merge(.group):hover &, :merge(.group):focus &);
```

**Print variant:**

```css
@custom-variant print (@media print);
```

**vs @variant:**

```css
/* @variant - simple selector list */
@variant hocus (&:hover, &:focus);

/* @custom-variant - same syntax, preferred for clarity */
@custom-variant hocus (&:hover, &:focus);
```

Both work identically. `@custom-variant` is more explicit about intent.

Reference: [Custom Variants](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants)

---

## New Gradient Syntax

Tailwind v4 introduces cleaner gradient utilities.

**Linear gradients:**

```html
<!-- v4 syntax -->
<div class="bg-linear-to-r from-blue-500 to-purple-500"></div>
<div class="bg-linear-to-b from-foreground to-foreground/70"></div>

<!-- Direction variants -->
bg-linear-to-t    <!-- top -->
bg-linear-to-tr   <!-- top-right -->
bg-linear-to-r    <!-- right -->
bg-linear-to-br   <!-- bottom-right -->
bg-linear-to-b    <!-- bottom -->
bg-linear-to-bl   <!-- bottom-left -->
bg-linear-to-l    <!-- left -->
bg-linear-to-tl   <!-- top-left -->
```

**vs v3 syntax:**

```html
<!-- v3 (still works) -->
<div class="bg-gradient-to-r from-blue-500 to-purple-500"></div>

<!-- v4 preferred -->
<div class="bg-linear-to-r from-blue-500 to-purple-500"></div>
```

**Radial gradients:**

```html
<div class="bg-radial from-white to-transparent"></div>
<div class="bg-radial-[at_top] from-sky-500 to-transparent"></div>
```

**Conic gradients:**

```html
<div class="bg-conic from-red-500 via-yellow-500 to-red-500"></div>
```

**With arbitrary values:**

```html
<div class="bg-linear-[45deg] from-pink-500 to-orange-500"></div>
<div class="bg-radial-[circle_at_top] from-blue-500 to-transparent"></div>
```

**Text gradients:**

```css
.text-gradient {
  @apply bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70;
}
```

Reference: [Gradients](https://tailwindcss.com/docs/background-image)

---

## Theme Inline Modifier

Use `@theme inline` to preserve CSS variables in output alongside utilities.

**Standard @theme:**

```css
@theme {
  --font-sans: "Inter", sans-serif;
}
```

Variables used for utility generation but NOT emitted as CSS variables.

**With inline modifier:**

```css
@theme inline {
  --font-sans: "SF Pro Text", system-ui, sans-serif;
  --color-primary: #0066cc;
}
```

Variables ARE emitted as CSS custom properties AND used for utilities.

**Output difference:**

```css
/* @theme (no inline) - only utilities generated */
.font-sans { font-family: Inter, sans-serif; }

/* @theme inline - variables preserved */
:root {
  --font-sans: SF Pro Text, system-ui, sans-serif;
  --color-primary: #0066cc;
}
.font-sans { font-family: var(--font-sans); }
```

**When to use inline:**

- Shadcn/Radix design systems that reference CSS vars
- Dynamic theming with JavaScript
- Sharing variables between Tailwind and custom CSS

**Combining with :root:**

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

:root {
  --background: #ffffff;
  --foreground: #1d1d1f;
}

.dark {
  --background: #000000;
  --foreground: #f5f5f7;
}
```

Reference: [Theme Configuration](https://tailwindcss.com/docs/theme)

---

## Custom Utilities with @utility

v4 uses `@utility` directive to define custom utilities that work with variants. This replaces the v3 `@layer utilities` pattern.

**Incorrect (v3 @layer pattern):**

```css
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

**Correct (v4 @utility directive):**

```css
@utility content-auto {
  content-visibility: auto;
}
```

**With variants - they just work:**

```html
<div class="hover:content-auto md:content-auto">
  <!-- Variants apply automatically -->
</div>
```

**Functional utility with values:**

```css
@utility tab-* {
  tab-size: --value(--tab-size-*, integer);
}

/* Usage: tab-2, tab-4, tab-8 based on --tab-size-* variables */
```

Reference: [Functions and Directives](https://tailwindcss.com/docs/functions-and-directives)

---

## Custom Variants with @variant

v4 uses `@variant` to define custom variants directly in CSS.

**Correct (v4 @variant):**

```css
/* Simple variant - combines selectors */
@variant hocus (&:hover, &:focus);

/* Media query variant */
@variant pointer-coarse (@media (pointer: coarse));

/* Supports query */
@variant supports-grid (@supports (display: grid));

/* Dark mode with class strategy */
@variant dark (&:is(.dark, .dark *));
```

**Usage:**

```html
<button class="hocus:bg-blue-600 pointer-coarse:p-4">
  Hover or focus me
</button>
```

**Nested variant with @slot:**

```css
@variant dark {
  &:where([data-theme="dark"], [data-theme="dark"] *) {
    @slot;
  }
}
```

Reference: [Functions and Directives](https://tailwindcss.com/docs/functions-and-directives)

---

## References

- https://tailwindcss.com/docs/upgrade-guide
- https://tailwindcss.com/docs/theme
- https://tailwindcss.com/docs/functions-and-directives
- https://tailwindcss.com/docs/detecting-classes-in-source-files
- https://tailwindcss.com/blog/tailwindcss-v4

---

*Generated from 21 rules. Verified 15/15 tests passing.*
