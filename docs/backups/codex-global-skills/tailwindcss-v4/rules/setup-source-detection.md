---
title: "Source Detection and Safelisting"
impact: "HIGH"
impactDescription: "Auto-detection reduces config; explicit control ensures critical classes exist."
tags: ["setup", "source", "detection", "safelist"]
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

**Trade-offs / When NOT to use:**

- **Dynamic classes:** Avoid `bg-${color}-500` patterns completely. If you must use them, you MUST safelist every possible combination using `@source inline(...)`.
- **Large safelists:** Safelisting large numbers of classes increases CSS size. Prefer mapping full class names in your code or using `clsx`/`cva`.

Reference: [Detecting Classes](https://tailwindcss.com/docs/detecting-classes-in-source-files)
